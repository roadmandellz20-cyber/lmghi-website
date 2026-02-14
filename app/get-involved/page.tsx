import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Get Involved | LMGHI",
  description:
    "Donate, partner, or volunteer with LMGHI. Structured pathways for support, collaboration, and measurable impact.",
};

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md">
      {children}
    </div>
  );
}

export default function GetInvolvedPage() {
  return (
    <div className="space-y-10">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">
          Donate • Partner • Volunteer
        </div>
        <h1 className="mt-4 text-4xl font-bold">Get Involved</h1>
        <p className="mt-3 max-w-3xl text-white/70">
          Choose a structured pathway. We align support to measurable outcomes, governance, and
          transparent reporting.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <div className="text-sm text-emerald-200">Donate</div>
          <div className="mt-2 text-xl font-semibold">Fund measurable impact</div>
          <p className="mt-2 text-sm text-white/70">
            Support delivery capacity, follow-up systems, and reporting integrity.
          </p>
          <div className="mt-4 flex flex-col gap-2">
            <Link
              href="/donate"
              className="rounded-full bg-emerald-500 px-4 py-2 text-center text-sm font-semibold text-black hover:bg-emerald-400"
            >
              Donate securely
            </Link>
            <Link
              href="/impact"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-center text-sm hover:bg-white/10"
            >
              See transparency
            </Link>
          </div>
        </Card>

        <Card>
          <div className="text-sm text-emerald-200">Partner</div>
          <div className="mt-2 text-xl font-semibold">Deploy with us</div>
          <p className="mt-2 text-sm text-white/70">
            Government, NGOs, and institutions can partner for structured deployment and reporting.
          </p>
          <div className="mt-4">
            <Link
              href="/contact"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-center text-sm hover:bg-white/10 inline-block w-full"
            >
              Partnership inquiry
            </Link>
          </div>
        </Card>

        <Card>
          <div className="text-sm text-emerald-200">Volunteer</div>
          <div className="mt-2 text-xl font-semibold">Join execution</div>
          <p className="mt-2 text-sm text-white/70">
            Volunteers operate within defined roles and supervised workflows.
          </p>
          <div className="mt-4">
            <Link
              href="/contact"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-center text-sm hover:bg-white/10 inline-block w-full"
            >
              Apply to volunteer
            </Link>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-xs text-emerald-200/90">NOTE</div>
            <div className="mt-2 text-lg font-semibold">
              Applications and donations will be fully automated next.
            </div>
            <p className="mt-2 max-w-3xl text-sm text-white/70">
              Next phase: connect forms to email + database, and wire Stripe donations.
            </p>
          </div>
          <Link
            href="/contact"
            className="rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-black hover:bg-emerald-400"
          >
            Contact LMGHI
          </Link>
        </div>
      </Card>
    </div>
  );
}
