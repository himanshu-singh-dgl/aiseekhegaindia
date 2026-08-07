import Link from 'next/link';
import BrainIcon from '@/components/BrainIcon';

const topics = [
  {
    title: 'Machine Learning',
    href: '/docs/machine-learning/intro',
    description:
      'Supervised, unsupervised, and reinforcement learning algorithms, evaluation metrics, and practical applications.',
  },
  {
    title: 'Deep Learning',
    href: '/docs/deep-learning/intro',
    description:
      'Neural networks, CNNs, RNNs, transformers, and advanced architectures driving AI breakthroughs.',
  },
  {
    title: 'Language Models',
    href: '/docs/language-models/intro',
    description:
      'LLMs, tokenization, fine-tuning, prompt engineering, and emerging capabilities.',
  },
  {
    title: 'Resources',
    href: '/docs/resources/intro',
    description: 'Curated datasets, libraries, research papers, and tutorials.',
  },
];

const features = [
  {
    title: 'Community-Driven',
    description:
      'Built by the community, for the community. Anyone can contribute by submitting pull requests.',
  },
  {
    title: 'Comprehensive Coverage',
    description:
      'From foundational ML concepts to cutting-edge language models across the full AI spectrum.',
  },
  {
    title: 'Interactive Examples',
    description: 'Learn by reading and experimenting with interactive tutorials and visualizations.',
  },
];

export default function HomePage() {
  return (
    <main>
      <section className="border-b border-orange-100 bg-gradient-to-br from-orange-50 via-white to-green-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
              Building India&apos;s{' '}
              <span className="text-orange-600">AI</span> Future Together
            </h1>
            <p className="mt-4 text-lg text-zinc-600">AI Seekhega India, Badhega India.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/docs/machine-learning/intro"
                className="rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700"
              >
                Start Learning
              </Link>
              <Link
                href="/contribute"
                className="rounded-lg border border-zinc-300 bg-white px-6 py-3 font-semibold text-zinc-800 hover:bg-zinc-50"
              >
                Join Community
              </Link>
            </div>
            <div className="mt-8 flex gap-8 text-sm">
              <div>
                <div className="text-2xl font-bold text-orange-600">100+</div>
                <div className="text-zinc-500">Resources</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">24/7</div>
                <div className="text-zinc-500">Support</div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <BrainIcon />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="mb-10 text-center text-3xl font-bold">What is AI Seekhega India?</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-zinc-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-zinc-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="mb-10 text-center text-3xl font-bold">Explore Topics</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {topics.map((topic) => (
              <div key={topic.title} className="rounded-xl border border-zinc-200 bg-white p-6">
                <h3 className="text-xl font-semibold">{topic.title}</h3>
                <p className="mt-2 text-zinc-600">{topic.description}</p>
                <Link href={topic.href} className="mt-4 inline-block font-medium text-orange-600">
                  Explore {topic.title} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-orange-600 py-16 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold">Join Our Community</h2>
          <p className="mt-4 text-orange-100">
            Contribute to the platform, share your expertise, and help build a comprehensive
            resource for AI and ML practitioners.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contribute"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-orange-700 hover:bg-orange-50"
            >
              Learn How to Contribute
            </Link>
            <a
              href="https://github.com/retiredbatmanforsale/aiseekhegaindia"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/40 px-6 py-3 font-semibold hover:bg-white/10"
            >
              GitHub Repository
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
