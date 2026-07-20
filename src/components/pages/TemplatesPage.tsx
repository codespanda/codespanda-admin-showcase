import { lazy, Suspense, useRef } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Monitor, Moon, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TEMPLATES, type Template } from "@/lib/data";
import { Navbar } from "@/components/sections/Navbar";

const Footer = lazy(() =>
  import("@/components/sections/Footer").then((m) => ({ default: m.Footer }))
);

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-4, 4]);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function TemplateCard({ template, index }: { template: Template; index: number }) {
  const badgeVariant =
    template.badge === "Popular" ? "from-emerald-500 to-teal-500" :
    template.badge === "Hot" ? "from-rose-500 to-orange-500" :
    "from-[#0095DD] to-[#005FA3]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <TiltCard className="group relative rounded-3xl border border-border bg-card shadow-xl shadow-black/5 transition-shadow duration-300 hover:shadow-2xl hover:shadow-primary/10 dark:shadow-black/20 overflow-hidden h-full flex flex-col">
        <div className="relative overflow-hidden bg-secondary/30" style={{ height: 260 }}>
          <div className="absolute left-4 top-4 z-10">
            <span className={`inline-flex items-center rounded-full bg-gradient-to-r ${badgeVariant} px-3 py-1 text-xs font-semibold text-white shadow-lg`}>
              {template.badge}
            </span>
          </div>
          <div className="absolute right-4 top-4 z-10">
            <span className="rounded-full border border-border bg-background/80 px-2.5 py-1 text-[10px] font-medium text-muted-foreground backdrop-blur-sm">
              {template.category}
            </span>
          </div>
          {template.screenshotUrl ? (
            <img
              src={template.screenshotUrl}
              alt={`${template.name} preview`}
              loading={index < 2 ? "eager" : "lazy"}
              decoding="async"
              className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-secondary via-card to-secondary">
              <Monitor className="h-12 w-12 text-muted-foreground/30" />
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-4 p-6">
          <div>
            <h3 className="text-xl font-bold">{template.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{template.description}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {template.features.map((f) => (
              <span key={f} className="rounded-full border border-border bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                {f}
              </span>
            ))}
            {template.responsive && (
              <span className="inline-flex items-center gap-1 rounded-full border border-sky-500/30 bg-sky-500/10 px-2.5 py-0.5 text-[11px] font-medium text-sky-600 dark:text-sky-400">
                <Smartphone className="h-2.5 w-2.5" />
                Responsive
              </span>
            )}
            {template.darkMode && (
              <span className="inline-flex items-center gap-1 rounded-full border border-violet-500/30 bg-violet-500/10 px-2.5 py-0.5 text-[11px] font-medium text-violet-600 dark:text-violet-400">
                <Moon className="h-2.5 w-2.5" />
                Dark Mode
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {template.techStack.map((tech) => (
              <span key={tech} className="rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-auto flex items-center gap-3 pt-2">
            <Button variant="gradient" className="flex-1" asChild>
              <a href={template.liveUrl} target="_blank" rel="noreferrer noopener">
                <ExternalLink className="h-4 w-4" />
                Live Preview
              </a>
            </Button>
            <Button variant="outline" className="flex-1" asChild>
              {template.detailsUrl ? (
                <Link to={template.detailsUrl}>
                  <Monitor className="h-4 w-4" />
                  View Details
                </Link>
              ) : (
                <a href={template.docsUrl} target="_blank" rel="noreferrer noopener">
                  <Monitor className="h-4 w-4" />
                  View Details
                </a>
              )}
            </Button>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

export function TemplatesPage() {
  return (
    <>
      <Helmet>
        <title>All Templates — CodeSpanda</title>
        <meta name="description" content="Browse all free, production-ready React admin dashboard and SaaS templates by CodeSpanda. Built with Vite, Tailwind CSS and TypeScript." />
        <link rel="canonical" href="https://codespanda.com/templates" />
        <meta property="og:title" content="All Templates — CodeSpanda" />
        <meta property="og:description" content="Browse all free, production-ready React admin dashboard and SaaS templates by CodeSpanda." />
        <meta property="og:url" content="https://codespanda.com/templates" />
      </Helmet>

      <Navbar />

      <main className="min-h-screen px-4 pt-28 pb-16">
        <div className="mx-auto max-w-6xl">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16 text-center"
          >
            <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
              All Templates
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Browse Every Template
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
              {TEMPLATES.length} free, production-ready templates built with React, Vite, Tailwind CSS and TypeScript.
            </p>
          </motion.div>

          {/* Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {TEMPLATES.map((template, i) => (
              <TemplateCard key={template.id} template={template} index={i} />
            ))}
          </div>
        </div>
      </main>

      <Suspense fallback={<div className="h-72 animate-pulse bg-secondary/30" />}>
        <Footer />
      </Suspense>
    </>
  );
}
