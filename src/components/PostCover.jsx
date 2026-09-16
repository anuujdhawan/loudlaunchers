import { getCategory } from "@/lib/blog";

/**
 * PostCover — deterministic, brand-native cover art for an article.
 *
 * Rather than shipping twenty near-identical stock photos, each post gets a
 * generated SVG scene derived from its category accent and cover index. That
 * means: zero image bytes on the critical path, crisp at every density, unique
 * per post, and always on-brand. `variant` picks one of five compositions so a
 * grid of cards never looks repetitive.
 *
 * Renders as a plain server component — no client JavaScript involved, and no
 * loading hints are needed because the artwork is inline SVG, not a fetch.
 */
export default function PostCover({ post, className = "" }) {
  const category = getCategory(post.category);
  const accent = category?.accent ?? "#ff176e";
  const variant = ((post.cover ?? 1) - 1) % 5;
  const uid = post.slug.replace(/[^a-z0-9]/gi, "").slice(0, 24);
  const gridId = `grid-${uid}`;
  const glowId = `glow-${uid}`;
  const sweepId = `sweep-${uid}`;
  const maskId = `mask-${uid}`;

  return (
    <svg
      viewBox="0 0 640 400"
      role="img"
      aria-label={`${category?.name ?? "Insights"} cover art for “${post.title}”`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
    >
      <defs>
        <radialGradient id={glowId} cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.55" />
          <stop offset="60%" stopColor={accent} stopOpacity="0.08" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={sweepId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.9" />
          <stop offset="55%" stopColor="#ff5aa1" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#b356ff" stopOpacity="0.05" />
        </linearGradient>
        <pattern
          id={gridId}
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M40 0H0V40"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.055"
            strokeWidth="1"
          />
        </pattern>
        <radialGradient id={maskId} cx="50%" cy="45%" r="70%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0.15" />
        </radialGradient>
      </defs>

      {/* Base */}
      <rect width="640" height="400" fill="#0a0a10" />
      <rect width="640" height="400" fill={`url(#${gridId})`} />

      {/* Accent bloom, positioned differently per variant */}
      <g transform={variant % 2 === 0 ? "translate(470,110)" : "translate(170,290)"}>
        <circle r="230" fill={`url(#${glowId})`} />
      </g>

      {/* Composition */}
      {variant === 0 && (
        <>
          <circle
            cx="320"
            cy="200"
            r="120"
            fill="none"
            stroke={accent}
            strokeOpacity="0.5"
            strokeWidth="1.2"
          />
          <circle
            cx="320"
            cy="200"
            r="86"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.16"
            strokeWidth="1"
            strokeDasharray="4 8"
          />
          <circle
            cx="320"
            cy="80"
            r="6"
            fill={accent}
            opacity="0.95"
          />
          <circle cx="406" cy="243" r="3.5" fill="#ffffff" opacity="0.7" />
        </>
      )}

      {variant === 1 && (
        <>
          <path
            d="M0 330 L200 210 L330 268 L470 120 L640 60"
            fill="none"
            stroke={`url(#${sweepId})`}
            strokeWidth="3"
            strokeLinecap="round"
          />
          {[
            [200, 210],
            [330, 268],
            [470, 120],
            [640, 60],
          ].map(([cx, cy]) => (
            <circle
              key={`${cx}-${cy}`}
              cx={cx}
              cy={cy}
              r="5"
              fill="#0a0a10"
              stroke={accent}
              strokeWidth="2.5"
            />
          ))}
          <g stroke="#ffffff" strokeOpacity="0.06">
            {[110, 160, 210, 260, 310].map((y) => (
              <line key={y} x1="0" y1={y} x2="640" y2={y} />
            ))}
          </g>
        </>
      )}

      {variant === 2 && (
        <>
          {[0, 1, 2, 3, 4].map((i) => (
            <rect
              key={i}
              x={96 + i * 92}
              y={300 - i * 46}
              width="54"
              height={i * 46 + 46}
              rx="10"
              fill={accent}
              opacity={0.14 + i * 0.16}
            />
          ))}
          <line
            x1="60"
            y1="346"
            x2="580"
            y2="346"
            stroke="#ffffff"
            strokeOpacity="0.14"
          />
        </>
      )}

      {variant === 3 && (
        <>
          <rect
            x="150"
            y="90"
            width="340"
            height="220"
            rx="22"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.14"
          />
          <rect
            x="176"
            y="116"
            width="288"
            height="168"
            rx="14"
            fill={accent}
            opacity="0.1"
          />
          <path
            d="M176 168h288M176 214h180"
            stroke="#ffffff"
            strokeOpacity="0.16"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <circle cx="176" cy="240" r="10" fill={accent} opacity="0.85" />
          <circle cx="206" cy="240" r="10" fill="#ffffff" opacity="0.25" />
        </>
      )}

      {variant === 4 && (
        <>
          <g transform="translate(320,200)">
            <circle
              r="128"
              fill="none"
              stroke={accent}
              strokeOpacity="0.45"
              strokeWidth="1.2"
            />
            <ellipse
              rx="128"
              ry="52"
              fill="none"
              stroke="#ffffff"
              strokeOpacity="0.18"
            />
            <ellipse
              rx="52"
              ry="128"
              fill="none"
              stroke="#ffffff"
              strokeOpacity="0.12"
            />
            <circle r="14" fill={accent} opacity="0.9" />
          </g>
          <circle cx="128" cy="96" r="2.5" fill="#ffffff" opacity="0.6" />
          <circle cx="540" cy="312" r="2" fill={accent} opacity="0.8" />
          <circle cx="486" cy="82" r="1.8" fill="#ffffff" opacity="0.45" />
        </>
      )}

      {/* Category glyph watermark */}
      {category?.iconPath && (
        <g
          transform="translate(28,28) scale(1.35)"
          opacity="0.5"
          stroke="#ffffff"
          strokeWidth="1.1"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d={category.iconPath} />
        </g>
      )}

      {/* Index marker */}
      <text
        x="612"
        y="374"
        textAnchor="end"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fontSize="13"
        letterSpacing="2"
        fill="#ffffff"
        fillOpacity="0.4"
      >
        {String(post.cover ?? 1).padStart(2, "0")} / 20
      </text>

      {/* Bottom vignette so overlaid text stays legible */}
      <rect
        x="0"
        y="250"
        width="640"
        height="150"
        fill="#0a0a10"
        opacity="0.55"
      />
      <rect
        x="0"
        y="398"
        width="640"
        height="2"
        fill={accent}
        opacity="0.7"
      />
    </svg>
  );
}
