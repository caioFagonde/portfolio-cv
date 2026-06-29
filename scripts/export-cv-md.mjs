import { writeFileSync } from 'node:fs';

const out = `# Caio Nahuel Sousa Fagonde\n\nAerospace engineer and systems software architect focused on scientific computing, geospatial intelligence, computer vision, agentic systems, and high-integrity engineering platforms.\n\nSee src/data/cv.ts for the canonical structured CV data.\n`;
writeFileSync('public/cv-summary.md', out);
console.log('Wrote public/cv-summary.md');
