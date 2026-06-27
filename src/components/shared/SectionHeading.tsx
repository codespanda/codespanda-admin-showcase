import { Badge } from "@/components/ui/badge";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "center" | "left";
}

/** Shared eyebrow + title + description block for section headers. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "center",
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "mx-auto max-w-2xl",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <Badge variant="gradient" className="mb-4">
          {eyebrow}
        </Badge>
      )}
      <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.6rem] md:leading-[1.1]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-pretty text-base text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </Reveal>
  );
}
