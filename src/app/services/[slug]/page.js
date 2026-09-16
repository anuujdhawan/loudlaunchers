import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import CtaSection from "@/components/CtaSection";
import JsonLd from "@/components/JsonLd";
import FaqAccordion from "@/components/FaqAccordion";
import Icon, { ServiceGlyph } from "@/components/Icons";
import { areasServedSchema, caseStudies, services, site } from "@/lib/site";
import { serviceContent } from "@/lib/service-content";
import { getPostsByCategory } from "@/lib/blog";
import { clamp, og, twitter } from "@/lib/seo";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return {};
  const content = serviceContent[slug];

  const title = service.seoTitle ?? `${service.title} Services`;
  /* The quick answer leads the description rather than the marketing summary:
     it is the sentence an answer engine is most likely to reuse, and it reads
     as a definition instead of a pitch. Falls back to the registry copy if a
     service is ever added without long-form content. */
  const description = clamp(
    content ? content.quickAnswer : `${service.summary} ${service.advantage}`,
  );

  return {
    title,
    description,
    keywords: [
      service.title,
      `${service.short} services`,
      `${service.short} agency`,
      ...service.points.slice(0, 3),
    ],
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: og({
      title,
      description,
      path: `/services/${service.slug}`,
    }),
    twitter: twitter({ title, description }),
  };
}

/** Maps a service to the blog categories that support it. */
const RELATED_CATEGORY = {
  "website-development-deployment": ["websites", "conversion"],
  "mobile-apps-publishing": ["apps", "strategy"],
  "digital-performance-marketing": ["marketing", "conversion"],
  "search-engine-optimization": ["seo", "ai-search"],
  "branding-business-optimization": ["branding", "strategy"],
  "social-media-management": ["social", "branding"],
};

/** Rough word count of the long-form content, for the reading-time estimate. */
function countWords(content) {
  const words = (text) => (text ? String(text).split(/\s+/).filter(Boolean).length : 0);
  let total = words(content.quickAnswer);
  total += content.definition.body.reduce((sum, p) => sum + words(p), 0);
  content.sections.forEach((section) => {
    total += section.body.reduce((sum, p) => sum + words(p), 0);
    if (section.list) total += section.list.items.reduce((sum, i) => sum + words(i), 0);
    if (section.comparison) {
      total += section.comparison.rows.flat().reduce((sum, c) => sum + words(c), 0);
    }
  });
  total += content.process.reduce((sum, p) => sum + words(p.body), 0);
  total += content.metrics.reduce((sum, m) => sum + words(m.body), 0);
  total += content.faqs.reduce((sum, f) => sum + words(f.answer), 0);
  total += content.glossary.reduce((sum, g) => sum + words(g.definition), 0);
  return total;
}

/**
 * Responsive comparison table.
 *
 * A real `<table>` rather than a grid of divs: the semantics are what make the
 * comparison extractable by an answer engine, and a table is the one structure
 * a generative model can reliably lift intact. Below `lg` the rows reflow into
 * stacked blocks with the column name printed against each value, so the same
 * single source of markup is readable on a phone without horizontal scrolling
 * or a duplicated mobile variant.
 */
