import { Router } from "express";
import { UserRepository } from "../repositories/userRepository";
import { UserService } from "../services/userService";
import { UserController } from "../controllers/userController";
import { updateProfileSchema } from "../common/schemas";
import authValidator from "../middlewares/authValidator";
import validateSchema from "../middlewares/zodValidator";

const router: Router = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// GET /api/users - List all users.
router.get("/", authValidator, userController.getUsers);

// GET /api/users/profile - Get profile.
router.get("/profile", authValidator, userController.getProfile);

// PUT /api/users/profile - Update profile.
router.put(
  "/profile",
  authValidator,
  validateSchema(updateProfileSchema),
  userController.updateProfile
);

export default router;
