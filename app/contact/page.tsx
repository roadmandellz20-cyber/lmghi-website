import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | LMGHI",
  description:
    "Contact LMGHI for partnerships, volunteer applications, or donor support inquiries.",
};

export default function ContactPage() {
  return (
    <div className="space-y-10 max-w-3xl">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">
          Partnerships • Volunteers • Donors
        </div>
        <h1 className="mt-4 text-4xl font-bold">Contact</h1>
        <p className="mt-3 text-white/70">
          Send a message for partnership discussions, volunteer intake, or donor inquiries.
        </p>
      </div>

      <form className="space-y-4">
        <input
          className="w-full rounded-xl border border-white/10 bg-white/5 p-4 outline-none focus:border-emerald-400/40"
          placeholder="Full name"
        />
        <input
          className="w-full rounded-xl border border-white/10 bg-white/5 p-4 outline-none focus:border-emerald-400/40"
          placeholder="Email"
          type="email"
        />
        <select className="w-full rounded-xl border border-white/10 bg-white/5 p-4 outline-none focus:border-emerald-400/40">
          <option>Partnership inquiry</option>
          <option>Volunteer application</option>
          <option>Donor inquiry</option>
          <option>General message</option>
        </select>
        <textarea
          className="w-full rounded-xl border border-white/10 bg-white/5 p-4 outline-none focus:border-emerald-400/40"
          placeholder="Message"
          rows={6}
        />

        <button
          type="button"
          className="rounded-full bg-emerald-500 px-6 py-3 font-semibold text-black hover:bg-emerald-400"
        >
          Send (wiring next)
        </button>

        <p className="text-xs text-white/50">
          Next phase: connect this form to database + automatic email notifications.
        </p>
      </form>
    </div>
  );
}
