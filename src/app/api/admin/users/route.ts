import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, hashPassword } from '@/lib/auth';
import { initDb, User, getNextUserId, resequenceUsers } from '@/lib/db';
import { checkRateLimit, createRateLimitResponse } from '@/lib/rateLimit';
import { validatePasswordStrength, sanitizeString } from '@/lib/security';

export async function GET(req: NextRequest) {
  try {
    const rateCheck = checkRateLimit(req, 'api');
    if (!rateCheck.allowed) {
      return createRateLimitResponse(rateCheck.retryAfter);
    }

    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 403 });
    }

    await initDb();
    const users = await User.findAll({
      attributes: ['id', 'email', 'name', 'role', 'companyName', 'phone', 'createdAt'],
      order: [['createdAt', 'DESC']],
    });

    return NextResponse.json({ success: true, users });
  } catch (error: any) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const adminUser = await getCurrentUser();
    if (!adminUser || adminUser.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 403 });
    }

    await initDb();
    const body = await req.json();
    const { email, password, name, role, companyName, phone } = body;

    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Email, password, and name are required' }, { status: 400 });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 });
    }

    let cleanPhone = '';
    if (phone) {
      cleanPhone = String(phone).replace(/\D/g, '');
      if (cleanPhone.startsWith('91') && cleanPhone.length > 10) cleanPhone = cleanPhone.slice(2);
      cleanPhone = cleanPhone.slice(0, 10);
    }

    const nextUserId = await getNextUserId();
    const newUser = await User.create({
      id: nextUserId,
      email,
      passwordHash: hashPassword(password),
      name,
      role: role || 'client',
      companyName: companyName || '',
      phone: cleanPhone,
    });

    return NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        companyName: newUser.companyName,
        phone: newUser.phone,
      },
    });
  } catch (error: any) {
    console.error('Error provisioning user account:', error);
    return NextResponse.json({ error: error.message || 'Failed to create account' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const adminUser = await getCurrentUser();
    if (!adminUser || adminUser.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId') || searchParams.get('id');

    if (!userId) {
      return NextResponse.json({ error: 'userId parameter is required' }, { status: 400 });
    }

    if (userId === adminUser.id) {
      return NextResponse.json({ error: 'Cannot delete currently active admin account' }, { status: 400 });
    }

    await initDb();
    await User.destroy({ where: { id: userId } });
    await resequenceUsers();

    return NextResponse.json({ success: true, message: 'Account deleted and database updated successfully' });
  } catch (error: any) {
    console.error('Error deleting user account:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete account' }, { status: 500 });
  }
}
