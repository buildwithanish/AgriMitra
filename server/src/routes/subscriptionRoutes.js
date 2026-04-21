import { Router } from "express";
import { checkout } from "../controllers/subscriptionController.js";

const router = Router();

router.post("/checkout", checkout);

export default router;
