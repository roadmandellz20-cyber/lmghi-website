import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact | LMGHI",
  description:
    "Partnership, donor engagement, and institutional inquiries for LMGHI.",
};

function TagPill({ children }: { children: React.ReactNode }) {
  return <span className="liquid-btn px-3 py-1 text-xs">{children}</span>;
}

export default function ContactPage() {
  return (
    <main className="space-y-14">
      <header className="glass-card glass-pad glass-strong">
        <TagPill>Partnership • Donors • Institutions</TagPill>

        <h1 className="mt-6 text-4xl font-extrabold md:text-5xl">Contact</h1>

        <p className="mt-5 max-w-3xl text-lg" style={{ color: "var(--muted)" }}>
          LMGHI engages partners with governance, accountability, and scalable delivery systems.
          For partnership, donor, institutional, or media inquiries, use the channels below.
        </p>

        <nav aria-label="Contact actions" className="mt-8 flex flex-wrap gap-3">
          <Link href="/programs" className="liquid-btn px-6 py-3 font-semibold">
            Explore Programs
          </Link>
          <Link
            href="/impact"
            className="liquid-btn px-6 py-3 font-semibold"
            style={{ background: "rgb(16 185 129)", color: "#04130d" }}
          >
            View Transparency
          </Link>
        </nav>
      </header>

      <section className="grid glass-grid md:grid-cols-2">
        <section aria-labelledby="inquiries" className="glass-card glass-pad">
          <h2 id="inquiries" className="text-2xl font-bold">
            Inquiry pathways
          </h2>
          <p className="mt-3" style={{ color: "var(--muted)" }}>
            Select the route that matches your purpose. We respond to verified institutional
            inquiries first.
          </p>

          <ul className="mt-6 space-y-3">
            {[
              {
                title: "Partnerships",
                desc: "Government, NGOs, universities, and implementation partners.",
              },
              {
                title: "Donors & Funding",
                desc: "Support pathways aligned to measurable outcomes and reporting.",
              },
              {
                title: "Community Engagement",
                desc: "Local collaboration, education, and outreach coordination.",
              },
              {
                title: "Media",
                desc: "Interviews, press statements, and organizational updates.",
              },
            ].map((x) => (
              <li key={x.title} className="glass-card glass-pad">
                <p className="text-sm font-semibold">{x.title}</p>
                <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
                  {x.desc}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="details" className="glass-card glass-pad">
          <h2 id="details" className="text-2xl font-bold">
            Contact details
          </h2>
          <p className="mt-3" style={{ color: "var(--muted)" }}>
            Use verified channels. Formal letters can be routed through the admin team.
          </p>

          <dl className="mt-6 grid glass-grid">
            <div className="glass-card glass-pad">
              <dt className="text-xs font-semibold text-emerald-500">Email</dt>
              <dd className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                admin@lmghi.org (placeholder)
              </dd>
            </div>

            <div className="glass-card glass-pad">
              <dt className="text-xs font-semibold text-emerald-500">Phone</dt>
              <dd className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                +220 XXX XXX XXX (placeholder)
              </dd>
            </div>

            <div className="glass-card glass-pad">
              <dt className="text-xs font-semibold text-emerald-500">Location</dt>
              <dd className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                The Gambia • Regional operations (placeholder)
              </dd>
            </div>
          </dl>

          <div className="mt-7">
            <Link
              href="/get-involved"
              className="liquid-btn inline-block px-5 py-3 text-sm font-semibold"
              style={{ background: "rgb(16 185 129)", color: "#04130d" }}
            >
              Volunteer / Partner
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}
