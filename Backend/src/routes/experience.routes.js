import express from "express";
import { addExperiences, deleteExperience, getAllExperiences, updateExperience } from "../controllers/experiences.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const experienceRouter = express.Router();

experienceRouter.get("/", authMiddleware, getAllExperiences);

experienceRouter.post("/create", authMiddleware, addExperiences);

experienceRouter.put("/update/:id", authMiddleware, updateExperience);

experienceRouter.delete("/delete/:id", authMiddleware, deleteExperience);


export default experienceRouter;