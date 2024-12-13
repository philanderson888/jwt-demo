import { jwtVerify, SignJWT } from 'jose';

const JWT_SECRET = new TextEncoder().encode('demo-secret-key');

export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
}

export interface Session {
  timestamp: string;
  action: string;
  user: string;
  token?: string;
  passwordHash?: string;
}

// Function to hash password using SHA-256
export async function hashPassword(password: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function createToken(user: User): Promise<string> {
  const { passwordHash, ...userWithoutPassword } = user;
  return new SignJWT({ user: userWithoutPassword })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h')
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string) {
  try {
    const verified = await jwtVerify(token, JWT_SECRET);
    return verified.payload as { user: Omit<User, 'passwordHash'> };
  } catch (err) {
    return null;
  }
}

export function addSessionLog(action: string, user: string, token?: string, passwordHash?: string): Session {
  const session: Session = {
    timestamp: new Date().toISOString(),
    action,
    user,
    token,
    passwordHash,
  };
  const sessions = getSessions();
  sessions.push(session);
  localStorage.setItem('sessions', JSON.stringify(sessions));
  return session;
}

export function getSessions(): Session[] {
  if (typeof window === 'undefined') return [];
  const sessions = localStorage.getItem('sessions');
  return sessions ? JSON.parse(sessions) : [];
}

export function getUsers(): User[] {
  if (typeof window === 'undefined') return [];
  const storedUsers = localStorage.getItem('users');
  return storedUsers ? JSON.parse(storedUsers) : [];
}

export function addUser(user: User): void {
  const users = getUsers();
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
}