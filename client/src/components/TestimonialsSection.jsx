import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { testimonials } from "../data/marketing";

export default function TestimonialsSection() {
  return (
    <section className="section-shell pt-24" id="testimonials">
      <SectionHeading
        eyebrow="Testimonials"
        title="Operators and agritech teams say it feels like a product, not a prototype"
        description="Designed to communicate trust, modernity, and operational readiness at first glance."
        align="center"
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {testimonials.map((item, index) => (
          <motion.article
            key={item.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.05 }}
            className="rounded-[30px] border border-white/60 bg-white/75 p-6 shadow-[0_24px_70px_rgba(7,23,15,0.1)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-primary-500/10 text-primary-700 dark:text-primary-300">
              <Quote className="h-5 w-5" />
            </div>
            <p className="mt-6 text-base leading-8 text-slate-700 dark:text-slate-200">{item.quote}</p>
            <div className="mt-6 border-t border-slate-200/70 pt-5 dark:border-white/10">
              <p className="font-display text-lg font-bold text-slate-950 dark:text-white">{item.name}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{item.role}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
