export default function MetricCard({ label, value, delta, tone = "default" }) {
  const toneMap = {
    default: "from-white to-primary-50 dark:from-white/8 dark:to-white/5",
    accent: "from-accent-50 to-white dark:from-accent-500/12 dark:to-white/5",
    success: "from-primary-50 to-white dark:from-primary-500/12 dark:to-white/5"
  };

  return (
    <div
      className={`glass-panel rounded-[28px] bg-gradient-to-br p-5 ${
        toneMap[tone] || toneMap.default
      }`}
    >
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
      <div className="mt-3 flex items-end justify-between gap-4">
        <p className="font-display text-3xl font-bold text-slate-950 dark:text-white">{value}</p>
        <span className="rounded-full bg-primary-500/10 px-3 py-1 text-xs font-semibold text-primary-700 dark:text-primary-300">
          {delta}
        </span>
      </div>
    </div>
  );
}
