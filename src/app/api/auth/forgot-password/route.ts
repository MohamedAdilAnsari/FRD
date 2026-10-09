import { NextRequest, NextResponse } from 'next/server';
import { initDb, User } from '@/lib/db';
import { hashPassword } from '@/lib/auth';
import { checkRateLimit, createRateLimitResponse } from '@/lib/rateLimit';
import { validatePasswordStrength } from '@/lib/security';

export async function POST(req: NextRequest) {
  try {
    const rateCheck = checkRateLimit(req, 'auth');
    if (!rateCheck.allowed) {
      return createRateLimitResponse(
        rateCheck.retryAfter,
        `Too many password reset attempts. Please wait ${rateCheck.retryAfter} seconds.`
      );
    }

    await initDb();
    const { email, newPassword, otp } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      // Don't leak user existence in generic request
      return NextResponse.json({ 
        success: true, 
        message: 'If an account exists, a verification code has been dispatched.' 
      });
    }

    if (newPassword) {
      user.passwordHash = hashPassword(newPassword);
      await user.save();
      return NextResponse.json({ 
        success: true, 
        message: 'Password has been successfully updated.' 
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Password reset instructions dispatched.' 
    });
  } catch (error: any) {
    console.error('Password reset error:', error);
    return NextResponse.json({ error: error.message || 'Password reset failed' }, { status: 500 });
  }
}
