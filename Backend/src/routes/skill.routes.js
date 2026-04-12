import express from "express";
import { addSkills, deleteSkill, getAllSkills, updateSkill } from "../controllers/skills.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const skillRouter = express.Router();

skillRouter.get("/", authMiddleware, getAllSkills);

skillRouter.post("/create",authMiddleware, addSkills);

skillRouter.put("/update/:id",authMiddleware, updateSkill);

skillRouter.delete("/delete/:id",authMiddleware, deleteSkill);


export default skillRouter;