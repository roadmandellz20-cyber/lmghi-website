export default function About() {
  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-4xl font-bold">About LMGHI</h1>
        <p className="mt-4 max-w-3xl text-white/70">
          Lambano Medfront Global Health Initiative (LMGHI) is a structured
          global health delivery organization focused on scalable, accountable,
          and measurable community health programs.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold">Vision</h2>
          <p className="mt-2 text-white/70">
            A world where access to quality community health services does not
            depend on geography.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold">Mission</h2>
          <p className="mt-2 text-white/70">
            To design and deploy standardized community health delivery systems
            that governments, donors, and partners can trust and scale.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-semibold">Governance & Accountability</h2>
        <p className="mt-2 text-white/70">
          LMGHI operates under defined governance structures, financial
          oversight, and monitoring & evaluation frameworks to ensure full
          transparency and measurable impact.
        </p>
      </section>
    </div>
  );
}
