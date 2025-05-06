import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import type { JSX } from 'react';
import styles from './fellowship.module.css';

export default function Fellowship(): JSX.Element {
  return (
    <Layout
      title="AI Fellowship"
      description="Join the Lex AI Fellowship - A comprehensive program for learning Machine Learning, Deep Learning, and Language Models">
      <main className={styles.fellowshipPage}>
        <div className={styles.heroSection}>
          <div className="container">
            <h1 className={styles.heroTitle}>Lex AI Fellowship</h1>
            <p className={styles.heroSubtitle}>
              A 14–16 week online, live, and interactive program designed to train engineers in Machine Learning, Deep Learning, and Transformers/Language Models
            </p>
          </div>
        </div>

        <div className="container">
          <div className={styles.contentSection}>
            <div className={styles.programOverview}>
              <h2>Program Overview</h2>
              <p>
                The Lex AI Fellowship is designed to train engineers in the kind of AI that's powering everything from ChatGPT to self-driving cars.
                This isn't a pre-recorded course, it's a hands-on, cohort-based learning experience.
              </p>
            </div>

            <div className={styles.features}>
              <div className={styles.featureCard}>
                <h3>Build Real Projects</h3>
                <p>Work on real-world ML and AI projects that demonstrate your skills and knowledge</p>
              </div>
              <div className={styles.featureCard}>
                <h3>Learn the Fundamentals</h3>
                <p>Master the mathematics and code behind modern models</p>
              </div>
              <div className={styles.featureCard}>
                <h3>Personalized Mentorship</h3>
                <p>Work in a tight-knit group with personalized guidance</p>
              </div>
              <div className={styles.featureCard}>
                <h3>Career Guidance</h3>
                <p>Get support to transition into roles like ML Engineer or SWE in ML</p>
              </div>
            </div>

            <div className={styles.instructor}>
              <h2>Meet Your Instructor</h2>
              <div className={styles.instructorProfile}>
                <div className={styles.instructorInfo}>
                  <h3>Puru Kathuria</h3>
                  <p className={styles.instructorTitle}>Software Engineer at Google</p>
                  <p className={styles.instructorBio}>
                    Puru facilitates and teaches in the Fellowship. He is currently a Software Engineer at Google, 
                    and previously worked as a Deep Learning + SWE engineer at MathWorks, building ML algorithms 
                    for self-driving cars.
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.ctaSection}>
              <h2>Ready to Start Your AI Journey?</h2>
              <p>Join the next cohort of the Lex AI Fellowship</p>
              <div className={styles.ctaButtons}>
                <a
                  href="https://lexailabs.com/"
                  className="button button--primary button--lg"
                  target="_blank"
                  rel="noopener noreferrer">
                  Apply Now
                </a>
                <a
                  href="https://lexailabs.com/curriculum"
                  className="button button--primary button--lg"
                  target="_blank"
                  rel="noopener noreferrer">
                  Explore Curriculum
                </a>
                <a
                  href="https://lexailabs.com/consultation"
                  className="button button--primary button--lg"
                  target="_blank"
                  rel="noopener noreferrer">
                  Schedule a 1:1
                </a>
                
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
} 