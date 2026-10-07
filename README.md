# Caio Nahuel — Systems Atlas

A static-first engineering portfolio, AI-systems consulting site, research log, and case-study archive.

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

The screenshot matrix covers 34 routes, including all 15 projects, at five viewport sizes. Generated screenshots, browser traces, and machine-specific MCP configuration stay outside Git. A curated release report and `HANDOFF.md` record verification and media provenance. Stop independently started dev servers before `pnpm agent:verify`; builds reset Astro's generated content cache. Use `SITE_URL` for checks against an intentionally managed server.
