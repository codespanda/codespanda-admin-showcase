import { cn } from "@/lib/utils";

/** Segmented tab control used to filter template and shot grids. */
export function TypeTabs<T extends string>({
  tabs,
  value,
  onChange,
  label,
  className,
}: {
  tabs: { id: T; label: string; short?: string }[];
  value: T;
  onChange: (id: T) => void;
  label: string;
  className?: string;
}) {
  return (
    <div role="tablist" aria-label={label} className={cn("gap-1 rounded-xl bg-soft-2 p-1", className)}>
      {tabs.map((t) => {
        const on = t.id === value;
        return (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => onChange(t.id)}
            className={cn(
              "h-11 rounded-[9px] px-2 text-sm font-semibold transition-colors lg:px-[18px] lg:text-[15px]",
              on ? "bg-card text-foreground shadow-[0_1px_3px_rgba(14,23,38,0.12)]" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {t.short ? (
              <>
                <span className="lg:hidden">{t.short}</span>
                <span className="hidden lg:inline">{t.label}</span>
              </>
            ) : (
              t.label
            )}
          </button>
        );
      })}
    </div>
  );
}
