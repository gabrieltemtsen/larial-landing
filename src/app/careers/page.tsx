import type { Metadata } from "next";
import Link from "next/link";
import { CareersApplyForm } from "@/components/CareersApplyForm";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getJobs, getSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Careers",
  description: "Open roles at LARIAL LTD.",
};

export default async function CareersPage() {
  const settings = await getSettings();
  const jobs = await getJobs();

  return (
    <div className="min-h-screen">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="max-w-2xl">
          <h1 className="font-[family-name:var(--font-manrope)] text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Careers at {settings.name}
          </h1>
          <p className="mt-3 text-slate-600">
            We’re building a reliable, WhatsApp-first experience for CAC
            registrations. If you’re detail-oriented and communicate clearly,
            apply below.
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Prefer email? Send your CV to <a className="underline" href={`mailto:${settings.email}`}>{settings.email}</a>.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_420px]">
          <div className="space-y-5">
            {jobs.map((job) => (
              <section
                key={job.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      {job.title}
                    </h2>
                    <div className="mt-1 text-sm text-slate-600">
                      {job.location} • {job.type}
                    </div>
                  </div>
                  <a
                    href={`#apply-${job.id}`}
                    className="inline-flex h-10 items-center justify-center rounded-full bg-sky-600 px-5 text-sm font-semibold text-white hover:bg-sky-700"
                  >
                    Apply
                  </a>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {job.summary}
                </p>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      Responsibilities
                    </div>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
                      {job.responsibilities.map((r) => (
                        <li key={r}>{r}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      Requirements
                    </div>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
                      {job.requirements.map((r) => (
                        <li key={r}>{r}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div id={`apply-${job.id}`} className="mt-8">
                  <div className="text-sm font-semibold text-slate-900">
                    Apply for this role
                  </div>
                  <div className="mt-3 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <CareersApplyForm roleId={job.id} />
                  </div>
                </div>
              </section>
            ))}

            {jobs.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 text-slate-600">
                No open roles right now.
              </div>
            ) : null}

            <div className="text-sm text-slate-500">
              <Link href="/" className="underline">
                ← Back to home
              </Link>
            </div>
          </div>

          <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold text-slate-900">
              Office location
            </div>
            <div className="mt-2 text-sm text-slate-600">{settings.address}</div>
            <div className="mt-2 text-sm text-slate-600">{settings.hours}</div>

            <div className="mt-6 text-sm font-semibold text-slate-900">
              What we value
            </div>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
              <li>Clear communication</li>
              <li>Attention to detail</li>
              <li>Reliable follow-through</li>
              <li>Respect for customer time</li>
            </ul>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
