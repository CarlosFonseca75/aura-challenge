import { Router } from "express";
import { UserRepository } from "../repositories/userRepository";
import { AuthService } from "../services/authService";
import { AuthController } from "../controllers/authController";
import { registerSchema, loginSchema } from "../common/schemas";
import validateSchema from "../middlewares/zodValidator";

const router: Router = Router();

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: carlos@example.com
 *               firstName:
 *                 type: string
 *                 example: Carlos
 *               lastName:
 *                 type: string
 *                 example: Fonseca
 *               password:
 *                 type: string
 *                 example: "yourSafePwd"
 *               confirmPassword:
 *                 type: string
 *                 example: "yourSafePwd"
 *     responses:
 *       201:
 *         description: User registered successfully!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User registered successfully!
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "f7d2a1c8-1234-4567-890a-bcdef1234567"
 *                     email:
 *                       type: string
 *                       example: carlos@example.com
 *                     firstName:
 *                       type: string
 *                       example: Carlos
 *                     lastName:
 *                       type: string
 *                       example: Fonseca
 *                 status:
 *                   type: number
 *                   example: 201
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-08-03T18:00:00.000Z"
 *       409:
 *         description: Invalid credentials (email already exists)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid credentials!
 *                 status:
 *                   type: number
 *                   example: 409
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-08-03T18:00:00.000Z"
 */
router.post(
  "/register",
  validateSchema(registerSchema),
  authController.register
);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: carlos@example.com
 *               password:
 *                 type: string
 *                 example: "yourSafePwd"
 *     responses:
 *       200:
 *         description: User logged in successfully!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User logged in successfully!
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "f7d2a1c8-1234-4567-890a-bcdef1234567"
 *                     email:
 *                       type: string
 *                       example: carlos@example.com
 *                     firstName:
 *                       type: string
 *                       example: Carlos
 *                     lastName:
 *                       type: string
 *                       example: Fonseca
 *                     token:
 *                       type: string
 *                       example: yourSecureToken
 *                 status:
 *                   type: number
 *                   example: 200
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-08-03T18:00:00.000Z"
 *       401:
 *         description: Invalid credentials (wrong email or password)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid credentials!
 *                 status:
 *                   type: number
 *                   example: 401
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-08-03T18:00:00.000Z"
 */
router.post("/login", validateSchema(loginSchema), authController.login);

export default router;
