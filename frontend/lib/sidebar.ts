export type SidebarCategory = {
  type: 'category';
  label: string;
  items: string[];
};

export type SidebarEntry = string | SidebarCategory;

export const docsSidebar: SidebarEntry[] = [
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

export function flattenSidebarItems(entries: SidebarEntry[] = docsSidebar): string[] {
  const slugs: string[] = [];
  for (const entry of entries) {
    if (typeof entry === 'string') {
      slugs.push(entry);
    } else {
      slugs.push(...entry.items);
    }
  }
  return slugs;
}

export function getDocHref(slug: string): string {
  return `/docs/${slug}`;
}

export function slugToTitle(slug: string): string {
  const last = slug.split('/').pop() ?? slug;
  return last
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export type DocNavItem = {
  slug: string;
  title: string;
  href: string;
};

export function getAdjacentDocs(slug: string): {
  prev: DocNavItem | null;
  next: DocNavItem | null;
} {
  const slugs = flattenSidebarItems();
  const index = slugs.indexOf(slug);

  if (index === -1) {
    return {prev: null, next: null};
  }

  const toNavItem = (itemSlug: string): DocNavItem => ({
    slug: itemSlug,
    title: slugToTitle(itemSlug),
    href: getDocHref(itemSlug),
  });

  return {
    prev: index > 0 ? toNavItem(slugs[index - 1]) : null,
    next: index < slugs.length - 1 ? toNavItem(slugs[index + 1]) : null,
  };
}
