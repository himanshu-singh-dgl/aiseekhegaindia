import 'dotenv/config';

function readPort(value: string | undefined): number {
  const port = Number(value ?? 4000);

  if (!Number.isInteger(port) || port < 1 || port > 65_535) {
    throw new Error('PORT must be an integer between 1 and 65535');
  }

  return port;
}

function requireEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is required`);
  }

  return value;
}

function readUrl(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;

  if (!value) {
    throw new Error(`${name} is required`);
  }

  try {
    return new URL(value).origin + new URL(value).pathname.replace(/\/$/, '');
  } catch {
    throw new Error(`${name} must be a valid URL`);
  }
}

function readSessionSecret(): string {
  const secret = requireEnv('SESSION_SECRET');

  if (secret.length < 32) {
    throw new Error('SESSION_SECRET must be at least 32 characters');
  }

  return secret;
}

const nodeEnv = process.env.NODE_ENV ?? 'development';

export const env = {
  nodeEnv,
  isProduction: nodeEnv === 'production',
  host: process.env.HOST ?? '0.0.0.0',
  port: readPort(process.env.PORT),
  frontendOrigin: readUrl(
    'FRONTEND_ORIGIN',
    nodeEnv === 'test' ? 'http://localhost:3000' : undefined,
  ),
  databaseUrl: requireEnv('DATABASE_URL'),
  databaseSsl: process.env.DATABASE_SSL === 'true',
  googleClientId: requireEnv('GCP_CLIENT_ID'),
  googleClientSecret: requireEnv('GCP_CLIENT_SECRET'),
  googleCallbackUrl: readUrl('GOOGLE_CALLBACK_URL'),
  sessionSecret: readSessionSecret(),
  sessionCookieName: 'aiseekhega_session',
  sessionMaxAgeMs: 30 * 24 * 60 * 60 * 1000,
};
