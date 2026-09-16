import { test, expect, type Page } from '@playwright/test';
import { scene1End, scene2 } from '../chapter3-evening-helpers';
import { replay } from '../../src/state/reducer';
import { SAVE_KEY, encodeSave, decodeSave } from '../../src/persistence/saves';
import type { GameState } from '../../src/state/schema';
async function seed(page: Page, s: GameState) {
  await page.goto('/');
  await page.evaluate(({ key, raw }) => localStorage.setItem(key, raw), {
    key: SAVE_KEY,
    raw: encodeSave(s),
  });
  await page.reload();
}
const select = (page: Page, id: string) =>
  page.locator(`[data-chapter3-choice="chapter3.${id}"]`).click();
test('frozen checkpoint continues explicitly, shows exact disclosure and survives reload', async ({
  page,
}, info) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  const old = replay(scene1End('lookup').ledger, 12);
  await seed(page, old);
  expect(
    JSON.parse((await page.evaluate((key) => localStorage.getItem(key), SAVE_KEY))!).contentVersion,
  ).toBe(12);
  await page
    .getByRole('button', { name: 'Continue Chapter 3 · What you can tell her', exact: true })
    .click();
  await expect(page.locator('.rail')).toContainText('Chapter 3 / Scene 2');
  await select(page, 'call');
  await expect(page.locator('[data-chapter3-choice="chapter3.tell-identity"]')).toContainText(
    'I am the person you knew as Adrian',
  );
  await select(page, 'tell-home');
  await select(page, 'arrange-contact');
  await expect(page.locator('#story')).toContainText('one query at 12:14');
  await select(page, 'pressure-warn');
  await expect(page.locator('[data-chapter3-choice="chapter3.send-followup"]')).toContainText(
    'That is her account, not a finding against you',
  );
  await page.screenshot({ path: info.outputPath('scene2-disclosure-preview.png'), fullPage: true });
  await select(page, 'send-followup');
  await select(page, 'sleep');
  await page.reload();
  await expect(page.locator('#story')).toContainText('It has not happened yet');
  const s = decodeSave((await page.evaluate((key) => localStorage.getItem(key), SAVE_KEY))!);
  expect(s.phase).toBe('nightComplete');
  expect(s.contentRevision).toBe(13);
  expect(s.ledger.slice(0, old.ledger.length)).toEqual(old.ledger);
  await expect(page.locator('#story')).not.toContainText(/\bEvelyn\b/);
  expect(errors).toEqual([]);
});
test('narrow screen supports noncontact and only the access alternative', async ({
  page,
}, info) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await seed(page, scene2());
  await select(page, 'no-contact');
  await expect(page.locator('[data-chapter3-choice="chapter3.pressure-warn"]')).toHaveCount(0);
  await expect(page.locator('[data-chapter3-choice="chapter3.access-scope"]')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: info.outputPath('scene2-access-narrow.png'), fullPage: true });
  await select(page, 'access-scope');
  await select(page, 'sleep');
  await expect(page.locator('#story')).toContainText('Scene 2 ends here');
});
