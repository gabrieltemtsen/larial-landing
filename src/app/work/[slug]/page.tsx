import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { getWorks } from "@/lib/content";
import { whatsappLink } from "@/lib/site";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const works = await getWorks();
  return works.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const works = await getWorks();
  const work = works.find((item) => item.slug === slug);

  if (!work) {
    return { title: "Work not found" };
  }

  return {
    title: `${work.title} | Our Work`,
    description: work.summary,
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const works = await getWorks();
  const work = works.find((item) => item.slug === slug);

  if (!work) notFound();

  const wa = whatsappLink(
    `Hi LARIAL LTD - I saw your case study "${work.title}" and want to discuss a similar project.`
  );

  return (
    <div className="min-h-screen">
      <Header />

      <PageHero
        eyebrow="Case Study"
        title={
          <>
            {work.title}
          </>
        }
        subtitle={work.summary}
      >
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sky-700">
            {work.category}
          </span>
          <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-700">
            {work.anonymized ? "Confidential client" : work.client}
          </span>
          <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-700">
            {work.year}
          </span>
        </div>
      </PageHero>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="space-y-8">
              {[
                ["Challenge", work.story.challenge],
                ["Approach", work.story.approach],
                ["Result", work.story.result],
              ].map(([title, body]) => (
                <article
                  key={title}
                  className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                    {title}
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-700">{body}</p>
                </article>
              ))}
            </div>

            <aside className="space-y-6">
              <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Outcome
                </div>
                <p className="mt-3 text-lg font-bold text-slate-900">
                  {work.outcome}
                </p>
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-white p-6">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Tags
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {work.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] bg-slate-950 p-6 text-white">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-white/65">
                  Similar brief?
                </div>
                <div className="mt-3 font-[family-name:var(--font-manrope)] text-2xl font-extrabold">
                  Let&apos;s scope yours.
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  If you need a similar CAC filing or product build, we can map
                  the requirements and next steps on WhatsApp.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href={wa}
                    className="inline-flex h-11 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-slate-900 hover:bg-slate-100"
                  >
                    Start on WhatsApp
                  </a>
                  <Link
                    href="/works"
                    className="inline-flex h-11 items-center justify-center rounded-full border border-white/20 bg-white/10 px-5 text-sm font-semibold text-white hover:bg-white/15"
                  >
                    Back to work
                  </Link>
                </div>
              </div>

              {work.url ? (
                <a
                  href={work.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Visit live project
                </a>
              ) : null}
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
