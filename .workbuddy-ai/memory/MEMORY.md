# Loud Launchers — Project Notes

Next.js 16.3.4 (App Router, Turbopack) + React 19.2.8 (React Compiler ON) + Tailwind v4
(CSS-first `@theme`). Traps + QA live in skill `nextjs16-premium-site-build`. Hard rules:
`params`/`searchParams` are **Promises**; `priority` is deprecated on `next/image`;
`set-state-in-effect` **errors**.

## Edit the registry, never the pages
`src/lib/site.js` — `services`, `caseStudies`, `navLinks`, `stats` (short summary).
`src/lib/blog.js` — 9 categories, 20 posts, `POSTS_PER_PAGE = 6`.
`src/lib/service-content.js` — long-form service copy, joined to `site.js` on `slug`.
New entries propagate to nav, mega menu, footer, `/blog`, `/services`, `sitemap.js`, `llms.txt`
(a route handler — never hand-edit).

## Hard rules: headings and breaks
- **Never reuse the footer's CTA line.** `Footer.jsx` renders a CTA band on *every* page,
  `CtaSection.jsx` on 8 page types — shared wording is a duplicate `<h2>` by construction.
  Keep `CtaSection`'s defaults distinct, eyebrow included.
- **Every `<br />` needs `{" "}` after it.** JSX strips whitespace beside a newline, so
  `Text<br />more` gives `textContent` `"Textmore"` — what scrapers and answer engines read,
  while `innerText` hides it. Rendering is unchanged (a line-start space collapses). Verify by
  diffing the two.

## Contact details
`src/lib/site.js` only: `phone` E.164 (`+919468055396`), `phoneDisplay` grouped,
`whatsapp.number` digits only (`wa.me` needs that), `email` `info@loudlaunchers.com`.
**No postal address, no `geo`** — the old Boston one was invented and contradicted the +91
number. Schema is `"@type": "Organization"` with `contactPoint`, not `LocalBusiness`.
`areasServed` → chips (/contact, /about, footer = first 6) + JSON-LD. Mixed granularity
("Europe" is a continent) → type via `areasServedSchema()`, never inline `"@type":"Country"`.
India in `countries.js` is the dial-code picker — not a service claim.

## Leads — Resend via `/api/lead`
All four forms POST to `src/app/api/lead/route.js` → Resend → `LEAD_TO_EMAIL` in `.env`
(gitignored; `RESEND_API_KEY` blank). 400 bad body · 503 `not_configured` (→ `mailto:`) · 502
Resend error. **Validate the body before checking config**, or every case returns 503. Chat
script is `CHAT_STEPS` **as data** (`src/lib/lead.js`); server components can't open a client
modal, so `openLead()` → `ll:open-lead` → `LeadModal` in `layout.js`. `FloatingDock` owns the
bottom-right corner — never add another `fixed` element.

## ⚠️ `stats` + `caseStudies` are ILLUSTRATIVE DEMO DATA
Invented. User confirmed: keep for now, swap in real work later. Keep `period` and
`result.context` (`"48 → 127 per month"`), report **outcomes not deliverables**, one honest
caveat per `summary`.

## Metadata
Merges **shallowly** — a page's `openGraph` replaces the layout's *including `images`*, so
always use `og()`/`twitter()` from `src/lib/seo.js`. Blog is URL-driven (`?category=&page=`).
