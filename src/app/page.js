import Image from "next/image";
import Link from "next/link";
import HeroCanvas from "@/components/HeroCanvas";
import HeroLaunch from "@/components/HeroLaunch";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import SectionHeading, { TextLink } from "@/components/SectionHeading";
import MethodAccordion from "@/components/MethodAccordion";
import FaqAccordion from "@/components/FaqAccordion";
import CtaSection from "@/components/CtaSection";
import { services, differentiators, faqs, faqSchema } from "@/lib/site";
import { getFeaturedPosts, formatDate } from "@/lib/posts";
import JsonLd from "@/components/JsonLd";

export default function Home() {
  const featured = getFeaturedPosts();

  return (
    <>
      <JsonLd data={faqSchema} />
      {/* ---------------------------------------------------------- HERO */}
      <section
        id="home"
        aria-labelledby="hero-title"
        className="relative isolate flex min-h-[900px] items-center overflow-hidden border-b border-white/10 pt-28 lg:min-h-screen"
      >
        <HeroCanvas />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-20 -z-10 h-[36rem] w-[36rem] rounded-full bg-[#b80852]/20 blur-3xl motion-safe:animate-pulse [animation-duration:7s]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-56 bottom-0 -z-10 h-[28rem] w-[28rem] rounded-full bg-violet-800/10 blur-3xl"
        />

        <div className="mx-auto grid w-full max-w-[1500px] items-center gap-8 px-5 pb-16 sm:px-8 lg:grid-cols-[1.02fr_.98fr] lg:px-12 lg:pb-20">
          <div className="relative z-10 pt-10 lg:pt-0">
            <Reveal className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#ff176e] opacity-75 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#ff176e]" />
              </span>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-zinc-300 sm:text-sm">
                Digital launch studio / Ready for ignition
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h1
                id="hero-title"
                className="mt-7 text-[clamp(3.8rem,8vw,8.2rem)] font-black uppercase leading-[0.82] tracking-[-0.075em] text-white"
              >
                Think it.
                <br />
                Build it.
                <br />
                <span className="bg-gradient-to-r from-[#ff176e] via-[#ff5aa1] to-[#b356ff] bg-clip-text text-transparent">
                  Launch it.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={200} className="mt-8 sm:grid sm:grid-cols-[1fr_auto] sm:items-end sm:gap-7">
              <p className="max-w-xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
                One connected team for websites, apps, performance marketing,
                search, branding and social — built to move your business
                forward.
              </p>
              <div className="hidden h-16 w-px bg-gradient-to-b from-[#ff176e] to-transparent sm:block" />
            </Reveal>

            <Reveal delay={300} className="mt-9 flex flex-wrap items-center gap-4">
              <Button href="/contact" size="lg">
                Ignite your project
              </Button>
              <Link
                href="#services"
                className="group inline-flex items-center gap-3 rounded-full px-4 py-4 font-semibold text-zinc-300 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink-400"
              >
                Explore capabilities
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-4 w-4 rotate-90 transition group-hover:translate-y-1"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </Reveal>

            <Reveal
              delay={400}
              className="mt-12 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/10 pt-6 text-xs font-medium uppercase tracking-[0.15em] text-zinc-500"
            >
              <span>Strategy-led</span>
              <span className="text-[#ff176e]">•</span>
              <span>Design-obsessed</span>
              <span className="text-[#ff176e]">•</span>
              <span>Built to perform</span>
            </Reveal>
          </div>

          <HeroLaunch />
        </div>

        <div className="absolute bottom-0 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-3 pb-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500 lg:flex">
          <span className="h-8 w-px bg-gradient-to-b from-[#ff176e] to-transparent" />
          Scroll to explore
        </div>
      </section>

      {/* Capabilities strip */}
      <section
        aria-label="Loud Launchers capabilities"
        className="border-b border-white/10 bg-[#08080b] px-5 py-5 sm:px-8 lg:px-12"
      >
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-bold uppercase tracking-[0.17em] text-zinc-500 lg:justify-between">
          <span>Web experiences</span>
          <span className="text-[#ff176e]">✦</span>
          <span>Mobile products</span>
          <span className="text-[#ff176e]">✦</span>
          <span>Performance marketing</span>
          <span className="text-[#ff176e]">✦</span>
          <span>Search growth</span>
          <span className="text-[#ff176e]">✦</span>
          <span>Brand systems</span>
          <span className="text-[#ff176e]">✦</span>
          <span>Social momentum</span>
        </div>
      </section>

      {/* ------------------------------------------------- WHY LOUD */}
      <section
        id="difference"
        aria-labelledby="difference-title"
        className="scroll-mt-20 border-b border-white/10 px-5 py-24 sm:px-8 lg:px-12 lg:py-36"
      >
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <SectionHeading
                eyebrow="01 / Why Loud"
                title={
                  <>
                    From average
                    <br />
                    to <span className="text-[#ff176e]">extraordinary.</span>
                  </>
                }
                lede="Digital growth is not just about having a website or running ads. It is about transforming how your business is perceived, experienced and remembered."
              />
            </Reveal>
            <div className="grid content-start gap-4 sm:grid-cols-2">
              {differentiators.map((item, index) => (
                <Reveal
                  key={item.title}
                  delay={index * 80}
                  className="rounded-2xl border border-white/10 bg-[#0d0d13] p-6 transition duration-500 hover:-translate-y-1 hover:border-[#ff176e]/40"
                >
                  <p className="font-mono text-xs text-[#ff4b8f]">
                    0{index + 1}
                  </p>
                  <h3 className="mt-3 text-xl font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                    {item.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- SERVICES */}
      <section
        id="services"
        aria-labelledby="services-title"
        className="scroll-mt-20 border-b border-white/10 px-5 py-24 sm:px-8 lg:px-12 lg:py-36"
      >
        <div className="mx-auto max-w-[1500px]">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="02 / Capabilities"
              title={
                <>
                  Six services. One connected
                  <br />
                  growth <span className="text-[#ff176e]">engine.</span>
                </>
              }
              lede="Each service can stand on its own. Together, they create a more cohesive customer experience and a stronger platform for long-term growth."
            />
          </Reveal>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Reveal
                key={service.slug}
                delay={(index % 3) * 90}
                as="article"
                className="group rounded-[2rem] border border-white/10 bg-[#111116] p-7 transition duration-500 hover:-translate-y-1 hover:border-[#ff176e]/50 lg:p-8"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-sm text-[#ff4b8f]">
                    {service.num}
                  </span>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 32 32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    className="h-9 w-9 text-zinc-500 transition group-hover:text-[#ff4b8f]"
                  >
                    <path d={service.iconPath} />
                  </svg>
                </div>
                <h3 className="mt-20 text-2xl font-black uppercase leading-tight tracking-[-0.03em] text-white lg:text-3xl">
                  {service.title}
                </h3>
                <p className="mt-5 leading-relaxed text-zinc-400">
                  {service.summary}
                </p>
                <div className="mt-8 flex items-center justify-between gap-4">
                  <Link
                    href="/contact"
                    className="font-bold text-white transition hover:text-[#ff4b8f]"
                    aria-label={`Start a ${service.short} project with Loud Launchers`}
                  >
                    Start a project →
                  </Link>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-600">
                    {service.short}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- METHOD */}
      <section
        id="method"
        aria-labelledby="method-title"
        className="relative scroll-mt-20 overflow-hidden border-b border-white/10 px-5 py-24 sm:px-8 lg:px-12 lg:py-36"
      >
        <h2 id="method-title" className="sr-only">
          Our process
        </h2>
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-[#220914]/30 to-transparent"
        />
        <div className="relative mx-auto max-w-[1500px]">
          <MethodAccordion />
        </div>
      </section>

      {/* ------------------------------------------------------- BLOG */}
      <section
        id="insights"
        aria-labelledby="insights-title"
        className="scroll-mt-20 border-b border-white/10 px-5 py-24 sm:px-8 lg:px-12 lg:py-36"
      >
        <div className="mx-auto max-w-[1500px]">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Insights"
              title={
                <>
                  Signals from
                  <br />
                  the <span className="text-[#ff176e]">launchpad.</span>
                </>
              }
              lede="Practical thinking on websites, marketing, SEO and AI-era visibility — written to be useful, not just readable."
            />
            <TextLink href="/blog">All insights</TextLink>
          </Reveal>

          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {featured.map((post, index) => (
              <Reveal
                key={post.slug}
                delay={index * 90}
                as="article"
                className="group flex flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#111116] transition duration-500 hover:-translate-y-1 hover:border-[#ff176e]/50"
              >
                <Link href={`/blog/${post.slug}`} className="flex flex-1 flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ff4b8f]">
                      {post.category}
                    </p>
                    <h3 className="mt-3 text-xl font-bold leading-snug text-white transition group-hover:text-[#ff4b8f]">
                      {post.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">
                      {post.description}
                    </p>
                    <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                      {formatDate(post.date)} · {post.readingTime}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- FAQ */}
      <section
        id="faq"
        aria-labelledby="faq-title"
        className="border-b border-white/10 px-5 py-24 sm:px-8 lg:px-12 lg:py-36"
      >
        <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              eyebrow="Answers"
              title={
                <>
                  Questions,
                  <br />
                  <span className="text-[#ff176e]">answered.</span>
                </>
              }
              lede="Everything you might want to know before your first conversation with us."
            />
          </Reveal>
          <Reveal delay={120}>
            <FaqAccordion items={faqs} />
          </Reveal>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
