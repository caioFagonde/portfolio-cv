import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

const required = [
  'src/content.config.ts',
  'src/content/cases/foundry-platform.mdx',
  'src/data/domains.ts',
  'src/data/github.ts',
  'src/data/services.ts',
  'src/data/ai.ts',
  'src/data/skills.ts',
  'src/pages/skills.astro',
  'src/components/SkillsMap.astro',
  'src/pages/ai-systems.astro',
  'public/downloads/ai-system-planning-checklist.md',
  'src/data/workflow.ts',
  'src/pages/consulting.astro',
  'src/pages/workflow.astro',
  'src/pages/repo-audit.astro',
  'src/pages/projects/index.astro',
  'src/pages/projects/[slug].astro',
  'src/pages/demos/index.astro',
  'src/pages/contact.astro',
  'public/downloads/agent-qa-checklist.md',
  'public/downloads/repo-audit-checklist.md',
  'public/downloads/project-record-template.md',
  'DESIGN.md',
  'PRODUCT.md'
];

let ok = true;
for (const file of required) {
  if (!existsSync(file)) {
    console.error(`Missing required file: ${file}`);
    ok = false;
  }
}

const bannedPhrases = [
  'unlock potential',
  'seamless experiences',
  'cutting-edge solutions',
  'empowering innovation',
  'transform your business',
  'create magic',
  'lets create magic',
  "let's create magic"
];

const sourceExtensions = new Set(['.astro', '.css', '.js', '.jsx', '.md', '.mdx', '.ts', '.tsx']);

function sourceFiles(dir) {
  const entries = readdirSync(dir);
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) return sourceFiles(fullPath);
    if (sourceExtensions.has(path.extname(entry))) return [fullPath];
    return [];
  });
}

for (const file of [...sourceFiles('src'), ...sourceFiles('public/downloads')]) {
  const content = readFileSync(file, 'utf8');
  const lower = content.toLowerCase();
  for (const phrase of bannedPhrases) {
    if (lower.includes(phrase)) {
      console.error(`Banned vague phrase "${phrase}" found in ${file}`);
      ok = false;
    }
  }
  if (lower.includes('caio@quasarspace.com.br')) {
    console.error(`Disallowed contact email found in ${file}`);
    ok = false;
  }
  if (content.includes('tracking-[-')) {
    console.error(`Negative letter-spacing utility found in ${file}`);
    ok = false;
  }
}

if (!ok) process.exit(1);
console.log('Content structure looks complete.');
