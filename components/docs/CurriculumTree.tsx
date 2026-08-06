'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './CurriculumTree.css';

type TopicStatus = 'completed' | 'in-development' | 'planned';

type Topic = {
  id: string;
  title: string;
  status: TopicStatus;
  description: string;
  businessValue: string;
  links?: string[];
  externalLink?: string;
};

type Phase = {
  id: string;
  title: string;
  description: string;
  color: string;
  progress: number;
  topics: Topic[];
};

type LearningPath = {
  name: string;
  phases: string[];
  color: string;
  description: string;
};

const curriculumData: {
  phases: Phase[];
  learningPaths: Record<string, LearningPath>;
} = {
  phases: [
    {
      id: 'phase1',
      title: 'Foundation (AI Fundamentals)',
      description: 'Essential concepts every leader needs to understand AI',
      color: '#3B82F6',
      progress: 80,
      topics: [
        {
          id: 'ml-fundamentals',
          title: 'Machine Learning Fundamentals',
          status: 'completed',
          description: 'Core ML concepts with business analogies',
          links: ['/docs/ai-for-leaders/machine-learning-fundamentals'],
          businessValue: 'Foundation for all AI decisions',
        },
        {
          id: 'problem-types',
          title: 'ML Problem Types & Learning Approaches',
          status: 'completed',
          description: 'Classification, regression, supervised vs unsupervised',
          links: ['/docs/ai-for-leaders/classification-regression-supervised-unsupervised'],
          businessValue: 'Choose the right AI approach for your problem',
        },
        {
          id: 'algorithms-overview',
          title: 'Classical ML Algorithms Overview',
          status: 'completed',
          description: 'Linear regression, decision trees, clustering, neural networks',
          links: ['/docs/ai-for-leaders/algorithms-high-level-overview'],
          businessValue: 'Understand which algorithms solve which business problems',
        },
        {
          id: 'market-applications',
          title: 'Market Applications of Classical ML',
          status: 'completed',
          description: 'Real-world industry applications and use cases',
          links: ['/docs/ai-for-leaders/classical-ml-in-market'],
          businessValue: 'Strategic insight into AI market positioning',
        },
        {
          id: 'model-complexity',
          title: 'Model Complexity & Tradeoffs',
          status: 'in-development',
          description: 'Underfitting, overfitting, and business tradeoffs',
          links: [],
          businessValue: 'Make informed decisions about AI complexity vs value',
        },
        {
          id: 'eda',
          title: 'Exploratory Data Analysis',
          status: 'planned',
          description: 'Data quality assessment and pattern discovery',
          externalLink: 'https://eda.aiseekhegaindia.com/',
          businessValue: 'Hands-on data exploration for business insights',
        },
      ],
    },
    {
      id: 'phase2',
      title: 'Technical Depth (Deep Learning & Modern AI)',
      description: 'For leaders in tech companies or AI-first organizations',
      color: '#8B5CF6',
      progress: 0,
      topics: [
        {
          id: 'neural-fundamentals',
          title: 'Neural Network Fundamentals',
          status: 'planned',
          description: 'Forward pass, backpropagation, and business applications',
          businessValue: 'Understand modern AI capabilities and limitations',
        },
        {
          id: 'computer-vision',
          title: 'Computer Vision & CNNs',
          status: 'planned',
          description: 'Image recognition and visual AI applications',
          businessValue: 'Leverage visual AI for product innovation',
        },
        {
          id: 'nlp-transformers',
          title: 'NLP & Transformers',
          status: 'planned',
          description: 'Natural language processing and transformer architecture',
          businessValue: 'Unlock text-based AI applications',
        },
        {
          id: 'llms',
          title: 'Large Language Models',
          status: 'planned',
          description: 'ChatGPT, Gemini, and business applications',
          businessValue: 'Strategic understanding of LLM capabilities and costs',
        },
        {
          id: 'interactive-demos',
          title: 'Interactive AI Demos',
          status: 'planned',
          description: 'Hands-on experience with AI tools',
          businessValue: 'Practical experience with AI technologies',
        },
      ],
    },
    {
      id: 'phase3',
      title: 'Business Applications (AI Integration & Strategy)',
      description: 'Implementing AI in existing products and services',
      color: '#10B981',
      progress: 0,
      topics: [
        {
          id: 'ai-decision-making',
          title: 'AI in Decision-Making',
          status: 'planned',
          description: 'Strategic AI integration in business processes',
          businessValue: 'Transform decision-making with AI insights',
        },
        {
          id: 'agents-automation',
          title: 'AI Agents vs. Automation',
          status: 'planned',
          description: 'Understanding AI agents and workflow automation',
          businessValue: 'Choose between agents and traditional automation',
        },
        {
          id: 'agent-applications',
          title: 'AI Agent Applications',
          status: 'planned',
          description: 'Research agents, copilots, and customer engagement',
          businessValue: 'Deploy AI agents for business productivity',
        },
        {
          id: 'workflow-integration',
          title: 'AI Workflow Integration',
          status: 'planned',
          description: 'Engineering, product, and operations workflow integration',
          businessValue: 'Seamlessly integrate AI into existing workflows',
        },
      ],
    },
    {
      id: 'phase4',
      title: 'Strategic Implementation (Leadership Focus)',
      description: 'Organizational transformation and governance',
      color: '#F59E0B',
      progress: 0,
      topics: [
        {
          id: 'ai-strategy-governance',
          title: 'AI Strategy & Governance',
          status: 'planned',
          description: 'AI task forces, compliance, and risk management',
          businessValue: 'Build robust AI governance and compliance',
        },
        {
          id: 'product-integration',
          title: 'Product Integration Framework',
          status: 'planned',
          description: 'CUJ framework and industry-specific applications',
          businessValue: 'Systematically integrate AI into product roadmaps',
        },
        {
          id: 'ai-leverage',
          title: 'AI Leverage & Competitive Advantage',
          status: 'planned',
          description: 'Spotting opportunities and prioritizing AI integration',
          businessValue: 'Build sustainable competitive advantages with AI',
        },
        {
          id: 'change-management',
          title: 'Change Management & Deployment',
          status: 'planned',
          description: 'Team transformation and scaling AI initiatives',
          businessValue: 'Successfully scale AI across your organization',
        },
      ],
    },
  ],
  learningPaths: {
    'c-suite': {
      name: 'C-Suite Executives',
      phases: ['phase1', 'phase4'],
      color: '#EF4444',
      description: 'Strategic focus on AI governance and competitive advantage',
    },
    'product-leaders': {
      name: 'Product Leaders',
      phases: ['phase1', 'phase3', 'phase4'],
      color: '#3B82F6',
      description: 'AI integration into products and business strategy',
    },
    'engineering-leaders': {
      name: 'Engineering Leaders',
      phases: ['phase1', 'phase2', 'phase3'],
      color: '#10B981',
      description: 'Technical depth and implementation expertise',
    },
    'business-unit-leaders': {
      name: 'Business Unit Leaders',
      phases: ['phase1', 'phase3', 'phase4'],
      color: '#8B5CF6',
      description: 'Operational impact and change management',
    },
  },
};

