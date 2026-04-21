import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function LanguageToggle() {
  const { i18n } = useTranslation();

  function toggleLanguage() {
    const nextLanguage = i18n.language === "en" ? "hi" : "en";
    i18n.changeLanguage(nextLanguage);
    localStorage.setItem("ai-village-brain-language", nextLanguage);
  }

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="inline-flex items-center gap-2 rounded-2xl border border-white/40 bg-white/70 px-3 py-2 text-sm font-semibold text-slate-700 shadow-lg shadow-primary-950/5 backdrop-blur-xl transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/5 dark:text-slate-100"
    >
      <Languages className="h-4 w-4" />
      {i18n.language === "en" ? "EN" : "हिं"}
    </button>
  );
}
