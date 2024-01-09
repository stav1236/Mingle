import express from "express";
import {
  handleGoogleAuth,
  login,
  logout,
  refreshToken,
  register,
} from "../logic/AuthBL";

const authRouter = express.Router();

authRouter.post("/google", handleGoogleAuth);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/register", register);
authRouter.post("/refresh-token", refreshToken);

export default authRouter;
