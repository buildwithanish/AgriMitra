import { motion } from "framer-motion";

export default function SectionHeading({ eyebrow, title, description, align = "left" }) {
  const alignment = align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl";

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6 }}
      className={alignment}
    >
      {eyebrow && (
        <span className="inline-flex rounded-full border border-primary-500/20 bg-primary-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary-700 dark:text-primary-300">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">{description}</p>
      )}
    </motion.div>
  );
}
