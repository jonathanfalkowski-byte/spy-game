import { test, expect, type Page } from '@playwright/test';
import { end4 } from '../chapter5-helpers';
import { SAVE_KEY, encodeSave, decodeSave } from '../../src/persistence/saves';
import { cash5, get5, read5 } from '../../src/content/chapter5-model';
const select = async (p: Page, id: string) => {
  await p.locator(`[data-chapter5-choice="chapter5.${id}"]`).click();
  if (id === 'attention-coffee') for (let i=0;i<3;i++) await p.getByRole('button',{name:'Continue scene',exact:true}).click();
};
async function seed(p: Page, mode = 'public') {
  await p.goto('/');
  await p.evaluate(({ key, raw }) => localStorage.setItem(key, raw), {
    key: SAVE_KEY,
    raw: encodeSave(end4(mode)),
  });
  await p.reload();
}
async function snapshot(p: Page) {
  return decodeSave((await p.evaluate((k) => localStorage.getItem(k), SAVE_KEY))!);
}
async function walk(p: Page, ids: string[]) {
  for (const id of ids) await select(p, id);
}
test('explicit bridge, alternate salon, negotiated publication and owned ending on mobile', async ({
  page,
}, info) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await seed(page);
  expect((await snapshot(page)).contentRevision).toBe(15);
  await walk(page, [
    'begin',
    'inspect-packet',
    'go-spend',
    'spend-nothing',
    'echo-listing',
    'invitation-decline',
    'look-provocative',
    'attention-photo',
    'attention-enjoy',
    'leave-room',
    'concept-provocative',
    'negotiate-fee',
    'negotiate-name',
    'negotiate-image',
    'negotiate-approval',
    'offer-accept',
  ]);
  await page.reload();
  expect(get5(await snapshot(page), 'published')).toBeUndefined();
  expect(cash5(await snapshot(page))).toBe(0);
  await expect(page.locator('#story')).toContainText(
    'a conversation about choosing a bolder public style',
  );
  await page.screenshot({ path: info.outputPath('review-proof-mobile.png'), fullPage: true });
  await walk(page, [
    'publish',
    'service-self',
    'terms-backup',
    'message-maya',
    'people-finish',
    'want-none',
    'place-visible',
  ]);
  await page.reload();
  const s = await snapshot(page);
  expect(s.contentRevision).toBe(16);
  await expect(page.locator('.home-scene-art')).toHaveCount(0);
  expect(s.phase).toBe('complete');
  expect(cash5(s)).toBe(840);
  expect(read5(s, 'publication')?.text).toContain('text only');
  expect(get5(s, 'obligation-count')).toBe('2');
  await expect(page.locator('.rail')).toContainText('Chapter 5');
  await expect(page.locator('[data-chapter5-choice]')).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: info.outputPath('public-ending-mobile.png'), fullPage: true });
  await page.getByRole('button', { name: /^Evidence journal/ }).click();
  await expect(page.getByRole('dialog')).toContainText('Aster');
  expect(errors).toEqual([]);
});
test('earned help, fresh mutual interest and revocable no-sex scope survive reload', async ({
  page,
}, info) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await seed(page, 'professional');
  await walk(page, [
    'begin',
    'go-spend',
    'buy-phone',
    'echo-intro',
    'invitation-attend',
    'look-professional',
    'attention-coffee',
    'attention-flirt',
    'leave-room',
    'offer-decline',
    'service-julian',
    'terms-narrow',
    'message-sloane',
    'people-finish',
    'want-julian',
    'desire-mixed',
    'consent-no-sex',
  ]);
  await page.reload();
  let s = await snapshot(page);
  expect(get5(s, 'authorization')).toBe('granted');
  await expect(page.locator('header')).toContainText('THE BEAUTIFUL LIFE');
  expect(get5(s, 'obligation-count')).toBe('1');
  await page.screenshot({ path: info.outputPath('fresh-no-sex-scope.png'), fullPage: true });
  await select(page, 'withdraw');
  await page.reload();
  s = await snapshot(page);
  expect(get5(s, 'authorization')).toBe('revoked');
  expect(get5(s, 'intimacy')).toBe('withdrawn');
  expect(cash5(s)).toBe(780);
  expect(get5(s, 'service')).toBe('julian');
  await select(page, 'place-phone');
  await page.reload();
  await expect(page.locator('#story')).toContainText('take the new phone out of its box');
  expect(get5(await snapshot(page), 'wardrobe')).toBe('c05.professional');
  expect(get5(await snapshot(page), 'personal-location')).toBe('table-unboxed');
  expect(errors).toEqual([]);
});
test('withheld proof, no paid benefits and no-interest remain fully playable', async ({ page }) => {
  await seed(page);
  await walk(page, [
    'begin',
    'go-spend',
    'spend-nothing',
    'echo-listing',
    'invitation-decline',
    'look-minimal',
    'leave-room',
    'offer-accept',
    'withhold',
    'service-axiom',
    'terms-refuse',
    'people-finish',
    'want-salon',
    'desire-no-interest',
    'place-unchanged',
  ]);
  await page.reload();
  const s = await snapshot(page);
  expect(s.phase).toBe('complete');
  expect(cash5(s)).toBe(0);
  expect(get5(s, 'published')).toBeUndefined();
  expect(get5(s, 'obligation-count')).toBeUndefined();
  expect(get5(s, 'authorization')).toBeUndefined();
});
