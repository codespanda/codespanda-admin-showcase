import {
  LayoutDashboard,
  Wallet,
  Users,
  Boxes,
  FolderKanban,
  Settings,
  Bell,
  Search,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  CalendarDays,
} from "lucide-react";
import { BarChart, Sparkline, Donut } from "./Charts";
import { cn } from "@/lib/utils";

const SIDEBAR = [
  { icon: LayoutDashboard, label: "Overview", active: true },
  { icon: Wallet, label: "Finance" },
  { icon: Users, label: "CRM" },
  { icon: Boxes, label: "Inventory" },
  { icon: FolderKanban, label: "Projects" },
];

const KPIS = [
  { label: "Revenue", value: "$842.5K", change: "+18.4%", up: true },
  { label: "Expenses", value: "$318.2K", change: "-6.2%", up: false },
  { label: "Profit", value: "$524.3K", change: "+24.1%", up: true },
  { label: "Orders", value: "12,840", change: "+9.5%", up: true },
];

const TRANSACTIONS = [
  { name: "Acme Corp", tag: "Invoice #2841", amount: "+$12,400", up: true },
  { name: "Payroll — June", tag: "42 employees", amount: "-$84,200", up: false },
  { name: "Globex Ltd", tag: "Invoice #2840", amount: "+$8,150", up: true },
  { name: "AWS Cloud", tag: "Subscription", amount: "-$2,310", up: false },
];

const BARS = [42, 58, 47, 65, 72, 60, 80, 74, 90, 84, 96, 100];
const MONTHS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

/**
 * A self-contained, CSS/SVG-rendered admin dashboard mockup.
 * No images required — everything is drawn with Tailwind + inline SVG.
 */
export function DashboardMockup({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-full w-full overflow-hidden rounded-xl bg-card text-card-foreground",
        className
      )}
    >
      {/* Sidebar */}
      <aside className="hidden w-44 shrink-0 flex-col gap-1 border-r border-border bg-secondary/40 p-3 sm:flex">
        <div className="mb-4 flex items-center gap-2 px-1">
          <div className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 text-xs font-bold text-white">
            N
          </div>
          <span className="text-sm font-bold">CodesPanda</span>
        </div>
        {SIDEBAR.map(({ icon: Icon, label, active }) => (
          <div
            key={label}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium",
              active
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </div>
        ))}
        <div className="mt-auto flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium text-muted-foreground">
          <Settings className="h-4 w-4" />
          Settings
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
          <div>
            <p className="text-sm font-bold">Good morning, Alex 👋</p>
            <p className="text-[11px] text-muted-foreground">
              Here's your business at a glance
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-lg border border-border bg-secondary/50 px-2.5 py-1.5 md:flex">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-[11px] text-muted-foreground">Search…</span>
            </div>
            <div className="relative grid h-8 w-8 place-items-center rounded-lg border border-border">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-rose-500" />
            </div>
            <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 text-[11px] font-bold text-white">
              AX
            </div>
          </div>
        </header>

        {/* Body */}
        <div className="grid flex-1 grid-cols-1 gap-3 overflow-hidden p-4 lg:grid-cols-3">
          {/* KPI cards */}
          <div className="col-span-1 grid grid-cols-2 gap-3 lg:col-span-3">
            {KPIS.map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-xl border border-border bg-card p-3"
              >
                <p className="text-[11px] text-muted-foreground">{kpi.label}</p>
                <p className="mt-1 text-base font-bold sm:text-lg">{kpi.value}</p>
                <div
                  className={cn(
                    "mt-1 inline-flex items-center gap-1 text-[10px] font-semibold",
                    kpi.up ? "text-emerald-500" : "text-rose-500"
                  )}
                >
                  {kpi.up ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {kpi.change}
                </div>
              </div>
            ))}
          </div>

          {/* Revenue chart */}
          <div className="col-span-1 rounded-xl border border-border bg-card p-4 lg:col-span-2">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold">Revenue Analytics</p>
                <p className="text-[10px] text-muted-foreground">
                  Last 12 months
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-500">
                <ArrowUpRight className="h-3 w-3" /> 18.4%
              </span>
            </div>
            <div className="h-28">
              <BarChart data={BARS} labels={MONTHS} />
            </div>
          </div>

          {/* Goal donut */}
          <div className="col-span-1 flex flex-col items-center justify-center rounded-xl border border-border bg-card p-4">
            <p className="mb-2 self-start text-xs font-semibold">
              Quarterly Goal
            </p>
            <Donut value={78} label="achieved" />
            <p className="mt-2 text-center text-[10px] text-muted-foreground">
              $524K of $670K target
            </p>
          </div>

          {/* Transactions */}
          <div className="col-span-1 rounded-xl border border-border bg-card p-4 lg:col-span-2">
            <p className="mb-3 text-xs font-semibold">Recent Transactions</p>
            <div className="space-y-2.5">
              {TRANSACTIONS.map((t) => (
                <div key={t.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={cn(
                        "grid h-7 w-7 place-items-center rounded-lg text-[10px] font-bold",
                        t.up
                          ? "bg-emerald-500/10 text-emerald-500"
                          : "bg-rose-500/10 text-rose-500"
                      )}
                    >
                      {t.up ? "↑" : "↓"}
                    </div>
                    <div>
                      <p className="text-[11px] font-medium leading-tight">
                        {t.name}
                      </p>
                      <p className="text-[10px] text-muted-foreground">{t.tag}</p>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "text-[11px] font-semibold",
                      t.up ? "text-emerald-500" : "text-foreground"
                    )}
                  >
                    {t.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Mini stats + calendar */}
          <div className="col-span-1 flex flex-col gap-3">
            <div className="rounded-xl border border-border bg-card p-3">
              <div className="mb-1 flex items-center justify-between">
                <p className="text-[11px] font-semibold">Active Users</p>
                <span className="text-[10px] font-semibold text-emerald-500">
                  +12.9%
                </span>
              </div>
              <p className="text-base font-bold">48,210</p>
              <Sparkline data={[45, 50, 55, 53, 60, 66, 70, 74, 79, 96]} />
            </div>
            <div className="flex items-center gap-2.5 rounded-xl border border-border bg-card p-3">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
                <CalendarDays className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[11px] font-semibold">Team Sync</p>
                <p className="text-[10px] text-muted-foreground">
                  Today · 2:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
