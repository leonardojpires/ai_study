import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import userRouter from './routes/userRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

app.use("/auth", authRouter);
app.use("/user", userRouter);

export default app;
