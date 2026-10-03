import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ArrowRight, ArrowUpRight, Dribbble, Linkedin } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Logo } from "@/components/shared/Logo";
import { ShotCard, ShotCategoryPill, groupOf } from "@/components/site/ShotCard";
import { getShotById, SHOTS, type Shot } from "@/lib/portfolio-data";
import { StartProjectDialog } from "@/components/site/StartProjectDialog";
import { seoTitle, shotSeo } from "@/lib/seo";

const DRIBBBLE_PROFILE = "https://dribbble.com/deepak1605";
const LINKEDIN_URL = "https://www.linkedin.com/company/codespanda";

/** Splits a Dribbble description into an intro paragraph and the remaining blocks. */
function splitDescription(text?: string) {
  const blocks = (text ?? "").split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
  const first = blocks[0];
  const isIntro = first && !first.startsWith("•") && !/^\p{Extended_Pictographic}/u.test(first);
  return isIntro ? { intro: first, rest: blocks.slice(1) } : { intro: undefined, rest: blocks };
}

/** Renders a line, turning URLs and bare codespanda.com into links. */
function Linkified({ line }: { line: string }) {
  const parts = line.split(/(https?:\/\/\S+|codespanda\.com)/);
  return (
    <>
      {parts.map((part, i) =>
        /^(https?:\/\/\S+|codespanda\.com)$/.test(part) ? (
          <a
            key={i}
            href={part.startsWith("http") ? part : `https://${part}`}
            target="_blank"
            rel="noreferrer noopener"
            className="font-semibold text-link underline underline-offset-2 hover:text-blue-ink"
          >
            {part}
          </a>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

/** A bullet line without its "•" and any leading emoji (with skin-tone, variation and joiner marks). */
function stripBullet(line: string) {
  return line.replace(/^•\s*/, "").replace(/^[\p{Extended_Pictographic}\u{1F3FB}-\u{1F3FF}️‍]+\s*/u, "");
}

/** The description's remaining blocks: bullet lists and paragraphs. */
function DescriptionBlocks({ blocks }: { blocks: string[] }) {
  return (
    <div className="flex flex-col gap-4">
      {blocks.map((block, bi) => {
        const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
        if (lines.every((l) => l.startsWith("•"))) {
          return (
            <ul key={bi} className="flex flex-col gap-2">
              {lines.map((l, li) => (
                <li key={li} className="flex items-start gap-2.5 text-[15px] leading-[1.6] text-muted-foreground lg:text-base">
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-link" aria-hidden />
                  {stripBullet(l)}
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={bi} className="text-[15px] leading-[1.65] text-muted-foreground lg:text-base">
            {lines.map((l, li) => (
              <span key={li}>
                <Linkified line={l} />
                {li < lines.length - 1 && <br />}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}

/** Up to three other shots from the same group, starting after this one. */
function relatedShots(shot: Shot) {
  const group = groupOf(shot);
  const i = SHOTS.findIndex((s) => s.id === shot.id);
  const ordered = [...SHOTS.slice(i + 1), ...SHOTS.slice(0, i)];
  return ordered.filter((s) => groupOf(s) === group).slice(0, 3);
}

export function PortfolioShotPage() {
  const { shotId } = useParams<{ shotId: string }>();
  const shot = getShotById(shotId ?? "");

  if (!shot) return <Navigate to="/portfolio" replace />;

  const currentIndex = SHOTS.findIndex((s) => s.id === shot.id);
  const prev = SHOTS[currentIndex - 1];
  const next = SHOTS[currentIndex + 1];
  const shareImage = shot.fullImgUrl ?? shot.imgUrl;
  const shareImageUrl = shareImage.startsWith("/") ? `https://codespanda.com${shareImage}` : shareImage;
  const { intro, rest } = splitDescription(shot.description);
  const images = [shot.fullImgUrl ?? shot.imgUrl, ...(shot.gallery ?? [])];
  const related = relatedShots(shot);
  const seo = shotSeo(shot.id);
  const title = seoTitle(seo.title ?? shot.title);
  const summary = shot.description
    ? `${shot.description.replace(/\n+/g, " ").replace(/[✨🌐•]/g, "").trim().slice(0, 152)}...`
    : `${shot.title} — ${shot.category} design by CodesPanda.`;
  const description = seo.description ?? summary;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={seo.description ?? (shot.description ? summary : `${summary} ${shot.tags.join(", ")}.`)} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://codespanda.com/portfolio/${shot.id}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`https://codespanda.com/portfolio/${shot.id}`} />
        <meta property="og:image" content={shareImageUrl} />
        <meta property="og:image:alt" content={`${shot.title} — CodesPanda portfolio`} />
        <meta property="og:site_name" content="CodesPanda" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={shareImageUrl} />
        <meta name="twitter:image:alt" content={`${shot.title} — CodesPanda portfolio`} />
      </Helmet>

      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />

        <main className="pt-16 lg:pt-20">
          {/* Title */}
          <section className="flex flex-col gap-4 bg-card px-4 pb-7 pt-6 lg:gap-[22px] lg:px-page lg:pb-10 lg:pt-12">
            <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground">Home</Link> /{" "}
              <Link to="/portfolio" className="hover:text-foreground">Portfolio</Link> / {shot.title}
            </nav>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
              <div className="flex flex-col gap-4 lg:max-w-[820px] lg:gap-3.5">
                <div className="flex flex-wrap gap-1.5 lg:gap-2">
                  <ShotCategoryPill shot={shot} />
                  {shot.tags.map((t) => (
                    <span key={t} className="rounded-md bg-secondary px-[9px] py-1 text-xs font-semibold">
                      {t}
                    </span>
                  ))}
                </div>
                <h1 className="text-balance text-[34px] font-extrabold leading-[1.06] tracking-[-0.035em] lg:text-[52px] lg:leading-[1.04]">
                  {shot.title}
                </h1>
                <p className="text-base leading-[1.6] text-muted-foreground lg:text-lg">
                  {intro ?? `${shot.category} design by CodesPanda — ${shot.tags.join(", ")}.`}
                </p>
              </div>
              <div className="flex flex-col gap-2.5 lg:shrink-0 lg:flex-row lg:gap-3">
                <a
                  href={shot.dribbbleUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex h-[54px] items-center justify-center gap-2 rounded-xl bg-brand px-[26px] text-base font-bold text-white hover:opacity-90"
                >
                  View on Dribbble <ArrowUpRight className="h-4 w-4" aria-hidden />
                </a>
                <Link
                  to="/portfolio"
                  className="flex h-[54px] items-center justify-center rounded-xl border-[1.5px] border-input px-[22px] text-base font-semibold text-foreground hover:bg-secondary"
                >
                  All shots
                </Link>
              </div>
            </div>
          </section>

          {/* Screens */}
          <section className="flex flex-col gap-4 px-4 pb-8 pt-2 lg:gap-6 lg:px-page lg:pb-16 lg:pt-0 lg:[background:linear-gradient(hsl(var(--card))_120px,hsl(var(--background))_120px)]">
            {images.map((src, i) => (
              <div
                key={src}
                className="overflow-hidden rounded-[14px] border border-border bg-secondary shadow-[0_20px_40px_rgba(14,23,38,0.10)] lg:rounded-[20px] lg:shadow-[0_30px_70px_rgba(14,23,38,0.12)]"
              >
                <img
                  src={src}
                  alt={i === 0 ? shot.title : `${shot.title} — view ${i + 1}`}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="block h-auto w-full"
                />
              </div>
            ))}
          </section>

          {/* Details */}
          <section className="flex flex-col gap-6 px-4 pb-12 lg:flex-row lg:items-start lg:gap-12 lg:px-page lg:pb-24">
            <div className="flex min-w-0 flex-1 flex-col gap-4 rounded-[18px] border border-border bg-card p-[22px] lg:gap-5 lg:p-8">
              <h2 className="text-[26px] font-bold tracking-[-0.02em] lg:text-[32px]">About this design</h2>
              {rest.length > 0 ? (
                <DescriptionBlocks blocks={rest} />
              ) : (
                <p className="text-[15px] leading-[1.65] text-muted-foreground lg:text-base">
                  {intro ?? `A ${shot.category.toLowerCase()} concept designed by CodesPanda.`}
                </p>
              )}
            </div>

            <aside className="flex flex-col gap-4 lg:w-[380px] lg:shrink-0">
              <div className="flex flex-col gap-4 rounded-[18px] border border-border bg-card p-[22px] lg:p-7">
                <dl className="flex flex-col text-[15px]">
                  <div className="flex justify-between gap-4 border-t border-line-2 py-3">
                    <dt className="text-muted-foreground">Type</dt>
                    <dd className="font-semibold">{shot.category}</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-y border-line-2 py-3">
                    <dt className="shrink-0 text-muted-foreground">Topics</dt>
                    <dd className="text-right font-semibold">{shot.tags.join(" · ")}</dd>
                  </div>
                </dl>
                <a
                  href={shot.dribbbleUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex h-[52px] items-center justify-center rounded-xl bg-brand text-base font-bold text-white hover:opacity-90"
                >
                  View on Dribbble
                </a>
                <StartProjectDialog defaultType="UI/UX design">
                  <button type="button" className="flex h-[50px] items-center justify-center rounded-xl border-[1.5px] border-input text-base font-semibold text-foreground hover:bg-secondary">
                    Start a design project
                  </button>
                </StartProjectDialog>
              </div>

              <div className="flex items-start gap-4 rounded-[18px] border border-border bg-card p-[18px]">
                <Logo imgClassName="h-14 w-14 rounded-[10px] bg-logo-bg" />
                <div className="flex min-w-0 flex-col gap-1">
                  <span className="text-base font-bold">Designed by CodesPanda</span>
                  <span className="text-sm text-muted-foreground">UI kits, templates, dashboards and SaaS experiences.</span>
                  <span className="flex flex-wrap gap-2 pt-2">
                    <a
                      href={DRIBBBLE_PROFILE}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex h-10 items-center gap-2 rounded-[10px] border-[1.5px] border-input px-3.5 text-sm font-semibold text-foreground transition-colors hover:border-link hover:text-link"
                    >
                      <Dribbble className="h-4 w-4" aria-hidden /> Dribbble
                    </a>
                    <a
                      href={LINKEDIN_URL}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex h-10 items-center gap-2 rounded-[10px] border-[1.5px] border-input px-3.5 text-sm font-semibold text-foreground transition-colors hover:border-link hover:text-link"
                    >
                      <Linkedin className="h-4 w-4" aria-hidden /> LinkedIn
                    </a>
                  </span>
                </div>
              </div>
            </aside>
          </section>

          {/* More shots */}
          <section className="flex flex-col gap-5 px-4 pb-14 lg:gap-8 lg:px-page lg:pb-28">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex flex-col gap-2.5 lg:gap-3">
                <span className="text-[13px] font-bold uppercase tracking-[0.08em] text-link lg:text-sm">More shots</span>
                <h2 className="text-[28px] font-bold tracking-[-0.025em] lg:text-[44px] lg:tracking-[-0.03em]">
                  More {groupOf(shot) === "mobile" ? "mobile apps" : groupOf(shot) === "dashboard" ? "dashboards" : "web apps"}
                </h2>
              </div>
              <Link to="/portfolio" className="text-base font-semibold text-link hover:text-blue-ink">
                See all shots →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-7">
              {related.map((s, i) => (
                <ShotCard key={s.id} shot={s} index={i + 3} />
              ))}
            </div>

            {(prev || next) && (
              <nav aria-label="Previous and next shots" className="grid gap-3 pt-2 sm:grid-cols-2 lg:gap-4">
                {prev ? (
                  <Link
                    to={`/portfolio/${prev.id}`}
                    className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3.5 text-foreground hover:bg-secondary"
                  >
                    <ArrowLeft className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden />
                    <img src={prev.imgUrl} alt="" loading="lazy" className="h-12 w-16 shrink-0 rounded-lg object-cover" />
                    <span className="flex min-w-0 flex-col">
                      <span className="text-xs font-semibold text-muted-foreground">Previous</span>
                      <span className="truncate text-sm font-bold">{prev.title}</span>
                    </span>
                  </Link>
                ) : (
                  <span className="hidden sm:block" />
                )}
                {next && (
                  <Link
                    to={`/portfolio/${next.id}`}
                    className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3.5 text-foreground hover:bg-secondary sm:flex-row-reverse sm:text-right"
                  >
                    <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden />
                    <img src={next.imgUrl} alt="" loading="lazy" className="h-12 w-16 shrink-0 rounded-lg object-cover" />
                    <span className="flex min-w-0 flex-col">
                      <span className="text-xs font-semibold text-muted-foreground">Next</span>
                      <span className="truncate text-sm font-bold">{next.title}</span>
                    </span>
                  </Link>
                )}
              </nav>
            )}
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
