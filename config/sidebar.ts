export type SidebarDoc = {
  type: 'doc';
  id: string;
  label?: string;
};

export type SidebarCategory = {
  type: 'category';
  label: string;
  items: string[];
};

export type SidebarItem = SidebarCategory;

/**
 * Port of sidebars.ts docsSidebar — same order and IDs (including CNNS, RNNs).
 */
export const docsSidebar: SidebarItem[] = [
  {
    type: 'category',
    label: 'AI for Leaders',
    items: [
      'ai-for-leaders/intro',
      'ai-for-leaders/curriculum-tree',
      'ai-for-leaders/curriculum-overview',
      'ai-for-leaders/machine-learning-fundamentals',
      'ai-for-leaders/classification-regression-supervised-unsupervised',
      'ai-for-leaders/algorithms-high-level-overview',
      'ai-for-leaders/classical-ml-in-market',
    ],
  },
  {
    type: 'category',
    label: 'Machine Learning',
    items: [
      'machine-learning/intro',
      'machine-learning/supervised-learning',
      'machine-learning/logistic_regression_tutorial',
    ],
  },
  {
    type: 'category',
    label: 'Deep Learning',
    items: [
      'deep-learning/intro',
      'deep-learning/perceptron',
      'deep-learning/CNNS',
      'deep-learning/RNNs',
    ],
  },
  {
    type: 'category',
    label: 'Language Models',
    items: [
      'language-models/intro',
      'language-models/Tokenization',
      'language-models/NNTraining',
      'language-models/NNInference',
      'language-models/NNInternals',
      'language-models/PostTraining',
      'language-models/EvolutionGpt2',
      'language-models/BaseModels',
      'language-models/Hallucinations',
      'language-models/LLMIdentity',
      'language-models/ThinkingInTokens',
      'language-models/LLMInconsistencies',
      'language-models/PostTrainingReinforcementLearning',
      'language-models/ThinkingRL',
      'language-models/ReinforcementLearning',
      'language-models/LLMJudgement',
      'language-models/Multimodality',
      'language-models/Evaluation',
      'language-models/AccessingLLMs',
      'language-models/QueryToResponse',
      'language-models/HandlingHallucinationRAGLoRA',
    ],
  },
  {
    type: 'category',
    label: 'Interactive Tutorials',
    items: ['tutorials/logistic-regression'],
  },
  {
    type: 'category',
    label: 'Resources',
    items: ['resources/intro'],
  },
];

/** Flat ordered list of all doc IDs for prev/next navigation. */
export function getOrderedDocIds(): string[] {
  return docsSidebar.flatMap((category) => category.items);
}
