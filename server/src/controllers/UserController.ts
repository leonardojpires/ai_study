import { UserService } from "../services/userService.js";
import { Request, Response } from 'express';

export class UserController {
    constructor(private userService: UserService) {}

    getAllUsers = async (req: Request, res: Response) => {
        try {
            const result = await this.userService.getAllUsers();

            const users = result.map(user => user.toSafeObject());

            return res.status(200).json({
                success: true,
                users
            });
        } catch(err: any) {
            return res.status(500).json({ message: err.message });
        }
    }

    getUserById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const result = await this.userService.getUserById(Number(id));

            return res.status(200).json({
                success: true,
                user: result.toSafeObject()
            });
        } catch(err: any) {
            return res.status(404).json({ message: err.message });
        }
    }
}
