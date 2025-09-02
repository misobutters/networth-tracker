"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_1 = __importDefault(require("./routes/auth"));
const middleware_1 = require("./auth/middleware");
const app = (0, express_1.default)();
const port = 5050;
app.use((0, cors_1.default)({ origin: 'http://localhost:3000', credentials: true }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(middleware_1.authMiddleware);
app.get('/', (_req, res) => {
    res.send('Backend is running!');
});
app.use('/api/auth', auth_1.default);
app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});
