import Link from "next/link";
import PostCover from "./PostCover";
import Icon from "./Icons";
import { formatShortDate, getCategory, shortReadingTime } from "@/lib/blog";

/**
 * PostCard — the article card used on the home page, the blog index and in
 * "related posts" rows. One component, three densities, so cards never drift
 * out of sync with each other.
 */
export default function PostCard({ post, size = "default", className = "" }) {
  const category = getCategory(post.category);
  const accent = category?.accent ?? "#ff176e";
  const compact = size === "compact";

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0d0d13] transition duration-500 hover:-translate-y-1 hover:border-[#ff176e]/45 hover:shadow-[0_30px_70px_-30px_rgba(255,23,110,0.45)] ${className}`}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="flex h-full flex-col focus-visible:outline-none"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <PostCover
            post={post}
            className="absolute inset-0 h-full w-full transition duration-700 group-hover:scale-[1.04]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#0d0d13] via-transparent to-transparent"
          />
          <span
            className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] backdrop-blur-md"
            style={{ color: accent }}
          >
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: accent }}
            />
            {category?.short ?? "Insight"}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3
            className={`font-bold leading-snug text-white transition duration-300 group-hover:text-[#ff4b8f] ${
              compact ? "text-base" : "text-lg sm:text-xl"
            }`}
          >
            {post.title}
          </h3>

          {!compact && (
            <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-zinc-400">
              {post.description}
            </p>
          )}

          <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/[0.07] pt-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
            <span className="flex items-center gap-2 whitespace-nowrap">
              <Icon name="clock" className="h-3.5 w-3.5 text-subtle" />
              {shortReadingTime(post)}
            </span>
            <time
              dateTime={post.date}
              className="hidden whitespace-nowrap sm:inline"
            >
              {formatShortDate(post.date)}
            </time>
            <span className="flex items-center gap-1.5 whitespace-nowrap text-[#ff4b8f]">
              Read
              <Icon
                name="arrowRight"
                className="h-3.5 w-3.5 transition duration-300 group-hover:translate-x-1"
              />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
