/**
 * Generates a 1200×630 social card for every blog post.
 *
 * Run with:  node scripts/generate-og-images.mjs
 *
 * Why a script instead of runtime image generation: the cards are static
 * assets, so pre-rendering them keeps `next build` fast, keeps the response
 * free of image-generation cost, and means the OG tags point at real files
 * that any social crawler can fetch without executing anything.
 *
 * The artwork mirrors PostCover.jsx so a shared link looks like the card on
 * the site. Regenerate whenever posts are added or titles change.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { categories, getCategory, posts } from "../src/lib/blog.js";

const OUT_DIR = path.join(process.cwd(), "public", "blog", "og");
const WIDTH = 1200;
const HEIGHT = 630;

const esc = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** Greedy word wrap so titles never overflow the card. */
function wrap(text, maxChars) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    if (!line.length) {
      line = word;
    } else if (`${line} ${word}`.length <= maxChars) {
      line += ` ${word}`;
    } else {
      lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function cardSvg(post) {
  const category = getCategory(post.category);
  const accent = category?.accent ?? "#ff176e";
  const variant = ((post.cover ?? 1) - 1) % 5;
  const titleLines = wrap(post.title, 30).slice(0, 3);
  const titleSize = titleLines.length > 2 ? 62 : 72;

  const motifs = {
    0: `<circle cx="960" cy="230" r="150" fill="none" stroke="${accent}" stroke-opacity="0.5" stroke-width="2"/>
        <circle cx="960" cy="230" r="104" fill="none" stroke="#ffffff" stroke-opacity="0.16" stroke-width="1.5" stroke-dasharray="5 10"/>
        <circle cx="960" cy="80" r="8" fill="${accent}"/>`,
    1: `<path d="M640 520 L820 400 L920 448 L1050 300 L1200 250" fill="none" stroke="${accent}" stroke-opacity="0.75" stroke-width="4" stroke-linecap="round"/>
        <circle cx="820" cy="400" r="7" fill="#0a0a10" stroke="${accent}" stroke-width="3"/>
        <circle cx="1050" cy="300" r="7" fill="#0a0a10" stroke="${accent}" stroke-width="3"/>`,
    2: `<rect x="700" y="430" width="60" height="90" rx="12" fill="${accent}" opacity="0.28"/>
        <rect x="778" y="380" width="60" height="140" rx="12" fill="${accent}" opacity="0.45"/>
        <rect x="856" y="320" width="60" height="200" rx="12" fill="${accent}" opacity="0.62"/>
        <rect x="934" y="250" width="60" height="270" rx="12" fill="${accent}" opacity="0.8"/>`,
    3: `<rect x="760" y="180" width="340" height="240" rx="24" fill="none" stroke="#ffffff" stroke-opacity="0.16" stroke-width="2"/>
        <rect x="790" y="212" width="280" height="176" rx="14" fill="${accent}" opacity="0.14"/>
        <path d="M790 272h280M790 322h180" stroke="#ffffff" stroke-opacity="0.2" stroke-width="8" stroke-linecap="round"/>
        <circle cx="800" cy="374" r="12" fill="${accent}"/>`,
    4: `<circle cx="950" cy="300" r="140" fill="none" stroke="${accent}" stroke-opacity="0.5" stroke-width="2"/>
        <ellipse cx="950" cy="300" rx="140" ry="56" fill="none" stroke="#ffffff" stroke-opacity="0.2" stroke-width="1.5"/>
        <ellipse cx="950" cy="300" rx="56" ry="140" fill="none" stroke="#ffffff" stroke-opacity="0.13" stroke-width="1.5"/>
        <circle cx="950" cy="300" r="16" fill="${accent}"/>`,
  };

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <radialGradient id="bloom" cx="78%" cy="38%" r="62%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.5"/>
      <stop offset="60%" stop-color="${accent}" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="46" height="46" patternUnits="userSpaceOnUse">
      <path d="M46 0H0V46" fill="none" stroke="#ffffff" stroke-opacity="0.05" stroke-width="1"/>
    </pattern>
    <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#0a0a10" stop-opacity="0.96"/>
      <stop offset="58%" stop-color="#0a0a10" stop-opacity="0.82"/>
      <stop offset="100%" stop-color="#0a0a10" stop-opacity="0.1"/>
    </linearGradient>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="#0a0a10"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#grid)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bloom)"/>
  ${motifs[variant] ?? motifs[0]}
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#fade)"/>

  <!-- brand row -->
  <circle cx="80" cy="86" r="7" fill="${accent}"/>
  <text x="104" y="95" font-family="Helvetica, Arial, sans-serif" font-size="23" font-weight="700" letter-spacing="4.5" fill="#ffffff" fill-opacity="0.92">LOUD LAUNCHERS</text>

  <!-- category pill -->
  <rect x="76" y="146" rx="18" ry="18" width="${Math.min(
    470,
    74 + (category?.name.length ?? 8) * 12.2,
  )}" height="36" fill="${accent}" fill-opacity="0.16" stroke="${accent}" stroke-opacity="0.5"/>
  <text x="98" y="171" font-family="Helvetica, Arial, sans-serif" font-size="17" font-weight="700" letter-spacing="2.6" fill="${accent}">${esc(
    (category?.name ?? "Insights").toUpperCase(),
  )}</text>

  <!-- title -->
  ${titleLines
    .map(
      (line, index) =>
        `<text x="76" y="${268 + index * (titleSize + 6)}" font-family="Helvetica, Arial, sans-serif" font-size="${titleSize}" font-weight="700" letter-spacing="-2" fill="#ffffff">${esc(line)}</text>`,
    )
    .join("\n  ")}

  <!-- footer row -->
  <line x1="76" y1="536" x2="1124" y2="536" stroke="#ffffff" stroke-opacity="0.12"/>
  <text x="76" y="580" font-family="Helvetica, Arial, sans-serif" font-size="21" fill="#a1a1aa">${esc(
    post.readingTime,
  )}  ·  loudlaunchers.com</text>
  <text x="1124" y="580" text-anchor="end" font-family="monospace" font-size="19" letter-spacing="2" fill="#ffffff" fill-opacity="0.45">${String(
    post.cover ?? 1,
  ).padStart(2, "0")} / ${posts.length}</text>

  <rect x="0" y="${HEIGHT - 6}" width="${WIDTH}" height="6" fill="${accent}"/>
