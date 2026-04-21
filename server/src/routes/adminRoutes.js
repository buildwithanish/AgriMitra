import { Router } from "express";
import { analytics, listUsers, updateUser } from "../controllers/adminController.js";

const router = Router();

router.get("/users", listUsers);
router.put("/users/:id", updateUser);
router.get("/analytics", analytics);

export default router;
