import { test, expect, type Page } from '@playwright/test';
import { information, choose } from '../chapter3-next-helpers';
import { SAVE_KEY, encodeSave, decodeSave } from '../../src/persistence/saves';
import type { GameState } from '../../src/state/schema';
const select = (page: Page, id: string) =>
  page.locator(`[data-chapter3-choice="chapter3.${id}"]`).click();
async function seed(page: Page, s: GameState) {
  await page.goto('/');
  await page.evaluate(({ key, raw }) => localStorage.setItem(key, raw), {
    key: SAVE_KEY,
    raw: encodeSave(s),
  });
  await page.reload();
}
test('Julian meeting, refusal, leverage and conflicting calls survive reload', async ({
  page,
}, info) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await seed(page, information());
  for (const id of ['open-invitation', 'request-brief', 'check-authority', 'check-audience'])
    await select(page, id);
  await expect(page.locator('[data-chapter3-choice^="chapter3.check-"]')).toHaveCount(0);
  await select(page, 'accept-session');
  await expect(page.locator('#story')).toContainText('Julian Mercer');
  await expect(page.locator('.rail')).toContainText('Scene 7');
  for (const id of ['open-case', 'case-boundary', 'reception-refuse']) await select(page, id);
  await page.reload();
  let s = decodeSave((await page.evaluate((k) => localStorage.getItem(k), SAVE_KEY))!);
  expect(s.choices['c3.paid']).toBe('600');
  for (const id of [
    'read-marcus',
    'authenticate-note',
    'memo-retain',
    'draft-marcus-note',
    'send-maya-partial',
    'open-calendar',
    'book-sloane',
    'book-rook',
  ])
    await select(page, id);
  await expect(page.locator('#story')).toContainText('Sloane: 18:00');
  await page.screenshot({ path: info.outputPath('calendar-conflict.png'), fullPage: true });
  await select(page, 'depart-rook');
  await page.reload();
  await expect(page.locator('#story')).toContainText('The door closes');
  await expect(page.locator('[data-chapter3-choice]')).toHaveCount(0);
  await expect(page.locator('.ending-summary')).toHaveCount(0);
  s = decodeSave((await page.evaluate((k) => localStorage.getItem(k), SAVE_KEY))!);
  expect(s.choices['c3.cal-sloane']).toBe('waiting-confirmed');
  expect(errors).toEqual([]);
});
test('mobile institutional alternative supports documents, private draft, and departure', async ({
  page,
}, info) => {
  await page.setViewportSize({ width: 390, height: 844 });
  let s = information();
  s = choose(s, 'open-invitation');
  await seed(page, s);
  for (const id of [
    'decline-inquiry',
    'enter-review',
    'review-clinical',
    'review-cover',
    'review-routing',
    'review-compare',
    'qualification-formal',
    'draft-qualification',
  ])
    await select(page, id);
  await expect(page.locator('[data-chapter3-choice="chapter3.send-sloane-full"]')).toContainText(
    'Signed Voss qualification',
  );
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await select(page, 'keep-draft');
  await select(page, 'open-calendar');
  await expect(page.locator('[data-chapter3-choice="chapter3.book-julian-mercer"]')).toHaveCount(0);
  await select(page, 'book-voss');
  await select(page, 'depart-voss');
  await expect(page.locator('#story')).toContainText('The door closes');
  await expect(page.locator('.ending-summary')).toHaveCount(0);
  await page.screenshot({ path: info.outputPath('departure-narrow.png'), fullPage: true });
  await page.reload();
  expect(decodeSave((await page.evaluate((k) => localStorage.getItem(k), SAVE_KEY))!).phase).toBe(
    'departure',
  );
});
