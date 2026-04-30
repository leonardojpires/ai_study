import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import userRouter from './routes/userRoutes.js';
import cookieParser from "cookie-parser";
import studyPlanRouter from "./routes/studyPlanRoutes.js";

const app = express();

app.use(cors({ 
    origin: process.env.CLIENT_ORIGIN,
    credentials: true, 
}));

app.use(cookieParser());
app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/study-plan", studyPlanRouter);

export default app;
