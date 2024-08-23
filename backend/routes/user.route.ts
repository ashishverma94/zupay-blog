import express from "express";
import { getUser, loginUser, logoutUser, registerUser } from "../controllers/user.controller";
import { isAuthenticated } from "../middleware/auth";

const userRouter = express.Router();

userRouter.post("/login-user", loginUser as any);
userRouter.post("/register-user", registerUser as any);
userRouter.post("/logout-user", logoutUser as any);
userRouter.get("/get-user",isAuthenticated, getUser as any);

export default userRouter;
