/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: The Authentication API
 */

import express from "express";
import {
  handleGoogleAuth,
  login,
  logout,
  refreshToken,
  register,
} from "../logic/AuthBL";

const authRouter = express.Router();

/**
 * @swagger
 * /api/auth/google:
 *   post:
 *     summary: Handle Google authentication
 *     description: Authenticate a user using Google credentials or create a new account if the user does not exist.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               googleId:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               accessToken:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               imgSrc:
 *                 type: string
 *             required:
 *               - googleId
 *               - email
 *               - accessToken
 *               - firstName
 *               - lastName
 *               - imgSrc
 *     responses:
 *       '200':
 *         description: Google authentication successful
 *         content:
 *           application/json:
 *             example:
 *               accessToken: "your_access_token"
 *               refreshToken: "your_refresh_token"
 *               _id: "user_id"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal Server Error"
 */
authRouter.post("/google", handleGoogleAuth);
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticate a user by providing valid credentials and receive access and refresh tokens.
 *     tags:
 *       - Authentication
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
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: User login successful
 *         content:
 *           application/json:
 *             example:
 *               accessToken: "your_access_token"
 *               refreshToken: "your_refresh_token"
 *               _id: "user_id"
 *       '401':
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             example:
 *               message: "Invalid credentials"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal Server Error"
 */
authRouter.post("/login", login);
/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: User logout
 *     description: Log out a user by invalidating the provided refresh token.
 *     tags:
 *       - Authentication
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: User logout successful
 *       '401':
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             example:
 *               message: "Invalid credentials"
 *       '403':
 *         description: Invalid request or token
 *         content:
 *           application/json:
 *             example:
 *               message: "Invalid request"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal Server Error"
 */
authRouter.post("/logout", logout);
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the provided information.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               birthDate:
 *                 type: string
 *                 format: date
 *               gender:
 *                 type: string
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *               - birthDate
 *               - gender
 *     responses:
 *       '200':
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "User registered successfully"
 *       '400':
 *         description: User already exists
 *         content:
 *           application/json:
 *             example:
 *               message: "User already exists"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal Server Error"
 */
authRouter.post("/register", register);
/**
 * @swagger
 * /api/auth/refresh-token:
 *   post:
 *     summary: Refresh access token
 *     description: Refresh the access token by providing a valid refresh token.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *             required:
 *               - refreshToken
 *     responses:
 *       '200':
 *         description: Access token refreshed successfully
 *         content:
 *           application/json:
 *             example:
 *               accessToken: "your_new_access_token"
 *               refreshToken: "your_new_refresh_token"
 *               _id: "user_id"
 *       '401':
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             example:
 *               message: "Invalid credentials"
 *       '403':
 *         description: Invalid request or token
 *         content:
 *           application/json:
 *             example:
 *               message: "Invalid credentials"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal Server Error"
 */
authRouter.post("/refresh-token", refreshToken);

export default authRouter;
