import SEO_META from "./seo-meta.json";

/** Search results cut titles at about 60 characters. */
const TITLE_LIMIT = 60;
const SUFFIX = " | CodesPanda";

interface MetaOverride {
  title?: string;
  description?: string;
}

const SHOTS: Record<string, MetaOverride> = SEO_META.shots;
const POSTS: Record<string, MetaOverride> = SEO_META.posts;

/** Adds the brand suffix only when the whole title still fits in search results. Mirrored in scripts/copy-spa-routes.js. */
export function seoTitle(title: string) {
  return (title + SUFFIX).length <= TITLE_LIMIT ? title + SUFFIX : title;
}

/** Shorter title/description for a portfolio shot, where the default ones run long. */
export function shotSeo(id: string): MetaOverride {
  return SHOTS[id] ?? {};
}

/** Shorter title/description for a blog post, where the default ones run long. */
export function postSeo(slug: string): MetaOverride {
  return POSTS[slug] ?? {};
}
