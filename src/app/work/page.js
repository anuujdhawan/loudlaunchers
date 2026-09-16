import Link from "next/link";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import CtaSection from "@/components/CtaSection";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import Icon, { ServiceGlyph } from "@/components/Icons";
import { caseStudies, services, site, stats } from "@/lib/site";
import { og, twitter } from "@/lib/seo";

export const metadata = {
  title: "Work — Website, App & Growth Case Studies",
  description:
    "Real Loud Launchers launches: websites, apps, SEO and branding projects with the challenge, the approach and the measured results.",
  keywords: [
    "digital agency case studies",
    "website redesign case study",
    "SEO results",
    "app launch case study",
  ],
  alternates: { canonical: "/work" },
  openGraph: og({
    title: "Selected Work — Website, App & Growth Case Studies",
    description:
      "Real launches with the challenge, the approach and the measured results.",
    path: "/work",
  }),
  twitter: twitter({
    title: "Selected Work — Website, App & Growth Case Studies",
    description:
      "Real launches with the challenge, the approach and the measured results.",
  }),
};

const caseStudySchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Loud Launchers Case Studies",
  url: `${site.domain}/work`,
  about: { "@id": `${site.domain}/#organization` },
  hasPart: caseStudies.map((study) => ({
    "@type": "Article",
    headline: study.headline,
    about: study.sector,
    url: `${site.domain}/work/${study.slug}`,
    author: { "@id": `${site.domain}/#organization` },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: site.domain },
    {
      "@type": "ListItem",
      position: 2,
      name: "Work",
      item: `${site.domain}/work`,
    },
  ],
};

