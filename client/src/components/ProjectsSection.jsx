import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { projectShowcase } from "../data/marketing";

export default function ProjectsSection() {
  return (
    <section className="section-shell pt-24" id="projects">
      <SectionHeading
        eyebrow="Projects"
        title="Showcase deployments and premium rollout stories with real visual weight"
        description="A visual section for pilots, cluster programs, and analytics-driven project outcomes so the site feels complete and product-grade."
        align="center"
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {projectShowcase.map((project, index) => {
          const Icon = project.icon;

          return (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="group overflow-hidden rounded-[30px] border border-white/60 bg-white/75 shadow-[0_24px_70px_rgba(7,23,15,0.1)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-800">
                  <Icon className="h-3.5 w-3.5" />
                  {project.metric}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-2xl font-bold text-slate-950 dark:text-white">{project.title}</h3>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200/80 bg-white text-slate-700 transition group-hover:-translate-y-0.5 group-hover:border-primary-400/35 group-hover:text-primary-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-100">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{project.description}</p>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
