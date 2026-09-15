import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";


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
    default: "Loud Launchers — Digital Launch Studio for Websites, Apps & Growth",
    template: "%s | Loud Launchers",
  },
  description: site.description,
  keywords: [
    "digital launch studio",
    "digital marketing agency",
    "website development",
    "mobile app development",
    "performance marketing",
    "SEO agency",
    "branding agency",
    "social media management",
  ],
  applicationName: site.name,
  authors: [{ name: site.name, url: site.domain }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.domain,
    siteName: site.name,
    title: "Loud Launchers — Digital ideas built for lift-off",
    description: site.shortDescription,
    images: [
      {
        url: "/blog/fuel-digital-growth.png",
        width: 1200,
        height: 1200,
        alt: "Fuel your digital growth — Loud Launchers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Loud Launchers — Digital ideas built for lift-off",
    description: site.shortDescription,
    images: ["/blog/fuel-digital-growth.png"],
  },
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
      "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
      "@id": `${site.domain}/#organization`,
      name: site.name,
      legalName: site.legalName,
      url: site.domain,
      logo: `${site.domain}/logo.png`,
      image: `${site.domain}/blog/fuel-digital-growth.png`,
      description: site.description,
      email: site.email,
      telephone: site.phone,
      foundingDate: site.foundingDate,
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        addressLocality: site.address.city,
        addressRegion: site.address.region,
        postalCode: site.address.postalCode,
        addressCountry: site.address.country,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: site.geo.latitude,
        longitude: site.geo.longitude,
      },
      areaServed: site.areasServed.map((name) => ({
        "@type": "Country",
        name,
      })),
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
      <body className="min-h-screen overflow-x-clip bg-[#050507] font-sans text-white antialiased selection:bg-[#ff176e] selection:text-white">
        <JsonLd data={organizationSchema} />
        <a
          href="#main"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-white px-5 py-3 font-semibold text-black transition focus:translate-y-0"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex flex-1 flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
