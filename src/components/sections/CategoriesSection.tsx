import { motion } from "framer-motion";
import {
  ExternalLink, Monitor, Moon, Smartphone, Clock,
  LayoutDashboard, Users, DollarSign, Handshake,
  Factory, HeartPulse, GraduationCap, Bot, type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TEMPLATES } from "@/lib/data";

interface CategoryDef {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
}

const CATEGORY_DEFS: CategoryDef[] = [
  { id: "admin-dashboard",      label: "Admin Dashboard",      icon: LayoutDashboard, color: "text-indigo-500" },
  { id: "hr-management",        label: "HR Management",        icon: Users,           color: "text-violet-500" },
  { id: "finance-accounting",   label: "Finance & Accounting", icon: DollarSign,      color: "text-emerald-500" },
  { id: "crm",                  label: "CRM",                  icon: Handshake,       color: "text-orange-500" },
  { id: "erp-systems",          label: "ERP Systems",          icon: Factory,         color: "text-blue-500" },
  { id: "healthcare",           label: "Healthcare",           icon: HeartPulse,      color: "text-rose-500" },
  { id: "education",            label: "Education",            icon: GraduationCap,   color: "text-sky-500" },
  { id: "ai-saas",              label: "AI / SaaS",            icon: Bot,             color: "text-fuchsia-500" },
];

const TEMPLATE_CATEGORY_MAP: Record<string, string[]> = {
  "alpine-admin-react": ["admin-dashboard", "hr-management"],
  "brisk-admin":        ["admin-dashboard"],
};

function TemplateCard({ template }: { template: typeof TEMPLATES[0] }) {
  const badgeColor =
    template.badge === "Popular" ? "from-emerald-500 to-teal-500" :
    template.badge === "Hot"     ? "from-rose-500 to-orange-500"  :
                                   "from-indigo-500 to-purple-600";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
    >
      {/* Screenshot */}
      <div className="relative overflow-hidden bg-secondary/30" style={{ height: 220 }}>
        <div className="absolute inset-x-0 top-0 z-10 flex items-center gap-2 border-b border-border/40 bg-secondary/80 px-3 py-1.5 backdrop-blur-sm">
          <div className="flex gap-1">
            <span className="h-2 w-2 rounded-full bg-rose-400" />
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
          </div>
          <span className="truncate text-[9px] text-muted-foreground">
            {template.liveUrl.replace("https://", "")}
          </span>
        </div>
        <div className="absolute left-3 top-8 z-20">
          <span className={`inline-flex rounded-full bg-gradient-to-r ${badgeColor} px-2.5 py-0.5 text-[10px] font-semibold text-white shadow`}>
            {template.badge}
          </span>
        </div>
        {template.screenshotUrl ? (
          <img
            src={template.screenshotUrl}
            alt={template.name}
            className="absolute inset-0 top-7 h-full w-full object-cover object-top"
          />
        ) : (
          <div className="absolute inset-0 top-7 flex items-center justify-center bg-gradient-to-br from-secondary via-card to-secondary">
            <Monitor className="h-10 w-10 text-muted-foreground/20" />
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/40 group-hover:opacity-100">
          <Button size="sm" variant="gradient" asChild>
            <a href={template.liveUrl} target="_blank" rel="noreferrer noopener">
              <ExternalLink className="h-3.5 w-3.5" /> Live Preview
            </a>
          </Button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="font-bold">{template.name}</h3>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
            {template.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {template.techStack.map((t) => (
            <span key={t} className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">{t}</span>
          ))}
          {template.responsive && (
            <span className="inline-flex items-center gap-1 rounded-full border border-sky-500/30 bg-sky-500/10 px-2 py-0.5 text-[10px] font-medium text-sky-600 dark:text-sky-400">
              <Smartphone className="h-2.5 w-2.5" /> Responsive
            </span>
          )}
          {template.darkMode && (
            <span className="inline-flex items-center gap-1 rounded-full border border-violet-500/30 bg-violet-500/10 px-2 py-0.5 text-[10px] font-medium text-violet-600 dark:text-violet-400">
              <Moon className="h-2.5 w-2.5" /> Dark Mode
            </span>
          )}
        </div>

        <div className="mt-auto flex gap-2 pt-1">
          <Button variant="gradient" size="sm" className="flex-1" asChild>
            <a href={template.liveUrl} target="_blank" rel="noreferrer noopener">
              <ExternalLink className="h-3.5 w-3.5" /> Live Preview
            </a>
          </Button>
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <a href={template.docsUrl} target="_blank" rel="noreferrer noopener">
              <Monitor className="h-3.5 w-3.5" /> View Details
            </a>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function ComingSoonPlaceholder() {
  return (
    <div className="col-span-full flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border bg-secondary/20 py-20 text-center">
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary text-muted-foreground">
        <Clock className="h-5 w-5" />
      </div>
      <div>
        <p className="font-semibold">Coming Soon</p>
        <p className="mt-1 text-sm text-muted-foreground">
          We're working on templates for this category. Stay tuned.
        </p>
      </div>
    </div>
  );
}

export function CategoriesSection() {
  return (
    <section id="categories" className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Browse by Category"
          title="Find the Right Template"
          description="Templates organized by industry and use case. Click a category to explore available templates."
        />

        <div className="mt-14">
          <Tabs defaultValue="admin-dashboard">
            {/* Tab list — scrollable on mobile */}
            <div className="overflow-x-auto pb-1">
              <TabsList className="flex w-max gap-1 rounded-2xl p-1.5">
                {CATEGORY_DEFS.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <TabsTrigger
                      key={cat.id}
                      value={cat.id}
                      className="flex items-center gap-1.5 px-4 py-2 text-sm"
                    >
                      <Icon className={`h-4 w-4 ${cat.color}`} />
                      {cat.label}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            {/* Tab content */}
            {CATEGORY_DEFS.map((cat) => {
              const categoryTemplates = TEMPLATES.filter(
                (t) => TEMPLATE_CATEGORY_MAP[t.id]?.includes(cat.id)
              );
              return (
                <TabsContent key={cat.id} value={cat.id}>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {categoryTemplates.length > 0 ? (
                      categoryTemplates.map((t) => (
                        <TemplateCard key={t.id} template={t} />
                      ))
                    ) : (
                      <ComingSoonPlaceholder />
                    )}
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
