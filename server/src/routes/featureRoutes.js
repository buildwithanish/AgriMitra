import { Router } from "express";
import { runFeature } from "../controllers/featureController.js";

const router = Router();

router.post("/:slug/run", runFeature);

export default router;
