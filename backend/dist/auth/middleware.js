"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jwt_1 = require("./jwt");
function authMiddleware(req, _res, next) {
    const authHeader = req.headers.authorization;
    const cookieHeader = (req.headers.cookie || '').split(';').find((c) => c.trim().startsWith('token='));
    const cookieToken = cookieHeader ? cookieHeader.split('=')[1] : undefined;
    const headerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice('Bearer '.length) : undefined;
    const token = cookieToken || headerToken;
    if (token) {
        const claims = (0, jwt_1.verifyToken)(token);
        if (claims) {
            req.auth = { sub: claims.sub, username: claims.username };
        }
    }
    next();
}
