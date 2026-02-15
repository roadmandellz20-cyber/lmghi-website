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
    problem: "Preventable conditions increase when communities lack consistent education.",
    strategy:
      "Standardized education modules, outreach cadence, and measurable knowledge outcomes.",
    outcomes: ["Knowledge gain indicators", "Coverage targets", "Repeatable delivery playbook"],
  },
  {
    tag: "SCREENING",
    name: "Community Screening Days",
    problem: "Late detection occurs when screening is irregular or poorly tracked.",
    strategy:
      "Screening protocols with standardized data capture, referral logic, and follow-up pathways.",
    outcomes: ["Screening volume", "Risk stratification", "Referral conversion"],
  },
  {
    tag: "NAVIGATION",
    name: "Follow-up & Referral Navigation",
    problem: "Many patients drop off after screening without structured follow-up.",
    strategy:
      "Follow-up workflows with reminders, case tracking, and escalation routes to reduce drop-off.",
    outcomes: ["Follow-up completion rate", "Drop-off reduction", "Time-to-care metrics"],
  },
  {
    tag: "REPORTING",
    name: "Transparent Dashboards & Reporting",
    problem: "Donors cannot fund what they cannot verify.",
    strategy:
      "Audit-ready reporting: standard indicators, cadence, disclosures, and partner dashboards.",
    outcomes: ["Indicator compliance", "Reporting cadence", "Partner visibility"],
  },
];

function TagPill({ children }: { children: React.ReactNode }) {
  return <span className="liquid-btn px-3 py-1 text-xs">{children}</span>;
}

export default function ProgramsPage() {
  return (
    <main className="space-y-14">
      <header className="glass-card glass-pad glass-strong">
        <TagPill>Programs are systems — not events</TagPill>

        <h1 className="mt-6 text-4xl font-extrabold md:text-5xl">Programs</h1>

        <p className="mt-5 max-w-3xl text-lg" style={{ color: "var(--muted)" }}>
          Each program is defined by a clear problem, repeatable delivery strategy,
          measurable outcomes, and a support pathway aligned to governance and reporting.
        </p>

        <nav aria-label="Program actions" className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/impact"
            className="liquid-btn px-6 py-3 font-semibold"
          >
            See reporting standards
          </Link>
          <Link
            href="/get-involved"
            className="liquid-btn px-6 py-3 font-semibold"
            style={{ background: "rgb(16 185 129)", color: "#04130d" }}
          >
            Support a program
          </Link>
        </nav>
      </header>

      <section aria-label="Programs list" className="space-y-6">
        {programs.map((p) => (
          <article key={p.name} className="glass-card glass-pad">
            <header className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold text-emerald-500">{p.tag}</p>
                <h2 className="mt-2 text-2xl font-bold md:text-3xl">{p.name}</h2>
                <p className="mt-3" style={{ color: "var(--muted)" }}>
                  <span className="font-semibold">Problem:</span> {p.problem}
                </p>
                <p className="mt-3" style={{ color: "var(--muted)" }}>
                  <span className="font-semibold">Strategy:</span> {p.strategy}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 md:justify-end">
                <Link href="/impact" className="liquid-btn px-4 py-2 text-sm font-semibold">
                  See outcomes
                </Link>
                <Link
                  href="/get-involved"
                  className="liquid-btn px-4 py-2 text-sm font-semibold"
                  style={{ background: "rgb(16 185 129)", color: "#04130d" }}
                >
                  Support program
                </Link>
              </div>
            </header>

            <section aria-label="Measurable outcomes" className="mt-6">
              <h3 className="text-sm font-semibold">Measurable outcomes</h3>
              <ul className="mt-3 flex flex-wrap gap-3">
                {p.outcomes.map((o) => (
                  <li key={o} className="liquid-btn px-4 py-2 text-xs">
                    {o}
                  </li>
                ))}
              </ul>
            </section>
          </article>
        ))}
      </section>
    </main>
  );
}
