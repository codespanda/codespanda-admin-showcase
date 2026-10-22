import { useEffect, useRef, useState, type ChangeEvent, type ReactNode } from "react";
import { EditorContent, useEditor, useEditorState, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Placeholder } from "@tiptap/extensions";
import Image from "@tiptap/extension-image";
import { TableKit } from "@tiptap/extension-table";
import { Bold, Code, Heading2, Heading3, ImagePlus, Italic, Link2, List, ListOrdered, Loader2, Minus, Pilcrow, Quote, Redo2, Table as TableIcon, Undo2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { convertImage } from "@/lib/studio/images";
import { docToMarkdown, markdownToHtml, safeHref, type DocNode } from "@/lib/markdown";

// The visual editor for blog post bodies (the same one as AccountingPanda's blog studio).
// It edits formatted text but reads and writes the site's limited Markdown, so posts are
// still rendered by PostContent. Only formats that Markdown supports are enabled.
// Inserted images are kept as WebP data URLs and uploaded to the repo when the post is saved.

function ToolButton({ label, active, disabled, onClick, children }: { label: string; active?: boolean; disabled?: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      // Keep the selection in the editor.
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-lg transition-colors disabled:opacity-30",
        active ? "bg-foreground text-background" : "text-muted-foreground hover:bg-card hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}

const Divider = () => <span className="mx-1 h-5 w-px bg-border" aria-hidden />;

function TextButton({ onClick, danger, children }: { onClick: () => void; danger?: boolean; children: ReactNode }) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={cn(
        "rounded-lg px-2.5 py-1.5 text-[13px] font-semibold transition-colors",
        danger ? "text-[#B42318] hover:bg-[#FDECEC]" : "text-foreground hover:bg-card"
      )}
    >
      {children}
    </button>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  const state = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      paragraph: e.isActive("paragraph") && !e.isActive("bulletList") && !e.isActive("orderedList") && !e.isActive("blockquote"),
      h2: e.isActive("heading", { level: 2 }),
      h3: e.isActive("heading", { level: 3 }),
      bold: e.isActive("bold"),
      italic: e.isActive("italic"),
      code: e.isActive("code"),
      link: e.isActive("link"),
      bullet: e.isActive("bulletList"),
      ordered: e.isActive("orderedList"),
      quote: e.isActive("blockquote"),
      table: e.isActive("table"),
      image: e.isActive("image"),
      canUndo: e.can().undo(),
      canRedo: e.can().redo(),
    }),
  });

  const c = () => editor.chain().focus();

  const setLink = () => {
    const current = (editor.getAttributes("link").href as string | undefined) ?? "";
    const input = window.prompt("Link address (https://…). Leave empty to remove the link.", current);
    if (input === null) return;
    const href = input.trim();
    if (!href) {
      c().extendMarkRange("link").unsetLink().run();
      return;
    }
    const withProtocol = /^[a-z]+:|^\/|^#/i.test(href) ? href : `https://${href}`;
    if (!safeHref(withProtocol)) {
      window.alert("Use a web address (https://…), an email link (mailto:…) or a page on this site (/…).");
      return;
    }
    c().extendMarkRange("link").setLink({ href: withProtocol }).run();
  };

  const fileInput = useRef<HTMLInputElement>(null);
  const [converting, setConverting] = useState(false);

  const onImageFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setConverting(true);
    try {
      const image = await convertImage(file, 1600, 0.86);
      const alt = window.prompt("Describe this image. It's shown as the caption and read by screen readers.", "") ?? "";
      c().setImage({ src: `data:image/webp;base64,${image.base64}`, alt: alt.trim() }).run();
    } catch (err) {
      window.alert((err as Error).message);
    } finally {
      setConverting(false);
    }
  };

  const editCaption = () => {
    const current = (editor.getAttributes("image").alt as string | undefined) ?? "";
    const alt = window.prompt("Image caption / description", current);
    if (alt !== null) c().updateAttributes("image", { alt: alt.trim() }).run();
  };

  return (
    <div className="sticky top-0 z-20 rounded-t-xl border-b border-border bg-secondary">
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5">
        <ToolButton label="Paragraph" active={state.paragraph} onClick={() => c().setParagraph().run()}>
          <Pilcrow className="h-4 w-4" />
        </ToolButton>
        <ToolButton label="Heading (Ctrl+Alt+2)" active={state.h2} onClick={() => c().toggleHeading({ level: 2 }).run()}>
          <Heading2 className="h-4 w-4" />
        </ToolButton>
        <ToolButton label="Subheading (Ctrl+Alt+3)" active={state.h3} onClick={() => c().toggleHeading({ level: 3 }).run()}>
          <Heading3 className="h-4 w-4" />
        </ToolButton>
        <Divider />
        <ToolButton label="Bold (Ctrl+B)" active={state.bold} onClick={() => c().toggleBold().run()}>
          <Bold className="h-4 w-4" />
        </ToolButton>
        <ToolButton label="Italic (Ctrl+I)" active={state.italic} onClick={() => c().toggleItalic().run()}>
          <Italic className="h-4 w-4" />
        </ToolButton>
        <ToolButton label="Inline code (Ctrl+E)" active={state.code} onClick={() => c().toggleCode().run()}>
          <Code className="h-4 w-4" />
        </ToolButton>
        <ToolButton label="Link" active={state.link} onClick={setLink}>
          <Link2 className="h-4 w-4" />
        </ToolButton>
        <Divider />
        <ToolButton label="Bullet list (Ctrl+Shift+8)" active={state.bullet} onClick={() => c().toggleBulletList().run()}>
          <List className="h-4 w-4" />
        </ToolButton>
        <ToolButton label="Numbered list (Ctrl+Shift+7)" active={state.ordered} onClick={() => c().toggleOrderedList().run()}>
          <ListOrdered className="h-4 w-4" />
        </ToolButton>
        <ToolButton label="Highlighted callout" active={state.quote} onClick={() => c().toggleBlockquote().run()}>
          <Quote className="h-4 w-4" />
        </ToolButton>
        <ToolButton label="Divider line" onClick={() => c().setHorizontalRule().run()}>
          <Minus className="h-4 w-4" />
        </ToolButton>
        <Divider />
        <ToolButton
          label="Insert image"
          disabled={converting}
          onClick={() => {
            // Table cells hold one line of text in Markdown, so images can't go inside them.
            if (editor.isActive("table")) return window.alert("Move the cursor out of the table to insert an image.");
            fileInput.current?.click();
          }}
        >
          {converting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
        </ToolButton>
        <ToolButton label="Insert table" active={state.table} onClick={() => c().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>
          <TableIcon className="h-4 w-4" />
        </ToolButton>
        <input ref={fileInput} type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={onImageFile} className="hidden" />
        <Divider />
        <ToolButton label="Undo (Ctrl+Z)" disabled={!state.canUndo} onClick={() => c().undo().run()}>
          <Undo2 className="h-4 w-4" />
        </ToolButton>
        <ToolButton label="Redo (Ctrl+Y)" disabled={!state.canRedo} onClick={() => c().redo().run()}>
          <Redo2 className="h-4 w-4" />
        </ToolButton>
      </div>
      {state.table && (
        <div className="flex flex-wrap items-center gap-0.5 border-t border-border px-2 py-1">
          <span className="px-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Table</span>
          <TextButton onClick={() => c().addRowBefore().run()}>+ Row above</TextButton>
          <TextButton onClick={() => c().addRowAfter().run()}>+ Row below</TextButton>
          <TextButton onClick={() => c().addColumnBefore().run()}>+ Column left</TextButton>
          <TextButton onClick={() => c().addColumnAfter().run()}>+ Column right</TextButton>
          <TextButton onClick={() => c().deleteRow().run()}>− Row</TextButton>
          <TextButton onClick={() => c().deleteColumn().run()}>− Column</TextButton>
          <TextButton danger onClick={() => c().deleteTable().run()}>
            Delete table
          </TextButton>
        </div>
      )}
      {state.image && (
        <div className="flex flex-wrap items-center gap-0.5 border-t border-border px-2 py-1">
          <span className="px-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Image</span>
          <TextButton onClick={editCaption}>Edit caption</TextButton>
          <TextButton danger onClick={() => c().deleteSelection().run()}>
            Remove image
          </TextButton>
        </div>
      )}
    </div>
  );
}

export function PostEditor({ id, value, onChange, placeholder }: { id?: string; value: string; onChange: (markdown: string) => void; placeholder?: string }) {
  // The last Markdown this editor produced, so outside changes can be told apart from our own updates.
  const lastEmitted = useRef(value);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        codeBlock: false,
        strike: false,
        underline: false,
        link: { openOnClick: false, autolink: true, defaultProtocol: "https" },
      }),
      Placeholder.configure({ placeholder: placeholder ?? "Start writing…" }),
      Image.configure({ allowBase64: true }),
      TableKit.configure({ table: { resizable: false } }),
    ],
    content: markdownToHtml(value),
    editorProps: {
      attributes: {
        ...(id ? { id } : {}),
        "aria-label": "Post body",
        class: "min-h-[28rem] px-5 py-4 outline-none",
      },
    },
    onUpdate: ({ editor: e }) => {
      const markdown = docToMarkdown(e.getJSON() as DocNode);
      lastEmitted.current = markdown;
      onChange(markdown);
    },
  });

  useEffect(() => {
    if (!editor || value === lastEmitted.current) return;
    lastEmitted.current = value;
    editor.commands.setContent(markdownToHtml(value), { emitUpdate: false });
  }, [editor, value]);

  return (
    <div
      className={cn(
        "rounded-xl border-[1.5px] border-input bg-card transition-colors focus-within:border-link",
        // Content styles, matching the published post as closely as possible.
        "[&_.ProseMirror]:space-y-3 [&_.ProseMirror]:text-[16px] [&_.ProseMirror]:leading-[1.7] [&_.ProseMirror]:text-foreground/85",
        "[&_h2]:pt-3 [&_h2]:text-[24px] [&_h2]:font-bold [&_h2]:leading-[1.25] [&_h2]:tracking-[-0.02em] [&_h2]:text-foreground",
        "[&_h3]:pt-2 [&_h3]:text-[19px] [&_h3]:font-bold [&_h3]:text-foreground",
        "[&_strong]:font-semibold [&_strong]:text-foreground",
        "[&_a]:font-medium [&_a]:text-link [&_a]:underline",
        "[&_code]:rounded-md [&_code]:bg-secondary [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.88em]",
        "[&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-6 [&_li::marker]:text-link",
        "[&_blockquote]:rounded-xl [&_blockquote]:border-l-4 [&_blockquote]:border-link [&_blockquote]:bg-blue-soft [&_blockquote]:px-4 [&_blockquote]:py-3 [&_blockquote]:text-blue-ink",
        "[&_hr]:my-4 [&_hr]:border-border",
        "[&_img]:my-2 [&_img]:max-w-full [&_img]:rounded-xl [&_img]:border [&_img]:border-border [&_img.ProseMirror-selectednode]:outline [&_img.ProseMirror-selectednode]:outline-[3px] [&_img.ProseMirror-selectednode]:outline-link",
        "[&_.tableWrapper]:overflow-x-auto [&_table]:w-full [&_table]:border-collapse [&_table]:text-[15px]",
        "[&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2 [&_td]:align-top [&_th]:border [&_th]:border-border [&_th]:bg-secondary [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_th]:text-foreground",
        "[&_.selectedCell]:bg-blue-soft [&_td_p]:m-0 [&_th_p]:m-0",
        "[&_.is-editor-empty:first-child::before]:pointer-events-none [&_.is-editor-empty:first-child::before]:float-left [&_.is-editor-empty:first-child::before]:h-0 [&_.is-editor-empty:first-child::before]:text-muted-foreground [&_.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]"
      )}
    >
      {editor && <Toolbar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
}
