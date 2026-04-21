import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { teamMembers } from "../data/marketing";

export default function Team() {
  return (
    <section className="section-shell pt-24" id="team">
      <SectionHeading
        eyebrow="Our Team"
        title="The people building the future of village-scale agriculture intelligence"
        description="A multidisciplinary team spanning agronomy, AI, product design, and rural operations."
        align="center"
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
        {teamMembers.map((member, index) => (
          <motion.article
            key={member.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.06 }}
            className="group overflow-hidden rounded-[30px] border border-white/60 bg-white/75 shadow-[0_24px_70px_rgba(7,23,15,0.1)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5"
          >
            <div className="relative h-[320px] overflow-hidden">
              <img
                src={member.image}
                alt={member.name}
                loading="lazy"
                style={{ objectPosition: member.imagePosition || "center" }}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent p-5">
                <div className="flex translate-y-3 items-center gap-3 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {member.socials.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={social.label}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-xl transition hover:bg-white/25"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-xl font-bold text-slate-950 dark:text-white">{member.name}</h3>
                  <p className="mt-2 text-sm text-primary-700 dark:text-primary-300">{member.role}</p>
                  {member.featured && (
                    <p className="mt-3 inline-flex rounded-full bg-primary-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-700 dark:text-primary-300">
                      Founder
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200/80 bg-white text-slate-600 transition hover:-translate-y-0.5 hover:border-primary-400/35 hover:text-primary-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                  aria-label={`Open profile for ${member.name}`}
                >
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
