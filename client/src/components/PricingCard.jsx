import { Check } from "lucide-react";
import GlassPanel from "./GlassPanel";

export default function PricingCard({ plan, onSelect }) {
  return (
    <GlassPanel
      className={`h-full p-7 ${
        plan.highlighted
          ? "border-primary-500/35 bg-gradient-to-br from-white/80 to-primary-50/70 dark:from-white/10 dark:to-primary-900/20"
          : ""
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary-700 dark:text-primary-300">
            {plan.name}
          </p>
          <div className="mt-4 flex items-end gap-2">
            <span className="font-display text-4xl font-bold text-slate-950 dark:text-white">{plan.price}</span>
            <span className="pb-1 text-slate-500 dark:text-slate-400">{plan.period}</span>
          </div>
        </div>
        {plan.highlighted && (
          <span className="rounded-full bg-primary-600 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
            Recommended
          </span>
        )}
      </div>

      <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-300">{plan.summary}</p>

      <div className="mt-6 space-y-3">
        {plan.features.map((item) => (
          <div key={item} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-200">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-500/12 text-primary-700 dark:text-primary-300">
              <Check className="h-4 w-4" />
            </span>
            {item}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onSelect(plan)}
        className={`mt-8 w-full rounded-2xl px-4 py-3 font-semibold transition ${
          plan.highlighted
            ? "bg-primary-600 text-white hover:bg-primary-500"
            : "border border-primary-500/20 bg-primary-500/10 text-primary-700 hover:bg-primary-500/15 dark:text-primary-200"
        }`}
      >
        {plan.highlighted ? "Start subscription" : "Talk to sales"}
      </button>
    </GlassPanel>
  );
}
