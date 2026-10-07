# AGENTS.md

This repository is a static-first Astro portfolio and consulting site. Treat it as a professional/business website, not a playground for generic landing-page patterns.

## No-Blind-Coding Rules

- Inspect the repository structure, content model, routes, styling system, package manager, scripts, and current git status before editing.
- Preserve existing content and user work. Do not revert unrelated changes.
- Prefer existing Astro, MDX, TypeScript data, Tailwind, and CSS token patterns before adding abstractions.
- Do not invent clients, credentials, testimonials, production metrics, or shipped status.
- If UI/runtime behavior changes, run the app and inspect it in a browser before handoff.
- Do not stop at compilation. Completion requires evidence.

## UI Runtime Verification

For any UI/content/routing change:

1. Start the site locally with `pnpm dev` or use the screenshot/e2e scripts.
2. Open affected routes in a real browser.
3. Verify navigation, CTA hierarchy, responsive layout, image loading, unavailable-demo states, and focus states.
4. Capture screenshots for meaningful routes.
5. Inspect screenshots manually and fix visible defects before final handoff.

## Screenshot Requirements

Use:

```bash
pnpm screenshots
```

Screenshots must be written to:

```text
artifacts/screenshots/
```

Reports must be written to:

```text
artifacts/reports/
```

Minimum route coverage:

- `/`
- `/consulting`
- `/workflow`
- `/repo-audit`
- `/projects`
- one project detail route, currently `/projects/agent-qa-harness`
- `/agent-qa-checklist`
- `/demos` or `/lab`
- `/contact`

## Viewport Matrix

Capture and review:

- 1440x900 desktop
- 1280x720 laptop
- 1024x768 tablet landscape
- 768x1024 tablet portrait
- 390x844 mobile

## Visual Review Checklist

Review screenshots for:

- clear typographic hierarchy
- intentional vertical rhythm
- coherent spacing scale
- strong contrast and readable text
- no overlapping UI or clipped text
- mobile-first navigation and CTA access
- no weak gray-on-gray sections
- no generic AI SaaS tells
- no purple/blue gradient hero treatment
- no random glow blobs, bokeh, or glassmorphism
- no endless identical card grids
- clear distinction between featured work, case studies, demos, and WIP
- honest status labels for unavailable demos and concepts

## No-AI-Tells Rubric

Avoid:

- vague claims such as "unlock potential", "seamless experiences", "cutting-edge solutions", or "transform your business"
- fake SaaS dashboards
- excessive rounded cards
- generic neon/glass/purple gradients
- placeholder CTAs with no destination
- stock-photo compositions that do not match the actual work
- inflated project maturity

Prefer:

- specific engineering language
- concrete deliverables
- status and confidence labels
- browser/runtime evidence
- restrained visual density
- project metadata that explains what the work demonstrates

## Accessibility Requirements

At minimum run:

```bash
pnpm a11y
```

Verify:

- semantic page structure
- meaningful link text
- visible keyboard focus
- sensible heading order
- no serious or critical axe violations
- controls have accessible labels
- no unnecessary ARIA where semantic HTML is enough

## Backend/API Verification

This site is currently static-only. Backend/API checks are not applicable unless a future contact form, CMS, server route, project API, database, or authenticated service is added.

If backend/API behavior is added:

- use development/test credentials only
- run the backend locally
- verify success, empty, invalid-input, unauthorized, and failure cases
- inspect logs
- document endpoints, payloads, and evidence
- never use production credentials

## Verification Commands

Use the highest applicable set:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm e2e
pnpm a11y
pnpm screenshots
pnpm agent:verify
```

If a command cannot run, document the exact blocker and what was checked instead.

## Completion Report Format

Final handoff must include:

- summary of completed work
- important files changed
- exact commands run
- screenshot paths captured and reviewed
- viewport sizes checked
- UI/UX issues found and fixed
- accessibility checks and results
- backend/API checks or static-only note
- known limitations
- next-agent instructions and handoff pointer

## Definition of Done

Work is complete only when:

- the app runs locally
- affected pages were opened in a browser
- screenshots were captured and inspected
- desktop, laptop, tablet, and mobile layouts were checked
- visible layout defects were fixed
- navigation works
- CTAs are clear
- consulting positioning is present when relevant
- project/demo hosting structure remains intact
- copy is specific and non-generic
- lint/typecheck/tests pass where available
- accessibility checks run where practical
- backend/API checks are handled or documented as not applicable
- `HANDOFF.md` is updated when the change affects architecture, workflow, or verification

## Handoff Requirements

Before ending a substantial pass:

- update `HANDOFF.md`
- leave generated evidence under `artifacts/`
- identify weak areas honestly
- do not claim visual quality without screenshot review
- do not hide skipped checks

## MCP Setup

This repo includes `.mcp.json` with local MCP servers for filesystem access, Playwright browser automation, Context7 documentation lookup, GitHub API access, memory, and sequential thinking. The GitHub server requires `GITHUB_PERSONAL_ACCESS_TOKEN` in the environment. Do not commit secrets.

Do not add MCP servers by guessing package names. If adding another server, verify the package and document any required environment variables.
