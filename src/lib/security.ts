import { UserSession } from '@/types';
import { NextResponse } from 'next/server';

/**
 * Validates Row-Level Security (RLS) for Project access.
 * Only the project's creator/client or an Administrator can access or modify it.
 */
export function enforceProjectAccess(
  project: any,
  user: UserSession | null
): { allowed: boolean; response?: NextResponse } {
  if (!user) {
    return {
      allowed: false,
      response: NextResponse.json(
        { error: 'Unauthorized: Authentication required.' },
        { status: 401 }
      ),
    };
  }

  // Admins possess global oversight permission across all tenant rows
  if (user.role === 'admin') {
    return { allowed: true };
  }

  // Clients can strictly only access their own attributed project rows (RLS)
  const isOwner = project.clientId && project.clientId === user.id;

  if (!isOwner) {
    return {
      allowed: false,
      response: NextResponse.json(
        { error: 'Forbidden: You do not have permission to access or modify this specification.' },
        { status: 403 }
      ),
    };
  }

  return { allowed: true };
}

/**
 * Validates password strength for new registrations and credential updates
 */
export function validatePasswordStrength(password: string): { valid: boolean; message?: string } {
  if (!password || password.length < 8) {
    return {
      valid: false,
      message: 'Password must be at least 8 characters in length.',
    };
  }

  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  if (!hasLetter || !hasNumber) {
    return {
      valid: false,
      message: 'Password must contain at least one letter and one numeric digit.',
    };
  }

  return { valid: true };
}

/**
 * Strips dangerous HTML tags to prevent cross-site scripting (XSS)
 */
export function sanitizeString(input: string | undefined | null): string {
  if (!input) return '';
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .trim();
}
