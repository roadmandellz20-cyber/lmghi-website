// app/impact/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impact & Transparency | LMGHI",
  description:
    "LMGHI publishes measurable outcomes, monitoring & evaluation standards, and transparency commitments to support accountable, scalable global health delivery.",
};

type Metric = { label: string; value: string; sub: string };
type Report = { title: string; desc: string; href: string; tag: string };

const metrics: Metric[] = [
  { label: "People reached", value: "12,480+", sub: "Across community delivery sites" },
  { label: "Follow-up completion", value: "78%", sub: "Documented follow-up outcomes" },
  { label: "Cost reduction", value: "34%", sub: "Cost per screening (pilot model)" },
];

const reports: Report[] = [
  {
    title: "Annual Report (Placeholder)",
    desc: "Program footprint, outcomes, governance updates, and strategic priorities.",
    href: "/reports/lmghi-annual-report.pdf",
    tag: "REPORT",
  },
  {
    title: "Program Brief (Placeholder)",
    desc: "Delivery model, workflow, indicators, and implementation approach.",
    href: "/reports/lmghi-program-brief.pdf",
    tag: "BRIEF",
  },
  {
    title: "Financial Summary (Placeholder)",
    desc: "Budget structure, allocation principles, and disclosure commitments.",
    href: "/reports/lmghi-financial-summary.pdf",
    tag: "FINANCE",
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
        "rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_0_0_1px_rgba(255,255,255,0.03)]",
        "backdrop-blur-md",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

export default function ImpactPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* top glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(600px_300px_at_20%_20%,rgba(16,185,129,0.18),transparent_70%)]" />

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-20 pt-10 md:pt-14">
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Evidence • Reporting • Accountability
          </div>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            Impact & Transparency
          </h1>
          <p className="mt-3 max-w-3xl text-base text-white/70 md:text-lg">
            LMGHI is built as institutional infrastructure—measured, governed, and auditable.
            This page outlines how we track outcomes, report performance, and maintain donor- and
            partner-grade transparency.
          </p>
        </div>

        {/* Metrics */}
        <div className="grid gap-4 md:grid-cols-3">
          {metrics.map((m) => (
            <Card key={m.label} className="p-5">
              <div className="text-sm text-white/60">{m.label}</div>
              <div className="mt-2 text-3xl font-semibold">{m.value}</div>
              <div className="mt-2 text-sm text-white/55">{m.sub}</div>
            </Card>
          ))}
        </div>

        {/* M&E Framework */}
        <div className="mt-6">
          <Card className="p-6">
            <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-xl font-semibold">Monitoring & Evaluation Framework</h2>
                <p className="mt-2 max-w-3xl text-sm text-white/70">
                  We use standardized indicators, structured data capture, and reporting pipelines so
                  programs remain measurable, comparable, and scalable across regions.
                </p>
              </div>
              <div className="mt-3 inline-flex w-fit items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 md:mt-0">
                Partner-grade reporting
              </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <Card className="p-5">
                <div className="text-xs text-emerald-200/90">INDICATORS</div>
                <div className="mt-2 font-semibold">Standardized outcomes</div>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/65">
                  <li>Coverage & reach</li>
                  <li>Follow-up completion</li>
                  <li>Referral success</li>
                  <li>Cost efficiency signals</li>
                </ul>
              </Card>

              <Card className="p-5">
                <div className="text-xs text-emerald-200/90">PIPELINE</div>
                <div className="mt-2 font-semibold">Structured reporting flow</div>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/65">
                  <li>Intake → screening → referrals</li>
                  <li>Ownership assignments for follow-up</li>
                  <li>Verification checks & completeness</li>
                  <li>Monthly reporting cadence (baseline)</li>
                </ul>
              </Card>

              <Card className="p-5">
                <div className="text-xs text-emerald-200/90">AUDIT READINESS</div>
                <div className="mt-2 font-semibold">Traceable evidence</div>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/65">
                  <li>Documented workflows & SOPs</li>
                  <li>Data definitions & versioning</li>
                  <li>Consent + privacy handling</li>
                  <li>Partner review checkpoints</li>
                </ul>
              </Card>
            </div>
          </Card>
        </div>

        {/* Financial Transparency */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-xl font-semibold">Financial Transparency</h2>
            <p className="mt-2 text-sm text-white/70">
              Donor confidence depends on clarity. We commit to clear allocation logic, disclosure,
              and audit pathways as we scale.
            </p>

            <div className="mt-5 grid gap-3">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-white/55">Allocation principle</div>
                <div className="mt-1 font-semibold">Program-first budgeting</div>
                <div className="mt-2 text-sm text-white/65">
                  Funds prioritize delivery, follow-up, and reporting—so outcomes are measurable and
                  verifiable.
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-white/55">Disclosure commitment</div>
                <div className="mt-1 font-semibold">Regular public summaries</div>
                <div className="mt-2 text-sm text-white/65">
                  We publish financial summaries and program reports with consistent templates.
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-white/55">Audit pathway</div>
                <div className="mt-1 font-semibold">Independent review readiness</div>
                <div className="mt-2 text-sm text-white/65">
                  We maintain governance documentation and reporting trails to support audits when
                  required by partners.
                </div>
              </div>
            </div>
          </Card>

          {/* Reports */}
          <Card className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">Reports & Documents</h2>
                <p className="mt-2 text-sm text-white/70">
                  Download standardized documents used to communicate impact, governance, and
                  delivery integrity.
                </p>
              </div>
              <div className="hidden rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200 md:inline-flex">
                Public reporting
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {reports.map((r) => (
                <a
                  key={r.title}
                  href={r.href}
                  className="block rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-white/20 hover:bg-white/[0.07]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-xs text-emerald-200/90">{r.tag}</div>
                    <div className="text-xs text-white/50">Download</div>
                  </div>
                  <div className="mt-1 font-semibold">{r.title}</div>
                  <div className="mt-2 text-sm text-white/65">{r.desc}</div>
                </a>
              ))}

              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-white/55">Note</div>
                <div className="mt-2 text-sm text-white/65">
                  If you haven’t added PDFs yet: create a folder <span className="text-white/80">public/reports</span>{" "}
                  and drop your files there using the same names as above.
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Partner confidence strip */}
        <div className="mt-6">
          <Card className="p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-xs text-emerald-200/90">PARTNER SIGNAL</div>
                <div className="mt-2 text-lg font-semibold">
                  Structured reporting that governments, donors, and implementing partners can trust.
                </div>
                <p className="mt-2 max-w-3xl text-sm text-white/70">
                  We’re not positioning as “activities.” We’re building delivery systems—repeatable workflows,
                  measurable outputs, and transparent accountability.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                  Governance
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                  M&E
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                  Financial disclosure
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                  Audit readiness
                </span>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/get-involved"
                className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-400"
              >
                Become a partner / volunteer
              </Link>

              <Link
                href="/donate"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/10"
              >
                Fund measurable impact
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
