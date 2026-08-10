import Link from 'next/link';
import type { Metadata } from 'next';
import styles from './fellowship.module.css';

export const metadata: Metadata = {
  title: 'Lex AI Fellowship',
  description:
    "Lex AI Fellowship – Shaping India's AI Generation. Career-transforming programs for Engineers and Leaders.",
};

export default function FellowshipPage() {
  return (
    <main className={styles.fellowshipPage}>
      <div className={styles.heroSection}>
        <div className="container mx-auto max-w-6xl px-4">
          <h1 className={styles.heroTitle}>Lex AI</h1>
          <p className={styles.heroTagline}>
            Trusted Voice of AI Education in India
          </p>
          <p className={styles.heroSubtitle}>
            Deep, technical, transformative programs built for ambitious
            engineers and leaders.
          </p>
          <div className={styles.heroButtons}>
            <a
              href="https://www.lexailabs.com/ai-fellowship"
              className={styles.primaryButton}
              target="_blank"
              rel="noopener noreferrer"
            >
              Apply Now
            </a>
            <a
              href="https://lexailabs.com/consultation"
              className={styles.secondaryButton}
              target="_blank"
              rel="noopener noreferrer"
            >
              Schedule a Call
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4">
        <div className={styles.contentSection}>
          <div className={styles.introSection}>
            <h2 className={styles.sectionTitle}>About Lex AI</h2>
            <p className={styles.introText}>
              <strong>Lex AI Technologies Private Limited</strong> is the holding
              company behind <strong>AI Seekhega India</strong>, dedicated to
              democratizing AI education and empowering India&apos;s workforce
              with cutting-edge AI skills. Our flagship program, the{' '}
              <strong>Lex AI Fellowship</strong>, offers specialized tracks
              designed for different professional needs.
            </p>
          </div>

          <div className={styles.programsSection}>
            <h2 className={styles.sectionTitle}>Choose Your AI Journey</h2>

            <div className={styles.programCard}>
              <div className={styles.programHeader}>
                <div>
                  <h3 className={styles.programTitle}>AI Fellowship</h3>
                  <p className={styles.programAudience}>For Engineers</p>
                </div>
              </div>
              <p className={styles.programValue}>
                A career-transforming program that equips engineers to become
                Machine Learning Engineers and Applied Scientists at leading tech
                firms.
              </p>
              <div className={styles.programCta}>
                <a
                  href="https://www.lexailabs.com/ai-fellowship"
                  className={styles.programButton}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apply for Engineers Program
                </a>
              </div>
            </div>

            <div className={styles.programCard}>
              <div className={styles.programHeader}>
                <div>
                  <h3 className={styles.programTitle}>AI for Leaders</h3>
                  <p className={styles.programAudience}>
                    For C-Suite, Managers, PMs, Leaders
                  </p>
                </div>
              </div>
              <p className={styles.programValue}>
                A program that helps leaders understand, apply, and drive AI
                adoption inside their organizations.
              </p>
              <div className={styles.programCta}>
                <a
                  href="https://www.lexailabs.com/ai-for-leaders"
                  className={styles.programButton}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apply for Leaders Program
                </a>
                <Link
                  href="/docs/ai-for-leaders/intro"
                  className={styles.secondaryButton}
                >
                  Browse free curriculum
                </Link>
              </div>
            </div>
          </div>

          <div className={styles.finalCtaSection}>
            <h2 className={styles.ctaTitle}>
              Ready to Transform Your Career with AI?
            </h2>
            <p className={styles.ctaSubtitle}>
              Join thousands of professionals who have accelerated their careers
              through Lex AI Fellowship
            </p>
            <div className={styles.finalCtaButtons}>
              <a
                href="https://www.lexailabs.com/ai-fellowship"
                className={styles.primaryButton}
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply Now
              </a>
              <a
                href="https://lexailabs.com/curriculum"
                className={styles.secondaryButton}
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore Curriculum
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
