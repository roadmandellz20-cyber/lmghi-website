// app/programs/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Programs | LMGHI",
  description:
    "Structured programs with clear problems, delivery strategy, measurable outcomes, and support pathways—built for scalable global health delivery.",
};

type Program = {
  name: string;
  problem: string;
  strategy: string[];
  outcomes: string[];
  support: { label: string; href: string };
  tag: string;
};

const programs: Program[] = [
  {
    tag: "PREVENTION",
    name: "Lifestyle & Health Education",
    problem:
      "Preventable conditions increase when communities lack consistent education, early risk awareness, and behavior-support systems.",
    strategy: [
      "Standardized curriculum and community sessions",
      "Risk-factor education + early action pathways",
      "Local facilitator training with repeatable playbooks",
      "Feedback loops to refine delivery by region",
    ],
    outcomes: [
      "Attendance and coverage by location",
      "Knowledge lift (pre/post checks)",
      "Referral conversions to screening days",
      "Repeat participation retention",
    ],
    support: { label: "Fund prevention delivery", href: "/donate" },
  },
  {
    tag: "SCREENING",
    name: "Community Screening Days",
    problem:
      "Late detection leads to avoidable complications when screening is irregular, poorly tracked, or disconnected from follow-up.",
    strategy: [
      "Standardized intake + consent workflow",
      "Capture, classify, and document results consistently",
      "Clear escalation thresholds and referral triggers",
      "Monthly reporting cadence (baseline)",
    ],
    outcomes: [
      "Screenings completed and coverage rate",
      "Positive findings rate (by category)",
      "Follow-up scheduled within timeframe",
      "Cost per screening signal",
    ],
    support: { label: "Support screening logistics", href: "/donate" },
  },
  {
    tag: "NAVIGATION",
    name: "Follow-up & Referral Navigation",
    problem:
      "Screening without structured follow-up creates drop-offs—people get identified but never reach care or complete referrals.",
    strategy: [
      "Assign ownership for each follow-up case",
      "Referral documentation + facility routing",
      "Reminder workflows and status tracking",
      "Verification checks for completion",
    ],
    outcomes: [
      "Follow-up completion rate",
      "Referral success rate",
      "Time-to-follow-up (median)",
      "Drop-off reasons (categorized)",
    ],
    support: { label: "Back follow-up capacity", href: "/donate" },
  },
  {
    tag: "REPORTING",
    name: "Transparent Dashboards & Reporting",
    problem:
      "Donors and partners can’t fund what they can’t verify—impact must be measurable, comparable, and auditable.",
    strategy: [
      "Standard indicators and definitions",
      "Partner-grade reporting templates",
      "Monthly/quarterly summaries and disclosures",
      "Audit-ready documentation trails",
    ],
    outcomes: [
      "Report completeness score",
      "Indicator consistency across sites",
      "Partner review checkpoint pass-rate",
      "Public disclosure cadence adherence",
    ],
    support: { label: "Support transparency systems", href: "/impact" },
  },
];

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-md",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

export default function ProgramsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* top glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(650px_320px_at_25%_20%,rgba(16,185,129,0.16),transparent_70%)]" />

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-20 pt-10 md:pt-14">
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Programs are systems — not events
          </div>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            Programs
          </h1>
          <p className="mt-3 max-w-3xl text-base text-white/70 md:text-lg">
            Each program is defined by a clear problem statement, a repeatable delivery strategy,
            measurable outcomes, and a support pathway. That’s how we scale responsibly.
          </p>
        </div>

        {/* How programs are structured */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold">Program structure</h2>
          <p className="mt-2 max-w-3xl text-sm text-white/70">
            LMGHI programs are built like operational infrastructure: standardized workflows,
            ownership, reporting, and measurement—so partners can fund outcomes, not guesswork.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-emerald-200/90">1) PROBLEM</div>
              <div className="mt-2 text-sm text-white/70">
                What’s broken, and why it matters.
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-emerald-200/90">2) STRATEGY</div>
              <div className="mt-2 text-sm text-white/70">
                Repeatable workflow and delivery steps.
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-emerald-200/90">3) OUTCOMES</div>
              <div className="mt-2 text-sm text-white/70">
                Indicators tracked consistently over time.
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-emerald-200/90">4) SUPPORT</div>
              <div className="mt-2 text-sm text-white/70">
                Clear donor/partner entry point.
              </div>
            </div>
          </div>
        </Card>

        {/* Program cards */}
        <div className="mt-6 grid gap-4">
          {programs.map((p) => (
            <Card key={p.name} className="p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="max-w-3xl">
                  <div className="text-xs text-emerald-200/90">{p.tag}</div>
                  <h3 className="mt-2 text-2xl font-semibold">{p.name}</h3>

                  <div className="mt-4">
                    <div className="text-sm font-semibold">The problem</div>
                    <p className="mt-2 text-sm text-white/70">{p.problem}</p>
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="text-sm font-semibold">Strategy</div>
                      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/70">
                        {p.strategy.map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="text-sm font-semibold">Measured outcomes</div>
                      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/70">
                        {p.outcomes.map((o) => (
                          <li key={o}>{o}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-[280px]">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className="text-sm font-semibold">Support this program</div>
                    <p className="mt-2 text-sm text-white/65">
                      Fund delivery capacity, reporting integrity, and measurable outcomes.
                    </p>

                    <div className="mt-4 flex flex-col gap-2">
                      <Link
                        href={p.support.href}
                        className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-4 py-3 text-sm font-semibold text-black transition hover:bg-emerald-400"
                      >
                        {p.support.label}
                      </Link>

                      <Link
                        href="/get-involved"
                        className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/10"
                      >
                        Partner / Volunteer
                      </Link>
                    </div>

                    <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-3 text-xs text-white/60">
                      Programs are designed to scale across regions with consistent standards.
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA strip */}
        <div className="mt-6">
          <Card className="p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-xs text-emerald-200/90">NEXT</div>
                <div className="mt-2 text-lg font-semibold">
                  Want to see how we prove impact and protect accountability?
                </div>
                <p className="mt-2 max-w-3xl text-sm text-white/70">
                  Go to Impact & Transparency for reporting standards, disclosure commitments, and audit readiness.
                </p>
              </div>
              <Link
                href="/impact"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/10"
              >
                View Impact & Transparency
              </Link>
            </div>
          </Card>
        </div>

        {/* Footer microline */}
        <div className="mt-10 flex items-center justify-between gap-4 text-xs text-white/45">
          <div>© {new Date().getFullYear()} LMGHI. All rights reserved.</div>
          <div className="hidden sm:block">
            Structured • Governed • Data-driven • Accountable • Scalable
          </div>
        </div>
      </div>
    </main>
  );
}
