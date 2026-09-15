import { EventSchema as DayV3Event } from '../../src/persistence/legacy-v3/state/actions';
import { test, expect, chromium, type Page } from '@playwright/test';
import { checkpoint, atOffer, evening, endAccepted } from '../day-helpers';
import { replay as originalDayReplay } from '../../src/persistence/legacy-v3/state/reducer';
import { encodeSave, SAVE_KEY } from '../../src/persistence/saves';
import { replay as oldReplay } from '../../src/persistence/legacy-v2/state/reducer';
import { EventSchema as OldEvent } from '../../src/persistence/legacy-v2/state/actions';
async function seed(page: Page, s = checkpoint()) {
  await page.goto('/');
  await page.evaluate(({ key, raw }) => localStorage.setItem(key, raw), {
    key: SAVE_KEY,
    raw: encodeSave(s),
  });
  await page.reload();
}
async function choose(page: Page, id: string, reload = false) {
  await page.locator(`[data-day-choice="${id}"]`).click();
  if (reload) await page.reload();
  await expect(page.getByText('We couldn’t read this save.')).toHaveCount(0);
}
test('original day-zero ending migrates and consistently says Maya places the call', async ({
  page,
}) => {
  const old = originalDayReplay(
    DayV3Event.array().parse(endAccepted(evening(), 'call', 'medical', 'checkin').ledger),
  );
  const raw = JSON.stringify({ schemaVersion: 3, contentVersion: 3, state: old });
  await page.goto('/');
  await page.evaluate(({ key, raw }) => localStorage.setItem(key, raw), { key: SAVE_KEY, raw });
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Seven o’clock remains' })).toBeVisible();
  await expect(page.getByText('Maya will call you at 06:30', { exact: false })).toBeVisible();
  expect(await page.evaluate((key) => localStorage.getItem(key), SAVE_KEY)).toBe(raw);
  await page.getByRole('button', { name: 'Review conversation history', exact: true }).click();
  await expect(page.getByRole('dialog')).toContainText('I call you at six-thirty');
});
async function offer(page: Page, voss = false) {
  await seed(page, checkpoint(voss));
  for (const id of [
    'day.begin',
    'file.open',
    'file.authorize',
    'security.turn',
    'security.maya',
    'security.enter',
    'intro.counsel',
    'leverage.maya',
    'question.insider',
    'question.why',
    'brief.mission',
    'attention.sloane',
  ])
    await choose(page, id, true);
}
async function ending(page: Page) {
  for (const id of ['warning.begin', 'warning.next', 'warning.last', 'warning.end'])
    await choose(page, id, true);
  await expect(page.getByRole('heading', { name: 'Seven o’clock remains' })).toBeVisible();
  await expect(page.locator('[data-day-choice]')).toHaveCount(0);
  await expect(page.getByText('Development state inspector')).toHaveCount(0);
}
test('cautious player can inspect all anomaly responses, close and withdraw by keyboard', async ({
  page,
}) => {
  await seed(page);
  await choose(page, 'day.begin');
  for (const id of ['file.report', 'file.delete', 'file.trace']) {
    await choose(page, id, true);
    await expect(page.locator(`[data-day-choice="${id}"]`)).toHaveCount(0);
  }
  await choose(page, 'file.open');
  await expect(page.locator('.narrative')).toContainText('Candidate 7A');
  await choose(page, 'file.close');
  const leave = page.locator('[data-day-choice="file.leave"]');
  await leave.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { name: 'A boundary you kept' })).toBeVisible();
  await page.reload();
  await expect(page.locator('.narrative')).not.toContainText('Evelyn');
  await page.getByRole('button', { name: 'Review your evidence', exact: true }).click();
  await expect(page.getByRole('dialog')).toContainText('FILE RESTORED');
});
for (const reconsider of [false, true])
  test(`refusal ends outside Axiom, reconsidered=${reconsider}`, async ({ page }) => {
    await offer(page);
    await choose(page, 'offer.refuse', true);
    await expect(page.locator('.narrative')).toContainText('does not evict you today');
    if (reconsider) {
      await choose(page, 'refusal.return');
      await choose(page, 'return.leave');
    } else await choose(page, 'refusal.walk');
    await expect(page.getByRole('heading', { name: 'Beyond the gates' })).toBeVisible();
    await page.reload();
    await expect(page.locator('.narrative')).toContainText('Maya is still on the line');
    await expect(page.locator('[data-day-choice]')).toHaveCount(0);
  });
