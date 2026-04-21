import { listAlerts } from "../repositories/platformRepository.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getNotifications = asyncHandler(async (req, res) => {
  const alerts = await listAlerts({ userId: req.user._id, limit: 10 });
  res.json({ success: true, data: { alerts } });
});
