import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Mail, Phone, UserRound, X } from "lucide-react";
import { api } from "../services/api";
import { useContactModal } from "../contexts/ContactModalContext";

const roleOptions = [
  { value: "farmer", label: "Farmer" },
  { value: "operator", label: "FPO / NGO Operator" },
  { value: "agribusiness", label: "Agribusiness Team" },
  { value: "admin", label: "Platform Admin" }
];

const interestOptions = [
  { value: "starter-plan", label: "Starter Plan" },
  { value: "enterprise-demo", label: "Enterprise Demo" },
  { value: "dashboard-access", label: "Dashboard Access" },
  { value: "integration-help", label: "Integration Help" }
];

export default function ContactRegistrationModal() {
  const { isContactModalOpen, closeContactModal } = useContactModal();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "farmer",
    interest: "starter-plan",
    message: ""
  });
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  const canSubmit = useMemo(() => form.name.trim() && form.email.trim(), [form]);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!canSubmit) {
      return;
    }

    setStatus("loading");
    setFeedback("");

    try {
      const response = await api.post("/contact", {
        ...form,
        source: "contact-modal"
      });

      setStatus("success");
      setFeedback(response.message || "Registration submitted successfully.");
      setForm({
        name: "",
        email: "",
        phone: "",
        role: "farmer",
        interest: "starter-plan",
        message: ""
      });
    } catch (error) {
      setStatus("error");
      setFeedback(error.message);
    }
  }

  return (
    <AnimatePresence>
      {isContactModalOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-slate-950/55 backdrop-blur-sm"
            onClick={closeContactModal}
          />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            className="fixed inset-x-3 bottom-3 top-3 z-[81] mx-auto w-auto max-w-4xl overflow-y-auto rounded-[32px] border border-white/70 bg-white shadow-[0_40px_120px_rgba(2,6,23,0.24)] dark:border-slate-800 dark:bg-slate-950 sm:inset-x-5 sm:bottom-5 sm:top-5"
          >
            <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="bg-gradient-to-br from-primary-700 via-primary-800 to-primary-950 p-7 text-white">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-100/65">
                      Contact Registration
                    </p>
                    <h2 className="mt-3 font-display text-3xl font-bold">Talk to AI Village Brain</h2>
                  </div>
                  <button
                    type="button"
                    onClick={closeContactModal}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white transition hover:bg-white/15"
                    aria-label="Close registration form"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <p className="mt-5 text-sm leading-7 text-primary-50/80">
                  Fill in your details and our team will help you with onboarding, demo access, dashboard setup, and
                  subscription guidance.
                </p>

                <div className="mt-8 space-y-4">
                  {[
                    "Quick registration for farmer or enterprise demos",
                    "Admin dashboard can review every incoming contact request",
                    "Works for local and live website deployments"
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-[22px] border border-white/10 bg-white/8 px-4 py-4">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-accent-300" />
                      <p className="text-sm leading-7 text-primary-50/88">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 sm:p-7">
                <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Full name
                    <div className="relative mt-2">
                      <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <input
                        name="name"
                        value={form.name}
                        onChange={updateField}
                        placeholder="Aditi Sharma"
                        required
                        className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-primary-500 dark:border-white/10 dark:bg-white/5"
                      />
                    </div>
                  </label>

                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Email
                    <div className="relative mt-2">
                      <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={updateField}
                        placeholder="you@example.com"
                        required
                        className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-primary-500 dark:border-white/10 dark:bg-white/5"
                      />
                    </div>
                  </label>

                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Phone
                    <div className="relative mt-2">
                      <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={updateField}
                        placeholder="+91 98765 43210"
                        className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-primary-500 dark:border-white/10 dark:bg-white/5"
                      />
                    </div>
                  </label>

                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Role
                    <select
                      name="role"
                      value={form.role}
                      onChange={updateField}
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-primary-500 dark:border-white/10 dark:bg-white/5"
                    >
                      {roleOptions.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-200 sm:col-span-2">
                    Interested in
                    <select
                      name="interest"
                      value={form.interest}
                      onChange={updateField}
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-primary-500 dark:border-white/10 dark:bg-white/5"
                    >
                      {interestOptions.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-200 sm:col-span-2">
                    Message
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={updateField}
                      rows={4}
                      placeholder="Tell us what you need help with..."
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-primary-500 dark:border-white/10 dark:bg-white/5"
                    />
                  </label>

                  {feedback && (
                    <div
                      className={`rounded-2xl px-4 py-3 text-sm font-medium sm:col-span-2 ${
                        status === "success"
                          ? "border border-primary-200 bg-primary-50 text-primary-700 dark:border-primary-500/20 dark:bg-primary-500/10 dark:text-primary-200"
                          : "border border-red-200 bg-red-50 text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300"
                      }`}
                    >
                      {feedback}
                    </div>
                  )}

                  <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row">
                    <button
                      type="submit"
                      disabled={status === "loading" || !canSubmit}
                      className="inline-flex items-center justify-center rounded-2xl bg-primary-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-500 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {status === "loading" ? "Submitting..." : "Submit Registration"}
                    </button>
                    <button
                      type="button"
                      onClick={closeContactModal}
                      className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary-400/40 hover:text-primary-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:text-primary-200"
                    >
                      Maybe later
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
