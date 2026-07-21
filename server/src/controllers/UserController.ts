import { UserService } from "../services/userService.js";
import { Request, Response } from 'express';
import { getErrorMessage } from "../utils/errors.js";

type AuthenticatedRequest = Request & { user?: { sub?: number } };

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
        } catch(err: unknown) {
            return res.status(500).json({ message: getErrorMessage(err) });
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
        } catch(err: unknown) {
            return res.status(404).json({ message: getErrorMessage(err) });
        }
    }

    getCurrentUser = async (req: Request, res: Response) => {
        try {
            const authenticatedReq = req as AuthenticatedRequest;
            const userId = authenticatedReq.user?.sub;

            if (!userId) {
                throw new Error('User not authenticated.');
            }

            const result = await this.userService.getCurrentUser(Number(userId));

            return res.status(200).json({
                success: true,
                user: result.toSafeObject()
            });
        } catch(err: unknown) {
            return res.status(404).json({ message: getErrorMessage(err) });
        }
    }
}
