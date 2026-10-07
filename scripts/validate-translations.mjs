import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { parse } from 'parse5';

const dictionary = JSON.parse(readFileSync('src/i18n/pt.json', 'utf8'));
const normalize = (value) => value.replace(/\s+/g, ' ').trim();
const exempt = new Set(['EN', 'PT', 'Website language', 'Read this page in English', 'Ler esta página em português']);
const attributes = new Set(['alt', 'aria-label', 'placeholder', 'title', 'data-caption', 'data-text', 'data-area']);
const source = new Set();
const files = (directory) => readdirSync(directory, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? files(`${directory}/${entry.name}`) : entry.name === 'index.html' ? [`${directory}/${entry.name}`] : []);
const add = (value) => { const text = normalize(value); if (/[a-zA-Z]/.test(text) && !exempt.has(text)) source.add(text); };
const walk = (node) => {
  if (['script', 'style', 'pre', 'code'].includes(node.tagName)) return;
  if (node.nodeName === '#text') add(node.value);
  for (const attr of node.attrs ?? []) {
    if (attributes.has(attr.name) || (node.tagName === 'input' && attr.name === 'value')) add(attr.value);
    if (attr.name === 'data-details') JSON.parse(attr.value).forEach(add);
    if (node.tagName === 'meta' && attr.name === 'content' && node.attrs.some((item) => ['description', 'og:description', 'og:title'].includes(item.value))) add(attr.value);
  }
  (node.childNodes ?? []).forEach(walk);
};
const builtFiles = files('dist');
const english = builtFiles.filter((path) => !path.startsWith('dist/pt/'));
const missingPages = english.filter((path) => !builtFiles.includes(path.replace(/^dist\//, 'dist/pt/')));
for (const file of english) walk(parse(readFileSync(file, 'utf8'), { scriptingEnabled: false }));
const missing = [...source].filter((text) => typeof dictionary[text] !== 'string' || !dictionary[text].trim());
const report = { generatedAt: new Date().toISOString(), pages: english.length, strings: source.size, catalogEntries: Object.keys(dictionary).length, missing, missingPages };
mkdirSync('artifacts/reports', { recursive: true });
writeFileSync('artifacts/reports/translation-coverage.json', JSON.stringify(report, null, 2));
console.log(`${report.pages} English pages; ${report.strings} source strings; ${missing.length} missing Portuguese translations.`);
if (missing.length || missingPages.length) { console.error([...missing, ...missingPages].join('\n')); process.exitCode = 1; }
