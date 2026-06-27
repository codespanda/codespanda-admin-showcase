import { useState } from "react";
import { cn } from "@/lib/utils";

/** Base URL of the embedded Alpine Admin (React) dashboard template. */
export const TEMPLATE_URL = "https://codespanda.github.io/Alpine-Admin-React";

export const templateRoute = (route = "dashboard") =>
  `${TEMPLATE_URL}/${route.replace(/^\//, "")}`;

interface EmbeddedDashboardProps {
  /** Route within the template, e.g. "dashboard", "employees", "charts". */
  route?: string;
  className?: string;
  /** Allow the user to click/scroll inside the embedded app. */
  interactive?: boolean;
  /** Zoom factor — render the app larger then scale down to fit nicely. */
  scale?: number;
  title?: string;
}

/**
 * Embeds the live Alpine Admin dashboard template via an iframe, scaled to
 * fit its container. Shows a skeleton shimmer until the frame finishes loading.
 */
export function EmbeddedDashboard({
  route = "dashboard",
  className,
  interactive = false,
  scale = 0.66,
  title = "CodesPanda live admin dashboard",
}: EmbeddedDashboardProps) {
  const [loaded, setLoaded] = useState(false);
  const inverse = `${100 / scale}%`;

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden bg-card",
        className
      )}
    >
      {!loaded && (
        <div className="absolute inset-0 z-10 overflow-hidden bg-secondary/40">
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-secondary via-card to-secondary" />
          <div className="absolute inset-y-0 -left-full w-1/2 animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent dark:via-white/5" />
        </div>
      )}
      <iframe
        title={title}
        src={templateRoute(route)}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={cn(
          "absolute left-0 top-0 origin-top-left border-0",
          !interactive && "pointer-events-none"
        )}
        style={{ width: inverse, height: inverse, transform: `scale(${scale})` }}
      />
    </div>
  );
}
