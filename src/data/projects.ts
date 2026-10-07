export type ProjectCategory =
  | 'AI / agents'
  | 'developer tools'
  | 'web apps'
  | 'games / Godot'
  | 'simulation / aerospace'
  | 'data visualization'
  | 'experiments';

export type ProjectStatus =
  | 'Concept'
  | 'Prototype'
  | 'Active research'
  | 'Implemented'
  | 'Work in progress'
  | 'Case study pending'
  | 'Demo coming soon';

export type Project = {
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  category: ProjectCategory;
  tags: string[];
  stack: string[];
  status: ProjectStatus;
  featured: boolean;
  year: number;
  maturity: string;
  problem: string;
  technicalApproach: string[];
  demonstrates: string[];
  lessonsLearned: string[];
  nextSteps: string[];
  liveDemoUrl?: string;
  repositoryUrl?: string;
  caseStudyUrl?: string;
  thumbnail?: string;
  screenshots?: string[];
  mediaCaption?: string;
  evidenceNote?: string;
};

export const projects: Project[] = [
  {
  "title": "GeoDocs Document Assistant",
  "slug": "geodocs-document-assistant",
  "description": "Document diligence with extraction, page-level retrieval, verified citations, and suggestions subject to human review.",
  "longDescription": "A document workflow inside Foundry Platform that connects a dataroom, review checklist, source pages, and an assistant. The assistant uses BM25 retrieval and structured Gemini responses; it checks that cited passages exist in the retrieved source. A person confirms the evidence before a checklist item becomes sufficient.",
  "category": "AI / agents",
  "tags": [
    "document assistant",
    "OCR",
    "citations",
    "human review"
  ],
  "stack": [
    "Python",
    "FastAPI",
    "Vue 3",
    "Gemini",
    "BM25",
    "PostgreSQL"
  ],
  "status": "Work in progress",
  "featured": true,
  "year": 2026,
  "maturity": "Local implementation inspected in October 2026. Integration and verification work is ongoing; no public assistant endpoint.",
  "problem": "Document review requires traceable answers and explicit human decisions. An extracted passage or model suggestion cannot automatically establish that a requirement has been met.",
  "technicalApproach": [
    "Extract text with document and page references; preserve a requires-OCR state when text is absent.",
    "Rank overlapping passages with BM25 and validate each returned citation against its source excerpt.",
    "Return bounded structured answers and missing-evidence states rather than unsupported source references.",
    "Keep suggestions separate from accepted checklist decisions, with tenant-scoped access and audit events."
  ],
  "demonstrates": [
    "Document-grounded conversations",
    "Retrieval and citation validation",
    "Structured model outputs",
    "Human approval and tenant boundaries"
  ],
  "lessonsLearned": [
    "A citation is useful when a person can open the original page.",
    "Extraction, AI suggestions, and evidence acceptance are different workflow states."
  ],
  "nextSteps": [
    "Complete end-to-end integration and failure-case evaluation.",
    "Prepare a public example using synthetic documents."
  ],
  "evidenceNote": "Based on the local Foundry GeoDocs playbook, retrieval implementation, structured response models, and recent development sessions. No client documents are reproduced."
},
  {
  "title": "Hasselt Infill Atlas",
  "slug": "hasselt-infill-atlas",
  "description": "A parcel-analysis application with zoning overlays, urban scores, and a movable radius lens.",
  "longDescription": "An urban-analysis application for exploring parcels in Hasselt. It combines cadastral geometry, zoning, amenities, population, and street data in a Vue/deck.gl interface. A radius lens clips layers around the cursor and exposes the measurements behind the area summary.",
  "category": "data visualization",
  "tags": [
    "GIS",
    "parcel analysis",
    "deck.gl",
    "geofencing"
  ],
  "stack": [
    "Vue 3",
    "deck.gl",
    "MapLibre",
    "FastAPI",
    "PostGIS",
    "Docker"
  ],
  "status": "Prototype",
  "featured": true,
  "year": 2026,
  "maturity": "Local v1 documented and browser interactions recorded in the development sessions. Public hosting is not available.",
  "problem": "A parcel map is more useful when analysts can filter, compare, inspect source measurements, and understand the assumptions behind development potential.",
  "technicalApproach": [
    "Ingest cadastral, zoning, OpenStreetMap, and population layers into PostGIS.",
    "Serve vector tiles and parcel dossiers through FastAPI.",
    "Render layers with deck.gl and MapLibre, with filters and contextual popups.",
    "Use a radius lens for local exploration; clearly label assumed coverage limits and straight-line distances."
  ],
  "demonstrates": [
    "Spatial data pipelines",
    "Interactive geospatial UX",
    "Explainable scoring",
    "Full-stack application development"
  ],
  "lessonsLearned": [
    "Screening potential is not a planning approval.",
    "Assumptions and source gaps belong next to the result."
  ],
  "nextSteps": [
    "Add regulatory overlays and network-distance analysis.",
    "Prepare a public dataset and hosted demo."
  ],
  "evidenceNote": "Based on the local interactive_map_flanders README, frontend source, and Claude Code radius-lens verification notes."
},
  {
  "title": "RelASP: Relativistic Orbit Workbench",
  "slug": "relasp",
  "description": "Rust/Python orbit propagation with numerical reference checks and scientific visualizations of geodesics and foliation.",
  "longDescription": "A research workbench separating the propagator, metric, physical target, validation, and visualization. The core uses an adaptive Chebyshev–Picard method for fixed-background stellar orbits; later studies explore a conservative 1PN binary model, timing predictors, and clearly labeled synthetic inference.",
  "category": "simulation / aerospace",
  "tags": [
    "relativity",
    "numerical methods",
    "scientific visualization",
    "Rust"
  ],
  "stack": [
    "Rust",
    "Python",
    "PyO3",
    "SciPy",
    "Matplotlib",
    "Blender"
  ],
  "status": "Active research",
  "featured": true,
  "year": 2026,
  "maturity": "Research code and generated figures exist locally. Publication novelty and readiness remain under review.",
  "problem": "Scientific graphics must express what the numerical model actually computes, including coordinate choices, approximations, and the difference between observed and synthetic data.",
  "technicalApproach": [
    "Separate the Rust integrator from metric definitions and Python visualization.",
    "Use an independent DOP853 solver as a numerical reference for fixed-background propagation.",
    "Export coordinate-consistent worldlines and foliation data for figures and 3D scenes.",
    "Keep timing studies and synthetic recovery claims distinct from observational validation."
  ],
  "demonstrates": [
    "Rust/Python scientific tooling",
    "Numerical reference comparisons",
    "Model-aware visualization",
    "Research claim discipline"
  ],
  "lessonsLearned": [
    "A visually persuasive figure still needs units, model scope, and a valid numerical source.",
    "An approximation and an observation must remain distinguishable."
  ],
  "nextSteps": [
    "Continue independent accuracy audits and publication assessment.",
    "Package a reproducible public figure bundle."
  ],
  "evidenceNote": "Based on the RelASP README and existing generated visualization. The portfolio has not rerun the scientific benchmarks."
},
  {
  "title": "Personal OS",
  "slug": "personal-os",
  "description": "A modular, offline-first workspace for research, knowledge, device sync, and approval-controlled commands.",
  "longDescription": "A system with web, mobile, and desktop interfaces around a FastAPI service layer. It brings together research ingestion, knowledge modules, geospatial data, append-only synchronization, and commands that require scoped authorization.",
  "category": "web apps",
  "tags": [
    "offline-first",
    "sync",
    "research tools",
    "command approval"
  ],
  "stack": [
    "Quasar",
    "Vue 3",
    "FastAPI",
    "PostgreSQL",
    "NATS",
    "MinIO",
    "Tauri"
  ],
  "status": "Prototype",
  "featured": false,
  "year": 2026,
  "maturity": "Implemented scaffold documented locally; recent runtime debugging remains ongoing. Not presented as a finished production product.",
  "problem": "Personal research and operational workflows span devices and tools. A useful workspace needs sync behavior, module boundaries, and controlled command execution.",
  "technicalApproach": [
    "Separate API gateway, sync engine, command bus, and module services.",
    "Use append-only sync records and explicit conflict workflows.",
    "Scope command requests with allowlisted templates, approval, and audit trails.",
    "Package shared application surfaces for web, mobile, and desktop."
  ],
  "demonstrates": [
    "Service architecture",
    "Offline and conflict-aware design",
    "Agent tool boundaries",
    "Cross-platform interfaces"
  ],
  "lessonsLearned": [
    "Sync and permission behavior are product features, not infrastructure details.",
    "A scaffold with many modules still needs end-to-end runtime checks."
  ],
  "nextSteps": [
    "Resolve runtime service issues and repeat integration smoke checks.",
    "Publish a minimal example workflow with synthetic data."
  ],
  "evidenceNote": "Based on the local personal-os scaffold README and recent Claude Code runtime investigation. The existing public repository is listed separately in the GitHub archive."
},
  {
  "title": "Resurgent Scientific Library",
  "slug": "resurgent-library",
  "description": "Rust/Python tools for singular response continuation, stable arithmetic, and explicit mathematical hypotheses.",
  "longDescription": "A scientific library supporting research on responses near singularities. It exposes jets, local Smith analysis, symplectic classification, reciprocal reductions, and continuation tools through a Rust core and Python bindings. Its API returns unresolved or indeterminate states where the retained information is insufficient.",
  "category": "simulation / aerospace",
  "tags": [
    "scientific library",
    "numerical stability",
    "research",
    "continuation"
  ],
  "stack": [
    "Rust",
    "Python",
    "maturin",
    "symbolic methods"
  ],
  "status": "Active research",
  "featured": false,
  "year": 2026,
  "maturity": "Local library and regression tests inspected through its README. Research manuscripts and publication claims remain under review.",
  "problem": "Near-singular arithmetic and missing hypotheses can turn a plausible numerical result into an unsupported mathematical conclusion.",
  "technicalApproach": [
    "Expose assumption-dependent failures through explicit result types.",
    "Use stable identities and compensated arithmetic for cancellation-sensitive calculations.",
    "Preserve counterexamples as regression fixtures.",
    "Distinguish finite information, unresolved values, and valid continuation."
  ],
  "demonstrates": [
    "Scientific API design",
    "Stable numerical formulations",
    "Counterexample-driven verification",
    "Rust/Python integration"
  ],
  "lessonsLearned": [
    "An unresolved result can be the most accurate answer.",
    "A passing test must actually exercise the hypothesis it claims to protect."
  ],
  "nextSteps": [
    "Continue independent numerical and mathematical audits.",
    "Prepare self-contained examples and a public release scope."
  ],
  "evidenceNote": "Based on the local resurgent_astrodynamics/lib README and recent research audit sessions. No published-paper status is implied."
},
  {
  "title": "Public-Source Ingestion",
  "slug": "public-source-ingestion",
  "description": "Source-specific connectors, scheduled crawling, provenance, and explicit unavailable-source states for document workflows.",
  "longDescription": "An ingestion workstream that brings public records into a document platform. Each connector declares its capabilities and limits, so a failed or unsupported source is not silently replaced with invented data.",
  "category": "developer tools",
  "tags": [
    "data ingestion",
    "connectors",
    "provenance",
    "automation"
  ],
  "stack": [
    "Python",
    "FastAPI",
    "workers",
    "HTTP connectors",
    "PostgreSQL"
  ],
  "status": "Work in progress",
  "featured": false,
  "year": 2026,
  "maturity": "Connector implementation and test work appear in recent sessions. Live-source smoke verification is incomplete in those session records.",
  "problem": "External sources vary in format, access rules, availability, and query support. A common ingest workflow must preserve those differences.",
  "technicalApproach": [
    "Model each source through an explicit connector contract.",
    "Record source provenance and retrieval outcome with the artifact.",
    "Use replay fixtures for deterministic connector tests.",
    "Keep real-source smoke checks separate from offline test results."
  ],
  "demonstrates": [
    "Integration architecture",
    "Worker orchestration",
    "Data provenance",
    "Failure-state reporting"
  ],
  "lessonsLearned": [
    "A connector should describe what it cannot retrieve.",
    "Replay tests alone cannot establish that a live source is available."
  ],
  "nextSteps": [
    "Finish real-source smoke checks and document current coverage.",
    "Create a public sample with safe, reproducible inputs."
  ],
  "evidenceNote": "Based on the public-source connector briefs and local crawler-planning source viability documentation."
},
  {
  "title": "Document & Report Automation",
  "slug": "document-report-automation",
  "description": "Template-based DOCX reports that preserve question styling, generated answers, and document structure.",
  "longDescription": "A document workflow that produces structured reports from application data while preserving the original template. It keeps placeholder answers and static labels in separate text runs, so each retains its own formatting.",
  "category": "developer tools",
  "tags": [
    "DOCX",
    "report generation",
    "templates",
    "regression checks"
  ],
  "stack": [
    "Python",
    "DOCX templates",
    "structured data",
    "automated checks"
  ],
  "status": "Work in progress",
  "featured": false,
  "year": 2026,
  "maturity": "Implementation and a formatting regression fix are recorded in local Foundry sessions. Client templates and filled reports are not included.",
  "problem": "Document generation can silently change visual meaning when static labels and generated values share a formatting run.",
  "technicalApproach": [
    "Keep static template content distinct from substituted values.",
    "Split mixed text runs at placeholder boundaries before applying answer styling.",
    "Check document structure and style invariants in generated output.",
    "Treat visual report review as part of verification."
  ],
  "demonstrates": [
    "Document processing",
    "Formatting-preserving automation",
    "Regression design",
    "Evidence-oriented reporting"
  ],
  "lessonsLearned": [
    "Text styling can encode the difference between a question and an answer.",
    "Document output needs its own verification loop."
  ],
  "nextSteps": [
    "Publish a synthetic template and example output.",
    "Expand visual checks for pagination and long-answer layout."
  ],
  "evidenceNote": "Based on the recent Foundry document-generation debugging session. No confidential template or business data is reproduced."
},
  {
    title: 'Agent QA Harness',
    slug: 'agent-qa-harness',
    description: 'A browser-verification workflow for AI-assisted frontend work: route checks, screenshots, and axe accessibility scans.',
    longDescription:
      'A Playwright and axe test harness for checking frontend changes. It opens application routes, checks navigation and controls, captures screenshots at five viewport sizes, and reports accessibility issues. The scripts work alongside coding agents and ordinary development workflows.',
    category: 'developer tools',
    tags: ['visual QA', 'Playwright', 'accessibility', 'agent workflows'],
    stack: ['Astro', 'Playwright', 'axe-core', 'TypeScript', 'CI-ready scripts'],
    status: 'Implemented',
    featured: true,
    year: 2026,
    maturity: 'Implemented in this repository; intended as a reusable client-workflow pattern.',
    problem:
      'AI coding agents often stop after compilation. That misses layout defects, weak CTAs, broken mobile states, inaccessible controls, and screenshots that do not match the intended design.',
    technicalApproach: [
      'Use Playwright to open meaningful routes instead of only the homepage.',
      'Capture deterministic screenshots across desktop, laptop, tablet, and mobile viewports.',
      'Run axe checks for critical accessibility regressions.',
      'Store artifacts under `artifacts/screenshots` and `artifacts/reports` for review.'
    ],
    demonstrates: ['Repo hardening for AI agents', 'visual QA loops', 'completion evidence', 'frontend runtime verification'],
    lessonsLearned: [
      'Visual evidence changes the quality bar more than another written checklist.',
      'A small harness is easier to keep alive than a perfect but heavyweight QA platform.'
    ],
    nextSteps: ['Add diff-based screenshot comparison once the visual baseline stabilizes.', 'Wire the harness into GitHub Actions after the portfolio content settles.'],
    liveDemoUrl: '/agent-qa-checklist',
    repositoryUrl: 'https://github.com/caioFagonde/portfolio-cv',
    thumbnail: '/assets/agent-qa.webp',
    screenshots: ['/assets/agent-qa.webp']
  },
  {
    title: 'Agentic Cortex',
    slug: 'agentic-cortex',
    description: 'A governed RAG and tool-execution architecture for specialist agents over documents, SQL, PostGIS, reports, and artifacts.',
    longDescription:
      'A systems architecture for professional agents that need controlled access to data and tools. The emphasis is on typed tool contracts, read-only defaults, query guards, citations, and audit traces rather than unrestricted chat automation.',
    category: 'AI / agents',
    tags: ['RAG', 'tool execution', 'audit traces', 'SQL guards'],
    stack: ['PostgreSQL', 'pgvector', 'RAG', 'tool registry', 'artifact memory'],
    status: 'Prototype',
    featured: true,
    year: 2026,
    maturity: 'Documented prototype direction; case study available, public demo pending.',
    problem:
      'Specialist agents are useful only when their access is bounded, auditable, and connected to real evidence artifacts. A loose chatbot over private data is not enough.',
    technicalApproach: [
      'Separate agent reasoning from controlled tools and domain services.',
      'Treat SQL, PostGIS, documents, and generated reports as typed evidence sources.',
      'Attach permission checks, query limits, citations, and audit logs to tool calls.'
    ],
    demonstrates: ['AI-agent readiness', 'backend/API guardrails', 'retrieval design', 'system boundaries'],
    lessonsLearned: [
      'The agent is not the system; it is an interface over controlled capabilities.',
      'Traceability and failure modes need to be designed before the first impressive demo.'
    ],
    nextSteps: ['Publish a minimal tool-contract example.', 'Add a local demo with fake data and visible audit traces.'],
    repositoryUrl: 'https://github.com/caioFagonde/agentsops-swarm',
    caseStudyUrl: '/cases/agentic-cortex'
  },
  {
    title: 'Foundry Platform',
    slug: 'foundry-platform',
    description: 'Web applications and backend services for geospatial analysis, document review, reports, and AI assistants.',
    longDescription:
      'Foundry Platform combines geospatial analysis, document workflows, field collection, computer vision, backend services, and reusable scientific packages. It brings together web interfaces, background workers, access controls, and document assistants.',
    category: 'web apps',
    tags: ['platform architecture', 'geospatial ML', 'artifact contracts', 'reports'],
    stack: ['Vue', 'React', 'Python', 'FastAPI', 'PostGIS', 'S3/MinIO', 'Docker', 'Terraform'],
    status: 'Active research',
    featured: true,
    year: 2026,
    maturity: 'Platform implementation exists locally across frontend apps, backend services, workers, and reusable packages. Individual modules have different verification states; no public demo is linked.',
    problem:
      'Professional engineering software needs data contracts, storage, permissions, workers, provenance, and reports. Algorithms alone do not become usable systems.',
    technicalApproach: [
      'Define typed artifacts as the shared contract between services.',
      'Separate evidence-core, geo-foundry, vision-foundry, and agent-foundry responsibilities.',
      'Keep provenance and report generation in the main workflow rather than as afterthoughts.'
    ],
    demonstrates: ['full-stack architecture', 'API design', 'data modeling', 'artifact-driven workflows'],
    lessonsLearned: [
      'The useful unit is not a model output; it is an artifact with enough context to audit and reuse.',
      'A platform stays tractable when each package has a clear evidence boundary.'
    ],
    nextSteps: ['Publish a thin demo with mock artifacts.', 'Document the deployment and worker model in more detail.'],
    caseStudyUrl: '/cases/foundry-platform'
  },
  {
    title: 'OrbProp — Orbital Workbench',
    slug: 'orbit-trajectory-propagator',
    description: 'A C++ orbital simulation engine with a desktop workbench, Python bindings, and 3D trajectory views.',
    longDescription: 'OrbProp combines a numerical propagator with a desktop application for setting up missions and exploring their results. The same C++ engine runs through the command line, a C API, and Python bindings. The workbench brings together mission configuration, force-model selection, trajectories, plots, and export tools.',
    category: 'simulation / aerospace',
    tags: ['OrbProp', 'orbit propagation', 'simulation', 'Python bindings'],
    stack: ['C++', 'Electron', 'TypeScript', 'Python', 'nanobind', 'SPICE', 'CMake'],
    status: 'Active research', featured: true, year: 2026,
    maturity: 'Engine, interfaces, and workbench documented in the local OrbProp repository. Release packaging is tracked internally.',
    problem: 'Mission analysis needs consistent physics across interactive work, batch runs, and scripted experiments. Changing the interface should not change the numerical result.',
    technicalApproach: [
      'Share the C++ propagation engine between the CLI, C API, and Python package through nanobind.',
      'Configure gravity, atmospheric drag, radiation pressure, tides, reference frames, and SPICE ephemerides through a method registry.',
      'Inspect trajectories in the desktop workbench alongside mission parameters, plots, and run outputs.',
      'Exchange trajectories through CCSDS formats, CSV, HDF5, CZML, and SPICE kernels.',
      'Check numerical behavior against reference software and observational datasets; record the method set with each run.',
      'Generate spacecraft-view images with an astrometric chain, optics, detector noise, and FITS output.'
    ],
    demonstrates: ['C++ library architecture', 'C and Python interfaces', 'Desktop and 3D application development', 'Numerical simulation', 'Scientific data interoperability'],
    lessonsLearned: ['One engine across interfaces makes numerical comparisons easier.', 'Units, reference frames, and method choices need to travel with exported data.'],
    nextSteps: ['Release packaging and integration tracked in the OrbProp repository.'],
    caseStudyUrl: '/cases/orbit-trajectory-propagator',
    thumbnail: '/assets/orbprop-workbench.webp',
    screenshots: ['/assets/orbprop-workbench.webp'],
    mediaCaption: 'OrbProp desktop workbench: Earth-centered trajectory view, mission explorer, and timeline.',
    evidenceNote: 'Reviewed against OrbProp documentation and the latest Resurgent Claude conversation. The screenshot is an existing runtime capture. Scientific validation was not rerun by this portfolio pass.'
  },
  {
    title: 'LiDAR WebGL Client',
    slug: 'lidar-webgl-client',
    description: 'A browser-native spatial visualization pattern for point clouds, streaming, WebGL, and inspection workflows.',
    longDescription:
      'An architecture for rendering large point clouds with spatial indexing, object-storage delivery, level-of-detail, and inspection-focused interactions.',
    category: 'data visualization',
    tags: ['WebGL', 'point clouds', 'spatial UI', 'performance'],
    stack: ['Three.js', 'WebGL', 'Potree', 'S3/object storage', 'octree streaming'],
    status: 'Prototype',
    featured: false,
    year: 2026,
    maturity: 'Case documented; public interactive demo coming later.',
    problem:
      'Large point clouds are not just a rendering problem. Delivery layout, spatial indexing, camera behavior, and measurement tools determine whether the client is useful.',
    technicalApproach: [
      'Use spatial level-of-detail and range-friendly object layouts.',
      'Keep measurement and inspection actions visible instead of hiding the work behind a pretty renderer.',
      'Treat browser performance as part of the data pipeline contract.'
    ],
    demonstrates: ['frontend performance', '3D visualization', 'spatial data architecture', 'inspection UX'],
    lessonsLearned: ['WebGL becomes more useful when data delivery is designed with it.'],
    nextSteps: ['Add a small public point-cloud sample.', 'Benchmark loading behavior across mid-range devices.'],
    caseStudyUrl: '/cases/lidar-webgl-client'
  },
  {
    title: 'Visual Metrology Studio',
    slug: 'visual-metrology-studio',
    description: 'A deterministic-first computer-vision system for image measurement, uncertainty, and inspection reports.',
    longDescription:
      'An image-measurement architecture covering images, masks, and uncertainty. The focus is scale anchoring, subpixel edges, mask areas, uncertainty propagation, and reproducible reports.',
    category: 'experiments',
    tags: ['computer vision', 'metrology', 'reports', 'inspection'],
    stack: ['OpenCV', 'NumPy', 'scikit-image', 'HTML reports'],
    status: 'Concept',
    featured: false,
    year: 2026,
    maturity: 'Concept and case study documented; implementation pending.',
    problem:
      'A label or mask is not a measurement. Measurement needs scale, method, uncertainty, evidence overlays, and repeatable output artifacts.',
    technicalApproach: [
      'Start with synthetic ground-truth cases before claiming real-world reliability.',
      'Generate HTML/JSON reports that preserve method, inputs, uncertainty, and overlays.',
      'Keep deterministic image-processing steps visible and testable.'
    ],
    demonstrates: ['computer vision architecture', 'evidence-driven UX', 'report generation', 'quality gates'],
    lessonsLearned: ['Certification language must be earned through inputs, methods, uncertainty, and provenance.'],
    nextSteps: ['Build a minimal synthetic benchmark.', 'Add a demo report with clearly marked fake sample data.'],
    caseStudyUrl: '/cases/visual-metrology-studio'
  },
  {
    title: 'Godot Simulation Experiments',
    slug: 'godot-simulation-experiments',
    description: 'Game and simulation experiments in control, movement, tooling, and interactive feedback.',
    longDescription:
      'Godot experiments in movement, control, simulation interfaces, and interactive feedback.',
    category: 'games / Godot',
    tags: ['Godot', 'simulation', 'game tooling', 'controls'],
    stack: ['Godot', 'GDScript', 'C#', 'C++'],
    status: 'Work in progress',
    featured: false,
    year: 2026,
    maturity: 'Work in progress; demo coming soon.',
    problem:
      'Interactive simulations need responsive controls, visible state, and a predictable way to pause and reset.',
    technicalApproach: [
      'Separate simulation state from input handling and rendering.',
      'Check controls, frame rate, pause, and reset behavior.',
      'Use on-screen feedback to explain what the simulation is doing.'
    ],
    demonstrates: ['Godot and GDScript', 'Interactive systems', 'Simulation controls', 'Runtime feedback'],
    lessonsLearned: ['Clear controls and visible state make a simulation easier to explore.'],
    nextSteps: ['Export the first stable web demo.', 'Add input, pause, reset, and small-screen behavior checks.']
  },
  {
    title: 'RGM Geometry Compression',
    slug: 'rgm-compression',
    description: 'A research workbench for geometry-field compression that preserves masks, depth, edges, topology, and measurements.',
    longDescription:
      'A geometry-field compression workbench comparing file size with retained edges, topology, and measurement accuracy. Its metrics track how compression affects the next stage of analysis.',
    category: 'experiments',
    tags: ['compression', 'geometry fields', 'metrics', 'computer vision'],
    stack: ['Python', 'NumPy', 'metrics', 'synthetic data', 'reports'],
    status: 'Active research',
    featured: false,
    year: 2026,
    maturity: 'Research workbench and case study direction.',
    problem:
      'Compression for masks, depth maps, flow, or scientific rasters must preserve task-relevant structure, not only file size or visual appearance.',
    technicalApproach: [
      'Evaluate rate-distortion alongside edge, topology, and measurement-preservation metrics.',
      'Use synthetic data to make failure modes visible before testing harder real-world fields.',
      'Connect report outputs to visual metrology and evidence workflows.'
    ],
    demonstrates: ['research framing', 'metric design', 'scientific Python', 'measurement-aware software'],
    lessonsLearned: ['A smaller file is not a win if the downstream measurement is broken.'],
    nextSteps: ['Publish a small benchmark notebook or web report.', 'Connect sample outputs to Visual Metrology Studio.'],
    caseStudyUrl: '/cases/rgm-compression'
  }
];

export const featuredProjects = projects.filter((project) => project.featured);
export const projectCategories = Array.from(new Set(projects.map((project) => project.category)));

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
