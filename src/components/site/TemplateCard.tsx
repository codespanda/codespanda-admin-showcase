import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { stackLabel, type SiteTemplate } from "@/lib/site";

interface TemplateCardProps {
  template: SiteTemplate;
  /** Thumbnail panel height class; the canvas uses 236px on Home, 200px in the catalog. */
  thumbClassName?: string;
  /** Replaces the stack label at the bottom right of the card. */
  aside?: React.ReactNode;
  compact?: boolean;
  className?: string;
}

export function KindPill({ kind, label }: { kind: SiteTemplate["kind"]; label: string }) {
  return (
    <span
      className={cn(
        "rounded-md px-[9px] py-1 text-xs font-bold",
        kind === "admin" ? "bg-band text-white" : "bg-blue-soft text-blue-ink"
      )}
    >
      {label}
    </span>
  );
}

export function NewPill() {
  return <span className="rounded-md bg-[#FFF1D6] px-[9px] py-1 text-xs font-bold text-[#8A4B06]">New</span>;
}

/** Template card: pastel panel with the real screenshot, then type, name and category. */
export function TemplateCard({ template: t, thumbClassName = "h-[236px] px-7 pt-9", aside, compact, className }: TemplateCardProps) {
  return (
    <article className={cn("flex flex-col overflow-hidden rounded-[18px] border border-border bg-card", className)}>
      <div
        className={cn("tint-panel flex items-end", thumbClassName)}
        style={{ ["--tint" as string]: t.tint }}
      >
        {t.screenshotUrl && (
          <img
            src={t.screenshotUrl}
            alt={`${t.name} template screenshot`}
            loading="lazy"
            decoding="async"
            className="block h-full w-full rounded-t-lg object-cover object-top shadow-[0_10px_28px_rgba(14,23,38,0.16)]"
          />
        )}
      </div>
      <div className={cn("flex flex-col", compact ? "gap-2 px-[18px] pb-[18px] pt-4 lg:px-[22px] lg:pb-[22px] lg:pt-5" : "gap-2.5 px-6 pb-6 pt-[22px]")}>
        <div className="flex items-center gap-2">
          <KindPill kind={t.kind} label={t.kindLabel} />
          {t.isNew && <NewPill />}
        </div>
        <h3 className={cn("font-bold tracking-[-0.015em]", compact ? "text-[19px] lg:text-xl" : "text-[22px]")}>{t.name}</h3>
        <p className={cn("text-muted-foreground", compact ? "text-sm" : "text-[15px]")}>{t.shortCategory}</p>
        <div className={cn("flex items-center justify-between border-t border-line-2", compact ? "mt-1 pt-3 lg:mt-2 lg:pt-3.5" : "mt-2 pt-4")}>
          <Link to={t.href} className="text-[15px] font-semibold text-link hover:text-blue-ink">
            View template →
          </Link>
          {aside ?? <span className="text-[13px] text-muted-foreground">{stackLabel(t)}</span>}
        </div>
      </div>
    </article>
  );
}
