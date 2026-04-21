import { Bell, Search, Sparkles } from "lucide-react";
import ThemeToggle from "../ThemeToggle";
import LanguageToggle from "../LanguageToggle";
import VoiceInputButton from "../VoiceInputButton";

export default function TopBar({
  title,
  subtitle,
  onVoiceInput,
  voiceQuery,
  notificationCount = 0
}) {
  return (
    <div className="glass-panel rounded-[30px] p-5">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-primary-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-primary-700 dark:text-primary-300">
            <Sparkles className="h-3.5 w-3.5" />
            Live command center
          </p>
          <h1 className="mt-4 font-display text-3xl font-bold text-slate-950 dark:text-white">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">{subtitle}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white/80 px-4 py-3 text-sm text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
            <Search className="h-4 w-4 text-primary-600" />
            <span>{voiceQuery || "Try: show market trend for tomato"}</span>
          </div>
          <VoiceInputButton compact onTranscript={onVoiceInput} />
          <LanguageToggle />
          <ThemeToggle />
          <div className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200/70 bg-white/80 text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-white">
            <Bell className="h-4 w-4" />
            <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-accent-500 px-1 text-[10px] font-bold text-slate-950">
              {notificationCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
