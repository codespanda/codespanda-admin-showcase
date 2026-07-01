import {
  Code2,
  Zap,
  Palette,
  LayoutDashboard,
  Smartphone,
  Settings,
  Rocket,
  RefreshCw,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Templates                                                           */
/* ------------------------------------------------------------------ */
export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  badge: "New" | "Popular" | "Hot";
  badgeColor: string;
  liveUrl: string;
  docsUrl: string;
  screenshotUrl?: string;
  techStack: string[];
  features: string[];
  darkMode: boolean;
  responsive: boolean;
}

export const TEMPLATES: Template[] = [
  {
    id: "alpine-admin-react",
    name: "Alpine Admin React",
    description:
      "A comprehensive HR admin dashboard template with 30+ pages covering employees, payroll, attendance, leave management, performance, and detailed reporting. Built with the latest React ecosystem.",
    category: "React Admin Dashboard",
    badge: "New",
    badgeColor: "from-indigo-500 to-purple-600",
    liveUrl: "https://codespanda.github.io/Alpine-Admin-React/dashboard",
    docsUrl: "https://codespanda.github.io/Alpine-Admin-React/docs",
    screenshotUrl: "https://raw.githubusercontent.com/codespanda/Alpine-Admin-React/main/public/dashboard.png",
    techStack: ["React", "Vite", "Tailwind CSS", "TypeScript"],
    features: ["Modern Design", "30+ Pages", "Dark Mode", "Recharts"],
    darkMode: true,
    responsive: true,
  },
  {
    id: "brisk-admin",
    name: "Brisk Admin",
    description:
      "A sleek, enterprise-grade admin dashboard with clean layouts and responsive design. Perfect for building business management systems, CRMs, and modern web applications.",
    category: "Admin Dashboard",
    badge: "Popular",
    badgeColor: "from-emerald-500 to-teal-600",
    liveUrl: "https://codespanda.github.io/brisk-admin/#/dashboard",
    docsUrl: "https://codespanda.github.io/brisk-admin/",
    screenshotUrl: "https://raw.githubusercontent.com/codespanda/brisk-admin/master/public/dashboard.png",
    techStack: ["React", "Dashboard", "Responsive", "Modern UI"],
    features: ["Enterprise UI", "Clean Layout", "Responsive", "Customizable"],
    darkMode: false,
    responsive: true,
  },
];

/* ------------------------------------------------------------------ */
/* Why CodeSpanda features                                             */
/* ------------------------------------------------------------------ */
export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const FEATURES: Feature[] = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "Well-structured, documented, and maintainable code following best practices.",
  },
  {
    icon: Palette,
    title: "Modern Design",
    description: "Pixel-perfect UI with premium aesthetics inspired by top SaaS products.",
  },
  {
    icon: Smartphone,
    title: "Responsive Layouts",
    description: "Every template looks flawless across desktop, tablet, and mobile devices.",
  },
  {
    icon: Settings,
    title: "Easy Customization",
    description: "Design tokens and modular components make re-theming straightforward.",
  },
  {
    icon: Zap,
    title: "Developer Friendly",
    description: "Intuitive folder structure, typed data, and clear component boundaries.",
  },
  {
    icon: Rocket,
    title: "Production Ready",
    description: "Optimized builds, accessibility-first markup, and real-world data patterns.",
  },
  {
    icon: LayoutDashboard,
    title: "Fast Performance",
    description: "Vite-powered builds with lazy loading and optimized bundle sizes.",
  },
  {
    icon: RefreshCw,
    title: "Lifetime Updates",
    description: "Templates are actively maintained with new pages and features added regularly.",
  },
];

/* ------------------------------------------------------------------ */
/* Tech Stack                                                          */
/* ------------------------------------------------------------------ */
export interface TechItem {
  name: string;
  color: string;
  comingSoon?: boolean;
  icon: string;
}

export const TECH_STACK: TechItem[] = [
  { name: "React", color: "from-cyan-400/20 to-cyan-500/10", icon: "⚛️" },
  { name: "Vite", color: "from-violet-400/20 to-violet-500/10", icon: "⚡" },
  { name: "Tailwind CSS", color: "from-sky-400/20 to-sky-500/10", icon: "🎨" },
  { name: "JavaScript", color: "from-yellow-400/20 to-yellow-500/10", icon: "🟨" },
  { name: "TypeScript", color: "from-blue-400/20 to-blue-500/10", icon: "🔷", comingSoon: true },
  { name: "Next.js", color: "from-slate-400/20 to-slate-500/10", icon: "▲", comingSoon: true },
];

