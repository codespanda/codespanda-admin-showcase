import { useState, type ReactNode } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowUpRight, BookOpen, Check, ChevronRight, Copy, Info } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { HireUsDialog } from "@/components/site/HireUsDialog";
import { getTemplateDocs, type TemplateDocs } from "@/lib/template-docs";
import { getSiteTemplate, type SiteTemplate } from "@/lib/site";
import { SITE } from "@/lib/constants";
import { imageSrcSet } from "@/lib/responsive-image";

function CodeBlock({ code, label }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };
  return (
    <div className="overflow-hidden rounded-[14px] border border-[#22344D] bg-band">
      <div className="flex items-center justify-between border-b border-[#22344D] px-4 py-2">
        <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#93A4B8]">{label ?? "Terminal"}</span>
        <button
          type="button"
          onClick={copy}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold text-[#B7C3D1] hover:bg-white/10 hover:text-white"
        >
          {copied ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Copy className="h-3.5 w-3.5" aria-hidden />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-[13px] leading-[1.7] text-[#E3E9F0] lg:text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="flex scroll-mt-28 flex-col gap-4 border-t border-border pt-10 first:border-t-0 first:pt-0 lg:gap-5">
      <h2 className="text-[26px] font-bold leading-[1.2] tracking-[-0.025em] lg:text-[30px]">{title}</h2>
      {children}
    </section>
  );
}

const P = ({ children }: { children: ReactNode }) => <p className="text-[16px] leading-[1.7] text-foreground/85 lg:text-[17px]">{children}</p>;
const Mono = ({ children }: { children: ReactNode }) => (
  <code className="rounded-md bg-secondary px-1.5 py-0.5 font-mono text-[0.88em] text-foreground">{children}</code>
);
/** A file path shown as a label at the top of a card. */
const PathLabel = ({ children }: { children: ReactNode }) => (
  <code className="self-start break-all rounded-md bg-secondary px-2 py-1 font-mono text-[13.5px] font-semibold text-foreground">{children}</code>
);

function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-3 rounded-[14px] bg-blue-soft px-4 py-3.5 text-[15px] leading-[1.6] text-blue-ink">
      <Info className="mt-0.5 h-[18px] w-[18px] shrink-0" aria-hidden />
      <div>{children}</div>
    </div>
  );
}

/** One screenshot, linking to the full-size image. */
function Shot({ src, label, alt, sizes, eager, className }: { src: string; label: string; alt: string; sizes: string; eager?: boolean; className?: string }) {
  return (
    <figure className={`flex flex-col gap-2.5 ${className ?? ""}`}>
      <a
        href={src}
        target="_blank"
        rel="noreferrer noopener"
        className="group block overflow-hidden rounded-[14px] border border-border bg-secondary shadow-[0_10px_30px_-14px_rgba(14,23,38,0.25)]"
      >
        <img
          src={src}
          srcSet={imageSrcSet(src)}
          sizes={sizes}
          alt={alt}
          width={1600}
          height={1000}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="block aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.015]"
        />
      </a>
      <figcaption className="text-sm font-medium text-muted-foreground">{label}</figcaption>
    </figure>
  );
}

function tocFor(d: TemplateDocs) {
  return [
    { id: "screenshots", label: "Screenshots" },
    { id: "quick-start", label: "Quick start" },
    { id: "scripts", label: "Scripts" },
    { id: "structure", label: "Project structure" },
    { id: "customise", label: "Customise the content" },
    { id: "theme", label: "Colors and theme" },
    { id: "routing", label: "Pages and routing" },
    { id: "deploy", label: "Deployment" },
    ...(d.inAppDocs ? [{ id: "components", label: "Component reference" }] : []),
    ...(d.notes?.length ? [{ id: "notes", label: "Good to know" }] : []),
    { id: "license", label: "License" },
  ];
}

