import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Clock3,
  Mail,
  Menu,
  ShoppingCart,
  Sprout,
  X
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { headerNavigation, topBarInfo } from "../data/marketing";

function DesktopLink({ item }) {
  return (
    <a
      href={item.href}
      className="inline-flex items-center text-sm font-semibold text-slate-700 transition hover:text-primary-700 dark:text-slate-200 dark:hover:text-primary-300"
    >
      {item.label}
    </a>
  );
}

function MegaMenu({ item, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2 }}
      className="absolute left-1/2 top-full z-50 mt-5 w-[min(92vw,900px)] -translate-x-1/2 rounded-[30px] border border-white/70 bg-white/92 p-6 shadow-[0_30px_80px_rgba(7,23,15,0.14)] backdrop-blur-2xl dark:border-white/10 dark:bg-primary-950/92"
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          {item.sections.map((section) => (
            <div key={section.title} className="rounded-[24px] border border-slate-200/70 bg-white/70 p-5 dark:border-white/10 dark:bg-white/5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-700 dark:text-primary-300">
                {section.title}
              </p>
              <div className="mt-4 space-y-3">
                {section.items.map((entry) => (
                  <a
                    key={entry.label}
                    href={entry.href}
                    onClick={onClose}
                    className="group block rounded-2xl px-3 py-3 transition hover:bg-primary-500/8"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-slate-900 dark:text-white">{entry.label}</p>
                      <ArrowRight className="h-4 w-4 text-primary-600 opacity-0 transition group-hover:opacity-100" />
                    </div>
                    <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">{entry.description}</p>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-primary-700 via-primary-800 to-primary-950 p-6 text-white">
          <div className="absolute -right-12 top-0 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-accent-400/15 blur-3xl" />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-primary-100/70">Featured</p>
            <h3 className="mt-4 font-display text-3xl font-bold leading-tight">{item.spotlight.title}</h3>
            <p className="mt-4 text-sm leading-7 text-primary-50/78">{item.spotlight.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {item.spotlight.chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white"
                >
                  {chip}
                </span>
              ))}
            </div>
            <a
              href="/#about"
              onClick={onClose}
              className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 font-semibold text-primary-900 transition hover:-translate-y-0.5"
            >
              Learn more
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function DropdownMenu({ item, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2 }}
      className="absolute left-1/2 top-full z-50 mt-5 w-[min(92vw,560px)] -translate-x-1/2 rounded-[28px] border border-white/70 bg-white/92 p-5 shadow-[0_30px_80px_rgba(7,23,15,0.14)] backdrop-blur-2xl dark:border-white/10 dark:bg-primary-950/92"
    >
      <div className="grid gap-4 md:grid-cols-2">
        {item.groups.map((group) => (
          <div key={group.title} className="rounded-[22px] border border-slate-200/70 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-700 dark:text-primary-300">
              {group.title}
            </p>
            <div className="mt-4 space-y-3">
              {group.items.map((entry) =>
                entry.children ? (
                  <div key={entry.label} className="rounded-2xl bg-slate-50/80 p-3 dark:bg-white/4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-slate-900 dark:text-white">{entry.label}</p>
                      <ChevronRight className="h-4 w-4 text-primary-600 dark:text-primary-300" />
                    </div>
                    <div className="mt-3 space-y-2 pl-1">
                      {entry.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          onClick={onClose}
                          className="group flex items-center justify-between rounded-xl px-2 py-2 text-sm text-slate-600 transition hover:bg-primary-500/8 hover:text-primary-700 dark:text-slate-300 dark:hover:text-primary-200"
                        >
                          <span>{child.label}</span>
                          <ArrowRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <a
                    key={entry.label}
                    href={entry.href}
                    onClick={onClose}
                    className="group flex items-center justify-between rounded-2xl px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-primary-500/8 hover:text-primary-700 dark:text-slate-200 dark:hover:text-primary-200"
                  >
                    <span>{entry.label}</span>
                    <ArrowRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
                  </a>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function MobileMenuItem({ item, openItem, setOpenItem, onNavigate }) {
  const expanded = openItem === item.label;

  if (item.type === "link") {
    return (
      <a
        href={item.href}
        onClick={onNavigate}
        className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-4 text-sm font-semibold text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-white"
      >
        <span>{item.label}</span>
        <ArrowRight className="h-4 w-4 text-primary-600" />
      </a>
    );
  }

  const items =
    item.type === "mega"
      ? item.sections.flatMap((section) => section.items)
      : item.groups.flatMap((group) => group.items);

  return (
    <div className="rounded-[24px] border border-slate-200/80 bg-white/80 p-2 dark:border-white/10 dark:bg-white/5">
      <button
        type="button"
        onClick={() => setOpenItem(expanded ? "" : item.label)}
        className="flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left text-sm font-semibold text-slate-800 dark:text-white"
      >
        <span>{item.label}</span>
        <ChevronDown className={`h-4 w-4 transition ${expanded ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="space-y-2 px-2 pb-2">
              {items.map((entry) =>
                entry.children ? (
                  <div key={entry.label} className="rounded-2xl bg-slate-50/80 p-3 dark:bg-white/4">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{entry.label}</p>
                    <div className="mt-2 space-y-2 pl-2">
                      {entry.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          onClick={onNavigate}
                          className="block rounded-xl px-2 py-2 text-sm text-slate-600 transition hover:bg-primary-500/8 hover:text-primary-700 dark:text-slate-300 dark:hover:text-primary-200"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <a
                    key={entry.label}
                    href={entry.href}
                    onClick={onNavigate}
                    className="block rounded-2xl px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-primary-500/8 hover:text-primary-700 dark:text-slate-300 dark:hover:text-primary-200"
                  >
                    {entry.label}
                  </a>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Header() {
  const location = useLocation();
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState("");
  const [openItem, setOpenItem] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpenMenu("");
    setMobileOpen(false);
    setOpenItem("");
  }, [location.pathname, location.hash]);

  const workspaceHref = user ? (user.role === "admin" ? "/admin" : "/dashboard") : "/login";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="hidden border-b border-white/50 bg-white/80 backdrop-blur-xl md:block dark:border-white/10 dark:bg-primary-950/85">
        <div className="section-shell flex items-center justify-between gap-4 py-3 text-sm">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <span className="font-medium">{topBarInfo.message}</span>
            <a href="/#contact" className="font-semibold text-primary-700 transition hover:text-primary-600 dark:text-primary-300">
              Contact Us
            </a>
          </div>
          <div className="flex items-center gap-5 text-slate-500 dark:text-slate-400">
            <a href={`mailto:${topBarInfo.email}`} className="inline-flex items-center gap-2 transition hover:text-primary-700 dark:hover:text-primary-300">
              <Mail className="h-4 w-4 text-primary-600 dark:text-primary-300" />
              {topBarInfo.email}
            </a>
            <span className="inline-flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-primary-600 dark:text-primary-300" />
              {topBarInfo.hours}
            </span>
          </div>
        </div>
      </div>

      <div className="section-shell pt-3 md:pt-4">
        <div
          className={`relative rounded-[30px] border transition duration-300 ${
            scrolled
              ? "border-white/70 bg-white/88 shadow-[0_24px_70px_rgba(7,23,15,0.12)] backdrop-blur-2xl dark:border-white/10 dark:bg-primary-950/88"
              : "border-white/50 bg-white/78 backdrop-blur-2xl dark:border-white/10 dark:bg-primary-950/78"
          }`}
        >
          <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-5 lg:px-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-glow">
                <Sprout className="h-5 w-5" />
              </div>
              <div>
                <p className="font-display text-lg font-bold text-slate-950 dark:text-white">AI Village Brain</p>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                  Smart Farming Intelligence
                </p>
              </div>
            </Link>

            <nav className="hidden items-center gap-2 xl:flex">
              {headerNavigation.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.type !== "link" && setOpenMenu(item.label)}
                  onMouseLeave={() => item.type !== "link" && setOpenMenu("")}
                >
                  {item.type === "link" ? (
                    <DesktopLink item={item} />
                  ) : (
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 rounded-2xl px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-primary-500/8 hover:text-primary-700 dark:text-slate-200 dark:hover:bg-white/5 dark:hover:text-primary-300"
                    >
                      {item.label}
                      <ChevronDown className={`h-4 w-4 transition ${openMenu === item.label ? "rotate-180" : ""}`} />
                    </button>
                  )}

                  <AnimatePresence>
                    {openMenu === item.label &&
                      (item.type === "mega" ? (
                        <MegaMenu item={item} onClose={() => setOpenMenu("")} />
                      ) : (
                        <DropdownMenu item={item} onClose={() => setOpenMenu("")} />
                      ))}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            <div className="hidden items-center gap-3 xl:flex">
              <button
                type="button"
                className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200/80 bg-white/80 text-slate-700 transition hover:-translate-y-0.5 hover:border-primary-400/35 hover:text-primary-700 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:text-primary-300"
                aria-label="Cart"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-primary-600 px-1 text-[10px] font-bold text-white">
                  2
                </span>
              </button>
              <Link
                to={workspaceHref}
                className="inline-flex items-center gap-2 rounded-2xl bg-primary-600 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-primary-500"
              >
                Start Growing Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen((current) => !current)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200/80 bg-white/80 text-slate-700 transition hover:text-primary-700 xl:hidden dark:border-white/10 dark:bg-white/5 dark:text-white"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="border-t border-slate-200/80 px-4 pb-4 pt-4 dark:border-white/10 xl:hidden"
              >
                <div className="space-y-3">
                  {headerNavigation.map((item) => (
                    <MobileMenuItem
                      key={item.label}
                      item={item}
                      openItem={openItem}
                      setOpenItem={setOpenItem}
                      onNavigate={() => {
                        setMobileOpen(false);
                        setOpenItem("");
                      }}
                    />
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between gap-3 rounded-[24px] bg-primary-500/10 p-3">
                  <div className="flex items-center gap-3">
                    <div className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-800">
                      <ShoppingCart className="h-5 w-5" />
                      <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-primary-600 px-1 text-[10px] font-bold text-white">
                        2
                      </span>
                    </div>
                    <div className="text-sm">
                      <p className="font-semibold text-slate-900 dark:text-white">Need a custom rollout?</p>
                      <p className="text-slate-500 dark:text-slate-400">Talk to our agriculture product team.</p>
                    </div>
                  </div>
                </div>

                <Link
                  to={workspaceHref}
                  onClick={() => setMobileOpen(false)}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary-600 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-primary-500"
                >
                  Start Growing Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
