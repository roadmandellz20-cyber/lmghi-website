import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | LMGHI",
  description:
    "LMGHI is governed global health infrastructure with defined policies, accountability, and scalable delivery systems.",
};

type Doc = {
  title: string;
  desc: string;
  href?: string;
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
    desc: "Decision-making, oversight, and ethical standards.",
    href: "/docs/governance-policy.pdf",
  },
  {
    tag: "SAFEGUARDING",
    title: "Child Protection & Safeguarding",
    desc: "Standards for working safely with communities.",
    href: "/docs/child-protection-safeguarding.pdf",
  },
  {
    tag: "DATA",
    title: "Data Privacy & Consent",
    desc: "Consent handling and data protection practices.",
    href: "/docs/data-privacy-policy.pdf",
  },
  {
    tag: "FINANCE",
    title: "Financial Disclosure",
    desc: "High-level disclosure framework for partners.",
    href: "/docs/financial-disclosure.pdf",
  },
  {
    tag: "M&E",
    title: "Monitoring & Evaluation Framework",
    desc: "Indicators and reporting cadence.",
    href: "/docs/me-framework.pdf",
  },
];

function TagPill({ children }: { children: React.ReactNode }) {
  return <span className="liquid-btn px-3 py-1 text-xs">{children}</span>;
}

export default function AboutPage() {
  return (
    <main className="space-y-14">
      <header className="glass-card glass-pad glass-strong">
        <TagPill>Governed institutional infrastructure</TagPill>

        <h1 className="mt-6 text-4xl font-extrabold md:text-5xl">
          About LMGHI
        </h1>

        <p className="mt-5 max-w-3xl text-lg" style={{ color: "var(--muted)" }}>
          Lambano Medfront Global Health Initiative (LMGHI) is built to deliver
          community health programs as scalable infrastructure—defined governance,
          standardized operations, measurable outcomes, and transparent reporting.
        </p>

        <ul className="mt-8 flex flex-wrap gap-3">
          {["Structured", "Governed", "Data-driven", "Accountable", "Scalable"].map((t) => (
            <li key={t} className="liquid-btn px-4 py-2 text-xs">
              {t}
            </li>
          ))}
        </ul>
      </header>

      <section aria-labelledby="vision-mission">
        <div className="grid glass-grid md:grid-cols-2">
          <section className="glass-card glass-pad" aria-labelledby="vision">
            <h2 id="vision" className="text-xl font-semibold">
              Vision
            </h2>
            <p className="mt-3" style={{ color: "var(--muted)" }}>
              A world where access to quality community health services does not
              depend on geography.
            </p>
          </section>

          <section className="glass-card glass-pad" aria-labelledby="mission">
            <h2 id="mission" className="text-xl font-semibold">
              Mission
            </h2>
            <p className="mt-3" style={{ color: "var(--muted)" }}>
              To design and deploy standardized community health delivery systems
              that governments and partners can trust and scale.
            </p>
          </section>
        </div>
      </section>

      <section aria-labelledby="governance">
        <article className="glass-card glass-pad">
          <h2 id="governance" className="text-xl font-semibold">
            Governance &amp; Accountability
          </h2>
          <p className="mt-3" style={{ color: "var(--muted)" }}>
            LMGHI operates under defined governance structures, documented policies,
            financial oversight principles, and a Monitoring &amp; Evaluation framework.
            This is institutional infrastructure built for audit readiness and scale.
          </p>
        </article>
      </section>

      <section aria-labelledby="policies">
        <div className="glass-card glass-pad">
          <header className="flex items-start justify-between gap-3">
            <div>
              <h2 id="policies" className="text-xl font-semibold">
                Constitution &amp; Policies
              </h2>
              <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                Core governance artifacts used to establish oversight, safeguards, and
                partner-grade accountability.
              </p>
            </div>

            <TagPill>Institutional docs</TagPill>
          </header>

          <div className="mt-6 grid glass-grid md:grid-cols-3">
            {docs.map((d) => (
              <article key={d.title} className="glass-card glass-pad">
                <p className="text-xs font-semibold text-emerald-500">{d.tag}</p>
                <h3 className="mt-2 text-base font-semibold">{d.title}</h3>
                <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                  {d.desc}
                </p>

                <div className="mt-5">
                  {d.href ? (
                    <a
                      href={d.href}
                      target="_blank"
                      rel="noreferrer"
                      className="liquid-btn inline-block px-4 py-2 text-sm font-semibold"
                      style={{ background: "rgb(16 185 129)", color: "#04130d" }}
                    >
                      View document
                    </a>
                  ) : (
                    <span className="text-xs" style={{ color: "var(--muted)" }}>
                      Draft pending
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Call to action">
        <div className="glass-card glass-pad">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold">Ready to work with a structured partner?</p>
              <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
                Review programs and impact reporting before engagement.
              </p>
            </div>

            <Link
              href="/programs"
              className="liquid-btn px-5 py-3 text-sm font-semibold"
              style={{ background: "rgb(16 185 129)", color: "#04130d" }}
            >
              Explore Programs
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
