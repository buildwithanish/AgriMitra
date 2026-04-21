import bcrypt from "bcryptjs";
import {
  createUser as createPlatformUser,
  countContactLeads,
  countPredictions,
  countSensors,
  countUsers,
  findUserByEmail,
  listPredictions,
  listUsers as listPlatformUsers,
  updateUser as updatePlatformUser
} from "../repositories/platformRepository.js";
import { userPayload } from "./authController.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const listUsers = asyncHandler(async (req, res) => {
  const users = await listPlatformUsers();
  res.json({ success: true, data: { users } });
});

export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role = "farmer", subscriptionPlan = "starter", farmCount = 1, language = "en" } = req.body;

  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    res.status(409);
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createPlatformUser({
    name: String(name).trim(),
    email: String(email).trim().toLowerCase(),
    password: hashedPassword,
    role,
    subscriptionPlan,
    farmCount: Number(farmCount || 1),
    language
  });

  res.status(201).json({
    success: true,
    data: { user: userPayload(user) },
    message: `${role === "admin" ? "Admin" : "User"} created successfully`
  });
});

export const updateUser = asyncHandler(async (req, res) => {
  const { role, subscriptionPlan, farmCount, language, name, isBlocked } = req.body;

  if (role && !["admin", "farmer"].includes(role)) {
    res.status(400);
    throw new Error("Invalid role");
  }

  const user = await updatePlatformUser(req.params.id, {
    role,
    subscriptionPlan,
    farmCount: farmCount === undefined ? undefined : Number(farmCount),
    language,
    name,
    isBlocked
  });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.json({ success: true, data: { user }, message: "User updated successfully" });
});

export const analytics = asyncHandler(async (req, res) => {
  const users = await listPlatformUsers();
  const predictions = await listPredictions({ limit: 500 });
  const [predictionCount, sensorCount, userCount, contactLeadCount] = await Promise.all([
    countPredictions(),
    countSensors(),
    countUsers(),
    countContactLeads()
  ]);
  const now = Date.now();
  const activeSessions = users.filter((item) => {
    if (!item.lastLogin) {
      return false;
    }

    return now - new Date(item.lastLogin).getTime() <= 24 * 60 * 60 * 1000;
  }).length;

  const planMix = users.reduce((accumulator, item) => {
    const plan = item.plan || item.subscriptionPlan || "starter";
    accumulator[plan] = (accumulator[plan] || 0) + 1;
    return accumulator;
  }, {});

  const featureUsage = predictions.reduce((accumulator, item) => {
    const key = item.type || "other";
    accumulator[key] = (accumulator[key] || 0) + 1;
    return accumulator;
  }, {});

  res.json({
    success: true,
    data: {
      predictionCount,
      sensorCount,
      userCount,
      contactLeadCount,
      activeSessions,
      planMix,
      featureUsage,
      predictionMix: [
        { name: "Crop", value: 31 },
        { name: "Yield", value: 22 },
        { name: "Pest", value: 18 },
        { name: "Market", value: 17 },
        { name: "Insurance", value: 12 }
      ],
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
        { month: "May", users: userCount || 1284 }
      ],
      sensorHealth: [
        { zone: "North cluster", active: 92 },
        { zone: "East cluster", active: 81 },
        { zone: "Canal belt", active: 88 },
        { zone: "Highland belt", active: 75 }
      ]
    }
  });
});
