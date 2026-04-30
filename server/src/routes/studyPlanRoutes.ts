import { Router } from "express";
import { StudyPlanRepository } from "../repositories/studyPlanRepository.js";
import { pool } from "../database/db.js";
import { StudyPlanService } from "../services/studyPlanService.js";
import { StudyPlanController } from "../controllers/StudyPlanController.js";
import authenticateToken from "../middlewares/authMiddleware.js";

const studyPlanRouter = Router();

const studyPlanRepository = new StudyPlanRepository(pool);
const studyPlanService = new StudyPlanService(studyPlanRepository);
const studyPlanController = new StudyPlanController(studyPlanService);

studyPlanRouter.post("/generate", authenticateToken, studyPlanController.generate);

export default studyPlanRouter;
