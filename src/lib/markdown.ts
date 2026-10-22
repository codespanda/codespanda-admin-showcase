// The limited Markdown format used for blog post bodies, shared by the
// public renderer (PostContent in BlogPostPage.tsx) and the studio's visual editor.
// Supported: ## / ### headings, paragraphs, - or * bullet lists, 1. numbered
// lists, > callouts, --- dividers, **bold**, *italic* or _italic_, `code`,
// [links](url), images on their own line as ![description](path) and tables
// as | pipe | rows | with a |---| separator under the header row.

export type InlineToken =
  | { type: "text"; text: string }
  | { type: "code"; text: string }
  | { type: "bold" | "italic"; children: InlineToken[] }
  | { type: "link"; href?: string; children: InlineToken[] };

export type MarkdownBlock =
  | { kind: "h2" | "h3" | "p" | "quote"; text: string }
  | { kind: "ul" | "ol"; items: string[] }
  | { kind: "hr" }
  | { kind: "img"; alt: string; src: string }
  | { kind: "table"; header: string[]; rows: string[][] };

const INLINE = /(\*\*.+?\*\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\)|\*[^*\s][^*]*?\*|_[^_\s][^_]*?_)/g;

/** Only web, email and same-site links are allowed. */
export function safeHref(href: string) {
  return /^(https?:\/\/|mailto:|\/|#)/i.test(href) ? href : undefined;
}

/** Image sources: site assets, web images, or (while drafting) uploaded data. */
export function safeImageSrc(src: string) {
  return /^(https:\/\/|\/|assets\/|data:image\/(png|jpe?g|webp|gif);base64,)/i.test(src) ? src : undefined;
}

const IMAGE_LINE = /^!\[([^\]]*)\]\(([^)\s]+)\)$/;

/** Splits a | a | b | table row into cells, honouring \| escapes. */
function splitRow(line: string) {
  const inner = line.trim().replace(/^\|/, "").replace(/\|$/, "");
  return inner.split(/(?<!\\)\|/).map((c) => c.trim().replace(/\\\|/g, "|"));
}

const isTableRow = (line: string) => /^\|.*\|$/.test(line.trim());
const isSeparator = (line: string) => /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?$/.test(line.trim());

export function tokenizeInline(text: string): InlineToken[] {
  const tokens: InlineToken[] = [];
  for (const part of text.split(INLINE)) {
    if (!part) continue;
    if (part.length > 4 && part.startsWith("**") && part.endsWith("**")) {
      tokens.push({ type: "bold", children: tokenizeInline(part.slice(2, -2)) });
    } else if (part.length > 2 && part.startsWith("`") && part.endsWith("`")) {
      tokens.push({ type: "code", text: part.slice(1, -1) });
    } else if (part.length > 2 && ((part.startsWith("*") && part.endsWith("*")) || (part.startsWith("_") && part.endsWith("_")))) {
      tokens.push({ type: "italic", children: tokenizeInline(part.slice(1, -1)) });
    } else {
      const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
      if (link) tokens.push({ type: "link", href: safeHref(link[2]), children: tokenizeInline(link[1]) });
      else tokens.push({ type: "text", text: part });
    }
  }
  return tokens;
}

