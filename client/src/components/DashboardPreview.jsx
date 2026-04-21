import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import GlassPanel from "./GlassPanel";
import SectionHeading from "./SectionHeading";
import { dashboardPreviewCharts, dashboardPreviewMetrics } from "../data/marketing";

export default function DashboardPreview() {
  return (
    <section className="section-shell pt-24" id="dashboard-preview">
      <SectionHeading
        eyebrow="Dashboard Preview"
        title="A polished analytics surface for growers, operators, and village teams"
        description="Styled to feel like a funded startup product: clean charts, layered cards, and premium spacing."
        align="center"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45 }}
        className="mt-12"
      >
        <GlassPanel className="overflow-hidden rounded-[36px] p-6 sm:p-8">
          <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
            <div className="space-y-6">
              <div className="rounded-[28px] bg-gradient-to-br from-primary-800 via-primary-700 to-primary-950 p-6 text-white">
                <p className="text-xs uppercase tracking-[0.22em] text-primary-100/70">Operator cockpit</p>
                <h3 className="mt-3 font-display text-3xl font-bold">Portfolio visibility without the clutter</h3>
                <p className="mt-4 text-sm leading-7 text-primary-50/80">
                  Live growth indicators, advisories, weather signals, and revenue intelligence in one place.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {dashboardPreviewMetrics.map((metric) => (
                  <div key={metric.label} className="rounded-[24px] border border-slate-200/70 bg-white/80 p-5 dark:border-white/10 dark:bg-white/5">
                    <p className="text-sm text-slate-500 dark:text-slate-400">{metric.label}</p>
                    <p className="mt-3 font-display text-3xl font-bold text-slate-950 dark:text-white">{metric.value}</p>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary-700 dark:text-primary-300">
                      {metric.delta}
                    </p>
                  </div>
                ))}
              </div>

              <div className="rounded-[28px] border border-slate-200/70 bg-white/80 p-5 dark:border-white/10 dark:bg-white/5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-primary-700 dark:text-primary-300">
                      Advisory feed
                    </p>
                    <h4 className="mt-2 font-display text-2xl font-bold text-slate-950 dark:text-white">Latest recommendations</h4>
                  </div>
                  <span className="rounded-full bg-primary-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-700 dark:text-primary-300">
                    Live
                  </span>
                </div>
                <div className="mt-4 space-y-3">
                  {[
                    "Fertilizer optimization can reduce input cost by 11%",
                    "Pest pressure expected to remain moderate through Thursday",
                    "Sell window for tomato likely strongest in 3 to 5 days"
                  ].map((item) => (
                    <div key={item} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:bg-white/5 dark:text-slate-300">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[28px] border border-slate-200/70 bg-white/85 p-5 dark:border-white/10 dark:bg-white/5">
                <div className="mb-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-primary-700 dark:text-primary-300">Income outlook</p>
                  <h4 className="mt-2 font-display text-2xl font-bold text-slate-950 dark:text-white">Revenue trend by cluster</h4>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={dashboardPreviewCharts.revenue}>
                      <defs>
                        <linearGradient id="previewRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#349e61" stopOpacity={0.75} />
                          <stop offset="100%" stopColor="#349e61" stopOpacity={0.08} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.18)" />
                      <XAxis dataKey="week" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip />
                      <Area type="monotone" dataKey="value" stroke="#349e61" fill="url(#previewRevenue)" strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200/70 bg-white/85 p-5 dark:border-white/10 dark:bg-white/5">
                <div className="mb-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-primary-700 dark:text-primary-300">Market timing</p>
                  <h4 className="mt-2 font-display text-2xl font-bold text-slate-950 dark:text-white">Mandi price movement</h4>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dashboardPreviewCharts.market}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.18)" />
                      <XAxis dataKey="day" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip />
                      <Bar dataKey="price" fill="#f3b300" radius={[10, 10, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </GlassPanel>
      </motion.div>
    </section>
  );
}
