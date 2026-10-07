import { expect, test } from '@playwright/test';

const routes = [
  { path: '/', title: /Caio Nahuel/, heading: /Software, cloud.*AI development/i },
  { path: '/ai-systems', title: /AI Systems/, heading: /AI agents.*chatbots/i },
  { path: '/consulting', title: /Consulting/, heading: /Software, cloud.*AI systems/i },
  { path: '/workflow', title: /Engineering Workflow/, heading: /Engineering workflows/i },
  { path: '/repo-audit', title: /Repo Audit/, heading: /Know the shape of your codebase/i },
  { path: '/projects', title: /Projects/, heading: /Projects across/i },
  { path: '/projects/agent-qa-harness', title: /Agent QA Harness/, heading: /Agent QA Harness/i },
  { path: '/agent-qa-checklist', title: /Agent QA Checklist/, heading: /agent must produce evidence/i },
  { path: '/skills', title: /Skills/, heading: /Skills, tools.*& interests/i },
  { path: '/projects/orbit-trajectory-propagator', title: /OrbProp/, heading: /OrbProp/ },
  { path: '/contact', title: /Contact/, heading: /Tell me about your project/i }
];

test.describe('core routes', () => {
  for (const route of routes) {
    test(`${route.path} renders expected content`, async ({ page }) => {
      await page.goto(route.path);
      await expect(page).toHaveTitle(route.title);
      await expect(page.locator('main')).toBeVisible();
      await expect(page.getByRole('heading', { name: route.heading }).first()).toBeVisible();
    });
  }
});

test('primary consulting conversion path is reachable', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /See consulting services/i }).click();
  await expect(page).toHaveURL(/\/consulting$/);
  await expect(page.getByRole('heading', { name: /Software, cloud.*AI systems/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Discuss a technical build/i }).first()).toBeVisible();
});

test('repo audit and workflow downloads are reachable', async ({ request, page }) => {
  await page.goto('/repo-audit');
  await expect(page.getByRole('link', { name: /Download checklist/i }).first()).toBeVisible();

  for (const path of ['/downloads/agent-qa-checklist.md', '/downloads/repo-audit-checklist.md', '/downloads/project-record-template.md', '/downloads/ai-system-planning-checklist.md', '/cv-summary.md']) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
    await expect(response).toBeOK();
  }
});

test('project detail omits demo links when no demo exists', async ({ page }) => {
  await page.goto('/projects/godot-simulation-experiments');
  await expect(page.getByRole('heading', { name: 'Godot Simulation Experiments' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Open demo', exact: true })).toHaveCount(0);
  await expect(page.locator('main a[href="/projects"]').first()).toBeVisible();
});

test('mobile layout keeps navigation and CTA reachable', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.getByRole('banner').getByRole('button', { name: /Menu/ })).toBeVisible();
  await page.getByRole('button', { name: /Menu/ }).click();
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Projects', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Software, cloud.*AI development/i })).toBeVisible();
});


test('mobile menu supports Escape and restores focus', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const menu = page.getByRole('button', { name: /Menu/ });
  await menu.click();
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await expect(menu).toBeFocused();
  await menu.click();
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'AI systems', exact: true }).click();
  await expect(page).toHaveURL(/\/ai-systems$/);
});

test('project discovery handles search, combined filters, empty state, and reset', async ({ page }) => {
  await page.goto('/projects');
  await page.getByLabel('Search projects').fill('citation');
  await expect(page.locator('[data-project]:visible')).toHaveCount(1);
  await page.getByLabel('Discipline').selectOption('web apps');
  await expect(page.getByText('No projects match these filters.', { exact: false })).toBeVisible();
  await page.getByRole('button', { name: 'Reset filters' }).click();
  await expect(page.locator('[data-project]:visible')).toHaveCount(15);
  await expect(page.getByLabel('Search projects')).toBeFocused();
});

test('flow patterns switch with native keyboard controls', async ({ page }) => {
  await page.goto('/ai-systems');
  const operational = page.getByRole('button', { name: 'Operational agent' });
  await operational.focus();
  await page.keyboard.press('Enter');
  await expect(operational).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('heading', { name: 'Look up a record, then run an approved action.' })).toBeVisible();
  await expect(page.locator('#flow-documents')).toBeHidden();
  await page.getByRole('button', { name: 'Intake chatbot' }).click();
  await expect(page.getByRole('heading', { name: 'Collect the details and route the request.' })).toBeVisible();
});

test('navigation and content remain usable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto('/ai-systems');
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
  await expect(page.locator('.flow-pattern:visible')).toHaveCount(3);
  await page.goto('/projects');
  await expect(page.locator('[data-project]:visible')).toHaveCount(15);
  await context.close();
});

