// userRoutes.js
import express from "express";

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  // Handle GET request for all users
  res.send("Get all users");
});

userRouter.get("/:userId", (req, res) => {
  // Handle GET request for a specific user
  const userId = req.params.userId;
  res.send(`Get user with id ${userId}`);
});

userRouter.post("/", (req, res) => {
  // Handle POST request to create a new user
  const userData = req.body;
  res.send(`Create new user: ${JSON.stringify(userData)}`);
});

userRouter.put("/:userId", (req, res) => {
  // Handle PUT request to update a specific user
  const userId = req.params.userId;
  const userData = req.body;
  res.send(`Update user with id ${userId}: ${JSON.stringify(userData)}`);
});

userRouter.delete("/:userId", (req, res) => {
  // Handle DELETE request to delete a specific user
  const userId = req.params.userId;
  res.send(`Delete user with id ${userId}`);
});

export default userRouter;
