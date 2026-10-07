import { chromium, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile } from 'node:fs/promises';

const baseURL = (process.env.SITE_URL ?? 'http://127.0.0.1:4322/portfolio-cv').replace(/\/$/, '');
const name = process.env.REPORT_PREFIX ?? 'pages';
const basePath = new URL(baseURL).pathname.replace(/\/$/, '');
const report = { baseURL, generatedAt: new Date().toISOString(), checks: [], failures: [] };
await mkdir('artifacts/screenshots', { recursive: true });
await mkdir('artifacts/reports', { recursive: true });
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
page.on('pageerror', (error) => report.failures.push(error.message));
const go = async (route) => {
  const response = await page.goto(`${baseURL}${route}`, { waitUntil: 'networkidle' });
  expect(response?.ok(), route).toBe(true);
};
const accessible = async () => {
  const scan = await new AxeBuilder({ page }).analyze();
  expect(scan.violations.filter((item) => ['serious', 'critical'].includes(item.impact ?? ''))).toEqual([]);
};
try {
  await go('/');
  const paths = await page.locator('a[href]').evaluateAll((links) => links.filter((link) => link.origin === location.origin).map((link) => link.pathname));
  expect(paths.every((path) => path === basePath || path.startsWith(`${basePath}/`))).toBe(true);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://caiofagonde.github.io/portfolio-cv/');
  report.checks.push('Homepage destinations and canonical include the repository path.');
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Projects', exact: true }).click();
  expect(new URL(page.url()).pathname.replace(/\/$/, '')).toBe(`${basePath}/projects`);
  await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Projects', exact: true })).toHaveAttribute('aria-current', 'page');
  report.checks.push('Navigation and active route work under the repository path.');
  await go('/projects/geodocs-document-assistant');
  await page.locator('[data-gallery-image]').first().click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await page.keyboard.press('ArrowRight');
  await expect(dialog.locator('[data-original]')).toHaveAttribute('href', `${baseURL}/assets/geodocs-review.webp`);
  await accessible();
  await page.screenshot({ path: `artifacts/screenshots/${name}-gallery-desktop.png` });
  await page.keyboard.press('Escape');
  await expect(page.locator('[data-gallery-image]').first()).toBeFocused();
  report.checks.push('Gallery loads original assets, supports arrows/Escape, restores focus, and passes axe.');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator('[data-gallery-image]').first().click();
  await page.screenshot({ path: `artifacts/screenshots/${name}-gallery-mobile.png` });
  await page.keyboard.press('Escape');
  await go('/demos');
  await page.getByRole('button', { name: 'Who approves publication?' }).click();
  await expect(page.locator('[data-citation]')).toHaveText('Check page 2 ↗');
  await page.getByRole('button', { name: 'What is the project budget?' }).click();
  await expect(page.locator('[data-answer-label]')).toHaveText('No supporting passage');
  await page.getByLabel('Visible detail').fill('20');
  await expect(page.locator('[data-kind="cloud"] output')).toHaveText('20% · 180 points shown');
  await accessible();
  await page.locator('#spatial-cloud').scrollIntoViewIfNeeded();
  await page.screenshot({ path: `artifacts/screenshots/${name}-demo-mobile.png` });
  report.checks.push('Citations, missing evidence, and point-cloud detail work on mobile and pass axe.');
  await go('/skills');
  await page.getByRole('button', { name: 'Cloud', exact: true }).click();
  await page.getByLabel('Find a skill').fill('Terraform');
  await expect(page.locator('[data-skill-node]:visible')).toHaveText(['Terraform']);
  await accessible();
  report.checks.push('Skills filters work under the deployed path and pass axe.');
  for (const [width,height,label] of [[1440,900,'desktop'],[1280,720,'laptop'],[1024,768,'tablet-landscape'],[768,1024,'tablet-portrait'],[390,844,'mobile']]) {
    await page.setViewportSize({ width,height });
    await go('/projects/document-report-automation');
    await page.evaluate(async () => { const images=Array.from(document.images).filter((item)=>item.hasAttribute('src')); images.forEach((item)=>item.loading='eager'); await Promise.all(images.map((item)=>item.decode())); });
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)).toBe(false);
    await page.screenshot({ path:`artifacts/screenshots/project-document-report-automation-${label}.png`, fullPage:true });
  }
  report.checks.push('Final report-automation copy reflows at all five viewports.');
  const cv = await page.request.get(`${baseURL}/cv-summary.md`);
  expect(cv.ok()).toBe(true); expect(await cv.text()).toContain('caionahuel@gmail.com');
  const rss = await page.request.get(`${baseURL}/rss.xml`);
  expect(rss.ok()).toBe(true); expect(await rss.text()).toContain('/portfolio-cv/research/');
  report.checks.push('Generated CV and RSS links are present.');
} catch (error) {
  report.failures.push(error.message);
} finally {
  await browser.close();
  await writeFile(`artifacts/reports/${name}-interactions.json`, `${JSON.stringify(report,null,2)}\n`);
}
console.log(`${report.checks.length} Pages interaction checks; ${report.failures.length} failures.`);
if(report.failures.length) { console.error(report.failures.join('\n')); process.exitCode=1; }
