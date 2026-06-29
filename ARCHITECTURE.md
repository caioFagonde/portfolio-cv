# Architecture

The site is static-first. Most pages are rendered by Astro from typed MDX content collections. Interactive pieces are isolated as React islands.

## Content flow

MDX frontmatter → Astro content collections → index pages/case routes → static HTML.

## Interaction flow

Only the homepage atlas uses React Three Fiber. It loads client-side and has a mobile/reduced-motion fallback.

## Design guardrails

See `DESIGN.md`. The site prefers quiet hierarchy, restrained color, and honest status labels over decorative effects.
