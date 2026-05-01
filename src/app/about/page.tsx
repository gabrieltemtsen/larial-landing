import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { ShieldGraphic } from "@/components/Decor";
import { getSettings } from "@/lib/content";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "About LARIAL LTD — a verified CAC merchant helping Nigerians worldwide register and maintain compliant businesses, with an onsite office in Kaduna State.",
};

export default async function AboutPage() {
  const s = await getSettings();
  const wa = whatsappLink();

  return (
    <div className="min-h-screen">
      <Header />

      <PageHero
        eyebrow="About Us"
        title={
          <>
            Building <span className="text-gradient-brand">trustworthy</span>{" "}
            companies — wherever Nigerians live.
          </>
        }
        subtitle={
          <>
            LARIAL LTD is a verified CAC merchant helping Nigerians at home and
            abroad register Business Names, Limited Liability Companies (LTD),
            and Incorporated Trustees — fast, guided, and reliable.
          </>
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={wa}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-600 to-indigo-500 px-6 text-sm font-semibold text-white shadow-md hover:shadow-lg"
          >
            Talk to a CAC merchant
          </a>
          <Link
            href="/services"
            className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Explore services
          </Link>
        </div>
      </PageHero>

      {/* Story + Shield graphic */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
              Our story
            </div>
            <h2 className="mt-3 font-[family-name:var(--font-manrope)] text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Built around clarity, not paperwork.
            </h2>
            <div className="mt-5 space-y-4 text-slate-600">
              <p>
                Too many founders run their businesses informally because the
                CAC process feels intimidating, slow, or far away. We started
                LARIAL LTD to change that — pairing a friendly, WhatsApp-first
                experience with the precision of a verified CAC merchant.
              </p>
              <p>
                Whether you&apos;re a freelancer in Lagos, a tech worker in
                Toronto, or a small business owner in Kaduna, our team handles
                the requirements, paperwork, and follow-ups so you can focus on
                building.
              </p>
              <p>
                We operate from our office at {s.address.replace(/\.$/, "")},
                and serve clients worldwide.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { k: "500+", l: "Filings completed" },
                { k: "3–7d", l: "Avg. turnaround" },
                { k: "100%", l: "Document review" },
              ].map((stat) => (
                <div
                  key={stat.k}
                  className="rounded-2xl border border-slate-200 bg-gradient-to-br from-sky-50/50 to-white p-5"
                >
                  <div className="font-[family-name:var(--font-manrope)] text-3xl font-black text-slate-900">
                    {stat.k}
                  </div>
                  <div className="mt-1 text-sm text-slate-600">{stat.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-sky-200/60 via-white to-indigo-200/60 blur-2xl" />
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <ShieldGraphic className="mx-auto h-56 w-56" />
              <div className="mt-6 text-center">
                <div className="text-xs font-semibold uppercase tracking-wider text-sky-700">
                  Verified merchant
                </div>
                <div className="mt-1 font-[family-name:var(--font-manrope)] text-xl font-extrabold text-slate-900">
                  CAC compliance, done right.
                </div>
                <div className="mt-2 text-sm text-slate-600">
                  Authorised channels. Real documentation. Reliable timelines.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                tag: "Mission",
                t: "Make CAC compliance simple for every founder.",
                d: "Translate the regulatory complexity into clear next steps — so registration becomes a one-conversation experience.",
                from: "from-sky-500",
                to: "to-cyan-500",
              },
              {
                tag: "Vision",
                t: "A Nigeria where every business is properly registered.",
                d: "We see formalisation as a launchpad — for credit, for partnerships, for cross-border opportunity.",
                from: "from-indigo-500",
                to: "to-violet-500",
              },
              {
                tag: "Values",
                t: "Clarity. Care. Compliance.",
                d: "We tell you what we know, do what we say, and document everything to the standards CAC expects.",
                from: "from-emerald-500",
                to: "to-teal-500",
              },
            ].map((card) => (
              <div
                key={card.tag}
                className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div
                  className={`absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br ${card.from} ${card.to} opacity-20 blur-2xl`}
                />
                <div
                  className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${card.from} ${card.to} px-3 py-1 text-xs font-semibold text-white`}
                >
                  {card.tag}
                </div>
                <h3 className="mt-3 font-[family-name:var(--font-manrope)] text-xl font-extrabold text-slate-900">
                  {card.t}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{card.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
              What we do
            </div>
            <h2 className="mt-3 font-[family-name:var(--font-manrope)] text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              CAC compliance{" "}
              <span className="text-gradient-brand">+ the tech</span> to grow on.
            </h2>
            <p className="mt-3 text-slate-600">
              We support founders across the entire CAC lifecycle and help them
              build the digital side of their business — from custom software
              and mobile apps to modern websites.
            </p>
          </div>

          <div className="mt-10">
            <div className="text-xs font-semibold uppercase tracking-wider text-sky-700">
              CAC compliance
            </div>
            <div className="mt-3 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { t: "Register", d: "BN, LTD, Incorporated Trustees", icon: "📇" },
                { t: "Maintain", d: "Annual returns & filings", icon: "🗂️" },
                { t: "Update", d: "Capital, names, directors", icon: "✍️" },
                { t: "Protect", d: "Trademarks & SCUML", icon: "🛡️" },
              ].map((card) => (
                <div
                  key={card.t}
                  className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-sky-50/30 p-6"
                >
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-sky-100 to-indigo-100 text-xl">
                    {card.icon}
                  </div>
                  <div className="mt-4 text-base font-bold text-slate-900">
                    {card.t}
                  </div>
                  <div className="mt-1 text-sm text-slate-600">{card.d}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <div className="text-xs font-semibold uppercase tracking-wider text-indigo-700">
              Technology
            </div>
            <div className="mt-3 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  t: "Software Development",
                  d: "Custom software, internal tools, and SaaS — from idea to launch.",
                  icon: "💻",
                  accent: "from-sky-500 to-indigo-500",
                },
                {
                  t: "Mobile App Development",
                  d: "iOS & Android apps using React Native or Flutter — to App Store ready.",
                  icon: "📱",
                  accent: "from-cyan-500 to-sky-500",
                },
                {
                  t: "Web Development",
                  d: "Fast, mobile-first websites, portals, and storefronts.",
                  icon: "🌐",
                  accent: "from-indigo-500 to-violet-500",
                },
                {
                  t: "UI / UX Design",
                  d: "Research, wireframes, high-fidelity UI, design systems.",
                  icon: "🎨",
                  accent: "from-fuchsia-500 to-pink-500",
                },
                {
                  t: "Cloud & DevOps",
                  d: "Reliable infra, CI/CD, monitoring on AWS / GCP / Azure.",
                  icon: "☁️",
                  accent: "from-emerald-500 to-teal-500",
                },
                {
                  t: "IT Consulting",
                  d: "Tech choices, vendor selection, security, digital strategy.",
                  icon: "🧠",
                  accent: "from-amber-500 to-orange-500",
                },
              ].map((card) => (
                <div
                  key={card.t}
                  className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-25px_rgba(99,102,241,0.4)]"
                >
                  <div
                    className={`absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br ${card.accent} opacity-15 blur-2xl transition group-hover:opacity-25`}
                  />
                  <div
                    className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${card.accent} text-2xl text-white shadow-md`}
                  >
                    <span>{card.icon}</span>
                  </div>
                  <div className="mt-4 text-base font-bold text-slate-900">
                    {card.t}
                  </div>
                  <div className="mt-1 text-sm leading-6 text-slate-600">
                    {card.d}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-sky-600 via-sky-500 to-indigo-600 p-8 text-white shadow-xl sm:p-12">
            <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div>
                <h2 className="font-[family-name:var(--font-manrope)] text-2xl font-extrabold sm:text-3xl">
                  Ready to start? It&apos;s one WhatsApp away.
                </h2>
                <p className="mt-3 max-w-xl text-sky-50">
                  Tell us what you want to register and we&apos;ll send the
                  exact requirements within working hours.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <a
                  href={wa}
                  className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-sky-700 hover:bg-slate-100"
                >
                  WhatsApp us
                </a>
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur hover:bg-white/15"
                >
                  Contact page
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
