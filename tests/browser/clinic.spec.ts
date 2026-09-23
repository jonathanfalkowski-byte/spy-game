import { openNavigation, setReadingSize } from './reader-navigation';
import { test, expect, chromium, type Page } from '@playwright/test';
import { replay as clinicV5Replay } from '../../src/persistence/legacy-v5/state/reducer';
import { EventSchema as ClinicV5Event } from '../../src/persistence/legacy-v5/state/actions';
import { clinicStart, traverse, defaults } from '../clinic-helpers';
import { endAccepted, evening } from '../day-helpers';
import { encodeSave, decodeSave, SAVE_KEY } from '../../src/persistence/saves';
import { replay as oldReplay } from '../../src/persistence/legacy-v4/state/reducer';
import { EventSchema as OldEvent } from '../../src/persistence/legacy-v4/state/actions';
import type { GameState } from '../../src/state/schema';
const start = clinicStart();
test('existing clinic save receives revised prose without losing decisions or writing on load', async ({
  page,
}) => {
  const state = traverse(start, {}, 'name');
  const old = clinicV5Replay(ClinicV5Event.array().parse(state.ledger));
  const raw = JSON.stringify({ schemaVersion: 4, contentVersion: 5, state: old });
  await page.goto('/');
  await page.evaluate(({ key, raw }) => localStorage.setItem(key, raw), { key: SAVE_KEY, raw });
  await page.reload();
  await expect(page.locator('#story')).toContainText('I keep waiting for one feeling to settle');
  expect((await current(page)).clinic.mirror).toBe('unknown');
  expect(await page.evaluate((key) => localStorage.getItem(key), SAVE_KEY)).toBe(raw);
  await click(page, 'name.correct');
  expect((await current(page)).phase).toBe('rest');
});
test('questions append chronologically and focus the newest exchange, including after reload', async ({
  page,
}) => {
  await seed(page, traverse(start, {}, 'protocol'));
  await click(page, 'question.reverse');
  await click(page, 'question.ready');
  const exchanges = page.locator('[data-clinic-exchange]');
  await expect(exchanges).toHaveCount(3);
  await expect(exchanges.nth(0)).toContainText('Voss lowers the wall display');
  await expect(exchanges.nth(1)).toContainText('What would reversing this require?');
  await expect(exchanges.nth(2)).toContainText('How can I be ready tonight?');
  await expect(exchanges.nth(2)).toBeFocused();
  const position = await exchanges.nth(2).boundingBox();
  expect(position!.y).toBeGreaterThanOrEqual(0);
  expect(position!.y).toBeLessThan(await page.evaluate(() => innerHeight));
  await page.reload();
  await expect(exchanges).toHaveCount(3);
  await expect(exchanges.nth(1)).toContainText('What would reversing this require?');
  await expect(exchanges.nth(2)).toContainText('How can I be ready tonight?');
});
async function seed(page: Page, s = start) {
  await page.goto('/');
  await page.evaluate(({ key, raw }) => localStorage.setItem(key, raw), {
    key: SAVE_KEY,
    raw: encodeSave(s),
  });
  await page.reload();
}
async function click(page: Page, id: string) {
  await page.locator('[data-clinic-choice="' + id + '"]').click();
  await expect(page.getByText('We couldn’t read this save.')).toHaveCount(0);
}
async function current(page: Page): Promise<GameState> {
  return decodeSave((await page.evaluate((key) => localStorage.getItem(key), SAVE_KEY))!);
}
test('ten complete clinic scenes finish in transit with reload at every phase', async ({
  page,
}, info) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await seed(page);
  for (let i = 0; i < 70; i++) {
    const s = await current(page);
    if (s.clinic.outcome === 'departed') break;
    await click(page, defaults[s.phase]);
    await page.reload();
    await expect(page.getByText('We couldn’t read this save.')).toHaveCount(0);
  }
  await expect(
    page.getByRole('heading', { name: 'Sublevel 17 complete — en route to the Glass House' }),
  ).toBeVisible();
  await expect(page.getByRole('button', { name: 'Download save backup' })).toBeVisible();
  expect((await current(page)).clinic.stage).toBe('complete');
  expect(errors).toEqual([]);
  await page.screenshot({ path: info.outputPath('clinic-ending.png'), fullPage: true });
});
for (const phase of ['authorization', 'voice', 'face'])
  test(
    'clinic stop at ' + phase + ' is confirmed and remains stopped after reload',
    async ({ page }) => {
      await seed(page, traverse(start, {}, phase));
      if (phase !== 'authorization') await click(page, phase + '.pause');
      await click(page, 'stop.request');
      expect((await current(page)).clinic.outcome).toBeNull();
      await click(page, 'stop.back');
      expect((await current(page)).clinic.authorized).toBe(phase !== 'authorization');
      await click(page, 'stop.request');
      await click(page, 'stop.confirm');
      await page.reload();
      await expect(
        page.getByRole('heading', { name: 'Treatment stopped', exact: true }),
      ).toBeVisible();
      await expect(
        page.getByText('No further adaptation. Discharge arrangements pending.', { exact: false }),
      ).toBeVisible();
      expect((await current(page)).clinic.stage).toBe(
        phase === 'authorization' ? 'unchanged' : phase,
      );
      await expect(page.locator('[data-clinic-choice]')).toHaveCount(0);
    },
  );
