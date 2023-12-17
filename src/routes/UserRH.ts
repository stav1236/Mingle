// userRoutes.js
import express from "express";
import { login, logout, register } from "../logic/AuthBL";

const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.post("/register", register);

userRouter.get("/:userId", (req, res) => {
  // Handle GET request for a specific user
  const userId = req.params.userId;
  res.send(`Get user with id ${userId}`);
});

userRouter.put("/:userId", (req, res) => {
  const userId = req.params.userId;
  const userData = req.body;
  res.send(`Update user with id ${userId}: ${JSON.stringify(userData)}`);
});

userRouter.delete("/:userId", (req, res) => {
  const userId = req.params.userId;
  res.send(`Delete user with id ${userId}`);
});

export default userRouter;
