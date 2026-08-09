import { siteConfig } from "./site";

const API_URL = siteConfig.apiBaseUrl.replace(/\/$/, "");

export type AuthUser = {
  id: string;
  email: string;
  emailVerified: boolean;
  name: string | null;
  pictureUrl: string | null;
  createdAt: string;
};

export function getGoogleSignInUrl(): string {
  return `${API_URL}/api/v1/auth/google`;
}

export async function fetchMe(): Promise<AuthUser | null> {
  const res = await fetch(`${API_URL}/api/v1/auth/me`, {
    credentials: "include",
  });
  if (res.status === 401) return null;
  if (!res.ok) {
    throw new Error(`me_failed_${res.status}`);
  }
  const data = (await res.json()) as { user: AuthUser };
  return data.user;
}

export async function logout(): Promise<void> {
  await fetch(`${API_URL}/api/v1/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
}
