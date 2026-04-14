import express from "express";
import dotenv from "dotenv";

import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import skillRouter from "./routes/skill.routes.js";
import projectRouter from "./routes/project.routes.js";
import experienceRouter from "./routes/experience.routes.js";

dotenv.config();

const port = process.env.PORT || 8000

const App = express();

App.use(express.json());
App.use(cookieParser());

App.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}))

App.use("/api/v1/auth", authRoutes);
App.use("/api/v1/user", userRouter);
App.use("/api/v1/user/skills", skillRouter);
App.use("/api/v1/user/projects", projectRouter);
App.use("/api/v1/user/experiences", experienceRouter);

// App.use("/", (req, res) => {
//     res.send("Hello User");
// })

App.listen(port, () => {
    console.log(`Server is running into http://localhost:${port}`);
})





