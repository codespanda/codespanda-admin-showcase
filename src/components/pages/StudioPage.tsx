import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { CalendarClock, CheckCircle2, ExternalLink, FilePen, ImagePlus, Loader2, LogOut, Pencil, Send, Trash2, TriangleAlert } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { RichTextEditor } from "@/components/studio/RichTextEditor";
import { SHOTS, type Shot } from "@/lib/portfolio-data";
import { BLOG_POSTS, type BlogPost } from "@/lib/blog-data";
import { isLive } from "@/lib/schedule";
import { REPO, checkAccess, clearToken, commitFiles, latestDeploy, loadToken, readText, saveToken, type CommitFile, type DeployRun } from "@/lib/studio/github";
import { convertImage, slugify, topCrop } from "@/lib/studio/images";
import { cn } from "@/lib/utils";

const PORTFOLIO_JSON = "src/content/portfolio.json";
const BLOG_JSON = "src/content/blog.json";
/** Drafts live in their own file, which the website never imports. */
const DRAFTS_JSON = "src/content/drafts.json";
const SHOT_CATEGORIES = ["Web App", "Web Dashboard", "Mobile App"] as const;
const BLOG_CATEGORIES = [...new Set(BLOG_POSTS.map((p) => p.category))].sort();
const TOKEN_URL = `https://github.com/settings/personal-access-tokens/new`;
const RAW = `https://raw.githubusercontent.com/${REPO.owner}/${REPO.name}/${REPO.branch}/public`;

