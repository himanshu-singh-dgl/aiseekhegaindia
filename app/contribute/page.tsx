import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'How to Contribute',
  description:
    'Contribution guidelines for the AI Seekhega India documentation project.',
  openGraph: {
    title: `How to Contribute | ${siteConfig.title}`,
    description:
      'Contribution guidelines for the AI Seekhega India documentation project.',
    url: `${siteConfig.url}/contribute`,
  },
};

export default function ContributePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <article className="prose prose-slate dark:prose-invert max-w-none prose-a:text-[var(--color-primary)]">
        <h1>How to Contribute</h1>

        <p>
          Thank you for your interest in contributing to the AI &amp; ML
          Documentation project! This community-driven resource depends on
          contributions from people like you.
        </p>

        <h2>Ways to Contribute</h2>
        <p>There are many ways to contribute to this project:</p>
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
            and provide constructive feedback
          </li>
          <li>
            <strong>Report issues</strong>: Report bugs, suggest improvements, or
            request new content
          </li>
        </ul>

        <h2>Getting Started</h2>

        <h3>1. Set up your development environment</h3>
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

        <h3>2. Make your changes</h3>
        <p>Our documentation is organized in the following directories:</p>
        <ul>
          <li>
            <code>/content/docs/machine-learning/</code>: Machine Learning
            documentation
          </li>
          <li>
            <code>/content/docs/deep-learning/</code>: Deep Learning
            documentation
          </li>
          <li>
            <code>/content/docs/language-models/</code>: Language Models
            documentation
          </li>
          <li>
            <code>/content/docs/resources/</code>: Resources, libraries,
            datasets, and tools
          </li>
        </ul>
        <p>
          All documentation is written in Markdown with MDX extensions for
          interactive components.
        </p>

        <h3>3. Submit a pull request</h3>
        <ol>
          <li>Commit your changes to a new branch</li>
          <li>Push your branch to your fork</li>
          <li>Submit a pull request from your branch to the main repository</li>
          <li>Describe your changes in the pull request description</li>
        </ol>

        <h2>Content Guidelines</h2>

        <h3>Style</h3>
        <ul>
          <li>Use clear, concise language</li>
          <li>Break complex topics into digestible sections</li>
          <li>Include diagrams and visualizations where helpful</li>
          <li>Provide code examples with explanations</li>
          <li>Link to relevant resources and references</li>
        </ul>

        <h3>Structure</h3>
        <p>Each document should generally follow this structure:</p>
        <ol>
          <li>
            <strong>Introduction</strong>: Brief overview of the topic
          </li>
          <li>
            <strong>Main Content</strong>: Detailed explanation with sections
            and subsections
          </li>
          <li>
            <strong>Practical Examples</strong>: Code examples showing real-world
            usage
          </li>
          <li>
            <strong>Advanced Topics</strong>: More complex aspects (optional)
          </li>
          <li>
            <strong>Further Reading</strong>: Links to related documentation and
            external resources
          </li>
        </ol>

        <h3>Code Examples</h3>
        <ul>
          <li>
            Include code examples in Python (preferred), R, or other relevant
            languages
          </li>
          <li>
            Make sure code is runnable and produces the expected output
          </li>
          <li>Explain the code thoroughly</li>
        </ul>

        <h2>Review Process</h2>
        <p>All contributions go through a review process:</p>
        <ol>
          <li>Automated checks for formatting and basic errors</li>
          <li>Review by community members</li>
          <li>Review by project maintainers</li>
          <li>Merging by maintainers once approved</li>
        </ol>

        <h2>Community Guidelines</h2>
        <p>
          We strive to maintain a welcoming and inclusive community. Please
          follow these guidelines in all interactions:
        </p>
        <ul>
          <li>Be respectful and considerate</li>
          <li>Focus on the content, not the person</li>
          <li>Assume good intentions</li>
          <li>Be open to feedback</li>
          <li>Help others learn and grow</li>
        </ul>

        <h2>Questions?</h2>
        <p>If you have any questions about contributing, please:</p>
        <ul>
          <li>
            Open an issue on{' '}
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </li>
          <li>
            Join our community{' '}
            <a
              href="https://discord.gg/QtzYHmfw"
              target="_blank"
              rel="noopener noreferrer"
            >
              Discord
            </a>
          </li>
          <li>Reach out to the maintainers</li>
        </ul>

        <p>
          Thank you for helping make AI Seekhega India better for everyone! You
          can also browse the{' '}
          <Link href="/docs/ai-for-leaders/intro">docs</Link> or the{' '}
          <Link href="/blog">blog</Link> to get familiar with the site.
        </p>
      </article>
    </main>
  );
}
