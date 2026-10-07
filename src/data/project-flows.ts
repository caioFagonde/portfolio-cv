// Labels describe the architecture; project records hold the engineering detail.
export const projectFlows: Record<string, string[]> = {
  'geodocs-document-assistant': ['Source pages', 'Retrieve passages', 'Check citations', 'Human review'],
  'hasselt-infill-atlas': ['Spatial sources', 'PostGIS layers', 'Map & radius lens', 'Parcel dossier'],
  'relasp': ['Metric & state', 'Rust integrator', 'Reference solver', 'Scientific figures'],
  'personal-os': ['Device workspace', 'Append-only sync', 'Command approval', 'Module services'],
  'resurgent-library': ['Series & jets', 'Arithmetic kernels', 'Continuation', 'Python interface'],
  'public-source-ingestion': ['Public sources', 'Connector workers', 'Normalize records', 'Provenance & storage'],
  'document-report-automation': ['Template & data', 'Resolve fields', 'Preserve formatting', 'Review document'],
  'agent-qa-harness': ['Application routes', 'Browser checks', 'Viewport captures', 'Accessibility report'],
  'agentic-cortex': ['User request', 'Retrieve evidence', 'Guarded tools', 'Answer & audit trail'],
  'foundry-platform': ['Web & mobile', 'Typed API contracts', 'Workers & storage', 'Reports & assistants'],
  'orbit-trajectory-propagator': ['Mission setup', 'Force models', 'C++ propagation', '3D views & exports'],
  'lidar-webgl-client': ['Point-cloud tiles', 'Object storage', 'Level of detail', 'Browser renderer'],
  'visual-metrology-studio': ['Image & scale', 'Edges & masks', 'Measurements', 'Annotated report'],
  'godot-simulation-experiments': ['Input controls', 'Simulation state', 'Scene rendering', 'Runtime feedback'],
  'rgm-compression': ['Geometry field', 'Encode & decode', 'Structural metrics', 'Comparison report']
};
