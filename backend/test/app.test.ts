import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { Express } from 'express';
import session from 'express-session';

describe('Express API', () => {
  let app: Express;

  beforeAll(async () => {
    const { buildApp } = await import('../src/app.js');
    app = buildApp({ sessionStore: new session.MemoryStore() });
  });

  afterAll(async () => {
    const { database } = await import('../src/config/database.js');
    await database.end();
  });

  it('returns API health', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
    expect(response.body.timestamp).toEqual(expect.any(String));
  });

  it('returns 401 for an unauthenticated current-user request', async () => {
    const response = await request(app).get('/api/auth/me');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ user: null });
  });

  it('starts Google OAuth with the required scopes and state', async () => {
    const response = await request(app).get('/api/auth/google');

    expect(response.status).toBe(302);
    const redirect = new URL(response.headers.location);
    expect(redirect.origin).toBe('https://accounts.google.com');
    expect(redirect.searchParams.get('scope')).toContain('openid');
    expect(redirect.searchParams.get('scope')).toContain('email');
    expect(redirect.searchParams.get('scope')).toContain('profile');
    expect(redirect.searchParams.get('state')).toBeTruthy();
  });

  it('clears an unauthenticated session on logout', async () => {
    const response = await request(app).post('/api/auth/logout');

    expect(response.status).toBe(204);
  });

  it('redirects a denied Google callback safely', async () => {
    const response = await request(app).get(
      '/api/auth/google/callback?error=access_denied',
    );

    expect(response.status).toBe(302);
    expect(response.headers.location).toBe(
      'http://localhost:3000/?auth_error=oauth_denied',
    );
  });
});
