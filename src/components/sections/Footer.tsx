import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { SITE } from "@/lib/constants";

const SOCIALS = [
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/codespanda/" },
  { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/people/CodesPanda/61592241216317/" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/codespanda2026" },
  { icon: Mail, label: "Email", href: `mailto:${SITE.email}` },
];

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Templates",
    links: [
      { label: "Web pages", href: "/templates?type=web" },
      { label: "Admin panels", href: "/templates?type=admin" },
      { label: "Portfolio", href: "/portfolio" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/#features" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: `mailto:${SITE.email}` },
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

function FooterLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  if (href.startsWith("/") && !href.startsWith("/#")) {
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

/** Site footer (logo, blurb, three link columns), the same on every page. */
export function Footer() {
  const year = 2026;

  return (
    <footer id="blog" className="mt-auto flex flex-col gap-6 border-t border-border bg-card px-4 pb-7 pt-9 lg:gap-10 lg:px-page lg:pb-10 lg:pt-14">
      <div className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:gap-12">
        <div className="flex flex-col gap-3.5 lg:w-[340px]">
          <Logo imgClassName="h-20 w-20 rounded-[10px] bg-logo-bg" />
          <p className="hidden text-[15px] leading-relaxed text-muted-foreground lg:block">
            Web page and admin panel templates for teams who'd rather ship than start from scratch.
          </p>
          <div className="flex items-center gap-2">
            {SOCIALS.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-link hover:text-link"
              >
                <Icon className="h-[18px] w-[18px]" aria-hidden />
              </a>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 text-[15px] lg:gap-20">
          {COLUMNS.map((col) => (
            <div key={col.title} className="flex flex-col gap-1 lg:gap-3">
              <span className="pb-1.5 font-bold lg:pb-0">{col.title}</span>
              {col.links.map((l) => (
                <FooterLink key={l.label} href={l.href} className="py-2 text-muted-foreground hover:text-foreground lg:py-0">
                  {l.label}
                </FooterLink>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-line-2 pt-[18px] text-[13px] text-muted-foreground lg:pt-6 lg:text-sm">
        © {year} CodesPanda. All rights reserved.
      </div>
    </footer>
  );
}
