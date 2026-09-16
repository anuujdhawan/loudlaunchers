import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import FaqAccordion from "@/components/FaqAccordion";
import JsonLd from "@/components/JsonLd";
import Icon from "@/components/Icons";
import ContactBriefForm from "@/components/ContactBriefForm";
import { site, faqs, faqSchema, whatsappLink } from "@/lib/site";
import { og, twitter } from "@/lib/seo";

export const metadata = {
  title: "Start a Project — Get Your Free Launch Plan",
  description:
    "Tell us about your project and get a clear plan, timeline and next steps from Loud Launchers — websites, apps, marketing, SEO and branding.",
  alternates: { canonical: "/contact" },
  openGraph: og({
    title: "Start a Project — Get Your Free Launch Plan",
    description:
      "Tell us about your project and get a clear plan, timeline and next steps from Loud Launchers.",
    path: "/contact",
  }),
  twitter: twitter({
    title: "Start a Project — Get Your Free Launch Plan",
    description:
      "Tell us about your project and get a clear plan, timeline and next steps from Loud Launchers.",
  }),
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${site.domain}/contact#contact`,
  name: "Start a Project | Loud Launchers",
  url: `${site.domain}/contact`,
  about: { "@id": `${site.domain}/#organization` },
};

export default function Contact() {
  return (
    <>
      <JsonLd data={contactSchema} />
      <JsonLd data={faqSchema} />
      <PageHero
        eyebrow="Ready for ignition"
        title={
          <>
            Let&apos;s build something
            <br />{" "}
            people <span className="text-[#ff176e]">remember.</span>
          </>
        }
        lede="Tell us where your business is headed. We will come back with a plan, a timeline and clear next steps — usually within one business day."
      />

      <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[1.2fr_.8fr] lg:gap-16">
          {/* Brief form */}
          <Reveal className="rounded-[2rem] border border-white/10 bg-[#0b0b10] p-7 sm:p-10">
            <ContactBriefForm />
          </Reveal>

          {/* Direct contact + service area */}
          <div className="grid content-start gap-4">
            <Reveal className="rounded-[2rem] border border-white/10 bg-[#0d0d13] p-8">
              <h2 className="text-lg font-black uppercase tracking-[0.06em] text-white">
                Direct lines
              </h2>
              <address className="mt-5 grid gap-3 text-sm not-italic leading-relaxed text-zinc-400">
                <a
                  href={`mailto:${site.email}`}
                  className="font-semibold text-white transition hover:text-[#ff4b8f]"
                >
                  {site.email}
                </a>
                <a
                  href={`tel:${site.phone}`}
                  className="inline-flex items-center gap-2 transition hover:text-white"
                >
                  <Icon name="phone" className="h-4 w-4 text-[#ff4b8f]" />
                  {site.phoneDisplay}
                </a>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition hover:text-white"
                >
                  <Icon name="whatsapp" className="h-4 w-4 text-[#25D366]" />
                  WhatsApp — {site.whatsapp.display}
                </a>
                <p className="flex items-center gap-2">
                  <Icon name="globe" className="h-4 w-4 text-[#ff4b8f]" />
                  Remote-first — we work worldwide
                </p>
                <p className="flex items-center gap-2 text-muted">
                  <Icon name="clock" className="h-4 w-4 text-[#ff4b8f]" />
                  {site.hours}
                </p>
              </address>
            </Reveal>

            <Reveal
              delay={80}
              className="rounded-[2rem] border border-white/10 bg-[#0d0d13] p-8"
            >
              <h2 className="text-lg font-black uppercase tracking-[0.06em] text-white">
                Where we launch
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                Working worldwide with clients across:
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {site.areasServed.map((area) => (
                  <li
                    key={area}
                    className="rounded-full border border-white/10 px-3.5 py-1.5 text-xs font-semibold text-zinc-300"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal
              delay={140}
              className="rounded-[2rem] border border-[#ff176e]/30 bg-gradient-to-br from-[#1c0a14] to-[#0d0d13] p-8"
            >
              <h2 className="text-lg font-black uppercase tracking-[0.06em] text-white">
                Fast replies, clear plans
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                Every brief gets a real response from the team that would run
                your project — no hand-offs, no telephone games.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        aria-labelledby="contact-faq-title"
        className="border-t border-white/10 px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
      >
        <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <h2
              id="contact-faq-title"
              className="text-4xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-white sm:text-5xl"
            >
              Before you
              <br />{" "}
              <span className="text-[#ff176e]">ask.</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <FaqAccordion items={faqs} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
