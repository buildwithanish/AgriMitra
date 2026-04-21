import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { LayoutDashboard, Menu, Sprout, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useAuth } from "../contexts/AuthContext";

const links = [
  { to: "/", label: "nav.home" },
  { to: "/features", label: "nav.features" },
  { to: "/#about", label: "nav.about" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="section-shell pt-5">
        <div className="glass-panel flex items-center justify-between rounded-[26px] px-5 py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-glow">
              <Sprout className="h-5 w-5" />
            </div>
            <div>
              <p className="font-display text-lg font-bold text-slate-950 dark:text-white">AI Village Brain</p>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                Smart agriculture OS
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {links.map((link) =>
              link.to.includes("#") ? (
                <a
                  key={link.to}
                  href={link.to}
                  className="text-sm font-semibold text-slate-600 transition hover:text-primary-700 dark:text-slate-300 dark:hover:text-primary-300"
                >
                  {t(link.label)}
                </a>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `text-sm font-semibold transition ${
                      isActive
                        ? "text-primary-700 dark:text-primary-300"
                        : "text-slate-600 hover:text-primary-700 dark:text-slate-300 dark:hover:text-primary-300"
                    }`
                  }
                >
                  {t(link.label)}
                </NavLink>
              )
            )}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <LanguageToggle />
            <ThemeToggle />
            <Link
              to={user ? (user.role === "admin" ? "/admin" : "/dashboard") : "/login"}
              className="inline-flex items-center gap-2 rounded-2xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-primary-500"
            >
              <LayoutDashboard className="h-4 w-4" />
              {user ? t("nav.dashboard") : t("nav.login")}
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/50 bg-white/80 text-slate-700 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:text-white lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="section-shell pt-3 lg:hidden"
          >
            <div className="glass-panel space-y-4 rounded-[26px] p-5">
              {links.map((link) =>
                link.to.includes("#") ? (
                  <a
                    key={link.to}
                    href={link.to}
                    onClick={() => setOpen(false)}
                    className="block text-sm font-semibold text-slate-700 dark:text-slate-200"
                  >
                    {t(link.label)}
                  </a>
                ) : (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className="block text-sm font-semibold text-slate-700 dark:text-slate-200"
                  >
                    {t(link.label)}
                  </NavLink>
                )
              )}
              <div className="flex items-center gap-3">
                <LanguageToggle />
                <ThemeToggle />
              </div>
              <Link
                to={user ? (user.role === "admin" ? "/admin" : "/dashboard") : "/login"}
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-2xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white"
              >
                {user ? t("nav.dashboard") : t("nav.login")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
