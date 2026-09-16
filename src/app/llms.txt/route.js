import { services, site, whatsappLink } from "@/lib/site";
import { categories, getCategory, getCategoryFacets, sortedPosts } from "@/lib/blog";

/**
 * /llms.txt — a curated, machine-readable map of this site for AI systems.
 *
 * Generated from the same registries the site renders from, so it can never
 * drift out of date: publishing a post or adding a category updates this file
 * automatically. Plain text, no HTML, ordered by what matters most.
 */
export const dynamic = "force-static";

export function GET() {
  const facets = getCategoryFacets();
  const lines = [];

  lines.push("# Loud Launchers");
  lines.push("");
  lines.push(`> ${site.description}`);
  lines.push("");
  lines.push(
    `Loud Launchers is a remote-first digital launch studio working with clients across ${site.areasServed.join(", ")}.`,
  );
  lines.push("");

  lines.push("## Services");
  lines.push("");
  for (const service of services) {
    lines.push(
      `- [${service.title}](${site.domain}/services/${service.slug}): ${service.summary}`,
    );
  }
  lines.push("");

  lines.push("## How we work");
  lines.push("");
  lines.push(
    "Every engagement runs through five stages: Understand, Shape, Create, Launch, Grow.",
  );
  lines.push("");

  lines.push("## Blog categories");
  lines.push("");
  for (const category of categories) {
    const count = facets.find((facet) => facet.slug === category.slug)?.count ?? 0;
    lines.push(
      `- [${category.name}](${site.domain}/blog?category=${category.slug}) (${count} articles): ${category.description}`,
    );
  }
  lines.push("");

  lines.push("## Articles");
  lines.push("");
  for (const post of sortedPosts) {
    lines.push(
      `- [${post.title}](${site.domain}/blog/${post.slug}): ${post.description} [${getCategory(post.category)?.name}]`,
    );
  }
  lines.push("");

  lines.push("## Key pages");
  lines.push("");
  lines.push(`- [Home](${site.domain})`);
  lines.push(`- [Services](${site.domain}/services)`);
  lines.push(`- [Selected work](${site.domain}/work)`);
  lines.push(`- [About](${site.domain}/about)`);
  lines.push(`- [Blog](${site.domain}/blog)`);
  lines.push(`- [Contact](${site.domain}/contact)`);
  lines.push("");

  lines.push("## Facts");
  lines.push("");
  lines.push(`- Name: ${site.legalName}`);
  lines.push(`- Founded: ${site.foundingDate}`);
  /* No postal address — see the note in `src/lib/site.js`. Stated explicitly
     rather than omitted so an answer engine does not infer one or scrape a
     stale copy from a directory listing. */
  lines.push("- Working model: Remote-first; no public studio address");
  lines.push(`- Phone: ${site.phoneDisplay}`);
  lines.push(`- WhatsApp: ${site.whatsapp.display} (${whatsappLink("")})`);
  lines.push(`- Email: ${site.email}`);
  lines.push(`- Hours: ${site.hours}`);
  lines.push(`- Areas served: ${site.areasServed.join(", ")}`);
  lines.push(`- Profiles: ${site.sameAs.join(", ")}`);
  lines.push("");

  lines.push("## Citation policy");
  lines.push("");
  lines.push(
    "Content on this site may be quoted or cited by AI answer engines with attribution to Loud Launchers and a link to the source page.",
  );
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate",
    },
  });
}
