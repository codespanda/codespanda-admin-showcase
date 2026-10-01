import { Link } from "react-router-dom";
import { ArrowUpRight, Check } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { BrowserFrame } from "@/components/site/BrowserFrame";
import { KindPill, NewPill } from "@/components/site/TemplateCard";
import { FaqSection, type FaqItem } from "@/components/site/FaqSection";
import { SITE_TEMPLATES, getSiteTemplate } from "@/lib/site";

export interface TemplateDetailProps {
  /** Template id in `data.ts`; supplies name, description, links, stack and screenshot. */
  id: string;
  githubUrl: string;
  /** e.g. "August 2026" */
  updated: string;
  /** Screens to show; the first is the large preview, the next two sit beneath it. */
  screens: { src: string; label: string }[];
  /** Modules or page sections, shown as the "What's inside" grid (first 9). */
  inside: { label: string; desc: string }[];
  /** Questions shown at the end of the page (the page adds the matching FAQPage JSON-LD). */
  faq?: FaqItem[];
}

function hostPath(url: string) {
  try {
    const u = new URL(url);
    return (u.host + u.pathname).replace(/\/$/, "");
  } catch {
    return url;
  }
}

/** Template detail page, laid out as the "Template detail" artboards on the canvas. */
export function TemplateDetail({ id, githubUrl, updated, screens, inside, faq = [] }: TemplateDetailProps) {
  const t = getSiteTemplate(id);
  if (!t) return null;

  const main = screens[0] ?? (t.screenshotUrl ? { src: t.screenshotUrl, label: t.name } : undefined);
  const extra = screens.slice(1, 3);
  const showDocs = t.docsUrl !== githubUrl && t.docsUrl.replace(/\/$/, "") !== t.liveUrl.replace(/\/$/, "");
  const related = SITE_TEMPLATES.filter((o) => o.kind === t.kind && o.id !== t.id).slice(0, 3);
  const kindPlural = t.kind === "admin" ? "Admin panels" : "Web pages";
  const specs: [string, string][] = [
    ["Tech stack", t.techStack.join(" · ")],
    ["Dark mode", t.darkMode ? "Yes" : "No"],
    ["Responsive", t.responsive ? "Yes" : "No"],
    ["License", "MIT"],
    ["Last updated", updated],
  ];

  const priceCard = (
    <div className="flex flex-col gap-4 rounded-[18px] border border-border bg-card p-[22px] lg:gap-[22px] lg:p-7">
      <div className="flex items-baseline justify-between lg:flex-col lg:gap-1.5">
        <span className="text-sm text-muted-foreground">Price</span>
        <span className="font-display text-[30px] font-bold lg:text-4xl">Free</span>
      </div>
      <a href={githubUrl} target="_blank" rel="noreferrer noopener" className="hidden h-[54px] items-center justify-center rounded-xl bg-brand text-base font-bold text-white hover:opacity-90 lg:flex">
        Get {t.name}
      </a>
      <a href={t.liveUrl} target="_blank" rel="noreferrer noopener" className="hidden h-[50px] items-center justify-center rounded-xl border-[1.5px] border-input text-base font-semibold text-foreground hover:bg-secondary lg:flex">
        Open live preview
      </a>
      <dl className="flex flex-col text-[15px]">
        {specs.map(([k, v], i) => (
          <div key={k} className={`flex justify-between gap-4 border-t border-line-2 py-3 lg:py-3.5 ${i === specs.length - 1 ? "border-b" : ""}`}>
            <dt className="shrink-0 text-muted-foreground">{k}</dt>
            <dd className="text-right font-semibold">{v}</dd>
          </div>
        ))}
      </dl>
      <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm lg:flex-col lg:gap-3 lg:text-[15px]">
        {["Full source code", "Documentation", "Lifetime updates"].map((item) => (
          <li key={item} className="flex items-center gap-1.5 lg:gap-2.5">
            <Check className="h-4 w-4 text-link lg:h-[18px] lg:w-[18px]" strokeWidth={2.4} aria-hidden />
            {item}
          </li>
        ))}
      </ul>
      <a href={githubUrl} target="_blank" rel="noreferrer noopener" className="flex h-[54px] items-center justify-center rounded-xl bg-brand text-base font-bold text-white hover:opacity-90 lg:hidden">
        Get {t.name}
      </a>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="pt-16 lg:pt-20">
        {/* Title */}
        <section className="flex flex-col gap-4 bg-card px-4 pb-7 pt-6 lg:gap-[22px] lg:px-page lg:pb-10 lg:pt-12">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link> /{" "}
            <Link to={`/templates?type=${t.kind}`} className="hover:text-foreground">{kindPlural}</Link> / {t.name}
          </nav>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <div className="flex flex-col gap-4 lg:max-w-[800px] lg:gap-3.5">
              <div className="flex flex-wrap gap-1.5 lg:gap-2">
                <KindPill kind={t.kind} label={t.kindLabel} />
                {t.isNew && <NewPill />}
                <span className="rounded-md bg-secondary px-[9px] py-1 text-xs font-semibold">{t.category}</span>
              </div>
              <h1 className="text-[44px] font-extrabold leading-none tracking-[-0.035em] lg:text-[64px]">{t.name}</h1>
              <p className="text-base leading-[1.55] text-muted-foreground lg:text-[19px]">{t.description}</p>
            </div>
            <div className="flex flex-col-reverse gap-2.5 lg:shrink-0 lg:flex-row lg:gap-3">
              <div className={`grid gap-2.5 lg:flex lg:gap-3 ${showDocs ? "grid-cols-2" : "grid-cols-1"}`}>
                <a
                  href={t.liveUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex h-[50px] items-center justify-center gap-2 rounded-xl border-[1.5px] border-input px-[22px] text-[15px] font-semibold text-foreground hover:bg-secondary lg:h-[54px] lg:text-base"
                >
                  Live preview <ArrowUpRight className="hidden h-4 w-4 lg:block" aria-hidden />
                </a>
                {showDocs && (
                  <a
                    href={t.docsUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex h-[50px] items-center justify-center rounded-xl border-[1.5px] border-input px-[22px] text-[15px] font-semibold text-foreground hover:bg-secondary lg:h-[54px] lg:text-base"
                  >
                    Docs
                  </a>
                )}
              </div>
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="flex h-[54px] items-center justify-center rounded-xl bg-brand px-[26px] text-base font-bold text-white hover:opacity-90"
              >
                Get {t.name} — Free
              </a>
            </div>
          </div>
        </section>

        {/* Screens */}
        {main && (
          <section
            className="flex flex-col gap-3 px-4 py-7 max-lg:tint-panel lg:gap-6 lg:px-page lg:pb-16 lg:pt-0 lg:[background:linear-gradient(hsl(var(--card))_50%,hsl(var(--background))_50%)]"
            style={{ ["--tint" as string]: t.tint }}
          >
            <BrowserFrame
              src={main.src}
              alt={`${t.name} — ${main.label}`}
              url={hostPath(t.liveUrl)}
              size="lg"
              loading="eager"
              className="h-[248px] rounded-xl shadow-[0_20px_40px_rgba(14,23,38,0.16)] lg:h-[760px] lg:rounded-[20px] lg:shadow-[0_30px_70px_rgba(14,23,38,0.12)] max-lg:[&>div>span]:hidden max-lg:[&>div]:h-6"
            />
            {extra.length === 2 && (
              <div className="grid grid-cols-2 gap-3 lg:gap-6">
                {extra.map((s) => (
                  <BrowserFrame
                    key={s.src}
                    src={s.src}
                    alt={`${t.name} — ${s.label}`}
                    url={s.label}
                    className="h-[124px] rounded-[10px] lg:h-[380px] lg:rounded-2xl max-lg:[&>div>span]:hidden max-lg:[&>div]:h-4"
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Details */}
        <section className="flex flex-col gap-10 px-4 pb-12 pt-8 lg:flex-row lg:items-start lg:gap-12 lg:px-page lg:pb-24">
          <div className="lg:hidden">{priceCard}</div>

          <div className="flex min-w-0 flex-1 flex-col gap-10 lg:gap-14">
            <div className="flex flex-col gap-4 lg:gap-[22px]">
              <h2 className="text-[26px] font-bold tracking-[-0.02em] lg:text-[32px]">What's inside</h2>
              <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-3 lg:gap-3.5">
                {inside.slice(0, 9).map((m, i) => (
                  <div
                    key={m.label}
                    className={`flex-col gap-1 rounded-xl border border-border bg-card p-3.5 lg:gap-1.5 lg:p-[18px] ${i === 8 ? "hidden lg:flex" : "flex"}`}
                  >
                    <span className="text-[15px] font-bold lg:text-base">{m.label}</span>
                    <span className="text-[13px] text-muted-foreground lg:text-sm">{m.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 lg:gap-[22px]">
              <h2 className="text-[26px] font-bold tracking-[-0.02em] lg:text-[32px]">More {kindPlural.toLowerCase()}</h2>
              <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3">
                {related.map((o) => (
                  <Link
                    key={o.id}
                    to={o.href}
                    className="flex items-center gap-3.5 rounded-[14px] border border-border bg-card p-3 text-foreground lg:flex-col lg:items-stretch lg:gap-0 lg:overflow-hidden lg:rounded-2xl lg:p-0"
                  >
                    <div
                      className="tint-panel flex h-[72px] w-24 shrink-0 items-end overflow-hidden rounded-[9px] px-2 pt-2 lg:h-[130px] lg:w-auto lg:rounded-none lg:px-[18px] lg:pt-[18px]"
                      style={{ ["--tint" as string]: o.tint }}
                    >
                      {o.screenshotUrl && (
                        <img
                          src={o.screenshotUrl}
                          alt=""
                          loading="lazy"
                          className="block h-full w-full rounded-t object-cover object-left-top lg:rounded-t-lg lg:object-top lg:shadow-[0_8px_20px_rgba(14,23,38,0.14)]"
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-1 lg:px-[18px] lg:py-4">
                      <span className="text-base font-bold lg:text-[17px]">{o.name}</span>
                      <span className="text-[13px] text-muted-foreground lg:text-sm">{o.shortCategory}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <aside className="hidden w-[380px] shrink-0 lg:block">{priceCard}</aside>
        </section>

        <FaqSection items={faq} />
      </main>

      <Footer />
    </div>
  );
}
