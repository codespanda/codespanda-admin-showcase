import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Search } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { TemplateCard } from "@/components/site/TemplateCard";
import { INDUSTRIES, SITE_TEMPLATES, type Industry, type TemplateKind } from "@/lib/site";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

type TypeFilter = "all" | TemplateKind;
type Sort = "newest" | "name";

const TYPES: { id: TypeFilter; label: string; short: string }[] = [
  { id: "all", label: "All templates", short: "All" },
  { id: "web", label: "Web pages", short: "Web" },
  { id: "admin", label: "Admin panels", short: "Admin" },
];

const COUNTS: Record<TypeFilter, number> = {
  all: SITE_TEMPLATES.length,
  web: SITE_TEMPLATES.filter((t) => t.kind === "web").length,
  admin: SITE_TEMPLATES.filter((t) => t.kind === "admin").length,
};

function CustomBox({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-2.5 rounded-2xl bg-band p-[22px] text-white lg:gap-3", className)}>
      <span className="text-lg font-bold lg:text-[17px]">Need something custom?</span>
      <span className="text-[15px] leading-[1.55] text-[#B7C3D1] lg:text-sm">We build web apps and admin panels to order.</span>
      <a href={`mailto:${SITE.email}`} className="py-1.5 text-[15px] font-semibold text-[#7CC4F2] lg:py-0">
        Talk to us →
      </a>
    </div>
  );
}

const sideLabel = "text-[13px] font-bold uppercase tracking-[0.08em] text-muted-foreground";

