import {
  countContactLeads,
  countPredictions,
  countSensors,
  countUsers,
  listUsers as listPlatformUsers,
  updateUser as updatePlatformUser
} from "../repositories/platformRepository.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const listUsers = asyncHandler(async (req, res) => {
  const users = await listPlatformUsers();
  res.json({ success: true, data: { users } });
});

export const updateUser = asyncHandler(async (req, res) => {
  const { role, subscriptionPlan, farmCount, language, name } = req.body;

  if (role && !["admin", "farmer"].includes(role)) {
    res.status(400);
    throw new Error("Invalid role");
  }

  const user = await updatePlatformUser(req.params.id, {
    role,
    subscriptionPlan,
    farmCount: farmCount === undefined ? undefined : Number(farmCount),
    language,
    name
  });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.json({ success: true, data: { user }, message: "User updated successfully" });
});

export const analytics = asyncHandler(async (req, res) => {
  const users = await listPlatformUsers();
  const [predictionCount, sensorCount, userCount, contactLeadCount] = await Promise.all([
    countPredictions(),
    countSensors(),
    countUsers(),
    countContactLeads()
  ]);

  const planMix = users.reduce((accumulator, item) => {
    const plan = item.plan || item.subscriptionPlan || "starter";
    accumulator[plan] = (accumulator[plan] || 0) + 1;
    return accumulator;
  }, {});

  res.json({
    success: true,
    data: {
      predictionCount,
      sensorCount,
      userCount,
      contactLeadCount,
      planMix,
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
