import Link from "next/link";
import { AnimatedHero } from "@/components/AnimatedHero";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { WorkCard } from "@/components/WorkCard";
import { GridBackdrop } from "@/components/Decor";
import {
  getServices,
  getSettings,
  getTestimonials,
  getWorks,
} from "@/lib/content";
import { whatsappLink } from "@/lib/site";

function formatNgn(n: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(n);
}

const SERVICE_ICONS: Record<string, string> = {
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

export default async function Home() {
  const [settings, services, testimonials, works] = await Promise.all([
    getSettings(),
    getServices(),
    getTestimonials(),
    getWorks(),
  ]);
  const wa = whatsappLink(
    "Hi LARIAL LTD — I want to register a business/company with CAC. Please guide me."
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: settings.name,
    description: settings.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address,
      addressRegion: "Kaduna",
      addressCountry: "NG",
    },
    telephone: settings.whatsappE164,
    email: settings.email,
    areaServed: "Worldwide",
    url: process.env.NEXT_PUBLIC_SITE_URL,
  };

  const homeServices = services.slice(0, 6);
  const featuredTestimonials = testimonials.filter((item) => item.featured).slice(0, 3);
  const featuredWorks = works.filter((item) => item.featured).slice(0, 3);

  return (
    <div className="min-h-screen">
      <Header />

      <AnimatedHero
        subtitle={settings.tagline}
        badge="Verified CAC Merchant"
        officeAddressLine="Malha Plaza (Adjacent Kamazou U-Turn), Kamazou, Kaduna State"
        officeHoursLine={settings.hours}
        ctaPrimary={{ label: "Start on WhatsApp", href: wa }}
        ctaSecondary={{ label: "View services", href: "/services" }}
      />

      {/* Logo strip / trust band */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              CAC compliance + technology partner
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold text-slate-700">
              <span className="rounded-full bg-slate-100 px-3 py-1">CAC Accredited</span>
              <span className="rounded-full bg-slate-100 px-3 py-1">Software Builds</span>
              <span className="rounded-full bg-slate-100 px-3 py-1">Mobile Apps</span>
              <span className="rounded-full bg-slate-100 px-3 py-1">Web Development</span>
              <span className="rounded-full bg-slate-100 px-3 py-1">UI / UX Design</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section id="services" className="relative border-b border-slate-200 bg-white">
        <GridBackdrop />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
                Services
              </div>
              <h2 className="mt-3 font-[family-name:var(--font-manrope)] text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                CAC services, end-to-end.
              </h2>
              <p className="mt-3 max-w-2xl text-slate-600">
                From business names to trustees — we guide the requirements,
                prepare filings, and keep you updated. Pricing is a starting
                estimate; confirm on WhatsApp.
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href="/services"
                className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
              >
                View all
              </Link>
              <a
                href={wa}
                className="inline-flex h-11 items-center justify-center rounded-full bg-gradient-to-r from-sky-600 to-indigo-500 px-5 text-sm font-semibold text-white shadow-md hover:shadow-lg"
              >
                Get requirements
              </a>
            </div>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {homeServices.map((svc) => (
              <div
                key={svc.title}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-[0_20px_40px_-25px_rgba(2,132,199,0.45)]"
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-sky-100 to-indigo-100 opacity-0 blur-2xl transition group-hover:opacity-100" />
                <div className="flex items-center justify-between">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-sky-100 to-indigo-100 text-xl">
                    {SERVICE_ICONS[svc.title] ?? "📄"}
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
                <div className="mt-5 flex items-center gap-1 text-sm font-semibold text-sky-700">
                  Talk to us
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process timeline */}
      <section id="process" className="relative border-b border-slate-200 bg-slate-50">
        <div className="absolute inset-0 -z-10 bg-mesh-soft" />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-3 py-1 text-xs font-semibold text-indigo-700">
              Process
            </div>
            <h2 className="mt-3 font-[family-name:var(--font-manrope)] text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Simple. Guided. Transparent.
            </h2>
            <p className="mt-3 text-slate-600">
              We keep it straightforward — so you always know what&apos;s next.
            </p>
          </div>

          <ol className="relative mt-12 grid gap-6 lg:grid-cols-3">
            {[
              {
                k: "01",
                t: "Tell us what you need",
                d: "Start on WhatsApp. We ask a few questions and share the exact checklist.",
                icon: (
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                ),
              },
              {
                k: "02",
                t: "Share documents",
                d: "Send your information and required documents. We review for completeness.",
                icon: (
                  <>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6" />
                  </>
                ),
              },
              {
                k: "03",
                t: "We process + update you",
                d: "We handle the CAC filing workflow and keep you posted until completion.",
                icon: (
                  <>
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9 12l2 2 4-4" />
                  </>
                ),
              },
            ].map((step) => (
              <li
                key={step.k}
                className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="absolute right-6 top-6 text-5xl font-black text-slate-100">
                  {step.k}
                </div>
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-500 text-white shadow-md">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {step.icon}
                  </svg>
                </div>
                <div className="mt-4 text-base font-bold text-slate-900">{step.t}</div>
                <div className="mt-2 text-sm leading-6 text-slate-600">{step.d}</div>
              </li>
            ))}
          </ol>

          <div className="mt-10 grid gap-6 rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-sky-50/40 p-6 sm:grid-cols-[1fr_auto] sm:items-center">
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-sky-100 text-sky-700">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s7-7.58 7-13a7 7 0 0 0-14 0c0 5.42 7 13 7 13z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Kaduna office
                </div>
                <div className="mt-1 text-sm font-bold text-slate-900">{settings.address}</div>
                <div className="mt-1 text-sm text-slate-600">{settings.hours}</div>
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex h-11 items-center justify-center rounded-full bg-slate-900 px-5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Visit / contact
            </Link>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="relative border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                Why LARIAL
              </div>
              <h2 className="mt-3 font-[family-name:var(--font-manrope)] text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Compliance you can trust. Pace you can plan.
              </h2>
              <p className="mt-3 max-w-xl text-slate-600">
                We&apos;ve built our practice around three things: clear
                communication, careful documentation, and dependable timelines.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  ["CAC accredited", "We're verified merchants — your filings go through proper channels."],
                  ["WhatsApp-first", "Talk to a human, not a form. We share checklists tailored to your case."],
                  ["End-to-end", "From availability checks to certificate delivery — we handle each step."],
                  ["Post-incorporation", "We don't disappear after registration. Annual returns, changes, and more."],
                ].map(([t, d]) => (
                  <li key={t} className="flex gap-4">
                    <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">{t}</div>
                      <div className="mt-1 text-sm text-slate-600">{d}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-sky-100/60 via-white to-indigo-100/60 blur-2xl" />
              <div className="relative grid gap-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-2">
                {[
                  { k: "500+", l: "Filings completed" },
                  { k: "3–7d", l: "Avg. turnaround" },
                  { k: "100%", l: "Document review" },
                  { k: "24/7", l: "WhatsApp inbox" },
                ].map((s) => (
                  <div
                    key={s.k}
                    className="rounded-2xl border border-slate-100 bg-gradient-to-br from-sky-50/50 to-white p-5"
                  >
                    <div className="font-[family-name:var(--font-manrope)] text-3xl font-black text-slate-900">
                      {s.k}
                    </div>
                    <div className="mt-1 text-sm text-slate-600">{s.l}</div>
                  </div>
                ))}
                <div className="rounded-2xl bg-gradient-to-br from-sky-600 to-indigo-600 p-5 text-white sm:col-span-2">
                  <div className="text-xs font-semibold uppercase tracking-wider opacity-80">
                    From WhatsApp to Certificate
                  </div>
                  <div className="mt-1 font-[family-name:var(--font-manrope)] text-xl font-extrabold">
                    One conversation. Everything handled.
                  </div>
                  <a
                    href={wa}
                    className="mt-4 inline-flex h-10 items-center justify-center rounded-full bg-white px-4 text-sm font-semibold text-sky-700 hover:bg-slate-50"
                  >
                    Start now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured work */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
                Our Work
              </div>
              <h2 className="mt-3 font-[family-name:var(--font-manrope)] text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Proof across CAC, software, mobile, and web.
              </h2>
              <p className="mt-3 text-slate-600">
                Recent work highlights, from registration deadlines to shipped
                digital products.
              </p>
            </div>
            <Link
              href="/works"
              className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
            >
              View all work
            </Link>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {featuredWorks.map((work, idx) => (
              <WorkCard key={work.id} work={work} priority={idx === 0} />
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection testimonials={featuredTestimonials} />

      {/* CTA banner */}
      <section className="relative isolate overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 -z-10 bg-mesh-sky opacity-80" />
        <div className="absolute inset-0 -z-10 bg-grid opacity-20" />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <h2 className="font-[family-name:var(--font-manrope)] text-3xl font-extrabold leading-tight sm:text-4xl">
                Register today. Build tomorrow.
              </h2>
              <p className="mt-3 max-w-xl text-slate-300">
                Whether you&apos;re starting fresh or formalising an existing
                hustle, we&apos;ll get your CAC paperwork right — wherever you are.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={wa}
                  className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-slate-900 hover:bg-slate-100"
                >
                  WhatsApp now
                </a>
                <Link
                  href="/services"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur hover:bg-white/15"
                >
                  Explore services
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                ["BN", "Business Names"],
                ["LTD", "Limited Companies"],
                ["IT", "Incorporated Trustees"],
                ["💻", "Software"],
                ["📱", "Mobile Apps"],
                ["🌐", "Web & UI/UX"],
              ].map(([k, l]) => (
                <div
                  key={l}
                  className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur"
                >
                  <div className="text-2xl font-extrabold">{k}</div>
                  <div className="mt-1 text-sm text-slate-200">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ContactSection whatsappHref={wa} email={settings.email} />

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
