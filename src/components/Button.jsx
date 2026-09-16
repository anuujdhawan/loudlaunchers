"use client";

import Link from "next/link";
import { openLead } from "@/lib/lead";

/**
 * Button component used across pages.
 * variant: "primary" (solid pink) | "secondary" (white) | "outline" | "ghost"
 * href renders a next/link, otherwise a <button>.
 *
 * Pass `opensLead` to have the button raise the lead modal instead of
 * navigating — the default path for every "Start a project" call to action.
 * `leadSource` is recorded with the submission so you can see which CTA
 * converted. Server components can use these props freely: only the boolean
 * crosses the boundary, never a callback.
 *
 * The depth treatment lives in `globals.css` as the `.btn-3d` family, not here.
 * Each variant only names a palette; the recipe owns the background ramp, the
 * shadows, the hover lift, the press and the transition. Do NOT reintroduce
 * `shadow-*`, `transition` or `hover:-translate-y-*` utilities on these — two
 * owners for the same property is how one button ends up lifting twice.
 */
export default function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  arrow = true,
  opensLead = false,
  leadSource = "cta",
  ...props
}) {
  const base =
    "group inline-flex items-center justify-center gap-3 rounded-full font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-400 disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    primary: "btn-3d btn-3d--pink text-[#050507]",
    secondary: "btn-3d btn-3d--white text-black",
    outline:
      "btn-3d btn-3d--outline border border-white/20 text-white hover:border-[#ff176e] hover:bg-[#ff176e]/10",
    ghost: "btn-3d btn-3d--ghost text-zinc-300 hover:text-white",
  };

  const sizes = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-7 py-3.5 text-sm sm:text-base",
    lg: "px-8 py-4 text-base sm:text-lg",
  };

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black/20 text-current transition duration-300 group-hover:rotate-45 group-hover:bg-white/25">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-3.5 w-3.5"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      )}
    </>
  );

  if (opensLead) {
    return (
      <button
        type="button"
        onClick={() => openLead(leadSource)}
        className={classes}
        {...props}
      >
        {inner}
      </button>
    );
  }

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" className={classes} {...props}>
      {inner}
    </button>
  );
}
