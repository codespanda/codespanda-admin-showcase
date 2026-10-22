import { useEffect, useRef, useState, type ReactNode } from "react";
import { Columns3, Heading2, ImagePlus, List, Pencil, Pilcrow, Redo2, Rows3, Table2, Trash2, Undo2 } from "lucide-react";
import { imageText, parseImage, parseTable, tableText } from "@/lib/post-format";
import { cn } from "@/lib/utils";

/**
 * A small WYSIWYG editor that reads and writes the site's plain-text format:
 * blocks separated by a blank line, "## " headings and bullet lists.
 *
 * - "post": bullets are "- " lines, plus images and tables (blog posts, rendered by PostContent).
 * - "shot": bullets are "• " lines and there are no headings (portfolio descriptions).
 */
type Flavor = "post" | "shot";
type Block = "p" | "h2" | "ul" | "table" | "figure";

const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const bulletRe = (flavor: Flavor) => (flavor === "post" ? /^-\s+/ : /^•\s*/);

/** Turns a stored image path into one the editor can display (e.g. a new upload's object URL). */
type Resolve = (src: string) => string;

const figureHtml = (src: string, caption: string, resolve: Resolve) =>
  `<figure contenteditable="false" data-src="${escape(src)}" data-caption="${escape(caption)}"><img src="${escape(resolve(src))}" alt=""><figcaption>${escape(caption) || "<i>No caption</i>"}</figcaption></figure>`;

const tableHtml = (rows: string[][]) => {
  const [head, ...body] = rows;
  const cell = (tag: string, c: string) => `<${tag}>${escape(c) || "<br>"}</${tag}>`;
  return `<table><thead><tr>${head.map((c) => cell("th", c)).join("")}</tr></thead><tbody>${body.map((r) => `<tr>${r.map((c) => cell("td", c)).join("")}</tr>`).join("")}</tbody></table>`;
};

/** Plain text → editor HTML. */
export function toHtml(text: string, flavor: Flavor, resolve: Resolve = (s) => s): string {
  const blocks = text.replace(/\r\n/g, "\n").split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
  const html = blocks.map((block) => {
    if (flavor === "post") {
      if (block.startsWith("## ")) return `<h2>${escape(block.replace(/^##\s*/, ""))}</h2>`;
      const image = parseImage(block);
      if (image) return figureHtml(image.src, image.caption, resolve);
      const table = parseTable(block);
      if (table) return tableHtml(table);
    }
    const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
    if (lines.every((l) => bulletRe(flavor).test(l))) return `<ul>${lines.map((l) => `<li>${escape(l.replace(bulletRe(flavor), ""))}</li>`).join("")}</ul>`;
    return `<p>${lines.map(escape).join("<br>")}</p>`;
  });
  return html.join("") || "<p><br></p>";
}

/** The text of an element, with <br> as a line break. */
function textOf(el: Node): string {
  let out = "";
  el.childNodes.forEach((n) => {
    if (n.nodeName === "BR") out += "\n";
    else if (n.nodeType === Node.TEXT_NODE) out += n.textContent ?? "";
    else if (["DIV", "P"].includes(n.nodeName)) out += (out && !out.endsWith("\n") ? "\n" : "") + textOf(n);
    else out += textOf(n);
  });
  return out.replace(/ /g, " ");
}

/** Editor HTML → plain text. */
export function toText(root: HTMLElement, flavor: Flavor): string {
  const bullet = flavor === "post" ? "- " : "• ";
  const blocks: string[] = [];
  let loose = "";
  const flush = () => {
    if (loose.trim()) blocks.push(loose.trim());
    loose = "";
  };
  root.childNodes.forEach((n) => {
    const name = n.nodeName;
    if (n.nodeType === Node.TEXT_NODE || ["SPAN", "B", "STRONG", "I", "EM", "A", "BR"].includes(name)) {
      loose += name === "BR" ? "\n" : n.textContent;
      return;
    }
    flush();
    const el = n as HTMLElement;
    if (name === "FIGURE" && el.dataset.src) {
      blocks.push(imageText({ src: el.dataset.src, caption: el.dataset.caption ?? "" }));
    } else if (name === "TABLE") {
      const rows = [...el.querySelectorAll("tr")].map((tr) => [...tr.children].map((c) => textOf(c)));
      if (rows.length && rows[0].length) blocks.push(tableText(rows));
    } else if (/^H[1-6]$/.test(name)) {
      const t = textOf(n).replace(/\s+/g, " ").trim();
      if (t) blocks.push(flavor === "post" ? `## ${t}` : t);
    } else if (name === "UL" || name === "OL") {
      const items = [...el.querySelectorAll("li")].map((li) => textOf(li).replace(/\s+/g, " ").trim()).filter(Boolean);
      if (items.length) blocks.push(items.map((i) => bullet + i).join("\n"));
    } else if (el.querySelector?.("ul, ol, h1, h2, h3, h4, h5, h6, p, div, table, figure")) {
      const inner = toText(el, flavor);
      if (inner) blocks.push(inner);
    } else {
      const t = textOf(n)
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean)
        .join("\n");
      if (t) blocks.push(t);
    }
  });
  flush();
  return blocks.join("\n\n");
}

