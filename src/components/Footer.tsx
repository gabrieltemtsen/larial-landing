import Image from "next/image";
import Link from "next/link";
import { getSettings } from "@/lib/content";
import { whatsappLink } from "@/lib/site";

export async function Footer() {
  const s = await getSettings();
  const wa = whatsappLink();

  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="absolute inset-0 -z-10 bg-mesh-sky opacity-40" />
      <div className="absolute inset-0 -z-10 bg-grid opacity-10" />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-sky-400/40 to-indigo-400/30 blur" />
                <Image
                  src="/brand/larial-icon.svg"
                  alt={s.name}
                  width={40}
                  height={40}
                  className="relative h-10 w-10"
                />
              </div>
              <div>
                <div className="font-[family-name:var(--font-manrope)] text-base font-extrabold tracking-tight text-white">
                  {s.name}
                </div>
                <div className="text-xs font-medium text-sky-300">
                  Verified CAC Merchant
                </div>
              </div>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">
              {s.description}
            </p>

            <a
              href={wa}
              className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 px-5 text-sm font-semibold text-white"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 .04 5.33.04 11.97a11.9 11.9 0 0 0 1.6 5.96L0 24l6.22-1.63a11.96 11.96 0 0 0 5.78 1.47h.01c6.62 0 11.96-5.33 11.96-11.97 0-3.2-1.25-6.21-3.45-8.39Z" />
              </svg>
              Start on WhatsApp
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-white">
                Company
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/management" className="hover:text-white">Management</Link></li>
                <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
              </ul>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-white">
                Services
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link href="/services" className="hover:text-white">Our Services</Link></li>
                <li><Link href="/post-incorporation" className="hover:text-white">Post-Incorporation</Link></li>
                <li><Link href="/services#advisory" className="hover:text-white">Advisory</Link></li>
              </ul>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-white">
                Get in touch
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
                <li><a href={`mailto:${s.email}`} className="hover:text-white">{s.email}</a></li>
                <li><a href={wa} className="hover:text-white">WhatsApp</a></li>
              </ul>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-white">
                Office
              </div>
              <ul className="mt-4 space-y-2 text-sm leading-6">
                <li>{s.address}</li>
                <li>{s.hours}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <div>
            © {new Date().getFullYear()} {s.name}. All rights reserved.
          </div>
          <div className="flex gap-4">
            <Link href="/admin" className="hover:text-white">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
