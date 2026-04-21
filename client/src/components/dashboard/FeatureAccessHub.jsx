import { useMemo, useState } from "react";
import { ArrowRight, Layers3, LoaderCircle } from "lucide-react";
import { platformFeatures } from "../../data/content";
import { api } from "../../services/api";

const featureActions = {
  "AI Crop Planning": async () =>
    api.post("/ai/crop-recommendation", {
      crop: "Wheat",
      soilType: "loamy",
      season: "rabi",
      ph: 6.7,
      waterAvailability: "medium",
      marketDemand: 78
    }),
  "Fertilizer Optimization": async () =>
    api.post("/ai/fertilizer-optimization", {
      crop: "Wheat",
      acreage: 2.5,
      nitrogen: 42,
      phosphorous: 27,
      potassium: 24
    }),
  "Pest Detection": async () => ({
    success: true,
    data: {
      pest: "Leaf rust risk",
      confidence: "91%",
      action: "Inspect lower leaf area tomorrow morning and maintain airflow."
    }
  }),
  "Yield Prediction": async () =>
    api.post("/ai/yield-prediction", {
      crop: "Wheat",
      acreage: 2.5,
      historicalYield: 30,
      rainfall: 76,
      soilMoisture: 41
    }),
  "Market Price Prediction": async () =>
    api.post("/ai/market-price-prediction", {
      crop: "Wheat",
      demandIndex: 72,
      supplyIndex: 53,
      basePrice: 24
    }),
  "Insurance Predictor": async () =>
    api.post("/ai/insurance-risk", {
      rainfallVariance: 18,
      pestRisk: 27,
      claimHistory: 1
    }),
  "Digital Twin": async () =>
    api.post("/ai/digital-twin", {
      crop: "Wheat",
      acreage: 2.5,
      irrigationDelayDays: 1,
      fertilizerDelayDays: 0
    }),
  "IoT Sensors": async () => ({
    success: true,
    data: {
      soilMoisture: "41%",
      ph: 6.7,
      ec: "0.44 mS/cm",
      temperature: "28C"
    }
  }),
  "Satellite Monitoring": async () => ({
    success: true,
    data: {
      ndvi: 0.74,
      cropHealth: "91/100",
      stressZones: 2
    }
  }),
  "Weather Data": async () => api.get("/integrations/weather"),
  "WhatsApp AI": async () =>
    api.post("/integrations/whatsapp", {
      phone: "+91XXXXXXXXXX",
      message: "Advisory queued for wheat farmer cluster."
    }),
  "Voice AI": async () =>
    api.post("/integrations/voice", {
      language: "en-IN",
      text: "Wheat advisory generated successfully."
    }),
  "IVR System": async () => ({
    success: true,
    data: {
      status: "ready",
      campaign: "Village advisory IVR",
      reach: "1,240 users"
    }
  }),
  "Supply Chain": async () => ({
    success: true,
    data: {
      buyerWindow: "3 days",
      logisticsStatus: "Ready",
      mandiDemand: "Strong"
    }
  }),
  "Alerts System": async () => api.get("/notifications"),
  "Farm Ledger": async () => ({
    success: true,
    data: {
      spendToDate: "Rs 14,800",
      projectedRevenue: "Rs 41,000",
      projectedMargin: "+18%"
    }
  }),
  "Carbon Scoring": async () => ({
    success: true,
    data: {
      carbonScore: "B+",
      residueManagement: "Good",
      regenerativeImpact: "Improving"
    }
  }),
  "Water Analytics": async () => ({
    success: true,
    data: {
      irrigationWindow: "Tomorrow 6-9 AM",
      stressRisk: "Low",
      waterSavingsPotential: "12%"
    }
  }),
  "Community Advisory": async () => ({
    success: true,
    data: {
      segment: "Wheat farmers",
      messageCount: 248,
      language: "Hindi + English"
    }
  }),
  "Credit Readiness": async () => ({
    success: true,
    data: {
      score: "82/100",
      lenderReadiness: "Healthy",
      note: "Strong crop profile and stable revenue outlook."
    }
  }),
  "Subscription Billing": async () =>
    api.post("/subscriptions/checkout", {
      plan: "starter",
      amount: 99
    }),
  "Admin Intelligence": async () => ({
    success: true,
    data: {
      totalFarmers: 1284,
      activeSensors: 2408,
      aiAccuracy: "93.4%"
    }
  })
};

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

export default function FeatureAccessHub({ subscriptionPlan = "starter" }) {
  const [selectedTitle, setSelectedTitle] = useState(platformFeatures[0].title);
  const [result, setResult] = useState({ note: "Select any feature card to run the demo result." });
  const [loading, setLoading] = useState(false);

  const selectedFeature = useMemo(
    () => platformFeatures.find((feature) => feature.title === selectedTitle) || platformFeatures[0],
    [selectedTitle]
  );

  async function runFeature(feature) {
    setSelectedTitle(feature.title);
    setLoading(true);

    try {
      const action = featureActions[feature.title];
      const response = action ? await action() : { success: true, data: { note: "Demo output available." } };
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
              Your current plan: <span className="font-semibold capitalize">{subscriptionPlan}</span>. Demo unlock keeps all 22 modules accessible.
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
