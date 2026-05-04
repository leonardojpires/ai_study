import { Router } from "express";
import GroqService from "../services/groqService.js";
import { GroqController } from "../controllers/GroqController.js";
import authenticateToken from "../middlewares/authMiddleware.js";

const groqRouter = Router();
const groqService = new GroqService();
const groqController = new GroqController(groqService);

groqRouter.post("/converse", authenticateToken, groqController.converse);

export default groqRouter;
