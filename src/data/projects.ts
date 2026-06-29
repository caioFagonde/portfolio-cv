export type Project = {
  slug: string;
  title: string;
  domain: string;
  summary: string;
  status: string;
  stack: string[];
};

export const featuredProjects: Project[] = [
  {
    slug: 'orbit-trajectory-propagator',
    title: 'Orbit & Trajectory Propagator',
    domain: 'aerospace-systems',
    summary: 'A high-fidelity orbital simulation case centered on perturbations, propagation, and maneuver analysis.',
    status: 'documented',
    stack: ['MATLAB', 'Fortran', 'C++', 'Numerical integration']
  },
  {
    slug: 'foundry-platform',
    title: 'Foundry Platform',
    domain: 'geospatial-intelligence',
    summary: 'An enterprise backbone for geospatial ML, computer vision, artifact provenance, and specialist data agents.',
    status: 'active research',
    stack: ['Python', 'PostGIS', 'S3', 'FastAPI', 'PyTorch']
  },
  {
    slug: 'visual-metrology-studio',
    title: 'Visual Metrology Studio',
    domain: 'computer-vision',
    summary: 'A deterministic-first system for turning images and masks into measurements with uncertainty and reports.',
    status: 'planned implementation',
    stack: ['OpenCV', 'NumPy', 'scikit-image', 'Reports']
  },
  {
    slug: 'agentic-cortex',
    title: 'Agentic Cortex',
    domain: 'agentic-systems',
    summary: 'A governed RAG and tool-execution architecture for specialist agents over documents and databases.',
    status: 'prototype direction',
    stack: ['PostgreSQL', 'pgvector', 'RAG', 'Tool registry']
  },
  {
    slug: 'rgm-compression',
    title: 'RGM Geometry Compression',
    domain: 'compression',
    summary: 'A geometry-field compression programme focused on preserving edges, masks, topology, and downstream measurements.',
    status: 'research workbench',
    stack: ['Python', 'NumPy', 'Metrics', 'Synthetic data']
  },
  {
    slug: 'structural-defect-os',
    title: 'Structural Defect OS',
    domain: 'structural-defect-analysis',
    summary: 'A long-horizon programme for defect detection, simulation, repair candidates, and evidence-bearing certification.',
    status: 'research programme',
    stack: ['Simulation', 'Metrology', 'Consistency checks']
  }
];
