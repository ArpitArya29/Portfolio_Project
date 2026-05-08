import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { updateProfile } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/update",authMiddleware, updateProfile);


export default userRouter;