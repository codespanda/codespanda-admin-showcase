export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  date: string;        // ISO date, e.g. "2026-08-14"
  readTime: string;    // e.g. "6 min read"
  /** Tailwind gradient classes for the placeholder cover (no photo assets yet) */
  gradient: string;
  /** lucide-react icon name shown on the cover */
  icon: "Sparkles" | "LayoutGrid" | "Palette" | "Rocket" | "Figma" | "Paintbrush";
  content: string;     // lightweight markdown: "## " headings, "- " bullets, blank-line paragraphs
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "why-we-built-codespanda",
    title: "Why We Built CodesPanda: Free Admin Dashboards That Don't Feel Free",
    excerpt: "Every admin template we shipped started the same way — we needed one ourselves, couldn't find one that didn't feel like a compromise, and built it instead.",
    category: "Story",
    tags: ["CodesPanda", "Templates", "Story"],
    author: "Deepak Kumar",
    date: "2026-06-02",
    readTime: "5 min read",
    gradient: "from-indigo-500 to-purple-600",
    icon: "Sparkles",
    content: `Most "free admin template" libraries make you pay eventually — in missing pages, in components that don't quite work together, in a design system that falls apart the moment you add your own feature. We got tired of that trade-off, so CodesPanda started as a rule, not a roadmap: every template has to be something we'd actually want to build a real product on top of.

## The gap we kept running into

Freelance and internal-tool work kept putting us in the same spot — a client needed an admin panel *now*, and the choices were a bloated enterprise UI kit, a half-finished free template, or starting from a blank Vite project again. None of those are good uses of a sprint.

## What "production-ready" actually means to us

- Every page is wired to real (if mocked) data — no lorem-ipsum placeholders pretending to be a table
- Dark mode isn't bolted on afterward; it's a token swap because the theme was built that way from day one
- TypeScript throughout, so the editor catches the mistakes before your users do
- No paid component library hiding behind the free template

## Where this is going

Alpine, Brisk, Cornerstone, Finovo — each template started from a real use case (HR, CRM, SaaS billing, accounting) rather than a generic "admin dashboard" brief. That's slower than shipping one template and reskinning it six times, but it's the only way the pages end up actually useful instead of just good-looking in a screenshot.

If there's a domain you keep needing an admin panel for and nobody's built a decent free one, that's usually a good sign it's next on our list.`,
  },
  {
    slug: "shadcn-vs-mui-vs-antd",
    title: "shadcn/ui vs Material UI vs Ant Design: Picking a Component Library in 2026",
    excerpt: "The honest trade-offs between the three component approaches we get asked about most — and why most of our templates ended up on shadcn/ui.",
    category: "Engineering",
    tags: ["shadcn/ui", "React", "Component Libraries"],
    author: "Deepak Kumar",
    date: "2026-06-18",
    readTime: "7 min read",
    gradient: "from-cyan-500 to-blue-600",
    icon: "LayoutGrid",
    content: `Component library choice quietly decides how your next two years of feature work will feel. Get it wrong and every custom design request turns into a fight with the library's internals. Here's the honest version of how the three most common choices actually compare, not the marketing-page version.

## Material UI: fast to start, hard to leave

MUI gives you a huge, polished component set out of the box, and for internal tools where "looks fine, ships fast" is the whole brief, that's genuinely the right call. The cost shows up later — overriding its theming system to match a specific brand fights you at every step, and the bundle size adds up once you're importing a dozen components.

## Ant Design: opinionated, and that's the point

AntD is the most complete of the three for data-dense enterprise UI — tables, forms, and complex layouts are clearly its home turf. But its visual language is distinct enough that making it *not* look like an AntD app takes real theming work, and its docs lean heavily toward the Chinese-market ecosystem in ways that occasionally slow down troubleshooting.

## shadcn/ui: not actually a library

This is the part people miss — shadcn/ui isn't a package you install, it's components you copy into your own codebase. That sounds like more work, and it is, upfront. What you get back is components that are *yours*: no fighting a theming API, no waiting on a maintainer to add a variant, no forced upgrade breaking your layout.

- You own the component code, so Tailwind utility overrides just work
- Radix primitives underneath mean accessibility isn't an afterthought
- No runtime CSS-in-JS tax — everything compiles to plain Tailwind classes

## Why most of our templates use it

Every CodesPanda template ships with real customization in mind — swap the theme tokens, adapt a table, restyle a card — and shadcn/ui is the only one of the three where that's a five-minute edit instead of a theming-API archaeology dig. It's not the right call for every project, but for a template meant to be a *starting point*, owning the components beats renting them.`,
  },
  {
    slug: "admin-dashboard-design-mistakes",
    title: "10 Mistakes to Avoid When Designing an Admin Dashboard",
    excerpt: "Dense data screens forgive bad decisions less than marketing pages do. Here's what we've had to walk back across a dozen dashboard builds.",
    category: "Design",
    tags: ["UI Design", "Dashboards", "UX"],
    author: "Deepak Kumar",
    date: "2026-07-05",
    readTime: "8 min read",
    gradient: "from-emerald-500 to-teal-600",
    icon: "Palette",
    content: `A landing page hides its sins behind whitespace and a hero image. A dashboard doesn't — every spacing decision, every color choice, gets multiplied across fifty rows of data and stared at for eight hours a day. These are the mistakes that actually hurt once real data and real usage show up.

## 1. Designing for the empty state, not the full one

A table with three rows of sample data looks nothing like the same table with three hundred. Design for the dense, ugly, real version first — the empty state is the easy part to fix afterward.

## 2. Too many accent colors

If every KPI card gets its own gradient, none of them stand out. Pick one primary accent and reserve color for status (success/warning/error), not decoration.

## 3. Charts that prioritize style over legibility

3D pie charts and heavy drop shadows look impressive in a portfolio shot and are actively hostile to someone trying to compare two bars at a glance. Flat, high-contrast, labeled — every time.

## 4. Ignoring keyboard and table density

Power users live in dense tables and keyboard shortcuts, not spacious cards. A dashboard aimed at daily use needs a compact density option, not just the airy default that demos well.

## 5. Inconsistent spacing scale

Mixing 12px, 14px, and 18px gaps across a page reads as "unfinished" even when nobody can articulate why. Pick a spacing scale (4/8/12/16/24/32) and never step outside it.

## 6. Notifications that block the workflow

A modal for every save confirmation trains users to click through without reading. Reserve modals for destructive or irreversible actions; use inline or toast feedback for everything else.

## 7. Dark mode as an afterthought

Bolting dark mode on with a single CSS filter produces muddy grays and broken contrast. It has to be planned as a token system from the start, not patched in after launch.

## 8. Sidebar navigation with no hierarchy

Twenty flat links in a sidebar is not navigation, it's a list. Group by function, collapse secondary items, and make the current section unmistakable.

## 9. Forgetting loading and error states

Every async table, chart, and card needs a designed loading skeleton and error state — not a blank rectangle or an unstyled browser alert.

## 10. Optimizing only for the happy path

Long names overflow. Zero-value states look broken. Permission-denied screens get forgotten entirely. The edge cases are where a dashboard's design quality actually gets tested.

None of these are exotic — they're the boring, unglamorous decisions that separate a dashboard that demos well from one that survives six months of real use.`,
  },
  {
    slug: "figma-to-production-workflow",
    title: "From Figma to Production: Our Design-to-Code Workflow",
    excerpt: "How a template goes from a Figma file to a shipped, typed, responsive React page — and where we deliberately skip \"pixel-perfect\" for speed.",
    category: "Design",
    tags: ["Figma", "Workflow", "React"],
    author: "Deepak Kumar",
    date: "2026-07-20",
    readTime: "6 min read",
    gradient: "from-pink-500 to-rose-600",
    icon: "Figma",
    content: `Every CodesPanda template goes through the same four stages before it ships. None of them are novel on their own, but the order and the discipline around each stage is what keeps templates consistent across a dozen different domains.

## 1. Structure before style

We block out layout, spacing, and information hierarchy in grayscale first — no color, no icons, no final copy. If a screen doesn't work in grayscale, more color and polish won't fix it; it'll just hide the problem for a while.

## 2. One source-of-truth token file

Colors, radii, spacing, and type scale get defined once, in Figma variables that map directly onto our Tailwind theme tokens. This is the step that makes "swap the theme in five minutes" actually true later — because design and code were reading from the same source from day one.

## 3. Build with real (mocked) data early

We resist finalizing visual polish until real-shaped mock data is in every table, card, and chart. A design that only survives with three tidy rows of sample data isn't done — it's decorated.

## 4. Deliberately skip pixel-perfect

This is the unpopular one: we don't chase 1:1 pixel parity between Figma and the shipped page. Browsers render text, shadows, and gradients slightly differently than Figma does, and burning hours closing a 2px gap nobody will ever notice is time not spent on the parts that matter — keyboard navigation, loading states, responsive breakpoints.

## What actually gets the attention instead

- Real breakpoint testing on actual devices, not just resizing a browser window
- Focus states and keyboard traversal order
- Dark mode contrast checked against WCAG, not eyeballed
- Loading and error states for every async surface

The result isn't a design that's *more* accurate — it's one where the hours went into the things a user actually notices when they're trying to get work done, not the things a designer notices when they zoom to 400%.`,
  },
  {
    slug: "why-vite-for-admin-panels",
    title: "Why Vite Is the Right Call for a Modern React Admin Panel",
    excerpt: "Cold start, HMR speed, and a build output that doesn't fight you — the practical reasons every CodesPanda template is built on Vite, not CRA or webpack.",
    category: "Engineering",
    tags: ["Vite", "React", "Build Tools"],
    author: "Deepak Kumar",
    date: "2026-08-01",
    readTime: "5 min read",
    gradient: "from-violet-500 to-fuchsia-600",
    icon: "Rocket",
    content: `An admin dashboard template is going to get forked, extended, and rebuilt by someone else dozens of times. The build tool underneath it matters more for that use case than it does for a one-off app nobody else will touch.

## Cold start speed compounds

Create React App's cold start crawls once a project grows past a trivial size, because it bundles everything before serving a single page. Vite serves native ES modules straight to the browser during dev, so start-up time barely changes as the codebase grows — which matters a lot when you're the fifth developer cloning a template just to see if it fits your use case.

## HMR that doesn't lose state

Fast Refresh under webpack-based setups still occasionally forces a full reload on certain edits. Vite's HMR is consistently instant and preserves component state, which sounds minor until you're iterating on a table with twenty rows of expanded state and don't want to lose it every time you tweak a className.

## Zero-config TypeScript, out of the box

Every CodesPanda template is TypeScript-first, and Vite's esbuild-based transform handles that without a webpack config file in sight. Less config surface area means less for a template's next maintainer to understand before they can make their first change.

## Production builds that stay lean

Vite's Rollup-based production build tree-shakes aggressively and code-splits by route with almost no manual configuration — which is exactly the setup an admin panel with a dozen lazy-loaded pages needs by default, not as an optimization pass bolted on later.

## The real reason: it gets out of the way

The best build tool for a template meant to be forked and extended is the one nobody has to think about. Vite's defaults are good enough that most of our templates never touch \`vite.config.ts\` beyond the path alias — and that's exactly the point.`,
  },
  {
    slug: "theme-shadcn-dashboard-in-10-minutes",
    title: "How to Theme a shadcn/ui Dashboard in Under 10 Minutes",
    excerpt: "A practical walkthrough of swapping every CodesPanda template's color system to your own brand — one CSS file, no component edits.",
    category: "Tutorial",
    tags: ["shadcn/ui", "Tailwind", "Theming", "Tutorial"],
    author: "Deepak Kumar",
    date: "2026-08-10",
    readTime: "6 min read",
    gradient: "from-amber-500 to-orange-600",
    icon: "Paintbrush",
    content: `Every CodesPanda template follows the same theming convention, so this walkthrough applies whether you're re-skinning Alpine, Cornerstone, or Finovo. The whole process happens in one file — no component code needs to change.

## Step 1: find the token file

Every template defines its palette as CSS custom properties, usually in \`src/index.css\` under \`:root\` and \`.dark\`. These are HSL triplets like \`--primary: 243 75% 59%\`, not hex codes — that's what lets shadcn/ui components derive hover, focus, and muted variants automatically.

## Step 2: pick your brand's core tokens

You only need to touch a handful of variables to reskin the whole app:

- \`--primary\` — buttons, active states, links
- \`--secondary\` — subtle backgrounds, hover states
- \`--accent\` — highlights and badges
- \`--destructive\` — delete buttons, error states
- \`--background\` / \`--foreground\` — base page colors

## Step 3: convert your brand color to HSL

Take your brand hex code, convert it to HSL (any color picker will do this), and drop the three numbers in — no "hsl()" wrapper, just the raw triplet, since Tailwind's config wraps it for you: \`hsl(var(--primary))\`.

## Step 4: check both themes

Every token needs a light-mode and dark-mode value. It's tempting to just invert the lightness value and move on, but check contrast in both — a primary color that reads fine at 59% lightness on a white background can wash out completely on a dark one.

## Step 5: rebuild and scan for hardcoded colors

Run the dev server and click through every page. Any component still showing your old brand color after this point has a hardcoded Tailwind class (like \`bg-indigo-500\`) instead of a token reference — that's the one thing worth grepping for before you call the reskin done.

That's the entire process. No component file needs an edit, because every shadcn/ui primitive in the template already reads from these tokens — which is the whole point of building on a theming system instead of hardcoded colors in the first place.`,
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
