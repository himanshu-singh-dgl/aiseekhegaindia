import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'How to Contribute',
  description: 'Learn how to contribute to the AI & ML Documentation project.',
  path: '/contribute',
});

export default function ContributePage() {
  return (
    <Container className="py-12">
      <article className="doc-content mx-auto max-w-3xl">
        <h1>How to Contribute</h1>
        <p>
          Thank you for your interest in contributing to the AI &amp; ML Documentation project! This
          community-driven resource depends on contributions from people like you.
        </p>

        <h2>Ways to Contribute</h2>
        <ul>
          <li><strong>Add new content</strong>: Write new tutorials, guides, or reference documentation</li>
          <li><strong>Improve existing content</strong>: Fix typos, clarify explanations, update outdated information</li>
          <li><strong>Add code examples</strong>: Provide practical examples in Python, R, or other languages</li>
          <li><strong>Review and give feedback</strong>: Help review pull requests and provide constructive feedback</li>
          <li><strong>Report issues</strong>: Report bugs, suggest improvements, or request new content</li>
        </ul>

        <h2>Getting Started</h2>
        <h3>1. Set up your development environment</h3>
        <ol>
          <li>Fork the repository on GitHub</li>
          <li>Clone your fork locally</li>
          <li>Install dependencies with <code>npm install</code></li>
          <li>Start the development server with <code>npm run dev</code></li>
        </ol>

        <h3>2. Make your changes</h3>
        <p>Our documentation lives under <code>content/docs/</code> organized by topic sections.</p>

        <h3>3. Submit a pull request</h3>
        <ol>
          <li>Commit your changes to a new branch</li>
          <li>Push your branch to your fork</li>
          <li>Submit a pull request to the main repository</li>
        </ol>

        <p>
          Questions? Open a discussion on{' '}
          <a href="https://github.com/ai-ml-community/ai-ml-docs/discussions">GitHub</a> or visit our{' '}
          <Link href="/docs/resources/intro">Resources</Link> section.
        </p>
      </article>
    </Container>
  );
}
