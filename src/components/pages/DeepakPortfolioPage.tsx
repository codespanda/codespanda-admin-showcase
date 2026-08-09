import { lazy, Suspense, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ExternalLink, Eye } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Button } from "@/components/ui/button";
import { SHOTS } from "@/lib/portfolio-data";
import type { Shot } from "@/lib/portfolio-data";

const Footer = lazy(() =>
  import("@/components/sections/Footer").then((m) => ({ default: m.Footer }))
);

const LINKEDIN_URL = "https://www.linkedin.com/company/codespanda";

/* ------------------------------------------------------------------ */
/* Shot card — clicks to internal detail page                          */
/* ------------------------------------------------------------------ */
function ShotCard({ shot, index }: { shot: Shot; index: number }) {
  return (
    <Link
      to={`/portfolio/${shot.id}`}
      className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden bg-secondary/40">
        {/* skeleton shimmer shown until image loads */}
        <div className="absolute inset-0 animate-pulse bg-secondary/60" />
        <img
          src={shot.imgUrl}
          alt={shot.title}
          width={400}
          height={300}
          loading={index < 4 ? "eager" : "lazy"}
          fetchPriority={index === 0 ? "high" : "auto"}
          decoding="async"
          className="relative h-full w-full object-cover object-top opacity-0 transition-[transform,opacity] duration-500 group-hover:scale-105"
          onLoad={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "1"; }}
        />
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">
            {shot.category}
          </span>
          {shot.views !== undefined && (
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-muted-foreground">
              <Eye className="h-3 w-3" />
              {shot.views.toLocaleString()}
            </span>
          )}
        </div>
        <h3 className="text-sm font-semibold leading-snug line-clamp-2">{shot.title}</h3>
        <div className="mt-auto flex flex-wrap gap-1 pt-2">
          {shot.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-full border border-border bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */
const PAGE_SIZE = 12;

export function DeepakPortfolioPage() {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const visibleShots = SHOTS.slice(0, visible);
  const hasMore = visible < SHOTS.length;

  return (
    <>
      <Helmet>
        <title>UI/UX Portfolio — Dashboard &amp; Product Design | CodeSpanda</title>
        <meta
          name="description"
          content="Case studies in dashboard design, admin dashboard UI, and product design — from SaaS admin panels to mobile app UX. See the design thinking behind CodeSpanda templates."
        />
        <link rel="canonical" href="https://codespanda.com/portfolio" />
        <meta property="og:title" content="UI/UX Portfolio — Dashboard &amp; Product Design | CodeSpanda" />
        <meta
          property="og:description"
          content="Case studies in dashboard design, admin dashboard UI, and product design — from SaaS admin panels to mobile app UX. See the design thinking behind CodeSpanda templates."
        />
        <meta property="og:url" content="https://codespanda.com/portfolio" />
        <meta property="og:image" content="https://cdn.dribbble.com/userupload/48428945/file/007a381ab43254d9a40ffde8369916a5.png?format=webp&resize=400x300&vertical=center" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="UI/UX Portfolio — Dashboard &amp; Product Design | CodeSpanda" />
        <meta name="twitter:description" content="Case studies in dashboard design, admin dashboard UI, and product design — from SaaS admin panels to mobile app UX." />
        <meta name="twitter:image" content="https://cdn.dribbble.com/userupload/48428945/file/007a381ab43254d9a40ffde8369916a5.png?format=webp&resize=400x300&vertical=center" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          "name": "CodesPanda – Portfolio",
          "url": "https://codespanda.com/portfolio",
          "mainEntity": {
            "@type": "Person",
            "name": "Deepak Kumar",
            "jobTitle": "UI/UX Designer & React Developer",
            "address": { "@type": "PostalAddress", "addressLocality": "Mohali", "addressCountry": "IN" },
            "sameAs": [
              "https://dribbble.com/deepak1605",
              LINKEDIN_URL,
            ],
          },
        })}</script>
      </Helmet>

      <Navbar />

      <main className="min-h-screen pt-24 pb-20">
        {/* Hero */}
        <section className="mx-auto max-w-4xl px-4 pt-12 pb-16 text-center">
          <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            Portfolio
          </span>
          <h1 className="mt-4 text-5xl font-extrabold tracking-tight sm:text-6xl">
            Dashboard Design &amp; Product UI Case Studies
          </h1>
          <p className="mt-4 text-xl font-semibold text-primary sm:text-2xl">
            Design. Build. Impress.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            A collection of dashboard design, admin dashboard UI, and product design case studies — covering SaaS admin panels, mobile app UX, retail POS, and healthcare management interfaces.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button variant="gradient" asChild>
              <a href="https://dribbble.com/deepak1605" target="_blank" rel="noreferrer noopener">
                <ExternalLink className="h-4 w-4" />
                View on Dribbble
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer noopener">
                LinkedIn
              </a>
            </Button>
          </div>
        </section>

        {/* Design work */}
        <section className="mx-auto max-w-6xl px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Design Work</h2>
            <a
              href="https://dribbble.com/deepak1605"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              View all on Dribbble
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {visibleShots.map((shot, i) => (
              <ShotCard key={shot.id} shot={shot} index={i} />
            ))}
          </div>

          {hasMore && (
            <div className="mt-10 flex justify-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setVisible(v => v + PAGE_SIZE)}
                className="min-w-[160px]"
              >
                Load More
              </Button>
            </div>
          )}
        </section>

        {/* CodesPanda templates CTA */}
        <section className="mx-auto mt-20 max-w-3xl px-4 text-center">
          <div className="rounded-3xl border border-border bg-card p-10 shadow-sm">
            <h2 className="text-2xl font-bold">React Templates by CodesPanda</h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
              Designs brought to life as free, production-ready React templates. Browse all CodesPanda templates built from these UI concepts.
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
