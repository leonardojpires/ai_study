import jwt from "jsonwebtoken";
import { CookieOptions } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "";
const COOKIE_NAME = process.env.COOKIE_NAME || "";

function buildToken(userId: number) {
    return jwt.sign(
        { sub: userId },
        JWT_SECRET,
        { expiresIn: "7d" }
    );
}

function buildCookieOptions(): CookieOptions {
    const isProduction = process.env.NODE_ENV === "production";

    return {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: 60 * 60 * 24 * 7 * 1000,
    };
}

export { buildToken, buildCookieOptions };