export default function WorkIndex() {
  const sectors = [...new Set(caseStudies.map((study) => study.sector))];

  return (
    <>
      <JsonLd data={caseStudySchema} />
      <JsonLd data={breadcrumbSchema} />

      <PageHero
        eyebrow="Selected work"
        title={
          <>
            Launches with
            <br />{" "}
            receipts, not <span className="text-launch-gradient">promises.</span>
          </>
        }
        lede="Every project below started with a business problem, not a design brief. Here is the challenge, what we did about it, and what changed as a result."
      >
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button opensLead leadSource="work-hero" size="lg">
            Start a project
          </Button>
          <Button href="/services" variant="outline" size="lg" arrow={false}>
            Browse services
          </Button>
        </div>
      </PageHero>

      {/* ------------------------------------------------------- stats */}
      <section
        aria-label="Studio results at a glance"
        className="border-b border-white/10 bg-[#08080b]"
      >
        <div className="mx-auto grid max-w-[1500px] grid-cols-2 gap-x-6 gap-y-8 px-5 py-10 sm:px-8 lg:grid-cols-4 lg:px-12">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 70}>
              <p className="font-mono text-3xl font-bold text-white sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-[#ff4b8f]">
                {stat.label}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-muted">
                {stat.detail}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------- case studies */}
      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1500px] gap-6">
          {caseStudies.map((study, index) => {
            const flipped = index % 2 === 1;
            return (
              <Reveal key={study.slug}>
                <article className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d0d13] transition duration-500 hover:border-[#ff176e]/40">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-40 -top-40 h-80 w-80 rounded-full bg-[#ff176e]/12 opacity-0 blur-[100px] transition duration-700 group-hover:opacity-100"
                  />
                  <div className="relative grid gap-10 p-7 lg:grid-cols-[1.15fr_.85fr] lg:gap-14 lg:p-12">
                    <div className={flipped ? "lg:order-2" : ""}>
                      <p className="flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff4b8f]">
                        {study.client}
                        <span aria-hidden="true" className="text-zinc-700">
                          /
                        </span>
                        <span className="text-muted">{study.sector}</span>
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

                      <h2 className="mt-5 text-2xl font-black leading-tight tracking-[-0.035em] text-white sm:text-3xl lg:text-4xl">
                        {study.headline}
                      </h2>

                      <p className="mt-5 max-w-2xl leading-relaxed text-zinc-400">
                        {study.summary}
                      </p>

                      <ul className="mt-7 flex flex-wrap gap-2">
                        {study.services.map((service) => (
                          <li
                            key={service}
                            className="rounded-full border border-white/10 px-3.5 py-1.5 text-[11px] font-semibold text-zinc-400"
                          >
                            {service}
                          </li>
                        ))}
                      </ul>

                      <blockquote className="mt-8 border-l-2 border-[#ff176e] pl-5">
                        <p className="text-lg font-medium italic leading-relaxed text-zinc-200">
                          “{study.quote}”
                        </p>
                        <footer className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                          {study.quoteAuthor}
                        </footer>
                      </blockquote>

                      <Link
                        href={`/work/${study.slug}`}
                        className="btn-3d btn-3d--white group/link mt-8 inline-flex items-center gap-3 rounded-full px-5 py-3.5 text-sm font-black text-black"
                      >
                        Read the full story
                        <Icon
                          name="arrowUpRight"
                          className="h-3.5 w-3.5 transition duration-300 group-hover/link:rotate-45"
                        />
                      </Link>
                    </div>

                    <div className={flipped ? "lg:order-1" : ""}>
                      <dl className="grid gap-3">
                        {study.results.map((result, i) => (
                          <div
                            key={result.label}
                            className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5"
                            style={{
                              borderColor:
                                i === 0 ? "rgba(255,23,110,0.35)" : undefined,
                            }}
                          >
                            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
                              {result.label}
                              {result.context ? (
                                <span className="mt-1 block text-[10px] font-medium normal-case tracking-normal text-subtle">
                                  {result.context}
                                </span>
                              ) : null}
                            </dt>
                            <dd className="font-mono text-xl font-bold text-white sm:text-2xl">
                              {result.value}
                            </dd>
                          </div>
                        ))}
                      </dl>

                      <div className="mt-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                          The challenge
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                          {study.challenge}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------ sectors */}
      <section className="border-y border-white/10 bg-[#08080b] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-20">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ff4b8f]">
                Industries
              </p>
              <h2 className="mt-5 text-3xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-white sm:text-4xl">
                Sectors we
                <br />{" "}
                know <span className="text-[#ff176e]">well.</span>
              </h2>
              <p className="mt-6 max-w-md leading-relaxed text-zinc-400">
                We work with ambitious businesses across these sectors — and
                enjoy the ones we haven&apos;t yet.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <ul className="flex flex-wrap gap-2.5">
                {[
                  ...sectors,
                  "Professional services",
                  "Hospitality",
                  "Manufacturing",
                  "Non-profit",
                ].map((sector) => (
                  <li
                    key={sector}
                    className="rounded-full border border-white/10 bg-white/[0.02] px-4 py-2.5 text-sm font-semibold text-zinc-300"
                  >
                    {sector}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ service bridge */}
      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1500px]">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ff4b8f]">
                What went into these
              </p>
              <h2 className="mt-5 text-3xl font-black uppercase tracking-[-0.04em] text-white sm:text-4xl">
                The <span className="text-[#ff176e]">capabilities</span> behind
                the work.
              </h2>
            </div>
            <Button href="/services" variant="outline" arrow={false}>
              All services
            </Button>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={(i % 3) * 70}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full items-center gap-4 rounded-2xl border border-white/10 bg-[#0d0d13] p-5 transition duration-500 hover:-translate-y-1 hover:border-[#ff176e]/45"
                >
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]"
                    style={{ color: service.accent }}
                  >
                    <ServiceGlyph path={service.iconPath} className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold text-white transition group-hover:text-[#ff4b8f]">
                      {service.short}
                    </span>
                    <span className="mt-1 block truncate text-xs text-muted">
                      {service.timeline}
                    </span>
                  </span>
                  <Icon
                    name="arrowRight"
                    className="h-4 w-4 shrink-0 text-subtle transition duration-300 group-hover:translate-x-1 group-hover:text-[#ff4b8f]"
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title={
          <>
            Your project could be
            <br />{" "}
            the next <span className="text-[#ff176e]">case study.</span>
          </>
        }
        lede="Tell us the outcome you need. We'll come back with a plan, a timeline and the results we'd hold ourselves to."
      />
    </>
  );
}
