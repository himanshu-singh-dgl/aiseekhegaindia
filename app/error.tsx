'use client';

import { Container } from '@/components/ui/Container';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container className="py-24 text-center">
      <h1 className="text-4xl font-bold">Something went wrong</h1>
      <p className="mt-4 text-[var(--muted)]">{error.message}</p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 rounded-lg bg-primary px-4 py-2 text-white"
      >
        Try again
      </button>
    </Container>
  );
}
