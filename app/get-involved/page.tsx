"use client";

import { useState } from "react";
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
    role_interest: "Community Outreach",
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
        body: JSON.stringify({ ...form, cv_url }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data?.error || "Submission failed.");
      }

      setDone("Application submitted. LMGHI will contact you if shortlisted.");
      setForm({
        full_name: "",
        email: "",
        phone: "",
        country: "",
        city: "",
        role_interest: "Community Outreach",
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
    <div className="space-y-10">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">
          Donate • Partner • Volunteer
        </div>
        <h1 className="mt-4 text-4xl font-bold">Get Involved</h1>
        <p className="mt-3 max-w-3xl text-white/70">
          Choose a structured pathway. Volunteer applications are tracked and reviewed under
          defined roles and reporting standards.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md">
          <h2 className="text-xl font-semibold">Volunteer application</h2>
          <p className="mt-2 text-sm text-white/70">
            Submit your details and (optional) CV. You’ll receive a response if shortlisted.
          </p>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div className="grid gap-3 md:grid-cols-2">
              <input
                className="w-full rounded-xl border border-white/10 bg-white/5 p-4 outline-none focus:border-emerald-400/40"
                placeholder="Full name *"
                value={form.full_name}
                onChange={(e) => onChange("full_name", e.target.value)}
                required
              />
              <input
                className="w-full rounded-xl border border-white/10 bg-white/5 p-4 outline-none focus:border-emerald-400/40"
                placeholder="Email *"
                type="email"
                value={form.email}
                onChange={(e) => onChange("email", e.target.value)}
                required
              />
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <input
                className="w-full rounded-xl border border-white/10 bg-white/5 p-4 outline-none focus:border-emerald-400/40"
                placeholder="Phone (optional)"
                value={form.phone}
                onChange={(e) => onChange("phone", e.target.value)}
              />
              <select
                className="w-full rounded-xl border border-white/10 bg-white/5 p-4 outline-none focus:border-emerald-400/40"
                value={form.role_interest}
                onChange={(e) => onChange("role_interest", e.target.value)}
              >
                <option>Community Outreach</option>
                <option>Data Collection</option>
                <option>Program Support</option>
                <option>Clinical Support</option>
                <option>Media / Communications</option>
              </select>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <input
                className="w-full rounded-xl border border-white/10 bg-white/5 p-4 outline-none focus:border-emerald-400/40"
                placeholder="Country"
                value={form.country}
                onChange={(e) => onChange("country", e.target.value)}
              />
              <input
                className="w-full rounded-xl border border-white/10 bg-white/5 p-4 outline-none focus:border-emerald-400/40"
                placeholder="City"
                value={form.city}
                onChange={(e) => onChange("city", e.target.value)}
              />
            </div>

            <input
              className="w-full rounded-xl border border-white/10 bg-white/5 p-4 outline-none focus:border-emerald-400/40"
              placeholder="Availability (e.g., weekends, evenings)"
              value={form.availability}
              onChange={(e) => onChange("availability", e.target.value)}
            />

            <textarea
              className="w-full rounded-xl border border-white/10 bg-white/5 p-4 outline-none focus:border-emerald-400/40"
              placeholder="Why do you want to volunteer with LMGHI?"
              rows={5}
              value={form.motivation}
              onChange={(e) => onChange("motivation", e.target.value)}
            />

            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm font-semibold">Upload CV (optional)</div>
              <div className="mt-2 text-xs text-white/60">
                PDF recommended. This will be stored in our CV uploads bucket.
              </div>
              <input
                className="mt-3 block w-full text-sm text-white/70"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setCvFile(e.target.files?.[0] ?? null)}
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
                {error}
              </div>
            )}
            {done && (
              <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm text-emerald-100">
                {done}
              </div>
            )}

            <button
              disabled={loading}
              className="w-full rounded-full bg-emerald-500 px-6 py-3 font-semibold text-black hover:bg-emerald-400 disabled:opacity-60"
              type="submit"
            >
              {loading ? "Submitting..." : "Submit application"}
            </button>
          </form>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md">
          <h2 className="text-xl font-semibold">Partner / Donate</h2>
          <p className="mt-2 text-sm text-white/70">
            Partner deployments and donation systems are next. We’ll connect verified workflows and
            transparency reporting to every support pathway.
          </p>

          <div className="mt-5 space-y-3">
            <a
              href="/impact"
              className="block rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10"
            >
              <div className="font-semibold">Impact & Transparency</div>
              <div className="text-sm text-white/60">
                See reporting standards, disclosure, and audit readiness.
              </div>
            </a>

            <a
              href="/contact"
              className="block rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10"
            >
              <div className="font-semibold">Partnership inquiry</div>
              <div className="text-sm text-white/60">
                Government, NGO, and institutional deployment discussions.
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
