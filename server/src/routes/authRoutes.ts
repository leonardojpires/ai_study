import { Router } from "express";
import { AuthService } from "../services/authService.js";
import { AuthController } from "../controllers/AuthController.js";
import { UserRepository } from "../repositories/userRepository.js";

const authRouter = Router();

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/logout", authController.logout);

export default authRouter;
