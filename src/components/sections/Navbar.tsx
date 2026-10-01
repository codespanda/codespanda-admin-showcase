import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Moon, Sun, X } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { BuyMeCoffee } from "@/components/shared/BuyMeCoffee";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  to: string;
  /** Path (+ optional ?type) that marks this item as the current page. */
  match?: (path: string, search: string) => boolean;
}

const HIRE_URL = "https://www.linkedin.com/company/codespanda";

const NAV: NavItem[] = [
  { label: "Templates", to: "/templates", match: (p) => p.startsWith("/templates") },
  { label: "Projects", to: "/projects", match: (p) => p.startsWith("/projects") },
  { label: "Services", to: "/services", match: (p) => p.startsWith("/services") },
  { label: "Portfolio", to: "/portfolio", match: (p) => p.startsWith("/portfolio") },
  { label: "Why CodesPanda", to: "/#features" },
  { label: "Blog", to: "/blog", match: (p) => p.startsWith("/blog") },
];

function ThemeToggle({ className }: { className?: string }) {
  const { toggleTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className={cn(
        "relative flex h-11 w-11 items-center justify-center rounded-[10px] border border-border bg-card text-foreground transition-colors hover:bg-secondary",
        className
      )}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" aria-hidden />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" aria-hidden />
    </button>
  );
}

function NavAnchor({ item, className, onClick }: { item: NavItem; className: string; onClick?: () => void }) {
  const { pathname, search } = useLocation();
  const active = item.match?.(pathname, search) ?? false;
  const cls = cn(className, active ? "font-bold text-link" : "text-foreground hover:text-link");
  // "/#…" links go through the browser so the page scrolls to the section.
  if (item.to.startsWith("/#")) {
    return (
      <a href={item.to} className={cls} onClick={onClick}>
        {item.label}
      </a>
    );
  }
  return (
    <Link to={item.to} className={cls} onClick={onClick} aria-current={active ? "page" : undefined}>
      {item.label}
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname, search } = useLocation();

  useEffect(() => setOpen(false), [pathname, search]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-card select-none">
      {/* Desktop: 80px bar */}
      <div className="mx-auto hidden h-20 max-w-[1440px] items-center justify-between px-20 lg:flex xl:px-20">
        <Logo imgClassName="h-[60px] w-[60px] rounded-[10px] bg-logo-bg" />
        <nav aria-label="Primary" className="flex gap-7 text-[15px] font-medium">
          {NAV.map((item) => (
            <NavAnchor key={item.label} item={item} className="transition-colors" />
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a href={HIRE_URL} target="_blank" rel="noreferrer noopener" className="flex h-11 items-center px-[18px] text-[15px] font-semibold text-foreground hover:text-link">
            Hire Us
          </a>
          <BuyMeCoffee className="flex h-11 items-center rounded-[10px] bg-brand px-5 text-[15px] font-semibold text-white transition-opacity hover:opacity-90" />
        </div>
      </div>

      {/* Mobile: 64px bar with a dropdown menu */}
      <div className="flex h-16 items-center justify-between px-4 lg:hidden">
        <Logo imgClassName="h-12 w-12 rounded-[10px] bg-logo-bg" />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-border bg-card"
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          aria-label="Primary"
          className="absolute inset-x-0 top-16 flex flex-col border-b border-border bg-card px-4 pb-5 pt-2 shadow-[0_16px_32px_rgba(14,23,38,0.12)] lg:hidden"
        >
          {NAV.map((item) => (
            <NavAnchor
              key={item.label}
              item={item}
              onClick={() => setOpen(false)}
              className="flex h-[52px] items-center border-b border-line-2 text-[17px] font-semibold"
            />
          ))}
          <a href={HIRE_URL} target="_blank" rel="noreferrer noopener" onClick={() => setOpen(false)} className="flex h-[52px] items-center text-[17px] font-semibold text-foreground">
            Hire Us
          </a>
          <BuyMeCoffee className="mt-2 flex h-[52px] items-center justify-center rounded-xl bg-brand text-base font-bold text-white" />
        </nav>
      )}
    </header>
  );
}
