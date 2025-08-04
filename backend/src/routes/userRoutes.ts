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

// TODO: Add a PATCH route for updating user status.
/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: List all users
 *     description: Returns a list of all registered users. Requires a valid Bearer token.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
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
 *                   example: We found 1 user!
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "f7d2a1c8-1234-4567-890a-bcdef1234567"
 *                       email:
 *                         type: string
 *                         example: carlos@example.com
 *                       firstName:
 *                         type: string
 *                         example: Carlos
 *                       lastName:
 *                         type: string
 *                         example: Fonseca
 *                 status:
 *                   type: number
 *                   example: 200
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-08-03T18:00:00.000Z"
 *       401:
 *         description: "Unauthorized: Missing or invalid token"
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
 *                   example: "Unauthorized: Missing or invalid token!"
 *                 status:
 *                   type: number
 *                   example: 401
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-08-03T18:00:00.000Z"
 */
router.get("/", authValidator, userController.getUsers);

/**
 * @openapi
 * /api/users/profile:
 *   get:
 *     summary: Get user profile
 *     description: Returns the profile of the authenticated user. Requires a valid Bearer token.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile found successfully!
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
 *                   example: Profile found successfully!
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
 *                   example: 200
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-08-03T18:00:00.000Z"
 *       401:
 *         description: Unauthorized - Missing or invalid token
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
 *                   example: "Unauthorized: Missing or invalid token!"
 *                 status:
 *                   type: number
 *                   example: 401
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-08-03T18:00:00.000Z"
 *       404:
 *         description: Profile not found
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
 *                   example: Profile not found!
 *                 status:
 *                   type: number
 *                   example: 404
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-08-03T18:00:00.000Z"
 */
router.get("/profile", authValidator, userController.getProfile);

/**
 * @openapi
 * /api/users/profile:
 *   put:
 *     summary: Update user profile
 *     description: Updates the authenticated user's profile. Requires a valid Bearer token.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: carlos.new@example.com
 *               firstName:
 *                 type: string
 *                 example: Carlos
 *               lastName:
 *                 type: string
 *                 example: Fonseca
 *     responses:
 *       200:
 *         description: Profile updated successfully!
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
 *                   example: Profile updated successfully!
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "f7d2a1c8-1234-4567-890a-bcdef1234567"
 *                     email:
 *                       type: string
 *                       example: carlos.new@example.com
 *                     firstName:
 *                       type: string
 *                       example: Carlos
 *                     lastName:
 *                       type: string
 *                       example: Fonseca
 *                 status:
 *                   type: number
 *                   example: 200
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-08-03T18:00:00.000Z"
 *       401:
 *         description: Unauthorized - Missing or invalid token
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
 *                   example: "Unauthorized: Missing or invalid token!"
 *                 status:
 *                   type: number
 *                   example: 401
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-08-03T18:00:00.000Z"
 *       404:
 *         description: Profile not found
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
 *                   example: Profile not found!
 *                 status:
 *                   type: number
 *                   example: 404
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-08-03T18:00:00.000Z"
 *       409:
 *         description: Email already in use
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
 *                   example: Email already in use!
 *                 status:
 *                   type: number
 *                   example: 409
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-08-03T18:00:00.000Z"
 */
router.put(
  "/profile",
  authValidator,
  validateSchema(updateProfileSchema),
  userController.updateProfile
);

export default router;
