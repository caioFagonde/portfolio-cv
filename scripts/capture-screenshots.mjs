import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import net from 'node:net';

const screenshotDir = 'artifacts/screenshots';
const reportDir = 'artifacts/reports';

const routes = [
  { name: 'home', path: '/' },
  { name: 'consulting', path: '/consulting' },
  { name: 'ai-systems', path: '/ai-systems' },
  { name: 'project-geodocs', path: '/projects/geodocs-document-assistant' },
  { name: 'project-relasp', path: '/projects/relasp' },
  { name: 'project-personal-os', path: '/projects/personal-os' },
  { name: 'project-resurgent-library', path: '/projects/resurgent-library' },
  { name: 'project-public-source-ingestion', path: '/projects/public-source-ingestion' },
  { name: 'project-document-report-automation', path: '/projects/document-report-automation' },
  { name: 'project-agentic-cortex', path: '/projects/agentic-cortex' },
  { name: 'project-foundry-platform', path: '/projects/foundry-platform' },
  { name: 'project-lidar-webgl-client', path: '/projects/lidar-webgl-client' },
  { name: 'project-visual-metrology-studio', path: '/projects/visual-metrology-studio' },
  { name: 'project-godot-simulation-experiments', path: '/projects/godot-simulation-experiments' },
  { name: 'project-rgm-compression', path: '/projects/rgm-compression' },

  { name: 'project-orbprop', path: '/projects/orbit-trajectory-propagator' },
  { name: 'skills', path: '/skills' },
  { name: 'case-orbprop', path: '/cases/orbit-trajectory-propagator' },
  { name: 'research', path: '/research' },
  { name: 'research-document-assistants', path: '/research/document-assistants' },
  { name: 'research-scientific-visualization', path: '/research/scientific-visualization' },
  { name: 'project-hasselt', path: '/projects/hasselt-infill-atlas' },
  { name: 'case-agentic-cortex', path: '/cases/agentic-cortex' },
  { name: 'about', path: '/about' },
  { name: 'cv', path: '/cv' },
  { name: 'cases', path: '/cases' },
  { name: 'lab', path: '/lab' },
  { name: 'workflow', path: '/workflow' },
  { name: 'repo-audit', path: '/repo-audit' },
  { name: 'projects', path: '/projects' },
  { name: 'project-agent-qa-harness', path: '/projects/agent-qa-harness' },
  { name: 'agent-qa-checklist', path: '/agent-qa-checklist' },
  { name: 'demos', path: '/demos' },
  { name: 'contact', path: '/contact' }
];

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'laptop', width: 1280, height: 720 },
  { name: 'tablet-landscape', width: 1024, height: 768 },
  { name: 'tablet-portrait', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 }
];

async function isPortFree(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once('error', () => resolve(false));
    server.once('listening', () => {
      server.close(() => resolve(true));
    });
    server.listen(port, '127.0.0.1');
  });
}

async function findPort(start = 4321) {
  for (let port = start; port < start + 40; port += 1) {
    if (await isPortFree(port)) return port;
  }
  throw new Error('No free local port found for Astro dev server.');
}

async function waitForServer(url, timeoutMs = 120_000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
  throw new Error(`Timed out waiting for ${url}`);
}

async function startServer() {
  if (process.env.SITE_URL) {
    return { baseURL: process.env.SITE_URL.replace(/\/$/, ''), stop: async () => {} };
  }

  const port = await findPort(Number(process.env.PORT ?? 4321));
  const child = spawn('pnpm', ['exec', 'astro', 'dev', '--host', '127.0.0.1', '--port', String(port)], {
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, FORCE_COLOR: '0' }
  });

  let serverLog = '';
  child.stdout.on('data', (chunk) => {
    serverLog += chunk.toString();
  });
  child.stderr.on('data', (chunk) => {
    serverLog += chunk.toString();
  });

  const baseURL = `http://127.0.0.1:${port}`;
  await waitForServer(baseURL);

  return {
    baseURL,
    stop: async () => {
      child.kill('SIGTERM');
      await writeFile(`${reportDir}/screenshot-server.log`, serverLog);
    }
  };
}

await mkdir(screenshotDir, { recursive: true });
await mkdir(reportDir, { recursive: true });

const server = await startServer();
const browser = await chromium.launch();
const manifest = {
  generatedAt: new Date().toISOString(),
  baseURL: server.baseURL,
  routes,
  viewports,
  screenshots: [],
  stateScreenshots: []
};

