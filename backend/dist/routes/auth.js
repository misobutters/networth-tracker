"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const zod_1 = require("zod");
const uuid_1 = require("uuid");
const userStore_1 = require("../store/userStore");
const jwt_1 = require("../auth/jwt");
const router = (0, express_1.Router)();
const registerSchema = zod_1.z.object({
    username: zod_1.z.string().min(3),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
});
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
});
router.post('/register', async (req, res) => {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: 'Invalid input' });
    }
    const { username, email, password } = parsed.data;
    const existing = await (0, userStore_1.findUserByEmail)(email);
    if (existing) {
        return res.status(409).json({ error: 'Email already in use' });
    }
    const passwordHash = await bcryptjs_1.default.hash(password, 10);
    const user = {
        id: (0, uuid_1.v4)(),
        username,
        email,
        passwordHash,
        createdAt: new Date().toISOString(),
    };
    await (0, userStore_1.createUser)(user);
    const token = (0, jwt_1.signToken)({ sub: user.id, username: user.username });
    res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
    return res.status(201).json({ id: user.id, username: user.username, email: user.email });
});
router.post('/login', async (req, res) => {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: 'Invalid input' });
    }
    const { email, password } = parsed.data;
    const user = await (0, userStore_1.findUserByEmail)(email);
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    const valid = await bcryptjs_1.default.compare(password, user.passwordHash);
    if (!valid) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = (0, jwt_1.signToken)({ sub: user.id, username: user.username });
    res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
    return res.json({ id: user.id, username: user.username, email: user.email });
});
router.post('/logout', (_req, res) => {
    res.clearCookie('token');
    return res.status(204).end();
});
router.get('/me', (req, res) => {
    if (!req.auth) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    return res.json({ id: req.auth.sub, username: req.auth.username });
});
exports.default = router;
