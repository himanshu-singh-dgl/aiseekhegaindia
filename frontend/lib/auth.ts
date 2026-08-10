export type AuthUser = {
  id: string;
  email: string;
  name: string;
  picture?: string;
};

function getApiUrl(): string {
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
}

export function getGoogleLoginUrl(): string {
  return `${getApiUrl()}/api/auth/google`;
}

export async function getMe(): Promise<AuthUser | null> {
  try {
    const res = await fetch(`${getApiUrl()}/api/auth/me`, {
      credentials: 'include',
      cache: 'no-store',
    });
    if (!res.ok) {
      return null;
    }
    return (await res.json()) as AuthUser;
  } catch {
    return null;
  }
}

export async function logout(): Promise<void> {
  await fetch(`${getApiUrl()}/api/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });
}
