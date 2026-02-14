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

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md">
      {children}
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="space-y-10">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">
          Governed institutional infrastructure
        </div>
        <h1 className="mt-4 text-4xl font-bold">About LMGHI</h1>
        <p className="mt-3 max-w-3xl text-white/70">
          Lambano Medfront Global Health Initiative (LMGHI) is built to deliver
          community health programs as scalable infrastructure—defined governance,
          standardized operations, measurable outcomes, and transparent reporting.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="text-xl font-semibold">Vision</h2>
          <p className="mt-3 text-white/70">
            A world where access to quality community health services does not
            depend on geography.
          </p>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold">Mission</h2>
          <p className="mt-3 text-white/70">
            To design and deploy standardized community health delivery systems
            that governments and partners can trust and scale.
          </p>
        </Card>
      </div>

      <Card>
        <h2 className="text-xl font-semibold">Governance & Accountability</h2>
        <p className="mt-3 text-white/70">
          LMGHI operates under defined governance structures, documented policies,
          financial oversight principles, and a Monitoring & Evaluation framework.
        </p>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold">Constitution & Policies</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {docs.map((d) => (
            <div key={d.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-emerald-200">{d.tag}</div>
              <div className="mt-2 font-semibold">{d.title}</div>
              <p className="mt-2 text-sm text-white/70">{d.desc}</p>

              <div className="mt-4">
                {d.href ? (
                  <a
                    href={d.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400 inline-block"
                  >
                    View document
                  </a>
                ) : (
                  <span className="text-xs text-white/50">Draft pending</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
          <div>
            <div className="text-sm font-semibold">
              Ready to work with a structured partner?
            </div>
            <p className="text-sm text-white/70">
              See our programs and impact reporting.
            </p>
          </div>
          <Link
            href="/programs"
            className="rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-black hover:bg-emerald-400"
          >
            Explore Programs
          </Link>
        </div>
      </Card>
    </div>
  );
}