export function TemplatesPage() {
  const [params, setParams] = useSearchParams();
  const typeParam = params.get("type");
  const type: TypeFilter = typeParam === "web" || typeParam === "admin" ? typeParam : "all";
  const [q, setQ] = useState("");
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [darkOnly, setDarkOnly] = useState(false);
  const [tsOnly, setTsOnly] = useState(false);
  const [sort, setSort] = useState<Sort>("newest");

  const setType = (t: TypeFilter) => {
    const next = new URLSearchParams(params);
    if (t === "all") next.delete("type");
    else next.set("type", t);
    setParams(next, { replace: true });
  };

  const toggleIndustry = (i: Industry) =>
    setIndustries((cur) => (cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i]));

  const items = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const list = SITE_TEMPLATES.filter(
      (t) =>
        (type === "all" || t.kind === type) &&
        (!needle || `${t.name} ${t.category}`.toLowerCase().includes(needle)) &&
        (industries.length === 0 || (t.industry !== undefined && industries.includes(t.industry))) &&
        (!darkOnly || t.darkMode) &&
        (!tsOnly || t.hasTypeScript)
    );
    return sort === "name" ? [...list].sort((a, b) => a.name.localeCompare(b.name)) : list;
  }, [type, q, industries, darkOnly, tsOnly, sort]);

  return (
    <>
      <Helmet>
        <title>Browse Admin Dashboard Templates | CodesPanda</title>
        <meta name="description" content="Explore our full library of admin dashboard templates — SaaS, HR, CRM, healthcare, auto-service &amp; POS. Every template is free, React + Tailwind ready." />
        <link rel="canonical" href="https://codespanda.com/templates" />
        <meta property="og:title" content="Browse Admin Dashboard Templates | CodesPanda" />
        <meta property="og:description" content="Explore our full library of free admin dashboard templates — SaaS, HR, CRM, healthcare, auto-service &amp; POS. Built with React, Vite &amp; Tailwind." />
        <meta property="og:url" content="https://codespanda.com/templates" />
      </Helmet>

      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />

        <main className="flex flex-1 flex-col pt-16 lg:pt-20">
          <section className="flex flex-col gap-3.5 border-b border-border bg-card px-4 pb-6 pt-7 lg:flex-row lg:items-end lg:justify-between lg:gap-12 lg:px-page lg:pb-12 lg:pt-16">
            <div className="flex flex-col gap-3.5 lg:w-[760px]">
              <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
                <Link to="/" className="hover:text-foreground">Home</Link> / Templates
              </nav>
              <h1 className="text-[38px] font-extrabold leading-[1.05] tracking-[-0.035em] lg:text-[56px] lg:leading-[1.04]">All templates</h1>
              <p className="text-base leading-[1.55] text-muted-foreground lg:text-lg">
                Web pages for your customers and admin panels for your team
                <span className="lg:hidden">, each with a live demo and docs.</span>
                <span className="hidden lg:inline">. Every one comes with a live demo and docs.</span>
              </p>
            </div>
            <label className="flex h-[50px] items-center gap-2.5 rounded-xl border-[1.5px] border-input bg-card px-3.5 lg:h-[52px] lg:w-[400px] lg:px-4">
              <Search className="h-[18px] w-[18px] text-muted-foreground" aria-hidden />
              <span className="sr-only">Search templates</span>
              <input
                id="template-search"
                type="search"
                placeholder="Search templates"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="min-w-0 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
              />
            </label>
          </section>

          <section className="flex flex-1 flex-col gap-4 px-4 pb-12 pt-5 lg:flex-row lg:items-start lg:gap-12 lg:px-page lg:pb-24 lg:pt-12">
            {/* Filters (desktop sidebar) */}
            <aside className="hidden w-[260px] shrink-0 flex-col gap-9 lg:flex">
              <div className="flex flex-col gap-3">
                <span className={sideLabel}>Type</span>
                {TYPES.map((t) => {
                  const on = t.id === type;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setType(t.id)}
                      className={cn(
                        "flex h-[46px] items-center justify-between rounded-[10px] border-[1.5px] px-3.5 text-left text-[15px] font-semibold",
                        on ? "border-link bg-blue-soft text-blue-ink" : "border-border bg-card text-foreground hover:bg-secondary"
                      )}
                    >
                      <span>{t.label}</span>
                      <span className="text-[13px] opacity-80">{COUNTS[t.id]}</span>
                    </button>
                  );
                })}
              </div>
              <fieldset className="flex flex-col gap-3.5">
                <legend className={cn(sideLabel, "mb-3.5")}>Industry</legend>
                {INDUSTRIES.map((i) => (
                  <label key={i} className="flex items-center gap-2.5 text-[15px]">
                    <input
                      id={`industry-${i}`}
                      type="checkbox"
                      checked={industries.includes(i)}
                      onChange={() => toggleIndustry(i)}
                      className="h-[18px] w-[18px] accent-brand"
                    />
                    {i}
                  </label>
                ))}
              </fieldset>
              <fieldset className="flex flex-col gap-3.5">
                <legend className={cn(sideLabel, "mb-3.5")}>Includes</legend>
                <label className="flex items-center gap-2.5 text-[15px]">
                  <input id="has-dark" type="checkbox" checked={darkOnly} onChange={(e) => setDarkOnly(e.target.checked)} className="h-[18px] w-[18px] accent-brand" />
                  Dark mode
                </label>
                <label className="flex items-center gap-2.5 text-[15px]">
                  <input id="has-ts" type="checkbox" checked={tsOnly} onChange={(e) => setTsOnly(e.target.checked)} className="h-[18px] w-[18px] accent-brand" />
                  TypeScript
                </label>
              </fieldset>
              <CustomBox />
            </aside>

            <div className="flex min-w-0 flex-1 flex-col gap-4 lg:gap-6">
              {/* Type filter (mobile) */}
              <div className="grid grid-cols-3 gap-2 lg:hidden">
                {TYPES.map((t) => {
                  const on = t.id === type;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setType(t.id)}
                      className={cn(
                        "h-11 rounded-[10px] border-[1.5px] px-1.5 text-sm font-semibold",
                        on ? "border-link bg-blue-soft text-blue-ink" : "border-border bg-card text-foreground"
                      )}
                    >
                      {t.short} · {COUNTS[t.id]}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[15px] text-muted-foreground">
                  Showing <strong className="text-foreground">{items.length}</strong>
                  <span className="hidden lg:inline"> templates</span>
                </span>
                <label className="flex items-center gap-2 text-sm text-muted-foreground lg:gap-2.5 lg:text-[15px]">
                  <span>
                    Sort<span className="hidden lg:inline"> by</span>
                  </span>
                  <select
                    id="template-sort"
                    value={sort}
                    onChange={(e) => setSort(e.target.value as Sort)}
                    className="h-11 rounded-[10px] border-[1.5px] border-input bg-card px-2.5 text-[15px] text-foreground lg:px-3"
                  >
                    <option value="newest">Newest</option>
                    <option value="name">Name</option>
                  </select>
                </label>
              </div>

              {items.length === 0 ? (
                <div className="rounded-2xl border-[1.5px] border-dashed border-input px-5 py-10 text-center text-base text-muted-foreground lg:rounded-[18px] lg:p-16 lg:text-[17px]">
                  No templates match those filters.
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:gap-6 xl:grid-cols-3">
                  {items.map((t) => (
                    <TemplateCard
                      key={t.id}
                      template={t}
                      compact
                      thumbClassName="h-[196px] px-[22px] pt-[26px] lg:h-[200px] lg:px-6 lg:pt-[30px]"
                      aside={
                        <a
                          href={t.liveUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="hidden text-[13px] text-muted-foreground hover:text-foreground lg:inline"
                        >
                          Live demo
                        </a>
                      }
                    />
                  ))}
                </div>
              )}

              <CustomBox className="mt-2 lg:hidden" />
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
