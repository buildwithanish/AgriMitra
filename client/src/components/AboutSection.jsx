import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import GlassPanel from "./GlassPanel";
import SectionHeading from "./SectionHeading";
import { aboutHighlights } from "../data/marketing";

export default function AboutSection() {
  return (
    <section className="section-shell pt-16" id="about">
      <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
        >
          <SectionHeading
            eyebrow="About AI Village Brain"
            title="A premium agriculture platform designed to look boardroom-ready and work field-first"
            description="Inspired by the polish of leading startup websites, but grounded in real village operations, farm data, and grower outcomes."
          />

          <div className="mt-8 space-y-4">
            {aboutHighlights.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-[24px] border border-slate-200/70 bg-white/80 p-4 dark:border-white/10 dark:bg-white/5">
                <CheckCircle2 className="mt-1 h-5 w-5 text-primary-600" />
                <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, delay: 0.08 }}
        >
          <GlassPanel className="relative overflow-hidden rounded-[34px] p-8">
            <div className="hero-orb -right-6 top-2 h-44 w-44 bg-primary-500/14" />
            <div className="hero-orb -left-8 bottom-0 h-40 w-40 bg-accent-400/10" />

            <div className="relative z-10">
              <div className="rounded-[28px] bg-gradient-to-br from-primary-700 to-primary-950 p-6 text-white">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-primary-100/70">Why teams switch</p>
                    <h3 className="mt-3 font-display text-3xl font-bold">Modern SaaS clarity for agriculture operations</h3>
                  </div>
                  <Sparkles className="h-6 w-6 text-accent-300" />
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {[
                    ["Analytics", "Live"],
                    ["Interfaces", "Responsive"],
                    ["Automation", "Built-in"]
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-white/10 bg-white/8 p-4">
                      <p className="text-xs uppercase tracking-[0.16em] text-primary-100/60">{label}</p>
                      <p className="mt-2 text-lg font-bold">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[24px] border border-slate-200/70 bg-white/80 p-5 dark:border-white/10 dark:bg-white/5">
                  <p className="text-xs uppercase tracking-[0.18em] text-primary-700 dark:text-primary-300">Signal Layer</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    Sensor intelligence, market data, weather, and remote monitoring stitched into one elegant workflow.
                  </p>
                </div>
                <div className="rounded-[24px] border border-slate-200/70 bg-white/80 p-5 dark:border-white/10 dark:bg-white/5">
                  <p className="text-xs uppercase tracking-[0.18em] text-primary-700 dark:text-primary-300">Outcome Layer</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    Translate field signals into crop choices, yield forecasts, and stronger income decisions.
                  </p>
                </div>
              </div>

              <a
                href="/#services"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 transition hover:text-primary-600 dark:text-primary-300"
              >
                Explore platform services
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </GlassPanel>
        </motion.div>
      </div>
    </section>
  );
}
