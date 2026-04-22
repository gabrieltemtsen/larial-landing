import { AnimatedHero } from "@/components/AnimatedHero";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getServices, getSettings } from "@/lib/content";
import { whatsappLink } from "@/lib/site";

function formatNgn(n: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(n);
}

export default async function Home() {
  const settings = await getSettings();
  const services = await getServices();
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

  return (
    <div className="min-h-screen">
      <Header />

      <AnimatedHero
        title="Register your CAC business or company — from anywhere"
        subtitle="LARIAL LTD is a verified CAC merchant helping Nigerian individuals worldwide register Business Names, LTD companies, and Incorporated Trustees. Clear requirements, guided documentation, and fast WhatsApp support."
        ctaPrimary={{ label: "Start on WhatsApp", href: wa }}
        ctaSecondary={{ label: "View services", href: "#services" }}
      />

      <section id="services" className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-[family-name:var(--font-manrope)] text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                CAC registration services
              </h2>
              <p className="mt-2 max-w-2xl text-slate-600">
                Typical CAC merchant services, delivered with a simple, guided
                process. Pricing is a starting estimate — confirm on WhatsApp.
              </p>
            </div>
            <a
              href={wa}
              className="inline-flex h-11 items-center justify-center rounded-full bg-sky-600 px-5 text-sm font-semibold text-white transition hover:bg-sky-700"
            >
              Get requirements
            </a>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((svc) => (
              <div
                key={svc.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="text-sm font-semibold text-slate-900">
                  {svc.title}
                </div>
                {typeof svc.startingFromNgn === "number" ? (
                  <div className="mt-2 text-xs font-semibold text-sky-700">
                    Starting from {formatNgn(svc.startingFromNgn)}
                  </div>
                ) : (
                  <div className="mt-2 text-xs font-semibold text-slate-500">
                    Pricing on request
                  </div>
                )}
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {svc.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="font-[family-name:var(--font-manrope)] text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Simple process
          </h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            We keep it straightforward — so you always know what’s next.
          </p>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {[{
              k: "1",
              t: "Tell us what you need",
              d: "Start on WhatsApp. We ask a few questions and share the exact checklist.",
            },
            {
              k: "2",
              t: "Share documents",
              d: "Send your information and required documents. We review for completeness.",
            },
            {
              k: "3",
              t: "We process + update you",
              d: "We handle the CAC filing workflow and keep you updated until completion.",
            }].map((step) => (
              <div
                key={step.k}
                className="rounded-3xl border border-slate-200 bg-white p-6"
              >
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sky-600 text-sm font-extrabold text-white">
                  {step.k}
                </div>
                <div className="mt-4 text-base font-semibold text-slate-900">
                  {step.t}
                </div>
                <div className="mt-2 text-sm leading-6 text-slate-600">
                  {step.d}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6">
            <div className="text-sm font-semibold text-slate-900">Kaduna office</div>
            <div className="mt-2 text-sm text-slate-600">{settings.address}</div>
            <div className="mt-1 text-sm text-slate-600">{settings.hours}</div>
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
