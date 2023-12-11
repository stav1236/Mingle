// postRoutes.js
import express from "express";

const postRouter = express.Router();

postRouter.get("/", (req, res) => {
  // Handle GET request for all posts
  res.send("Get all posts");
});

postRouter.get("/:postId", (req, res) => {
  // Handle GET request for a specific post
  const postId = req.params.postId;
  res.send(`Get post with id ${postId}`);
});

postRouter.post("/", (req, res) => {
  // Handle POST request to create a new post
  const postData = req.body;
  res.send(`Create new post: ${JSON.stringify(postData)}`);
});

postRouter.put("/:postId", (req, res) => {
  // Handle PUT request to update a specific post
  const postId = req.params.postId;
  const postData = req.body;
  res.send(`Update post with id ${postId}: ${JSON.stringify(postData)}`);
});

postRouter.delete("/:postId", (req, res) => {
  // Handle DELETE request to delete a specific post
  const postId = req.params.postId;
  res.send(`Delete post with id ${postId}`);
});

export default postRouter;
