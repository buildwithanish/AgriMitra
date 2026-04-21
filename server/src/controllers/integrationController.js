import { asyncHandler } from "../utils/asyncHandler.js";
import {
  getWeatherSimulation,
  simulateFirebase,
  simulateVoice,
  simulateWhatsApp
} from "../services/integrationService.js";

export const weather = asyncHandler(async (req, res) => {
  const data = getWeatherSimulation(req.query.location);
  res.json({ success: true, data });
});

export const whatsapp = asyncHandler(async (req, res) => {
  const data = simulateWhatsApp(req.body);
  res.json({ success: true, data });
});

export const voice = asyncHandler(async (req, res) => {
  const data = simulateVoice(req.body);
  res.json({ success: true, data });
});

export const firebase = asyncHandler(async (req, res) => {
  const data = simulateFirebase(req.body);
  res.json({ success: true, data });
});
