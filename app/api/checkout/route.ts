import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  try {
    const { priceId, successUrl, cancelUrl } = await req.json();
    const origin = new URL(req.url).origin;

    const stripeSecret = process.env.STRIPE_SECRET_KEY?.trim();
    const hasStripeSecret =
      !!stripeSecret &&
      !stripeSecret.toLowerCase().includes("your_") &&
      !stripeSecret.toLowerCase().includes("replace_me");

    if (!hasStripeSecret) {
      return NextResponse.json({ error: "Stripe secret key not configured" }, { status: 500 });
    }

    const hasValidPriceId = !!priceId && !String(priceId).includes("YOUR_PRICE_ID_HERE");

    const stripe = new Stripe(stripeSecret, { apiVersion: "2022-11-15" });
    const session = await stripe.checkout.sessions.create(
      hasValidPriceId
        ? {
            mode: "subscription",
            line_items: [{ price: priceId, quantity: 1 }],
            success_url: successUrl || `${origin}/?success=true`,
            cancel_url: cancelUrl || `${origin}/?canceled=true`,
          }
        : {
            mode: "subscription",
            line_items: [
              {
                quantity: 1,
                price_data: {
                  currency: "usd",
                  unit_amount: 1900,
                  recurring: { interval: "month" },
                  product_data: {
                    name: "Confidence English Academy Membership",
                  },
                },
              },
            ],
            success_url: successUrl || `${origin}/?success=true`,
            cancel_url: cancelUrl || `${origin}/?canceled=true`,
          }
    );

    return NextResponse.json({ url: session.url, id: session.id });
  } catch (err: unknown) {
    console.error("Checkout error:", err);
    const errorMessage =
      err instanceof Error && err.message.length > 0
        ? err.message
        : "Could not create checkout session";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
