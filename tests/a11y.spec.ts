import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = ['/', '/consulting', '/workflow', '/repo-audit', '/projects', '/projects/agent-qa-harness', '/agent-qa-checklist', '/contact', '/ai-systems', '/projects/geodocs-document-assistant', '/projects/orbit-trajectory-propagator', '/skills', '/cases/orbit-trajectory-propagator', '/demos', '/research', '/about', '/cv', '/cases', '/lab', '/research/document-assistants', '/research/scientific-visualization', '/projects/personal-os', '/projects/lidar-webgl-client', '/projects/visual-metrology-studio', '/projects/godot-simulation-experiments', '/projects/rgm-compression', '/projects/public-source-ingestion', '/projects/document-report-automation', '/projects/resurgent-library', '/projects/relasp', '/projects/foundry-platform', '/projects/agentic-cortex', '/projects/hasselt-infill-atlas'];

for (const route of routes) {
  test(`no serious accessibility violations on ${route}`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).analyze();
    const seriousOrCritical = results.violations.filter((violation) => ['serious', 'critical'].includes(violation.impact ?? ''));
    expect(seriousOrCritical, JSON.stringify(seriousOrCritical, null, 2)).toEqual([]);
  });
}

test('keyboard focus is visible on primary navigation', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const activeOutline = await page.evaluate(() => {
    const element = document.activeElement;
    if (!element) return '';
    return window.getComputedStyle(element).outlineStyle;
  });
  expect(activeOutline).not.toBe('none');
});


test('mobile navigation and alternate AI flow states are accessible', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/ai-systems');
  await page.getByRole('button', { name: /Menu/ }).click();
  for (const pattern of ['Document assistant', 'Operational agent', 'Intake chatbot']) {
    await page.getByRole('button', { name: pattern, exact: true }).click();
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.filter((v) => ['serious', 'critical'].includes(v.impact ?? ''))).toEqual([]);
  }
});


test('skills filters and search remain accessible on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/skills');
  for (const area of ['Cloud', 'AI agents', 'Chatbots', 'Science & data']) {
    await page.getByRole('button', { name: area, exact: true }).click();
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.filter((v) => ['serious', 'critical'].includes(v.impact ?? ''))).toEqual([]);
  }
  await page.getByLabel('Find a skill').fill('no-such-skill');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter((v) => ['serious', 'critical'].includes(v.impact ?? ''))).toEqual([]);
});
