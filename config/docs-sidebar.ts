export type SidebarDocItem = {
  type: 'doc';
  id: string;
  label?: string;
};

export type SidebarCategoryItem = {
  type: 'category';
  label: string;
  items: SidebarDocItem[];
};

export type SidebarItem = SidebarDocItem | SidebarCategoryItem;

export const docsSidebar: SidebarItem[] = [
  {
    type: 'category',
    label: 'AI for Leaders',
    items: [
      { type: 'doc', id: 'ai-for-leaders/intro' },
      { type: 'doc', id: 'ai-for-leaders/curriculum-tree' },
      { type: 'doc', id: 'ai-for-leaders/curriculum-overview' },
      { type: 'doc', id: 'ai-for-leaders/machine-learning-fundamentals' },
      {
        type: 'doc',
        id: 'ai-for-leaders/classification-regression-supervised-unsupervised',
      },
      { type: 'doc', id: 'ai-for-leaders/algorithms-high-level-overview' },
      { type: 'doc', id: 'ai-for-leaders/classical-ml-in-market' },
    ],
  },
  {
    type: 'category',
    label: 'Machine Learning',
    items: [
      { type: 'doc', id: 'machine-learning/intro' },
      { type: 'doc', id: 'machine-learning/supervised-learning' },
      { type: 'doc', id: 'machine-learning/logistic_regression_tutorial' },
    ],
  },
  {
    type: 'category',
    label: 'Deep Learning',
    items: [
      { type: 'doc', id: 'deep-learning/intro' },
      { type: 'doc', id: 'deep-learning/perceptron' },
      { type: 'doc', id: 'deep-learning/CNNS' },
      { type: 'doc', id: 'deep-learning/RNNs' },
    ],
  },
  {
    type: 'category',
    label: 'Language Models',
    items: [
      { type: 'doc', id: 'language-models/intro' },
      { type: 'doc', id: 'language-models/Tokenization' },
      { type: 'doc', id: 'language-models/NNTraining' },
      { type: 'doc', id: 'language-models/NNInference' },
      { type: 'doc', id: 'language-models/NNInternals' },
      { type: 'doc', id: 'language-models/PostTraining' },
      { type: 'doc', id: 'language-models/EvolutionGpt2' },
      { type: 'doc', id: 'language-models/BaseModels' },
      { type: 'doc', id: 'language-models/Hallucinations' },
      { type: 'doc', id: 'language-models/LLMIdentity' },
      { type: 'doc', id: 'language-models/ThinkingInTokens' },
      { type: 'doc', id: 'language-models/LLMInconsistencies' },
      { type: 'doc', id: 'language-models/PostTrainingReinforcementLearning' },
      { type: 'doc', id: 'language-models/ThinkingRL' },
      { type: 'doc', id: 'language-models/ReinforcementLearning' },
      { type: 'doc', id: 'language-models/LLMJudgement' },
      { type: 'doc', id: 'language-models/Multimodality' },
      { type: 'doc', id: 'language-models/Evaluation' },
      { type: 'doc', id: 'language-models/AccessingLLMs' },
      { type: 'doc', id: 'language-models/QueryToResponse' },
      { type: 'doc', id: 'language-models/HandlingHallucinationRAGLoRA' },
    ],
  },
  {
    type: 'category',
    label: 'Interactive Tutorials',
    items: [{ type: 'doc', id: 'tutorials/logistic-regression' }],
  },
  {
    type: 'category',
    label: 'Resources',
    items: [{ type: 'doc', id: 'resources/intro' }],
  },
];
