"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchMe, type AuthUser } from "@/lib/auth";

export default function AuthCallbackPage() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const oauthError = params.get("error");
    if (oauthError) {
      setError(oauthError);
      setLoading(false);
      return;
    }

    fetchMe()
      .then((me) => {
        if (!me) {
          setError("unauthorized");
          return;
        }
        setUser(me);
      })
      .catch(() => setError("me_failed"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main style={{ maxWidth: 480, margin: "4rem auto", padding: "0 1.25rem" }}>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>Sign in</h1>
      {loading ? <p>Checking session…</p> : null}
      {!loading && error ? (
        <p role="alert">Could not complete sign-in ({error}).</p>
      ) : null}
      {!loading && user ? (
        <div>
          <p>
            Signed in as <strong>{user.name ?? user.email}</strong>
          </p>
          <p style={{ color: "#666", fontSize: "0.95rem" }}>{user.email}</p>
          <p style={{ marginTop: "1.25rem" }}>
            <Link href="/">Continue to home</Link>
          </p>
        </div>
      ) : null}
    </main>
  );
}
