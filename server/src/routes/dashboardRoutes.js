import { Router } from "express";
import { adminDashboard, farmerDashboard } from "../controllers/dashboardController.js";
import { authorize } from "../middleware/auth.js";

const router = Router();

router.get("/farmer", farmerDashboard);
router.get("/admin", authorize("admin"), adminDashboard);

export default router;