interface Drafts {
  shots: Shot[];
  posts: BlogPost[];
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
  return { shots: d.shots ?? [], posts: d.posts ?? [] };
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
            Cancel editing
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
        note: mode === "draft" ? `Draft "${shot.title}" saved. Find it under Drafts & published.` : mode === "schedule" ? `"${shot.title}" is scheduled for ${formatWhen(shot.publishAt!)}.` : undefined,
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
        note: mode === "draft" ? `Draft "${post.title}" saved. Find it under Drafts & published.` : publishAt ? `"${post.title}" is scheduled for ${formatWhen(publishAt)}.` : undefined,
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
/* Drafts, scheduled and live items added from the studio              */
/* ------------------------------------------------------------------ */
type EditTarget = ({ kind: "shot" } & Editing<Shot>) | ({ kind: "post" } & Editing<BlogPost>);

function Library({ token, onSaved, onEdit }: { token: string; onSaved: (r: SaveResult) => void; onEdit: (t: EditTarget) => void }) {
  const [shots, setShots] = useState<Shot[]>();
  const [posts, setPosts] = useState<BlogPost[]>();
  const [drafts, setDrafts] = useState<Drafts>();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState("");

  const load = async () => {
    setError("");
    try {
      const [s, p, d] = await Promise.all([readJson<Shot[]>(token, PORTFOLIO_JSON), readJson<BlogPost[]>(token, BLOG_JSON), readDrafts(token)]);
      setShots(s);
      setPosts(p);
      setDrafts(d);
    } catch (err) {
      setError(errorText(err));
    }
  };
  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  /** Runs one change against fresh copies of the three files and commits it. */
  const change = async (key: string, message: string, build: (s: Shot[], p: BlogPost[], d: Drafts) => CommitFile[], result: Omit<SaveResult, "sha">) => {
    setBusy(key);
    setError("");
    try {
      const [s, p, d] = await Promise.all([readJson<Shot[]>(token, PORTFOLIO_JSON), readJson<BlogPost[]>(token, BLOG_JSON), readDrafts(token)]);
      const sha = await commitFiles(token, message, build(s, p, d));
      onSaved({ sha, ...result });
      await load();
    } catch (err) {
      setError(errorText(err));
    } finally {
      setBusy("");
    }
  };

  const shotImages = (s?: Shot) => (s ? [s.imgUrl, s.fullImgUrl, ...(s.gallery ?? [])] : []);

  const deleteShot = (id: string, title: string, from: "live" | "draft") => {
    if (!window.confirm(`Delete "${title}"? Its images are removed too.`)) return;
    void change(
      id,
      `Remove portfolio shot: ${title}`,
      (s, _p, d) =>
        from === "draft"
          ? [{ path: DRAFTS_JSON, content: json({ ...d, shots: d.shots.filter((x) => x.id !== id) }), encoding: "utf-8" }, ...dropImages(shotImages(d.shots.find((x) => x.id === id)))]
          : [{ path: PORTFOLIO_JSON, content: json(s.filter((x) => x.id !== id)), encoding: "utf-8" }, ...dropImages(shotImages(s.find((x) => x.id === id)))],
      { url: "https://codespanda.com/portfolio", note: from === "draft" ? `Draft "${title}" deleted.` : undefined }
    );
  };
  const deletePost = (slug: string, title: string, from: "live" | "draft") => {
    if (!window.confirm(`Delete "${title}"? Its cover image is removed too.`)) return;
    void change(
      slug,
      `Remove blog post: ${title}`,
      (_s, p, d) =>
        from === "draft"
          ? [{ path: DRAFTS_JSON, content: json({ ...d, posts: d.posts.filter((x) => x.slug !== slug) }), encoding: "utf-8" }, ...dropImages([d.posts.find((x) => x.slug === slug)?.coverImage])]
          : [{ path: BLOG_JSON, content: json(p.filter((x) => x.slug !== slug)), encoding: "utf-8" }, ...dropImages([p.find((x) => x.slug === slug)?.coverImage])],
      { url: "https://codespanda.com/blog", note: from === "draft" ? `Draft "${title}" deleted.` : undefined }
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
      (s, _p, d) =>
        from === "draft"
          ? [
              { path: PORTFOLIO_JSON, content: json([live, ...s]), encoding: "utf-8" },
              { path: DRAFTS_JSON, content: json({ ...d, shots: d.shots.filter((x) => x.id !== shot.id) }), encoding: "utf-8" },
            ]
          : [{ path: PORTFOLIO_JSON, content: json(s.map((x) => (x.id === shot.id ? live : x))), encoding: "utf-8" }],
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
      (_s, p, d) =>
        from === "draft"
          ? [
              { path: BLOG_JSON, content: json([live, ...p]), encoding: "utf-8" },
              { path: DRAFTS_JSON, content: json({ ...d, posts: d.posts.filter((x) => x.slug !== post.slug) }), encoding: "utf-8" },
            ]
          : [{ path: BLOG_JSON, content: json(p.map((x) => (x.slug === post.slug ? live : x))), encoding: "utf-8" }],
      { url: `https://codespanda.com/blog/${post.slug}` }
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
  const draftCount = (drafts?.shots.length ?? 0) + (drafts?.posts.length ?? 0);

  return (
    <div className="flex flex-col gap-6">
      {error && <p className="rounded-xl bg-[#FDECEC] px-4 py-3 text-[15px] text-[#9B1C1C]">{error}</p>}

      <section className="flex flex-col gap-3">
        <h3 className="text-lg font-bold">Drafts ({drafts ? draftCount : "…"})</h3>
        {drafts && draftCount === 0 && <p className="text-sm text-muted-foreground">No drafts. Choose “Save as draft” in either form to keep one here.</p>}
        <ul>
          {drafts?.shots.map((s) => (
            <Row
              key={`ds-${s.id}`}
              id={s.id}
              title={s.title || "(untitled shot)"}
              meta={`Portfolio shot · /portfolio/${s.id}`}
              actions={[
                { label: "Edit", icon: <Pencil className="h-4 w-4" />, onClick: () => onEdit({ kind: "shot", item: s, from: "draft" }) },
                { label: "Publish now", icon: <Send className="h-4 w-4" />, onClick: () => publishShotNow(s, "draft") },
                { label: "Delete", icon: <Trash2 className="h-4 w-4" />, onClick: () => deleteShot(s.id, s.title, "draft"), danger: true },
              ]}
            />
          ))}
          {drafts?.posts.map((p) => (
            <Row
              key={`dp-${p.slug}`}
              id={p.slug}
              title={p.title || "(untitled post)"}
              meta={`Blog post · /blog/${p.slug}`}
              actions={[
                { label: "Edit", icon: <Pencil className="h-4 w-4" />, onClick: () => onEdit({ kind: "post", item: p, from: "draft" }) },
                { label: "Publish now", icon: <Send className="h-4 w-4" />, onClick: () => publishPostNow(p, "draft") },
                { label: "Delete", icon: <Trash2 className="h-4 w-4" />, onClick: () => deletePost(p.slug, p.title, "draft"), danger: true },
              ]}
            />
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-3 border-t border-border pt-6">
        <h3 className="text-lg font-bold">Published &amp; scheduled ({shots && posts ? shots.length + posts.length : "…"})</h3>
        <p className="text-[14px] text-muted-foreground">Every blog post, newest first, and the portfolio shots added from the studio. Shots written into the code earlier aren't listed here.</p>
        {shots && posts && shots.length + posts.length === 0 && <p className="text-sm text-muted-foreground">Nothing yet.</p>}
        <ul>
          {shots?.map((s) => {
            const scheduled = !isLive(s);
            return (
              <Row
                key={`s-${s.id}`}
                id={s.id}
                title={s.title}
                meta={`Portfolio shot · /portfolio/${s.id}`}
                href={scheduled ? undefined : `https://codespanda.com/portfolio/${s.id}`}
                badge={scheduled ? scheduledBadge(s.publishAt!) : liveBadge}
                actions={[
                  { label: "Edit", icon: <Pencil className="h-4 w-4" />, onClick: () => onEdit({ kind: "shot", item: s, from: "published" }) },
                  ...(scheduled ? [{ label: "Publish now", icon: <Send className="h-4 w-4" />, onClick: () => publishShotNow(s, "scheduled") }] : []),
                  { label: "Delete", icon: <Trash2 className="h-4 w-4" />, onClick: () => deleteShot(s.id, s.title, "live"), danger: true },
                ]}
              />
            );
          })}
          {posts && [...posts].sort((a, b) => b.date.localeCompare(a.date)).map((p) => {
            const scheduled = !isLive(p);
            return (
              <Row
                key={`p-${p.slug}`}
                id={p.slug}
                title={p.title}
                meta={`Blog post · ${p.date} · ${p.category}`}
                href={scheduled ? undefined : `https://codespanda.com/blog/${p.slug}`}
                badge={scheduled ? scheduledBadge(p.publishAt!) : liveBadge}
                actions={[
                  { label: "Edit", icon: <Pencil className="h-4 w-4" />, onClick: () => onEdit({ kind: "post", item: p, from: "published" }) },
                  ...(scheduled ? [{ label: "Publish now", icon: <Send className="h-4 w-4" />, onClick: () => publishPostNow(p, "scheduled") }] : []),
                  { label: "Delete", icon: <Trash2 className="h-4 w-4" />, onClick: () => deletePost(p.slug, p.title, "live"), danger: true },
                ]}
              />
            );
          })}
        </ul>
      </section>
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
type Tab = "shot" | "post" | "library";
const TABS: { id: Tab; label: string }[] = [
  { id: "shot", label: "New portfolio shot" },
  { id: "post", label: "New blog post" },
  { id: "library", label: "Drafts & published" },
];

export function StudioPage() {
  const [token, setToken] = useState(loadToken);
  const [login, setLogin] = useState("");
  const [tab, setTab] = useState<Tab>("shot");
  const [saved, setSaved] = useState<SaveResult>();
  const [editing, setEditing] = useState<EditTarget>();

  useEffect(() => {
    if (token && !login)
      checkAccess(token)
        .then((u) => setLogin(u.login))
        .catch(() => {
          clearToken();
          setToken("");
        });
  }, [token, login]);

  const edit = (t: EditTarget) => {
    setEditing(t);
    setTab(t.kind);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const stopEditing = () => {
    setEditing(undefined);
    setTab("library");
  };
  const editShot = editing?.kind === "shot" ? editing : undefined;
  const editPost = editing?.kind === "post" ? editing : undefined;

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
              <div role="tablist" aria-label="Studio" className="flex flex-wrap gap-2">
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    aria-selected={tab === t.id}
                    onClick={() => {
                      setEditing(undefined);
                      setTab(t.id);
                    }}
                    className={cn(
                      "flex h-11 items-center gap-2 rounded-full border px-5 text-[15px] font-semibold transition-colors",
                      tab === t.id ? "border-foreground bg-foreground text-background" : "border-border bg-card text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {t.id === "library" && <FilePen className="h-4 w-4" />}
                    {t.label}
                  </button>
                ))}
              </div>
              {saved && <DeployStatus token={token} result={saved} onClose={() => setSaved(undefined)} />}
              <Card>
                {tab === "shot" && <ShotForm key={editShot ? `${editShot.from}-${editShot.item.id}` : "new"} token={token} onSaved={setSaved} editing={editShot} onDone={editShot ? stopEditing : undefined} />}
                {tab === "post" && <PostForm key={editPost ? `${editPost.from}-${editPost.item.slug}` : "new"} token={token} onSaved={setSaved} editing={editPost} onDone={editPost ? stopEditing : undefined} />}
                {tab === "library" && <Library token={token} onSaved={setSaved} onEdit={edit} />}
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
