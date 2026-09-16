import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import CtaSection from "@/components/CtaSection";
import JsonLd from "@/components/JsonLd";
import Icon, { ServiceGlyph } from "@/components/Icons";
import { caseStudies, services, site } from "@/lib/site";
import { clamp, og, twitter } from "@/lib/seo";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) return {};
  const title = `${study.client} Case Study`;
  const description = clamp(study.summary);
  return {
    title,
    description,
    keywords: [
      study.client,
      `${study.sector} case study`,
      `${study.sector} digital agency`,
      ...study.services.map((service) => `${service} case study`),
    ],
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: og({
      title,
      description,
      path: `/work/${study.slug}`,
      type: "article",
    }),
    twitter: twitter({ title, description }),
  };
}

export default async function CaseStudy({ params }) {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) notFound();

  const index = caseStudies.findIndex((item) => item.slug === study.slug);
  const others = [
    ...caseStudies.slice(index + 1),
    ...caseStudies.slice(0, index),
  ].slice(0, 2);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${site.domain}/work/${study.slug}#case-study`,
    headline: `${study.client} — ${study.headline}`,
    description: study.summary,
    url: `${site.domain}/work/${study.slug}`,
    about: study.sector,
    articleSection: "Case study",
    author: { "@id": `${site.domain}/#organization` },
    publisher: { "@id": `${site.domain}/#organization` },
    mentions: study.services,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.domain },
      { "@type": "ListItem", position: 2, name: "Work", item: `${site.domain}/work` },
      {
        "@type": "ListItem",
        position: 3,
        name: study.client,
        item: `${site.domain}/work/${study.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* --------------------------------------------------------- hero */}
      <section className="relative overflow-hidden border-b border-white/10 px-5 pb-16 pt-36 sm:px-8 lg:px-12 lg:pb-20 lg:pt-44">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-24 h-[32rem] w-[32rem] rounded-full bg-[#b80852]/20 blur-[120px]"
        />
        <div
          aria-hidden="true"
          className="bg-grid pointer-events-none absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
        />

        <div className="relative mx-auto max-w-[1500px]">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted"
          >
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/work" className="transition hover:text-white">
              Work
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#ff4b8f]">{study.client}</span>
          </nav>

          <Reveal>
            <p className="mt-8 flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff4b8f]">
              {study.sector}
              <span aria-hidden="true" className="text-zinc-700">
                /
              </span>
              <span className="text-muted">{study.location}</span>
              {study.period ? (
                <>
                  <span aria-hidden="true" className="text-zinc-700">
                    /
                  </span>
                  <span className="text-muted">{study.period}</span>
                </>
              ) : null}
            </p>

            <h1 className="mt-6 max-w-4xl text-[clamp(2.1rem,5vw,4.25rem)] font-black leading-[0.94] tracking-[-0.05em] text-white">
              {study.headline}
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-zinc-400">
              {study.summary}
            </p>

            <ul className="mt-8 flex flex-wrap gap-2">
              {study.services.map((service) => (
                <li
                  key={service}
                  className="rounded-full border border-white/10 px-3.5 py-1.5 text-[11px] font-semibold text-zinc-400"
                >
                  {service}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------ results */}
      <section className="border-b border-white/10 bg-[#08080b] px-5 py-14 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1500px] gap-4 sm:grid-cols-3">
          {study.results.map((result, i) => (
            <Reveal
              key={result.label}
              delay={i * 70}
              className="rounded-2xl border border-white/10 bg-[#0d0d13] p-6 lg:p-7"
            >
              <p className="font-mono text-3xl font-bold text-white sm:text-4xl">
                {result.value}
              </p>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-[#ff4b8f]">
                {result.label}
              </p>
              {result.context ? (
                <p className="mt-2 text-xs text-muted">{result.context}</p>
              ) : null}
            </Reveal>
          ))}
        </div>
      </section>

      {/* --------------------------------------------- challenge/approach */}
      <section className="border-b border-white/10 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ff4b8f]">
              The challenge
            </p>
            <h2 className="mt-5 text-3xl font-black uppercase leading-[0.92] tracking-[-0.05em] text-white sm:text-4xl">
              Where they
              <br />{" "}
              <span className="text-[#ff176e]">started.</span>
            </h2>
            <p className="mt-7 text-lg leading-relaxed text-zinc-400">
              {study.challenge}
            </p>

            <blockquote className="mt-10 rounded-[1.75rem] border border-[#ff176e]/25 bg-gradient-to-br from-[#160811] to-[#0b0b11] p-7">
              <p className="text-lg font-medium italic leading-relaxed text-zinc-200">
                “{study.quote}”
              </p>
              <footer className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                {study.quoteAuthor}
              </footer>
            </blockquote>
          </Reveal>

          <Reveal delay={120}>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ff4b8f]">
              What we did
            </p>
            <h2 className="mt-5 text-3xl font-black uppercase leading-[0.92] tracking-[-0.05em] text-white sm:text-4xl">
              The <span className="text-[#ff176e]">approach.</span>
            </h2>
            <ol className="mt-8 grid gap-3">
              {study.approach.map((step, i) => (
                <li
                  key={step}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-[#0d0d13] p-5"
                >
                  <span className="font-mono text-xs text-[#ff4b8f]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 leading-relaxed text-zinc-300">
                    {step}
                  </span>
                </li>
              ))}
            </ol>

            <div className="mt-8 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                Services used
              </p>
              <ul className="mt-4 grid gap-2">
                {services
                  .filter((service) => study.services.includes(service.short))
                  .map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/services/${service.slug}`}
                        className="group flex items-center gap-3 text-sm font-semibold text-zinc-300 transition hover:text-white"
                      >
                        <span
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10"
                          style={{ color: service.accent }}
                        >
                          <ServiceGlyph
                            path={service.iconPath}
                            className="h-4 w-4"
                          />
                        </span>
                        {service.short}
                        <Icon
                          name="arrowRight"
                          className="h-3.5 w-3.5 text-subtle transition duration-300 group-hover:translate-x-1 group-hover:text-[#ff4b8f]"
                        />
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------- other work */}
      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1500px]">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-3xl font-black uppercase tracking-[-0.04em] text-white sm:text-4xl">
              More <span className="text-[#ff176e]">work.</span>
            </h2>
            <Button href="/work" variant="outline" arrow={false}>
              All case studies
            </Button>
          </Reveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {others.map((item, i) => (
              <Reveal key={item.slug} delay={i * 80}>
                <Link
                  href={`/work/${item.slug}`}
                  className="group flex h-full flex-col rounded-[2rem] border border-white/10 bg-[#0d0d13] p-7 transition duration-500 hover:-translate-y-1 hover:border-[#ff176e]/45 lg:p-9"
                >
                  <p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff4b8f]">
                    {item.client}
                    <span aria-hidden="true" className="text-zinc-700">
                      /
                    </span>
                    <span className="text-muted">{item.sector}</span>
                  </p>
                  <h3 className="mt-4 text-xl font-black leading-snug tracking-[-0.02em] text-white transition group-hover:text-[#ff4b8f] lg:text-2xl">
                    {item.headline}
                  </h3>
                  <p className="mt-4 flex-1 leading-relaxed text-zinc-400">
                    {item.summary}
                  </p>
                  <dl className="mt-7 grid grid-cols-3 gap-4 border-t border-white/[0.07] pt-6">
                    {item.results.map((result) => (
                      <div key={result.label}>
                        <dt className="sr-only">{result.label}</dt>
                        <dd>
                          <span className="block font-mono text-lg font-bold text-white">
                            {result.value}
                          </span>
                          <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
                            {result.label}
                          </span>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Names the client so the CTA continues the case study rather than
          restating the footer's headline — the two bands used to render an
          identical <h2>. See the note in CtaSection.jsx. */}
      <CtaSection
        title={
          <>
            Want results like
            <br />{" "}
            <span className="text-[#ff176e]">{study.client}?</span>
          </>
        }
        lede="Every figure on this page came from a real engagement. Tell us the outcome you need and we'll come back with a plan, a timeline and the results we'd hold ourselves to."
      />
    </>
  );
}
