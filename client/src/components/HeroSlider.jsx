import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, PlayCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import GlassPanel from "./GlassPanel";
import { heroSlides } from "../data/content";

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const slide = heroSlides[index];

  return (
    <div className="relative overflow-hidden rounded-[36px] border border-white/40 bg-aurora p-6 shadow-[0_40px_120px_rgba(7,23,15,0.34)] sm:p-8 lg:p-10">
      <div className="hero-orb -left-16 top-4 h-44 w-44 bg-primary-500/30" />
      <div className="hero-orb right-4 top-0 h-36 w-36 bg-accent-400/20" />

      <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="relative z-10">
          <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary-100">
            {t("hero.badge")}
          </span>

          <AnimatePresence mode="wait">
            <motion.div
              key={slide.key}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.55 }}
              className="mt-8"
            >
              <h1 className="max-w-2xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                {t(`hero.slides.${slide.key}Title`)}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-primary-50/85">
                {t(`hero.slides.${slide.key}Desc`)}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {slide.chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-primary-50/90"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-semibold text-primary-900 transition hover:-translate-y-0.5"
            >
              {t("common.getStarted")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5"
            >
              <PlayCircle className="h-4 w-4" />
              {t("common.demo")}
            </a>
          </div>
        </div>

        <div className="relative z-10 space-y-5">
          <GlassPanel className="overflow-hidden !border-white/10 !bg-white/10 p-5 text-white">
            <p className="text-sm uppercase tracking-[0.28em] text-primary-100/70">Signal engine</p>
            <div className="mt-4 flex items-end justify-between gap-6">
              <div>
                <p className="text-4xl font-bold">{slide.metric}</p>
                <p className="mt-2 text-sm text-primary-100/80">{slide.statLabel}</p>
              </div>
              <div className="h-16 w-28 rounded-3xl bg-gradient-to-br from-primary-300/25 to-accent-300/15 p-3">
                <div className="flex h-full items-end gap-2">
                  {[46, 68, 82, 64, 92].map((height) => (
                    <span
                      key={height}
                      className="w-full rounded-full bg-white/80"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </GlassPanel>

          <div className="grid gap-5 sm:grid-cols-2">
            <GlassPanel className="!border-white/10 !bg-white/10 p-5 text-white">
              <p className="text-xs uppercase tracking-[0.22em] text-primary-100/70">Village map</p>
              <div className="mt-4 rounded-[24px] border border-white/10 bg-white/5 p-4">
                <div className="soft-grid relative h-32 overflow-hidden rounded-[18px] bg-primary-950/30">
                  <span className="absolute left-7 top-10 h-4 w-4 animate-pulseSoft rounded-full bg-primary-300" />
                  <span className="absolute right-8 top-6 h-3 w-3 rounded-full bg-accent-300" />
                  <span className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
                </div>
              </div>
            </GlassPanel>
            <GlassPanel className="!border-white/10 !bg-white/10 p-5 text-white">
              <p className="text-xs uppercase tracking-[0.22em] text-primary-100/70">Advisory pulse</p>
              <div className="mt-4 space-y-3">
                {["Irrigation window open", "Pest risk moderate", "Market uptrend 6.2%"].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
                    {item}
                  </div>
                ))}
              </div>
            </GlassPanel>
          </div>

          <div className="flex items-center justify-between rounded-[26px] border border-white/10 bg-white/10 p-4 text-white">
            <div className="flex gap-2">
              {heroSlides.map((entry, indicatorIndex) => (
                <button
                  key={entry.key}
                  type="button"
                  onClick={() => setIndex(indicatorIndex)}
                  className={`h-2.5 rounded-full transition ${
                    indicatorIndex === index ? "w-10 bg-white" : "w-2.5 bg-white/35"
                  }`}
                  aria-label={`Go to slide ${indicatorIndex + 1}`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIndex((current) => (current - 1 + heroSlides.length) % heroSlides.length)}
                className="rounded-2xl border border-white/10 bg-white/5 p-2 transition hover:bg-white/10"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setIndex((current) => (current + 1) % heroSlides.length)}
                className="rounded-2xl border border-white/10 bg-white/5 p-2 transition hover:bg-white/10"
                aria-label="Next slide"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
