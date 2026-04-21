import {
  getCropHealthScore,
  getCropRecommendation,
  getDigitalTwinSimulation,
  getFertilizerOptimization,
  getInsuranceRiskPrediction,
  getMarketPricePrediction,
  getPestDetection,
  getYieldPrediction
} from "./aiEngine.js";
import {
  deliverWhatsAppMessage,
  generateVoiceAdvisory,
  getWeatherSnapshot,
  queueFirebaseNotification
} from "./integrationService.js";

const featureMap = {
  "ai-crop-planning": {
    title: "AI Crop Planning",
    type: "crop",
    run: (payload) => getCropRecommendation(payload)
  },
  "fertilizer-optimization": {
    title: "Fertilizer Optimization",
    type: "fertilizer",
    run: (payload) => getFertilizerOptimization(payload)
  },
  "pest-detection": {
    title: "Pest Detection",
    type: "pest",
    run: (payload) => getPestDetection(payload)
  },
  "yield-prediction": {
    title: "Yield Prediction",
    type: "yield",
    run: (payload) => getYieldPrediction(payload)
  },
  "market-price-prediction": {
    title: "Market Price Prediction",
    type: "market",
    run: (payload) => getMarketPricePrediction(payload)
  },
  "insurance-predictor": {
    title: "Insurance Predictor",
    type: "insurance",
    run: (payload) => getInsuranceRiskPrediction(payload)
  },
  "digital-twin": {
    title: "Digital Twin",
    type: "digital-twin",
    run: (payload) => getDigitalTwinSimulation(payload)
  },
  "iot-sensors": {
    title: "IoT Sensors",
    type: "sensor",
    run: () => ({
      status: "live",
      soilMoisture: "41%",
      ph: 6.7,
      ec: "0.44 mS/cm",
      temperature: "28 C",
      refreshInterval: "30 seconds"
    })
  },
  "satellite-monitoring": {
    title: "Satellite Monitoring",
    type: "satellite",
    run: (payload) => getCropHealthScore(payload)
  },
  "weather-data": {
    title: "Weather Data",
    type: "weather",
    run: (payload) => getWeatherSnapshot(payload.location)
  },
  "whatsapp-ai": {
    title: "WhatsApp AI",
    type: "whatsapp",
    run: (payload) => deliverWhatsAppMessage(payload)
  },
  "voice-ai": {
    title: "Voice AI",
    type: "voice",
    run: (payload) => generateVoiceAdvisory(payload)
  },
  "ivr-system": {
    title: "IVR System",
    type: "ivr",
    run: () => ({
      status: "ready",
      campaign: "Village advisory IVR",
      reachableFarmers: 1240,
      nextCallWindow: "Tomorrow 9:00 AM"
    })
  },
  "supply-chain": {
    title: "Supply Chain",
    type: "supply-chain",
    run: () => ({
      buyerWindow: "3 days",
      logisticsStatus: "Ready",
      mandiDemand: "Strong",
      recommendedAction: "Prepare grade-A lots first"
    })
  },
  "alerts-system": {
    title: "Alerts System",
    type: "alerts",
    run: () =>
      queueFirebaseNotification({
        topic: "farmer-alerts",
        title: "Weather advisory",
        message: "Light rain probability is rising in the next 48 hours."
      })
  },
  "farm-ledger": {
    title: "Farm Ledger",
    type: "ledger",
    run: () => ({
      spendToDate: "Rs 14,800",
      projectedRevenue: "Rs 41,000",
      projectedMargin: "+18%",
      nextEntry: "Add fertilizer invoice"
    })
  },
  "carbon-scoring": {
    title: "Carbon Scoring",
    type: "carbon",
    run: () => ({
      carbonScore: "B+",
      residueManagement: "Good",
      regenerativeImpact: "Improving",
      nextPractice: "Increase cover crop coverage"
    })
  },
  "water-analytics": {
    title: "Water Analytics",
    type: "water",
    run: () => ({
      irrigationWindow: "Tomorrow 6-9 AM",
      stressRisk: "Low",
      waterSavingsPotential: "12%",
      sensorBasis: "Moisture + wind profile"
    })
  },
  "community-advisory": {
    title: "Community Advisory",
    type: "community",
    run: () => ({
      segment: "Wheat farmers",
      messageCount: 248,
      language: "Hindi + English",
      delivery: "WhatsApp + IVR"
    })
  },
  "credit-readiness": {
    title: "Credit Readiness",
    type: "credit",
    run: () => ({
      score: "82/100",
      lenderReadiness: "Healthy",
      note: "Strong crop profile and stable revenue outlook."
    })
  },
  "subscription-billing": {
    title: "Subscription Billing",
    type: "billing",
    run: () => ({
      plan: "starter",
      amount: 99,
      currency: "INR",
      status: "ready-for-payment-gateway"
    })
  },
  "admin-intelligence": {
    title: "Admin Intelligence",
    type: "admin-intelligence",
    run: () => ({
      totalFarmers: 1284,
      activeSensors: 2408,
      aiAccuracy: "93.4%",
      leadRouting: "active"
    })
  }
};

export function runPlatformFeature(slug, payload = {}) {
  const feature = featureMap[slug];

  if (!feature) {
    const error = new Error("Feature not found");
    error.statusCode = 404;
    throw error;
  }

  return {
    feature: feature.title,
    type: feature.type,
    generatedAt: new Date().toISOString(),
    result: feature.run(payload)
  };
}
