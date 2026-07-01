import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Counter } from "@/components/shared/Counter";
import { HERO_STATS } from "@/lib/data";

function MiniFrame({
  imgSrc,
  urlLabel,
  delay,
  className,
}: {
  imgSrc?: string;
  urlLabel: string;
  delay: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/10 ring-1 ring-black/5 dark:shadow-indigo-500/10">
        {/* Chrome bar */}
        <div className="flex items-center gap-2 border-b border-border bg-secondary/60 px-3 py-2">
          <div className="flex gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>
          <div className="flex flex-1 items-center gap-1.5 truncate rounded-md bg-background/60 px-2 py-0.5 text-[10px] text-muted-foreground">
            <ShieldCheck className="h-2.5 w-2.5 shrink-0 text-emerald-500" />
            <span className="truncate">{urlLabel}</span>
          </div>
        </div>
        {/* Screenshot */}
        <div className="relative h-[200px] w-full overflow-hidden bg-secondary/30 sm:h-[240px]">
          {imgSrc ? (
            <img
              src={imgSrc}
              alt={urlLabel}
              className="h-full w-full object-cover object-top"
            />
          ) : (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-secondary via-card to-secondary" />
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden px-4 pb-20 pt-32 sm:pt-36 lg:pb-28 lg:pt-44"
    >
      {/* Ambient gradient blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-br from-indigo-500/10 via-purple-500/8 to-cyan-500/5 blur-3xl"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
        {/* ── Left copy ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Badge variant="gradient" className="mb-6 gap-1.5 py-1 pl-1.5 pr-3">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-primary text-primary-foreground">
              <Sparkles className="h-3 w-3" />
            </span>
            Premium Template Marketplace
          </Badge>

          <h1 className="text-balance text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]">
            Beautiful React Templates{" "}
            <span className="text-gradient">Built for Modern</span> Developers
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            CodeSpanda offers premium dashboards and web application templates
            built with modern technologies. Start with our featured admin
            templates and stay tuned for upcoming releases.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button variant="gradient" size="lg" className="group" asChild>
              <a href="/#templates">
                Browse Templates
                <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </a>
            </Button>
          </div>

          {/* Stats */}
          <dl className="mt-12 grid max-w-md grid-cols-2 gap-6 sm:grid-cols-4">
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
                <p className="mt-0.5 text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </dl>
        </motion.div>

        {/* ── Right: overlapping browser frames ── */}
        <div className="relative hidden lg:block">
          {/* Back frame — Brisk Admin */}
          <div className="absolute -right-4 top-6 w-[85%] opacity-80">
            <MiniFrame
              imgSrc="https://raw.githubusercontent.com/codespanda/brisk-admin/master/public/dashboard.png"
              urlLabel="codespanda.github.io/brisk-admin"
              delay={0.3}
            />
          </div>

          {/* Front frame — Alpine Admin (screenshot) */}
          <div className="relative left-0 top-0 w-[88%] animate-float-slow">
            <MiniFrame
              imgSrc="https://raw.githubusercontent.com/codespanda/Alpine-Admin-React/main/public/dashboard.png"
              urlLabel="codespanda.github.io/Alpine-Admin-React"
              delay={0.15}
            />
          </div>

          {/* Floating badge — Alpine */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
            className="absolute -left-6 bottom-12 hidden animate-float rounded-2xl glass-strong p-3 shadow-xl sm:block"
          >
            <div className="flex items-center gap-2.5">
              <div className="grid h-8 w-8 place-items-center rounded-xl bg-indigo-500/15 text-indigo-500">
                <Sparkles className="h-3.5 w-3.5" />
              </div>
              <div>
                <p className="text-xs font-bold">Alpine Admin</p>
                <p className="text-[10px] text-muted-foreground">React + Vite ✓</p>
              </div>
            </div>
          </motion.div>

          {/* Floating badge — Brisk */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1 }}
            className="absolute -right-2 top-0 hidden animate-float rounded-2xl glass-strong p-3 shadow-xl [animation-delay:1.2s] sm:block"
          >
            <p className="text-[10px] text-muted-foreground">Also available</p>
            <p className="text-sm font-bold text-gradient">Brisk Admin ✓</p>
          </motion.div>
        </div>

        {/* Mobile: single frame */}
        <div className="lg:hidden">
          <MiniFrame
            imgSrc="https://raw.githubusercontent.com/codespanda/Alpine-Admin-React/main/public/dashboard.png"
            urlLabel="codespanda.github.io/Alpine-Admin-React"
            delay={0.2}
          />
        </div>
      </div>
    </section>
  );
}
