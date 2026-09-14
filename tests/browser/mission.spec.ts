import { test, expect, chromium, type Page } from '@playwright/test';
import { missionStart, runMission, missionDefaults } from '../mission-helpers';
import { encodeSave, decodeSave, SAVE_KEY } from '../../src/persistence/saves';
import { replay as oldReplay } from '../../src/persistence/legacy-v6/state/reducer';
import { EventSchema as OldEvent } from '../../src/persistence/legacy-v6/state/actions';
import type { GameState } from '../../src/state/schema';
import { replay as missionV7Replay } from '../../src/persistence/legacy-v7/state/reducer';
import { EventSchema as MissionV7Event } from '../../src/persistence/legacy-v7/state/actions';
const start = missionStart();
test('existing first investigation resumes without repeating outfit advice on the second', async ({
  page,
}, info) => {
  const state = runMission(missionStart('socialite'), { hub: 'lead.guest' }, 'leadResult');
  const old = missionV7Replay(MissionV7Event.array().parse(state.ledger));
  const raw = JSON.stringify({ schemaVersion: 5, contentVersion: 7, state: old });
  await page.goto('/');
  await page.evaluate(({ key, raw }) => localStorage.setItem(key, raw), { key: SAVE_KEY, raw });
  await page.reload();
  await expect(page.locator('#story')).not.toContainText(
    'Conversation offers a way across the room',
  );
  expect(await page.evaluate((key) => localStorage.getItem(key), SAVE_KEY)).toBe(raw);
  await click(page, 'lead.return');
  await expect(page.locator('#story')).toContainText('one more lead');
  await expect(page.locator('#story')).not.toContainText('time for two lines');
  await click(page, 'lead.service');
  await expect(page.locator('#story')).not.toContainText(
    'Conversation offers a way across the room',
  );
  await expect(page.locator('#story')).toContainText('This will use one opportunity');
  await click(page, 'lead.confirm');
  await expect(page.locator('#story')).not.toContainText(
    'Conversation offers a way across the room',
  );
  expect((await current(page)).mission.remaining).toBe(0);
  await page.screenshot({
    path: info.outputPath('second-investigation-prose.png'),
    fullPage: true,
  });
});
async function seed(page: Page, state = start) {
  await page.goto('/');
  await page.evaluate(({ key, raw }) => localStorage.setItem(key, raw), {
    key: SAVE_KEY,
    raw: encodeSave(state),
  });
  await page.reload();
}
const click = (page: Page, id: string) =>
  page.locator('[data-mission-choice="' + id + '"]').click();
const current = async (page: Page) =>
  decodeSave((await page.evaluate((key) => localStorage.getItem(key), SAVE_KEY))!);

test('original departed save remains a checkpoint until an explicit continuation', async ({
  page,
}) => {
  const old = oldReplay(OldEvent.array().parse(start.ledger));
  const raw = JSON.stringify({ schemaVersion: 4, contentVersion: 6, state: old });
  await page.goto('/');
  await page.evaluate(({ key, raw }) => localStorage.setItem(key, raw), { key: SAVE_KEY, raw });
  await page.reload();
  await expect(page.getByRole('button', { name: 'Continue to the Glass House' })).toBeVisible();
  expect(await page.evaluate((key) => localStorage.getItem(key), SAVE_KEY)).toBe(raw);
  await click(page, 'mission.begin');
  expect((await current(page)).phase).toBe('car');
  expect(
    await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!).contentVersion, SAVE_KEY),
  ).toBe(9);
});

test('full operation with two leads reaches the garage, reloads every phase, and keeps questions chronological', async ({
  page,
}, info) => {
  test.setTimeout(120000);
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await seed(page);
  await click(page, 'mission.begin');
  await click(page, 'review.credentials');
  await click(page, 'review.maya');
  const exchanges = page.locator('[data-clinic-exchange]');
  await expect(exchanges).toHaveCount(3);
  await expect(exchanges.last()).toBeFocused();
  await expect(exchanges.nth(1)).toContainText('Evelyn Vale. Axiom Strategic Acquisitions.');
  await expect(exchanges.nth(2)).toContainText('There are no new messages.');
  expect((await exchanges.last().boundingBox())!.y).toBeLessThan(200);
  let leads = 0;
  for (let i = 0; i < 60; i++) {
    const s = await current(page);
    if (s.mission.outcome) break;
    const id =
      s.phase === 'hub' && leads < 2
        ? ['lead.guest', 'lead.celeste'][leads++]
        : missionDefaults[s.phase];
    await click(page, id);
    await page.reload();
    await expect(page.getByText('We couldn’t read this save.')).toHaveCount(0);
  }
  const end = await current(page);
  expect(end.mission.capture?.quality).toBe('substantive');
  expect(end.mission.outcome).toBe('complete');
  await expect(page.getByRole('heading', { name: 'The Glass House is behind you' })).toBeVisible();
  await expect(page.locator('.ending-summary')).toContainText('Sloane');
  await expect(page.getByRole('button', { name: 'Download save backup' })).toBeVisible();
  expect(errors).toEqual([]);
  await page.screenshot({ path: info.outputPath('glass-house-complete.png'), fullPage: true });
});

