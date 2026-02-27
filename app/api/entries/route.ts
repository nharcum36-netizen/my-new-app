import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabaseClient() {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) return null;
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE);
}

export async function GET() {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) return NextResponse.json({ entries: [] });

    const { data, error } = await supabase
      .from("journal_entries")
      .select("id, text, mood, created_at")
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) {
      console.error("Supabase fetch error:", error);
      return NextResponse.json({ entries: [] });
    }

    const entries = (data || []).map((r: any) => ({
      id: r.id,
      text: r.text,
      mood: r.mood,
      date: r.created_at,
    }));

    return NextResponse.json({ entries });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ entries: [] });
  }
}

export async function POST(req: Request) {
  try {
    const { text, mood } = await req.json();
    if (!text) return NextResponse.json({ error: "text required" }, { status: 400 });
    const supabase = getSupabaseClient();
    if (!supabase) {
      // cannot persist, but return success so client keeps local copy
      return NextResponse.json({ ok: false, message: "supabase not configured" });
    }

    const { data, error } = await supabase
      .from("journal_entries")
      .insert({ text, mood })
      .select();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, entry: data?.[0] || null });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: "server error" }, { status: 500 });
  }
}
