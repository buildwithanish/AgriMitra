import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { Cpu, IndianRupee, Radar, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../services/api";
import Sidebar from "../components/dashboard/Sidebar";
import TopBar from "../components/dashboard/TopBar";
import MetricCard from "../components/dashboard/MetricCard";
import ChartBlock from "../components/dashboard/ChartBlock";
import GlassPanel from "../components/GlassPanel";

const defaultAdmin = {
  metrics: {
    totalUsers: "1,284",
    monthlyRevenue: "\u20B91.27L",
    activeSensors: "2,408",
    predictionAccuracy: "93.4%"
  },
  revenueTrend: [
    { month: "Jan", revenue: 68 },
    { month: "Feb", revenue: 74 },
    { month: "Mar", revenue: 86 },
    { month: "Apr", revenue: 94 },
    { month: "May", revenue: 108 }
  ],
  userGrowth: [
    { month: "Jan", users: 420 },
    { month: "Feb", users: 580 },
    { month: "Mar", users: 770 },
    { month: "Apr", users: 930 },
    { month: "May", users: 1284 }
  ],
  predictionMix: [
    { name: "Crop", value: 31 },
    { name: "Yield", value: 22 },
    { name: "Pest", value: 18 },
    { name: "Market", value: 17 },
    { name: "Insurance", value: 12 }
  ],
  users: [
    { _id: "1", name: "Aditi Sharma", email: "aditi@example.com", role: "farmer", plan: "starter", farms: 2 },
    { _id: "2", name: "Rahul Mehta", email: "rahul@example.com", role: "farmer", plan: "starter", farms: 1 },
    { _id: "3", name: "Meera Patel", email: "meera@example.com", role: "admin", plan: "enterprise", farms: 14 }
  ],
  aiPredictions: [
    { title: "Crop planning", score: "94%", volume: "12.4k runs" },
    { title: "Market pricing", score: "89%", volume: "8.7k runs" },
    { title: "Pest detection", score: "91%", volume: "5.6k runs" }
  ],
  sensors: [
    { _id: "1", sensorType: "Soil Moisture", value: 41, unit: "%", status: "active", farm: { name: "GreenRise Demo Farm" } },
    { _id: "2", sensorType: "Soil pH", value: 6.7, unit: "pH", status: "active", farm: { name: "GreenRise Demo Farm" } },
    { _id: "3", sensorType: "Temperature", value: 28, unit: "\u00B0C", status: "active", farm: { name: "GreenRise Demo Farm" } }
  ],
  sensorHealth: [
    { zone: "North cluster", active: 92 },
    { zone: "East cluster", active: 81 },
    { zone: "Canal belt", active: 88 },
    { zone: "Highland belt", active: 75 }
  ]
};

const colors = ["#349e61", "#f3b300", "#5cc182", "#0f766e", "#86efac"];

export default function AdminPage() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(defaultAdmin);
  const [voiceQuery, setVoiceQuery] = useState("");

  useEffect(() => {
    async function loadAdminData() {
      try {
        const [dashboardResponse, userResponse, analyticsResponse, sensorResponse] = await Promise.all([
          api.get("/dashboard/admin"),
          api.get("/admin/users"),
          api.get("/admin/analytics"),
          api.get("/sensors")
        ]);

        setDashboard((current) => ({
          ...current,
          ...dashboardResponse.data,
          users: userResponse.data?.users || current.users,
          sensors: sensorResponse.data?.sensors || current.sensors,
          predictionMix: analyticsResponse.data?.predictionMix || current.predictionMix,
          revenueTrend: analyticsResponse.data?.revenueTrend || current.revenueTrend,
          userGrowth: analyticsResponse.data?.userGrowth || current.userGrowth,
          sensorHealth: analyticsResponse.data?.sensorHealth || current.sensorHealth
        }));
      } catch (error) {
        console.error(error);
      }
    }

    loadAdminData();
  }, []);

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[radial-gradient(circle_at_top_right,_rgba(243,179,0,0.15),_transparent_20%),linear-gradient(180deg,_#f7faf7_0%,_#edf6ef_100%)] p-4 dark:bg-[radial-gradient(circle_at_top_right,_rgba(243,179,0,0.14),_transparent_20%),linear-gradient(180deg,_#07170f_0%,_#0d2216_100%)] lg:p-6"
    >
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[280px_1fr]">
        <Sidebar role="admin" user={user} onLogout={handleLogout} />

        <div className="space-y-6">
          <TopBar
            title={t("admin.title")}
            subtitle={t("admin.subtitle")}
            onVoiceInput={setVoiceQuery}
            voiceQuery={voiceQuery}
            notificationCount={6}
          />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard label="Total users" value={dashboard.metrics.totalUsers} delta="+14.8%" />
            <MetricCard label="Monthly revenue" value={dashboard.metrics.monthlyRevenue} delta="MRR" tone="accent" />
            <MetricCard label="Active sensors" value={dashboard.metrics.activeSensors} delta="97% uptime" />
            <MetricCard label="Prediction accuracy" value={dashboard.metrics.predictionAccuracy} delta="weighted" tone="success" />
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <ChartBlock title="Revenue dashboard" subtitle="Subscription growth and monetization trend">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dashboard.revenueTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.18)" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip />
                    <Line type="monotone" dataKey="revenue" stroke="#349e61" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </ChartBlock>

            <ChartBlock title="AI prediction mix" subtitle="Distribution across core intelligence modules">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dashboard.predictionMix}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={70}
                      outerRadius={100}
                      paddingAngle={3}
                    >
                      {dashboard.predictionMix.map((entry, index) => (
                        <Cell key={entry.name} fill={colors[index % colors.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </ChartBlock>
          </div>

          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <ChartBlock title="User growth" subtitle="Farmers and admins onboarded over time">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dashboard.userGrowth}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.18)" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip />
                    <Bar dataKey="users" fill="#349e61" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </ChartBlock>

            <GlassPanel className="rounded-[30px] p-6">
              <h3 className="font-display text-2xl font-bold text-slate-950 dark:text-white">AI predictions overview</h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Operational readout of the highest-volume AI modules.
              </p>

              <div className="mt-6 space-y-4">
                {dashboard.aiPredictions.map((item) => (
                  <div key={item.title} className="rounded-[24px] border border-slate-200/70 bg-white/80 p-5 dark:border-white/10 dark:bg-white/5">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-primary-500/12 text-primary-700 dark:text-primary-300">
                          <Cpu className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">{item.title}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{item.volume}</p>
                        </div>
                      </div>
                      <span className="rounded-full bg-primary-500/10 px-3 py-1 text-xs font-semibold text-primary-700 dark:text-primary-300">
                        {item.score}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </GlassPanel>
          </div>

          <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <ChartBlock title="Sensor fleet health" subtitle="Zone-wise active sensor percentage">
              <div className="space-y-4">
                {dashboard.sensorHealth.map((item) => (
                  <div key={item.zone}>
                    <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-700 dark:text-slate-200">
                      <span>{item.zone}</span>
                      <span>{item.active}%</span>
                    </div>
                    <div className="h-3 rounded-full bg-slate-200 dark:bg-white/10">
                      <div className="h-3 rounded-full bg-gradient-to-r from-primary-500 to-accent-400" style={{ width: `${item.active}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </ChartBlock>

            <GlassPanel className="rounded-[30px] p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl font-bold text-slate-950 dark:text-white">Manage users</h3>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Admin roster, farmer accounts, and subscription visibility.
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="inline-flex items-center gap-2 rounded-2xl bg-primary-500/10 px-4 py-3 text-sm font-semibold text-primary-700 dark:text-primary-200">
                    <Users className="h-4 w-4" />
                    {dashboard.users.length} visible
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-2xl bg-accent-500/10 px-4 py-3 text-sm font-semibold text-accent-800 dark:text-accent-200">
                    <IndianRupee className="h-4 w-4" />
                    Starter at \u20B999
                  </div>
                </div>
              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="min-w-full text-left">
                  <thead>
                    <tr className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                      <th className="pb-4 pr-4">User</th>
                      <th className="pb-4 pr-4">Role</th>
                      <th className="pb-4 pr-4">Plan</th>
                      <th className="pb-4 pr-4">Farms</th>
                      <th className="pb-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboard.users.map((item) => (
                      <tr key={item._id} className="border-t border-slate-200/70 text-sm dark:border-white/10">
                        <td className="py-4 pr-4">
                          <p className="font-semibold text-slate-900 dark:text-white">{item.name}</p>
                          <p className="text-slate-500 dark:text-slate-400">{item.email}</p>
                        </td>
                        <td className="py-4 pr-4 capitalize text-slate-700 dark:text-slate-200">{item.role}</td>
                        <td className="py-4 pr-4 capitalize text-slate-700 dark:text-slate-200">{item.plan}</td>
                        <td className="py-4 pr-4 text-slate-700 dark:text-slate-200">{item.farms}</td>
                        <td className="py-4">
                          <span className="inline-flex items-center gap-2 rounded-full bg-primary-500/10 px-3 py-1 font-semibold text-primary-700 dark:text-primary-300">
                            <Radar className="h-3.5 w-3.5" />
                            Active
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassPanel>
          </div>

          <GlassPanel className="rounded-[30px] p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-2xl font-bold text-slate-950 dark:text-white">Manage sensors</h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Latest telemetry nodes available through the sensor data API.
                </p>
              </div>
              <span className="rounded-full bg-primary-500/10 px-4 py-2 text-sm font-semibold text-primary-700 dark:text-primary-300">
                {dashboard.sensors.length} active feeds
              </span>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {dashboard.sensors.slice(0, 3).map((sensor) => (
                <div
                  key={sensor._id}
                  className="rounded-[24px] border border-slate-200/70 bg-white/80 p-5 dark:border-white/10 dark:bg-white/5"
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-primary-700 dark:text-primary-300">
                    {sensor.farm?.name || "Demo farm"}
                  </p>
                  <p className="mt-3 font-display text-xl font-bold text-slate-950 dark:text-white">
                    {sensor.sensorType}
                  </p>
                  <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                    {sensor.value}
                    {sensor.unit}
                  </p>
                  <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Status: {sensor.status}</p>
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>
      </div>
    </motion.div>
  );
}
