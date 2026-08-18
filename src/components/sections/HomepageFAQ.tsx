import { useState } from "react";
import { ChevronDown } from "lucide-react";

const HOMEPAGE_FAQ = [
  {
    question: "What is an admin dashboard template?",
    answer:
      "An admin dashboard template is a pre-built front-end codebase that gives you the complete UI shell of an admin panel — sidebar navigation, data tables, charts, forms, and authentication layouts — without building it from scratch. CodesPanda admin dashboard templates are built with React, Vite, and Tailwind CSS so you get a production-ready starting point for any internal tool, SaaS back-office, or client portal.",
  },
  {
    question: "Are your admin templates free or paid?",
    answer:
      "Every admin dashboard template in the current library is completely free and released under the MIT License. You can use them in commercial client projects, white-label them, or build SaaS products on top — no attribution required. Premium dashboard templates with extended page sets and additional modules are in development.",
  },
  {
    question: "Can I customize the theme admin colors and branding?",
    answer:
      "Yes. All templates follow the shadcn/ui theming convention: change the CSS custom properties in one file and every component updates automatically. You can swap primary, accent, background, and surface tokens in minutes to match any brand. Tailwind's config file gives you full control over the type scale, border radius, and spacing.",
  },
  {
    question: "Do I need a backend to use a template administrator panel?",
    answer:
      "No. Every template ships with static mock data so you can run it immediately with just npm install && npm run dev. When you're ready to connect a real backend, replace the mock data layer with your own API calls — REST or GraphQL. The templates have no opinion about the backend, so they work equally well with Node.js, Laravel, Django, or any headless CMS.",
  },
];

export function HomepageFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 px-4" aria-labelledby="faq-heading">
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
