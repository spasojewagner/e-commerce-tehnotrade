const DEV_SECRET = 'dev-only-secret-change-me';

/** Read lazily so tests and scripts can set it before the first request. */
export function jwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (secret) return secret;
  if (process.env.NODE_ENV === 'production') throw new Error('JWT_SECRET is not set');
  return DEV_SECRET;
}

export const COOKIE_NAME = 'jwt';

export function cookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
  };
}
