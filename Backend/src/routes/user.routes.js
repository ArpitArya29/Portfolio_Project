import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { updateProfile } from "../controllers/user.controller.js";
import multer from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.post("/update",authMiddleware, multer.single("image"), updateProfile);


export default userRouter;