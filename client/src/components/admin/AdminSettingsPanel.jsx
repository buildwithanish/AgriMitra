import { useEffect, useState } from "react";
import { BellRing, CheckCircle2, KeyRound, LoaderCircle, PhoneCall, Save, Type } from "lucide-react";
import { api } from "../../services/api";
import { useSettings } from "../../contexts/SettingsContext";
import GlassPanel from "../GlassPanel";

const emptySettings = {
  announcement: { enabled: true, text: "", link: "" },
  contact: {
    phone: "+91 9509868673",
    whatsappNumber: "919509868673",
    email: "support@aivillagebrain.com",
    location: "India",
    workingHours: "Mon - Fri: 9:00 AM to 6:00 PM"
  },
  content: {
    heroTitle: "",
    heroSubtitle: "",
    featuresHeadline: "",
    footerDescription: ""
  },
  aiKeys: {
    openAiKey: "",
    weatherApiKey: "",
    satelliteProviderKey: "",
    whatsappToken: "",
    firebaseServerKey: ""
  },
  aiKeyStatus: {}
};

function updateNested(setState, group, field, value) {
  setState((current) => ({
    ...current,
    [group]: {
      ...(current[group] || {}),
      [field]: value
    }
  }));
}

function Field({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
      {label}
      <input
        type={type}
        value={value || ""}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-primary-500 dark:border-white/10 dark:bg-white/5"
      />
    </label>
  );
}

