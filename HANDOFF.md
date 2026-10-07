# Handoff

## Personal skills and bilingual release — 2026-10-07 (read first)

English keeps every existing URL; Portuguese adds 45 equivalent static pages under `/pt/`. The EN/PT switch stays visible on mobile and preserves the page and reading anchor. Navigation, metadata, project search, skill search, gallery controls, architecture details, document retrieval, dates, and downloads follow the language. The site remains static-only. Software, cloud, AI agents, and chatbots lead; OrbProp remains the featured orbital example. Use only `caionahuel@gmail.com` from the canonical profile.

Confirmed personal data lives in `src/data/cv.ts`: Leadership, Management, Guitar, Piano, Portuguese/native, English/fluent, Spanish/fluent, French/intermediate. `PersonalProfile.astro` shares it between About and CV; both CV downloads derive from it. The map now has 118 unique labels, 12 branches, and seven filters, including Personal/Pessoal. Programming languages and spoken languages are distinct. Additional personal strengths were suggested but not added without confirmation.

Localization lives in `src/i18n/{locale.ts,html.ts,client.ts,pt.json}`, `LocalizedContent.astro`, and `src/pages/pt/[...path].astro`. English components/data remain canonical. The parse5-based renderer translates trusted HTML at build time, preserving code/identifiers and using localized link helpers; the browser does not download the prose catalog. The installed `agy` CLI drafted the catalog from public text, followed by editorial review and corrections. Maintain exact normalized source keys when copy changes. Add any new static page to the Portuguese dispatcher. `pnpm build` rejects missing translations and unmatched language routes; browser messages and translated downloads need explicit maintenance.

Verification: `pnpm agent:verify` passed lint, typecheck, content tests, build, 50 browser tests, 70 accessibility checks, and 340 full-page screenshots plus 23 states. Zero Astro diagnostics and serious/critical axe violations. All five required viewports were captured; reflow tests additionally cover 320px. Production-prefix checks opened 90 pages, verified 319 internal destinations, and passed 12 interaction checks. The coverage report found 1,601 required strings with no missing catalog entries or pages. The final tool-name corrections received a rebuilt production site and focused browser checks.

Manual review covered bilingual home/skills openings at all five sizes, all Portuguese desktop sheets, selected full Portuguese mobile sheets and required-route crops, all ten Portuguese interaction states, and personal sections at every viewport. Fixed narrow-screen Portuguese headline overflow, longer SVG labels, navigation fit, and incorrect translation of Make/Just. Do not interpret automated screenshot capture as individual review of every image. Original application screenshots and technical names retain their language; no underlying project backend or scientific validation was rerun.

Read `artifacts/reports/bilingual-personal-skills-release.md` for exact commands, evidence paths, review scope, limitations, and next-agent instructions. Generated evidence stays under `artifacts/` outside Git; the curated report is tracked. Preserve the four unused historical images already present locally. Node 22.22.3 and pnpm 9.15.9 remain pinned. Finish builds before preview crawls; stop independent dev servers before checks that reset Astro's generated content. Existing GitHub Actions deployment authorization covers commit/push of this release; verify the new run and live routes before claiming publication.

## Visual examples and Pages release — 2026-10-07 (read first)

The user authorized adding visual examples, committing the portfolio upgrade, and pushing it to update GitHub Pages. This pass preserves the earlier changes and adds real galleries to five projects, interactive architecture explorers to all 15, and local retrieval/spatial/point-cloud examples at `/demos`. Listings and selected work now carry images or architecture previews. The shared skills diagram remains filterable. Software, cloud, AI agents, and chatbots lead; OrbProp is the science-side workbench. Use caionahuel@gmail.com through the canonical profile.

Pages uses GitHub Actions at https://caiofagonde.github.io/portfolio-cv/. Node 22.22.3 and pnpm 9.15.9 are pinned. CI sets PUBLIC_BASE_PATH=/portfolio-cv; sitePath() handles Astro URLs and the remark plugin handles Markdown links. Builds generate the CV. Do not publish the raw repository through legacy Pages.

