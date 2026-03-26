import { Router } from "express";
import { UserRepository } from './../repositories/userRepository.js';
import { UserController } from './../controllers/UserController.js';
import { UserService } from './../services/userService.js';


const userRouter = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRouter.get("/users", userController.getAllUsers);
userRouter.get("/users/:id", userController.getUserById);

export default userRouter;
