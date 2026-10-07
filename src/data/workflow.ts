export type WorkflowStage = {
  title: string;
  purpose: string;
  practices: string[];
  artifact: string;
};

export type EngineeringRule = {
  title: string;
  rule: string;
  why: string;
};

export type AuditArea = {
  title: string;
  checks: string[];
  output: string;
};

export const engineeringRules: EngineeringRule[] = [
  {
    title: 'Keep the interface small',
    rule: 'Reduce the number of concepts a maintainer has to hold at once.',
    why: 'Small interfaces are easier to test, review, document, and hand to an AI coding agent without losing control.'
  },
  {
    title: 'Make states explicit',
    rule: 'Represent status, maturity, failure modes, and unavailable paths directly in data and UI.',
    why: 'Hidden state is where fragile systems, inflated portfolios, and misleading demos usually start.'
  },
  {
    title: 'Prefer fast feedback loops',
    rule: 'Run the app, open the browser, capture screenshots, and check the smallest useful slice before expanding scope.',
    why: 'A short loop catches defects while the implementation is still cheap to change.'
  },
  {
    title: 'Use boring contracts',
    rule: 'Favor typed registries, simple routes, clear scripts, and explicit handoff documents over clever glue.',
    why: 'Boring contracts survive maintenance, onboarding, agent handoff, and production pressure.'
  },
  {
    title: 'Treat evidence as output',
    rule: 'A task is not complete until the evidence is inspectable: commands, screenshots, reports, logs, or test output.',
    why: 'Evidence turns taste and confidence into something another engineer can review.'
  },
  {
    title: 'Improve the system around the code',
    rule: 'When code changes, update the workflow: docs, scripts, validation, screenshot coverage, and next-step notes.',
    why: 'The best implementation leaves the next implementation easier, safer, and more legible.'
  }
];

export const workflowStages: WorkflowStage[] = [
  {
    title: 'Frame',
    purpose: 'Define the real system boundary before writing code.',
    practices: ['Clarify users, constraints, data sensitivity, deployment assumptions, and definition of done.', 'Identify what can be static, what needs runtime behavior, and what should remain out of scope.'],
    artifact: 'Problem brief and scope notes'
  },
  {
    title: 'Shape',
    purpose: 'Design the smallest useful vertical slice.',
    practices: ['Choose data structures, route boundaries, component patterns, and verification checks.', 'Prefer typed registries and explicit status fields when content drives the UI.'],
    artifact: 'Implementation map and acceptance checks'
  },
  {
    title: 'Implement',
    purpose: 'Build in the style of the existing repo.',
    practices: ['Use established framework conventions before inventing abstractions.', 'Keep edits close to the requested behavior and avoid unrelated churn.'],
    artifact: 'Working code and updated content'
  },
  {
    title: 'Verify',
    purpose: 'Prove the system works beyond compilation.',
    practices: ['Run lint, typecheck, tests, build, e2e, accessibility, and screenshots where applicable.', 'Inspect desktop, laptop, tablet, and mobile captures manually.'],
    artifact: 'Verification reports and screenshots'
  },
  {
    title: 'Handoff',
    purpose: 'Make the next change easier.',
    practices: ['Document commands, files changed, visual issues found, limitations, and next-agent instructions.', 'Leave no skipped check undocumented.'],
    artifact: 'Handoff report and next-step list'
  }
];

export const auditAreas: AuditArea[] = [
  {
    title: 'Repository shape',
    checks: ['Framework, package manager, scripts, route map, deployment path', 'Dirty worktree and generated-output boundaries', 'Agent instructions and handoff quality'],
    output: 'Repo map with ownership and risk notes'
  },
  {
    title: 'Runtime behavior',
    checks: ['Can the app run locally?', 'Which routes and workflows matter?', 'What breaks on mobile, empty states, long content, and unavailable demos?'],
    output: 'Browser evidence, screenshots, and defect list'
  },
  {
    title: 'Frontend quality',
    checks: ['Hierarchy, spacing, wrapping, contrast, focus states', 'Responsive behavior at component level', 'Anti-pattern scan for generic AI UI tells'],
    output: 'Visual QA findings with prioritized fixes'
  },
  {
    title: 'Backend/API readiness',
    checks: ['Validation, auth boundaries, error paths, observability', 'Success, empty, invalid, unauthorized, and failure cases where applicable', 'Development credentials only'],
    output: 'Endpoint and failure-mode review'
  },
  {
    title: 'Testing and automation',
    checks: ['Lint, typecheck, unit/integration/e2e coverage', 'Screenshot and accessibility coverage', 'CI gates and local verification ergonomics'],
    output: 'Verification matrix and missing-gate plan'
  },
  {
    title: 'AI-agent readiness',
    checks: ['Repo-level instructions', 'No-blind-coding rules', 'Fixture and script discoverability', 'Completion report and evidence requirements'],
    output: 'Agent-readiness checklist and remediation plan'
  }
];
