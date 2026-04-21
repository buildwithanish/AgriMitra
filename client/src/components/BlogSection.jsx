import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { blogPosts } from "../data/marketing";

export default function BlogSection() {
  return (
    <section className="section-shell pt-24" id="blog">
      <SectionHeading
        eyebrow="Blog"
        title="Add credible product storytelling instead of empty placeholder navigation"
        description="Articles, updates, and field notes that make the brand feel like a serious startup product."
        align="center"
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {blogPosts.map((post, index) => {
          const Icon = post.icon;

          return (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="group overflow-hidden rounded-[30px] border border-white/60 bg-white/80 shadow-[0_24px_70px_rgba(7,23,15,0.1)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/15 to-transparent" />
              </div>

              <div className="p-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-700 dark:text-primary-300">
                  <Icon className="h-3.5 w-3.5" />
                  {post.meta}
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold text-slate-950 dark:text-white">{post.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{post.excerpt}</p>
                <button
                  type="button"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 transition group-hover:translate-x-1 dark:text-primary-300"
                >
                  Read article
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
