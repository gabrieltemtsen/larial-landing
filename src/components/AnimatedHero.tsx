"use client";

import { motion } from "framer-motion";
import { CertificateGraphic, FloatingOrbs, MeshBackdrop } from "./Decor";

export function AnimatedHero({
  subtitle,
  ctaPrimary,
  ctaSecondary,
  badge,
  officeAddressLine,
  officeHoursLine,
}: {
  title?: string;
  subtitle: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
  badge?: string;
  officeAddressLine: string;
  officeHoursLine: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <MeshBackdrop />
      <FloatingOrbs />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 sm:pt-20 lg:grid-cols-[1.15fr_0.85fr] lg:pb-24 lg:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/70 px-3 py-1.5 text-xs font-semibold text-sky-700 shadow-sm backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-500/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500" />
            </span>
            {badge ?? "Verified CAC Merchant"}
          </div>

          <h1 className="mt-5 font-[family-name:var(--font-manrope)] text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.5rem]">
            Register your{" "}
            <span className="text-gradient-brand shine">CAC business</span>{" "}
            or company — from anywhere.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
            {subtitle}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={ctaPrimary.href}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-600 via-sky-500 to-indigo-500 px-6 text-sm font-semibold text-white shadow-[0_10px_30px_-12px_rgba(2,132,199,0.7)] transition hover:shadow-[0_14px_34px_-10px_rgba(2,132,199,0.85)]"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                <path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 .04 5.33.04 11.97a11.9 11.9 0 0 0 1.6 5.96L0 24l6.22-1.63a11.96 11.96 0 0 0 5.78 1.47h.01c6.62 0 11.96-5.33 11.96-11.97 0-3.2-1.25-6.21-3.45-8.39Z" />
              </svg>
              {ctaPrimary.label}
            </a>
            <a
              href={ctaSecondary.href}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
            >
              {ctaSecondary.label}
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3 text-sm">
            {[
              { t: "Worldwide", d: "Nigerians abroad & at home" },
              { t: "Guided", d: "Clear checklist + docs help" },
              { t: "Fast", d: "Quick WhatsApp response" },
            ].map((b) => (
              <div
                key={b.t}
                className="rounded-2xl border border-slate-200 bg-white/70 p-3 backdrop-blur sm:p-4"
              >
                <div className="text-sm font-bold text-slate-900">{b.t}</div>
                <div className="mt-1 text-xs text-slate-600 sm:text-[13px]">{b.d}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-sky-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 12l5 5L20 7" />
              </svg>
              <span>CAC-accredited</span>
            </div>
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-sky-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />
              </svg>
              <span>Trusted by founders</span>
            </div>
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-sky-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
              <span>Mon–Fri 9am–5pm</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="relative"
        >
          <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-sky-200/60 via-white to-indigo-200/40 blur-2xl" />

          <div className="relative rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-[0_30px_80px_-30px_rgba(2,132,199,0.45)] backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </div>
              <div className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                ● Live with CAC
              </div>
            </div>

            <div className="mt-5">
              <CertificateGraphic className="h-auto w-full" />
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-500 p-4 text-white shadow-md">
                <div className="text-[11px] font-semibold opacity-80">Filings</div>
                <div className="mt-1 text-xl font-extrabold">500+</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="text-[11px] font-semibold text-slate-500">Turnaround</div>
                <div className="mt-1 text-xl font-extrabold text-slate-900">3–7d</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="text-[11px] font-semibold text-slate-500">Reach</div>
                <div className="mt-1 text-xl font-extrabold text-slate-900">🌍</div>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-sky-700">
                Kaduna office
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-900">
                {officeAddressLine}
              </div>
              <div className="mt-1 text-xs text-slate-600">{officeHoursLine}</div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute -left-4 top-10 hidden rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 shadow-lg backdrop-blur md:block"
          >
            <div className="text-[11px] font-semibold text-slate-500">CAC merchant</div>
            <div className="text-sm font-extrabold text-slate-900">Verified ✓</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="absolute -right-4 bottom-10 hidden rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 shadow-lg backdrop-blur md:block"
          >
            <div className="text-[11px] font-semibold text-slate-500">From WhatsApp</div>
            <div className="text-sm font-extrabold text-slate-900">to Certificate ✦</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
