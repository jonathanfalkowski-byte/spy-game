import { openNavigation } from './reader-navigation';
import { test, expect, type Page } from '@playwright/test';
import { departure, assignment } from '../chapter4-helpers';
import { SAVE_KEY, encodeSave, decodeSave } from '../../src/persistence/saves';
import type { GameState } from '../../src/state/schema';
const select = (p: Page, id: string) =>
  p.locator(`[data-chapter4-choice="chapter4.${id}"]`).click();
async function seed(p: Page, s: GameState) {
  await p.goto('/');
  await p.evaluate(({ key, raw }) => localStorage.setItem(key, raw), {
    key: SAVE_KEY,
    raw: encodeSave(s),
  });
  await p.reload();
}
async function snapshot(p: Page) {
  return decodeSave((await p.evaluate((k) => localStorage.getItem(k), SAVE_KEY))!);
}
test('explicit Chapter 4 bridge, pending calendar and independent completion on mobile', async ({
  page,
}, info) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await seed(page, departure('own', { extra: ['move-maya'] }));
  await select(page, 'begin');
  await openNavigation(page);
  await expect(page.getByRole('navigation', { name: 'Story navigation' })).toContainText(
    'Chapter 4',
  );
  await page.keyboard.press('Escape');
  await select(page, 'payoff');
  await select(page, 'keep-maya');
  for (let i = 0; i < 10; i++) {
    const buttons = page.locator('[data-chapter4-choice^="chapter4.resolve-"]');
    if (!(await buttons.count())) break;
    await buttons.first().click();
  }
  for (const id of [
    'next-day',
    'reader-pass',
    'public-maya',
    'inspect-receipt',
    'inspect-template',
    'assess',
    'report-process',
    'interest-professional',
    'outside-maya',
    'favor-narrow',
    'notice-boundary',
    'power-protect',
    'quiet-evening',
    'collect',
  ])
    await select(page, id);
  await page.reload();
  expect((await snapshot(page)).phase).toBe('complete');
  await expect(page.locator('#story')).toContainText('You keep the card');
  await expect(page.locator('[data-chapter4-choice]')).toHaveCount(0);
  await expect(page.locator('.ending-summary')).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(errors).toEqual([]);
  await page.screenshot({
    path: info.outputPath('independent-complete-mobile.png'),
    fullPage: true,
  });
});
test('paid Julian route preserves current authorization and withdrawal after reload', async ({
  page,
}, info) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await seed(page, assignment(departure('julian-mercer', { published: true })));
  for (const id of [
    'accept-audit',
    'inspect-receipt',
    'inspect-template',
    'assess',
    'report-process',
    'interest-attraction',
    'outside-flirt',
    'favor-accept',
    'notice-boundary',
    'power-honest',
    'motive-mixed',
    'consent-no-sex',
  ])
    await select(page, id);
  await page.reload();
  await expect(page.locator('#story')).toContainText('encounter has not occurred');
  expect((await snapshot(page)).choices['c4.authorization']).toBe('granted');
  await page.screenshot({ path: info.outputPath('current-authorization.png'), fullPage: true });
  await select(page, 'withdraw');
  await select(page, 'collect');
  await page.reload();
  const s = await snapshot(page);
  expect(s.choices['c4.authorization']).toBe('revoked');
  expect(s.choices['c4.audit-paid']).toBe('900');
  expect(s.choices['c4.intimacy']).toBe('withdrawn');
  expect(errors).toEqual([]);
});