/* ------------------------------------------------------------------ */
/* Coming Soon templates                                               */
/* ------------------------------------------------------------------ */
export interface ComingSoonTemplate {
  name: string;
  category: string;
  gradient: string;
}

export const COMING_SOON: ComingSoonTemplate[] = [
  { name: "Accounting Dashboard", category: "Finance", gradient: "from-emerald-500/20 to-teal-500/10" },
  { name: "School ERP", category: "Education", gradient: "from-blue-500/20 to-indigo-500/10" },
  { name: "CRM Dashboard", category: "Sales", gradient: "from-orange-500/20 to-rose-500/10" },
  { name: "Hospital Management", category: "Healthcare", gradient: "from-red-500/20 to-pink-500/10" },
  { name: "Finance Dashboard", category: "Finance", gradient: "from-violet-500/20 to-purple-500/10" },
  { name: "Payroll System", category: "HR", gradient: "from-amber-500/20 to-yellow-500/10" },
  { name: "Inventory Management", category: "Operations", gradient: "from-cyan-500/20 to-sky-500/10" },
  { name: "Real Estate CRM", category: "Real Estate", gradient: "from-lime-500/20 to-green-500/10" },
  { name: "AI SaaS Dashboard", category: "AI / ML", gradient: "from-fuchsia-500/20 to-pink-500/10" },
  { name: "Construction ERP", category: "Industry", gradient: "from-stone-500/20 to-slate-500/10" },
];

