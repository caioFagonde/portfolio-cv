# Repo Audit Checklist

Use this checklist to prepare a repository for a focused audit around AI-assisted delivery, runtime quality, verification coverage, and implementation leverage.

## Context To Provide

- Repository URL or archive.
- Framework and package manager.
- Development command and build command.
- Deployment target.
- Important routes, screens, jobs, or workflows.
- Backend/API surface if any.
- Auth, database, queue, storage, or external service dependencies if any.
- Current tests, CI checks, and known failures.
- AI tools currently in use.
- Timeline, decision the audit should support, and data sensitivity.

## Audit Areas

### Repository Shape

- Framework, scripts, route map, deployment path.
- Dirty worktree and generated-output boundaries.
- Agent instructions and handoff quality.

Expected output: repo map with ownership and risk notes.

### Runtime Behavior

- Can the app run locally?
- Which routes and workflows matter?
- What breaks on mobile, empty states, long content, and unavailable demos?

Expected output: browser evidence, screenshots, and defect list.

### Frontend Quality

- Hierarchy, spacing, wrapping, contrast, and focus states.
- Responsive behavior at component level.
- Anti-pattern scan for generic AI UI tells.

Expected output: visual QA findings with prioritized fixes.

### Backend/API Readiness

- Validation, auth boundaries, error paths, and observability.
- Success, empty, invalid, unauthorized, and failure cases where applicable.
- Development credentials only.

Expected output: endpoint and failure-mode review.

### Testing And Automation

- Lint, typecheck, unit/integration/e2e coverage.
- Screenshot and accessibility coverage.
- CI gates and local verification ergonomics.

Expected output: verification matrix and missing-gate plan.

### AI-Agent Readiness

- Repo-level instructions.
- No-blind-coding rules.
- Fixture and script discoverability.
- Completion report and evidence requirements.

Expected output: agent-readiness checklist and remediation plan.

## Not Included Unless Scoped Separately

- Formal security audit.
- Compliance or regulatory review.
- Penetration testing.
- Production incident response.
- Full rewrite plan before risks are mapped.
