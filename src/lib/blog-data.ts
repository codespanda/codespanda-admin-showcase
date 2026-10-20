import POSTS from "@/content/blog.json";
import { isLive } from "@/lib/schedule";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  date: string;        // ISO date, e.g. "2026-08-14"
  readTime: string;    // e.g. "6 min read"
  /** Tailwind gradient classes for the placeholder cover — used as a fallback when coverImage is absent */
  gradient: string;
  /** lucide-react icon name shown on the gradient placeholder cover */
  icon: "Sparkles" | "LayoutGrid" | "Palette" | "Rocket" | "Figma" | "Paintbrush" | "Bot" | "Puzzle" | "BrainCircuit" | "Cloud" | "GraduationCap";
  /** Real cover photo — when set, replaces the gradient+icon placeholder. Also used as the <video> poster and as the grid/OG thumbnail when coverVideo is set. */
  coverImage?: string;
  /** Optional cover video — when set, the post page plays this (autoplay, muted, loop) instead of showing the static coverImage */
  coverVideo?: string;
  content: string;     // lightweight markdown: "## " headings, "- " bullets, blank-line paragraphs
  /** Studio scheduling: the post stays hidden until this ISO time. */
  publishAt?: string;
  /** Optional interactive "quick links" grid rendered above the article body — real outbound links to the resources the post discusses */
  resourceLinks?: {
    title: string;
    description: string;
    url: string;
    icon: "Figma" | "LayoutGrid" | "LayoutTemplate" | "Shapes" | "Layers" | "Accessibility" | "Type" | "Palette" | "Lightbulb" | "Component";
  }[];
}

/** Every post lives in src/content/blog.json, so /studio can add and edit them. */
export const BLOG_POSTS: BlogPost[] = (POSTS as BlogPost[]).filter((p) => isLive(p));

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
