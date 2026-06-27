import {
  LayoutDashboard,
  Users,
  Building2,
  Briefcase,
  CalendarCheck,
  CalendarDays,
  CalendarClock,
  Clock,
  Wallet,
  TrendingUp,
  UserPlus,
  UserMinus,
  Award,
  FileBarChart,
  BarChart3,
  Settings,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Features grid — capabilities of the HR admin template              */
/* ------------------------------------------------------------------ */
export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const FEATURES: Feature[] = [
  {
    icon: Users,
    title: "Employee Directory",
    description:
      "Manage every team member's profile, role, salary, and status in one place.",
  },
  {
    icon: Building2,
    title: "Departments",
    description:
      "Organize your workforce into departments with headcounts and team leads.",
  },
  {
    icon: CalendarCheck,
    title: "Attendance Tracking",
    description:
      "Daily present, absent, and late tracking with weekly attendance breakdowns.",
  },
  {
    icon: CalendarDays,
    title: "Leave Management",
    description:
      "Self-service leave requests with a clean manager approval workflow.",
  },
  {
    icon: Wallet,
    title: "Payroll",
    description:
      "Process salaries, generate payslips, and track payroll status company-wide.",
  },
  {
    icon: TrendingUp,
    title: "Performance",
    description:
      "Run performance review cycles and track employee goals and ratings.",
  },
  {
    icon: UserPlus,
    title: "Onboarding",
    description:
      "Guided onboarding checklists to get every new hire productive fast.",
  },
  {
    icon: UserMinus,
    title: "Offboarding",
    description:
      "Smooth, compliant exits with structured offboarding workflows.",
  },
  {
    icon: CalendarClock,
    title: "Holidays & Shifts",
    description:
      "Company holiday calendar and shift scheduling for the whole team.",
  },
  {
    icon: Clock,
    title: "Timesheets",
    description: "Log, submit, and approve work hours with built-in timesheets.",
  },
  {
    icon: BarChart3,
    title: "Reports & Charts",
    description:
      "Visual dashboards for headcount, hiring, and attendance powered by Recharts.",
  },
  {
    icon: Award,
    title: "Awards & Recognition",
    description:
      "Celebrate achievements with awards, surveys, and recognition pages.",
  },
];

/* ------------------------------------------------------------------ */
/* Modules — real pages/routes inside the template                    */
/* ------------------------------------------------------------------ */
export type ModuleStatus = "Live" | "New" | "Soon";

export interface Module {
  icon: LucideIcon;
  title: string;
  description: string;
  status: ModuleStatus;
}

export const MODULES: Module[] = [
  { icon: LayoutDashboard, title: "Dashboard", description: "Headcount, attendance & hiring at a glance.", status: "Live" },
  { icon: Users, title: "Employees", description: "Full directory with profiles & roles.", status: "Live" },
  { icon: Building2, title: "Departments", description: "Teams, headcounts & department leads.", status: "Live" },
  { icon: Briefcase, title: "Designations", description: "Job titles & role hierarchy.", status: "Live" },
  { icon: CalendarCheck, title: "Attendance", description: "Present, absent & late tracking.", status: "Live" },
  { icon: CalendarDays, title: "Leave Management", description: "Requests & approval workflow.", status: "Live" },
  { icon: Wallet, title: "Payroll", description: "Salaries, payslips & status.", status: "Live" },
  { icon: TrendingUp, title: "Performance", description: "Reviews, goals & ratings.", status: "Live" },
  { icon: UserPlus, title: "Onboarding", description: "New-hire checklists & flows.", status: "New" },
  { icon: BarChart3, title: "Charts", description: "Recharts data visualizations.", status: "Live" },
  { icon: FileBarChart, title: "Reports", description: "Exportable HR reports.", status: "Soon" },
  { icon: Settings, title: "Settings", description: "Profile, roles & preferences.", status: "Live" },
];

/* ------------------------------------------------------------------ */
/* KPI stats (hero) — pulled from the template's dashboard            */
/* ------------------------------------------------------------------ */
export interface Stat {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export const HERO_STATS: Stat[] = [
  { label: "Employees managed", value: 196 },
  { label: "Departments", value: 6 },
  { label: "Attendance rate", value: 92.5, suffix: "%", decimals: 1 },
  { label: "Admin pages", value: 30, suffix: "+" },
];

/* ------------------------------------------------------------------ */
/* Analytics cards — the dashboard's stat cards                       */
/* ------------------------------------------------------------------ */
export interface AnalyticsCard {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  change: number; // percentage, can be negative
  series: number[]; // normalized 0-100 values for the sparkline
}

export const ANALYTICS_CARDS: AnalyticsCard[] = [
  {
    label: "Total Employees",
    value: 196,
    change: 12,
    series: [40, 46, 50, 54, 59, 63, 68, 72, 76, 82, 88, 100],
  },
  {
    label: "Active Employees",
    value: 178,
    change: 8,
    series: [45, 50, 54, 58, 62, 66, 70, 74, 78, 84, 90, 96],
  },
  {
    label: "New Hires",
    value: 11,
    change: 15,
    series: [50, 38, 68, 30, 46, 60, 40, 28, 20, 74, 55, 90],
  },
  {
    label: "Attendance Rate",
    value: 92.5,
    suffix: "%",
    decimals: 1,
    change: -2,
    series: [88, 90, 86, 91, 89, 92, 90, 93, 91, 94, 92, 93],
  },
  {
    label: "Open Positions",
    value: 7,
    change: 9,
    series: [30, 35, 40, 38, 45, 50, 48, 55, 60, 58, 65, 70],
  },
  {
    label: "Retention Rate",
    value: 94,
    suffix: "%",
    change: 3.2,
    series: [80, 82, 85, 84, 86, 88, 90, 89, 91, 92, 93, 94],
  },
];

/** Headcount growth series (Apr → Mar) straight from the template's chart. */
export const EMPLOYEE_GROWTH = [142, 148, 152, 156, 161, 165, 170, 174, 178, 184, 190, 196];
export const GROWTH_MONTHS = ["A", "M", "J", "J", "A", "S", "O", "N", "D", "J", "F", "M"];

/* ------------------------------------------------------------------ */
/* Tech stack the template is built with                              */
/* ------------------------------------------------------------------ */
export const TECH_STACK = [
  "React",
  "Vite",
  "TypeScript",
  "Tailwind CSS",
  "Recharts",
  "Lucide",
];

/* ------------------------------------------------------------------ */
/* Workflow automation bullets (HR workflows)                         */
/* ------------------------------------------------------------------ */
export const WORKFLOW_FEATURES = [
  "Self-service leave requests",
  "One-click manager approvals",
  "Automated attendance tracking",
  "Payroll processing & payslips",
  "Guided employee onboarding",
  "Performance review cycles",
  "Role-based access control",
];

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */
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
    quote:
      "We shipped our internal HR portal in days, not months. The employees, attendance, and leave modules worked exactly as we needed straight out of the box.",
  },
  {
    name: "Aisha Khan",
    role: "Lead Frontend Engineer",
    company: "Nimbus",
    initials: "AK",
    quote:
      "Clean, well-structured React + TypeScript code with sensible component boundaries. The dashboard charts are genuinely production quality.",
  },
  {
    name: "Marcus Lee",
    role: "HR Operations Manager",
    company: "Vanta Labs",
    initials: "ML",
    quote:
      "Our HR team finally has one place for employees, departments, and payroll. The responsive layout and dark mode were a huge bonus.",
  },
];