Verification passed: pnpm agent:verify (lint/typecheck/test/build/e2e/a11y/screenshots), 35 browser tests, 36 accessibility checks, zero Astro diagnostics. The production build was crawled across 45 pages and 116 internal destinations. Captured 170 full-page screenshots (34 routes × five viewports), plus 11 states. Reviewed every viewport's opening sheet, all full desktop/mobile sheets, selected full laptop/tablet sheets, and individual interaction states. Final gallery changes received another five browser tests and production-path interaction checks.

Important additions: ProjectGallery, ProjectPreview, ProjectFlow, DocumentExample, SpatialExample; project-media.ts and project-flows.ts; src/utils/paths.ts; scripts/verify-pages-interactions.mjs. Screenshots and traces remain under artifacts but outside Git. The curated report is tracked. Unused historical source images are preserved locally.

The site is static-only. Browser examples use stated sample data; original project backends and scientific validation were not rerun. Galleries preserve original application captures and do not claim backend verification by this portfolio pass. Read `artifacts/reports/visual-examples-release.md` for commands, evidence paths, media provenance, issues fixed, limitations, and next-agent instructions. After any content/media change, rerun the harness and verify the latest Pages deployment. Stop independent dev servers before build/typecheck, which reset generated Astro content.


# HANDOFF.md

## Latest pass — development, cloud, AI, and skills diagram (2026-10-06)

This section supersedes the earlier public status/RelASP/atlas presentation. Preserve the heavily modified worktree and the older implementation files.

- Lead with software development, cloud infrastructure, AI agents, and chatbots. Science is secondary; OrbProp is the featured orbital example. Keep the existing OrbProp project/case URLs.
- The homepage and `/skills` use `src/components/SkillsMap.astro` and `src/data/skills.ts`: 110 skill labels in nine branches, six filters, search, live counts, empty/reset states, project links, responsive SVG connections, keyboard controls, and a complete no-JavaScript catalog.
- Public copy is direct and describes the work. The user explicitly requested removal of internal project status/maturity/confidence/next-step chatter. Those fields stay in internal records. Do not introduce invented deployment, release, publication, or client claims.
- Use `profile.email` from `src/data/cv.ts`: `caionahuel@gmail.com`. `pnpm export:cv` now builds `public/cv-summary.md` from the canonical profile. Content checks reject the old address.
- Cloud services are first class in `src/data/services.ts`. Foundry is the software spotlight. The Phobos image is credited to Resurgent; the OrbProp workbench image is a real runtime capture. See `artifacts/reports/editorial-media-provenance.md`.
- The installed `agy` CLI provided a read-only copy review. Its suggestions are input, not evidence for project claims; see `artifacts/reports/agy-editorial-review.md`.

Verification: `pnpm agent:verify` passes all required commands; 30 e2e and 24 axe checks pass. Astro reports 0 errors/warnings/hints. The built-site crawl opened 45 pages and checked 104 internal links with 0 failures. Contact addresses were audited across all 45 pages. The screenshot matrix covers 23 routes at 1440×900, 1280×720, 1024×768, 768×1024, and 390×844: 115 full-page captures plus six states, manually reviewed through opening sheets, full desktop/mobile sheets, and individual diagram/state images.

Full handoff and exact commands: `artifacts/reports/editorial-skills-upgrade.md`. Final logs: `artifacts/reports/editorial-verification-final.log`, `editorial-link-verification.log`, `contact-audit.json`, `screenshots-manifest.json`. Screenshots: `artifacts/screenshots/skills-*.png`, `home-*.png`, and the full manifest.

The portfolio is static-only; no backend/API checks apply. No commit, push, or deployment was performed. OrbProp scientific validation was not rerun. Read this section first, update the data modules for content, regenerate the CV after profile edits, and rerun `pnpm agent:verify` after UI changes. Build/typecheck remove `dist`, so preview crawls must follow those commands rather than run concurrently.

## Initial October refresh — historical

This section is authoritative for the portfolio refresh. The earlier handoff is preserved below as a historical snapshot. The worktree was already heavily modified and contained untracked user work before this pass; do not reset it or attribute the entire git diff to this session.

### Completed work

