import Link from "next/link";
import Image from "next/image";
import { site, services } from "@/lib/site";

const companyLinks = [
  { href: "/#difference", label: "Why Loud" },
  { href: "/#method", label: "Our process" },
  { href: "/blog", label: "Insights" },
  { href: "/contact", label: "Start a project" },
];

const socialLabelMap = {
  "linkedin.com": "LinkedIn",
  "instagram.com": "Instagram",
  "x.com": "X (Twitter)",
  "facebook.com": "Facebook",
  "youtube.com": "YouTube",
};

function socialLabel(url) {
  const host = url.replace(/^https?:\/\/(www\.)?/, "");
  return socialLabelMap[host.replace(/\/.*$/, "")] || host;
}

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#07070a]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff176e]/60 to-transparent"
      />
      <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Link href="/" className="group inline-flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02]">
                <Image
                  src="/logo-mark.webp"
                  alt="Loud Launchers logo"
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain"
                />
              </span>
              <span className="text-sm font-black uppercase leading-none tracking-[0.12em] text-white">
                Loud <span className="text-[#ff2d7d]">Launchers</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm leading-relaxed text-zinc-400">
              {site.shortDescription}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {site.sameAs.map((url) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/10 px-4 py-2 text-xs font-bold text-zinc-400 transition hover:border-[#ff176e]/50 hover:text-white"
                >
                  {socialLabel(url)}
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Services">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-zinc-500">
              Services
            </p>
            <ul className="mt-5 grid gap-3 text-sm">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/#services`}
                    className="text-zinc-400 transition hover:text-white"
                  >
                    {service.short}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-zinc-500">
              Company
            </p>
            <ul className="mt-5 grid gap-3 text-sm">
              {companyLinks.map((link) => (
                <li key={link.href}>
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

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-zinc-500">
              Get in touch
            </p>
            <address className="mt-5 grid gap-3 text-sm not-italic text-zinc-400">
              <a
                href={`mailto:${site.email}`}
                className="font-semibold text-white transition hover:text-[#ff4b8f]"
              >
                {site.email}
              </a>
              <a
                href={`tel:${site.phone}`}
                className="transition hover:text-white"
              >
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
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="font-semibold uppercase tracking-[0.2em]">
            Think it. Build it. <span className="text-[#ff176e]">Launch it.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
