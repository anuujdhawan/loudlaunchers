export const site = {
  name: "Loud Launchers",
  legalName: "Loud Launchers",
  tagline: "Digital launch studio",
  domain: "https://loudlaunchers.com",
  description:
    "Loud Launchers connects strategy, design, technology and marketing to launch digital experiences people remember. Websites, mobile apps, performance marketing, SEO, branding and social media — one connected team built to move your business forward.",
  shortDescription:
    "One connected team for websites, apps, performance marketing, search, branding and social — built to move your business forward.",
  /* Single source of truth for the contact address. Changing it updates the
     header utility bar, the footer, the contact page, the about page, the
     Organization schema, llms.txt and the `mailto:` fallback in lead.js. */
  email: "anoojdhawan@gmail.com",
  /* Single source of truth for the studio number. `phone` is E.164 (used for
     tel: links and the Organization schema telephone property); `phoneDisplay`
     is the human-readable grouping. Change these two and the header, footer,
     about page, contact page, JSON-LD and llms.txt all follow. */
  phone: "+919468055396",
  phoneDisplay: "+91 94680 55396",
  /* WhatsApp uses the number in international format without "+", "00" or
     separators — that is what the wa.me deep link requires. */
  whatsapp: {
    number: "919468055396",
    display: "+91 94680 55396",
    message:
      "Hi Loud Launchers — I'd like to talk about a project. Here's what I'm working on:",
  },
  /* Deliberately no postal address.
   *
   * The studio is remote-first and serves clients across seven countries, so a
   * street address was never doing real work. The placeholder that used to sit
   * here — "Suite 1200, 77 Beacon Street, Boston, MA" — was invented, and once
   * the phone number became +91 it actively contradicted it.
   *
   * A wrong address is worse than no address for local search: it cannot win a
   * map pack, and inconsistent name/address/phone data quietly undercuts the
   * trust signals the rest of the site works to build. Removing it costs
   * nothing, because a fake address never qualified for local results anyway.
   *
   * If a physical studio ever opens, add `address` (street, city, region,
   * postalCode, country) and `geo` (latitude, longitude) back here, then
   * restore the PostalAddress and GeoCoordinates in the Organization schema in
   * `app/layout.js`. Both are commented there for exactly this reason. */
  /* Presented as plain names so every renderer can just print them. Note the
   * granularity is deliberately mixed: these are mostly countries, but "Europe"
   * is a continent. Anything emitting schema must therefore pick the `@type`
   * per entry — see `areasServedSchema()` — because labelling Europe a
   * `Country` is a machine-readable falsehood.
   *
   * Ordered by client volume rather than alphabetically, so a region added here
   * should land where it belongs in that ranking, not at the end. The footer
   * prints only the first six. */
  areasServed: [
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "United Arab Emirates",
    "Europe",
    "Singapore",
  ],
  sameAs: [
    "https://www.linkedin.com/company/loud-launchers",
    "https://www.instagram.com/loudlaunchers",
    "https://x.com/loudlaunchers",
    "https://www.facebook.com/loudlaunchers",
    "https://www.youtube.com/@loudlaunchers",
  ],
  hours: "Mon–Fri, 9:00–18:00",
  foundingDate: "2021",
};

/**
 * Builds a WhatsApp deep link. `wa.me` wants the number as digits only, and
 * any pre-filled text must be URL-encoded. Pass a custom `message` to seed the
 * thread with context (the chat bot uses this to hand over the answers it has
 * already collected).
 */
export function whatsappLink(message = site.whatsapp.message) {
  const base = `https://wa.me/${site.whatsapp.number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/**
 * Builds a `mailto:` link with the subject already filled in. A bare `mailto:`
 * opens the mail client correctly, but an empty subject makes the enquiry hard
 * to triage once it lands — and a few clients refuse to compose without one.
 * `body` is optional: the header's top bar needs only a subject, while the lead
 * forms hand over a full brief.
 */
export function mailtoLink({ subject = "New project enquiry", body } = {}) {
  const query = [`subject=${encodeURIComponent(subject)}`];
  if (body) query.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${site.email}?${query.join("&")}`;
}

