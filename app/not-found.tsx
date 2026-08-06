import Link from 'next/link';
import { Container } from '@/components/ui/Container';

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <h1 className="text-4xl font-bold">Page not found</h1>
      <p className="mt-4 text-[var(--muted)]">The page you requested does not exist.</p>
      <Link href="/" className="mt-8 inline-block text-primary hover:underline">
        Go home
      </Link>
    </Container>
  );
}
