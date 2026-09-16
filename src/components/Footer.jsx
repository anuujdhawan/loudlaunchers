import Link from "next/link";
import Image from "next/image";
/* `socialMeta` is only used by the commented-out social tiles below, so the
   named import comes back with them: `import Icon, { socialMeta } from "./Icons"` */
import Icon from "./Icons";
import NewsletterForm from "./NewsletterForm";
import Button from "./Button";
import { site, services, stats, whatsappLink } from "@/lib/site";
import { getCategoryFacets } from "@/lib/blog";

const companyLinks = [
  { href: "/about", label: "About us" },
  { href: "/work", label: "Selected work" },
  { href: "/services", label: "All services" },
  { href: "/#method", label: "Our process" },
  { href: "/contact", label: "Start a project" },
];

const resourceLinks = [
  { href: "/blog", label: "Blog home" },
  { href: "/blog?category=ai-search", label: "AI search & AEO" },
  { href: "/blog?category=seo", label: "SEO playbooks" },
  { href: "/blog?category=websites", label: "Websites & UX" },
  { href: "/#faq", label: "FAQs" },
];

const MARQUEE = [
  "Think it",
  "Build it",
  "Launch it",
  "Websites",
  "Mobile apps",
  "Performance marketing",
  "SEO",
  "Branding",
  "Social media",
];

