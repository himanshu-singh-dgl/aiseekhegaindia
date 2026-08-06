import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { BrainIcon } from '@/components/features/homepage/BrainIcon';
import { HomepageFeatures } from '@/components/features/homepage/HomepageFeatures';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Home',
  description:
    'Community-driven platform for Machine Learning, Deep Learning, and Language Models',
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <section className="border-b border-[var(--border)] bg-gradient-to-br from-blue-50 via-white to-orange-50 py-16 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Building India&apos;s <span className="text-primary">AI</span> Future Together
            </h1>
            <p className="mt-4 text-lg text-[var(--muted)]">
              AI Seekhega India, Badhega India.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/docs/machine-learning/intro">Start Learning</Button>
              <Button href="/contribute" variant="secondary">
                Join Community
              </Button>
            </div>
            <div className="mt-8 flex gap-8 text-sm">
              <div>
                <div className="text-2xl font-bold text-primary">100+</div>
                <div className="text-[var(--muted)]">Resources</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-[var(--muted)]">Support</div>
              </div>
            </div>
            <p className="mt-6 inline-block rounded-full bg-[var(--surface)] px-4 py-1 text-sm">
              Powered by India&apos;s AI Community
            </p>
          </div>
          <div className="flex justify-center">
            <BrainIcon />
          </div>
        </Container>
      </section>

      <HomepageFeatures />

      <section className="py-16">
        <Container>
          <h2 className="mb-8 text-center text-3xl font-bold">Explore Topics</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                title: 'Machine Learning',
                href: '/docs/machine-learning/intro',
                description:
                  'Learn about supervised, unsupervised, and reinforcement learning algorithms, evaluation metrics, and practical applications.',
              },
              {
                title: 'Deep Learning',
                href: '/docs/deep-learning/intro',
                description:
                  'Dive into neural networks, CNNs, RNNs, transformers, and advanced architectures driving AI breakthroughs.',
              },
              {
                title: 'Language Models',
                href: '/docs/language-models/intro',
                description:
                  'Understand LLMs, tokenization, fine-tuning techniques, prompt engineering, and emerging capabilities.',
              },
              {
                title: 'Resources',
                href: '/docs/resources/intro',
                description:
                  'Find curated datasets, libraries, research papers, and tutorials to support your learning and projects.',
              },
            ].map((topic) => (
              <div
                key={topic.href}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6"
              >
                <h3 className="text-xl font-semibold">{topic.title}</h3>
                <p className="mt-2 text-[var(--muted)]">{topic.description}</p>
                <Link href={topic.href} className="mt-4 inline-block font-medium text-primary">
                  Explore {topic.title} →
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-[var(--border)] bg-[var(--surface)] py-16">
        <Container className="text-center">
          <h2 className="text-3xl font-bold">Join Our Community</h2>
          <p className="mx-auto mt-4 max-w-2xl text-[var(--muted)]">
            Contribute to the platform, share your expertise, and help build a comprehensive
            resource for AI and ML practitioners around the world.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/contribute">Learn How to Contribute</Button>
            <Button href="https://github.com/ai-ml-community/ai-ml-docs" variant="secondary" external>
              GitHub Repository
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
