import { lazy, Suspense } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Button } from "@/components/ui/button";
import { getShotById, SHOTS } from "@/lib/portfolio-data";

const Footer = lazy(() =>
  import("@/components/sections/Footer").then((m) => ({ default: m.Footer }))
);

export function PortfolioShotPage() {
  const { shotId } = useParams<{ shotId: string }>();
  const shot = getShotById(shotId ?? "");

  if (!shot) return <Navigate to="/portfolio" replace />;

  const currentIndex = SHOTS.findIndex((s) => s.id === shot.id);
  const prev = SHOTS[currentIndex - 1];
  const next = SHOTS[currentIndex + 1];

  return (
    <>
      <Helmet>
        <title>{shot.title} — CodesPanda Portfolio</title>
        <meta name="description" content={`${shot.title} — ${shot.category} design by CodesPanda. ${shot.tags.join(", ")}.`} />
        <link rel="canonical" href={`https://codespanda.com/portfolio/${shot.id}`} />
        <meta property="og:title" content={`${shot.title} — CodesPanda`} />
        <meta property="og:image" content={shot.imgUrl} />
        <meta property="og:url" content={`https://codespanda.com/portfolio/${shot.id}`} />
      </Helmet>

      <Navbar />

      <main className="min-h-screen pt-20 pb-20">
        {/* Back nav */}
        <div className="mx-auto max-w-5xl px-4 pt-8 pb-6">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>
        </div>

        {/* Full-size image */}
        <div className="mx-auto max-w-5xl px-4">
          <div className="overflow-hidden rounded-2xl border border-border bg-secondary/20 shadow-xl shadow-black/10">
            <img
              src={shot.fullImgUrl}
              alt={shot.title}
              loading="eager"
              decoding="async"
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Details */}
        <div className="mx-auto max-w-5xl px-4 pt-10">
          <div className="flex flex-col gap-5">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              {shot.category}
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              {shot.title}
            </h1>
            <div className="flex flex-wrap gap-2">
              {shot.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="gradient" asChild>
                <a href={shot.dribbbleUrl} target="_blank" rel="noreferrer noopener">
                  <ExternalLink className="h-4 w-4" />
                  View on Dribbble
                </a>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/portfolio">All Shots</Link>
              </Button>
            </div>
          </div>

          {/* Designed by CodesPanda */}
          <div className="mt-8 flex items-center gap-4 rounded-2xl border border-border bg-card px-5 py-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/60">
              <span className="text-sm font-black text-primary-foreground">CP</span>
            </div>
            <div>
              <p className="text-sm font-bold">Designed by CodesPanda</p>
              <p className="text-xs text-muted-foreground">
                High-quality UI Kits, Templates, Dashboards &amp; SaaS Experiences
              </p>
            </div>
            <div className="ml-auto hidden sm:flex items-center gap-3">
              <a
                href="https://dribbble.com/deepak1605"
                target="_blank"
                rel="noreferrer noopener"
                className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Dribbble
              </a>
              <a
                href="https://www.linkedin.com/company/codespanda"
                target="_blank"
                rel="noreferrer noopener"
                className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Prev / Next navigation */}
          {(prev || next) && (
            <div className="mt-12">
              <h2 className="mb-5 text-lg font-bold">More Shots</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {prev && (
                  <Link
                    to={`/portfolio/${prev.id}`}
                    className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-all hover:shadow-md hover:-translate-y-0.5"
                  >
                    <ArrowLeft className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <img
                      src={prev.imgUrl}
                      alt={prev.title}
                      width={64}
                      height={48}
                      loading="lazy"
                      className="h-12 w-16 shrink-0 rounded-lg object-cover"
                    />
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-primary">{prev.category}</p>
                      <p className="truncate text-sm font-semibold">{prev.title}</p>
                    </div>
                  </Link>
                )}
                {next && (
                  <Link
                    to={`/portfolio/${next.id}`}
                    className="group flex items-center justify-end gap-3 rounded-2xl border border-border bg-card p-4 transition-all hover:shadow-md hover:-translate-y-0.5 sm:flex-row-reverse"
                  >
                    <ArrowLeft className="h-4 w-4 shrink-0 rotate-180 text-muted-foreground" />
                    <img
                      src={next.imgUrl}
                      alt={next.title}
                      width={64}
                      height={48}
                      loading="lazy"
                      className="h-12 w-16 shrink-0 rounded-lg object-cover"
                    />
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
