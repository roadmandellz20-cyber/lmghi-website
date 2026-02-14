import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.fullName || !body.email) {
      const errorMsg = "fullName and email are required";
      console.error(errorMsg);
      return NextResponse.json(
        { ok: false, stage: "validation", error: errorMsg },
        { status: 400 }
      );
    }

    // Build payload that exactly matches DB column names.
    const payload = {
      full_name: body.fullName,
      email: body.email,
      phone: body.phone ?? null,
      role_interest: body.track,
      country: body.country ?? null,
      city: body.city ?? null,
      availability: body.availability ?? null,
      motivation: body.motivation ?? null,
      cv_url: body.cvUrl ?? null,
    };

    // 1) Insert into DB (select only id)
    const { data, error } = await supabase
      .from("volunteer_applications")
      .insert(payload)
      .select("id")
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { ok: false, stage: "db_insert", error: error.message },
        { status: 500 }
      );
    }

    // 2) Send lightweight admin notification to ADMIN_NOTIFY_EMAIL (errors logged, do not break API)
    const adminEmail = process.env.ADMIN_NOTIFY_EMAIL;
    const from = "LMGHI <onboarding@resend.dev>";

    if (adminEmail) {
      try {
        await resend.emails.send({
          from,
          to: adminEmail,
          subject: "New Volunteer Application — LMGHI",
          text: `New application received:\n\nName: ${body.fullName}\nEmail: ${body.email}\nPhone: ${body.phone || "-"}\nTrack: ${body.track}\nCountry: ${body.country || "-"}\nCity: ${body.city || "-"}\nAvailability: ${body.availability || "-"}\nMotivation: ${body.motivation || "-"}\nCV: ${body.cvUrl || "-"}`,
        });
      } catch (e: any) {
        console.error("Resend error:", e?.message || e);
      }
    } else {
      console.warn("ADMIN_NOTIFY_EMAIL not set; skipping admin notification.");
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("API exception:", e);
    return NextResponse.json(
      { ok: false, step: "exception", error: e?.message || String(e) },
      { status: 500 }
    );
  }
}

function escapeHtml(input: string) {
  return String(input || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(str: string) {
  return escapeHtml(str).replaceAll("`", "&#096;");
}
