import { readdirSync, writeFileSync } from 'node:fs';
import { chromium } from '@playwright/test';

const baseURL = process.env.SITE_URL ?? 'http://127.0.0.1:4322';
function pages(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = `${directory}/${entry.name}`;
    return entry.isDirectory() ? pages(path) : entry.name === 'index.html' ? [path] : [];
  });
}
const routes = pages('dist').map((path) => path.replace(/^dist/, '').replace(/index\.html$/, ''));
const browser = await chromium.launch();
const report = { generatedAt: new Date().toISOString(), baseURL, pages: [], checkedLinks: 0, failures: [] };
const internalLinks = new Set();
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  for (const route of routes) {
    const response = await page.goto(`${baseURL}${route}`, { waitUntil: 'networkidle' });
    if (!response?.ok()) report.failures.push(`${route}: HTTP ${response?.status()}`);
    const checks = await page.evaluate(async () => {
      const images = Array.from(document.images); images.forEach((image) => { image.loading = 'eager'; });
      await Promise.all(images.map((image) => image.decode().catch(() => {})));
      return {
        headings: document.querySelectorAll('main h1').length,
        overflow: document.documentElement.scrollWidth > innerWidth + 1,
        images: images.filter((image) => image.hasAttribute('src') && image.naturalWidth === 0).map((image) => image.src),
        links: Array.from(document.querySelectorAll('a[href]')).map((anchor) => anchor.href).filter((href) => href.startsWith(location.origin))
      };
    });
    if (checks.headings !== 1) report.failures.push(`${route}: ${checks.headings} primary headings`);
    if (checks.overflow) report.failures.push(`${route}: horizontal overflow`);
    if (checks.images.length) report.failures.push(`${route}: unloaded images ${checks.images.join(', ')}`);
    for (const href of checks.links) internalLinks.add(href);
    report.pages.push({ route, status: response?.status(), primaryHeadings: checks.headings, imagesLoaded: !checks.images.length, overflow: checks.overflow });
  }
  for (const href of internalLinks) {
    const url = new URL(href);
    const response = await page.request.get(href);
    if (!response.ok()) report.failures.push(`Broken link ${url.pathname}${url.hash}: HTTP ${response.status()}`);
    if (url.hash && response.headers()['content-type']?.includes('text/html')) {
      await page.goto(href);
      const exists = await page.evaluate((id) => Boolean(document.getElementById(id)), decodeURIComponent(url.hash.slice(1)));
      if (!exists) report.failures.push(`Missing anchor ${url.pathname}${url.hash}`);
    }
    report.checkedLinks++;
  }
  report.failures.push(...errors.map((error) => `Browser exception: ${error}`));
} finally {
  await browser.close();
  writeFileSync('artifacts/reports/built-site-verification.json', `${JSON.stringify(report, null, 2)}\n`);
}
console.log(`Opened ${report.pages.length} built pages; checked ${report.checkedLinks} internal links; ${report.failures.length} failures.`);
if (report.failures.length) { console.error(report.failures.join('\n')); process.exitCode = 1; }