export default function AdminSettingsPanel() {
  const { setSettings } = useSettings();
  const [settingsForm, setSettingsForm] = useState(emptySettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadAdminSettings() {
      try {
        const response = await api.get("/settings/admin");
        setSettingsForm((current) => ({
          ...current,
          ...(response.data || {}),
          aiKeys: emptySettings.aiKeys
        }));
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setLoading(false);
      }
    }

    loadAdminSettings();
  }, []);

  async function handleSave(event) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const payload = {
        announcement: settingsForm.announcement,
        contact: settingsForm.contact,
        content: settingsForm.content,
        aiKeys: Object.fromEntries(
          Object.entries(settingsForm.aiKeys || {}).filter(([, value]) => String(value || "").trim())
        )
      };
      const response = await api.put("/settings/admin", payload);
      setSettings((current) => ({
        ...current,
        announcement: response.data.announcement,
        contact: response.data.contact,
        content: response.data.content
      }));
      setSettingsForm((current) => ({
        ...current,
        ...(response.data || {}),
        aiKeys: emptySettings.aiKeys
      }));
      setMessage(response.message || "Settings saved successfully.");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <GlassPanel id="admin-settings" className="scroll-mt-8 rounded-[30px] p-6">
      <form onSubmit={handleSave} className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-primary-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-700 dark:text-primary-300">
              <KeyRound className="h-3.5 w-3.5" />
              Admin control center
            </p>
            <h3 className="mt-3 font-display text-2xl font-bold text-slate-950 dark:text-white">
              Website, contact, announcement, and AI settings
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-500 dark:text-slate-400">
              These values are served by the backend and reflected across the public website and dashboards.
            </p>
          </div>
          <button
            type="submit"
            disabled={saving || loading}
            className="inline-flex items-center gap-2 rounded-2xl bg-primary-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-500 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {saving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save controls
          </button>
        </div>

        {message && (
          <div className="flex items-center gap-2 rounded-2xl border border-primary-200 bg-primary-50 px-4 py-3 text-sm font-semibold text-primary-700 dark:border-primary-500/20 dark:bg-primary-500/10 dark:text-primary-200">
            <CheckCircle2 className="h-4 w-4" />
            {message}
          </div>
        )}
        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
            {error}
          </div>
        )}

        <div className="grid gap-5 xl:grid-cols-2">
          <section className="rounded-[26px] border border-slate-200/70 bg-white/75 p-5 dark:border-white/10 dark:bg-white/5">
            <div className="flex items-center gap-3">
              <BellRing className="h-5 w-5 text-primary-600" />
              <h4 className="font-display text-xl font-bold text-slate-950 dark:text-white">Announcement bar</h4>
            </div>
            <div className="mt-5 grid gap-4">
              <label className="inline-flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                <input
                  type="checkbox"
                  checked={Boolean(settingsForm.announcement.enabled)}
                  onChange={(event) => updateNested(setSettingsForm, "announcement", "enabled", event.target.checked)}
                  className="h-4 w-4 accent-primary-600"
                />
                Enable announcement
              </label>
              <Field
                label="Announcement text"
                value={settingsForm.announcement.text}
                onChange={(value) => updateNested(setSettingsForm, "announcement", "text", value)}
                placeholder="New subsidy scheme available - Apply now"
              />
              <Field
                label="Redirect link"
                value={settingsForm.announcement.link}
                onChange={(value) => updateNested(setSettingsForm, "announcement", "link", value)}
                placeholder="/#contact"
              />
            </div>
          </section>

          <section className="rounded-[26px] border border-slate-200/70 bg-white/75 p-5 dark:border-white/10 dark:bg-white/5">
            <div className="flex items-center gap-3">
              <PhoneCall className="h-5 w-5 text-primary-600" />
              <h4 className="font-display text-xl font-bold text-slate-950 dark:text-white">Global contact</h4>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Phone" value={settingsForm.contact.phone} onChange={(value) => updateNested(setSettingsForm, "contact", "phone", value)} />
              <Field label="WhatsApp number" value={settingsForm.contact.whatsappNumber} onChange={(value) => updateNested(setSettingsForm, "contact", "whatsappNumber", value)} />
              <Field label="Email" value={settingsForm.contact.email} onChange={(value) => updateNested(setSettingsForm, "contact", "email", value)} type="email" />
              <Field label="Location" value={settingsForm.contact.location} onChange={(value) => updateNested(setSettingsForm, "contact", "location", value)} />
              <div className="sm:col-span-2">
                <Field label="Working hours" value={settingsForm.contact.workingHours} onChange={(value) => updateNested(setSettingsForm, "contact", "workingHours", value)} />
              </div>
            </div>
          </section>

          <section className="rounded-[26px] border border-slate-200/70 bg-white/75 p-5 dark:border-white/10 dark:bg-white/5">
            <div className="flex items-center gap-3">
              <Type className="h-5 w-5 text-primary-600" />
              <h4 className="font-display text-xl font-bold text-slate-950 dark:text-white">Website content</h4>
            </div>
            <div className="mt-5 grid gap-4">
              <Field label="Hero title" value={settingsForm.content.heroTitle} onChange={(value) => updateNested(setSettingsForm, "content", "heroTitle", value)} />
              <Field label="Hero subtitle" value={settingsForm.content.heroSubtitle} onChange={(value) => updateNested(setSettingsForm, "content", "heroSubtitle", value)} />
              <Field label="Features headline" value={settingsForm.content.featuresHeadline} onChange={(value) => updateNested(setSettingsForm, "content", "featuresHeadline", value)} />
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                Footer description
                <textarea
                  value={settingsForm.content.footerDescription || ""}
                  onChange={(event) => updateNested(setSettingsForm, "content", "footerDescription", event.target.value)}
                  rows={4}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-primary-500 dark:border-white/10 dark:bg-white/5"
                />
              </label>
            </div>
          </section>

          <section className="rounded-[26px] border border-slate-200/70 bg-white/75 p-5 dark:border-white/10 dark:bg-white/5">
            <div className="flex items-center gap-3">
              <KeyRound className="h-5 w-5 text-primary-600" />
              <h4 className="font-display text-xl font-bold text-slate-950 dark:text-white">AI and integration keys</h4>
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
              Existing keys are hidden for security. Enter a value only when you want to update a key.
            </p>
            <div className="mt-5 grid gap-4">
              {Object.keys(emptySettings.aiKeys).map((key) => (
                <Field
                  key={key}
                  label={`${key} ${settingsForm.aiKeyStatus?.[key] ? "(configured)" : "(not set)"}`}
                  value={settingsForm.aiKeys[key]}
                  onChange={(value) => updateNested(setSettingsForm, "aiKeys", key, value)}
                  type="password"
                />
              ))}
            </div>
          </section>
        </div>
      </form>
    </GlassPanel>
  );
}
