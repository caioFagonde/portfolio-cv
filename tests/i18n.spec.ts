import { expect, test } from '@playwright/test';

const routes = ['/', '/consulting', '/workflow', '/repo-audit', '/projects', '/projects/agent-qa-harness', '/agent-qa-checklist', '/demos', '/contact', '/skills', '/about', '/cv', '/ai-systems', '/projects/orbit-trajectory-propagator', '/cases/orbit-trajectory-propagator', '/research/document-assistants'];

test('Portuguese pages have localized content, links, metadata, and one primary heading', async ({ page }) => {
  for (const route of routes) {
    await page.goto(`/pt${route}`);
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
    await expect(page.locator('main h1')).toHaveCount(1);
    await expect(page.getByRole('link', { name: 'Projetos', exact: true }).first()).toHaveAttribute('href', '/pt/projects');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', new RegExp(`/pt${route.replace(/\/$/, '')}/$`));
    await expect(page.locator('link[hreflang="en"]')).toHaveAttribute('href', new RegExp(`${route.replace(/\/$/, '')}/$`));
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', 'pt_BR');
    const mail = await page.locator('a[href^="mailto:"]').evaluateAll((links) => links.map((link) => link.getAttribute('href')));
    expect(mail.every((href) => href?.startsWith('mailto:caionahuel@gmail.com'))).toBe(true);
    const destinations = await page.locator('main a[href^="/"]').evaluateAll((links) => links.map((link) => link.getAttribute('href')!));
    expect(destinations.every((href) => href.startsWith('/pt/') || /\.[a-z0-9]+(?:[?#]|$)/i.test(href)), route).toBe(true);
  }
});

test('language switch preserves the project and reading anchor in both directions', async ({ page }) => {
  await page.goto('/projects/orbit-trajectory-propagator#project-example');
  await page.locator('[data-language-switch] a[hreflang="pt-BR"]').click();
  await expect(page).toHaveURL(/\/pt\/projects\/orbit-trajectory-propagator#project-example$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
  await expect(page.locator('#project-example')).toBeInViewport();
  await page.locator('[data-language-switch] a[hreflang="en"]').click();
  await expect(page).toHaveURL(/\/projects\/orbit-trajectory-propagator#project-example$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('Portuguese personal skills support unaccented search and localized counts', async ({ page }) => {
  await page.goto('/pt/skills');
  await page.locator('[data-skill-filter="personal"]').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('[data-skills-count]')).toHaveText('8 habilidades em 3 áreas');
  await expect(page.locator('[data-skill-node]:visible')).toHaveText(['Liderança', 'Gestão', 'Guitarra', 'Piano', 'Português — nativo', 'Inglês — fluente', 'Espanhol — fluente', 'Francês — intermediário']);
  await page.locator('[data-skills-search]').fill('frances');
  await expect(page.locator('[data-skill-node]:visible')).toHaveText(['Francês — intermediário']);
  await expect(page.locator('[data-skills-count]')).toHaveText('1 habilidade em 1 área');
  await page.locator('[data-skills-search]').fill('sem-correspondencia');
  await expect(page.locator('[data-skills-empty]')).toBeVisible();
  await page.locator('[data-skills-reset]').click();
  await expect(page.locator('[data-skills-search]')).toBeFocused();
  await expect(page.locator('[data-skill-branch]:visible')).toHaveCount(12);
  // Build tool names must not be translated as ordinary English words.
  await expect(page.getByText('Make', { exact: true })).toBeVisible();
  await expect(page.getByText('Just', { exact: true })).toBeVisible();
});

test('Portuguese document retrieval cites Portuguese sources and handles missing evidence', async ({ page }) => {
  await page.goto('/pt/demos');
  await page.getByRole('button', { name: 'Quem aprova a publicação?' }).click();
  await expect(page.locator('[data-citation]')).toHaveText('Ver página 2 ↗');
  await expect(page.locator('[data-answer]')).toHaveText(await page.locator('[data-passage][data-page="2"]').getAttribute('data-text') ?? '');
  await page.getByRole('button', { name: 'Qual é o orçamento do projeto?' }).click();
  await expect(page.locator('[data-answer-label]')).toHaveText('Sem trecho de apoio');
  await expect(page.locator('[data-citation]')).toBeHidden();
  await page.locator('[data-kind="cloud"] input').fill('20');
  await expect(page.locator('[data-kind="cloud"] output')).toHaveText('20% · 180 pontos exibidos');
});

test('Portuguese project filtering and architecture details remain localized after interaction', async ({ page }) => {
  await page.goto('/pt/projects');
  await page.locator('#project-search').fill('sem-correspondencia');
  await expect(page.locator('#project-count')).toHaveText('0 projetos');
  await expect(page.locator('#no-projects')).toBeVisible();
  await page.locator('#project-reset').click();
  await expect(page.locator('#project-count')).toHaveText('15 projetos');
  await page.locator('#project-search').fill('citações');
  await expect(page.locator('[data-project]:visible')).not.toHaveCount(0);
  await page.goto('/pt/projects/orbit-trajectory-propagator');
  await page.locator('[data-flow-step="1"]').click();
  await expect(page.locator('[data-step-detail]')).toContainText('gravidade');
  await page.locator('[data-gallery-image]').first().click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('dialog').getByRole('button', { name: /Fechar/ })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('[data-gallery-image]').first()).toBeFocused();
});

test('Portuguese content and equivalent English links work without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto('/pt/skills');
  await expect(page.getByText('Francês — intermediário', { exact: true })).toBeVisible();
  await expect(page.locator('[data-skills-controls]')).toBeHidden();
  await page.locator('[data-language-switch] a[hreflang="en"]').click();
  await expect(page).toHaveURL(/\/skills$/);
  await expect(page.getByText('French — intermediate', { exact: true })).toBeVisible();
  await context.close();
});

test('Portuguese downloads and research dates match the selected language', async ({ request, page }) => {
  for (const path of ['/cv-summary.pt.md', ...['agent-qa-checklist', 'repo-audit-checklist', 'project-record-template', 'ai-system-planning-checklist'].map((name) => `/downloads/${name}.pt.md`)]) {
    const response = await request.get(path);
    await expect(response).toBeOK();
    if (path.includes('cv-summary')) {
      expect(await response.text()).toContain('Francês — intermediário');
      expect(await response.text()).toContain('caionahuel@gmail.com');
    }
  }
  await page.goto('/pt/research/document-assistants');
  await expect(page.locator('main time')).toHaveText('06/10/2026');
  await expect(page.locator('main time')).toHaveAttribute('datetime', '2026-10-06');
});

for (const width of [320, 390, 768, 1024, 1280, 1440]) {
  test(`Portuguese layouts reflow and keep the language switch visible at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['/pt/', '/pt/skills', '/pt/projects', '/pt/consulting', '/pt/ai-systems', '/pt/about', '/pt/cv', '/pt/demos', '/pt/contact']) {
      await page.goto(route);
      expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), route).toBe(false);
      await expect(page.locator('[data-language-switch]')).toBeVisible();
    }
  });
}
