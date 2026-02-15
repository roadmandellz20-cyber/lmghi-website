import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impact & Transparency | LMGHI",
  description: "Measurable outcomes, monitoring framework, and financial transparency.",
};

type KPI = { label: string; value: string; note: string };

const kpis: KPI[] = [
  { value: "12,480+", label: "People reached", note: "Unique community members engaged" },
  { value: "78%", label: "Follow-up completion", note: "Completion within defined follow-up windows" },
  { value: "34%", label: "Cost reduction", note: "Operational efficiency from standard workflows" },
];

function TagPill({ children }: { children: React.ReactNode }) {
  return <span className="liquid-btn px-3 py-1 text-xs">{children}</span>;
}

export default function ImpactPage() {
  return (
    <main className="space-y-14">
      <header className="glass-card glass-pad glass-strong">
        <TagPill>Evidence • Reporting • Accountability</TagPill>

        <h1 className="mt-6 text-4xl font-extrabold md:text-5xl">
          Impact &amp; Transparency
        </h1>

        <p className="mt-5 max-w-3xl text-lg" style={{ color: "var(--muted)" }}>
          LMGHI tracks standardized indicators and maintains audit-ready reporting so
          partners fund outcomes with confidence.
        </p>

        <nav aria-label="Impact actions" className="mt-8 flex flex-wrap gap-3">
          <Link href="/programs" className="liquid-btn px-6 py-3 font-semibold">
            Explore Programs
          </Link>
          <Link
            href="/get-involved"
            className="liquid-btn px-6 py-3 font-semibold"
            style={{ background: "rgb(16 185 129)", color: "#04130d" }}
          >
            Support impact reporting
          </Link>
        </nav>
      </header>

      {/* ✅ semantic KPIs */}
      <section aria-label="Key performance indicators">
        <dl className="grid glass-grid md:grid-cols-3">
          {kpis.map((k) => (
            <div key={k.label} className="glass-card glass-pad">
              <dd className="metric-value">{k.value}</dd>
              <dt className="metric-label">{k.label}</dt>
              <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                {k.note}
              </p>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="me-framework" className="glass-card glass-pad">
        <h2 id="me-framework" className="text-2xl font-bold">
          Monitoring &amp; Evaluation Framework
        </h2>
        <p className="mt-3" style={{ color: "var(--muted)" }}>
          Standard indicators, structured reporting pipelines, and partner-grade dashboards
          ensure impact remains measurable, comparable, and auditable across deployments.
        </p>

        <ul className="mt-6 flex flex-wrap gap-3">
          {[
            "Indicator definitions",
            "Data collection protocols",
            "Reporting cadence",
            "Quality assurance checks",
            "Audit readiness",
          ].map((t) => (
            <li key={t} className="liquid-btn px-4 py-2 text-xs">
              {t}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="financial" className="glass-card glass-pad">
        <h2 id="financial" className="text-2xl font-bold">
          Financial Transparency
        </h2>
        <p className="mt-3" style={{ color: "var(--muted)" }}>
          LMGHI maintains allocation logic and disclosure commitments to support donor confidence,
          partner governance requirements, and future third-party audits.
        </p>

        <div className="mt-6 grid glass-grid md:grid-cols-2">
          <article className="glass-card glass-pad">
            <h3 className="text-sm font-semibold">Disclosure commitments</h3>
            <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
              Summary financial statements, program allocations, and partner reporting.
            </p>
          </article>

          <article className="glass-card glass-pad">
            <h3 className="text-sm font-semibold">Audit readiness</h3>
            <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
              Documented processes and governance structures designed to support audits.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