export function parseMarkdown(markdown: string): MarkdownBlock[] {
  const blocks: MarkdownBlock[] = [];
  const lines = markdown.replace(/\r\n?/g, "\n").split("\n");
  let para: string[] = [];
  let quote: string[] = [];
  let list: { kind: "ul" | "ol"; items: string[] } | null = null;

  const flush = () => {
    if (para.length) blocks.push({ kind: "p", text: para.join(" ") });
    if (quote.length) blocks.push({ kind: "quote", text: quote.join(" ") });
    if (list) blocks.push(list);
    para = [];
    quote = [];
    list = null;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) {
      flush();
      continue;
    }
    let m: RegExpMatchArray | null;
    if ((m = line.match(IMAGE_LINE))) {
      flush();
      const src = safeImageSrc(m[2]);
      if (src) blocks.push({ kind: "img", alt: m[1], src });
    } else if (isTableRow(line) && i + 1 < lines.length && isSeparator(lines[i + 1])) {
      flush();
      const header = splitRow(line);
      const rows: string[][] = [];
      i += 2;
      while (i < lines.length && isTableRow(lines[i])) {
        const cells = splitRow(lines[i]);
        rows.push(header.map((_, c) => cells[c] ?? ""));
        i++;
      }
      i--;
      blocks.push({ kind: "table", header, rows });
    } else if ((m = line.match(/^#{1,2}\s+(.+)$/))) {
      flush();
      blocks.push({ kind: "h2", text: m[1] });
    } else if ((m = line.match(/^#{3,6}\s+(.+)$/))) {
      flush();
      blocks.push({ kind: "h3", text: m[1] });
    } else if (/^(-{3,}|\*{3,})$/.test(line)) {
      flush();
      blocks.push({ kind: "hr" });
    } else if ((m = line.match(/^[-*+]\s+(.+)$/))) {
      if (!list || list.kind !== "ul") {
        flush();
        list = { kind: "ul", items: [] };
      }
      list.items.push(m[1]);
    } else if ((m = line.match(/^\d+[.)]\s+(.+)$/))) {
      if (!list || list.kind !== "ol") {
        flush();
        list = { kind: "ol", items: [] };
      }
      list.items.push(m[1]);
    } else if ((m = line.match(/^>\s?(.*)$/))) {
      if (para.length || list) flush();
      quote.push(m[1]);
    } else {
      if (quote.length || list) flush();
      para.push(line);
    }
  }
  flush();
  return blocks;
}

// ---- Conversion for the visual editor ----

const escapeHtml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function inlineToHtml(tokens: InlineToken[]): string {
  return tokens
    .map((t) => {
      switch (t.type) {
        case "text":
          return escapeHtml(t.text);
        case "code":
          return `<code>${escapeHtml(t.text)}</code>`;
        case "bold":
          return `<strong>${inlineToHtml(t.children)}</strong>`;
        case "italic":
          return `<em>${inlineToHtml(t.children)}</em>`;
        case "link":
          return t.href ? `<a href="${escapeHtml(t.href)}">${inlineToHtml(t.children)}</a>` : inlineToHtml(t.children);
      }
    })
    .join("");
}

/** Markdown → HTML, for loading a draft into the editor. */
export function markdownToHtml(markdown: string): string {
  const inline = (text: string) => inlineToHtml(tokenizeInline(text));
  return parseMarkdown(markdown)
    .map((b) => {
      switch (b.kind) {
        case "h2":
          return `<h2>${inline(b.text)}</h2>`;
        case "h3":
          return `<h3>${inline(b.text)}</h3>`;
        case "p":
          return `<p>${inline(b.text)}</p>`;
        case "quote":
          return `<blockquote><p>${inline(b.text)}</p></blockquote>`;
        case "ul":
          return `<ul>${b.items.map((i) => `<li><p>${inline(i)}</p></li>`).join("")}</ul>`;
        case "ol":
          return `<ol>${b.items.map((i) => `<li><p>${inline(i)}</p></li>`).join("")}</ol>`;
        case "hr":
          return "<hr>";
        case "img":
          return `<img src="${escapeHtml(b.src)}" alt="${escapeHtml(b.alt)}">`;
        case "table": {
          const head = `<tr>${b.header.map((h) => `<th><p>${inline(h)}</p></th>`).join("")}</tr>`;
          const body = b.rows.map((r) => `<tr>${r.map((c) => `<td><p>${inline(c)}</p></td>`).join("")}</tr>`).join("");
          return `<table><tbody>${head}${body}</tbody></table>`;
        }
      }
    })
    .join("");
}

/** The parts of an editor (ProseMirror) JSON document we read. */
export type DocNode = {
  type?: string;
  text?: string;
  attrs?: Record<string, unknown>;
  marks?: { type: string; attrs?: Record<string, unknown> }[];
  content?: DocNode[];
};

function textToMarkdown(node: DocNode): string {
  if (node.type === "hardBreak") return " ";
  let out = (node.text ?? "").replace(/\s+/g, " ");
  if (!out.trim()) return out;
  const marks = node.marks ?? [];
  const has = (type: string) => marks.some((m) => m.type === type);
  if (has("code")) out = `\`${out}\``;
  if (has("italic")) out = `_${out}_`;
  if (has("bold")) out = `**${out}**`;
  const link = marks.find((m) => m.type === "link");
  const href = typeof link?.attrs?.href === "string" ? safeHref(link.attrs.href) : undefined;
  if (href) out = `[${out}](${href})`;
  return out;
}

const inlineMd = (node: DocNode) => (node.content ?? []).map(textToMarkdown).join("").trim();

/** Flattens a list item (and any nested lists) into one line of text. */
const listItemMd = (item: DocNode): string =>
  (item.content ?? [])
    .map((child) => (child.type === "bulletList" || child.type === "orderedList" ? (child.content ?? []).map(listItemMd).join("; ") : inlineMd(child)))
    .filter(Boolean)
    .join(" ");

/** Table cells hold one line in Markdown, so lists inside them are flattened. */
const cellMd = (cell: DocNode) =>
  (cell.content ?? [])
    .map((child) => (child.type === "bulletList" || child.type === "orderedList" ? (child.content ?? []).map(listItemMd).join("; ") : inlineMd(child)))
    .filter(Boolean)
    .join(" ")
    .replace(/\|/g, "\\|");

function tableToMarkdown(table: DocNode) {
  const rows = (table.content ?? [])
    .map((row) => (row.content ?? []).map(cellMd))
    // Leave out completely empty rows (the header row is always kept).
    .filter((cells, i) => i === 0 || cells.some(Boolean));
  if (!rows.length) return "";
  const cols = Math.max(...rows.map((r) => r.length));
  const pad = (r: string[]) => Array.from({ length: cols }, (_, i) => r[i] ?? "");
  const line = (r: string[]) => `| ${pad(r).join(" | ")} |`;
  const [header, ...body] = rows;
  return [line(header), `|${" --- |".repeat(cols)}`, ...body.map(line)].join("\n");
}

/** Editor document → Markdown, in the format the site renders. */
export function docToMarkdown(doc: DocNode): string {
  return (doc.content ?? [])
    .map((node) => {
      switch (node.type) {
        case "heading": {
          const text = inlineMd(node);
          if (!text) return "";
          return `${Number(node.attrs?.level) >= 3 ? "###" : "##"} ${text}`;
        }
        case "paragraph":
          return inlineMd(node);
        case "blockquote": {
          const text = (node.content ?? []).map(inlineMd).filter(Boolean).join(" ");
          return text ? `> ${text}` : "";
        }
        case "bulletList":
          return (node.content ?? []).map((i) => `- ${listItemMd(i)}`).join("\n");
        case "orderedList":
          return (node.content ?? []).map((i, n) => `${n + 1}. ${listItemMd(i)}`).join("\n");
        case "horizontalRule":
          return "---";
        case "image": {
          const src = typeof node.attrs?.src === "string" ? safeImageSrc(node.attrs.src) : undefined;
          if (!src) return "";
          const alt = String(node.attrs?.alt ?? "")
            .replace(/[[\]\n]/g, " ")
            .trim();
          return `![${alt}](${src})`;
        }
        case "table":
          return tableToMarkdown(node);
        default:
          return inlineMd(node);
      }
    })
    .filter(Boolean)
    .join("\n\n");
}

/** The words of some Markdown as one line of plain text, for meta descriptions. */
export function markdownToPlain(markdown: string): string {
  const words = (tokens: InlineToken[]): string => tokens.map((t) => (t.type === "text" || t.type === "code" ? t.text : words(t.children))).join("");
  const plain = (text: string) => words(tokenizeInline(text));
  return parseMarkdown(markdown)
    .map((b) => {
      switch (b.kind) {
        case "ul":
        case "ol":
          return b.items.map(plain).join(" ");
        case "table":
          return "";
        case "img":
        case "hr":
          return "";
        default:
          return plain(b.text);
      }
    })
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}
