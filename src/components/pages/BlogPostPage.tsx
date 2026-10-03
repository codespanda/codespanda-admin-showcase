import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft, ArrowRight, ArrowUpRight, ChevronRight, Figma, LayoutGrid, Palette, LayoutTemplate, Shapes, Layers,
  Accessibility, Type, Lightbulb, Component, type LucideIcon,
} from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { BlogCard, CategoryPill, PostCover, formatPostDate } from "@/components/site/BlogCard";
import { StartProjectDialog } from "@/components/site/StartProjectDialog";
import { getBlogPostBySlug, BLOG_POSTS, type BlogPost } from "@/lib/blog-data";
import { postSeo, seoTitle } from "@/lib/seo";

const RESOURCE_ICONS: Record<string, LucideIcon> = {
  Figma, LayoutGrid, LayoutTemplate, Shapes, Layers, Accessibility, Type, Palette, Lightbulb, Component,
};

function headingId(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

/** "## " headings in the post body, for the table of contents. */
function headingsOf(text: string) {
  return text
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter((b) => b.startsWith("## "))
    .map((b) => b.replace(/^##\s*/, ""));
}

/** Clickable cards with real outbound links, shown above the article body when a post defines resourceLinks. */
function ResourceLinksGrid({ links }: { links: NonNullable<BlogPost["resourceLinks"]> }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-[22px] font-bold tracking-[-0.02em] lg:text-2xl">Quick links</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {links.map((r) => {
          const Icon = RESOURCE_ICONS[r.icon] ?? Shapes;
          return (
            <a
              key={r.title}
              href={r.url}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex items-start gap-3.5 rounded-[16px] border border-border bg-card p-4 transition-colors hover:border-link"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-blue-soft text-link">
                <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden />
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="flex items-center gap-1.5 text-[15px] font-semibold">
                  {r.title}
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-link" aria-hidden />
                </span>
                <span className="text-[13px] leading-[1.5] text-muted-foreground">{r.description}</span>
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

/** Lightweight markdown renderer: "## " headings, "- " bullet lists, blank-line paragraphs */
function PostContent({ text }: { text: string }) {
  const blocks = text.split(/\n{2,}/);
  return (
    <div className="flex flex-col gap-5 text-[17px] leading-[1.75] text-foreground/85 lg:text-lg">
      {blocks.map((block, bi) => {
        const trimmed = block.trim();
        if (trimmed.startsWith("## ")) {
          const heading = trimmed.replace(/^##\s*/, "");
          return (
            <h2
              key={bi}
              id={headingId(heading)}
              className="mt-6 scroll-mt-28 text-[26px] font-bold leading-[1.2] tracking-[-0.025em] text-foreground first:mt-0 lg:text-[30px]"
            >
              {heading}
            </h2>
          );
        }
        const lines = trimmed.split("\n").map((l) => l.trim()).filter(Boolean);
        const isList = lines.length > 0 && lines.every((l) => l.startsWith("- "));
        if (isList) {
          return (
            <ul key={bi} className="flex flex-col gap-2.5">
              {lines.map((l, li) => (
                <li key={li} className="flex items-start gap-3">
                  <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-link" aria-hidden />
                  <span>{l.replace(/^-\s*/, "")}</span>
                </li>
              ))}
            </ul>
          );
        }
        return <p key={bi}>{lines.join(" ")}</p>;
      })}
    </div>
  );
}

function AdjacentPost({ post, dir }: { post: BlogPost; dir: "prev" | "next" }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className={`group flex flex-col gap-2 rounded-[18px] border border-border bg-card p-5 transition-colors hover:border-link lg:p-6 ${dir === "next" ? "sm:items-end sm:text-right" : ""}`}
    >
      <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-muted-foreground">
        {dir === "prev" ? <ArrowLeft className="h-4 w-4" aria-hidden /> : null}
        {dir === "prev" ? "Previous article" : "Next article"}
        {dir === "next" ? <ArrowRight className="h-4 w-4" aria-hidden /> : null}
      </span>
      <span className="text-[17px] font-bold leading-[1.3] tracking-[-0.01em] transition-colors group-hover:text-link">{post.title}</span>
    </Link>
  );
}

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPostBySlug(slug ?? "");

  if (!post) return <Navigate to="/blog" replace />;

  const currentIndex = BLOG_POSTS.findIndex((p) => p.slug === post.slug);
  const prev = BLOG_POSTS[currentIndex - 1];
  const next = BLOG_POSTS[currentIndex + 1];
  const headings = headingsOf(post.content);
  // Same topic first, then the newest of the rest.
  const related = [
    ...BLOG_POSTS.filter((p) => p.slug !== post.slug && p.category === post.category),
    ...[...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date)).filter((p) => p.slug !== post.slug && p.category !== post.category),
  ].slice(0, 3);

  const seo = postSeo(post.slug);
  const title = seoTitle(seo.title ?? post.title);
  const description = seo.description ?? post.excerpt;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://codespanda.com/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`https://codespanda.com/blog/${post.slug}`} />
        <meta property="og:image" content={post.coverImage ? `https://codespanda.com${post.coverImage}` : "https://codespanda.com/og-image.png"} />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={post.coverImage ? `https://codespanda.com${post.coverImage}` : "https://codespanda.com/og-image.png"} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "description": description,
          "url": `https://codespanda.com/blog/${post.slug}`,
          ...(post.coverImage ? { "image": `https://codespanda.com${post.coverImage}` } : {}),
          "datePublished": post.date,
          "author": { "@type": "Organization", "name": post.author },
          "publisher": { "@type": "Organization", "name": "CodesPanda" },
        })}</script>
      </Helmet>

      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />

        <main className="flex flex-1 flex-col pt-16 lg:pt-20">
          {/* Header */}
          <section className="border-b border-border bg-card px-4 pb-10 pt-7 lg:px-page lg:pb-16 lg:pt-12">
            <div className="mx-auto flex max-w-[1080px] flex-col gap-5 lg:gap-6">
              <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Link to="/blog" className="font-medium hover:text-foreground">Blog</Link>
                <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                <span className="truncate">{post.category}</span>
              </nav>
              <div className="flex flex-wrap items-center gap-2">
                <CategoryPill>{post.category}</CategoryPill>
                <span className="text-[13px] text-muted-foreground">{post.readTime}</span>
              </div>
              <h1 className="max-w-[900px] text-balance text-[34px] font-extrabold leading-[1.08] tracking-[-0.035em] lg:text-[54px] lg:leading-[1.05]">
                {post.title}
              </h1>
              <p className="max-w-[820px] text-[17px] leading-[1.6] text-muted-foreground lg:text-xl">{post.excerpt}</p>
              <div className="flex items-center gap-3 pt-1">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-logo-bg">
                  <img src="/logo.webp" alt="" width={44} height={44} className="h-9 w-9 object-contain" />
                </span>
                <span className="flex flex-col">
                  <span className="text-[15px] font-semibold">{post.author}</span>
                  <span className="text-[13px] text-muted-foreground">
                    <time dateTime={post.date}>{formatPostDate(post.date, "long")}</time> · {post.readTime}
                  </span>
                </span>
              </div>
            </div>
          </section>

          {/* Cover */}
          <section className="px-4 pt-8 lg:px-page lg:pt-14">
            <div className="mx-auto max-w-[1080px] overflow-hidden rounded-[18px] border border-border bg-soft-2 lg:rounded-[22px]">
              {post.coverVideo ? (
                <video
                  src={post.coverVideo}
                  poster={post.coverImage}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  className="aspect-video h-full w-full object-contain"
                >
                  Your browser doesn't support embedded video.
                </video>
              ) : (
                <PostCover post={post} eager className="aspect-video" imgClassName="group-hover:scale-100" />
              )}
            </div>
          </section>

          {/* Article + sidebar */}
          <section className="px-4 py-10 lg:px-page lg:py-16">
            <div className="mx-auto flex max-w-[1080px] flex-col gap-10 lg:flex-row lg:items-start lg:gap-14">
              <article className="flex min-w-0 flex-1 flex-col gap-10">
                {post.resourceLinks && <ResourceLinksGrid links={post.resourceLinks} />}
                <PostContent text={post.content} />

                {post.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 border-t border-border pt-6">
                    <span className="mr-1 text-sm font-semibold">Tags</span>
                    {post.tags.map((t) => (
                      <span key={t} className="rounded-md bg-secondary px-2.5 py-1 text-[13px] font-medium text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {/* Written by */}
                <div className="flex flex-col gap-4 rounded-[18px] border border-border bg-card p-5 sm:flex-row sm:items-center lg:p-6">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[14px] bg-logo-bg">
                    <img src="/logo.webp" alt="" width={56} height={56} className="h-12 w-12 object-contain" />
                  </span>
                  <span className="flex flex-1 flex-col gap-0.5">
                    <span className="text-[17px] font-bold">Written by {post.author}</span>
                    <span className="text-sm text-muted-foreground">We design and build web pages, admin panels and SaaS products in React.</span>
                  </span>
                  <Link
                    to="/templates"
                    className="flex h-11 shrink-0 items-center justify-center rounded-xl border-[1.5px] border-input px-5 text-[15px] font-semibold hover:bg-secondary"
                  >
                    Browse templates
                  </Link>
                </div>

                {(prev || next) && (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {prev ? <AdjacentPost post={prev} dir="prev" /> : <span className="hidden sm:block" />}
                    {next && <AdjacentPost post={next} dir="next" />}
                  </div>
                )}
              </article>

              <aside className="flex flex-col gap-5 lg:sticky lg:top-28 lg:w-[300px] lg:shrink-0">
                {headings.length > 1 && (
                  <nav aria-label="On this page" className="hidden flex-col gap-3 rounded-[18px] border border-border bg-card p-5 lg:flex">
                    <span className="text-[13px] font-bold uppercase tracking-[0.08em] text-link">On this page</span>
                    <ol className="flex max-h-[44vh] flex-col gap-2 overflow-y-auto">
                      {headings.map((h) => (
                        <li key={h}>
                          <a href={`#${headingId(h)}`} className="block text-sm leading-[1.45] text-muted-foreground hover:text-foreground">
                            {h}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </nav>
                )}
                <div className="flex flex-col gap-3 rounded-[18px] bg-band p-6 text-white">
                  <span className="text-xl font-bold leading-[1.25]">Need this built for you?</span>
                  <span className="text-[15px] leading-[1.55] text-[#B7C3D1]">
                    We design and build dashboards, web apps and SaaS products in React.
                  </span>
                  <StartProjectDialog>
                    <button type="button" className="mt-1 flex h-12 items-center justify-center rounded-xl bg-brand text-[15px] font-bold text-white hover:opacity-90">
                      Start a project
                    </button>
                  </StartProjectDialog>
                </div>
              </aside>
            </div>
          </section>

          {/* Related */}
          {related.length > 0 && (
            <section className="flex flex-col gap-6 border-t border-border bg-card px-4 py-12 lg:gap-8 lg:px-page lg:py-[88px]">
              <div className="flex items-end justify-between gap-4">
                <h2 className="text-[30px] font-bold leading-[1.12] tracking-[-0.025em] lg:text-[44px] lg:leading-[1.1] lg:tracking-[-0.03em]">
                  Keep reading
                </h2>
                <Link to="/blog" className="shrink-0 pb-1 text-[15px] font-semibold text-link hover:text-blue-ink">
                  All articles →
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:gap-6 xl:grid-cols-3">
                {related.map((p) => (
                  <BlogCard key={p.slug} post={p} />
                ))}
              </div>
            </section>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}
