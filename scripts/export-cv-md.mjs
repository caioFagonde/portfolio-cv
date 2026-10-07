import { readFileSync, writeFileSync } from 'node:fs';
import ts from 'typescript';

// The profile is also used by the website. Compile its local TypeScript module
// rather than maintaining a second, hardcoded CV summary.
const source = readFileSync(new URL('../src/data/cv.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 }
}).outputText;
const { profile } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
const out = `# ${profile.name}\n\n${profile.title}\n\n${profile.summary}\n\nContact: ${profile.email}\nGitHub: ${profile.github}\n`;
writeFileSync('public/cv-summary.md', out);
console.log('Wrote public/cv-summary.md from src/data/cv.ts');
