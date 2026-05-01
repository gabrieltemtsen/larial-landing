import { MeshBackdrop, FloatingOrbs } from "./Decor";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden">
      <MeshBackdrop />
      <FloatingOrbs />
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-12 sm:px-6 sm:pb-16 sm:pt-20">
        {eyebrow ? (
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/70 px-3 py-1 text-xs font-semibold text-sky-700 shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
            {eyebrow}
          </div>
        ) : null}
        <h1 className="mt-5 max-w-4xl font-[family-name:var(--font-manrope)] text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            {subtitle}
          </p>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}
