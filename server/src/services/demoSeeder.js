import bcrypt from "bcryptjs";
import {
  countUsers,
  createAlerts,
  createFarm,
  createSensorData,
  createUser
} from "../repositories/platformRepository.js";

export async function seedDemoData() {
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
    name: "Farmer Demo",
    email: "farmer@aivillagebrain.com",
    password: farmerPassword,
    role: "farmer",
    subscriptionPlan: "starter",
    farmCount: 2
  });

  const farm = await createFarm({
    owner: farmer._id,
    name: "GreenRise Demo Farm",
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

  await Promise.all([
    createSensorData({ farm: farm._id, sensorType: "Soil Moisture", value: 41, unit: "%", status: "active" }),
    createSensorData({ farm: farm._id, sensorType: "Soil pH", value: 6.7, unit: "pH", status: "active" }),
    createSensorData({ farm: farm._id, sensorType: "Temperature", value: 28, unit: "\u00B0C", status: "active" }),
    createSensorData({ farm: farm._id, sensorType: "EC", value: 0.44, unit: "mS/cm", status: "active" })
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
    }
  ]);

  console.log("Demo data seeded successfully");
}
