/**
 * Presentation helpers for the redesigned marketing pages (Home, Templates,
 * template detail, Portfolio). Everything here is derived from TEMPLATES in
 * `data.ts`, so adding a template there is enough to list it everywhere.
 */
import { TEMPLATES, type Template } from "@/lib/data";

export type TemplateKind = "web" | "admin";

export const INDUSTRIES = [
  "Finance",
  "Healthcare",
  "Education",
  "E-commerce & retail",
  "Travel",
  "Automotive",
  "SaaS",
  "Food & dining",
] as const;
export type Industry = (typeof INDUSTRIES)[number];

export interface SiteTemplate extends Omit<Template, "industry"> {
  kind: TemplateKind;
  kindLabel: "Web page" | "Admin panel";
  /** Category written the way the cards show it: "Finance · Accounting Admin". */
  shortCategory: string;
  tint: string;
  industry?: Industry;
  isNew: boolean;
  href: string;
  hasTypeScript: boolean;
}

function kindOf(t: Template): TemplateKind {
  return /admin|dashboard|pos/i.test(t.category) ? "admin" : "web";
}

export const SITE_TEMPLATES: SiteTemplate[] = TEMPLATES.map((t) => {
  const kind = kindOf(t);
  return {
    ...t,
    kind,
    kindLabel: kind === "admin" ? "Admin panel" : "Web page",
    shortCategory: t.category.replace(/\s*\/\s*/g, " · "),
    tint: t.tint ?? "#EDF1F5",
    industry: INDUSTRIES.find((i) => i === t.industry),
    isNew: t.badge === "New",
    href: t.detailsUrl ?? t.liveUrl,
    hasTypeScript: t.techStack.some((s) => /typescript/i.test(s)),
  };
});

export const WEB_TEMPLATES = SITE_TEMPLATES.filter((t) => t.kind === "web");
export const ADMIN_TEMPLATES = SITE_TEMPLATES.filter((t) => t.kind === "admin");

export function getSiteTemplate(id: string) {
  return SITE_TEMPLATES.find((t) => t.id === id);
}

/** Card label for a template's primary stack, e.g. "React · Tailwind". */
export function stackLabel(t: Template) {
  const pick = (re: RegExp) => t.techStack.find((s) => re.test(s))?.replace(/\s+v?\d.*$/, "");
  return [pick(/^react\b/i), pick(/tailwind/i)?.replace(" CSS", "")].filter(Boolean).join(" · ");
}
