import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    console.log("[CHECKOUT] Request received");
    
    const stripeSecret = process.env.STRIPE_SECRET_KEY?.trim();
    console.log("[CHECKOUT] Stripe secret present:", !!stripeSecret);
    
    if (!stripeSecret) {
      return NextResponse.json({ 
        error: "Stripe secret key not configured" 
      }, { status: 400 });
    }

    const { successUrl, cancelUrl } = await req.json();
    const origin = new URL(req.url).origin;
    console.log("[CHECKOUT] URLs ready");

    // Use Stripe REST API directly
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
        "line_items[0][price_data][product_data][name]": "Confidence English Academy",
        "line_items[0][quantity]": "1",
        "success_url": successUrl || `${origin}/programs?checkout=success`,
        "cancel_url": cancelUrl || `${origin}/programs?checkout=canceled`,
      }),
    });

    console.log("[CHECKOUT] Stripe response status:", response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("[CHECKOUT] Stripe error:", errorText);
      return NextResponse.json({ 
        error: `Stripe error: ${response.status}`,
      }, { status: response.status });
    }

    const session = await response.json();
    console.log("[CHECKOUT] Session created:", session.id);
    
    return NextResponse.json({ 
      url: session.url, 
      id: session.id 
    });
    
  } catch (err: any) {
    console.error("[CHECKOUT] Error:", err?.message);
    
    return NextResponse.json({ 
      error: err?.message || "Could not create checkout session"
    }, { status: 500 });
  }
}
