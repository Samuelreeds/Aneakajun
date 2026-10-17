import { createNeonAuth } from '@neondatabase/auth/next/server';

export const auth = createNeonAuth({
  // Adding the fallback prevents the 'endsWith' undefined crash
  baseUrl: process.env.NEON_AUTH_URL || "https://fallback.neonauth.aws.neon.tech/neondb/auth",
  cookies: {
    secret: process.env.NEON_AUTH_COOKIE_SECRET || "development-secret-key",
  },
});