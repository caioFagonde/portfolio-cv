# Modelo de registro de projeto

Os metadados ficam em `src/data/projects.ts`. Adicione um registro com informações de maturidade corretas e links apenas para demonstrações e repositórios existentes. Os campos de estado são metadados internos.

```ts
{
  title: 'Título do projeto',
  slug: 'project-slug',
  description: 'Descrição curta e concreta.',
  longDescription: 'Resumo mais completo para a página do projeto.',
  category: 'AI / agents',
  tags: ['automation', 'visual QA'],
  stack: ['Astro', 'Playwright', 'TypeScript'],
  status: 'Prototype',
  featured: false,
  year: '2026',
  maturity: 'Work in progress',
  problem: 'O problema específico abordado pelo projeto.',
  technicalApproach: ['Detalhe de implementação ou decisão de arquitetura.'],
  demonstrates: ['A capacidade técnica demonstrada.'],
  lessonsLearned: ['O que o projeto esclareceu.'],
  nextSteps: ['A próxima melhoria prática.'],
  liveDemoUrl: '/demos/example',
  repositoryUrl: 'https://github.com/example/repo',
  caseStudyUrl: '/cases/example',
  thumbnail: '/assets/example.png',
  screenshots: ['/assets/example-screen.png']
}
```

## Orientações sobre estado

Use valores corretos, preservando as opções do modelo de dados:

- `Implemented`
- `Prototype`
- `Experiment`
- `Work in progress`
- `Internal tool`
- `Demo coming soon`
- `Case study pending`

## Adicionar uma demonstração

1. Crie a rota em `src/pages/demos` ou outro local apropriado.
2. Adicione capturas ou miniaturas em `public/assets`.
3. Defina `liveDemoUrl` com a rota real.
4. Inclua a rota na cobertura de capturas quando ela aparecer no portfólio.
