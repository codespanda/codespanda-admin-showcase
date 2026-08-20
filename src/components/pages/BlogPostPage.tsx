import { lazy, Suspense } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Calendar, Clock, Sparkles, LayoutGrid, Palette, Rocket, Figma, Paintbrush, Bot } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Button } from "@/components/ui/button";
import { getBlogPostBySlug, BLOG_POSTS } from "@/lib/blog-data";

const Footer = lazy(() =>
  import("@/components/sections/Footer").then((m) => ({ default: m.Footer }))
);

const ICONS = { Sparkles, LayoutGrid, Palette, Rocket, Figma, Paintbrush, Bot };

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/** Lightweight markdown renderer: "## " headings, "- " bullet lists, blank-line paragraphs */
function PostContent({ text }: { text: string }) {
  const blocks = text.split(/\n{2,}/);
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none space-y-5 text-[15px] leading-relaxed text-foreground">
      {blocks.map((block, bi) => {
        const trimmed = block.trim();
        if (trimmed.startsWith("## ")) {
          return (
            <h2 key={bi} className="!mt-10 text-xl font-bold tracking-tight">
              {trimmed.replace(/^##\s*/, "")}
            </h2>
          );
        }
        const lines = trimmed.split("\n").map((l) => l.trim()).filter(Boolean);
        const isList = lines.length > 0 && lines.every((l) => l.startsWith("- "));
        if (isList) {
          return (
            <ul key={bi} className="space-y-1.5 pl-1">
              {lines.map((l, li) => (
                <li key={li} className="flex items-start gap-2 text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{l.replace(/^-\s*/, "")}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={bi} className="text-muted-foreground">
            {lines.join(" ")}
          </p>
        );
      })}
    </div>
  );
}

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPostBySlug(slug ?? "");

  if (!post) return <Navigate to="/blog" replace />;

  const currentIndex = BLOG_POSTS.findIndex((p) => p.slug === post.slug);
  const prev = BLOG_POSTS[currentIndex - 1];
  const next = BLOG_POSTS[currentIndex + 1];
  const Icon = ICONS[post.icon];

  const description = post.excerpt;

  return (
    <>
      <Helmet>
        <title>{post.title} — CodesPanda Blog</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://codespanda.com/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${post.title} — CodesPanda Blog`} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`https://codespanda.com/blog/${post.slug}`} />
        <meta property="og:image" content={post.coverImage ? `https://codespanda.com${post.coverImage}` : "https://codespanda.com/og-image.png"} />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post.title} — CodesPanda Blog`} />
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

      <Navbar />

      <main className="min-h-screen pt-20 pb-20">
        {/* Back nav */}
        <div className="mx-auto max-w-3xl px-4 pt-8 pb-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </div>

        {/* Cover */}
        <div className="mx-auto max-w-3xl px-4">
          {post.coverImage ? (
            <div className="aspect-video overflow-hidden rounded-2xl bg-secondary/40 shadow-xl shadow-black/10">
              <img
                src={post.coverImage}
                alt={post.title}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-contain"
              />
            </div>
          ) : (
            <div className={`flex h-56 items-center justify-center rounded-2xl bg-gradient-to-br ${post.gradient} shadow-xl shadow-black/10 sm:h-72`}>
              <Icon className="h-16 w-16 text-white/90" strokeWidth={1.5} />
            </div>
          )}
        </div>

        {/* Details */}
        <div className="mx-auto max-w-3xl px-4 pt-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            {post.category}
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {post.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{post.author}</span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(post.date)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Content */}
          <div className="mt-10 rounded-2xl border border-border bg-card px-6 py-7 sm:px-8">
            <PostContent text={post.content} />
          </div>

          {/* Written by CodesPanda */}
          <div className="mt-8 flex items-center gap-4 rounded-2xl border border-border bg-card px-5 py-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/60">
              <span className="text-sm font-black text-primary-foreground">CP</span>
            </div>
            <div>
              <p className="text-sm font-bold">Written by {post.author}</p>
              <p className="text-xs text-muted-foreground">CodesPanda — Free React Admin Templates</p>
            </div>
            <div className="ml-auto hidden sm:block">
              <Button variant="outline" size="sm" asChild>
                <Link to="/templates">Browse Templates</Link>
              </Button>
            </div>
          </div>

          {/* Prev / Next navigation */}
          {(prev || next) && (
            <div className="mt-12">
              <h2 className="mb-5 text-lg font-bold">More Posts</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {prev && (
                  <Link
                    to={`/blog/${prev.slug}`}
                    className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-all hover:shadow-md hover:-translate-y-0.5"
                  >
                    <ArrowLeft className="h-4 w-4 shrink-0 text-muted-foreground" />
                    {prev.coverImage ? (
                      <img src={prev.coverImage} alt={prev.title} width={64} height={48} loading="lazy" className="h-12 w-16 shrink-0 rounded-lg object-cover" />
                    ) : (
                      <div className={`flex h-12 w-16 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${prev.gradient}`}>
                        {(() => { const PrevIcon = ICONS[prev.icon]; return <PrevIcon className="h-5 w-5 text-white/90" strokeWidth={1.5} />; })()}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-primary">{prev.category}</p>
                      <p className="truncate text-sm font-semibold">{prev.title}</p>
                    </div>
                  </Link>
                )}
                {next && (
                  <Link
                    to={`/blog/${next.slug}`}
                    className="group flex items-center justify-end gap-3 rounded-2xl border border-border bg-card p-4 transition-all hover:shadow-md hover:-translate-y-0.5 sm:flex-row-reverse"
                  >
                    <ArrowLeft className="h-4 w-4 shrink-0 rotate-180 text-muted-foreground" />
                    {next.coverImage ? (
                      <img src={next.coverImage} alt={next.title} width={64} height={48} loading="lazy" className="h-12 w-16 shrink-0 rounded-lg object-cover" />
                    ) : (
                      <div className={`flex h-12 w-16 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${next.gradient}`}>
                        {(() => { const NextIcon = ICONS[next.icon]; return <NextIcon className="h-5 w-5 text-white/90" strokeWidth={1.5} />; })()}
                      </div>
                    )}
                    <div className="min-w-0 sm:text-right">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-primary">{next.category}</p>
                      <p className="truncate text-sm font-semibold">{next.title}</p>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <Suspense fallback={<div className="h-72 animate-pulse bg-secondary/30" />}>
        <Footer />
      </Suspense>
    </>
  );
}
