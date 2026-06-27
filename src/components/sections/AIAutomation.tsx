import { motion } from "framer-motion";
import {
  Check,
  ArrowRight,
  CalendarDays,
  Workflow,
  UserCheck,
  BellRing,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/shared/Reveal";
import { WORKFLOW_FEATURES } from "@/lib/data";
import { templateRoute } from "@/components/shared/EmbeddedDashboard";

/** A stylized HR-workflow illustration built from nodes + connectors. */
function WorkflowIllustration() {
  const nodes = [
    { icon: CalendarDays, label: "Leave request", x: "8%", y: "16%", delay: 0 },
    { icon: Workflow, label: "Auto-route", x: "62%", y: "8%", delay: 0.15 },
    { icon: UserCheck, label: "Manager approves", x: "66%", y: "60%", delay: 0.3 },
    { icon: BellRing, label: "Notify team", x: "10%", y: "66%", delay: 0.45 },
  ];

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-cyan-500/5 p-6">
      {/* connecting lines */}
      <svg className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="wf-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <path
          d="M 70 70 C 200 40, 200 60, 300 60 M 300 90 C 340 180, 300 240, 320 300 M 300 320 C 200 360, 160 320, 80 320 M 60 300 C 40 220, 60 160, 60 100"
          fill="none"
          stroke="url(#wf-line)"
          strokeWidth="2"
          strokeDasharray="6 6"
          className="opacity-70"
        />
      </svg>

      {/* center hub */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="grid h-24 w-24 place-items-center rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-500 shadow-2xl shadow-primary/30"
        >
          <Workflow className="h-10 w-10 text-white" />
        </motion.div>
        <div className="absolute inset-0 -z-10 animate-ping rounded-3xl bg-primary/20" />
      </div>

      {/* nodes */}
      {nodes.map((node) => {
        const Icon = node.icon;
        return (
          <motion.div
            key={node.label}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: node.delay, duration: 0.5 }}
            style={{ left: node.x, top: node.y }}
            className="absolute flex animate-float items-center gap-2 rounded-2xl glass-strong px-3 py-2 shadow-lg"
          >
            <Icon className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold">{node.label}</span>
          </motion.div>
        );
      })}
    </div>
  );
}

export function AIAutomation() {
  return (
    <section className="bg-secondary/20 px-4 py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        {/* Left — illustration */}
        <Reveal direction="right">
          <WorkflowIllustration />
        </Reveal>

        {/* Right — content */}
        <Reveal direction="left" delay={0.1}>
          <Badge variant="gradient" className="mb-4">
            Built-in HR workflows
          </Badge>
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Streamline every step of your{" "}
            <span className="text-gradient">people operations</span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            From leave approvals to onboarding and payroll, the template ships
            with the everyday HR workflows your team needs — ready to wire up to
            your own backend.
          </p>

          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {WORKFLOW_FEATURES.map((feature) => (
              <li key={feature} className="flex items-center gap-2.5">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 text-white">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                <span className="text-sm font-medium">{feature}</span>
              </li>
            ))}
          </ul>

          <Button variant="gradient" size="lg" className="group mt-8" asChild>
            <a
              href={templateRoute("leaves")}
              target="_blank"
              rel="noreferrer noopener"
            >
              Explore Workflows
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
              <ExternalLink className="opacity-70" />
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
