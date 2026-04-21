import { useDeferredValue, useEffect, useState, startTransition } from "react";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { BellRing, CloudRainWind, Sprout, TrendingUp, Wheat } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../services/api";
import { getSocket } from "../services/socket";
import Sidebar from "../components/dashboard/Sidebar";
import TopBar from "../components/dashboard/TopBar";
import MetricCard from "../components/dashboard/MetricCard";
import ChartBlock from "../components/dashboard/ChartBlock";
import AIWorkbench from "../components/dashboard/AIWorkbench";
import GlassPanel from "../components/GlassPanel";

const defaultDashboard = {
  metrics: {
    cropScore: "91/100",
    incomePotential: "+18%",
    alertCount: "04",
    mandiWindow: "3 days"
  },
  weather: {
    location: "Nashik, Maharashtra",
    temperature: 28,
    condition: "Clouds with light wind",
    humidity: 64,
    rainfallChance: 32
  },
  soil: {
    ph: 6.7,
    moisture: 41,
    nitrogen: "Medium",
    conductivity: "0.44 mS/cm"
  },
  cropRecommendations: [
    {
      crop: "Wheat",
      rationale: "High suitability for current moisture and mild temperature pattern.",
      confidence: "92%"
    },
    {
      crop: "Chickpea",
      rationale: "Strong profitability outlook with moderate fertilizer demand.",
      confidence: "88%"
    }
  ],
  marketTrends: [
    { name: "Mon", price: 23 },
    { name: "Tue", price: 24 },
    { name: "Wed", price: 25 },
    { name: "Thu", price: 27 },
    { name: "Fri", price: 29 }
  ],
  yieldForecast: [
    { name: "Week 1", yield: 32 },
    { name: "Week 2", yield: 36 },
    { name: "Week 3", yield: 40 },
    { name: "Week 4", yield: 44 }
  ],
  alerts: [
    { _id: "1", severity: "medium", title: "Leaf rust watch", message: "Monitor wheat block B in the next 48 hours." },
    { _id: "2", severity: "low", title: "Irrigation window", message: "Best irrigation window opens tomorrow morning." }
  ]
};