- Rebuilt the homepage around a concise introduction, selected work, AI capabilities, a real scientific figure, consulting services, public code, and case-study archive. Kept the existing domain atlas in an optional disclosure.
- Refreshed the shared paper/ink/olive visual system: more readable navigation and buttons, consistent headline sizes, clear section rhythm, restrained borders, and a graphite footer.
- Added mobile navigation with native controls, Escape support, active route indicators, visible focus, a skip link, and a no-JavaScript fallback.
- Added `/ai-systems` as a first-class offer for AI flows, chatbots, retrieval, document assistants, tool execution, integrations, human review, evaluation, and operations. The flow explorer switches among three architecture patterns; it executes no model requests.
- Added a portable AI system planning checklist and an AI consulting service. Updated contact, about, CV, header, and footer to connect the offer.
- Reviewed recent local Claude Code/Codex sessions and project documentation. Added seven project records: GeoDocs, Hasselt Infill Atlas, RelASP, Personal OS, Resurgent library, source ingestion, and report automation. Updated the existing Foundry record. Retained earlier project and GitHub evidence.
- Added project search, discipline filters, result counts, empty state, and reset. All 15 project records remain readable without JavaScript.
- Added two research notes and sorted the combined research index by date. Inline article links are visibly underlined.
- Added a real RelASP scientific figure, served as a 73KB WebP, with model scope in its caption. The lossless PNG is retained as a source asset. Refreshed the SVG favicon.
- Expanded browser checks and screenshot coverage; separated e2e and accessibility reports; added static-build crawling and labeled review sheets.

### Important files

- `src/pages/index.astro`, `src/pages/ai-systems.astro`, `src/pages/consulting.astro`
- `src/pages/projects/index.astro`, `src/pages/projects/[slug].astro`
- `src/data/ai.ts`, `src/data/services.ts`, `src/data/projects.ts`, `src/data/cv.ts`
- `src/components/AIBlueprint.astro`, `src/components/FlowExplorer.astro`
- `src/components/SiteHeader.astro`, `src/components/SiteFooter.astro`, `src/components/SectionHeader.astro`
- `src/layouts/BaseLayout.astro`, `src/styles/globals.css`, `src/styles/tokens.css`, `tailwind.config.mjs`
- `src/pages/about.astro`, `src/pages/contact.astro`, `src/pages/research/index.astro`, `src/pages/cases/index.astro`, `src/pages/lab/index.astro`, `src/pages/demos/index.astro`
- `src/content/notes/document-assistants.mdx`, `src/content/notes/scientific-visualization.mdx`
- `public/downloads/ai-system-planning-checklist.md`, `public/assets/relasp-foliation.webp`, `public/favicon.svg`
- `astro.config.mjs` (development toolbar disabled), `playwright.config.ts`
- `tests/e2e.spec.ts`, `tests/a11y.spec.ts`, `scripts/capture-screenshots.mjs`, `scripts/validate-content.mjs`
- `scripts/verify-built-site.mjs`, `scripts/create-review-sheets.py`
- `README.md`, `DESIGN.md`, `PRODUCT.md`

### Verification and commands

Use Node 22.22.3 in this environment (the shell default is unsupported Node 18). The existing `.nvmrc` also names a supported Node 20 version.

```bash
export PATH=/home/caion/.nvm/versions/node/v22.22.3/bin:$PATH
pnpm dev --host 127.0.0.1
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm e2e
pnpm a11y
SITE_URL=http://127.0.0.1:4321 pnpm screenshots
pnpm agent:verify > artifacts/reports/upgrade-verification.log 2>&1
pnpm preview --host 127.0.0.1 --port 4322
SITE_URL=http://127.0.0.1:4322 node scripts/verify-built-site.mjs
python3 scripts/create-review-sheets.py
git diff --check
```

`pnpm agent:verify` runs lint, typecheck, test, build, e2e, a11y, and screenshots. The test script is content validation, not a separate unit-test suite. Browser checks cover menu navigation/Escape, primary conversion, downloads, unavailable demos, search/combined filters/empty/reset, keyboard flow controls, no-JavaScript fallbacks, and reflow at 320/390/768/1024/1280/1440px. Detailed final results are in `artifacts/reports/portfolio-upgrade.md` and the log.

The static-build browser crawl opens all 44 HTML pages, checks one primary heading, image loading, horizontal overflow, browser exceptions, internal links, and fragment destinations. It reported 101 internal links and zero failures.

### Screenshot coverage and review

