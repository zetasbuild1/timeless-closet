export const ADMIN_CONFIG = {
  email: 'admin@timeless.com',
  username: 'admin',
  password: 'admin123',
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
