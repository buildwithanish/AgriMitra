import { Router } from "express";
import { profile, updateProfile } from "../controllers/userController.js";
import { validateRequest } from "../middleware/validate.js";

const router = Router();

router.get("/profile", profile);
router.put(
  "/profile",
  validateRequest({
    body: {
      language: { enum: ["en", "hi"], message: "Language must be en or hi" }
    }
  }),
  updateProfile
);

export default router;
