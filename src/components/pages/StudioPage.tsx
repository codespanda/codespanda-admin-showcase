import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, CalendarClock, CheckCircle2, ChevronLeft, ChevronRight, ExternalLink, ImagePlus, Loader2, LogOut, Pencil, Plus, Send, Trash2, TriangleAlert } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { RichTextEditor } from "@/components/studio/RichTextEditor";
import { SHOTS, type Shot } from "@/lib/portfolio-data";
import { BLOG_POSTS, type BlogPost } from "@/lib/blog-data";
import { TEMPLATES, type Template } from "@/lib/data";
import { INDUSTRIES } from "@/lib/site";
import { TEMPLATE_PAGES, type TemplatePageContent, type TemplatePageSeo } from "@/lib/template-pages";
import { isLive } from "@/lib/schedule";
import { REPO, checkAccess, clearToken, commitFiles, latestDeploy, loadToken, readText, saveToken, type CommitFile, type DeployRun } from "@/lib/studio/github";
import { convertImage, shareImageJpeg, slugify, topCrop } from "@/lib/studio/images";
import { cn } from "@/lib/utils";

const PORTFOLIO_JSON = "src/content/portfolio.json";
const BLOG_JSON = "src/content/blog.json";
const TEMPLATES_JSON = "src/content/templates.json";
const TEMPLATE_PAGES_JSON = "src/content/template-pages.json";
/** Drafts live in their own file, which the website never imports. */
const DRAFTS_JSON = "src/content/drafts.json";
const SHOT_CATEGORIES = ["Web App", "Web Dashboard", "Mobile App"] as const;
const BLOG_CATEGORIES = [...new Set(BLOG_POSTS.map((p) => p.category))].sort();
const TOKEN_URL = `https://github.com/settings/personal-access-tokens/new`;
const RAW = `https://raw.githubusercontent.com/${REPO.owner}/${REPO.name}/${REPO.branch}/public`;

/** A template card with its page content, as kept in drafts.json. */
type TemplateItem = Template & { page?: TemplatePageContent };
interface Drafts {
  shots: Shot[];
  posts: BlogPost[];
  templates: TemplateItem[];
}
type Mode = "now" | "schedule" | "draft";
/** An item opened for editing: a draft, or something already on the site. */
interface Editing<T> {
  item: T;
  from: "draft" | "published";
}
/** Scheduled items reopen on the schedule; everything else on "Publish now". */
const startMode = (e?: Editing<{ publishAt?: string }>): Mode => (e?.item.publishAt && !isLive(e.item) ? "schedule" : "now");
/** What the banner shows after a save: deploy progress, or a plain note for drafts. */
export interface SaveResult {
  sha: string;
  url: string;
  note?: string;
}

const field =
  "w-full rounded-xl border-[1.5px] border-input bg-card px-3.5 py-3 text-[15px] text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-link disabled:opacity-60";
const labelCls = "text-sm font-semibold text-foreground";

function Field({ label, hint, children }: { label: string; hint?: ReactNode; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className={labelCls}>{label}</span>
      {children}
      {hint && <span className="text-[13px] text-muted-foreground">{hint}</span>}
    </label>
  );
}

function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("flex flex-col gap-5 rounded-[18px] border border-border bg-card p-5 lg:p-7", className)}>{children}</div>;
}

const tags = (text: string) =>
  text
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