for (const width of [320, 390, 768, 1024, 1280, 1440]) {
  test(`core layouts reflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['/', '/ai-systems', '/consulting', '/projects', '/contact', '/skills', '/about', '/cv']) {
      await page.goto(route);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
      expect(overflow, `Horizontal overflow on ${route}`).toBe(false);
      await expect(page.locator('main h1')).toHaveCount(1);
    }
  });
}


test('date-only research metadata keeps its authored day', async ({ page }) => {
  for (const route of ['/research/document-assistants', '/research/scientific-visualization']) {
    await page.goto(route);
    await expect(page.locator('main time')).toHaveAttribute('datetime', '2026-10-06');
    await expect(page.locator('main time')).toHaveText('10/6/2026');
  }
});


test('skills diagram filters, searches, handles empty results, and resets', async ({ page }) => {
  await page.goto('/skills');
  const map = page.locator('[data-skills-map]');
  await expect(map.locator('[data-skill-branch]:visible')).toHaveCount(12);
  await map.getByRole('button', { name: 'Cloud', exact: true }).click();
  await expect(map.getByRole('button', { name: 'Cloud', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await map.getByLabel('Find a skill').fill('Terraform');
  await expect(map.locator('[data-skill-node]:visible')).toHaveText(['Terraform']);
  await expect(map.locator('[data-skill-branch]:visible')).toHaveCount(1);
  await map.getByLabel('Find a skill').fill('no-such-skill');
  await expect(map.getByText('No skills match this search.', { exact: false })).toBeVisible();
  await map.getByRole('button', { name: 'Reset', exact: true }).click();
  await expect(map.locator('[data-skill-branch]:visible')).toHaveCount(12);
  await expect(map.getByLabel('Find a skill')).toBeFocused();
  await map.getByRole('button', { name: 'Chatbots', exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(map.locator('[data-skill-branch]:visible')).toHaveCount(1);
  await expect(map.getByRole('link', { name: /GeoDocs assistant/ })).toBeVisible();
});

test('skills diagram keeps the full catalog without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto('/skills');
  await expect(page.locator('[data-skill-branch]:visible')).toHaveCount(12);
  await expect(page.getByText('Terraform', { exact: true })).toBeVisible();
  await expect(page.getByText('French — intermediate', { exact: true })).toBeVisible();
  await expect(page.getByText('Piano', { exact: true })).toBeVisible();
  await expect(page.locator('[data-skills-controls]')).toBeHidden();
  await context.close();
});

test('personal skills filter keeps language levels and leads to the profile', async ({ page }) => {
  await page.goto('/skills');
  const map = page.locator('[data-skills-map]');
  const personal = map.getByRole('button', { name: 'Personal', exact: true });
  await personal.focus();
  await page.keyboard.press('Enter');
  await expect(personal).toHaveAttribute('aria-pressed', 'true');
  await expect(map.locator('[data-skill-branch]:visible')).toHaveCount(3);
  await expect(map.locator('[data-skill-node]:visible')).toHaveText([
    'Leadership', 'Management', 'Guitar', 'Piano',
    'Portuguese — native', 'English — fluent', 'Spanish — fluent', 'French — intermediate'
  ]);
  await expect(map.getByRole('status')).toHaveText('8 skills across 3 areas');
  await map.getByLabel('Find a skill').fill('French');
  await expect(map.locator('[data-skill-node]:visible')).toHaveText(['French — intermediate']);
  await map.getByRole('link', { name: /Language profile/ }).click();
  await expect(page).toHaveURL(/\/about#spoken-languages$/);
  await expect(page.locator('#spoken-languages')).toBeInViewport();
  await expect(page.locator('#spoken-languages dd')).toHaveText(['native', 'fluent', 'fluent', 'intermediate']);
});

test('about and CV include the confirmed personal profile', async ({ page }) => {
  for (const route of ['/about', '/cv']) {
    await page.goto(route);
    await expect(page.locator('#leadership-management li')).toHaveText(['Leadership', 'Management']);
    await expect(page.locator('#music li')).toHaveText(['Guitar', 'Piano']);
    await expect(page.locator('#spoken-languages dt')).toHaveText(['Portuguese', 'English', 'Spanish', 'French']);
    await expect(page.locator('#spoken-languages dd')).toHaveText(['native', 'fluent', 'fluent', 'intermediate']);
  }
});

test('contact destinations and public project presentation follow the profile', async ({ page }) => {
  for (const route of ['/', '/contact', '/consulting', '/ai-systems', '/about', '/projects/orbit-trajectory-propagator']) {
    await page.goto(route);
    const emails = await page.locator('a[href^="mailto:"]').evaluateAll((links) => links.map((link) => link.getAttribute('href')));
    expect(emails.length).toBeGreaterThan(0);
    expect(emails.every((href) => href?.startsWith('mailto:caionahuel@gmail.com'))).toBe(true);
    await expect(page.getByText(/Implementation in progress|No public demo|Next steps|Evidence & access/, { exact: false })).toHaveCount(0);
  }
});


test('downloadable CV uses the same development profile and contact', async ({ request }) => {
  const response = await request.get('/cv-summary.md');
  await expect(response).toBeOK();
  const content = await response.text();
  expect(content).toContain('cloud infrastructure, AI agents, and chatbots');
  expect(content).toContain('caionahuel@gmail.com');
  expect(content).toContain('Leadership, Management');
  expect(content).toContain('Guitar, Piano');
  expect(content).toContain('Portuguese — native');
  expect(content).toContain('English — fluent');
  expect(content).toContain('Spanish — fluent');
  expect(content).toContain('French — intermediate');
});