const PROGRESS_KEY = 'ai-leaders-progress';

function TopicNode({
  topic,
  status,
  isHovered,
  onHover,
  onLeave,
  onMarkComplete,
}: {
  topic: Topic;
  status: string;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onMarkComplete: () => void;
}) {
  const getStatusIcon = (s: string) => {
    switch (s) {
      case 'completed':
        return '✅';
      case 'in-development':
        return '🔄';
      case 'planned':
        return '📋';
      default:
        return '📋';
    }
  };

  const internalHref = topic.links?.[0];
  const externalHref = topic.externalLink;
  const className = `topic-node ${status} ${isHovered ? 'hovered' : ''}`;

  const body = (
    <>
      <div className="topic-header">
        <span className="status-icon">{getStatusIcon(status)}</span>
        <h4 className="topic-title">{topic.title}</h4>
      </div>
      <p className="topic-description">{topic.description}</p>
      <div className="topic-business-value">
        <strong>Business Value:</strong> {topic.businessValue}
      </div>
      {status === 'completed' && (
        <button
          type="button"
          className="mark-complete-btn"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onMarkComplete();
          }}
        >
          Mark Complete
        </button>
      )}
    </>
  );

  if (internalHref) {
    return (
      <Link
        href={internalHref}
        className={className}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        {body}
      </Link>
    );
  }

  if (externalHref) {
    return (
      <a
        href={externalHref}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        {body}
      </a>
    );
  }

  return (
    <div
      className={className}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      role="article"
    >
      {body}
    </div>
  );
}