- Matrix: 1440×900 desktop; 1280×720 laptop; 1024×768 tablet landscape; 768×1024 tablet portrait; 390×844 mobile.
- 21 routes × 5 viewports = 105 full-page screenshots under `artifacts/screenshots/`.
- Manifest: `artifacts/reports/screenshots-manifest.json` enumerates exact route, dimensions, and path.
- Required routes covered: home, consulting, workflow, repo audit, projects, Agent QA detail, checklist, demos, and contact.
- Added AI systems, GeoDocs/RelASP/Hasselt details, research index and both new notes, an Agentic Cortex case, about, CV, cases, and lab.
- Additional state evidence: `mobile-menu-open.png`, `project-filter-empty.png`, `ai-operational-flow.png`, `keyboard-skip-link.png`, `research-atlas-expanded.png`, `footer-keyboard-focus.png`.
- Manually reviewed all viewport opening sheets, full desktop/mobile page sheets, and targeted native-size state screenshots. Review sheets: `artifacts/reports/review-openings-*.png` and `review-full-*.png`.

### Issues found and fixed

- Original homepage headline filled most of the desktop viewport: replaced with a concise opening and clear actions.
- Tiny uppercase navigation/CTA text: switched to readable sentence-case controls and larger targets.
- Dense scrolling mobile nav: replaced with a keyboard-accessible menu and a no-JavaScript fallback.
- Page-specific title utilities overrode the shared type scale: corrected heading sizing and shortened the most unwieldy titles.
- Development toolbar contaminated screenshots: disabled it and recaptured.
- Screenshot decoding could stall on offscreen lazy images: the capture script now eagerly loads images before checking and capturing them.
- Research note links looked like body text: added visible underlines and contrast.
- Missing-demo labels looked like actions or implied public hosting: project detail/lab states now state availability plainly.
- New research notes appeared behind older essays: sorted the combined collection by date.
- Date-only MDX metadata shifted to the previous day in the local timezone: format in UTC and expose semantic time elements.

### Accessibility, backend, and limitations

- Axe found no serious or critical violations in the tested routes and alternate flow states. Keyboard skip-link behavior and footer focus were also inspected in the built site.
- Static-only. No backend, model endpoint, contact form handler, CMS, database, or authenticated API was added. API success/error/authorization tests are not applicable to this portfolio.
- Contact is mailto; no booking integration is configured.
- Other repositories were used as content evidence, not revalidated or deployed by this pass. Project readiness must not be inferred from portfolio test results.
- Most project demos are not publicly hosted; labels preserve this distinction.
- The public GitHub snapshot remains dated July 10, 2026; this pass did not claim a fresh remote audit.
- Visual review is manual, with no screenshot-diff baseline or Lighthouse performance score.
- Only Chromium was used for runtime verification. Screenshot review sheets require Python/Pillow; the site and verification commands remain pnpm-based.
- There was no deploy, push, or commit in this pass.

### Next-agent instructions

1. Read this section and `AGENTS.md`, then `artifacts/reports/portfolio-upgrade.md`.
2. Review the screenshot manifest and the current screenshots before changing the design.
3. AI content lives in `src/data/ai.ts`; keep the service scope distinct from coding-agent workflows.
4. Project evidence lives in the typed registry. Keep local implementation, public repository, public demo, and published research separate.
5. If adding a real assistant demo, use synthetic data, keep credentials server-side, and extend backend verification first.
6. Highest-impact next step: approved synthetic GeoDocs/parcel examples or more real project media. Add public hosting only when controls, failure states, and data ownership are settled.
7. Preserve pre-existing user changes and the old handoff snapshot. Do not remove unavailable-demo states or invent client proof.

Evidence pointers: `artifacts/reports/design-research.md`, `session-content-review.md`, `portfolio-upgrade.md`, `upgrade-verification.log`, `built-site-verification.json`, `e2e-report.json`, `a11y-report.json`, `keyboard-review.json`, and `screenshots-manifest.json`.

---

## Prior handoff snapshot (before the October 2026 refresh)

## Current State

- Framework: Astro 5 static site with typed content collections and React islands.
- Styling approach: Tailwind utilities plus shared CSS tokens in `src/styles/tokens.css` and global patterns in `src/styles/globals.css`.
- Routing structure: Astro file routes under `src/pages`.
  - `/`
  - `/consulting`
  - `/workflow`
  - `/repo-audit`
  - `/projects`
  - `/projects/[slug]`
  - `/demos`
  - `/lab`
  - `/agent-qa-checklist`
  - `/about`
  - `/contact`
  - existing `/cases`, `/research`, `/cv`, and RSS routes
