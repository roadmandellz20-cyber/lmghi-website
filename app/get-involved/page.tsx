"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

type FormState = {
  full_name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  role_interest: string;
  availability: string;
  motivation: string;
};

const tracks = [
  "Community Outreach",
  "Data Collection",
  "Program Support",
  "Clinical Support",
  "Media / Communications",
];

function TagPill({ children }: { children: React.ReactNode }) {
  return <span className="liquid-btn px-3 py-1 text-xs">{children}</span>;
}

export default function GetInvolvedPage() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);

  const [form, setForm] = useState<FormState>({
    full_name: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    role_interest: tracks[0],
    availability: "",
    motivation: "",
  });

  const onChange = (k: keyof FormState, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setDone(null);
    setLoading(true);

    try {
      // 1) Upload CV (optional)
      let cv_url: string | null = null;

      if (cvFile) {
        const safeName = cvFile.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const path = `volunteers/${Date.now()}_${safeName}`;

        const { error: upErr } = await supabase.storage
          .from("cv_uploads")
          .upload(path, cvFile, { upsert: false });

        if (upErr) throw new Error(`CV upload failed: ${upErr.message}`);

        const { data } = supabase.storage.from("cv_uploads").getPublicUrl(path);
        cv_url = data.publicUrl;
      }

      // 2) Send to server (server writes to DB + emails admins)
      const res = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.full_name,
          email: form.email,
          phone: form.phone,
          track: form.role_interest,
          country: form.country,
          city: form.city,
          availability: form.availability,
          motivation: form.motivation,
          cvUrl: cv_url,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data?.message || data?.error || "Submission failed.");
      }

      setDone("Application submitted. LMGHI will contact you if shortlisted.");
      setForm({
        full_name: "",
        email: "",
        phone: "",
        country: "",
        city: "",
        role_interest: tracks[0],
        availability: "",
        motivation: "",
      });
      setCvFile(null);
    } catch (err: any) {
      setError(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="space-y-14">
      <header className="glass-card glass-pad glass-strong">
        <TagPill>Donate • Partner • Volunteer</TagPill>

        <h1 className="mt-6 text-4xl font-extrabold md:text-5xl">
          Get involved
        </h1>

        <p className="mt-5 max-w-3xl text-lg" style={{ color: "var(--muted)" }}>
          Choose a structured pathway. Volunteer applications are reviewed under defined roles,
          ethics, safeguarding principles, and reporting standards.
        </p>

        <nav className="mt-8 flex flex-wrap gap-3" aria-label="Get involved actions">
          <Link href="/impact" className="liquid-btn px-6 py-3 font-semibold">
            Transparency standards
          </Link>

          <Link
            href="/contact"
            className="liquid-btn px-6 py-3 font-semibold"
            style={{ background: "rgb(16 185 129)", color: "#04130d" }}
          >
            Partnership inquiry
          </Link>
        </nav>
      </header>

      <section className="grid glass-grid md:grid-cols-2" aria-label="Engagement pathways">
        {/* Volunteer form */}
        <section className="glass-card glass-pad" aria-labelledby="volunteer-application">
          <header>
            <h2 id="volunteer-application" className="text-2xl font-bold">
              Volunteer application
            </h2>
            <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
              Submit your details and optional CV. You will receive a response if shortlisted.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid glass-grid md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold" htmlFor="full_name">
                  Full name <span className="text-emerald-500">*</span>
                </label>
                <input
                  id="full_name"
                  className="glass-input"
                  placeholder="Your full name"
                  value={form.full_name}
                  onChange={(e) => onChange("full_name", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold" htmlFor="email">
                  Email <span className="text-emerald-500">*</span>
                </label>
                <input
                  id="email"
                  className="glass-input"
                  placeholder="you@example.com"
                  type="email"
                  value={form.email}
                  onChange={(e) => onChange("email", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid glass-grid md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold" htmlFor="phone">
                  Phone (optional)
                </label>
                <input
                  id="phone"
                  className="glass-input"
                  placeholder="+220..."
                  value={form.phone}
                  onChange={(e) => onChange("phone", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold" htmlFor="role_interest">
                  Role interest
                </label>
                <select
                  id="role_interest"
                  className="glass-input"
                  value={form.role_interest}
                  onChange={(e) => onChange("role_interest", e.target.value)}
                >
                  {tracks.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid glass-grid md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold" htmlFor="country">
                  Country
                </label>
                <input
                  id="country"
                  className="glass-input"
                  placeholder="Country"
                  value={form.country}
                  onChange={(e) => onChange("country", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold" htmlFor="city">
                  City
                </label>
                <input
                  id="city"
                  className="glass-input"
                  placeholder="City"
                  value={form.city}
                  onChange={(e) => onChange("city", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold" htmlFor="availability">
                Availability
              </label>
              <input
                id="availability"
                className="glass-input"
                placeholder="e.g., weekends, evenings"
                value={form.availability}
                onChange={(e) => onChange("availability", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold" htmlFor="motivation">
                Motivation
              </label>
              <textarea
                id="motivation"
                className="glass-input"
                placeholder="Why do you want to volunteer with LMGHI?"
                rows={5}
                value={form.motivation}
                onChange={(e) => onChange("motivation", e.target.value)}
              />
            </div>

            <section className="glass-card glass-pad" aria-label="CV upload">
              <p className="text-sm font-semibold">Upload CV (optional)</p>
              <p className="mt-1 text-xs" style={{ color: "var(--muted)" }}>
                PDF recommended. Stored securely in our CV uploads bucket.
              </p>

              <input
                className="mt-3 block w-full text-sm"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setCvFile(e.target.files?.[0] ?? null)}
              />
            </section>

            {error && (
              <div className="glass-card glass-pad" style={{ borderColor: "rgba(239,68,68,0.35)" }}>
                <p className="text-sm" style={{ color: "rgba(239,68,68,0.95)" }}>
                  {error}
                </p>
              </div>
            )}

            {done && (
              <div className="glass-card glass-pad" style={{ borderColor: "rgba(16,185,129,0.35)" }}>
                <p className="text-sm" style={{ color: "rgba(16,185,129,0.95)" }}>
                  {done}
                </p>
              </div>
            )}

            <button
              disabled={loading}
              className="liquid-btn w-full px-6 py-3 font-semibold"
              style={{ background: "rgb(16 185 129)", color: "#04130d", opacity: loading ? 0.75 : 1 }}
              type="submit"
            >
              {loading ? "Submitting..." : "Submit application"}
            </button>
          </form>
        </section>

        {/* Partner / Donate */}
        <section className="glass-card glass-pad" aria-labelledby="partner-donate">
          <header>
            <h2 id="partner-donate" className="text-2xl font-bold">
              Partner / Donate
            </h2>
            <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
              Partnership and donor pathways are structured around measurable outcomes and
              transparent reporting.
            </p>
          </header>

          <div className="mt-6 space-y-3">
            <article className="glass-card glass-pad">
              <h3 className="text-sm font-semibold">Impact &amp; Transparency</h3>
              <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
                See reporting standards, disclosure commitments, and audit readiness.
              </p>
              <div className="mt-4">
                <Link href="/impact" className="liquid-btn inline-block px-4 py-2 text-sm font-semibold">
                  View Impact
                </Link>
              </div>
            </article>

            <article className="glass-card glass-pad">
              <h3 className="text-sm font-semibold">Partnership inquiry</h3>
              <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
                Government, NGO, and institutional deployment discussions.
              </p>
              <div className="mt-4">
                <Link
                  href="/contact"
                  className="liquid-btn inline-block px-4 py-2 text-sm font-semibold"
                  style={{ background: "rgb(16 185 129)", color: "#04130d" }}
                >
                  Contact team
                </Link>
              </div>
            </article>

            <article className="glass-card glass-pad">
              <h3 className="text-sm font-semibold">Volunteer roles</h3>
              <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
                Community outreach, data collection, program support, clinical support, media.
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {tracks.map((t) => (
                  <li key={t} className="liquid-btn px-3 py-1 text-xs">
                    {t}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>
      </section>
    </main>
  );
}
