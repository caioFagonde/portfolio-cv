# AI system planning checklist

By Caio Nahuel — https://caiofagonde.github.io/portfolio-cv/ai-systems

## Task and conversation
- Who uses the assistant, on which channel, and for which specific tasks?
- Provide example conversations, expected outcomes, and out-of-scope requests.
- Specify required context, session lifetime, and escalation to a person.

## Knowledge and retrieval
- Inventory approved sources, formats, ownership, freshness, and permissions.
- Define ingestion, OCR, chunking, metadata, indexing, and retrieval strategy.
- Preserve citations to original documents and pages.
- Define behavior for no evidence, contradictory sources, and stale knowledge.

## Tools and workflows
- List integrations, tool schemas, service permissions, and validation rules.
- Separate read-only lookups from mutations requiring approval.
- Specify state transitions, retries, idempotency, timeouts, and recovery.
- Define structured outputs and human review requirements.

## Evaluation
- Build representative conversations and retrieval questions with expected evidence.
- Test ambiguous questions, unsupported answers, malicious inputs, permission failures,
  provider failures, invalid tool output, and duplicate actions.
- Check citation accuracy and review traces.
- Establish response-time and usage budgets; avoid unsupported quality claims.

## Operations and handoff
- Document environment variables without storing credentials.
- Define retention, sensitive-data handling, monitoring, and incident response.
- Version prompts and tools; document rollback and provider changes.
- Leave configuration, commands, evaluation fixtures, and a maintenance runbook.
