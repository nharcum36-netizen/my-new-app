import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

function getSupabaseClient() {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE;
  const hasValidConfig =
    !!SUPABASE_URL &&
    !!SUPABASE_SERVICE_ROLE &&
    !SUPABASE_URL.includes("your_") &&
    !SUPABASE_SERVICE_ROLE.includes("your_");

  if (!hasValidConfig) return null;
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE);
}

export async function POST(req: Request) {
  try {
    const buf = await req.arrayBuffer();
    const raw = Buffer.from(buf);
    const sig = req.headers.get("stripe-signature") || "";

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      console.error("Stripe webhook secret not configured");
      return NextResponse.json({ ok: false }, { status: 500 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2022-11-15" });

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(raw, sig, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (err) {
      console.error("Webhook signature verification failed.", err);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Persist subscription-related events to Supabase (if configured)
    const supabase = getSupabaseClient();

    const handleSubscription = async (subscription: Stripe.Subscription | null, extra: any = {}) => {
      if (!subscription || !supabase) return;
      try {
        const row = {
          stripe_subscription_id: subscription.id,
          stripe_customer_id: subscription.customer as string,
          status: subscription.status,
          price_id: subscription.items?.data?.[0]?.price?.id || null,
          current_period_end: subscription.current_period_end ? new Date(subscription.current_period_end * 1000) : null,
          metadata: subscription.metadata || {},
          email: (extra.email as string) || null,
        };

        await supabase
          .from("subscriptions")
          .upsert(row, { onConflict: "stripe_subscription_id" });
      } catch (err) {
        console.error("Failed to persist subscription:", err);
      }
    };

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        // session.subscription contains subscription id when mode=subscription
        const subscriptionId = session.subscription as string | undefined;
        if (subscriptionId) {
          const subscription = await stripe.subscriptions.retrieve(subscriptionId as string);
          await handleSubscription(subscription, { email: session.customer_details?.email });
        }
        break;
      }
      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        const subscriptionId = invoice.subscription as string | undefined;
        if (subscriptionId) {
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);
          await handleSubscription(subscription, { email: invoice.customer_email });
        }
        break;
      }
      case "customer.subscription.updated":
      case "customer.subscription.created":
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscription(subscription, {});
        break;
      }
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
