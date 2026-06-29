import { existsSync } from 'node:fs';

const required = [
  'src/content.config.ts',
  'src/content/cases/foundry-platform.mdx',
  'src/data/domains.ts',
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

if (!ok) process.exit(1);
console.log('Content structure looks complete.');
