import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { COMING_SOON } from "@/lib/data";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function ComingSoon() {
  return (
    <section id="coming-soon" className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Coming Soon"
          title="More Templates on the Way"
          description="We're building a comprehensive library of premium templates for every industry. Subscribe to get notified when they drop."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {COMING_SOON.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5"
            >
              {/* Blurred placeholder preview */}
              <div
                className={`relative flex h-32 items-center justify-center overflow-hidden bg-gradient-to-br ${item.gradient}`}
              >
                {/* Fake UI grid */}
                <div className="absolute inset-0 flex flex-col gap-1.5 p-3 blur-sm opacity-50 select-none">
                  <div className="h-2 w-3/4 rounded bg-current opacity-20" />
                  <div className="flex gap-1">
                    <div className="h-8 flex-1 rounded-lg bg-current opacity-10" />
                    <div className="h-8 flex-1 rounded-lg bg-current opacity-10" />
                    <div className="h-8 flex-1 rounded-lg bg-current opacity-10" />
                  </div>
                  <div className="h-2 w-1/2 rounded bg-current opacity-20" />
                  <div className="h-6 w-full rounded-lg bg-current opacity-10" />
                </div>

                {/* Lock overlay */}
                <div className="relative z-10 flex flex-col items-center gap-1.5">
                  <div className="grid h-8 w-8 place-items-center rounded-xl bg-white/20 backdrop-blur-sm dark:bg-white/20">
                    <Lock className="h-4 w-4 text-gray-800 dark:text-white/80" />
                  </div>
                  <span className="rounded-full bg-white/60 px-2.5 py-0.5 text-[10px] font-semibold text-gray-800 backdrop-blur-sm dark:bg-white/20 dark:text-white/90">
                    Coming Soon
                  </span>
                </div>
              </div>

              {/* Card body */}
              <div className="p-4">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {item.category}
                </span>
                <h3 className="mt-1 text-sm font-semibold leading-tight">{item.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Notify CTA — hidden for now */}
        {/* <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-col items-center gap-4 rounded-3xl border border-dashed border-border bg-secondary/30 p-10 text-center"
        >
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Bell className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Want to be first in line?</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Drop us a message and we'll let you know the moment a new template launches.
            </p>
          </div>
          <Button variant="gradient" asChild>
            <a href="mailto:hello@codespanda.com?subject=Notify me about new templates">
              <Bell className="h-4 w-4" />
              Get Notified
            </a>
          </Button>
        </motion.div> */}
      </div>
    </section>
  );
}
