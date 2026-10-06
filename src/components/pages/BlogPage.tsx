import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { BlogCard, CategoryPill, PostCover, formatPostDate } from "@/components/site/BlogCard";
import { StartProjectDialog } from "@/components/site/StartProjectDialog";
import { BLOG_POSTS } from "@/lib/blog-data";
import { cn } from "@/lib/utils";
import { FEATURED_POST_SIZES } from "@/lib/responsive-image";

/** Newest first; the first post is featured. */
const POSTS = [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date));

const CATEGORIES = ["All", ...Array.from(new Set(POSTS.map((p) => p.category)))];

export function BlogPage() {
  const [category, setCategory] = useState("All");
  const featured = POSTS[0];
  const posts = useMemo(
    () => (category === "All" ? POSTS.slice(1) : POSTS.filter((p) => p.category === category)),
    [category]
  );

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

      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />

        <main className="flex flex-1 flex-col pt-16 lg:pt-20">
          {/* Hero */}
          <section className="flex flex-col gap-[18px] border-b border-border bg-card px-4 pb-10 pt-9 lg:flex-row lg:items-end lg:justify-between lg:gap-16 lg:px-page lg:pb-20 lg:pt-[88px]">
            <div className="flex flex-col gap-[18px] lg:max-w-[820px] lg:gap-[22px]">
              <span className="text-[13px] font-bold uppercase tracking-[0.08em] text-link lg:text-sm">Blog</span>
              <h1 className="text-balance text-[40px] font-extrabold leading-[1.04] tracking-[-0.035em] lg:text-[64px] lg:leading-[1.02]">
                Notes on dashboards, design and React.
              </h1>
              <p className="text-base leading-[1.6] text-muted-foreground lg:text-xl">
                Practical writing on admin dashboard design, React engineering, AI and theming, from the team building CodesPanda's free templates.
              </p>
            </div>
            <div className="flex gap-8 lg:shrink-0 lg:pb-1.5">
              <div className="flex flex-col">
                <span className="font-display text-[32px] font-bold leading-none tracking-[-0.02em] lg:text-[40px]">{POSTS.length}</span>
                <span className="mt-1.5 text-sm text-muted-foreground">Articles</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-[32px] font-bold leading-none tracking-[-0.02em] lg:text-[40px]">{CATEGORIES.length - 1}</span>
                <span className="mt-1.5 text-sm text-muted-foreground">Topics</span>
              </div>
            </div>
          </section>

          {/* Featured */}
          <section className="px-4 pt-10 lg:px-page lg:pt-[88px]">
            <Link
              to={`/blog/${featured.slug}`}
              className="group flex flex-col overflow-hidden rounded-[22px] border border-border bg-card transition-[border-color,box-shadow] hover:border-line-2 hover:shadow-[0_14px_40px_-16px_rgba(14,23,38,0.2)] lg:flex-row lg:items-stretch"
            >
              <div className="flex items-center border-b border-border bg-soft-2 lg:w-[56%] lg:shrink-0 lg:border-b-0 lg:border-r">
                <PostCover post={featured} eager sizes={FEATURED_POST_SIZES} className="aspect-video w-full" />
              </div>
              <div className="flex flex-col gap-4 p-6 lg:flex-1 lg:justify-center lg:gap-5 lg:p-12">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-brand px-[9px] py-1 text-xs font-bold text-white">Latest</span>
                  <CategoryPill>{featured.category}</CategoryPill>
                </div>
                <h2 className="text-[26px] font-bold leading-[1.12] tracking-[-0.025em] transition-colors group-hover:text-link lg:text-[36px] lg:leading-[1.1] lg:tracking-[-0.03em]">
                  {featured.title}
                </h2>
                <p className="line-clamp-3 text-[15px] leading-[1.6] text-muted-foreground lg:text-[17px]">{featured.excerpt}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{formatPostDate(featured.date)}</span>
                  <span aria-hidden>·</span>
                  <span>{featured.readTime}</span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-link">
                  Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </div>
            </Link>
          </section>

          {/* All posts */}
          <section className="flex flex-col gap-6 px-4 py-10 lg:gap-8 lg:px-page lg:py-[88px]">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="text-[30px] font-bold leading-[1.12] tracking-[-0.025em] lg:text-[44px] lg:leading-[1.1] lg:tracking-[-0.03em]">
                {category === "All" ? "More articles" : category}
              </h2>
              <div role="tablist" aria-label="Filter by topic" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-wrap lg:justify-end lg:overflow-visible lg:px-0 lg:pb-0">
                {CATEGORIES.map((c) => {
                  const on = c === category;
                  return (
                    <button
                      key={c}
                      type="button"
                      role="tab"
                      aria-selected={on}
                      onClick={() => setCategory(c)}
                      className={cn(
                        "h-10 shrink-0 whitespace-nowrap rounded-full border px-4 text-sm font-semibold transition-colors",
                        on ? "border-foreground bg-foreground text-background" : "border-border bg-card text-muted-foreground hover:border-line-2 hover:text-foreground"
                      )}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:gap-6 xl:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="px-4 pb-12 lg:px-page lg:pb-[104px]">
            <div className="flex flex-col gap-4 rounded-[22px] bg-brand px-6 py-9 text-white lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:rounded-[28px] lg:px-20 lg:py-[72px]">
              <div className="flex flex-col gap-4 lg:w-[700px]">
                <h2 className="text-[30px] font-bold leading-[1.12] tracking-[-0.025em] lg:text-[46px] lg:leading-[1.08] lg:tracking-[-0.03em]">
                  Put it into practice.
                </h2>
                <p className="text-base leading-[1.6] text-white lg:text-lg">
                  Every idea here is already built into our free React templates. Browse them, or tell us what you want to build.
                </p>
              </div>
              <div className="flex flex-col gap-3 lg:flex-row">
                <Link to="/templates" className="flex h-[54px] items-center justify-center rounded-xl bg-white px-7 text-[17px] font-bold text-[#005A94] hover:opacity-90 lg:h-14">
                  Browse templates
                </Link>
                <StartProjectDialog>
                  <button
                    type="button"
                    className="flex h-[54px] items-center justify-center rounded-xl border-[1.5px] border-[#7CC4F2] px-[26px] text-[17px] font-semibold text-white hover:bg-white/10 lg:h-14"
                  >
                    Start a project
                  </button>
                </StartProjectDialog>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
