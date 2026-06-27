import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import {
  EmbeddedDashboard,
  templateRoute,
} from "@/components/shared/EmbeddedDashboard";

/** Each tab maps to a real route inside the Alpine Admin template. */
const PREVIEW_TABS: { label: string; route: string }[] = [
  { label: "Overview", route: "dashboard" },
  { label: "Employees", route: "employees" },
  { label: "Attendance", route: "attendance" },
  { label: "Payroll", route: "payroll" },
  { label: "Reports", route: "reports" },
  { label: "Charts", route: "charts" },
  { label: "Settings", route: "settings" },
];

export function DashboardPreview() {
  const [active, setActive] = useState(PREVIEW_TABS[0].route);

  return (
    <section id="dashboard" className="px-4 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Live preview"
          title="A real, working dashboard you can click through"
          description="This isn't a screenshot — it's the live admin template embedded right here. Switch tabs to explore each module."
        />

        <Reveal delay={0.1} className="mt-12">
          <Tabs value={active} onValueChange={setActive} className="w-full">
            <div className="flex justify-center">
              <div className="max-w-full overflow-x-auto scrollbar-thin pb-2">
                <TabsList>
                  {PREVIEW_TABS.map((tab) => (
                    <TabsTrigger key={tab.route} value={tab.route}>
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </div>

            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="group relative mx-auto mt-6 max-w-5xl"
            >
              {/* Glow */}
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-cyan-500/20 opacity-60 blur-2xl" />
              <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-indigo-500/10">
                <div className="flex items-center gap-2 border-b border-border bg-secondary/50 px-4 py-2.5">
                  <div className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-rose-400" />
                    <span className="h-3 w-3 rounded-full bg-amber-400" />
                    <span className="h-3 w-3 rounded-full bg-emerald-400" />
                  </div>
                  <span className="mx-auto truncate text-[11px] font-medium text-muted-foreground">
                    codespanda.github.io/Alpine-Admin-React/{active}
                  </span>
                </div>
                <EmbeddedDashboard
                  key={active}
                  route={active}
                  interactive
                  scale={0.78}
                  className="h-[480px] sm:h-[560px]"
                />
              </div>
            </motion.div>
          </Tabs>
        </Reveal>

        <Reveal delay={0.2} className="mt-8 text-center">
          <Button variant="outline" size="lg" className="group" asChild>
            <a
              href={templateRoute(active)}
              target="_blank"
              rel="noreferrer noopener"
            >
              Open this page in a new tab
              <ExternalLink className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
