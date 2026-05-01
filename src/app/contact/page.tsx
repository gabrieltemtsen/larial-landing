import type { Metadata } from "next";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { getSettings } from "@/lib/content";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Reach LARIAL LTD on WhatsApp, email, or visit our Kaduna office. We respond within working hours, Monday to Friday.",
};

export default async function ContactPage() {
  const s = await getSettings();
  const wa = whatsappLink();

  const channels = [
    {
      label: "WhatsApp",
      value: s.whatsappE164,
      href: wa,
      icon: (
        <path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 .04 5.33.04 11.97a11.9 11.9 0 0 0 1.6 5.96L0 24l6.22-1.63a11.96 11.96 0 0 0 5.78 1.47h.01c6.62 0 11.96-5.33 11.96-11.97 0-3.2-1.25-6.21-3.45-8.39Z" />
      ),
      filled: true,
      sub: "Fastest channel — we reply during working hours.",
    },
    {
      label: "Email",
      value: s.email,
      href: `mailto:${s.email}`,
      icon: (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </>
      ),
      filled: false,
      sub: "Best for detailed enquiries with attachments.",
    },
    {
      label: "Office",
      value: s.address,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.address)}`,
      icon: (
        <>
          <path d="M12 22s7-7.58 7-13a7 7 0 0 0-14 0c0 5.42 7 13 7 13z" />
          <circle cx="12" cy="9" r="2.5" />
        </>
      ),
      filled: false,
      sub: "Walk-ins welcome during working hours.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      <PageHero
        eyebrow="Contact Us"
        title={
          <>
            Let&apos;s <span className="text-gradient-brand">get registered.</span>
          </>
        }
        subtitle="Tell us what you want to register and we'll send the exact requirements. WhatsApp is our fastest channel."
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className={[
                "group flex items-start gap-4 rounded-3xl border p-5 transition",
                c.filled
                  ? "border-transparent bg-gradient-to-br from-sky-600 to-indigo-500 text-white shadow-md hover:shadow-lg"
                  : "border-slate-200 bg-white hover:border-sky-300 hover:shadow-md",
              ].join(" ")}
            >
              <div
                className={[
                  "grid h-11 w-11 shrink-0 place-items-center rounded-2xl",
                  c.filled
                    ? "bg-white/15 text-white"
                    : "bg-gradient-to-br from-sky-100 to-indigo-100 text-sky-700",
                ].join(" ")}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill={c.filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {c.icon}
                </svg>
              </div>
              <div className="min-w-0">
                <div className={["text-xs font-semibold uppercase tracking-wider", c.filled ? "text-sky-100" : "text-sky-700"].join(" ")}>
                  {c.label}
                </div>
                <div className={["mt-1 truncate text-sm font-bold", c.filled ? "text-white" : "text-slate-900"].join(" ")}>
                  {c.value}
                </div>
                <div className={["mt-1 text-xs", c.filled ? "text-sky-100" : "text-slate-600"].join(" ")}>
                  {c.sub}
                </div>
              </div>
            </a>
          ))}
        </div>
      </PageHero>

      {/* Office details */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
                Visit us
              </div>
              <h2 className="mt-3 font-[family-name:var(--font-manrope)] text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Our Kaduna office.
              </h2>
              <p className="mt-3 text-slate-600">
                Walk-ins are welcome during working hours. For faster service,
                send a WhatsApp first so we can prepare your file.
              </p>

              <dl className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Address
                  </dt>
                  <dd className="mt-1 text-sm font-bold text-slate-900">
                    {s.address}
                  </dd>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Working hours
                  </dt>
                  <dd className="mt-1 text-sm font-bold text-slate-900">
                    {s.hours}
                  </dd>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    WhatsApp
                  </dt>
                  <dd className="mt-1 text-sm font-bold text-slate-900">
                    {s.whatsappE164}
                  </dd>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Email
                  </dt>
                  <dd className="mt-1 text-sm font-bold text-slate-900">
                    {s.email}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Map placeholder */}
            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-sky-100/60 via-white to-indigo-100/60 blur-2xl" />
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.address)}`}
                target="_blank"
                rel="noreferrer"
                className="relative block overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:shadow-lg"
              >
                <div className="relative h-72 w-full bg-gradient-to-br from-sky-100 via-white to-indigo-100">
                  <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
                  <svg
                    viewBox="0 0 600 320"
                    className="absolute inset-0 h-full w-full"
                    aria-hidden
                  >
                    <defs>
                      <linearGradient id="route" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#0ea5e9" />
                        <stop offset="100%" stopColor="#6366f1" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M40 240 C 130 200, 200 280, 280 230 S 460 110, 560 80"
                      stroke="url(#route)"
                      strokeWidth="4"
                      strokeDasharray="6 8"
                      fill="none"
                    />
                    <circle cx="40" cy="240" r="8" fill="#0ea5e9" />
                    <circle cx="560" cy="80" r="10" fill="#6366f1" />
                  </svg>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-center shadow backdrop-blur">
                    <div className="text-xs font-semibold uppercase tracking-wider text-sky-700">
                      Kamazou, Kaduna
                    </div>
                    <div className="mt-1 text-sm font-bold text-slate-900">
                      Malha Plaza
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-slate-200 px-5 py-4">
                  <div className="text-sm text-slate-600">Open in Google Maps</div>
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <ContactSection whatsappHref={wa} email={s.email} />

      <Footer />
    </div>
  );
}
