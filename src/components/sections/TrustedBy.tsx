import { Reveal } from "@/components/shared/Reveal";
import { TECH_STACK_LEGACY as TECH_STACK } from "@/lib/data";

export function TrustedBy() {
  return (
    <section className="border-y border-border/60 bg-secondary/20 py-12">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Built with a modern, production-ready stack
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-8 grid grid-cols-2 items-center gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
            {TECH_STACK.map((tech) => (
              <div
                key={tech}
                className="flex items-center justify-center text-lg font-bold text-muted-foreground/60 grayscale transition-all duration-300 hover:text-foreground hover:grayscale-0"
              >
                {tech}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
