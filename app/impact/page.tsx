import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impact & Transparency | LMGHI",
  description:
    "Measurable outcomes, monitoring framework, and financial transparency.",
};

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md">
      {children}
    </div>
  );
}

export default function ImpactPage() {
  return (
    <div className="space-y-10">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">
          Evidence • Reporting • Accountability
        </div>
        <h1 className="mt-4 text-4xl font-bold">Impact & Transparency</h1>
        <p className="mt-3 max-w-3xl text-white/70">
          LMGHI tracks standardized indicators and maintains audit-ready
          reporting to ensure partners fund outcomes with confidence.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <div className="text-3xl font-bold">12,480+</div>
          <div className="text-white/60">People reached</div>
        </Card>

        <Card>
          <div className="text-3xl font-bold">78%</div>
          <div className="text-white/60">Follow-up completion</div>
        </Card>

        <Card>
          <div className="text-3xl font-bold">34%</div>
          <div className="text-white/60">Cost reduction</div>
        </Card>
      </div>

      <Card>
        <h2 className="text-xl font-semibold">
          Monitoring & Evaluation Framework
        </h2>
        <p className="mt-3 text-white/70">
          Standard indicators, structured reporting pipelines, and partner-grade
          dashboards ensure impact remains measurable and auditable.
        </p>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold">Financial Transparency</h2>
        <p className="mt-3 text-white/70">
          LMGHI maintains clear allocation logic and disclosure commitments to
          support donor confidence.
        </p>
      </Card>
    </div>
  );
}