/* ------------------------------------------------------------------ */
/* Comparison table data                                               */
/* ------------------------------------------------------------------ */
export const COMPARISON = {
  alpine: {
    name: "Alpine Admin React",
    badge: "New",
    badgeColor: "bg-indigo-500",
    url: "https://codespanda.github.io/Alpine-Admin-React/dashboard",
    rows: [
      "Modern Design",
      "React + Vite",
      "Tailwind CSS",
      "Dark Mode",
      "30+ Pages",
      "HR Modules",
    ],
  },
  brisk: {
    name: "Brisk Admin",
    badge: "Popular",
    badgeColor: "bg-emerald-500",
    url: "https://codespanda.github.io/brisk-admin/#/dashboard",
    rows: [
      "Enterprise UI",
      "React",
      "Responsive",
      "Clean Layout",
      "Multi-page",
      "Business Modules",
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Hero stats                                                          */
/* ------------------------------------------------------------------ */
export interface Stat {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export const HERO_STATS: Stat[] = [
  { label: "Templates available", value: 2 },
  { label: "Pages included", value: 30, suffix: "+" },
  { label: "Coming soon", value: 10, suffix: "+" },
  { label: "Technologies", value: 4, suffix: "+" },
];

/* ------------------------------------------------------------------ */
/* Legacy exports — kept so old sections still compile                */
/* ------------------------------------------------------------------ */
export const TECH_STACK_LEGACY = ["React", "Vite", "TypeScript", "Tailwind CSS", "Recharts", "Lucide"];

export const WORKFLOW_FEATURES = [
  "Self-service leave requests",
  "One-click manager approvals",
  "Automated attendance tracking",
  "Payroll processing & payslips",
  "Guided employee onboarding",
  "Performance review cycles",
  "Role-based access control",
];

export interface AnalyticsCard {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  change: number;
  series: number[];
}

export const ANALYTICS_CARDS: AnalyticsCard[] = [
  { label: "Total Employees", value: 196, change: 12, series: [40, 46, 50, 54, 59, 63, 68, 72, 76, 82, 88, 100] },
  { label: "Active Employees", value: 178, change: 8, series: [45, 50, 54, 58, 62, 66, 70, 74, 78, 84, 90, 96] },
  { label: "New Hires", value: 11, change: 15, series: [50, 38, 68, 30, 46, 60, 40, 28, 20, 74, 55, 90] },
  { label: "Attendance Rate", value: 92.5, suffix: "%", decimals: 1, change: -2, series: [88, 90, 86, 91, 89, 92, 90, 93, 91, 94, 92, 93] },
  { label: "Open Positions", value: 7, change: 9, series: [30, 35, 40, 38, 45, 50, 48, 55, 60, 58, 65, 70] },
  { label: "Retention Rate", value: 94, suffix: "%", change: 3.2, series: [80, 82, 85, 84, 86, 88, 90, 89, 91, 92, 93, 94] },
];

export const EMPLOYEE_GROWTH = [142, 148, 152, 156, 161, 165, 170, 174, 178, 184, 190, 196];
export const GROWTH_MONTHS = ["A", "M", "J", "J", "A", "S", "O", "N", "D", "J", "F", "M"];

export type ModuleStatus = "Live" | "New" | "Soon";

export interface Module {
  icon: LucideIcon;
  title: string;
  description: string;
  status: ModuleStatus;
}

import {
  LayoutDashboard as _LD,
  Users as _U,
  Building2 as _B2,
  Briefcase as _BF,
  CalendarCheck as _CC,
  CalendarDays as _CD,
  Wallet as _W,
  TrendingUp as _TU,
  UserPlus as _UP,
  BarChart3 as _BC,
  FileBarChart as _FB,
  Settings as _S,
} from "lucide-react";

export const MODULES: Module[] = [
  { icon: _LD, title: "Dashboard", description: "Headcount, attendance & hiring at a glance.", status: "Live" },
  { icon: _U, title: "Employees", description: "Full directory with profiles & roles.", status: "Live" },
  { icon: _B2, title: "Departments", description: "Teams, headcounts & department leads.", status: "Live" },
  { icon: _BF, title: "Designations", description: "Job titles & role hierarchy.", status: "Live" },
  { icon: _CC, title: "Attendance", description: "Present, absent & late tracking.", status: "Live" },
  { icon: _CD, title: "Leave Management", description: "Requests & approval workflow.", status: "Live" },
  { icon: _W, title: "Payroll", description: "Salaries, payslips & status.", status: "Live" },
  { icon: _TU, title: "Performance", description: "Reviews, goals & ratings.", status: "Live" },
  { icon: _UP, title: "Onboarding", description: "New-hire checklists & flows.", status: "New" },
  { icon: _BC, title: "Charts", description: "Recharts data visualizations.", status: "Live" },
  { icon: _FB, title: "Reports", description: "Exportable HR reports.", status: "Soon" },
  { icon: _S, title: "Settings", description: "Profile, roles & preferences.", status: "Live" },
];

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  initials: string;
  quote: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Daniel Reed",
    role: "CTO",
    company: "Brightwave",
    initials: "DR",
    quote: "We shipped our internal HR portal in days, not months. The employees, attendance, and leave modules worked exactly as we needed straight out of the box.",
  },
  {
    name: "Aisha Khan",
    role: "Lead Frontend Engineer",
    company: "Nimbus",
    initials: "AK",
    quote: "Clean, well-structured React + TypeScript code with sensible component boundaries. The dashboard charts are genuinely production quality.",
  },
  {
    name: "Marcus Lee",
    role: "HR Operations Manager",
    company: "Vanta Labs",
    initials: "ML",
    quote: "Our HR team finally has one place for employees, departments, and payroll. The responsive layout and dark mode were a huge bonus.",
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    question: "What's included in the template?",
    answer: "30+ fully-built admin pages — Dashboard, Employees, Departments, Designations, Attendance, Leave Management, Payroll, Performance, Onboarding, Offboarding, Reports, Charts, Settings, authentication screens, and more — all wired together with realistic sample data.",
  },
  {
    question: "What is it built with?",
    answer: "A modern, production-ready stack: React 18, Vite, TypeScript, and Tailwind CSS, with Recharts for data visualization and Lucide for icons. Components are modular and easy to extend.",
  },
  {
    question: "Is it responsive and does it support dark mode?",
    answer: "Yes. Every page is fully responsive across desktop, tablet, and mobile, and ships with a polished light and dark theme out of the box.",
  },
  {
    question: "Does it include charts and sample data?",
    answer: "It does. The dashboard includes line, bar, area, and pie charts powered by Recharts, all driven by realistic mock data so you can see exactly how everything looks before plugging in your API.",
  },
  {
    question: "Can I customize and extend it?",
    answer: "Absolutely. The codebase uses a clean folder structure, reusable UI primitives, typed data, and design tokens — so re-theming, adding pages, or wiring up a backend is straightforward.",
  },
];
