/** Centralised site config — brand, nav, social links. */
export const SITE = {
  name: "CodeSpanda",
  tagline: "Premium React Templates for Modern Developers",
  email: "hello@codespanda.com",
  githubOrg: "https://github.com/codespanda",
} as const;

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Templates", href: "#templates" },
  { label: "Categories", href: "#categories" },
  { label: "Coming Soon", href: "#coming-soon" },
  { label: "About", href: "#why-us" },
];

export const FOOTER_NAV: { title: string; links: NavLink[] }[] = [
  {
    title: "Templates",
    links: [
      { label: "Alpine Admin React", href: "https://codespanda.github.io/Alpine-Admin-React/dashboard", external: true },
      { label: "Brisk Admin", href: "https://codespanda.github.io/brisk-admin/#/dashboard", external: true },
      { label: "Coming Soon", href: "#coming-soon" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "https://codespanda.github.io/Alpine-Admin-React/docs", external: true },
      { label: "Contact", href: "mailto:hello@codespanda.com", external: true },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
      { label: "Security", href: "/legal/security" },
    ],
  },
];
