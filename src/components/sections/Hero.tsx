import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Sparkles, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  EmbeddedDashboard,
  templateRoute,
} from "@/components/shared/EmbeddedDashboard";
import { Counter } from "@/components/shared/Counter";
import { HERO_STATS } from "@/lib/data";

/** Browser-chrome frame wrapping the embedded live dashboard. */
function BrowserFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-indigo-500/10 ring-1 ring-black/5">
      <div className="flex items-center gap-2 border-b border-border bg-secondary/50 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-rose-400" />
          <span className="h-3 w-3 rounded-full bg-amber-400" />
          <span className="h-3 w-3 rounded-full bg-emerald-400" />
        </div>
        <div className="mx-auto flex max-w-full items-center gap-2 truncate rounded-md bg-background/70 px-3 py-1 text-[11px] text-muted-foreground">
          <ShieldCheck className="h-3 w-3 shrink-0 text-emerald-500" />
          <span className="truncate">codespanda.github.io/Alpine-Admin-React</span>
        </div>
      </div>
      {children}
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden px-4 pb-16 pt-32 sm:pt-36 lg:pb-24 lg:pt-40"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Badge variant="gradient" className="mb-5 gap-1.5 py-1 pl-1.5 pr-3">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-primary text-primary-foreground">
              <Sparkles className="h-3 w-3" />
            </span>
            HR admin dashboard template
          </Badge>

          <h1 className="text-balance text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.5rem]">
            Run Your Entire HR Operation from One{" "}
            <span className="text-gradient">Modern Dashboard</span>
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
            Employees, departments, attendance, leave, payroll, performance, and
            reports — all in one beautifully designed admin template built with
            React, Vite, TypeScript & Tailwind CSS.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button variant="gradient" size="lg" className="group" asChild>
              <a
                href={templateRoute("dashboard")}
                target="_blank"
                rel="noreferrer noopener"
              >
                View Live Dashboard
                <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </a>
            </Button>
            <Button variant="outline" size="lg" className="group" asChild>
              <a
                href={templateRoute("components")}
                target="_blank"
                rel="noreferrer noopener"
              >
                <ExternalLink />
                Browse Components
              </a>
            </Button>
          </div>

          {/* Hero stats */}
          <dl className="mt-12 grid max-w-lg grid-cols-2 gap-6 sm:grid-cols-4">
            {HERO_STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-2xl font-bold tracking-tight">
                  <Counter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                  />
                </dd>
                <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </dl>
        </motion.div>

        {/* Right — floating live dashboard */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="animate-float-slow">
            <BrowserFrame>
              <EmbeddedDashboard
                route="dashboard"
                scale={0.62}
                className="h-[420px] sm:h-[460px]"
              />
            </BrowserFrame>
          </div>

          {/* Floating accent cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute -left-4 top-16 hidden animate-float rounded-2xl glass-strong p-3 shadow-xl sm:block"
          >
            <div className="flex items-center gap-2.5">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-500/15 text-emerald-500">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-bold">Live Template</p>
                <p className="text-[10px] text-muted-foreground">
                  Fully interactive
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute -right-3 bottom-16 hidden animate-float rounded-2xl glass-strong p-3 shadow-xl [animation-delay:1.5s] sm:block"
          >
            <p className="text-[10px] text-muted-foreground">Built with</p>
            <p className="text-sm font-bold text-gradient">React + Vite ✓</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
