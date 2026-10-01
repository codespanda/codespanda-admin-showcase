import { Link, useParams } from "react-router-dom";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { LEGAL_DOCS, LEGAL_SLUGS } from "@/lib/legal";

/** Renders a single legal/policy document based on the :slug route param. */
export function LegalPage() {
  const { slug = "" } = useParams();
  const doc = LEGAL_DOCS[slug];

  if (!doc) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />
        <main className="flex flex-1 flex-col items-center justify-center gap-3 px-4 pb-20 pt-32 text-center">
          <h1 className="text-[38px] font-extrabold tracking-[-0.035em]">Page not found</h1>
          <p className="text-muted-foreground">We couldn't find the page you're looking for.</p>
          <Link
            to="/"
            className="mt-3 flex h-[52px] items-center rounded-xl bg-brand px-6 text-base font-semibold text-white hover:opacity-90"
          >
            Back to home
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const others = LEGAL_SLUGS.filter((s) => s !== slug);

  return (
    <>
      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />

        <main className="flex flex-1 flex-col pt-16 lg:pt-20">
          {/* Title */}
          <section className="border-b border-border bg-card px-4 pb-8 pt-7 lg:px-page lg:pb-12 lg:pt-16">
            <div className="flex max-w-3xl flex-col gap-3.5">
              <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
                <Link to="/" className="hover:text-foreground">Home</Link> / {doc.eyebrow} / {doc.title}
              </nav>
              <span className="text-[13px] font-bold uppercase tracking-[0.08em] text-link lg:text-sm">{doc.eyebrow}</span>
              <h1 className="text-[38px] font-extrabold leading-[1.05] tracking-[-0.035em] lg:text-[56px] lg:leading-[1.04]">
                {doc.title}
              </h1>
              <p className="text-sm text-muted-foreground">Last updated {doc.updated}</p>
              <p className="text-base leading-[1.6] text-muted-foreground lg:text-lg">{doc.intro}</p>
            </div>
          </section>

          {/* Body */}
          <article className="flex flex-col gap-4 px-4 py-10 lg:px-page lg:py-16">
            <div className="flex max-w-3xl flex-col gap-4 lg:gap-5">
              {doc.sections.map((section) => (
                <section
                  key={section.heading}
                  className="flex flex-col gap-3 rounded-[18px] border border-border bg-card p-[22px] lg:p-8"
                >
                  <h2 className="text-[22px] font-bold tracking-[-0.02em] lg:text-[26px]">{section.heading}</h2>
                  {section.body.map((p, j) => (
                    <p key={j} className="text-[15px] leading-[1.65] text-muted-foreground lg:text-base">
                      {p}
                    </p>
                  ))}
                  {section.list && (
                    <ul className="flex flex-col gap-2 pt-1">
                      {section.list.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-[15px] leading-[1.6] text-muted-foreground lg:text-base">
                          <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-link" aria-hidden />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            {/* Other policies */}
            <nav aria-label="Other policies" className="flex max-w-3xl flex-col gap-3 pt-6 lg:pt-8">
              <span className="text-[13px] font-bold uppercase tracking-[0.08em] text-muted-foreground">More policies</span>
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                {others.map((s) => (
                  <Link
                    key={s}
                    to={`/legal/${s}`}
                    className="flex h-[52px] items-center justify-center rounded-xl border-[1.5px] border-input bg-card px-3 text-center text-[15px] font-semibold text-foreground transition-colors hover:bg-secondary"
                  >
                    {LEGAL_DOCS[s].title}
                  </Link>
                ))}
              </div>
            </nav>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
}
