import Link from "next/link";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="text-2xl font-bold">{value}</div>
      <div className="mt-1 text-sm text-white/60">{label}</div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="space-y-14">
      <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/10 via-black to-black p-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-4 py-2 text-sm text-white/80">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Institutional global health infrastructure — built for scale.
        </div>

        <div className="mt-6 grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
              Global health delivery that is{" "}
              <span className="text-emerald-400">structured</span>, governed, and
              measurable.
            </h1>

            <p className="mt-5 text-lg text-white/70">
              LMGHI is built to run scalable community health programs with
              clear governance, standardized operations, and accountable impact
              reporting—so partners can fund outcomes, not guesswork.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/programs"
                className="rounded-full bg-emerald-500 px-6 py-3 font-semibold text-black hover:bg-emerald-400"
              >
                Explore Programs
              </Link>
              <Link
                href="/impact"
                className="rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white hover:bg-white/10"
              >
                Impact & Transparency
              </Link>
              <Link
                href="/get-involved"
                className="rounded-full border border-white/15 bg-white/0 px-6 py-3 font-semibold text-white hover:bg-white/5"
              >
                Donate / Partner
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-6 text-sm text-white/60">
              <span>• Governance & policies</span>
              <span>• M&E framework</span>
              <span>• Financial disclosure</span>
              <span>• Scalable architecture</span>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
            <div className="flex items-center justify-between">
              <div className="font-semibold">Impact snapshot</div>
              <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200 ring-1 ring-emerald-400/20">
                live reporting framework
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <Stat label="People reached" value="12,480+" />
              <Stat label="Screenings completed" value="3,210" />
              <Stat label="Follow-up completion" value="78%" />
              <Stat label="Volunteer hours" value="1,940" />
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-sm font-semibold">Next deployment</div>
              <div className="mt-1 text-sm text-white/60">
                Standardized mobile outreach with referral + follow-up tracking.
              </div>
              <div className="mt-4 h-2 w-full rounded-full bg-white/10">
                <div className="h-2 w-2/3 rounded-full bg-emerald-400" />
              </div>
              <div className="mt-2 text-xs text-white/50">Progress: 66%</div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
          <div className="text-sm text-emerald-200">The problem</div>
          <h2 className="mt-2 text-2xl font-bold">
            Programs run like events, not systems.
          </h2>
          <p className="mt-3 text-white/70">
            When delivery isn’t standardized, results depend on luck, not
            structure. Reporting is inconsistent and accountability disappears.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
          <div className="text-sm text-emerald-200">The model</div>
          <h2 className="mt-2 text-2xl font-bold">
            Governance + operations + measurement.
          </h2>
          <p className="mt-3 text-white/70">
            Clear roles, policies, and workflows paired with monitoring and
            evaluation—so outcomes are trackable and fundable.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
          <div className="text-sm text-emerald-200">The proof</div>
          <h2 className="mt-2 text-2xl font-bold">
            Transparency partners can audit.
          </h2>
          <p className="mt-3 text-white/70">
            Publish reports, financial disclosure, and M&E frameworks so donors
            and governments can trust what they support.
          </p>
        </div>
      </section>
    </div>
  );
}
