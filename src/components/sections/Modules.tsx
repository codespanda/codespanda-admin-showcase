import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Stagger, staggerItem } from "@/components/shared/Reveal";
import { MODULES, type ModuleStatus } from "@/lib/data";

const STATUS_VARIANT: Record<ModuleStatus, "success" | "default" | "warning"> = {
  Live: "success",
  New: "default",
  Soon: "warning",
};

export function Modules() {
  return (
    <section id="modules" className="bg-secondary/20 px-4 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="30+ pages included"
          title="Every module, built and styled"
          description="From employee records to payroll and performance reviews — each page is ready to use and shares the same clean design system."
        />

        <Stagger className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {MODULES.map((module) => {
            const Icon = module.icon;
            return (
              <motion.div key={module.title} variants={staggerItem}>
                <Card className="group flex h-full items-start gap-4 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 text-primary transition-all duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{module.title}</h3>
                      <Badge variant={STATUS_VARIANT[module.status]} className="px-2 py-0">
                        {module.status}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {module.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
