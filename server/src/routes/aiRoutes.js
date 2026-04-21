import { Router } from "express";
import multer from "multer";
import {
  cropHealthScore,
  cropRecommendation,
  digitalTwinSimulation,
  fertilizerOptimization,
  insuranceRiskPrediction,
  marketPricePrediction,
  pestDetection,
  yieldPrediction
} from "../controllers/aiController.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/crop-recommendation", cropRecommendation);
router.post("/fertilizer-optimization", fertilizerOptimization);
router.post("/pest-detection", upload.single("image"), pestDetection);
router.post("/yield-prediction", yieldPrediction);
router.post("/market-price-prediction", marketPricePrediction);
router.post("/crop-health-score", cropHealthScore);
router.post("/insurance-risk", insuranceRiskPrediction);
router.post("/digital-twin", digitalTwinSimulation);

export default router;
