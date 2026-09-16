import { caseStudies, site, services } from "@/lib/site";
import { categories, posts, sortedPosts } from "@/lib/blog";

/**
 * Sitemap — every indexable URL on the site.
 *
 * Blog category archives are listed as their own entries because each one is
 * a distinct, canonically self-referencing page. Adding a category to the
 * registry in lib/blog.js adds it here automatically.
 *
 * Case-study detail pages are included too. They were missing for a while:
 * `caseStudies` simply was not imported, so the six strongest commercial proof
 * pages — live, linked from /work, and carrying their own schema — were never
 * submitted. When adding a new route type, check this file against the `page.js`
 * files under `src/app/`; the two drift silently because nothing links them.
 */
export default function sitemap() {
  const now = new Date();
  const newestPost = sortedPosts[0];
  // /blog changes whenever an article lands, so date it from the newest post
  // rather than duplicating the URL as a second entry.
  const blogUpdated = newestPost
    ? new Date(`${newestPost.date}T12:00:00Z`)
    : now;

  const staticPages = [
    { path: "", priority: 1, changeFrequency: "weekly", lastModified: now },
    { path: "services", priority: 0.9, changeFrequency: "monthly", lastModified: now },
    { path: "work", priority: 0.8, changeFrequency: "monthly", lastModified: now },
    { path: "about", priority: 0.7, changeFrequency: "monthly", lastModified: now },
    { path: "blog", priority: 0.9, changeFrequency: "weekly", lastModified: blogUpdated },
    { path: "contact", priority: 0.8, changeFrequency: "monthly", lastModified: now },
  ].map((page) => ({
    url: `${site.domain}/${page.path}`,
    lastModified: page.lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const servicePages = services.map((service) => ({
    url: `${site.domain}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const caseStudyPages = caseStudies.map((study) => ({
    url: `${site.domain}/work/${study.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  const categoryPages = categories.map((category) => ({
    url: `${site.domain}/blog?category=${category.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const blogPages = posts.map((post) => ({
    url: `${site.domain}/blog/${post.slug}`,
    lastModified: new Date(`${post.updated ?? post.date}T12:00:00Z`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...servicePages,
    ...caseStudyPages,
    ...categoryPages,
    ...blogPages,
  ];
}
