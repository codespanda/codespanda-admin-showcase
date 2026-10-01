import { Link } from "react-router-dom";
import { Bot, BrainCircuit, Cloud, Figma, GraduationCap, LayoutGrid, Paintbrush, Palette, Puzzle, Rocket, Sparkles } from "lucide-react";
import type { BlogPost } from "@/lib/blog-data";
import { cn } from "@/lib/utils";

const ICONS = { Sparkles, LayoutGrid, Palette, Rocket, Figma, Paintbrush, Bot, Puzzle, BrainCircuit, Cloud, GraduationCap };

export function formatPostDate(iso: string, month: "short" | "long" = "short") {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", { month, day: "numeric", year: "numeric" });
}

/** Cover art for a post: the real cover image, or the gradient + icon placeholder. */
export function PostCover({
  post,
  eager,
  className,
  imgClassName,
}: {
  post: BlogPost;
  eager?: boolean;
  className?: string;
  imgClassName?: string;
}) {
  const Icon = ICONS[post.icon];
  return (
    <div className={cn("relative overflow-hidden bg-soft-2", className)}>
      {post.coverImage ? (
        <img
          src={post.coverImage}
          alt={post.title}
          width={800}
          height={450}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
          decoding="async"
          className={cn("h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]", imgClassName)}
        />
      ) : (
        <div className={`flex h-full items-center justify-center bg-gradient-to-br ${post.gradient}`}>
          <Icon className="h-12 w-12 text-white/90" strokeWidth={1.5} aria-hidden />
        </div>
      )}
    </div>
  );
}

export function CategoryPill({ children, className }: { children: string; className?: string }) {
  return <span className={cn("rounded-md bg-blue-soft px-[9px] py-1 text-xs font-bold text-blue-ink", className)}>{children}</span>;
}

/** Grid card linking to a post. */
export function BlogCard({ post, eager }: { post: BlogPost; eager?: boolean }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-[18px] border border-border bg-card transition-[border-color,box-shadow] hover:border-line-2 hover:shadow-[0_10px_30px_-12px_rgba(14,23,38,0.18)]"
    >
      <PostCover post={post} eager={eager} className="aspect-video border-b border-border" />
      <div className="flex flex-1 flex-col gap-2.5 p-5 lg:p-6">
        <div className="flex items-center gap-2">
          <CategoryPill>{post.category}</CategoryPill>
          <span className="text-[13px] text-muted-foreground">{post.readTime}</span>
        </div>
        <h3 className="line-clamp-2 text-[19px] font-bold leading-[1.25] tracking-[-0.015em] transition-colors group-hover:text-link lg:text-xl">
          {post.title}
        </h3>
        <p className="line-clamp-2 text-[15px] leading-[1.55] text-muted-foreground">{post.excerpt}</p>
        <span className="mt-auto pt-2 text-[13px] font-medium text-muted-foreground">{formatPostDate(post.date)}</span>
      </div>
    </Link>
  );
}