const localDate = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const today = () => localDate();
/** Default schedule: tomorrow at 9:00 in the browser's time zone, as a datetime-local value. */
const tomorrowNine = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return `${localDate(d)}T09:00`;
};
const toLocalInput = (iso: string) => {
  const d = new Date(iso);
  return `${localDate(d)}T${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
};
const formatWhen = (iso: string) => new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });

const json = (value: unknown) => JSON.stringify(value, null, 2) + "\n";
async function readJson<T>(token: string, path: string): Promise<T> {
  return JSON.parse(await readText(token, path)) as T;
}
async function readDrafts(token: string): Promise<Drafts> {
  const d = await readJson<Partial<Drafts>>(token, DRAFTS_JSON);
  return { shots: d.shots ?? [], posts: d.posts ?? [], templates: d.templates ?? [] };
}
/** Delete entries for images an item no longer uses. */
const dropImages = (paths: (string | undefined)[]): CommitFile[] =>
  paths.filter((u): u is string => !!u && u.startsWith("/images/")).map((u) => ({ path: `public${u}`, content: null, encoding: "base64" as const }));
const errorText = (err: unknown) => (err instanceof Error ? err.message : String(err));

/* ------------------------------------------------------------------ */
/* Deploy status after a save                                          */
/* ------------------------------------------------------------------ */
function DeployStatus({ token, result, onClose }: { token: string; result: SaveResult; onClose: () => void }) {
  const [run, setRun] = useState<DeployRun>();
  useEffect(() => {
    if (result.note) return;
    let stop = false;
    const tick = async () => {
      try {
        const r = await latestDeploy(token);
        if (!stop && r && r.head_sha === result.sha) setRun(r);
      } catch {
        /* status is a convenience; ignore errors */
      }
    };
    void tick();
    const id = setInterval(tick, 8000);
    return () => {
      stop = true;
      clearInterval(id);
    };
  }, [token, result]);

  const done = run?.status === "completed";
  const ok = done && run?.conclusion === "success";
  const failed = done && !ok;
  const state: "note" | "waiting" | "deploying" | "live" | "failed" = result.note ? "note" : !run ? "waiting" : !done ? "deploying" : ok ? "live" : "failed";
  const title = {
    note: "Saved",
    waiting: "Saved — starting the deploy",
    deploying: "Deploying to codespanda.com",
    live: "Live on codespanda.com",
    failed: "Saved, but the deploy failed",
  }[state];
  const body = {
    note: result.note,
    waiting: "Your changes are committed. GitHub is starting the deploy; the page goes live about a minute after saving.",
    deploying: "Building and publishing the site. You can close this — it keeps going in the background.",
    live: "Your page is published and ready to share.",
    failed: "The content is saved in the repository, but the site didn't rebuild. Open the deploy log to see why.",
  }[state];

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[440px] gap-0 p-0">
        <div className="flex flex-col items-center gap-4 px-6 pb-6 pt-8 text-center">
          <span
            className={cn(
              "flex h-14 w-14 items-center justify-center rounded-full",
              failed ? "bg-[#FDECEC] text-[#B42318]" : state === "live" || state === "note" ? "bg-[#DCF5EA] text-[#05603F]" : "bg-blue-soft text-link"
            )}
          >
            {failed ? <TriangleAlert className="h-7 w-7" /> : state === "live" || state === "note" ? <CheckCircle2 className="h-7 w-7" /> : <Loader2 className="h-7 w-7 animate-spin" />}
          </span>
          <div className="flex flex-col gap-1.5">
            <DialogTitle className="font-display text-[22px] font-bold tracking-[-0.02em]">{title}</DialogTitle>
            <DialogDescription className="text-[15px] leading-[1.55] text-muted-foreground">{body}</DialogDescription>
          </div>
          {!result.note && !done && (
            <ol className="flex w-full items-center justify-center gap-2 text-[13px] font-semibold text-muted-foreground">
              {["Saved", "Building", "Live"].map((step, i) => {
                const reached = i === 0 || (i === 1 && !!run) || (i === 2 && ok);
                return (
                  <li key={step} className="flex items-center gap-2">
                    {i > 0 && <span className="h-px w-6 bg-border" />}
                    <span className={cn("rounded-full px-2.5 py-1", reached ? "bg-blue-soft text-blue-ink" : "bg-secondary")}>{step}</span>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
        <div className="flex flex-col gap-2.5 border-t border-border px-6 py-5 sm:flex-row-reverse">
          {ok && (
            <a
              href={result.url}
              target="_blank"
              rel="noreferrer noopener"
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-brand text-[15px] font-bold text-white hover:opacity-90"
            >
              Open the page <ExternalLink className="h-4 w-4" />
            </a>
          )}
          {run && (failed || !ok) && (
            <a
              href={run.html_url}
              target="_blank"
              rel="noreferrer noopener"
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border-[1.5px] border-input text-[15px] font-semibold hover:bg-secondary"
            >
              Deploy log <ExternalLink className="h-4 w-4" />
            </a>
          )}
          <button
            type="button"
            onClick={onClose}
            className={cn(
              "flex h-12 flex-1 items-center justify-center rounded-xl text-[15px] font-semibold",
              ok || run ? "border-[1.5px] border-input hover:bg-secondary" : "bg-brand font-bold text-white hover:opacity-90"
            )}
          >
            {result.note || ok ? "Done" : "Close"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ImagePick({
  label,
  hint,
  multiple,
  files,
  onChange,
  current = [],
}: {
  label: string;
  hint: string;
  multiple?: boolean;
  files: File[];
  onChange: (f: File[]) => void;
  /** Images already saved with a draft, kept unless new ones are chosen. */
  current?: string[];
}) {
  const previews = useMemo(() => files.map((f) => ({ name: f.name, url: URL.createObjectURL(f) })), [files]);
  useEffect(() => () => previews.forEach((p) => URL.revokeObjectURL(p.url)), [previews]);
  const showing = previews.length ? previews : current.map((u) => ({ name: u, url: `${RAW}${u}` }));
  return (
    <div className="flex flex-col gap-2">
      <span className={labelCls}>{label}</span>
      <label className="flex cursor-pointer items-center gap-3 rounded-xl border-[1.5px] border-dashed border-input px-4 py-4 hover:border-link hover:bg-secondary">
        <ImagePlus className="h-5 w-5 text-link" />
        <span className="flex flex-col">
          <span className="text-[15px] font-semibold">
            {files.length
              ? `${files.length} image${files.length > 1 ? "s" : ""} selected — change`
              : current.length
                ? "Saved image kept — choose to replace"
                : "Choose image" + (multiple ? "s" : "")}
          </span>
          <span className="text-[13px] text-muted-foreground">{hint}</span>
        </span>
        <input type="file" accept="image/png,image/jpeg,image/webp" multiple={multiple} className="sr-only" onChange={(e) => onChange(Array.from(e.target.files ?? []))} />
      </label>
      {showing.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {showing.map((p) => (
            <img key={p.url} src={p.url} alt={p.name} className="h-20 w-28 rounded-lg border border-border bg-secondary object-cover object-top" />
          ))}
        </div>
      )}
    </div>
  );
}

/** Publish now, schedule for later, or keep as a draft. */
function PublishOptions({ mode, setMode, at, setAt, published }: { mode: Mode; setMode: (m: Mode) => void; at: string; setAt: (v: string) => void; published?: boolean }) {
  const options: { id: Mode; label: string; hint: string }[] = [
    { id: "now", label: published ? "Update now" : "Publish now", hint: "Live in about a minute" },
    { id: "schedule", label: "Schedule", hint: published ? "Hidden until a date and time" : "Goes live at a date and time" },
    { id: "draft", label: published ? "Move to drafts" : "Save as draft", hint: published ? "Takes it off the site" : "Only visible here" },
  ];
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className={cn(labelCls, "mb-2")}>When</legend>
      <div className="grid gap-2 sm:grid-cols-3">
        {options.map((o) => (
          <label
            key={o.id}
            className={cn(
              "flex cursor-pointer items-start gap-2.5 rounded-xl border-[1.5px] px-3.5 py-3",
              mode === o.id ? "border-link bg-blue-soft" : "border-border bg-card hover:bg-secondary"
            )}
          >
            <input type="radio" name="publish-mode" checked={mode === o.id} onChange={() => setMode(o.id)} className="mt-1" />
            <span className="flex flex-col">
              <span className="text-[15px] font-semibold">{o.label}</span>
              <span className="text-[13px] text-muted-foreground">{o.hint}</span>
            </span>
          </label>
        ))}
      </div>
      {mode === "schedule" && (
        <Field label="Publish at" hint={at ? `Your time zone. Goes live ${formatWhen(new Date(at).toISOString())}.` : undefined}>
          <input type="datetime-local" required value={at} min={toLocalInput(new Date().toISOString())} onChange={(e) => setAt(e.target.value)} className={cn(field, "sm:max-w-[280px]")} />
        </Field>
      )}
    </fieldset>
  );
}

function SaveBar({ busy, progress, error, disabled, label, onCancel }: { busy: boolean; progress: string; error: string; disabled: boolean; label: string; onCancel?: () => void }) {
  return (
    <div className="flex flex-col gap-3 border-t border-line-2 pt-5">
      {error && (
        <p className="flex items-start gap-2 rounded-xl bg-[#FDECEC] px-4 py-3 text-[15px] text-[#9B1C1C]">
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" /> {error}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={busy || disabled}
          className="flex h-[52px] items-center justify-center gap-2 rounded-xl bg-brand px-6 text-base font-bold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy && <Loader2 className="h-[18px] w-[18px] animate-spin" />}
          {busy ? "Saving…" : label}
        </button>
        {onCancel && !busy && (
          <button type="button" onClick={onCancel} className="h-[52px] rounded-xl px-5 text-[15px] font-semibold text-muted-foreground hover:bg-secondary hover:text-foreground">
            Cancel
          </button>
        )}
        {busy && <span className="text-sm text-muted-foreground">{progress}</span>}
      </div>
    </div>
  );
}

const submitLabel = (mode: Mode, noun: string, published?: boolean) =>
  mode === "draft" ? (published ? "Move to drafts" : "Save draft") : mode === "schedule" ? `Schedule ${noun}` : published ? `Update ${noun}` : `Publish ${noun}`;

/* ------------------------------------------------------------------ */
/* Portfolio shot (new, or an existing one being edited)               */
/* ------------------------------------------------------------------ */
function ShotForm({ token, onSaved, editing, onDone }: { token: string; onSaved: (r: SaveResult) => void; editing?: Editing<Shot>; onDone?: () => void }) {
  const draft = editing?.item;
  const published = editing?.from === "published";
  const [title, setTitle] = useState(draft?.title ?? "");
  const [id, setId] = useState(draft?.id ?? "");
  const [idTouched, setIdTouched] = useState(!!draft);
  const [category, setCategory] = useState<(typeof SHOT_CATEGORIES)[number]>((draft?.category as (typeof SHOT_CATEGORIES)[number]) ?? "Web App");
  const [tagText, setTagText] = useState(draft?.tags.join(", ") ?? "");
  const [dribbbleUrl, setDribbbleUrl] = useState(draft?.dribbbleUrl ?? "");
  const [liveUrl, setLiveUrl] = useState(draft?.liveUrl ?? "");
  const [description, setDescription] = useState(draft?.description ?? "");
  const [main, setMain] = useState<File[]>([]);
  const [extra, setExtra] = useState<File[]>([]);
  const [mode, setMode] = useState<Mode>(startMode(editing));
  const [at, setAt] = useState(draft?.publishAt && !isLive(draft) ? toLocalInput(draft.publishAt) : tomorrowNine());
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");

  const slug = idTouched ? id : slugify(title);
  const clash = SHOTS.some((s) => s.id === slug && s.id !== draft?.id);
  const hasMain = !!main[0] || !!draft?.imgUrl;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!slug || clash) return;
    if (!description.trim()) return setError("Write a description first.");
    if (mode !== "draft" && !hasMain) return setError("Add a main image before publishing, or save as a draft.");
    setBusy(true);
    try {
      const dir = "public/images/portfolio/shots";
      const web = `/images/portfolio/shots`;
      const files: CommitFile[] = [];
      let imgUrl = draft?.imgUrl ?? "";
      let fullImgUrl = draft?.fullImgUrl;
      let gallery = draft?.gallery;
      if (main[0]) {
        setProgress("Converting the main image…");
        const full = await convertImage(main[0], 2880);
        const thumb = await topCrop(main[0], 1200, 900);
        files.push({ path: `${dir}/${slug}.webp`, content: thumb.base64, encoding: "base64" }, { path: `${dir}/${slug}-full.webp`, content: full.base64, encoding: "base64" });
        files.push(...dropImages([imgUrl, fullImgUrl].filter((u) => u && u !== `${web}/${slug}.webp` && u !== `${web}/${slug}-full.webp`)));
        imgUrl = `${web}/${slug}.webp`;
        fullImgUrl = `${web}/${slug}-full.webp`;
      }
      if (extra.length) {
        setProgress("Converting the extra screens…");
        const next: string[] = [];
        for (const [i, f] of extra.entries()) {
          const img = await convertImage(f, 2880);
          const path = `${web}/${slug}-${i + 2}.webp`;
          files.push({ path: `public${path}`, content: img.base64, encoding: "base64" });
          next.push(path);
        }
        files.push(...dropImages((gallery ?? []).filter((u) => !next.includes(u))));
        gallery = next;
      }

      setProgress("Reading the current portfolio…");
      const live = await readJson<Shot[]>(token, PORTFOLIO_JSON);
      const drafts = await readDrafts(token);
      if (live.some((s) => s.id === slug && !(published && s.id === draft?.id))) throw new Error(`A shot with the address "${slug}" is already published.`);
      if (drafts.shots.some((s) => s.id === slug && !(!published && s.id === draft?.id))) throw new Error(`A draft with the address "${slug}" already exists.`);

      const shot: Shot = {
        id: slug,
        title: title.trim(),
        category,
        tags: tags(tagText),
        ...(dribbbleUrl.trim() ? { dribbbleUrl: dribbbleUrl.trim() } : {}),
        ...(liveUrl.trim() ? { liveUrl: liveUrl.trim() } : {}),
        imgUrl,
        ...(fullImgUrl ? { fullImgUrl } : {}),
        ...(gallery?.length ? { gallery } : {}),
        description: description.trim(),
        ...(mode === "schedule" ? { publishAt: new Date(at).toISOString() } : {}),
      };
      const otherDrafts = published ? drafts.shots : drafts.shots.filter((s) => s.id !== draft?.id);
      const otherLive = published ? live.filter((s) => s.id !== draft?.id) : live;
      if (mode === "draft") {
        files.push({ path: DRAFTS_JSON, content: json({ ...drafts, shots: [shot, ...otherDrafts] }), encoding: "utf-8" });
        if (published) files.push({ path: PORTFOLIO_JSON, content: json(otherLive), encoding: "utf-8" });
      } else {
        // An edited shot keeps its place in the portfolio; a new one goes first.
        files.push({ path: PORTFOLIO_JSON, content: json(published ? live.map((s) => (s.id === draft?.id ? shot : s)) : [shot, ...live]), encoding: "utf-8" });
        if (draft && !published) files.push({ path: DRAFTS_JSON, content: json({ ...drafts, shots: otherDrafts }), encoding: "utf-8" });
      }

      setProgress(`Committing ${files.length} files…`);
      const verb = mode === "draft" ? (published ? "Unpublish portfolio shot" : "Save draft shot") : mode === "schedule" ? "Schedule portfolio shot" : published ? "Update portfolio shot" : "Add portfolio shot";
      const sha = await commitFiles(token, `${verb}: ${shot.title}`, files);
      onSaved({
        sha,
        url: `https://codespanda.com/portfolio/${slug}`,
        note: mode === "draft" ? `Draft "${shot.title}" saved. Find it under Portfolio → Drafts.` : mode === "schedule" ? `"${shot.title}" is scheduled for ${formatWhen(shot.publishAt!)}.` : undefined,
      });
      if (onDone) return onDone();
      setTitle("");
      setId("");
      setIdTouched(false);
      setTagText("");
      setDribbbleUrl("");
      setLiveUrl("");
      setDescription("");
      setMain([]);
      setExtra([]);
      setMode("now");
    } catch (err) {
      setError(errorText(err));
    } finally {
      setBusy(false);
      setProgress("");
    }
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-5">
      {draft && <p className="rounded-xl bg-soft-2 px-4 py-3 text-[15px] font-semibold">{published ? "Editing published shot" : "Editing draft"}: {draft.title}</p>}
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Title">
          <input required value={title} onChange={(e) => setTitle(e.target.value)} className={field} placeholder="My Listings — Marketplace Seller Dashboard UI" />
        </Field>
        <Field label="Page address" hint={clash ? <span className="font-semibold text-[#B42318]">This address is taken — change it.</span> : `codespanda.com/portfolio/${slug || "…"}${published ? " — fixed once published, so links keep working" : ""}`}>
          <input
            required
            value={slug}
            disabled={published}
            onChange={(e) => {
              setIdTouched(true);
              setId(slugify(e.target.value));
            }}
            className={field}
            placeholder="my-listings"
          />
        </Field>
        <Field label="Category">
          <select value={category} onChange={(e) => setCategory(e.target.value as (typeof SHOT_CATEGORIES)[number])} className={field}>
            {SHOT_CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>
        <Field label="Tags" hint="Comma separated, e.g. Marketplace, Dashboard, E-commerce">
          <input value={tagText} onChange={(e) => setTagText(e.target.value)} className={field} placeholder="Marketplace, Dashboard" />
        </Field>
        <Field label="Dribbble link (optional)">
          <input type="url" value={dribbbleUrl} onChange={(e) => setDribbbleUrl(e.target.value)} className={field} placeholder="https://dribbble.com/shots/…" />
        </Field>
        <Field label="Live product link (optional)" hint="If set, the page shows “Visit live product” instead of Dribbble.">
          <input type="url" value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} className={field} placeholder="https://…" />
        </Field>
      </div>
      <div className="flex flex-col gap-1.5">
        <span className={labelCls}>Description</span>
        <RichTextEditor label="Description" flavor="shot" value={description} onChange={setDescription} minHeight={200} placeholder="What the design is, who it's for and what's inside…" />
        <span className="text-[13px] text-muted-foreground">The first paragraph shows under the title. Use Bullets for feature lists.</span>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <ImagePick
          label="Main image"
          hint="Kept at full clarity (up to 2880px wide). The card thumbnail is cropped from its top."
          files={main}
          onChange={(f) => setMain(f.slice(0, 1))}
          current={draft?.imgUrl ? [draft.imgUrl] : []}
        />
        <ImagePick label="More screens (optional)" hint="Shown below the main image, in order." multiple files={extra} onChange={setExtra} current={draft?.gallery ?? []} />
      </div>
      <PublishOptions mode={mode} setMode={setMode} at={at} setAt={setAt} published={published} />
      <SaveBar busy={busy} progress={progress} error={error} disabled={!slug || clash || (mode !== "draft" && !hasMain)} label={submitLabel(mode, "shot", published)} onCancel={onDone} />
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* Blog post (new, or an existing one being edited)                    */
/* ------------------------------------------------------------------ */
function PostForm({ token, onSaved, editing, onDone }: { token: string; onSaved: (r: SaveResult) => void; editing?: Editing<BlogPost>; onDone?: () => void }) {
  const draft = editing?.item;
  const published = editing?.from === "published";
  const [title, setTitle] = useState(draft?.title ?? "");
  const [slugText, setSlugText] = useState(draft?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!draft);
  const [excerpt, setExcerpt] = useState(draft?.excerpt ?? "");
  const [category, setCategory] = useState(draft?.category ?? "");
  const [tagText, setTagText] = useState(draft?.tags.join(", ") ?? "");
  const [author, setAuthor] = useState(draft?.author ?? "CodesPanda");
  const [date, setDate] = useState(draft?.date ?? today());
  const [content, setContent] = useState(draft?.content ?? "");
  const [cover, setCover] = useState<File[]>([]);
  const [mode, setMode] = useState<Mode>(startMode(editing));
  const [at, setAt] = useState(draft?.publishAt && !isLive(draft) ? toLocalInput(draft.publishAt) : tomorrowNine());
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");

  const slug = slugTouched ? slugText : slugify(title);
  const clash = BLOG_POSTS.some((p) => p.slug === slug && p.slug !== draft?.slug);
  const words = content.trim() ? content.trim().split(/\s+/).length : 0;
  const readTime = `${Math.max(1, Math.round(words / 200))} min read`;
  const hasCover = !!cover[0] || !!draft?.coverImage;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!slug || clash) return;
    if (!content.trim()) return setError("Write the post first.");
    if (mode !== "draft" && !hasCover) return setError("Add a cover image before publishing, or save as a draft.");
    setBusy(true);
    try {
      const files: CommitFile[] = [];
      let coverImage = draft?.coverImage;
      if (cover[0]) {
        setProgress("Converting the cover…");
        const image = await convertImage(cover[0], 1600);
        const path = `/images/blogs/${slug}.webp`;
        files.push({ path: `public${path}`, content: image.base64, encoding: "base64" });
        if (coverImage && coverImage !== path) files.push(...dropImages([coverImage]));
        coverImage = path;
      }
      setProgress("Reading the current posts…");
      const live = await readJson<BlogPost[]>(token, BLOG_JSON);
      const drafts = await readDrafts(token);
      if (live.some((p) => p.slug === slug && !(published && p.slug === draft?.slug))) throw new Error(`A post with the address "${slug}" is already published.`);
      if (drafts.posts.some((p) => p.slug === slug && !(!published && p.slug === draft?.slug))) throw new Error(`A draft with the address "${slug}" already exists.`);

      const publishAt = mode === "schedule" ? new Date(at).toISOString() : undefined;
      // Start from the stored post so fields the form doesn't show (cover video, resource links) are kept.
      const { publishAt: _old, ...base } = live.find((p) => p.slug === draft?.slug) ?? draft ?? ({} as Partial<BlogPost>);
      const post: BlogPost = {
        ...base,
        slug,
        title: title.trim(),
        excerpt: excerpt.trim(),
        category: category.trim() || "Story",
        tags: tags(tagText),
        author: author.trim() || "CodesPanda",
        // A scheduled post is dated the day it goes live, so it sorts as the newest then.
        date: publishAt ? localDate(new Date(publishAt)) : date,
        readTime,
        gradient: base.gradient ?? "from-sky-500 to-blue-600",
        icon: base.icon ?? "Sparkles",
        ...(coverImage ? { coverImage } : {}),
        content: content.trim(),
        ...(publishAt ? { publishAt } : {}),
      };
      const otherDrafts = published ? drafts.posts : drafts.posts.filter((p) => p.slug !== draft?.slug);
      if (mode === "draft") {
        files.push({ path: DRAFTS_JSON, content: json({ ...drafts, posts: [post, ...otherDrafts] }), encoding: "utf-8" });
        if (published) files.push({ path: BLOG_JSON, content: json(live.filter((p) => p.slug !== draft?.slug)), encoding: "utf-8" });
      } else {
        // An edited post keeps its place; a new one goes first.
        files.push({ path: BLOG_JSON, content: json(published ? live.map((p) => (p.slug === draft?.slug ? post : p)) : [post, ...live]), encoding: "utf-8" });
        if (draft && !published) files.push({ path: DRAFTS_JSON, content: json({ ...drafts, posts: otherDrafts }), encoding: "utf-8" });
      }

      setProgress("Committing…");
      const verb = mode === "draft" ? (published ? "Unpublish blog post" : "Save draft post") : mode === "schedule" ? "Schedule blog post" : published ? "Update blog post" : "Add blog post";
      const sha = await commitFiles(token, `${verb}: ${post.title}`, files);
      onSaved({
        sha,
        url: `https://codespanda.com/blog/${slug}`,
        note: mode === "draft" ? `Draft "${post.title}" saved. Find it under Blogs → Drafts.` : publishAt ? `"${post.title}" is scheduled for ${formatWhen(publishAt)}.` : undefined,
      });
      if (onDone) return onDone();
      setTitle("");
      setSlugText("");
      setSlugTouched(false);
      setExcerpt("");
      setTagText("");
      setContent("");
      setCover([]);
      setMode("now");
    } catch (err) {
      setError(errorText(err));
    } finally {
      setBusy(false);
      setProgress("");
    }
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-5">
      {draft && <p className="rounded-xl bg-soft-2 px-4 py-3 text-[15px] font-semibold">{published ? "Editing published post" : "Editing draft"}: {draft.title}</p>}
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Title">
          <input required value={title} onChange={(e) => setTitle(e.target.value)} className={field} placeholder="How We Build Admin Dashboards in a Week" />
        </Field>
        <Field label="Page address" hint={clash ? <span className="font-semibold text-[#B42318]">This address is taken — change it.</span> : `codespanda.com/blog/${slug || "…"}${published ? " — fixed once published, so links keep working" : ""}`}>
          <input
            required
            value={slug}
            disabled={published}
            onChange={(e) => {
              setSlugTouched(true);
              setSlugText(slugify(e.target.value));
            }}
            className={field}
          />
        </Field>
      </div>
      <Field
        label="Summary"
        hint={<span className={excerpt.length > 160 ? "font-semibold text-[#B42318]" : undefined}>{excerpt.length}/160 — shown on the blog list and in Google results. Keep it under 160 characters.</span>}
      >
        <textarea required rows={2} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className={cn(field, "resize-y")} />
      </Field>
      <div className="grid gap-4 md:grid-cols-4">
        <Field label="Category">
          <input list="studio-categories" value={category} onChange={(e) => setCategory(e.target.value)} className={field} placeholder="Design" />
          <datalist id="studio-categories">
            {BLOG_CATEGORIES.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </Field>
        <Field label="Tags" hint="Comma separated">
          <input value={tagText} onChange={(e) => setTagText(e.target.value)} className={field} placeholder="React, Dashboards" />
        </Field>
        <Field label="Author">
          <input value={author} onChange={(e) => setAuthor(e.target.value)} className={field} />
        </Field>
        <Field label="Date" hint={mode === "schedule" ? "Set from the schedule" : undefined}>
          <input type="date" value={mode === "schedule" && at ? at.slice(0, 10) : date} disabled={mode === "schedule"} onChange={(e) => setDate(e.target.value)} className={field} />
        </Field>
      </div>
      <ImagePick
        label="Cover image"
        hint="Shown on the blog list, at the top of the post and in link previews. Wide images (16:9) work best."
        files={cover}
        onChange={(f) => setCover(f.slice(0, 1))}
        current={draft?.coverImage ? [draft.coverImage] : []}
      />
      <div className="flex flex-col gap-1.5">
        <span className={labelCls}>Post</span>
        <RichTextEditor label="Post" flavor="post" value={content} onChange={setContent} minHeight={420} placeholder="Start writing. Use Heading for sections and Bullets for lists." />
        <span className="text-[13px] text-muted-foreground">
          {words} words · {readTime}. Typing “## ” starts a heading and “- ” a bullet list.
        </span>
      </div>
      <PublishOptions mode={mode} setMode={setMode} at={at} setAt={setAt} published={published} />
      <SaveBar busy={busy} progress={progress} error={error} disabled={!slug || clash || (excerpt.length > 200 && excerpt !== draft?.excerpt) || (mode !== "draft" && !hasCover)} label={submitLabel(mode, "post", published)} onCancel={onDone} />
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* Template (new, or an existing one being edited)                     */
/* ------------------------------------------------------------------ */
const BADGE_COLORS = [...new Set(TEMPLATES.map((t) => t.badgeColor))];
const monthYear = () => new Date().toLocaleString("en-US", { month: "long", year: "numeric" });
/** A screen row: an image already on the site, or a new upload. */
interface ScreenRow {
  key: string;
  src?: string;
  file?: File;
  label: string;
}
const labelFromFile = (name: string) => name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").replace(/^\w/, (c) => c.toUpperCase());

function ScreensEditor({ rows, setRows }: { rows: ScreenRow[]; setRows: (r: ScreenRow[]) => void }) {
  const previews = useMemo(() => new Map(rows.filter((r) => r.file).map((r) => [r.key, URL.createObjectURL(r.file!)])), [rows]);
  useEffect(() => () => previews.forEach((u) => URL.revokeObjectURL(u)), [previews]);
  const move = (i: number, by: number) => {
    const next = [...rows];
    [next[i], next[i + by]] = [next[i + by], next[i]];
    setRows(next);
  };
  return (
    <div className="flex flex-col gap-2">
      <span className={labelCls}>Screens</span>
      {rows.length > 0 && (
        <ul className="flex flex-col gap-2">
          {rows.map((r, i) => (
            <li key={r.key} className="flex flex-wrap items-center gap-3 rounded-xl border border-border p-2.5">
              <img src={r.file ? previews.get(r.key) : `${RAW}${r.src}`} alt="" className="h-16 w-24 rounded-lg border border-border bg-secondary object-cover object-top" />
              <div className="flex min-w-[180px] flex-1 flex-col gap-1">
                <input value={r.label} onChange={(e) => setRows(rows.map((x) => (x.key === r.key ? { ...x, label: e.target.value } : x)))} className={cn(field, "py-2")} placeholder="Label, e.g. Dashboard" aria-label={`Screen ${i + 1} label`} />
                <span className="text-xs text-muted-foreground">{i === 0 ? "Main screen — also the card image and link preview" : `Screen ${i + 1}`}{r.file ? " · new" : ""}</span>
              </div>
              <div className="flex gap-1">
                <button type="button" disabled={i === 0} onClick={() => move(i, -1)} className="h-9 rounded-lg px-2.5 text-sm font-semibold hover:bg-secondary disabled:opacity-40" aria-label="Move up">
                  ↑
                </button>
                <button type="button" disabled={i === rows.length - 1} onClick={() => move(i, 1)} className="h-9 rounded-lg px-2.5 text-sm font-semibold hover:bg-secondary disabled:opacity-40" aria-label="Move down">
                  ↓
                </button>
                <button type="button" onClick={() => setRows(rows.filter((x) => x.key !== r.key))} className="h-9 rounded-lg px-2.5 text-[#B42318] hover:bg-[#FDECEC]" aria-label="Remove screen">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <label className="flex cursor-pointer items-center gap-3 rounded-xl border-[1.5px] border-dashed border-input px-4 py-4 hover:border-link hover:bg-secondary">
        <ImagePlus className="h-5 w-5 text-link" />
        <span className="flex flex-col">
          <span className="text-[15px] font-semibold">Add screens</span>
          <span className="text-[13px] text-muted-foreground">Full-page screenshots, kept sharp (up to 2400px wide). The first is the large preview; the next two sit beneath it.</span>
        </span>
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          multiple
          className="sr-only"
          onChange={(e) => {
            const added = Array.from(e.target.files ?? []).map((file) => ({ key: `${file.name}-${Math.random()}`, file, label: labelFromFile(file.name) }));
            setRows([...rows, ...added]);
            e.target.value = "";
          }}
        />
      </label>
    </div>
  );
}

/** Editable list of two-field rows ("What's inside" items, FAQ entries). */
function PairsEditor<T extends object>({
  label,
  hint,
  rows,
  setRows,
  keys,
  placeholders,
  addLabel,
}: {
  label: string;
  hint?: string;
  rows: T[];
  setRows: (r: T[]) => void;
  keys: [keyof T & string, keyof T & string];
  placeholders: [string, string];
  addLabel: string;
}) {
  const [a, b] = keys;
  return (
    <div className="flex flex-col gap-2">
      <span className={labelCls}>{label}</span>
      {hint && <span className="-mt-1 text-[13px] text-muted-foreground">{hint}</span>}
      <ul className="flex flex-col gap-2">
        {rows.map((r, i) => (
          <li key={i} className="flex items-start gap-2 rounded-xl border border-border p-2.5">
            <div className="flex flex-1 flex-col gap-2">
              <input value={String(r[a] ?? "")} onChange={(e) => setRows(rows.map((x, j) => (j === i ? { ...x, [a]: e.target.value } : x)))} className={cn(field, "py-2 font-semibold")} placeholder={placeholders[0]} />
              <textarea rows={2} value={String(r[b] ?? "")} onChange={(e) => setRows(rows.map((x, j) => (j === i ? { ...x, [b]: e.target.value } : x)))} className={cn(field, "resize-y py-2")} placeholder={placeholders[1]} />
            </div>
            <button type="button" onClick={() => setRows(rows.filter((_, j) => j !== i))} className="mt-1 h-9 rounded-lg px-2.5 text-[#B42318] hover:bg-[#FDECEC]" aria-label="Remove">
              <Trash2 className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>
      <button type="button" onClick={() => setRows([...rows, { [a]: "", [b]: "" } as unknown as T])} className="flex h-10 w-fit items-center gap-1.5 rounded-lg px-3 text-sm font-semibold text-link hover:bg-secondary">
        + {addLabel}
      </button>
    </div>
  );
}

function TemplateForm({ token, onSaved, editing, onDone }: { token: string; onSaved: (r: SaveResult) => void; editing?: Editing<TemplateItem>; onDone?: () => void }) {
  const draft = editing?.item;
  const published = editing?.from === "published";
  const basePage = draft?.page;
  // A template with its own hand-built page (e.g. Finovo) only has its card edited here.
  const hasPage = !draft || !!basePage;

  const [name, setName] = useState(draft?.name ?? "");
  const [idText, setIdText] = useState(draft?.id ?? "");
  const [idTouched, setIdTouched] = useState(!!draft);
  const [description, setDescription] = useState(draft?.description ?? "");
  const [category, setCategory] = useState(draft?.category ?? "");
  const [industry, setIndustry] = useState(draft?.industry ?? "");
  const [badge, setBadge] = useState<Template["badge"]>(draft?.badge ?? "New");
  const [badgeColor, setBadgeColor] = useState(draft?.badgeColor ?? BADGE_COLORS[0] ?? "from-blue-600 to-indigo-600");
  const [tint, setTint] = useState(draft?.tint ?? "#EDF1F5");
  const [liveUrl, setLiveUrl] = useState(draft?.liveUrl ?? "");
  const [githubUrl, setGithubUrl] = useState(basePage?.githubUrl ?? "");
  const [docsUrl, setDocsUrl] = useState(draft?.docsUrl ?? "");
  const [techText, setTechText] = useState(draft?.techStack.join(", ") ?? "React 18, Vite, Tailwind CSS");
  const [featureText, setFeatureText] = useState(draft?.features.join(", ") ?? "");
  const [darkMode, setDarkMode] = useState(draft?.darkMode ?? false);
  const [responsive, setResponsive] = useState(draft?.responsive ?? true);
  const [updated, setUpdated] = useState(basePage?.updated ?? monthYear());
  const [screens, setScreens] = useState<ScreenRow[]>(basePage?.screens.map((s, i) => ({ key: `s${i}`, src: s.src, label: s.label })) ?? []);
  const [inside, setInside] = useState(basePage?.inside ?? [{ label: "", desc: "" }]);
  const [faq, setFaq] = useState(basePage?.faq ?? []);
  const [seoTitle, setSeoTitle] = useState(basePage?.seo.title ?? "");
  const [seoTitleTouched, setSeoTitleTouched] = useState(!!basePage);
  const [seoDesc, setSeoDesc] = useState(basePage?.seo.description ?? "");
  const [keywords, setKeywords] = useState(basePage?.seo.keywords ?? "");
  const [mode, setMode] = useState<Mode>(startMode(editing));
  const [at, setAt] = useState(draft?.publishAt && !isLive(draft) ? toLocalInput(draft.publishAt) : tomorrowNine());
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");

  const id = idTouched ? idText : slugify(name);
  const pageSlug = basePage?.slug ?? id;
  const taken = (s: string) => TEMPLATES.some((t) => t.id !== draft?.id && (t.id === s || TEMPLATE_PAGES[t.id]?.slug === s || t.detailsUrl?.toLowerCase() === `/templates/${s}`));
  const clash = !!id && taken(id);
  const title = seoTitleTouched ? seoTitle : name ? `${name} — Free ${category.split("/").pop()?.trim() || "React"} Template | CodesPanda` : "";
  const hasImage = screens.length > 0 || !!draft?.screenshotUrl;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!id || clash) return;
    if (mode !== "draft" && hasPage && !hasImage) return setError("Add at least one screen before publishing, or save as a draft.");
    setBusy(true);
    try {
      const dir = `/images/templates/${id}`;
      const stamp = Date.now().toString(36);
      const files: CommitFile[] = [];
      const outScreens: { src: string; label: string }[] = [];
      let shareImage = basePage?.share?.image;
      for (const [i, row] of screens.entries()) {
        const label = row.label.trim() || `Screen ${i + 1}`;
        if (!row.file) {
          outScreens.push({ src: row.src!, label });
          continue;
        }
        setProgress(`Converting screen ${i + 1} of ${screens.length}…`);
        const img = await convertImage(row.file, 2400);
        const path = `${dir}/${stamp}-${i + 1}.webp`;
        files.push({ path: `public${path}`, content: img.base64, encoding: "base64" });
        outScreens.push({ src: path, label });
        if (i === 0) {
          // WhatsApp and LinkedIn previews ignore WebP, so the link preview gets a JPEG.
          const jpg = await shareImageJpeg(row.file);
          shareImage = `${dir}/${stamp}-share.jpg`;
          files.push({ path: `public${shareImage}`, content: jpg.base64, encoding: "base64" });
        }
      }
      // Drop studio-uploaded images the template no longer uses.
      const kept = new Set([...outScreens.map((s) => s.src), shareImage]);
      files.push(...dropImages([...(basePage?.screens.map((s) => s.src) ?? []), basePage?.share?.image].filter((u) => u?.startsWith("/images/templates/") && !kept.has(u))));

      const main = outScreens[0];
      const card: Template = {
        ...(draft ? (({ page: _p, publishAt: _a, ...c }) => c)(draft) : {}),
        id,
        name: name.trim(),
        description: description.trim(),
        category: category.trim(),
        badge,
        badgeColor,
        liveUrl: liveUrl.trim(),
        docsUrl: docsUrl.trim() || (githubUrl.trim() ? `${githubUrl.trim().replace(/\/$/, "")}#readme` : liveUrl.trim()),
        detailsUrl: hasPage ? (draft?.detailsUrl ?? `/templates/${pageSlug}`) : draft?.detailsUrl,
        screenshotUrl: main?.src ?? draft?.screenshotUrl,
        techStack: tags(techText),
        features: tags(featureText),
        darkMode,
        responsive,
        tint,
        industry: industry || undefined,
        ...(mode === "schedule" ? { publishAt: new Date(at).toISOString() } : {}),
      };

      let page: TemplatePageContent | undefined;
      if (hasPage) {
        const titleChanged = title !== basePage?.seo.title;
        const descChanged = seoDesc.trim() !== basePage?.seo.description;
        const mainChanged = main?.src !== basePage?.screens[0]?.src;
        const seo: TemplatePageSeo = {
          ...(basePage?.seo ?? {}),
          title,
          description: seoDesc.trim(),
          keywords: keywords.trim(),
          image: main?.src ?? basePage?.seo.image ?? draft?.screenshotUrl ?? "/og-share.jpg",
          schemaName: name.trim(),
          schemaDescription: descChanged || !basePage ? seoDesc.trim() : basePage.seo.schemaDescription,
          schemaCategory: basePage?.seo.schemaCategory ?? (/admin|dashboard|pos/i.test(category) ? "Software > Templates > Admin Dashboard" : "Software > Templates > Website"),
        };
        if (titleChanged) {
          delete seo.ogTitle;
          delete seo.twitterTitle;
        }
        if (descChanged) {
          delete seo.ogDescription;
          delete seo.twitterDescription;
        }
        if (mainChanged) {
          delete seo.imageWidth;
          delete seo.imageHeight;
          delete seo.schemaImage;
          delete seo.twitterImageAlt;
          if (main) seo.imageAlt = `${name.trim()} — ${main.label}`;
        }
        const share = { ...(basePage?.share ?? {}) };
        if (titleChanged) delete share.title;
        if (descChanged) delete share.description;
        if (shareImage && shareImage !== seo.image) share.image = shareImage;
        else delete share.image;
        page = {
          ...(basePage ?? {}),
          slug: pageSlug,
          githubUrl: githubUrl.trim(),
          updated: updated.trim(),
          screens: outScreens,
          inside: inside.filter((r) => r.label.trim()).map((r) => ({ label: r.label.trim(), desc: r.desc.trim() })),
          faq: faq.filter((r) => r.q.trim()).map((r) => ({ q: r.q.trim(), a: r.a.trim() })),
          seo,
          ...(Object.keys(share).length ? { share } : {}),
        };
        if (!Object.keys(share).length) delete page.share;
      }

      setProgress("Reading the current templates…");
      const [live, pages, drafts] = await Promise.all([readJson<Template[]>(token, TEMPLATES_JSON), readJson<Record<string, TemplatePageContent>>(token, TEMPLATE_PAGES_JSON), readDrafts(token)]);
      if (live.some((t) => t.id === id && !(published && t.id === draft?.id))) throw new Error(`A template with the id "${id}" is already published.`);
      if (drafts.templates.some((t) => t.id === id && !(!published && t.id === draft?.id))) throw new Error(`A draft with the id "${id}" already exists.`);

      const otherDrafts = published ? drafts.templates : drafts.templates.filter((t) => t.id !== draft?.id);
      if (mode === "draft") {
        files.push({ path: DRAFTS_JSON, content: json({ ...drafts, templates: [{ ...card, ...(page ? { page } : {}) }, ...otherDrafts] }), encoding: "utf-8" });
        if (published) {
          const { [id]: _gone, ...rest } = pages;
          files.push({ path: TEMPLATES_JSON, content: json(live.filter((t) => t.id !== id)), encoding: "utf-8" }, { path: TEMPLATE_PAGES_JSON, content: json(rest), encoding: "utf-8" });
        }
      } else {
        // An edited template keeps its place; a new one goes first.
        files.push({ path: TEMPLATES_JSON, content: json(published ? live.map((t) => (t.id === id ? card : t)) : [card, ...live]), encoding: "utf-8" });
        if (page) files.push({ path: TEMPLATE_PAGES_JSON, content: json({ ...pages, [id]: page }), encoding: "utf-8" });
        if (draft && !published) files.push({ path: DRAFTS_JSON, content: json({ ...drafts, templates: otherDrafts }), encoding: "utf-8" });
      }

      setProgress(`Committing ${files.length} files…`);
      const verb = mode === "draft" ? (published ? "Unpublish template" : "Save draft template") : mode === "schedule" ? "Schedule template" : published ? "Update template" : "Add template";
      const sha = await commitFiles(token, `${verb}: ${card.name}`, files);
      onSaved({
        sha,
        url: `https://codespanda.com${card.detailsUrl ?? "/templates"}`,
        note: mode === "draft" ? `Draft "${card.name}" saved. Find it under Templates → Drafts.` : mode === "schedule" ? `"${card.name}" is scheduled for ${formatWhen(card.publishAt!)}.` : undefined,
      });
      onDone?.();
    } catch (err) {
      setError(errorText(err));
    } finally {
      setBusy(false);
      setProgress("");
    }
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-5">
      {draft && <p className="rounded-xl bg-soft-2 px-4 py-3 text-[15px] font-semibold">{published ? "Editing published template" : "Editing draft"}: {draft.name}</p>}
      <h3 className="text-lg font-bold">Card</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Name">
          <input required value={name} onChange={(e) => setName(e.target.value)} className={field} placeholder="SchulFlow" />
        </Field>
        <Field
          label="Page address"
          hint={clash ? <span className="font-semibold text-[#B42318]">This address is taken — change it.</span> : `codespanda.com/templates/${pageSlug || "…"}${published ? " — fixed once published, so links keep working" : ""}`}
        >
          <input
            required
            value={id}
            disabled={published}
            onChange={(e) => {
              setIdTouched(true);
              setIdText(slugify(e.target.value));
            }}
            className={field}
          />
        </Field>
        <Field label="Category" hint="Shown as “Industry · Type”. Words like Admin, Dashboard or POS list it under Admin panels; anything else under Web pages.">
          <input required value={category} onChange={(e) => setCategory(e.target.value)} className={field} placeholder="Education / School Management Dashboard" />
        </Field>
        <Field label="Industry filter">
          <select value={industry} onChange={(e) => setIndustry(e.target.value)} className={field}>
            <option value="">None</option>
            {INDUSTRIES.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="Description" hint="The card text, and the intro on the template page.">
        <textarea required rows={4} value={description} onChange={(e) => setDescription(e.target.value)} className={cn(field, "resize-y leading-[1.55]")} />
      </Field>
      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Live demo link">
          <input type="url" required value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} className={field} placeholder="https://schulflow.codespanda.com/" />
        </Field>
        <Field label="GitHub repository">
          <input type="url" required={hasPage} disabled={!hasPage} value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} className={field} placeholder="https://github.com/codespanda/…" />
        </Field>
        <Field label="Documentation link (optional)" hint="Defaults to the repository README.">
          <input value={docsUrl} onChange={(e) => setDocsUrl(e.target.value)} className={field} placeholder="/templates/…/docs or https://…" />
        </Field>
        <Field label="Tech stack" hint="Comma separated">
          <input value={techText} onChange={(e) => setTechText(e.target.value)} className={field} />
        </Field>
        <Field label="Highlights" hint="Comma separated, about 4">
          <input value={featureText} onChange={(e) => setFeatureText(e.target.value)} className={field} placeholder="Website + Dashboard, Demo Login" />
        </Field>
        <Field label="Badge">
          <select value={badge} onChange={(e) => setBadge(e.target.value as Template["badge"])} className={field}>
            {(["New", "Popular", "Hot"] as const).map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </Field>
      </div>
      <div className="flex flex-wrap items-end gap-5">
        <Field label="Card background">
          <span className="flex items-center gap-2">
            <input type="color" value={tint} onChange={(e) => setTint(e.target.value.toUpperCase())} className="h-11 w-14 cursor-pointer rounded-lg border border-input bg-card p-1" />
            <span className="text-sm text-muted-foreground">{tint}</span>
          </span>
        </Field>
        <Field label="Badge colour">
          <span className="flex flex-wrap gap-1.5">
            {BADGE_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                title={c}
                aria-label={c}
                aria-pressed={badgeColor === c}
                onClick={() => setBadgeColor(c)}
                className={cn("h-8 w-8 rounded-full bg-gradient-to-br ring-offset-2", c, badgeColor === c && "ring-2 ring-foreground")}
              />
            ))}
          </span>
        </Field>
        <label className="flex h-11 items-center gap-2 text-[15px] font-semibold">
          <input type="checkbox" checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} /> Dark mode
        </label>
        <label className="flex h-11 items-center gap-2 text-[15px] font-semibold">
          <input type="checkbox" checked={responsive} onChange={(e) => setResponsive(e.target.checked)} /> Responsive
        </label>
      </div>

      {hasPage ? (
        <>
          <h3 className="border-t border-line-2 pt-5 text-lg font-bold">Template page</h3>
          <ScreensEditor rows={screens} setRows={setScreens} />
          <PairsEditor
            label="What's inside"
            hint="Pages or modules, shown as a grid (first 9)."
            rows={inside}
            setRows={setInside}
            keys={["label", "desc"]}
            placeholders={["Dashboard overview", "Stat cards, charts and recent activity."]}
            addLabel="Add item"
          />
          <PairsEditor label="FAQ" rows={faq} setRows={setFaq} keys={["q", "a"]} placeholders={["Question", "Answer"]} addLabel="Add question" />
          <Field label="Last updated">
            <input value={updated} onChange={(e) => setUpdated(e.target.value)} className={cn(field, "sm:max-w-[240px]")} />
          </Field>
          <h3 className="border-t border-line-2 pt-5 text-lg font-bold">Search &amp; sharing</h3>
          <Field label="Page title" hint={<span className={title.length > 60 ? "font-semibold text-[#B42318]" : undefined}>{title.length}/60 — the Google result and link preview title.</span>}>
            <input
              required
              value={title}
              onChange={(e) => {
                setSeoTitleTouched(true);
                setSeoTitle(e.target.value);
              }}
              className={field}
            />
          </Field>
          <Field label="Meta description" hint={<span className={seoDesc.length > 160 ? "font-semibold text-[#B42318]" : undefined}>{seoDesc.length}/160 — shown under the title in Google.</span>}>
            <textarea required rows={2} value={seoDesc} onChange={(e) => setSeoDesc(e.target.value)} className={cn(field, "resize-y")} />
          </Field>
          <Field label="Keywords" hint="Comma separated">
            <input value={keywords} onChange={(e) => setKeywords(e.target.value)} className={field} placeholder="school management system template, school dashboard react" />
          </Field>
        </>
      ) : (
        <p className="rounded-xl bg-secondary px-4 py-3 text-[14px] text-muted-foreground">This template has its own hand-built page, so only its card can be edited here.</p>
      )}
      <PublishOptions mode={mode} setMode={setMode} at={at} setAt={setAt} published={published} />
      <SaveBar busy={busy} progress={progress} error={error} disabled={!id || clash || (mode !== "draft" && hasPage && !hasImage)} label={submitLabel(mode, "template", published)} onCancel={onDone} />
    </form>
  );
}

/** Shows one page of a list at a time, with numbered pages underneath. */
const PAGE_SIZE = 10;
function Paged({ rows, label }: { rows: ReactNode[]; label: string }) {
  const [page, setPage] = useState(0);
  const pages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  // Stay on a real page when the list shrinks (e.g. after a delete).
  const current = Math.min(page, pages - 1);
  const go = (n: number) => {
    setPage(n);
    document.getElementById(`list-${label}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const from = current * PAGE_SIZE;
  const btn = "flex h-9 min-w-9 items-center justify-center rounded-lg px-2.5 text-sm font-semibold transition-colors disabled:opacity-40";
  return (
    <div id={`list-${label}`} className="flex scroll-mt-6 flex-col gap-3">
      <ul>{rows.slice(from, from + PAGE_SIZE)}</ul>
      {pages > 1 && (
        <nav aria-label={`${label} pages`} className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
          <span className="text-[13px] text-muted-foreground">
            {from + 1}–{Math.min(from + PAGE_SIZE, rows.length)} of {rows.length}
          </span>
          <div className="flex items-center gap-1">
            <button type="button" onClick={() => go(current - 1)} disabled={current === 0} className={cn(btn, "hover:bg-secondary")} aria-label="Previous page">
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: pages }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-current={i === current ? "page" : undefined}
                className={cn(btn, i === current ? "bg-foreground text-background" : "hover:bg-secondary")}
              >
                {i + 1}
              </button>
            ))}
            <button type="button" onClick={() => go(current + 1)} disabled={current === pages - 1} className={cn(btn, "hover:bg-secondary")} aria-label="Next page">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Drafts, scheduled and live items, one kind at a time                */
/* ------------------------------------------------------------------ */
type Kind = "shot" | "post" | "template";
type EditTarget = ({ kind: "shot" } & Editing<Shot>) | ({ kind: "post" } & Editing<BlogPost>) | ({ kind: "template" } & Editing<TemplateItem>);
interface Content {
  shots: Shot[];
  posts: BlogPost[];
  templates: Template[];
  pages: Record<string, TemplatePageContent>;
  drafts: Drafts;
}

function Library({ token, kind, onSaved, onEdit }: { token: string; kind: Kind; onSaved: (r: SaveResult) => void; onEdit: (t: EditTarget) => void }) {
  const [data, setData] = useState<Content>();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState("");

  const read = async (): Promise<Content> => {
    const [shots, posts, templates, pages, drafts] = await Promise.all([
      readJson<Shot[]>(token, PORTFOLIO_JSON),
      readJson<BlogPost[]>(token, BLOG_JSON),
      readJson<Template[]>(token, TEMPLATES_JSON),
      readJson<Record<string, TemplatePageContent>>(token, TEMPLATE_PAGES_JSON),
      readDrafts(token),
    ]);
    return { shots, posts, templates, pages, drafts };
  };
  const load = async () => {
    setError("");
    try {
      setData(await read());
    } catch (err) {
      setError(errorText(err));
    }
  };
  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  /** Runs one change against fresh copies of the content files and commits it. */
  const change = async (key: string, message: string, build: (c: Content) => CommitFile[], result: Omit<SaveResult, "sha">) => {
    setBusy(key);
    setError("");
    try {
      const sha = await commitFiles(token, message, build(await read()));
      onSaved({ sha, ...result });
      await load();
    } catch (err) {
      setError(errorText(err));
    } finally {
      setBusy("");
    }
  };

  const shotImages = (s?: Shot) => (s ? [s.imgUrl, s.fullImgUrl, ...(s.gallery ?? [])] : []);
  /** Only images uploaded from the studio are removed with a template. */
  const templateImages = (page?: TemplatePageContent) => [...(page?.screens.map((s) => s.src) ?? []), page?.share?.image].filter((u) => u?.startsWith("/images/templates/"));

  const deleteShot = (id: string, title: string, from: "live" | "draft") => {
    if (!window.confirm(`Delete "${title}"? Its images are removed too.`)) return;
    void change(
      id,
      `Remove portfolio shot: ${title}`,
      ({ shots, drafts }) =>
        from === "draft"
          ? [{ path: DRAFTS_JSON, content: json({ ...drafts, shots: drafts.shots.filter((x) => x.id !== id) }), encoding: "utf-8" }, ...dropImages(shotImages(drafts.shots.find((x) => x.id === id)))]
          : [{ path: PORTFOLIO_JSON, content: json(shots.filter((x) => x.id !== id)), encoding: "utf-8" }, ...dropImages(shotImages(shots.find((x) => x.id === id)))],
      { url: "https://codespanda.com/portfolio", note: from === "draft" ? `Draft "${title}" deleted.` : undefined }
    );
  };
  const deletePost = (slug: string, title: string, from: "live" | "draft") => {
    if (!window.confirm(`Delete "${title}"? Its cover image is removed too.`)) return;
    void change(
      slug,
      `Remove blog post: ${title}`,
      ({ posts, drafts }) =>
        from === "draft"
          ? [{ path: DRAFTS_JSON, content: json({ ...drafts, posts: drafts.posts.filter((x) => x.slug !== slug) }), encoding: "utf-8" }, ...dropImages([drafts.posts.find((x) => x.slug === slug)?.coverImage])]
          : [{ path: BLOG_JSON, content: json(posts.filter((x) => x.slug !== slug)), encoding: "utf-8" }, ...dropImages([posts.find((x) => x.slug === slug)?.coverImage])],
      { url: "https://codespanda.com/blog", note: from === "draft" ? `Draft "${title}" deleted.` : undefined }
    );
  };
  const deleteTemplate = (id: string, title: string, from: "live" | "draft") => {
    if (!window.confirm(`Delete "${title}"? It comes off the site, and screens uploaded from the studio are removed.`)) return;
    void change(
      id,
      `Remove template: ${title}`,
      ({ templates, pages, drafts }) => {
        if (from === "draft") {
          return [{ path: DRAFTS_JSON, content: json({ ...drafts, templates: drafts.templates.filter((x) => x.id !== id) }), encoding: "utf-8" }, ...dropImages(templateImages(drafts.templates.find((x) => x.id === id)?.page))];
        }
        const { [id]: gone, ...rest } = pages;
        return [
          { path: TEMPLATES_JSON, content: json(templates.filter((x) => x.id !== id)), encoding: "utf-8" },
          ...(gone ? [{ path: TEMPLATE_PAGES_JSON, content: json(rest), encoding: "utf-8" as const }] : []),
          ...dropImages(templateImages(gone)),
        ];
      },
      { url: "https://codespanda.com/templates", note: from === "draft" ? `Draft "${title}" deleted.` : undefined }
    );
  };

  /** Publishes a draft, or a scheduled item, right away. */
  const publishShotNow = (shot: Shot, from: "draft" | "scheduled") => {
    if (!shot.imgUrl) return setError(`"${shot.title}" has no main image yet. Edit the draft and add one first.`);
    if (from === "draft" && SHOTS.some((x) => x.id === shot.id)) return setError(`The address "${shot.id}" is already taken. Edit the draft and change it.`);
    const { publishAt: _drop, ...live } = shot;
    void change(
      shot.id,
      `Publish portfolio shot: ${shot.title}`,
      ({ shots, drafts }) =>
        from === "draft"
          ? [
              { path: PORTFOLIO_JSON, content: json([live, ...shots]), encoding: "utf-8" },
              { path: DRAFTS_JSON, content: json({ ...drafts, shots: drafts.shots.filter((x) => x.id !== shot.id) }), encoding: "utf-8" },
            ]
          : [{ path: PORTFOLIO_JSON, content: json(shots.map((x) => (x.id === shot.id ? live : x))), encoding: "utf-8" }],
      { url: `https://codespanda.com/portfolio/${shot.id}` }
    );
  };
  const publishPostNow = (post: BlogPost, from: "draft" | "scheduled") => {
    if (!post.coverImage) return setError(`"${post.title}" has no cover image yet. Edit the draft and add one first.`);
    if (from === "draft" && BLOG_POSTS.some((x) => x.slug === post.slug)) return setError(`The address "${post.slug}" is already taken. Edit the draft and change it.`);
    const { publishAt: _drop, ...rest } = post;
    const live = { ...rest, date: today() };
    void change(
      post.slug,
      `Publish blog post: ${post.title}`,
      ({ posts, drafts }) =>
        from === "draft"
          ? [
              { path: BLOG_JSON, content: json([live, ...posts]), encoding: "utf-8" },
              { path: DRAFTS_JSON, content: json({ ...drafts, posts: drafts.posts.filter((x) => x.slug !== post.slug) }), encoding: "utf-8" },
            ]
          : [{ path: BLOG_JSON, content: json(posts.map((x) => (x.slug === post.slug ? live : x))), encoding: "utf-8" }],
      { url: `https://codespanda.com/blog/${post.slug}` }
    );
  };
  const publishTemplateNow = (item: TemplateItem, from: "draft" | "scheduled") => {
    if (item.page && !item.page.screens.length && !item.screenshotUrl) return setError(`"${item.name}" has no screens yet. Edit the draft and add one first.`);
    if (from === "draft" && TEMPLATES.some((x) => x.id === item.id)) return setError(`The id "${item.id}" is already taken. Edit the draft and change it.`);
    const { publishAt: _drop, page, ...card } = item;
    void change(
      item.id,
      `Publish template: ${item.name}`,
      ({ templates, pages, drafts }) =>
        from === "draft"
          ? [
              { path: TEMPLATES_JSON, content: json([card, ...templates]), encoding: "utf-8" },
              ...(page ? [{ path: TEMPLATE_PAGES_JSON, content: json({ ...pages, [item.id]: page }), encoding: "utf-8" as const }] : []),
              { path: DRAFTS_JSON, content: json({ ...drafts, templates: drafts.templates.filter((x) => x.id !== item.id) }), encoding: "utf-8" },
            ]
          : [{ path: TEMPLATES_JSON, content: json(templates.map((x) => (x.id === item.id ? card : x))), encoding: "utf-8" }],
      { url: `https://codespanda.com${card.detailsUrl ?? "/templates"}` }
    );
  };

  const Row = ({ id, title, meta, href, badge, actions }: { id: string; title: string; meta: string; href?: string; badge?: ReactNode; actions: { label: string; icon: ReactNode; onClick: () => void; danger?: boolean }[] }) => (
    <li className="flex flex-col gap-2 border-t border-border py-3 first:border-t-0 sm:flex-row sm:items-center sm:gap-3">
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="flex flex-wrap items-center gap-2">
          {href ? (
            <a href={href} target="_blank" rel="noreferrer noopener" className="truncate text-[15px] font-semibold hover:text-link">
              {title}
            </a>
          ) : (
            <span className="truncate text-[15px] font-semibold">{title}</span>
          )}
          {badge}
        </span>
        <span className="text-[13px] text-muted-foreground">{meta}</span>
      </div>
      <div className="flex flex-wrap gap-1">
        {busy === id ? (
          <Loader2 className="m-2 h-4 w-4 animate-spin text-muted-foreground" />
        ) : (
          actions.map((a) => (
            <button
              key={a.label}
              type="button"
              onClick={a.onClick}
              disabled={!!busy}
              className={cn(
                "flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-semibold disabled:opacity-50",
                a.danger ? "text-[#B42318] hover:bg-[#FDECEC]" : "text-foreground hover:bg-secondary"
              )}
            >
              {a.icon} {a.label}
            </button>
          ))
        )}
      </div>
    </li>
  );

  const scheduledBadge = (iso: string) => (
    <span className="inline-flex items-center gap-1 rounded-md bg-[#FFF4D6] px-2 py-0.5 text-xs font-bold text-[#8A5A00]">
      <CalendarClock className="h-3.5 w-3.5" /> {formatWhen(iso)}
    </span>
  );
  const liveBadge = <span className="rounded-md bg-[#DCF5EA] px-2 py-0.5 text-xs font-bold text-[#05603F]">Live</span>;
  const edit = { label: "Edit", icon: <Pencil className="h-4 w-4" /> };
  const publish = { label: "Publish now", icon: <Send className="h-4 w-4" /> };
  const remove = { label: "Delete", icon: <Trash2 className="h-4 w-4" />, danger: true };

  let draftRows: ReactNode[] = [];
  let liveRows: ReactNode[] = [];
  if (data && kind === "shot") {
    draftRows = data.drafts.shots.map((s) => (
      <Row
        key={`ds-${s.id}`}
        id={s.id}
        title={s.title || "(untitled shot)"}
        meta={`/portfolio/${s.id}`}
        actions={[
          { ...edit, onClick: () => onEdit({ kind: "shot", item: s, from: "draft" }) },
          { ...publish, onClick: () => publishShotNow(s, "draft") },
          { ...remove, onClick: () => deleteShot(s.id, s.title, "draft") },
        ]}
      />
    ));
    liveRows = data.shots.map((s) => {
      const scheduled = !isLive(s);
      return (
        <Row
          key={`s-${s.id}`}
          id={s.id}
          title={s.title}
          meta={`${s.category} · /portfolio/${s.id}`}
          href={scheduled ? undefined : `https://codespanda.com/portfolio/${s.id}`}
          badge={scheduled ? scheduledBadge(s.publishAt!) : liveBadge}
          actions={[
            { ...edit, onClick: () => onEdit({ kind: "shot", item: s, from: "published" }) },
            ...(scheduled ? [{ ...publish, onClick: () => publishShotNow(s, "scheduled") }] : []),
            { ...remove, onClick: () => deleteShot(s.id, s.title, "live") },
          ]}
        />
      );
    });
  } else if (data && kind === "post") {
    draftRows = data.drafts.posts.map((p) => (
      <Row
        key={`dp-${p.slug}`}
        id={p.slug}
        title={p.title || "(untitled post)"}
        meta={`/blog/${p.slug}`}
        actions={[
          { ...edit, onClick: () => onEdit({ kind: "post", item: p, from: "draft" }) },
          { ...publish, onClick: () => publishPostNow(p, "draft") },
          { ...remove, onClick: () => deletePost(p.slug, p.title, "draft") },
        ]}
      />
    ));
    liveRows = [...data.posts]
      .sort((a, b) => b.date.localeCompare(a.date))
      .map((p) => {
        const scheduled = !isLive(p);
        return (
          <Row
            key={`p-${p.slug}`}
            id={p.slug}
            title={p.title}
            meta={`${p.date} · ${p.category}`}
            href={scheduled ? undefined : `https://codespanda.com/blog/${p.slug}`}
            badge={scheduled ? scheduledBadge(p.publishAt!) : liveBadge}
            actions={[
              { ...edit, onClick: () => onEdit({ kind: "post", item: p, from: "published" }) },
              ...(scheduled ? [{ ...publish, onClick: () => publishPostNow(p, "scheduled") }] : []),
              { ...remove, onClick: () => deletePost(p.slug, p.title, "live") },
            ]}
          />
        );
      });
  } else if (data && kind === "template") {
    draftRows = data.drafts.templates.map((t) => (
      <Row
        key={`dt-${t.id}`}
        id={t.id}
        title={t.name || "(untitled template)"}
        meta={`/templates/${t.page?.slug ?? t.id}`}
        actions={[
          { ...edit, onClick: () => onEdit({ kind: "template", item: t, from: "draft" }) },
          { ...publish, onClick: () => publishTemplateNow(t, "draft") },
          { ...remove, onClick: () => deleteTemplate(t.id, t.name, "draft") },
        ]}
      />
    ));
    liveRows = data.templates.map((t) => {
      const scheduled = !isLive(t);
      const item: TemplateItem = { ...t, ...(data.pages[t.id] ? { page: data.pages[t.id] } : {}) };
      return (
        <Row
          key={`t-${t.id}`}
          id={t.id}
          title={t.name}
          meta={`${t.category}${data.pages[t.id] ? "" : " · custom page"}`}
          href={scheduled ? undefined : `https://codespanda.com${t.detailsUrl ?? "/templates"}`}
          badge={scheduled ? scheduledBadge(t.publishAt!) : liveBadge}
          actions={[
            { ...edit, onClick: () => onEdit({ kind: "template", item, from: "published" }) },
            ...(scheduled ? [{ ...publish, onClick: () => publishTemplateNow(item, "scheduled") }] : []),
            { ...remove, onClick: () => deleteTemplate(t.id, t.name, "live") },
          ]}
        />
      );
    });
  }

  const noun = kind === "shot" ? "shot" : kind === "post" ? "post" : "template";
  return (
    <div className="flex flex-col gap-6">
      {error && <p className="rounded-xl bg-[#FDECEC] px-4 py-3 text-[15px] text-[#9B1C1C]">{error}</p>}
      {!data && !error && (
        <p className="flex items-center gap-2 text-[15px] text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading…
        </p>
      )}
      {data && (
        <>
          <section className="flex flex-col gap-3">
            <h3 className="text-lg font-bold">Drafts ({draftRows.length})</h3>
            {draftRows.length === 0 ? <p className="text-sm text-muted-foreground">No drafts. Choose “Save as draft” when adding a {noun} to keep one here.</p> : <Paged rows={draftRows} label="drafts" />}
          </section>
          <section className="flex flex-col gap-3 border-t border-border pt-6">
            <h3 className="text-lg font-bold">Published &amp; scheduled ({liveRows.length})</h3>
            {kind === "shot" && <p className="text-[14px] text-muted-foreground">Shots added from the studio. Shots written into the code earlier aren't listed here.</p>}
            {liveRows.length === 0 ? <p className="text-sm text-muted-foreground">Nothing yet.</p> : <Paged rows={liveRows} label="published" />}
          </section>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sign in with a GitHub token                                         */
/* ------------------------------------------------------------------ */
function SignIn({ onSignedIn }: { onSignedIn: (token: string, login: string) => void }) {
  const [token, setToken] = useState("");
  const [remember, setRemember] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const user = await checkAccess(token.trim());
      saveToken(token.trim(), remember);
      onSignedIn(token.trim(), user.login);
    } catch (err) {
      setError(errorText(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-[560px]">
      <div className="flex flex-col gap-2">
        <h1 className="text-[30px] font-extrabold tracking-[-0.03em]">Studio</h1>
        <p className="text-[15px] leading-[1.6] text-muted-foreground">
          Add portfolio shots and blog posts to codespanda.com. Sign in with a GitHub token that can write to <strong>{REPO.owner}/{REPO.name}</strong>.
        </p>
      </div>
      <ol className="flex list-decimal flex-col gap-1.5 pl-5 text-[14px] leading-[1.55] text-muted-foreground">
        <li>
          Open{" "}
          <a href={TOKEN_URL} target="_blank" rel="noreferrer noopener" className="font-semibold text-link">
            GitHub → Fine-grained tokens
          </a>{" "}
          and create a token.
        </li>
        <li>
          Resource owner: <strong>{REPO.owner}</strong>. Repository access: <strong>Only select repositories</strong> → <strong>{REPO.name}</strong>.
        </li>
        <li>
          Under Repository permissions, change <strong>Contents</strong> to <strong>Read and write</strong> (it starts as no access) and{" "}
          <strong>Actions</strong> to <strong>Read-only</strong> (for the deploy status). Leave the rest as they are.
        </li>
        <li>Paste it below. It stays in this browser and is only sent to GitHub.</li>
      </ol>
      <form onSubmit={submit} className="flex flex-col gap-4">
        <Field label="GitHub token">
          <input type="password" autoComplete="off" required value={token} onChange={(e) => setToken(e.target.value)} className={field} placeholder="github_pat_…" />
        </Field>
        <label className="flex items-center gap-2.5 text-[14px]">
          <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="h-4 w-4" />
          Remember on this device (only on your own computer)
        </label>
        {error && <p className="rounded-xl bg-[#FDECEC] px-4 py-3 text-[14px] text-[#9B1C1C]">{error}</p>}
        <button type="submit" disabled={busy} className="flex h-[52px] items-center justify-center gap-2 rounded-xl bg-brand text-base font-bold text-white hover:opacity-90 disabled:opacity-60">
          {busy && <Loader2 className="h-[18px] w-[18px] animate-spin" />} Sign in
        </button>
      </form>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
const TABS: { id: Kind; label: string; add: string }[] = [
  { id: "shot", label: "Portfolio", add: "New portfolio shot" },
  { id: "post", label: "Blogs", add: "New blog post" },
  { id: "template", label: "Templates", add: "New template" },
];

export function StudioPage() {
  const [token, setToken] = useState(loadToken);
  const [login, setLogin] = useState("");
  const [tab, setTab] = useState<Kind>("shot");
  const [saved, setSaved] = useState<SaveResult>();
  /** The form being shown: a new item, or an existing one. Undefined shows the list. */
  const [form, setForm] = useState<"new" | EditTarget>();

  useEffect(() => {
    if (token && !login)
      checkAccess(token)
        .then((u) => setLogin(u.login))
        .catch(() => {
          clearToken();
          setToken("");
        });
  }, [token, login]);

  const open = (f: "new" | EditTarget) => {
    setForm(f);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const close = () => setForm(undefined);
  const editing = form && form !== "new" ? form : undefined;
  const current = TABS.find((t) => t.id === tab)!;
  const formKey = editing ? `${editing.from}-${editing.kind === "post" ? editing.item.slug : editing.item.id}` : "new";

  return (
    <>
      <Helmet>
        <title>Studio | CodesPanda</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 lg:px-8">
            <div className="flex items-center gap-3">
              <Logo imgClassName="h-11 w-11 rounded-[10px] bg-logo-bg" />
              <span className="font-display text-lg font-bold">Studio</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Link to="/" className="font-semibold text-link hover:text-blue-ink">
                View site
              </Link>
              {token && (
                <button
                  type="button"
                  onClick={() => {
                    clearToken();
                    setToken("");
                    setLogin("");
                  }}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-2 font-semibold text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  <LogOut className="h-4 w-4" /> Sign out{login ? ` (${login})` : ""}
                </button>
              )}
            </div>
          </div>
        </header>

        <main className="mx-auto flex max-w-[1200px] flex-col gap-6 px-4 py-8 lg:px-8 lg:py-12">
          {!token ? (
            <SignIn
              onSignedIn={(t, l) => {
                setToken(t);
                setLogin(l);
              }}
            />
          ) : !login ? (
            <p className="flex items-center gap-2 text-[15px] text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Checking your access…
            </p>
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div role="tablist" aria-label="Studio" className="flex flex-wrap gap-2">
                  {TABS.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      role="tab"
                      aria-selected={tab === t.id}
                      onClick={() => {
                        setForm(undefined);
                        setTab(t.id);
                      }}
                      className={cn(
                        "flex h-11 items-center gap-2 rounded-full border px-5 text-[15px] font-semibold transition-colors",
                        tab === t.id ? "border-foreground bg-foreground text-background" : "border-border bg-card text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
                {form ? (
                  <button type="button" onClick={close} className="flex h-11 items-center gap-1.5 rounded-xl px-4 text-[15px] font-semibold text-muted-foreground hover:bg-secondary hover:text-foreground">
                    <ArrowLeft className="h-4 w-4" /> Back to {current.label.toLowerCase()}
                  </button>
                ) : (
                  <button type="button" onClick={() => open("new")} className="flex h-11 items-center gap-2 rounded-xl bg-brand px-5 text-[15px] font-bold text-white hover:opacity-90">
                    <Plus className="h-4 w-4" /> {current.add}
                  </button>
                )}
              </div>
              {saved && <DeployStatus token={token} result={saved} onClose={() => setSaved(undefined)} />}
              <Card>
                {!form && <Library key={tab} token={token} kind={tab} onSaved={setSaved} onEdit={open} />}
                {form && tab === "shot" && <ShotForm key={formKey} token={token} onSaved={setSaved} editing={editing?.kind === "shot" ? editing : undefined} onDone={close} />}
                {form && tab === "post" && <PostForm key={formKey} token={token} onSaved={setSaved} editing={editing?.kind === "post" ? editing : undefined} onDone={close} />}
                {form && tab === "template" && <TemplateForm key={formKey} token={token} onSaved={setSaved} editing={editing?.kind === "template" ? editing : undefined} onDone={close} />}
              </Card>
              <p className="text-[13px] text-muted-foreground">
                Saving commits to {REPO.owner}/{REPO.name} on {REPO.branch}. Images are converted to WebP in your browser first. Scheduled items appear on the site at their time.
              </p>
            </>
          )}
        </main>
      </div>
    </>
  );
}
