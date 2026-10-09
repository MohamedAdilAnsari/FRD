import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { UserSession } from '@/types';

const JWT_SECRET = process.env.JWT_SECRET || 'frdg_nutz_enterprise_jwt_secret_2026_x89f';
const COOKIE_NAME = 'frdg_token';

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 10);
}

export async function hashPasswordAsync(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function signToken(user: UserSession): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      companyName: user.companyName,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyToken(token: string): UserSession | null {
  try {
    return jwt.verify(token, JWT_SECRET) as UserSession;
  } catch (error) {
    return null;
  }
}

export async function getCurrentUser(): Promise<UserSession | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  const verified = verifyToken(token);
  if (!verified) return null;

  try {
    const { User } = await import('@/lib/db');
    const dbUser = await User.findOne({ where: { email: verified.email } });
    if (dbUser) {
      return {
        id: String(dbUser.id),
        email: dbUser.email,
        name: dbUser.name,
        role: dbUser.role,
        companyName: dbUser.companyName || '',
      };
    }
  } catch (e) {}

  return verified;
}

export { COOKIE_NAME };
