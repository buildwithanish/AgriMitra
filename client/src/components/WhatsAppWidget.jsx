import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ImageIcon, Mail, MessageCircleMore, Send, Sparkles, X } from "lucide-react";
import { useContactModal } from "../contexts/ContactModalContext";
import { useSettings } from "../contexts/SettingsContext";

const defaultThread = [
  {
    id: 1,
    sender: "bot",
    text: "Namaste! Ask for crop advice, mandi prices, irrigation, pests, weather, or insurance support.",
    image:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=900&q=80",
    tag: "Live Advisory"
  },
  { id: 2, sender: "user", text: "What should I monitor for my wheat plot this week?" },
  {
    id: 3,
    sender: "bot",
    text: "Monitor rust pressure, keep leaf moisture under watch, and maintain light irrigation for the next 48 hours.",
    tag: "Wheat Advisory"
  }
];

const quickPrompts = [
  "Weather for wheat this week",
  "Mandi price prediction",
  "Best fertilizer plan",
  "How do I access all 22 features?"
];

function generateAdvisoryReply(input) {
  const text = input.toLowerCase();

  if (text.includes("hello") || text.includes("hi") || text.includes("namaste") || text.includes("hey")) {
    return {
      text: "Namaste! I can help with crop planning, weather, mandi prices, pest risk, fertilizer guidance, insurance, subscription plans, and dashboard support.",
      tag: "Welcome"
    };
  }

  if (text.includes("weather") || text.includes("rain") || text.includes("humidity")) {
    return {
      text: "Weather outlook: 28 C, humidity 64%, light rain probability 32%. Best action: keep irrigation light and scout humid pockets.",
      tag: "Weather"
    };
  }

  if (text === "__legacy_weather__") {
    return {
      text: "Weather outlook: 28 C, humidity 64%, light rain probability 32%. Best action: keep irrigation light and scout humid pockets.",
      tag: "Weather"
    };
  }

  if (text === "__ignore_weather_fallback__") {
    return {
      text: "Weather outlook: 28°C, humidity 64%, light rain probability 32%. Best action: keep irrigation light and scout humid pockets.",
      tag: "Weather"
    };
  }

  if (text.includes("price") || text.includes("mandi") || text.includes("market")) {
    return {
      text: "Mandi signal: expected price improvement in 3 to 5 days. Suggested action: wait if storage is available and quality is stable.",
      tag: "Market Prediction"
    };
  }

  if (text.includes("fertilizer") || text.includes("npk") || text.includes("urea")) {
    return {
      text: "Fertilizer optimization suggests reducing urea by 11% and adding a micronutrient blend to improve response efficiency.",
      tag: "Fertilizer"
    };
  }

  if (text.includes("pest") || text.includes("disease") || text.includes("rust")) {
    return {
      text: "Pest risk looks moderate. Check lower leaves for spots, improve airflow, and schedule a preventive scouting round tomorrow morning.",
      tag: "Pest Detection"
    };
  }

  if (text.includes("insurance") || text.includes("claim") || text.includes("risk")) {
    return {
      text: "Insurance score indicates low-to-moderate risk this month. Keep weather and crop-condition records updated for faster claim support.",
      tag: "Insurance"
    };
  }

  if (text.includes("subscription") || text.includes("plan")) {
    return {
      text: "Starter plan is available at Rs 99 per month. Farmers can access advisory, weather, alerts, WhatsApp AI, and dashboard tools. Enterprise setup supports cluster analytics and admin controls.",
      tag: "Subscription"
    };
  }

  if (text.includes("feature") || text.includes("dashboard") || text.includes("login") || text.includes("access")) {
    return {
      text: "After login, farmers can access all 22 working features including crop planning, fertilizer optimization, pest detection, yield prediction, market prediction, sensors, alerts, and subscription billing. Admins can review users, sensors, leads, analytics, and revenue views.",
      tag: "Platform Access"
    };
  }

  if (text.includes("yield") || text.includes("harvest")) {
    return {
      text: "Yield forecast remains positive. Current model suggests stable output if irrigation timing is maintained this week.",
      tag: "Yield Prediction"
    };
  }

  if (text.includes("sensor") || text.includes("soil") || text.includes("moisture")) {
    return {
      text: "Soil intelligence: pH 6.7, moisture 41%, conductivity 0.44 mS/cm. Current profile supports wheat and chickpea planning.",
      tag: "Soil Signal"
    };
  }

  return {
    text: "AI Village Brain response: your query has been mapped to advisory, weather, pricing, and risk layers. Ask about crop, market, weather, pest, or fertilizer for a focused answer.",
    tag: "General AI Reply"
  };
}

