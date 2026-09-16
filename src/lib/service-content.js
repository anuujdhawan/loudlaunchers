/* =====================================================================
 * Long-form service page content.
 *
 * WHY THIS IS SEPARATE FROM `site.js`
 * `site.js` holds the six-service summary registry that the nav, the mega
 * menu, the footer, the /services index, `sitemap.js` and `llms.txt` all
 * read from. That data is deliberately short because it is rendered in
 * small spaces. The content here is the opposite: one long-form page per
 * service, written for people who are already comparing providers and for
 * answer engines that need extractable, self-contained statements.
 *
 * Merging the two would triple `site.js` and make the short summaries
 * harder to find. The page component joins them on `slug`.
 *
 * CONTENT STANDARD — what separates this from filler:
 *  - `quickAnswer` is 40-60 words. It is the answer-engine snippet and it
 *    renders in the Quick Answer box near the top of the page. One idea,
 *    complete on its own, no "in this article we will".
 *  - Every `sections[].heading` is a question someone actually types. They
 *    become the sticky table of contents and the H2s, so they have to work
 *    as navigational labels and as search queries at the same time.
 *  - The first sentence under a heading answers it. Elaboration follows.
 *    An answer engine that lifts only the first sentence should still be
 *    correct.
 *  - `keyFacts` and `glossary` are written to be lifted verbatim. Short,
 *    declarative, no pronouns pointing outside the block.
 *  - NO INVENTED CITATIONS. No "according to Gartner 2026". Ranges are
 *    stated as ranges and hedged where the honest answer depends on the
 *    client's situation. Where an industry figure is genuinely common
 *    knowledge it is described qualitatively instead of being given a
 *    fake source.
 *  - `fit.notFor` is not a formality. Naming who a service is wrong for is
 *    the strongest trust signal on the page and it prevents bad-fit
 *    enquiries, which cost more than the ones you never get.
 *  - `investment.tiers` give indicative ranges with the reason for the
 *    spread. A single "contact us" tells a buyer nothing and is the most
 *    common complaint about agency pricing pages.
 *
 * VOICE: direct, specific, opinionated. No "we are passionate about".
 * Concrete numbers, real trade-offs, and an admission where the honest
 * answer is "it depends" plus what it depends on.
 * ===================================================================== */

