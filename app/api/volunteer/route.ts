import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY!);

function getHostnameFromReq(req: Request) {
  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");

  const raw = origin || referer || "";
  if (!raw) return "";

  try {
    const url = new URL(raw);
    return url.hostname; // clean hostname only
  } catch {
    // If raw isn't a full URL, fallback
    return "";
  }
}

function corsHeadersForOrigin(origin: string | null) {
  // If Origin exists, echo it back (only after we validate it)
  return {
    "Access-Control-Allow-Origin": origin ?? "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function isAllowedHost(hostname: string) {
  if (!hostname) return true; // allow server-to-server / no-origin calls

  // local dev
  if (hostname === "localhost" || hostname === "127.0.0.1") return true;

  // production vercel domain
  if (hostname === "lmghi-website.vercel.app") return true;

  // any Vercel preview deployment
  if (hostname.endsWith(".vercel.app")) return true;

  return false;
}

async function verifyTurnstile(token: string, remoteip?: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // If you haven't set the secret in env, don't hard-crash production silently
    return { ok: false, message: "TURNSTILE_SECRET_KEY is not set on the server." };
  }

  const formData = new FormData();
  formData.append("secret", secret);
  formData.append("response", token);
  if (remoteip) formData.append("remoteip", remoteip);

  const resp = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: formData,
  });

  const data = await resp.json();
  // data.success boolean
  if (!data?.success) {
    return { ok: false, message: "Turnstile verification failed.", details: data };
  }
  return { ok: true };
}

export async function OPTIONS(req: Request) {
  const origin = req.headers.get("origin");
  const hostname = getHostnameFromReq(req);

  if (!isAllowedHost(hostname)) {
    return NextResponse.json(
      { ok: false, status: 403, stage: "origin_check", message: `Forbidden origin host: ${hostname}` },
      { status: 403 }
    );
  }

  return new NextResponse(null, {
    status: 204,
    headers: corsHeadersForOrigin(origin),
  });
}

export async function POST(req: Request) {
  const origin = req.headers.get("origin");
  const hostname = getHostnameFromReq(req);

  // ---- Origin allowlist ----
  if (!isAllowedHost(hostname)) {
    return NextResponse.json(
      { ok: false, status: 403, stage: "origin_check", message: `Forbidden origin: ${origin || hostname}` },
      { status: 403, headers: corsHeadersForOrigin(origin) }
    );
  }

  try {
    const body = await req.json();

    // ---- Turnstile check ----
    const turnstileToken = body?.turnstileToken;
    if (!turnstileToken) {
      return NextResponse.json(
        { ok: false, status: 400, stage: "turnstile", message: "Missing Turnstile token." },
        { status: 400, headers: corsHeadersForOrigin(origin) }
      );
    }

    const verify = await verifyTurnstile(turnstileToken);
    if (!verify.ok) {
      return NextResponse.json(
        { ok: false, status: 400, stage: "turnstile", message: verify.message, details: (verify as any).details ?? null },
        { status: 400, headers: corsHeadersForOrigin(origin) }
      );
    }

    // ---- Basic validation ----
    if (!body.fullName || !body.email) {
      return NextResponse.json(
        { ok: false, status: 400, stage: "validation", message: "fullName and email are required" },
        { status: 400, headers: corsHeadersForOrigin(origin) }
      );
    }

    // ---- DB payload (matches your column names) ----
    const payload = {
      full_name: body.fullName,
      email: body.email,
      phone: body.phone ?? null,
      role_interest: body.track ?? null,
      country: body.country ?? null,
      city: body.city ?? null,
      availability: body.availability ?? null,
      motivation: body.motivation ?? null,
      cv_url: body.cvUrl ?? null,
    };

    const { data, error } = await supabase
      .from("volunteer_applications")
      .insert(payload)
      .select("id")
      .single();

    if (error) {
      return NextResponse.json(
        { ok: false, status: 500, stage: "db_insert", message: error.message },
        { status: 500, headers: corsHeadersForOrigin(origin) }
      );
    }

    // ---- Email notification (Resend test-domain rules) ----
    const adminNotifyEmail = process.env.ADMIN_NOTIFY_EMAIL || "";
    const resendAccountEmail = process.env.RESEND_ACCOUNT_EMAIL || "";
    const from = "LMGHI <onboarding@resend.dev>";

    const isResendDev = from.includes("@resend.dev");
    if (isResendDev) {
      if (!resendAccountEmail || adminNotifyEmail !== resendAccountEmail) {
        return NextResponse.json(
          {
            ok: false,
            status: 403,
            stage: "email_send",
            message:
              "Resend test sender can only send to your Resend account email. Set RESEND_ACCOUNT_EMAIL and make ADMIN_NOTIFY_EMAIL match it.",
          },
          { status: 403, headers: corsHeadersForOrigin(origin) }
        );
      }
    }

    if (adminNotifyEmail) {
      await resend.emails.send({
        from,
        to: [adminNotifyEmail],
        subject: "New Volunteer Application — LMGHI",
        text: `New application received:\n\nName: ${body.fullName}\nEmail: ${body.email}\nPhone: ${body.phone || "-"}\nTrack: ${body.track || "-"}\nCountry: ${body.country || "-"}\nCity: ${body.city || "-"}\nAvailability: ${body.availability || "-"}\nMotivation: ${body.motivation || "-"}\nCV: ${body.cvUrl || "-"}`,
      });
    }

    return NextResponse.json(
      { ok: true, status: 200, id: data?.id },
      { status: 200, headers: corsHeadersForOrigin(origin) }
    );
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, status: 500, stage: "exception", message: e?.message || "Server error" },
      { status: 500, headers: corsHeadersForOrigin(origin) }
    );
  }
}
