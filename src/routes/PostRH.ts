import express from "express";
import authMiddleware from "../middleware/authMiddleware";
import {
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

postRouter.get("/media", getMeadiaPosts);

postRouter.get("/feed/:creatorId", getFeedPosts);

postRouter.post("/", postUpload, createPost);

postRouter.post("/like", likePost);

postRouter.post("/comment/:postId", (req, res) => {
  const postId = req.params.postId;
  const postData = req.body;
  res.send(`Update post with id ${postId}: ${JSON.stringify(postData)}`);
});

postRouter.put("/:postId/:newText", editPost);

postRouter.delete("/:postId", deletePostById);

export default postRouter;
