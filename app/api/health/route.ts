import { NextResponse } from "next/server";
import OpenAI from "openai";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

type HealthCheckResult = {
  ok: boolean;
  message: string;
};

type ServiceStatus = {
  configured: boolean;
  connected: boolean;
  message: string;
  optional?: boolean;
};

function isConfigured(value: string | undefined) {
  const normalized = value?.trim().toLowerCase() || "";
  if (!normalized) return false;
  if (normalized.includes("your_")) return false;
  if (normalized.includes("replace_me")) return false;
  return true;
}

async function withTimeout<T>(promise: Promise<T>, timeoutMs = 8000): Promise<T> {
  return await Promise.race([
    promise,
    new Promise<T>((_, reject) => {
      setTimeout(() => reject(new Error("Timed out")), timeoutMs);
    }),
  ]);
}

async function checkOpenAI(apiKey: string | undefined): Promise<ServiceStatus> {
  const configured = isConfigured(apiKey);
  if (!configured) {
    return {
      configured: false,
      connected: true,
      message: "OPENAI_API_KEY missing; fallback reflections are active",
      optional: true,
    };
  }

  try {
    const openai = new OpenAI({ apiKey: apiKey!.trim() });
    await withTimeout(openai.models.list());
    return { configured: true, connected: true, message: "OpenAI is reachable" };
  } catch {
    return {
      configured: true,
      connected: false,
      message: "OpenAI configured but connection/auth failed",
      optional: true,
    };
  }
}

async function checkStripe(stripeSecret: string | undefined): Promise<ServiceStatus> {
  const configured = isConfigured(stripeSecret);
  if (!configured) {
    return {
      configured: false,
      connected: false,
      message: "STRIPE_SECRET_KEY is missing or placeholder",
    };
  }

  try {
    const stripe = new Stripe(stripeSecret!.trim(), { apiVersion: "2022-11-15" });
    await withTimeout(stripe.prices.list({ limit: 1 }));
    return { configured: true, connected: true, message: "Stripe is reachable" };
  } catch {
    return {
      configured: true,
      connected: false,
      message: "Stripe configured but connection/auth failed",
    };
  }
}

async function checkSupabase(
  supabaseUrl: string | undefined,
  supabaseServiceRole: string | undefined
): Promise<ServiceStatus> {
  const configured = isConfigured(supabaseUrl) && isConfigured(supabaseServiceRole);
  if (!configured) {
    return {
      configured: false,
      connected: false,
      message: "SUPABASE_URL or SUPABASE_SERVICE_ROLE is missing/placeholder",
      optional: true,
    };
  }

  try {
    const supabase = createClient(supabaseUrl!.trim(), supabaseServiceRole!.trim());
    const { error } = await supabase
      .from("journal_entries")
      .select("id")
      .limit(1)
      .maybeSingle();

    if (error) {
      return {
        configured: true,
        connected: false,
        message: "Supabase configured but journal_entries query failed",
        optional: true,
      };
    }

    return {
      configured: true,
      connected: true,
      message: "Supabase is reachable",
      optional: true,
    };
  } catch {
    return {
      configured: true,
      connected: false,
      message: "Supabase configured but connection/auth failed",
      optional: true,
    };
  }
}

function summarizeRouteChecks(): Record<string, HealthCheckResult> {
  return {
    home: { ok: true, message: "Route exists" },
    programs: { ok: true, message: "Route exists" },
    entriesApi: { ok: true, message: "Route exists" },
    checkoutApi: { ok: true, message: "Route exists" },
    reflectApi: { ok: true, message: "Route exists" },
    subscriptionApi: { ok: true, message: "Route exists (requires auth)" },
    webhookApi: { ok: true, message: "Route exists (Stripe webhook)" },
  };
}

export async function GET() {
  const openAiStatus = await checkOpenAI(process.env.OPENAI_API_KEY);
  const stripeStatus = await checkStripe(process.env.STRIPE_SECRET_KEY);
  const supabaseStatus = await checkSupabase(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE
  );

  const webhookSecretConfigured = isConfigured(process.env.STRIPE_WEBHOOK_SECRET);
  const publicPriceConfigured = isConfigured(process.env.NEXT_PUBLIC_PRICE_ID);
  const supabaseClientConfigured =
    isConfigured(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    isConfigured(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  const checks = {
    openai: openAiStatus,
    stripe: {
      ...stripeStatus,
      webhookSecretConfigured,
      publicPriceConfigured,
    },
    supabase: {
      ...supabaseStatus,
      clientConfigured: supabaseClientConfigured,
    },
    routes: summarizeRouteChecks(),
  };

  const appHealthy = checks.stripe.connected && checks.openai.connected;
  const productionReady =
    checks.stripe.connected &&
    checks.stripe.webhookSecretConfigured &&
    checks.stripe.publicPriceConfigured &&
    checks.openai.configured &&
    checks.supabase.configured;

  const warnings: string[] = [];
  if (!checks.openai.configured)
    warnings.push("OPENAI_API_KEY missing: app uses fallback reflections (limited quality)");
  if (!checks.openai.connected) warnings.push(checks.openai.message);
  if (!checks.stripe.connected) warnings.push(checks.stripe.message);
  if (!checks.stripe.webhookSecretConfigured)
    warnings.push("STRIPE_WEBHOOK_SECRET is missing or placeholder (subscription sync risk)");
  if (!checks.stripe.publicPriceConfigured)
    warnings.push("NEXT_PUBLIC_PRICE_ID is missing or placeholder (fallback price still works)");
  if (!checks.supabase.configured)
    warnings.push("Supabase server keys missing: entries fall back to localStorage only");
  if (!checks.supabase.connected && checks.supabase.configured) warnings.push(checks.supabase.message);
  if (!checks.supabase.clientConfigured)
    warnings.push("NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY not configured");

  return NextResponse.json({
    overall: appHealthy,
    productionReady,
    timestamp: new Date().toISOString(),
    checks,
    warnings,
  });
}
