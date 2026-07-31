import { Router } from "express";
import { AuthService } from "../services/authService.js";
import { AuthController } from "../controllers/AuthController.js";
import { UserRepository } from "../repositories/userRepository.js";
import authenticateToken from "../middlewares/authMiddleware.js";
import { loginLimiter, loginIpLimiter, registerLimiter } from '../config/authLimiter.js';

const authRouter = Router();

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

authRouter.post("/register", registerLimiter, authController.register);
authRouter.post("/login", loginLimiter, loginIpLimiter, authController.login);
authRouter.post("/logout", authenticateToken, authController.logout);

export default authRouter;
