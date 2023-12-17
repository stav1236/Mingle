import express from "express";

const userRouter = express.Router();

userRouter.get("/:userId", (req, res) => {
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
