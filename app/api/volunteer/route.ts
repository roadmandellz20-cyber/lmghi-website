import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export const runtime = "nodejs"; // IMPORTANT: ensures Node runtime on Vercel

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // server-only
);

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ✅ Make sure we actually got an email
    const applicantEmail = body.email || body.applicantEmail;
    if (!applicantEmail) {
      return NextResponse.json(
        { ok: false, error: "Missing applicant email in request payload." },
        { status: 400 }
      );
    }

    // 1) Save to DB
    const { data, error: dbError } = await supabase
      .from("volunteers")
      .insert([
        {
          full_name: body.fullName ?? body.full_name ?? null,
          email: applicantEmail,
          phone: body.phone ?? null,
          track: body.track ?? null,
          country: body.country ?? null,
          city: body.city ?? null,
          availability: body.availability ?? null,
          motivation: body.motivation ?? body.why ?? null,
          cv_url: body.cvUrl ?? null,
        },
      ])
      .select()
      .single();

    if (dbError) {
      console.error("DB insert error:", dbError);
      return NextResponse.json(
        { ok: false, error: "Database insert failed.", details: dbError.message },
        { status: 500 }
      );
    }

    // 2) Send email (admin notification + optional applicant confirmation)
    const FROM = process.env.MAIL_FROM || "LMGHI <onboarding@resend.dev>";
    const ADMIN_TO = process.env.ADMIN_NOTIFY_EMAIL;

    if (!ADMIN_TO) {
      return NextResponse.json(
        { ok: false, error: "Missing ADMIN_NOTIFY_EMAIL env var." },
        { status: 500 }
      );
    }

    // Admin notification
    const adminSend = await resend.emails.send({
      from: FROM,
      to: ADMIN_TO,
      subject: `New volunteer application: ${applicantEmail}`,
      html: `
        <h2>New Volunteer Application</h2>
        <p><b>Name:</b> ${body.fullName ?? body.full_name ?? "—"}</p>
        <p><b>Email:</b> ${applicantEmail}</p>
        <p><b>Track:</b> ${body.track ?? "—"}</p>
        <p><b>Country/City:</b> ${body.country ?? "—"} / ${body.city ?? "—"}</p>
        <p><b>Availability:</b> ${body.availability ?? "—"}</p>
        <p><b>Motivation:</b><br/>${(body.motivation ?? body.why ?? "—")
          .toString()
          .replace(/\n/g, "<br/>")}</p>
        <hr/>
        <p><b>DB Row ID:</b> ${data.id ?? "—"}</p>
      `,
    });

    if (adminSend.error) {
      console.error("Resend admin email failed:", adminSend.error);
      return NextResponse.json(
        { ok: false, error: "Admin email failed.", details: adminSend.error },
        { status: 500 }
      );
    }

    // Applicant confirmation (optional but recommended)
    const applicantSend = await resend.emails.send({
      from: FROM,
      to: applicantEmail,
      subject: "LMGHI — Application received",
      html: `
        <p>Thanks for applying to volunteer with LMGHI.</p>
        <p>We’ve received your application and will contact you if you’re shortlisted.</p>
        <p style="color:#666;font-size:12px;">This is an automated confirmation.</p>
      `,
    });

    if (applicantSend.error) {
      console.error("Resend applicant email failed:", applicantSend.error);
      // Don't fail the whole request — admin already got it
      return NextResponse.json({
        ok: true,
        warning: "Applicant confirmation email failed.",
        applicantEmail,
        id: data.id,
      });
    }

    return NextResponse.json({ ok: true, applicantEmail, id: data.id });
  } catch (err: any) {
    console.error("API route crashed:", err);
    return NextResponse.json(
      { ok: false, error: "Server error.", details: err?.message ?? String(err) },
      { status: 500 }
    );
  }
}
