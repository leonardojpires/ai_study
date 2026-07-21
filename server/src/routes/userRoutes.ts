import { Router } from "express";
import { UserRepository } from './../repositories/userRepository.js';
import { UserController } from '../controllers/UserController.js';
import { UserService } from './../services/userService.js';
import authenticateToken from "../middlewares/authMiddleware.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";

const userRouter = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRouter.get("/users/me", authenticateToken, userController.getCurrentUser);
userRouter.get("/users", authenticateToken, verifyAdmin, userController.getAllUsers);
userRouter.get("/users/:id", authenticateToken, verifyAdmin, userController.getUserById);

export default userRouter;
