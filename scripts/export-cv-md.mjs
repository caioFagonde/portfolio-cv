import { readFileSync, writeFileSync } from 'node:fs';
import ts from 'typescript';

// The profile is also used by the website. Compile its local TypeScript module
// rather than maintaining a second, hardcoded CV summary.
const source = readFileSync(new URL('../src/data/cv.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 }
}).outputText;
const { profile, personalSkillGroups, spokenLanguages } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
const personal = personalSkillGroups.map((group) => `## ${group.title}\n\n${group.skills.join(', ')}`).join('\n\n');
const languages = spokenLanguages.map(({ name, level }) => `- ${name} — ${level}`).join('\n');
const out = `# ${profile.name}\n\n${profile.title}\n\n${profile.summary}\n\nContact: ${profile.email}\nGitHub: ${profile.github}\n\n${personal}\n\n## Spoken languages\n\n${languages}\n`;
writeFileSync('public/cv-summary.md', out);
const portuguese = JSON.parse(readFileSync(new URL('../src/i18n/pt.json', import.meta.url), 'utf8'));
const t = (value) => portuguese[value] ?? value;
const personalPt = personalSkillGroups.map((group) => `## ${t(group.title)}\n\n${group.skills.map(t).join(', ')}`).join('\n\n');
const languagesPt = spokenLanguages.map(({ name, level }) => `- ${t(`${name} — ${level}`)}`).join('\n');
writeFileSync('public/cv-summary.pt.md', `# ${profile.name}\n\n${t(profile.title)}\n\n${t(profile.summary)}\n\nContato: ${profile.email}\nGitHub: ${profile.github}\n\n${personalPt}\n\n## Idiomas\n\n${languagesPt}\n`);
console.log('Wrote English and Portuguese CV summaries from src/data/cv.ts');
