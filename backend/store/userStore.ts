import { promises as fs } from 'fs';
import path from 'path';
import { User } from '../types';

const dataDir = path.join(__dirname, 'data');
const usersFile = path.join(dataDir, 'users.json');

async function ensureDataFile(): Promise<void> {
  try {
    await fs.mkdir(dataDir, { recursive: true });
    await fs.access(usersFile);
  } catch {
    await fs.writeFile(usersFile, '[]', 'utf-8');
  }
}

export async function readUsers(): Promise<User[]> {
  await ensureDataFile();
  const raw = await fs.readFile(usersFile, 'utf-8');
  return JSON.parse(raw) as User[];
}

export async function writeUsers(users: User[]): Promise<void> {
  await ensureDataFile();
  await fs.writeFile(usersFile, JSON.stringify(users, null, 2), 'utf-8');
}

export async function findUserByEmail(email: string): Promise<User | undefined> {
  const users = await readUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export async function createUser(newUser: User): Promise<User> {
  const users = await readUsers();
  users.push(newUser);
  await writeUsers(users);
  return newUser;
}
