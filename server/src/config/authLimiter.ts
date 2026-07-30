import { rateLimit } from 'express-rate-limit';

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 7,
    standardHeaders: true,
    legacyHeaders: false,
    ipv6Subnet: 56, 
    message: {
        error: "Too many requests. Please try again later."
    }
});

const registerLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: 5,
    standardHeaders: true,
    legacyHeaders: false,
    ipv6Subnet: 56,
    message: {
        error: "Too many requests. Please try again later."
    }
});

export { loginLimiter, registerLimiter };
