import { NextResponse } from "next/server";
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

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization") || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.replace("Bearer ", "") : authHeader;
    if (!token) return NextResponse.json({ error: "Missing auth token" }, { status: 401 });

    const supabase = getSupabaseClient();
    if (!supabase) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });

    // Validate token and get user
    const { data: userData, error: userErr } = await supabase.auth.getUser(token);
    if (userErr || !userData?.user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const email = userData.user.email;
    if (!email) return NextResponse.json({ subscription: null });

    const { data, error } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("email", email)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("Failed to fetch subscription:", error);
      return NextResponse.json({ subscription: null });
    }

    return NextResponse.json({ subscription: data || null });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ subscription: null });
  }
}
