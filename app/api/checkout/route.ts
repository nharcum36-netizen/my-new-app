import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  try {
    const stripeSecret = process.env.STRIPE_SECRET_KEY?.trim();
    
    if (!stripeSecret || stripeSecret.includes("your_") || stripeSecret.includes("replace_me")) {
      return NextResponse.json({ 
        error: "Stripe secret key not configured" 
      }, { status: 500 });
    }

    const { priceId, successUrl, cancelUrl } = await req.json();
    const origin = new URL(req.url).origin;

    const stripe = new Stripe(stripeSecret);
    
    // Always use inline price for now (fallback)
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: 1900, // $19.00
            recurring: { interval: "month" },
            product_data: {
              name: "Confidence English Academy Membership",
            },
          },
          quantity: 1,
        },
      ],
      success_url: successUrl || `${origin}/programs?checkout=success`,
      cancel_url: cancelUrl || `${origin}/programs?checkout=canceled`,
    });

    return NextResponse.json({ 
      url: session.url, 
      id: session.id 
    });
    
  } catch (err: any) {
    console.error("Checkout error:", err);
    
    return NextResponse.json({ 
      error: err?.message || "Could not create checkout session",
      type: err?.type || "unknown"
    }, { status: 500 });
  }
}
