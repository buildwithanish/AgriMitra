import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Waves } from "lucide-react";
import { premiumHeroSlides } from "../data/marketing";

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % premiumHeroSlides.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, []);

  const slide = premiumHeroSlides[activeSlide];

  return (
    <section className="pt-6">
      <div className="relative overflow-hidden border-y border-white/60 shadow-[0_40px_120px_rgba(7,23,15,0.18)] sm:mx-4 sm:rounded-[40px] sm:border lg:mx-6 xl:mx-8">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
          style={{ backgroundImage: `url(${slide.image})` }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(7,23,15,0.86),rgba(7,23,15,0.45)_45%,rgba(7,23,15,0.25))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(92,193,130,0.28),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(243,179,0,0.16),transparent_28%)]" />

        <div className="relative grid min-h-[620px] gap-8 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-10 xl:min-h-[680px] xl:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.45 }}
              className="flex flex-col justify-center"
            >
              <span className="inline-flex w-max items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-primary-50">
                <Sparkles className="h-3.5 w-3.5" />
                {slide.eyebrow}
              </span>

              <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl xl:text-6xl">
                {slide.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-primary-50/82 sm:text-lg">
                {slide.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={slide.primaryHref}
                  className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-primary-950 transition hover:-translate-y-0.5"
                >
                  {slide.primaryCta}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={slide.secondaryHref}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/15"
                >
                  {slide.secondaryCta}
                </a>
              </div>

              <div className="mt-10 grid max-w-xl gap-4 sm:grid-cols-2">
                {slide.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-[24px] border border-white/12 bg-white/10 p-4 text-white backdrop-blur-xl"
                  >
                    <p className="text-3xl font-bold">{metric.value}</p>
                    <p className="mt-2 text-sm text-primary-50/72">{metric.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-end lg:justify-end">
            <div className="w-full max-w-[420px] space-y-4">
              <div className="rounded-[30px] border border-white/12 bg-white/10 p-5 text-white backdrop-blur-2xl">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-primary-100/70">Village signal map</p>
                    <p className="mt-2 font-display text-2xl font-bold">Live growth dashboard</p>
                  </div>
                  <Waves className="h-5 w-5 text-accent-300" />
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {[
                    ["Plots synced", "48"],
                    ["Risk alerts", "06"],
                    ["Mandi watch", "Up"]
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-white/10 bg-white/8 p-4">
                      <p className="text-xs uppercase tracking-[0.16em] text-primary-100/60">{label}</p>
                      <p className="mt-2 text-xl font-bold">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[30px] border border-white/12 bg-white/10 p-5 text-white backdrop-blur-2xl">
                <p className="text-xs uppercase tracking-[0.22em] text-primary-100/70">Operational feed</p>
                <div className="mt-4 space-y-3">
                  {[
                    "AI recommendation sent to 1,240 farmers",
                    "Satellite health layer refreshed 8 minutes ago",
                    "Weather advisory queued for WhatsApp delivery"
                  ].map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm leading-6">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:bottom-8 lg:left-10 lg:right-10">
            <div className="flex gap-2">
              {premiumHeroSlides.map((entry, index) => (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  className={`h-2.5 rounded-full transition ${
                    index === activeSlide ? "w-10 bg-white" : "w-2.5 bg-white/45"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setActiveSlide((current) => (current - 1 + premiumHeroSlides.length) % premiumHeroSlides.length)
                }
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white transition hover:bg-white/15"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setActiveSlide((current) => (current + 1) % premiumHeroSlides.length)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white transition hover:bg-white/15"
                aria-label="Next slide"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
