'use client';

import { useState } from 'react';
import { useAuth } from './AuthProvider';

export function AuthMenu() {
  const { user, loading, login, logout } = useAuth();
  const [signingOut, setSigningOut] = useState(false);

  if (loading) {
    return (
      <span
        aria-label="Loading account"
        className="block h-8 w-20 animate-pulse rounded-md bg-fd-muted"
      />
    );
  }

  if (!user) {
    return (
      <button
        type="button"
        onClick={login}
        className="rounded-md border border-fd-border px-3 py-1.5 text-sm font-medium hover:bg-fd-accent"
      >
        Sign in with Google
      </button>
    );
  }

  async function handleLogout() {
    setSigningOut(true);
    try {
      await logout();
    } finally {
      setSigningOut(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      {user.avatarUrl ? (
        <img
          src={user.avatarUrl}
          alt=""
          referrerPolicy="no-referrer"
          className="h-7 w-7 rounded-full"
        />
      ) : null}
      <span className="hidden max-w-32 truncate text-sm sm:block">
        {user.name}
      </span>
      <button
        type="button"
        onClick={() => void handleLogout()}
        disabled={signingOut}
        className="rounded-md border border-fd-border px-2.5 py-1 text-sm hover:bg-fd-accent disabled:opacity-50"
      >
        {signingOut ? 'Signing out…' : 'Sign out'}
      </button>
    </div>
  );
}
