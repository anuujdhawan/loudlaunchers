import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CtaSection from "@/components/CtaSection";
import JsonLd from "@/components/JsonLd";
import { posts, formatDate } from "@/lib/posts";
import { site } from "@/lib/site";

export const metadata = {
  title: "Insights — Digital Growth, SEO & Marketing Blog",
  description:
    "Practical guides on websites, apps, SEO, answer engine optimization, GEO and digital marketing from the Loud Launchers team. Written to be useful, not just readable.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Insights — Digital Growth, SEO & Marketing Blog | Loud Launchers",
    description:
      "Practical guides on websites, apps, SEO, AEO, GEO and digital marketing from the Loud Launchers team.",
    url: "/blog",
    type: "website",
  },
};

export default function BlogIndex() {
  const [hero, ...rest] = posts;

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${site.domain}/blog#blog`,
    name: "Loud Launchers Insights",
    description:
      "Practical guides on websites, apps, SEO, AEO, GEO and digital marketing.",
    url: `${site.domain}/blog`,
    publisher: { "@id": `${site.domain}/#organization` },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      url: `${site.domain}/blog/${post.slug}`,
      datePublished: post.date,
      image: `${site.domain}${post.image}`,
    })),
  };

  return (
    <>
      <JsonLd data={blogSchema} />
      <PageHero
        eyebrow="The launch journal"
        title={
          <>
            Insights that
            <br />
            move the <span className="text-[#ff176e]">needle.</span>
          </>
        }
        lede="Guides and playbooks on websites, apps, SEO, answer engines and growth — the same thinking we bring to client launches."
      />

      <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1500px]">
          {/* Featured post */}
          <Reveal>
            <Link
              href={`/blog/${hero.slug}`}
              className="group grid overflow-hidden rounded-[2rem] border border-white/10 bg-[#111116] transition duration-500 hover:border-[#ff176e]/50 lg:grid-cols-2"
            >
              <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[24rem]">
                <Image
                  src={hero.image}
                  alt={hero.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center p-8 lg:p-14">
                <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#ff4b8f]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ff176e]" />
                  Featured · {hero.category}
                </p>
                <h2 className="mt-4 text-3xl font-black leading-tight tracking-[-0.03em] text-white transition group-hover:text-[#ff4b8f] lg:text-4xl">
                  {hero.title}
                </h2>
                <p className="mt-4 leading-relaxed text-zinc-400">
                  {hero.answer}
                </p>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  {formatDate(hero.date)} · {hero.readingTime}
                </p>
              </div>
            </Link>
          </Reveal>

          {/* Rest of the posts */}
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {rest.map((post, index) => (
              <Reveal
                key={post.slug}
                delay={(index % 3) * 80}
                as="article"
                className="group flex flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#111116] transition duration-500 hover:-translate-y-1 hover:border-[#ff176e]/50"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex flex-1 flex-col"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ff4b8f]">
                      {post.category}
                    </p>
                    <h2 className="mt-3 text-xl font-bold leading-snug text-white transition group-hover:text-[#ff4b8f]">
                      {post.title}
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">
                      {post.description}
                    </p>
                    <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                      {formatDate(post.date)} · {post.readingTime}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title={
          <>
            Want this thinking
            <br />
            on your <span className="text-[#ff176e]">launch?</span>
          </>
        }
        lede="Every guide on this page is a slice of how we work. Bring us your goal and we will build the plan around it."
      />
    </>
  );
}
