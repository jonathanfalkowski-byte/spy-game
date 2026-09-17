import { test, expect, type Page } from '@playwright/test';
import { end4, walk5 } from '../chapter5-helpers';
import { act } from '../../src/state/reducer';
import { encodeSave, decodeSave, SAVE_KEY } from '../../src/persistence/saves';
import { read5 } from '../../src/content/chapter5-model';

const select = (p: Page, id: string) =>
  p.locator(`[data-chapter5-choice="chapter5.${id}"]`).click();
async function saved(p: Page) {
  return decodeSave((await p.evaluate((k) => localStorage.getItem(k), SAVE_KEY))!);
}
async function seed(p: Page, state: ReturnType<typeof end4>) {
  await p.goto('/');
  await p.evaluate(({ key, raw }) => localStorage.setItem(key, raw), {
    key: SAVE_KEY,
    raw: encodeSave(state),
  });
  await p.reload();
}
for (const width of [1440, 390]) {
  test(`revision17 ordered Harbour cuts and exact apartment ending at ${width}px`, async ({
    page,
  }, info) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await seed(page, end4('professional'));
    await page.getByRole('button', { name: 'Continue with revised Chapters 3–5' }).click();
    for (const id of [
      'begin',
      'go-spend',
      'buy-phone',
      'echo-listing',
      'invitation-attend',
      'look-professional',
      'attention-coffee',
    ])
      await select(page, id);
    const panel = page.getByRole('region', { name: 'Harbour scene' });
    await expect(panel).toHaveAttribute('data-reading-shot', 'c05.s06.shot14-wait');
    await expect(panel.locator('img')).toHaveCount(0);
    await expect(page.locator('[data-chapter5-choice]')).toHaveCount(0);
    await page.getByRole('button', { name: 'Continue scene', exact: true }).click();
    await expect(panel).toHaveAttribute('data-reading-shot', 'c05.s06.shot12-entrance');
    await expect
      .poll(() => panel.locator('img').evaluate((im: HTMLImageElement) => im.naturalWidth))
      .toBe(1920);
    await panel.screenshot({ path: info.outputPath('harbour-arrived.png') });
    const raw = encodeSave(await saved(page));
    await page.getByRole('button', { name: 'Continue scene', exact: true }).click();
    await expect(panel).toHaveAttribute('data-reading-shot', 'c05.s06.shot15-departed');
    await panel.screenshot({ path: info.outputPath('harbour-departed.png') });
    expect(encodeSave(await saved(page))).toBe(raw);
    await page.getByRole('button', { name: 'Continue scene', exact: true }).click();
    await expect(panel).toHaveAttribute('data-reading-shot', 'c05.s06.shot13-return');
    await expect(panel.locator('img')).toHaveCount(0);
    for (const id of [
      'leave-room',
      'offer-decline',
      'service-municipal',
      'terms-refuse',
      'people-finish',
      'want-none',
    ])
      await select(page, id);
    await expect(page.locator('[data-reading-shot="c05.s12.shot05-phone"]')).toHaveCount(0);
    await select(page, 'place-phone');
    await page.reload();
    const final = await saved(page);
    expect(final.contentRevision).toBe(17);
    expect(final.phase).toBe('complete');
    expect(final.choices['c5.personal-location']).toBe('table-unboxed');
    const art = page.locator('[data-reading-shot="c05.s12.shot05-phone"]');
    await expect(art).toBeVisible();
    await art.screenshot({ path: info.outputPath('apartment-ending.png') });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    expect(errors).toEqual([]);
  });
  test(`Aster revisits show accepted live terms on ${width}px non-Julian route`, async ({
    page,
  }, info) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    const old = end4();
    const state = walk5(act(old, { type: 'CONTINUE_AUDIT_REVISION' }), [
      'begin',
      'go-spend',
      'spend-nothing',
      'echo-listing',
      'invitation-decline',
      'look-minimal',
      'leave-room',
    ]);
    await seed(page, state);
    for (const id of [
      'concept-professional',
      'concept-glamorous',
      'concept-provocative',
      'concept-private',
    ])
      await select(page, id);
    await page.getByLabel('Final concept').selectOption('professional');
    for (const id of ['negotiate-fee', 'negotiate-name', 'negotiate-image']) await select(page, id);
    await expect(page.getByLabel('Final concept')).toHaveValue('professional');
    const prior = encodeSave(await saved(page));
    for (const value of ['professional', 'glamorous', 'private', 'professional'])
      await page.getByLabel('Final concept').selectOption(value);
    expect(encodeSave(await saved(page))).toBe(prior);
    const terms = await page.locator('[data-current-terms]').innerText();
    expect(terms).toContain('Fee: $500');
    expect(terms).toContain('Name: E. Vale');
    expect(terms).toContain('Image: none');
    await page
      .getByRole('region', { name: 'Current Aster proposal' })
      .screenshot({ path: info.outputPath('current-proposal.png') });
    await select(page, 'offer-accept-professional');
    expect(read5(await saved(page), 'editorial-terms')?.text).toBe(terms);
    for (const id of [
      'publish',
      'service-self',
      'terms-refuse',
      'people-finish',
      'want-none',
      'place-unchanged',
    ])
      await select(page, id);
    await page.reload();
    const final = await saved(page);
    expect(final.phase).toBe('complete');
    expect(final.choices['c5.cash']).toBe('440');
    await expect(page.locator('.chapter5-scene-art')).toHaveCount(0);
    await page.getByRole('button', { name: /^Evidence journal/ }).click();
    await expect(page.getByRole('dialog')).toContainText('Aster');
    expect(errors).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
  });
}
