# Project Record Template

Project metadata lives in `src/data/projects.ts`. Add a record with honest maturity labels and only link demos or repositories that exist.

```ts
{
  title: 'Project title',
  slug: 'project-slug',
  description: 'Short, concrete description.',
  longDescription: 'Longer summary for the detail page.',
  category: 'AI / agents',
  tags: ['automation', 'visual QA'],
  stack: ['Astro', 'Playwright', 'TypeScript'],
  status: 'Prototype',
  featured: false,
  year: '2026',
  maturity: 'Work in progress',
  problem: 'The specific problem this project explores.',
  technicalApproach: [
    'Implementation detail or architecture decision.'
  ],
  demonstrates: [
    'What technical capability this proves.'
  ],
  lessonsLearned: [
    'What the project changed or clarified.'
  ],
  nextSteps: [
    'Next practical improvement.'
  ],
  liveDemoUrl: '/demos/example',
  repositoryUrl: 'https://github.com/example/repo',
  caseStudyUrl: '/cases/example',
  thumbnail: '/assets/example.png',
  screenshots: ['/assets/example-screen.png']
}
```

## Status Guidance

Use honest labels:

- `Implemented`
- `Prototype`
- `Experiment`
- `Work in progress`
- `Internal tool`
- `Demo coming soon`
- `Case study pending`

## Adding A Demo

1. Create the demo route under `src/pages/demos` or another appropriate route.
2. Add screenshots or thumbnails under `public/assets`.
3. Set `liveDemoUrl` to the real route.
4. Add the route to screenshot coverage if it is important enough to appear in the portfolio.
