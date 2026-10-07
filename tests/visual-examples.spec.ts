import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('gallery opens, moves between captures, closes with Escape and restores focus', async ({ page }) => {
  await page.goto('/projects/geodocs-document-assistant');
  const first = page.locator('[data-gallery-image]').first();
  await first.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('[data-position]')).toHaveText('1 / 3');
  await page.keyboard.press('ArrowRight');
  await expect(dialog.locator('[data-position]')).toHaveText('2 / 3');
  await expect(dialog.locator('img')).toHaveAttribute('src', /geodocs-review/);
  const scan = await new AxeBuilder({ page }).analyze();
  expect(scan.violations.filter((v) => ['serious', 'critical'].includes(v.impact ?? ''))).toEqual([]);
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(first).toBeFocused();
});

test('retrieval cites the supporting page and abstains when evidence is missing', async ({ page }) => {
  await page.goto('/demos');
  const demo = page.locator('[data-document-example]');
  await demo.getByRole('button', { name: 'Who approves publication?' }).click();
  await expect(demo.locator('[data-answer]')).toContainText('A reviewer approves');
  await expect(demo.getByRole('link', { name: 'Check page 2' })).toBeVisible();
  await demo.getByRole('button', { name: 'What is the project budget?' }).click();
  await expect(demo.locator('[data-answer-label]')).toHaveText('No supporting passage');
  await expect(demo.locator('[data-citation]')).toBeHidden();
  await demo.getByLabel('Your question').fill('required document missing');
  await demo.getByRole('button', { name: 'Search', exact: true }).click();
  await expect(demo.locator('[data-answer-label]')).toContainText('page 3');
  await demo.getByRole('link', { name: 'Check page 3' }).click();
  await expect(page).toHaveURL(/#document-example-page-3$/);
});

test('spatial examples change the actual visible geometry at mobile width', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/demos');
  const map = page.locator('[data-kind="map"]');
  const cloud = page.locator('[data-kind="cloud"]');
  await map.getByLabel('Minimum sample score').fill('100');
  await expect(map.locator('output')).toHaveText('100 / 100 · 0 parcels shown');
  await cloud.getByLabel('Visible detail').fill('20');
  await expect(cloud.locator('output')).toHaveText('20% · 180 points shown');
  expect(await cloud.locator('[data-point]').evaluateAll((points) => points.filter((point) => getComputedStyle(point).opacity === '1').length)).toBe(180);
  const scan = await new AxeBuilder({ page }).analyze();
  expect(scan.violations.filter((v) => ['serious', 'critical'].includes(v.impact ?? ''))).toEqual([]);
});

test('every indexed project offers a keyboard-operable architecture example', async ({ page }) => {
  await page.goto('/projects');
  const urls = await page.locator('[data-project]').evaluateAll((links) => links.map((link) => (link as HTMLAnchorElement).href));
  expect(urls).toHaveLength(15);
  for (const url of urls) {
    await page.goto(url);
    const explorer = page.locator('[data-project-flow]');
    const last = explorer.locator('[data-flow-step]').last();
    await last.focus();
    await page.keyboard.press('Enter');
    await expect(last).toHaveAttribute('aria-pressed', 'true');
    await expect(explorer.locator('[data-step-label]')).toHaveText(await last.locator('strong').innerText());
    await expect(explorer.locator('[data-step-detail]')).not.toBeEmpty();
  }
});

test('screenshots and example descriptions remain available without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/projects/geodocs-document-assistant');
  const first = page.locator('[data-gallery-image]').first();
  await expect(first.locator('img')).toBeVisible();
  await expect(page.locator('.flow-fallback')).toBeVisible();
  await first.click();
  expect(page.url()).toContain('geodocs-flows.webp');
  await context.close();
});
