import { NextRequest, NextResponse } from 'next/server';
import { initDb, User } from '@/lib/db';
import { comparePassword, signToken, COOKIE_NAME } from '@/lib/auth';
import { checkRateLimit, createRateLimitResponse, setRateLimitHeaders } from '@/lib/rateLimit';

export async function POST(req: NextRequest) {
  try {
    // 1. IP-Based Rate Limiting for Authentication (Brute-Force Protection)
    const rateCheck = checkRateLimit(req, 'auth');
    if (!rateCheck.allowed) {
      return createRateLimitResponse(
        rateCheck.retryAfter,
        `Too many login attempts. Please wait ${rateCheck.retryAfter} seconds before trying again.`
      );
    }

    await initDb();
    const body = await req.json();
    const email = (body.email || '').trim().toLowerCase();
    const password = body.password || '';

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // High performance query: fetch only needed authentication fields
    const user = await User.findOne({
      where: { email },
      attributes: ['id', 'email', 'name', 'role', 'companyName', 'passwordHash'],
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const isValid = await comparePassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const token = signToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      companyName: user.companyName,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        companyName: user.companyName,
      },
    });

    // Attach rate limit headers
    setRateLimitHeaders(response, rateCheck);

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ error: error.message || 'Authentication failed' }, { status: 500 });
  }
}
