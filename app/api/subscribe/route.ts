import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { planType, email, successUrl, cancelUrl } = await request.json();

    // Map plan types to Stripe prices
    const priceMap: { [key: string]: string } = {
      starter: process.env.STRIPE_PRICE_STARTER_MONTHLY || 'price_starter',
      pro: process.env.STRIPE_PRICE_PRO_MONTHLY || 'price_pro',
      elite: process.env.STRIPE_PRICE_ELITE_MONTHLY || 'price_elite',
      starter_annual: process.env.STRIPE_PRICE_STARTER_ANNUAL || 'price_starter_annual',
      pro_annual: process.env.STRIPE_PRICE_PRO_ANNUAL || 'price_pro_annual',
      elite_annual: process.env.STRIPE_PRICE_ELITE_ANNUAL || 'price_elite_annual',
    };

    const priceId = priceMap[planType];

    if (!priceId || priceId.startsWith('price_')) {
      console.error('Price ID not configured:', { planType, priceId });
      return NextResponse.json(
        { error: 'Plan pricing not configured. Please contact support.' },
        { status: 400 }
      );
    }

    // Create checkout session for subscriptions
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription', // Changed from 'payment' to 'subscription'
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      allow_promotion_codes: true, // Allow coupon codes
      metadata: {
        plan: planType,
        email: email,
      },
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error: any) {
    console.error('Checkout error:', error.message);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