- Package manager: pnpm.
- Node version: use Node `20.19.3` via `.nvmrc`. The previous default Node `18.20.7` is rejected by Astro.
- Build/dev commands:
  - `pnpm dev`
  - `pnpm build`
  - `pnpm agent:verify`
- Deployment assumptions: static GitHub Pages deployment through `.github/workflows/deploy.yml`.
- Important files:
  - `AGENTS.md`
  - `.mcp.json`
  - `playwright.config.ts`
  - `scripts/capture-screenshots.mjs`
  - `src/data/projects.ts`
  - `src/data/services.ts`
  - `src/data/workflow.ts`
  - `src/data/github.ts`
  - `src/pages/index.astro`
  - `src/pages/consulting.astro`
  - `src/pages/workflow.astro`
  - `src/pages/repo-audit.astro`
  - `src/pages/projects/index.astro`
  - `src/pages/projects/[slug].astro`
  - `public/downloads/agent-qa-checklist.md`
  - `public/downloads/repo-audit-checklist.md`
  - `public/downloads/project-record-template.md`
  - `public/assets/agent-qa-harness-thumb.png`
  - `src/styles/globals.css`
  - `src/styles/tokens.css`

## What Changed

- Information architecture: added first-class consulting, workflow, repo audit, projects, project detail, demos, about, and agent QA checklist routes.
- Visual design: kept the warm technical atlas identity, reduced generic rounded-card treatment, removed negative letter spacing, removed Inter preference after Impeccable flagged it, tightened CTA/button styles, added sharper evidence metadata patterns, and added a project-bound generated bitmap asset at `public/assets/engineering-workbench-hero.png`.
- Consulting CTA changes: homepage, header, footer, contact page, consulting page, workflow page, and repo audit page now point to technical consulting, repo audits, workflow setup, and build conversations.
- Workflow/audit content changes: added `src/data/workflow.ts`, `/workflow`, `/repo-audit`, and public downloadable checklists for agent QA, repo audit preparation, and project metadata.
- GitHub evidence changes: reviewed the authenticated `caioFagonde` GitHub account with `gh`, added `src/data/github.ts`, and added public repo footprint sections to home/projects so technology claims are backed by visible repositories.
- Project/demo hosting changes: replaced the old small project list with a typed registry in `src/data/projects.ts`; added `/projects`, `/projects/[slug]`, `/demos`, and revised `/lab`.
- Verification harness changes: added Playwright e2e tests, axe accessibility tests, screenshot capture script, deterministic screenshot output, reports, and `pnpm agent:verify`; expanded coverage to `/workflow`, `/repo-audit`, `/agent-qa-checklist`, and public downloads.
- Accessibility/backend/test changes: axe checks cover key routes; e2e tests cover core navigation, consulting conversion, unavailable demo state, and mobile navigation. Backend/API checks are documented as not applicable because this site is static-only.
- Content validation changes: `scripts/validate-content.mjs` now verifies required route/download files, bans a short list of vague marketing phrases under `src/`, and fails on negative letter-spacing utilities.
- MCP setup: added `.mcp.json` for filesystem, Playwright, Context7, GitHub, memory, and sequential-thinking MCP servers. GitHub requires `GITHUB_PERSONAL_ACCESS_TOKEN`.

## How to Run

```bash
nvm use
pnpm install
pnpm dev
pnpm agent:verify
```

If `nvm use` is not available, use any Node version accepted by Astro, preferably Node `20.19.3` or newer.

