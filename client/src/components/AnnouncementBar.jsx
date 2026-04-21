import { ArrowRight } from "lucide-react";
import { useContactModal } from "../contexts/ContactModalContext";
import { useSettings } from "../contexts/SettingsContext";

export default function AnnouncementBar() {
  const { settings } = useSettings();
  const { openContactModal } = useContactModal();
  const announcement = settings?.announcement;

  if (!announcement?.enabled || !announcement?.text) {
    return null;
  }

  if (announcement.link === "/#contact") {
    return (
      <button
        type="button"
        onClick={openContactModal}
        className="w-full bg-gradient-to-r from-primary-700 via-primary-600 to-accent-500 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-[0_12px_30px_rgba(52,158,97,0.2)]"
      >
        <span className="inline-flex items-center justify-center gap-2">
          {announcement.text}
          <ArrowRight className="h-4 w-4" />
        </span>
      </button>
    );
  }

  return (
    <a
      href={announcement.link || "/"}
      className="block bg-gradient-to-r from-primary-700 via-primary-600 to-accent-500 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-[0_12px_30px_rgba(52,158,97,0.2)]"
    >
      <span className="inline-flex items-center justify-center gap-2">
        {announcement.text}
        <ArrowRight className="h-4 w-4" />
      </span>
    </a>
  );
}
