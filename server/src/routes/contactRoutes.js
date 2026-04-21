import { Router } from "express";
import { getContactLeads, submitContactLead } from "../controllers/contactController.js";
import { authorize, protect } from "../middleware/auth.js";

const router = Router();

router.post("/", submitContactLead);
router.get("/", protect, authorize("admin"), getContactLeads);

export default router;
