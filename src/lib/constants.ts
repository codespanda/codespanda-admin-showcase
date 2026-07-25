/** Centralised site config — brand, nav, social links. */
export const SITE = {
  name: "CodeSpanda",
  tagline: "Premium React Templates for Modern Developers",
  email: "contact@codespanda.com",
  githubOrg: "https://github.com/codespanda",
} as const;

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Templates", href: "/#templates" },
  { label: "Categories", href: "/#categories" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/#why-us" },
  { label: "FAQ", href: "/#faq" },
];

export const FOOTER_NAV: { title: string; links: NavLink[] }[] = [
  {
    title: "Templates",
    links: [
      { label: "Hamara Bharat", href: "/templates/hamara-bharat" },
      { label: "Eva AutoCare", href: "/templates/eva-autocare" },
      { label: "DeepCity Care Hospital", href: "/templates/deepcity-care" },
      { label: "Flowers POS", href: "/templates/flowers" },
      { label: "Brisk Admin", href: "/templates/brisk-admin" },
      { label: "Alpine Admin React", href: "/templates/alpine-admin-react" },
      { label: "Cornerstone", href: "/templates/cornerstone" },
      { label: "Portfolio Template", href: "/templates/portfolio-template" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Hamara Bharat Preview", href: "https://hamarabharat.codespanda.com/", external: true },
      { label: "Eva AutoCare Docs", href: "https://eva-autocare.codespanda.com/docs", external: true },
      { label: "DeepCity Care Docs", href: "https://deepcity-care.codespanda.com/docs", external: true },
      { label: "Flowers POS Docs", href: "https://flowers.codespanda.com/docs", external: true },
      { label: "Brisk Admin Docs", href: "https://codespanda.github.io/brisk-admin/", external: true },
      { label: "Contact", href: "mailto:contact@codespanda.com", external: true },
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