export default function DashboardPage() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(defaultDashboard);
  const [voiceQuery, setVoiceQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const deferredQuery = useDeferredValue(voiceQuery);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [dashboardResponse, notificationResponse] = await Promise.all([
          api.get("/dashboard/farmer"),
          api.get("/notifications")
        ]);

        setDashboard((current) => ({
          ...current,
          ...dashboardResponse.data,
          alerts: notificationResponse.data?.alerts || dashboardResponse.data.alerts
        }));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  useEffect(() => {
    const socket = getSocket();

    socket.on("alert:new", (alert) => {
      startTransition(() => {
        setDashboard((current) => ({
          ...current,
          alerts: [alert, ...(current.alerts || [])].slice(0, 6)
        }));
      });
    });

    return () => {
      socket.off("alert:new");
    };
  }, []);

  const filteredRecommendations = dashboard.cropRecommendations.filter((item) => {
    if (!deferredQuery) {
      return true;
    }

    const search = deferredQuery.toLowerCase();
    return item.crop.toLowerCase().includes(search) || item.rationale.toLowerCase().includes(search);
  });

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(92,193,130,0.15),_transparent_25%),linear-gradient(180deg,_#f4fbf7_0%,_#edf6ef_100%)] p-4 dark:bg-[radial-gradient(circle_at_top_left,_rgba(92,193,130,0.14),_transparent_22%),linear-gradient(180deg,_#07170f_0%,_#0b1f14_100%)] lg:p-6"
    >
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[280px_1fr]">
        <Sidebar role="farmer" user={user} onLogout={handleLogout} />

        <div className="space-y-6">
          <TopBar
            title={t("dashboard.title")}
            subtitle={t("dashboard.subtitle")}
            onVoiceInput={setVoiceQuery}
            voiceQuery={voiceQuery}
            notificationCount={dashboard.alerts?.length || 0}
          />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard label="Crop health score" value={dashboard.metrics.cropScore} delta="+4.2%" tone="success" />
            <MetricCard label="Income upside" value={dashboard.metrics.incomePotential} delta="AI pricing" tone="accent" />
            <MetricCard label="Active alerts" value={dashboard.metrics.alertCount} delta="Realtime" />
            <MetricCard label="Market timing" value={dashboard.metrics.mandiWindow} delta="Optimal sell window" />
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <ChartBlock title="Market price prediction" subtitle="Expected mandi curve for the next 5 trading days">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dashboard.marketTrends}>
                    <defs>
                      <linearGradient id="priceTrend" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#349e61" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#349e61" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.18)" />
                    <XAxis dataKey="name" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip />
                    <Area type="monotone" dataKey="price" stroke="#349e61" fill="url(#priceTrend)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </ChartBlock>

            <ChartBlock title="Weather snapshot" subtitle={dashboard.weather.location}>
              <div className="space-y-5">
                <div className="flex items-center gap-4 rounded-[24px] bg-primary-500/10 p-5 text-primary-800 dark:text-primary-100">
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-primary-600 text-white">
                    <CloudRainWind className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold">{dashboard.weather.temperature}{"\u00B0C"}</p>
                    <p className="text-sm text-primary-800/70 dark:text-primary-100/70">
                      {dashboard.weather.condition}
                    </p>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    ["Humidity", `${dashboard.weather.humidity}%`],
                    ["Rain chance", `${dashboard.weather.rainfallChance}%`],
                    ["Soil pH", `${dashboard.soil.ph}`],
                    ["Moisture", `${dashboard.soil.moisture}%`]
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-[22px] border border-slate-200/70 bg-white/80 p-4 dark:border-white/10 dark:bg-white/5">
                      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
                      <p className="mt-2 text-xl font-bold text-slate-950 dark:text-white">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ChartBlock>
          </div>

          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <ChartBlock title="Yield prediction" subtitle="4-week harvest outlook based on current simulation">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dashboard.yieldForecast}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.18)" />
                    <XAxis dataKey="name" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip />
                    <Bar dataKey="yield" fill="#f3b300" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </ChartBlock>

            <ChartBlock
              title="Crop recommendations"
              subtitle={loading ? "Loading live recommendations..." : "Based on soil, weather, and profitability"}
            >
              <div className="space-y-4">
                {filteredRecommendations.map((item) => (
                  <div
                    key={item.crop}
                    className="rounded-[24px] border border-slate-200/70 bg-white/80 p-5 dark:border-white/10 dark:bg-white/5"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-primary-500/12 text-primary-700 dark:text-primary-300">
                          <Wheat className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-display text-xl font-bold text-slate-950 dark:text-white">{item.crop}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{item.confidence} confidence</p>
                        </div>
                      </div>
                      <span className="rounded-full bg-primary-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-700 dark:text-primary-300">
                        Recommended
                      </span>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.rationale}</p>
                  </div>
                ))}
              </div>
            </ChartBlock>
          </div>

          <AIWorkbench />

          <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
            <ChartBlock title="Alerts & notifications" subtitle="Streaming in from the backend notification system">
              <div className="space-y-4">
                {dashboard.alerts.map((alert) => (
                  <div key={alert._id} className="rounded-[24px] border border-slate-200/70 bg-white/80 p-4 dark:border-white/10 dark:bg-white/5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent-500/12 text-accent-700 dark:text-accent-300">
                          <BellRing className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">{alert.title}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{alert.message}</p>
                        </div>
                      </div>
                      <span className="rounded-full bg-primary-500/10 px-3 py-1 text-xs font-semibold text-primary-700 dark:text-primary-300">
                        {alert.severity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ChartBlock>

            <GlassPanel className="grid gap-5 rounded-[30px] p-6 md:grid-cols-2">
              <div className="rounded-[26px] bg-slate-950 p-5 text-white dark:bg-primary-900">
                <p className="text-xs uppercase tracking-[0.18em] text-primary-100/65">AI copilots</p>
                <div className="mt-5 space-y-4">
                  {[
                    { title: "Fertilizer optimization", detail: "Reduce urea by 11% and add micronutrient blend." },
                    { title: "Insurance risk score", detail: "Low-to-moderate drought exposure this month." },
                    { title: "Digital twin", detail: "2-day irrigation delay may cut yield by 3.4%." }
                  ].map((item) => (
                    <div key={item.title} className="rounded-2xl bg-white/6 p-4">
                      <p className="font-semibold">{item.title}</p>
                      <p className="mt-2 text-sm text-primary-100/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-[26px] border border-slate-200/70 bg-white/80 p-5 dark:border-white/10 dark:bg-white/5">
                  <div className="flex items-center gap-3">
                    <Sprout className="h-5 w-5 text-primary-600" />
                    <p className="font-display text-xl font-bold text-slate-950 dark:text-white">Soil intelligence</p>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    Nitrogen: {dashboard.soil.nitrogen}, conductivity: {dashboard.soil.conductivity}, moisture:
                    {` ${dashboard.soil.moisture}%`}.
                  </p>
                </div>
                <div className="rounded-[26px] border border-slate-200/70 bg-white/80 p-5 dark:border-white/10 dark:bg-white/5">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-5 w-5 text-primary-600" />
                    <p className="font-display text-xl font-bold text-slate-950 dark:text-white">Income engine</p>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    Current price timing and fertilizer savings indicate a projected improvement in net margin this cycle.
                  </p>
                </div>
              </div>
            </GlassPanel>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
