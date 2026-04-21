import {
  BarChart3,
  BellRing,
  CloudRainWind,
  Cpu,
  DatabaseZap,
  Home,
  IndianRupee,
  LayoutDashboard,
  LogOut,
  Mail,
  Radar,
  Settings2,
  Sparkles,
  Sprout,
  TrendingUp,
  Users,
  WalletCards,
  Wheat
} from "lucide-react";
import { Link } from "react-router-dom";

const farmerItems = [
  { label: "Overview", icon: LayoutDashboard, href: "#dashboard-overview" },
  { label: "AI Lab", icon: Sparkles, href: "#farmer-ai-lab" },
  { label: "22 Features", icon: DatabaseZap, href: "#farmer-features" },
  { label: "Crop Plan", icon: Wheat, href: "#farmer-crops" },
  { label: "Weather", icon: CloudRainWind, href: "#farmer-market" },
  { label: "Market", icon: TrendingUp, href: "#farmer-market" },
  { label: "Alerts", icon: BellRing, href: "#farmer-alerts" },
  { label: "Billing", icon: WalletCards, href: "#farmer-billing" }
];

const adminItems = [
  { label: "Overview", icon: LayoutDashboard, href: "#admin-overview" },
  { label: "Analytics", icon: BarChart3, href: "#admin-analytics" },
  { label: "Users", icon: Users, href: "#admin-users" },
  { label: "Sensors", icon: Radar, href: "#admin-sensors" },
  { label: "AI Runs", icon: Cpu, href: "#admin-ai" },
  { label: "Revenue", icon: IndianRupee, href: "#admin-revenue" },
  { label: "Leads", icon: Mail, href: "#admin-leads" },
  { label: "Settings", icon: Settings2, href: "#admin-settings" }
];

const farmerShortcuts = ["Crop AI", "Pest scan", "Mandi price", "WhatsApp AI", "Insurance"];
const adminShortcuts = ["Revenue", "Sensors", "Users", "Leads", "AI quality"];

export default function Sidebar({ role = "farmer", user, onLogout }) {
  const items = role === "admin" ? adminItems : farmerItems;
  const shortcuts = role === "admin" ? adminShortcuts : farmerShortcuts;

  return (
    <aside className="glass-panel flex flex-col overflow-hidden rounded-[30px] p-4 lg:sticky lg:top-6 lg:min-h-[calc(100vh-3rem)]">
      <Link
        to="/"
        className="group rounded-[24px] bg-gradient-to-br from-primary-600 to-primary-800 p-5 text-white transition hover:-translate-y-0.5"
        title="Back to AI Village Brain website"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-white/14">
            <Sprout className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-primary-100/75">{role}</p>
            <p className="text-xs font-semibold text-primary-100/70 transition group-hover:text-white">
              Click logo/card to website
            </p>
          </div>
        </div>
        <h2 className="mt-4 font-display text-2xl font-bold">{user?.name || "Village Operator"}</h2>
        <p className="mt-2 break-all text-sm text-primary-100/80">{user?.email}</p>
      </Link>

      <nav className="mt-5 flex gap-3 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <a
              key={`${role}-${item.label}`}
              href={item.href}
              className="inline-flex min-w-max items-center gap-3 rounded-2xl bg-slate-100/80 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:bg-primary-600 hover:text-white dark:bg-white/5 dark:text-slate-200 dark:hover:bg-primary-600"
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </a>
          );
        })}
      </nav>

      <div className="mt-5 hidden rounded-[24px] border border-primary-500/15 bg-primary-500/10 p-4 lg:block">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-700 dark:text-primary-300">
          Quick access
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {shortcuts.map((item) => (
            <span
              key={item}
              className="rounded-full bg-white/70 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:bg-white/8 dark:text-slate-200"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto grid gap-3 pt-5">
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-primary-500/20 bg-white/70 px-4 py-3 text-sm font-semibold text-primary-700 transition hover:bg-primary-500/10 dark:bg-white/5 dark:text-primary-200"
        >
          <Home className="h-4 w-4" />
          Website
        </Link>
      <button
        type="button"
        onClick={onLogout}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-red-500/15 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-500/15 dark:text-red-300"
      >
          <LogOut className="h-4 w-4" />
        Logout
      </button>
      </div>
    </aside>
  );
}
