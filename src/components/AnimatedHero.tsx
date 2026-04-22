"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function AnimatedHero({
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  badge,
  officeAddressLine,
  officeHoursLine,
}: {
  title: string;
  subtitle: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
  badge?: string;
  officeAddressLine: string;
  officeHoursLine: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_30%,rgba(56,189,248,0.25),transparent_45%),radial-gradient(circle_at_85%_20%,rgba(14,165,233,0.18),transparent_40%),radial-gradient(circle_at_40%_110%,rgba(148,163,184,0.18),transparent_50%)]" />

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.25fr_0.75fr]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700">
            <span className="h-2 w-2 rounded-full bg-sky-500" />
            {badge ?? "Verified CAC Merchant"}
          </div>
          <h1 className="mt-5 font-[family-name:var(--font-manrope)] text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
            {subtitle}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={ctaPrimary.href}
              className="inline-flex h-12 items-center justify-center rounded-full bg-sky-600 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
            >
              {ctaPrimary.label}
            </a>
            <a
              href={ctaSecondary.href}
              className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
            >
              {ctaSecondary.label}
            </a>
          </div>

          <div className="mt-8 grid max-w-xl grid-cols-3 gap-4 text-sm">
            <div className="rounded-2xl border border-slate-200 bg-white/70 p-4">
              <div className="font-semibold text-slate-900">Worldwide</div>
              <div className="mt-1 text-slate-600">For Nigerians abroad & at home</div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/70 p-4">
              <div className="font-semibold text-slate-900">Guided</div>
              <div className="mt-1 text-slate-600">Clear checklist + document help</div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/70 p-4">
              <div className="font-semibold text-slate-900">Fast</div>
              <div className="mt-1 text-slate-600">Quick response on WhatsApp</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="relative"
        >
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-sky-200/60 via-white to-slate-200/40 blur-2xl" />
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <Image
              src="/brand/larial-logo.svg"
              alt="LARIAL LTD"
              width={420}
              height={120}
              className="h-auto w-full"
              priority
            />
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="text-xs font-semibold text-slate-500">
                Kaduna office
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-900">
                {officeAddressLine}
              </div>
              <div className="mt-2 text-xs text-slate-600">{officeHoursLine}</div>
            </div>
            <div className="mt-4 text-xs text-slate-500">
              Tip: Tell us what you want to register, and we’ll send the exact
              requirements.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
