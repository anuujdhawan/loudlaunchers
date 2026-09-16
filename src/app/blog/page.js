import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaSection from "@/components/CtaSection";
import JsonLd from "@/components/JsonLd";
import PostCard from "@/components/PostCard";
import PostCover from "@/components/PostCover";
import BlogSidebar from "@/components/BlogSidebar";
import Pagination from "@/components/Pagination";
import Icon from "@/components/Icons";
import {
  POSTS_PER_PAGE,
  blogHref,
  categories,
  formatDate,
  getCategory,
  getCategoryFacets,
  getPostsByCategory,
  paginate,
  sortedPosts,
} from "@/lib/blog";
import { site } from "@/lib/site";
import { clamp, og, twitter } from "@/lib/seo";

/* ------------------------------------------------------------------ */
/* Metadata — reflects the active category so filtered views index      */
/* as their own, distinct URLs rather than duplicates of /blog.         */
/* ------------------------------------------------------------------ */

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const slug = typeof params?.category === "string" ? params.category : "all";
  const category = slug === "all" ? null : getCategory(slug);
  const page = Number(params?.page) || 1;

  if (category) {
    const title = `${category.name} — Articles & Playbooks`;
    const description = `${category.description} Practical guides from the Loud Launchers team.`;
    return {
      title,
      description: clamp(description),
      alternates: {
        canonical: page > 1 ? `/blog?category=${category.slug}&page=${page}` : `/blog?category=${category.slug}`,
      },
      openGraph: og({
        title,
        description: clamp(description),
        path: `/blog?category=${category.slug}`,
      }),
      twitter: twitter({ title, description: clamp(description) }),
    };
  }

  const indexTitle = "Blog — Growth, SEO & AI Search Playbooks";
  const indexDescription =
    "Practical playbooks on websites, apps, SEO, AI search, branding, social and conversion from the Loud Launchers team — written to be useful, not just readable.";
  return {
    title: indexTitle,
    description: clamp(indexDescription),
    alternates: { canonical: page > 1 ? `/blog?page=${page}` : "/blog" },
    openGraph: og({
      title: indexTitle,
      description: clamp(indexDescription),
      path: "/blog",
    }),
    twitter: twitter({
      title: indexTitle,
      description: clamp(indexDescription),
    }),
  };
}

/* ------------------------------------------------------------------ */

