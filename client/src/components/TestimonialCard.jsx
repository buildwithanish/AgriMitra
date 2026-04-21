import { Quote } from "lucide-react";
import GlassPanel from "./GlassPanel";

export default function TestimonialCard({ item }) {
  return (
    <GlassPanel className="h-full p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-primary-500/10 text-primary-700 dark:text-primary-300">
        <Quote className="h-5 w-5" />
      </div>
      <p className="mt-5 text-base leading-8 text-slate-700 dark:text-slate-200">{item.quote}</p>
      <div className="mt-6 border-t border-slate-200/70 pt-5 dark:border-white/10">
        <p className="font-display text-lg font-bold text-slate-950 dark:text-white">{item.name}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">{item.role}</p>
      </div>
    </GlassPanel>
  );
}
