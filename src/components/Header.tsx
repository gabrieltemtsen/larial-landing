"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { whatsappLink } from "@/lib/site";

const NAV = [
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Our Services" },
  { href: "/works", label: "Our Work" },
  { href: "/management", label: "Management" },
  { href: "/post-incorporation", label: "Post-Incorporation" },
  { href: "/contact", label: "Contact Us" },
  { href: "/careers", label: "Careers" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const wa = whatsappLink();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Close mobile drawer on route change.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <>
      <header
        className={[
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-slate-200/70 bg-white/85 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.12)] backdrop-blur"
            : "bg-white/60 backdrop-blur",
        ].join(" ")}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-sky-400/40 to-indigo-400/30 blur" />
              <Image
                src="/brand/larial-icon.svg"
                alt="LARIAL LTD"
                width={40}
                height={40}
                priority
                className="relative h-10 w-10"
              />
            </div>
            <div className="leading-tight">
              <div className="font-[family-name:var(--font-manrope)] text-sm font-extrabold tracking-tight text-slate-900 sm:text-base">
                LARIAL LTD
              </div>
              <div className="text-[11px] font-medium text-sky-700 sm:text-xs">
                Verified CAC Merchant
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "relative rounded-full px-3.5 py-2 text-sm font-medium transition",
                  isActive(item.href)
                    ? "text-sky-700"
                    : "text-slate-700 hover:text-slate-900",
                ].join(" ")}
              >
                {isActive(item.href) ? (
                  <span className="absolute inset-0 -z-10 rounded-full bg-sky-50" />
                ) : null}
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex h-10 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-600 via-sky-500 to-indigo-500 px-5 text-sm font-semibold text-white shadow-[0_8px_20px_-10px_rgba(2,132,199,0.7)] transition hover:shadow-[0_12px_24px_-10px_rgba(2,132,199,0.8)]"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                <path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 .04 5.33.04 11.97a11.9 11.9 0 0 0 1.6 5.96L0 24l6.22-1.63a11.96 11.96 0 0 0 5.78 1.47h.01c6.62 0 11.96-5.33 11.96-11.97 0-3.2-1.25-6.21-3.45-8.39ZM12 21.3a9.3 9.3 0 0 1-4.74-1.3l-.34-.2-3.69.97.99-3.6-.22-.37A9.3 9.3 0 0 1 21.3 12c0 5.13-4.17 9.3-9.3 9.3Zm5.34-6.97c-.29-.15-1.72-.85-1.99-.95-.27-.1-.46-.15-.66.15-.2.29-.76.95-.93 1.14-.17.2-.34.22-.63.07-.29-.15-1.23-.45-2.34-1.43-.86-.77-1.45-1.72-1.62-2-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.14-.17.19-.29.29-.49.1-.2.05-.36-.02-.51-.07-.15-.66-1.59-.9-2.18-.24-.58-.49-.5-.66-.51l-.57-.01c-.2 0-.51.07-.78.36-.27.29-1.02 1-1.02 2.43s1.05 2.82 1.2 3.02c.15.2 2.07 3.16 5.02 4.43.7.3 1.25.48 1.68.61.7.22 1.34.19 1.85.12.56-.08 1.72-.7 1.96-1.38.24-.68.24-1.26.17-1.38-.07-.12-.27-.2-.56-.34Z" />
              </svg>
              Start on WhatsApp
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-800 transition hover:bg-slate-50 lg:hidden"
          >
            <span className="relative block h-4 w-5">
              <span
                className={[
                  "absolute left-0 top-0 block h-[2px] w-5 rounded bg-current transition-transform duration-300",
                  open ? "translate-y-[7px] rotate-45" : "",
                ].join(" ")}
              />
              <span
                className={[
                  "absolute left-0 top-[7px] block h-[2px] w-5 rounded bg-current transition-opacity duration-200",
                  open ? "opacity-0" : "opacity-100",
                ].join(" ")}
              />
              <span
                className={[
                  "absolute left-0 top-[14px] block h-[2px] w-5 rounded bg-current transition-transform duration-300",
                  open ? "-translate-y-[7px] -rotate-45" : "",
                ].join(" ")}
              />
            </span>
          </button>
        </div>
      </header>

      <div
        className={[
          "fixed inset-0 z-40 lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={[
            "absolute inset-0 bg-slate-950/40 backdrop-blur-sm transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          ].join(" ")}
        />
        <aside
          className={[
            "absolute right-0 top-0 flex h-full w-full max-w-sm flex-col border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300 ease-out",
            open ? "translate-x-0" : "translate-x-full",
          ].join(" ")}
        >
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div className="flex items-center gap-2">
              <Image
                src="/brand/larial-icon.svg"
                alt=""
                width={32}
                height={32}
              />
              <div className="font-[family-name:var(--font-manrope)] text-sm font-extrabold tracking-tight text-slate-900">
                LARIAL LTD
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <nav className="no-scrollbar flex-1 overflow-y-auto px-3 py-4">
            <ul className="space-y-1">
              {NAV.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={[
                        "group flex items-center justify-between rounded-2xl px-4 py-3 text-base font-semibold transition",
                        active
                          ? "bg-gradient-to-r from-sky-50 to-indigo-50 text-sky-800"
                          : "text-slate-800 hover:bg-slate-50",
                      ].join(" ")}
                    >
                      <span>{item.label}</span>
                      <svg
                        viewBox="0 0 24 24"
                        className={[
                          "h-4 w-4 transition-transform",
                          active
                            ? "translate-x-0 text-sky-600"
                            : "text-slate-400 group-hover:translate-x-1",
                        ].join(" ")}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <path d="M9 6l6 6-6 6" />
                      </svg>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 rounded-3xl border border-slate-200 bg-gradient-to-br from-sky-50 via-white to-indigo-50 p-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-sky-700">
                Talk to us
              </div>
              <div className="mt-2 text-sm text-slate-600">
                WhatsApp is the fastest way. We respond within working hours.
              </div>
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-600 to-indigo-500 px-5 text-sm font-semibold text-white"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                  <path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 .04 5.33.04 11.97a11.9 11.9 0 0 0 1.6 5.96L0 24l6.22-1.63a11.96 11.96 0 0 0 5.78 1.47h.01c6.62 0 11.96-5.33 11.96-11.97 0-3.2-1.25-6.21-3.45-8.39Z" />
                </svg>
                Start on WhatsApp
              </a>
            </div>
          </nav>

          <div className="border-t border-slate-100 px-5 py-4 text-xs text-slate-500">
            © {new Date().getFullYear()} LARIAL LTD. All rights reserved.
          </div>
        </aside>
      </div>
    </>
  );
}
