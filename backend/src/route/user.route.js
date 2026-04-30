import { Router } from "express";
import {
  getMe,
  loginController,
  logoutUser,
  signUpController,
} from "../controller/user.controller.js";
import { middleware } from "../middleware/middleware.js";

export const userRouter = Router();

userRouter.post("/signup", signUpController);
userRouter.post("/login", loginController);
userRouter.post("/logout", middleware, logoutUser);
userRouter.get("/me", middleware, getMe);
