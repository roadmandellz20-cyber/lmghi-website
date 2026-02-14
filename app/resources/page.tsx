import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Knowledge Hub | LMGHI",
  description:
    "Evidence-based public health education, toolkits, and briefs structured for community delivery and partner use.",
};

const categories = [
  { name: "Prevention", desc: "Lifestyle risk reduction and education modules" },
  { name: "Screening", desc: "Community screening workflows and tools" },
  { name: "Referral & Follow-up", desc: "Navigation, tracking, completion tactics" },
  { name: "Governance", desc: "Policies, standards, accountability practices" },
];

const posts = [
  {
    title: "Hypertension: What communities should know",
    date: "2026-02-01",
    tag: "Prevention",
    desc: "A clear, shareable community guide to early risk awareness and action.",
  },
  {
    title: "Standardized screening day checklist",
    date: "2026-02-03",
    tag: "Screening",
    desc: "A repeatable checklist for running consistent screening delivery.",
  },
  {
    title: "Follow-up tracking: preventing drop-offs",
    date: "2026-02-05",
    tag: "Referral & Follow-up",
    desc: "Systems to ensure people complete follow-up after screening.",
  },
];

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md hover:bg-white/[0.06] transition">
      {children}
    </div>
  );
}

export default function ResourcesPage() {
  return (
    <div className="space-y-10">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">
          Knowledge • Education • Tools
        </div>
        <h1 className="mt-4 text-4xl font-bold">Knowledge Hub</h1>
        <p className="mt-3 max-w-3xl text-white/70">
          Community education resources and institutional briefs—structured for
          delivery, not content dumping.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {categories.map((c) => (
          <Card key={c.name}>
            <div className="text-sm text-emerald-200">{c.name}</div>
            <div className="mt-2 text-sm text-white/70">{c.desc}</div>
          </Card>
        ))}
      </div>

      <div className="flex items-end justify-between">
        <h2 className="text-2xl font-bold">Latest resources</h2>
        <Link className="text-sm text-emerald-200 hover:text-emerald-100" href="/contact">
          Request a resource →
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {posts.map((p) => (
          <Card key={p.title}>
            <div className="flex items-center justify-between">
              <div className="text-xs text-emerald-200">{p.tag}</div>
              <div className="text-xs text-white/50">{p.date}</div>
            </div>
            <div className="mt-2 text-lg font-semibold">{p.title}</div>
            <div className="mt-2 text-sm text-white/70">{p.desc}</div>

            <button className="mt-4 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm hover:bg-white/10">
              Read (coming soon)
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
