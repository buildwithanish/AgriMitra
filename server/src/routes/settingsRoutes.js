import { Router } from "express";
import {
  adminSettings,
  publicSettings,
  updateSettings
} from "../controllers/settingsController.js";
import { authorize, protect } from "../middleware/auth.js";

const router = Router();

router.get("/", publicSettings);
router.get("/admin", protect, authorize("admin"), adminSettings);
router.post("/admin", protect, authorize("admin"), updateSettings);
router.put("/admin", protect, authorize("admin"), updateSettings);

export default router;
