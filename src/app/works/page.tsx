import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { WorkCard } from "@/components/WorkCard";
import { getTestimonials, getWorks } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Selected case studies from LARIAL LTD across CAC registration, software delivery, mobile apps, websites, and design systems.",
};

const CATEGORIES = ["All", "CAC", "Software", "Mobile", "Web", "Design"] as const;

export default async function WorksPage() {
  const [works, testimonials] = await Promise.all([
    getWorks(),
    getTestimonials(),
  ]);

  const featuredTestimonials = testimonials
    .filter((item) => item.featured)
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      <Header />

      <PageHero
        eyebrow="Our Work"
        title={
          <>
            Real client outcomes, not just{" "}
            <span className="text-gradient-brand">service lists.</span>
          </>
        }
        subtitle="Browse recent case studies across CAC compliance work and digital product delivery. Each project is managed manually from the admin panel for now."
      >
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <a
              key={category}
              href={category === "All" ? "#all" : `#${category.toLowerCase()}`}
              className="inline-flex h-10 items-center justify-center rounded-full border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
            >
              {category}
            </a>
          ))}
        </div>
      </PageHero>

      <section id="all" className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid gap-6 lg:grid-cols-3">
            {works.map((work, idx) => (
              <WorkCard key={work.id} work={work} priority={idx < 2} />
            ))}
          </div>
        </div>
      </section>

      {CATEGORIES.filter((category) => category !== "All").map((category, idx) => {
        const items = works.filter((work) => work.category === category);
        if (items.length === 0) return null;

        return (
          <section
            key={category}
            id={category.toLowerCase()}
            className={idx % 2 === 0 ? "bg-slate-50" : "bg-white"}
          >
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
                  {category}
                </div>
                <h2 className="mt-3 font-[family-name:var(--font-manrope)] text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                  {category} case studies
                </h2>
              </div>

              <div className="mt-10 grid gap-6 lg:grid-cols-3">
                {items.map((work) => (
                  <WorkCard key={work.id} work={work} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <TestimonialsSection
        testimonials={featuredTestimonials}
        title="Client trust, backed by delivery"
        subtitle="The work cards tell one side of the story. These testimonials show how that delivery felt on the client side."
      />

      <Footer />
    </div>
  );
}
