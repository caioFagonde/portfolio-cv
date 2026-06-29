# Caio Nahuel — Systems Atlas

A GitHub-hosted living research atlas, CV portal, case-study archive, and WebGL-infused research companion.

This is not a conventional portfolio template. It is structured around systems: aerospace simulation, numerical methods, geospatial intelligence, computer vision, secure execution, agentic software, geometry compression, and research programmes.

## Stack

- Astro
- TypeScript
- MDX content collections
- React islands
- React Three Fiber / Three.js
- Tailwind
- GitHub Pages deployment

## Design direction

Warm, restrained, curious, and ambitious. The palette is deliberately small: warm paper, deep ink, and copper as a restrained accent. The site avoids generic AI-portfolio tells: no purple gradient soup, no glassmorphism cards, no inflated claims, no “unlock your potential” copy, no decorative AI mesh background.

## Run locally

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

## Deploy

Use the included GitHub Actions workflow in `.github/workflows/deploy.yml`. For a user site, name the repository:

```text
caioFagonde.github.io
```

## Content authoring

Add case studies in `src/content/cases/*.mdx`. Each case has typed frontmatter defined in `src/content.config.ts`.

## Important files

- `DESIGN.md` — visual identity, anti-slop rules, and design principles.
- `PRODUCT.md` — product brief and audience.
- `src/data/domains.ts` — systems atlas domains.
- `src/data/projects.ts` — homepage featured case data.
- `src/data/cv.ts` — structured CV data.
