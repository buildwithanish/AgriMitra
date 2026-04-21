import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { findUserById } from "../repositories/platformRepository.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const protect = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    res.status(401);
    throw new Error("Authentication required");
  }

  const token = header.split(" ")[1];
  const decoded = jwt.verify(token, env.jwtSecret);
  const user = await findUserById(decoded.id);

  if (!user) {
    res.status(401);
    throw new Error("Invalid token");
  }

  if (user.isBlocked) {
    res.status(403);
    throw new Error("Your account is blocked. Please contact the administrator");
  }

  req.user = user;
  next();
});

export function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403);
      throw new Error("You are not allowed to access this resource");
    }

    next();
  };
}