export default function Footer() {
  const categories = getCategoryFacets().slice(1, 6);
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#06060a]">
      {/* Top edge glow */}
      <div
        aria-hidden="true"
        className="rule-gradient absolute inset-x-0 top-0 h-px"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[#b80852]/20 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/3 h-[28rem] w-[28rem] rounded-full bg-violet-700/12 blur-[120px]"
      />

      {/* ------------------------------------------------ CTA band */}
      <section
        aria-labelledby="footer-cta-title"
        className="relative border-b border-white/[0.07]"
      >
        <div
          aria-hidden="true"
          className="bg-grid pointer-events-none absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
        />
        <div className="relative mx-auto grid max-w-[1500px] gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:gap-20 lg:px-12 lg:py-28">
          <div>
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-[#ff4b8f]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#ff176e] opacity-75 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff176e]" />
              </span>
              Ready when you are
            </p>
            <h2
              id="footer-cta-title"
              className="mt-6 text-[clamp(2.5rem,5.5vw,4.5rem)] font-black uppercase leading-[0.88] tracking-[-0.055em] text-white"
            >
              Your next launch
              <br />{" "}
              starts with a stronger{" "}
              <span className="text-launch-gradient">story.</span>
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-zinc-400">
              Tell us where your business is headed. We&apos;ll come back with a
              plan, a timeline and clear next steps — usually within one
              business day.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button opensLead leadSource="footer-cta" size="lg">
                Start a project
              </Button>
              <Button href="/work" variant="outline" size="lg" arrow={false}>
                See our work
              </Button>
            </div>

            <dl className="mt-12 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-6 border-t border-white/[0.07] pt-8 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-mono text-2xl font-bold text-white">
                      {stat.value}
                    </span>
                    <span className="mt-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0b11]/80 p-7 backdrop-blur-xl sm:p-9">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#ff176e]/20 blur-3xl"
            />
            <div className="relative">
              <NewsletterForm />
              <div className="mt-8 grid gap-3 border-t border-white/[0.07] pt-7">
                <a
                  href={`mailto:${site.email}`}
                  className="group flex items-center gap-3 text-sm font-semibold text-white transition hover:text-[#ff4b8f]"
                >
                  <Icon name="mail" className="h-4 w-4 text-[#ff4b8f]" />
                  {site.email}
                  <Icon
                    name="arrowUpRight"
                    className="h-3.5 w-3.5 text-subtle transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#ff4b8f]"
                  />
                </a>
                <a
                  href={`tel:${site.phone}`}
                  className="flex items-center gap-3 text-sm text-zinc-400 transition hover:text-white"
                >
                  <Icon name="phone" className="h-4 w-4 text-[#ff4b8f]" />
                  {site.phoneDisplay}
                </a>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-zinc-400 transition hover:text-white"
                >
                  <Icon name="whatsapp" className="h-4 w-4 text-[#ff4b8f]" />
                  WhatsApp us
                </a>
                <p className="flex items-center gap-3 text-sm text-muted">
                  <Icon name="clock" className="h-4 w-4 text-[#ff4b8f]" />
                  {site.hours}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------- marquee ticker */}
      <div
        aria-hidden="true"
        className="relative overflow-hidden border-b border-white/[0.07] bg-white/[0.015] py-4"
      >
        <div className="animate-marquee flex w-max items-center">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex items-center">
              {MARQUEE.map((word) => (
                <li
                  key={`${copy}-${word}`}
                  className="flex items-center whitespace-nowrap px-6 text-xs font-bold uppercase tracking-[0.28em] text-subtle"
                >
                  {word}
                  <span className="ml-6 text-[#ff176e]">✦</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* -------------------------------------------------- link grid */}
      <div className="relative mx-auto max-w-[1500px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.15fr]">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="group inline-flex items-center gap-3"
              aria-label="Loud Launchers home"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.09] to-white/[0.02] shadow-lg shadow-pink-500/10 transition duration-300 group-hover:rotate-3 group-hover:border-[#ff176e]/40">
                <Image
                  src="/logo-mark.webp"
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain drop-shadow-[0_0_10px_rgba(255,23,110,.4)]"
                />
              </span>
              <span className="text-sm font-black uppercase leading-none tracking-[0.12em] text-white">
                Loud <span className="text-[#ff2d7d]">Launchers</span>
              </span>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-relaxed text-zinc-400">
              {site.shortDescription}
            </p>

            <p className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-[11px] font-semibold text-zinc-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              Available for new launches
            </p>

            {/* ------------------------------------------------------------
                SOCIAL TILES — commented out until real profile URLs exist.
                `site.sameAs` still holds placeholder handles, so every one of
                these links is dead. To restore: re-add the named import
                (`import Icon, { socialMeta } from "./Icons"`) and delete this
                comment wrapper. The same three-part change is needed in
                Header.jsx and app/blog/[slug]/page.js.
            ------------------------------------------------------------

            <ul className="mt-7 flex flex-wrap gap-2">
              {site.sameAs.map((url) => {
                const { icon, label } = socialMeta(url);
                if (!icon) return null;
                return (
                  <li key={url}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Loud Launchers on ${label}`}
                      title={label}
                      className="btn-3d btn-3d--outline flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-400 hover:border-[#ff176e]/50 hover:bg-[#ff176e]/10 hover:text-white"
                    >
                      <Icon name={icon} className="h-4 w-4" />
                    </a>
                  </li>
                );
              })}
            </ul>

            */}
          </div>

          {/* Services */}
          <nav aria-labelledby="footer-services">
            <h2
              id="footer-services"
              className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted"
            >
              Services
            </h2>
            <ul className="mt-5 grid gap-3 text-sm">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group inline-flex items-center gap-2 text-zinc-400 transition hover:text-white"
                  >
                    <span
                      aria-hidden="true"
                      className="h-1 w-1 rounded-full transition duration-300 group-hover:scale-150"
                      style={{ backgroundColor: service.accent }}
                    />
                    {service.short}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-labelledby="footer-company">
            <h2
              id="footer-company"
              className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted"
            >
              Company
            </h2>
            <ul className="mt-5 grid gap-3 text-sm">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Insights */}
          <nav aria-labelledby="footer-insights">
            <h2
              id="footer-insights"
              className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted"
            >
              Insights
            </h2>
            <ul className="mt-5 grid gap-3 text-sm">
              {resourceLinks.slice(0, 1).map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/blog?category=${category.slug}`}
                    className="group inline-flex items-center gap-2 text-zinc-400 transition hover:text-white"
                  >
                    {category.short}
                    <span className="font-mono text-[10px] text-subtle transition group-hover:text-[#ff4b8f]">
                      {String(category.count).padStart(2, "0")}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
              Studio
            </h2>
            {/* No postal address — the studio is remote-first (see the note in
                `src/lib/site.js`). The column carries the contact routes and
                working hours instead, which is what a visitor actually needs
                and what the address line was never providing. */}
            <address className="mt-5 grid gap-3.5 text-sm not-italic leading-relaxed text-zinc-400">
              <p className="flex items-center gap-3">
                <Icon
                  name="mail"
                  className="h-4 w-4 shrink-0 text-[#ff4b8f]"
                />
                <a
                  href={`mailto:${site.email}`}
                  className="break-all transition hover:text-white"
                >
                  {site.email}
                </a>
              </p>
              <p className="flex items-center gap-3">
                <Icon
                  name="phone"
                  className="h-4 w-4 shrink-0 text-[#ff4b8f]"
                />
                <a
                  href={`tel:${site.phone}`}
                  className="transition hover:text-white"
                >
                  {site.phoneDisplay}
                </a>
              </p>
              <p className="flex items-center gap-3">
                <Icon
                  name="globe"
                  className="h-4 w-4 shrink-0 text-[#ff4b8f]"
                />
                Remote-first — worldwide
              </p>
              <p className="flex items-center gap-3">
                <Icon
                  name="clock"
                  className="h-4 w-4 shrink-0 text-[#ff4b8f]"
                />
                {site.hours}
              </p>
            </address>

            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
              Where we launch
            </p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {site.areasServed.slice(0, 6).map((area) => (
                <li
                  key={area}
                  className="rounded-full border border-white/[0.07] px-2.5 py-1 text-[10px] font-semibold text-muted"
                >
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ------------------------------------------- oversized wordmark */}
      <div
        aria-hidden="true"
        className="relative select-none overflow-hidden border-t border-white/[0.07] pt-10"
      >
        {/* SVG + textLength makes the wordmark scale to the exact container
            width at any viewport, instead of clipping at large font sizes.
            Decorative — the brand name is already announced elsewhere. */}
        <svg
          viewBox="0 0 1000 118"
          className="block w-full font-sans font-black uppercase"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
          focusable="false"
        >
          <text
            x="500"
            y="98"
            textAnchor="middle"
            textLength="996"
            lengthAdjust="spacing"
            fontSize="118"
            fill="none"
            stroke="rgba(255,255,255,0.10)"
            strokeWidth="1.4"
          >
            Loud Launchers
          </text>
        </svg>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#06060a] to-transparent"
        />
      </div>

      {/* --------------------------------------------------- base bar */}
      <div className="relative border-t border-white/[0.07] bg-black/30">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-5 px-5 py-7 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <p className="text-xs text-muted">
            © {year} {site.name}. All rights reserved.
          </p>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted">
              {[
                { href: "/services", label: "Services" },
                { href: "/work", label: "Work" },
                { href: "/about", label: "About" },
                { href: "/blog", label: "Blog" },
                { href: "/contact", label: "Contact" },
                { href: "/sitemap.xml", label: "Sitemap" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Think it. Build it.{" "}
            <span className="text-[#ff176e]">Launch it.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