Individual commands:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm e2e
pnpm a11y
pnpm screenshots
```

## Design System Notes

- Typography: serif headings use Georgia/Iowan/Charter-style fallbacks; body uses system sans; mono is reserved for metadata, labels, and compact UI.
- Color tokens: warm paper, deep ink, copper, steel, and olive. Avoid one-note beige-only pages by using graphite, steel, and olive as structural accents.
- Spacing scale: sections use large vertical rhythm; cards use compact 5-8px radius and restrained internal padding.
- Layout grid: home uses split editorial/product sections; consulting uses dense service evidence rows; projects use a featured story plus metadata list, not an endless identical grid.
- Component patterns: `atlas-card`, `section-rule`, `btn-primary`, `btn-secondary`, `btn-tertiary`, `meta-pill`, and `evidence-plate`.
- CTA hierarchy: primary CTA is now softer and more direct: "Email about a build" or "Discuss a technical build"; secondary CTAs include project evidence, workflow, repo audit, and downloadable checklists.
- Responsive rules: mobile keeps nav scrollable, buttons wrap, project metadata remains visible, and unavailable demo states are labeled.
- Anti-patterns to avoid: purple/blue gradients, generic AI mesh, glassmorphism, fake SaaS dashboards, huge rounded cards everywhere, vague claims, fake clients, fake metrics, and hidden pending demos.
- Workflow page pattern: avoid returning the working-rules section to a uniform card grid. The featured graphite rule panel is intentional because it gives the page hierarchy and avoids a generic six-card block.

## Project/Demo System

- Project metadata lives in `src/data/projects.ts`.
- Add a project by appending a typed record with:
  - `title`
  - `slug`
  - `description`
  - `longDescription`
  - `category`
  - `tags`
  - `stack`
  - `status`
  - `featured`
  - `year`
  - `maturity`
  - `problem`
  - `technicalApproach`
  - `demonstrates`
  - `lessonsLearned`
  - `nextSteps`
  - optional `liveDemoUrl`, `repositoryUrl`, `caseStudyUrl`, `thumbnail`, `screenshots`
- Add a live demo by creating the route, then setting `liveDemoUrl` to that route.
- Mark WIP with `status: 'Work in progress'`, `status: 'Demo coming soon'`, or honest maturity copy.
- Add screenshots/thumbnails under `public/assets/` and reference with `/assets/...`.
- Project detail pages are generated automatically from `/projects/[slug]`.
- A project record starter lives at `public/downloads/project-record-template.md`.

## Workflow/Audit System

- Engineering rules, workflow stages, and audit areas live in `src/data/workflow.ts`.
- `/workflow` explains the operating model for AI-assisted engineering work: frame, shape, implement, verify, handoff.
- `/repo-audit` explains the codebase audit offer and links to `public/downloads/repo-audit-checklist.md`.
- `public/downloads/agent-qa-checklist.md` mirrors the public agent QA checklist in a portable Markdown format.
- Keep workflow/audit copy concrete. It should describe what gets inspected, run, captured, fixed, and handed off.

## GitHub Evidence System

- Public GitHub evidence lives in `src/data/github.ts`.
- The data was gathered with the authenticated GitHub CLI on July 10, 2026.
- It currently highlights:
  - Python automation and agent/tooling repos
  - Vue/PHP/Blade product surfaces
  - Astro/Svelte/TypeScript frontends
  - Kotlin/Android/C++ experiments
  - Rust/Go/Python scientific tooling
  - MATLAB/C# orbital analysis
- Do not turn GitHub repo names into inflated product claims. Use them as public evidence of technology exposure and technical direction.

## Consulting Content Notes

- Primary audience: technical founders, small teams, senior ICs, technical leads, and builders with existing repos/prototypes that need clearer engineering shape.
- Service positioning:
  - AI Engineering Workflow Setup
  - Full-Stack Product Implementation
  - Developer Tooling and Automation
  - Architecture / Codebase Audit
  - Technical Coaching / Tutoring
- CTAs: "Email about a build", "Discuss a technical build", "Request a repo audit", and service-specific links.
- Pages to improve later: add real project screenshots, public demo exports, and deeper case-study media when available.
- Missing real data needed from owner: preferred booking system, consulting rates or engagement shapes, real project repositories, real demos, and any public client/work history that can be stated accurately.

## Verification Evidence

Commands run:

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm e2e
pnpm a11y
pnpm screenshots
npx impeccable detect src/
pnpm agent:verify
gh auth status
gh repo list caioFagonde --limit 100 --json name,description,languages,pushedAt,isFork,url,primaryLanguage --source
pnpm exec playwright screenshot --viewport-size=1440,900 http://127.0.0.1:4321/agent-qa-checklist public/assets/agent-qa-harness-thumb.png
```

Final `pnpm agent:verify` passed after the workflow/audit pass.

