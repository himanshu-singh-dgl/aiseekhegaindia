import type {Metadata} from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Lex AI Fellowship',
  description:
    'Lex AI Fellowship – Shaping India\'s AI Generation. Career-transforming programs for Engineers and Leaders.',
};

export default function FellowshipPage() {
  return (
    <main>
      <section className="border-b border-orange-200 bg-gradient-to-r from-orange-600 to-orange-500 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h1 className="text-4xl font-bold sm:text-5xl">Lex AI</h1>
          <p className="mt-3 text-xl text-orange-100">Trusted Voice of AI Education in India</p>
          <p className="mx-auto mt-4 max-w-2xl text-orange-50">
            Deep, technical, transformative programs built for ambitious engineers and leaders.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="https://www.lexailabs.com/ai-fellowship"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-orange-700 hover:bg-orange-50"
            >
              Apply Now
            </a>
            <a
              href="https://lexailabs.com/consultation"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/50 px-6 py-3 font-semibold hover:bg-white/10"
            >
              Schedule a Call
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <section className="mb-12">
          <h2 className="text-2xl font-bold">About Lex AI</h2>
          <p className="mt-4 text-zinc-600 leading-relaxed">
            <strong>Lex AI Technologies Private Limited</strong> is the holding company behind{' '}
            <strong>AI Seekhega India</strong>, dedicated to democratizing AI education and
            empowering India&apos;s workforce with cutting-edge AI skills.
          </p>
        </section>

        <section className="space-y-8">
          <h2 className="text-2xl font-bold">Choose Your AI Journey</h2>

          <ProgramCard
            title="AI Fellowship"
            audience="For Engineers"
            value="A career-transforming program that equips engineers to become Machine Learning Engineers and Applied Scientists at leading tech firms."
            outcomes={[
              'Machine Learning & Deep Learning',
              'Maths for AI — Linear Algebra, Probability, Stats, Calculus',
              'Applied ML & DL with real-world case studies',
              'Transformers & Large Language Models',
              'Competing in Kaggle Competitions',
              'Preparing for ML Interviews',
            ]}
            ctaHref="https://www.lexailabs.com/ai-fellowship"
            ctaLabel="Apply for Engineers Program"
          />

          <ProgramCard
            title="AI for Leaders"
            audience="For C-Suite, Managers, PMs, Leaders"
            value="A program that helps leaders understand, apply, and drive AI adoption inside their organizations."
            outcomes={[
              'Deep AI Understanding — how AI systems work at a conceptual level',
              'Productivity Mastery — using AI tools for leadership workflows',
              'Agent Opportunities — spot AI-agent opportunities inside teams',
              'Custom Playbook — industry-specific AI adoption playbook',
            ]}
            ctaHref="https://www.lexailabs.com/ai-for-leaders"
            ctaLabel="Apply for Leaders Program"
          />
        </section>

        <section className="mt-16 rounded-2xl bg-zinc-900 px-6 py-12 text-center text-white">
          <h2 className="text-2xl font-bold">Ready to Transform Your Career with AI?</h2>
          <p className="mx-auto mt-3 max-w-xl text-zinc-400">
            Join professionals who have accelerated their careers through Lex AI Fellowship.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="https://www.lexailabs.com/ai-fellowship"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-orange-600 px-6 py-3 font-semibold hover:bg-orange-500"
            >
              Apply Now
            </a>
            <a
              href="https://lexailabs.com/curriculum"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-zinc-600 px-6 py-3 font-semibold hover:bg-zinc-800"
            >
              Explore Curriculum
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

function ProgramCard({
  title,
  audience,
  value,
  outcomes,
  ctaHref,
  ctaLabel,
}: {
  title: string;
  audience: string;
  value: string;
  outcomes: string[];
  ctaHref: string;
  ctaLabel: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-sm font-medium text-orange-600">{audience}</p>
      </div>
      <p className="text-zinc-600">{value}</p>
      <h4 className="mt-4 font-semibold">Learning Outcomes:</h4>
      <ul className="mt-2 list-inside list-disc space-y-1 text-zinc-600">
        {outcomes.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <a
        href={ctaHref}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block rounded-lg bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-700"
      >
        {ctaLabel}
      </a>
    </div>
  );
}
