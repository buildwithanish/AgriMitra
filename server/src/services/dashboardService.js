import {
  findFarmByOwner,
  listAlerts,
  listPredictions,
  listSensorData,
  listUsers
} from "../repositories/platformRepository.js";
import { getWeatherSimulation } from "./integrationService.js";

export async function getFarmerDashboardData(userId) {
  const farm = await findFarmByOwner(userId);
  const [alerts, sensorData, predictions] = await Promise.all([
    listAlerts({ userId, limit: 6 }),
    listSensorData({ farmId: farm?._id, limit: 12 }),
    listPredictions({ userId, limit: 10 })
  ]);

  const latestMoisture =
    sensorData.find((sensor) => sensor.sensorType.toLowerCase().includes("moisture"))?.value || 41;
  const weather = getWeatherSimulation(
    farm ? `${farm.location.district || "Nashik"}, ${farm.location.state || "Maharashtra"}` : undefined
  );

  return {
    metrics: {
      cropScore: "91/100",
      incomePotential: "+18%",
      alertCount: String(alerts.length || 4).padStart(2, "0"),
      mandiWindow: "3 days"
    },
    weather,
    soil: {
      ph: 6.7,
      moisture: latestMoisture,
      nitrogen: "Medium",
      conductivity: "0.44 mS/cm"
    },
    cropRecommendations: [
      {
        crop: farm?.currentCrop || "Wheat",
        rationale: "High suitability for current field profile, stable price trend, and manageable input load.",
        confidence: "92%"
      },
      {
        crop: "Chickpea",
        rationale: "Improves profit resilience and works well with current moisture and market conditions.",
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
    recentPredictions: predictions,
    alerts
  };
}

export async function getAdminDashboardData() {
  const [users, predictions, sensors] = await Promise.all([
    listUsers(),
    listPredictions({ limit: 30 }),
    listSensorData({ limit: 40 })
  ]);

  return {
    metrics: {
      totalUsers: String(users.length || 1284),
      monthlyRevenue: "\u20B91.27L",
      activeSensors: String(sensors.length || 2408),
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
      { month: "May", users: users.length || 1284 }
    ],
    predictionMix: [
      { name: "Crop", value: 31 },
      { name: "Yield", value: 22 },
      { name: "Pest", value: 18 },
      { name: "Market", value: 17 },
      { name: "Insurance", value: 12 }
    ],
    aiPredictions: [
      { title: "Crop planning", score: "94%", volume: `${predictions.filter((p) => p.type === "crop").length || 12400} runs` },
      { title: "Market pricing", score: "89%", volume: "8.7k runs" },
      { title: "Pest detection", score: "91%", volume: "5.6k runs" }
    ],
    sensorHealth: [
      { zone: "North cluster", active: 92 },
      { zone: "East cluster", active: 81 },
      { zone: "Canal belt", active: 88 },
      { zone: "Highland belt", active: 75 }
    ],
    users
  };
}
