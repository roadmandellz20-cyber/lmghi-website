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
    // --- CORS/Origin check: allow Vercel and localhost only ---
    const allowedOrigins = [
      "https://lmghi-website.vercel.app",
      "http://localhost:3000",
      "http://127.0.0.1:3000"
    ];
    const reqOrigin = req.headers.get("origin") || req.headers.get("referer") || "";
    const isAllowed = allowedOrigins.some((o) => reqOrigin.startsWith(o));
    if (reqOrigin && !isAllowed) {
      console.warn(`[volunteer] Forbidden origin: ${reqOrigin}`);
      return NextResponse.json(
        { ok: false, status: 403, stage: "origin_check", message: `Forbidden origin: ${reqOrigin}` },
        { status: 403 }
      );
    }
  // Safe server-side logs for env presence (never print values)
  const envVars = {
    RESEND_API_KEY: !!process.env.RESEND_API_KEY,
    SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    SUPABASE_URL: !!process.env.SUPABASE_URL,
    ADMIN_NOTIFY_EMAIL: !!process.env.ADMIN_NOTIFY_EMAIL,
  };
  console.log("[volunteer] Env presence:", envVars);

  // Check for NEXT_PUBLIC usage (should not be present)
  Object.keys(process.env).forEach((k) => {
    if (k.startsWith("NEXT_PUBLIC") && [
      "NEXT_PUBLIC_RESEND_API_KEY",
      "NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY",
      "NEXT_PUBLIC_SUPABASE_URL",
      "NEXT_PUBLIC_ADMIN_NOTIFY_EMAIL"
    ].includes(k)) {
      console.warn(`[volunteer] Forbidden NEXT_PUBLIC secret detected: ${k}`);
    }
  });

  try {
    const body = await req.json();

    if (!body.fullName || !body.email) {
      const errorMsg = "fullName and email are required";
      console.error("[volunteer] Validation error:", errorMsg);
      return NextResponse.json(
        { ok: false, status: 400, stage: "validation", message: errorMsg },
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
      console.error("[volunteer] Supabase insert error:", error);
      return NextResponse.json(
        { ok: false, status: 500, stage: "db_insert", message: error.message, details: error },
        { status: 500 }
      );
    }

    // 2) Send lightweight admin notification to ADMIN_NOTIFY_EMAIL (errors logged, do not break API)
    const resendAccountEmail = process.env.RESEND_ACCOUNT_EMAIL || "";
    const adminNotifyEmail = process.env.ADMIN_NOTIFY_EMAIL || resendAccountEmail;
    let from = "LMGHI <onboarding@resend.dev>";

    // Resend sender validation
    // If using resend.dev, only send to Resend account email
    const isResendDev = from.endsWith("@resend.dev>");
    let allowedToSend = true;
    if (isResendDev) {
      if (!resendAccountEmail) {
        allowedToSend = false;
      } else if (adminNotifyEmail !== resendAccountEmail) {
        allowedToSend = false;
      }
    }

    if (adminNotifyEmail && allowedToSend) {
      try {
        await resend.emails.send({
          from,
          to: [adminNotifyEmail],
          subject: "New Volunteer Application — LMGHI",
          text: `New application received:\n\nName: ${body.fullName}\nEmail: ${body.email}\nPhone: ${body.phone || "-"}\nTrack: ${body.track}\nCountry: ${body.country || "-"}\nCity: ${body.city || "-"}\nAvailability: ${body.availability || "-"}\nMotivation: ${body.motivation || "-"}\nCV: ${body.cvUrl || "-"}`,
        });
      } catch (e: any) {
        console.error("[volunteer] Resend error:", e?.message || e);
      }
    } else if (adminNotifyEmail && !allowedToSend) {
      const errMsg = "Resend sender 'onboarding@resend.dev' can only send to your Resend account email. Set RESEND_ACCOUNT_EMAIL in env and ensure ADMIN_NOTIFY_EMAIL matches.";
      console.error("[volunteer] Resend sender forbidden:", errMsg);
      return NextResponse.json(
        { ok: false, status: 403, stage: "email_send", message: errMsg },
        { status: 403 }
      );
    } else {
      console.warn("[volunteer] ADMIN_NOTIFY_EMAIL not set; skipping admin notification.");
    }

    return NextResponse.json({ ok: true, status: 200, id: data?.id });
  } catch (e: any) {
    // Log error with stack if present
    console.error("[volunteer] API exception:", e?.message || e, e?.stack || "");
    return NextResponse.json(
      { ok: false, status: 500, stage: "exception", message: e?.message || String(e), stack: e?.stack || null },
      { status: 500 }
    );
  }
  // ...existing code...
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
