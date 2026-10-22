/**
 * Image and table blocks in the post format, shared by the blog renderer and the studio editor.
 *
 *   ![Caption](/images/blogs/inline/photo.webp)
 *
 *   | Plan | Price |
 *   | --- | --- |
 *   | Free | $0 |
 */

export interface ImageBlock {
  src: string;
  caption: string;
}

/** An image block: a single "![caption](src)" line. */
export function parseImage(block: string): ImageBlock | undefined {
  const m = block.trim().match(/^!\[([^\]]*)\]\(([^)\s]+)\)$/);
  return m ? { caption: m[1].trim(), src: m[2] } : undefined;
}

export const imageText = ({ src, caption }: ImageBlock) => `![${caption.replace(/[[\]]/g, "")}](${src})`;

/** Splits "| a | b \| c |" into ["a", "b | c"]. */
function cells(line: string) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split(/(?<!\\)\|/)
    .map((c) => c.trim().replace(/\\\|/g, "|"));
}

/** A table block: a header row, a "| --- |" separator, then body rows. Returns rows, header first. */
export function parseTable(block: string): string[][] | undefined {
  const lines = block.trim().split("\n").map((l) => l.trim());
  if (lines.length < 2 || !lines.every((l) => l.startsWith("|")) || !/^\|?\s*:?-{3,}/.test(lines[1])) return undefined;
  const rows = [lines[0], ...lines.slice(2)].map(cells);
  const width = Math.max(...rows.map((r) => r.length));
  return rows.map((r) => Array.from({ length: width }, (_, i) => r[i] ?? ""));
}

export function tableText(rows: string[][]) {
  const line = (r: string[]) => `| ${r.map((c) => c.replace(/\s+/g, " ").trim().replace(/\|/g, "\\|") || " ").join(" | ")} |`;
  const [head, ...body] = rows;
  return [line(head), `| ${head.map(() => "---").join(" | ")} |`, ...body.map(line)].join("\n");
}
