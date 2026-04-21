import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircleMore, Send, X } from "lucide-react";

const defaultThread = [
  { id: 1, sender: "bot", text: "Namaste! Ask for crop advice, mandi prices, or weather warnings." },
  { id: 2, sender: "user", text: "What should I monitor for my wheat plot this week?" },
  { id: 3, sender: "bot", text: "Moisture looks stable. Watch for rust pressure and a mild price lift in 4-5 days." }
];

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(defaultThread);
  const [text, setText] = useState("");

  function handleSend(event) {
    event.preventDefault();
    if (!text.trim()) {
      return;
    }

    const userMessage = { id: Date.now(), sender: "user", text };
    const reply = {
      id: Date.now() + 1,
      sender: "bot",
      text: "AI Village Brain will simulate a WhatsApp advisory flow here and can be connected to a real provider later."
    };

    setMessages((current) => [...current, userMessage, reply]);
    setText("");
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.94 }}
            className="mb-4 w-[calc(100vw-2.5rem)] max-w-sm overflow-hidden rounded-[28px] border border-white/50 bg-white/85 shadow-[0_30px_90px_rgba(7,23,15,0.18)] backdrop-blur-2xl dark:border-white/10 dark:bg-primary-950/90"
          >
            <div className="flex items-center justify-between bg-[#0b6b3e] px-5 py-4 text-white">
              <div>
                <p className="font-display text-lg font-bold">WhatsApp AI</p>
                <p className="text-sm text-white/75">Simulated advisory assistant</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="rounded-full bg-white/10 p-2">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3 p-4">
              {messages.slice(-5).map((message) => (
                <div
                  key={message.id}
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                    message.sender === "bot"
                      ? "bg-[#effaf3] text-slate-700 dark:bg-white/8 dark:text-slate-100"
                      : "ml-auto bg-[#d1f6dd] text-primary-950"
                  }`}
                >
                  {message.text}
                </div>
              ))}
            </div>

            <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-slate-200/70 p-4 dark:border-white/10">
              <input
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder="Type a question..."
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
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-[#22c55e] text-white shadow-[0_18px_50px_rgba(34,197,94,0.45)] transition hover:-translate-y-1"
        aria-label="Open WhatsApp simulation"
      >
        <MessageCircleMore className="h-7 w-7" />
      </button>
    </div>
  );
}
