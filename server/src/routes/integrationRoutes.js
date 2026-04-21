import { Router } from "express";
import { firebase, voice, weather, whatsapp } from "../controllers/integrationController.js";

const router = Router();

router.get("/weather", weather);
router.post("/whatsapp", whatsapp);
router.post("/voice", voice);
router.post("/firebase", firebase);

export default router;
