import express from "express";
import { login, logout, register } from "../logic/AuthBL";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/register", register);

export default authRouter;
