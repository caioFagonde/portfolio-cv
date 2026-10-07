# Caio Nahuel — Systems Atlas

A static-first engineering portfolio, AI-systems consulting site, research log, and case-study archive.

The portfolio leads with software development, cloud infrastructure, AI agents, and chatbots. Scientific software, geospatial work, and numerical methods provide additional engineering examples.

## Stack

- Astro
- TypeScript
- MDX content collections
- React islands
- React Three Fiber / Three.js
- Tailwind
- GitHub Pages deployment

## Design direction

Warm, restrained, curious, and ambitious. The palette is deliberately small: warm paper, deep ink, olive for actions, and restrained copper for metadata. The site avoids generic AI-portfolio tells: no purple gradient soup, no glassmorphism cards, no inflated claims, no “unlock your potential” copy, no decorative AI mesh background.

## Run locally

```bash
nvm use
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

## Deploy

Push `main` to trigger `.github/workflows/deploy.yml`. This repository publishes at [the English portfolio](https://caiofagonde.github.io/portfolio-cv/) and [the Portuguese portfolio](https://caiofagonde.github.io/portfolio-cv/pt/). The workflow sets the repository URL prefix; local development uses `/`.

## Content authoring

Add case studies in `src/content/cases/*.mdx`. Each case has typed frontmatter defined in `src/content.config.ts`.

## Important files

- `DESIGN.md` — visual identity, anti-slop rules, and design principles.
- `PRODUCT.md` — product brief and audience.
- `src/data/domains.ts` — systems atlas domains.
- `src/data/projects.ts` — typed project registry and generated detail routes.
- `src/data/cv.ts` — structured CV data.

## AI systems and verification

- `/ai-systems`: AI-flow/chatbot scope, interactive architecture patterns, and planning checklist.
- `src/data/ai.ts`: capabilities, development stages, and flow patterns.
- `src/data/services.ts`: consulting offers.
- `pnpm agent:verify`: content validation, Astro diagnostics, static build, browser interactions, axe, and screenshots.
- `python3 scripts/create-review-sheets.py`: labeled screenshot review sheets (optional; requires Pillow).
- `SITE_URL=http://127.0.0.1:4322 node scripts/verify-built-site.mjs`: open all built pages and check internal links against a running `pnpm preview --host 127.0.0.1 --port 4322`.

Use a supported Node version (`.nvmrc` is provided). See `HANDOFF.md` for the latest changes, evidence, and known limitations.


## Development, cloud, and skills map

The primary positioning is software development, cloud infrastructure, AI agents, and chatbots. Scientific work is secondary, with OrbProp as the featured orbital software example. The homepage and `/skills` use `SkillsMap.astro`: a semantic HTML catalog with responsive SVG connectors, category filters, search, counts, and project links. There is no Mermaid runtime dependency. The earlier Svelte module selector and Astro atlas informed the design; their source files remain available.

- `src/data/skills.ts`: the map combines CV skill groups and domain stacks, alongside application/cloud skills supported by the reviewed repositories.
- `src/data/cv.ts`: canonical profile and contact (`caionahuel@gmail.com`). `pnpm export:cv` derives the downloadable CV from this module.
- `src/data/services.ts`: consulting offers, including cloud infrastructure.
- Internal project maturity, evidence notes, and next steps remain in data; they are not rendered as public portfolio progress. Show descriptions, architecture, and functioning links instead. Do not claim a release or deployment without evidence.
- `artifacts/reports/agy-editorial-review.md`: read-only editorial input from the installed `agy` CLI; its suggestions are not a source of factual claims.

## Visual examples and GitHub Pages

All 15 project pages include a keyboard-operable architecture explorer. Application captures live in `src/data/project-media.ts`; each asset has explicit dimensions, alt text, and a caption. `ProjectGallery.astro` provides a native dialog with Escape, arrow keys, and focus restoration. The same images appear in the project index and selected work. Without JavaScript, gallery links open the image directly and the architecture descriptions remain readable.

`/demos` has browser examples for BM25 document retrieval with citations, parcel filtering, and point-cloud detail. These use sample data locally, without external services. The examples identify their data and rendering scope. They do not impersonate a hosted project backend.

Node 22.22.3 and pnpm 9.15.9 are pinned. `pnpm build` exports the CV, checks types, and builds the static site. GitHub Actions sets `PUBLIC_BASE_PATH=/portfolio-cv`; `sitePath()` prefixes internal URLs and the Markdown plugin handles content links. Local development uses `/`. To reproduce the Pages build and preview:

```bash
PUBLIC_BASE_PATH=/portfolio-cv pnpm build
PUBLIC_BASE_PATH=/portfolio-cv pnpm preview --host 127.0.0.1 --port 4322
SITE_URL=http://127.0.0.1:4322/portfolio-cv node scripts/verify-built-site.mjs
```

The screenshot matrix covers 68 routes across both languages, including all 15 projects, at five viewport sizes. Generated screenshots, browser traces, and machine-specific MCP configuration stay outside Git. A curated release report and `HANDOFF.md` record verification and media provenance. Stop independently started dev servers before `pnpm agent:verify`; builds reset Astro's generated content cache. Use `SITE_URL` for checks against an intentionally managed server.

## English, Portuguese, and personal skills

English keeps the existing routes. Portuguese uses `/pt/`, with equivalent pages and an always-visible EN/PT switch. Both versions render complete static HTML, including without JavaScript. Switching preserves the current page and, with JavaScript, its reading anchor. Metadata and alternate-language links follow the selected language.

English components and data are the canonical content source. `src/pages/pt/[...path].astro` renders those components for Portuguese routes. `src/i18n/html.ts` parses trusted rendered HTML at build time and applies `src/i18n/pt.json`; it preserves code, URLs, identifiers, and original media. `src/i18n/client.ts` contains the small set of browser-generated messages. `src/i18n/locale.ts` handles page destinations separately from shared files.

When adding or editing public copy, add its normalized English text as a catalog key and its Portuguese translation as the value. Preserve product and tool names. `pnpm build` runs `scripts/validate-translations.mjs`, rejecting missing translations or missing Portuguese pages. A new static page also needs an entry in the Portuguese route dispatcher. Browser-generated messages must be updated in both languages. Code snippets, project names, original screenshots, and external destinations retain their original language.

`src/data/cv.ts` supplies leadership, management, guitar, piano, and four spoken languages with the user-confirmed proficiency levels. `PersonalProfile.astro` renders the same data in About and CV; the shared skills map adds a Personal/Pessoal filter. Programming languages remain a separate category. `pnpm export:cv` generates both CV summaries, and Portuguese checklists live beside their English versions under `public/downloads/`.

See `artifacts/reports/bilingual-personal-skills-release.md` and the first section of `HANDOFF.md` for verification, screenshot review scope, and maintenance instructions.