export default async function BlogIndex({ searchParams }) {
  const params = await searchParams;
  const requested =
    typeof params?.category === "string" ? params.category : "all";
  const category = requested === "all" ? null : getCategory(requested);
  const activeCategory = category ? category.slug : "all";

  const filtered = getPostsByCategory(activeCategory);
  const result = paginate(filtered, params?.page, POSTS_PER_PAGE);
  const facets = getCategoryFacets();

  // The featured lead-in only appears on the unfiltered first page, so it
  // never competes with an active filter or repeats on later pages.
  const showFeature = activeCategory === "all" && result.page === 1;
  const featured = showFeature ? sortedPosts.find((post) => post.featured) : null;
  const gridPosts = featured
    ? result.items.filter((post) => post.slug !== featured.slug)
    : result.items;

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${site.domain}/blog#blog`,
    name: category ? `${category.name} — Loud Launchers Insights` : "Loud Launchers Insights",
    description: category
      ? category.description
      : "Practical playbooks on websites, apps, SEO, AI search, branding, social and conversion.",
    url: category ? `${site.domain}/blog?category=${category.slug}` : `${site.domain}/blog`,
    publisher: { "@id": `${site.domain}/#organization` },
    blogPost: filtered.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      url: `${site.domain}/blog/${post.slug}`,
      datePublished: post.date,
      dateModified: post.updated ?? post.date,
      image: `${site.domain}/blog/og/${post.slug}.png`,
      articleSection: getCategory(post.category)?.name,
      keywords: post.tags.join(", "),
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.domain },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${site.domain}/blog`,
      },
      ...(category
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: category.name,
              item: `${site.domain}/blog?category=${category.slug}`,
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <JsonLd data={blogSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* ------------------------------------------------------- hero */}
      <section className="relative overflow-hidden border-b border-white/10 px-5 pb-14 pt-36 sm:px-8 lg:px-12 lg:pb-20 lg:pt-44">
        <div
          aria-hidden="true"
          className="bg-grid pointer-events-none absolute inset-0 opacity-[0.4] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-24 h-[32rem] w-[32rem] rounded-full bg-[#b80852]/20 blur-[120px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-1/3 h-[26rem] w-[26rem] rounded-full bg-violet-700/12 blur-[120px]"
        />

        <div className="relative mx-auto max-w-[1500px]">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted"
          >
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className={category ? "" : "text-[#ff4b8f]"}>Blog</span>
            {category && (
              <>
                <span aria-hidden="true">/</span>
                <span className="text-[#ff4b8f]">{category.name}</span>
              </>
            )}
          </nav>

          <div className="mt-8 grid gap-12 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
            <Reveal>
              <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-[#ff4b8f]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#ff176e] opacity-75 motion-safe:animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff176e]" />
                </span>
                {category ? category.name : "The launch journal"}
              </p>
              <h1 className="mt-6 text-[clamp(2.6rem,6vw,5.25rem)] font-black uppercase leading-[0.88] tracking-[-0.055em] text-white">
                {category ? (
                  <>
                    {category.short} playbooks
                    <br />{" "}
                    that <span className="text-launch-gradient">compound.</span>
                  </>
                ) : (
                  <>
                    Insights that
                    <br />{" "}
                    move the <span className="text-launch-gradient">needle.</span>
                  </>
                )}
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-zinc-400">
                {category
                  ? category.description
                  : "Twenty practical playbooks on websites, apps, SEO, AI search, branding, social and conversion — the same thinking we bring to client launches."}
              </p>
            </Reveal>

            <Reveal delay={120} className="grid grid-cols-3 gap-4 lg:gap-6">
              {[
                { value: String(sortedPosts.length), label: "Articles" },
                { value: String(facets.length - 1), label: "Categories" },
                { value: "Monthly", label: "New drops" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 lg:p-5"
                >
                  <span className="block font-mono text-xl font-bold text-white lg:text-2xl">
                    {item.value}
                  </span>
                  <span className="mt-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                    {item.label}
                  </span>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- body */}
      <section className="px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-10 lg:grid-cols-[19rem_1fr] lg:gap-14">
            <BlogSidebar
              activeCategory={activeCategory}
              total={filtered.length}
            />

            <div className="min-w-0">
              {/* Active filter summary */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black uppercase tracking-[-0.02em] text-white sm:text-2xl">
                    {category ? category.name : "Latest articles"}
                  </h2>
                  <p className="mt-2 text-sm text-muted">
                    {result.total}{" "}
                    {result.total === 1 ? "article" : "articles"}
                    {category ? ` in ${category.name}` : " across every category"}
                    {result.totalPages > 1 &&
                      ` · page ${result.page} of ${result.totalPages}`}
                  </p>
                </div>
                {category && (
                  <Link
                    href="/blog"
                    scroll={false}
                    className="btn-3d btn-3d--outline btn-3d--soft group inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-xs font-bold text-zinc-300 hover:border-[#ff176e]/50 hover:text-white"
                  >
                    <Icon name="close" className="h-3.5 w-3.5" />
                    Clear filter
                  </Link>
                )}
              </div>

              {/* Featured lead — unfiltered first page only */}
              {featured && (
                <Reveal className="mt-8">
                  <Link
                    href={`/blog/${featured.slug}`}
                    className="group grid overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d0d13] transition duration-500 hover:border-[#ff176e]/50 hover:shadow-[0_40px_90px_-40px_rgba(255,23,110,0.5)] lg:grid-cols-[1.05fr_1fr]"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[22rem]">
                      <PostCover
                        post={featured}
                        className="absolute inset-0 h-full w-full transition duration-700 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="flex flex-col justify-center p-7 lg:p-12">
                      <p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff4b8f]">
                        <span className="rounded-full border border-[#ff176e]/40 bg-[#ff176e]/10 px-2.5 py-1">
                          Editor&apos;s pick
                        </span>
                        {getCategory(featured.category)?.name}
                      </p>
                      <h3 className="mt-5 text-2xl font-black leading-tight tracking-[-0.03em] text-white transition group-hover:text-[#ff4b8f] lg:text-3xl">
                        {featured.title}
                      </h3>
                      <p className="mt-4 leading-relaxed text-zinc-400">
                        {featured.answer}
                      </p>
                      <p className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                        <span>{formatDate(featured.date)}</span>
                        <span>{featured.readingTime}</span>
                        <span className="inline-flex items-center gap-1.5 text-[#ff4b8f]">
                          Read the playbook
                          <Icon
                            name="arrowRight"
                            className="h-3.5 w-3.5 transition duration-300 group-hover:translate-x-1"
                          />
                        </span>
                      </p>
                    </div>
                  </Link>
                </Reveal>
              )}

              {/* Card grid */}
              {gridPosts.length > 0 ? (
                <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {gridPosts.map((post, index) => (
                    <Reveal
                      key={post.slug}
                      delay={(index % 3) * 70}
                      className="h-full"
                    >
                      <PostCard post={post} />
                    </Reveal>
                  ))}
                </div>
              ) : (
                <div className="mt-8 rounded-[2rem] border border-white/10 bg-[#0d0d13] p-12 text-center">
                  <p className="text-lg font-bold text-white">
                    Nothing published here yet.
                  </p>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-400">
                    This category is ready and waiting — new articles drop
                    monthly. Browse everything in the meantime.
                  </p>
                  <Link
                    href="/blog"
                    className="btn-3d btn-3d--white mt-6 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-black text-black"
                  >
                    View all articles
                    <Icon name="arrowRight" className="h-4 w-4" />
                  </Link>
                </div>
              )}

              <Pagination
                page={result.page}
                totalPages={result.totalPages}
                total={result.total}
                perPage={result.perPage}
                category={activeCategory}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category explorer */}
      <section className="border-t border-white/10 px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ff4b8f]">
                Browse everything
              </p>
              <h2 className="mt-4 text-3xl font-black uppercase tracking-[-0.04em] text-white sm:text-4xl">
                Every <span className="text-[#ff176e]">category.</span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted">
              New categories are added as the library grows — each one gets its
              own filter, archive URL and sitemap entry automatically.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((item, index) => {
              const facet = facets.find((entry) => entry.slug === item.slug);
              return (
                <Reveal key={item.slug} delay={(index % 3) * 70}>
                  <Link
                    href={blogHref({ category: item.slug })}
                    scroll={false}
                    className="group flex h-full flex-col rounded-[1.75rem] border border-white/10 bg-[#0d0d13] p-6 transition duration-500 hover:-translate-y-1 hover:border-[#ff176e]/45"
                  >
                    <div className="flex items-start justify-between">
                      <span
                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]"
                        style={{ color: item.accent }}
                      >
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 32 32"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.3"
                          className="h-5 w-5"
                        >
                          <path d={item.iconPath} />
                        </svg>
                      </span>
                      <span className="font-mono text-xs text-subtle">
                        {String(facet?.count ?? 0).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-6 text-lg font-bold text-white transition group-hover:text-[#ff4b8f]">
                      {item.name}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">
                      {item.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-muted transition group-hover:text-[#ff4b8f]">
                      Browse
                      <Icon
                        name="arrowRight"
                        className="h-3.5 w-3.5 transition duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CtaSection
        title={
          <>
            Want this thinking
            <br />{" "}
            on your <span className="text-[#ff176e]">launch?</span>
          </>
        }
        lede="Every playbook here is a slice of how we work. Bring us your goal and we'll build the plan around it."
      />
    </>
  );
}