function ComparisonTable({ comparison, accent }) {
  const { columns, rows, title, intro } = comparison;
  return (
    <div className="mt-8">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-white">
        {title}
      </p>
      {intro && <p className="mt-2 text-sm leading-relaxed text-muted">{intro}</p>}

      <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full border-collapse text-left">
          <thead className="hidden lg:table-header-group">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  scope="col"
                  className="border-b border-white/10 bg-white/[0.03] px-5 py-4 text-[10px] font-bold uppercase tracking-[0.16em]"
                  style={{ color: accent }}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row[0]}
                className="block border-b border-white/[0.07] last:border-b-0 lg:table-row"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={columns[cellIndex]}
                    className={`block px-5 py-3 align-top lg:table-cell lg:py-4 ${
                      cellIndex === 0
                        ? "pt-5 font-bold text-white lg:pt-4"
                        : "text-zinc-400"
                    }`}
                  >
                    <span
                      className="mr-2 inline-block text-[10px] font-bold uppercase tracking-[0.14em] lg:hidden"
                      style={{ color: accent }}
                    >
                      {columns[cellIndex]}
                    </span>
                    <span className={cellIndex === 0 ? "" : "text-sm leading-relaxed"}>
                      {cell}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default async function ServiceDetail({ params }) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  const content = serviceContent[slug];
  /* The long-form set is the fuller one and is what the page renders; the
     registry's three-question set stays as the fallback so a service added
     without content still gets a usable FAQ and a valid FAQPage node. Both the
     visible accordion and the schema read this same variable — they drifted
     apart once, which left eight written answers invisible and a FAQPage
     advertising three. */
  const faqs = content?.faqs ?? service.faqs;
  const index = services.findIndex((item) => item.slug === service.slug);
  const others = services.filter((item) => item.slug !== service.slug).slice(0, 3);
  const relatedWork = caseStudies
    .filter((study) => study.services.includes(service.short))
    .slice(0, 2);
  const categorySlugs = RELATED_CATEGORY[service.slug] ?? [];
  const relatedReading = categorySlugs
    .flatMap((category) => getPostsByCategory(category))
    .slice(0, 3);

  const readingMinutes = content
    ? Math.max(4, Math.round(countWords(content) / 200))
    : null;

  /* The table of contents is assembled from the blocks that actually render,
     so an added section can never leave a dead anchor behind. */
  const toc = content
    ? [
        { id: "definition", heading: content.definition.term },
        ...content.sections.map((section) => ({
          id: section.id,
          heading: section.heading,
        })),
        { id: "how-it-runs", heading: "How an engagement runs" },
        { id: "included", heading: "What's included" },
        { id: "measured", heading: "What we measure" },
        { id: "fit", heading: "Who it's for" },
        { id: "investment", heading: "Investment" },
        { id: "faq", heading: "Frequently asked questions" },
        { id: "glossary", heading: "Glossary" },
      ]
    : [];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.domain}/services/${service.slug}#service`,
    name: service.title,
    serviceType: service.title,
    description: content ? content.quickAnswer : service.longDescription,
    url: `${site.domain}/services/${service.slug}`,
    provider: { "@id": `${site.domain}/#organization` },
    areaServed: areasServedSchema(),
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "USD",
        description: "Scoped per project after a free discovery conversation.",
      },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.short} deliverables`,
      itemListElement: service.deliverables.map((item) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: item },
      })),
    },
  };

  /* A WebPage node carries the two things the Service node cannot: when the
     page was last reviewed, and which passage is the citable summary. The
     `speakable` hint is what a voice assistant or an answer engine reads aloud,
     and it points at the quick answer rather than at the page as a whole. */
  const webPageSchema = content
    ? {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${site.domain}/services/${service.slug}#webpage`,
        url: `${site.domain}/services/${service.slug}`,
        name: service.seoTitle ?? service.title,
        isPartOf: { "@id": `${site.domain}/#website` },
        about: { "@id": `${site.domain}/services/${service.slug}#service` },
        inLanguage: "en",
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["#quick-answer", "#definition"],
        },
        mainEntity: { "@id": `${site.domain}/services/${service.slug}#service` },
      }
    : null;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  /* Declaring the glossary as a DefinedTermSet is a deliberate GEO move: it
     states the vocabulary of the page in machine-readable form, which is how a
     generative system resolves "what does this business mean by crawl budget"
     without having to infer it from prose. */
  const glossarySchema = content
    ? {
        "@context": "https://schema.org",
        "@type": "DefinedTermSet",
        "@id": `${site.domain}/services/${service.slug}#glossary`,
        name: `${service.short} glossary`,
        hasDefinedTerm: content.glossary.map((entry) => ({
          "@type": "DefinedTerm",
          name: entry.term,
          description: entry.definition,
          inDefinedTermSet: `${site.domain}/services/${service.slug}#glossary`,
        })),
      }
    : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.domain },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${site.domain}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: `${site.domain}/services/${service.slug}`,
      },
    ],
  };

  const impactLabels = {
    visibility: "Visibility",
    trust: "Trust",
    conversion: "Conversion",
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      {webPageSchema && <JsonLd data={webPageSchema} />}
      <JsonLd data={faqSchema} />
      {glossarySchema && <JsonLd data={glossarySchema} />}
      <JsonLd data={breadcrumbSchema} />

      {/* --------------------------------------------------------- hero */}
      <section className="relative overflow-hidden border-b border-white/10 px-5 pb-16 pt-36 sm:px-8 lg:px-12 lg:pb-20 lg:pt-44">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-24 h-[32rem] w-[32rem] rounded-full blur-[120px]"
          style={{ backgroundColor: `${service.accent}22` }}
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
            <Link href="/services" className="transition hover:text-white">
              Services
            </Link>
            <span aria-hidden="true">/</span>
            <span style={{ color: service.accent }}>{service.short}</span>
          </nav>

          <div className="mt-8 grid gap-12 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
            <Reveal>
              <div className="flex items-center gap-4">
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]"
                  style={{ color: service.accent }}
                >
                  <ServiceGlyph path={service.iconPath} className="h-6 w-6" />
                </span>
                <span className="font-mono text-xs text-subtle">
                  {service.num} / 06
                </span>
              </div>

              <h1 className="mt-7 text-[clamp(2.2rem,5vw,4.25rem)] font-black uppercase leading-[0.9] tracking-[-0.055em] text-white">
                {service.title}
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-zinc-400">
                {service.longDescription}
              </p>

              {/* Freshness signal. Search and generative systems both weight
                  how recently a page was reviewed, and it is information a
                  reader wants before trusting a cost or timeline figure. */}
              {content && (
                <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-subtle">
                  <span className="flex items-center gap-2">
                    <Icon name="clock" className="h-3.5 w-3.5" />
                    {readingMinutes} min read
                  </span>
                  <span className="flex items-center gap-2">
                    <Icon name="check" className="h-3.5 w-3.5" />
                    Reviewed {content.updated}
                  </span>
                </p>
              )}

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Button opensLead leadSource="service-detail" size="lg">
                  Start a project
                </Button>
                <Button href="/work" variant="outline" size="lg" arrow={false}>
                  See the results
                </Button>
              </div>
            </Reveal>

            <Reveal delay={120} className="grid gap-4">
              <div className="rounded-[1.75rem] border border-white/10 bg-[#0b0b11] p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
                  Typical timeline
                </p>
                <p className="mt-3 font-mono text-2xl font-bold text-white">
                  {service.timeline}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-muted">
                  Scoped precisely after a short discovery conversation — before
                  any commitment.
                </p>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-[#0b0b11] p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
                  What it moves
                </p>
                <dl className="mt-5 grid gap-4">
                  {Object.entries(service.impact).map(([key, value]) => (
                    <div key={key}>
                      <div className="flex items-center justify-between text-xs">
                        <dt className="font-semibold text-zinc-300">
                          {impactLabels[key]}
                        </dt>
                        <dd className="font-mono text-muted">{value}%</dd>
                      </div>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${value}%`,
                            background: `linear-gradient(90deg, ${service.accent}, #b356ff)`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------- quick answer + facts */}
      {/* This band is the answer-engine surface of the page. The quick answer
          is a self-contained 40-60 word definition that stays correct when
          lifted out of context, and the fact list beside it is written as
          standalone label/value pairs for the same reason. Both are rendered
          above the fold-of-the-article so a crawler reaches them early. */}
      {content && (
        <section className="border-b border-white/10 px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
          <div className="mx-auto grid max-w-[1500px] gap-6 lg:grid-cols-[1.15fr_.85fr] lg:gap-8">
            <Reveal>
              <div
                id="quick-answer"
                className="relative h-full overflow-hidden rounded-[1.75rem] border p-7 sm:p-9"
                style={{
                  borderColor: `${service.accent}55`,
                  background: `linear-gradient(140deg, ${service.accent}18, #0b0b11 65%)`,
                }}
              >
                <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#ff4b8f]">
                  <Icon name="spark" className="h-3.5 w-3.5" />
                  Quick answer
                </p>
                <p className="mt-4 text-lg font-medium leading-relaxed text-zinc-100 sm:text-xl">
                  {content.quickAnswer}
                </p>
                <p className="mt-6 text-xs leading-relaxed text-muted">
                  Written to be read on its own. Everything below expands on it.
                </p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="h-full rounded-[1.75rem] border border-white/10 bg-[#0b0b11] p-7">
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#ff4b8f]">
                  Key facts
                </p>
                <dl className="mt-5 grid gap-4">
                  {content.keyFacts.map((fact) => (
                    <div
                      key={fact.label}
                      className="border-b border-white/[0.07] pb-3 last:border-b-0 last:pb-0"
                    >
                      <dt className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                        {fact.label}
                      </dt>
                      <dd className="mt-1.5 text-sm font-semibold leading-snug text-zinc-200">
                        {fact.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ------------------------------- definition, TOC and main sections */}
      <section className="border-b border-white/10 px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-14">
          {content && (
            <aside className="hidden lg:block">
              <nav
                aria-label="On this page"
                className="sticky top-28 max-h-[calc(100vh-9rem)] overflow-y-auto rounded-[1.5rem] border border-white/10 bg-[#0b0b11] p-5"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#ff4b8f]">
                  On this page
                </p>
                <ol className="mt-4 grid gap-1">
                  {toc.map((item, i) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="group flex gap-3 rounded-lg px-2 py-2 text-xs leading-snug text-zinc-400 transition hover:bg-white/[0.04] hover:text-white"
                      >
                        <span className="font-mono text-[10px] text-subtle group-hover:text-[#ff4b8f]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {item.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>
          )}

          <div className="min-w-0">
            {content ? (
              <div className="article-body">
                {/* The definition. Rendered as its own block rather than the
                    first body section because "what is X" is the query most
                    likely to be answered from this page, and giving it a
                    stable anchor lets the schema point speakable at it. */}
                <Reveal>
                  <section id="definition" className="scroll-mt-28">
                    <h2 className="flex items-start gap-3 text-2xl font-black tracking-[-0.02em] text-white sm:text-3xl">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-6 w-1 shrink-0 rounded-full"
                        style={{ backgroundColor: service.accent }}
                      />
                      {content.definition.term}
                    </h2>
                    {content.definition.body.map((paragraph, i) => (
                      <p key={i} className={i === 0 ? "mt-5" : "mt-4"}>
                        {paragraph}
                      </p>
                    ))}
                  </section>
                </Reveal>

                {content.sections.map((section) => (
                  <Reveal key={section.id} delay={40}>
                    <section id={section.id} className="mt-14 scroll-mt-28">
                      <h2 className="flex items-start gap-3 text-2xl font-black tracking-[-0.02em] text-white sm:text-3xl">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-6 w-1 shrink-0 rounded-full"
                          style={{ backgroundColor: service.accent }}
                        />
                        {section.heading}
                      </h2>

                      {section.body.map((paragraph, i) => (
                        <p key={i} className={i === 0 ? "mt-5" : "mt-4"}>
                          {paragraph}
                        </p>
                      ))}

                      {section.list && (
                        <div className="mt-7 rounded-2xl border border-white/10 bg-[#0d0d13] p-6">
                          <p className="text-xs font-bold uppercase tracking-[0.16em] text-white">
                            {section.list.title}
                          </p>
                          <ul className="mt-4 grid gap-3">
                            {section.list.items.map((item) => (
                              <li key={item} className="flex items-start gap-3">
                                <Icon
                                  name="check"
                                  className="mt-1 h-4 w-4 shrink-0 text-[#ff4b8f]"
                                />
                                <span className="text-sm leading-relaxed text-zinc-300">
                                  {item}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {section.comparison && (
                        <ComparisonTable
                          comparison={section.comparison}
                          accent={service.accent}
                        />
                      )}
                    </section>
                  </Reveal>
                ))}
              </div>
            ) : (
              <Reveal>
                <p className="text-lg leading-relaxed text-zinc-400">
                  {service.longDescription}
                </p>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- how it runs */}
      <section className="border-b border-white/10 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1500px]">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ff4b8f]">
              How it runs
            </p>
            <h2 className="mt-5 scroll-mt-28 text-4xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-white sm:text-5xl">
              Five stages,
              <br />{" "}
              start to <span className="text-[#ff176e]">lift-off.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
              The sequence below is specific to{" "}
              {service.short.toLowerCase()} — the shape of the work differs
              enough between services that a single generic process would hide
              where the risk actually sits.
            </p>
          </Reveal>

          <ol id="how-it-runs" className="mt-12 grid scroll-mt-28 gap-4 lg:grid-cols-5">
            {(content?.process ?? []).map((step, i) => (
              <Reveal
                key={step.step}
                delay={i * 60}
                as="li"
                className="relative rounded-2xl border border-white/10 bg-[#0d0d13] p-6"
              >
                <span className="font-mono text-xs text-[#ff4b8f]">
                  {step.step}
                </span>
                <h3 className="mt-3 text-lg font-bold text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* --------------------------------------------------- deliverables */}
      <section className="border-b border-white/10 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div
          id="included"
          className="mx-auto grid max-w-[1500px] scroll-mt-28 gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-20"
        >
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ff4b8f]">
              What you get
            </p>
            <h2 className="mt-5 text-4xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-white sm:text-5xl">
              Included in
              <br />{" "}
              every <span className="text-[#ff176e]">engagement.</span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-zinc-400">
              No hidden phases and no surprise invoices. These are the
              deliverables that make up a {service.short.toLowerCase()}{" "}
              engagement.
            </p>
          </Reveal>

          <div className="grid gap-3">
            {service.deliverables.map((item, i) => (
              <Reveal
                key={item}
                delay={i * 50}
                className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-[#0d0d13] p-5 transition duration-500 hover:border-[#ff176e]/40"
              >
                <span className="font-mono text-xs text-[#ff4b8f]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 leading-relaxed text-zinc-300">
                  {item}
                </span>
                <Icon
                  name="check"
                  className="mt-0.5 h-4 w-4 shrink-0 text-subtle transition group-hover:text-[#ff4b8f]"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ what we measure */}
      {content && (
        <section className="border-b border-white/10 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-[1500px]">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ff4b8f]">
                What we measure
              </p>
              <h2
                id="measured"
                className="mt-5 scroll-mt-28 text-4xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-white sm:text-5xl"
              >
                The numbers we
                <br />{" "}
                report <span className="text-[#ff176e]">against.</span>
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
                Agreed before the work starts, so success is a comparison rather
                than an opinion. If a metric cannot be moved by this service, it
                is not on the list.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {content.metrics.map((metric, i) => (
                <Reveal
                  key={metric.label}
                  delay={(i % 2) * 70}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-[#0d0d13] p-6"
                >
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]"
                    style={{ color: service.accent }}
                  >
                    <Icon name="chart" className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-bold text-white">{metric.label}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                      {metric.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------- who it's for */}
      {content && (
        <section className="border-b border-white/10 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-[1500px]">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ff4b8f]">
                Honest fit
              </p>
              <h2
                id="fit"
                className="mt-5 scroll-mt-28 text-4xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-white sm:text-5xl"
              >
                Who this is
                <br />{" "}
                <span className="text-[#ff176e]">right for.</span>
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
                Naming who a service is wrong for is more useful than a list of
                benefits, because it is the only way to tell whether you are
                reading about yourself.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-4 lg:grid-cols-2">
              <Reveal className="rounded-[1.75rem] border border-[#ff176e]/25 bg-[#12070d] p-7">
                <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#ff4b8f]">
                  <Icon name="check" className="h-4 w-4" />
                  A good fit when
                </p>
                <ul className="mt-6 grid gap-4">
                  {content.fit.goodFor.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: service.accent }}
                      />
                      <span className="leading-relaxed text-zinc-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={80} className="rounded-[1.75rem] border border-white/10 bg-[#0d0d13] p-7">
                <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-muted">
                  <Icon name="close" className="h-4 w-4" />
                  Probably not, if
                </p>
                <ul className="mt-6 grid gap-4">
                  {content.fit.notFor.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-600"
                      />
                      <span className="leading-relaxed text-zinc-400">{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            {/* Tools and platforms. Named entities, deliberately: they are how
                a reader verifies competence and how a generative system
                resolves what this business actually works with. */}
            <Reveal className="mt-10 rounded-[1.75rem] border border-white/10 bg-[#0b0b11] p-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted">
                Tools and platforms we use
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {content.stack.map((tool) => (
                  <li
                    key={tool}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-semibold text-zinc-300"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------- investment */}
      {content && (
        <section className="border-b border-white/10 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-[1500px]">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ff4b8f]">
                Investment
              </p>
              <h2
                id="investment"
                className="mt-5 scroll-mt-28 text-4xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-white sm:text-5xl"
              >
                What shapes
                <br />{" "}
                the <span className="text-[#ff176e]">number.</span>
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
                {content.investment.intro}
              </p>
            </Reveal>

            <div className="mt-12 grid gap-4 lg:grid-cols-3">
              {content.investment.tiers.map((tier, i) => (
                <Reveal
                  key={tier.name}
                  delay={i * 70}
                  className="flex flex-col rounded-[1.75rem] border border-white/10 bg-[#0d0d13] p-7"
                >
                  <h3 className="text-lg font-black uppercase tracking-[-0.02em] text-white">
                    {tier.name}
                  </h3>
                  <p
                    className="mt-2 font-mono text-xs uppercase tracking-[0.14em]"
                    style={{ color: service.accent }}
                  >
                    {tier.range}
                  </p>
                  <ul className="mt-6 grid flex-1 gap-3">
                    {tier.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Icon
                          name="check"
                          className="mt-1 h-4 w-4 shrink-0 text-[#ff4b8f]"
                        />
                        <span className="text-sm leading-relaxed text-zinc-400">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-6 rounded-2xl border border-white/10 bg-[#0b0b11] p-6">
              <p className="flex items-start gap-3 text-sm leading-relaxed text-zinc-400">
                <Icon
                  name="shield"
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#ff4b8f]"
                />
                {content.investment.note}
              </p>
            </Reveal>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------- proof */}
      {relatedWork.length > 0 && (
        <section className="border-b border-white/10 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-[1500px]">
            <Reveal className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ff4b8f]">
                  Proof
                </p>
                <h2 className="mt-5 text-4xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-white sm:text-5xl">
                  Where this has
                  <br />{" "}
                  already <span className="text-[#ff176e]">worked.</span>
                </h2>
              </div>
              <Button href="/work" variant="outline" arrow={false}>
                All case studies
              </Button>
            </Reveal>

            <div className="mt-12 grid gap-5 lg:grid-cols-2">
              {relatedWork.map((study, i) => (
                <Reveal key={study.slug} delay={i * 80}>
                  <Link
                    href={`/work/${study.slug}`}
                    className="group flex h-full flex-col rounded-[2rem] border border-white/10 bg-[#0d0d13] p-7 transition duration-500 hover:-translate-y-1 hover:border-[#ff176e]/45 lg:p-9"
                  >
                    <p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff4b8f]">
                      {study.client}
                      <span aria-hidden="true" className="text-zinc-700">
                        /
                      </span>
                      <span className="text-muted">{study.sector}</span>
                    </p>
                    <h3 className="mt-4 text-xl font-black leading-snug tracking-[-0.02em] text-white transition group-hover:text-[#ff4b8f] lg:text-2xl">
                      {study.headline}
                    </h3>
                    <p className="mt-4 flex-1 leading-relaxed text-zinc-400">
                      {study.summary}
                    </p>
                    <dl className="mt-7 grid grid-cols-3 gap-4 border-t border-white/[0.07] pt-6">
                      {study.results.map((result) => (
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
      )}

      {/* --------------------------------------------------------- FAQs */}
      <section className="border-b border-white/10 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ff4b8f]">
              Answers
            </p>
            <h2
              id="faq"
              className="mt-5 scroll-mt-28 text-4xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-white sm:text-5xl"
            >
              {service.short},
              <br />{" "}
              <span className="text-[#ff176e]">explained.</span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-zinc-400">
              The questions we get asked most about{" "}
              {service.short.toLowerCase()} before a project begins.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <FaqAccordion items={faqs} />
          </Reveal>
        </div>
      </section>

      {/* ----------------------------------------------------- glossary */}
      {content && (
        <section className="border-b border-white/10 px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-[1500px]">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ff4b8f]">
                Glossary
              </p>
              <h2
                id="glossary"
                className="mt-5 scroll-mt-28 text-3xl font-black uppercase tracking-[-0.04em] text-white sm:text-4xl"
              >
                The terms, <span className="text-[#ff176e]">defined.</span>
              </h2>
              <p className="mt-5 max-w-2xl leading-relaxed text-zinc-400">
                Plain definitions of the vocabulary this page uses, so you can
                compare proposals without having to decode them.
              </p>
            </Reveal>

            <dl className="mt-10 grid gap-4 sm:grid-cols-2">
              {content.glossary.map((entry, i) => (
                <Reveal
                  key={entry.term}
                  delay={(i % 2) * 60}
                  className="rounded-2xl border border-white/10 bg-[#0d0d13] p-6"
                >
                  <dt className="flex items-start gap-3 font-bold text-white">
                    {/* The accent lives on the wrapper: `Icon` takes only name,
                        className and strokeWidth, so a `style` passed to it is
                        silently dropped rather than colouring the glyph. */}
                    <span
                      className="mt-0.5 flex shrink-0"
                      style={{ color: service.accent }}
                    >
                      <Icon name="book" className="h-4 w-4" />
                    </span>
                    {entry.term}
                  </dt>
                  <dd className="mt-3 text-sm leading-relaxed text-zinc-400">
                    {entry.definition}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* -------------------------------------------- related reading */}
      {relatedReading.length > 0 && (
        <section className="border-b border-white/10 px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-[1500px]">
            <Reveal className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="text-2xl font-black uppercase tracking-[-0.03em] text-white sm:text-3xl">
                Related <span className="text-[#ff176e]">reading.</span>
              </h2>
              <Button href="/blog" variant="outline" arrow={false} size="sm">
                All articles
              </Button>
            </Reveal>
            <ul className="mt-8 grid gap-3 lg:grid-cols-3">
              {relatedReading.map((post, i) => (
                <Reveal key={post.slug} delay={i * 70} as="li">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-white/10 bg-[#0d0d13] p-6 transition duration-500 hover:-translate-y-1 hover:border-[#ff176e]/45"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff4b8f]">
                      {post.readingTime}
                    </span>
                    <span className="mt-3 flex-1 font-bold leading-snug text-white transition group-hover:text-[#ff4b8f]">
                      {post.title}
                    </span>
                    <span className="mt-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-muted transition group-hover:text-[#ff4b8f]">
                      Read
                      <Icon
                        name="arrowRight"
                        className="h-3.5 w-3.5 transition duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ------------------------------------------------- other services */}
      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1500px]">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ff4b8f]">
              Keep exploring
            </p>
            <h2 className="mt-5 text-3xl font-black uppercase tracking-[-0.04em] text-white sm:text-4xl">
              Other <span className="text-[#ff176e]">capabilities.</span>
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {others.map((item, i) => (
              <Reveal key={item.slug} delay={i * 70}>
                <Link
                  href={`/services/${item.slug}`}
                  className="group flex h-full flex-col rounded-[1.75rem] border border-white/10 bg-[#0d0d13] p-6 transition duration-500 hover:-translate-y-1 hover:border-[#ff176e]/45"
                >
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]"
                    style={{ color: item.accent }}
                  >
                    <ServiceGlyph path={item.iconPath} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-6 text-lg font-bold text-white transition group-hover:text-[#ff4b8f]">
                    {item.short}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">
                    {item.summary}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-muted transition group-hover:text-[#ff4b8f]">
                    Explore
                    <Icon
                      name="arrowRight"
                      className="h-3.5 w-3.5 transition duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10">
            <Link
              href="/services"
              className="btn-3d btn-3d--outline group inline-flex items-center gap-3 rounded-full border border-white/10 px-5 py-3.5 text-sm font-bold text-zinc-300 hover:border-[#ff176e]/50 hover:text-white"
            >
              <span className="font-mono text-xs text-[#ff4b8f]">
                {String(index + 1).padStart(2, "0")} / 06
              </span>
              Back to all services
              <Icon
                name="arrowRight"
                className="h-4 w-4 transition duration-300 group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Contextual closing CTA. It names the service so this band reads as
          the next step from *this* page, and it never repeats the footer
          band's wording — see the note in CtaSection.jsx. */}
      <CtaSection
        title={
          <>
            Ready to move on
            <br />{" "}
            <span className="text-[#ff176e]">{service.short}?</span>
          </>
        }
        lede="Tell us the outcome you need, what is working and what is not, and we'll come back with a plan, a timeline and the results we'd hold ourselves to."
      />
    </>
  );
}
