import { randomUUID } from 'node:crypto';
import type { Pool, PoolClient } from 'pg';
import { database } from '../config/database.js';

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  role: 'user' | 'admin';
};

export type GoogleUserProfile = {
  providerAccountId: string;
  email: string;
  name: string;
  avatarUrl: string | null;
};

type QueryablePool = Pick<Pool, 'connect'>;

type UserRow = {
  id: string;
  email: string;
  name: string;
  avatar_url: string | null;
  role: 'user' | 'admin';
};

function mapUser(row: UserRow): AuthUser {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    avatarUrl: row.avatar_url,
    role: row.role,
  };
}

async function updateExistingAccount(
  client: PoolClient,
  profile: GoogleUserProfile,
): Promise<AuthUser | null> {
  const result = await client.query<UserRow>(
    `UPDATE users AS u
       SET email = $1,
           name = $2,
           avatar_url = $3,
           updated_at = NOW()
      FROM oauth_accounts AS oa
     WHERE oa.user_id = u.id
       AND oa.provider = 'google'
       AND oa.provider_account_id = $4
     RETURNING u.id, u.email, u.name, u.avatar_url, u.role`,
    [
      profile.email,
      profile.name,
      profile.avatarUrl,
      profile.providerAccountId,
    ],
  );

  return result.rows[0] ? mapUser(result.rows[0]) : null;
}

export async function upsertGoogleUser(
  input: GoogleUserProfile,
  pool: QueryablePool = database,
): Promise<AuthUser> {
  const profile = {
    ...input,
    email: input.email.trim().toLowerCase(),
  };
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const existing = await updateExistingAccount(client, profile);
    if (existing) {
      await client.query('COMMIT');
      return existing;
    }

    const userResult = await client.query<UserRow>(
      `INSERT INTO users (id, email, name, avatar_url)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (email) DO UPDATE
         SET name = EXCLUDED.name,
             avatar_url = EXCLUDED.avatar_url,
             updated_at = NOW()
       RETURNING id, email, name, avatar_url, role`,
      [randomUUID(), profile.email, profile.name, profile.avatarUrl],
    );
    const user = userResult.rows[0];

    if (!user) {
      throw new Error('Google user upsert did not return a user');
    }

    await client.query(
      `INSERT INTO oauth_accounts (user_id, provider, provider_account_id)
       VALUES ($1, 'google', $2)
       ON CONFLICT (provider, provider_account_id) DO NOTHING`,
      [user.id, profile.providerAccountId],
    );

    const linkedUser = await updateExistingAccount(client, profile);
    if (!linkedUser) {
      throw new Error('Google OAuth account could not be linked');
    }

    await client.query('COMMIT');
    return linkedUser;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export async function findUserById(
  id: string,
  pool: Pick<Pool, 'query'> = database,
): Promise<AuthUser | null> {
  const result = await pool.query<UserRow>(
    `SELECT id, email, name, avatar_url, role
       FROM users
      WHERE id = $1`,
    [id],
  );

  return result.rows[0] ? mapUser(result.rows[0]) : null;
}
