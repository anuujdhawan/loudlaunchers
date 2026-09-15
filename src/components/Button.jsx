import Link from "next/link";

/**
 * Button component used across pages.
 * variant: "primary" (solid pink) | "secondary" (white) | "outline" | "ghost"
 * href renders a next/link, otherwise a <button>.
 */
export default function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  arrow = true,
  ...props
}) {
  const base =
    "group inline-flex items-center justify-center gap-3 rounded-full font-bold transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-400 disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    primary:
      "bg-[#ff176e] text-white shadow-2xl shadow-pink-900/30 hover:-translate-y-0.5 hover:bg-[#ff3d88] hover:shadow-pink-600/25",
    secondary:
      "bg-white text-black hover:-translate-y-0.5 hover:bg-[#ff176e] hover:text-white",
    outline:
      "border border-white/20 text-white hover:-translate-y-0.5 hover:border-[#ff176e] hover:bg-[#ff176e]/10",
    ghost: "text-zinc-300 hover:text-white",
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
