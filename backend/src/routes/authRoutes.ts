import { Router } from "express";
import { UserRepository } from "../repositories/userRepository";
import { AuthService } from "../services/authService";
import { AuthController } from "../controllers/authController";
import { registerSchema, loginSchema } from "../common/schemas";
import validateSchema from "../middlewares/zodValidator";

const router: Router = Router();

const userRepository = new UserRepository();
const userService = new AuthService(userRepository);
const userController = new AuthController(userService);

// POST /api/auth/register - Register a user.
router.post(
  "/register",
  validateSchema(registerSchema),
  userController.register
);

// POST /api/auth/login - Login user.
router.post("/login", validateSchema(loginSchema), userController.login);

export default router;