try {
  for (const route of routes) {
    for (const viewport of viewports) {
      const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } });
      const response = await page.goto(`${server.baseURL}${route.path}`, { waitUntil: 'networkidle' });
      if (!response?.ok()) throw new Error(`Route ${route.path} returned ${response?.status()}`);
      await page.evaluate(async () => { await document.fonts.ready; const images = Array.from(document.images); images.forEach((image) => { image.loading = 'eager'; }); await Promise.all(images.map((image) => image.decode().catch(() => {}))); });
      const defects = await page.evaluate(() => ({ overflow: document.documentElement.scrollWidth > innerWidth + 1, brokenImages: Array.from(document.images).filter((image) => image.hasAttribute('src') && (!image.complete || image.naturalWidth === 0)).map((image) => image.src) }));
      if (defects.overflow || defects.brokenImages.length) throw new Error(`Layout/image defect at ${route.path}/${viewport.name}: ${JSON.stringify(defects)}`);
      await page.emulateMedia({ reducedMotion: 'reduce' });
      const path = `${screenshotDir}/${route.name}-${viewport.name}.png`;
      await page.screenshot({ path, fullPage: true, animations: 'disabled' });
      await page.close();
      manifest.screenshots.push({ route: route.path, viewport, path });
      console.log(`Captured ${path}`);
    }
  }
  const states = [
    { name: 'gallery-desktop', route: '/projects/geodocs-document-assistant', viewport: { width: 1440, height: 900 }, action: async (page) => { await page.locator('[data-gallery-image]').first().click(); } },
    { name: 'gallery-mobile', route: '/projects/geodocs-document-assistant', viewport: { width: 390, height: 844 }, action: async (page) => { await page.locator('[data-gallery-image]').first().click(); } },
    { name: 'retrieval-missing-mobile', route: '/demos', viewport: { width: 390, height: 844 }, action: async (page) => { await page.getByRole('button', { name: 'What is the project budget?' }).click(); await page.locator('.retrieval-conversation').scrollIntoViewIfNeeded(); } },
    { name: 'spatial-filter-desktop', route: '/demos', viewport: { width: 1440, height: 900 }, action: async (page) => { await page.getByLabel('Minimum sample score').fill('65'); await page.locator('#spatial-map').scrollIntoViewIfNeeded(); } },
    { name: 'cloud-detail-mobile', route: '/demos', viewport: { width: 390, height: 844 }, action: async (page) => { await page.getByLabel('Visible detail').fill('20'); await page.locator('#spatial-cloud').scrollIntoViewIfNeeded(); } },
    { name: 'skills-cloud-desktop', route: '/skills', viewport: { width: 1440, height: 900 }, action: async (page) => { await page.getByRole('button', { name: 'Cloud', exact: true }).click(); await page.locator('[data-skills-map]').evaluate((element) => { const top = element.getBoundingClientRect().top + window.scrollY - 100; window.scrollTo(0, top); }); } },
    { name: 'skills-chatbots-mobile', route: '/skills', viewport: { width: 390, height: 844 }, action: async (page) => { await page.getByRole('button', { name: 'Chatbots', exact: true }).click(); await page.locator('[data-skills-map]').evaluate((element) => { const top = element.getBoundingClientRect().top + window.scrollY - 100; window.scrollTo(0, top); }); } },
    { name: 'skills-search-empty', route: '/skills', viewport: { width: 1440, height: 900 }, action: async (page) => { await page.getByLabel('Find a skill').fill('no-such-skill'); await page.locator('[data-skills-map]').evaluate((element) => { const top = element.getBoundingClientRect().top + window.scrollY - 100; window.scrollTo(0, top); }); } },
    { name: 'mobile-menu-open', route: '/', viewport: { width: 390, height: 844 }, action: async (page) => { await page.getByRole('button', { name: /Menu/ }).click(); } },
    { name: 'project-filter-empty', route: '/projects', viewport: { width: 1440, height: 900 }, action: async (page) => { await page.getByLabel('Search projects').fill('no-such-project'); await page.locator('#project-index').scrollIntoViewIfNeeded(); } },
    { name: 'ai-operational-flow', route: '/ai-systems', viewport: { width: 1440, height: 900 }, action: async (page) => { await page.getByRole('button', { name: 'Operational agent' }).click(); await page.locator('.flow-explorer').scrollIntoViewIfNeeded(); } }
  ];
  for (const state of states) {
    const page = await browser.newPage({ viewport: state.viewport });
    await page.goto(`${server.baseURL}${state.route}`, { waitUntil: 'networkidle' });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await state.action(page);
    const path = `${screenshotDir}/${state.name}.png`;
    await page.screenshot({ path, animations: 'disabled' });
    manifest.stateScreenshots.push({ name: state.name, route: state.route, viewport: state.viewport, path });
    await page.close();
    console.log(`Captured ${path}`);
  }
  await writeFile(`${reportDir}/screenshots-manifest.json`, `${JSON.stringify(manifest, null, 2)}\n`);
} finally {
  await browser.close();
  await server.stop();
}