export default function WhatsAppWidget() {
  const { openContactModal } = useContactModal();
  const { settings } = useSettings();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(defaultThread);
  const [text, setText] = useState("");

  useEffect(() => {
    function handleOpenWidget() {
      setOpen(true);
    }

    if (typeof window !== "undefined") {
      window.addEventListener("aivb:open-whatsapp", handleOpenWidget);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("aivb:open-whatsapp", handleOpenWidget);
      }
    };
  }, []);

  function addAdvisoryReply(query) {
    const cleanQuery = query.trim();

    if (!cleanQuery) {
      return;
    }

    const userMessage = { id: Date.now(), sender: "user", text: cleanQuery };
    const advisoryReply = generateAdvisoryReply(cleanQuery);
    const reply = {
      id: Date.now() + 1,
      sender: "bot",
      text: advisoryReply.text,
      tag: advisoryReply.tag
    };

    setMessages((current) => [...current, userMessage, reply]);
  }

  function handleSend(event) {
    event.preventDefault();
    if (!text.trim()) {
      return;
    }

    addAdvisoryReply(text);
    setText("");
  }

  return (
    <>
      <div className="fixed bottom-4 left-4 z-50 sm:bottom-5 sm:left-5">
        <button
          type="button"
          onClick={openContactModal}
          className="group inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-3.5 py-3 text-sm font-semibold text-slate-700 shadow-[0_14px_40px_rgba(7,23,15,0.12)] transition hover:-translate-y-1 hover:border-primary-400/40 hover:text-primary-700 dark:border-slate-800 dark:bg-primary-950 dark:text-slate-200 dark:hover:text-primary-200"
          aria-label="Contact AI Village Brain"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-500/12 text-primary-700 dark:text-primary-300">
            <Mail className="h-[18px] w-[18px]" />
          </span>
          <span className="hidden sm:inline">Contact</span>
        </button>
      </div>

      <div className="fixed bottom-4 right-4 z-50 sm:bottom-5 sm:right-5">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.94 }}
              className="mb-4 flex w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_30px_90px_rgba(7,23,15,0.18)] dark:border-slate-800 dark:bg-primary-950/95"
            >
            <div className="flex items-center justify-between bg-[#0b6b3e] px-5 py-4 text-white">
              <div>
                <p className="font-display text-lg font-bold">WhatsApp AI</p>
                <p className="text-sm text-white/75">Advisory assistant with structured backend results</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="rounded-full bg-white/10 p-2">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[52vh] space-y-3 overflow-y-auto p-4">
              {messages.slice(-6).map((message) => (
                <div
                  key={message.id}
                  className={`max-w-[88%] rounded-[24px] px-4 py-3 text-sm leading-6 shadow-sm ${
                    message.sender === "bot"
                      ? "border border-slate-200 bg-white text-slate-700 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100"
                      : "ml-auto bg-[#d1f6dd] text-primary-950"
                  }`}
                >
                  {message.sender === "bot" && (
                    <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary-700 dark:text-primary-300">
                      <Sparkles className="h-3.5 w-3.5" />
                      {message.tag || "AI Reply"}
                    </div>
                  )}
                  {message.image && (
                    <div className="mb-3 overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10">
                        <img src={message.image} alt="Agriculture advisory" loading="lazy" className="h-28 w-full object-cover" />
                    </div>
                  )}
                  <p className="whitespace-pre-wrap">{message.text}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 px-4 pb-3">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => addAdvisoryReply(prompt)}
                  className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-primary-500/10 hover:text-primary-700 dark:bg-white/5 dark:text-slate-300 dark:hover:text-primary-200"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-slate-200/70 p-4 dark:border-white/10">
              <input
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder="Ask about crop, weather, mandi, pest..."
                className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none ring-0 transition placeholder:text-slate-400 focus:border-primary-500 dark:border-white/10 dark:bg-white/5"
              />
              <button
                type="submit"
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-600 text-white"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <div className="flex flex-wrap items-center gap-2 px-4 pb-4 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 dark:bg-white/5">
                <ImageIcon className="h-3.5 w-3.5" />
                Live advisory cards
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-white/5">Weather</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-white/5">Pest</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-white/5">Market</span>
            </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="group inline-flex items-center gap-2.5 rounded-full bg-[#22c55e] px-3.5 py-3 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(34,197,94,0.4)] transition hover:-translate-y-1"
          aria-label="Open WhatsApp assistant"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/16">
            <MessageCircleMore className="h-5 w-5" />
          </span>
          <span className="hidden sm:inline">WhatsApp</span>
        </button>
        <a
          href={`https://wa.me/${settings.contact.whatsappNumber}`}
          target="_blank"
          rel="noreferrer"
          className="mt-2 hidden rounded-full bg-white px-4 py-2 text-xs font-semibold text-primary-700 shadow-lg transition hover:-translate-y-0.5 sm:block"
        >
          Direct {settings.contact.phone}
        </a>
      </div>
    </>
  );
}
