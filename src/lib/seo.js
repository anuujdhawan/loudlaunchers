import { site } from "./site";

/**
 * Shared social-card metadata.
 *
 * Why this exists: Next.js merges metadata *shallowly*. A page that defines its
 * own `openGraph` object replaces the layout's entirely — including `images`.
 * Pages that set `openGraph: { title, description, url }` therefore shipped with
 * no og:image at all, so every share of those pages rendered a blank card.
 *
 * Always build page openGraph/twitter blocks through these helpers so the image
 * is carried along and the bug cannot come back.
 */

export const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Loud Launchers — Think it. Build it. Launch it.",
};

/**
 * Length of the brand suffix the root layout appends via `title.template`
 * (" | Loud Launchers"). Compare a page title against this to decide when it
 * should bypass the template with `{ absolute }` rather than be truncated in
 * search results.
 */
export const BRAND_SUFFIX_LENGTH = 17;

/** Roughly the character count search results display before truncating. */
export const TITLE_LIMIT = 62;

/** Build an openGraph block with the social image always attached. */
export function og({
  title,
  description,
  path,
  type = "website",
  image = OG_IMAGE.url,
  alt,
}) {
  return {
    type,
    locale: "en_US",
    url: path ? `${site.domain}${path}` : site.domain,
    siteName: site.name,
    title,
    description,
    images: [{ ...OG_IMAGE, url: image, alt: alt || title }],
  };
}

/** Build a matching twitter card block. */
export function twitter({ title, description, image = OG_IMAGE.url }) {
  return {
    card: "summary_large_image",
    title,
    description,
    images: [image],
  };
}

/**
 * Trim a string to a maximum length on a word boundary, for meta descriptions
 * and titles that would otherwise be truncated mid-sentence in search results.
 */
export function clamp(text, max = 158) {
  if (!text) return text;
  const clean = String(text).replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).replace(/[,;:.\u2014-]$/, "")}\u2026`;
}
