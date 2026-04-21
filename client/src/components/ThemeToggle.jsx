import { MoonStar, SunMedium } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/40 bg-white/70 text-slate-700 shadow-lg shadow-primary-950/5 backdrop-blur-xl transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/5 dark:text-slate-100"
      aria-label="Toggle dark mode"
    >
      {theme === "dark" ? <SunMedium className="h-5 w-5" /> : <MoonStar className="h-5 w-5" />}
    </button>
  );
}
