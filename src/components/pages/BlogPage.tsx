import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Sparkles, LayoutGrid, Palette, Rocket, Figma, Paintbrush, Bot, Puzzle, Calendar, Clock } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Button } from "@/components/ui/button";
import { BLOG_POSTS, type BlogPost } from "@/lib/blog-data";

const Footer = lazy(() =>
  import("@/components/sections/Footer").then((m) => ({ default: m.Footer }))
);

const ICONS = { Sparkles, LayoutGrid, Palette, Rocket, Figma, Paintbrush, Bot, Puzzle };

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/* ------------------------------------------------------------------ */
/* Post card — clicks to the full post                                 */
/* ------------------------------------------------------------------ */
function PostCard({ post, index }: { post: BlogPost; index: number }) {
  const Icon = ICONS[post.icon];
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Cover */}
      <div className="relative aspect-video overflow-hidden bg-secondary/40">
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.title}
            width={400}
            height={225}
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : "auto"}
            decoding="async"
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className={`flex h-full items-center justify-center bg-gradient-to-br ${post.gradient}`}>
            <Icon className="h-12 w-12 text-white/90 transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-black/25 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
          {post.category}
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-base font-bold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
        <div className="mt-auto flex items-center gap-3 pt-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(post.date)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {post.readTime}
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */
export function BlogPage() {
  return (
    <>
      <Helmet>
        <title>Blog — Admin Dashboard Design & React Engineering | CodesPanda</title>
        <meta
          name="description"
          content="Notes on admin dashboard design, React engineering, and shadcn/ui theming from the team building CodesPanda's free React templates."
        />
        <link rel="canonical" href="https://codespanda.com/blog" />
        <meta property="og:title" content="Blog — Admin Dashboard Design & React Engineering | CodesPanda" />
        <meta
          property="og:description"
          content="Notes on admin dashboard design, React engineering, and shadcn/ui theming from the team building CodesPanda's free React templates."
        />
        <meta property="og:url" content="https://codespanda.com/blog" />
        <meta property="og:image" content="https://codespanda.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog — Admin Dashboard Design & React Engineering | CodesPanda" />
        <meta name="twitter:description" content="Notes on admin dashboard design, React engineering, and shadcn/ui theming from the team building CodesPanda's free React templates." />
        <meta name="twitter:image" content="https://codespanda.com/og-image.png" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "CodesPanda Blog",
          "url": "https://codespanda.com/blog",
          "blogPost": BLOG_POSTS.map((p) => ({
            "@type": "BlogPosting",
            "headline": p.title,
            "url": `https://codespanda.com/blog/${p.slug}`,
            "datePublished": p.date,
          })),
        })}</script>
      </Helmet>

      <Navbar />

      <main className="min-h-screen pt-24 pb-20">
        {/* Hero */}
        <section className="mx-auto max-w-4xl px-4 pt-12 pb-16 text-center">
          <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            Blog
          </span>
          <h1 className="mt-4 text-5xl font-extrabold tracking-tight sm:text-6xl">
            Notes on Dashboards, Design &amp; React
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Practical writing on admin dashboard design, React engineering, and theming — from the team building CodesPanda's free templates.
          </p>
        </section>

        {/* Posts grid */}
        <section className="mx-auto max-w-6xl px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        </section>

        {/* Templates CTA */}
        <section className="mx-auto mt-20 max-w-3xl px-4 text-center">
          <div className="rounded-3xl border border-border bg-card p-10 shadow-sm">
            <h2 className="text-2xl font-bold">Put It Into Practice</h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
              Every idea in this blog is already built into our free React admin templates — browse them and see the theming system in action.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button variant="gradient" asChild>
                <a href="/templates">Browse Templates</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="mailto:contact@codespanda.com">Get in Touch</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Suspense fallback={<div className="h-72 animate-pulse bg-secondary/30" />}>
        <Footer />
      </Suspense>
    </>
  );
}
