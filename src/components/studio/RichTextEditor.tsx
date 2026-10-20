import { useEffect, useRef, useState, type ReactNode } from "react";
import { Heading2, List, Pilcrow, Redo2, Undo2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A small WYSIWYG editor that reads and writes the site's plain-text format:
 * blocks separated by a blank line, "## " headings and bullet lists.
 *
 * - "post": bullets are "- " lines (blog posts, rendered by PostContent).
 * - "shot": bullets are "• " lines and there are no headings (portfolio descriptions).
 */
type Flavor = "post" | "shot";
type Block = "p" | "h2" | "ul";

const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const bulletRe = (flavor: Flavor) => (flavor === "post" ? /^-\s+/ : /^•\s*/);

/** Plain text → editor HTML. */
export function toHtml(text: string, flavor: Flavor): string {
  const blocks = text.replace(/\r\n/g, "\n").split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
  const html = blocks.map((block) => {
    if (flavor === "post" && block.startsWith("## ")) return `<h2>${escape(block.replace(/^##\s*/, ""))}</h2>`;
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
  return out.replace(/\u00a0/g, " ");
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
    if (/^H[1-6]$/.test(name)) {
      const t = textOf(n).replace(/\s+/g, " ").trim();
      if (t) blocks.push(flavor === "post" ? `## ${t}` : t);
    } else if (name === "UL" || name === "OL") {
      const items = [...(n as HTMLElement).querySelectorAll("li")].map((li) => textOf(li).replace(/\s+/g, " ").trim()).filter(Boolean);
      if (items.length) blocks.push(items.map((i) => bullet + i).join("\n"));
    } else if ((n as HTMLElement).querySelector?.("ul, ol, h1, h2, h3, h4, h5, h6, p, div")) {
      const inner = toText(n as HTMLElement, flavor);
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

function ToolButton({ label, active, onClick, children }: { label: string; active?: boolean; onClick: () => void; children: ReactNode }) {
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
        active ? "bg-foreground text-background" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
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
}: {
  value: string;
  onChange: (text: string) => void;
  flavor: Flavor;
  placeholder?: string;
  minHeight?: number;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const last = useRef<string>();
  const [block, setBlock] = useState<Block>("p");
  const [empty, setEmpty] = useState(!value.trim());

  // Load the value on mount, and again whenever it changes from outside (e.g. the form resets).
  useEffect(() => {
    if (!ref.current || value === last.current) return;
    ref.current.innerHTML = toHtml(value, flavor);
    last.current = value;
    setEmpty(!value.trim());
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
    return b?.nodeName === "UL" || b?.nodeName === "OL" ? "ul" : b && /^H[1-6]$/.test(b.nodeName) ? "h2" : "p";
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
  const convert = (next: Block, caretAtStart = false) => {
    const root = ref.current;
    const sel = window.getSelection();
    const b = root && currentBlock(root);
    if (!root || !sel || !b) return;
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
    const caret = document.createRange();
    caret.selectNodeContents(target);
    caret.collapse(caretAtStart);
    sel.removeAllRanges();
    sel.addRange(caret);
    emit();
    sync();
  };

  const setType = (next: Block) => {
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
    const typed = before.toString().replace(/\u00a0/g, " ");
    const list = /^[-•*] $/.test(typed);
    const heading = flavor === "post" && typed === "## ";
    if (!list && !heading) return;
    before.deleteContents();
    convert(list ? "ul" : "h2", true);
  };

  return (
    <div className="flex flex-col gap-1.5">
      <div className="overflow-hidden rounded-xl border-[1.5px] border-input bg-card transition-colors focus-within:border-link">
        <div role="toolbar" aria-label={`${label} formatting`} className="flex flex-wrap items-center gap-1 border-b border-border bg-secondary/40 px-2 py-1.5">
          <ToolButton label="Paragraph" active={block === "p"} onClick={() => setType("p")}>
            <Pilcrow className="h-4 w-4" /> Text
          </ToolButton>
          {flavor === "post" && (
            <ToolButton label="Heading" active={block === "h2"} onClick={() => setType("h2")}>
              <Heading2 className="h-4 w-4" /> Heading
            </ToolButton>
          )}
          <ToolButton label="Bullet list" active={block === "ul"} onClick={() => setType("ul")}>
            <List className="h-4 w-4" /> Bullets
          </ToolButton>
          <span className="mx-1 h-5 w-px bg-border" aria-hidden />
          <ToolButton label="Undo" onClick={() => run("undo")}>
            <Undo2 className="h-4 w-4" />
          </ToolButton>
          <ToolButton label="Redo" onClick={() => run("redo")}>
            <Redo2 className="h-4 w-4" />
          </ToolButton>
        </div>
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
            onKeyUp={sync}
            onMouseUp={sync}
            onPaste={(e) => {
              // Paste as plain text, keeping headings, bullets and paragraphs written in the same format.
              e.preventDefault();
              const text = e.clipboardData.getData("text/plain");
              if (!text) return;
              const multi = /\n/.test(text.trim());
              document.execCommand(multi ? "insertHTML" : "insertText", false, multi ? toHtml(text, flavor) : text);
              emit();
            }}
            style={{ minHeight }}
            className={cn(
              "max-h-[70vh] overflow-y-auto px-4 py-3 text-[16px] leading-[1.7] text-foreground outline-none",
              "[&_h2]:mb-2 [&_h2]:mt-5 [&_h2]:text-[22px] [&_h2]:font-bold [&_h2]:leading-[1.25] [&_h2]:tracking-[-0.02em] first:[&_h2]:mt-0",
              "[&_p]:my-3 first:[&_p]:mt-0 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:my-1 [&_li]:marker:text-link"
            )}
          />
        </div>
      </div>
    </div>
  );
}
