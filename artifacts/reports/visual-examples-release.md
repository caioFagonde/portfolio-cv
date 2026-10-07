# Visual examples and Pages release — 2026-10-07

## Completed work

- Preserved the portfolio upgrade and its focus on software development, cloud infrastructure, AI agents, and chatbots. Scientific software remains a secondary strand, with OrbProp as the orbital workbench example. Contact comes from the shared profile: caionahuel@gmail.com.
- Added application galleries for Foundry, GeoDocs, document/report automation, OrbProp, and Agent QA. Captures have captions, alt text, and dimensions. Native dialogs support Escape, arrow keys, previous/next, focus restoration, and opening the original image. Without JavaScript, image links still work.
- Added an interactive architecture diagram to all 15 project pages. Project listings and selected work include visual previews; diagrams are identified as architecture rather than application screenshots.
- Added three local browser examples: BM25 retrieval over a sample policy with source-page links and missing-evidence handling; parcel-score filtering; point-cloud level of detail. Sample data and rendering scope are stated beside each example.
- Added galleries to matching case studies. Homepage case selection now leads with Foundry and Agentic Cortex, followed by OrbProp.
- Fixed GitHub Pages paths, including navigation, images, downloads, Markdown/MDX links, RSS, canonical URLs, and active navigation. The deployment workflow uses a frozen lockfile, Node 22, pnpm 9.15.9, and PUBLIC_BASE_PATH=/portfolio-cv. Builds generate the downloadable CV automatically. Pages publishing uses GitHub Actions.

## Important files

`src/data/project-media.ts`, `src/data/project-flows.ts`, `src/data/projects.ts`; `src/components/ProjectGallery.astro`, `ProjectPreview.astro`, `ProjectFlow.astro`, `DocumentExample.astro`, `SpatialExample.astro`; project/detail, home, demos, and lab pages; `src/layouts/CaseLayout.astro`; `src/utils/paths.ts`; `astro.config.mjs`; `.github/workflows/deploy.yml`; verification scripts and tests; `README.md`; `HANDOFF.md`.

## Verification commands

Environment: Node 22.22.3, pnpm 9.15.9, Chromium. Commands run:

```bash
CI=true pnpm install --frozen-lockfile
pnpm typecheck
pnpm exec astro dev --host 127.0.0.1 --port 4321
pnpm exec playwright test tests/visual-examples.spec.ts --project=chromium
pnpm agent:verify
pnpm lint
pnpm test
PUBLIC_BASE_PATH=/portfolio-cv pnpm build
PUBLIC_BASE_PATH=/portfolio-cv pnpm preview --host 127.0.0.1 --port 4322
SITE_URL=http://127.0.0.1:4322/portfolio-cv node scripts/verify-built-site.mjs
node scripts/verify-pages-interactions.mjs
python3 scripts/create-review-sheets.py
git diff --check
```

`pnpm agent:verify` runs **lint, typecheck, test, build, e2e, a11y, and screenshots** in sequence. All passed: 35 browser tests, 36 accessibility checks, and zero Astro errors/warnings/hints. Content lint/test validate structure and copy; they are not backend unit tests. The final gallery changes received another five browser tests, including an axe scan of the open dialog and mobile demos. The Pages build opened 45 pages and checked 116 internal destinations without failures. Production-path interaction checks cover navigation, active links, galleries, retrieval, point-cloud controls, skills filters, CV, and RSS.

## Captures and manual review

`artifacts/reports/screenshots-manifest.json` lists **170 full-page captures across 34 routes**, including all 15 projects, plus **11 interaction-state captures**. Viewports: **1440×900, 1280×720, 1024×768, 768×1024, 390×844**. Every capture checks loaded images and horizontal overflow.

Reviewed all five `artifacts/reports/review-openings-*.png` sheets; all 12 full desktop sheets and all 12 full mobile sheets; selected full laptop/tablet sheets for galleries, project listings, and demos; and individual interaction-state images. No overlapping UI, clipped text, broken images, or unintended horizontal overflow remained. Important paths:

- `artifacts/screenshots/home-{desktop,laptop,tablet-landscape,tablet-portrait,mobile}.png`
- `artifacts/screenshots/project-*-{desktop,laptop,tablet-landscape,tablet-portrait,mobile}.png`
- `artifacts/screenshots/demos-*.png`
- `artifacts/screenshots/gallery-desktop.png`, `gallery-mobile.png`
- `artifacts/screenshots/retrieval-missing-mobile.png`, `spatial-filter-desktop.png`, `cloud-detail-mobile.png`
- `artifacts/screenshots/pages-gallery-desktop.png`, `pages-gallery-mobile.png`, `pages-demo-mobile.png` (final production-path controls)

Final report-automation copy was recaptured at all five viewports. Gallery controls were reviewed again against the Pages build. Generated screenshots and traces remain local under artifacts; this curated report is tracked.

## Issues found and fixed

- A shared CSS class gave diagram step numbers an unintended pill treatment. Scoped the new component's class.
- Early captures omitted below-fold lazy images. The capture harness eagerly decodes images before capture and ignores the intentionally empty image inside a closed dialog.
- A previously running dev server lost its content cache during a build and returned a research-route 404. Restarted verification and disabled implicit server reuse; all research routes pass. Use SITE_URL only for an intentionally managed server.
- Added original-image links for small-screen gallery inspection, prevented arrow navigation from scrolling the dialog, and reserved space below the expanded image so its navigation controls remain visible.
- Removed a remaining progress-oriented sentence from report-automation copy.
- Pages was configured to publish repository source instead of the Astro build. Switched publishing to workflow and handled the repository base path throughout the site.

## Media provenance and scope

Foundry hub: `foundry-platform/validation/report/e2e-screenshots/hub-authenticated.png`. GeoDocs flows, review, completed sample run, and mobile capture: `foundry-platform/docs/validation/screenshots/`. The source validation documentation identifies real application/backend captures with a sample spreadsheet. These files were inspected and converted to WebP; they are not newly verified backend executions.

OrbProp: the existing October graphics-fidelity Electron workbench capture. Resurgent: the owned Phobos spatial-motion poster. Agent QA: a fresh Chromium capture of this portfolio's checklist. No client documents or credentials are reproduced. Unused historical source images remain untouched locally and are excluded from the release commit.

The portfolio remains **static-only**. No backend/API was added, so backend credential, authorization, and persistence tests do not apply. Browser examples use sample data and do not call project APIs or a model. Scientific calculations and underlying application backends were not rerun as part of this portfolio release. Architecture illustrations are distinct from original application captures.

## Deployment and next-agent instructions

Target: https://caiofagonde.github.io/portfolio-cv/. Main publishes through `.github/workflows/deploy.yml`; verify the latest [deployment run](https://github.com/caioFagonde/portfolio-cv/actions/workflows/deploy.yml) before declaring a subsequent edit live. The current release's live checks are recorded locally in `published-interactions.json` and `published-crawl.log` after publishing.

Read the top of HANDOFF.md first. Add media through the registry and keep captions tied to the correct project. Use sitePath() for Astro destinations and root-relative Markdown links for the configured remark transform. Keep the canonical Gmail profile. Stop development servers before builds that clean .astro/dist, then rerun the required checks. Preserve the older atlas and untracked historical source images.

Deployment references: [Astro GitHub Pages guide](https://docs.astro.build/en/guides/deploy/github/), [GitHub Pages API](https://docs.github.com/en/rest/pages/pages#update-information-about-a-github-pages-site).
