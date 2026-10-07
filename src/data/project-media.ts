export type ProjectImage = { src: string; alt: string; caption: string; width: number; height: number };
const hub: ProjectImage = { src: '/assets/foundry-hub.webp', alt: 'Foundry application hub with modules connected to the core', caption: 'Foundry application hub — shared access to the platform modules.', width: 1920, height: 1083 };
const flows: ProjectImage = { src: '/assets/geodocs-flows.webp', alt: 'GeoDocs flow catalog, processing steps, and document intake form', caption: 'GeoDocs — a document flow, its inputs, processing steps, and outputs. Sample spreadsheet selected.', width: 1440, height: 900 };
const review: ProjectImage = { src: '/assets/geodocs-review.webp', alt: 'GeoDocs execution timeline with generated files awaiting human review', caption: 'GeoDocs — processing timeline and generated artifacts at the human review step. Example records.', width: 1440, height: 900 };
const artifacts: ProjectImage = { src: '/assets/geodocs-artifacts.webp', alt: 'Completed GeoDocs sample flow with spreadsheet, report, and email artifacts', caption: 'GeoDocs — the sample flow produces a spreadsheet, report, dashboard data, and an email draft.', width: 1440, height: 900 };
const mobile: ProjectImage = { src: '/assets/geodocs-mobile.webp', alt: 'GeoDocs document flow reflowed into a narrow mobile viewport', caption: 'The same GeoDocs flow on mobile.', width: 390, height: 844 };
export const projectMedia: Record<string, ProjectImage[]> = {
  'foundry-platform': [hub, flows, review],
  'geodocs-document-assistant': [flows, review, mobile],
  'document-report-automation': [artifacts, flows],
  'orbit-trajectory-propagator': [{ src: '/assets/orbprop-workbench.webp', alt: 'OrbProp desktop workbench showing Earth, a spacecraft path, and the timeline', caption: 'OrbProp — desktop mission configuration, 3D orbit view, and timeline.', width: 1440, height: 900 }],
  'agent-qa-harness': [{ src: '/assets/agent-qa.webp', alt: 'The Agent QA checklist in the portfolio browser capture', caption: 'The Agent QA checklist, captured in the browser by the verification workflow.', width: 1440, height: 900 }]
};
