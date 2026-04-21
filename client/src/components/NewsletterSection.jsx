import { useState } from "react";
import { ArrowRight, Mail } from "lucide-react";
import GlassPanel from "./GlassPanel";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (!email.trim()) {
      return;
    }

    setSubmitted(true);
    setEmail("");
  }

  return (
    <section className="section-shell pt-24" id="newsletter">
      <GlassPanel className="relative overflow-hidden rounded-[36px] border-white/60 bg-gradient-to-r from-primary-700 via-primary-800 to-primary-950 p-8 text-white shadow-[0_35px_100px_rgba(7,23,15,0.18)] dark:border-white/10">
        <div className="hero-orb -left-12 top-4 h-48 w-48 bg-white/10" />
        <div className="hero-orb right-0 top-0 h-40 w-40 bg-accent-400/15" />
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary-100/70">Newsletter</p>
            <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
              Stay ahead with AI agriculture updates, product launches, and field insights.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-primary-50/82">
              Get curated product notes, growth stories, and operational intelligence straight to your inbox.
            </p>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/55" />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-2xl border border-white/15 bg-white/10 py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/55 outline-none transition focus:border-white/30 focus:bg-white/15"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-primary-950 transition hover:-translate-y-0.5"
              >
                Subscribe
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
            {submitted && (
              <p className="mt-3 text-sm font-medium text-primary-100/88">
                Thanks. You&apos;re subscribed to AI Village Brain updates.
              </p>
            )}
          </div>
        </div>
      </GlassPanel>
    </section>
  );
}
