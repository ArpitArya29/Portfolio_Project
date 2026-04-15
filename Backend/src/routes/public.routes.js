import express from "express";
import { getPortfolioById } from "../controllers/public.controller.js";

const publicRouter = express.Router();

publicRouter.get("/:id", getPortfolioById);

export default publicRouter;