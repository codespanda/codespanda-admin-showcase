import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Counter } from "@/components/shared/Counter";
import { BuyCoffeeButton } from "@/components/shared/BuyCoffeeButton";
import { HERO_STATS } from "@/lib/data";

function MiniFrame({
  imgSrc,
  urlLabel,
  delay,
  priority,
  className,
}: {
  imgSrc?: string;
  urlLabel: string;
  delay: number;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`animate-fade-in-up ${className ?? ""}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/10 ring-1 ring-black/5 dark:shadow-indigo-500/10">
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
        <div className="relative h-[200px] w-full overflow-hidden bg-secondary/30 sm:h-[240px]">
          {imgSrc ? (
            <img
              src={imgSrc}
              alt={urlLabel}
              className="h-full w-full object-cover object-top"
              loading={priority ? "eager" : "lazy"}
              fetchPriority={priority ? "high" : "auto"}
            />
          ) : (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-secondary via-card to-secondary" />
          )}
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden px-4 pb-20 pt-32 sm:pt-36 lg:pb-28 lg:pt-44"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-br from-indigo-500/10 via-purple-500/8 to-cyan-500/5 blur-3xl"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
        {/* Left copy */}
        <div className="animate-fade-in-up">
          <Badge variant="gradient" className="mb-6 gap-1.5 py-1 pl-1.5 pr-3">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-primary text-primary-foreground">
              <Sparkles className="h-3 w-3" />
            </span>
            Premium Template Marketplace
          </Badge>

          <h1 className="text-balance text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]">
            Admin Dashboard Templates{" "}
            <span className="text-gradient">Built for Modern</span> Developers
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            CodesPanda is a free admin dashboard template library built for
            developers who ship. Every template in our collection — from HR
            management and CRM to retail POS and healthcare — is built with
            React, Vite, and Tailwind CSS. Each admin dashboard template is
            production-ready from day one: TypeScript, shadcn/ui components,
            responsive layouts, and clean code you can actually maintain.
            Download any template, adapt the theme admin colors to your brand,
            and go live. No license fees, no attribution required.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button variant="gradient" size="lg" className="group" asChild>
              <Link to="/templates">
                Browse Templates
                <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <BuyCoffeeButton />
          </div>

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
        </div>

        {/* Right: overlapping browser frames */}
        <div className="relative hidden lg:block">
          <div className="absolute -right-4 top-6 w-[85%] opacity-80">
            <MiniFrame
              imgSrc="/images/brisk-dashboard.webp"
              urlLabel="brisk.codespanda.com"
              delay={0.3}
            />
          </div>

          <div className="relative left-0 top-0 w-[88%] animate-float-slow">
            <MiniFrame
              imgSrc="/images/alpine-dashboard.webp"
              urlLabel="codespanda.github.io/Alpine-Admin-React"
              delay={0.15}
              priority
            />
          </div>

          {/* Floating badge — Alpine */}
          <div
            className="absolute -left-6 bottom-12 hidden animate-fade-in-left animate-float rounded-2xl glass-strong p-3 shadow-xl sm:block"
            style={{ animationDelay: "0.9s" }}
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
          </div>

          {/* Floating badge — Brisk */}
          <div
            className="absolute -right-2 top-0 hidden animate-fade-in-right animate-float rounded-2xl glass-strong p-3 shadow-xl [animation-delay:1.2s] sm:block"
            style={{ animationDelay: "1.1s" }}
          >
            <p className="text-[10px] text-muted-foreground">Also available</p>
            <p className="text-sm font-bold text-gradient">Brisk Admin ✓</p>
          </div>
        </div>

        {/* Mobile: single frame */}
        <div className="lg:hidden">
          <MiniFrame
            imgSrc="/images/alpine-dashboard.webp"
            urlLabel="codespanda.github.io/Alpine-Admin-React"
            delay={0.2}
          />
        </div>
      </div>
    </section>
  );
}
