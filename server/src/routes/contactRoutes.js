import { Router } from "express";
import { getContactLeads, submitContactLead } from "../controllers/contactController.js";
import { authorize, protect } from "../middleware/auth.js";
import { validateRequest } from "../middleware/validate.js";

const router = Router();

router.post(
  "/",
  validateRequest({
    body: {
      name: { required: true, minLength: 2, message: "Name is required" },
      email: { required: true, type: "email", message: "Valid email is required" },
      phone: { type: "phone", message: "Valid phone number is required" }
    }
  }),
  submitContactLead
);
router.get("/", protect, authorize("admin"), getContactLeads);

export default router;
