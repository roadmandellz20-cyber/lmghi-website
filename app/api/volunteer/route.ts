// app/api/volunteer/route.ts
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
  // ----------------------------
  // 1) Origin allowlist (prod + localhost + vercel previews for this project)
  // ----------------------------
  const allowedOrigins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://lmghi-website.vercel.app",
  ];

  const rawOrigin =
    req.headers.get("origin") || req.headers.get("referer") || "";

  let reqOrigin = "";
  try {
    reqOrigin = rawOrigin ? new URL(rawOrigin).origin : "";
  } catch {
    reqOrigin = "";
  }

  // Allow Vercel preview deployments for THIS project (tightened)
  const isVercelPreview =
    reqOrigin.endsWith(".vercel.app") && reqOrigin.includes("lmghi-website");

  const isAllowed = allowedOrigins.includes(reqOrigin) || isVercelPreview;

  if (reqOrigin && !isAllowed) {
    console.warn(`[volunteer] Forbidden origin: ${reqOrigin}`);
    return NextResponse.json(
      {
        ok: false,
        status: 403,
        stage: "origin_check",
        message: `Forbidden origin: ${reqOrigin}`,
      },
      { status: 403 }
    );
  }

  // ----------------------------
  // 2) Minimal env presence logs (no values)
  // ----------------------------
  console.log("[volunteer] Env presence:", {
    RESEND_API_KEY: !!process.env.RESEND_API_KEY,
    RESEND_ACCOUNT_EMAIL: !!process.env.RESEND_ACCOUNT_EMAIL,
    ADMIN_NOTIFY_EMAIL: !!process.env.ADMIN_NOTIFY_EMAIL,
    TURNSTILE_SECRET_KEY: !!process.env.TURNSTILE_SECRET_KEY,
    SUPABASE_URL: !!process.env.SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
  });

  try {
    const body = await req.json();

    // ----------------------------
    // 3) Validate required fields
    // ----------------------------
    if (!body.fullName || !body.email) {
      return NextResponse.json(
        {
          ok: false,
          status: 400,
          stage: "validation",
          message: "fullName and email are required",
        },
        { status: 400 }
      );
    }

    // ----------------------------
    // 4) Turnstile verify BEFORE DB insert
    // ----------------------------
    const token: string | undefined = body.turnstileToken;
    if (!token) {
      return NextResponse.json(
        {
          ok: false,
          status: 400,
          stage: "turnstile",
          message: "Missing Turnstile token.",
        },
        { status: 400 }
      );
    }

    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (!turnstileSecret) {
      return NextResponse.json(
        {
          ok: false,
          status: 500,
          stage: "turnstile",
          message: "TURNSTILE_SECRET_KEY not set.",
        },
        { status: 500 }
      );
    }

    const ip =
      req.headers.get("cf-connecting-ip") ||
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "";

    const form = new URLSearchParams();
    form.append("secret", turnstileSecret);
    form.append("response", token);
    if (ip) form.append("remoteip", ip);

    const verifyRes = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: form.toString(),
      }
    );

    const verifyJson: any = await verifyRes.json().catch(() => ({}));
    if (!verifyJson?.success) {
      return NextResponse.json(
        {
          ok: false,
          status: 403,
          stage: "turnstile",
          message: "Verification failed.",
          details: verifyJson,
        },
        { status: 403 }
      );
    }

    // ----------------------------
    // 5) Insert into Supabase (match your DB column names)
    // ----------------------------
    const payload = {
      full_name: String(body.fullName).trim(),
      email: String(body.email).trim(),
      phone: body.phone ? String(body.phone).trim() : null,
      role_interest: body.track ? String(body.track).trim() : null,
      country: body.country ? String(body.country).trim() : null,
      city: body.city ? String(body.city).trim() : null,
      availability: body.availability ? String(body.availability).trim() : null,
      motivation: body.motivation ? String(body.motivation).trim() : null,
      cv_url: body.cvUrl ? String(body.cvUrl).trim() : null,
    };

    const { data, error } = await supabase
      .from("volunteer_applications")
      .insert(payload)
      .select("id")
      .single();

    if (error) {
      console.error("[volunteer] Supabase insert error:", error);
      return NextResponse.json(
        {
          ok: false,
          status: 500,
          stage: "db_insert",
          message: error.message,
        },
        { status: 500 }
      );
    }

    // ----------------------------
    // 6) Send admin email (Resend test-domain restriction handling)
    // ----------------------------
    const resendAccountEmail = (process.env.RESEND_ACCOUNT_EMAIL || "").trim();
    const adminNotifyEmail = (
      process.env.ADMIN_NOTIFY_EMAIL || resendAccountEmail
    ).trim();

    const from = "LMGHI <onboarding@resend.dev>";
    const usingResendDev = from.includes("@resend.dev");

    if (usingResendDev) {
      if (!resendAccountEmail) {
        return NextResponse.json(
          {
            ok: false,
            status: 403,
            stage: "email_send",
            message:
              "Resend test sender in use. Set RESEND_ACCOUNT_EMAIL on server env.",
          },
          { status: 403 }
        );
      }
      if (adminNotifyEmail !== resendAccountEmail) {
        return NextResponse.json(
          {
            ok: false,
            status: 403,
            stage: "email_send",
            message:
              "Resend sender 'onboarding@resend.dev' can only send to your Resend account email. Ensure ADMIN_NOTIFY_EMAIL matches RESEND_ACCOUNT_EMAIL.",
          },
          { status: 403 }
        );
      }
    }

    if (!adminNotifyEmail) {
      console.warn("[volunteer] No admin email configured; skipping email.");
    } else {
      try {
        await resend.emails.send({
          from,
          to: [adminNotifyEmail],
          subject: "New Volunteer Application — LMGHI",
          text: `New application received:\n\nName: ${payload.full_name}\nEmail: ${payload.email}\nPhone: ${
            payload.phone || "-"
          }\nRole interest: ${
            payload.role_interest || "-"
          }\nCountry: ${payload.country || "-"}\nCity: ${
            payload.city || "-"
          }\nAvailability: ${payload.availability || "-"}\nMotivation: ${
            payload.motivation || "-"
          }\nCV: ${payload.cv_url || "-"}`,
        });
      } catch (e: any) {
        console.error("[volunteer] Resend error:", e?.message || e);
        // Don’t fail the whole request if email fails (DB already has the record)
        return NextResponse.json({
          ok: true,
          status: 200,
          id: data?.id,
          warning: "Saved, but email failed to send.",
        });
      }
    }

    return NextResponse.json({ ok: true, status: 200, id: data?.id });
  } catch (e: any) {
    console.error("[volunteer] API exception:", e?.message || e, e?.stack || "");
    return NextResponse.json(
      {
        ok: false,
        status: 500,
        stage: "exception",
        message: e?.message || String(e),
      },
      { status: 500 }
    );
  }
}
