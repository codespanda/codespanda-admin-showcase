import { Link } from "react-router-dom";
import { Twitter, Github, Linkedin, Youtube } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/shared/Logo";
import { FOOTER_NAV, SITE } from "@/lib/constants";

const SOCIALS = [
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
];

const linkClass =
  "text-sm text-muted-foreground transition-colors hover:text-foreground";

/** Internal routes (starting with "/") use the router; everything else is an anchor. */
function FooterLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  if (href.startsWith("/")) {
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    );
  }
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      className={className}
      {...(isExternal ? { target: "_blank", rel: "noreferrer noopener" } : {})}
    >
      {children}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/20 px-4 pb-10 pt-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_repeat(3,1fr)]">
          {/* Brand */}
          <div className="max-w-xs">
            <Logo imgClassName="h-[100px]" />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              A complete, production-ready HR admin dashboard template built with
              React, Vite, TypeScript & Tailwind CSS.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-xl border border-border text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {FOOTER_NAV.map((column) => (
            <div key={column.title}>
              <h4 className="text-sm font-semibold">{column.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink href={link.href} className={linkClass}>
                      {link.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {SITE.name}, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/legal/privacy" className="transition-colors hover:text-foreground">
              Privacy
            </Link>
            <Link to="/legal/terms" className="transition-colors hover:text-foreground">
              Terms
            </Link>
            <Link to="/legal/cookies" className="transition-colors hover:text-foreground">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
