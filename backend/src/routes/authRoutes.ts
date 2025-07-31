import { Router } from "express";
import { UserRepository } from "../repositories/userRepository";
import { AuthService } from "../services/authService";
import { AuthController } from "../controllers/authController";

const router: Router = Router();

const userRepository = new UserRepository();
const userService = new AuthService(userRepository);
const userController = new AuthController(userService);

// 🎯 POST /api/auth/register - Register a user.
router.post("/register", userController.register);

export default router;