export const serviceContent = {
  /* ------------------------------------------------------------------ */
  "website-development-deployment": {
    updated: "September 2026",
    quickAnswer:
      "Website development is the design and build of a fast, accessible site that turns visitors into enquiries. A typical project covers discovery, bespoke design, responsive build, technical SEO and deployment, and runs four to eight weeks from kick-off to launch.",
    keyFacts: [
      { label: "Typical timeline", value: "4–8 weeks" },
      {
        label: "Best for",
        value: "Businesses whose site is slow, dated, or awkward for their own team to edit",
      },
      { label: "Deliverables", value: "6, listed in full below" },
      { label: "Platforms", value: "Next.js, Astro, WordPress, Shopify, Sanity" },
      { label: "Measured on", value: "Core Web Vitals, enquiry rate, organic entries" },
      { label: "Handover", value: "Code, CMS and analytics in your name" },
    ],
    definition: {
      term: "What is website development?",
      body: [
        "Website development is the work of turning an agreed design into a live, functioning site: the markup, styling, interactivity, content structure and deployment that make pages load quickly, behave predictably and stay maintainable.",
        "It is distinct from web design, which decides how a site looks and reads, and from SEO, which decides what it ranks for. On a healthy project the three run together rather than in sequence, because the decisions that most affect speed and ranking — page structure, heading hierarchy, image handling, what renders on the server — are made during the build, not bolted on afterwards.",
      ],
    },
    sections: [
      {
        id: "whats-included",
        heading: "What does a website project actually include?",
        body: [
          "A complete build has four phases, and skipping any one of them is what turns a two-month project into a five-month one. Discovery settles what the site is for and which pages have to exist. Design decides how those pages look and read. Build turns the design into responsive, accessible code. Deployment puts it live and proves it works.",
          "The phase most often cut for budget reasons is discovery — and it is the one that pays for itself. Every week spent agreeing the sitemap and the primary conversion path saves roughly a week of rework later, because changing a page structure after design is expensive and changing it after build is worse.",
        ],
        list: {
          title: "The four phases, in order",
          items: [
            "Discovery — goals, audience, sitemap, conversion path, content inventory agreed before design starts",
            "Design — bespoke layouts for every template, reviewed in the browser rather than as static images",
            "Build — responsive implementation, accessibility pass, performance budget, technical SEO foundations",
            "Deployment — domain and SSL, analytics, monitoring, redirect map, then a post-launch review",
          ],
        },
      },
      {
        id: "cost",
        heading: "How much should a business website cost?",
        body: [
          "For a professionally built marketing site of five to fifteen pages, most businesses should expect a five-figure sum in the low-to-mid range. Below that you are usually buying a themed template with your logo dropped in; well above it you are paying for custom functionality, integrations or a content-heavy information architecture.",
          "The three things that actually drive the number are page count and template variety, how much content the client supplies versus how much has to be written, and whether anything needs to connect to an existing system such as a CRM, booking engine or product database. Ask any provider to separate those three in their quote — a single blended figure hides which one is inflating it.",
        ],
      },
      {
        id: "speed",
        heading: "Why does site speed affect enquiries, not just rankings?",
        body: [
          "Speed is a conversion variable before it is a ranking variable. A page that takes three seconds to become usable loses a meaningful share of its visitors before they read a single line, and that loss happens on every page, in every channel, including the paid traffic you are paying per click for.",
          "In practice the fix is rarely one thing. The usual offenders are uncompressed hero images, third-party scripts loaded on every page whether needed or not, layout that shifts as fonts and adverts arrive, and a stack that ships a large JavaScript bundle to render text that never changes. Setting a performance budget before the build — a target for Largest Contentful Paint, Interaction to Next Paint and Cumulative Layout Shift — is what keeps those decisions honest, because it gives the team something concrete to fail against.",
        ],
      },
      {
        id: "rebuild",
        heading: "Should you redesign, rebuild or reskin your existing site?",
        body: [
          "These are three different jobs with three different price tags, and quoting the wrong one is the most common way a web project goes over budget. Match the scope to the actual constraint before you ask anyone for a number.",
          "A reskin keeps the structure and changes the surface. A redesign rebuilds the pages while keeping your content and your domain's accumulated authority. A rebuild replaces the platform itself. If your site is slow, the constraint is almost always the platform or the asset handling — and no amount of new visual design will fix it.",
        ],
        comparison: {
          title: "Reskin, redesign or rebuild?",
          intro:
            "Pick the row that matches your actual constraint, not the one that matches your budget.",
          columns: ["Approach", "Choose it when", "Typical timeline", "What you keep"],
          rows: [
            [
              "Reskin",
              "Brand or copy changed, but the structure still converts",
              "2–3 weeks",
              "Layout, codebase, all accumulated SEO equity",
            ],
            [
              "Redesign",
              "The structure no longer matches how people actually buy",
              "4–8 weeks",
              "Content and domain authority; pages are rebuilt",
            ],
            [
              "Rebuild",
              "Platform, speed or the CMS is the real constraint",
              "6–14 weeks",
              "Content, domain authority and your design language",
            ],
          ],
        },
      },
      {
        id: "platform",
        heading: "How do you choose a platform you will not regret?",
        body: [
          "Choose the platform that matches who edits the site and how often, not the one with the loudest community. A brochure site that changes twice a year needs a different answer from a catalogue with weekly price updates and a blog.",
          "The two failure modes are symmetrical. Teams pick a heavyweight CMS for a site that will never need it and then pay for the complexity in hosting, security patching and developer time. Or they pick a static generator because it is fast, then discover nobody in the business can publish a blog post without a developer — so the site quietly stops being updated, which costs far more in search visibility than the speed ever gained.",
          "A reasonable default for most marketing sites: a modern framework for the front end, a hosted headless CMS for the content the team actually edits, and a deployment target that gives you preview builds for every change. That combination keeps the site fast without putting the marketing team behind a developer.",
        ],
      },
      {
        id: "after-launch",
        heading: "What happens after launch?",
        body: [
          "Launch is the midpoint of a website project, not the end. The first ninety days produce the data that tells you which pages people actually land on, where they abandon, and which of your assumptions about the navigation were wrong.",
          "A sensible post-launch plan covers three things: monitoring that tells you when something breaks before a customer does, an analytics setup that tracks enquiries rather than page views, and a short list of improvements to make once you have real behaviour to look at. We include a post-launch review in every build for exactly this reason, and most clients then move to a light monthly arrangement for iterations rather than starting a new project.",
        ],
      },
    ],
    process: [
      {
        step: "01",
        title: "Discovery",
        body: "We agree the sitemap, the primary conversion path and who the site is for. Nothing is designed until the page list is signed off, because a change here costs minutes and the same change after build costs weeks.",
      },
      {
        step: "02",
        title: "Structure and wireframes",
        body: "Every template is mapped before it is styled: what each page must communicate, in what order, and what the visitor should do next. This is where most of the SEO value is decided, because heading hierarchy and internal linking are structural.",
      },
      {
        step: "03",
        title: "Design",
        body: "Bespoke layouts for each template rather than a themed base. You review in the browser at real breakpoints, not as flat images, because a design that only works at 1440px is not a design.",
      },
      {
        step: "04",
        title: "Build",
        body: "Responsive implementation against an agreed performance budget, an accessibility pass, and the technical SEO foundations: metadata, schema, sitemap, canonical tags and redirects.",
      },
      {
        step: "05",
        title: "Launch and review",
        body: "Domain, SSL, analytics and monitoring configured, the redirect map verified against the old site, then a structured review ninety days later using real traffic rather than opinion.",
      },
    ],
    metrics: [
      {
        label: "Core Web Vitals",
        body: "Largest Contentful Paint, Interaction to Next Paint and Cumulative Layout Shift, measured on real devices and mid-range phones rather than on a fast desktop.",
      },
      {
        label: "Enquiry conversion rate",
        body: "The share of sessions that complete a form, start a chat or tap through to WhatsApp. This is the number the site exists to move.",
      },
      {
        label: "Organic entry pages",
        body: "Which pages search actually sends people to, which is frequently not the page you expected and is the fastest route to knowing what to write next.",
      },
      {
        label: "Form completion",
        body: "Where people abandon the enquiry form. A field that loses more people than it earns is a field to delete.",
      },
    ],
    fit: {
      goodFor: [
        "A business whose current site is slow, dated or embarrassing to share",
        "A team that cannot update its own content without asking a developer",
        "A company about to spend on ads and needing landing pages that convert",
        "A brand that has outgrown a template and needs a site that matches its positioning",
      ],
      notFor: [
        "A project where the design is already finalised and the ask is pure implementation at the lowest rate",
        "A site that will never be updated, where a one-page presence genuinely is enough",
        "A business that needs a full e-commerce operation — we would scope that separately",
      ],
    },
    stack: [
      "Next.js",
      "React",
      "Astro",
      "Tailwind CSS",
      "WordPress",
      "Sanity",
      "Shopify",
      "Vercel",
      "Cloudflare",
      "GA4",
      "Plausible",
      "Resend",
    ],
    investment: {
      intro:
        "These are indicative ranges for a professionally built marketing site, not quotes. The spread is driven by page count, template variety and how much content has to be written rather than supplied.",
      tiers: [
        {
          name: "Focused launch",
          range: "5–12 pages",
          includes: [
            "Discovery workshop and agreed sitemap",
            "Bespoke design for up to six templates",
            "Responsive build and accessibility pass",
            "Technical SEO foundations and analytics",
          ],
        },
        {
          name: "Full site",
          range: "12–30 pages",
          includes: [
            "Everything in Focused launch",
            "Content support for key pages",
            "Blog or resource section with structured data",
            "Conversion tracking and a post-launch review",
          ],
        },
        {
          name: "Complex build",
          range: "30+ pages or integrations",
          includes: [
            "Everything in Full site",
            "CRM, booking or product data integration",
            "Multi-language or multi-region structure",
            "Performance budget enforced in CI",
          ],
        },
      ],
      note: "We quote a fixed price after discovery, not an hourly estimate. If the scope changes we re-quote before doing the work rather than invoicing the difference afterwards.",
    },
    faqs: [
      {
        question: "How long does a website build take?",
        answer:
          "A focused marketing site typically takes four to eight weeks from discovery to launch. Larger builds with e-commerce, booking or multi-language requirements usually run eight to fourteen weeks, and the single biggest variable is how quickly content is supplied and approved.",
      },
      {
        question: "Will I be able to edit the site myself?",
        answer:
          "Yes. We build on a content management system your team can use without touching code, and we hand over with a walkthrough plus short recorded guides for the pages you will update most often. If nobody in your business will ever edit the site, we will tell you and save you the licence cost.",
      },
      {
        question: "Do you handle hosting and deployment?",
        answer:
          "We do. We deploy to infrastructure suited to your traffic and budget, configure the domain and SSL, set up analytics and monitoring, and hand over access so you are never locked in. Hosting accounts are always in your name, not ours.",
      },
      {
        question: "Do I own the code when the project ends?",
        answer:
          "Yes, entirely. You get the repository, the hosting account, the domain and the CMS. There is no proprietary page builder you can only edit through us, and no licence that ends when the retainer does.",
      },
      {
        question: "Can you work with our existing brand guidelines?",
        answer:
          "That is the normal case. We build within your existing brand system and extend it where the site needs something the guidelines do not cover, such as interactive states or a data-visualisation palette. We only propose a rebrand if the guidelines genuinely cannot stretch to a digital context.",
      },
      {
        question: "What if we already have a designer?",
        answer:
          "That works. We regularly build from another studio's design files, and we will flag anything in the design that will be expensive or inaccessible to implement before we start rather than after. We can also work alongside them on the responsive behaviour, which is where most static designs need interpretation.",
      },
      {
        question: "How do you handle migrating from our old site?",
        answer:
          "We inventory the existing URLs, map each one to its new destination, and verify the redirects before launch. Pages that earned links or rankings keep them. We also check that the new sitemap and canonical tags agree with the redirect map, because a mismatch there is the most common cause of a post-launch traffic dip.",
      },
      {
        question: "Do you offer ongoing maintenance?",
        answer:
          "Yes, on a light monthly arrangement covering updates, monitoring, small content changes and a quarterly performance review. It is optional — plenty of clients take the handover and run the site themselves, and we build for that to be a realistic option.",
      },
    ],
    glossary: [
      {
        term: "Core Web Vitals",
        definition:
          "A set of real-user experience metrics — Largest Contentful Paint, Interaction to Next Paint and Cumulative Layout Shift — used by Google as a ranking signal and, more importantly, as a proxy for whether a page feels fast to a customer.",
      },
      {
        term: "Largest Contentful Paint (LCP)",
        definition:
          "The time from navigation until the largest visible element — usually a hero image or heading — finishes rendering. Under 2.5 seconds is the widely used target for a good experience.",
      },
      {
        term: "Cumulative Layout Shift (CLS)",
        definition:
          "A score for how much visible content moves unexpectedly while a page loads. It is usually caused by images without reserved dimensions or late-loading fonts and adverts.",
      },
      {
        term: "Headless CMS",
        definition:
          "A content management system that stores and serves content through an API rather than rendering pages itself. It lets a fast front end sit in front of an editor-friendly admin interface.",
      },
      {
        term: "Redirect map",
        definition:
          "A one-to-one list pairing every URL on the old site with its destination on the new one. It is what preserves accumulated search visibility through a migration.",
      },
      {
        term: "Performance budget",
        definition:
          "An agreed ceiling for page weight and load timing, set before the build begins, so that a decision to add a heavy script or image has to be argued for rather than discovered after launch.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  "mobile-apps-publishing": {
    updated: "September 2026",
    quickAnswer:
      "Mobile app development is the design, build and store publishing of an app that keeps customers connected to your business. One cross-platform codebase ships to both Apple and Android audiences, and a first version typically takes three to five months from discovery to store approval.",
    keyFacts: [
      { label: "Typical timeline", value: "3–5 months" },
      {
        label: "Best for",
        value: "Businesses whose customers return repeatedly rather than finding them once",
      },
      { label: "Deliverables", value: "6, listed in full below" },
      { label: "Approach", value: "One cross-platform codebase, both stores" },
      { label: "Publishing", value: "Submitted to Apple and Google on your behalf" },
      { label: "Measured on", value: "Activation, retention, crash-free sessions" },
    ],
    definition: {
      term: "What is mobile app development?",
      body: [
        "Mobile app development is the process of designing, building, testing and publishing an application that runs natively on a phone or tablet, is distributed through the Apple App Store and Google Play, and is updated over time as the business and the operating systems change.",
        "It is materially different from building a mobile-responsive website, even though the two are often confused in briefs. An app can hold state between sessions, send push notifications, work without a connection, and reach device capabilities such as the camera, location and biometrics. Those are the features that justify an app — and if the brief does not need any of them, a well-built mobile website will usually serve the business better and cost less to maintain.",
      ],
    },
    sections: [
      {
        id: "need-an-app",
        heading: "Do you actually need an app, or a better mobile website?",
        body: [
          "You need an app when repeat usage is the point and at least one device capability is doing real work: notifications that bring people back, offline access, the camera, location, or stored credentials. You need a better mobile website when people find you once, read, and either convert or leave.",
          "The honest test is retention. If a customer interacts with your business once a year, an app will be downloaded, used once and eventually deleted — and you will have paid for two store submissions, ongoing maintenance and a second codebase to keep current. If they interact weekly, an app earns its place because it removes friction from something they already do often.",
          "A useful middle option is the progressive web app: installable to the home screen, works offline, updates instantly, and requires no store review. It cannot use every native capability, and on Apple devices its notification support is more limited, but for many businesses it captures most of the value at a fraction of the cost.",
        ],
        comparison: {
          title: "App, progressive web app, or mobile web?",
          intro:
            "Choose on how often customers return and which device features you genuinely need.",
          columns: ["Approach", "Choose it when", "Relative cost", "Reach"],
          rows: [
            [
              "Mobile web",
              "People find you once and rarely return",
              "Lowest",
              "Any browser, nothing to install",
            ],
            [
              "Progressive web app",
              "Repeat use, but light device requirements",
              "Low",
              "Any browser, installable to home screen",
            ],
            [
              "Cross-platform app",
              "Repeat use plus push, offline or device features",
              "Medium",
              "Both stores from one codebase",
            ],
            [
              "Native app",
              "Heavy camera, graphics or sensor work, or deep platform UX",
              "Highest",
              "One platform per build",
            ],
          ],
        },
      },
      {
        id: "whats-involved",
        heading: "What does building an app involve?",
        body: [
          "The single most important decision in an app project is which one loop version one has to prove. Not a feature list — a loop. A customer opens the app, does one valuable thing, and has a reason to come back. If that loop works, the feature list is a roadmap. If it does not, no amount of additional features rescues it.",
          "Everything else follows from that: the screens required to complete the loop, the data model behind them, the backend that stores it, the admin tooling your team needs to run it day to day, and the analytics that tell you whether the loop is actually happening. Projects that start from a feature list rather than a loop are the ones that run long.",
        ],
        list: {
          title: "What a first version should prove",
          items: [
            "One core loop a customer completes and wants to repeat",
            "The minimum set of screens that loop requires, and no more",
            "A data model that will not need rebuilding when version two arrives",
            "Admin tooling so your team can operate the app without a developer",
            "Instrumentation that shows whether the loop is working",
          ],
        },
      },
      {
        id: "cross-platform",
        heading: "Cross-platform or native — which should you choose?",
        body: [
          "Cross-platform by default, because one codebase ships to both stores and removes the drift that appears when two native products are maintained separately. For the overwhelming majority of business apps — accounts, bookings, catalogues, content, messaging, loyalty — a cross-platform build is indistinguishable from native to the person using it.",
          "Native is the right answer when the experience depends on heavy device capability: high-frame-rate graphics, advanced camera processing, real-time sensor fusion, or deep integration with platform-specific interfaces such as widgets, watch apps or live activities. That is a real category, but it is much smaller than most briefs assume.",
          "The trap is choosing native for prestige and then paying for it forever. Two codebases mean two sets of bugs, two release cycles, and every new feature built twice. If you cannot name the specific capability that requires native, you probably do not need it.",
        ],
      },
      {
        id: "cost",
        heading: "How much does an app cost to build?",
        body: [
          "A focused first version with a defined core loop is a five-figure project in most markets. Costs rise steeply with the number of distinct user roles, the complexity of the backend, and whether the app integrates with systems you already run — an ERP, a booking engine, a payment provider or a legacy database.",
          "Two things surprise clients more often than the build cost. The first is that the backend is frequently the larger half of the work: accounts, permissions, notifications, data storage and an admin interface are not visible in the app but they are what makes it function. The second is that an app is never finished. Both stores release new operating system versions annually, review guidelines change, and dependencies need updating. Budget for maintenance from the start rather than treating it as a surprise in year two.",
        ],
      },
      {
        id: "approval",
        heading: "How do you get approved by the App Store and Google Play?",
        body: [
          "Store review is a documentation and policy exercise more than a technical one, and the rejections we see most often have nothing to do with code quality. They are caused by incomplete privacy declarations, screenshots that do not match the shipped experience, missing account-deletion options, and sign-in flows that require an account before a user can see anything.",
          "We prepare the full submission pack — icons at every required size, screenshots for each device class, descriptions and keywords, age rating, privacy nutrition labels and the data-safety form — then submit and handle reviewer questions. You keep ownership of both developer accounts throughout, so nothing about your store presence depends on us continuing to work with you.",
        ],
      },
      {
        id: "after-launch",
        heading: "What happens after launch?",
        body: [
          "The first two iterations should be planned before launch, not after, and they should be driven by usage data rather than opinion. Where do people drop out of the core loop? Which screen generates support questions? Which feature is never opened? Those three answers usually reorder the roadmap within a month.",
          "Most clients then continue on a light monthly arrangement covering operating system updates, dependency maintenance, store compliance and incremental improvements. We also watch the crash-free session rate as a first-class metric, because a small percentage of crashes on a specific device model can quietly cost you a meaningful share of your most engaged users.",
        ],
      },
    ],
    process: [
      {
        step: "01",
        title: "Loop definition",
        body: "We agree the one loop version one must prove, and the screens required to complete it. Everything not needed for that loop is explicitly deferred to a later version, in writing.",
      },
      {
        step: "02",
        title: "UX and interface design",
        body: "Flows for every core screen, designed for both platforms' conventions rather than one platform's pattern stretched over the other. Reviewed as a clickable prototype before any code is written.",
      },
      {
        step: "03",
        title: "Build",
        body: "One cross-platform codebase, plus the backend, API and admin tooling sized to your data model. Crash reporting and analytics are wired in from the first internal build, not added at the end.",
      },
      {
        step: "04",
        title: "Store submission",
        body: "Icons, screenshots, descriptions, age rating, privacy declarations and data-safety forms prepared, then submitted to both stores on your behalf with reviewer questions handled.",
      },
      {
        step: "05",
        title: "Iterate",
        body: "Two post-launch iterations planned against real usage data, plus ongoing maintenance for operating system updates and store compliance.",
      },
    ],
    metrics: [
      {
        label: "Activation",
        body: "The share of installs that complete the core loop at least once. An app that installs well but never activates has a design problem, not a marketing one.",
      },
      {
        label: "Retention",
        body: "Whether people come back in week two and week four. This is the number that decides whether the app justified its cost.",
      },
      {
        label: "Crash-free sessions",
        body: "The percentage of sessions ending without a crash. Watched per device model, because averages hide problems concentrated on one popular handset.",
      },
      {
        label: "Store conversion",
        body: "How many people who view the store listing install. Driven by screenshots and the first two lines of the description far more than by feature lists.",
      },
    ],
    fit: {
      goodFor: [
        "A business whose customers return weekly or monthly and would benefit from removing friction",
        "A service where bookings, accounts or order tracking are currently handled by phone or email",
        "A product that genuinely needs push notifications, offline access or the camera",
        "A company with an existing web presence and a clear reason to go beyond it",
      ],
      notFor: [
        "A business whose customers interact once a year — a better mobile website will serve you better",
        "A brief whose real goal is a marketing presence rather than a recurring customer tool",
        "A project with no budget for ongoing maintenance after launch",
      ],
    },
    stack: [
      "React Native",
      "Expo",
      "TypeScript",
      "Swift",
      "Kotlin",
      "Node.js",
      "PostgreSQL",
      "Firebase",
      "RevenueCat",
      "Sentry",
      "App Store Connect",
      "Google Play Console",
    ],
    investment: {
      intro:
        "Indicative ranges for a first version. The largest variables are how many distinct user roles exist and how much integration is needed with systems you already run.",
      tiers: [
        {
          name: "Single loop",
          range: "One user role, one core flow",
          includes: [
            "Loop definition and UX flows",
            "Interface design for every core screen",
            "Cross-platform build and both store submissions",
            "Analytics, crash reporting and a launch review",
          ],
        },
        {
          name: "Multi-role",
          range: "Two or three user roles",
          includes: [
            "Everything in Single loop",
            "Role-based permissions and separate experiences",
            "Admin tooling for your team",
            "Notification infrastructure and delivery reporting",
          ],
        },
        {
          name: "Integrated",
          range: "Backend integrations and payments",
          includes: [
            "Everything in Multi-role",
            "Integration with CRM, ERP, booking or payment systems",
            "Subscriptions or in-app purchase handling",
            "Two planned post-launch iterations",
          ],
        },
      ],
      note: "Store fees, developer account costs and any third-party service subscriptions are billed at cost and are always in your name. We do not mark them up or resell them.",
    },
    faqs: [
      {
        question: "Do you build native or cross-platform apps?",
        answer:
          "Cross-platform by default, because one codebase ships to both stores and removes the drift between two separate native products. We recommend native only where the experience depends on heavy device capability such as advanced camera, graphics or sensor work.",
      },
      {
        question: "Do you publish to the App Store and Google Play for us?",
        answer:
          "Yes. We prepare icons, screenshots, descriptions and privacy declarations, submit on your behalf, and handle reviewer questions. You keep ownership of both developer accounts, so your store presence never depends on us continuing to work with you.",
      },
      {
        question: "How long does app store approval take?",
        answer:
          "Apple typically reviews within one to three days and Google within a few hours to a few days, but first submissions are commonly rejected once for documentation or policy reasons rather than technical ones. We plan for one review cycle in the schedule rather than assuming approval on the first attempt.",
      },
      {
        question: "Can the app share a login with our existing website?",
        answer:
          "Yes. We build against your existing authentication where it exposes an API, or add a shared identity layer if it does not. Single sign-on across web and app is worth planning for early, because retrofitting it after both products are live is significantly more work.",
      },
      {
        question: "What happens when Apple or Google release a new OS version?",
        answer:
          "Both stores require apps to target current operating system versions within a defined window, so annual maintenance is unavoidable rather than optional. Our ongoing arrangement covers the rebuild, retest and resubmission each year, plus any dependency updates the release forces.",
      },
      {
        question: "What happens after launch?",
        answer:
          "We plan the first two iterations before launch, using real usage data rather than assumptions. Most clients continue on a light monthly retainer covering maintenance, store updates and incremental improvements.",
      },
      {
        question: "Do you handle in-app purchases and subscriptions?",
        answer:
          "Yes, including the platform rules that govern them. Both stores take a commission on digital goods sold inside an app and require their own payment system for most digital content, which materially affects unit economics. We will flag that before you design a pricing model around it.",
      },
      {
        question: "Can you take over an app someone else built?",
        answer:
          "Often, yes, after a technical review. We assess code quality, dependency health, whether the current platform versions are still supported and how much of the existing work is salvageable, then tell you honestly whether continuing or rebuilding is the better use of your budget.",
      },
    ],
    glossary: [
      {
        term: "Cross-platform",
        definition:
          "Building one application codebase that compiles and runs on both iOS and Android, rather than writing a separate native app for each. It halves the ongoing maintenance burden at the cost of some access to platform-specific features.",
      },
      {
        term: "Progressive web app (PWA)",
        definition:
          "A website that can be installed to a phone's home screen, works offline and can send notifications, without going through an app store. It is cheaper than a native app but has less access to device hardware.",
      },
      {
        term: "Core loop",
        definition:
          "The single repeating action a customer performs in an app — book, order, track, message — that gives them a reason to return. A first version exists to prove one loop works.",
      },
      {
        term: "Activation rate",
        definition:
          "The share of people who install an app and then complete its core loop at least once. It distinguishes an app people wanted from one they merely downloaded.",
      },
      {
        term: "Privacy nutrition label",
        definition:
          "Apple's mandatory summary of what data an app collects and how it is used, shown on the store listing. Incomplete declarations are one of the most common causes of first-submission rejection.",
      },
      {
        term: "Crash-free sessions",
        definition:
          "The percentage of app sessions that end without the app crashing. It is tracked per device model because a fault concentrated on one popular handset can be invisible in the overall average.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  "digital-performance-marketing": {
    updated: "September 2026",
    quickAnswer:
      "Performance marketing is paid and organic activity measured against enquiries and revenue rather than impressions. A typical programme runs monthly, concentrates budget on two or three channels, and is judged on cost per qualified lead and how much spend reaches people who could actually buy.",
    keyFacts: [
      { label: "Typical timeline", value: "Ongoing, reviewed monthly" },
      {
        label: "Best for",
        value: "Businesses with a proven offer and the capacity to handle more enquiries",
      },
      { label: "Channels", value: "Search, social, retargeting, email" },
      { label: "Judged on", value: "Cost per qualified lead, not clicks" },
      { label: "Minimum sensible budget", value: "Enough to exit the learning phase per channel" },
      { label: "Reporting", value: "Monthly, against enquiries and revenue" },
    ],
    definition: {
      term: "What is performance marketing?",
      body: [
        "Performance marketing is advertising and campaign work that is measured against outcomes — enquiries, bookings, sales — rather than against exposure. Every channel is judged by what it cost to produce a result you can act on, and budget moves toward whatever is producing those results.",
        "The distinction from brand marketing is not that one is better but that they are answering different questions. Brand work builds the pool of people who would consider you at all. Performance work converts the portion of that pool who are ready now. Businesses get into trouble when they fund one and expect the results of the other: a strong performance programme cannot rescue an offer nobody wants, and a brand campaign will look like a failure if it is measured on last-click conversions.",
      ],
    },
    sections: [
      {
        id: "channels",
        heading: "Which channels should you actually spend on?",
        body: [
          "Spend where your buyers already are and where you can measure the result, and resist the temptation to be everywhere at once. A budget spread across six channels produces six sets of inconclusive data. The same budget concentrated on two produces enough volume in each to learn something real.",
          "The first decision is whether you are capturing existing demand or creating new demand. Search advertising captures people who are already looking for what you sell, which means faster signal and higher cost per click. Social advertising creates demand among people who were not looking, which needs more creative variation and more patience before the numbers mean anything. Most businesses need some of both, but rarely at the same time.",
        ],
        comparison: {
          title: "What each channel is actually good at",
          intro:
            "Time to signal is the practical constraint. A channel that takes three months to read cannot be the only thing you are running if you need to make a decision this quarter.",
          columns: ["Channel", "Best for", "Time to signal", "Cost profile"],
          rows: [
            [
              "Search",
              "People already searching for what you sell",
              "Days",
              "Higher cost per click, highest intent",
            ],
            [
              "Social",
              "Creating demand where nobody is searching yet",
              "Weeks",
              "Lower cost per click, needs creative volume",
            ],
            [
              "Retargeting",
              "Recovering people who nearly converted",
              "Days",
              "Small budget, usually the strongest return",
            ],
            [
              "Email and CRM",
              "Turning contacts you already have into repeat business",
              "Days",
              "Lowest cost, limited by list size",
            ],
            [
              "Organic search",
              "Compounding visibility that outlasts the spend",
              "Months",
              "Slow to start, durable once established",
            ],
          ],
        },
      },
      {
        id: "budget",
        heading: "How much do you need to spend before it works?",
        body: [
          "There is no universal figure, but there is a rule that holds: a channel needs enough budget to produce a statistically meaningful number of conversions, and below that you are reading noise. If your average cost per enquiry is fifty pounds and you spend two hundred a month, you have four data points — which is not enough to tell a good campaign from a lucky one.",
          "The practical way to set a starting budget is to work backwards from the volume you need. Decide how many enquiries per month would justify the effort, estimate a realistic cost per enquiry for the channel, and multiply. If the answer is more than you can commit, the honest options are to run fewer channels or to accept a longer learning period — not to spread a thin budget across everything and hope.",
          "Two costs are routinely left out of marketing budgets and both distort the picture. The first is the production cost of creative and landing pages, which is real and often underestimated for social. The second is the cost of handling the enquiries that arrive, because a campaign that generates fifty leads nobody follows up within a day has produced fifty wasted opportunities.",
        ],
      },
      {
        id: "landing-page",
        heading: "Why does the landing page matter more than the ad?",
        body: [
          "The ad buys the click. The landing page decides whether the click becomes anything. It is common for the same spend, pointed at a better page, to produce a materially different number of enquiries without touching the ad account at all — which makes page work the highest-leverage change available in most accounts.",
          "The most frequent problems are message mismatch and friction. Message mismatch is when the ad promises something specific and the page opens with a generic company introduction, so the visitor has to work out whether they are in the right place. Friction is every field, step and decision between arriving and enquiring. A form asking for eight pieces of information when the sales conversation only needs two will lose more people than it qualifies.",
        ],
        list: {
          title: "What a landing page has to do, in order",
          items: [
            "Confirm within a second that the visitor is in the right place for what the ad promised",
            "State the offer and who it is for in plain language, above the fold",
            "Remove every field, step and link that is not needed to enquire",
            "Answer the two or three objections that stop people asking",
            "Make the next step obvious, singular and low-commitment",
          ],
        },
      },
      {
        id: "lead-quality",
        heading: "How do you know which leads are worth having?",
        body: [
          "Cost per lead is a misleading metric on its own, because the cheapest leads are frequently the ones that never buy. The useful version is cost per qualified lead, and getting there requires feeding sales outcomes back into the advertising platform rather than treating the form submission as the finish line.",
          "In practice this means agreeing what a qualified lead looks like before the campaign starts, capturing enough in the form or the follow-up call to classify it, and then sending that classification back so the platform optimises toward the right people. This is the single highest-value piece of setup in a performance programme, and it is also the step most often skipped because it requires marketing and sales to agree on a definition.",
        ],
      },
      {
        id: "monthly",
        heading: "What does a monthly programme involve?",
        body: [
          "A steady month has four moving parts. Reporting that explains what happened against the previous period. Creative or copy refresh, because performance decays as audiences see the same message repeatedly. Landing page iteration on whichever page is underperforming. And a budget review that shifts spend toward what is working rather than defending last month's allocation.",
          "What it should not be is a monthly meeting where nobody changes anything. If a programme is not making at least one structural change a month — a new audience, a reallocated budget, a rebuilt page — it has stopped being a performance programme and become a subscription.",
        ],
      },
      {
        id: "when-not",
        heading: "When should you not spend on performance marketing?",
        body: [
          "Do not scale paid spend until you can handle the volume it produces and know what a lead is worth to you. Buying traffic into a business that cannot answer the phone, respond to an enquiry within a day, or deliver the work is the fastest way to spend money and damage your reputation at the same time.",
          "Do not use it to fix a positioning problem either. If people arrive and cannot quickly tell what you sell, who it is for and why you are different, no amount of additional traffic will resolve that — you will simply pay more for the same confusion. Positioning and page work come first; the media budget amplifies whatever is already there, including its weaknesses.",
        ],
      },
    ],
    process: [
      {
        step: "01",
        title: "Account and offer audit",
        body: "We review what is already running, what has been tried, what a customer is worth, and where the current bottleneck actually sits. Plenty of briefs that arrive as a media-buying problem turn out to be a page or follow-up problem.",
      },
      {
        step: "02",
        title: "Channel plan and measurement",
        body: "Two or three channels chosen for a stated reason, with a definition of a qualified lead agreed before anything launches, and conversion tracking verified end to end rather than assumed.",
      },
      {
        step: "03",
        title: "Creative and landing pages",
        body: "Ad creative, copy and matched landing pages produced together, because a campaign is one message delivered twice and the two halves have to agree with each other.",
      },
      {
        step: "04",
        title: "Run and learn",
        body: "Budget concentrated where the signal is, with a deliberate learning phase before drawing conclusions. We would rather tell you a channel is inconclusive than present noise as a trend.",
      },
      {
        step: "05",
        title: "Report and reallocate",
        body: "Monthly reporting against enquiries and qualified leads, with at least one structural change per month: a new audience, a reallocated budget, or a rebuilt page.",
      },
    ],
    metrics: [
      {
        label: "Cost per qualified lead",
        body: "Spend divided by leads that met the agreed definition, not by raw form submissions. The gap between the two is usually where the money is leaking.",
      },
      {
        label: "Conversion rate by page",
        body: "Which landing pages turn traffic into enquiries and which do not. This decides where the next round of work goes.",
      },
      {
        label: "Return on ad spend",
        body: "Revenue attributed to the channel against its cost, measured over a window long enough to capture the sales cycle rather than the same week.",
      },
      {
        label: "Speed to first contact",
        body: "How quickly an enquiry is answered. Response time moves close rates more than most creative changes, and it costs nothing to fix.",
      },
    ],
    fit: {
      goodFor: [
        "A business with a proven offer, existing customers and a way to handle more enquiries",
        "A company that knows roughly what a customer is worth and can fund a learning phase",
        "A team already spending on ads without a clear picture of what any of it returns",
        "A business needing consistent enquiry flow while organic visibility builds",
      ],
      notFor: [
        "A business that cannot respond to enquiries within a day — fix that first, it is free",
        "A brand whose positioning or page clarity is unresolved; paid traffic amplifies confusion",
        "A budget too small to produce enough conversions to learn from on any single channel",
      ],
    },
    stack: [
      "Google Ads",
      "Microsoft Ads",
      "Meta Ads",
      "LinkedIn Ads",
      "GA4",
      "Google Tag Manager",
      "Looker Studio",
      "Klaviyo",
      "HubSpot",
      "Hotjar",
      "Zapier",
    ],
    investment: {
      intro:
        "Media budget and management are separate numbers and should be quoted separately by anyone you talk to. These ranges describe the management side; the media budget is yours and is always paid directly to the platforms.",
      tiers: [
        {
          name: "Single channel",
          range: "One channel, focused",
          includes: [
            "Account audit and measurement setup",
            "One channel run properly with matched landing pages",
            "Creative and copy refreshed monthly",
            "Monthly reporting against qualified leads",
          ],
        },
        {
          name: "Multi-channel",
          range: "Two or three channels",
          includes: [
            "Everything in Single channel",
            "Budget allocation and reallocation across channels",
            "Retargeting and audience segmentation",
            "Landing page iteration on the weakest performer",
          ],
        },
        {
          name: "Full programme",
          range: "Paid plus lifecycle",
          includes: [
            "Everything in Multi-channel",
            "Email and CRM flows for existing contacts",
            "Sales feedback loop feeding platform optimisation",
            "Quarterly strategy review with revenue attribution",
          ],
        },
      ],
      note: "We will tell you if your budget is too small to run a channel properly. Running one badly is worse than not running it, because it produces confident-looking data that points the wrong way.",
    },
    faqs: [
      {
        question: "How much should I spend on ads each month?",
        answer:
          "Enough that each active channel produces a meaningful number of conversions rather than a handful. Work backwards from the enquiries you need and a realistic cost per enquiry, then either fund that or run fewer channels. A thin budget across many channels produces no reliable signal at all.",
      },
      {
        question: "How long before I see results?",
        answer:
          "Search campaigns on existing demand can show signal within days, though the first two weeks are usually a learning phase rather than a verdict. Social campaigns generally need several weeks of creative testing before the numbers stabilise. We will say plainly when a result is inconclusive rather than presenting early variance as a trend.",
      },
      {
        question: "Do you charge a percentage of ad spend?",
        answer:
          "We quote a fixed monthly fee against an agreed scope rather than a percentage of spend, because a percentage rewards spending more rather than spending well. Media budget is paid directly to the platforms by you, and you keep ownership of every account.",
      },
      {
        question: "Who owns the ad accounts?",
        answer:
          "You do, always. Accounts are created in your name and you retain admin access throughout. If you ever move on, the campaign history, audiences and conversion data stay with you — which is not true of every agency arrangement.",
      },
      {
        question: "Can you guarantee a cost per lead?",
        answer:
          "No, and be sceptical of anyone who does. Costs depend on your market, your offer, your competitors' spending and the quality bar you set for a lead. What we can commit to is a measurement setup you can trust and a clear account of where the money went.",
      },
      {
        question: "How do you handle leads once they arrive?",
        answer:
          "We deliver them to wherever your team works — email, CRM, a shared inbox or a messaging channel — with enough context to prioritise them. We will also flag if response times are costing conversions, because that is usually the cheapest fix available.",
      },
      {
        question: "Should I run ads while my website is being rebuilt?",
        answer:
          "Usually yes, pointed at landing pages rather than the site being rebuilt. Pausing everything during a rebuild typically costs more in lost momentum than the temporary page work costs to set up.",
      },
      {
        question: "What reporting will I get?",
        answer:
          "A monthly report covering spend, enquiries, cost per qualified lead and what changed against the previous period, plus what we are doing differently next month as a result. It is written to be read by whoever owns the budget, not to demonstrate activity.",
      },
    ],
    glossary: [
      {
        term: "Cost per qualified lead",
        definition:
          "Total spend divided by the number of enquiries that met an agreed definition of sales-ready. It is the honest version of cost per lead, which counts enquiries nobody can sell to.",
      },
      {
        term: "Return on ad spend (ROAS)",
        definition:
          "Revenue attributed to a campaign divided by what the campaign cost. It is only meaningful when measured over a window long enough to include the full sales cycle.",
      },
      {
        term: "Retargeting",
        definition:
          "Advertising shown only to people who have already interacted with your site or content. It is usually the highest-return budget in an account because the audience has already demonstrated interest.",
      },
      {
        term: "Learning phase",
        definition:
          "The period at the start of a campaign during which the advertising platform is still gathering enough conversion data to optimise delivery. Judging performance during this phase usually leads to the wrong conclusion.",
      },
      {
        term: "Message match",
        definition:
          "The degree to which a landing page's headline, offer and imagery agree with the advertisement that brought the visitor there. Weak message match is one of the most common causes of paid traffic failing to convert.",
      },
      {
        term: "Attribution window",
        definition:
          "The period after a click during which a later conversion is credited to that advertisement. Short windows undercount channels with long consideration periods and over-credit whichever channel sits closest to the sale.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  "search-engine-optimization": {
    updated: "September 2026",
    quickAnswer:
      "Search engine optimization makes a site easy for search engines to crawl, understand and rank, and worth ranking in the first place. It rests on three pillars — technical foundations, content that answers real queries, and references from other sites. Most meaningful movement takes three to six months.",
    keyFacts: [
      /* Labelled "time to meaningful movement" rather than "typical timeline"
         on purpose: the hero card already carries the engagement horizon from
         the registry ("6–12 months to compound"), and two different numbers
         under the same label read as a contradiction. They are different
         claims — the first milestone versus the full compounding window — and
         the label is what makes that clear. */
      { label: "Time to meaningful movement", value: "3–6 months" },
      {
        label: "Best for",
        value: "Businesses with a real offer and the patience for compounding results",
      },
      { label: "Three pillars", value: "Technical foundations, content, authority" },
      { label: "Measured on", value: "Qualified organic sessions and enquiries" },
      { label: "First wins", value: "Technical fixes, usually within weeks" },
      { label: "Compounding", value: "Ranked assets keep producing after the work stops" },
    ],
    definition: {
      term: "What is SEO, in plain terms?",
      body: [
        "Search engine optimization is the practice of making a website more likely to appear in search results for the queries its customers actually type, and more likely to be chosen once it appears. It has three parts that have to work together: technical foundations that let a search engine crawl and understand the site, content that answers what people are looking for, and references from elsewhere on the web that signal the site can be trusted.",
        "The common misconception is that SEO is a set of tricks applied to a finished website. In practice most of the leverage sits in decisions made before and during a build — page structure, heading hierarchy, how content renders, what each URL is allowed to say it is about — which is why retrofitting SEO onto a site that was built without it is slower and more expensive than getting it right the first time.",
      ],
    },
    sections: [
      {
        id: "how-long",
        heading: "How long does SEO take to work?",
        body: [
          "Technical fixes can show movement within weeks, particularly where the problem was that search engines could not crawl or understand pages at all. Content and authority take longer, and three to six months is a realistic horizon before organic traffic trends are clearly attributable to the work rather than to normal variance.",
          "Anyone promising first-page positions in thirty days is describing paid advertising, or a query nobody searches for. The honest shape of an SEO programme is a slow start, then compounding: early months produce little visible change while foundations and content are established, and later months produce disproportionate growth because each new asset benefits from the authority the previous ones accumulated.",
        ],
      },
      {
        id: "pillars",
        heading: "What are the three pillars of SEO?",
        body: [
          "Technical SEO is whether search engines can find, render and understand your pages. Content SEO is whether those pages answer what people are searching for better than the alternatives. Authority is whether other sites and sources point to you as a credible answer. Weakness in any one limits the other two.",
          "The dependency runs in a specific order, which is why the sequence matters. Content cannot rank on pages that cannot be crawled. Authority cannot help pages that do not target a real query. And neither compensates for a site that is slow enough that visitors leave before reading it — which is why speed sits inside the technical pillar rather than being treated as a separate concern.",
        ],
        list: {
          title: "The three pillars and what each covers",
          items: [
            "Technical — crawlability, indexing, site architecture, page speed, structured data, canonical tags, redirects",
            "Content — query research, page structure, heading hierarchy, depth, internal linking, freshness",
            "Authority — earned links, brand mentions, citations in the sources that answer engines trust",
          ],
        },
      },
      {
        id: "technical-first",
        heading: "Why is technical SEO usually the first priority?",
        body: [
          "Because content and authority are wasted on pages that search engines cannot properly access. The problems we find most often are not exotic: pages blocked by a stray robots rule, duplicate content competing with itself because canonical tags are missing, content that only appears after a script runs and is therefore invisible to a crawler, and a site architecture so deep that important pages are five clicks from the home page.",
          "Technical work is also the cheapest to fix and the easiest to verify, which makes it a sensible place to start for a reason beyond its importance. It produces concrete before-and-after evidence within weeks, so you can confirm the diagnosis was right before committing budget to the slower content and authority work.",
        ],
      },
      {
        id: "content",
        heading: "How do you decide what content to write?",
        body: [
          "Start from the queries your buyers type when they are close to a decision, then work outwards. The pages that produce enquiries are usually not the pages with the highest search volume. A phrase with a few hundred monthly searches and obvious commercial intent will out-earn one with tens of thousands of searches from people who are not buying anything.",
          "Group queries by the job behind them rather than by keyword string. One good page answering a complete question consistently outperforms five thin pages each covering a fragment, because the search engine has to choose one page per query and thin pages compete with each other for the same slot. Before writing anything, check whether an existing page should simply be improved instead of a new one created — that decision prevents most self-inflicted cannibalisation.",
        ],
      },
      {
        id: "aeo",
        heading: "What is AEO and how does it differ from SEO?",
        body: [
          "Answer engine optimization targets being the answer that gets extracted and read aloud, rather than one of ten links competing for a click. It matters because a growing share of searches now end without a visit to any website: the result page shows the answer directly, or an assistant states it in a sentence.",
          "The tactics overlap with SEO but the emphasis shifts. AEO rewards pages that answer a question in the first sentence under a heading phrased the way a person would ask it, that define their terms explicitly, that use question-and-answer structure with real questions, and that state facts in self-contained sentences which remain correct when lifted out of context. Vague introductions, throat-clearing and pronoun-heavy prose are invisible to an answer engine even when the underlying content is good.",
        ],
        comparison: {
          title: "SEO, AEO and GEO compared",
          intro:
            "Three related disciplines with different surfaces and different definitions of success. A page built only for one of them underperforms on the others.",
          columns: ["Discipline", "Optimises for", "Primary surface", "Success signal"],
          rows: [
            [
              "SEO",
              "Ranking in a list of links",
              "Search results pages",
              "Position, clicks, organic enquiries",
            ],
            [
              "AEO",
              "Being the extracted answer",
              "Featured snippets, answer boxes, voice",
              "Owning the answer, visibility without a click",
            ],
            [
              "GEO",
              "Being cited by a generative model",
              "AI assistants and AI-generated overviews",
              "Your brand named in a generated answer",
            ],
          ],
        },
      },
      {
        id: "geo",
        heading: "What is GEO and why does it matter now?",
        body: [
          "Generative engine optimization is the work of being cited when an AI system answers a question in your category. The mechanism is different from ranking: a generative model does not return a list of pages, it synthesises an answer from sources it considers reliable and names some of them. Being one of those named sources is the new visibility, and it is not automatically inherited from ranking well.",
          "What appears to earn citations is fairly consistent. Pages that state facts plainly and specifically, with numbers and named entities, are easier to quote than pages that hedge. Pages with clear definitions and structured comparisons get lifted more readily than narrative prose. Consistency of your entity across the web — the same description of what you do, in the same terms, on your own site and in directories and profiles — helps a model resolve you as a distinct thing rather than a name it half-recognises. And because models weigh sources they treat as authoritative, the authority work that SEO already required is now doing double duty.",
          "The practical implication is that the content on this page is written the way it is on purpose. Short declarative facts, explicit definitions, a comparison table, and a named glossary are all more extractable than the same information delivered as flowing prose.",
        ],
      },
      {
        id: "measurement",
        heading: "How do you measure SEO without fooling yourself?",
        body: [
          "Track qualified organic sessions and the enquiries they produce, not raw traffic. Organic traffic can rise comfortably while enquiries fall, if the growth is in informational queries from people who will never buy — and that pattern is common enough that traffic alone is a poor success metric.",
          "Set the baseline before you start, because almost every SEO report looks impressive against no baseline. Record current positions for the target queries, current organic entry pages, and current enquiry volume from organic. Then report the same three numbers monthly with the same definitions, so that a change means something. Be explicit about the things that move rankings for reasons outside your control — competitor activity, algorithm updates, seasonality, and the fact that search results now absorb clicks that used to reach websites.",
        ],
      },
    ],
    process: [
      {
        step: "01",
        title: "Technical audit",
        body: "Crawlability, indexation, architecture, page speed, structured data and canonical handling, checked against what is actually in the index rather than what the sitemap claims. This is where the quick wins usually are.",
      },
      {
        step: "02",
        title: "Query and intent research",
        body: "The queries your buyers use near a decision, grouped by the job behind them, mapped to pages that either already exist or need to. We say explicitly which existing pages should be improved instead of duplicated.",
      },
      {
        step: "03",
        title: "Foundations and fixes",
        body: "Technical remediation, on-page structure, internal linking and structured data, plus the answer-engine formatting — question-led headings, direct first sentences, explicit definitions — applied as the content is written rather than afterwards.",
      },
      {
        step: "04",
        title: "Content production",
        body: "Pages written to answer a complete question, with the extractable structure that AEO and GEO reward. Depth where it earns its place, and a clear decision not to publish pages that only exist to fill a keyword gap.",
      },
      {
        step: "05",
        title: "Authority and iteration",
        body: "Earning references from sources that matter in your sector, then reviewing what actually gained visibility and reinvesting there rather than spreading effort evenly.",
      },
    ],
    metrics: [
      {
        label: "Qualified organic sessions",
        body: "Organic visits landing on commercially relevant pages, rather than total organic traffic. The gap between the two is where vanity reporting lives.",
      },
      {
        label: "Organic enquiries",
        body: "Form submissions, calls and chats that began from organic search. This is the number the work exists to move.",
      },
      {
        label: "Query coverage",
        body: "How many of the target queries you appear for at all, before worrying about position. Moving from absent to page three is progress even though nobody sees it yet.",
      },
      {
        label: "Answer ownership",
        body: "How often your content is the extracted answer or the cited source in AI-generated responses, which increasingly matters more than position for informational queries.",
      },
    ],
    fit: {
      goodFor: [
        "A business with a real offer and a market that searches for what it sells",
        "A company willing to fund three to six months before judging results",
        "A site with technical problems suppressing content that is otherwise good",
        "A brand that wants visibility that keeps producing after the spending stops",
      ],
      notFor: [
        "A business needing enquiries next week — that is a paid channel's job",
        "A brand with no distinct offer, where the problem is positioning rather than visibility",
        "A category with genuinely no search demand, where the audience is reached socially instead",
      ],
    },
    stack: [
      "Google Search Console",
      "Bing Webmaster Tools",
      "Screaming Frog",
      "Ahrefs",
      "Semrush",
      "GA4",
      "Schema.org",
      "PageSpeed Insights",
      "Looker Studio",
      "Sitemap and llms.txt",
    ],
    investment: {
      intro:
        "Indicative ranges. SEO is unusual in that the first month is largely diagnostic, so the value of month one is a plan rather than traffic.",
      tiers: [
        {
          name: "Foundations",
          range: "Technical and on-page",
          includes: [
            "Full technical audit with prioritised fixes",
            "Indexation, architecture and speed remediation",
            "Structured data and answer-engine formatting",
            "Query map and a content plan",
          ],
        },
        {
          name: "Growth",
          range: "Foundations plus content",
          includes: [
            "Everything in Foundations",
            "Content production against the query map",
            "Internal linking and cannibalisation cleanup",
            "Monthly reporting against qualified organic enquiries",
          ],
        },
        {
          name: "Authority",
          range: "Growth plus citation work",
          includes: [
            "Everything in Growth",
            "Earning references from sector-relevant sources",
            "Entity consistency across profiles and directories",
            "Generative visibility tracking and iteration",
          ],
        },
      ],
      note: "We will not sell you SEO if your site cannot convert what it already receives. Fixing a page that loses enquiries is cheaper than buying more traffic to lose.",
    },
    faqs: [
      {
        question: "How long before I see results from SEO?",
        answer:
          "Technical fixes can show movement within weeks, especially where pages were not being crawled or understood at all. Content and authority typically need three to six months before the traffic trend is clearly attributable to the work rather than normal variance. Be sceptical of anyone promising first-page rankings in thirty days.",
      },
      {
        question: "What is the difference between SEO, AEO and GEO?",
        answer:
          "SEO targets ranking in a list of links. AEO targets being the single answer that gets extracted, in a featured snippet or a voice response. GEO targets being cited when a generative model writes an answer. They overlap heavily — the same technical foundations and content quality serve all three — but they optimise for different surfaces and are measured differently.",
      },
      {
        question: "Do I need a blog for SEO?",
        answer:
          "You need pages that answer what your buyers search for. Sometimes that is a blog, but just as often it is better service pages, comparison pages or genuinely useful resources. Publishing articles nobody searches for, or that have no path to a commercial page, is the most common way SEO budget is wasted.",
      },
      {
        question: "How much does SEO cost?",
        answer:
          "It varies widely with competition and how much remediation the site needs. What matters more than the headline figure is what the monthly fee actually buys: audits alone rarely move anything, and content alone cannot rank on a site that is technically broken. Ask for the split between diagnosis, fixes and production.",
      },
      {
        question: "Can you guarantee first-page rankings?",
        answer:
          "No. Nobody controls the ranking algorithm, and competitors are also working. What can be committed to is a documented diagnosis, work done to a stated standard, and honest reporting against a baseline recorded before anything started.",
      },
      {
        question: "Will AI search kill SEO?",
        answer:
          "It is changing it rather than ending it. AI-generated overviews absorb some clicks that used to reach websites, particularly for informational queries. That makes visibility in the generated answer itself more valuable, and it makes commercially-intent queries — where people still need to reach a real business — more important rather than less.",
      },
      {
        question: "Do you need access to my website to do this?",
        answer:
          "Yes, and to Google Search Console and analytics as well. Read access to Search Console is not optional, because it is the only reliable source for how search engines are actually treating your pages — what is indexed, what is excluded and why. It is also where you can independently verify everything we report.",
      },
      {
        question: "What happens if I stop?",
        answer:
          "Rankings decay gradually rather than collapsing, because the assets remain. Pages you have published and references you have earned keep working. What stops is the improvement, and competitors who continue will eventually overtake pages you have left static.",
      },
    ],
    glossary: [
      {
        term: "AEO (Answer Engine Optimization)",
        definition:
          "Optimising content to be selected as the single extracted answer — in a featured snippet, an answer box or a voice response — rather than to rank as one of several links. It favours question-led headings, direct first sentences and explicit definitions.",
      },
      {
        term: "GEO (Generative Engine Optimization)",
        definition:
          "Optimising to be cited as a source when a generative AI system writes an answer in your category. It rewards specific, quotable, self-contained statements, named entities and consistent descriptions of your business across the web.",
      },
      {
        term: "E-E-A-T",
        definition:
          "Experience, Expertise, Authoritativeness and Trustworthiness — the qualities search quality guidelines use to assess whether a source deserves to be treated as reliable on a topic. It is not a direct ranking factor but it shapes how content is evaluated.",
      },
      {
        term: "Canonical tag",
        definition:
          "An instruction telling search engines which URL is the authoritative version of a page when the same or similar content is reachable at more than one address. Missing or wrong canonicals cause pages to compete with themselves.",
      },
      {
        term: "Crawl budget",
        definition:
          "The amount of a site a search engine will crawl in a given period. It matters most on large or slow sites, where crawl effort spent on low-value URLs is effort not spent on pages that need indexing.",
      },
      {
        term: "Keyword cannibalisation",
        definition:
          "When two or more pages on the same site target the same query and split its ranking potential, so neither ranks as well as a single consolidated page would.",
      },
      {
        term: "Structured data",
        definition:
          "Machine-readable markup such as Schema.org that states explicitly what a page contains — a service, an article, a set of questions and answers. It helps both search engines and generative systems interpret the page correctly.",
      },
      {
        term: "Zero-click search",
        definition:
          "A search that ends without the user visiting any website, because the answer was shown directly in the results. Its growth is the main reason answer-engine and generative visibility now matter alongside ranking.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  "branding-business-optimization": {
    updated: "September 2026",
    quickAnswer:
      "Branding decides what a business stands for and makes it visible everywhere a customer meets it. Business optimization extends that into pricing, packaging and the customer journey. Together they make a business easier to choose, easier to describe and less dependent on competing on price.",
    keyFacts: [
      { label: "Typical timeline", value: "6–10 weeks for positioning and identity" },
      {
        label: "Best for",
        value: "Businesses that are hard to describe or that compete on price alone",
      },
      { label: "Deliverables", value: "Positioning, identity system, guidelines, journey" },
      { label: "Measured on", value: "Enquiry quality, average order value, referral rate" },
      { label: "Common trigger", value: "Growth has stalled or a rebrand is overdue" },
      { label: "Pairs well with", value: "A website rebuild, so both land together" },
    ],
    definition: {
      term: "What is branding, beyond a logo?",
      body: [
        "Branding is the sum of what a business is known for and how consistently it shows up. A logo is one artefact of that; the substance is the positioning underneath it — who the business is for, what it does that competitors do not, and why someone should choose it rather than the cheaper option.",
        "This is why a new logo rarely fixes a business that is hard to describe. If a customer cannot repeat what you do to somebody else in one sentence, no amount of visual polish resolves that, because the problem is upstream of the design. Branding work is mostly decision-making: choosing what to be known for, and accepting what that means turning away.",
      ],
    },
    sections: [
      {
        id: "price-competition",
        heading: "Why do businesses end up competing on price?",
        body: [
          "Almost always because the customer cannot see a difference worth paying for. When two suppliers describe themselves in the same generic terms — quality, service, years of experience — the only remaining variable is cost, and the buyer is left to choose on it. That is not a sales problem; it is a positioning problem that sales cannot solve.",
          "The way out is specificity. A business that says clearly who it is for, what it does and what it refuses to do gives a buyer something to compare. That is uncomfortable, because specificity means some prospects disqualify themselves. It also means the ones who remain are cheaper to convert and less likely to haggle, which is the entire point.",
        ],
      },
      {
        id: "positioning",
        heading: "What does a positioning project actually decide?",
        body: [
          "Four things, and they are decided in order because each constrains the next. Who the business serves — narrowly enough to be meaningful. What it does for them that matters. Why it is a better choice than the realistic alternatives, including doing nothing. And what it will deliberately not do, which is what makes the first three credible.",
          "The output is a short set of sentences the whole business can use, not a document nobody reads. If the positioning cannot be stated in a way a salesperson would actually say out loud on a call, it is not finished. This is also the material that feeds the website, the pitch, the job adverts and the social content, which is why positioning before design produces better design.",
        ],
        list: {
          title: "What a positioning statement has to settle",
          items: [
            "Who specifically this is for, and who it is not for",
            "The one problem it solves that the customer already knows they have",
            "Why it is a better choice than the obvious alternatives",
            "What it deliberately declines to offer, and why that is a strength",
            "The language customers use about the problem, so the copy sounds familiar",
          ],
        },
      },
      {
        id: "identity",
        heading: "What goes into an identity system?",
        body: [
          "An identity system is everything needed to make the brand look and sound like itself in a hundred small decisions nobody planned for. That means the logo in its variations, a colour palette with contrast checked against accessibility requirements, typefaces with a defined hierarchy, layout principles, photography and illustration direction, and a written voice guide with examples of what to say and what not to.",
          "The test of a system is whether someone who is not a designer can use it without producing something off-brand. Guidelines that only show the logo on a white background fail the moment the brand appears on a dark photograph, in a browser favicon, in an invoice footer or on a lanyard. We build systems against those real applications, because that is where consistency is actually won or lost.",
        ],
      },
      {
        id: "business-optimization",
        heading: "What does business optimization mean in practice?",
        body: [
          "It is the commercial half of the same work: making sure the way you package, price and deliver matches what the brand now promises. A premium positioning with entry-level pricing and an inconsistent customer journey is a contradiction the market resolves by not believing the positioning.",
          "In practice this covers how the offer is structured into packages, where the price points sit relative to competitors and to the value delivered, which parts of the customer journey create friction or anxiety, and what happens after the sale. It is unglamorous work, and it is frequently worth more than the visual identity, because pricing and packaging changes act on revenue immediately rather than gradually.",
        ],
      },
      {
        id: "when-to-rebrand",
        heading: "When should you rebrand?",
        body: [
          "Rebrand when the identity genuinely misrepresents what the business has become, or when it is actively costing you opportunities — for example, when you are routinely described as a cheaper, smaller or narrower operation than you are. Those are real reasons. Preferring a fresher look is not one.",
          "Rebranding carries a cost that is easy to underestimate: accumulated recognition, printed material, signage, vehicle livery, directory listings, search equity in a brand name, and the internal effort of teaching the whole team to use the new system. That cost is worth paying when the current identity is holding the business back, and not when the business is merely bored of it. If recognition is strong but execution has drifted, a refresh — tightening how the existing system is applied — is usually the better and much cheaper answer.",
        ],
        comparison: {
          title: "Refresh, rebrand or reposition?",
          intro:
            "The three are frequently conflated and have very different costs. Choose based on what is actually broken.",
          columns: ["Scope", "Choose it when", "Typical timeline", "What changes"],
          rows: [
            [
              "Refresh",
              "The identity works, but its execution has drifted",
              "2–4 weeks",
              "Visual consistency, templates, guidelines",
            ],
            [
              "Rebrand",
              "The identity no longer fits what the business is",
              "6–10 weeks",
              "Identity, voice and guidelines; name optionally",
            ],
            [
              "Reposition",
              "You are competing on the wrong thing entirely",
              "8–16 weeks",
              "Target, offer and pricing first, then identity",
            ],
          ],
        },
      },
    ],
    process: [
      {
        step: "01",
        title: "Discovery and interviews",
        body: "Conversations with the people who sell and the customers who buy, separately. What customers say about why they chose you is frequently different from what the business believes, and the gap between the two is where the useful insight sits.",
      },
      {
        step: "02",
        title: "Positioning",
        body: "The four decisions: who it is for, what it does for them, why it beats the alternatives, and what it declines to do. Agreed in writing before any visual work begins, because design cannot rescue unclear positioning.",
      },
      {
        step: "03",
        title: "Identity system",
        body: "Logo, palette with accessibility-checked contrast, type hierarchy, layout principles and imagery direction, plus a voice guide with real examples of the brand's language.",
      },
      {
        step: "04",
        title: "Application",
        body: "The system tested against the places it will actually appear — site, documents, invoices, social, signage, email — rather than only against a clean white background.",
      },
      {
        step: "05",
        title: "Guidelines and handover",
        body: "A practical guide your team and any future supplier can follow, with templates for the assets you produce most often, so consistency survives without a designer in the room.",
      },
    ],
    metrics: [
      {
        label: "Enquiry quality",
        body: "Whether the enquiries you receive are better fits, not just more numerous. Good positioning should reduce the volume of mismatched enquiries while improving the ones that matter.",
      },
      {
        label: "Average order value",
        body: "The clearest commercial signal that positioning and packaging are working, because it shows buyers accepting the value you claim.",
      },
      {
        label: "Referral rate",
        body: "How often existing customers bring new ones. People can only refer you if they can describe you, which makes this a direct measure of positioning clarity.",
      },
      {
        label: "Price resistance",
        body: "How early and how often discounting comes up in conversations. Persistent early discounting usually indicates the value story is not landing.",
      },
    ],
    fit: {
      goodFor: [
        "A business that is hard to describe in one sentence, even by its own team",
        "A company that keeps being compared on price rather than on fit",
        "A business that has outgrown an identity built for a smaller, different version of itself",
        "A team about to invest in a website, so both land at the same time",
      ],
      notFor: [
        "A business that only wants a new logo and is not open to changing the positioning underneath",
        "A company with a strong, well-executed brand that is merely tired of looking at it",
        "A project needing a visual refresh only — that is a smaller, faster piece of work",
      ],
    },
    stack: [
      "Figma",
      "Adobe Illustrator",
      "Adobe Photoshop",
      "After Effects",
      "Notion",
      "Typeform",
      "Maze",
      "Google Fonts",
      "Coolors",
      "Stark",
    ],
    investment: {
      intro:
        "Indicative ranges. Positioning work is the part that changes commercial outcomes; the identity is what makes it visible. We quote them separately so you can see which you are buying.",
      tiers: [
        {
          name: "Identity refresh",
          range: "Execution only",
          includes: [
            "Audit of current application and inconsistencies",
            "Refined palette, type and layout rules",
            "Updated templates for the assets you use most",
            "A practical guidelines document",
          ],
        },
        {
          name: "Positioning and identity",
          range: "The full brand build",
          includes: [
            "Discovery interviews and competitor review",
            "Positioning statement and messaging framework",
            "Complete identity system and voice guide",
            "Application across site, documents and social",
          ],
        },
        {
          name: "Positioning, identity and offer",
          range: "Brand plus commercial",
          includes: [
            "Everything in Positioning and identity",
            "Offer structure and package design",
            "Pricing review against value and competitors",
            "Customer journey mapping and friction removal",
          ],
        },
      ],
      note: "If the discovery work shows that a refresh is the honest answer rather than a full rebrand, we will say so. Recommending the smaller job is worth more to us than the larger invoice.",
    },
    faqs: [
      {
        question: "Do we need a new logo?",
        answer:
          "Frequently not. Many businesses asking for a rebrand have a workable identity that is applied inconsistently. A refresh that tightens the system is faster, cheaper and preserves recognition. We will tell you which of the two you actually need after the audit rather than assuming the larger scope.",
      },
      {
        question: "How long does a rebrand take?",
        answer:
          "Positioning and identity together typically run six to ten weeks. Projects that stretch well beyond that are usually waiting on internal decisions rather than on design work, which is why we insist on the positioning being signed off before visual work starts.",
      },
      {
        question: "Will a rebrand hurt our SEO?",
        answer:
          "Changing visual identity does not affect rankings. Changing your name or domain does, and needs a careful migration with redirects and updated citations. If a name change is on the table we plan the search side explicitly rather than treating it as a design detail.",
      },
      {
        question: "What is the difference between branding and marketing?",
        answer:
          "Branding decides what you are known for; marketing communicates it to people who do not know you yet. Marketing into unclear positioning is expensive because every campaign has to re-explain the business from scratch, and the results do not accumulate.",
      },
      {
        question: "How do you measure whether branding worked?",
        answer:
          "Through enquiry quality, average order value, referral rate and how early price resistance appears. It is slower and less precise than measuring a campaign, so we agree the baseline and the review window before starting rather than presenting a subjective verdict afterwards.",
      },
      {
        question: "Can you work with our existing brand guidelines?",
        answer:
          "Yes. If the guidelines are sound we work within them and extend them where digital needs something they do not cover, such as interactive states, motion or a data-visualisation palette. That is a smaller piece of work than a full rebrand.",
      },
      {
        question: "Do you do naming?",
        answer:
          "Yes, when it is genuinely needed. Naming is slow because it involves legal availability checks and domain availability, and the name that survives those filters is rarely the favourite. We will be direct about the cost and timeline before starting.",
      },
      {
        question: "What do we actually receive at the end?",
        answer:
          "Source files for every logo variation, an accessible colour palette with contrast ratios documented, licensed typefaces or alternatives, a voice guide with examples, application templates, and a guidelines document your team and future suppliers can follow.",
      },
    ],
    glossary: [
      {
        term: "Positioning",
        definition:
          "The decision about who a business serves, what it does for them, why it is a better choice than the realistic alternatives, and what it deliberately declines to do. Everything visual sits on top of this.",
      },
      {
        term: "Identity system",
        definition:
          "The complete set of visual and verbal rules — logo variations, palette, type hierarchy, layout principles, imagery direction and voice — that lets anyone produce on-brand work without a designer present.",
      },
      {
        term: "Brand refresh",
        definition:
          "Tightening the application of an existing identity without replacing it. Appropriate when recognition is strong but execution has drifted, and substantially cheaper than a rebrand.",
      },
      {
        term: "Repositioning",
        definition:
          "Changing who a business targets or what it sells to them, rather than how it looks. It is the deepest of the three changes and normally forces a new identity rather than the other way round.",
      },
      {
        term: "Value proposition",
        definition:
          "A single clear statement of the benefit a customer gets, written in their language rather than the business's. It is the sentence a salesperson should be able to say on a call without paraphrasing.",
      },
      {
        term: "Brand equity",
        definition:
          "The accumulated recognition and trust attached to a name and its visual marks. It is the main cost of a rebrand, because it has to be rebuilt rather than transferred.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  "social-media-management": {
    updated: "September 2026",
    quickAnswer:
      "Social media management is the ongoing work of publishing consistently in a voice that sounds like the business, on the platforms where its customers actually spend time. It covers planning, production, scheduling, community response and reporting against qualified reach and enquiries rather than follower count.",
    keyFacts: [
      { label: "Typical timeline", value: "Ongoing, reviewed monthly" },
      {
        label: "Best for",
        value: "Businesses with something worth showing and the capacity to respond",
      },
      { label: "Deliverables", value: "Strategy, calendar, production, scheduling, reporting" },
      { label: "Measured on", value: "Qualified reach and enquiries, not followers" },
      { label: "Typical cadence", value: "3–5 posts a week per active platform" },
      { label: "Minimum commitment", value: "Three months, so the content has time to be seen" },
    ],
    definition: {
      term: "What does social media management actually cover?",
      body: [
        "Social media management is the end-to-end running of a business's social presence: deciding which platforms are worth the effort, planning what to publish and when, producing the content, scheduling it, responding to comments and messages, and reporting on what actually reached people.",
        "It is not the same as posting. The part that produces results is the strategy above it — knowing who the content is for and what it is meant to achieve — and the community response below it, because an unanswered question in a comment thread is a lost enquiry that the competitor who replies will win. A schedule of posts published into silence is the most common way social budget is wasted.",
      ],
    },
    sections: [
      {
        id: "platforms",
        heading: "Which platforms are worth your time?",
        body: [
          "Choose the platforms where your customers already are and where you can realistically produce the format that platform rewards. That second condition is the one businesses skip, and it is the one that determines whether the effort produces anything.",
          "If you cannot produce video consistently, TikTok and Reels-led Instagram are the wrong choice regardless of how many of your customers use them, because the platform will not distribute what you publish. Two platforms run properly will outperform five run badly, and the discipline of saying no to the others is what makes that possible.",
        ],
        comparison: {
          title: "What each platform is actually for",
          intro:
            "Match the platform to the content you can genuinely sustain, not to the audience size it claims.",
          columns: ["Platform", "Best for", "Content that works", "Reality check"],
          rows: [
            [
              "Instagram",
              "Visual businesses and local discovery",
              "Reels, carousels, stories",
              "Demands consistent visual production",
            ],
            [
              "LinkedIn",
              "B2B, professional services, recruitment",
              "Insight posts, case studies, opinion",
              "Rewards a point of view, punishes sales copy",
            ],
            [
              "TikTok",
              "Reaching people who do not know you yet",
              "Native short video",
              "Needs volume and an unpolished register",
            ],
            [
              "Facebook",
              "Local services, community and events",
              "Groups, local and event content",
              "Organic reach is limited without spend",
            ],
            [
              "YouTube",
              "Demonstrating depth, long shelf life",
              "Tutorials and explainers",
              "Slow to build, durable once established",
            ],
          ],
        },
      },
      {
        id: "cadence",
        heading: "How often should you post?",
        body: [
          "Consistency beats frequency. Three well-made posts a week for a year will build more than a fortnight of daily posting followed by silence, because audiences and platform algorithms both respond to reliability rather than bursts.",
          "A realistic starting cadence for a small business is three to five posts a week on one primary platform, plus stories or short updates when there is something worth saying. If that feels like too much, the honest answer is to pick one platform and do it properly rather than spreading the same thin output across four.",
        ],
      },
      {
        id: "content-ideas",
        heading: "What do you post when you have nothing to say?",
        body: [
          "Most businesses have far more material than they realise. The work you did this week, the question a customer asked, the mistake you see competitors make, the thing you wish clients understood before starting — all of it is content, and all of it is more useful to an audience than a motivational quote.",
          "The practical approach is to build a small set of repeatable formats and rotate them, so you are never starting from a blank page. A format is a structure, not an idea: it tells you what to collect and how to shape it, which is what makes it sustainable. This is also how a business develops a recognisable voice, because the audience starts to know what to expect from you.",
        ],
        list: {
          title: "Repeatable formats that do not run out",
          items: [
            "A question a customer asked this week, and the answer you gave",
            "Before and after, with a note on what actually changed and why",
            "A common mistake in your sector, and what to do instead",
            "Something you changed your mind about, and what caused it",
            "A behind-the-scenes look at how a piece of work is actually made",
            "A short, specific piece of advice someone could act on today",
          ],
        },
      },
      {
        id: "video",
        heading: "Should you use video?",
        body: [
          "If you can sustain it, yes — video is what most platforms now prioritise, and it builds trust faster than any other format because people can see and hear how you actually operate. The barrier is production consistency rather than equipment; a phone, decent light and clear audio are genuinely sufficient.",
          "The mistake is treating video as a production project rather than a habit. Elaborate shoots produce a handful of polished videos that cannot be repeated weekly, and the channel goes quiet again. Simple, frequent, useful video consistently outperforms occasional high-production work for almost every business outside entertainment.",
        ],
      },
      {
        id: "measurement",
        heading: "How do you measure social without vanity metrics?",
        body: [
          "Follower count measures almost nothing. It can rise steadily while reach, engagement and enquiries all fall, because followers accumulated years ago may no longer see anything you publish. The useful measures are qualified reach — how many of the right people saw it — and the enquiries or site visits that followed.",
          "Set the baseline before starting and review monthly against it: reach, saves and shares (which indicate content worth returning to), profile visits, link clicks, and enquiries that mention social. Shares and saves are the most honest engagement signals because they require deliberate effort rather than a reflexive like, and they predict reach better than any other metric.",
        ],
      },
      {
        id: "in-house-or-agency",
        heading: "Should you run social in-house or through an agency?",
        body: [
          "The deciding factor is who has the raw material. Social content is made of what happens inside the business — the work, the conversations, the opinions of the people doing the job. If nobody internally is feeding that to whoever runs the account, the output drifts toward generic filler regardless of who is producing it.",
          "A workable split is for the business to supply the substance and the agency to handle strategy, production, scheduling and reporting. What does not work is outsourcing the account entirely and expecting the agency to invent a point of view on your behalf, because the result reads like a stranger describing your business — which is precisely what it is.",
        ],
      },
    ],
    process: [
      {
        step: "01",
        title: "Platform and audience decision",
        body: "Which platforms are worth the effort, based on where your customers are and which formats you can sustain. Saying no to the others is part of the deliverable.",
      },
      {
        step: "02",
        title: "Formats and voice",
        body: "A small set of repeatable formats and a written voice guide with real examples, so content production never starts from a blank page and the account sounds like the business.",
      },
      {
        step: "03",
        title: "Calendar and production",
        body: "A rolling monthly calendar, with content produced in batches so a busy week does not break the schedule. Captions, alt text and accessibility handled as standard.",
      },
      {
        step: "04",
        title: "Publish and respond",
        body: "Scheduled publishing plus monitoring and response, because an unanswered comment or message is a lost enquiry rather than a missed notification.",
      },
      {
        step: "05",
        title: "Report and adjust",
        body: "Monthly reporting against qualified reach and enquiries, with the formats that worked repeated and the ones that did not dropped rather than carried out of habit.",
      },
    ],
    metrics: [
      {
        label: "Qualified reach",
        body: "How many of the right people saw the content, which matters far more than total impressions across an audience you cannot sell to.",
      },
      {
        label: "Saves and shares",
        body: "The most honest engagement signals available, because both require deliberate action. They also predict future reach better than likes do.",
      },
      {
        label: "Enquiries attributed to social",
        body: "Messages, form submissions and calls that began on a social platform, which is the only figure that ties the work to revenue.",
      },
      {
        label: "Response time",
        body: "How quickly comments and direct messages are answered. It is free to improve and it converts directly, since the person asking is already interested.",
      },
    ],
    fit: {
      goodFor: [
        "A business with visual or genuinely useful work to show",
        "A company able to respond to messages and comments within a day",
        "A brand wanting to reach people who do not yet know it exists",
        "A business prepared to commit to at least three months of consistency",
      ],
      notFor: [
        "A business with nobody available to respond to the enquiries social generates",
        "A company expecting follower growth to translate directly into revenue",
        "A brand that wants volume of posts without any point of view behind them",
      ],
    },
    stack: [
      "Meta Business Suite",
      "Instagram",
      "LinkedIn",
      "TikTok",
      "YouTube",
      "Buffer",
      "Later",
      "Canva",
      "CapCut",
      "Notion",
    ],
    investment: {
      intro:
        "Indicative ranges. The largest variable is how much raw material the business supplies versus how much has to be produced from scratch, which is also the single biggest factor in whether the output sounds like you.",
      tiers: [
        {
          name: "One platform",
          range: "Primary channel, done properly",
          includes: [
            "Strategy and platform decision",
            "Rolling content calendar and formats",
            "Production and scheduling for one platform",
            "Monthly reporting against reach and enquiries",
          ],
        },
        {
          name: "Primary plus secondary",
          range: "Two platforms, adapted",
          includes: [
            "Everything in One platform",
            "A second platform with native adaptation, not cross-posting",
            "Community response and message triage",
            "Content batched from a monthly source session",
          ],
        },
        {
          name: "Full programme",
          range: "Multi-platform plus video",
          includes: [
            "Everything in Primary plus secondary",
            "Short-form video produced on a regular cadence",
            "Paid amplification of the strongest organic content",
            "Quarterly review tied to enquiry volume",
          ],
        },
      ],
      note: "We will not recommend four platforms if you can only sustain one. Underperforming accounts are worse than absent ones, because they signal a business that has stopped paying attention.",
    },
    faqs: [
      {
        question: "How often should we post?",
        answer:
          "Three to five times a week on one primary platform is a realistic and sustainable cadence for most small businesses. Consistency matters more than frequency: a steady three posts a week for a year will outperform a fortnight of daily posting followed by silence.",
      },
      {
        question: "Do you create the content or do we?",
        answer:
          "We handle production, but the substance has to come from inside your business — the work you did, the questions customers ask, the opinions of the people doing the job. Where a client has nothing to feed in, the output drifts toward generic filler regardless of who is producing it.",
      },
      {
        question: "Which platform should we start with?",
        answer:
          "Whichever one your customers actually use and you can produce the rewarded format for. That second condition matters as much as the first, because a platform will not distribute a format it does not favour no matter how good your intentions are.",
      },
      {
        question: "Will you reply to comments and messages?",
        answer:
          "Yes, as part of community management, with a clear escalation path for anything requiring your input. An unanswered comment is a lost enquiry rather than a missed notification, which is why response is treated as part of the work rather than an extra.",
      },
      {
        question: "Can you guarantee follower growth?",
        answer:
          "No, and follower growth is the wrong target anyway. Reach and enquiries are what matter, and both can improve substantially while follower count barely moves. An account can also gain thousands of followers who never see a post.",
      },
      {
        question: "Do you run paid social as well?",
        answer:
          "We can amplify your strongest organic content with paid budget, which usually performs better than advertising built from scratch because the organic response has already validated it. Full campaign management is covered under our marketing service.",
      },
      {
        question: "What do you need from us each month?",
        answer:
          "Roughly an hour: a short session to gather what has happened in the business, plus prompt approval on the calendar. Clients who supply material reliably get noticeably better content than those who do not.",
      },
      {
        question: "What happens if we want to stop?",
        answer:
          "You keep every account, the content library and the formats we built, and we hand over the calendar and templates. There is no proprietary tooling holding your presence hostage, and accounts are always in your name.",
      },
    ],
    glossary: [
      {
        term: "Organic reach",
        definition:
          "The number of people who see a post without any paid promotion. It is usually a fraction of a follower count, which is why follower numbers are a poor guide to whether social is working.",
      },
      {
        term: "Qualified reach",
        definition:
          "Reach measured among the audience that could actually buy from you, rather than total impressions. A smaller number of the right people seeing a post is worth more than a larger number of the wrong ones.",
      },
      {
        term: "Engagement rate",
        definition:
          "Interactions divided by reach or followers, expressed as a percentage. It is more useful for comparing your own posts over time than for comparing yourself against accounts of a different size.",
      },
      {
        term: "Saves",
        definition:
          "The number of people who bookmark a post to return to later. It is one of the strongest signals of content value, because it requires deliberate effort rather than a reflexive tap.",
      },
      {
        term: "Community management",
        definition:
          "Responding to comments, direct messages and mentions. It converts existing interest and is frequently the highest-return part of running a social account, because the person asking is already engaged.",
      },
      {
        term: "Short-form video",
        definition:
          "Vertical video, typically under a minute, produced for in-feed discovery on platforms such as Instagram, TikTok and YouTube Shorts. It is the format most platforms currently distribute most readily.",
      },
    ],
  },
};
