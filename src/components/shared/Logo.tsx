import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** Tailwind height utility for the logo image, e.g. "h-12". */
  imgClassName?: string;
  /** Internal route to navigate to on click. */
  to?: string;
}

/**
 * CodesPanda brand logo — the original artwork from `public/logo.png` (panda
 * mascot + wordmark lockup), served at 160px (`public/logo-160.webp`) since it's
 * never shown larger than 80px.
 */
export function Logo({ className, imgClassName, to = "/" }: LogoProps) {
  return (
    <Link
      to={to}
      className={cn("inline-flex items-center outline-none focus-visible:ring-0", className)}
      aria-label="CodesPanda"
      tabIndex={-1}
    >
      <img
        src="/logo-160.webp"
        alt="CodesPanda"
        width={160}
        height={160}
        loading="eager"
        fetchPriority="high"
        decoding="sync"
        className={cn("h-12 w-auto object-contain", imgClassName)}
      />
    </Link>
  );
}
