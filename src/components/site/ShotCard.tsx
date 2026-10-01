import { Link } from "react-router-dom";
import type { Shot } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

export type ShotGroup = "mobile" | "web" | "dashboard";

/** Groups the portfolio filters by: Mobile App, Web Dashboard, everything else is a web app. */
export function groupOf(shot: Shot): ShotGroup {
  if (shot.category === "Mobile App") return "mobile";
  if (shot.category === "Web Dashboard") return "dashboard";
  return "web";
}

/** Category pill: blue for mobile apps, navy for web apps and dashboards. */
export function ShotCategoryPill({ shot, className }: { shot: Shot; className?: string }) {
  return (
    <span
      className={cn(
        "self-start rounded-[5px] px-[7px] py-[3px] text-[11px] font-bold lg:rounded-md lg:px-[9px] lg:py-1 lg:text-xs",
        groupOf(shot) === "mobile" ? "bg-blue-soft text-blue-ink" : "bg-band text-white",
        className
      )}
    >
      {shot.category}
    </span>
  );
}

/** Portfolio shot card: 4:3 screenshot, category, title and the first three tags. */
export function ShotCard({ shot, index }: { shot: Shot; index: number }) {
  return (
    <Link
      to={`/portfolio/${shot.id}`}
      className="group flex flex-col overflow-hidden rounded-[14px] border border-border bg-card text-foreground lg:rounded-[18px]"
    >
      <img
        src={shot.imgUrl}
        alt={`${shot.title} — screens`}
        width={800}
        height={600}
        loading={index < 3 ? "eager" : "lazy"}
        decoding="async"
        className="block aspect-[4/3] w-full bg-secondary object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />
      <div className="flex flex-col gap-1.5 p-3 pb-3.5 lg:gap-2.5 lg:px-[22px] lg:pb-[22px] lg:pt-5">
        <ShotCategoryPill shot={shot} />
        <h3 className="text-[15px] font-bold leading-[1.3] lg:text-[19px] lg:tracking-[-0.01em]">{shot.title}</h3>
        <span className="hidden text-sm text-muted-foreground lg:block">{shot.tags.slice(0, 3).join(" · ")}</span>
      </div>
    </Link>
  );
}
