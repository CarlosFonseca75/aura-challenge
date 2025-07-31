import { Router } from "express";
import * as userController from "../controllers/userController";

const router: Router = Router();

// 🎯 GET /api/users - List all users.
router.get("/", userController.getUsers);

export default router;