Screenshots generated:

- `artifacts/screenshots/home-{desktop,laptop,tablet-landscape,tablet-portrait,mobile}.png`
- `artifacts/screenshots/consulting-{desktop,laptop,tablet-landscape,tablet-portrait,mobile}.png`
- `artifacts/screenshots/workflow-{desktop,laptop,tablet-landscape,tablet-portrait,mobile}.png`
- `artifacts/screenshots/repo-audit-{desktop,laptop,tablet-landscape,tablet-portrait,mobile}.png`
- `artifacts/screenshots/projects-{desktop,laptop,tablet-landscape,tablet-portrait,mobile}.png`
- `artifacts/screenshots/project-agent-qa-harness-{desktop,laptop,tablet-landscape,tablet-portrait,mobile}.png`
- `artifacts/screenshots/agent-qa-checklist-{desktop,laptop,tablet-landscape,tablet-portrait,mobile}.png`
- `artifacts/screenshots/demos-{desktop,laptop,tablet-landscape,tablet-portrait,mobile}.png`
- `artifacts/screenshots/contact-{desktop,laptop,tablet-landscape,tablet-portrait,mobile}.png`

Contact sheets:

- `artifacts/reports/contact-sheet-desktop.png`
- `artifacts/reports/contact-sheet-laptop.png`
- `artifacts/reports/contact-sheet-tablet-landscape.png`
- `artifacts/reports/contact-sheet-tablet-portrait.png`
- `artifacts/reports/contact-sheet-mobile.png`

Viewports tested:

- 1440x900 desktop
- 1280x720 laptop
- 1024x768 tablet landscape
- 768x1024 tablet portrait
- 390x844 mobile

Accessibility checks:

- `pnpm a11y` passed.
- Axe found no serious or critical violations on `/`, `/consulting`, `/workflow`, `/repo-audit`, `/projects`, `/projects/agent-qa-harness`, `/agent-qa-checklist`, and `/contact`.
- Keyboard focus visibility test passed.

Backend/API checks:

- Not applicable. This portfolio is static-only and currently has no backend, server route, CMS, contact form handler, database, or protected API.

Limitations:

- Most project records remain honest placeholders, prototypes, or case-study directions because no real public repositories/demos were provided.
- Mailto is the only contact mechanism.
- Screenshot review is manual; there is no image-diff baseline yet.
- Lighthouse CI was not added to avoid extra tooling beyond the requested minimal harness.
- Repo audit and workflow downloads are static Markdown files; there is no gated download or analytics event.

Visual issues found/fixed in the latest pass:

- The first workflow implementation used a uniform six-card rule grid, which looked too generic. It was changed to a featured graphite rule panel plus compact supporting rules.
- The featured graphite rule panel initially inherited the shared `atlas-card` light background, creating low-contrast text in screenshots. It was fixed with an explicit graphite panel style and recaptured.
- The homepage tone leaned too hard into generic consulting language. It now leads with a concrete repo-backed technical footprint and softer build/review CTAs.
- The generated workbench image was too illustrative for the primary proof path. The homepage now uses a GitHub evidence ledger, and the Agent QA project thumbnail is generated from the actual checklist route.
- Project thumbnails were being cropped like photos, which created awkward partial text. Screenshot thumbnails now render contained.
- Contact CTAs were too cluttered on mobile. The contact card now uses one primary email CTA, one repo-audit CTA, and secondary checklist/workflow links.

## Next Agent Instructions

- Inspect `AGENTS.md` first, then `HANDOFF.md`, then `src/data/projects.ts` and `src/data/services.ts`.
- Review screenshots under `artifacts/screenshots/` before changing visual direction.
- Do not rewrite the visual system into a generic SaaS landing page. Keep the editorial engineering atlas identity.
- Do not remove status labels or inflate project maturity.
- Preserve the GitHub evidence section unless the owner asks to hide public repository references.
- Highest-impact next improvements:
  - replace placeholder project metadata with real repositories and public demos
  - add a booking link or lightweight contact form if the owner wants one
  - add screenshot diffing once the design stabilizes
  - add real project thumbnails/screenshots
  - expand case detail pages with diagrams, demo embeds, and implementation evidence
  - decide whether the repo audit should become a packaged fixed-scope offer with price, turnaround, and intake questions
