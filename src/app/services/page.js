import Link from "next/link";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import CtaSection from "@/components/CtaSection";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import MethodAccordion from "@/components/MethodAccordion";
import Icon, { ServiceGlyph } from "@/components/Icons";
import { areasServedSchema, services, site, stages } from "@/lib/site";
import { og, twitter } from "@/lib/seo";

export const metadata = {
  title: "Services — Websites, Apps, SEO & Branding",
  description:
    "Six connected services from Loud Launchers: websites, apps, performance marketing, SEO, branding and social — one team, one growth engine.",
  keywords: [
    "website development agency",
    "mobile app development",
    "performance marketing agency",
    "SEO services",
    "branding agency",
    "social media management",
  ],
  alternates: { canonical: "/services" },
  openGraph: og({
    title: "Services — Websites, Apps, SEO & Branding",
    description:
      "Six connected services — websites, apps, marketing, SEO, branding and social — delivered by one team.",
    path: "/services",
  }),
  twitter: twitter({
    title: "Services — Websites, Apps, SEO & Branding",
    description:
      "Six connected services — websites, apps, marketing, SEO, branding and social — delivered by one team.",
  }),
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Loud Launchers Services",
  url: `${site.domain}/services`,
  itemListElement: services.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Service",
      name: service.title,
      description: service.summary,
      url: `${site.domain}/services/${service.slug}`,
      provider: { "@id": `${site.domain}/#organization` },
      areaServed: areasServedSchema(),
    },
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
      name: "Services",
      item: `${site.domain}/services`,
    },
  ],
};

export default function ServicesIndex() {
  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />

      <PageHero
        eyebrow="02 / Capabilities"
        title={
          <>
            Six services. One connected
            <br />{" "}
            growth <span className="text-launch-gradient">engine.</span>
          </>
        }
        lede="Each service stands on its own and can be engaged alone. Together they create a more cohesive customer experience — and a stronger platform for long-term growth."
      >
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button opensLead leadSource="services-hero" size="lg">
            Start a project
          </Button>
          <Button href="/work" variant="outline" size="lg" arrow={false}>
            See the results
          </Button>
        </div>

        <ul className="mt-12 flex flex-wrap gap-2">
          {services.map((service) => (
            <li key={service.slug}>
              <a
                href={`#${service.slug}`}
                className="btn-3d btn-3d--outline btn-3d--soft inline-flex items-center gap-2 rounded-full border border-white/10 px-3.5 py-2 text-xs font-semibold text-zinc-400 hover:border-[#ff176e]/50 hover:text-white"
              >
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: service.accent }}
                />
                {service.short}
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      {/* ------------------------------------------------- service list */}
      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1500px] gap-5">
          {services.map((service, index) => (
            <Reveal
              key={service.slug}
              delay={(index % 2) * 70}
              id={service.slug}
              className="scroll-mt-28"
            >
              <article className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d0d13] transition duration-500 hover:border-[#ff176e]/40">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full opacity-0 blur-[100px] transition duration-700 group-hover:opacity-100"
                  style={{ backgroundColor: `${service.accent}33` }}
                />
                <div className="relative grid gap-8 p-7 lg:grid-cols-[auto_1fr_auto] lg:items-start lg:gap-12 lg:p-12">
                  <div className="flex items-center gap-5 lg:block">
                    <span
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] lg:h-16 lg:w-16"
                      style={{ color: service.accent }}
                    >
                      <ServiceGlyph
                        path={service.iconPath}
                        className="h-6 w-6 lg:h-7 lg:w-7"
                      />
                    </span>
                    <span className="font-mono text-xs text-subtle lg:mt-4 lg:block">
                      {service.num}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <h2 className="text-2xl font-black uppercase leading-tight tracking-[-0.03em] text-white sm:text-3xl">
                      {service.title}
                    </h2>
                    <p className="mt-4 max-w-2xl leading-relaxed text-zinc-400">
                      {service.longDescription}
                    </p>

                    <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                      {service.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-400"
                        >
                          <Icon
                            name="check"
                            className="mt-0.5 h-3.5 w-3.5 shrink-0"
                            aria-hidden="true"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col gap-4 lg:w-56 lg:items-end">
                    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 lg:w-full">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                        Typical timeline
                      </p>
                      <p className="mt-2 font-mono text-sm text-white">
                        {service.timeline}
                      </p>
                    </div>
                    <Link
                      href={`/services/${service.slug}`}
                      className="btn-3d btn-3d--white group/link inline-flex items-center justify-between gap-3 rounded-xl px-5 py-3.5 text-sm font-black text-black lg:w-full"
                    >
                      Explore {service.short}
                      <Icon
                        name="arrowUpRight"
                        className="h-3.5 w-3.5 transition duration-300 group-hover/link:rotate-45"
                      />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------- process */}
      <section
        id="method"
        aria-labelledby="services-method-title"
        className="relative scroll-mt-28 overflow-hidden border-t border-white/10 px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
      >
        <h2 id="services-method-title" className="sr-only">
          Our process
        </h2>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-[#220914]/30 to-transparent"
        />
        <div className="relative mx-auto max-w-[1500px]">
          <MethodAccordion />
        </div>
      </section>

      {/* -------------------------------------------------- why one team */}
      <section className="border-t border-white/10 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ff4b8f]">
                How the services connect
              </p>
              <h2 className="mt-5 text-4xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-white sm:text-5xl">
                Every stage of the
                <br />{" "}
                launch <span className="text-[#ff176e]">sequence.</span>
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-zinc-400">
                A customer meets your business across several touchpoints before
                they decide. When those touchpoints are built by separate teams,
                the story fragments. One team keeps it whole.
              </p>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2">
              {stages.map((stage, index) => (
                <Reveal
                  key={stage.num}
                  delay={index * 70}
                  className="rounded-2xl border border-white/10 bg-[#0d0d13] p-6"
                >
                  <p className="font-mono text-xs text-[#ff4b8f]">
                    {stage.num}
                  </p>
                  <h3 className="mt-3 text-lg font-bold text-white">
                    {stage.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {stage.description}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaSection
        title={
          <>
            Not sure which
            <br />{" "}
            service you <span className="text-[#ff176e]">need?</span>
          </>
        }
        lede="Tell us the outcome you want. We'll tell you honestly which combination of services gets you there fastest — including when the answer is fewer, not more."
      />
    </>
  );
}
