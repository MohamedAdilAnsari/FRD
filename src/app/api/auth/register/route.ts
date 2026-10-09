import { NextRequest, NextResponse } from 'next/server';
import { initDb, User, getNextUserId } from '@/lib/db';
import { hashPasswordAsync, signToken, COOKIE_NAME } from '@/lib/auth';
import { checkRateLimit, createRateLimitResponse, setRateLimitHeaders } from '@/lib/rateLimit';
import { validatePasswordStrength, sanitizeString } from '@/lib/security';

export async function POST(req: NextRequest) {
  try {
    // 1. IP-Based Rate Limiting (Prevent automated account spamming)
    const rateCheck = checkRateLimit(req, 'auth');
    if (!rateCheck.allowed) {
      return createRateLimitResponse(
        rateCheck.retryAfter,
        `Too many registration attempts. Please wait ${rateCheck.retryAfter} seconds before trying again.`
      );
    }

    await initDb();
    const body = await req.json();
    const email = (body.email || '').trim().toLowerCase();
    const password = body.password || '';
    const name = sanitizeString(body.name);
    const companyName = sanitizeString(body.companyName);
    let cleanPhone = '';
    if (body.phone) {
      cleanPhone = String(body.phone).replace(/\D/g, '');
      if (cleanPhone.startsWith('91') && cleanPhone.length > 10) {
        cleanPhone = cleanPhone.slice(2);
      }
      cleanPhone = cleanPhone.slice(0, 10);
      if (cleanPhone.length > 0 && cleanPhone.length !== 10) {
        return NextResponse.json({ error: 'Phone number must be exactly 10 digits.' }, { status: 400 });
      }
      if (cleanPhone.length === 10 && !/^[6-9]\d{9}$/.test(cleanPhone)) {
        return NextResponse.json({ error: 'Please enter a valid 10-digit Indian mobile number.' }, { status: 400 });
      }
    }

    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    // Password strength enforcement
    const pwdCheck = validatePasswordStrength(password);
    if (!pwdCheck.valid) {
      return NextResponse.json({ error: pwdCheck.message }, { status: 400 });
    }

    const existingUser = await User.findOne({
      where: { email },
      attributes: ['id'],
    });
    if (existingUser) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 400 });
    }

    // Security: Public registrations can NEVER self-assign 'admin' role
    const hashedPassword = await hashPasswordAsync(password);
    const nextUserId = await getNextUserId();
    const newUser = await User.create({
      id: nextUserId,
      email,
      passwordHash: hashedPassword,
      name,
      role: 'client',
      companyName: companyName || '',
      phone: cleanPhone || '',
    });

    const token = signToken({
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      companyName: newUser.companyName,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        companyName: newUser.companyName,
      },
    });

    // Attach standard rate limit headers
    setRateLimitHeaders(response, rateCheck);

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: error.message || 'Registration failed' }, { status: 500 });
  }
}
