import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import CtaSection from "@/components/CtaSection";
import JsonLd from "@/components/JsonLd";
import { posts, getPostBySlug, getRelatedPosts, formatDate } from "@/lib/posts";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      authors: [site.name],
      images: [{ url: post.image, alt: post.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${site.domain}/blog/${post.slug}#article`,
    headline: post.title,
    description: post.description,
    image: `${site.domain}${post.image}`,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "en-US",
    author: {
      "@type": "Organization",
      name: site.name,
      url: site.domain,
    },
    publisher: { "@id": `${site.domain}/#organization` },
    mainEntityOfPage: `${site.domain}/blog/${post.slug}`,
    keywords: post.tags.join(", "),
    articleSection: post.category,
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
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: site.domain,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Insights",
        item: `${site.domain}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${site.domain}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />

      <article>
        {/* Post hero */}
        <header className="relative overflow-hidden border-b border-white/10 px-5 pb-14 pt-40 sm:px-8 lg:px-12 lg:pt-48">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-40 -top-24 -z-10 h-[30rem] w-[30rem] rounded-full bg-[#b80852]/20 blur-3xl"
          />
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <nav
                aria-label="Breadcrumb"
                className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500"
              >
                <Link href="/" className="transition hover:text-white">
                  Home
                </Link>
                <span aria-hidden="true">/</span>
                <Link href="/blog" className="transition hover:text-white">
                  Insights
                </Link>
                <span aria-hidden="true">/</span>
                <span className="text-[#ff4b8f]">{post.category}</span>
              </nav>
              <h1 className="mt-6 text-4xl font-black leading-[1.02] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                {post.title}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-zinc-400">
                {post.description}
              </p>
              <p className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ff176e]" />
                  {site.name} Team
                </span>
                <span>{formatDate(post.date)}</span>
                <span>{post.readingTime}</span>
              </p>
            </Reveal>
          </div>
        </header>

        {/* Cover image */}
        <div className="px-5 pt-12 sm:px-8 lg:px-12">
          <Reveal className="relative mx-auto aspect-[16/8] max-w-5xl overflow-hidden rounded-[2rem] border border-white/10">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 64rem"
              className="object-cover"
            />
          </Reveal>
        </div>

        {/* Quick answer box — the AEO anchor */}
        <div className="px-5 pt-12 sm:px-8 lg:px-12">
          <Reveal className="mx-auto max-w-3xl rounded-3xl border border-[#ff176e]/30 bg-[#160811] p-7 sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ff4b8f]">
              Quick answer
            </p>
            <p className="mt-4 text-lg font-medium leading-relaxed text-zinc-100">
              {post.answer}
            </p>
          </Reveal>
        </div>

        {/* Body */}
        <div className="px-5 py-14 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl">
            {post.sections.map((section, index) => (
              <Reveal key={section.heading} delay={40}>
                <section className={index > 0 ? "mt-12" : ""}>
                  <h2 className="text-2xl font-black tracking-[-0.02em] text-white sm:text-3xl">
                    {section.heading}
                  </h2>
                  {section.body.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className={`leading-relaxed text-zinc-400 ${
                        pIndex === 0 ? "mt-5" : "mt-4"
                      }`}
                    >
                      {paragraph}
                    </p>
                  ))}
                </section>
              </Reveal>
            ))}

            {/* Key takeaways */}
            <Reveal className="mt-14 rounded-3xl border border-white/10 bg-[#0d0d13] p-7 sm:p-9">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ff4b8f]">
                Key takeaways
              </p>
              <ul className="mt-5 grid gap-3">
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

            {/* Post FAQ */}
            <Reveal className="mt-14">
              <h2 className="text-2xl font-black tracking-[-0.02em] text-white sm:text-3xl">
                Frequently asked questions
              </h2>
              <div className="mt-7 grid gap-4">
                {post.faq.map((item) => (
                  <div
                    key={item.question}
                    className="rounded-2xl border border-white/10 bg-[#0d0d13] p-6"
                  >
                    <h3 className="font-bold text-white">{item.question}</h3>
                    <p className="mt-3 leading-relaxed text-zinc-400">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Tags */}
            <Reveal className="mt-12 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-zinc-400"
                >
                  #{tag}
                </span>
              ))}
            </Reveal>
          </div>
        </div>

        {/* Related posts */}
        <section className="border-t border-white/10 px-5 py-20 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-[1500px]">
            <Reveal className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="text-3xl font-black uppercase tracking-[-0.04em] text-white sm:text-4xl">
                Keep <span className="text-[#ff176e]">reading.</span>
              </h2>
              <Button href="/blog" variant="outline" arrow={false}>
                All insights
              </Button>
            </Reveal>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {related.map((relatedPost, index) => (
                <Reveal
                  key={relatedPost.slug}
                  delay={index * 80}
                  as="article"
                  className="group overflow-hidden rounded-[2rem] border border-white/10 bg-[#111116] transition duration-500 hover:-translate-y-1 hover:border-[#ff176e]/50"
                >
                  <Link
                    href={`/blog/${relatedPost.slug}`}
                    className="flex flex-1 flex-col"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ff4b8f]">
                        {relatedPost.category}
                      </p>
                      <h3 className="mt-2 font-bold leading-snug text-white transition group-hover:text-[#ff4b8f]">
                        {relatedPost.title}
                      </h3>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </article>

      <CtaSection />
    </>
  );
}