function DocsBody({ d, t }: { d: TemplateDocs; t: SiteTemplate }) {
  const repoName = d.repo.split("/").pop();
  const quickStart = `git clone ${d.repo}.git
cd ${repoName}
npm install
npm run dev`;

  const [main, ...rest] = d.screens;

  return (
    <article className="flex min-w-0 flex-1 flex-col gap-10">
      {main && (
        <Section id="screenshots" title="Screenshots">
          <Shot src={main.src} label={main.label} alt={`${t.name} — ${main.label}`} sizes="(min-width: 1024px) 760px, 100vw" eager />
          {rest.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2">
              {rest.map((s, i) => {
                // An odd one out at the end spans the full row instead of leaving a gap.
                const wide = rest.length % 2 === 1 && i === rest.length - 1;
                return (
                  <Shot
                    key={s.src}
                    src={s.src}
                    label={s.label}
                    alt={`${t.name} — ${s.label}`}
                    sizes={wide ? "(min-width: 1024px) 760px, 100vw" : "(min-width: 1024px) 370px, (min-width: 640px) 50vw, 100vw"}
                    className={wide ? "sm:col-span-2" : undefined}
                  />
                );
              })}
            </div>
          )}
          <P>Click a screenshot to open it full size, or explore everything in the live preview.</P>
        </Section>
      )}

      <Section id="quick-start" title="Quick start">
        <P>
          You need Node.js {d.framework === "Next.js" ? "20.9" : "20"} or newer and npm. Clone the repository, install the dependencies and start
          the dev server:
        </P>
        <CodeBlock code={quickStart} />
        <P>
          Then open <Mono>http://localhost:{d.devPort}</Mono>. Changes reload instantly. You can also download the code as a ZIP from{" "}
          <a href={d.repo} target="_blank" rel="noreferrer noopener" className="font-semibold text-link hover:text-blue-ink">
            GitHub
          </a>{" "}
          (Code → Download ZIP).
        </P>
      </Section>

      <Section id="scripts" title="Scripts">
        <div className="overflow-hidden rounded-[14px] border border-border bg-card">
          {d.scripts.map((s, i) => (
            <div key={s.cmd + i} className="flex flex-col gap-1.5 border-t border-border px-4 py-3.5 first:border-t-0 sm:flex-row sm:items-center sm:gap-6">
              <code className="shrink-0 font-mono text-[14px] font-semibold text-foreground sm:w-[170px]">{s.cmd}</code>
              <span className="text-[15px] leading-[1.55] text-muted-foreground">{s.desc}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section id="structure" title="Project structure">
        <P>
          Built with {d.framework} and {d.language}. The parts you'll work in most:
        </P>
        <CodeBlock code={d.structure} label="Folders" />
      </Section>

      <Section id="customise" title="Customise the content">
        <div className="flex flex-col gap-3">
          {d.content.map((c) => (
            <div key={c.path} className="flex flex-col gap-2 rounded-[14px] border border-border bg-card p-4 lg:p-5">
              <PathLabel>{c.path}</PathLabel>
              <span className="text-[15px] leading-[1.6] text-muted-foreground">{c.desc}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section id="theme" title="Colors and theme">
        <div className="flex flex-col gap-2 rounded-[14px] border border-border bg-card p-4 lg:p-5">
          <PathLabel>{d.theme.path}</PathLabel>
          <span className="text-[15px] leading-[1.6] text-muted-foreground">{d.theme.desc}</span>
        </div>
        {t.darkMode && <Callout>Dark mode is built in: each color has a light and a dark value, so keep both in sync when you rebrand.</Callout>}
      </Section>

      <Section id="routing" title="Pages and routing">
        <P>{d.routing}</P>
      </Section>

      <Section id="deploy" title="Deployment">
        <P>
          <Mono>npm run build</Mono> writes a static site to <Mono>{d.outDir}/</Mono>, so it runs on any static host. The repository is set up for GitHub Pages:
        </P>
        <ol className="flex flex-col gap-3">
          {d.deploy.steps.map((step, i) => (
            <li key={step} className="flex gap-3.5">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-[13px] font-bold text-white">{i + 1}</span>
              <span className="pt-0.5 text-[16px] leading-[1.65] text-foreground/85">{step}</span>
            </li>
          ))}
        </ol>
        <div className="flex flex-col gap-2 rounded-[14px] border border-border bg-card p-4 lg:p-5">
          <span className="text-[15px] font-semibold">Netlify, Vercel or Cloudflare Pages</span>
          <span className="text-[15px] leading-[1.6] text-muted-foreground">
            Import the repository and use build command <Mono>npm run build</Mono> with output folder <Mono>{d.outDir}</Mono>.
          </span>
        </div>
        {d.deploy.fallback && <Callout>{d.deploy.fallback}</Callout>}
      </Section>

      {d.inAppDocs && (
        <Section id="components" title="Component reference">
          <P>
            {t.name} ships with its own in-app documentation covering every component, layout and pattern, with live examples. Open it next to your code
            while you build.
          </P>
          <a
            href={d.inAppDocs}
            target="_blank"
            rel="noreferrer noopener"
            className="flex h-[52px] items-center justify-center gap-2 self-start rounded-xl border-[1.5px] border-input px-5 text-[15px] font-semibold text-foreground hover:bg-secondary"
          >
            <BookOpen className="h-[18px] w-[18px] text-link" aria-hidden /> Open the component docs <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
        </Section>
      )}

      {d.notes && d.notes.length > 0 && (
        <Section id="notes" title="Good to know">
          <ul className="flex flex-col gap-2.5">
            {d.notes.map((n) => (
              <li key={n} className="flex items-start gap-3 text-[16px] leading-[1.65] text-foreground/85">
                <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-link" aria-hidden />
                {n}
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section id="license" title="License">
        <P>
          {t.name} is free and released under the MIT license. Use it for personal and commercial projects, including client work, with no attribution
          required beyond keeping the license notice in the code.
        </P>
      </Section>
    </article>
  );
}

export function TemplateDocsPage() {
  const { slug = "" } = useParams();
  const d = getTemplateDocs(slug);
  const t = d && getSiteTemplate(d.id);
  if (!d || !t) return <Navigate to="/templates" replace />;

  const url = `https://codespanda.com/templates/${d.slug}/docs`;
  const title = `${t.name} Documentation | CodesPanda`;
  const description = `How to install, customise and deploy ${t.name}, the free ${d.framework} template: setup, scripts, project structure, theming and hosting.`;
  const image = t.screenshotUrl ? `https://codespanda.com${t.screenshotUrl}` : "https://codespanda.com/og-cover.png";
  const toc = tocFor(d);

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TechArticle",
          "headline": `${t.name} documentation`,
          "description": description,
          "url": url,
          "image": image,
          "author": { "@type": "Organization", "name": "CodesPanda" },
          "publisher": { "@type": "Organization", "name": "CodesPanda" },
          "about": { "@type": "SoftwareSourceCode", "name": t.name, "codeRepository": d.repo, "programmingLanguage": d.language },
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Templates", "item": "https://codespanda.com/templates" },
            { "@type": "ListItem", "position": 2, "name": t.name, "item": `https://codespanda.com${t.href}` },
            { "@type": "ListItem", "position": 3, "name": "Documentation", "item": url },
          ],
        })}</script>
      </Helmet>

      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />

        <main className="flex flex-1 flex-col pt-16 lg:pt-20">
          {/* Title */}
          <section className="flex flex-col gap-4 border-b border-border bg-card px-4 pb-9 pt-7 lg:flex-row lg:items-end lg:justify-between lg:gap-12 lg:px-page lg:pb-14 lg:pt-12">
            <div className="flex flex-col gap-4 lg:max-w-[780px] lg:gap-[18px]">
              <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
                <Link to="/templates" className="hover:text-foreground">Templates</Link>
                <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                <Link to={t.href} className="hover:text-foreground">{t.name}</Link>
                <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                <span>Documentation</span>
              </nav>
              <span className="text-[13px] font-bold uppercase tracking-[0.08em] text-link lg:text-sm">Documentation</span>
              <h1 className="text-balance text-[38px] font-extrabold leading-[1.05] tracking-[-0.035em] lg:text-[56px] lg:leading-[1.03]">{t.name} docs</h1>
              <p className="text-base leading-[1.6] text-muted-foreground lg:text-lg">
                Everything you need to install, customise and deploy {t.name}: setup, scripts, folder layout, theming and hosting.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {t.techStack.map((s) => (
                  <span key={s} className="rounded-md bg-secondary px-[9px] py-1 text-xs font-semibold">{s}</span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2.5 sm:flex-row lg:shrink-0">
              <a
                href={d.repo}
                target="_blank"
                rel="noreferrer noopener"
                className="flex h-[52px] items-center justify-center gap-2 rounded-xl bg-brand px-6 text-[15px] font-bold text-white hover:opacity-90"
              >
                View on GitHub <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
              <a
                href={t.liveUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="flex h-[52px] items-center justify-center gap-2 rounded-xl border-[1.5px] border-input px-5 text-[15px] font-semibold text-foreground hover:bg-secondary"
              >
                Live preview <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </section>

          {/* Body */}
          <section className="px-4 py-10 lg:px-page lg:py-16">
            <div className="mx-auto flex max-w-[1120px] flex-col gap-10 lg:flex-row lg:items-start lg:gap-14">
              <aside className="flex flex-col gap-5 lg:sticky lg:top-28 lg:w-[250px] lg:shrink-0">
                <nav aria-label="On this page" className="flex flex-col gap-3 rounded-[18px] border border-border bg-card p-5">
                  <span className="text-[13px] font-bold uppercase tracking-[0.08em] text-link">On this page</span>
                  <ol className="flex flex-col gap-2">
                    {toc.map((s) => (
                      <li key={s.id}>
                        <a href={`#${s.id}`} className="block text-[15px] leading-[1.45] text-muted-foreground hover:text-foreground">
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
                <Link
                  to={t.href}
                  className="hidden rounded-[18px] border border-border bg-card p-5 text-[15px] font-semibold text-link hover:text-blue-ink lg:block"
                >
                  ← Back to the {t.name} template
                </Link>
              </aside>

              <DocsBody d={d} t={t} />
            </div>
          </section>

          {/* Help */}
          <section className="px-4 pb-12 lg:px-page lg:pb-[104px]">
            <div className="flex flex-col gap-4 rounded-[22px] bg-brand px-6 py-9 text-white lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:rounded-[28px] lg:px-20 lg:py-[72px]">
              <div className="flex flex-col gap-4 lg:w-[680px]">
                <h2 className="text-[30px] font-bold leading-[1.12] tracking-[-0.025em] lg:text-[46px] lg:leading-[1.08] lg:tracking-[-0.03em]">
                  Want it set up for you?
                </h2>
                <p className="text-base leading-[1.6] text-white lg:text-lg">
                  We can customise {t.name} with your content and branding, connect it to your backend and deploy it.
                </p>
              </div>
              <div className="flex flex-col gap-3 lg:flex-row">
                <a
                  href={SITE.whatsappUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex h-[54px] items-center justify-center rounded-xl bg-white px-7 text-[17px] font-bold text-[#005A94] hover:opacity-90 lg:h-14"
                >
                  Chat with Us
                </a>
                <HireUsDialog>
                  <button
                    type="button"
                    className="flex h-[54px] items-center justify-center rounded-xl border-[1.5px] border-[#7CC4F2] px-[26px] text-[17px] font-semibold text-white hover:bg-white/10 lg:h-14"
                  >
                    Hire us
                  </button>
                </HireUsDialog>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
