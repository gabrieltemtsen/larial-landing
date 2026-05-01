/**
 * Shared decorative SVG / background pieces used across pages.
 * No JS, no client features — safe in server components.
 */

export function MeshBackdrop({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
      aria-hidden
    >
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-sky-300/30 blur-3xl float-slower" />
      <div className="absolute -right-24 top-12 h-80 w-80 rounded-full bg-indigo-300/30 blur-3xl float-slow" />
      <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 translate-y-1/3 rounded-full bg-cyan-200/40 blur-3xl" />
      <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
    </div>
  );
}

export function GridBackdrop({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 -z-10 ${className}`} aria-hidden>
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
    </div>
  );
}

/**
 * Decorative shield + check graphic used on services / process sections.
 */
export function ShieldGraphic({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <defs>
        <linearGradient id="sg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="60%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
        <linearGradient id="sg2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <path
        d="M100 14l72 26v52c0 42-30 76-72 94-42-18-72-52-72-94V40l72-26z"
        fill="url(#sg)"
      />
      <path
        d="M100 30l56 20v40c0 33-23 60-56 75-33-15-56-42-56-75V50l56-20z"
        fill="url(#sg2)"
        opacity="0.35"
      />
      <path
        d="M70 102l20 20 42-44"
        fill="none"
        stroke="white"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Receipt / certificate graphic used in hero / pages.
 */
export function CertificateGraphic({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 220" className={className} aria-hidden>
      <defs>
        <linearGradient id="cg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e0f2fe" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
        <linearGradient id="cgRibbon" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
      <rect x="20" y="20" width="280" height="180" rx="20" fill="url(#cg)" stroke="#bae6fd" />
      <rect x="40" y="44" width="120" height="10" rx="4" fill="#0284c7" opacity="0.7" />
      <rect x="40" y="64" width="200" height="6" rx="3" fill="#94a3b8" opacity="0.6" />
      <rect x="40" y="78" width="170" height="6" rx="3" fill="#94a3b8" opacity="0.45" />
      <rect x="40" y="92" width="150" height="6" rx="3" fill="#94a3b8" opacity="0.35" />

      <rect x="40" y="120" width="80" height="56" rx="10" fill="#e0f2fe" />
      <rect x="130" y="120" width="80" height="56" rx="10" fill="#ede9fe" />
      <rect x="220" y="120" width="60" height="56" rx="10" fill="#dcfce7" />

      <circle cx="248" cy="60" r="22" fill="url(#cgRibbon)" />
      <path d="M238 60l8 8 14-14" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M238 84l-6 14 16-6 16 6-6-14" fill="url(#cgRibbon)" />
    </svg>
  );
}

/**
 * Decorative orbit dots (for hero floating accents).
 */
export function FloatingOrbs({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      <div className="absolute left-[8%] top-[18%] h-3 w-3 rounded-full bg-sky-500/70 float-slow" />
      <div className="absolute right-[12%] top-[10%] h-2 w-2 rounded-full bg-indigo-500/70 float-slower" />
      <div className="absolute left-[40%] top-[8%] h-1.5 w-1.5 rounded-full bg-cyan-400/70 float-slow" />
      <div className="absolute right-[30%] bottom-[15%] h-2 w-2 rounded-full bg-sky-400/80 float-slower" />
      <div className="absolute left-[20%] bottom-[10%] h-1.5 w-1.5 rounded-full bg-indigo-400/70 float-slow" />
    </div>
  );
}
