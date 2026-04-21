import { asyncHandler } from "../utils/asyncHandler.js";
import { getAdminDashboardData, getFarmerDashboardData } from "../services/dashboardService.js";

export const farmerDashboard = asyncHandler(async (req, res) => {
  const data = await getFarmerDashboardData(req.user._id);
  res.json({ success: true, data });
});

export const adminDashboard = asyncHandler(async (req, res) => {
  const data = await getAdminDashboardData();
  res.json({ success: true, data });
});
