import { site } from "@/lib/site";
import { posts } from "@/lib/posts";

export default function sitemap() {
  const staticPages = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "blog", priority: 0.9, changeFrequency: "weekly" },
    { path: "contact", priority: 0.8, changeFrequency: "monthly" },
  ].map((page) => ({
    url: `${site.domain}/${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const blogPages = posts.map((post) => ({
    url: `${site.domain}/blog/${post.slug}`,
    lastModified: new Date(`${post.date}T12:00:00Z`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}