export default function CurriculumTree() {
  const [selectedPath, setSelectedPath] = useState('product-leaders');
  const [expandedPhases, setExpandedPhases] = useState<string[]>(['phase1']);
  const [userProgress, setUserProgress] = useState<Record<string, string>>({});
  const [hoveredTopic, setHoveredTopic] = useState<string | null>(null);

  // Load after mount to avoid SSR/localStorage hydration mismatch
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(PROGRESS_KEY);
      if (savedProgress) {
        setUserProgress(JSON.parse(savedProgress));
      }
    } catch {
      // ignore corrupt storage
    }
  }, []);

  const saveProgress = (progress: Record<string, string>) => {
    setUserProgress(progress);
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    } catch {
      // ignore quota / private mode errors
    }
  };

  const togglePhase = (phaseId: string) => {
    setExpandedPhases((prev) =>
      prev.includes(phaseId) ? prev.filter((id) => id !== phaseId) : [...prev, phaseId],
    );
  };

  const markTopicComplete = (topicId: string) => {
    saveProgress({
      ...userProgress,
      [topicId]: 'completed',
    });
  };

  const getTopicStatus = (topic: Topic) => userProgress[topic.id] || topic.status;

  const selectedPathData = curriculumData.learningPaths[selectedPath];
  const relevantPhases = selectedPathData.phases;

  return (
    <div className="curriculum-tree-container">
      <div className="curriculum-header">
        <h2>AI for Leaders: Interactive Curriculum Tree</h2>
        <p>
          Explore your personalized learning journey through AI fundamentals to strategic
          implementation
        </p>

        <div className="learning-path-selector">
          <label htmlFor="learning-path">Select Your Role:</label>
          <select
            id="learning-path"
            value={selectedPath}
            onChange={(e) => setSelectedPath(e.target.value)}
            className="path-selector"
          >
            {Object.entries(curriculumData.learningPaths).map(([key, path]) => (
              <option key={key} value={key}>
                {path.name}
              </option>
            ))}
          </select>
          <div className="path-description">
            <strong>{selectedPathData.name}:</strong> {selectedPathData.description}
          </div>
        </div>
      </div>

      <div className="curriculum-tree">
        {curriculumData.phases.map((phase, index) => {
          const isRelevant = relevantPhases.includes(phase.id);
          const isExpanded = expandedPhases.includes(phase.id);
          const phaseProgress =
            (phase.topics.filter((topic) => getTopicStatus(topic) === 'completed').length /
              phase.topics.length) *
            100;

          return (
            <div
              key={phase.id}
              className={`phase-container ${isRelevant ? 'relevant' : 'irrelevant'}`}
            >
              <div
                className="phase-header"
                onClick={() => togglePhase(phase.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    togglePhase(phase.id);
                  }
                }}
                role="button"
                tabIndex={0}
                style={{ borderColor: phase.color }}
              >
                <div className="phase-info">
                  <h3 style={{ color: phase.color }}>
                    {isExpanded ? '▼' : '▶'} Phase {index + 1}: {phase.title}
                  </h3>
                  <p className="phase-description">{phase.description}</p>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${phaseProgress}%`,
                        backgroundColor: phase.color,
                      }}
                    />
                    <span className="progress-text">
                      {Math.round(phaseProgress)}% Complete
                    </span>
                  </div>
                </div>
                {!isRelevant && (
                  <div className="path-indicator">Not in {selectedPathData.name} path</div>
                )}
              </div>

              {isExpanded && (
                <div className="topics-container">
                  {phase.topics.map((topic) => {
                    const status = getTopicStatus(topic);
                    return (
                      <TopicNode
                        key={topic.id}
                        topic={topic}
                        status={status}
                        isHovered={hoveredTopic === topic.id}
                        onHover={() => setHoveredTopic(topic.id)}
                        onLeave={() => setHoveredTopic(null)}
                        onMarkComplete={() => markTopicComplete(topic.id)}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="curriculum-footer">
        <div className="achievement-summary">
          <h3>Your Progress</h3>
          <div className="achievement-stats">
            <div className="stat">
              <span className="stat-number">
                {Object.values(userProgress).filter((status) => status === 'completed').length}
              </span>
              <span className="stat-label">Topics Completed</span>
            </div>
            <div className="stat">
              <span className="stat-number">
                {
                  curriculumData.phases.filter((phase) =>
                    phase.topics.every((topic) => getTopicStatus(topic) === 'completed'),
                  ).length
                }
              </span>
              <span className="stat-label">Phases Completed</span>
            </div>
          </div>
        </div>

        <div className="next-steps">
          <h4>Ready to Start Learning?</h4>
          <Link
            href="/docs/ai-for-leaders/machine-learning-fundamentals"
            className="start-learning-btn"
          >
            Begin with ML Fundamentals →
          </Link>
        </div>
      </div>
    </div>
  );
}
