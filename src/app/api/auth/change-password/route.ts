import { NextRequest, NextResponse } from 'next/server';
import { initDb, User, Project } from '@/lib/db';
import { getCurrentUser, comparePassword, hashPassword, signToken, COOKIE_NAME } from '@/lib/auth';
import { validatePasswordStrength } from '@/lib/security';
import { checkRateLimit, createRateLimitResponse } from '@/lib/rateLimit';

export async function POST(req: NextRequest) {
  try {
    const rateCheck = checkRateLimit(req, 'auth');
    if (!rateCheck.allowed) {
      return createRateLimitResponse(
        rateCheck.retryAfter,
        `Too many attempts. Please wait ${rateCheck.retryAfter} seconds before trying again.`
      );
    }

    const sessionUser = await getCurrentUser();
    if (!sessionUser) {
      return NextResponse.json({ error: 'Unauthorized. Please sign in.' }, { status: 401 });
    }

    await initDb();
    const body = await req.json();
    const name = typeof body.name === 'string' ? body.name.trim() : undefined;
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : undefined;
    const companyName = typeof body.companyName === 'string' ? body.companyName.trim() : undefined;
    const currentPassword = body.currentPassword || '';
    const newPassword = body.newPassword || '';

    if (!name && !newPassword && !email && !companyName) {
      return NextResponse.json(
        { error: 'Please provide credentials or account details to update' },
        { status: 400 }
      );
    }

    const user = await User.findByPk(sessionUser.id);
    if (!user) {
      return NextResponse.json({ error: 'User account not found' }, { status: 404 });
    }

    let nameUpdated = false;
    let emailUpdated = false;
    let companyUpdated = false;
    let passwordUpdated = false;

    // 1. Update Name if provided
    if (name !== undefined && name !== user.name) {
      if (name.length < 2) {
        return NextResponse.json(
          { error: 'Name must be at least 2 characters' },
          { status: 400 }
        );
      }
      user.name = name;
      nameUpdated = true;
    }

    // 2. Update Email if provided
    if (email !== undefined && email !== user.email) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 });
      }
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser && existingUser.id !== user.id) {
        return NextResponse.json({ error: 'This email is already registered to another account' }, { status: 409 });
      }
      user.email = email;
      emailUpdated = true;
    }

    // 3. Update Company Name if provided
    if (companyName !== undefined && companyName !== user.companyName) {
      user.companyName = companyName;
      companyUpdated = true;
    }

    // 4. Update Password if provided
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json(
          { error: 'Current password is required to set a new password' },
          { status: 400 }
        );
      }

      const isCurrentValid = await comparePassword(currentPassword, user.passwordHash);
      if (!isCurrentValid) {
        return NextResponse.json(
          { error: 'Current password is incorrect' },
          { status: 400 }
        );
      }

      const strengthCheck = validatePasswordStrength(newPassword);
      if (!strengthCheck.valid) {
        return NextResponse.json({ error: strengthCheck.message }, { status: 400 });
      }

      user.passwordHash = hashPassword(newPassword);
      passwordUpdated = true;
    }

    if (!nameUpdated && !emailUpdated && !companyUpdated && !passwordUpdated) {
      return NextResponse.json({
        success: true,
        message: 'No changes detected.',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          companyName: user.companyName,
          role: user.role,
        },
      });
    }

    // Persist changes directly to database
    await user.save();

    // Synchronize client details across all associated projects in database
    if (nameUpdated || emailUpdated || companyUpdated) {
      const projectUpdates: any = {};
      if (nameUpdated) {
        projectUpdates.clientName = user.name;
        projectUpdates.contactPerson = user.name;
      }
      if (emailUpdated) {
        projectUpdates.clientEmail = user.email;
        projectUpdates.contactEmail = user.email;
      }
      if (companyUpdated) {
        projectUpdates.companyName = user.companyName;
      }

      try {
        await Project.update(projectUpdates, {
          where: { clientId: user.id },
        });
      } catch (projSyncErr) {
        console.error('Failed to sync updated user details to projects:', projSyncErr);
      }
    }

    // Re-sign token with updated user details so session updates everywhere
    const token = signToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      companyName: user.companyName,
    });

    const response = NextResponse.json({
      success: true,
      message: passwordUpdated
        ? 'Credentials and password updated successfully.'
        : 'Account credentials updated successfully.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        companyName: user.companyName,
        role: user.role,
      },
    });

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Update settings error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update credentials' },
      { status: 500 }
    );
  }
}
