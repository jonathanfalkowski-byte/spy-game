import { chromium } from '@playwright/test';
import { createServer } from 'vite';
import { mkdir, writeFile } from 'node:fs/promises';
import os from 'node:os';
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
const browser = await chromium.launch();
try {
  const { runMission, missionStart } = await server.ssrLoadModule('/tests/mission-helpers.ts');
  const { encodeSave, SAVE_KEY } = await server.ssrLoadModule('/src/persistence/saves.ts');
  const { replay } = await server.ssrLoadModule('/src/state/reducer.ts');
  const { replay: replayV8 } = await server.ssrLoadModule(
    '/src/persistence/legacy-v8/state/reducer.ts',
  );
  const { documents, relationLabels, assessments } = await server.ssrLoadModule(
    '/src/content/evidence.ts',
  );
  const full = runMission(missionStart(), { hub: ['lead.service', 'assess.begin'] });
  const results = {};
  for (const mode of ['startup', 'currentSave', 'content8Save', 'choice']) {
    const samples = [];
    for (let i = 0; i < 7; i++) {
      const context = await browser.newContext();
      const page = await context.newPage();
      const seed =
        mode === 'currentSave'
          ? encodeSave(full)
          : mode === 'content8Save'
            ? JSON.stringify({ schemaVersion: 5, contentVersion: 8, state: replayV8(full.ledger) })
            : null;
      if (seed)
        await context.addInitScript(({ key, raw }) => localStorage.setItem(key, raw), {
          key: SAVE_KEY,
          raw: seed,
        });
      await page.goto('http://127.0.0.1:4173/');
      await page.locator('#story h1').waitFor();
      if (mode === 'choice') {
        await page.evaluate(() => {
          document.addEventListener(
            'click',
            () => {
              const start = performance.now();
              const observer = new MutationObserver(() => {
                if (document.querySelector('[data-choice="morning.yes"]')) {
                  observer.disconnect();
                  requestAnimationFrame(() =>
                    requestAnimationFrame(() => {
                      window.__choiceMs = performance.now() - start;
                    }),
                  );
                }
              });
              observer.observe(document.querySelector('#story'), {
                childList: true,
                subtree: true,
              });
            },
            { once: true, capture: true },
          );
        });
        await page.locator('[data-choice="bond.friend"]').click();
        await page.waitForFunction(() => typeof window.__choiceMs === 'number');
        samples.push(await page.evaluate(() => window.__choiceMs));
      } else samples.push(await page.evaluate(() => performance.now()));
      await context.close();
    }
    const sorted = [...samples].sort((a, b) => a - b);
    results[mode] = { samplesMs: samples, medianMs: sorted[3], p95Ms: sorted[6] };
  }
  // One end-to-end UI traversal, without a seeded narrative save or chapter skips.
  const context = await browser.newContext(),
    page = await context.newPage();
  await page.goto('http://127.0.0.1:4173/');
  const started = performance.now();
  for (const { action: a } of full.ledger) {
    const field = {
      CHOOSE_DIALOGUE: 'choice',
      DAY_CHOOSE: 'day-choice',
      CLINIC_CHOOSE: 'clinic-choice',
      MISSION_CHOOSE: 'mission-choice',
    }[a.type];
    if (field) await page.locator('[data-' + field + '="' + a.id + '"]').click();
    else if (a.type === 'CONTINUE') await page.locator('.continue-row button').click();
    else if (a.type === 'READ_DOCUMENT')
      await page
        .getByRole('button', {
          name: 'Read ' + documents.find((d) => d.id === a.id).title,
          exact: true,
        })
        .click();
    else if (a.type === 'TOGGLE_EVIDENCE')
      await page
        .getByRole('button', { name: documents.find((d) => d.id === a.id).summary, exact: false })
        .click();
    else if (a.type === 'CONNECT_EVIDENCE')
      await page.getByRole('button', { name: relationLabels[a.relation], exact: true }).click();
    else if (a.type === 'REVIEW_ASSESSMENT')
      await page
        .getByRole('button', { name: assessments.find((x) => x.id === a.id).label, exact: false })
        .click();
    else if (a.type === 'SUBMIT_ASSESSMENT')
      await page.getByRole('button', { name: 'Submit this assessment', exact: true }).click();
    else throw Error('Unimplemented walkthrough action ' + a.type);
    await page.waitForFunction(
      ({ key, revision }) =>
        JSON.parse(localStorage.getItem(key) || '{}').state?.revision === revision,
      { key: SAVE_KEY, revision: a.expectedRevision + 1 },
    );
  }
  const raw = await page.evaluate((key) => localStorage.getItem(key), SAVE_KEY);
  if (raw !== encodeSave(replay(full.ledger)))
    throw Error('UI walkthrough differs from deterministic replay');
  results.automatedTraversal = {
    actions: full.revision,
    durationSeconds: (performance.now() - started) / 1000,
    ending: full.scene + '.' + full.phase,
    humanReadingTime: false,
  };
  await page.screenshot({ path: 'review-saves/garage-desktop.png', fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByLabel('Reading size').selectOption('24');
  await page.getByRole('button', { name: /^Evidence journal/ }).click();
  await page.screenshot({ path: 'review-saves/journal-narrow.png', fullPage: true });
  await context.close();
  await mkdir('review-results', { recursive: true });
  await writeFile(
    'review-results/performance.json',
    JSON.stringify(
      {
        measuredAt: new Date().toISOString(),
        platform: os.platform(),
        release: os.release(),
        cpu: os.cpus()[0].model,
        ramGiB: os.totalmem() / 2 ** 30,
        node: process.version,
        browser: browser.version(),
        method:
          'Seven isolated Chromium contexts per metric. Navigation start to visible story locator (includes automation observation overhead); click dispatch to next scene mutation plus two animation frames. Local loopback production preview; no CPU/network throttling. Not a human reading-duration estimate.',
        results,
      },
      null,
      2,
    ),
  );
  console.log(JSON.stringify(results, null, 2));
} finally {
  await browser.close();
  await server.close();
}
