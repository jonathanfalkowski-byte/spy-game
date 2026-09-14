import { test, expect } from '@playwright/test';
import { encodeSave, SAVE_KEY } from '../../src/persistence/saves';
import { runMission } from '../mission-helpers';
import { atOffer } from '../day-helpers';
import { replay } from '../../src/state/reducer';
const upload = (raw: string) => ({
  name: 'review.json',
  mimeType: 'application/json',
  buffer: Buffer.from(raw),
});

test('restore previews without replacing, confirms, survives reload, filters journal and returns focus', async ({
  page,
}) => {
  await page.goto('/');
  await page.locator('[data-choice="bond.friend"]').click();
  const before = await page.evaluate((k) => localStorage.getItem(k), SAVE_KEY);
  const end = runMission();
  await page.getByRole('button', { name: 'Restore save backup', exact: true }).click();
  await page.getByLabel('Save backup file').setInputFiles(upload(encodeSave(end)));
  await expect(page.getByLabel('Validated backup')).toContainText('The Glass House is behind you');
  expect(await page.evaluate((k) => localStorage.getItem(k), SAVE_KEY)).toBe(before);
  await page.getByRole('button', { name: 'Confirm restore and replace save' }).click();
  await expect(page.getByRole('heading', { name: 'The Glass House is behind you' })).toBeVisible();
  await page.reload();
  await page.getByRole('button', { name: /^Evidence journal/ }).click();
  await expect(page.getByLabel('Milestone', { exact: true })).toHaveValue('mission');
  await page.getByLabel('Information type').selectOption('capture');
  await expect(page.getByRole('dialog')).toContainText('Sloane controls the recording');
  await expect(page.getByRole('dialog')).not.toContainText('Housing notice');
  await page.getByLabel('Milestone', { exact: true }).selectOption('opening');
  await expect(page.getByRole('dialog')).toContainText('No earned records match');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: /^Evidence journal/ })).toBeFocused();
  await page.setViewportSize({width:390,height:844});
  await page.getByLabel('Reading size').selectOption('24');
  await page.getByRole('button', {name: /^Evidence journal/}).click();
  expect(await page.getByRole('dialog').evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
  await page.screenshot({path:'review-results/journal-narrow-final.png'});
});

test('invalid, unsupported, oversized and conflicting backups never replace the current run', async ({
  page,
}) => {
  await page.goto('/');
  await page.locator('[data-choice="bond.friend"]').click();
  const before = await page.evaluate((k) => localStorage.getItem(k), SAVE_KEY);
  await page.getByRole('button', { name: 'Restore save backup', exact: true }).click();
  for (const raw of ['{bad', '{"schemaVersion":999}', 'x'.repeat(2_000_001)]) {
    await page.getByLabel('Save backup file').setInputFiles(upload(raw));
    await expect(page.getByRole('alert')).toContainText('current run is unchanged');
    expect(await page.evaluate((k) => localStorage.getItem(k), SAVE_KEY)).toBe(before);
    await expect(
      page.getByRole('button', { name: 'Confirm restore and replace save' }),
    ).toHaveCount(0);
  }
  await page.getByLabel('Save backup file').setInputFiles(upload(encodeSave(runMission())));
  await expect(page.getByLabel('Validated backup')).toBeVisible();
  await page.evaluate((k) => localStorage.setItem(k, 'another tab'), SAVE_KEY);
  await page.getByRole('button', { name: 'Confirm restore and replace save' }).click();
  await expect(page.getByRole('alert')).toContainText('Another tab changed');
  expect(await page.evaluate((k) => localStorage.getItem(k), SAVE_KEY)).toBe('another tab');
  await page.keyboard.press('Escape');
  await expect(page.locator('[data-choice="morning.yes"]')).toBeVisible();
});

test('day questions append and retain focus order through reload; large text persists on narrow screen', async ({
  page,
}) => {
  const offer = atOffer(),
    index = offer.ledger.findIndex(
      (e) => e.action.type === 'DAY_CHOOSE' && e.action.id === 'brief.mission',
    );
  await page.goto('/');
  await page.evaluate(({ k, v }) => localStorage.setItem(k, v), {
    k: SAVE_KEY,
    v: encodeSave(replay(offer.ledger.slice(0, index))),
  });
  await page.reload();
  for (const id of ['question.why', 'question.insider']) {
    await page.locator('[data-day-choice="' + id + '"]').click();
    await expect(page.locator('[data-clinic-exchange]').last()).toBeFocused();
  }
  const speech = await page.locator('[data-clinic-exchange]').allTextContents();
  expect(speech.at(-2)).toContain('Why use an analyst');
  expect(speech.at(-1)).toContain('Who is the insider');
  await page.getByLabel('Reading size').selectOption('24');
  await page.reload();
  await expect(page.getByLabel('Reading size')).toHaveValue('24');
  await expect(page.locator('[data-clinic-exchange]').last()).toContainText('Who is the insider');
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('failed restore write preserves live scene and save; reading preference failure does not block play', async ({
  page,
}) => {
  await page.goto('/');
  await page.locator('[data-choice="bond.friend"]').click();
  const before = await page.evaluate((k) => localStorage.getItem(k), SAVE_KEY);
  await page.evaluate(() => {
    Storage.prototype.setItem = () => {
      throw Error('Storage unavailable');
    };
  });
  await page.getByLabel('Reading size').selectOption('24');
  await expect(page.getByLabel('Reading size')).toHaveValue('24');
  await page.getByRole('button', { name: 'Restore save backup', exact: true }).click();
  await page.getByLabel('Save backup file').setInputFiles(upload(encodeSave(runMission())));
  await page.getByRole('button', { name: 'Confirm restore and replace save' }).click();
  await expect(page.getByRole('alert')).toContainText('Storage unavailable');
  await page.keyboard.press('Escape');
  await expect(page.locator('[data-choice="morning.yes"]')).toBeVisible();
  expect(await page.evaluate((k) => localStorage.getItem(k), SAVE_KEY)).toBe(before);
});
