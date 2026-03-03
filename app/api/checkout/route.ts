import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const stripeSecret = process.env.STRIPE_SECRET_KEY?.trim();
    
    if (!stripeSecret || stripeSecret.includes("your_") || stripeSecret.includes("replace_me")) {
      return NextResponse.json({ 
        error: "Stripe secret key not configured" 
      }, { status: 400 });
    }

    const { successUrl, cancelUrl } = await req.json();
    const origin = new URL(req.url).origin;

    // Use Stripe REST API directly (more reliable)
    const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${stripeSecret}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        "mode": "subscription",
        "line_items[0][price_data][currency]": "usd",
        "line_items[0][price_data][unit_amount]": "1900",
        "line_items[0][price_data][recurring][interval]": "month",
        "line_items[0][price_data][product_data][name]": "Confidence English Academy Membership",
        "line_items[0][quantity]": "1",
        "success_url": successUrl || `${origin}/programs?checkout=success`,
        "cancel_url": cancelUrl || `${origin}/programs?checkout=canceled`,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Stripe API error:", error);
      return NextResponse.json({ 
        error: `Stripe error: ${response.status}`,
        details: error
      }, { status: 500 });
    }

    const session = await response.json();
    
    return NextResponse.json({ 
      url: session.url, 
      id: session.id 
    });
    
  } catch (err: any) {
    console.error("Checkout error:", err);
    
    return NextResponse.json({ 
      error: err?.message || "Could not create checkout session"
    }, { status: 500 });
  }
}
