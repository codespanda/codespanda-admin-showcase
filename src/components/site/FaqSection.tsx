import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FaqItem {
  q: string;
  a: string;
}

/**
 * FAQ list. Uses <details> so every answer stays in the page (for readers and
 * for the FAQPage structured data that mirrors it) while still collapsing.
 */
export function FaqSection({ items, title = "Frequently asked questions", className }: { items: FaqItem[]; title?: string; className?: string }) {
  if (items.length === 0) return null;
  return (
    <section id="faq" aria-labelledby="faq-heading" className={cn("flex flex-col gap-5 px-4 pb-14 lg:gap-8 lg:px-page lg:pb-28", className)}>
      <div className="flex flex-col items-center gap-2.5 text-center lg:gap-3">
        <span className="text-[13px] font-bold uppercase tracking-[0.08em] text-link lg:text-sm">FAQ</span>
        <h2 id="faq-heading" className="text-[30px] font-bold leading-[1.12] tracking-[-0.025em] lg:text-[44px] lg:tracking-[-0.03em]">
          {title}
        </h2>
      </div>
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-3">
        {items.map((item) => (
          <details key={item.q} className="group rounded-2xl border border-border bg-card open:shadow-[0_8px_24px_rgba(14,23,38,0.06)]">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 text-base font-semibold leading-snug outline-none focus-visible:ring-2 focus-visible:ring-ring lg:px-6 lg:py-5 lg:text-[17px] [&::-webkit-details-marker]:hidden">
              {item.q}
              <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden />
            </summary>
            <p className="px-5 pb-5 text-[15px] leading-[1.65] text-muted-foreground lg:px-6 lg:pb-6 lg:text-base">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/** FAQPage JSON-LD for the same items. */
export function faqJsonLd(items: FaqItem[]) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  });
}
