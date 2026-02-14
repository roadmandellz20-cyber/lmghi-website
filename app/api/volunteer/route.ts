import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

function must(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

export async function POST(req: Request) {
  try {
    const SUPABASE_URL = must("NEXT_PUBLIC_SUPABASE_URL");
    const SERVICE_ROLE = must("SUPABASE_SERVICE_ROLE_KEY");
    const ADMIN_EMAIL_1 = must("ADMIN_EMAIL_1");
    const ADMIN_EMAIL_2 = must("ADMIN_EMAIL_2");

    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);

    const body = await req.json();

    // Basic validation
    const full_name = String(body.full_name || "").trim();
    const email = String(body.email || "").trim();
    const role_interest = String(body.role_interest || "").trim();

    if (!full_name || !email || !role_interest) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Insert into DB
    const { error: insErr } = await supabase
      .from("volunteer_applications")
      .insert({
        full_name,
        email,
        phone: body.phone || null,
        country: body.country || null,
        city: body.city || null,
        role_interest,
        availability: body.availability || null,
        motivation: body.motivation || null,
        cv_url: body.cv_url || null,
        status: "new",
      });

    if (insErr) {
      return NextResponse.json(
        { ok: false, error: insErr.message },
        { status: 500 }
      );
    }

    // Email admins
    const adminHtml = `
      <div style="font-family:Arial,sans-serif;line-height:1.5">
        <h2>New Volunteer Application — LMGHI</h2>
        <p><b>Name:</b> ${escapeHtml(full_name)}</p>
        <p><b>Email:</b> ${escapeHtml(email)}</p>
        <p><b>Phone:</b> ${escapeHtml(body.phone || "-")}</p>
        <p><b>Location:</b> ${escapeHtml([body.city, body.country].filter(Boolean).join(", ") || "-")}</p>
        <p><b>Role interest:</b> ${escapeHtml(role_interest)}</p>
        <p><b>Availability:</b> ${escapeHtml(body.availability || "-")}</p>
        <p><b>Motivation:</b><br/>${escapeHtml(body.motivation || "-").replace(/\n/g, "<br/>")}</p>
        <p><b>CV:</b> ${
          body.cv_url
            ? `<a href="${escapeAttr(body.cv_url)}" target="_blank">View CV</a>`
            : "Not provided"
        }</p>
        <hr/>
        <p style="color:#666">Sent automatically from LMGHI website.</p>
      </div>
    `;

    await resend.emails.send({
      from: "LMGHI <onboarding@resend.dev>",
      to: [ADMIN_EMAIL_1, ADMIN_EMAIL_2],
      subject: `New volunteer application: ${full_name} — ${role_interest}`,
      html: adminHtml,
    });

    // Optional: email applicant confirmation
    await resend.emails.send({
      from: "LMGHI <onboarding@resend.dev>",
      to: [email],
      subject: "We received your volunteer application — LMGHI",
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.5">
          <h2>Application received</h2>
          <p>Hi ${escapeHtml(full_name)},</p>
          <p>We've received your volunteer application for <b>${escapeHtml(
            role_interest
          )}</b>.</p>
          <p>If shortlisted, LMGHI will contact you using this email address.</p>
          <p style="color:#666">— LMGHI Team</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Server error" },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(str: string) {
  // minimal for href attribute
  return escapeHtml(str).replaceAll("`", "&#096;");
}
