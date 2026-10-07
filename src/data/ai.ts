export const aiCapabilities = [
  { title: 'Chatbots', text: 'Conversation flows, session history, streaming responses, and a way to reach a person.' },
  { title: 'Document assistants', text: 'Document ingestion, OCR, search, source permissions, and answers with page references.' },
  { title: 'AI agents', text: 'Tools connected to APIs and databases, with permission checks, approvals, and retries.' },
  { title: 'Deployment & testing', text: 'Conversation tests, model evaluations, usage tracking, logs, and cloud deployment.' }
];

export const aiLifecycle = [
  { title: 'Define the job', text: 'Map the users, channels, decisions, knowledge sources, and tasks the assistant should support. Specify success, handoff rules, and actions requiring approval.', output: 'Use-case map · conversation flows · acceptance criteria' },
  { title: 'Prepare the knowledge', text: 'Connect approved sources, extract and normalize documents, preserve metadata and permissions, and choose retrieval methods that fit the corpus.', output: 'Ingestion pipeline · retrieval baseline · source inventory' },
  { title: 'Build the flow', text: 'Implement orchestration, prompts, structured outputs, session state, tool contracts, and integrations. Keep application logic and model decisions explicit.', output: 'Working assistant · tool schemas · integration contracts' },
  { title: 'Handle the edges', text: 'Design for missing context, ambiguous requests, provider timeouts, injection attempts, sensitive data, duplicate actions, and escalation to a human.', output: 'Failure paths · permission checks · review gates' },
  { title: 'Evaluate the system', text: 'Test realistic conversations, unsupported questions, citation accuracy, retrieval relevance, tool failures, and prompt regressions. Measure response time and usage.', output: 'Evaluation set · reproducible checks · trace review' },
  { title: 'Deploy & hand over', text: 'Document configuration, environment variables, retention, monitoring, rollback, provider changes, and operating costs. Leave a system the team can maintain.', output: 'Deployment guide · runbook · maintenance plan' }
];

export const flowPatterns = [
  {
    id: 'documents', label: 'Document assistant', title: 'Search documents and cite the answer.',
    description: 'A retrieval flow for teams asking questions across an approved document collection.',
    steps: [ ['Question', 'Resolve the user, session, and allowed collection.'], ['Retrieve', 'Rank relevant passages while preserving document and page references.'], ['Answer', 'Generate a bounded response and verify its citations.'], ['Review', 'Open the cited source or request human interpretation.'] ],
    boundary: 'If retrieval finds no supporting passage, return a missing-evidence state. Never invent a citation.',
    evidenceUrl: '/projects/geodocs-document-assistant', evidenceLabel: 'Related work: GeoDocs'
  },
  {
    id: 'operations', label: 'Operational agent', title: 'Look up a record, then run an approved action.',
    description: 'A tool-driven flow for looking up records, preparing a change, and asking for approval before an action.',
    steps: [ ['Request', 'Identify the task and collect required fields.'], ['Check', 'Validate identity, scope, and the tool arguments.'], ['Approve', 'Show the proposed action and request confirmation.'], ['Execute', 'Run the permitted action, record the result, and handle retries.'] ],
    boundary: 'An interrupted or repeated request must not create duplicate writes. Enforce permissions in the service.',
    evidenceUrl: '/projects/personal-os', evidenceLabel: 'Related work: Personal OS'
  },
  {
    id: 'intake', label: 'Intake chatbot', title: 'Collect the details and route the request.',
    description: 'A conversation pattern for collecting context, answering supported questions, and handing off a complete request.',
    steps: [ ['Understand', 'Identify the intent and ask only for missing context.'], ['Guide', 'Answer from approved information and show relevant options.'], ['Confirm', 'Let the person review the collected details.'], ['Handoff', 'Send the structured request to the intended team or workflow.'] ],
    boundary: 'Make escalation easy. A chatbot should not trap a person in repeated clarification loops.',
    evidenceUrl: '/contact', evidenceLabel: 'Discuss an intake flow'
  }
];
