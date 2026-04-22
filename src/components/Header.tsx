import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/brand/larial-icon.svg"
            alt="LARIAL LTD"
            width={36}
            height={36}
            priority
          />
          <div className="leading-tight">
            <div className="font-[family-name:var(--font-manrope)] text-sm font-extrabold tracking-tight text-slate-900">
              LARIAL LTD
            </div>
            <div className="text-xs text-slate-500">Verified CAC Merchant</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 sm:flex">
          <a href="#services" className="hover:text-slate-900">
            Services
          </a>
          <a href="#process" className="hover:text-slate-900">
            Process
          </a>
          <a href="#contact" className="hover:text-slate-900">
            Contact
          </a>
          <Link href="/careers" className="hover:text-slate-900">
            Careers
          </Link>
        </nav>

        <div className="sm:hidden">
          <Link
            href="/careers"
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800"
          >
            Careers
          </Link>
        </div>
      </div>
    </header>
  );
}
