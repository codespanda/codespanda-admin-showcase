import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { CheckCircle2, ExternalLink, ImagePlus, Loader2, LogOut, Trash2, TriangleAlert, X } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { PostContent } from "@/components/pages/BlogPostPage";
import { SHOTS, type Shot } from "@/lib/portfolio-data";
import { BLOG_POSTS, type BlogPost } from "@/lib/blog-data";
import { REPO, checkAccess, clearToken, commitFiles, latestDeploy, loadToken, readText, saveToken, type CommitFile, type DeployRun } from "@/lib/studio/github";
import { convertImage, slugify, topCrop, type WebpImage } from "@/lib/studio/images";
import { cn } from "@/lib/utils";

const PORTFOLIO_JSON = "src/content/portfolio.json";
const BLOG_JSON = "src/content/blog.json";
const SHOT_CATEGORIES = ["Web App", "Web Dashboard", "Mobile App"] as const;
const BLOG_CATEGORIES = [...new Set(BLOG_POSTS.map((p) => p.category))].sort();
const TOKEN_URL = `https://github.com/settings/personal-access-tokens/new`;

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

const today = () => new Date().toISOString().slice(0, 10);

/* ------------------------------------------------------------------ */
/* Deploy status after a save                                          */
/* ------------------------------------------------------------------ */
function DeployStatus({ token, sha, url, onClose }: { token: string; sha: string; url: string; onClose: () => void }) {
  const [run, setRun] = useState<DeployRun>();
  useEffect(() => {
    let stop = false;
    const tick = async () => {
      try {
        const r = await latestDeploy(token);
        if (!stop && r && r.head_sha === sha) setRun(r);
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
  }, [token, sha]);

  const done = run?.status === "completed";
  const ok = done && run?.conclusion === "success";
  return (
    <div className={cn("flex items-start gap-3 rounded-[14px] px-4 py-3.5 text-[15px]", done && !ok ? "bg-[#FDECEC] text-[#9B1C1C]" : "bg-blue-soft text-blue-ink")}>
      {done ? ok ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" /> : <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0" /> : <Loader2 className="mt-0.5 h-5 w-5 shrink-0 animate-spin" />}
      <div className="flex flex-1 flex-col gap-1">
        <span className="font-semibold">
          {!run ? "Saved. Waiting for the deploy to start…" : !done ? "Saved. Deploying to codespanda.com…" : ok ? "Live on codespanda.com" : "Saved, but the deploy failed"}
        </span>
        <span className="flex flex-wrap gap-x-4 gap-y-1">
          {ok && (
            <a href={url} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1 font-semibold underline">
              Open the page <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
          {run && (
            <a href={run.html_url} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1 underline">
              Deploy log <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
          <span className="opacity-80">The page goes live about a minute after saving.</span>
        </span>
      </div>
      <button type="button" onClick={onClose} aria-label="Dismiss" className="rounded-md p-1 hover:bg-black/5">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

function ImagePick({ label, hint, multiple, files, onChange }: { label: string; hint: string; multiple?: boolean; files: File[]; onChange: (f: File[]) => void }) {
  const previews = useMemo(() => files.map((f) => ({ name: f.name, url: URL.createObjectURL(f) })), [files]);
  useEffect(() => () => previews.forEach((p) => URL.revokeObjectURL(p.url)), [previews]);
  return (
    <div className="flex flex-col gap-2">
      <span className={labelCls}>{label}</span>
      <label className="flex cursor-pointer items-center gap-3 rounded-xl border-[1.5px] border-dashed border-input px-4 py-4 hover:border-link hover:bg-secondary">
        <ImagePlus className="h-5 w-5 text-link" />
        <span className="flex flex-col">
          <span className="text-[15px] font-semibold">{files.length ? `${files.length} image${files.length > 1 ? "s" : ""} selected — change` : "Choose image" + (multiple ? "s" : "")}</span>
          <span className="text-[13px] text-muted-foreground">{hint}</span>
        </span>
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          multiple={multiple}
          className="sr-only"
          onChange={(e) => onChange(Array.from(e.target.files ?? []))}
        />
      </label>
      {previews.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {previews.map((p) => (
            <img key={p.url} src={p.url} alt={p.name} className="h-20 w-28 rounded-lg border border-border object-cover object-top" />
          ))}
        </div>
      )}
    </div>
  );
}

function SaveBar({ busy, progress, error, disabled, label }: { busy: boolean; progress: string; error: string; disabled: boolean; label: string }) {
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
        {busy && <span className="text-sm text-muted-foreground">{progress}</span>}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* New portfolio shot                                                  */
/* ------------------------------------------------------------------ */
function ShotForm({ token, onSaved }: { token: string; onSaved: (sha: string, url: string) => void }) {
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const [idTouched, setIdTouched] = useState(false);
  const [category, setCategory] = useState<(typeof SHOT_CATEGORIES)[number]>("Web App");
  const [tagText, setTagText] = useState("");
  const [dribbbleUrl, setDribbbleUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [description, setDescription] = useState("");
  const [main, setMain] = useState<File[]>([]);
  const [extra, setExtra] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");

  const slug = idTouched ? id : slugify(title);
  const clash = SHOTS.some((s) => s.id === slug);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!slug || clash || !main[0]) return;
    setBusy(true);
    try {
      const dir = "public/images/portfolio/shots";
      const web = `/images/portfolio/shots`;
      setProgress("Converting images…");
      const full = await convertImage(main[0], 2880);
      const thumb = await topCrop(main[0], 1200, 900);
      const gallery: WebpImage[] = [];
      for (const f of extra) gallery.push(await convertImage(f, 2880));

      setProgress("Reading the current portfolio…");
      const current = JSON.parse(await readText(token, PORTFOLIO_JSON)) as Shot[];
      if (current.some((s) => s.id === slug)) throw new Error(`A shot with the id "${slug}" already exists.`);
      const shot: Shot = {
        id: slug,
        title: title.trim(),
        category,
        tags: tags(tagText),
        ...(dribbbleUrl.trim() ? { dribbbleUrl: dribbbleUrl.trim() } : {}),
        ...(liveUrl.trim() ? { liveUrl: liveUrl.trim() } : {}),
        imgUrl: `${web}/${slug}.webp`,
        fullImgUrl: `${web}/${slug}-full.webp`,
        ...(gallery.length ? { gallery: gallery.map((_, i) => `${web}/${slug}-${i + 2}.webp`) } : {}),
        description: description.trim(),
      };
      const files: CommitFile[] = [
        { path: `${dir}/${slug}.webp`, content: thumb.base64, encoding: "base64" },
        { path: `${dir}/${slug}-full.webp`, content: full.base64, encoding: "base64" },
        ...gallery.map((g, i) => ({ path: `${dir}/${slug}-${i + 2}.webp`, content: g.base64, encoding: "base64" as const })),
        { path: PORTFOLIO_JSON, content: JSON.stringify([shot, ...current], null, 2) + "\n", encoding: "utf-8" },
      ];
      setProgress(`Committing ${files.length} files…`);
      const sha = await commitFiles(token, `Add portfolio shot: ${shot.title}`, files);
      onSaved(sha, `https://codespanda.com/portfolio/${slug}`);
      setTitle("");
      setId("");
      setIdTouched(false);
      setTagText("");
      setDribbbleUrl("");
      setLiveUrl("");
      setDescription("");
      setMain([]);
      setExtra([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
      setProgress("");
    }
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-5">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Title">
          <input required value={title} onChange={(e) => setTitle(e.target.value)} className={field} placeholder="My Listings — Marketplace Seller Dashboard UI" />
        </Field>
        <Field
          label="Page address"
          hint={clash ? <span className="font-semibold text-[#B42318]">This address is taken — change it.</span> : `codespanda.com/portfolio/${slug || "…"}`}
        >
          <input
            required
            value={slug}
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
      <Field label="Description" hint="The first paragraph shows under the title. Start lines with • for bullet points.">
        <textarea required rows={8} value={description} onChange={(e) => setDescription(e.target.value)} className={cn(field, "resize-y leading-[1.55]")} />
      </Field>
      <div className="grid gap-5 md:grid-cols-2">
        <ImagePick label="Main image" hint="Kept at full clarity (up to 2880px wide). The card thumbnail is cropped from its top." files={main} onChange={(f) => setMain(f.slice(0, 1))} />
        <ImagePick label="More screens (optional)" hint="Shown below the main image, in order." multiple files={extra} onChange={setExtra} />
      </div>
      <SaveBar busy={busy} progress={progress} error={error} disabled={!main[0] || !slug || clash} label="Publish shot" />
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* New blog post                                                       */
/* ------------------------------------------------------------------ */
function PostForm({ token, onSaved }: { token: string; onSaved: (sha: string, url: string) => void }) {
  const [title, setTitle] = useState("");
  const [slugText, setSlugText] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("");
  const [tagText, setTagText] = useState("");
  const [author, setAuthor] = useState("CodesPanda");
  const [date, setDate] = useState(today());
  const [content, setContent] = useState("");
  const [cover, setCover] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");

  const slug = slugTouched ? slugText : slugify(title);
  const clash = BLOG_POSTS.some((p) => p.slug === slug);
  const words = content.trim() ? content.trim().split(/\s+/).length : 0;
  const readTime = `${Math.max(1, Math.round(words / 200))} min read`;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!slug || clash || !cover[0]) return;
    setBusy(true);
    try {
      setProgress("Converting the cover…");
      const image = await convertImage(cover[0], 1600);
      setProgress("Reading the current posts…");
      const current = JSON.parse(await readText(token, BLOG_JSON)) as BlogPost[];
      if (current.some((p) => p.slug === slug)) throw new Error(`A post with the address "${slug}" already exists.`);
      const post: BlogPost = {
        slug,
        title: title.trim(),
        excerpt: excerpt.trim(),
        category: category.trim() || "Story",
        tags: tags(tagText),
        author: author.trim() || "CodesPanda",
        date,
        readTime,
        gradient: "from-sky-500 to-blue-600",
        icon: "Sparkles",
        coverImage: `/images/blogs/${slug}.webp`,
        content: content.trim(),
      };
      const files: CommitFile[] = [
        { path: `public/images/blogs/${slug}.webp`, content: image.base64, encoding: "base64" },
        { path: BLOG_JSON, content: JSON.stringify([post, ...current], null, 2) + "\n", encoding: "utf-8" },
      ];
      setProgress("Committing…");
      const sha = await commitFiles(token, `Add blog post: ${post.title}`, files);
      onSaved(sha, `https://codespanda.com/blog/${slug}`);
      setTitle("");
      setSlugText("");
      setSlugTouched(false);
      setExcerpt("");
      setTagText("");
      setContent("");
      setCover([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
      setProgress("");
    }
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-5">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Title">
          <input required value={title} onChange={(e) => setTitle(e.target.value)} className={field} placeholder="How We Build Admin Dashboards in a Week" />
        </Field>
        <Field
          label="Page address"
          hint={clash ? <span className="font-semibold text-[#B42318]">This address is taken — change it.</span> : `codespanda.com/blog/${slug || "…"}`}
        >
          <input
            required
            value={slug}
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
        hint={
          <span className={excerpt.length > 160 ? "font-semibold text-[#B42318]" : undefined}>
            {excerpt.length}/160 — shown on the blog list and in Google results. Keep it under 160 characters.
          </span>
        }
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
        <Field label="Date">
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={field} />
        </Field>
      </div>
      <ImagePick label="Cover image" hint="Shown on the blog list, at the top of the post and in link previews. Wide images (16:9) work best." files={cover} onChange={(f) => setCover(f.slice(0, 1))} />
      <div className="grid gap-5 lg:grid-cols-2">
        <Field label="Post" hint={`${words} words · ${readTime}. Use "## " for headings, "- " for bullet points and a blank line between paragraphs.`}>
          <textarea required rows={18} value={content} onChange={(e) => setContent(e.target.value)} className={cn(field, "resize-y font-mono text-[14px] leading-[1.6]")} placeholder={"Intro paragraph…\n\n## A heading\n\nA paragraph.\n\n- A bullet\n- Another bullet"} />
        </Field>
        <div className="flex flex-col gap-1.5">
          <span className={labelCls}>Preview</span>
          <div className="max-h-[520px] overflow-y-auto rounded-xl border border-border bg-background p-5">
            {content.trim() ? <PostContent text={content} /> : <p className="text-sm text-muted-foreground">Start writing to see the post here.</p>}
          </div>
        </div>
      </div>
      <SaveBar busy={busy} progress={progress} error={error} disabled={!cover[0] || !slug || clash || excerpt.length > 200} label="Publish post" />
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* What's been added from the studio                                   */
/* ------------------------------------------------------------------ */
function Published({ token, onSaved }: { token: string; onSaved: (sha: string, url: string) => void }) {
  const [shots, setShots] = useState<Shot[]>();
  const [posts, setPosts] = useState<BlogPost[]>();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState("");

  const load = async () => {
    setError("");
    try {
      setShots(JSON.parse(await readText(token, PORTFOLIO_JSON)));
      setPosts(JSON.parse(await readText(token, BLOG_JSON)));
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };
  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const remove = async (kind: "shot" | "post", key: string, label: string) => {
    if (!window.confirm(`Delete "${label}" from the site? Its images are removed too.`)) return;
    setBusy(key);
    setError("");
    try {
      let files: CommitFile[];
      if (kind === "shot") {
        const current = JSON.parse(await readText(token, PORTFOLIO_JSON)) as Shot[];
        const shot = current.find((s) => s.id === key);
        const images = shot ? [shot.imgUrl, shot.fullImgUrl, ...(shot.gallery ?? [])].filter((u): u is string => !!u && u.startsWith("/images/")) : [];
        files = [
          { path: PORTFOLIO_JSON, content: JSON.stringify(current.filter((s) => s.id !== key), null, 2) + "\n", encoding: "utf-8" },
          ...images.map((u) => ({ path: `public${u}`, content: null, encoding: "base64" as const })),
        ];
      } else {
        const current = JSON.parse(await readText(token, BLOG_JSON)) as BlogPost[];
        const post = current.find((p) => p.slug === key);
        files = [
          { path: BLOG_JSON, content: JSON.stringify(current.filter((p) => p.slug !== key), null, 2) + "\n", encoding: "utf-8" },
          ...(post?.coverImage?.startsWith("/images/") ? [{ path: `public${post.coverImage}`, content: null, encoding: "base64" as const }] : []),
        ];
      }
      const sha = await commitFiles(token, `Remove ${kind === "shot" ? "portfolio shot" : "blog post"}: ${label}`, files);
      onSaved(sha, kind === "shot" ? "https://codespanda.com/portfolio" : "https://codespanda.com/blog");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy("");
    }
  };

  const Row = ({ href, title, meta, onDelete, deleting }: { href: string; title: string; meta: string; onDelete: () => void; deleting: boolean }) => (
    <li className="flex items-center gap-3 border-t border-border py-3 first:border-t-0">
      <div className="flex min-w-0 flex-1 flex-col">
        <a href={href} target="_blank" rel="noreferrer noopener" className="truncate text-[15px] font-semibold hover:text-link">
          {title}
        </a>
        <span className="text-[13px] text-muted-foreground">{meta}</span>
      </div>
      <button type="button" onClick={onDelete} disabled={deleting} className="flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-semibold text-[#B42318] hover:bg-[#FDECEC] disabled:opacity-50">
        {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />} Delete
      </button>
    </li>
  );

  return (
    <div className="flex flex-col gap-5">
      {error && <p className="rounded-xl bg-[#FDECEC] px-4 py-3 text-[15px] text-[#9B1C1C]">{error}</p>}
      <p className="text-[15px] text-muted-foreground">
        These are the shots and posts added from the studio. Content that was written into the code earlier isn't listed here.
      </p>
      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <h3 className="text-lg font-bold">Portfolio shots ({shots?.length ?? "…"})</h3>
          {shots && shots.length === 0 && <p className="text-sm text-muted-foreground">None yet.</p>}
          <ul>
            {shots?.map((s) => (
              <Row key={s.id} href={`https://codespanda.com/portfolio/${s.id}`} title={s.title} meta={`${s.category} · /portfolio/${s.id}`} deleting={busy === s.id} onDelete={() => remove("shot", s.id, s.title)} />
            ))}
          </ul>
        </Card>
        <Card>
          <h3 className="text-lg font-bold">Blog posts ({posts?.length ?? "…"})</h3>
          {posts && posts.length === 0 && <p className="text-sm text-muted-foreground">None yet.</p>}
          <ul>
            {posts?.map((p) => (
              <Row key={p.slug} href={`https://codespanda.com/blog/${p.slug}`} title={p.title} meta={`${p.date} · ${p.category}`} deleting={busy === p.slug} onDelete={() => remove("post", p.slug, p.title)} />
            ))}
          </ul>
        </Card>
      </div>
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
      setError(err instanceof Error ? err.message : String(err));
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
        <li>Repository access: only <strong>{REPO.name}</strong>.</li>
        <li>Permissions: <strong>Contents: Read and write</strong> and <strong>Actions: Read-only</strong> (for the deploy status).</li>
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
type Tab = "shot" | "post" | "published";
const TABS: { id: Tab; label: string }[] = [
  { id: "shot", label: "New portfolio shot" },
  { id: "post", label: "New blog post" },
  { id: "published", label: "Published from Studio" },
];

export function StudioPage() {
  const [token, setToken] = useState(loadToken);
  const [login, setLogin] = useState("");
  const [tab, setTab] = useState<Tab>("shot");
  const [saved, setSaved] = useState<{ sha: string; url: string }>();

  useEffect(() => {
    if (token && !login) checkAccess(token).then((u) => setLogin(u.login)).catch(() => {
      clearToken();
      setToken("");
    });
  }, [token, login]);

  const onSaved = (sha: string, url: string) => setSaved({ sha, url });

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
          ) : (
            <>
              <div role="tablist" aria-label="Studio" className="flex flex-wrap gap-2">
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    aria-selected={tab === t.id}
                    onClick={() => setTab(t.id)}
                    className={cn(
                      "h-11 rounded-full border px-5 text-[15px] font-semibold transition-colors",
                      tab === t.id ? "border-foreground bg-foreground text-background" : "border-border bg-card text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              {saved && <DeployStatus token={token} sha={saved.sha} url={saved.url} onClose={() => setSaved(undefined)} />}
              <Card>
                {tab === "shot" && <ShotForm token={token} onSaved={onSaved} />}
                {tab === "post" && <PostForm token={token} onSaved={onSaved} />}
                {tab === "published" && <Published token={token} onSaved={onSaved} />}
              </Card>
              <p className="text-[13px] text-muted-foreground">
                Saving commits to {REPO.owner}/{REPO.name} on {REPO.branch}. Images are converted to WebP in your browser first.
              </p>
            </>
          )}
        </main>
      </div>
    </>
  );
}
