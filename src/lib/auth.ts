export const ADMIN_CONFIG = {
  email: process.env.ADMIN_EMAIL || 'admin@timeless2026!',
  username: 'admin',
  password: process.env.ADMIN_PASSWORD || 'admin123',
  name: 'Timeless Administrator',
  role: 'admin',
};

export const AUTH_COOKIE_NAME = 'timeless_admin_session';

export function verifyCredentials(identifier: string, password: string): boolean {
  if (!identifier || !password) return false;
  const cleanId = identifier.trim().toLowerCase();
  const isMatchId = cleanId === ADMIN_CONFIG.email.toLowerCase() || cleanId === ADMIN_CONFIG.username.toLowerCase();
  const isMatchPassword = password === ADMIN_CONFIG.password;
  return isMatchId && isMatchPassword;
}
