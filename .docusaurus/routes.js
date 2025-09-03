import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '9ed'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '6e8'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', '364'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c02'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', 'c17'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '87b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '103'),
    exact: true
  },
  {
    path: '/blog',
    component: ComponentCreator('/blog', 'f3f'),
    exact: true
  },
  {
    path: '/blog/2024/04/24/welcome',
    component: ComponentCreator('/blog/2024/04/24/welcome', 'aa7'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive', '097'),
    exact: true
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags', '871'),
    exact: true
  },
  {
    path: '/blog/tags/announcement',
    component: ComponentCreator('/blog/tags/announcement', 'e66'),
    exact: true
  },
  {
    path: '/blog/tags/welcome',
    component: ComponentCreator('/blog/tags/welcome', '8fb'),
    exact: true
  },
  {
    path: '/contribute',
    component: ComponentCreator('/contribute', 'ccf'),
    exact: true
  },
  {
    path: '/fellowship',
    component: ComponentCreator('/fellowship', '80b'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', 'd5d'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', 'aad'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '07c'),
            routes: [
              {
                path: '/docs/deep-learning/intro',
                component: ComponentCreator('/docs/deep-learning/intro', '516'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/deep-learning/perceptron',
                component: ComponentCreator('/docs/deep-learning/perceptron', '9a8'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/language-models/AccessingLLMs',
                component: ComponentCreator('/docs/language-models/AccessingLLMs', 'e71'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/language-models/BaseModels',
                component: ComponentCreator('/docs/language-models/BaseModels', 'b91'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/language-models/Evaluation',
                component: ComponentCreator('/docs/language-models/Evaluation', '93f'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/language-models/EvolutionGpt2',
                component: ComponentCreator('/docs/language-models/EvolutionGpt2', '886'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/language-models/Hallucinations',
                component: ComponentCreator('/docs/language-models/Hallucinations', '879'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/language-models/intro',
                component: ComponentCreator('/docs/language-models/intro', 'f09'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/language-models/LLMIdentity',
                component: ComponentCreator('/docs/language-models/LLMIdentity', '4c6'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/language-models/LLMInconsistencies',
                component: ComponentCreator('/docs/language-models/LLMInconsistencies', '015'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/language-models/LLMJudgement',
                component: ComponentCreator('/docs/language-models/LLMJudgement', 'a53'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/language-models/Multimodality',
                component: ComponentCreator('/docs/language-models/Multimodality', 'b42'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/language-models/NNInference',
                component: ComponentCreator('/docs/language-models/NNInference', '856'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/language-models/NNInternals',
                component: ComponentCreator('/docs/language-models/NNInternals', '9f7'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/language-models/NNTraining',
                component: ComponentCreator('/docs/language-models/NNTraining', '978'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/language-models/PostTraining',
                component: ComponentCreator('/docs/language-models/PostTraining', '0e9'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/language-models/PostTrainingReinforcementLearning',
                component: ComponentCreator('/docs/language-models/PostTrainingReinforcementLearning', '0f0'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/language-models/QueryToResponse',
                component: ComponentCreator('/docs/language-models/QueryToResponse', 'c1c'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/language-models/ReinforcementLearning',
                component: ComponentCreator('/docs/language-models/ReinforcementLearning', '18d'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/language-models/ThinkingInTokens',
                component: ComponentCreator('/docs/language-models/ThinkingInTokens', 'bd0'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/language-models/ThinkingRL',
                component: ComponentCreator('/docs/language-models/ThinkingRL', '729'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/language-models/Tokenization',
                component: ComponentCreator('/docs/language-models/Tokenization', '47a'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/machine-learning/intro',
                component: ComponentCreator('/docs/machine-learning/intro', '79e'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/machine-learning/logistic_regression_tutorial',
                component: ComponentCreator('/docs/machine-learning/logistic_regression_tutorial', 'f31'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/machine-learning/supervised-learning',
                component: ComponentCreator('/docs/machine-learning/supervised-learning', '039'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/resources/intro',
                component: ComponentCreator('/docs/resources/intro', '8d8'),
                exact: true,
                sidebar: "docsSidebar"
              },
              {
                path: '/docs/tutorials/logistic-regression',
                component: ComponentCreator('/docs/tutorials/logistic-regression', '0be'),
                exact: true,
                sidebar: "docsSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '8e8'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
