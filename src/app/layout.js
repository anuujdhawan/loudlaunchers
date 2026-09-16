import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingDock from "@/components/FloatingDock";
import LeadModal from "@/components/LeadModal";
import JsonLd from "@/components/JsonLd";
import { areasServedSchema, site } from "@/lib/site";
import { og, twitter, clamp } from "@/lib/seo";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: "Loud Launchers — Digital Launch Studio for Websites & Apps",
    template: "%s | Loud Launchers",
  },
  description: clamp(site.description),
  keywords: [
    "digital launch studio",
    "digital marketing agency",
    "website development",
    "mobile app development",
    "performance marketing",
    "SEO agency",
    "answer engine optimization",
    "generative engine optimization",
    "branding agency",
    "social media management",
    "website cost",
    "conversion rate optimization",
  ],
  applicationName: site.name,
  authors: [{ name: site.name, url: site.domain }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  openGraph: og({
    title: "Loud Launchers — Digital ideas built for lift-off",
    description: site.shortDescription,
    path: "",
  }),
  twitter: twitter({
    title: "Loud Launchers — Digital ideas built for lift-off",
    description: site.shortDescription,
  }),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "Digital Marketing",
};

export const viewport = {
  themeColor: "#050507",
  colorScheme: "dark",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      /* Was ["Organization", "LocalBusiness", "ProfessionalService"].
       *
       * LocalBusiness — and ProfessionalService, which is one of its subtypes —
       * are place-based types. Google expects a real address and coordinates on
       * them, and this site deliberately no longer has either. Claiming a
       * location we cannot substantiate earns nothing, because a dummy address
       * was never eligible for local results, and it risks Search Console
       * warnings for missing fields.
       *
       * Organization is the accurate type for a remote-first studio and carries
       * everything that actually does work here: brand name and logo, a contact
       * point, the areas served, and the social profiles that tie the entity
       * together for knowledge-panel and answer-engine purposes.
       *
       * If a real studio address is ever added to `site.address`, restore
       * LocalBusiness here together with the PostalAddress and GeoCoordinates. */
      "@type": "Organization",
      "@id": `${site.domain}/#organization`,
      name: site.name,
      legalName: site.legalName,
      url: site.domain,
      logo: `${site.domain}/logo.webp`,
      image: `${site.domain}/og.png`,
      description: site.description,
      email: site.email,
      telephone: site.phone,
      foundingDate: site.foundingDate,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: site.phone,
        email: site.email,
        availableLanguage: ["English"],
        areaServed: areasServedSchema(),
      },
      areaServed: areasServedSchema(),
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
      ],
      sameAs: site.sameAs,
    },
    {
      "@type": "WebSite",
      "@id": `${site.domain}/#website`,
      url: site.domain,
      name: site.name,
      publisher: { "@id": `${site.domain}/#organization` },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth bg-[#050507] motion-reduce:scroll-auto`}
    >
      <body className="min-h-screen overflow-x-clip bg-[#050507] font-sans text-white antialiased selection:bg-[#ff176e] selection:text-[#050507]">
        {/* Reveal animations start hidden and are switched on by JS. Without JS the
            content would never appear, so force it visible for those visitors.
            dangerouslySetInnerHTML is the React-safe way to render noscript content. */}
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              "<style>[data-reveal]{opacity:1!important;transform:none!important}</style>",
          }}
        />
        <JsonLd data={organizationSchema} />
        <a
          href="#main"
          className="btn-3d btn-3d--white fixed left-4 top-4 z-[100] -translate-y-24 rounded-full px-5 py-3 font-semibold text-black focus:translate-y-0"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex flex-1 flex-col">
          {children}
        </main>
        <Footer />
        <FloatingDock />
        <LeadModal />
      </body>
    </html>
  );
}
