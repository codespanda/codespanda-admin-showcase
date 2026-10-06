import { cn } from "@/lib/utils";
import { FRAME_SIZES, imageSrcSet } from "@/lib/responsive-image";

interface BrowserFrameProps {
  src: string;
  alt: string;
  /** Address shown in the tab bar; omit for a bare bar with just the dots. */
  url?: string;
  /** Dark frame for use inside the navy showcase bands. */
  dark?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  loading?: "eager" | "lazy";
}

const BAR = {
  sm: "h-5 gap-1 px-2.5 [&_i]:h-1.5 [&_i]:w-1.5",
  md: "h-7 gap-1.5 px-3 [&_i]:h-2 [&_i]:w-2",
  lg: "h-9 gap-2 px-3.5 [&_i]:h-2.5 [&_i]:w-2.5",
};

/** A screenshot inside a minimal browser window, as drawn on the canvas. */
export function BrowserFrame({ src, alt, url, dark, size = "md", className, loading = "lazy" }: BrowserFrameProps) {
  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden",
        dark ? "border border-[#22344D] bg-[#121E30]" : "border border-border bg-card",
        className
      )}
    >
      <div
        className={cn(
          "flex shrink-0 items-center border-b",
          dark ? "border-[#22344D] bg-[#0B1320]" : "border-border bg-secondary",
          BAR[size]
        )}
      >
        <i className="rounded-full bg-[#F87171]" />
        <i className="rounded-full bg-[#FBBF24]" />
        <i className="rounded-full bg-[#34D399]" />
        {url && (
          <span
            className={cn(
              "ml-3.5 flex h-[calc(100%-14px)] items-center truncate rounded-md px-2.5 text-xs",
              dark ? "bg-[#121E30] text-[#93A4B8]" : "bg-card text-muted-foreground"
            )}
          >
            {url}
          </span>
        )}
      </div>
      <img
        src={src}
        srcSet={imageSrcSet(src)}
        sizes={FRAME_SIZES}
        alt={alt}
        loading={loading}
        decoding="async"
        className="block min-h-0 w-full flex-1 object-cover object-top"
      />
    </div>
  );
}
