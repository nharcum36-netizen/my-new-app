import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "edge";

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

    // Handle the event types you care about
    switch (event.type) {
      case "checkout.session.completed":
        // handle successful checkout
        console.log("Checkout session completed", event.data.object);
        break;
      case "invoice.payment_succeeded":
        console.log("Invoice payment succeeded", event.data.object);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
