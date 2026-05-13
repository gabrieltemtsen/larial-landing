import type { Testimonial } from "@/lib/content";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 text-amber-400">
      {Array.from({ length: 5 }).map((_, idx) => (
        <svg
          key={idx}
          viewBox="0 0 20 20"
          className={`h-4 w-4 ${idx < rating ? "fill-current" : "fill-slate-200"}`}
          aria-hidden
        >
          <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.78L10 14.73 4.8 17.5l.99-5.78-4.21-4.1 5.82-.85L10 1.5Z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialsSection({
  testimonials,
  title = "What clients say",
  subtitle = "A few recent client experiences across CAC filings and product delivery.",
}: {
  testimonials: Testimonial[];
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="border-b border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
            Testimonials
          </div>
          <h2 className="mt-3 font-[family-name:var(--font-manrope)] text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 text-slate-600">{subtitle}</p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <Stars rating={testimonial.rating} />
              <p className="mt-5 text-sm leading-7 text-slate-700">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <div className="mt-6 border-t border-slate-100 pt-5">
                <div className="text-sm font-bold text-slate-900">
                  {testimonial.name}
                </div>
                <div className="mt-1 text-sm text-slate-600">{testimonial.role}</div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
                  <span className="rounded-full bg-sky-50 px-3 py-1 text-sky-700">
                    {testimonial.service}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                    {testimonial.location}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                    {testimonial.year}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
