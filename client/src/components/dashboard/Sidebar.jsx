import { BarChart3, BellRing, LayoutDashboard, Settings2, Sparkles, WalletCards } from "lucide-react";
import { NavLink } from "react-router-dom";

const farmerItems = [
  { label: "Overview", icon: LayoutDashboard, to: "/dashboard" },
  { label: "AI Lab", icon: Sparkles, to: "/dashboard" },
  { label: "Alerts", icon: BellRing, to: "/dashboard" },
  { label: "Billing", icon: WalletCards, to: "/dashboard" }
];

const adminItems = [
  { label: "Analytics", icon: BarChart3, to: "/admin" },
  { label: "Operations", icon: LayoutDashboard, to: "/admin" },
  { label: "Sensors", icon: BellRing, to: "/admin" },
  { label: "Settings", icon: Settings2, to: "/admin" }
];

export default function Sidebar({ role = "farmer", user, onLogout }) {
  const items = role === "admin" ? adminItems : farmerItems;

  return (
    <aside className="glass-panel flex flex-col rounded-[30px] p-4 lg:min-h-[calc(100vh-3rem)]">
      <div className="rounded-[24px] bg-gradient-to-br from-primary-600 to-primary-800 p-5 text-white">
        <p className="text-sm uppercase tracking-[0.22em] text-primary-100/75">{role}</p>
        <h2 className="mt-3 font-display text-2xl font-bold">{user?.name || "Village Operator"}</h2>
        <p className="mt-2 text-sm text-primary-100/80">{user?.email}</p>
      </div>

      <nav className="mt-5 flex gap-3 overflow-x-auto pb-1 lg:flex-1 lg:flex-col">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={`${role}-${item.label}`}
              to={item.to}
              className={({ isActive }) =>
                `inline-flex min-w-max items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "bg-primary-600 text-white shadow-glow"
                    : "bg-slate-100/80 text-slate-700 hover:bg-primary-500/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={onLogout}
        className="mt-6 rounded-2xl border border-primary-500/20 bg-primary-500/10 px-4 py-3 text-sm font-semibold text-primary-700 transition hover:bg-primary-500/15 dark:text-primary-200"
      >
        Logout
      </button>
    </aside>
  );
}
