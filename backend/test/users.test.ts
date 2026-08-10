import type { Pool } from 'pg';
import { describe, expect, it, vi } from 'vitest';
import { upsertGoogleUser } from '../src/repositories/users.js';

describe('Google user repository', () => {
  it('creates and links a Google user in one transaction', async () => {
    const row = {
      id: '04b2fac6-0b96-42dd-9742-1c8b0ae50dde',
      email: 'person@example.com',
      name: 'Example Person',
      avatar_url: 'https://example.com/avatar.png',
      role: 'user' as const,
    };
    const query = vi
      .fn()
      .mockResolvedValueOnce({ rows: [] })
      .mockResolvedValueOnce({ rows: [] })
      .mockResolvedValueOnce({ rows: [row] })
      .mockResolvedValueOnce({ rows: [] })
      .mockResolvedValueOnce({ rows: [row] })
      .mockResolvedValueOnce({ rows: [] });
    const release = vi.fn();
    const pool = {
      connect: vi.fn().mockResolvedValue({ query, release }),
    } as unknown as Pick<Pool, 'connect'>;

    const user = await upsertGoogleUser(
      {
        providerAccountId: 'google-account-id',
        email: ' Person@Example.com ',
        name: 'Example Person',
        avatarUrl: 'https://example.com/avatar.png',
      },
      pool,
    );

    expect(user).toEqual({
      id: row.id,
      email: row.email,
      name: row.name,
      avatarUrl: row.avatar_url,
      role: 'user',
    });
    expect(query).toHaveBeenCalledWith('BEGIN');
    expect(query).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO oauth_accounts'),
      [row.id, 'google-account-id'],
    );
    expect(query).toHaveBeenCalledWith('COMMIT');
    expect(release).toHaveBeenCalledOnce();
  });
});
