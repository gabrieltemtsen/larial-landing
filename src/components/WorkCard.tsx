import Image from "next/image";
import Link from "next/link";
import type { Work } from "@/lib/content";

function initials(label: string) {
  return label
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function WorkCard({
  work,
  priority = false,
}: {
  work: Work;
  priority?: boolean;
}) {
  return (
    <article className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-[0_24px_50px_-28px_rgba(2,132,199,0.45)]">
      <div className="relative h-52 overflow-hidden border-b border-slate-200 bg-gradient-to-br from-slate-950 via-sky-900 to-indigo-900">
        {work.cover ? (
          <Image
            src={work.cover}
            alt={work.title}
            fill
            priority={priority}
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0">
            <div className="absolute -left-10 top-8 h-36 w-36 rounded-full bg-sky-400/25 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-indigo-300/25 blur-3xl" />
            <div className="absolute inset-x-6 bottom-6 flex items-end justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-white/65">
                  {work.category}
                </div>
                <div className="mt-2 max-w-[14rem] font-[family-name:var(--font-manrope)] text-2xl font-extrabold leading-tight text-white">
                  {work.title}
                </div>
              </div>
              <div className="grid h-14 w-14 place-items-center rounded-2xl border border-white/15 bg-white/10 text-lg font-black text-white backdrop-blur">
                {initials(work.client)}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span className="rounded-full bg-sky-50 px-3 py-1 text-sky-700">
            {work.category}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
            {work.year}
          </span>
          {work.featured ? (
            <span className="rounded-full bg-amber-50 px-3 py-1 text-amber-700">
              Featured
            </span>
          ) : null}
        </div>

        <div className="mt-4 text-lg font-bold text-slate-900">{work.title}</div>
        <p className="mt-2 text-sm leading-6 text-slate-600">{work.summary}</p>

        <div className="mt-5 rounded-2xl bg-slate-50 p-4">
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Outcome
          </div>
          <p className="mt-2 text-sm font-medium text-slate-800">{work.outcome}</p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {work.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={`/work/${work.slug}`}
            className="inline-flex h-11 items-center justify-center rounded-full bg-slate-900 px-5 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Read case study
          </Link>
          {work.url ? (
            <a
              href={work.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Visit project
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
