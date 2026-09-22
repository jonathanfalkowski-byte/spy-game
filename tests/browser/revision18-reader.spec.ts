import { test, expect } from '@playwright/test';
import packageJson from '../../docs/story/REVISION_18_EDITORIAL_PACKAGE.json' with { type: 'json' };
import { act, newGameState, replay } from '../../src/state/reducer';
import { encodeSave, decodeSave, SAVE_KEY } from '../../src/persistence/saves';
import { end4, walk5 } from '../chapter5-helpers';
import { openingVisualFixtures } from '../opening-visual-fixtures';
const entries: { file: string; context: string; old: string; new: string }[] = packageJson.entries;
const entry = (file: string, context: string) =>
  entries.find((e: any) => e.file.endsWith(file) && e.context === context)!;
const snapshots = new Map<string, any>();
let traversed = newGameState();
for (const event of end4('intimate', 'personal', 'sex').ledger) {
  traversed = act(traversed, event.action);
  const node = traversed.scene + '.' + traversed.phase;
  if (!snapshots.has(node)) snapshots.set(node, structuredClone(traversed));
}
const steps = [
  'begin',
  'go-spend',
  'spend-nothing',
  'echo-listing',
  'invitation-attend',
  'look-glamorous',
  'leave-room',
  'offer-decline',
  'service-municipal',
  'terms-refuse',
  'people-finish',
  'want-julian',
];
const invitation18 = walk5(replay(end4('intimate', 'personal', 'sex').ledger, 18), steps);
const handoff18 = walk5(invitation18, ['desire-personal', 'consent-sex']);
const historical17 = walk5(
  act(end4('intimate', 'personal', 'sex'), { type: 'CONTINUE_AUDIT_REVISION' }),
  steps,
);
const assets = [
  'opening-apartment-master-v2-production',
  'opening-apartment-master-v2-production',
  'opening-apartment-master-v2-production',
  'axiom-approach-v2-production',
  'axiom-security-lobby-v2-production',
  'axiom-office-arrival-v1-production',
  null,
  null,
  null,
  'axiom-casework-file-v1-production',
  'axiom-casework-brief-v1-production',
  'axiom-casework-documents-v1-production',
  'axiom-casework-documents-v1-production',
  'axiom-casework-review-v1-production',
  'axiom-casework-submitted-v1-production',
  null,
  null,
  null,
  null,
  null,
];
async function load(page: any, state: any) {
  const raw = encodeSave(state);
  await page.goto('/');
  await page.evaluate(({ key, raw }: any) => localStorage.setItem(key, raw), {
    key: SAVE_KEY,
    raw,
  });
  await page.reload();
  await expect(page.locator('h1')).toBeVisible();
  expect(await page.evaluate((key: string) => localStorage.getItem(key), SAVE_KEY)).toBe(raw);
  return raw;
}
async function unchangedReload(page: any, raw: string) {
  await page.reload();
  await expect(page.locator('h1')).toBeVisible();
  expect(await page.evaluate((key: string) => localStorage.getItem(key), SAVE_KEY)).toBe(raw);
}
function monitor(page: any) {
  const errors: string[] = [];
  page.on('pageerror', (e: any) => errors.push(e.message));
  page.on('response', (r: any) => {
    if (r.status() >= 400) errors.push(r.status() + ' ' + r.url());
  });
  return errors;
}
for (const width of [1440, 390]) {
  test('opening20 exact assets and saves ' + width, async ({ browser }, testInfo) => {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await context.newPage();
    const errors = monitor(page);
    let visible = 0;
    for (const [i, { state, position }] of openingVisualFixtures().entries()) {
      const current = replay(state.ledger, 18);
      expect(current.contentRevision).toBe(18);
      const raw = await load(page, current);
      for (let n = 0; n < position; n++)
        await page.getByRole('button', { name: 'Continue scene', exact: true }).click();
      const stage = page.locator('.scene-art-stage');
      if (assets[i]) {
        visible++;
        await expect(stage).toHaveAttribute('data-asset-id', assets[i]!);
        await expect
          .poll(() =>
            stage
              .locator('img.scene-art-image')
              .evaluate((im: any) => im.complete && im.naturalWidth > 0),
          )
          .toBe(true);
      } else await expect(stage).toHaveCount(0);
      await page.locator('h1').click();
      expect(await page.evaluate((key: string) => localStorage.getItem(key), SAVE_KEY)).toBe(raw);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      );
      if (i === 5)
        await page.screenshot({
          path: testInfo.outputPath('revision18-office-arrival-' + width + '.png'),
          fullPage: true,
        });
    }
    expect(visible).toBe(14);
    expect(errors).toEqual([]);
    await context.close();
  });
  test('revised pilots and Julian live reload ' + width, async ({ browser }, testInfo) => {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await context.newPage();
    const errors = monitor(page);
    const cases = [
      {
        state: snapshots.get('office.benton'),
        copy: entry('dialogue.ts', 'promotion.professional response').new,
        label: 'daniel',
      },
      {
        state: snapshots.get('chapter3.home'),
        copy: entry('chapter3.ts', 'chapter3.home').new,
        label: 'home',
      },
      {
        state: snapshots.get('chapter3.surveillance'),
        copy: entry('chapter3.ts', 'chapter3.surveillance').new,
        label: 'surveillance',
      },
      {
        state: snapshots.get('chapter4.handoff'),
        copy: entry('chapter4-power.ts', 'handoff').new,
        label: 'julian-ch4',
      },
      {
        state: invitation18,
        copy: entry('chapter5-desire.ts', 'want-julian reply').new,
        label: 'julian-call',
      },
      { state: handoff18, copy: entry('chapter5-desire.ts', 'handoff').new, label: 'julian-ch5' },
    ];
    for (const item of cases) {
      expect(item.state, item.label).toBeTruthy();
      expect(item.state.contentRevision).toBe(18);
      const raw = await load(page, item.state);
      await expect(page.locator('body')).toContainText(item.copy);
      if (item.label === 'home')
        await expect(page.locator('body')).not.toContainText('Chapter 3 continuation recorded. The historical day remains unchanged.');
      await unchangedReload(page, raw);
      await expect(page.locator('body')).toContainText(item.copy);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      );
      if (item.label === 'home' || item.label === 'julian-ch5')
        await page.screenshot({
          path: testInfo.outputPath('revision18-' + item.label + '-' + width + '.png'),
          fullPage: true,
        });
    }
    await page.locator('[data-chapter5-choice="chapter5.fade"]').click();
    await expect(page.locator('body')).toContainText(entry('chapter5-desire.ts', 'sex fade').new);
    const after = await page.evaluate((key: string) => localStorage.getItem(key), SAVE_KEY);
    if (after === null) throw new Error('Revision18 save missing after the fade choice');
    expect(decodeSave(after).contentRevision).toBe(18);
    await unchangedReload(page, after);
    await expect(page.locator('body')).toContainText(entry('chapter5-desire.ts', 'sex fade').new);
    await load(page, snapshots.get('chapter4.handoff'));
    await page.locator('[data-chapter4-choice="chapter4.fade"]').click();
    await expect(page.locator('body')).toContainText(entry('chapter4-power.ts', 'sex fade').new);
    expect(errors).toEqual([]);
    await context.close();
  });
  test(
    'historical17 actual Julian copy and authenticated reload ' + width,
    async ({ browser }, testInfo) => {
      expect(historical17.contentRevision).toBe(17);
      expect(historical17.scene + '.' + historical17.phase).toBe('chapter5.want');
      const context = await browser.newContext({ viewport: { width, height: 900 } });
      const page = await context.newPage();
      const errors = monitor(page);
      const raw = await load(page, historical17);
      const line = entry('chapter5-desire.ts', 'want-julian reply');
      await expect(page.locator('body')).toContainText(line.old);
      await expect(page.locator('body')).not.toContainText(line.new);
      await unchangedReload(page, raw);
      await expect(page.locator('body')).toContainText(line.old);
      expect(JSON.parse(raw).contentVersion).toBe(17);
      expect(errors).toEqual([]);
      await context.close();
    },
  );
}
