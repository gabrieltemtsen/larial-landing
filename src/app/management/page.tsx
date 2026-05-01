import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Management",
  description:
    "Meet the leadership and operations team behind LARIAL LTD — driving CAC compliance, post-incorporation support, and reliable client service.",
};

const LEADERSHIP = [
  {
    name: "Head of Operations",
    role: "Operations Lead",
    initials: "HO",
    bio: "Owns the registration workflow end-to-end — checklists, document review, CAC submissions, and turnaround quality.",
    accent: "from-cyan-500 to-sky-500",
  },
  {
    name: "Head of Compliance",
    role: "Compliance Lead",
    initials: "HC",
    bio: "Oversees post-incorporation work — annual returns, share capital changes, name changes, SCUML and trademark filings.",
    accent: "from-indigo-500 to-violet-500",
  },
  {
    name: "Head of Client Success",
    role: "Customer Success Lead",
    initials: "CS",
    bio: "Owns the WhatsApp-first client experience — response times, status updates and a smooth handoff at every step.",
    accent: "from-emerald-500 to-teal-500",
  },
];

const PRINCIPLES = [
  {
    t: "Independent review",
    d: "Every CAC filing is reviewed by a second person before submission to catch issues early.",
  },
  {
    t: "Document hygiene",
    d: "We keep a tidy, encrypted record of every client's documents — and only retain what we need.",
  },
  {
    t: "Clear ownership",
    d: "Each engagement has a named owner and a named reviewer, so there's never a 'who's handling this?' moment.",
  },
  {
    t: "Always-updated checklists",
    d: "Requirements change. Our internal checklists track CAC's latest portal updates and are reviewed monthly.",
  },
];

