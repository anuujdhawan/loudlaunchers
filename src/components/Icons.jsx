/**
 * Icons — a single source of truth for the SVG glyphs used across the site.
 * Every icon is a plain path drawn on a 24×24 grid with `currentColor`, so it
 * inherits colour from whatever it sits inside. Brand marks are filled; UI
 * glyphs are stroked.
 */

const STROKE = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const BRAND = { fill: "currentColor" };

const PATHS = {
  /* ---------------------------------------------------------- UI glyphs */
  arrowRight: { d: "M4 12h15M13 6l6 6-6 6" },
  arrowUpRight: { d: "M7 17L17 7M8 7h9v9" },
  arrowUp: { d: "M12 20V4M6 10l6-6 6 6" },
  chevronDown: { d: "M6 9l6 6 6-6" },
  chevronRight: { d: "M9 6l6 6-6 6" },
  chevronLeft: { d: "M15 6l-6 6 6 6" },
  menu: { d: "M4 8h16M4 16h16" },
  close: { d: "M6 6l12 12M18 6L6 18" },
  mail: { d: "M3 6h18v12H3zM3 7l9 6 9-6" },
  phone: {
    d: "M6 3h3l2 5-2.5 1.5a12 12 0 0 0 6 6L16 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2z",
  },
  pin: { d: "M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" },
  clock: { d: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3.5 2" },
  check: { d: "M4 12.5l5 5L20 6.5" },
  plus: { d: "M12 5v14M5 12h14" },
  minus: { d: "M5 12h14" },
  spark: { d: "M12 3l2.2 6.3L20.5 12l-6.3 2.2L12 20.5l-2.2-6.3L3.5 12l6.3-2.7z" },
  rocket: {
    d: "M13.5 4.5C16 2 19.5 2 21 2c0 1.5 0 5-2.5 7.5L15 13l-4-4zM11 9l-5 2-2 3 4 1M15 13l-2 5-3 2-1-4",
  },
  globe: { d: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c2.5 2.4 3.8 5.4 3.8 9S14.5 18.6 12 21c-2.5-2.4-3.8-5.4-3.8-9S9.5 5.4 12 3z" },
  search: { d: "M10.5 3a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15zM16 16l5 5" },
  layers: { d: "M12 3l9 5-9 5-9-5zM3 13l9 5 9-5M3 17l9 5 9-5" },
  shield: { d: "M12 3l8 3v6c0 4.5-3.3 8-8 9-4.7-1-8-4.5-8-9V6z" },
  gauge: { d: "M4 18a9 9 0 1 1 16 0M12 14l4-4" },
  doc: { d: "M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h4" },
  users: {
    d: "M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 20a6 6 0 0 1 12 0M16.5 11a3 3 0 1 0 0-6M17 20a6 6 0 0 0-2-4.5",
  },
  grid: { d: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" },
  book: { d: "M4 5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 0-2 2zM8 7h7M8 11h7" },
  send: { d: "M21 3L3 10l7 3 3 7z" },
  lock: { d: "M6 11V8a6 6 0 0 1 12 0v3M5 11h14v10H5z" },
  bolt: { d: "M13 2L4 14h6l-1 8 9-12h-6z" },
  target: { d: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 11.5a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1z" },
  chart: { d: "M4 20V10M10 20V4M16 20v-7M22 20H2" },
  play: { d: "M8 5l11 7-11 7z" },
  external: { d: "M14 4h6v6M20 4l-8 8M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" },
  chat: {
    d: "M12 3c4.97 0 9 3.36 9 7.5S16.97 18 12 18c-.86 0-1.69-.1-2.47-.28L5 20l1.1-3.3C4.79 15.5 3 13.65 3 10.5C3 6.36 7.03 3 12 3z",
  },
  pencil: { d: "M4 20h4L19 9l-4-4L4 16zM14 6l4 4" },

  /* -------------------------------------------------------- Brand marks */
  linkedin: {
    d: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05A4.2 4.2 0 0 1 16.6 8.7c3 0 4.4 1.9 4.4 5.2V21h-4v-6.2c0-1.5-.5-2.5-1.8-2.5-1.1 0-1.7.7-2 1.4-.1.2-.1.6-.1.9V21H9z",
    brand: true,
  },
  instagram: {
    d: "M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.22 1 .48 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c0 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c0-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4 1.3-.1 1.7-.1 4.9-.1zm0 3.2a6.6 6.6 0 1 0 0 13.2 6.6 6.6 0 0 0 0-13.2zm0 2.3a4.3 4.3 0 1 1 0 8.6 4.3 4.3 0 0 1 0-8.6zm6.9-.6a1.55 1.55 0 1 1-3.1 0 1.55 1.55 0 0 1 3.1 0z",
    brand: true,
  },
  x: {
    d: "M17.5 3h3.2l-7 8 8.2 10h-6.4l-5-6.1L4.7 21H1.5l7.5-8.6L1.2 3h6.6l4.5 5.6zM16.4 19h1.8L7.7 4.9H5.8z",
    brand: true,
  },
  facebook: {
    d: "M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z",
    brand: true,
  },
  youtube: {
    d: "M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4a2.5 2.5 0 0 0-1.8 1.8A26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15.2V8.8l5.4 3.2z",
    brand: true,
  },
  whatsapp: {
    d: "M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.97L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 4.54 0 8.23 3.7 8.23 8.24 0 4.54-3.69 8.23-8.23 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.22-.17-.47-.29z",
    brand: true,
  },
};

export const SOCIAL_ICONS = {
  "linkedin.com": "linkedin",
  "instagram.com": "instagram",
  "x.com": "x",
  "facebook.com": "facebook",
  "youtube.com": "youtube",
};

/** Resolves a social profile URL to its icon key + display label. */
export function socialMeta(url) {
  const host = url
    .replace(/^https?:\/\/(www\.)?/, "")
    .replace(/\/.*$/, "");
  const icon = SOCIAL_ICONS[host];
  const labels = {
    linkedin: "LinkedIn",
    instagram: "Instagram",
    x: "X",
    facebook: "Facebook",
    youtube: "YouTube",
  };
  return { icon, label: labels[icon] || host };
}

/** Renders a service's 32×32 icon path on a consistent stroke grid. */
export function ServiceGlyph({ path, className = "h-5 w-5", strokeWidth = 1.3 }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d={path} />
    </svg>
  );
}

export default function Icon({
  name,
  className = "h-5 w-5",
  strokeWidth,
  "aria-hidden": ariaHidden = true,
}) {
  const entry = PATHS[name];
  if (!entry) return null;
  const isBrand = entry.brand === true;
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden={ariaHidden}
      className={className}
      {...(isBrand
        ? BRAND
        : { ...STROKE, strokeWidth: strokeWidth ?? STROKE.strokeWidth })}
    >
      <path d={entry.d} />
    </svg>
  );
}
