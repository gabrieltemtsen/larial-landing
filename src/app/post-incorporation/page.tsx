import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Post-Incorporation Services",
  description:
    "Annual returns, share capital changes, name changes, certificate reprints, SCUML registration and trademark filings — handled end-to-end by LARIAL LTD.",
};

const ITEMS = [
  {
    title: "Annual Returns",
    icon: "🗂️",
    accent: "from-sky-500 to-cyan-500",
    desc: "Filing of annual returns and routine compliance updates for CAC-registered entities — keeping your business in good standing.",
    needs: [
      "RC / BN number",
      "Up-to-date directors / proprietors",
      "Last filing year",
      "Registered office address",
    ],
  },
  {
    title: "Increase in Share Capital",
    icon: "📈",
    accent: "from-indigo-500 to-violet-500",
    desc: "Share capital increase filings and supporting documentation. Useful when raising capital or meeting regulatory thresholds.",
    needs: [
      "Current authorised capital",
      "Resolution of directors",
      "Form of allotment (where applicable)",
      "Stamp duty plan",
    ],
  },
  {
    title: "Change of Name (Director / Proprietor)",
    icon: "✍️",
    accent: "from-emerald-500 to-teal-500",
    desc: "Name change filings for directors or proprietors — including marriage, deed-poll, and corrections.",
    needs: [
      "Old & new names",
      "Supporting evidence (marriage cert / deed poll / affidavit)",
      "ID with new name",
    ],
  },
  {
    title: "Reprint (Lost / Misplaced Certificate)",
    icon: "📜",
    accent: "from-amber-500 to-orange-500",
    desc: "Replace lost or damaged CAC certificates and recover your registration documents.",
    needs: [
      "RC / BN number",
      "Police report (where applicable)",
      "Affidavit of loss",
      "Proprietor / director ID",
    ],
  },
  {
    title: "Trademark Registration",
    icon: "™️",
    accent: "from-fuchsia-500 to-pink-500",
    desc: "Trademark search and registration support to protect your brand, logo, and product names.",
    needs: [
      "Mark / logo files (PNG/SVG)",
      "List of goods or services",
      "Class(es) of registration",
      "Applicant details",
    ],
  },
  {
    title: "SCUML Registration",
    icon: "🛡️",
    accent: "from-slate-700 to-slate-900",
    desc: "SCUML registration for eligible Designated Non-Financial Businesses and Professions — required for compliance & banking.",
    needs: [
      "RC / BN certificate",
      "Tax Identification Number (TIN)",
      "Directors / Trustees details",
      "Bank verification information",
    ],
  },
  {
    title: "Business Consulting",
    icon: "💡",
    accent: "from-rose-500 to-orange-500",
    desc: "Practical guidance for structuring your business, preparing for incorporation, and meeting compliance ahead of growth or fundraising.",
    needs: [
      "What you want to achieve",
      "Current structure / status",
      "Key timelines",
      "Stakeholders involved",
    ],
  },
];

export default function PostIncorporationPage() {
  const wa = whatsappLink(
    "Hi LARIAL LTD — I need help with a post-incorporation filing."
  );

  return (
    <div className="min-h-screen">
      <Header />

      <PageHero
        eyebrow="Post-Incorporation Services"
        title={
          <>
            Stay compliant.{" "}
            <span className="text-gradient-brand">Year after year.</span>
          </>
        }
        subtitle="Registration is just the start. We help you maintain CAC compliance, protect your brand, and update your records as your business evolves."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={wa}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-600 to-indigo-500 px-6 text-sm font-semibold text-white shadow-md hover:shadow-lg"
          >
            Start a filing
          </a>
          <Link
            href="/services"
            className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            All services
          </Link>
        </div>
      </PageHero>

      {/* Service deep cards */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid gap-6 lg:grid-cols-2">
            {ITEMS.map((it) => (
              <article
                key={it.title}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_25px_50px_-30px_rgba(2,132,199,0.45)]"
              >
                <div className={`absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${it.accent} opacity-15 blur-2xl transition group-hover:opacity-25`} />
                <div className="flex items-start gap-4">
                  <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${it.accent} text-2xl text-white shadow-md`}>
                    <span>{it.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-[family-name:var(--font-manrope)] text-xl font-extrabold tracking-tight text-slate-900">
                      {it.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{it.desc}</p>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    What we typically need
                  </div>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {it.needs.map((n) => (
                      <li key={n} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
                        {n}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <a
                    href={whatsappLink(`Hi LARIAL LTD — I'd like to start: ${it.title}.`)}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-sky-700 hover:text-sky-800"
                  >
                    Start this on WhatsApp
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </a>
                  <span className="text-xs text-slate-500">Pricing on request</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance reminders */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-sky-100/60 via-white to-indigo-100/60 blur-2xl" />
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="grid gap-3">
                  {[
                    {
                      k: "Annually",
                      t: "File annual returns",
                      d: "Failure to file attracts penalties and can prevent post-incorporation changes.",
                    },
                    {
                      k: "On change",
                      t: "Update CAC records",
                      d: "Director changes, registered office moves, share capital — all filed with CAC.",
                    },
                    {
                      k: "On launch",
                      t: "Protect your brand",
                      d: "Trademark search before you scale advertising. Lock in your name and logo early.",
                    },
                  ].map((r) => (
                    <div key={r.t} className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-gradient-to-br from-sky-50/40 to-white p-4">
                      <div className="grid h-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-500 px-3 text-[11px] font-extrabold text-white">
                        {r.k}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">{r.t}</div>
                        <div className="mt-1 text-sm text-slate-600">{r.d}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                Stay ahead
              </div>
              <h2 className="mt-3 font-[family-name:var(--font-manrope)] text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                A quick compliance rhythm.
              </h2>
              <p className="mt-3 text-slate-600">
                Most issues founders run into with CAC come from missed
                deadlines or stale records. We&apos;ll set you up with a simple
                rhythm so you stay in good standing — without thinking about
                it.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-700">
                {[
                  "Annual returns reminders",
                  "Director / shareholder change tracking",
                  "Brand protection (trademark) advice",
                  "SCUML eligibility check",
                ].map((x) => (
                  <li key={x} className="flex items-start gap-3">
                    <div className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                    </div>
                    <span>{x}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={wa}
                  className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-sky-600 to-indigo-500 px-6 text-sm font-semibold text-white"
                >
                  Get a compliance check
                </a>
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-800"
                >
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
