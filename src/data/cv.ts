export const profile = {
  name: 'Caio Nahuel Sousa Fagonde',
  title: 'Software developer and aerospace engineer',
  location: 'Brazil',
  email: 'caionahuel@gmail.com',
  github: 'https://github.com/caioFagonde',
  summary:
    'I’m a software developer with a background in aerospace engineering. My work covers web applications, APIs, cloud infrastructure, AI agents, and chatbots. I also develop scientific software, including orbital simulation and geospatial tools.'
};

export const cvSections = [
  {
    title: 'Cloud infrastructure & deployment',
    items: [
      'Docker environments, background workers, and CI/CD pipelines',
      'AWS/Azure infrastructure with Terraform and application deployment tooling',
      'PostgreSQL/PostGIS, S3/MinIO object storage, and service configuration',
      'Logs, health checks, access controls, backups, and deployment documentation'
    ]
  },
  {
    title: 'Aerospace engineering foundation',
    items: [
      'C++ / MATLAB / Fortran simulation workflows',
      'Orbit propagation and trajectory analysis',
      'Control theory and dynamical systems',
      'Numerical methods, differential equations, and scientific visualization',
      'Systems engineering and mission-level reasoning'
    ]
  },
  {
    title: 'Full-stack software systems',
    items: [
      'Vue, React, Astro, Svelte, TypeScript, and browser-native interactive interfaces',
      'Laravel/PHP, Blade, Quasar/Vue, FastAPI/Python, C#/.NET, Go services, SQL, and API validation workflows',
      'PostgreSQL/PostGIS, SQLAlchemy, data pipelines, object storage, Docker, workers, and deployment architecture',
      'Rust, C++, and C# for performance-sensitive or systems-oriented components',
      'WebGL, Three.js, deck.gl, and browser-native spatial visualization'
    ]
  },
  {
    title: 'AI-assisted engineering workflows',
    items: [
      'Claude Code / Codex repo workflow setup, agent instructions, and handoff protocols',
      'Runtime verification loops with Playwright screenshots, visual QA, and accessibility checks',
      'Backend/API validation gates, failure-case thinking, fixtures, and evidence-oriented completion reports',
      'Repo hardening for AI coding agents: scripts, boundaries, test commands, and no-blind-coding rules'
    ]
  },
  {
    title: 'Geospatial intelligence',
    items: [
      'Remote-sensing pipelines, STAC, COG, GeoTIFF, Zarr, GeoParquet',
      'Change detection, cloud masking, time series, sensor fusion, spatial aggregation',
      'PostGIS, GeoServer, vector tiles, static tile generation, spatial service design'
    ]
  },
  {
    title: 'Computer vision and visual evidence',
    items: [
      'Object detection, segmentation, tracking, depth estimation, pose estimation architecture',
      'Visual metrology, uncertainty reporting, image measurement, synthetic benchmarks',
      'Geometry-field compression and measurement-preserving processing'
    ]
  },
  {
    title: 'Agentic, RAG, and internal tools',
    items: [
      'Chatbots, conversation design, session state, streaming responses, and human handoff',
      'Document assistants with OCR, retrieval, verified citations, and human-reviewed suggestions',
      'Specialist agents over documents, SQL/PostGIS, files, reports, and artifacts',
      'Hybrid retrieval, tool registries, permission-aware execution, audit traces',
      'Internal dashboards, CLI tools, QA automation, report generators, and workflow glue',
      'Technical coaching for advanced developers using AI tools without lowering verification standards'
    ]
  },
  {
    title: 'Games, prototypes, and simulation interfaces',
    items: [
      'Godot and C# experiments for game-like simulation, controls, and interactive prototypes',
      'Kotlin/Android experiments, gesture prototypes, and C++ sensor-oriented work',
      'Engineering-grade demos that expose state, reset behavior, failure modes, and performance constraints',
      'Simulation UI patterns that move between prototype exploration and production-quality inspection tools'
    ]
  }
];

export const skillGroups = [
  {
    name: 'Programming languages',
    skills: ['Python', 'TypeScript', 'PHP', 'Vue SFCs', 'C#', 'C++', 'Go', 'Rust', 'Kotlin', 'SQL', 'MATLAB']
  },
  {
    name: 'Frontend',
    skills: ['Vue', 'React', 'Astro', 'Svelte', 'Quasar', 'Tailwind', 'Playwright', 'Three.js', 'WebGL']
  },
  {
    name: 'Backend',
    skills: ['Laravel', 'FastAPI', '.NET', 'PostgreSQL', 'PostGIS', 'REST APIs', 'workers', 'Docker']
  },
  {
    name: 'Geospatial',
    skills: ['PostGIS', 'GeoServer', 'GDAL', 'Rasterio', 'GeoPandas', 'STAC', 'COG', 'Zarr', 'GeoParquet']
  },
  {
    name: 'ML/CV',
    skills: ['PyTorch', 'OpenCV', 'segmentation', 'object detection', 'tracking', 'depth estimation', 'visual metrology']
  },
  {
    name: 'AI systems',
    skills: ['RAG', 'BM25', 'pgvector', 'structured outputs', 'tool contracts', 'conversation flows', 'evaluation', 'human review']
  },
  {
    name: 'Systems',
    skills: ['Shell', 'Make', 'Just', 'Docker', 'S3/MinIO', 'worker queues', 'Godot', 'agent QA harnesses']
  }
];

export const personalSkillGroups = [
  {
    id: 'leadership-management',
    title: 'Leadership & management',
    description: 'How I work with people and projects.',
    skills: ['Leadership', 'Management']
  },
  {
    id: 'music',
    title: 'Music',
    description: 'Outside of engineering, I play guitar and piano.',
    skills: ['Guitar', 'Piano']
  }
];

export const spokenLanguages = [
  { name: 'Portuguese', level: 'native' },
  { name: 'English', level: 'fluent' },
  { name: 'Spanish', level: 'fluent' },
  { name: 'French', level: 'intermediate' }
];

// Keep software and AI first; scientific specialties remain part of the profile.
const sectionOrder = ['Full-stack software systems', 'Cloud infrastructure & deployment', 'Agentic, RAG, and internal tools', 'AI-assisted engineering workflows'];
cvSections.sort((a, b) => {
  const rank = (title: string) => { const i = sectionOrder.indexOf(title); return i < 0 ? sectionOrder.length : i; };
  return rank(a.title) - rank(b.title);
});
