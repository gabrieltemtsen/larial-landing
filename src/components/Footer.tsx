import Link from "next/link";
import { getSettings } from "@/lib/content";

export async function Footer() {
  const s = await getSettings();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <div className="font-[family-name:var(--font-manrope)] text-sm font-extrabold tracking-tight">
              {s.name}
            </div>
            <p className="mt-2 max-w-md text-sm text-slate-600">
              {s.description}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <div className="font-semibold text-slate-900">Company</div>
              <ul className="mt-3 space-y-2 text-slate-600">
                <li>
                  <a href="#services" className="hover:text-slate-900">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-slate-900">
                    Contact
                  </a>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-slate-900">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-slate-900">Office</div>
              <ul className="mt-3 space-y-2 text-slate-600">
                <li>{s.address}</li>
                <li>{s.hours}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <div>
            © {new Date().getFullYear()} {s.name}. All rights reserved.
          </div>
          <div className="flex gap-4">
            <Link href="/admin" className="hover:text-slate-700">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
