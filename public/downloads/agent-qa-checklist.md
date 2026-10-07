# Agent QA Checklist

Use this checklist when Claude Code, Codex, or another coding agent changes a real repository.

## Before Coding

- Read the repository structure, framework, routes, styling system, package manager, scripts, deployment assumptions, and current worktree state.
- Preserve existing content and user work.
- Identify affected routes, runtime states, and verification commands.
- Keep scope explicit before making edits.

## Implementation

- Prefer existing framework, data, styling, and component patterns.
- Keep interfaces small and states explicit.
- Use typed data or structured content when the UI is content-driven.
- Avoid vague copy, inflated claims, fake metrics, and generic AI-looking UI.
- Do not leave broken placeholder links. Mark unavailable demos honestly.

## Runtime Verification

- Start the app locally or use the repo's e2e/screenshot scripts.
- Open affected routes in a real browser.
- Verify navigation, CTAs, image loading, responsive layout, and unavailable states.
- Check long content, small content, missing media, and mobile navigation when relevant.

## Screenshot Review

Capture and inspect:

- 1440x900 desktop
- 1280x720 laptop
- 1024x768 tablet landscape
- 768x1024 tablet portrait
- 390x844 mobile

Review for:

- spacing and hierarchy
- text wrapping and clipping
- contrast
- focus visibility
- CTA priority
- mobile layout quality
- generic AI UI tells
- empty/error/unavailable states

## Accessibility

- Run axe or the repo's accessibility script where available.
- Check semantic page structure.
- Check heading order.
- Check meaningful link text.
- Check visible keyboard focus.
- Avoid noisy ARIA when HTML semantics are enough.

## Backend/API

If a backend exists:

- Use development/test credentials only.
- Verify success, empty, invalid-input, unauthorized, and failure cases.
- Check logs.
- Document endpoints, payloads, and evidence.

If no backend exists, state that backend/API checks are not applicable.

## Handoff

Report:

- files changed
- commands run
- screenshots captured and reviewed
- viewports checked
- issues found and fixed
- accessibility results
- backend/API result or static-only note
- known limitations
- next-agent instructions

## Definition of Done

The task is complete only when the app runs, affected routes were opened, screenshots were captured and reviewed, visible defects were fixed, applicable checks passed, backend/API checks were handled or documented as not applicable, and the handoff contains evidence.