/* ------------------------------------------------------------------ */
/* FAQ — questions about the template                                 */
/* ------------------------------------------------------------------ */
export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    question: "What's included in the template?",
    answer:
      "30+ fully-built admin pages — Dashboard, Employees, Departments, Designations, Attendance, Leave Management, Payroll, Performance, Onboarding, Offboarding, Reports, Charts, Settings, authentication screens, and more — all wired together with realistic sample data.",
  },
  {
    question: "What is it built with?",
    answer:
      "A modern, production-ready stack: React 18, Vite, TypeScript, and Tailwind CSS, with Recharts for data visualization and Lucide for icons. Components are modular and easy to extend.",
  },
  {
    question: "Is it responsive and does it support dark mode?",
    answer:
      "Yes. Every page is fully responsive across desktop, tablet, and mobile, and ships with a polished light and dark theme out of the box.",
  },
  {
    question: "Does it include charts and sample data?",
    answer:
      "It does. The dashboard includes line, bar, area, and pie charts powered by Recharts, all driven by realistic mock data so you can see exactly how everything looks before plugging in your API.",
  },
  {
    question: "Can I customize and extend it?",
    answer:
      "Absolutely. The codebase uses a clean folder structure, reusable UI primitives, typed data, and design tokens — so re-theming, adding pages, or wiring up a backend is straightforward.",
  },
];
