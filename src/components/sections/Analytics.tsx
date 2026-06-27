import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Stagger, staggerItem } from "@/components/shared/Reveal";
import { Counter } from "@/components/shared/Counter";
import { Sparkline, BarChart } from "@/components/shared/Charts";
import { ANALYTICS_CARDS, EMPLOYEE_GROWTH, GROWTH_MONTHS } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Analytics() {
  return (
    <section id="analytics" className="px-4 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Data visualization"
          title="Beautiful charts, powered by Recharts"
          description="Headcount growth, attendance, hiring trends, and department distribution — every HR metric visualized with clean, responsive charts."
        />

        <Stagger className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ANALYTICS_CARDS.map((card) => {
            const positive = card.change >= 0;
            return (
              <motion.div key={card.label} variants={staggerItem}>
                <Card className="group h-full overflow-hidden p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {card.label}
                      </p>
                      <p className="mt-1 text-2xl font-bold tracking-tight">
                        <Counter
                          value={card.value}
                          prefix={card.prefix}
                          suffix={card.suffix}
                          decimals={card.decimals}
                        />
                      </p>
                    </div>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold",
                        positive
                          ? "bg-emerald-500/10 text-emerald-500"
                          : "bg-rose-500/10 text-rose-500"
                      )}
                    >
                      {positive ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {positive ? "+" : ""}
                      {card.change}%
                    </span>
                  </div>
                  <div className="mt-4 h-14">
                    <Sparkline data={card.series} />
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </Stagger>

        {/* Wide analytics panel */}
        <motion.div
          variants={staggerItem}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Card className="mt-4 overflow-hidden p-6 lg:p-8">
            <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Employee Growth
                    </p>
                    <p className="text-3xl font-bold tracking-tight">
                      <Counter value={196} /> employees
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-sm font-semibold text-emerald-500">
                    <TrendingUp className="h-4 w-4" /> +12%
                  </span>
                </div>
                <div className="mt-6 h-44">
                  <BarChart data={EMPLOYEE_GROWTH} labels={GROWTH_MONTHS} />
                </div>
              </div>

              <div className="flex flex-col justify-center gap-4 border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                {[
                  { label: "Attendance Rate", value: "92.5%", bar: 92 },
                  { label: "Active Employees", value: "178 / 196", bar: 91 },
                  { label: "Retention Rate", value: "94%", bar: 94 },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-semibold">{item.value}</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500"
                        style={{ width: `${item.bar}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
