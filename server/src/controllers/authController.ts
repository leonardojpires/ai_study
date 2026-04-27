import { Request, Response } from "express";
import { AuthService } from "../services/authService.js";
import { buildCookieOptions } from "../jwt/jwt_build.js";

const COOKIE_NAME = process.env.COOKIE_NAME || "";

const cookieOptions = buildCookieOptions();

export class AuthController {
    constructor(private authService: AuthService) {}

    register = async (req: Request, res: Response) => { 
        try {
            const { name, email, password } = req.body;
            const result = await this.authService.register(name, email, password);

            res.cookie(COOKIE_NAME, result.token, cookieOptions);

            return res.status(201).json({
                success: result.success,
                user: result.user.toSafeObject()
            });
        } catch(error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const result = await this.authService.login(email, password);

            res.cookie(COOKIE_NAME, result.token, cookieOptions);

            return res.status(200).json({
                success: result.success,
                user: result.user.toSafeObject()
            });
        } catch(error: any) {
            return res.status(401).json({ message: error.message });
        }
    }
}
