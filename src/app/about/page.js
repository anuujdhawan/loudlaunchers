import Link from "next/link";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import CtaSection from "@/components/CtaSection";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import MethodAccordion from "@/components/MethodAccordion";
import Icon, { ServiceGlyph } from "@/components/Icons";
import { differentiators, services, site, stats, values } from "@/lib/site";
import { og, twitter } from "@/lib/seo";

export const metadata = {
  title: "About — Inside the Digital Launch Studio",
  description:
    "Loud Launchers is a digital launch studio connecting strategy, design, technology and marketing. Meet the team, the principles and the way we work.",
  keywords: [
    "about Loud Launchers",
    "digital launch studio",
    "digital agency team",
    "how agencies work",
  ],
  alternates: { canonical: "/about" },
  openGraph: og({
    title: "About Loud Launchers — Inside the Digital Launch Studio",
    description:
      "A digital launch studio connecting strategy, design, technology and marketing — one team, one growth engine.",
    path: "/about",
  }),
  twitter: twitter({
    title: "About Loud Launchers — Inside the Digital Launch Studio",
    description:
      "A digital launch studio connecting strategy, design, technology and marketing — one team, one growth engine.",
  }),
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${site.domain}/about#about`,
  name: "About Loud Launchers",
  url: `${site.domain}/about`,
  description:
    "Loud Launchers is a digital launch studio connecting strategy, design, technology and marketing.",
  about: { "@id": `${site.domain}/#organization` },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: site.domain },
    {
      "@type": "ListItem",
      position: 2,
      name: "About",
      item: `${site.domain}/about`,
    },
  ],
};

