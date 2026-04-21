import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { highlightedFeatures } from "../data/marketing";

export default function Features() {
  return (
    <section className="section-shell pt-24" id="features">
      <SectionHeading
        eyebrow="AI Feature Stack"
        title="Built for modern farm intelligence across advice, monitoring, and automation"
        description="A refined product surface that turns advanced agriculture capabilities into clear, usable workflows."
        align="center"
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {highlightedFeatures.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className="group rounded-[30px] border border-white/60 bg-white/75 p-6 shadow-[0_24px_70px_rgba(7,23,15,0.1)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_35px_90px_rgba(7,23,15,0.14)] dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-gradient-to-br from-primary-500/15 to-accent-400/20 text-primary-700 dark:text-primary-300">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="rounded-full border border-primary-500/15 bg-primary-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-700 dark:text-primary-200">
                  AI Module
                </span>
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold text-slate-950 dark:text-white">{feature.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{feature.description}</p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
