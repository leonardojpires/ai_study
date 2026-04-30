import { Router } from "express";
import { pool } from "../database/db.js";
import { StudyPlanRepository } from "../repositories/studyPlanRepository.js";
import { StudyPlanService } from "../services/studyPlanService.js";
import { StudyPlanController } from "../controllers/StudyPlanController.js";
import { UserRepository } from "../repositories/userRepository.js";
import { UserService } from "../services/userService.js";
import authenticateToken from "../middlewares/authMiddleware.js";

const studyPlanRouter = Router();

const studyPlanRepository = new StudyPlanRepository(pool);
const userRepository = new UserRepository();
const studyPlanService = new StudyPlanService(studyPlanRepository);
const userService = new UserService(userRepository);
const studyPlanController = new StudyPlanController(studyPlanService, userService);

studyPlanRouter.post("/generate", authenticateToken, studyPlanController.generate);

export default studyPlanRouter;