/** The top-level block (direct child of the editor) holding the caret. */
function currentBlock(root: HTMLElement): HTMLElement | null {
  let n = window.getSelection()?.anchorNode ?? null;
  while (n && n.parentNode !== root) n = n.parentNode;
  return n instanceof HTMLElement ? n : null;
}

/** The table cell holding the caret. */
function currentCell(root: HTMLElement): HTMLTableCellElement | null {
  let n = window.getSelection()?.anchorNode ?? null;
  while (n && n !== root) {
    if (n.nodeName === "TD" || n.nodeName === "TH") return n as HTMLTableCellElement;
    n = n.parentNode;
  }
  return null;
}

/** Selects a cell's text, so typing replaces it, like moving between spreadsheet cells. */
function selectCell(cell: Element) {
  const sel = window.getSelection();
  if (!sel) return;
  const r = document.createRange();
  r.selectNodeContents(cell);
  sel.removeAllRanges();
  sel.addRange(r);
}

function placeCaret(el: Node, atStart = false) {
  const sel = window.getSelection();
  if (!sel) return;
  const r = document.createRange();
  r.selectNodeContents(el);
  r.collapse(atStart);
  sel.removeAllRanges();
  sel.addRange(r);
}

function ToolButton({ label, active, onClick, children, danger }: { label: string; active?: boolean; onClick: () => void; children: ReactNode; danger?: boolean }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      // Keep the caret in the editor.
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={cn(
        "flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-sm font-semibold transition-colors",
        active ? "bg-foreground text-background" : danger ? "text-[#B42318] hover:bg-[#FDECEC]" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}

export function RichTextEditor({
  value,
  onChange,
  flavor,
  placeholder,
  minHeight = 320,
  label,
  onAddImage,
  resolveSrc = (s) => s,
}: {
  value: string;
  onChange: (text: string) => void;
  flavor: Flavor;
  placeholder?: string;
  minHeight?: number;
  label: string;
  /** Keeps a picked image until the form saves; returns the src to store for it. Turns on the Image button. */
  onAddImage?: (file: File) => string;
  resolveSrc?: Resolve;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const last = useRef<string>();
  /** Where the caret was before the file picker took focus. */
  const anchor = useRef<HTMLElement | null>(null);
  const [block, setBlock] = useState<Block>("p");
  const [figure, setFigure] = useState<HTMLElement | null>(null);
  const [empty, setEmpty] = useState(!value.trim());
  const rich = flavor === "post";

  // Load the value on mount, and again whenever it changes from outside (e.g. the form resets).
  useEffect(() => {
    if (!ref.current || value === last.current) return;
    ref.current.innerHTML = toHtml(value, flavor, resolveSrc);
    last.current = value;
    setEmpty(!value.trim());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, flavor]);

  const emit = () => {
    if (!ref.current) return;
    const text = toText(ref.current, flavor);
    last.current = text;
    setEmpty(!text);
    onChange(text);
  };

  /** The kind of block holding the caret, read from the DOM so it's never a render behind. */
  const blockAtCaret = (): Block => {
    const b = ref.current && currentBlock(ref.current);
    if (!b) return "p";
    if (b.nodeName === "TABLE") return "table";
    if (b.nodeName === "FIGURE") return "figure";
    return b.nodeName === "UL" || b.nodeName === "OL" ? "ul" : /^H[1-6]$/.test(b.nodeName) ? "h2" : "p";
  };
  const sync = () => setBlock(blockAtCaret());

  useEffect(() => {
    const onSel = () => {
      if (ref.current && ref.current.contains(window.getSelection()?.anchorNode ?? null)) sync();
    };
    document.addEventListener("selectionchange", onSel);
    return () => document.removeEventListener("selectionchange", onSel);
  });

  const run = (cmd: string) => {
    ref.current?.focus();
    document.execCommand(cmd);
    emit();
    sync();
  };

  /**
   * Turns the block holding the caret into a paragraph, heading or bullet. Done on the DOM
   * directly: the browser's own list command nests lists inside paragraphs.
   */
  const convert = (next: "p" | "h2" | "ul", caretAtStart = false) => {
    const root = ref.current;
    const sel = window.getSelection();
    const b = root && currentBlock(root);
    if (!root || !sel || !b || b.nodeName === "TABLE" || b.nodeName === "FIGURE") return;
    const moveChildren = (from: Node, to: HTMLElement) => {
      while (from.firstChild) to.appendChild(from.firstChild);
      if (!to.textContent) to.replaceChildren(document.createElement("br"));
      return to;
    };
    let target: HTMLElement;
    if (b.nodeName === "UL" || b.nodeName === "OL") {
      let li: Node | null = sel.anchorNode;
      while (li && li.nodeName !== "LI") li = li.parentNode;
      if (!li || next === "ul") return;
      // Lift the item out, splitting the list around it.
      target = moveChildren(li, document.createElement(next));
      const after = document.createElement("ul");
      while (li.nextSibling) after.appendChild(li.nextSibling);
      (li as HTMLElement).remove();
      b.after(target);
      if (after.children.length) target.after(after);
      if (!b.children.length) b.remove();
    } else if (next === "ul") {
      target = moveChildren(b, document.createElement("li"));
      // Continue a list right above, otherwise start one.
      const prev = b.previousElementSibling;
      if (prev?.nodeName === "UL") {
        prev.appendChild(target);
        b.remove();
      } else {
        const ul = document.createElement("ul");
        ul.appendChild(target);
        b.replaceWith(ul);
      }
    } else {
      target = moveChildren(b, document.createElement(next));
      b.replaceWith(target);
    }
    placeCaret(target, caretAtStart);
    emit();
    sync();
  };

  const setType = (next: "p" | "h2" | "ul") => {
    ref.current?.focus();
    // Heading is a toggle; Bullets on a list item turns it back into text.
    const now = blockAtCaret();
    convert(next === now && next !== "p" ? "p" : next);
  };

  /** Markdown-style shortcuts: "## " starts a heading, "- " or "• " a bullet list. */
  const shortcut = () => {
    const root = ref.current;
    const sel = window.getSelection();
    if (!root || !sel?.isCollapsed) return;
    const b = currentBlock(root);
    if (!b || (b.nodeName !== "P" && b.nodeName !== "DIV")) return;
    const before = document.createRange();
    before.setStart(b, 0);
    before.setEnd(sel.anchorNode!, sel.anchorOffset);
    // Runs after the space is typed, so the text before the caret is the marker plus that space.
    const typed = before.toString().replace(/ /g, " ");
    const list = /^[-•*] $/.test(typed);
    const heading = flavor === "post" && typed === "## ";
    if (!list && !heading) return;
    before.deleteContents();
    convert(list ? "ul" : "h2", true);
  };

  /** Puts a new block after the one holding the caret (or at the end), with a paragraph after it to keep typing. */
  const insertBlock = (html: string, after: HTMLElement | null) => {
    const root = ref.current!;
    const holder = document.createElement("div");
    holder.innerHTML = html;
    const el = holder.firstElementChild as HTMLElement;
    const ref0 = after && root.contains(after) ? after : null;
    // Replace an empty paragraph rather than leaving a gap.
    if (ref0 && ref0.nodeName === "P" && !ref0.textContent?.trim()) ref0.replaceWith(el);
    else if (ref0) ref0.after(el);
    else root.appendChild(el);
    if (!el.nextElementSibling || el.nextElementSibling.nodeName !== "P") {
      const p = document.createElement("p");
      p.appendChild(document.createElement("br"));
      el.after(p);
    }
    return el;
  };

  const addImage = (file: File) => {
    if (!onAddImage || !ref.current) return;
    const caption = window.prompt("Caption for this image (optional)", "") ?? "";
    const src = onAddImage(file);
    const el = insertBlock(figureHtml(src, caption.trim(), resolveSrc), anchor.current);
    placeCaret(el.nextElementSibling!, true);
    ref.current.focus();
    emit();
  };

  const addTable = () => {
    const root = ref.current;
    if (!root) return;
    root.focus();
    const el = insertBlock(tableHtml([["Column 1", "Column 2", "Column 3"], ["", "", ""], ["", "", ""]]), currentBlock(root));
    // Select the placeholder heading so typing replaces it.
    selectCell(el.querySelector("th")!);
    emit();
    sync();
  };

  /** Row and column edits for the table holding the caret. */
  const tableEdit = (op: "addRow" | "addCol" | "delRow" | "delCol" | "delTable") => {
    const root = ref.current;
    const cell = root && currentCell(root);
    const table = cell?.closest("table");
    if (!root || !cell || !table) return;
    const row = cell.parentElement as HTMLTableRowElement;
    const col = cell.cellIndex;
    const rows = [...table.querySelectorAll("tr")];
    const blank = (tag: string) => {
      const c = document.createElement(tag);
      c.appendChild(document.createElement("br"));
      return c;
    };
    let focus: Node | null = cell;
    if (op === "addRow") {
      const tr = document.createElement("tr");
      for (let i = 0; i < row.children.length; i++) tr.appendChild(blank("td"));
      // A row added from the header goes first in the body.
      if (row.parentElement?.nodeName === "THEAD") table.tBodies[0]?.prepend(tr) ?? table.appendChild(tr);
      else row.after(tr);
      focus = tr.children[col];
    } else if (op === "addCol") {
      rows.forEach((tr) => tr.children[col].after(blank(tr.parentElement?.nodeName === "THEAD" ? "th" : "td")));
      focus = row.children[col + 1];
    } else if (op === "delRow") {
      if (row.parentElement?.nodeName === "THEAD" || rows.length <= 2) return;
      focus = (row.nextElementSibling ?? row.previousElementSibling)?.children[col] ?? null;
      row.remove();
    } else if (op === "delCol") {
      if (row.children.length <= 1) return;
      rows.forEach((tr) => tr.children[col].remove());
      focus = row.children[Math.max(0, col - 1)];
    } else {
      const next = table.nextElementSibling;
      table.remove();
      focus = next;
    }
    if (focus) placeCaret(focus);
    emit();
    sync();
  };

  /** Tab moves between cells (adding a row at the end); Enter in a cell moves down instead of breaking the line. */
  const onKeyDown = (e: React.KeyboardEvent) => {
    const root = ref.current;
    const cell = root && currentCell(root);
    if (!cell) return;
    if (e.key === "Tab") {
      e.preventDefault();
      const cells = [...cell.closest("table")!.querySelectorAll("th, td")];
      const i = cells.indexOf(cell) + (e.shiftKey ? -1 : 1);
      if (i >= cells.length) tableEdit("addRow");
      else if (i >= 0) selectCell(cells[i]);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const row = cell.parentElement as HTMLTableRowElement;
      const below = (row.nextElementSibling ?? (row.parentElement?.nodeName === "THEAD" ? cell.closest("table")!.tBodies[0]?.rows[0] : null)) as HTMLTableRowElement | null;
      if (below) selectCell(below.children[cell.cellIndex]);
      else tableEdit("addRow");
    }
  };

  const editCaption = () => {
    if (!figure) return;
    const next = window.prompt("Image caption", figure.dataset.caption ?? "");
    if (next === null) return;
    figure.dataset.caption = next.trim();
    figure.querySelector("figcaption")!.innerHTML = escape(next.trim()) || "<i>No caption</i>";
    emit();
  };
  const removeFigure = () => {
    if (!figure) return;
    const next = figure.nextElementSibling;
    figure.remove();
    setFigure(null);
    if (next) placeCaret(next, true);
    emit();
  };

  const inTable = block === "table";

  return (
    <div className="flex flex-col gap-1.5">
      <div className="overflow-hidden rounded-xl border-[1.5px] border-input bg-card transition-colors focus-within:border-link">
        <div role="toolbar" aria-label={`${label} formatting`} className="sticky top-0 z-10 flex flex-wrap items-center gap-1 border-b border-border bg-secondary px-2 py-1.5">
          <ToolButton label="Paragraph" active={block === "p"} onClick={() => setType("p")}>
            <Pilcrow className="h-4 w-4" /> Text
          </ToolButton>
          {rich && (
            <ToolButton label="Heading" active={block === "h2"} onClick={() => setType("h2")}>
              <Heading2 className="h-4 w-4" /> Heading
            </ToolButton>
          )}
          <ToolButton label="Bullet list" active={block === "ul"} onClick={() => setType("ul")}>
            <List className="h-4 w-4" /> Bullets
          </ToolButton>
          {rich && onAddImage && (
            <ToolButton
              label="Image"
              onClick={() => {
                anchor.current = ref.current && currentBlock(ref.current);
                fileRef.current?.click();
              }}
            >
              <ImagePlus className="h-4 w-4" /> Image
            </ToolButton>
          )}
          {rich && (
            <ToolButton label="Table" active={inTable} onClick={addTable}>
              <Table2 className="h-4 w-4" /> Table
            </ToolButton>
          )}
          <span className="mx-1 h-5 w-px bg-border" aria-hidden />
          <ToolButton label="Undo" onClick={() => run("undo")}>
            <Undo2 className="h-4 w-4" />
          </ToolButton>
          <ToolButton label="Redo" onClick={() => run("redo")}>
            <Redo2 className="h-4 w-4" />
          </ToolButton>
          {inTable && (
            <span className="flex w-full flex-wrap items-center gap-1 border-t border-border pt-1.5">
              <span className="px-1 text-xs font-semibold text-muted-foreground">Table</span>
              <ToolButton label="Add row" onClick={() => tableEdit("addRow")}>
                <Rows3 className="h-4 w-4" /> + Row
              </ToolButton>
              <ToolButton label="Add column" onClick={() => tableEdit("addCol")}>
                <Columns3 className="h-4 w-4" /> + Column
              </ToolButton>
              <ToolButton label="Delete row" onClick={() => tableEdit("delRow")}>
                − Row
              </ToolButton>
              <ToolButton label="Delete column" onClick={() => tableEdit("delCol")}>
                − Column
              </ToolButton>
              <ToolButton label="Delete table" danger onClick={() => tableEdit("delTable")}>
                <Trash2 className="h-4 w-4" /> Table
              </ToolButton>
            </span>
          )}
          {figure && (
            <span className="flex w-full flex-wrap items-center gap-1 border-t border-border pt-1.5">
              <span className="px-1 text-xs font-semibold text-muted-foreground">Image</span>
              <ToolButton label="Edit caption" onClick={editCaption}>
                <Pencil className="h-4 w-4" /> Caption
              </ToolButton>
              <ToolButton label="Remove image" danger onClick={removeFigure}>
                <Trash2 className="h-4 w-4" /> Remove
              </ToolButton>
            </span>
          )}
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          className="sr-only"
          tabIndex={-1}
          onChange={(e) => {
            const file = e.target.files?.[0];
            e.target.value = "";
            if (file) addImage(file);
          }}
        />
        <div className="relative">
          {empty && placeholder && <span className="pointer-events-none absolute left-4 top-3.5 text-[15px] text-muted-foreground">{placeholder}</span>}
          <div
            ref={ref}
            role="textbox"
            aria-multiline
            aria-label={label}
            contentEditable
            suppressContentEditableWarning
            onFocus={() => document.execCommand("defaultParagraphSeparator", false, "p")}
            onInput={() => {
              shortcut();
              emit();
            }}
            onKeyDown={onKeyDown}
            onKeyUp={sync}
            onMouseUp={sync}
            onClick={(e) => {
              const fig = (e.target as HTMLElement).closest("figure");
              setFigure(fig && ref.current?.contains(fig) ? (fig as HTMLElement) : null);
            }}
            onPaste={(e) => {
              e.preventDefault();
              const text = e.clipboardData.getData("text/plain");
              if (!text) return;
              // Inside a table cell, paste as one line of text.
              if (ref.current && currentCell(ref.current)) {
                document.execCommand("insertText", false, text.replace(/\s+/g, " "));
              } else {
                // Paste as plain text, keeping headings, bullets, images and tables written in the same format.
                const multi = /\n/.test(text.trim()) || (rich && (parseImage(text) || parseTable(text)));
                document.execCommand(multi ? "insertHTML" : "insertText", false, multi ? toHtml(text, flavor, resolveSrc) : text);
              }
              emit();
            }}
            style={{ minHeight }}
            className={cn(
              "max-h-[70vh] overflow-y-auto px-4 py-3 text-[16px] leading-[1.7] text-foreground outline-none",
              "[&_h2]:mb-2 [&_h2]:mt-5 [&_h2]:text-[22px] [&_h2]:font-bold [&_h2]:leading-[1.25] [&_h2]:tracking-[-0.02em] first:[&_h2]:mt-0",
              "[&_p]:my-3 first:[&_p]:mt-0 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:my-1 [&_li]:marker:text-link",
              "[&_figure]:my-4 [&_figure]:cursor-pointer [&_figure]:rounded-xl [&_figure]:p-1 [&_figure:hover]:bg-secondary [&_figure_img]:max-h-[360px] [&_figure_img]:rounded-lg [&_figure_img]:border [&_figure_img]:border-border",
              "[&_figcaption]:mt-1.5 [&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:text-muted-foreground",
              "[&_table]:my-4 [&_table]:w-full [&_table]:border-collapse [&_table]:text-[15px] [&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2 [&_td]:align-top",
              "[&_th]:border [&_th]:border-border [&_th]:bg-secondary [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold"
            )}
          />
        </div>
      </div>
    </div>
  );
}

