import { Fragment, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { parseMarkdown, tokenizeInline, type InlineToken } from "@/lib/markdown";

export function headingId(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

/** The words of some inline Markdown, without its formatting. */
export function plainText(tokens: InlineToken[]): string {
  return tokens.map((t) => (t.type === "text" || t.type === "code" ? t.text : plainText(t.children))).join("");
}

/** Bold, italic, inline code and links inside a block. */
export function Inline({ text }: { text: string }) {
  const render = (tokens: InlineToken[]): ReactNode[] =>
    tokens.map((t, i) => {
      switch (t.type) {
        case "text":
          return <Fragment key={i}>{t.text}</Fragment>;
        case "code":
          return (
            <code key={i} className="rounded-md bg-secondary px-1.5 py-0.5 font-mono text-[0.88em] text-foreground">
              {t.text}
            </code>
          );
        case "bold":
          return (
            <strong key={i} className="font-semibold text-foreground">
              {render(t.children)}
            </strong>
          );
        case "italic":
          return <em key={i}>{render(t.children)}</em>;
        case "link":
          if (!t.href) return <Fragment key={i}>{render(t.children)}</Fragment>;
          return t.href.startsWith("/") ? (
            <Link key={i} to={t.href} className="font-medium text-link underline underline-offset-2 hover:text-blue-ink">
              {render(t.children)}
            </Link>
          ) : (
            <a key={i} href={t.href} target={t.href.startsWith("#") ? undefined : "_blank"} rel="noreferrer noopener" className="font-medium text-link underline underline-offset-2 hover:text-blue-ink">
              {render(t.children)}
            </a>
          );
      }
    });
  return <>{render(tokenizeInline(text))}</>;
}

/**
 * Renders the limited Markdown described in lib/markdown.ts.
 * "post" is the blog article style; "compact" is the smaller, muted style of portfolio descriptions.
 */
export function MarkdownContent({ text, variant = "post" }: { text: string; variant?: "post" | "compact" }) {
  const compact = variant === "compact";
  return (
    <div className={compact ? "flex flex-col gap-4 text-[15px] leading-[1.65] text-muted-foreground lg:text-base" : "flex flex-col gap-5 text-[17px] leading-[1.75] text-foreground/85 lg:text-lg"}>
      {parseMarkdown(text).map((b, bi) => {
        switch (b.kind) {
          case "h2": {
            const heading = plainText(tokenizeInline(b.text));
            return (
              <h2
                key={bi}
                id={headingId(heading)}
                className={compact ? "mt-3 text-[20px] font-bold leading-[1.25] tracking-[-0.02em] text-foreground first:mt-0" : "mt-6 scroll-mt-28 text-[26px] font-bold leading-[1.2] tracking-[-0.025em] text-foreground first:mt-0 lg:text-[30px]"}
              >
                <Inline text={b.text} />
              </h2>
            );
          }
          case "h3":
            return (
              <h3 key={bi} className={compact ? "mt-2 text-[17px] font-bold leading-[1.3] text-foreground" : "mt-3 text-[21px] font-bold leading-[1.3] tracking-[-0.015em] text-foreground lg:text-[23px]"}>
                <Inline text={b.text} />
              </h3>
            );
          case "ul":
            return (
              <ul key={bi} className="flex flex-col gap-2.5">
                {b.items.map((item, li) => (
                  <li key={li} className="flex items-start gap-3">
                    <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-link" aria-hidden />
                    <span>
                      <Inline text={item} />
                    </span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={bi} className="flex list-decimal flex-col gap-2.5 pl-6 marker:font-semibold marker:text-link">
                {b.items.map((item, li) => (
                  <li key={li} className="pl-1">
                    <Inline text={item} />
                  </li>
                ))}
              </ol>
            );
          case "quote":
            return (
              <blockquote key={bi} className="rounded-2xl border-l-4 border-link bg-blue-soft px-5 py-4 text-blue-ink">
                <Inline text={b.text} />
              </blockquote>
            );
          case "hr":
            return <hr key={bi} className="my-2 border-border" />;
          case "img":
            return (
              <figure key={bi} className="my-2 flex flex-col gap-2.5">
                <img src={b.src} alt={b.alt} loading="lazy" decoding="async" className="w-full rounded-2xl border border-border bg-secondary" />
                {b.alt && <figcaption className="text-center text-sm text-muted-foreground">{b.alt}</figcaption>}
              </figure>
            );
          case "table":
            return (
              <div key={bi} className="my-2 overflow-x-auto rounded-2xl border border-border">
                <table className="w-full border-collapse text-left text-[15px] leading-[1.55] lg:text-base">
                  <thead className="bg-secondary text-foreground">
                    <tr>
                      {b.header.map((c, ci) => (
                        <th key={ci} scope="col" className="whitespace-nowrap px-4 py-3 font-semibold">
                          <Inline text={c} />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, ri) => (
                      <tr key={ri} className="border-t border-border">
                        {r.map((c, ci) => (
                          <td key={ci} className="px-4 py-3 align-top">
                            <Inline text={c} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          default:
            return (
              <p key={bi}>
                <Inline text={b.text} />
              </p>
            );
        }
      })}
    </div>
  );
}
