import { Router } from "express";
import { analytics, listUsers } from "../controllers/adminController.js";

const router = Router();

router.get("/users", listUsers);
router.get("/analytics", analytics);

export default router;
