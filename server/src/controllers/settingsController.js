import {
  getPlatformSettings,
  updatePlatformSettings
} from "../repositories/platformRepository.js";
import { asyncHandler } from "../utils/asyncHandler.js";

function sanitizeSettings(settings, { admin = false } = {}) {
  if (admin) {
    return {
      ...settings,
      aiKeys: Object.fromEntries(Object.keys(settings.aiKeys || {}).map((key) => [key, ""])),
      aiKeyStatus: Object.fromEntries(
        Object.entries(settings.aiKeys || {}).map(([key, value]) => [key, Boolean(value)])
      )
    };
  }

  const { aiKeys, ...publicSettings } = settings;
  return publicSettings;
}

export const publicSettings = asyncHandler(async (req, res) => {
  const settings = await getPlatformSettings();
  res.json({ success: true, data: sanitizeSettings(settings) });
});

export const adminSettings = asyncHandler(async (req, res) => {
  const settings = await getPlatformSettings();
  res.json({ success: true, data: sanitizeSettings(settings, { admin: true }) });
});

export const updateSettings = asyncHandler(async (req, res) => {
  const settings = await updatePlatformSettings(req.body || {});
  res.json({
    success: true,
    data: sanitizeSettings(settings, { admin: true }),
    message: "Platform settings updated successfully"
  });
});
