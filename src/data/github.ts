export type GithubRepoSignal = {
  name: string;
  url: string;
  label: string;
  stack: string[];
  signal: string;
  status: string;
};

export type GithubFocus = {
  label: string;
  detail: string;
  repos: string[];
};

export const githubSnapshot = {
  profileUrl: 'https://github.com/caioFagonde',
  reviewedAt: '2026-07-10',
  method: 'Reviewed public repositories with the authenticated GitHub CLI.',
  summary:
    'Public repositories show repeated work in Python automation and agents, Vue/PHP product apps, Astro/Svelte/TypeScript sites, Kotlin/Android experiments, Rust/Go scientific tooling, MATLAB/C# orbital analysis, shell/Docker automation, and geospatial notebooks.'
};

export const githubFocus: GithubFocus[] = [
  {
    label: 'Python systems and automation',
    detail: 'Agent, platform, geospatial, research, and workflow repositories with Shell, Docker, and report-oriented glue.',
    repos: ['personal-os', 'agentsops-swarm', 'forge', 'streamlitGeospatial']
  },
  {
    label: 'Vue, PHP, and product surfaces',
    detail: 'Vue-heavy application work, Laravel/PHP and Blade surfaces, Quasar-style portals, and internal product tooling.',
    repos: ['survival-ark', 'quasar_portal', 'dasein', 'asp-swarm']
  },
  {
    label: 'TypeScript, Astro, and Svelte',
    detail: 'Portfolio systems, front-end tools, route-driven sites, and browser-facing technical interfaces.',
    repos: ['portfolio-cv', 'astroynamics-atlas', 'electron-orbital-mechanics']
  },
  {
    label: 'Aerospace and scientific tooling',
    detail: 'Orbital mechanics, MATLAB/C# analysis, Rust/Go/Python scientific libraries, and long-form technical writing.',
    repos: ['ITASAT2', 'asp_lib', 'astrodynamics-esolang', 'orbital-l-function-treatise']
  },
  {
    label: 'Kotlin, Android, and C++ experiments',
    detail: 'Mobile/Android prototypes, gesture and kit experiments, C++ components, and sensor-oriented explorations.',
    repos: ['playground', 'openhub-kit', 'gesture-ar', 'indoor-magnetic']
  }
];

export const githubRepoSignals: GithubRepoSignal[] = [
  {
    name: 'personal-os',
    url: 'https://github.com/caioFagonde/personal-os',
    label: 'Automation workspace',
    stack: ['Python', 'Vue', 'TypeScript', 'Docker', 'Shell', 'Rust'],
    signal: 'Python automation with a web interface and integrations.',
    status: 'Active public repo'
  },
  {
    name: 'agentsops-swarm',
    url: 'https://github.com/caioFagonde/agentsops-swarm',
    label: 'Agent operations',
    stack: ['Python', 'Shell', 'PowerShell', 'HTML'],
    signal: 'Agent workflows, operational scripts, and report generation.',
    status: 'Public prototype'
  },
  {
    name: 'asp_lib',
    url: 'https://github.com/caioFagonde/asp_lib',
    label: 'Scientific computing library',
    stack: ['Rust', 'Go', 'Python', 'TeX', 'Makefile'],
    signal: 'Scientific-computing and symbolic/numerical tooling around applied resurgence theory.',
    status: 'Research code'
  },
  {
    name: 'survival-ark',
    url: 'https://github.com/caioFagonde/survival-ark',
    label: 'Full-stack app',
    stack: ['PHP', 'Blade', 'Vue', 'Python', 'Docker', 'JavaScript'],
    signal: 'A Laravel and Vue application with backend services and deployment tooling.',
    status: 'Public prototype'
  },
  {
    name: 'quasar_portal',
    url: 'https://github.com/caioFagonde/quasar_portal',
    label: 'Vue portal',
    stack: ['Vue', 'PHP', 'Blade', 'JavaScript', 'SCSS'],
    signal: 'A portal built with Vue, PHP, and Blade.',
    status: 'Historical repo'
  },
  {
    name: 'ITASAT2',
    url: 'https://github.com/caioFagonde/ITASAT2',
    label: 'Orbital analysis',
    stack: ['MATLAB', 'C#', 'Python', 'POV-Ray'],
    signal: 'Preliminary orbital mission analysis code for ITASAT2.',
    status: 'Aerospace archive'
  },
  {
    name: 'openhub-kit',
    url: 'https://github.com/caioFagonde/openhub-kit',
    label: 'Kotlin/C++ kit',
    stack: ['Kotlin', 'C++'],
    signal: 'Kotlin and C++ experimentation around reusable kit-style components.',
    status: 'Public experiment'
  },
  {
    name: 'streamlitGeospatial',
    url: 'https://github.com/caioFagonde/streamlitGeospatial',
    label: 'Geospatial app',
    stack: ['Python', 'Streamlit', 'Shell', 'HTML'],
    signal: 'Geospatial Streamlit application work and dataset exploration.',
    status: 'Historical repo'
  }
];