test('private answer appears immediately; pause and free voice sample do not auto-resume', async ({
  page,
}) => {
  await seed(page, traverse(start, {}, 'privacyReply'));
  await click(page, 'private.stop');
  await expect(page.locator('#story')).toContainText('I can halt treatment');
  await seed(page, traverse(start, {}, 'voice'));
  const score = (await current(page)).clinic.investment;
  await click(page, 'voice.sample');
  await click(page, 'voice.sample');
  expect((await current(page)).clinic.investment).toBe(score);
  expect((await current(page)).clinic.voice).toBeNull();
  await click(page, 'voice.pause');
  await page.reload();
  expect((await current(page)).clinic.paused).toBe(true);
  await click(page, 'voice.resume');
  await click(page, 'voice.evelyn');
  await expect(page.locator('#story')).toContainText('established Evelynn register');
});
test('fitting revisions and recovery disclosure remain explicit', async ({ page }) => {
  await seed(page, traverse(start, { contact: 'morning.miss' }, 'recoveryContact'));
  await click(page, 'contact.identity');
  await expect(page.locator('#story')).toContainText('sorry I missed our call');
  await expect(page.locator('#story')).toContainText('changed my body to a woman');
  await click(page, 'c.recoveryReply');
  await click(page, 'outfit.socialite');
  await click(page, 'makeup.evening');
  await click(page, 'fit.revise');
  expect((await current(page)).clinic.outfit).toBeNull();
  await click(page, 'outfit.shadow');
  await click(page, 'makeup.minimal');
  await click(page, 'fit.confirm');
  await expect(page.locator('#story')).toContainText('Being overlooked is useful');
});
test('clinic navigation and keyboard focus fit narrow screens at large text', async ({
  page,
}, info) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await seed(page, traverse(start, {}, 'authorization'));
  await setReadingSize(page, '24');
  const review = page.locator('[data-clinic-choice="auth.review"]');
  await review.focus();
  await page.keyboard.press('Enter');
  expect((await current(page)).clinic.authorized).toBe(false);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole('heading', { name: 'The first authorization' }).scrollIntoViewIfNeeded();
  await page.screenshot({
    path: info.outputPath('clinic-authorization-mobile.png'),
    fullPage: true,
  });
  await click(page, 'auth.yes');
  await click(page, 'c.preparation');
  await page.screenshot({ path: info.outputPath('clinic-voice-mobile.png'), fullPage: true });
  await expect(page.locator('.inspector')).toHaveCount(0);
});
test('previous completed save loads unchanged and enters clinic only on click', async ({
  page,
}) => {
  const old = oldReplay(OldEvent.array().parse(start.ledger));
  const raw = JSON.stringify({ schemaVersion: 3, contentVersion: 4, state: old });
  await page.goto('/');
  await page.evaluate(({ key, raw }) => localStorage.setItem(key, raw), { key: SAVE_KEY, raw });
  await page.reload();
  expect(await page.evaluate((key) => localStorage.getItem(key), SAVE_KEY)).toBe(raw);
  await click(page, 'clinic.begin');
  expect((await current(page)).phase).toBe('morning');
  expect(
    await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!).contentVersion, SAVE_KEY),
  ).toBe(9);
});
test('clinic storage failure stays truthful and restart requires confirmation', async ({
  page,
}) => {
  await seed(page, traverse(start, {}, 'authorization'));
  await page.evaluate(() => {
    Storage.prototype.setItem = () => {
      throw Error('quota');
    };
  });
  await click(page, 'auth.yes');
  await expect(page.getByRole('alert')).toContainText('not saved');
  await page.reload();
  expect((await current(page)).clinic.authorized).toBe(false);
  await openNavigation(page);
  await page.getByRole('button', { name: 'Restart story', exact: true }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('button', { name: 'Close dialog' }).click();
  expect((await current(page)).phase).toBe('authorization');
});
test('browser process reopens at a paused face checkpoint with the equipment still stopped', async ({}, info) => {
  const profile = info.outputPath('clinic-profile');
  const state = traverse(start, { face: 'face.pause' }, 'facePause');
  const raw = encodeSave(state);
  let context = await chromium.launchPersistentContext(profile, { headless: true });
  let page = await context.newPage();
  await page.goto('http://127.0.0.1:4173');
  await page.evaluate(({ key, raw }) => localStorage.setItem(key, raw), { key: SAVE_KEY, raw });
  await context.close();
  context = await chromium.launchPersistentContext(profile, { headless: true });
  page = await context.newPage();
  await page.goto('http://127.0.0.1:4173');
  await expect(
    page.getByRole('heading', { name: 'No further change for the moment' }),
  ).toBeVisible();
  expect((await current(page)).clinic.paused).toBe(true);
  expect(await page.evaluate((key) => localStorage.getItem(key), SAVE_KEY)).toBe(raw);
  await context.close();
});