/**
 * Builds a `tel:` link. `phone` is already E.164, which is exactly what the
 * dialler wants, so routing every call link through here keeps a stray
 * formatted number (spaces, brackets) from silently breaking one of them.
 */
export function telLink() {
  return `tel:${site.phone}`;
}

/**
 * Builds the `areaServed` nodes for our JSON-LD from `areasServed`.
 *
 * Every consumer used to inline `{ "@type": "Country", name }`, which was true
 * only while the list held nothing but countries. It no longer does — "Europe"
 * is a continent — and schema.org defines no `Continent` type, so `Place` is
 * the honest generalisation. Everything else stays a `Country`.
 */
const AREA_SCHEMA_TYPE = { Europe: "Place" };

export function areasServedSchema() {
  return site.areasServed.map((name) => ({
    "@type": AREA_SCHEMA_TYPE[name] ?? "Country",
    name,
  }));
}

export const services = [
  {
    slug: "website-development-deployment",
    num: "01",
    title: "Website Development & Deployment",
    short: "Websites",
    seoTitle: "Website Development Services",
    accent: "#ff176e",
    iconPath:
      "M4 6h24v18H4zM4 11h24M13 11v13M8 28h16",
    summary:
      "A modern, mobile-responsive digital home for your business — from first impression to live deployment.",
    longDescription:
      "A polished, mobile-responsive website that gives your business a strong home online. We shape every page around your customer journey and business goals, so your message, brand and pathways to action all work together.",
    advantage:
      "A professional digital home that makes your business easier to understand, trust and contact.",
    points: [
      "Stronger first impressions with pages that look polished, current and unmistakably yours",
      "Smooth experience on phones, tablets and desktops",
      "Clear pathways to enquiry, booking, purchase or conversation",
      "A launch-ready website that is professional, fast and easy to share",
    ],
    impact: { visibility: 38, trust: 34, conversion: 28 },
    timeline: "4–8 weeks",
    deliverables: [
      "Discovery workshop and sitemap agreed before design starts",
      "Bespoke visual design for every template, not a themed layout",
      "Responsive build tested on real devices and mid-range phones",
      "Content management so your team can edit without a developer",
      "Technical SEO foundations: metadata, schema, sitemap, redirects",
      "Launch support, analytics setup and a post-launch review",
    ],
    faqs: [
      {
        question: "How long does a website build take?",
        answer:
          "A focused marketing site typically takes four to eight weeks from discovery to launch. Larger builds with e-commerce, booking or multi-language requirements usually run eight to fourteen weeks depending on content readiness.",
      },
      {
        question: "Will I be able to edit the site myself?",
        answer:
          "Yes. We build on a content management system your team can use without touching code, and we hand over with a walkthrough plus short recorded guides for the pages you will update most often.",
      },
      {
        question: "Do you handle hosting and deployment?",
        answer:
          "We do. We deploy to infrastructure suited to your traffic and budget, configure the domain and SSL, set up analytics and monitoring, and hand over access so you are never locked in.",
      },
    ],
  },
  {
    slug: "mobile-apps-publishing",
    num: "02",
    title: "Cross-Platform Mobile Apps & Publishing",
    short: "Apps",
    seoTitle: "Mobile App Development Services",
    accent: "#ff4b8f",
    iconPath:
      "M10 3h12a2 2 0 0 1 2 2v22a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM14 6h4M14 26h4",
    summary:
      "One app experience prepared for Apple and Android audiences, from first tap to store publishing.",
    longDescription:
      "A thoughtful app experience that helps customers stay connected to your business — one build prepared for both Apple and Android audiences, with guided support through the publishing journey.",
    advantage:
      "One app experience. A wider reach. A more convenient way for customers to keep your business close.",
    points: [
      "Customer-friendly app experiences that feel intuitive from the first tap",
      "A consistent visual presence across iPhone and Android devices",
      "Easier recurring interactions: bookings, information, services, updates",
      "Guided preparation for Apple App Store and Google Play publishing",
    ],
    impact: { visibility: 40, trust: 32, conversion: 28 },
    timeline: "3–5 months",
    deliverables: [
      "Product discovery: the one loop version one must prove",
      "UX flows and interface design for every core screen",
      "One cross-platform codebase shipping to both app stores",
      "Backend, API and admin tooling sized to your data model",
      "Store submission handled: assets, metadata, privacy declarations",
      "Analytics, crash reporting and a post-launch iteration plan",
    ],
    faqs: [
      {
        question: "Do you build native or cross-platform apps?",
        answer:
          "Cross-platform by default, because one codebase ships to both stores and removes the drift between two separate native products. We recommend native only where the experience depends on heavy device capability such as advanced camera, graphics or sensor work.",
      },
      {
        question: "Do you publish to the App Store and Google Play for us?",
        answer:
          "Yes. We prepare icons, screenshots, descriptions and privacy declarations, submit on your behalf, and handle reviewer questions. You keep ownership of both developer accounts.",
      },
      {
        question: "What happens after launch?",
        answer:
          "We plan the first two iterations before launch, using real usage data rather than assumptions. Most clients continue on a light monthly retainer covering maintenance, store updates and incremental improvements.",
      },
    ],
  },
  {
    slug: "digital-performance-marketing",
    num: "03",
    title: "Digital Marketing & Performance Marketing",
    short: "Marketing",
    seoTitle: "Performance Marketing Services",
    accent: "#ff2d7d",
    iconPath:
      "M6 4h20l-4 8h4L12 28l4-10h-6z",
    summary:
      "Campaigns built to turn attention into meaningful enquiries, bookings and sales conversations.",
    longDescription:
      "Focused marketing activity that helps the right people notice you, understand your offer and take a meaningful next step — with messaging aligned across ads, landing pages and content.",
    advantage:
      "More than attention — momentum. Marketing should move people from noticing your business to seriously considering it.",
    points: [
      "Campaign direction shaped around your audience and the action you want",
      "Creative messaging that gives people a reason to notice and remember you",
      "A clearer view of what generates attention, consideration and momentum",
      "Budget focused on the activity that actually creates interest",
    ],
    impact: { visibility: 37, trust: 33, conversion: 30 },
    timeline: "Ongoing, monthly",
    deliverables: [
      "Channel strategy: where budget goes and why",
      "Audience research and offer positioning per channel",
      "Ad creative and copy produced and refreshed on a schedule",
      "Landing pages built to match the promise in the ad",
      "Conversion tracking and lead-quality feedback loops",
      "Monthly reporting against enquiries, not impressions",
    ],
    faqs: [
      {
        question: "What is the minimum budget you would recommend?",
        answer:
          "Enough to generate statistically meaningful data — in practice around $1,500–$3,000 per month per channel. Below that you learn slowly and end up optimising on noise instead of signal.",
      },
      {
        question: "How quickly do paid campaigns produce results?",
        answer:
          "Expect meaningful lead flow within two to four weeks once tracking is correct and creative is live. Full optimisation, where cost per qualified lead stabilises, usually takes two to three months.",
      },
      {
        question: "Do you write the ad creative as well as manage the spend?",
        answer:
          "Yes. Creative is the largest lever in paid performance, so copy, static assets and short-form video concepts are part of the engagement rather than something you have to source separately.",
      },
    ],
  },
  {
    slug: "search-engine-optimization",
    num: "04",
    title: "Search Engine Optimization",
    short: "SEO",
    seoTitle: "Search Engine Optimization Services",
    accent: "#22d3ee",
    iconPath:
      "M14 4a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM21 21l8 8M10 17v-4M14 17V9M18 17v-6",
    summary:
      "A stronger path to being found by people already looking for what you offer.",
    longDescription:
      "A long-term visibility approach that makes your business easier to find when people are already searching. Practical strategy built on how your customers search — not quick fixes that fade.",
    advantage:
      "Be easier to find. Easier to trust. A stronger search presence keeps working long after a campaign ends.",
    points: [
      "Visibility approach based on how your customers actually search",
      "Clearer content direction that makes your site easier to explore",
      "An improvement mindset built for long-term visibility",
      "Earn trust before the first conversation by appearing credible and current",
    ],
    impact: { visibility: 42, trust: 31, conversion: 27 },
    timeline: "6–12 months to compound",
    deliverables: [
      "Technical audit: crawlability, indexation, Core Web Vitals",
      "Keyword and intent research mapped to the buying journey",
      "One focused, optimised page per service you sell",
      "Content programme answering real customer questions",
      "Local visibility: profile, citations, review routine",
      "Structured data and monthly reporting on visibility and enquiries",
    ],
    faqs: [
      {
        question: "How long before SEO shows results?",
        answer:
          "Expect early movement in six to twelve weeks for local and long-tail terms, and four to eight months for competitive national terms. SEO compounds — the work done this quarter keeps paying next year.",
      },
      {
        question: "Do you guarantee first-page rankings?",
        answer:
          "No, and nobody credible does. Search results depend on factors outside any agency's control. We commit to the work, the reporting and the trajectory, and we show you exactly what changed each month.",
      },
      {
        question: "Is SEO still worth it with AI answer engines?",
        answer:
          "More than ever, but the goal widened. Optimising to be cited by AI answers builds on the same foundations as classic SEO — clear structure, real answers, consistent business information and genuine authority.",
      },
    ],
  },
  {
    slug: "branding-business-optimization",
    num: "05",
    title: "Branding & Business Optimization",
    short: "Branding",
    seoTitle: "Branding & Business Optimization",
    accent: "#b356ff",
    iconPath:
      "M16 3l12 8v10l-12 8-12-8V11zM4 11l12 8 12-8M16 19v10",
    summary:
      "Sharper positioning, better customer journeys and a more memorable presence.",
    longDescription:
      "Sharper positioning and a more consistent brand presence — story, visuals and customer promise aligned across every touchpoint, with friction in the customer journey identified and smoothed out.",
    advantage:
      "Make your business feel as good as it really is — easier to understand, remember and choose.",
    points: [
      "A clearer way to express what makes your business different and valuable",
      "Visual and verbal direction for a more recognisable presence",
      "Consistency across website, app, marketing and social",
      "Practical improvements to how customers discover, understand and choose you",
    ],
    impact: { visibility: 36, trust: 34, conversion: 30 },
    timeline: "6–10 weeks",
    deliverables: [
      "Positioning sprint: audience, promise, proof, differentiation",
      "Messaging framework your whole team can write from",
      "Logo system, colour, typography and layout principles",
      "Photography, illustration and iconography direction",
      "Tone of voice guidelines with real before-and-after examples",
      "Rollout across web, print, signage, social and templates",
    ],
    faqs: [
      {
        question: "What is the difference between strategy and identity?",
        answer:
          "Strategy is the decision layer — who you serve, what you promise and why you win. Identity is the expression layer — how that decision looks and sounds. Strategy should always come first; identity without it produces a logo nobody can explain.",
      },
      {
        question: "Do we need a full rebrand or just a refresh?",
        answer:
          "If your positioning is sound and only the execution looks dated, a refresh preserves the recognition you have already paid for. A full rebrand is for when the business itself has changed — a new market, price tier, merger or reputation problem.",
      },
      {
        question: "How do you handle rollout?",
        answer:
          "Rollout is planned inside the project, not left as an afterthought. We prioritise the touchpoints your customers meet most often and hand over templates and rules so the new system survives contact with daily work.",
      },
    ],
  },
  {
    slug: "social-media-management",
    num: "06",
    title: "Social Media Management",
    short: "Social",
    seoTitle: "Social Media Management Services",
    accent: "#ff5aa1",
    iconPath:
      "M9 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM25 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM25 30a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM11.5 10.5l11-3.5M11.5 13.5l11 10.5",
    summary:
      "Consistent content that keeps your business visible and recognisable in the feeds that matter.",
    longDescription:
      "A consistent social presence that keeps your business visible, relevant and easier to recognise in the spaces your customers already use — content that supports your brand rather than adding noise.",
    advantage:
      "Stay visible without losing your voice. Social media should support your business, not distract from it.",
    points: [
      "Content direction that matches your brand tone and priorities",
      "A regular rhythm built for relevance, clarity and visibility",
      "Creative ideas that make your business easier to remember",
      "A joined-up presence supporting your wider website, app and marketing goals",
    ],
    impact: { visibility: 39, trust: 33, conversion: 28 },
    timeline: "Ongoing, monthly",
    deliverables: [
      "Content pillars mapped to what you actually sell",
      "A repeatable format per pillar your team can produce",
      "Monthly content batch: short-form video, carousels, stills",
      "Community management: replies, DMs and enquiry routing",
      "Profile optimisation so the account works as a landing page",
      "Monthly reporting on reach, saves, profile visits and enquiries",
    ],
    faqs: [
      {
        question: "How often should we post?",
        answer:
          "Three to five times a week on one primary channel is a realistic, sustainable baseline for a small team. Consistency over months beats a burst of daily posting followed by silence.",
      },
      {
        question: "Do you create the content or just schedule it?",
        answer:
          "We create it. Each month we plan the batch, produce the assets, write the captions and publish. We also give your team a lightweight way to capture behind-the-scenes material that keeps the feed human.",
      },
      {
        question: "Which platforms do you cover?",
        answer:
          "We work on the channels where your customers actually spend attention rather than spreading across all of them. Typically that is one or two primary platforms plus repurposing to the rest.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

/**
 * Primary navigation. A link with `children` renders as a dropdown on
 * desktop and an expandable group on mobile, so the menu can grow without
 * touching the Header component.
 */
export const navLinks = [
  {
    href: "/services",
    label: "Services",
    description: "Six connected capabilities, one growth engine.",
    children: services.map((service) => ({
      href: `/services/${service.slug}`,
      label: service.title,
      short: service.short,
      summary: service.summary,
      iconPath: service.iconPath,
      accent: service.accent,
    })),
    footer: { href: "/services", label: "All services" },
  },
  { href: "/work", label: "Work", description: "Launches, rebuilds and growth stories." },
  { href: "/about", label: "About", description: "Who we are and how we work." },
  {
    href: "/blog",
    label: "Blog",
    description: "Playbooks on SEO, AI search, websites and growth.",
  },
];

/** Quick links shown in the header's utility bar and the footer's base row. */
export const utilityLinks = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

/* ------------------------------------------------------------------ */
/* Credibility content                                                 */
/* ------------------------------------------------------------------ */
/* ⚠️  ILLUSTRATIVE CONTENT — NOT REAL CLIENT DATA.                    */
/*                                                                     */
/* `stats` and `caseStudies` below are written to read like a real     */
/* studio's numbers so the site can be shown to prospects, but the     */
/* clients, quotes and metrics are invented. Replace them with real    */
/* engagements before publishing anything that makes a factual claim.  */
/*                                                                     */
/* To swap in a real study, keep this shape:                           */
/*   slug, client, sector, location, period, services[], headline,     */
/*   summary, challenge, approach[], results[{value,label,context}],   */
/*   quote, quoteAuthor                                                */
/* `period` and `result.context` are optional but they are what make   */
/* a case study read as measured rather than marketing.                */
/* Add or remove entries freely — /work, the sitemap, the service      */
/* pages and the work JSON-LD all read from this array.                */
/* ------------------------------------------------------------------ */

export const stats = [
  { value: "140+", label: "Launches shipped", detail: "Websites, apps and campaigns since 2021" },
  { value: "38", label: "Markets served", detail: "Across seven countries" },
  { value: "4.9/5", label: "Client rating", detail: "Mean across 47 post-project reviews" },
  { value: "11 wks", label: "Median time to launch", detail: "Discovery to live, 2025 engagements" },
];

export const differentiators = [
  {
    title: "One connected team",
    body: "Websites, apps, marketing, SEO, brand and social under one roof — so every touchpoint tells the same story.",
  },
  {
    title: "Strategy before pixels",
    body: "Every launch starts with your customer journey and business goals, not a template.",
  },
  {
    title: "Built to perform",
    body: "Beautiful is the baseline. We design for visibility, conversion and momentum from day one.",
  },
  {
    title: "Momentum, not one-offs",
    body: "A connected process turns activity into a sustained, repeatable advantage.",
  },
];

export const values = [
  {
    num: "01",
    title: "Clarity over cleverness",
    body: "We would rather be understood than admired. Every decision is judged by whether it helps a customer act.",
  },
  {
    num: "02",
    title: "Evidence over opinion",
    body: "We bring data, benchmarks and testing to choices that are usually made on taste alone.",
  },
  {
    num: "03",
    title: "Craft in the details",
    body: "Speed, accessibility, motion and typography are not polish added at the end — they are the product.",
  },
  {
    num: "04",
    title: "Compounding over campaigns",
    body: "We build assets that keep working: content that ranks, systems that scale, brands that stick.",
  },
];

export const caseStudies = [
  {
    slug: "northwind-dental",
    client: "Northwind Dental",
    sector: "Healthcare",
    location: "Boston, MA",
    period: "2025 · 7 months",
    services: ["Websites", "SEO", "Marketing"],
    headline: "From invisible to fully booked in two quarters",
    summary:
      "A dated practice site, no local visibility and a phone that rang less than it should. We rebuilt the site around the booking journey, fixed local signals and started a review routine. The enquiries moved quickly; the map pack took two quarters of consistent work before it shifted.",
    challenge:
      "Three practices in the same city, a website built in 2016, and a Google Business Profile that had not been touched in years. New patient enquiries had been flat for eighteen months, holding at around 48 a month across all three locations.",
    approach: [
      "Rebuilt the site around one action: booking an appointment, reachable in a single tap on mobile",
      "Restructured service pages so each treatment had its own clear, indexable page",
      "Completed and consistently maintained the Google Business Profile across all three locations",
      "Introduced a review request routine at the end of every appointment",
    ],
    results: [
      { value: "+164%", label: "New patient enquiries", context: "48 → 127 per month" },
      { value: "+312%", label: "Local map pack impressions", context: "Across 3 locations" },
      { value: "1.4s", label: "Mobile load time", context: "Down from 5.8s" },
    ],
    quote:
      "We stopped guessing where patients came from. Every enquiry now has a path we can point to.",
    quoteAuthor: "Practice Manager, Northwind Dental",
  },
  {
    slug: "harbour-supply-co",
    client: "Harbour Supply Co.",
    sector: "E-commerce",
    location: "Portland, OR",
    period: "2025 · 5 months",
    services: ["Websites", "Conversion", "Branding"],
    headline: "A rebuild that paid for itself in one season",
    summary:
      "Strong brand, weak storefront. We rebuilt the buying journey, cut the catalogue's friction and gave the brand system the range a growing product line needed. Conversion improved within weeks; average order value only lifted once we reworked how bundles were presented.",
    challenge:
      "Traffic was healthy but cart abandonment sat above 80%, and the brand's visual language could not stretch to the new product categories the business was launching.",
    approach: [
      "Rebuilt product and category templates around decision-making rather than browsing",
      "Reduced checkout from five steps to two and made delivery costs visible early",
      "Compressed and re-cut every product image, cutting page weight by 68%",
      "Extended the identity into a flexible system covering packaging and social",
    ],
    results: [
      { value: "+41%", label: "Conversion rate", context: "2.1% → 3.0%" },
      { value: "-29%", label: "Cart abandonment", context: "Down from 81%" },
      { value: "+27%", label: "Average order value", context: "$68 → $86" },
    ],
    quote:
      "The rebuild did not just look better — it changed the economics of the store.",
    quoteAuthor: "Founder, Harbour Supply Co.",
  },
  {
    slug: "verity-fintech",
    client: "Verity",
    sector: "SaaS / Fintech",
    location: "Austin, TX",
    period: "2026 · 4 months",
    services: ["Apps", "Websites", "AI Search"],
    headline: "Launching a fintech product into an AI-shaped market",
    summary:
      "A new product with no category recognition. We shipped the marketing site, the cross-platform app and the entity infrastructure that makes an unknown brand citable. Assistant citations arrived quickly; branded search took longer to follow.",
    challenge:
      "Verity was entering a category where buyers increasingly ask an AI assistant which tool to choose. With no brand recognition and no consistent public footprint, the product was invisible to both search engines and answer engines.",
    approach: [
      "Shipped a marketing site with answer-first pages for every buying question in the category",
      "Built the cross-platform app from one codebase and handled both store submissions",
      "Implemented Organization, SoftwareApplication and FAQPage schema across the site",
      "Established consistent entity descriptions across directories, review sites and social",
    ],
    results: [
      { value: "19", label: "Assistant citations", context: "First 90 days" },
      { value: "+86%", label: "Branded search volume", context: "Measured from launch" },
      { value: "4.6★", label: "App Store rating", context: "From 61 ratings" },
    ],
    quote:
      "Being the source the assistants quote turned out to matter more than any ad we could have bought.",
    quoteAuthor: "Head of Growth, Verity",
  },
  {
    slug: "atlas-property-group",
    client: "Atlas Property Group",
    sector: "Real Estate",
    location: "Dubai, UAE",
    period: "2025 · 9 months",
    services: ["Websites", "Branding", "Social"],
    headline: "Repositioning a developer for a premium market",
    summary:
      "A respected developer whose digital presence read mid-market. We repositioned the brand, rebuilt the site around the buying journey and gave the sales team a system they could run. The brand work landed first; the enquiry quality took a full sales cycle to prove.",
    challenge:
      "Atlas was selling premium developments with a website and brand that signalled mid-market. High-value buyers were arriving unconvinced, and the sales team had no consistent assets to work from.",
    approach: [
      "Ran a positioning sprint to define the audience, promise and proof for the premium tier",
      "Rebuilt the identity as a typography-led system that holds up on a building and on a phone",
      "Designed the site around the enquiry journey, with development pages and a private viewing flow",
      "Produced a social and sales toolkit so the team could publish consistently",
    ],
    results: [
      { value: "+58%", label: "Qualified viewing requests", context: "Per development launch" },
      { value: "+2.3x", label: "Time on development pages", context: "1m 12s → 2m 46s" },
      { value: "+31%", label: "Viewing-to-offer rate", context: "Reported by sales" },
    ],
    quote:
      "Buyers now arrive at the viewing already sold on who we are.",
    quoteAuthor: "Marketing Director, Atlas Property Group",
  },
  {
    slug: "lumen-academy",
    client: "Lumen Academy",
    sector: "Education",
    location: "London, UK",
    period: "2025 · 6 months",
    services: ["Websites", "SEO", "Conversion"],
    headline: "Turning a course catalogue into a conversion engine",
    summary:
      "An education provider with hundreds of courses and no clear route through them. We restructured the catalogue, rebuilt the enquiry journey and made the site findable. Enquiries climbed through the term; organic growth compounded into the next intake.",
    challenge:
      "A sprawling catalogue made it impossible for prospective students to find the right course, and the site's enquiry forms were buried three clicks deep behind generic navigation.",
    approach: [
      "Restructured the catalogue around subject, level and outcome rather than internal departments",
      "Rebuilt course pages with a single, persistent enquiry action and visible fee information",
      "Rewrote and re-schema'd every course page for search and answer engine extraction",
      "Cut the enquiry form from nine fields to four",
    ],
    results: [
      { value: "+72%", label: "Course enquiries", context: "1,840 → 3,160 per term" },
      { value: "+119%", label: "Organic sessions to course pages", context: "Year on year" },
      { value: "-46%", label: "Form abandonment", context: "Down from 63%" },
    ],
    quote:
      "Students finally arrive on the right page. Our advisors spend their time advising, not redirecting.",
    quoteAuthor: "Admissions Lead, Lumen Academy",
  },
  {
    slug: "brightline-logistics",
    client: "Brightline Logistics",
    sector: "B2B Services",
    location: "Singapore",
    period: "2026 · 8 months",
    services: ["Websites", "Marketing", "SEO"],
    headline: "Making a quiet B2B operator the obvious choice",
    summary:
      "A logistics operator winning on service and losing on visibility. We rebuilt the site, clarified the offer and built the search presence that brings tenders in. Pipeline contribution is now tracked per channel rather than assumed.",
    challenge:
      "Brightline was winning work through referrals only. Its website described capabilities rather than outcomes, and it ranked for almost none of the terms buyers search when sourcing a logistics partner.",
    approach: [
      "Rewrote the site around buyer outcomes and named the industries served",
      "Built dedicated service pages for each logistics capability with real specifications",
      "Launched a technical and content SEO programme targeting procurement-stage queries",
      "Set up enquiry tracking so marketing spend could be tied to pipeline",
    ],
    results: [
      { value: "+204%", label: "Organic visibility", context: "Tracked keyword set, 12 months" },
      { value: "31", label: "Inbound tender enquiries", context: "First 8 months" },
      { value: "-38%", label: "Cost per qualified lead", context: "Against paid-only baseline" },
    ],
    quote:
      "We used to wait for the phone. Now a meaningful share of our pipeline finds us first.",
    quoteAuthor: "Commercial Director, Brightline Logistics",
  },
];

export const stages = [
  {
    num: "01",
    title: "Understand",
    subtitle: "Discover the signal",
    description:
      "We listen first — your business, your customers, your ambitions and what success should look like.",
  },
  {
    num: "02",
    title: "Shape",
    subtitle: "Define the direction",
    description:
      "We define priorities and build a clear direction for the work ahead.",
  },
  {
    num: "03",
    title: "Create",
    subtitle: "Build the experience",
    description:
      "We turn the plan into polished experiences, clear messaging and practical growth activity.",
  },
  {
    num: "04",
    title: "Launch",
    subtitle: "Go live with care",
    description:
      "We bring the work to market with care, so it is ready to make the right impression.",
  },
  {
    num: "05",
    title: "Grow",
    subtitle: "Compound what works",
    description:
      "We help you build on what works and keep improving the parts that matter most.",
  },
];

export const faqs = [
  {
    question: "What does Loud Launchers do?",
    answer:
      "Loud Launchers is a digital launch studio. We design and build websites and cross-platform mobile apps, run digital and performance marketing campaigns, grow search visibility with SEO, sharpen branding and business optimization, and manage social media — all as one connected team.",
  },
  {
    question: "Can Loud Launchers publish my app to the App Store and Google Play?",
    answer:
      "Yes. We build cross-platform mobile app experiences and provide guided preparation for Apple App Store and Google Play publishing, so your app reaches both audiences with confidence.",
  },
  {
    question: "Do I have to buy all six services together?",
    answer:
      "No. Each service stands on its own — a website, an SEO program, a brand refresh or a social retainer can each deliver value alone. They simply work better together, because every customer touchpoint then points in the same direction.",
  },
  {
    question: "How does Loud Launchers run projects?",
    answer:
      "Every engagement follows five clear stages: Understand, Shape, Create, Launch and Grow. You stay close to the work through each stage, but never overwhelmed by the process.",
  },
  {
    question: "How soon can we start?",
    answer:
      "Most engagements begin with a short discovery conversation within a week. Send your project brief through the contact form and we will come back with a plan, timeline and clear next steps.",
  },
  {
    question: "Which industries and regions does Loud Launchers serve?",
    answer:
      "We work with ambitious businesses across e-commerce, SaaS, local services, real estate, healthcare, education and more — serving clients across the United States, United Kingdom, Canada, Australia, UAE, Europe and Singapore.",
  },
];

/** FAQPage schema built from the shared FAQ list; only rendered on pages
 * where the FAQ is actually visible (home, contact). */
export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${site.domain}/#faq`,
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};
