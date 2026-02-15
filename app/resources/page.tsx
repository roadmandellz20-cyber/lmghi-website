import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Knowledge Hub | LMGHI",
  description:
    "Public health education, program resources, and institutional documentation for communities and partners.",
};

type Resource = {
  tag: string;
  title: string;
  desc: string;
  href?: string;
};

const featured: Resource[] = [
  {
    tag: "COMMUNITY",
    title: "Understanding Preventive Health",
    desc: "Simple guidance on prevention, early detection, and healthy routines.",
    href: "#",
  },
  {
    tag: "M&E",
    title: "Indicator Overview (Public Summary)",
    desc: "A plain-language explanation of the indicators we track and why they matter.",
    href: "#",
  },
  {
    tag: "SAFEGUARDING",
    title: "Community Safeguarding Guide",
    desc: "How we ensure safe engagement and respectful community practices.",
    href: "#",
  },
];

const library: Resource[] = [
  {
    tag: "PROGRAMS",
    title: "Community Screening Checklist",
    desc: "Standard workflow checklist for safe and consistent screening days.",
    href: "#",
  },
  {
    tag: "DATA",
    title: "Consent & Data Handling (Public)",
    desc: "What consent means and how community data is protected.",
    href: "#",
  },
  {
    tag: "GOVERNANCE",
    title: "Governance Snapshot",
    desc: "High-level governance structure and accountability model.",
    href: "#",
  },
  {
    tag: "TRAINING",
    title: "Volunteer Onboarding Overview",
    desc: "Baseline expectations, ethics, and communication standards.",
    href: "#",
  },
  {
    tag: "REPORTING",
    title: "Reporting Cadence (Public Summary)",
    desc: "How reporting is structured across deployments and partners.",
    href: "#",
  },
  {
    tag: "COMMUNITY",
    title: "Health Education Briefs",
    desc: "Short, shareable briefs designed for community awareness.",
    href: "#",
  },
];

function TagPill({ children }: { children: React.ReactNode }) {
  return <span className="liquid-btn px-3 py-1 text-xs">{children}</span>;
}

export default function ResourcesPage() {
  return (
    <main className="space-y-14">
      <header className="glass-card glass-pad glass-strong">
        <TagPill>Resources • Education • Evidence</TagPill>

        <h1 className="mt-6 text-4xl font-extrabold md:text-5xl">
          Knowledge Hub
        </h1>

        <p className="mt-5 max-w-3xl text-lg" style={{ color: "var(--muted)" }}>
          Public-facing resources designed for communities, partners, and stakeholders.
          This hub supports health education, institutional transparency, and program readiness.
        </p>

        <nav aria-label="Knowledge hub actions" className="mt-8 flex flex-wrap gap-3">
          <Link href="/programs" className="liquid-btn px-6 py-3 font-semibold">
            Explore Programs
          </Link>
          <Link
            href="/impact"
            className="liquid-btn px-6 py-3 font-semibold"
            style={{ background: "rgb(16 185 129)", color: "#04130d" }}
          >
            View Impact & Transparency
          </Link>
        </nav>
      </header>

      <section aria-labelledby="featured">
        <header className="mb-6">
          <h2 id="featured" className="text-2xl font-bold md:text-3xl">
            Featured
          </h2>
          <p className="mt-2 max-w-3xl" style={{ color: "var(--muted)" }}>
            High-value public summaries and community-friendly documents.
          </p>
        </header>

        <div className="grid glass-grid md:grid-cols-3">
          {featured.map((r) => (
            <article key={r.title} className="glass-card glass-pad">
              <p className="text-xs font-semibold text-emerald-500">{r.tag}</p>
              <h3 className="mt-2 text-lg font-semibold">{r.title}</h3>
              <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                {r.desc}
              </p>

              <div className="mt-5">
                {r.href ? (
                  <a
                    href={r.href}
                    className="liquid-btn inline-block px-4 py-2 text-sm font-semibold"
                  >
                    Open
                  </a>
                ) : (
                  <span className="text-xs" style={{ color: "var(--muted)" }}>
                    Coming soon
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="library">
        <header className="mb-6">
          <h2 id="library" className="text-2xl font-bold md:text-3xl">
            Resource library
          </h2>
          <p className="mt-2 max-w-3xl" style={{ color: "var(--muted)" }}>
            Operational guides, public summaries, and education materials.
          </p>
        </header>

        <div className="grid glass-grid md:grid-cols-2">
          {library.map((r) => (
            <article key={r.title} className="glass-card glass-pad">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-emerald-500">{r.tag}</p>
                  <h3 className="mt-2 text-lg font-semibold">{r.title}</h3>
                </div>
                <TagPill>Public</TagPill>
              </div>

              <p className="mt-3 text-sm" style={{ color: "var(--muted)" }}>
                {r.desc}
              </p>

              <div className="mt-5">
                {r.href ? (
                  <a href={r.href} className="liquid-btn inline-block px-4 py-2 text-sm font-semibold">
                    Open
                  </a>
                ) : (
                  <span className="text-xs" style={{ color: "var(--muted)" }}>
                    Coming soon
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-label="Call to action" className="glass-card glass-pad">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold">Want partner-grade documentation?</p>
            <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
              Contact LMGHI for governance artifacts and deployment readiness materials.
            </p>
          </div>
          <Link
            href="/contact"
            className="liquid-btn px-5 py-3 text-sm font-semibold"
            style={{ background: "rgb(16 185 129)", color: "#04130d" }}
          >
            Contact us
          </Link>
        </div>
      </section>
    </main>
  );
}
