export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  createdAt: string; // ISO string
}

export type PublicUser = Omit<User, 'passwordHash'>;
