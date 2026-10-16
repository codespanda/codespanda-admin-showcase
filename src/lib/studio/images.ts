/** In-browser image conversion for /studio: everything is committed as WebP. */

export interface WebpImage {
  /** Base64 WebP data, ready for the GitHub blob API. */
  base64: string;
  /** Object URL for previewing before saving. */
  previewUrl: string;
  width: number;
  height: number;
  bytes: number;
}

async function toWebp(canvas: HTMLCanvasElement, quality: number): Promise<WebpImage> {
  const blob = await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("This browser can't encode WebP."))), "image/webp", quality)
  );
  const buffer = new Uint8Array(await blob.arrayBuffer());
  let binary = "";
  for (let i = 0; i < buffer.length; i += 0x8000) binary += String.fromCharCode(...buffer.subarray(i, i + 0x8000));
  return { base64: btoa(binary), previewUrl: URL.createObjectURL(blob), width: canvas.width, height: canvas.height, bytes: blob.size };
}

function draw(source: ImageBitmap, sx: number, sy: number, sw: number, sh: number, w: number, h: number) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not available.");
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(source, sx, sy, sw, sh, 0, 0, w, h);
  return canvas;
}

/** Converts an upload to WebP, scaling it down to maxWidth when it's wider. */
export async function convertImage(file: File, maxWidth: number, quality = 0.9): Promise<WebpImage> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxWidth / bitmap.width);
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);
  const image = await toWebp(draw(bitmap, 0, 0, bitmap.width, bitmap.height, w, h), quality);
  bitmap.close();
  return image;
}

/** A card thumbnail: the top of the image cropped to width × height (4:3 for portfolio cards). */
export async function topCrop(file: File, width: number, height: number, quality = 0.88): Promise<WebpImage> {
  const bitmap = await createImageBitmap(file);
  const ratio = width / height;
  const sw = Math.min(bitmap.width, bitmap.height * ratio);
  const sh = sw / ratio;
  const sx = (bitmap.width - sw) / 2;
  const image = await toWebp(draw(bitmap, sx, 0, sw, sh, width, height), quality);
  bitmap.close();
  return image;
}

export function formatBytes(bytes: number) {
  return bytes < 1024 * 1024 ? `${Math.round(bytes / 1024)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

/** URL-safe id from a title: "My Listings — Seller UI" → "my-listings-seller-ui". */
export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70)
    .replace(/-+$/g, "");
}
