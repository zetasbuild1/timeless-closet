import { NextRequest, NextResponse } from 'next/server';
import { AUTH_COOKIE_NAME, ADMIN_CONFIG } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (token && token.startsWith('authenticated_admin_token_')) {
    return NextResponse.json({
      authenticated: true,
      user: {
        name: ADMIN_CONFIG.name,
        email: ADMIN_CONFIG.email,
        role: ADMIN_CONFIG.role,
      },
    });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}
