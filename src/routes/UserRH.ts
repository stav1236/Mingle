/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

import express from "express";
import authMiddleware from "../middleware/authMiddleware";
import { getUserById, updateAvatar, updateUserDetails } from "../logic/UserBL";
import logger from "../common/config/logger";
import { numericProjection } from "../common/utilities/mongoUtils";
import { ProjectionType } from "mongoose";
import User from "../data/models/User";
import { avatarUpload } from "../middleware/uploadMiddleware";

const userRouter = express.Router();
userRouter.use(authMiddleware);

/**
 * @swagger
 * /user/{userId}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: string
 *       - in: query
 *         name: projection
 *         description: Projection for user data
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *         content:
 *           application/json:
 *             example:
 *               error: Unauthorized
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               error: User not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error
 */
userRouter.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const projection = req.query.projection
      ? numericProjection(req.query.projection as ProjectionType<User>)
      : undefined;
    const user = await getUserById(userId, projection);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    logger.error("Error fetching user data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
/**
 * @swagger
 * /user/{field}/{value}:
 *   put:
 *     summary: Update user details by field
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: field
 *         required: true
 *         description: The field to update (e.g., "firstName", "lastName", etc.)
 *         schema:
 *           type: string
 *       - in: path
 *         name: value
 *         required: true
 *         description: The new value for the specified field
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully updated user details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
userRouter.put("/:field/:value", updateUserDetails);
/**
 * @swagger
 * /user/avatar:
 *   post:
 *     summary: Update user avatar
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully updated user avatar
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
userRouter.post("/avatar", avatarUpload, updateAvatar);

export default userRouter;
