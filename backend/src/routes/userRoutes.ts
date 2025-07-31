import { Router } from "express";
import { UserController } from "../controllers/userController";
import { UserRepository } from "../repositories/userRepository";
import { UserService } from "../services/userService";
import authValidator from "../middlewares/authValidator";

const router: Router = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// 🎯 GET /api/users - List all users.
router.get("/", authValidator, userController.getUsers);

// 🎯 GET /api/users/profile - Get profile.
router.get("/profile", authValidator, userController.getProfile);

export default router;
