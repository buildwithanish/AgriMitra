import { Router } from "express";
import { createSensorData, listSensors } from "../controllers/sensorController.js";

const router = Router();

router.get("/", listSensors);
router.post("/", createSensorData);

export default router;
