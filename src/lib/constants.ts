/** Centralised site config — brand, nav, social links. */
export const SITE = {
  name: "CodesPanda",
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
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/#why-us" },
  { label: "FAQ", href: "/#faq" },
];

export const FOOTER_NAV: { title: string; links: NavLink[] }[] = [
  {
    title: "Templates",
    links: [
      { label: "Your CA Firm", href: "/templates/ca-firm" },
      { label: "Finovo", href: "/templates/finovo" },
      { label: "Hamara Bharat", href: "/templates/hamara-bharat" },
      { label: "Eva AutoCare", href: "/templates/eva-autocare" },
      { label: "DeepCity Care Hospital", href: "/templates/deepcity-care" },
      { label: "Flowers POS", href: "/templates/flowers" },
      { label: "Brisk Admin", href: "/templates/brisk-admin" },
      { label: "Alpine Admin React", href: "/templates/alpine-admin-react" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Your CA Firm Preview", href: "https://ca-firm.codespanda.com/", external: true },
      { label: "Finovo Docs", href: "https://finovo.codespanda.com/docs", external: true },
      { label: "Hamara Bharat Preview", href: "https://hamarabharat.codespanda.com/", external: true },
      { label: "Eva AutoCare Docs", href: "https://eva-autocare.codespanda.com/docs", external: true },
      { label: "DeepCity Care Docs", href: "https://deepcity-care.codespanda.com/docs", external: true },
      { label: "Flowers POS Docs", href: "https://flowers.codespanda.com/docs", external: true },
      { label: "Brisk Admin Docs", href: "https://codespanda.github.io/brisk-admin/", external: true },
      { label: "Blog", href: "/blog" },
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
