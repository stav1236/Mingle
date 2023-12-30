import express from "express";
import authMiddleware from "../middleware/authMiddleware";
import { createPost, getFeedPosts, getMeadiaPosts } from "../logic/PostBL";
import { postUpload } from "../middleware/uploadMiddleware";

const postRouter = express.Router();
postRouter.use(authMiddleware);

postRouter.get("/media", getMeadiaPosts);

postRouter.get("/feed/:creatorId", getFeedPosts);

postRouter.get("/:postId/likes", (req, res) => {
  const postId = req.params.postId;
  const postData = req.body;
  res.send(`Update post with id ${postId}: ${JSON.stringify(postData)}`);
});

postRouter.get("/:postId/comments", (req, res) => {
  const postId = req.params.postId;
  const postData = req.body;
  res.send(`Update post with id ${postId}: ${JSON.stringify(postData)}`);
});

postRouter.post("/", postUpload, createPost);

postRouter.put("/:postId", (req, res) => {
  const postId = req.params.postId;
  const postData = req.body;
  res.send(`Update post with id ${postId}: ${JSON.stringify(postData)}`);
});

postRouter.delete("/:postId", (req, res) => {
  const postId = req.params.postId;
  res.send(`Delete post with id ${postId}`);
});

export default postRouter;
