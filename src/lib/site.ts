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
] as const;
export type Industry = (typeof INDUSTRIES)[number];

interface TemplateMeta {
  /** Pastel panel behind the card screenshot. */
  tint: string;
  industry?: Industry;
}

const META: Record<string, TemplateMeta> = {
  shopperscrown: { tint: "#FDEBD8", industry: "E-commerce & retail" },
  interio: { tint: "#EFE7DC" },
  school: { tint: "#E3EEFB", industry: "Education" },
  "ca-firm": { tint: "#E4F1EC", industry: "Finance" },
  finovo: { tint: "#E2F3EC", industry: "Finance" },
  "hamara-bharat": { tint: "#FCE9E4", industry: "Travel" },
  "eva-autocare": { tint: "#E6ECF5", industry: "Automotive" },
  "deepcity-care-hospital": { tint: "#E0F2F4", industry: "Healthcare" },
  "flowers-pos": { tint: "#FBE7EF", industry: "E-commerce & retail" },
  "alpine-admin-react": { tint: "#E3EDF7", industry: "SaaS" },
  "brisk-admin": { tint: "#FFF1D6", industry: "SaaS" },
  cornerstone: { tint: "#ECEAF6", industry: "SaaS" },
  portfolio: { tint: "#ECE9F7" },
};

export interface SiteTemplate extends Template {
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
  const meta = META[t.id] ?? { tint: "#EDF1F5" };
  return {
    ...t,
    kind,
    kindLabel: kind === "admin" ? "Admin panel" : "Web page",
    shortCategory: t.category.replace(/\s*\/\s*/g, " · "),
    tint: meta.tint,
    industry: meta.industry,
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
