import { NextResponse, type NextRequest } from 'next/server';

const COOKIE_NAME = 'frdg_token';

interface TokenPayload {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'client';
  exp: number;
}

function parseJwt(token: string): TokenPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const payload = JSON.parse(jsonPayload);
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      return null; // Expired
    }
    return payload;
  } catch (e) {
    return null;
  }
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const user = token ? parseJwt(token) : null;

  // 1. Admin Routes Protection: /admin and /admin/*
  if (pathname.startsWith('/admin')) {
    if (!user || user.role !== 'admin') {
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. Protected Client Routes: /projects, /projects/*, /wizard
  if (pathname.startsWith('/projects') || pathname === '/wizard') {
    if (!user) {
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('redirect', pathname === '/wizard' ? '/projects' : pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 3. Security Response Headers
  const response = NextResponse.next();
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
