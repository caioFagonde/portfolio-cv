# Personal skills and English/Portuguese release — 2026-10-07

## Completed work

The portfolio now has equivalent English and Brazilian Portuguese versions. English keeps its existing routes; Portuguese adds `/pt/` routes for all 45 pages. The header switch preserves the current page and, with JavaScript, its anchor. Both languages have complete static HTML, localized navigation, metadata, alternate-language links, project copy, dates, controls, examples, CV summaries, and checklist downloads. Developer, cloud, AI-agent, and chatbot positioning remains first; OrbProp remains the featured orbital example.

The confirmed personal skills appear in About, CV, both generated summaries, and the interactive skills map: Leadership, Management, Guitar, Piano, Portuguese/native, English/fluent, Spanish/fluent, French/intermediate. The map has 118 unique labels across 12 branches and seven filters, including Personal/Pessoal. Spoken languages are separate from programming languages. All contact links use the canonical `caionahuel@gmail.com` address. No additional proficiency or personal-strength claims were invented.

The installed `agy` CLI drafted Portuguese text from a public-text inventory. The catalog was validated and refined, including the main introduction, services, personal profile, contact, diagram labels, and technical names. This is editorial assistance, not evidence for project claims. The catalog contains 1,606 entries; the build requires 1,601 rendered strings across 45 English pages, with zero missing translations or Portuguese pages.

## Important files

- `src/data/cv.ts`, `src/data/skills.ts`, `src/components/PersonalProfile.astro`: shared personal data, profile sections, and the diagram branches.
- `src/i18n/locale.ts`, `html.ts`, `client.ts`, `pt.json`: language paths, parsed HTML localization, browser messages, and Portuguese catalog.
- `src/components/LocalizedContent.astro`, `src/layouts/BaseLayout.astro`, `src/components/SiteHeader.astro`: static localized rendering, metadata, and language switching.
- `src/pages/pt/[...path].astro`: Portuguese routes reuse canonical page components and content collections.
- `DocumentExample.astro`, `SpatialExample.astro`, `SkillsMap.astro`, `src/pages/projects/index.astro`: localized interaction messages and accent-insensitive search/retrieval.
- `scripts/export-cv-md.mjs`, `public/downloads/*.pt.md`: bilingual downloads.
- `scripts/validate-translations.mjs`, browser tests, screenshot capture, and Pages checks: coverage and runtime evidence.
- `README.md`, `HANDOFF.md`, `.gitignore`: maintenance instructions and tracked curated evidence.

Localization uses parse5 on trusted rendered HTML at build time. Code, identifiers, shared assets, and external destinations remain intact; the prose catalog is not sent to the browser. English components and data stay canonical. The implementation follows Astro's [slot rendering](https://docs.astro.build/en/reference/astro-syntax/) and [static internationalization](https://docs.astro.build/en/guides/internationalization/), with HTML parsed through [parse5](https://parse5.js.org/functions/parse5.parseFragment.html).

## Commands and results

Use Node 22.22.3 and pnpm 9.15.9. The shell's default Node 18 is unsupported.

```bash
export PATH=/home/caion/.nvm/versions/node/v22.22.3/bin:$PATH
pnpm install --frozen-lockfile
pnpm agent:verify > artifacts/reports/bilingual-verification.log 2>&1
PUBLIC_BASE_PATH=/portfolio-cv pnpm build > artifacts/reports/bilingual-pages-build.log 2>&1
PUBLIC_BASE_PATH=/portfolio-cv pnpm preview --host 127.0.0.1 --port 4322
SITE_URL=http://127.0.0.1:4322/portfolio-cv REPORT_PREFIX=bilingual-pages node scripts/verify-pages-interactions.mjs
SITE_URL=http://127.0.0.1:4322/portfolio-cv node scripts/verify-built-site.mjs
pnpm exec playwright test tests/i18n.spec.ts --project=chromium --workers=2 --reporter=list
SITE_URL=http://127.0.0.1:4322/portfolio-cv pnpm screenshots
python3 scripts/create-review-sheets.py
node artifacts/reports/capture-profile-sections.mjs
git diff --check
```

`pnpm agent:verify` ran lint, typecheck, test, build, e2e, a11y, and screenshots. All passed: 50 browser tests, 70 accessibility checks, zero Astro errors/warnings/hints, 340 full-page captures, and 23 interaction states. Lint/test are the repository's content validator. Axe found no serious or critical violations. Browser checks cover keyboard focus, menu/Escape, no-JavaScript content, language switching, real destinations, skill counts and empty states, accent-insensitive search, galleries/focus restoration, localized architecture details, document citations, missing evidence, spatial controls, downloads, and responsive reflow.

