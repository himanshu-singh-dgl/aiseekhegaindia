import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import type { JSX } from 'react';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroLeft}>
            <h1 className={styles.heroTitle}>
              <span className={styles.heroTitleHighlight}>AI</span> Seekhega India
            </h1>
            <p className={styles.heroSubtitle}>
              Empowering India's AI Future Through Education and Innovation
            </p>
            <p className={styles.heroDescription}>
              A comprehensive platform for learning Machine Learning, Deep Learning, and Language Models. 
              Join our community-driven initiative to make AI education accessible to everyone.
            </p>
            <div className={styles.buttons}>
              <Link
                className={clsx('button button--primary button--lg', styles.getStartedButton)}
                to="/docs/machine-learning/intro">
                Start Learning →
              </Link>
              <Link
                className={clsx('button button--primary button--lg', styles.contributeButton)}
                to="/contribute">
                Join Community
              </Link>
            </div>
            <div className={styles.heroStats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>100+</span>
                <span className={styles.statLabel}>Learning Resources</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>4</span>
                <span className={styles.statLabel}>Core Topics</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>24/7</span>
                <span className={styles.statLabel}>Community Support</span>
              </div>
            </div>
          </div>
          <div className={styles.heroRight}>
            <div className={styles.heroImage}>
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#6366f1" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,89.4,-0.3C88.8,15.7,85,31.3,77.2,45.2C69.4,59.1,57.6,71.2,43.1,77.6C28.6,84,14.3,84.7,-0.7,85.7C-15.7,86.7,-31.3,88,-45.8,82.1C-60.3,76.2,-73.7,63.1,-81.6,47.1C-89.5,31.1,-91.9,12.2,-90.8,-6.4C-89.7,-25,-85.1,-43.3,-75.9,-58.1C-66.7,-72.9,-52.9,-84.2,-37.8,-88.9C-22.7,-93.6,-6.3,-91.7,8.7,-87.1C23.7,-82.5,30.6,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Home"
      description="Community-driven platform for Machine Learning, Deep Learning, and Language Models">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <section className={styles.topicsSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Explore Topics</h2>
            <div className={styles.topicsGrid}>
              <div className={styles.topicCard}>
                <h3>Machine Learning</h3>
                <p>
                  Learn about supervised, unsupervised, and reinforcement learning algorithms, evaluation metrics, and practical applications.
                </p>
                <Link to="/docs/machine-learning/intro" className={styles.topicLink}>
                  Explore Machine Learning →
                </Link>
              </div>
              <div className={styles.topicCard}>
                <h3>Deep Learning</h3>
                <p>
                  Dive into neural networks, CNNs, RNNs, transformers, and advanced architectures driving AI breakthroughs.
                </p>
                <Link to="/docs/deep-learning/intro" className={styles.topicLink}>
                  Explore Deep Learning →
                </Link>
              </div>
              <div className={styles.topicCard}>
                <h3>Language Models</h3>
                <p>
                  Understand LLMs, tokenization, fine-tuning techniques, prompt engineering, and emerging capabilities.
                </p>
                <Link to="/docs/language-models/intro" className={styles.topicLink}>
                  Explore Language Models →
                </Link>
              </div>
              <div className={styles.topicCard}>
                <h3>Resources</h3>
                <p>
                  Find curated datasets, libraries, research papers, and tutorials to support your learning and projects.
                </p>
                <Link to="/docs/resources/intro" className={styles.topicLink}>
                  Explore Resources →
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.ctaSection}>
          <div className="container">
            <div className={styles.ctaContent}>
              <h2>Join Our Community</h2>
              <p>
                Contribute to the platform, share your expertise, and help build a comprehensive
                resource for AI and ML practitioners around the world.
              </p>
              <div className={styles.ctaButtons}>
                <Link className="button button--primary button--lg" to="/contribute">
                  Learn How to Contribute
                </Link>
                <a
                  className="button button--secondary button--lg"
                  href="https://github.com/ai-ml-community/ai-ml-docs"
                  target="_blank"
                  rel="noopener noreferrer">
                  GitHub Repository
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}