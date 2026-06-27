import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Stagger, staggerItem } from "@/components/shared/Reveal";
import { FEATURES } from "@/lib/data";

export function Features() {
  return (
    <section id="features" className="px-4 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Everything HR needs"
          title="A complete toolkit for managing your people"
          description="Twelve fully-built modules — from employee records to payroll and performance — working together in one clean dashboard."
        />

        <Stagger className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div key={feature.title} variants={staggerItem}>
                <Card className="group h-full overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
                  <div className="mb-4 inline-grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 text-primary transition-all duration-300 group-hover:from-indigo-500 group-hover:to-cyan-500 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-semibold">{feature.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
