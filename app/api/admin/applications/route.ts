import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

function supabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) throw new Error("Missing SUPABASE_URL");
  if (!key) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");

  return createClient(url, key);
}

function requireAdminCookie(req: Request) {
  const expected = process.env.ADMIN_DASH_TOKEN;
  if (!expected) return false;

  const cookie = req.headers.get("cookie") || "";
  const match = cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith("admin_token="));

  if (!match) return false;
  const token = decodeURIComponent(match.split("=").slice(1).join("="));
  return token === expected;
}

export async function GET(req: Request) {
  try {
    if (!requireAdminCookie(req)) {
      return NextResponse.json({ ok: false, message: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || "all";
    const q = (searchParams.get("q") || "").trim();
    const limit = Math.min(parseInt(searchParams.get("limit") || "200", 10), 500);

    const sb = supabaseAdmin();

    let query = sb
      .from("volunteer_applications")
      .select(
        "id,created_at,full_name,email,phone,role_interest,country,city,availability,motivation,cv_url,status"
      )
      .order("created_at", { ascending: false })
      .limit(limit);

    if (status !== "all") query = query.eq("status", status);

    // Simple search: name or email
    if (q) {
      // ilike OR using "or" filter syntax
      query = query.or(`full_name.ilike.%${q}%,email.ilike.%${q}%`);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, data });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, message: e?.message || "Server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    if (!requireAdminCookie(req)) {
      return NextResponse.json({ ok: false, message: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const id = body?.id as string | undefined;
    const status = body?.status as string | undefined;

    const allowed = new Set(["pending", "reviewed", "shortlisted", "rejected"]);
    if (!id || !status || !allowed.has(status)) {
      return NextResponse.json(
        { ok: false, message: "Invalid payload (id/status)" },
        { status: 400 }
      );
    }

    const sb = supabaseAdmin();
    const { error } = await sb
      .from("volunteer_applications")
      .update({ status })
      .eq("id", id);

    if (error) {
      return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, message: e?.message || "Server error" },
      { status: 500 }
    );
  }
}
