import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import CtaSection from "@/components/CtaSection";
import JsonLd from "@/components/JsonLd";
import PostCover from "@/components/PostCover";
import PostCard from "@/components/PostCard";
/* `socialMeta` is only used by the commented-out Follow panel below, so the
   named import comes back with it: `import Icon, { socialMeta } from "@/components/Icons"` */
import Icon from "@/components/Icons";
import {
  categories,
  formatDate,
  getCategory,
  getOgImage,
  getPostBySlug,
  getRelatedPosts,
  posts,
  sortedPosts,
} from "@/lib/blog";
import { site } from "@/lib/site";
import { clamp, BRAND_SUFFIX_LENGTH, TITLE_LIMIT } from "@/lib/seo";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const category = getCategory(post.category);

  // The root layout appends " | Loud Launchers" to every title. On long
  // article titles that pushes past what search results display, so those
  // bypass the template with an absolute title instead of being truncated.
  const title =
    post.title.length + BRAND_SUFFIX_LENGTH > TITLE_LIMIT
      ? { absolute: post.title }
      : post.title;

  return {
    title,
    description: clamp(post.description),
    keywords: post.tags,
    authors: [{ name: `${site.name} Team`, url: site.domain }],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: clamp(post.description),
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      section: category?.name,
      tags: post.tags,
      authors: [site.name],
      images: [
        {
          url: getOgImage(post),
          width: 1200,
          height: 630,
          alt: `${post.title} — Loud Launchers`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: clamp(post.description),
      images: [getOgImage(post)],
    },
  };
}

