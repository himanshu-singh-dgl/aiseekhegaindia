"use client";

import { useEffect, useState } from "react";
import {
  fetchMe,
  getGoogleSignInUrl,
  logout,
  type AuthUser,
} from "@/lib/auth";

export function AuthControls({ className }: { className?: string }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchMe()
      .then((me) => {
        if (!cancelled) setUser(me);
      })
      .catch(() => {
        if (!cancelled) setUser(null);
      })
      .finally(() => {
        if (!cancelled) setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!ready) return null;

  if (user) {
    return (
      <div className={className} style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
        <span style={{ fontSize: "0.85rem", maxWidth: 140, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {user.name ?? user.email}
        </span>
        <button
          type="button"
          onClick={async () => {
            await logout();
            setUser(null);
          }}
          style={{
            fontSize: "0.85rem",
            background: "transparent",
            border: "1px solid currentColor",
            borderRadius: 4,
            padding: "0.25rem 0.55rem",
            cursor: "pointer",
          }}
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <a
      className={className}
      href={getGoogleSignInUrl()}
      style={{
        fontSize: "0.85rem",
        border: "1px solid currentColor",
        borderRadius: 4,
        padding: "0.25rem 0.65rem",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      Sign in
    </a>
  );
}
