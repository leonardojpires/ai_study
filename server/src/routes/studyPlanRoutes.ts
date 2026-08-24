import { Router } from "express";
import { StudyPlanRepository } from "../repositories/studyPlanRepository.js";
import { StudyPlanService } from "../services/studyPlanService.js";
import { StudyPlanController } from "../controllers/StudyPlanController.js";
import authenticateToken from "../middlewares/authMiddleware.js";
import { pool } from "../database/db.js";
import { doubleCsrfProtection } from "../middlewares/doubleCsrfProtection.js";

const studyPlanRouter = Router();

const studyPlanRepository = new StudyPlanRepository(pool);
const studyPlanService = new StudyPlanService(studyPlanRepository);
const studyPlanController = new StudyPlanController(studyPlanService);

studyPlanRouter.post("/generate", authenticateToken, doubleCsrfProtection, studyPlanController.generate);
studyPlanRouter.get("/get-saved-plans", authenticateToken, studyPlanController.getPlansByUserId);
studyPlanRouter.get("/plan/:id", authenticateToken, studyPlanController.getPlanById);
studyPlanRouter.delete("/delete-plan/:id", authenticateToken, doubleCsrfProtection, studyPlanController.deletePlan);

export default studyPlanRouter;
