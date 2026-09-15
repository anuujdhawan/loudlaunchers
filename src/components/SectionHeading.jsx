import Link from "next/link";

/**
 * SectionHeading — consistent eyebrow + title + lede used at the top of sections.
 * eyebrow: small pink kicker, title: React node (can include gradient span),
 * lede: optional supporting paragraph, align: "left" | "center".
 */
export default function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  as: Tag = "h2",
  className = "",
}) {
  const alignment =
    align === "center" ? "items-center text-center mx-auto" : "items-start";
  return (
    <div className={`flex max-w-3xl flex-col ${alignment} ${className}`}>
      {eyebrow && (
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ff4b8f]">
          {eyebrow}
        </p>
      )}
      <Tag className="mt-5 text-4xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
        {title}
      </Tag>
      {lede && (
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
          {lede}
        </p>
      )}
    </div>
  );
}

export function TextLink({ href, children, className = "" }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 font-bold text-white transition hover:text-[#ff4b8f] ${className}`}
    >
      {children}
      <span
        aria-hidden="true"
        className="transition duration-300 group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}
