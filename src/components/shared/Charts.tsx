import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Sparkline — smooth area line for KPI cards                          */
/* ------------------------------------------------------------------ */
interface SparklineProps {
  data: number[];
  className?: string;
  stroke?: string;
  fill?: string;
  height?: number;
}

function buildPath(data: number[], w: number, h: number, pad = 2) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const step = (w - pad * 2) / (data.length - 1);
  return data.map((d, i) => {
    const x = pad + i * step;
    const y = h - pad - ((d - min) / range) * (h - pad * 2);
    return [x, y] as const;
  });
}

export function Sparkline({
  data,
  className,
  stroke = "url(#spark-stroke)",
  fill = "url(#spark-fill)",
  height = 48,
}: SparklineProps) {
  const w = 120;
  const points = buildPath(data, w, height);
  const line = points.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ");
  const area = `${line} L${points[points.length - 1][0]},${height} L${points[0][0]},${height} Z`;

  return (
    <svg
      viewBox={`0 0 ${w} ${height}`}
      preserveAspectRatio="none"
      className={cn("h-12 w-full", className)}
    >
      <defs>
        <linearGradient id="spark-stroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={fill} />
      <path
        d={line}
        fill="none"
        stroke={stroke}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Bar chart — animated columns                                        */
/* ------------------------------------------------------------------ */
interface BarChartProps {
  data: number[];
  className?: string;
  labels?: string[];
}

export function BarChart({ data, className, labels }: BarChartProps) {
  const max = Math.max(...data);
  return (
    <div className={cn("flex h-full items-end gap-1.5", className)}>
      {data.map((d, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
          <div
            className="w-full rounded-md bg-gradient-to-t from-indigo-500/80 to-cyan-400 transition-all duration-500"
            style={{ height: `${(d / max) * 100}%` }}
          />
          {labels && (
            <span className="text-[9px] text-muted-foreground">{labels[i]}</span>
          )}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Donut chart — single ring with percentage                          */
/* ------------------------------------------------------------------ */
interface DonutProps {
  value: number; // 0-100
  size?: number;
  label?: string;
  className?: string;
}

export function Donut({ value, size = 96, label, className }: DonutProps) {
  const stroke = 9;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;

  return (
    <div className={cn("relative inline-grid place-items-center", className)}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="donut-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="hsl(var(--secondary))"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#donut-grad)"
          strokeWidth={stroke}
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-lg font-bold">{value}%</span>
        {label && (
          <span className="text-[10px] text-muted-foreground">{label}</span>
        )}
      </div>
    </div>
  );
}
