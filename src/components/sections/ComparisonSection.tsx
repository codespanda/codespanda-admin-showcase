import { motion } from "framer-motion";
import { CheckCircle2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPARISON } from "@/lib/data";
import { SectionHeading } from "@/components/shared/SectionHeading";

const rows = [
  ["Design Style", "Modern Design", "Enterprise UI"],
  ["Tech Stack", "React + Vite", "React"],
  ["Styling", "Tailwind CSS", "Responsive"],
  ["Theme Support", "Dark Mode", "Clean Layout"],
  ["Live Demo", "✓", "✓"],
];

export function ComparisonSection() {
  return (
    <section id="categories" className="px-4 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Side by Side"
          title="Compare Our Templates"
          description="Both templates are built for production. Choose based on your use case or tech preference."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 overflow-hidden rounded-3xl border border-border bg-card shadow-xl shadow-black/5"
        >
          {/* Header row */}
          <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-border">
            <div className="p-6 text-sm font-semibold text-muted-foreground" />
            {[COMPARISON.alpine, COMPARISON.brisk].map((t) => (
              <div key={t.name} className="border-l border-border p-6">
                <span
                  className={`inline-flex rounded-full ${t.badgeColor} px-2.5 py-0.5 text-[11px] font-semibold text-white`}
                >
                  {t.badge}
                </span>
                <h3 className="mt-2 text-base font-bold leading-tight">{t.name}</h3>
              </div>
            ))}
          </div>

          {/* Comparison rows */}
          {rows.map(([label, alpine, brisk], i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`grid grid-cols-[1fr_1fr_1fr] border-b border-border last:border-0 ${
                i % 2 === 0 ? "bg-secondary/20" : ""
              }`}
            >
              <div className="flex items-center p-4 pl-6 text-sm font-medium text-muted-foreground">
                {label}
              </div>
              {[alpine, brisk].map((val, j) => (
                <div
                  key={j}
                  className="flex items-center gap-2 border-l border-border p-4"
                >
                  {val === "✓" ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-primary/70" />
                      <span className="text-sm font-medium">{val}</span>
                    </>
                  )}
                </div>
              ))}
            </motion.div>
          ))}

          {/* Footer row — CTAs */}
          <div className="grid grid-cols-[1fr_1fr_1fr] border-t border-border bg-secondary/20">
            <div className="p-6 text-sm font-semibold text-muted-foreground">
              Try it live
            </div>
            {[COMPARISON.alpine, COMPARISON.brisk].map((t) => (
              <div key={t.name} className="flex items-center border-l border-border p-4 px-6">
                <Button size="sm" variant="outline" className="gap-1.5" asChild>
                  <a href={t.url} target="_blank" rel="noreferrer noopener">
                    Live Demo <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