</svg>`;
}

/** The default social card used for the home page and any page without its own. */
function siteCardSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <radialGradient id="bloom" cx="76%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#ff176e" stop-opacity="0.45"/>
      <stop offset="55%" stop-color="#b356ff" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#b356ff" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="46" height="46" patternUnits="userSpaceOnUse">
      <path d="M46 0H0V46" fill="none" stroke="#ffffff" stroke-opacity="0.05" stroke-width="1"/>
    </pattern>
    <linearGradient id="mark" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ff176e"/>
      <stop offset="100%" stop-color="#b356ff"/>
    </linearGradient>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="#0a0a10"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#grid)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bloom)"/>

  <circle cx="980" cy="290" r="170" fill="none" stroke="#ff176e" stroke-opacity="0.45" stroke-width="2"/>
  <circle cx="980" cy="290" r="118" fill="none" stroke="#ffffff" stroke-opacity="0.14" stroke-width="1.5" stroke-dasharray="6 12"/>
  <circle cx="980" cy="120" r="9" fill="#ff176e"/>
  <circle cx="1088" cy="352" r="5" fill="#ffffff" fill-opacity="0.6"/>

  <circle cx="82" cy="90" r="8" fill="url(#mark)"/>
  <text x="108" y="99" font-family="Helvetica, Arial, sans-serif" font-size="24" font-weight="700" letter-spacing="5" fill="#ffffff" fill-opacity="0.92">LOUD LAUNCHERS</text>

  <text x="76" y="272" font-family="Helvetica, Arial, sans-serif" font-size="86" font-weight="700" letter-spacing="-3" fill="#ffffff">Think it. Build it.</text>
  <text x="76" y="366" font-family="Helvetica, Arial, sans-serif" font-size="86" font-weight="700" letter-spacing="-3" fill="#ff176e">Launch it.</text>

  <text x="76" y="446" font-family="Helvetica, Arial, sans-serif" font-size="25" fill="#a1a1aa">Websites · Apps · Marketing · SEO · Branding · Social</text>

  <line x1="76" y1="512" x2="1124" y2="512" stroke="#ffffff" stroke-opacity="0.12"/>
  <text x="76" y="560" font-family="Helvetica, Arial, sans-serif" font-size="21" fill="#71717a">Digital launch studio · Boston, MA · Working worldwide</text>
  <text x="1124" y="560" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="21" font-weight="700" fill="#ffffff" fill-opacity="0.75">loudlaunchers.com</text>

  <rect x="0" y="${HEIGHT - 6}" width="${WIDTH}" height="6" fill="url(#mark)"/>
</svg>`;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  /* PNG, not WebP, and deliberately so.
   *
   * These cards are consumed by social crawlers, never by a page visitor, so
   * they cost nothing in page weight and there is no performance reason to
   * change format. LinkedIn does not render WebP previews at all, so switching
   * these to WebP would silently break every LinkedIn share.
   *
   * `effort: 10` is the lever that matters. sharp's default effort produces
   * roughly 175 KB for these gradient-heavy 1200x630 cards; effort 10 gets the
   * same pixels into ~94 KB — a 46% saving, lossless, same format. */
  const PNG_OPTS = { compressionLevel: 9, effort: 10 };

  const results = await Promise.all(
    posts.map(async (post) => {
      const svg = cardSvg(post);
      const png = await sharp(Buffer.from(svg)).png(PNG_OPTS).toBuffer();
      await writeFile(path.join(OUT_DIR, `${post.slug}.png`), png);
      return { slug: post.slug, bytes: png.length };
    }),
  );

  const total = results.reduce((sum, item) => sum + item.bytes, 0);

  // Site-wide default card, used by the home page and any route without its own.
  const sitePng = await sharp(Buffer.from(siteCardSvg()))
    .png(PNG_OPTS)
    .toBuffer();
  await writeFile(path.join(process.cwd(), "public", "og.png"), sitePng);

  console.log(
    `Generated ${results.length} post cards (${(total / 1024).toFixed(0)} KB total) into public/blog/og/`,
  );
  console.log(`Generated site card (${(sitePng.length / 1024).toFixed(0)} KB) at public/og.png`);
  console.log(`Categories in registry: ${categories.length}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
