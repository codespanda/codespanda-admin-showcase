/** Centralised site config — brand, nav, social links. */
export const SITE = {
  name: "CodesPanda",
  tagline: "Manage Your Entire Business from One Intelligent Dashboard",
  email: "hello@codespanda.com",
  /** Live admin dashboard template that this page showcases. */
  templateUrl: "https://codespanda.github.io/Alpine-Admin-React",
} as const;

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Features", href: "#features" },
  { label: "Dashboard", href: "#dashboard" },
  { label: "Modules", href: "#modules" },
  { label: "Analytics", href: "#analytics" },
  { label: "FAQ", href: "#faq" },
  { label: "Documentation", href: `${SITE.templateUrl}/docs`, external: true },
];

export const FOOTER_NAV: { title: string; links: NavLink[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Dashboard", href: "/#dashboard" },
      { label: "Modules", href: "/#modules" },
      { label: "Analytics", href: "/#analytics" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: `${SITE.templateUrl}/docs` },
      { label: "API Reference", href: `${SITE.templateUrl}/components` },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
      { label: "Security", href: "/legal/security" },
      { label: "GDPR", href: "/legal/gdpr" },
    ],
  },
];