The production-prefix build produced 90 pages. A Chromium crawl opened all 90 and verified 319 internal destinations with zero failures, including fragments and images. The Pages interaction script passed 12 checks with zero failures, including axe checks on affected states. Translation validation found zero missing strings or pages. After the visual review corrected Make/Just, the production build, 13 focused language tests, production interactions, full crawl, and screenshot matrix were repeated. Production previews and crawls follow the build; do not rebuild concurrently with those checks.

Machine-readable evidence: `artifacts/reports/{e2e-report.json,a11y-report.json,translation-coverage.json,screenshots-manifest.json,bilingual-pages-interactions.json,built-site-verification.json,portuguese-profile-sections.json}`. Logs include `bilingual-verification.log`, `bilingual-i18n-final.log`, `bilingual-pages-build.log`, `bilingual-pages-interactions.log`, `bilingual-pages-crawl.log`, and `bilingual-screenshots-final.log`.

## Screenshots and manual review

Captured all five required viewports: 1440×900 desktop, 1280×720 laptop, 1024×768 tablet landscape, 768×1024 tablet portrait, and 390×844 mobile. Reflow tests additionally exercised 320px. The matrix contains 68 routes in both languages and includes home, consulting, workflow, repo audit, projects, Agent QA detail, checklist, demos, contact, skills, About, CV, AI systems, all project details, and selected research/cases.

Files are under `artifacts/screenshots/`; `screenshots-manifest.json` enumerates exact routes, dimensions, and paths. Examples:

- `home-{desktop,laptop,tablet-landscape,tablet-portrait,mobile}.png` and `pt-home-*.png`.
- `skills-*.png`, `pt-skills-*.png`, `personal-pt-{skills,about,cv}-*.png`.
- `pt-project-orbprop-*.png`, `pt-project-agent-qa-harness-*.png`, `pt-consulting-*.png`, `pt-workflow-*.png`, `pt-repo-audit-*.png`, `pt-agent-qa-checklist-*.png`, `pt-demos-*.png`, `pt-contact-*.png`.
- Portuguese interaction captures: `pt-{mobile-menu-open,retrieval-missing-mobile,gallery-mobile,ai-operational-flow,spatial-filter-desktop,cloud-detail-mobile,skills-search-empty,project-filter-empty,skills-personal-desktop,skills-personal-mobile}.png`.

Manual review covered the five bilingual home/skills comparison sheets, all 12 full Portuguese desktop sheets, selected full Portuguese mobile sheets (1–4, 11–12), required-route mobile crops, all ten Portuguese interaction states, and personal profile/map sections at all five sizes. Earlier English personal sections were also reviewed across all five sizes. Review sheets and crops remain in `artifacts/reports/`; focused section screenshots hide the sticky header only during element capture to avoid a screenshot overlay artifact. The full screenshot matrix was captured and checked automatically; not every full-page image was individually inspected.

Issues found and fixed: Portuguese headline overflow at 320px; translated labels too long for fixed SVG boxes; crowded language/navigation controls; ambiguous programming-versus-spoken-language categories; literal copy in core service descriptions; Make/Just accidentally translated as ordinary words. Final reviewed layouts have clear headings, readable contrast, working CTA destinations, responsive profile sections, and visible focused controls. No new decorative gradients, fake dashboards, or invented maturity claims were added.

## Limitations and maintenance handoff

Static-only portfolio: backend/API verification is not applicable. Browser examples use local sample data; no model requests or original project backends were exercised. Original project screenshots, technical identifiers, product names, code snippets, external destinations, and the existing RSS feed retain their original language. Scientific validation was not rerun. Translation coverage verifies completeness; it is not an independent linguistic review of every paragraph.

Mentoring, technical communication, and project planning are reasonable additional profile suggestions, but this pass adds only user-confirmed personal skills. Unused historical assets were preserved outside the commit. Generated screenshots/logs stay local; this curated report is tracked.

Next agent: read the first section of `HANDOFF.md`. Update canonical data and the exact normalized translation keys together; maintain browser messages and both download versions. Add new static routes to the Portuguese dispatcher. Preserve the canonical email, OrbProp emphasis, original media provenance, programming/spoken-language separation, and user-confirmed levels. Run `pnpm agent:verify`, the production-prefix build/crawl/interaction checks, and screenshot review after UI changes. Verify the matching GitHub Actions run and live routes after publication.