export default function About() {
  const year = new Date().getFullYear();
  const yearsRunning = Math.max(1, year - Number(site.foundingDate));

  return (
    <>
      <JsonLd data={aboutSchema} />
      <JsonLd data={breadcrumbSchema} />

      <PageHero
        eyebrow={`Established ${site.foundingDate}`}
        title={
          <>
            We build the
            <br />{" "}
            things people <span className="text-launch-gradient">remember.</span>
          </>
        }
        lede="Loud Launchers is a digital launch studio. One team covering strategy, design, development and marketing — so every touchpoint of your business tells the same story, in the same voice, at the same standard."
      >
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button opensLead leadSource="about-hero" size="lg">
            Start a project
          </Button>
          <Button href="/work" variant="outline" size="lg" arrow={false}>
            See our work
          </Button>
        </div>
      </PageHero>

      {/* -------------------------------------------------------- story */}
      <section className="border-b border-white/10 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-20">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ff4b8f]">
                Why we exist
              </p>
              <h2 className="mt-5 text-4xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-white sm:text-5xl">
                Great businesses,
                <br />{" "}
                badly <span className="text-[#ff176e]">represented.</span>
              </h2>
              <div className="mt-8 grid gap-5 text-lg leading-relaxed text-zinc-400">
                <p>
                  Most companies we meet are not short of quality. They are
                  short of a digital presence that reflects it. The website was
                  built years ago, the marketing is handled by whoever has time,
                  the app is a separate project nobody owns, and the brand looks
                  different in every place a customer encounters it.
                </p>
                <p>
                  We started Loud Launchers in {site.foundingDate} to fix that
                  specific problem. Instead of hiring five vendors who never
                  speak, businesses get one team that owns the whole picture:
                  the strategy, the design, the build, the campaigns and the
                  content — all pointed the same way.
                </p>
                <p>
                  {yearsRunning} years on, that is still the entire proposition.
                  We are launch-minded, we measure what we do, and we would
                  rather tell you a smaller plan that works than a bigger one
                  that sounds impressive.
                </p>
              </div>
            </Reveal>

            <Reveal delay={120} className="grid content-start gap-4">
              {differentiators.map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-[#0d0d13] p-6 transition duration-500 hover:border-[#ff176e]/40"
                >
                  <p className="font-mono text-xs text-[#ff4b8f]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-lg font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                    {item.body}
                  </p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- stats */}
      <section
        aria-label="Loud Launchers by the numbers"
        className="border-b border-white/10 bg-[#08080b]"
      >
        <div className="mx-auto grid max-w-[1500px] grid-cols-2 gap-x-6 gap-y-8 px-5 py-12 sm:px-8 lg:grid-cols-4 lg:px-12">
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

      {/* ------------------------------------------------------- values */}
      <section className="border-b border-white/10 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1500px]">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ff4b8f]">
              How we think
            </p>
            <h2 className="mt-5 text-4xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-white sm:text-5xl">
              Four principles we
              <br />{" "}
              don&apos;t <span className="text-[#ff176e]">negotiate.</span>
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            {values.map((value, index) => (
              <Reveal
                key={value.num}
                delay={(index % 2) * 70}
                className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0d0d13] p-7 transition duration-500 hover:-translate-y-1 hover:border-[#ff176e]/45 lg:p-9"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#ff176e]/15 opacity-0 blur-[80px] transition duration-700 group-hover:opacity-100"
                />
                <p className="relative font-mono text-xs text-[#ff4b8f]">
                  {value.num}
                </p>
                <h3 className="relative mt-5 text-xl font-black uppercase tracking-[-0.02em] text-white lg:text-2xl">
                  {value.title}
                </h3>
                <p className="relative mt-4 leading-relaxed text-zinc-400">
                  {value.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- disciplines */}
      <section className="border-b border-white/10 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ff4b8f]">
                How we&apos;re organised
              </p>
              <h2 className="mt-5 text-4xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-white sm:text-5xl">
                Six disciplines,
                <br />{" "}
                one <span className="text-[#ff176e]">studio.</span>
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-zinc-400">
                Each discipline has people who do it every day. The difference is
                that they sit in the same room, work on the same briefs, and are
                measured on the same outcome.
              </p>
              <Button
                href="/services"
                variant="outline"
                className="mt-8"
                arrow={false}
              >
                Explore services
              </Button>
            </Reveal>

            <div className="grid gap-3 sm:grid-cols-2">
              {services.map((service, i) => (
                <Reveal key={service.slug} delay={(i % 2) * 70}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex h-full items-start gap-4 rounded-2xl border border-white/10 bg-[#0d0d13] p-5 transition duration-500 hover:-translate-y-1 hover:border-[#ff176e]/45"
                  >
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]"
                      style={{ color: service.accent }}
                    >
                      <ServiceGlyph
                        path={service.iconPath}
                        className="h-5 w-5"
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-bold text-white transition group-hover:text-[#ff4b8f]">
                        {service.short}
                      </span>
                      <span className="mt-1.5 block text-xs leading-relaxed text-muted">
                        {service.summary}
                      </span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- process */}
      <section className="border-b border-white/10 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <h2 className="sr-only">Our process</h2>
        <div className="mx-auto max-w-[1500px]">
          <MethodAccordion />
        </div>
      </section>

      {/* ------------------------------------------------------- reach */}
      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ff4b8f]">
                Where we work
              </p>
              <h2 className="mt-5 text-4xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-white sm:text-5xl">
                Built remote.
                <br />{" "}
                Launching <span className="text-[#ff176e]">worldwide.</span>
              </h2>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-zinc-400">
                We have no fixed studio and no postal address to hide behind.
                Our clients are spread across seven countries, and remote-first
                delivery means timezone is a detail, not a barrier.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button href="/contact">Get in touch</Button>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-300 transition hover:text-[#ff4b8f]"
                >
                  <Icon name="mail" className="h-4 w-4 text-[#ff4b8f]" />
                  {site.email}
                </a>
              </div>
            </Reveal>

            <Reveal delay={120} className="grid content-start gap-4">
              <div className="rounded-[1.75rem] border border-white/10 bg-[#0d0d13] p-7">
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
                  Regions served
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {site.areasServed.map((area) => (
                    <li
                      key={area}
                      className="rounded-full border border-white/10 px-3.5 py-1.5 text-xs font-semibold text-zinc-300"
                    >
                      {area}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[1.75rem] border border-white/10 bg-[#0d0d13] p-7">
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
                  Studio
                </p>
                <address className="mt-5 grid gap-3 text-sm not-italic leading-relaxed text-zinc-400">
                  <p className="flex items-start gap-3">
                    <Icon
                      name="globe"
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#ff4b8f]"
                    />
                    <span>
                      Remote-first studio
                      <br />{" "}
                      Launching worldwide
                    </span>
                  </p>
                  <p className="flex items-center gap-3">
                    <Icon name="clock" className="h-4 w-4 text-[#ff4b8f]" />
                    {site.hours}
                  </p>
                  <p className="flex items-center gap-3">
                    <Icon name="phone" className="h-4 w-4 text-[#ff4b8f]" />
                    <a
                      href={`tel:${site.phone}`}
                      className="transition hover:text-white"
                    >
                      {site.phoneDisplay}
                    </a>
                  </p>
                </address>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaSection
        title={
          <>
            Let&apos;s build something
            <br />{" "}
            worth <span className="text-[#ff176e]">remembering.</span>
          </>
        }
        lede="Tell us where your business is headed and we'll show you the shortest credible route to getting there."
      />
    </>
  );
}
