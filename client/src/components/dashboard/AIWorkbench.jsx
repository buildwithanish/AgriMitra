import { useState } from "react";
import { Bot, ScanSearch, Sparkles } from "lucide-react";
import { api } from "../../services/api";

const actions = [
  {
    id: "crop",
    label: "Crop Recommendation",
    endpoint: "/ai/crop-recommendation",
    buildPayload: (form) => ({
      crop: form.crop,
      soilType: form.soilType,
      season: form.season,
      ph: form.ph,
      waterAvailability: form.waterAvailability,
      marketDemand: 78
    })
  },
  {
    id: "fertilizer",
    label: "Fertilizer Optimization",
    endpoint: "/ai/fertilizer-optimization",
    buildPayload: (form) => ({
      crop: form.crop,
      acreage: form.acreage,
      nitrogen: 42,
      phosphorous: 27,
      potassium: 24
    })
  },
  {
    id: "pest",
    label: "Pest Detection",
    endpoint: "/ai/pest-detection",
    usesFormData: true
  },
  {
    id: "yield",
    label: "Yield Prediction",
    endpoint: "/ai/yield-prediction",
    buildPayload: (form) => ({
      crop: form.crop,
      acreage: form.acreage,
      historicalYield: 30,
      rainfall: 76,
      soilMoisture: 41
    })
  },
  {
    id: "market",
    label: "Market Price Prediction",
    endpoint: "/ai/market-price-prediction",
    buildPayload: (form) => ({
      crop: form.crop,
      demandIndex: 72,
      supplyIndex: 53,
      basePrice: 24
    })
  },
  {
    id: "health",
    label: "Crop Health Score",
    endpoint: "/ai/crop-health-score",
    buildPayload: () => ({
      ndvi: 0.74,
      canopyTemperature: 29,
      moisture: 41
    })
  },
  {
    id: "insurance",
    label: "Insurance Risk",
    endpoint: "/ai/insurance-risk",
    buildPayload: () => ({
      rainfallVariance: 18,
      pestRisk: 27,
      claimHistory: 1
    })
  },
  {
    id: "digital-twin",
    label: "Digital Twin",
    endpoint: "/ai/digital-twin",
    buildPayload: (form) => ({
      crop: form.crop,
      acreage: form.acreage,
      irrigationDelayDays: 1,
      fertilizerDelayDays: 0
    })
  }
];

export default function AIWorkbench() {
  const [selectedAction, setSelectedAction] = useState(actions[0].id);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    crop: "Wheat",
    soilType: "loamy",
    season: "rabi",
    ph: 6.7,
    waterAvailability: "medium",
    acreage: 2,
    symptoms: "brown spots on lower leaf",
    file: null
  });

  const action = actions.find((item) => item.id === selectedAction) || actions[0];

  function updateField(event) {
    const { name, value, files } = event.target;
    setForm((current) => ({
      ...current,
      [name]: files ? files[0] : value
    }));
  }

  async function runAction() {
    setLoading(true);
    setResult(null);

    try {
      let response;

      if (action.usesFormData) {
        const payload = new FormData();
        payload.append("crop", form.crop);
        payload.append("symptoms", form.symptoms);
        if (form.file) {
          payload.append("image", form.file);
        }

        response = await api.post(action.endpoint, payload);
      } else {
        response = await api.post(action.endpoint, action.buildPayload(form));
      }

      setResult(response.data);
    } catch (error) {
      setResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <div className="rounded-[28px] border border-slate-200/70 bg-white/80 p-5 dark:border-white/10 dark:bg-white/5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-primary-500/12 text-primary-700 dark:text-primary-300">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display text-2xl font-bold text-slate-950 dark:text-white">AI workbench</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Trigger all core AI APIs with demo-friendly inputs.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {actions.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedAction(item.id)}
              className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                item.id === selectedAction
                  ? "border-primary-500 bg-primary-500/10 text-primary-700 dark:text-primary-200"
                  : "border-slate-200 bg-white text-slate-700 hover:border-primary-500/30 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Crop
            <input
              name="crop"
              value={form.crop}
              onChange={updateField}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-primary-500 dark:border-white/10 dark:bg-white/5"
            />
          </label>
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Soil type
            <input
              name="soilType"
              value={form.soilType}
              onChange={updateField}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-primary-500 dark:border-white/10 dark:bg-white/5"
            />
          </label>
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Season
            <select
              name="season"
              value={form.season}
              onChange={updateField}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-primary-500 dark:border-white/10 dark:bg-white/5"
            >
              <option value="rabi">Rabi</option>
              <option value="kharif">Kharif</option>
              <option value="zaid">Zaid</option>
            </select>
          </label>
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Acreage
            <input
              name="acreage"
              type="number"
              value={form.acreage}
              onChange={updateField}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-primary-500 dark:border-white/10 dark:bg-white/5"
            />
          </label>
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Symptoms
            <input
              name="symptoms"
              value={form.symptoms}
              onChange={updateField}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-primary-500 dark:border-white/10 dark:bg-white/5"
            />
          </label>
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Pest image
            <input
              name="file"
              type="file"
              onChange={updateField}
              className="mt-2 block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5"
            />
          </label>
        </div>

        <button
          type="button"
          onClick={runAction}
          disabled={loading}
          className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-primary-600 px-5 py-3 font-semibold text-white transition hover:bg-primary-500 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <Sparkles className="h-4 w-4" />
          {loading ? "Running AI simulation..." : `Run ${action.label}`}
        </button>
      </div>

      <div className="rounded-[28px] bg-slate-950 p-5 text-white dark:bg-primary-900">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-white/10 text-accent-300">
            <ScanSearch className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display text-2xl font-bold">Result console</h3>
            <p className="text-sm text-primary-100/70">Structured output from the selected AI module.</p>
          </div>
        </div>

        <div className="mt-6 rounded-[24px] border border-white/10 bg-white/5 p-4">
          <pre className="max-h-[420px] overflow-auto whitespace-pre-wrap text-sm leading-7 text-primary-50/90">
            {result
              ? JSON.stringify(result, null, 2)
              : "Run an AI feature to preview the live API response here."}
          </pre>
        </div>
      </div>
    </div>
  );
}
