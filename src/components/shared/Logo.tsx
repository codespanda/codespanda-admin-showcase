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
 * CodesPanda brand logo — uses the original artwork at `public/logo.png`
 * exactly as provided (panda mascot + wordmark lockup, transparent PNG).
 */
export function Logo({ className, imgClassName, to = "/" }: LogoProps) {
  return (
    <Link
      to={to}
      className={cn("inline-flex items-center", className)}
      aria-label="CodesPanda"
    >
      <img
        src="/logo.png"
        alt="CodesPanda"
        width={481}
        height={480}
        className={cn("h-12 w-auto object-contain", imgClassName)}
      />
    </Link>
  );
}
