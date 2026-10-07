export type ConsultingService = {
  title: string;
  slug: string;
  summary: string;
  problem: string;
  whatIDo: string[];
  deliverables: string[];
  outcome: string;
  cta: string;
  detailUrl?: string;
};

export const consultingServices: ConsultingService[] = [
  {
    title: 'AI Agents & Chatbots', slug: 'ai-flows-chatbots-agents',
    summary: 'Document assistants, support chatbots, and agents connected to your APIs and databases.',
    problem: 'Give people a way to ask questions, find information, or carry out a task inside your application.',
    whatIDo: ['Design the conversation, session state, and handoff to a person.', 'Build document ingestion, OCR, search, and page references.', 'Connect model calls to application tools, permissions, and APIs.', 'Test conversations and tool calls, then deploy and monitor the assistant.'],
    deliverables: ['assistant interface', 'retrieval pipeline', 'API integrations', 'conversation tests', 'deployment configuration'],
    outcome: 'An assistant integrated with the software and data your team uses.',
    cta: 'Explore AI development', detailUrl: '/ai-systems'
  },
  {
    title: 'Full-Stack Development', slug: 'full-stack-product-implementation',
    summary: 'Web applications, backend services, databases, and integrations.',
    problem: 'Build a new application or extend an existing product across the frontend and backend.',
    whatIDo: ['Develop interfaces with Vue, React, TypeScript, or the stack already in place.', 'Build APIs and services with Python, Laravel, .NET, Go, or Rust.', 'Design data models, authentication, and database access.', 'Test the main flows and prepare the application for deployment.'],
    deliverables: ['application features', 'API endpoints', 'database migrations', 'tests', 'technical documentation'],
    outcome: 'Application code that your team can run and maintain.', cta: 'Discuss a build'
  },
  {
    title: 'Cloud Infrastructure', slug: 'cloud-infrastructure',
    summary: 'Containers, cloud environments, storage, workers, and deployment automation.',
    problem: 'Set up the environment an application needs, or improve an existing deployment.',
    whatIDo: ['Configure Docker services and development, staging, and deployment environments.', 'Manage AWS/Azure infrastructure with Terraform.', 'Connect PostgreSQL, object storage, queues, and background workers.', 'Set up CI/CD, health checks, logs, backups, and rollback procedures.'],
    deliverables: ['infrastructure configuration', 'deployment pipeline', 'service monitoring', 'backup procedures', 'operations documentation'],
    outcome: 'A documented environment with repeatable deployments.', cta: 'Discuss infrastructure'
  },
  {
    title: 'AI Development Workflows', slug: 'ai-engineering-workflow-setup',
    summary: 'Claude Code and Codex workflows, repository instructions, and automated QA.',
    problem: 'Make coding agents useful in your repository without making reviews harder.',
    whatIDo: ['Write repository instructions and define the commands agents should run.', 'Set up Playwright browser checks and screenshots.', 'Connect tests, type checks, and accessibility checks to CI.', 'Document the review and handoff process for the team.'],
    deliverables: ['repository instructions', 'browser checks', 'CI configuration', 'review checklist'],
    outcome: 'A development workflow that includes agents and checks their changes.',
    cta: 'See the workflow', detailUrl: '/workflow'
  },
  {
    title: 'Developer Tools & Automation', slug: 'developer-tooling-and-automation',
    summary: 'Internal apps, CLI tools, data pipelines, reports, and repetitive-task automation.',
    problem: 'Replace manual steps in the work your team repeats every day.',
    whatIDo: ['Build scripts, CLIs, and internal web tools.', 'Automate imports, exports, reports, and release tasks.', 'Connect existing tools through APIs and file formats.', 'Add logging and tests so failures are easy to diagnose.'],
    deliverables: ['automation code', 'internal tools', 'generated reports', 'usage documentation'],
    outcome: 'Repeatable tasks with fewer manual steps.', cta: 'Discuss an automation'
  },
  {
    title: 'Architecture & Code Review', slug: 'architecture-codebase-audit',
    summary: 'A review of your architecture, important flows, tests, and deployment.',
    problem: 'Understand an existing codebase before extending it or deciding what to fix.',
    whatIDo: ['Trace the main application flows and service dependencies.', 'Run the application and inspect the frontend and API behavior.', 'Review tests, permissions, dependency risks, and deployment configuration.', 'Prioritize fixes and explain the tradeoffs.'],
    deliverables: ['codebase review', 'prioritized findings', 'recommended fixes', 'test recommendations'],
    outcome: 'A practical plan for the next round of development.',
    cta: 'See the review scope', detailUrl: '/repo-audit'
  },
  {
    title: 'Technical Coaching', slug: 'technical-coaching-tutoring',
    summary: 'Code review, architecture discussions, debugging, and AI development tools.',
    problem: 'Work through a technical problem or develop a skill using your own code.',
    whatIDo: ['Review code and architecture decisions together.', 'Debug application, service, and deployment issues.', 'Practice using coding agents with tests and review.', 'Explain implementation choices and suggest exercises.'],
    deliverables: ['session notes', 'code review', 'practice exercises'],
    outcome: 'A clearer understanding of the code and decisions involved.', cta: 'Email about coaching'
  }
];
