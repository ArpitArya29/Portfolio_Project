import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { addUserDetails, deleteUserDetails, getUserDetails, updateUserDetails } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/", authMiddleware, getUserDetails);

userRouter.post("/", authMiddleware, addUserDetails);

userRouter.put("/", updateUserDetails);

userRouter.delete("/", deleteUserDetails);


export default userRouter;