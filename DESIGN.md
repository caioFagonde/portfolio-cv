# DESIGN.md — Systems Atlas Visual System

## Design thesis

The site should feel like a warm technical study: a library table, a flight dynamics notebook, a field map, a quiet instrument panel. It should be cozy, curious, rigorous, and ambitious without becoming theatrical.

## Impeccable-style operating rules

- Respect the design system before inventing new visuals.
- Typography, spacing, contrast, and hierarchy come before effects.
- Brand work and product UI are different registers; this site is an editorial research atlas with a few interactive instruments.
- Remove AI slop tells before shipping.
- Prefer restraint over decoration.

## Palette

Use mostly two colors:

1. **Warm paper** — background and quiet surfaces.
2. **Deep ink / espresso** — text, borders, structural lines.

Use one restrained accent:

3. **Copper** — links, active states, small markers, measurement lines.

Tokens:

```css
--paper: #fffaf0;
--paper-soft: #f7eddc;
--paper-line: #ead8bd;
--ink: #1a1410;
--ink-muted: #5d4c3f;
--copper: #b86f3f;
```

## Anti-slop rules

Do not use:

- purple/blue gradient hero text;
- glass cards with heavy blur;
- random glowing orbs;
- excessive rounded corners;
- generic AI claims;
- “unlock”, “supercharge”, “revolutionize”, “seamless”, “AI-powered” as filler;
- fake metrics;
- fake production status;
- hover motion that makes reading worse.

## Layout principles

- Wide margins.
- Strong vertical rhythm.
- Dense but breathable technical cards.
- Serif for editorial authority.
- Sans for navigation and body clarity.
- Mono only for labels, metadata, and telemetry.
- Interactive WebGL is subordinate to content.
- Mobile is editorial-first; WebGL becomes a quiet header, not a broken toy.

## Motion

- Slow orbital drift.
- No bouncing.
- No aggressive parallax.
- Respect `prefers-reduced-motion`.
- Motion must encode relationships: domains, orbit paths, case links, research dependencies.

## October 2026 portfolio refresh

The refreshed implementation keeps the editorial Systems Atlas identity while giving AI systems and consulting a clearer place. Current tokens in `src/styles/tokens.css` and `tailwind.config.mjs` are authoritative: paper `#f7f5ef`, ink `#191714`, olive `#56664f` for primary actions, graphite `#252521` for structural contrast, and restrained copper for metadata. The page width is 1200px with 40px mobile gutters in total.

- Homepage order: concise introduction → selected work → AI scope → real scientific figure → services → public code → case archive.
- Larger narrative headings use serif type; paragraphs/navigation use system sans; metadata uses mono. No font CDN.
- Projects use a searchable list with visible status. The GitHub archive remains separate from recent local implementation.
- The AI architecture explorer uses native buttons and renders every pattern without JavaScript. It runs no model or external action.
- Mobile navigation supports touch, Escape, visible focus, active routes, and a no-JavaScript fallback.
- Development toolbar overlays are disabled to keep screenshot evidence representative.
- Avoid huge wrapping hero statements, tiny uppercase CTA labels, identical cards for every section, and status text styled as a clickable action.

Research references and rationale: `artifacts/reports/design-research.md`. Browser evidence: `artifacts/reports/screenshots-manifest.json` and `artifacts/screenshots/`.


## Current direction: development and interactive skills

This section supersedes the earlier homepage order and public-status presentation. The current order is introduction → skill diagram → selected software/AI projects → AI development → services → public code → secondary science feature → case archive. Primary categories are software, cloud, agents, and chatbots. Scientific imagery is an extra, never the leading sales signal.

The skill diagram uses actual HTML headings, lists, filter buttons, a labeled search input, live result counts, and SVG connector lines. It reflows from three columns to two and then one; filtered single/two-area results are centered. No hover is required. All catalog content remains present without JavaScript. Serif headings and the paper/olive palette carry the visual identity; no glowing nodes or animated background.

Public copy describes the work directly. Internal status, confidence, provenance review dates, and next-step checklists are omitted from project presentation at the user's request. Actual feature, release, and hosting claims still require evidence. Only working destinations appear as demo links.
