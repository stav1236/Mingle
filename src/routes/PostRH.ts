/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: The posts managing API
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
import {
  commentPost,
  createPost,
  deletePostById,
  editPost,
  getFeedPosts,
  getMeadiaPosts,
  likePost,
} from "../logic/PostBL";
import { postUpload } from "../middleware/uploadMiddleware";

const postRouter = express.Router();
postRouter.use(authMiddleware);

/**
 * @swagger
 * /api/posts/media:
 *   get:
 *     summary: Get media posts
 *     description: Retrieve media posts excluding the ones created by the authenticated user.
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A list of media posts
 *         content:
 *           application/json:
 *             example:
 *               posts:
 *                 - _id: "5f4dcc3b5aa765d61d8327deb882cf99"
 *                   text: "Awesome post!"
 *                   imgSrc: "https://example.com/image.jpg"
 *                   creatorId: "5f4dcc3b5aa765d61d8327deb882cf99"
 *                   comments: []
 *                   likes: []
 *                   updatedAt: "2024-01-11T12:34:56.789Z"
 *                   createdAt: "2024-01-11T12:34:56.789Z"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */
postRouter.get("/media", getMeadiaPosts);
/**
 * @swagger
 * /api/posts/feed/{creatorId}:
 *   get:
 *     summary: Get feed posts by creator ID
 *     description: Retrieve posts from a specific user's feed.
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: creatorId
 *         description: ID of the user whose feed is being retrieved
 *         required: true
 *         schema:
 *           type: string
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A list of feed posts
 *         content:
 *           application/json:
 *             example:
 *               posts:
 *                 - _id: "5f4dcc3b5aa765d61d8327deb882cf99"
 *                   text: "Awesome post in feed!"
 *                   imgSrc: "https://example.com/feed-image.jpg"
 *                   creatorId: "5f4dcc3b5aa765d61d8327deb882cf99"
 *                   comments: []
 *                   likes: []
 *                   updatedAt: "2024-01-11T12:34:56.789Z"
 *                   createdAt: "2024-01-11T12:34:56.789Z"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */
postRouter.get("/feed/:creatorId", getFeedPosts);
/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new post
 *     description: Create a new post with text and an optional image.
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication
 *         required: true
 *         schema:
 *           type: string
 *       - in: formData
 *         name: text
 *         description: Text content of the post
 *         required: true
 *         type: string
 *       - in: formData
 *         name: image
 *         description: Image file for the post (optional)
 *         required: false
 *         type: file
 *     responses:
 *       '200':
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Data saved successfully"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */
postRouter.post("/", postUpload, createPost);
/**
 * @swagger
 * /api/posts/like:
 *   post:
 *     summary: Like or unlike a post
 *     description: Like or unlike a post by providing the post ID.
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication
 *         required: true
 *         schema:
 *           type: string
 *       - in: formData
 *         name: postId
 *         description: ID of the post to like or unlike
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Post like status updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Update post with id {postId}"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */
postRouter.post("/like", likePost);
/**
 * @swagger
 * /api/posts/comment:
 *   post:
 *     summary: Add a comment to a post
 *     description: Add a comment to a post by providing the post ID and comment text.
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication
 *         required: true
 *         schema:
 *           type: string
 *       - in: formData
 *         name: postId
 *         description: ID of the post to comment on
 *         required: true
 *         type: string
 *       - in: formData
 *         name: text
 *         description: Text of the comment
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Comment added to the post successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Update post with id {postId}"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */
postRouter.post("/comment", commentPost);
/**
 * @swagger
 * /api/posts/{postId}/{newText}:
 *   put:
 *     summary: Edit a post
 *     description: Edit the text content of a post by providing the post ID and new text.
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: postId
 *         description: ID of the post to edit
 *         required: true
 *         type: string
 *       - in: path
 *         name: newText
 *         description: New text content for the post
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Post updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Update post with id {postId}"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */
postRouter.put("/:postId/:newText", editPost);
/**
 * @swagger
 * /api/posts/{postId}:
 *   delete:
 *     summary: Delete a post by ID
 *     description: Delete a post by providing the post ID.
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: postId
 *         description: ID of the post to delete
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Post deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Deleted post with id {postId}"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */
postRouter.delete("/:postId", deletePostById);

export default postRouter;
