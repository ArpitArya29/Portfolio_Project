import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { createPortfolio, deletePortfolio, getAllPortfolios, updatePortfolio } from "../controllers/portfolio.controller.js";

const portfolioRouter = express.Router();

portfolioRouter.get("/", authMiddleware, getAllPortfolios);

portfolioRouter.post("/create", authMiddleware, createPortfolio);

portfolioRouter.put("/update/:id", authMiddleware, updatePortfolio);

portfolioRouter.delete("/delete/:id", authMiddleware, deletePortfolio);

export default portfolioRouter;