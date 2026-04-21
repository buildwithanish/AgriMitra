import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { services } from "../data/marketing";
import AppLink from "./AppLink";

export default function ServicesSection() {
  return (
    <section className="section-shell pt-24" id="services">
      <SectionHeading
        eyebrow="Services"
        title="Agriculture product services designed like a modern SaaS portfolio"
        description="Each service tile is built to feel polished, scannable, and premium, while still pointing to practical farmer outcomes."
        align="center"
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className="group rounded-[30px] border border-white/60 bg-white/75 p-6 shadow-[0_24px_70px_rgba(7,23,15,0.1)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_35px_90px_rgba(7,23,15,0.14)] dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-gradient-to-br from-primary-500/15 to-accent-300/18 text-primary-700 dark:text-primary-300">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold text-slate-950 dark:text-white">{service.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{service.description}</p>
              <AppLink
                href="/features"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 transition group-hover:translate-x-1 dark:text-primary-300"
              >
                Learn more
                <ArrowRight className="h-4 w-4" />
              </AppLink>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
