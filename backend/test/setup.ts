process.env.NODE_ENV = 'test';
process.env.FRONTEND_ORIGIN ??= 'http://localhost:3000';
process.env.DATABASE_URL ??=
  'postgresql://postgres:postgres@localhost:5432/aiseekhegaindia_test';
process.env.DATABASE_SSL ??= 'false';
process.env.GCP_CLIENT_ID ??= 'test-client-id';
process.env.GCP_CLIENT_SECRET ??= 'test-client-secret';
process.env.GOOGLE_CALLBACK_URL ??=
  'http://localhost:4000/api/auth/google/callback';
process.env.SESSION_SECRET ??= 'test-session-secret-at-least-32-characters';
