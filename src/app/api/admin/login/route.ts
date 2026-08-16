import { NextRequest, NextResponse } from 'next/server';
import { verifyCredentials, ADMIN_CONFIG, AUTH_COOKIE_NAME } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, rememberMe } = body;

    if (!verifyCredentials(email, password)) {
      return NextResponse.json(
        { error: 'Invalid email or password. Please check your credentials.' },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      user: {
        name: ADMIN_CONFIG.name,
        email: ADMIN_CONFIG.email,
        role: ADMIN_CONFIG.role,
      },
    });

    // Set auth cookie
    const maxAge = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24; // 30 days or 1 day
    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: 'authenticated_admin_token_' + Date.now(),
      httpOnly: false, // Accessible to client for instant check
      path: '/',
      maxAge,
      sameSite: 'lax',
    });

    return response;
  } catch (error) {
    console.error('Error logging in admin:', error);
    return NextResponse.json({ error: 'Server error during login' }, { status: 500 });
  }
}
