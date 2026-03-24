import { Request, Response } from "express";
import { AuthService } from "../services/authService.js";

export class AuthController {
    constructor(private authService: AuthService) {}

    register = async (req: Request, res: Response) => { 
        try {
            const { name, email, password } = req.body;

            const result = await this.authService.register(name, email, password);

            return res.status(201).json({
                success: result.success,
                user: result.newUser.toSafeObject
            });
        } catch(error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            const result = await this.authService.login(email, password);

            return res.status(200).json({
                success: result.success,
                user: result.user.toSafeObject
            });
        } catch(error: any) {
            return res.status(401).json({ error: error.message });
        }
    }
}
