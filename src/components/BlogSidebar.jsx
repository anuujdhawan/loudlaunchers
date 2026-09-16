import Link from "next/link";
import Icon from "./Icons";
import LeadTrigger from "./LeadTrigger";
import {
  blogHref,
  categories,
  getCategory,
  getCategoryFacets,
  getTagsWithCounts,
} from "@/lib/blog";

/**
 * BlogSidebar — the category navigator.
 *
 * Categories come from the `categories` registry in lib/blog.js, so adding a
 * category there automatically adds a filter here, in the sitemap and in the
 * footer. Selection is URL-driven (`/blog?category=seo`) rather than local
 * state: filters are shareable, crawlable and work without JavaScript.
 *
 * Renders as two presentations of the same data — a sticky panel on desktop
 * and a scrollable chip rail on mobile — so nothing is hidden on small screens.
 */
export default function BlogSidebar({ activeCategory = "all", total }) {
  const facets = getCategoryFacets();
  const tags = getTagsWithCounts().slice(0, 10);
  const active = facets.find((facet) => facet.slug === activeCategory);
  const activeMeta = activeCategory === "all" ? null : getCategory(activeCategory);

  return (
    <>
      {/* ------------------------------------------------ mobile rail */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
            Browse by category
          </p>
          <span className="font-mono text-[10px] text-subtle">
            {String(total).padStart(2, "0")} articles
          </span>
        </div>
        <div className="thin-scrollbar -mx-5 mt-3 flex gap-2 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8">
          {facets.map((facet) => {
            const isActive = facet.slug === activeCategory;
            return (
              <Link
                key={facet.slug}
                href={blogHref({ category: facet.slug })}
                scroll={false}
                aria-current={isActive ? "true" : undefined}
                className={`btn-3d btn-3d--outline btn-3d--soft inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-bold ${
                  isActive
                    ? "border-[#ff176e]/60 bg-[#ff176e]/15 text-white"
                    : "border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:text-white"
                }`}
              >
                {facet.short}
                <span
                  className={`font-mono text-[10px] ${
                    isActive ? "text-[#ff4b8f]" : "text-subtle"
                  }`}
                >
                  {String(facet.count).padStart(2, "0")}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ----------------------------------------------- desktop panel */}
      <aside className="hidden lg:block">
        <div className="sticky top-28 grid gap-4">
          <nav
            aria-label="Blog categories"
            className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0b0b11]"
          >
            <div className="relative border-b border-white/[0.07] p-6">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#ff176e]/20 blur-3xl"
              />
              <p className="relative text-[10px] font-bold uppercase tracking-[0.24em] text-[#ff4b8f]">
                Categories
              </p>
              <p className="relative mt-3 text-sm leading-relaxed text-zinc-400">
                {activeMeta
                  ? activeMeta.description
                  : "Every playbook we've published, organised by the problem it solves."}
              </p>
            </div>

            <ul className="p-2.5">
              {facets.map((facet) => {
                const isActive = facet.slug === activeCategory;
                return (
                  <li key={facet.slug}>
                    <Link
                      href={blogHref({ category: facet.slug })}
                      scroll={false}
                      aria-current={isActive ? "true" : undefined}
                      className={`group relative flex items-center justify-between gap-3 rounded-xl px-3.5 py-3 text-sm transition duration-300 ${
                        isActive
                          ? "bg-white/[0.06] text-white"
                          : "text-zinc-400 hover:bg-white/[0.03] hover:text-white"
                      }`}
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <span
                          aria-hidden="true"
                          className={`h-1.5 w-1.5 shrink-0 rounded-full transition duration-300 ${
                            isActive ? "scale-125" : "opacity-60 group-hover:opacity-100"
                          }`}
                          style={{
                            backgroundColor: facet.accent ?? "#ff176e",
                          }}
                        />
                        <span className="truncate font-semibold">
                          {facet.name}
                        </span>
                      </span>
                      <span
                        className={`shrink-0 font-mono text-[11px] ${
                          isActive ? "text-[#ff4b8f]" : "text-subtle"
                        }`}
                      >
                        {String(facet.count).padStart(2, "0")}
                      </span>
                      {isActive && (
                        <span
                          aria-hidden="true"
                          className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-[#ff176e]"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-white/[0.07] px-6 py-4">
              <p className="text-[11px] leading-relaxed text-muted">
                New categories are added as we publish. Follow the monthly signal
                to hear first.
              </p>
            </div>
          </nav>

          {/* Popular topics */}
          <div className="rounded-[1.75rem] border border-white/10 bg-[#0b0b11] p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
              Popular topics
            </p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {tags.map(({ tag, count }) => (
                <li key={tag}>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.07] px-3 py-1.5 text-[11px] font-medium text-zinc-400">
                    {tag}
                    <span className="font-mono text-[10px] text-subtle">
                      {count}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sidebar CTA */}
          <div className="relative overflow-hidden rounded-[1.75rem] border border-[#ff176e]/25 bg-gradient-to-br from-[#1c0a14] to-[#0b0b11] p-6">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#ff176e]/25 blur-3xl"
            />
            <p className="relative text-[10px] font-bold uppercase tracking-[0.24em] text-[#ff4b8f]">
              Put this into practice
            </p>
            <p className="relative mt-4 text-base font-bold leading-snug text-white">
              Get a free launch plan built around your goals.
            </p>
            <LeadTrigger
              source="blog-sidebar"
              className="btn-3d btn-3d--white group relative mt-5 inline-flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-black text-black"
            >
              Start a project
              <Icon
                name="arrowUpRight"
                className="h-3.5 w-3.5 transition duration-300 group-hover:rotate-45"
              />
            </LeadTrigger>
          </div>
        </div>
      </aside>
    </>
  );
}

/** Number of categories currently registered — used for "how to extend" notes. */
export const categoryCount = categories.length;
