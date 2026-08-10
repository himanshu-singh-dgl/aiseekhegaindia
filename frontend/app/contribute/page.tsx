import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contribute',
  description: 'How to contribute to AISeekhegaIndia documentation',
};

export default function ContributePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 prose prose-neutral dark:prose-invert">
      <h1>How to Contribute</h1>
      <p>
        Thank you for your interest in contributing to AISeekhegaIndia! This
        community-driven resource depends on contributions from people like you.
      </p>

      <h2>Ways to Contribute</h2>
      <ul>
        <li>
          <strong>Add new content</strong>: Write new tutorials, guides, or
          reference documentation
        </li>
        <li>
          <strong>Improve existing content</strong>: Fix typos, clarify
          explanations, update outdated information
        </li>
        <li>
          <strong>Add code examples</strong>: Provide practical examples in
          Python, R, or other languages
        </li>
        <li>
          <strong>Review and give feedback</strong>: Help review pull requests
        </li>
        <li>
          <strong>Report issues</strong>: Report bugs or request new content
        </li>
      </ul>

      <h2>Getting Started</h2>
      <ol>
        <li>Fork the repository on GitHub</li>
        <li>Clone your fork locally</li>
        <li>
          Install dependencies with <code>npm install</code>
        </li>
        <li>
          Start the development server with <code>npm run dev</code>
        </li>
      </ol>

      <h2>Content layout</h2>
      <ul>
        <li>
          <code>content/docs/machine-learning/</code>
        </li>
        <li>
          <code>content/docs/deep-learning/</code>
        </li>
        <li>
          <code>content/docs/language-models/</code>
        </li>
        <li>
          <code>content/docs/ai-for-leaders/</code>
        </li>
        <li>
          <code>content/docs/resources/</code>
        </li>
      </ul>

      <p>
        Documentation is written in MDX. After changes, open a pull request
        against the main repository.
      </p>

      <p>
        <Link href="/docs">Browse the docs →</Link>
      </p>
    </main>
  );
}
