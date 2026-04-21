import { useMemo, useState } from "react";
import { ArrowRight, Layers3, LoaderCircle } from "lucide-react";
import { platformFeatures } from "../../data/content";
import { api } from "../../services/api";

function extractPayload(response) {
  if (!response) {
    return { result: "No data returned." };
  }

  if (response.data?.alerts) {
    return {
      alerts: response.data.alerts.map((item) => `${item.title}: ${item.message}`)
    };
  }

  return response.data || response;
}

function formatLabel(key) {
  return String(key)
    .replace(/([A-Z])/g, " $1")
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^\w/, (char) => char.toUpperCase());
}

function slugifyFeature(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function buildFeaturePayload(feature) {
  return {
    feature: feature.title,
    crop: "Wheat",
    soilType: "loamy",
    season: "rabi",
    ph: 6.7,
    acreage: 2.5,
    waterAvailability: "medium",
    marketDemand: 78,
    rainfall: 76,
    soilMoisture: 41,
    demandIndex: 72,
    supplyIndex: 53,
    basePrice: 24,
    ndvi: 0.74,
    canopyTemperature: 29,
    moisture: 41,
    rainfallVariance: 18,
    pestRisk: 27,
    claimHistory: 1,
    irrigationDelayDays: 1,
    fertilizerDelayDays: 0,
    phone: "+91 9509868673",
    message: `${feature.title} request generated from farmer dashboard`,
    language: "en-IN",
    text: `${feature.title} advisory generated successfully.`,
    location: "Nashik, Maharashtra"
  };
}

export default function FeatureAccessHub({ subscriptionPlan = "starter" }) {
  const [selectedTitle, setSelectedTitle] = useState(platformFeatures[0].title);
  const [result, setResult] = useState({ note: "Select any feature card to run the backend feature engine." });
  const [loading, setLoading] = useState(false);

  const selectedFeature = useMemo(
    () => platformFeatures.find((feature) => feature.title === selectedTitle) || platformFeatures[0],
    [selectedTitle]
  );

  async function runFeature(feature) {
    setSelectedTitle(feature.title);
    setLoading(true);

    try {
      const response = await api.post(
        `/features/${slugifyFeature(feature.title)}/run`,
        buildFeaturePayload(feature)
      );
      setResult(extractPayload(response));
    } catch (error) {
      setResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <div className="rounded-[28px] border border-slate-200/70 bg-white/80 p-5 dark:border-white/10 dark:bg-white/5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-700 dark:text-primary-300">
              22 farmer features
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold text-slate-950 dark:text-white">Feature access hub</h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Your current plan: <span className="font-semibold capitalize">{subscriptionPlan}</span>. Every module runs through a protected backend API.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-2xl bg-primary-500/10 px-4 py-3 text-sm font-semibold text-primary-700 dark:text-primary-200">
            <Layers3 className="h-4 w-4" />
            All modules active
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {platformFeatures.map((feature) => {
            const Icon = feature.icon;
            const selected = feature.title === selectedTitle;

            return (
              <button
                key={feature.title}
                type="button"
                onClick={() => runFeature(feature)}
                className={`rounded-[24px] border p-4 text-left transition ${
                  selected
                    ? "border-primary-500 bg-primary-500/10 shadow-[0_18px_40px_rgba(52,158,97,0.12)]"
                    : "border-slate-200/70 bg-white hover:-translate-y-1 hover:border-primary-400/35 dark:border-white/10 dark:bg-white/5"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-500/12 text-primary-700 dark:text-primary-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:bg-white/10 dark:text-slate-300">
                    {feature.tag}
                  </span>
                </div>
                <p className="mt-4 font-semibold text-slate-900 dark:text-white">{feature.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{feature.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-[28px] bg-slate-950 p-5 text-white dark:bg-primary-900">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-primary-100/65">Live result</p>
            <h3 className="mt-2 font-display text-2xl font-bold">{selectedFeature.title}</h3>
          </div>
          <button
            type="button"
            onClick={() => runFeature(selectedFeature)}
            className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
          >
            {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
            Run again
          </button>
        </div>

        <div className="mt-6 rounded-[24px] border border-white/10 bg-white/5 p-4">
          {loading ? (
            <div className="flex min-h-[260px] items-center justify-center rounded-[20px] border border-white/10 bg-white/5 text-sm font-medium text-primary-50/80">
              Running {selectedFeature.title}...
            </div>
          ) : result?.error ? (
            <div className="rounded-[20px] border border-red-400/20 bg-red-500/10 p-4 text-sm leading-7 text-red-100">
              {result.error}
            </div>
          ) : (
            <div className="grid gap-3">
              {Object.entries(result).map(([key, value]) => (
                <div key={key} className="rounded-[20px] border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-100/65">
                    {formatLabel(key)}
                  </p>
                  {Array.isArray(value) ? (
                    <div className="mt-3 space-y-2">
                      {value.map((item, index) => (
                        <div key={`${key}-${index}`} className="rounded-2xl bg-white/5 px-3 py-2 text-sm leading-7 text-primary-50/90">
                          {typeof item === "string" ? item : JSON.stringify(item)}
                        </div>
                      ))}
                    </div>
                  ) : typeof value === "object" && value !== null ? (
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {Object.entries(value).map(([nestedKey, nestedValue]) => (
                        <div key={nestedKey} className="rounded-2xl bg-white/5 px-3 py-3 text-sm leading-6 text-primary-50/90">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-100/60">
                            {formatLabel(nestedKey)}
                          </p>
                          <p className="mt-2">{String(nestedValue)}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-3 text-sm leading-7 text-primary-50/90">{String(value)}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
