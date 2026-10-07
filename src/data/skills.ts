import { skillGroups } from './cv';
import { domains } from './domains';

export const skillFilters = [
  { id: 'all', label: 'All skills' },
  { id: 'development', label: 'Development' },
  { id: 'cloud', label: 'Cloud' },
  { id: 'agents', label: 'AI agents' },
  { id: 'chatbots', label: 'Chatbots' },
  { id: 'science', label: 'Science & data' }
];

export type SkillBranch = {
  id: string;
  title: string;
  filters: string[];
  description: string;
  skills: string[];
  href: string;
  link: string;
};
const group = (name: string) => skillGroups.find((g) => g.name === name)!.skills;
const domainSkills = (ids: string[]) => domains.filter((d) => ids.includes(d.id)).flatMap((d) => d.stack);
const unique = (items: string[]) => {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = item.toLowerCase().replace(/\s*\/\s*/g, '/');
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

export const skillBranches: SkillBranch[] = [
  { id: 'frontend', title: 'Frontend', filters: ['development'], description: 'Interfaces, browser applications, and interactive views.', skills: group('Frontend'), href: '/projects/foundry-platform', link: 'Foundry Platform' },
  { id: 'backend', title: 'Backend & languages', filters: ['development'], description: 'APIs, databases, service logic, and systems code.', skills: unique([...group('Languages'), ...group('Backend')]), href: '/consulting#full-stack-product-implementation', link: 'Development services' },
  { id: 'cloud', title: 'Cloud infrastructure', filters: ['cloud', 'development'], description: 'Deployment, storage, workers, and operations.', skills: unique(['AWS', 'Azure', 'Terraform', 'Docker', 'CI/CD', 'S3/MinIO', 'worker queues', 'observability', ...domainSkills(['systems-infrastructure'])]), href: '/consulting#cloud-infrastructure', link: 'Cloud services' },
  { id: 'agents', title: 'AI agents', filters: ['agents'], description: 'Tools, retrieval, orchestration, and evaluations.', skills: unique([...group('AI systems'), ...domainSkills(['agentic-systems']), 'API integrations', 'SQL agents', 'Claude Code', 'Codex']), href: '/ai-systems', link: 'Agent development' },
  { id: 'chatbots', title: 'Chatbots & documents', filters: ['chatbots', 'agents'], description: 'Conversations connected to documents and applications.', skills: ['conversation design', 'session state', 'streaming responses', 'OCR', 'document ingestion', 'page citations', 'Gemini', 'BM25', 'RAG', 'human handoff'], href: '/projects/geodocs-document-assistant', link: 'GeoDocs assistant' },
  { id: 'tooling', title: 'Automation & tooling', filters: ['development', 'agents'], description: 'Developer workflows, testing, and internal tools.', skills: group('Systems'), href: '/projects/agent-qa-harness', link: 'Agent QA Harness' },
  { id: 'geospatial', title: 'Geospatial & visualization', filters: ['science', 'development'], description: 'Spatial data, mapping, and visual analysis.', skills: unique([...group('Geospatial'), ...domainSkills(['geospatial-intelligence']), 'deck.gl', 'MapLibre']), href: '/projects/hasselt-infill-atlas', link: 'Hasselt Infill Atlas' },
  { id: 'vision', title: 'Computer vision & geometry', filters: ['science'], description: 'Images, measurements, and geometry processing.', skills: unique([...group('ML/CV'), ...domainSkills(['computer-vision', 'compression', 'structural-defect-analysis'])]), href: '/projects/visual-metrology-studio', link: 'Vision architecture' },
  { id: 'science', title: 'Aerospace & numerical methods', filters: ['science'], description: 'Orbital software, simulation, and scientific computing.', skills: unique([...domainSkills(['aerospace-systems', 'numerical-methods']), 'nanobind', 'SPICE', 'adaptive integration']), href: '/projects/orbit-trajectory-propagator', link: 'OrbProp' }
];
