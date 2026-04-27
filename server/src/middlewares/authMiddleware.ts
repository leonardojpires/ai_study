import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

type AuthenticatedRequest = Request & { user: any };

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = req.cookies?.[process.env.COOKIE_NAME ?? "auth_token"];

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized. No token provided.",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET ?? "");

        (req as AuthenticatedRequest).user = decoded;
        
        next();
    } catch(err) {
        return res.status(403).json({

            message: "Forbidden. Invalid or expired token.",
        })
    }
}

export default authenticateToken;
