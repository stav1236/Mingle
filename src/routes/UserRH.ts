import express from "express";
import authMiddleware from "../middleware/authMiddleware";
import { getUserById } from "../logic/UserBL";
import logger from "../common/config/logger";
import { numericProjection } from "../common/utilities/mongoUtils";
import { ProjectionType } from "mongoose";
import User from "../data/models/User";

const userRouter = express.Router();
userRouter.use(authMiddleware);

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