for (const channel of ['meet', 'call', 'avoid'])
  test(`accepted ${channel} route resolves evening then unknown warning`, async ({
    page,
  }, info) => {
    await offer(page, true);
    await choose(page, 'offer.accept', true);
    for (const id of ['release.home', 'release.evening', 'evening.' + channel])
      await choose(page, id, true);
    if (channel !== 'avoid') {
      if (channel === 'call')
        await expect(page.locator('.narrative')).toContainText('Axiom may record');
      await choose(page, 'disclose.security', true);
      await choose(page, 'closure.evelyn', true);
      await expect(page.locator('.narrative')).toContainText(
        channel === 'meet' ? 'takes your hand' : 'leans toward the camera',
      );
      await page.screenshot({ path: info.outputPath('evening.png'), fullPage: true });
      await choose(page, 'evening.end');
    }
    await ending(page);
    await page.getByRole('button', { name: 'Review your evidence', exact: true }).click();
    await expect(page.getByRole('dialog')).toContainText(
      'Unknown sender; identity and accuracy unverified',
    );
  });
test('reconsideration preserves phone possession and terminated employment', async ({ page }) => {
  await seed(page, atOffer());
  for (const id of ['offer.refuse', 'refusal.return', 'return.accept'])
    await choose(page, id, true);
  await expect(page.locator('.narrative')).toContainText('phone has remained with you');
  await expect(page.locator('.narrative')).toContainText('employment remains terminated');
  for (const id of ['release.home', 'release.evening', 'evening.avoid']) await choose(page, id);
  await ending(page);
  await expect(page.getByText('Employment: terminated.', { exact: false })).toBeVisible();
});
test('Maya leverage appears only with a logged source', async ({ page }) => {
  await seed(page);
  for (const id of [
    'day.begin',
    'file.open',
    'file.authorize',
    'security.turn',
    'security.comply',
    'security.enter',
    'intro.silent',
  ])
    await choose(page, id);
  await expect(page.locator('[data-day-choice="leverage.maya"]')).toHaveCount(0);
  await seed(page, checkpoint(true));
  for (const id of [
    'day.begin',
    'file.open',
    'file.authorize',
    'security.turn',
    'security.comply',
    'security.enter',
    'intro.silent',
  ])
    await choose(page, id);
  await expect(page.locator('.narrative')).toContainText('12:14');
  await expect(page.locator('[data-day-choice="leverage.maya"]')).toBeVisible();
});
test('old completed opening migrates but does not automatically continue', async ({ page }) => {
  const original = oldReplay(OldEvent.array().parse(checkpoint().ledger));
  const raw = JSON.stringify({ schemaVersion: 2, contentVersion: 2, state: original });
  await page.goto('/');
  await page.evaluate(({ key, raw }) => localStorage.setItem(key, raw), { key: SAVE_KEY, raw });
  await page.reload();
  await expect(page.getByRole('heading', { name: 'The morning stays with you' })).toBeVisible();
  expect(await page.evaluate((key) => localStorage.getItem(key), SAVE_KEY)).toBe(raw);
  await choose(page, 'day.begin');
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Something impossible' })).toBeVisible();
});
test('new phase save failure is visible, retry works and restart remains confirmed', async ({
  page,
}) => {
  await seed(page, atOffer());
  await page.evaluate(() => {
    Storage.prototype.setItem = () => {
      throw Error('test quota');
    };
  });
  await choose(page, 'offer.refuse');
  await expect(page.getByRole('alert')).toContainText('not saved');
  await page.getByRole('button', { name: 'Download this run' }).click();
  await page.reload();
  await expect(
    page.getByRole('heading', { name: 'Become Evelynn for the operation' }),
  ).toBeVisible();
  await choose(page, 'offer.refuse');
  await page.getByRole('button', { name: 'Restart story', exact: true }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('button', { name: 'Close dialog' }).click();
  await expect(page.getByRole('heading', { name: 'Refusal works' })).toBeVisible();
});
test('Sloane and evening remain readable on a narrow screen with large text', async ({
  page,
}, info) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await seed(page, atOffer());
  await page.getByLabel('Reading size').selectOption('24');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: info.outputPath('sloane-mobile.png'), fullPage: true });
  await choose(page, 'offer.accept');
  await choose(page, 'release.home');
  await choose(page, 'release.evening');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: info.outputPath('evening-mobile.png'), fullPage: true });
});
test('browser process reopens at the accepted evening phase', async ({}, info) => {
  const profile = info.outputPath('day-profile');
  let ctx = await chromium.launchPersistentContext(profile, { headless: true });
  let page = await ctx.newPage();
  await page.goto('http://127.0.0.1:4173');
  const raw = encodeSave(evening());
  await page.evaluate(({ key, raw }) => localStorage.setItem(key, raw), { key: SAVE_KEY, raw });
  await ctx.close();
  ctx = await chromium.launchPersistentContext(profile, { headless: true });
  page = await ctx.newPage();
  await page.goto('http://127.0.0.1:4173');
  await expect(page.getByRole('heading', { name: 'The hours between' })).toBeVisible();
  expect(await page.evaluate((key) => localStorage.getItem(key), SAVE_KEY)).toBe(raw);
  await ctx.close();
});
