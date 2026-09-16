import Link from "next/link";
import Icon from "./Icons";
import { blogHref } from "@/lib/blog";

/**
 * Pagination — URL-driven pager that preserves the active category.
 * Renders previous/next plus a numbered window, and a plain-language summary
 * of what is currently on screen.
 */
export default function Pagination({ page, totalPages, total, perPage, category }) {
  if (totalPages <= 1) {
    return (
      <p className="mt-10 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
        Showing all {total} {total === 1 ? "article" : "articles"}
      </p>
    );
  }

  const from = (page - 1) * perPage + 1;
  const to = Math.min(page * perPage, total);

  // A sliding window of up to five page numbers around the current page.
  const windowSize = 5;
  let start = Math.max(1, page - Math.floor(windowSize / 2));
  const end = Math.min(totalPages, start + windowSize - 1);
  start = Math.max(1, end - windowSize + 1);
  const numbers = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const linkBase =
    "btn-3d btn-3d--soft flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 text-sm font-bold";

  return (
    <nav
      aria-label="Blog pagination"
      className="mt-12 flex flex-col gap-5 border-t border-white/[0.07] pt-8 sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
        Showing{" "}
        <span className="font-mono text-zinc-300">
          {from}–{to}
        </span>{" "}
        of <span className="font-mono text-zinc-300">{total}</span>
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <Link
          href={blogHref({ category, page: page - 1 })}
          scroll={false}
          aria-disabled={page <= 1}
          tabIndex={page <= 1 ? -1 : undefined}
          className={`${linkBase} gap-1.5 ${
            page <= 1
              ? "btn-3d--flat pointer-events-none border-white/[0.05] text-zinc-700"
              : "btn-3d--outline border-white/10 text-zinc-300 hover:border-[#ff176e]/50 hover:text-white"
          }`}
        >
          <Icon name="chevronLeft" className="h-4 w-4" />
          <span className="hidden sm:inline">Prev</span>
        </Link>

        {start > 1 && (
          <>
            <Link
              href={blogHref({ category, page: 1 })}
              scroll={false}
              className={`${linkBase} btn-3d--outline border-white/10 text-zinc-300 hover:border-[#ff176e]/50 hover:text-white`}
            >
              1
            </Link>
            {start > 2 && (
              <span aria-hidden="true" className="px-1 text-subtle">
                …
              </span>
            )}
          </>
        )}

        {numbers.map((number) => {
          const isCurrent = number === page;
          return (
            <Link
              key={number}
              href={blogHref({ category, page: number })}
              scroll={false}
              aria-current={isCurrent ? "page" : undefined}
              className={`${linkBase} ${
                isCurrent
                  ? "btn-3d--pink border-transparent text-[#050507]"
                  : "btn-3d--outline border-white/10 text-zinc-300 hover:border-[#ff176e]/50 hover:text-white"
              }`}
            >
              {number}
            </Link>
          );
        })}

        {end < totalPages && (
          <>
            {end < totalPages - 1 && (
              <span aria-hidden="true" className="px-1 text-subtle">
                …
              </span>
            )}
            <Link
              href={blogHref({ category, page: totalPages })}
              scroll={false}
              className={`${linkBase} btn-3d--outline border-white/10 text-zinc-300 hover:border-[#ff176e]/50 hover:text-white`}
            >
              {totalPages}
            </Link>
          </>
        )}

        <Link
          href={blogHref({ category, page: page + 1 })}
          scroll={false}
          aria-disabled={page >= totalPages}
          tabIndex={page >= totalPages ? -1 : undefined}
          className={`${linkBase} gap-1.5 ${
            page >= totalPages
              ? "btn-3d--flat pointer-events-none border-white/[0.05] text-zinc-700"
              : "btn-3d--outline border-white/10 text-zinc-300 hover:border-[#ff176e]/50 hover:text-white"
          }`}
        >
          <span className="hidden sm:inline">Next</span>
          <Icon name="chevronRight" className="h-4 w-4" />
        </Link>
      </div>
    </nav>
  );
}
