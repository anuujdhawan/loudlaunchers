/**
 * FaqAccordion — native details/summary accordion (works without JS).
 * FAQPage JSON-LD is emitted separately by the page that owns the data.
 */
export default function FaqAccordion({ items, className = "" }) {
  return (
    <div className={`grid gap-3 ${className}`}>
      {items.map((item, index) => (
        <details
          key={item.question}
          className="group rounded-2xl border border-white/10 bg-[#0d0d13] transition duration-300 open:border-[#ff176e]/40 open:bg-[#12070d]"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-6 py-5 font-bold text-white transition hover:text-[#ff4b8f] [&::-webkit-details-marker]:hidden">
            <span className="flex items-start gap-4">
              <span className="font-mono text-xs text-[#ff4b8f]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-base sm:text-lg">{item.question}</h3>
            </span>
            <span
              aria-hidden="true"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-lg leading-none transition duration-300 group-open:rotate-45 group-open:border-[#ff176e] group-open:text-[#ff176e]"
            >
              +
            </span>
          </summary>
          <p className="px-6 pb-6 pl-[4.25rem] leading-relaxed text-zinc-400">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
