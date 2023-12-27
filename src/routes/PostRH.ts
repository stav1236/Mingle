import express from "express";
import authMiddleware from "../middleware/authMiddleware";
import { createPost } from "../logic/PostBL";
import { postUpload } from "../middleware/uploadMiddleware";

const postRouter = express.Router();
postRouter.use(authMiddleware);

postRouter.get("/", (req, res) => {
  res.send("Get all posts");
});

postRouter.get("/:postId", (req, res) => {
  const postId = req.params.postId;
  res.send(`Get post with id ${postId}`);
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
