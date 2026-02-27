import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  try {
    const STRIPE_KEY = process.env.STRIPE_SECRET_KEY;
    const ADMIN_KEY = process.env.PRICE_CREATION_KEY;

    if (!STRIPE_KEY) {
      return NextResponse.json({ error: "Stripe secret key not configured" }, { status: 500 });
    }
    if (!ADMIN_KEY) {
      return NextResponse.json({ error: "Admin creation key not configured" }, { status: 500 });
    }

    // simple auth: accept `Authorization: Bearer <ADMIN_KEY>` or `x-admin-key: <ADMIN_KEY>`
    const authHeader = req.headers.get("authorization") || req.headers.get("x-admin-key") || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.replace("Bearer ", "") : authHeader;
    if (token !== ADMIN_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const productName = typeof body.productName === "string" ? body.productName.trim() : "";
    const unitAmount = Number(body.unitAmount || 0);
    const currency = (body.currency || "usd").toLowerCase();
    const recurringInterval = body.recurringInterval || null; // "month" | "year" | null

    if (!productName) {
      return NextResponse.json({ error: "productName is required" }, { status: 400 });
    }
    if (!unitAmount || isNaN(unitAmount) || unitAmount <= 0) {
      return NextResponse.json({ error: "unitAmount (in cents) is required and must be > 0" }, { status: 400 });
    }

    const stripe = new Stripe(STRIPE_KEY, { apiVersion: "2022-11-15" });

    // create product
    const product = await stripe.products.create({ name: productName });

    // create price - if recurringInterval provided, create a recurring price
    const price = await stripe.prices.create({
      unit_amount: Math.round(unitAmount),
      currency,
      product: product.id,
      ...(recurringInterval ? { recurring: { interval: recurringInterval } } : {}),
    });

    return NextResponse.json({ ok: true, product, price });
  } catch (err) {
    console.error("Create price error:", err);
    return NextResponse.json({ error: "Could not create price" }, { status: 500 });
  }
}
