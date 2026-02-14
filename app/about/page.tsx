// app/about/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | LMGHI",
  description:
    "LMGHI is built as governed global health infrastructure—defined governance, policies, reporting standards, and scalable delivery systems.",
};

type Doc = {
  title: string;
  desc: string;
  href?: string; // if missing => shows as Draft
  tag: string;
};

const docs: Doc[] = [
  {
    tag: "GOVERNANCE",
    title: "Constitution / Charter",
    desc: "Core mandate, governance structure, and operating principles.",
    href: "/docs/constitution.pdf",
  },
  {
    tag: "GOVERNANCE",
    title: "Governance & Ethics Policy",
    desc: "Decision-making, oversight, conflict-of-interest, and ethical standards.",
    href: "/docs/governance-policy.pdf",
  },
  {
    tag: "SAFEGUARDING",
    title: "Child Protection & Safeguarding",
    desc: "Standards for working safely with communities, families, and vulnerable groups.",
    href: "/docs/child-protection-safeguarding.pdf",
  },
  {
    tag: "DATA",
    title: "Data Privacy & Consent",
    desc: "Consent handling, data protection practices, and privacy commitments.",
    href: "/docs/data-privacy-policy.pdf",
  },
  {
    tag: "FINANCE",
    title: "Financial Disclosure",
    desc: "High-level disclosure framework for donors and partners.",
    href: "/docs/financial-disclosure.pdf",
  },
  {
    tag: "M&E",
    title: "Monitoring & Evaluation Framework",
    desc: "Indicators, reporting cadence, and verification approach.",
    href: "/docs/me-framework.pdf",
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

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">
      {children}
    </span>
  );
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(720px_340px_at_25%_15%,rgba(16,185,129,0.16),transparent_70%)]" />

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-20 pt-10 md:pt-14">
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Governed institutional infrastructure
          </div>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            About LMGHI
          </h1>
          <p className="mt-3 max-w-3xl text-base text-white/70 md:text-lg">
            Lambano Medfront Global Health Initiative (LMGHI) is built to deliver
            community health programs as scalable infrastructure—defined governance,
            standardized operations, measurable outcomes, and transparent reporting.
          </p>
        </div>

        {/* Vision / Mission */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold">Vision</h2>
              <Pill>Long-term</Pill>
            </div>
            <p className="mt-3 text-sm text-white/70">
              A world where access to quality community health services does not
              depend on geography—and delivery standards are consistent across regions.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold">Mission</h2>
              <Pill>Delivery system</Pill>
            </div>
            <p className="mt-3 text-sm text-white/70">
              To design and deploy standardized community health delivery systems
              that governments, donors, and partners can trust, verify, and scale.
            </p>
          </Card>
        </div>

        {/* Governance + Accountability */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Card className="p-6 md:col-span-2">
            <h2 className="text-xl font-semibold">Governance & Accountability</h2>
            <p className="mt-2 text-sm text-white/70">
              LMGHI operates under defined governance structures, documented policies,
              financial oversight principles, and a Monitoring & Evaluation framework.
              The goal is simple: partners fund outcomes with confidence.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm font-semibold">Oversight</div>
                <p className="mt-2 text-sm text-white/70">
                  Governance roles, approvals, and review checkpoints to reduce risk and enforce standards.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm font-semibold">Transparency</div>
                <p className="mt-2 text-sm text-white/70">
                  Reporting cadence, disclosure posture, and documentation trails to support audits.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm font-semibold">Safeguarding</div>
                <p className="mt-2 text-sm text-white/70">
                  Consent-first operations and safeguarding standards for work in communities.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm font-semibold">Measurement</div>
                <p className="mt-2 text-sm text-white/70">
                  Standard indicators, definitions, and verification to ensure impact is measurable.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold">Leadership (placeholder)</h2>
            <p className="mt-2 text-sm text-white/70">
              Add named leadership only when confirmed. Until then, keep it institutional:
              roles, accountability, and governance approach.
            </p>

            <div className="mt-4 space-y-3">
              {[
                "Executive Director",
                "Programs & Operations Lead",
                "Monitoring & Evaluation Lead",
                "Finance & Compliance",
              ].map((role) => (
                <div
                  key={role}
                  className="rounded-xl border border-white/10 bg-white/5 p-3"
                >
                  <div className="text-sm font-semibold">{role}</div>
                  <div className="mt-1 text-xs text-white/60">
                    Role defined • Name added when finalized
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Policies / Docs */}
        <div className="mt-6">
          <Card className="p-6">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-xl font-semibold">Constitution & Policies</h2>
                <p className="mt-2 text-sm text-white/70">
                  Documents that define how LMGHI governs, safeguards, handles data,
                  and reports impact. This is the credibility layer.
                </p>
              </div>
              <Link
                href="/impact"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/10"
              >
                See reporting standards →
              </Link>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {docs.map((d) => {
                const isDraft = !d.href;
                return (
                  <div
                    key={d.title}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <div className="text-xs text-emerald-200/90">{d.tag}</div>
                    <div className="mt-2 text-base font-semibold">{d.title}</div>
                    <p className="mt-2 text-sm text-white/70">{d.desc}</p>

                    <div className="mt-4">
                      {isDraft ? (
                        <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs text-white/60">
                          Draft (upload pending)
                        </span>
                      ) : (
                        <a
                          href={d.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-emerald-400"
                        >
                          View document
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="mt-6">
          <Card className="p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-xs text-emerald-200/90">NEXT</div>
                <div className="mt-2 text-lg font-semibold">
                  Ready to convert interest into action?
                </div>
                <p className="mt-2 max-w-3xl text-sm text-white/70">
                  Get Involved is where partners, volunteers, and donors choose a pathway.
                </p>
              </div>
              <Link
                href="/get-involved"
                className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-400"
              >
                Go to Get Involved
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
