// Blog content system. Posts are plain data so new posts can be added without
// touching page code. Each post is structured for both classic SEO and answer
// engines: a direct answer up top, scannable question-led sections, key
// takeaways, and a per-post FAQ that is emitted as FAQPage JSON-LD.

export const posts = [
  {
    slug: "what-does-a-digital-launch-studio-actually-do",
    title: "What Does a Digital Launch Studio Actually Do?",
    description:
      "A digital launch studio combines strategy, design, development and marketing under one roof. Here is what that means for your business, stage by stage.",
    category: "Strategy",
    tags: ["digital strategy", "launch studio", "web design", "marketing"],
    date: "2026-08-04",
    readingTime: "6 min read",
    image: "/blog/launch-nebula.png",
    imageAlt:
      "A pink and black rocket of light lifting off through clouds of a magenta nebula",
    featured: true,
    answer:
      "A digital launch studio is a single team that handles strategy, design, development, marketing, SEO, branding and social media as one connected engagement — so your website, app, campaigns and content all point in the same direction instead of being pieced together from separate vendors.",
    sections: [
      {
        heading: "Why do businesses juggle five vendors instead of one?",
        body: [
          "Most companies assemble their digital presence piecemeal: one agency for the website, a freelancer for the app, another for ads, an intern for social. Each piece works in isolation, so the brand story fragments. Customers experience your website, app, marketing and social media as one business — not as separate projects.",
          "A launch studio removes the seams. One strategy covers every touchpoint, one team owns the outcome, and every channel reinforces the others.",
        ],
      },
      {
        heading: "What services sit inside a launch studio?",
        body: [
          "At Loud Launchers the scope covers six connected services: website development and deployment, cross-platform mobile apps with store publishing, digital and performance marketing, search engine optimization, branding and business optimization, and social media management.",
          "Each service stands on its own. Together they form a growth engine: marketing and SEO attract, branding and your website convince, apps and connected journeys help customers return.",
        ],
      },
      {
        heading: "How does a typical engagement run?",
        body: [
          "Five stages keep the work moving: Understand, Shape, Create, Launch and Grow. We listen first — your business, customers and ambitions — then define a clear direction, build polished experiences, bring them to market with care and keep improving what works.",
          "You stay close to the work at every stage, but never overwhelmed by the process.",
        ],
      },
      {
        heading: "When is a studio the right choice?",
        body: [
          "If you are launching something new, rebuilding a dated presence, or tired of coordinating vendors who don't talk to each other, a studio model fits. If you need one narrow deliverable — a landing page, a single ad campaign — a specialist can be the better tool.",
        ],
      },
    ],
    takeaways: [
      "Customers experience one brand, not five vendors — a studio keeps every touchpoint consistent.",
      "Six services, one team: websites, apps, marketing, SEO, branding and social.",
      "The five-stage process — Understand, Shape, Create, Launch, Grow — keeps progress visible.",
    ],
    faq: [
      {
        question: "Is a digital launch studio the same as a full-service agency?",
        answer:
          "Very close. The difference is emphasis: a launch studio organises everything around taking a business from idea to market to growth — launch-minded and momentum-focused — rather than servicing a long menu of unrelated requests.",
      },
      {
        question: "Can I hire a launch studio for just one service?",
        answer:
          "Yes. Any single service — say SEO or a website rebuild — can be engaged on its own. The connected advantage simply appears when multiple services point in the same direction.",
      },
    ],
  },
  {
    slug: "how-much-does-a-business-website-cost-in-2026",
    title: "How Much Does a Business Website Cost in 2026?",
    description:
      "Realistic 2026 price ranges for small-business websites — from simple brochure sites to custom builds — plus the factors that move the number up or down.",
    category: "Websites",
    tags: ["website cost", "web design pricing", "small business"],
    date: "2026-08-18",
    readingTime: "7 min read",
    image: "/blog/launch-horizon.png",
    imageAlt:
      "A glowing pink rocket launching from a planet's horizon under a spiral galaxy",
    featured: true,
    answer:
      "In 2026 a professional small-business website typically costs between $3,000 and $15,000 for a custom marketing site of 5–15 pages, with e-commerce and booking-driven builds ranging from $8,000 to $40,000+. The drivers are page count, custom design versus templates, integrations (payments, CRM, booking), content volume and who maintains the site afterwards.",
    sections: [
      {
        heading: "What are realistic price ranges in 2026?",
        body: [
          "Template-based brochure sites sit at the low end: roughly $1,500–$4,000 using a premium theme lightly customized. A custom-designed marketing website — unique visual direction, copy shaped to your customer journey, CMS so your team can edit — usually lands between $5,000 and $15,000.",
          "E-commerce or booking-driven builds with payments, inventory or CRM integrations typically run $8,000–$40,000+ depending on catalogue size and integration count. Web apps go beyond that range entirely.",
        ],
      },
      {
        heading: "Which factors move the price most?",
        body: [
          "Four factors dominate: design (custom art direction versus a themed layout), content (who writes and sources it), integrations (payments, booking, CRM, analytics) and motion (bespoke animation and interactions cost real hours). Ongoing care — hosting, updates, security, improvements — is usually a monthly retainer from $100 to $1,000+.",
        ],
      },
      {
        heading: "Why is the cheap option often the expensive one?",
        body: [
          "A $500 site that loads slowly, ranks poorly and converts nobody costs far more than it saved. Rework, lost enquiries and a rebuild within two years are the real price. Budget for the smallest build that genuinely supports your customer journey — then let results fund the next stage.",
        ],
      },
      {
        heading: "How should you budget for a launch that performs?",
        body: [
          "Split your budget three ways: roughly 50% build, 30% content and SEO foundations, 20% launch marketing. A beautiful site nobody finds is a launch without ignition — visibility work is not an optional extra.",
        ],
      },
    ],
    takeaways: [
      "Custom small-business sites: $3k–$15k; e-commerce/booking builds: $8k–$40k+.",
      "Design, content, integrations and motion drive cost more than page count.",
      "Reserve budget for visibility — SEO foundations and launch marketing — not just the build.",
    ],
    faq: [
      {
        question: "How long does a professional website take to build?",
        answer:
          "A focused marketing site typically takes 4–8 weeks from discovery to launch. E-commerce and integration-heavy builds usually run 8–14 weeks depending on content readiness and third-party dependencies.",
      },
      {
        question: "What ongoing costs should I expect after launch?",
        answer:
          "Hosting and domain, software licences, security and maintenance, and periodic content or design improvements. Many businesses fold this into a monthly care plan ranging from $100 to $1,000+.",
      },
    ],
  },
  {
    slug: "seo-in-the-age-of-ai-answer-engines",
    title: "SEO in the Age of AI Answer Engines: What Still Works",
    description:
      "AI Overviews, ChatGPT and Perplexity changed how people find answers. Here is how SEO changes — and what matters more than ever — for visibility in 2026.",
    category: "SEO",
    tags: ["SEO", "AEO", "answer engine optimization", "AI search", "GEO"],
    date: "2026-09-01",
    readingTime: "8 min read",
    image: "/blog/fuel-digital-growth.png",
    imageAlt:
      "A rocket of light erupting from a platform surrounded by floating marketing dashboards and screens",
    featured: true,
    answer:
      "SEO still works in the age of AI answer engines, but the goal widened: rank in classic results and be cited by AI answers. That means publishing direct, well-structured answers to real questions, marking content up with schema (FAQPage, Article, Organization, LocalBusiness), keeping entity information consistent across the web, and earning the topical authority that makes both algorithms and answer engines trust you as a source.",
    sections: [
      {
        heading: "What changed when answers started arriving before clicks?",
        body: [
          "Zero-click search was already rising; AI Overviews and chat assistants accelerated it. People now get a synthesised answer at the top of the results page, and many never scroll. The websites that win in this environment are the ones the answer engines quote — because being the cited source builds brand recognition even when the click goes elsewhere.",
        ],
      },
      {
        heading: "What is AEO and how is it different from SEO?",
        body: [
          "Answer Engine Optimization (AEO) is the practice of structuring content so machines can extract a direct, confident answer: a definition sentence up top, question-led headings, short paragraphs, lists and FAQ blocks. GEO — generative engine optimization — extends this to how AI systems describe your brand across the whole web.",
          "It is not a replacement for SEO. Classic fundamentals — fast pages, crawlable structure, relevant content, links — remain the foundation AEO sits on.",
        ],
      },
      {
        heading: "Which content structures get cited most?",
        body: [
          "Answer-first paragraphs (40–60 words directly under a question heading), comparison tables, numbered processes, and clearly labelled FAQs. Schema markup helps machines confirm what each block is: FAQPage for questions, Article for posts, Organization and LocalBusiness for who you are, BreadcrumbList for where a page sits.",
        ],
      },
      {
        heading: "What should a business do this quarter?",
        body: [
          "Audit your top pages: does each one answer its core question in the first 60 words? Add FAQ sections to money pages. Implement Organization, LocalBusiness and FAQPage schema. Keep your name, address, service list and pricing consistent everywhere — answer engines cross-check consistency before citing you.",
        ],
      },
    ],
    takeaways: [
      "Optimise to be cited, not just ranked: direct answers, question headings, schema.",
      "AEO sits on top of classic SEO — fundamentals still decide who gets trusted.",
      "Consistent entity data across the web makes answer engines confident about your brand.",
    ],
    faq: [
      {
        question: "Will AI answer engines kill website traffic?",
        answer:
          "They reduce clicks on simple informational queries, but they reward sites structured as citable sources. Businesses that answer clearly still receive qualified traffic — from search, from citations and from people who discover the brand inside an AI answer.",
      },
      {
        question: "Does schema markup guarantee AI citations?",
        answer:
          "No — nothing guarantees citations. Schema removes ambiguity about what your content is, which measurably helps extraction, but the content itself must genuinely answer the question better than alternatives.",
      },
    ],
  },
  {
    slug: "small-business-seo-checklist-that-actually-works",
    title: "A Small-Business SEO Checklist That Actually Works",
    description:
      "A practical 12-point checklist for small-business SEO in 2026 — foundations, content, local signals and the technical basics search engines still reward.",
    category: "SEO",
    tags: ["SEO checklist", "local SEO", "small business SEO"],
    date: "2026-08-25",
    readingTime: "7 min read",
    image: "/blog/logo-glow.png",
    imageAlt: "The Loud Launchers arrow mark glowing pink on a dark background",
    answer:
      "Small-business SEO works when the basics are done consistently: a fast mobile-first website, one focused page per service, content that answers real customer questions, a complete Google Business Profile, consistent name-address-phone data everywhere, and clean technical foundations — titles, meta descriptions, schema markup, sitemap and internal links. Twelve checks below cover the whole system.",
    sections: [
      {
        heading: "Foundations: is your site technically sound?",
        body: [
          "Start with four checks: your site loads fast on a phone, every important page has a unique title and meta description, a sitemap is submitted through Search Console, and nothing important is blocked in robots.txt. These four decide whether search engines can and want to index you.",
        ],
      },
      {
        heading: "Content: one page per service, one answer per question",
        body: [
          "Create a dedicated page for every service you sell, written around the customer's problem rather than your company's history. Then build a blog that answers the actual questions customers type before they buy — pricing, comparisons, how-to, local specifics. Answer the question directly in the first paragraph; elaborate below.",
        ],
      },
      {
        heading: "Local signals: does your business look real and consistent?",
        body:
          [
            "Claim and complete your Google Business Profile, and make your name, address and phone number identical on your website, directories and social profiles. Add LocalBusiness schema with geo coordinates. Reviews matter enormously: ask happy customers systematically and reply to every review.",
          ],
      },
      {
        heading: "The 12-point checklist",
        body: [
          "1. Mobile-first and fast. 2. Unique titles and descriptions. 3. XML sitemap submitted. 4. Robots.txt correct. 5. One page per service. 6. Local keywords in titles and copy. 7. Blog answering real customer questions. 8. FAQ sections with FAQPage schema. 9. Google Business Profile complete. 10. NAP consistency everywhere. 11. LocalBusiness + Organization schema. 12. Weekly review replies and fresh content.",
        ],
      },
    ],
    takeaways: [
      "Technical basics gate everything: speed, titles, sitemap, robots.",
      "One focused page per service plus question-led blog content wins discoverable queries.",
      "Local consistency — profile, NAP, reviews — is the fastest lever for small businesses.",
    ],
    faq: [
      {
        question: "How long does small-business SEO take to show results?",
        answer:
          "Expect early movement in 6–12 weeks for local and long-tail terms, and 4–8 months for competitive national terms. SEO compounds: the work done this quarter keeps paying next year.",
      },
      {
        question: "Is blogging still worth it for a small business?",
        answer:
          "Yes — when posts answer real customer questions instead of chasing keywords. A focused post that becomes the cited answer for a buying question can outperform dozens of generic articles.",
      },
    ],
  },
  {
    slug: "geo-optimization-get-found-by-customers-near-you",
    title: "GEO Optimization: Get Found by Customers Near You",
    description:
      "Generative engine optimization and local GEO signals decide whether AI assistants and map packs recommend your business. Here is how to optimise both.",
    category: "GEO",
    tags: ["GEO", "generative engine optimization", "local search", "AI recommendations"],
    date: "2026-09-08",
    readingTime: "6 min read",
    image: "/blog/transform-business.png",
    imageAlt:
      "A before-and-after comparison of a business transformation from struggling to thriving, powered by Loud Launchers",
    answer:
      "GEO optimization has two layers. For generative engines — ChatGPT, Gemini, Perplexity, AI Overviews — it means being a consistently described, verifiable entity: clear service pages, schema markup, complete business profiles and third-party corroboration. For geographic discovery it means local SEO done properly: geo-coordinated schema, location-specific content, map-accurate listings and reviews that name your services and city.",
    sections: [
      {
        heading: "Why do AI assistants recommend some businesses and not others?",
        body: [
          "Generative engines lean on patterns across the web: your website, directories, reviews, news and social profiles. If those sources agree about what you do, where you operate and who you serve, the engine can recommend you confidently. If sources contradict or stay vague, you are invisible — even with a great website.",
        ],
      },
      {
        heading: "How do you make your business machine-verifiable?",
        body: [
          "Publish a clear services list with dedicated pages. Add LocalBusiness schema including address, geo coordinates, opening hours and service categories. Keep the same description everywhere — your website, Google Business Profile, LinkedIn, directories. Add an FAQ page answering 'do you serve X', 'how much does Y cost' style questions in plain language.",
        ],
      },
      {
        heading: "What wins the map pack and 'near me' queries?",
        body: [
          "Complete Google Business Profile with accurate categories, photos and hours; steady review velocity with replies; location pages that genuinely describe service areas rather than door-stuffed keyword lists; and embedded maps plus geo schema on your contact page. Proximity you cannot control — relevance and prominence you can.",
        ],
      },
      {
        heading: "A 30-day GEO starter plan",
        body: [
          "Week 1: audit consistency across your top ten listings. Week 2: ship LocalBusiness + FAQ schema and a complete contact page. Week 3: build or refresh service pages with city and service-area language. Week 4: launch a review-request routine and publish one genuinely useful local piece of content.",
        ],
      },
    ],
    takeaways: [
      "AI recommendations reward consistency: same facts, same wording, everywhere.",
      "LocalBusiness schema with geo coordinates and complete profiles make you verifiable.",
      "Reviews and location content drive map-pack prominence you can actually influence.",
    ],
    faq: [
      {
        question: "Is GEO replacing SEO?",
        answer:
          "No. GEO is the newer layer on top of SEO's foundation. Search engines and answer engines share the same sources — well-structured, credible content wins in both.",
      },
      {
        question: "I serve multiple cities. Do I need a page per city?",
        answer:
          "Only where you can make each page genuinely useful — distinct testimonials, local specifics, real service details. Thin duplicate city pages are filtered out; substance is not.",
      },
    ],
  },
  {
    slug: "why-your-website-isnt-converting-visitors",
    title: "Why Your Website Isn't Converting Visitors (and How to Fix It)",
    description:
      "Traffic without enquiries usually comes down to five fixable issues — weak first impression, unclear message, hidden actions, slow pages and no proof. Diagnose and fix each one.",
    category: "Websites",
    tags: ["conversion optimization", "CRO", "web design", "user experience"],
    date: "2026-09-10",
    readingTime: "6 min read",
    image: "/blog/launch-horizon.png",
    imageAlt:
      "A rocket rising from the horizon leaving a bright trail of light into the night sky",
    answer:
      "When a website gets traffic but no conversions, the cause is almost always one of five things: the first impression fails the three-second test, the headline doesn't say what you do and for whom, the next action is buried or vague, the page is slow enough that visitors leave before it renders, or there's no trust evidence near the point of decision. Each has a straightforward fix.",
    sections: [
      {
        heading: "Does your page pass the three-second test?",
        body: [
          "Visitors decide almost instantly whether a site feels credible and relevant. If the hero doesn't immediately communicate what you offer, who it's for and why it's better, the back button wins. Fix: one clear headline, one supporting sentence, one primary action above the fold — nothing else competing for attention.",
        ],
      },
      {
        heading: "Is the next action obvious on every screen?",
        body: [
          "Every scroll depth needs a visible next step: 'Get a quote', 'Book a call', 'Start a project'. Mobile deserves special attention — sticky action bars and thumb-reachable buttons routinely lift mobile conversion by double digits. Forms should ask only for what you truly need today.",
        ],
      },
      {
        heading: "Is speed quietly killing your conversions?",
        body: [
          "Every second of load time costs conversions — and heavy images, bloated scripts and render-blocking fonts are the usual culprits. Compress images, lazy-load anything below the fold, and measure on a mid-range phone over 4G, not your office Wi-Fi.",
        ],
      },
      {
        heading: "Is there proof near the point of decision?",
        body: [
          "People convert when they feel safe. Place testimonials, client names, review scores, guarantees or concrete results directly beside your forms and calls to action — not on a separate 'testimonials' page nobody visits.",
        ],
      },
    ],
    takeaways: [
      "Clarity beats cleverness: say what you do, for whom, and what to do next.",
      "Make the next action visible at every scroll depth, especially on mobile.",
      "Speed and proof are conversion multipliers — fix both before spending on more traffic.",
    ],
    faq: [
      {
        question: "What is a good conversion rate for a small-business website?",
        answer:
          "Lead-generation sites commonly convert 2–5% of visitors into enquiries; well-optimised pages exceed that. The bigger wins usually come from fixing clarity and speed than from squeezing an extra decimal point.",
      },
      {
        question: "Should I redesign or optimise my existing site first?",
        answer:
          "Optimise first when the structure is sound — message, actions and proof fixes are fast and measurable. Redesign when the foundation fights you: dated visuals, poor mobile experience or a journey that no longer matches your offer.",
      },
    ],
  },
];

export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug);
}

export function getRelatedPosts(slug, limit = 3) {
  const current = getPostBySlug(slug);
  if (!current) return posts.slice(0, limit);
  const sameCategory = posts.filter(
    (p) => p.slug !== slug && p.category === current.category,
  );
  const others = posts.filter(
    (p) => p.slug !== slug && p.category !== current.category,
  );
  return [...sameCategory, ...others].slice(0, limit);
}

export function getFeaturedPosts() {
  return posts.filter((post) => post.featured);
}

export function formatDate(iso) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
