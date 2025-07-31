import { Router } from "express";
import { UserController } from "../controllers/userController";
import { UserRepository } from "../repositories/userRepository";
import { UserService } from "../services/userService";

const router: Router = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// 🎯 GET /api/users - List all users.
router.get("/", userController.getUsers);

export default router;
