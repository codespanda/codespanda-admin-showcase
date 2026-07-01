import { motion } from "framer-motion";
import { ArrowRight, LayoutDashboard, Users, DollarSign, Handshake, Factory, HeartPulse, GraduationCap, Bot } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { type LucideIcon } from "lucide-react";

interface Category {
  name: string;
  count: number;
  available: boolean;
  gradient: string;
  iconColor: string;
  icon: LucideIcon;
  description: string;
}

const CATEGORIES: Category[] = [
  {
    name: "Admin Dashboard",
    count: 2,
    available: true,
    gradient: "from-indigo-500/20 to-purple-500/10",
    iconColor: "bg-indigo-500/10 text-indigo-500",
    icon: LayoutDashboard,
    description: "Full-featured admin panels with charts, tables, and management tools.",
  },
  {
    name: "HR Management",
    count: 1,
    available: true,
    gradient: "from-violet-500/20 to-indigo-500/10",
    iconColor: "bg-violet-500/10 text-violet-500",
    icon: Users,
    description: "Employee management, payroll, attendance, and performance tracking.",
  },
  {
    name: "Finance & Accounting",
    count: 0,
    available: false,
    gradient: "from-emerald-500/20 to-teal-500/10",
    iconColor: "bg-emerald-500/10 text-emerald-500",
    icon: DollarSign,
    description: "Invoicing, expense tracking, budgeting, and financial reporting.",
  },
  {
    name: "CRM",
    count: 0,
    available: false,
    gradient: "from-orange-500/20 to-amber-500/10",
    iconColor: "bg-orange-500/10 text-orange-500",
    icon: Handshake,
    description: "Customer pipelines, contact management, and sales tracking.",
  },
  {
    name: "ERP Systems",
    count: 0,
    available: false,
    gradient: "from-blue-500/20 to-cyan-500/10",
    iconColor: "bg-blue-500/10 text-blue-500",
    icon: Factory,
    description: "End-to-end enterprise resource planning for operations and logistics.",
  },
  {
    name: "Healthcare",
    count: 0,
    available: false,
    gradient: "from-rose-500/20 to-pink-500/10",
    iconColor: "bg-rose-500/10 text-rose-500",
    icon: HeartPulse,
    description: "Patient management, appointments, billing, and medical records.",
  },
  {
    name: "Education",
    count: 0,
    available: false,
    gradient: "from-sky-500/20 to-blue-500/10",
    iconColor: "bg-sky-500/10 text-sky-500",
    icon: GraduationCap,
    description: "School ERP, student portals, course management, and grading.",
  },
  {
    name: "AI / SaaS",
    count: 0,
    available: false,
    gradient: "from-fuchsia-500/20 to-purple-500/10",
    iconColor: "bg-fuchsia-500/10 text-fuchsia-500",
    icon: Bot,
    description: "Modern SaaS dashboards with AI features, usage analytics, and billing.",
  },
];

export function CategoriesSection() {
  return (
    <section id="categories" className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Browse by Category"
          title="Find the Right Template"
          description="Templates organized by industry and use case. More categories and templates are being added regularly."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                />

                <div className="relative z-10">
                  <div className="mb-3 flex items-center justify-between">
                    <div className={`grid h-10 w-10 place-items-center rounded-xl ${cat.iconColor}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    {cat.available ? (
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                        {cat.count} template{cat.count !== 1 ? "s" : ""}
                      </span>
                    ) : (
                      <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-semibold text-muted-foreground">
                        Coming Soon
                      </span>
                    )}
                  </div>

                  <h3 className="font-semibold">{cat.name}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    {cat.description}
                  </p>

                  {cat.available && (
                    <a
                      href="/#templates"
                      className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary transition-all hover:gap-2"
                    >
                      View templates <ArrowRight className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
