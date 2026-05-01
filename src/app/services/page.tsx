import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { getServices } from "@/lib/content";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "CAC services from LARIAL LTD — Business Name, Limited Company, Incorporated Trustees, Annual Returns, Trademark, SCUML, and more.",
};

function formatNgn(n: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(n);
}

const ICONS: Record<string, string> = {
  "Business Name Registration (BN)": "📇",
  "Company Registration (LTD)": "🏢",
  "Incorporated Trustees": "🤝",
  "Annual Returns": "🗂️",
  "Increase in Share Capital": "📈",
  "Change of Name (Director / Proprietor)": "✍️",
  "Reprint (Lost / Misplaced Certificate)": "📜",
  "Business Consulting": "💡",
  "Trademark Registration": "™️",
  "SCUML Registration": "🛡️",
  "Software Development": "💻",
  "Mobile App Development": "📱",
  "Web Development": "🌐",
  "UI / UX Design": "🎨",
  "Cloud & DevOps": "☁️",
  "IT Consulting": "🧠",
};

const CATEGORIES: { id: string; label: string; titles: string[] }[] = [
  {
    id: "registration",
    label: "Registration",
    titles: [
      "Business Name Registration (BN)",
      "Company Registration (LTD)",
      "Incorporated Trustees",
    ],
  },
  {
    id: "post",
    label: "Post-incorporation",
    titles: [
      "Annual Returns",
      "Increase in Share Capital",
      "Change of Name (Director / Proprietor)",
      "Reprint (Lost / Misplaced Certificate)",
    ],
  },
  {
    id: "advisory",
    label: "Advisory & Brand",
    titles: ["Business Consulting", "Trademark Registration", "SCUML Registration"],
  },
  {
    id: "technology",
    label: "Technology",
    titles: [
      "Software Development",
      "Mobile App Development",
      "Web Development",
      "UI / UX Design",
      "Cloud & DevOps",
      "IT Consulting",
    ],
  },
];

const FAQS = [
  {
    q: "Can I register a CAC business if I live abroad?",
    a: "Yes. Most of our clients are Nigerians abroad. We collect documents over WhatsApp/email and handle the entire CAC workflow on your behalf.",
  },
  {
    q: "How long does registration take?",
    a: "Most filings complete within 3–7 working days, depending on CAC turnaround and document readiness. We give a realistic estimate after we see your specifics.",
  },
  {
    q: "What documents will I need?",
    a: "It depends on the structure (BN, LTD, or Incorporated Trustees). After you tell us what you want, we send a tailored checklist — no guesswork.",
  },
  {
    q: "Are your prices fixed?",
    a: "Listed prices are starting estimates. Final pricing depends on share capital, classification, and add-ons. We confirm the final amount before you pay anything to CAC.",
  },
];

export default async function ServicesPage() {
  const services = await getServices();
  const wa = whatsappLink(
    "Hi LARIAL LTD — I'd like to know more about your CAC services."
  );

  return (
    <div className="min-h-screen">
      <Header />

      <PageHero
        eyebrow="Our Services"
        title={
          <>
            Every CAC service you need —{" "}
            <span className="text-gradient-brand">in one place.</span>
          </>
        }
        subtitle="Pick a service to learn what's included, what's required, and what it typically costs. Pricing shown is a starting estimate; we confirm final pricing on WhatsApp."
      >
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="inline-flex h-10 items-center justify-center rounded-full border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
            >
              {c.label}
            </a>
          ))}
          <a
            href={wa}
            className="inline-flex h-10 items-center justify-center rounded-full bg-gradient-to-r from-sky-600 to-indigo-500 px-4 text-xs font-semibold text-white shadow"
          >
            Talk to us
          </a>
        </div>
      </PageHero>

      {CATEGORIES.map((cat, idx) => {
        const items = cat.titles
          .map((t) => services.find((s) => s.title === t))
          .filter((x): x is NonNullable<typeof x> => Boolean(x));

        return (
          <section
            key={cat.id}
            id={cat.id}
            className={
              idx % 2 === 0
                ? "border-y border-slate-200 bg-white"
                : "bg-slate-50"
            }
          >
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
                    {cat.label}
                  </div>
                  <h2 className="mt-3 font-[family-name:var(--font-manrope)] text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                    {cat.label === "Registration"
                      ? "Start your business properly."
                      : cat.label === "Post-incorporation"
                        ? "Stay compliant year after year."
                        : cat.label === "Technology"
                          ? "Build the digital side of your business."
                          : "Grow, advise, protect."}
                  </h2>
                </div>
              </div>

              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((svc) => (
                  <div
                    key={svc.title}
                    className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-[0_20px_40px_-25px_rgba(2,132,199,0.45)]"
                  >
                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-sky-100 to-indigo-100 opacity-0 blur-2xl transition group-hover:opacity-100" />
                    <div className="flex items-center justify-between">
                      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-sky-100 to-indigo-100 text-xl">
                        {ICONS[svc.title] ?? "📄"}
                      </div>
                      {typeof svc.startingFromNgn === "number" ? (
                        <div className="rounded-full bg-sky-50 px-2.5 py-1 text-[11px] font-bold text-sky-700">
                          from {formatNgn(svc.startingFromNgn)}
                        </div>
                      ) : (
                        <div className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600">
                          on request
                        </div>
                      )}
                    </div>
                    <div className="mt-4 text-base font-bold text-slate-900">
                      {svc.title}
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {svc.description}
                    </p>
                    <a
                      href={whatsappLink(`Hi LARIAL LTD — I'd like to discuss: ${svc.title}.`)}
                      className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-sky-700 hover:text-sky-800"
                    >
                      Talk to us
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* What we'll need */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                What you&apos;ll need
              </div>
              <h2 className="mt-3 font-[family-name:var(--font-manrope)] text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                A typical document checklist.
              </h2>
              <p className="mt-3 text-slate-600">
                Final requirements depend on the structure you&apos;re registering.
                We send a tailored checklist after you tell us what you want.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  "Two proposed business names",
                  "Description of business activities",
                  "Proprietors/Directors info (name, DOB, address, ID)",
                  "Means of identification (NIN/Passport/Driver's License)",
                  "Recent passport photograph (where applicable)",
                  "Registered office address",
                  "Share capital & shareholding (LTD)",
                  "Trustees & constitution (Incorporated Trustees)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-3">
                    <div className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-sky-100/60 via-white to-indigo-100/60 blur-2xl" />
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="grid gap-3">
                  {[
                    { k: "01", t: "Tell us the structure", d: "BN, LTD, or Incorporated Trustees." },
                    { k: "02", t: "Get the checklist", d: "Tailored to your case — no guessing." },
                    { k: "03", t: "Submit + relax", d: "We process and update you to completion." },
                  ].map((step) => (
                    <div key={step.k} className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-gradient-to-br from-sky-50/40 to-white p-4">
                      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-500 text-sm font-extrabold text-white">
                        {step.k}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">{step.t}</div>
                        <div className="mt-0.5 text-sm text-slate-600">{step.d}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
              FAQ
            </div>
            <h2 className="mt-3 font-[family-name:var(--font-manrope)] text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Common questions.
            </h2>
          </div>
          <div className="mt-10 space-y-3">
            {FAQS.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-slate-200 bg-white p-5 open:shadow-md"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-sm font-bold text-slate-900">
                  {f.q}
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sky-50 text-sky-700 transition group-open:rotate-45">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-6 text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/contact"
              className="inline-flex h-11 items-center justify-center rounded-full bg-slate-900 px-6 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Still have questions? Contact us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
