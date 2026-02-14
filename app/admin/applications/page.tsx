import ApplicationsClient from "./ApplicationsClient";

export const dynamic = "force-dynamic";

export default function AdminApplicationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">
          Admin • Volunteer Applications
        </div>
        <h1 className="mt-4 text-3xl font-bold">Applications</h1>
        <p className="mt-2 text-white/70">
          Review submissions, download CVs, and update application status.
        </p>
      </div>

      <ApplicationsClient />
    </div>
  );
}