for (const [source, method, outfit, quality] of [
  ['benton', 'photo', 'socialite', 'transfer'],
  ['benton', 'token', 'shadow', 'asset'],
  ['priya', 'audio', 'executive', 'fragment'],
  ['insufficient', 'photo', 'shadow', 'contact'],
  ['celeste', 'token', 'socialite', 'none'],
])
  test('capture ' + source + ' / ' + method + ' / ' + outfit, async ({ page }) => {
    await seed(
      page,
      runMission(missionStart(outfit), { assessment: 'source.' + source }, 'method'),
    );
    await click(page, 'method.' + method);
    await click(page, 'exchange.follow');
    let s = await current(page);
    expect(s.mission.capture?.quality).toBe(quality);
    if (quality === 'asset')
      await expect(page.locator('#story')).toContainText('Benton catches your wrist');
    await click(page, 'confrontation.leave');
    if (quality === 'asset')
      await expect(page.locator('#story')).toContainText('releases your wrist');
    for (let i = 0; i < 15; i++) {
      s = await current(page);
      if (s.mission.outcome) break;
      await click(page, missionDefaults[s.phase]);
    }
    expect((await current(page)).mission.outcome).toBe('complete');
    expect((await current(page)).mission.wrist).not.toBe('held');
    await page.getByRole('button', { name: 'Review your evidence' }).click();
    await expect(page.getByRole('dialog')).toContainText('Held by:');
  });

test('narrow screen, large text, keyboard choices, free reread and restart confirmation', async ({
  page,
}, info) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await seed(page, runMission(start, {}, 'hub'));
  await page.getByLabel('Reading size').selectOption('24');
  const button = page.locator('[data-mission-choice="lead.service"]');
  await button.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#story')).toContainText('This will use one opportunity');
  await click(page, 'lead.confirm');
  await click(page, 'lead.return');
  await click(page, 'read.service');
  expect((await current(page)).mission.remaining).toBe(1);
  await expect(page.locator('#story')).toContainText('do not follow the lead again');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: info.outputPath('glass-house-narrow.png'), fullPage: true });
  await page.getByRole('button', { name: 'Restart story', exact: true }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('button', { name: 'Close dialog' }).click();
  expect((await current(page)).phase).toBe('leadRead');
  await page.getByRole('button', { name: 'Restart story', exact: true }).click();
  await page.getByRole('button', { name: 'Restart and replace save' }).click();
  expect((await current(page)).scene).toBe('apartment');
});

test('storage failure never reports the new capture as saved', async ({ page }) => {
  const state = runMission(start, {}, 'exchange');
  await seed(page, state);
  await page.evaluate(() => {
    Storage.prototype.setItem = () => {
      throw Error('quota');
    };
  });
  await click(page, 'exchange.follow');
  await expect(page.getByRole('alert')).toContainText('not saved');
  expect((await current(page)).mission.capture).toBeNull();
  await page.reload();
  expect(await current(page)).toEqual(state);
});

test('browser closes and reopens with the acquired token and held wrist intact', async ({}, info) => {
  const s = runMission(start, { method: 'method.token' }, 'confrontation');
  const profile = info.outputPath('mission-profile');
  let context = await chromium.launchPersistentContext(profile, { headless: true });
  let page = await context.newPage();
  await seed(page, s);
  await context.close();
  context = await chromium.launchPersistentContext(profile, { headless: true });
  page = await context.newPage();
  await page.goto('http://127.0.0.1:4173');
  expect(await current(page)).toEqual(s);
  await expect(page.locator('#story')).toContainText('Benton catches your wrist');
  await click(page, 'confrontation.leave');
  expect((await current(page)).mission.token).toBe('evelyn');
  expect((await current(page)).mission.wrist).toBe('released');
  await context.close();
});
