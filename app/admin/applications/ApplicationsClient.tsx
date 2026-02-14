"use client";

import { useEffect, useMemo, useState } from "react";

type AppRow = {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string | null;
  role_interest: string | null;
  country: string | null;
  city: string | null;
  availability: string | null;
  motivation: string | null;
  cv_url: string | null;
  status: "pending" | "reviewed" | "shortlisted" | "rejected" | string;
};

const STATUS_OPTIONS = ["all", "pending", "reviewed", "shortlisted", "rejected"] as const;

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

export default function ApplicationsClient() {
  const [rows, setRows] = useState<AppRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [status, setStatus] = useState<(typeof STATUS_OPTIONS)[number]>("all");
  const [q, setQ] = useState("");

  const filteredCount = useMemo(() => rows.length, [rows]);

  async function load() {
    setLoading(true);
    setErr(null);
    try {
      const params = new URLSearchParams();
      params.set("status", status);
      if (q.trim()) params.set("q", q.trim());

      const res = await fetch(`/api/admin/applications?${params.toString()}`, {
        method: "GET",
        cache: "no-store",
      });
      const data = await res.json();

      if (!res.ok || !data.ok) throw new Error(data?.message || "Failed to load");
      setRows(data.data || []);
    } catch (e: any) {
      setErr(e?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: string, next: AppRow["status"]) {
    // optimistic UI
    const prev = rows;
    setRows((r) => r.map((x) => (x.id === id ? { ...x, status: next } : x)));

    try {
      const res = await fetch("/api/admin/applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: next }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data?.message || "Update failed");
    } catch (e: any) {
      setRows(prev); // revert
      setErr(e?.message || "Update failed");
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            className="w-full sm:w-72 rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-emerald-400/40"
            placeholder="Search name/email…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <select
            className="w-full sm:w-52 rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-emerald-400/40"
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s === "all" ? "All statuses" : s}
              </option>
            ))}
          </select>

          <button
            onClick={load}
            disabled={loading}
            className="rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-black hover:bg-emerald-400 disabled:opacity-60"
          >
            {loading ? "Loading…" : "Refresh"}
          </button>
        </div>

        <div className="text-sm text-white/60">
          Showing: <span className="text-white/80">{filteredCount}</span>
        </div>
      </div>

      {err && (
        <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
          {err}
        </div>
      )}

      <div className="mt-5 overflow-x-auto">
        <table className="min-w-[1000px] w-full text-sm">
          <thead className="text-white/70">
            <tr className="border-b border-white/10">
              <th className="py-3 text-left font-semibold">Submitted</th>
              <th className="py-3 text-left font-semibold">Name</th>
              <th className="py-3 text-left font-semibold">Email</th>
              <th className="py-3 text-left font-semibold">Role</th>
              <th className="py-3 text-left font-semibold">Location</th>
              <th className="py-3 text-left font-semibold">CV</th>
              <th className="py-3 text-left font-semibold">Status</th>
              <th className="py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="text-white/80">
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-white/5 align-top">
                <td className="py-3 pr-4 whitespace-nowrap text-white/60">
                  {formatDate(r.created_at)}
                </td>

                <td className="py-3 pr-4">
                  <div className="font-semibold">{r.full_name || "-"}</div>
                  {r.phone ? <div className="text-white/60">{r.phone}</div> : null}
                </td>

                <td className="py-3 pr-4">
                  <a className="hover:underline" href={`mailto:${r.email}`}>
                    {r.email}
                  </a>
                </td>

                <td className="py-3 pr-4">{r.role_interest || "-"}</td>

                <td className="py-3 pr-4">
                  <div>{r.country || "-"}</div>
                  <div className="text-white/60">{r.city || ""}</div>
                </td>

                <td className="py-3 pr-4">
                  {r.cv_url ? (
                    <a
                      href={r.cv_url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 hover:bg-white/10 inline-block"
                    >
                      Open CV
                    </a>
                  ) : (
                    <span className="text-white/50">—</span>
                  )}
                </td>

                <td className="py-3 pr-4">
                  <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs">
                    {r.status || "pending"}
                  </span>
                </td>

                <td className="py-3 pr-4">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => updateStatus(r.id, "reviewed")}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 hover:bg-white/10"
                    >
                      Reviewed
                    </button>
                    <button
                      onClick={() => updateStatus(r.id, "shortlisted")}
                      className="rounded-lg border border-emerald-400/20 bg-emerald-500/10 px-3 py-1.5 hover:bg-emerald-500/20"
                    >
                      Shortlist
                    </button>
                    <button
                      onClick={() => updateStatus(r.id, "rejected")}
                      className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1.5 hover:bg-red-500/20"
                    >
                      Reject
                    </button>
                  </div>

                  {r.motivation ? (
                    <details className="mt-2 text-white/70">
                      <summary className="cursor-pointer select-none text-white/60 hover:text-white/80">
                        Motivation
                      </summary>
                      <div className="mt-2 rounded-xl border border-white/10 bg-white/5 p-3">
                        {r.motivation}
                      </div>
                    </details>
                  ) : null}
                </td>
              </tr>
            ))}

            {!loading && rows.length === 0 && (
              <tr>
                <td colSpan={8} className="py-10 text-center text-white/60">
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
