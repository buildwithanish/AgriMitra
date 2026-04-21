import {
  createPrediction,
  findFarmByOwner
} from "../repositories/platformRepository.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  getCropHealthScore,
  getCropRecommendation,
  getDigitalTwinSimulation,
  getFertilizerOptimization,
  getInsuranceRiskPrediction,
  getMarketPricePrediction,
  getPestDetection,
  getYieldPrediction
} from "../services/aiEngine.js";

async function savePrediction(userId, type, input, output) {
  const farm = await findFarmByOwner(userId);
  const rawConfidence = String(output.confidence || output.score || "90");
  const confidenceMatch = rawConfidence.match(/\d+(\.\d+)?/);
  await createPrediction({
    user: userId,
    farm: farm?._id,
    type,
    input,
    output,
    confidence: Number.parseFloat(confidenceMatch?.[0] || "90")
  });
}

export const cropRecommendation = asyncHandler(async (req, res) => {
  const result = getCropRecommendation(req.body);
  await savePrediction(req.user._id, "crop", req.body, result);
  res.json({ success: true, data: result });
});

export const fertilizerOptimization = asyncHandler(async (req, res) => {
  const result = getFertilizerOptimization(req.body);
  await savePrediction(req.user._id, "fertilizer", req.body, result);
  res.json({ success: true, data: result });
});

export const pestDetection = asyncHandler(async (req, res) => {
  const result = getPestDetection({
    ...req.body,
    filename: req.file?.originalname
  });
  await savePrediction(req.user._id, "pest", req.body, result);
  res.json({ success: true, data: result });
});

export const yieldPrediction = asyncHandler(async (req, res) => {
  const result = getYieldPrediction(req.body);
  await savePrediction(req.user._id, "yield", req.body, result);
  res.json({ success: true, data: result });
});

export const marketPricePrediction = asyncHandler(async (req, res) => {
  const result = getMarketPricePrediction(req.body);
  await savePrediction(req.user._id, "market", req.body, result);
  res.json({ success: true, data: result });
});

export const cropHealthScore = asyncHandler(async (req, res) => {
  const result = getCropHealthScore(req.body);
  await savePrediction(req.user._id, "crop-health", req.body, result);
  res.json({ success: true, data: result });
});

export const insuranceRiskPrediction = asyncHandler(async (req, res) => {
  const result = getInsuranceRiskPrediction(req.body);
  await savePrediction(req.user._id, "insurance", req.body, result);
  res.json({ success: true, data: result });
});

export const digitalTwinSimulation = asyncHandler(async (req, res) => {
  const result = getDigitalTwinSimulation(req.body);
  await savePrediction(req.user._id, "digital-twin", req.body, result);
  res.json({ success: true, data: result });
});
