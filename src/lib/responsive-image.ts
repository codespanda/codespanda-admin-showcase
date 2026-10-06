import RESPONSIVE from "./responsive-images.json";

/** Images with an 800px "-sm.webp" sibling, mapped to their full [width, height] (scripts/optimize-images.js). */
const SIZES = RESPONSIVE as unknown as Record<string, [number, number]>;
const SM_WIDTH = 800;

/** `sizes` for BrowserFrame screenshots. Mirrored in scripts/copy-spa-routes.js for the hero preload. */
export const FRAME_SIZES = "(min-width: 1024px) 55vw, 90vw";
/** `sizes` for blog covers: grid cards, the featured post on /blog, and the post page. Mirrored in copy-spa-routes.js. */
export const POST_CARD_SIZES = "(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw";
export const FEATURED_POST_SIZES = "(min-width: 1024px) 56vw, 100vw";
export const POST_COVER_SIZES = "(min-width: 1080px) 1080px, 100vw";
/** `sizes` for template cards in the 1/2/3–4 column grids. */
export const CARD_SIZES = "(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw";

/** srcSet with the small variant when one exists, so phones and card grids download ~800px instead of 1440px. */
export function imageSrcSet(src: string): string | undefined {
  const width = SIZES[src]?.[0];
  if (!width) return undefined;
  return `${src.replace(/\.webp$/, "-sm.webp")} ${SM_WIDTH}w, ${src} ${width}w`;
}

/** Intrinsic size of a listed image, so the browser can reserve its space before it loads. */
export function imageSize(src: string): { width: number; height: number } | undefined {
  const size = SIZES[src];
  return size ? { width: size[0], height: size[1] } : undefined;
}

/** `sizes` for full-width portfolio shot screens. */
export const SHOT_SIZES = "(min-width: 1024px) calc(100vw - 160px), 100vw";
