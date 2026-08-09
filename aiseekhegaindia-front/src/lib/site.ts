export const siteConfig = {
  name: "AISeekhegaIndia",
  tagline: "Community-driven platform for Machine Learning, Deep Learning, and Language Models",
  url: "https://ai-ml-docs.org",
  apiBaseUrl:
    process.env.NEXT_PUBLIC_API_URL ??
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    "http://localhost:4000",
};

export type NavbarLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type NavbarItem = NavbarLink & {
  items?: readonly NavbarLink[];
  activeSection?: "docs";
};

/** Mirrors the original Docusaurus themeConfig.navbar item order and destinations. */
export const navbarItems = {
  left: [
    {
      label: "Resources",
      href: "/docs/ai-for-leaders/intro",
      activeSection: "docs",
    },
    {
      label: "Topics",
      href: "#",
      items: [
        { label: "AI for Leaders", href: "/docs/ai-for-leaders/intro" },
        { label: "Machine Learning", href: "/docs/machine-learning/intro" },
        { label: "Deep Learning", href: "/docs/deep-learning/intro" },
        { label: "Language Models", href: "/docs/language-models/intro" },
        { label: "Resources", href: "/docs/resources/intro" },
      ],
    },
    { label: "AI Fellowship", href: "/fellowship" },
    {
      label: "Tutorials",
      href: "#",
      items: [
        {
          label: "Interactive Logistic Regression",
          href: "/docs/tutorials/logistic-regression",
        },
      ],
    },
  ],
  right: [
    {
      label: "GitHub",
      href: "https://github.com/ai-ml-community/ai-ml-docs",
      external: true,
    },
    { label: "Contribute", href: "/contribute" },
  ],
} as const satisfies {
  left: readonly NavbarItem[];
  right: readonly NavbarItem[];
};

/** Sidebar mirrored from Docusaurus sidebars.ts — expand as more sections are ported. */
export const docsSidebar = [
  {
    label: "AI for Leaders",
    items: [
      { title: "Intro", slug: "ai-for-leaders/intro" },
      { title: "Curriculum Tree", slug: "ai-for-leaders/curriculum-tree" },
      { title: "Curriculum Overview", slug: "ai-for-leaders/curriculum-overview" },
      { title: "ML Fundamentals", slug: "ai-for-leaders/machine-learning-fundamentals" },
      {
        title: "Problem Types",
        slug: "ai-for-leaders/classification-regression-supervised-unsupervised",
      },
      {
        title: "Algorithms Overview",
        slug: "ai-for-leaders/algorithms-high-level-overview",
      },
      {
        title: "Market Applications",
        slug: "ai-for-leaders/classical-ml-in-market",
      },
    ],
  },
  {
    label: "Machine Learning",
    items: [
      { title: "Intro", slug: "machine-learning/intro" },
      { title: "Supervised Learning", slug: "machine-learning/supervised-learning" },
      {
        title: "Logistic Regression Tutorial",
        slug: "machine-learning/logistic_regression_tutorial",
      },
    ],
  },
  {
    label: "Deep Learning",
    items: [
      { title: "Intro", slug: "deep-learning/intro" },
      { title: "Perceptron", slug: "deep-learning/perceptron" },
      { title: "CNNs", slug: "deep-learning/CNNS" },
      { title: "RNNs", slug: "deep-learning/RNNs" },
    ],
  },
  {
    label: "Language Models",
    items: [
      { title: "Intro", slug: "language-models/intro" },
      { title: "Tokenization", slug: "language-models/Tokenization" },
      { title: "NN Training", slug: "language-models/NNTraining" },
      { title: "NN Inference", slug: "language-models/NNInference" },
      { title: "NN Internals", slug: "language-models/NNInternals" },
      { title: "Post-Training", slug: "language-models/PostTraining" },
      { title: "Evolution GPT-2", slug: "language-models/EvolutionGpt2" },
      { title: "Base Models", slug: "language-models/BaseModels" },
      { title: "Hallucinations", slug: "language-models/Hallucinations" },
      { title: "LLM Identity", slug: "language-models/LLMIdentity" },
      { title: "Thinking in Tokens", slug: "language-models/ThinkingInTokens" },
      { title: "LLM Inconsistencies", slug: "language-models/LLMInconsistencies" },
      {
        title: "Post-Training RL",
        slug: "language-models/PostTrainingReinforcementLearning",
      },
      { title: "Thinking RL", slug: "language-models/ThinkingRL" },
      { title: "Reinforcement Learning", slug: "language-models/ReinforcementLearning" },
      { title: "LLM Judgement", slug: "language-models/LLMJudgement" },
      { title: "Multimodality", slug: "language-models/Multimodality" },
      { title: "Evaluation", slug: "language-models/Evaluation" },
      { title: "Accessing LLMs", slug: "language-models/AccessingLLMs" },
      { title: "Query to Response", slug: "language-models/QueryToResponse" },
      {
        title: "Hallucination / RAG / LoRA",
        slug: "language-models/HandlingHallucinationRAGLoRA",
      },
    ],
  },
  {
    label: "Interactive Tutorials",
    items: [
      {
        title: "Logistic Regression",
        slug: "tutorials/logistic-regression",
      },
    ],
  },
  {
    label: "Resources",
    items: [{ title: "Intro", slug: "resources/intro" }],
  },
] as const;
