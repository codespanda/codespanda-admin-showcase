import { Link, useParams } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Reveal } from "@/components/shared/Reveal";
import { LEGAL_DOCS, LEGAL_SLUGS } from "@/lib/legal";

/** Renders a single legal/policy document based on the :slug route param. */
export function LegalPage() {
  const { slug = "" } = useParams();
  const doc = LEGAL_DOCS[slug];

  if (!doc) {
    return (
      <>
        <Navbar />
        <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 pt-32 text-center">
          <h1 className="text-3xl font-bold">Page not found</h1>
          <p className="mt-3 text-muted-foreground">
            We couldn't find the page you're looking for.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const others = LEGAL_SLUGS.filter((s) => s !== slug);

  return (
    <>
      <Navbar />
      <main className="px-4 pb-20 pt-32 sm:pt-36">
        <article className="mx-auto max-w-3xl">
          <Reveal>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> Back to home
            </Link>

            <div className="mt-6 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 text-primary">
                <FileText className="h-5 w-5" />
              </span>
              <Badge variant="gradient">{doc.eyebrow}</Badge>
            </div>

            <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">
              {doc.title}
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Last updated {doc.updated}
            </p>
            <p className="mt-6 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              {doc.intro}
            </p>
          </Reveal>

          <Separator className="my-10" />

          <div className="space-y-10">
            {doc.sections.map((section, i) => (
              <Reveal key={section.heading} delay={Math.min(i * 0.04, 0.2)}>
                <section>
                  <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                    {section.heading}
                  </h2>
                  <div className="mt-3 space-y-3">
                    {section.body.map((p, j) => (
                      <p
                        key={j}
                        className="text-pretty leading-relaxed text-muted-foreground"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                  {section.list && (
                    <ul className="mt-4 space-y-2">
                      {section.list.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-muted-foreground"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              </Reveal>
            ))}
          </div>

          <Separator className="my-10" />

          {/* Cross-links to the other policies */}
          <div className="flex flex-wrap gap-3">
            {others.map((s) => (
              <Link
                key={s}
                to={`/legal/${s}`}
                className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary"
              >
                {LEGAL_DOCS[s].title}
              </Link>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
