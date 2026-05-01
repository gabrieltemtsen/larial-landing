import type { Metadata } from "next";
import Link from "next/link";
import { CareersApplyForm } from "@/components/CareersApplyForm";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { getJobs, getSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Open roles at LARIAL LTD — join a small team building reliable CAC compliance for Nigerians worldwide.",
};

export default async function CareersPage() {
  const settings = await getSettings();
  const jobs = await getJobs();

  return (
    <div className="min-h-screen">
      <Header />

      <PageHero
        eyebrow="Careers"
        title={
          <>
            Help us build the{" "}
            <span className="text-gradient-brand">most trusted</span> CAC
            merchant.
          </>
        }
        subtitle={
          <>
            We&apos;re building a reliable, WhatsApp-first experience for CAC
            registrations. If you&apos;re detail-oriented and communicate
            clearly, apply below — or send your CV to{" "}
            <a
              className="font-semibold text-sky-700 underline"
              href={`mailto:${settings.email}`}
            >
              {settings.email}
            </a>
            .
          </>
        }
      />

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="space-y-6">
              {jobs.map((job) => (
                <section
                  key={job.id}
                  className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2 className="font-[family-name:var(--font-manrope)] text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                        {job.title}
                      </h2>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                        <span className="rounded-full bg-sky-50 px-2.5 py-1 font-semibold text-sky-700">
                          {job.location}
                        </span>
                        <span className="rounded-full bg-indigo-50 px-2.5 py-1 font-semibold text-indigo-700">
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <a
                      href={`#apply-${job.id}`}
                      className="inline-flex h-11 items-center justify-center rounded-full bg-gradient-to-r from-sky-600 to-indigo-500 px-5 text-sm font-semibold text-white shadow-md hover:shadow-lg"
                    >
                      Apply
                    </a>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    {job.summary}
                  </p>

                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    <div>
                      <div className="text-sm font-bold text-slate-900">
                        Responsibilities
                      </div>
                      <ul className="mt-2 space-y-2 text-sm text-slate-600">
                        {job.responsibilities.map((r) => (
                          <li key={r} className="flex items-start gap-2">
                            <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">
                        Requirements
                      </div>
                      <ul className="mt-2 space-y-2 text-sm text-slate-600">
                        {job.requirements.map((r) => (
                          <li key={r} className="flex items-start gap-2">
                            <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div id={`apply-${job.id}`} className="mt-8">
                    <div className="text-sm font-bold text-slate-900">
                      Apply for this role
                    </div>
                    <div className="mt-3 rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5">
                      <CareersApplyForm roleId={job.id} />
                    </div>
                  </div>
                </section>
              ))}

              {jobs.length === 0 ? (
                <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-600">
                  No open roles right now. Check back soon.
                </div>
              ) : null}

              <div className="text-sm text-slate-500">
                <Link href="/" className="underline">
                  ← Back to home
                </Link>
              </div>
            </div>

            <aside className="h-fit space-y-5">
              <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-sky-50 via-white to-indigo-50 p-6 shadow-sm">
                <div className="text-xs font-semibold uppercase tracking-wider text-sky-700">
                  Office
                </div>
                <div className="mt-2 text-sm font-bold text-slate-900">
                  {settings.address}
                </div>
                <div className="mt-1 text-sm text-slate-600">
                  {settings.hours}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-sm font-bold text-slate-900">
                  What we value
                </div>
                <ul className="mt-3 space-y-3 text-sm text-slate-600">
                  {[
                    "Clear communication",
                    "Attention to detail",
                    "Reliable follow-through",
                    "Respect for customer time",
                  ].map((v) => (
                    <li key={v} className="flex items-start gap-2">
                      <div className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                        <svg
                          viewBox="0 0 24 24"
                          className="h-3 w-3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                        >
                          <path d="M5 12l5 5L20 7" />
                        </svg>
                      </div>
                      {v}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
