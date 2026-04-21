import { Router } from "express";
import { analytics, createUser, listUsers, updateUser } from "../controllers/adminController.js";
import { validateRequest } from "../middleware/validate.js";

const router = Router();

router.get("/users", listUsers);
router.post(
  "/users",
  validateRequest({
    body: {
      name: { required: true, minLength: 2, message: "Name is required" },
      email: { required: true, type: "email", message: "Valid email is required" },
      password: { required: true, minLength: 8, message: "Password must be at least 8 characters" },
      role: { enum: ["admin", "farmer"], message: "Role must be admin or farmer" }
    }
  }),
  createUser
);
router.put(
  "/users/:id",
  validateRequest({
    body: {
      role: { enum: ["admin", "farmer"], message: "Role must be admin or farmer" },
      language: { enum: ["en", "hi"], message: "Language must be en or hi" }
    }
  }),
  updateUser
);
router.get("/analytics", analytics);

export default router;
