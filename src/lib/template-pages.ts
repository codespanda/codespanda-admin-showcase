import PAGES from "@/content/template-pages.json";
import { TEMPLATES } from "@/lib/data";
import type { FaqItem } from "@/components/site/FaqSection";

/** Search and social tags for a template page. Optional fields fall back to title / description. */
export interface TemplatePageSeo {
  title: string;
  description: string;
  keywords: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  /** Site path of the og:image, e.g. "/images/fincore/hero.webp". */
  image: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlt?: string;
  twitterImageAlt?: string;
  schemaName: string;
  schemaDescription: string;
  schemaCategory: string;
  schemaImage?: string;
  /** Adds the page URL to the Product offer. */
  offerUrl?: boolean;
}

/** Everything on /templates/<slug> besides the card data in templates.json. */
export interface TemplatePageContent {
  slug: string;
  /** Other addresses that open the same page, e.g. "Alpine-Admin-React". */
  aliases?: string[];
  githubUrl: string;
  /** e.g. "October 2026" */
  updated: string;
  screens: { src: string; label: string }[];
  inside: { label: string; desc: string }[];
  faq: FaqItem[];
  seo: TemplatePageSeo;
  /**
   * The tags baked into the static HTML for link previews, when they differ from the page's own.
   * WhatsApp ignores WebP, so the share image is usually a PNG or JPEG.
   */
  share?: { title?: string; description?: string; image?: string };
}

export const TEMPLATE_PAGES = PAGES as Record<string, TemplatePageContent>;

/** The live template whose page is at /templates/<slug> (or one of its aliases). */
export function findTemplatePage(slug: string) {
  const s = slug.toLowerCase();
  for (const t of TEMPLATES) {
    const page = TEMPLATE_PAGES[t.id];
    if (page && (page.slug === s || page.aliases?.some((a) => a.toLowerCase() === s))) return { template: t, page };
  }
  return undefined;
}
