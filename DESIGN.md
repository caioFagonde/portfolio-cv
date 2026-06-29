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
