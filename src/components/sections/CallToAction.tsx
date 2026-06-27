import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/Reveal";
import { templateRoute } from "@/components/shared/EmbeddedDashboard";

export function CallToAction() {
  return (
    <section className="px-4 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal direction="scale">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 px-6 py-16 text-center shadow-2xl shadow-primary/30 sm:px-12 lg:py-24">
            {/* Decorative blobs */}
            <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
            <div
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                backgroundSize: "28px 28px",
                maskImage:
                  "radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%)",
              }}
            />

            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                See the Complete Dashboard in Action
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-pretty text-base text-indigo-100 sm:text-lg">
                Explore every module of the live admin template — fully
                interactive, responsive, and built with React, Vite & Tailwind.
              </p>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Button
                  size="lg"
                  className="group bg-white text-indigo-700 shadow-lg hover:bg-white/90"
                  asChild
                >
                  <a
                    href={templateRoute("dashboard")}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Open Live Demo
                    <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="group border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20 hover:text-white"
                  asChild
                >
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
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