/** Stable, readable anchor ids for the table of contents. */
function slugifyHeading(heading) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const category = getCategory(post.category);
  const related = getRelatedPosts(post.slug, 3);
  const index = sortedPosts.findIndex((item) => item.slug === post.slug);
  const previous = index > 0 ? sortedPosts[index - 1] : null;
  const next =
    index >= 0 && index < sortedPosts.length - 1 ? sortedPosts[index + 1] : null;
  const shareUrl = `${site.domain}/blog/${post.slug}`;

  const toc = post.sections.map((section) => ({
    id: slugifyHeading(section.heading),
    heading: section.heading,
  }));

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${site.domain}/blog/${post.slug}#article`,
    headline: post.title,
    description: post.description,
    image: [`${site.domain}${getOgImage(post)}`],
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    inLanguage: "en-US",
    author: {
      "@type": "Organization",
      name: site.name,
      url: site.domain,
    },
    publisher: { "@id": `${site.domain}/#organization` },
    mainEntityOfPage: `${site.domain}/blog/${post.slug}`,
    keywords: post.tags.join(", "),
    articleSection: category?.name,
    wordCount: post.sections.reduce(
      (total, section) =>
        total +
        section.body.join(" ").split(/\s+/).length +
        (section.bullets?.join(" ").split(/\s+/).length ?? 0),
      0,
    ),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["#quick-answer", "h1"],
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
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
      {
        "@type": "ListItem",
        position: 3,
        name: category?.name ?? "Article",
        item: `${site.domain}/blog?category=${post.category}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: post.title,
        item: shareUrl,
      },
    ],
  };

  const shareLinks = [
    {
      label: "LinkedIn",
      icon: "linkedin",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    },
    {
      label: "X",
      icon: "x",
      href: `https://x.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`,
    },
    {
      label: "Facebook",
      icon: "facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      label: "Email",
      icon: "mail",
      href: `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(shareUrl)}`,
    },
  ];

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />

      <article>
        {/* ------------------------------------------------ post hero */}
        <header className="relative overflow-hidden border-b border-white/10 px-5 pb-14 pt-36 sm:px-8 lg:px-12 lg:pb-16 lg:pt-44">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-40 -top-24 h-[32rem] w-[32rem] rounded-full blur-[120px]"
            style={{ backgroundColor: `${category?.accent ?? "#ff176e"}22` }}
          />
          <div
            aria-hidden="true"
            className="bg-grid pointer-events-none absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
          />

          <div className="relative mx-auto max-w-4xl">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted"
            >
              <Link href="/" className="transition hover:text-white">
                Home
              </Link>
              <span aria-hidden="true">/</span>
              <Link href="/blog" className="transition hover:text-white">
                Blog
              </Link>
              <span aria-hidden="true">/</span>
              <Link
                href={`/blog?category=${post.category}`}
                className="transition hover:text-white"
                style={{ color: category?.accent }}
              >
                {category?.name}
              </Link>
            </nav>

            <Reveal>
              <h1 className="mt-7 text-[clamp(2.1rem,4.6vw,3.75rem)] font-black leading-[1.02] tracking-[-0.045em] text-white">
                {post.title}
              </h1>

              <p className="mt-6 text-lg leading-relaxed text-zinc-400">
                {post.description}
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                <span className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] font-mono text-[10px] text-[#ff4b8f]">
                    LL
                  </span>
                  {site.name} Team
                </span>
                <span className="flex items-center gap-2">
                  <Icon name="clock" className="h-3.5 w-3.5" />
                  {post.readingTime}
                </span>
                <span className="flex items-center gap-2">
                  <Icon name="doc" className="h-3.5 w-3.5" />
                  {post.sections.length} sections
                </span>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>
            </Reveal>
          </div>
        </header>

        {/* ------------------------------------------------- cover art */}
        <div className="px-5 pt-10 sm:px-8 lg:px-12">
          <Reveal className="relative mx-auto aspect-[16/8] max-w-5xl overflow-hidden rounded-[2rem] border border-white/10">
            <PostCover
              post={post}
              className="absolute inset-0 h-full w-full"
            />
          </Reveal>
        </div>

        {/* ----------------------------------------- answer + article */}
        <div className="px-5 py-14 sm:px-8 lg:px-12">
          <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[16rem_minmax(0,1fr)_13rem] lg:gap-14">
            {/* TOC */}
            <aside className="hidden lg:block">
              <nav
                aria-label="On this page"
                className="sticky top-28 rounded-[1.5rem] border border-white/10 bg-[#0b0b11] p-5"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#ff4b8f]">
                  On this page
                </p>
                <ol className="mt-4 grid gap-1">
                  {toc.map((item, i) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="group flex gap-3 rounded-lg px-2 py-2 text-xs leading-snug text-zinc-400 transition hover:bg-white/[0.04] hover:text-white"
                      >
                        <span className="font-mono text-[10px] text-subtle group-hover:text-[#ff4b8f]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {item.heading}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      href="#faq"
                      className="group flex gap-3 rounded-lg px-2 py-2 text-xs leading-snug text-zinc-400 transition hover:bg-white/[0.04] hover:text-white"
                    >
                      <span className="font-mono text-[10px] text-subtle group-hover:text-[#ff4b8f]">
                        {String(toc.length + 1).padStart(2, "0")}
                      </span>
                      Frequently asked questions
                    </a>
                  </li>
                </ol>
              </nav>
            </aside>

            {/* Body */}
            <div className="min-w-0">
              {/* Quick answer — the AEO anchor */}
              <Reveal>
                <div
                  id="quick-answer"
                  className="relative overflow-hidden rounded-[1.75rem] border p-7 sm:p-9"
                  style={{
                    borderColor: `${category?.accent ?? "#ff176e"}55`,
                    background: `linear-gradient(140deg, ${category?.accent ?? "#ff176e"}18, #0b0b11 65%)`,
                  }}
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#ff4b8f]">
                    Quick answer
                  </p>
                  <p className="mt-4 text-lg font-medium leading-relaxed text-zinc-100">
                    {post.answer}
                  </p>
                </div>
              </Reveal>

              <div className="article-body mt-14">
                {post.sections.map((section, index) => (
                  <Reveal key={section.heading} delay={40}>
                    <section
                      id={slugifyHeading(section.heading)}
                      className={index > 0 ? "mt-14 scroll-mt-28" : "scroll-mt-28"}
                    >
                      <h2 className="flex items-start gap-3 text-2xl font-black tracking-[-0.02em] text-white sm:text-3xl">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-6 w-1 shrink-0 rounded-full"
                          style={{ backgroundColor: category?.accent ?? "#ff176e" }}
                        />
                        {section.heading}
                      </h2>

                      {section.body.map((paragraph, pIndex) => (
                        <p
                          key={pIndex}
                          className={pIndex === 0 ? "mt-5" : "mt-4"}
                        >
                          {paragraph}
                        </p>
                      ))}

                      {section.bullets && (
                        <ul className="mt-6 grid gap-2.5 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 sm:p-6">
                          {section.bullets.map((bullet) => (
                            <li
                              key={bullet}
                              className="flex items-start gap-3 text-sm leading-relaxed text-zinc-300"
                            >
                              <Icon
                                name="check"
                                className="mt-0.5 h-4 w-4 shrink-0 text-[#ff4b8f]"
                              />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      )}
                    </section>
                  </Reveal>
                ))}
              </div>

              {/* Key takeaways */}
              <Reveal className="mt-16 rounded-[1.75rem] border border-white/10 bg-[#0d0d13] p-7 sm:p-9">
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#ff4b8f]">
                  Key takeaways
                </p>
                <ul className="mt-5 grid gap-4">
                  {post.takeaways.map((takeaway) => (
                    <li
                      key={takeaway}
                      className="flex items-start gap-3 leading-relaxed text-zinc-300"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#ff176e]"
                      />
                      {takeaway}
                    </li>
                  ))}
                </ul>
              </Reveal>

              {/* Tags + share */}
              <Reveal className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-white/[0.07] pt-8">
                <ul className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <li key={tag}>
                      <span className="inline-flex rounded-full border border-white/10 px-3.5 py-2 text-[11px] font-semibold text-zinc-400">
                        #{tag}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                    Share
                  </span>
                  <ul className="flex items-center gap-1.5">
                    {shareLinks.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Share on ${link.label}`}
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-zinc-400 transition hover:-translate-y-0.5 hover:border-[#ff176e]/50 hover:text-white"
                        >
                          <Icon name={link.icon} className="h-3.5 w-3.5" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              {/* FAQ */}
              <Reveal className="mt-16 scroll-mt-28" id="faq">
                <h2 className="text-2xl font-black tracking-[-0.02em] text-white sm:text-3xl">
                  Frequently asked questions
                </h2>
                <div className="mt-7 grid gap-3">
                  {post.faq.map((item, i) => (
                    <details
                      key={item.question}
                      className="group rounded-2xl border border-white/10 bg-[#0d0d13] transition duration-300 open:border-[#ff176e]/40 open:bg-[#12070d]"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-bold text-white transition hover:text-[#ff4b8f] [&::-webkit-details-marker]:hidden">
                        <span className="flex items-start gap-4">
                          <span className="font-mono text-xs text-[#ff4b8f]">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="text-base sm:text-lg">
                            {item.question}
                          </span>
                        </span>
                        <span
                          aria-hidden="true"
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 transition duration-300 group-open:rotate-45 group-open:border-[#ff176e] group-open:text-[#ff176e]"
                        >
                          <Icon name="plus" className="h-4 w-4" />
                        </span>
                      </summary>
                      <p className="px-6 pb-6 pl-[4.25rem] leading-relaxed text-zinc-400">
                        {item.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </Reveal>

              {/* Author */}
              <Reveal className="mt-14 flex flex-col gap-5 rounded-[1.75rem] border border-white/10 bg-[#0b0b11] p-7 sm:flex-row sm:items-center">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-[#ff176e]/25 to-[#b356ff]/15 font-mono text-sm font-bold text-white">
                  LL
                </span>
                <div className="min-w-0">
                  <p className="font-bold text-white">{site.name} Team</p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    Written by the strategists, designers and engineers who run
                    client launches. Every playbook here is drawn from live work,
                    not theory.
                  </p>
                </div>
                <Button
                  href="/contact"
                  variant="outline"
                  size="sm"
                  className="shrink-0"
                >
                  Work with us
                </Button>
              </Reveal>
            </div>

            {/* Right rail */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 grid gap-4">
                <div className="rounded-[1.5rem] border border-white/10 bg-[#0b0b11] p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
                    Category
                  </p>
                  <Link
                    href={`/blog?category=${post.category}`}
                    className="mt-3 inline-flex items-center gap-2 text-sm font-bold transition hover:text-[#ff4b8f]"
                    style={{ color: category?.accent }}
                  >
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: category?.accent }}
                    />
                    {category?.name}
                  </Link>
                  <p className="mt-4 text-xs leading-relaxed text-muted">
                    {category?.description}
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-[#0b0b11] p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
                    All categories
                  </p>
                  <ul className="mt-4 grid gap-1">
                    {categories.map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={`/blog?category=${item.slug}`}
                          className={`flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs transition hover:bg-white/[0.04] hover:text-white ${
                            item.slug === post.category
                              ? "text-white"
                              : "text-muted"
                          }`}
                        >
                          <span
                            aria-hidden="true"
                            className="h-1 w-1 rounded-full"
                            style={{ backgroundColor: item.accent }}
                          />
                          {item.short}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* ----------------------------------------------------------
                    FOLLOW PANEL — commented out until real profile URLs exist.
                    `site.sameAs` still holds placeholder handles, so every icon
                    here is a dead link. To restore: re-add the named import
                    (`import Icon, { socialMeta } from "@/components/Icons"`) and
                    delete this comment wrapper.
                ----------------------------------------------------------

                <div className="rounded-[1.5rem] border border-white/10 bg-[#0b0b11] p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
                    Follow
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {site.sameAs.map((url) => {
                      const { icon, label } = socialMeta(url);
                      if (!icon) return null;
                      return (
                        <li key={url}>
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Loud Launchers on ${label}`}
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-zinc-400 transition hover:border-[#ff176e]/50 hover:text-white"
                          >
                            <Icon name={icon} className="h-3.5 w-3.5" />
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                */}
              </div>
            </aside>
          </div>
        </div>

        {/* ----------------------------------------- prev / next nav */}
        {(previous || next) && (
          <nav
            aria-label="More articles"
            className="border-t border-white/10 px-5 py-10 sm:px-8 lg:px-12"
          >
            <div className="mx-auto grid max-w-[1500px] gap-4 sm:grid-cols-2">
              {previous ? (
                <Link
                  href={`/blog/${previous.slug}`}
                  className="group flex flex-col rounded-[1.5rem] border border-white/10 bg-[#0d0d13] p-6 transition hover:border-[#ff176e]/45"
                >
                  <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                    <Icon name="chevronLeft" className="h-3.5 w-3.5" />
                    Newer article
                  </span>
                  <span className="mt-3 font-bold leading-snug text-white transition group-hover:text-[#ff4b8f]">
                    {previous.title}
                  </span>
                </Link>
              ) : (
                <span />
              )}
              {next && (
                <Link
                  href={`/blog/${next.slug}`}
                  className="group flex flex-col rounded-[1.5rem] border border-white/10 bg-[#0d0d13] p-6 text-right transition hover:border-[#ff176e]/45 sm:col-start-2"
                >
                  <span className="inline-flex items-center justify-end gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                    Older article
                    <Icon name="chevronRight" className="h-3.5 w-3.5" />
                  </span>
                  <span className="mt-3 font-bold leading-snug text-white transition group-hover:text-[#ff4b8f]">
                    {next.title}
                  </span>
                </Link>
              )}
            </div>
          </nav>
        )}

        {/* -------------------------------------------- related posts */}
        <section className="border-t border-white/10 px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
          <div className="mx-auto max-w-[1500px]">
            <Reveal className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ff4b8f]">
                  Keep going
                </p>
                <h2 className="mt-4 text-3xl font-black uppercase tracking-[-0.04em] text-white sm:text-4xl">
                  Keep <span className="text-[#ff176e]">reading.</span>
                </h2>
              </div>
              <Button href="/blog" variant="outline" arrow={false}>
                All articles
              </Button>
            </Reveal>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((relatedPost, i) => (
                <Reveal key={relatedPost.slug} delay={i * 70} className="h-full">
                  <PostCard post={relatedPost} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </article>

      {/* Distinct from both the blog index CTA and the footer band, which
          previously collided into two identical <h2> elements on this page.
          See the note in CtaSection.jsx. */}
      <CtaSection
        title={
          <>
            Let&apos;s apply this
            <br />{" "}
            to your <span className="text-[#ff176e]">business.</span>
          </>
        }
        lede="Reading is the easy part. Tell us where you are today and we'll tell you which of these moves applies to you first."
      />
    </>
  );
}
