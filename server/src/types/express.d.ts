import "express";

declare global {
    namespace Express {
        interface UserPayload {
            sub: number;
        }

        interface Request {
            user?: UserPayload
        }
    }
}
