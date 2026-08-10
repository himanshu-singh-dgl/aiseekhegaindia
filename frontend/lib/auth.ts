export type AuthUser = {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  role: 'user' | 'admin';
};

const apiUrl =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ??
  'http://localhost:4000';

export function getGoogleLoginUrl(): string {
  return `${apiUrl}/api/auth/google`;
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const response = await fetch(`${apiUrl}/api/auth/me`, {
    credentials: 'include',
  });

  if (response.status === 401) {
    return null;
  }

  if (!response.ok) {
    throw new Error('Unable to load the current user');
  }

  const payload = (await response.json()) as { user: AuthUser };
  return payload.user;
}

export async function logout(): Promise<void> {
  const response = await fetch(`${apiUrl}/api/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Unable to sign out');
  }
}
