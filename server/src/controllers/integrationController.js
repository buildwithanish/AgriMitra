import { asyncHandler } from "../utils/asyncHandler.js";
import {
  deliverWhatsAppMessage,
  generateVoiceAdvisory,
  getWeatherSnapshot,
  queueFirebaseNotification
} from "../services/integrationService.js";

export const weather = asyncHandler(async (req, res) => {
  const data = getWeatherSnapshot(req.query.location);
  res.json({ success: true, data });
});

export const whatsapp = asyncHandler(async (req, res) => {
  const data = deliverWhatsAppMessage(req.body);
  res.json({ success: true, data });
});

export const voice = asyncHandler(async (req, res) => {
  const data = generateVoiceAdvisory(req.body);
  res.json({ success: true, data });
});

export const firebase = asyncHandler(async (req, res) => {
  const data = queueFirebaseNotification(req.body);
  res.json({ success: true, data });
});
