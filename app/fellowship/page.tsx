import clsx from 'clsx';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { createMetadata } from '@/lib/metadata';
import styles from './fellowship.module.css';

export const metadata = createMetadata({
  title: 'Lex AI Fellowship',
  description:
    'Lex AI Fellowship – Shaping India\'s AI Generation. Career-transforming programs for Engineers and Leaders.',
  path: '/fellowship',
});

export default function FellowshipPage() {
  return (
    <main className={styles.fellowshipPage}>
      <div className={styles.heroSection}>
        <Container className="relative z-10 text-center">
          <h1 className={styles.heroTitle}>Lex AI</h1>
          <p className={styles.heroTagline}>Trusted Voice of AI Education in India</p>
          <p className={styles.heroSubtitle}>
            Deep, technical, transformative programs built for ambitious engineers and leaders.
          </p>
          <div className={styles.heroButtons}>
            <Button
              href="https://www.lexailabs.com/ai-fellowship"
              external
              className={clsx(styles.primaryButton)}
            >
              Apply Now
            </Button>
            <Button
              href="https://lexailabs.com/consultation"
              external
              variant="secondary"
              className={clsx(styles.secondaryButton)}
            >
              Schedule a Call
            </Button>
          </div>
        </Container>
      </div>

      <Container>
        <div className={styles.contentSection}>
          <div className={styles.introSection}>
            <h2 className={styles.sectionTitle}>About Lex AI</h2>
            <p className={styles.introText}>
              <strong>Lex AI Technologies Private Limited</strong> is the holding company behind{' '}
              <strong>AI Seekhega India</strong>, dedicated to democratizing AI education and
              empowering India&apos;s workforce with cutting-edge AI skills. Our flagship program, the{' '}
              <strong>Lex AI Fellowship</strong>, offers specialized tracks designed for different
              professional needs.
            </p>
          </div>

          <div className={styles.programsSection}>
            <h2 className={styles.sectionTitle}>Choose Your AI Journey</h2>

            <div className={styles.programCard}>
              <div className={styles.programHeader}>
                <div className={styles.programIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                </div>
                <div>
                  <h3 className={styles.programTitle}>AI Fellowship</h3>
                  <p className={styles.programAudience}>For Engineers</p>
                </div>
              </div>
              <p className={styles.programValue}>
                A career-transforming program that equips engineers to become Machine Learning
                Engineers and Applied Scientists at leading tech firms.
              </p>
              <div className={styles.programCta}>
                <Button href="https://www.lexailabs.com/ai-fellowship" external className={styles.programButton}>
                  Apply for Engineers Program
                </Button>
              </div>
            </div>

            <div className={styles.programCard}>
              <div className={styles.programHeader}>
                <div className={styles.programIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <div>
                  <h3 className={styles.programTitle}>AI for Leaders</h3>
                  <p className={styles.programAudience}>For C-Suite, Managers, PMs, Leaders</p>
                </div>
              </div>
              <p className={styles.programValue}>
                A program that helps leaders understand, apply, and drive AI adoption inside their
                organizations.
              </p>
              <div className={styles.programCta}>
                <Button href="https://www.lexailabs.com/ai-for-leaders" external className={styles.programButton}>
                  Apply for Leaders Program
                </Button>
              </div>
            </div>
          </div>

          <div className={styles.finalCtaSection}>
            <h2 className={styles.ctaTitle}>Ready to Transform Your Career with AI?</h2>
            <p className={styles.ctaSubtitle}>
              Join thousands of professionals who have accelerated their careers through Lex AI Fellowship
            </p>
            <div className={styles.finalCtaButtons}>
              <Button href="https://www.lexailabs.com/ai-fellowship" external className={styles.primaryButton}>
                Apply Now
              </Button>
              <Button href="https://lexailabs.com/curriculum" external variant="secondary" className={styles.secondaryButton}>
                Explore Curriculum
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
