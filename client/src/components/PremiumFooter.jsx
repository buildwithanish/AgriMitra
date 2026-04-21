import { useState } from "react";
import { Apple, ArrowRight, Mail, Play, Send, Sprout } from "lucide-react";
import {
  footerAppLinks,
  footerContactStrip,
  footerFeatureLinks,
  footerHours,
  footerSocials,
  footerTopLinks
} from "../data/marketing";
import { useContactModal } from "../contexts/ContactModalContext";
import { useSettings } from "../contexts/SettingsContext";

function FooterHeading({ children }) {
  return (
    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-700 dark:text-primary-300">
      {children}
    </p>
  );
}

function StoreButton({ href, eyebrow, label, icon: Icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex min-w-[220px] items-center gap-3 rounded-[22px] border border-white/10 bg-slate-950 px-4 py-3 text-left text-white shadow-[0_18px_50px_rgba(7,23,15,0.18)] transition duration-300 hover:-translate-y-1 hover:border-primary-400/30 hover:bg-slate-900"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-accent-300">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/60">{eyebrow}</p>
        <p className="mt-1 font-display text-base font-bold text-white">{label}</p>
      </div>
    </a>
  );
}

export default function PremiumFooter() {
  const { openContactModal } = useContactModal();
  const { settings } = useSettings();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubscribe(event) {
    event.preventDefault();
    if (!email.trim()) {
      return;
    }

    setMessage("Thanks for subscribing. We\u2019ll send product updates and field notes soon.");
    setEmail("");
  }

  return (
    <footer
      id="contact"
      className="relative mt-24 overflow-hidden border-t border-primary-500/12 bg-[linear-gradient(180deg,rgba(244,251,247,0.35),rgba(7,23,15,0.08))] dark:bg-[linear-gradient(180deg,rgba(7,23,15,0.18),rgba(7,23,15,0.9))]"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-500/45 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(92,193,130,0.16),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(243,179,0,0.12),transparent_24%)]" />
      <div className="soft-grid absolute inset-0 opacity-[0.05]" />

      <div className="section-shell relative py-8 sm:py-12 lg:py-16">
        <div className="overflow-hidden rounded-[36px] border border-white/70 bg-white/82 shadow-[0_35px_100px_rgba(7,23,15,0.12)] backdrop-blur-2xl dark:border-white/10 dark:bg-primary-950/82">
          <div className="border-b border-slate-200/80 px-5 py-6 dark:border-white/10 sm:px-8 lg:px-10">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[repeat(3,minmax(0,1fr))_auto] xl:items-center">
              {footerContactStrip.map((item) => {
                const Icon = item.icon;
                const value =
                  item.title === "Phone"
                    ? settings.contact.phone
                    : item.title === "Email"
                      ? settings.contact.email
                      : item.title === "Location"
                        ? settings.contact.location
                        : item.value;

                return (
                  <div
                    key={item.title}
                    className="flex items-center gap-3 rounded-[24px] border border-slate-200/70 bg-white/75 px-4 py-4 dark:border-white/10 dark:bg-white/5"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-primary-500/10 text-primary-700 dark:text-primary-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">{value}</p>
                    </div>
                  </div>
                );
              })}

              <button
                type="button"
                onClick={openContactModal}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary-600 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-primary-500"
              >
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid gap-8 px-5 py-8 md:grid-cols-2 xl:grid-cols-[1.25fr_repeat(4,minmax(0,1fr))] xl:gap-10 xl:px-10 xl:py-10">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-glow">
                  <Sprout className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-display text-xl font-bold text-slate-950 dark:text-white">AI Village Brain</p>
                  <p className="text-sm font-medium text-primary-700 dark:text-primary-300">
                    Smart Farming Intelligence System
                  </p>
                </div>
              </div>

              <p className="max-w-sm text-sm leading-7 text-slate-600 dark:text-slate-300">
                {settings.content.footerDescription}
              </p>

              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Your email address"
                    required
                    className="w-full rounded-2xl border border-slate-200/80 bg-white/90 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-2xl bg-primary-600 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-primary-500"
                >
                  <Send className="h-4 w-4" />
                  Subscribe
                </button>
                {message && <p className="text-sm font-medium text-primary-700 dark:text-primary-300">{message}</p>}
              </form>
            </div>

            <div className="space-y-5">
              <FooterHeading>Top Links</FooterHeading>
              <nav className="flex flex-col gap-3">
                {footerTopLinks.map((item) => (
                  item.action === "contact-modal" ? (
                    <button
                      key={item.label}
                      type="button"
                      onClick={openContactModal}
                      className="group inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:translate-x-1 hover:text-primary-700 dark:text-slate-300 dark:hover:text-primary-200"
                    >
                      <span>{item.label}</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                    </button>
                  ) : (
                    <a
                      key={item.label}
                      href={item.href}
                      className="group inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:translate-x-1 hover:text-primary-700 dark:text-slate-300 dark:hover:text-primary-200"
                    >
                      <span>{item.label}</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                    </a>
                  )
                ))}
              </nav>
            </div>

            <div className="space-y-5">
              <FooterHeading>Features</FooterHeading>
              <nav className="flex flex-col gap-3">
                {footerFeatureLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:translate-x-1 hover:text-primary-700 dark:text-slate-300 dark:hover:text-primary-200"
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                  </a>
                ))}
              </nav>
            </div>

            <div className="space-y-5">
              <FooterHeading>Working Hours</FooterHeading>
              <div className="space-y-3">
                {footerHours.map((entry) => (
                  <div
                    key={entry.label}
                    className="rounded-[22px] border border-slate-200/70 bg-white/75 px-4 py-3 dark:border-white/10 dark:bg-white/5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                      {entry.label}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
                      {entry.label === "Mon - Fri" ? settings.contact.workingHours : entry.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5 text-center md:text-left">
              <FooterHeading>Download Our App</FooterHeading>
              <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                Access field intelligence, alerts, and AI recommendations on the go.
              </p>
              <div className="flex flex-col items-center gap-3 md:items-start">
                <StoreButton href={footerAppLinks.playStore} eyebrow="Get it on" label="Google Play" icon={Play} />
                <StoreButton href={footerAppLinks.appStore} eyebrow="Download on the" label="App Store" icon={Apple} />
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200/80 px-5 py-5 dark:border-white/10 sm:px-8 lg:px-10">
            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                {footerSocials.map((item) => {
                  const Icon = item.icon;

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={item.label}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200/80 bg-white/80 text-slate-600 transition hover:-translate-y-0.5 hover:border-primary-400/35 hover:text-primary-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:text-primary-200"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>

              <div className="flex flex-col gap-3 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
                <p className="text-sm text-slate-500 dark:text-slate-400">{"\u00A9"} 2026 AI Village Brain</p>
                <div className="flex items-center justify-center gap-4 text-sm font-medium text-slate-500 dark:text-slate-400 sm:justify-end">
                  <a href="/privacy-policy" className="transition hover:text-primary-700 dark:hover:text-primary-200">
                    Privacy Policy
                  </a>
                  <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-white/20" />
                  <a href="/terms-of-service" className="transition hover:text-primary-700 dark:hover:text-primary-200">
                    Terms & Conditions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
