export type FlowStage = 'simulation' | 'spatial' | 'vision' | 'agents' | 'platform';

export type Domain = {
  id: string;
  title: string;
  short: string;
  description: string;
  orbit: number;
  angle: number;
  focus: string;
  stack: string[];
  stages: FlowStage[];
  related: string[];
};

export const domains: Domain[] = [
  {
    id: 'aerospace-systems',
    title: 'Aerospace systems',
    short: 'Flight, orbit, simulation',
    description: 'Orbit propagation, systems design, control theory, mission analysis, and high-integrity numerical simulation.',
    focus: 'Flight dynamics, orbital mechanics, controls, and mission architecture.',
    stack: ['C++', 'MATLAB', 'Fortran', 'Control theory', 'Orbit propagation'],
    stages: ['simulation', 'platform'],
    related: ['numerical-methods', 'systems-infrastructure'],
    orbit: 4.5,
    angle: 0.1
  },
  {
    id: 'numerical-methods',
    title: 'Numerical methods',
    short: 'Solvers and models',
    description: 'C++, MATLAB, Fortran, finite differences, adaptive integration, nonlinear systems, and scientific-computing infrastructure.',
    focus: 'Robust computation, discretization, optimization, and scientific software.',
    stack: ['ODE/PDE solvers', 'Optimization', 'Scientific computing', 'Numerical linear algebra', 'Julia / Python'],
    stages: ['simulation', 'platform'],
    related: ['aerospace-systems', 'compression', 'structural-defect-analysis'],
    orbit: 5.4,
    angle: 1.15
  },
  {
    id: 'geospatial-intelligence',
    title: 'Geospatial intelligence',
    short: 'Earth data systems',
    description: 'Remote sensing, PostGIS, STAC, COG, Zarr, change detection, spatial hierarchy modeling, and data pipelines.',
    focus: 'Earth observation pipelines, change detection, and spatial decision systems.',
    stack: ['PostGIS', 'STAC', 'COG / Zarr', 'Raster analytics', 'Remote sensing ML'],
    stages: ['spatial', 'vision', 'platform'],
    related: ['computer-vision', 'agentic-systems', 'systems-infrastructure'],
    orbit: 6.2,
    angle: 2.2
  },
  {
    id: 'computer-vision',
    title: 'Computer vision',
    short: 'Seeing, tracking, measuring',
    description: 'Object detection, segmentation, tracking, depth estimation, metrology, and visual evidence systems.',
    focus: 'Perception systems that measure, segment, reconstruct, and track.',
    stack: ['Detection', 'Segmentation', 'Tracking', 'Depth / 3D', 'Visual metrology'],
    stages: ['vision', 'agents', 'platform'],
    related: ['geospatial-intelligence', 'agentic-systems', 'structural-defect-analysis'],
    orbit: 7.1,
    angle: 3.05
  },
  {
    id: 'agentic-systems',
    title: 'Agentic systems',
    short: 'RAG, tools, memory',
    description: 'Specialist agents over documents, SQL, PostGIS, code, artifacts, and governed tool execution.',
    focus: 'Specialist software agents that reason over enterprise tools and evidence.',
    stack: ['RAG', 'Tooling', 'SQL / PostGIS agents', 'Memory systems', 'Evaluations'],
    stages: ['agents', 'platform'],
    related: ['geospatial-intelligence', 'computer-vision', 'systems-infrastructure'],
    orbit: 5.9,
    angle: 4.1
  },
  {
    id: 'systems-infrastructure',
    title: 'Systems infrastructure',
    short: 'Secure runtime',
    description: 'Containers, sandboxes, worker systems, observability, artifact registries, deployment and on-prem/cloud operations.',
    focus: 'The operational backbone: storage, workers, secure execution, and deployment.',
    stack: ['Docker / K8s', 'S3 / MinIO', 'Observability', 'Workers', 'Secure runtimes'],
    stages: ['platform'],
    related: ['agentic-systems', 'aerospace-systems', 'geospatial-intelligence'],
    orbit: 7.8,
    angle: 5.25
  },
  {
    id: 'compression',
    title: 'Geometry compression',
    short: 'Preserve structure',
    description: 'Geometry-field compression, residuals, masks, depth maps, topology metrics, and measurement-preserving codecs.',
    focus: 'Structure-preserving representations and codecs for geometry and evidence.',
    stack: ['Codecs', 'Residuals', 'Wavelets', 'Topological metrics', 'Depth / mask compression'],
    stages: ['simulation', 'vision', 'platform'],
    related: ['numerical-methods', 'computer-vision', 'systems-infrastructure'],
    orbit: 6.7,
    angle: 5.85
  },
  {
    id: 'structural-defect-analysis',
    title: 'Structural defect analysis',
    short: 'Evidence and repair',
    description: 'Simulation-first defect detection, metrology, consistency checks, certification language, and repair candidates.',
    focus: 'Detection, quantification, explanation, and repair of engineering defects.',
    stack: ['Metrology', 'Simulation', 'Uncertainty', 'Evidence systems', 'Repair planning'],
    stages: ['vision', 'simulation', 'agents'],
    related: ['computer-vision', 'numerical-methods', 'agentic-systems'],
    orbit: 8.6,
    angle: 0.75
  }
];
