import { useState } from "react";
import { ChevronDown } from "lucide-react";

const HOMEPAGE_FAQ = [
  {
    question: "Are CodeSpanda templates free to use commercially?",
    answer:
      "All three templates — Alpine Admin React, Brisk Admin, and the Portfolio Template — are released under the MIT License. You can use them in client projects, white-labeled products, and commercial applications with no attribution required. The templates currently available are free; premium templates are in development.",
  },
  {
    question: "What tech stack do the templates use?",
    answer:
      "All templates are built with React 18 and Vite. Alpine Admin React uses TypeScript, Tailwind CSS, shadcn/ui component primitives, and Recharts for data visualization. Brisk Admin uses JavaScript, Tailwind CSS, and shadcn/ui. The Portfolio Template uses TypeScript, Tailwind CSS, and Framer Motion for animations. Each template's detail page lists its complete stack.",
  },
  {
    question: "Do the templates support dark mode?",
    answer:
      "Alpine Admin React ships with full light and dark themes out of the box — toggled via Tailwind's dark-class strategy, no configuration needed. Brisk Admin and the Portfolio Template are light-mode only by default. Tailwind's built-in dark utilities make adding a dark theme to either template straightforward.",
  },
  {
    question: "Can I customize the colors and design tokens?",
    answer:
      "Yes. All templates use Tailwind CSS, so colors, spacing, typography, and border radius are controlled through tailwind.config.js and CSS custom properties. Alpine Admin React and Brisk Admin follow the shadcn/ui theming convention — edit the CSS variables in one file and the change propagates across the entire template. The Portfolio Template uses Tailwind utility classes directly, so re-theming is a matter of updating the config.",
  },
  {
    question: "How do I get support or request a custom template?",
    answer:
      "For bug reports or feature requests, open an issue on the relevant GitHub repository. For custom template work, freelance React development, or a dedicated support arrangement, reach out at contact@codespanda.com — or use the Hire Me link in the footer. Typical response time is within 48 hours.",
  },
];

export function HomepageFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 px-4" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            FAQ
          </span>
          <h2
            id="faq-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Frequently asked questions
          </h2>
          <p className="mt-3 text-muted-foreground">
            Everything you need to know before you start building.
          </p>
        </div>

        <div className="divide-y divide-border rounded-xl border border-border bg-card shadow-sm">
          {HOMEPAGE_FAQ.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-sm font-semibold leading-snug transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
