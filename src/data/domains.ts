export type Domain = {
  id: string;
  title: string;
  short: string;
  description: string;
  orbit: number;
  angle: number;
};

export const domains: Domain[] = [
  {
    id: 'aerospace-systems',
    title: 'Aerospace systems',
    short: 'Flight, orbit, simulation',
    description: 'Orbit propagation, systems design, control theory, mission analysis, and high-integrity numerical simulation.',
    orbit: 4.5,
    angle: 0.1
  },
  {
    id: 'numerical-methods',
    title: 'Numerical methods',
    short: 'Solvers and models',
    description: 'C++, MATLAB, Fortran, finite differences, adaptive integration, nonlinear systems, and scientific-computing infrastructure.',
    orbit: 5.4,
    angle: 1.15
  },
  {
    id: 'geospatial-intelligence',
    title: 'Geospatial intelligence',
    short: 'Earth data systems',
    description: 'Remote sensing, PostGIS, STAC, COG, Zarr, change detection, spatial hierarchy modeling, and data pipelines.',
    orbit: 6.2,
    angle: 2.2
  },
  {
    id: 'computer-vision',
    title: 'Computer vision',
    short: 'Seeing, tracking, measuring',
    description: 'Object detection, segmentation, tracking, depth estimation, metrology, and visual evidence systems.',
    orbit: 7.1,
    angle: 3.05
  },
  {
    id: 'agentic-systems',
    title: 'Agentic systems',
    short: 'RAG, tools, memory',
    description: 'Specialist agents over documents, SQL, PostGIS, code, artifacts, and governed tool execution.',
    orbit: 5.9,
    angle: 4.1
  },
  {
    id: 'systems-infrastructure',
    title: 'Systems infrastructure',
    short: 'Secure runtime',
    description: 'Containers, sandboxes, worker systems, observability, artifact registries, deployment and on-prem/cloud operations.',
    orbit: 7.8,
    angle: 5.25
  },
  {
    id: 'compression',
    title: 'Geometry compression',
    short: 'Preserve structure',
    description: 'Geometry-field compression, residuals, masks, depth maps, topology metrics, and measurement-preserving codecs.',
    orbit: 6.7,
    angle: 5.85
  },
  {
    id: 'structural-defect-analysis',
    title: 'Structural defect analysis',
    short: 'Evidence and repair',
    description: 'Simulation-first defect detection, metrology, consistency checks, certification language, and repair candidates.',
    orbit: 8.6,
    angle: 0.75
  }
];