export default function ManagementPage() {
  const wa = whatsappLink("Hi LARIAL LTD — I'd like to speak with your team.");

  return (
    <div className="min-h-screen">
      <Header />

      <PageHero
        eyebrow="Management"
        title={
          <>
            People who care about{" "}
            <span className="text-gradient-brand">getting it right.</span>
          </>
        }
        subtitle="Our team blends regulatory know-how with client-first communication. We're a small operation by design — every filing has a named owner and a named reviewer."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={wa}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-600 to-indigo-500 px-6 text-sm font-semibold text-white shadow-md hover:shadow-lg"
          >
            Talk to the team
          </a>
          <Link
            href="/careers"
            className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Open roles
          </Link>
        </div>
      </PageHero>

      {/* Featured: General Manager */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div className="relative mx-auto w-full max-w-sm">
              <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-sky-200/60 via-white to-indigo-200/60 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_30px_80px_-30px_rgba(2,132,199,0.45)]">
                <div className="relative aspect-[3/4] w-full bg-gradient-to-br from-slate-100 to-slate-200">
                  <Image
                    src="/team/general-manager.jpg"
                    alt="General Manager — LARIAL LTD"
                    fill
                    sizes="(min-width: 1024px) 420px, 90vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider opacity-90">
                        Leadership
                      </div>
                      <div className="font-[family-name:var(--font-manrope)] text-base font-extrabold">
                        General Manager
                      </div>
                    </div>
                    <div className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-bold backdrop-blur">
                      LARIAL LTD
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-2 hidden rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 shadow-lg backdrop-blur sm:block">
                <div className="text-[11px] font-semibold text-slate-500">Verified</div>
                <div className="text-sm font-extrabold text-slate-900">CAC Merchant ✓</div>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
                Meet the team
              </div>
              <h2 className="mt-3 font-[family-name:var(--font-manrope)] text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Our <span className="text-gradient-brand">General Manager</span>.
              </h2>
              <p className="mt-3 max-w-xl text-slate-600">
                Leads day-to-day operations at LARIAL LTD — overseeing CAC
                filings, client communication, and quality across every
                engagement. Final reviewer on registrations, post-incorporation
                changes and trademark filings.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  { k: "Operations", l: "Day-to-day lead" },
                  { k: "Compliance", l: "Final reviewer" },
                  { k: "Clients", l: "Onsite & worldwide" },
                ].map((stat) => (
                  <div
                    key={stat.k}
                    className="rounded-2xl border border-slate-200 bg-gradient-to-br from-sky-50/40 to-white p-4"
                  >
                    <div className="text-sm font-bold text-slate-900">{stat.k}</div>
                    <div className="mt-1 text-xs text-slate-600">{stat.l}</div>
                  </div>
                ))}
              </div>

              <blockquote className="mt-6 rounded-3xl border border-slate-200 bg-gradient-to-br from-sky-50 via-white to-indigo-50 p-6">
                <svg viewBox="0 0 24 24" className="h-6 w-6 text-sky-500" fill="currentColor" aria-hidden>
                  <path d="M7.5 11h-3v-1c0-2.5 2-4.5 4.5-4.5V7c-1.4 0-2.5 1.1-2.5 2.5V10h1v5h-3v-4h3zm9 0h-3v-1c0-2.5 2-4.5 4.5-4.5V7c-1.4 0-2.5 1.1-2.5 2.5V10h1v5h-3v-4h3z" />
                </svg>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  Our promise is simple — every CAC filing leaves this office
                  documented, double-checked, and on time. That&apos;s how
                  trust gets built.
                </p>
                <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  — General Manager, LARIAL LTD
                </div>
              </blockquote>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={wa}
                  className="inline-flex h-11 items-center justify-center rounded-full bg-gradient-to-r from-sky-600 to-indigo-500 px-5 text-sm font-semibold text-white shadow-md hover:shadow-lg"
                >
                  Speak with the GM
                </a>
                <Link
                  href="/contact"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Visit the office
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership grid */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
              Leadership
            </div>
            <h2 className="mt-3 font-[family-name:var(--font-manrope)] text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              The leadership team.
            </h2>
            <p className="mt-3 text-slate-600">
              We&apos;re growing thoughtfully. Roles below describe the function
              — if you&apos;d like to be introduced to a specific person, send
              a WhatsApp and we&apos;ll connect you.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {LEADERSHIP.map((m) => (
              <div
                key={m.role}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5"
              >
                <div className={`mx-auto grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br ${m.accent} text-white shadow-md`}>
                  <span className="font-[family-name:var(--font-manrope)] text-2xl font-black tracking-wider">
                    {m.initials}
                  </span>
                </div>
                <div className="mt-5 text-center">
                  <div className="text-base font-bold text-slate-900">{m.name}</div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-sky-700">
                    {m.role}
                  </div>
                </div>
                <p className="mt-3 text-center text-sm leading-6 text-slate-600">
                  {m.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Org chart */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-3 py-1 text-xs font-semibold text-indigo-700">
              How we&apos;re organised
            </div>
            <h2 className="mt-3 font-[family-name:var(--font-manrope)] text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              A flat, fast operating model.
            </h2>
            <p className="mt-3 text-slate-600">
              Three teams. One outcome: your CAC filing, done well.
            </p>
          </div>

          <div className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mx-auto flex max-w-md flex-col items-center">
              <div className="rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-500 px-5 py-3 text-center text-sm font-bold text-white shadow">
                General Manager
              </div>
              <div className="my-4 h-6 w-px bg-slate-200" />
              <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  { t: "Operations", d: "Filings & turnaround" },
                  { t: "Compliance", d: "Returns, changes, brand" },
                  { t: "Client Success", d: "WhatsApp-first support" },
                ].map((c) => (
                  <div key={c.t} className="rounded-2xl border border-slate-200 bg-gradient-to-br from-sky-50/40 to-white p-4 text-center">
                    <div className="text-sm font-bold text-slate-900">{c.t}</div>
                    <div className="mt-1 text-xs text-slate-600">{c.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operating principles */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                How we operate
              </div>
              <h2 className="mt-3 font-[family-name:var(--font-manrope)] text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Principles that keep clients comfortable.
              </h2>
              <p className="mt-3 max-w-xl text-slate-600">
                Compliance work is detail work. These are the standards we hold
                ourselves to on every engagement.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {PRINCIPLES.map((p) => (
                <div key={p.t} className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-sky-50/30 p-5">
                  <div className="grid h-10 w-10 place-items-center rounded-2xl bg-sky-100 text-sky-700">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  </div>
                  <div className="mt-3 text-sm font-bold text-slate-900">{p.t}</div>
                  <div className="mt-1 text-sm text-slate-600">{p.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hiring CTA */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid gap-6 rounded-[2rem] bg-gradient-to-br from-sky-600 via-sky-500 to-indigo-600 p-8 text-white shadow-xl sm:p-12 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <h2 className="font-[family-name:var(--font-manrope)] text-2xl font-extrabold sm:text-3xl">
                We&apos;re hiring detail-oriented humans.
              </h2>
              <p className="mt-3 max-w-xl text-sky-50">
                If you care about clear communication and tidy paperwork — and
                you want to help Nigerians worldwide formalise their work —
                we&apos;d love to meet you.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Link
                href="/careers"
                className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-sky-700 hover:bg-slate-100"
              >
                See open roles
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur hover:bg-white/15"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
