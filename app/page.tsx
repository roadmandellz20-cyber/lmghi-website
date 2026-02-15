import Link from "next/link";

type Metric = { label: string; value: string };

function ImpactSnapshot({ metrics }: { metrics: Metric[] }) {
  return (
    <section
      aria-labelledby="impact-snapshot"
      className="glass-card glass-pad glass-strong"
    >
      <header className="flex items-start justify-between gap-3">
        <div>
          <h2 id="impact-snapshot" className="text-lg font-semibold">
            Impact snapshot
          </h2>
          <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
            Live reporting framework aligned to M&amp;E standards.
          </p>
        </div>

        <span className="liquid-btn px-3 py-1 text-xs">
          live reporting
        </span>
      </header>

      {/* ✅ semantic stats */}
      <dl className="mt-6 grid grid-cols-2 glass-grid">
        {metrics.map((m) => (
          <div key={m.label} className="glass-card glass-pad">
            <dd className="metric-value">{m.value}</dd>
            <dt className="metric-label">{m.label}</dt>
          </div>
        ))}
      </dl>

      <article className="mt-6 glass-card glass-pad">
        <h3 className="text-sm font-semibold">Next deployment</h3>
        <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
          Standardized mobile outreach with referral + follow-up tracking.
        </p>

        <div className="mt-4">
          <div className="h-2 w-full rounded-full bg-black/10 dark:bg-white/10">
            <div className="h-2 w-2/3 rounded-full bg-emerald-400" />
          </div>
          <p className="mt-2 text-xs" style={{ color: "var(--muted)" }}>
            Progress: 66%
          </p>
        </div>
      </article>
    </section>
  );
}

function PillList({ items }: { items: string[] }) {
  return (
    <ul className="mt-8 flex flex-wrap gap-3">
      {items.map((t) => (
        <li key={t} className="liquid-btn px-4 py-2 text-xs">
          {t}
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  const metrics: Metric[] = [
    { label: "People reached", value: "12,480+" },
    { label: "Screenings completed", value: "3,210" },
    { label: "Follow-up completion", value: "78%" },
    { label: "Volunteer hours", value: "1,940" },
  ];

  return (
    <main className="space-y-14">
      {/* HERO / POSITIONING */}
      <header className="glass-card glass-pad glass-strong">
        <div className="liquid-btn inline-flex items-center gap-2 px-4 py-2 text-sm">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Institutional global health infrastructure — built for scale.
        </div>

        <section className="mt-8 grid gap-10 md:grid-cols-2 md:items-start">
          {/* Left: message + CTAs */}
          <div>
            <h1 className="text-4xl font-extrabold md:text-5xl">
              Global health delivery that is{" "}
              <span className="text-emerald-500">structured</span>, governed, and
              measurable.
            </h1>

            <p className="mt-5 text-lg" style={{ color: "var(--muted)" }}>
              LMGHI is built to run community health programs as systems—defined governance,
              standardized operations, measurable outcomes, and transparent reporting.
            </p>

            <nav aria-label="Primary actions" className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/programs"
                className="liquid-btn px-6 py-3 font-semibold"
                style={{ background: "rgb(16 185 129)", color: "#04130d" }}
              >
                Explore Programs
              </Link>

              <Link
                href="/impact"
                className="liquid-btn px-6 py-3 font-semibold"
              >
                Impact &amp; Transparency
              </Link>

              <Link
                href="/get-involved"
                className="liquid-btn px-6 py-3 font-semibold"
              >
                Donate / Partner
              </Link>
            </nav>

            <PillList
              items={[
                "Governance & policies",
                "M&E framework",
                "Financial disclosure",
                "Scalable architecture",
              ]}
            />
          </div>

          {/* Right: Impact */}
          <ImpactSnapshot metrics={metrics} />
        </section>
      </header>

      {/* MODEL / INSTITUTIONAL FRAME */}
      <section aria-labelledby="system-model">
        <header className="mb-6">
          <h2 id="system-model" className="text-2xl font-bold md:text-3xl">
            Built like an institution, not an event.
          </h2>
          <p className="mt-2 max-w-3xl text-sm md:text-base" style={{ color: "var(--muted)" }}>
            Donors and governments fund structure. Communities trust consistency. This model is
            designed for repeatable deployment with measurable outcomes.
          </p>
        </header>

        <div className="grid glass-grid md:grid-cols-3">
          <article className="glass-card glass-pad">
            <p className="text-sm font-semibold text-emerald-500">The problem</p>
            <h3 className="mt-2 text-2xl font-bold">Programs run like events, not systems.</h3>
            <p className="mt-3" style={{ color: "var(--muted)" }}>
              When delivery isn’t standardized, results depend on luck, not structure.
              Reporting becomes inconsistent and accountability disappears.
            </p>
          </article>

          <article className="glass-card glass-pad">
            <p className="text-sm font-semibold text-emerald-500">The model</p>
            <h3 className="mt-2 text-2xl font-bold">Governance + operations + measurement.</h3>
            <p className="mt-3" style={{ color: "var(--muted)" }}>
              Clear roles, policies, and workflows paired with Monitoring &amp; Evaluation—so
              outcomes are trackable, reportable, and fundable.
            </p>
          </article>

          <article className="glass-card glass-pad">
            <p className="text-sm font-semibold text-emerald-500">The proof</p>
            <h3 className="mt-2 text-2xl font-bold">Transparency partners can audit.</h3>
            <p className="mt-3" style={{ color: "var(--muted)" }}>
              Publish reports, financial disclosure, and M&amp;E frameworks so donors and
              governments can trust what they support.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
