import { updateUser } from "../repositories/platformRepository.js";
import { userPayload } from "./authController.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const profile = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: { user: userPayload(req.user) }
  });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { name, language } = req.body;
  const user = await updateUser(req.user._id, { name, language });

  res.json({
    success: true,
    data: { user: userPayload(user) },
    message: "Profile updated successfully"
  });
});
