import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Programs | LMGHI",
  description:
    "Structured global health programs with clear problems, strategies, and measurable outcomes.",
};

const programs = [
  {
    tag: "PREVENTION",
    name: "Lifestyle & Health Education",
    problem:
      "Preventable conditions increase when communities lack consistent education.",
  },
  {
    tag: "SCREENING",
    name: "Community Screening Days",
    problem:
      "Late detection occurs when screening is irregular or poorly tracked.",
  },
  {
    tag: "NAVIGATION",
    name: "Follow-up & Referral Navigation",
    problem:
      "Many patients drop off after screening without structured follow-up.",
  },
  {
    tag: "REPORTING",
    name: "Transparent Dashboards & Reporting",
    problem:
      "Donors cannot fund what they cannot verify.",
  },
];

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md">
      {children}
    </div>
  );
}

export default function ProgramsPage() {
  return (
    <div className="space-y-10">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">
          Programs are systems — not events
        </div>
        <h1 className="mt-4 text-4xl font-bold">Programs</h1>
        <p className="mt-3 max-w-3xl text-white/70">
          Each program is defined by a clear problem, repeatable delivery
          strategy, measurable outcomes, and support pathway.
        </p>
      </div>

      <div className="grid gap-4">
        {programs.map((p) => (
          <Card key={p.name}>
            <div className="text-xs text-emerald-200">{p.tag}</div>
            <div className="mt-2 text-xl font-semibold">{p.name}</div>
            <p className="mt-3 text-white/70">{p.problem}</p>

            <div className="mt-4 flex gap-3">
              <Link
                href="/impact"
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
              >
                See outcomes
              </Link>
              <Link
                href="/get-involved"
                className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400"
              >
                Support program
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
