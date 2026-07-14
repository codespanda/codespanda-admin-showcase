import { motion } from "framer-motion";
import { ExternalLink, Linkedin, Dribbble } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CreatorSection() {
  return (
    <section id="about" className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-3xl border border-border bg-card shadow-xl shadow-black/5"
        >
          <div className="grid lg:grid-cols-2">
            {/* Left — info */}
            <div className="flex flex-col justify-center gap-6 p-10 lg:p-14">
              <div>
                <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  Meet the Creator
                </span>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight lg:text-4xl">
                  Hi, I'm <span className="text-gradient">Deepak Kumar</span>
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  Frontend developer passionate about building clean, production-ready React templates and open-source tools that help developers ship faster.
                </p>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  CodeSpanda is my way of giving back to the community — every template here is free, well-crafted, and actively maintained.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button variant="gradient" asChild>
                  <a href="https://codespanda.github.io/portfolio/" target="_blank" rel="noreferrer noopener">
                    <ExternalLink className="h-4 w-4" /> View Portfolio
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://www.linkedin.com/in/deepak-kumar-2b076b109/" target="_blank" rel="noreferrer noopener">
                    <Linkedin className="h-4 w-4" /> LinkedIn
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://dribbble.com/deepak1605" target="_blank" rel="noreferrer noopener">
                    <Dribbble className="h-4 w-4" /> Dribbble
                  </a>
                </Button>
              </div>
            </div>

            {/* Right — portfolio screenshot */}
            <div className="relative overflow-hidden bg-secondary/30 lg:min-h-[420px]">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 border-b border-border/40 bg-secondary/80 px-4 py-2.5 backdrop-blur-sm">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>
                <span className="truncate text-[10px] text-muted-foreground font-mono">
                  codespanda.github.io/portfolio/
                </span>
              </div>
              <a
                href="https://codespanda.github.io/portfolio/"
                target="_blank"
                rel="noreferrer noopener"
                className="group block h-full"
              >
                <img
                  src="/images/portfolio/portfolio.jpg"
                  alt="Deepak Kumar Portfolio"
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/40 group-hover:opacity-100">
                  <span className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-lg">
                    <ExternalLink className="h-3.5 w-3.5" /> Visit Portfolio
                  </span>
                </div>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
