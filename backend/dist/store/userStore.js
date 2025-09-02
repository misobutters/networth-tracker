"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readUsers = readUsers;
exports.writeUsers = writeUsers;
exports.findUserByEmail = findUserByEmail;
exports.createUser = createUser;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const dataDir = path_1.default.join(__dirname, 'data');
const usersFile = path_1.default.join(dataDir, 'users.json');
async function ensureDataFile() {
    try {
        await fs_1.promises.mkdir(dataDir, { recursive: true });
        await fs_1.promises.access(usersFile);
    }
    catch {
        await fs_1.promises.writeFile(usersFile, '[]', 'utf-8');
    }
}
async function readUsers() {
    await ensureDataFile();
    const raw = await fs_1.promises.readFile(usersFile, 'utf-8');
    return JSON.parse(raw);
}
async function writeUsers(users) {
    await ensureDataFile();
    await fs_1.promises.writeFile(usersFile, JSON.stringify(users, null, 2), 'utf-8');
}
async function findUserByEmail(email) {
    const users = await readUsers();
    return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}
async function createUser(newUser) {
    const users = await readUsers();
    users.push(newUser);
    await writeUsers(users);
    return newUser;
}
