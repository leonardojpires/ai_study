import { Router } from "express";
import GroqService from "../services/groqService.js";
import { GroqController } from "../controllers/GroqController.js";
import authenticateToken from "../middlewares/authMiddleware.js";
import { StudyPlanService } from "../services/studyPlanService.js";
import { StudyPlanRepository } from "../repositories/studyPlanRepository.js";
import { pool } from "../database/db.js";

const groqRouter = Router();

const studyPlanRepository = new StudyPlanRepository(pool);
const studyPlanService = new StudyPlanService(studyPlanRepository);
const groqService = new GroqService();
const groqController = new GroqController(groqService, studyPlanService);

groqRouter.post("/converse", authenticateToken, groqController.converse);
groqRouter.post("/persist", authenticateToken, groqController.persist);

export default groqRouter;
