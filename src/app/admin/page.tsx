import type { Metadata } from "next";
import { AdminPanel } from "@/components/AdminPanel";

export const metadata: Metadata = {
  title: "Admin",
  description: "LARIAL LTD Admin",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-[family-name:var(--font-manrope)] text-2xl font-extrabold tracking-tight text-slate-900">
                Admin
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                Update website content. Changes save to GitHub and go live after
                redeploy.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <AdminPanel />
          </div>
        </div>

        <p className="mt-6 text-xs text-slate-500">
          Tip: If changes don’t appear immediately, wait for the Vercel deploy to
          finish.
        </p>
      </div>
    </div>
  );
}
