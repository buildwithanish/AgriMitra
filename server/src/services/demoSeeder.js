import bcrypt from "bcryptjs";
import {
  createContactLead,
  countUsers,
  createAlerts,
  createFarm,
  createPrediction,
  createSensorData,
  createUser
} from "../repositories/platformRepository.js";

export async function seedInitialData() {
  const userCount = await countUsers();

  if (userCount > 0) {
    return;
  }

  const [adminPassword, farmerPassword] = await Promise.all([
    bcrypt.hash("Admin@123", 10),
    bcrypt.hash("Farmer@123", 10)
  ]);

  const admin = await createUser({
    name: "AI Village Admin",
    email: "admin@aivillagebrain.com",
    password: adminPassword,
    role: "admin",
    subscriptionPlan: "enterprise",
    farmCount: 14
  });

  const farmer = await createUser({
    name: "Farmer Workspace",
    email: "farmer@aivillagebrain.com",
    password: farmerPassword,
    role: "farmer",
    subscriptionPlan: "starter",
    farmCount: 2
  });

  const operator = await createUser({
    name: "Cluster Operator",
    email: "operator@aivillagebrain.com",
    password: farmerPassword,
    role: "farmer",
    subscriptionPlan: "growth",
    farmCount: 4
  });

  const enterpriseFarmer = await createUser({
    name: "Enterprise Farmer",
    email: "enterprise@aivillagebrain.com",
    password: farmerPassword,
    role: "farmer",
    subscriptionPlan: "enterprise",
    farmCount: 6
  });

  const farm = await createFarm({
    owner: farmer._id,
    name: "GreenRise Farm",
    location: {
      village: "Pimpalgaon",
      district: "Nashik",
      state: "Maharashtra"
    },
    acreage: 2.5,
    soilType: "loamy",
    currentCrop: "Wheat",
    irrigationType: "drip"
  });

  const operatorFarm = await createFarm({
    owner: operator._id,
    name: "Riverbend Cluster Farm",
    location: {
      village: "Sinnar",
      district: "Nashik",
      state: "Maharashtra"
    },
    acreage: 5.2,
    soilType: "black",
    currentCrop: "Soybean",
    irrigationType: "sprinkler"
  });

  const enterpriseFarm = await createFarm({
    owner: enterpriseFarmer._id,
    name: "Suncrest Enterprise Plot",
    location: {
      village: "Dindori",
      district: "Nashik",
      state: "Maharashtra"
    },
    acreage: 8.4,
    soilType: "sandy-loam",
    currentCrop: "Tomato",
    irrigationType: "drip"
  });

  await Promise.all([
    createSensorData({ farm: farm._id, sensorType: "Soil Moisture", value: 41, unit: "%", status: "active" }),
    createSensorData({ farm: farm._id, sensorType: "Soil pH", value: 6.7, unit: "pH", status: "active" }),
    createSensorData({ farm: farm._id, sensorType: "Temperature", value: 28, unit: "\u00B0C", status: "active" }),
    createSensorData({ farm: farm._id, sensorType: "EC", value: 0.44, unit: "mS/cm", status: "active" }),
    createSensorData({ farm: operatorFarm._id, sensorType: "Soil Moisture", value: 38, unit: "%", status: "active" }),
    createSensorData({ farm: operatorFarm._id, sensorType: "Temperature", value: 31, unit: "\u00B0C", status: "active" }),
    createSensorData({ farm: enterpriseFarm._id, sensorType: "Soil pH", value: 6.3, unit: "pH", status: "active" }),
    createSensorData({ farm: enterpriseFarm._id, sensorType: "Humidity", value: 68, unit: "%", status: "active" })
  ]);

  await createAlerts([
    {
      user: farmer._id,
      severity: "medium",
      title: "Leaf rust watch",
      message: "Monitor wheat block B in the next 48 hours and keep airflow high."
    },
    {
      user: farmer._id,
      severity: "low",
      title: "Irrigation window",
      message: "Best irrigation window opens tomorrow morning based on wind and moisture profile."
    },
    {
      user: admin._id,
      severity: "medium",
      title: "North cluster sensor drift",
      message: "Three moisture nodes are reporting unusually low variance."
    },
    {
      user: operator._id,
      severity: "high",
      title: "Soybean pest advisory",
      message: "Field scouting recommended in the east block due to rising leaf spot signals."
    },
    {
      user: enterpriseFarmer._id,
      severity: "medium",
      title: "Tomato irrigation timing",
      message: "Shift irrigation to early morning to reduce afternoon stress and water loss."
    }
  ]);

  await Promise.all([
    createPrediction({
      user: farmer._id,
      farm: farm._id,
      type: "crop",
      input: { crop: "Wheat", soilType: "loamy", season: "rabi" },
      output: { crop: "Wheat", confidence: "92%", rationale: "Best fit for current field conditions." },
      confidence: 92
    }),
    createPrediction({
      user: farmer._id,
      farm: farm._id,
      type: "yield",
      input: { crop: "Wheat", acreage: 2.5, rainfall: 76 },
      output: { forecast: "4.4 tons", confidence: "89%", outlook: "Stable if irrigation timing holds." },
      confidence: 89
    }),
    createPrediction({
      user: farmer._id,
      farm: farm._id,
      type: "market",
      input: { crop: "Wheat", mandi: "Nashik" },
      output: { trend: "Upward", confidence: "87%", window: "3-5 days" },
      confidence: 87
    }),
    createPrediction({
      user: operator._id,
      farm: operatorFarm._id,
      type: "fertilizer",
      input: { crop: "Soybean", nitrogen: 36, phosphorous: 22, potassium: 18 },
      output: { action: "Reduce urea by 9%", confidence: "90%", note: "Add micronutrient blend." },
      confidence: 90
    }),
    createPrediction({
      user: operator._id,
      farm: operatorFarm._id,
      type: "pest",
      input: { crop: "Soybean", symptom: "leaf spots" },
      output: { risk: "Moderate", confidence: "88%", note: "Scout lower canopy tomorrow morning." },
      confidence: 88
    }),
    createPrediction({
      user: enterpriseFarmer._id,
      farm: enterpriseFarm._id,
      type: "insurance",
      input: { rainfallVariance: 18, pestRisk: 27, claimHistory: 1 },
      output: { risk: "Low to moderate", confidence: "86%", note: "Maintain crop health records." },
      confidence: 86
    }),
    createPrediction({
      user: enterpriseFarmer._id,
      farm: enterpriseFarm._id,
      type: "digital-twin",
      input: { crop: "Tomato", irrigationDelayDays: 1, fertilizerDelayDays: 0 },
      output: { scenario: "Minor stress", confidence: "91%", note: "No major yield loss expected." },
      confidence: 91
    })
  ]);

  await Promise.all([
    createContactLead({
      name: "Suresh Patil",
      email: "suresh@greenrise.in",
      phone: "+91 9509868673",
      role: "farmer",
      interest: "starter-plan",
      message: "Need guidance for wheat advisory and mobile alerts.",
      source: "website"
    }),
    createContactLead({
      name: "Aditi Sharma",
      email: "aditi@clusterops.in",
      phone: "+91 9509868673",
      role: "operator",
      interest: "enterprise-consultation",
      message: "Looking for district-level rollout with admin analytics and contact workflows.",
      source: "contact-modal"
    }),
    createContactLead({
      name: "Rahul Deshmukh",
      email: "rahul@mandiwatch.in",
      phone: "+91 9509868673",
      role: "agribusiness",
      interest: "integration-help",
      message: "Need market prediction APIs and subscription setup for our field team.",
      source: "website"
    })
  ]);

  console.log("Initial platform data seeded successfully");
}
