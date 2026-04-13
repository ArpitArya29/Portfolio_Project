import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { addProjects, deleteProject, getAllProjects, updateProject } from "../controllers/projects.controller.js";

const projectRouter = express.Router();

projectRouter.get("/", authMiddleware, getAllProjects);

projectRouter.post("/create", authMiddleware, addProjects);

projectRouter.put("/update/:id", authMiddleware, updateProject);

projectRouter.delete("/delete/:id", authMiddleware, deleteProject);


export default projectRouter;