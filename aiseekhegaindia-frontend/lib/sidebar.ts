export type SidebarItem = {
  type: 'doc';
  id: string;
  href: string;
  label: string;
};

export type SidebarCategory = {
  type: 'category';
  label: string;
  items: SidebarItem[];
};

export type Sidebar = SidebarCategory[];

/** Mirrors sidebars.ts docsSidebar — exact order and IDs for URL parity. */
export const docsSidebar: Sidebar = [
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
    ].map(toDocItem),
  },
  {
    type: 'category',
    label: 'Machine Learning',
    items: [
      'machine-learning/intro',
      'machine-learning/supervised-learning',
      'machine-learning/logistic_regression_tutorial',
    ].map(toDocItem),
  },
  {
    type: 'category',
    label: 'Deep Learning',
    items: [
      'deep-learning/intro',
      'deep-learning/perceptron',
      'deep-learning/CNNS',
      'deep-learning/RNNs',
    ].map(toDocItem),
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
    ].map(toDocItem),
  },
  {
    type: 'category',
    label: 'Interactive Tutorials',
    items: ['tutorials/logistic-regression'].map(toDocItem),
  },
  {
    type: 'category',
    label: 'Resources',
    items: ['resources/intro'].map(toDocItem),
  },
];

function toDocItem(id: string): SidebarItem {
  const label = id.split('/').pop() ?? id;
  return {
    type: 'doc',
    id,
    href: `/docs/${id}`,
    label,
  };
}

export function flattenSidebarDocs(sidebar: Sidebar = docsSidebar): SidebarItem[] {
  return sidebar.flatMap((category) => category.items);
}

export function getDocNav(docId: string) {
  const docs = flattenSidebarDocs();
  const index = docs.findIndex((doc) => doc.id === docId);
  return {
    prev: index > 0 ? docs[index - 1] : null,
    next: index >= 0 && index < docs.length - 1 ? docs[index + 1] : null,
  };
}
