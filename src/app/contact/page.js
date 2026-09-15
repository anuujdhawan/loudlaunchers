import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import FaqAccordion from "@/components/FaqAccordion";
import JsonLd from "@/components/JsonLd";
import { site, services, faqs, faqSchema } from "@/lib/site";

export const metadata = {
  title: "Start a Project — Get Your Free Launch Plan",
  description:
    "Tell us about your project and get a clear plan, timeline and next steps from Loud Launchers. Websites, apps, marketing, SEO, branding and social — one connected team.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Start a Project | Loud Launchers",
    description:
      "Tell us about your project and get a clear plan, timeline and next steps from Loud Launchers.",
    url: "/contact",
    type: "website",
  },
};

const inputClasses =
  "w-full rounded-xl border border-white/10 bg-[#0d0d13] px-4 py-3.5 text-white placeholder:text-zinc-600 transition focus:border-[#ff176e] focus:outline-none focus:ring-2 focus:ring-[#ff176e]/30";

const labelClasses =
  "mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-zinc-400";

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
            <br />
            people <span className="text-[#ff176e]">remember.</span>
          </>
        }
        lede="Tell us where your business is headed. We will come back with a plan, a timeline and clear next steps — usually within one business day."
      />

      <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[1.2fr_.8fr] lg:gap-16">
          {/* Brief form */}
          <Reveal className="rounded-[2rem] border border-white/10 bg-[#0b0b10] p-7 sm:p-10">
            <form
              action="mailto:hello@loudlaunchers.com"
              method="post"
              encType="text/plain"
              className="grid gap-6"
            >
              <h2 className="text-2xl font-black uppercase tracking-[-0.02em] text-white">
                Project brief
              </h2>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClasses}>
                    Your name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Jane Cooper"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelClasses}>
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="jane@company.com"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label htmlFor="company" className={labelClasses}>
                    Company
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    placeholder="Company Inc."
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label htmlFor="budget" className={labelClasses}>
                    Budget range
                  </label>
                  <select id="budget" name="budget" className={inputClasses}>
                    <option>Under $5,000</option>
                    <option>$5,000 – $15,000</option>
                    <option>$15,000 – $40,000</option>
                    <option>$40,000+</option>
                    <option>Not sure yet</option>
                  </select>
                </div>
              </div>

              <fieldset>
                <legend className={`${labelClasses} mb-3`}>
                  What do you need?
                </legend>
                <div className="flex flex-wrap gap-2">
                  {services.map((service) => (
                    <label
                      key={service.slug}
                      className="cursor-pointer rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-zinc-400 transition has-checked:border-[#ff176e] has-checked:bg-[#ff176e]/15 has-checked:text-white"
                    >
                      <input
                        type="checkbox"
                        name="services"
                        value={service.short}
                        className="sr-only"
                      />
                      {service.short}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div>
                <label htmlFor="message" className={labelClasses}>
                  About the project
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder="What are you building, who is it for, and what does success look like?"
                  className={inputClasses}
                />
              </div>

              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#ff176e] px-8 py-4 font-bold text-white shadow-2xl shadow-pink-900/30 transition duration-300 hover:-translate-y-0.5 hover:bg-[#ff3d88] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-400"
              >
                Send the brief
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-black/25 transition duration-300 group-hover:rotate-45"
                >
                  ↗
                </span>
              </button>
              <p className="text-xs leading-relaxed text-zinc-500">
                Submitting opens your email client with the brief pre-filled.
                Prefer plain email? Write to us directly at{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="font-semibold text-[#ff4b8f] transition hover:text-white"
                >
                  {site.email}
                </a>
                .
              </p>
            </form>
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
                <a href={`tel:${site.phone}`} className="transition hover:text-white">
                  {site.phoneDisplay}
                </a>
                <p>
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.address.region}{" "}
                  {site.address.postalCode}
                </p>
                <p className="text-zinc-500">{site.hours}</p>
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
              <br />
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
