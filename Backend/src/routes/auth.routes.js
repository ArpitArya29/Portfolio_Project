import express from "express";
import { check, login, logout, register } from "../controllers/auth.controllers.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import multer from "../middleware/multer.js";

const authRoutes = express.Router();

authRoutes.post("/register", multer.single("image"), register);

authRoutes.post("/login", login);

authRoutes.get("/logout", authMiddleware, logout);

authRoutes.get("/check", authMiddleware, check);

export default authRoutes;