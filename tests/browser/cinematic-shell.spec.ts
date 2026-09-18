import { test, expect, type Page } from '@playwright/test';
import { act, initialState } from '../../src/state/reducer';
import { encodeSave, SAVE_KEY } from '../../src/persistence/saves';
import { runMission } from '../mission-helpers';
import { end4, walk5 } from '../chapter5-helpers';
const home = () => act(runMission(), { type: 'CONTINUE_CHAPTER3' });
const coffee = () =>
  walk5(act(end4('professional'), { type: 'CONTINUE_AUDIT_REVISION' }), [
    'begin',
    'go-spend',
    'buy-phone',
    'echo-listing',
    'invitation-attend',
    'look-professional',
    'attention-coffee',
  ]);
const ending = () =>
  walk5(coffee(), [
    'leave-room',
    'offer-decline',
    'service-municipal',
    'terms-refuse',
    'people-finish',
    'want-none',
    'place-phone',
  ]);
async function seed(page: Page, state: ReturnType<typeof home>, width = 1920) {
  await page.setViewportSize({ width, height: width < 900 ? 844 : width < 1400 ? 900 : 1080 });
  const raw = encodeSave(state);
  await page.addInitScript(
    ({ key, raw }) => {
      if (!localStorage.getItem(key)) localStorage.setItem(key, raw);
    },
    { key: SAVE_KEY, raw },
  );
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
  return raw;
}
async function capture(page: Page, name: string) {
  await page.screenshot({
    path: 'review-saves/final-' + name + '.png',
    animations: 'disabled',
    fullPage: true,
  });
}
test('final desktop shell: fixed art, sidebar, scroll, overlay and collapse', async ({ page }) => {
  const raw = await seed(page, home());
  const stage = page.locator('.cinematic-stage'),
    story = page.getByRole('region', { name: 'Story text' });
  await expect
    .poll(() => page.locator('.scene-art-image').evaluate((e: HTMLImageElement) => e.naturalWidth))
    .toBe(1920);
  const art = (await stage.boundingBox())!,
    prose = (await story.boundingBox())!;
  expect(art.height).toBeGreaterThan(450);
  expect(art.height).toBeLessThan(520);
  expect(prose.y).toBe(art.y + art.height);
  expect(prose.width).toBe(art.width);
  expect((await page.locator('.rail').boundingBox())!.width).toBe(270);
  expect((await page.locator('.rail').boundingBox())!.y).toBe(art.y);
  expect((await page.locator('.story-content').boundingBox())!.width).toBe(900);
  await capture(page, 'home-expanded');
  await story.focus();
  await page.keyboard.press('PageDown');
  await expect.poll(() => story.evaluate((e) => e.scrollTop)).toBeGreaterThan(250);
  expect((await stage.boundingBox())!).toEqual(art);
  expect(await page.evaluate(() => scrollY)).toBe(0);
  await capture(page, 'home-scrolled');
  const shot = await page.locator('.scene-art-stage').getAttribute('data-reading-shot');
  await page.getByRole('button', { name: 'Review assessment', exact: true }).click();
  await expect(page.getByRole('dialog', { name: 'Assessment', exact: true })).toContainText(
    'Choices you carried here',
  );
  await expect(page.locator('.scene-art-stage')).toHaveAttribute('data-reading-shot', shot!);
  await capture(page, 'assessment-record');
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'Collapse navigation', exact: true }).click();
  expect((await stage.boundingBox())!.width - art.width).toBe(194);
  expect((await page.locator('.story-content').boundingBox())!.width).toBe(940);
  await story.evaluate((e) => (e.scrollTop = 0));
  await capture(page, 'home-collapsed');
  expect(await page.evaluate((k) => localStorage.getItem(k), SAVE_KEY)).toBe(raw);
  await page.reload();
  await expect(page.getByRole('button', { name: 'Expand navigation', exact: true })).toBeVisible();
  expect(await page.evaluate((k) => localStorage.getItem(k), SAVE_KEY)).toBe(raw);
});
for (const [name, width, make] of [
  ['harbour', 1920, coffee],
  ['apartment', 1920, ending],
  ['medium', 1280, home],
  ['opening', 1920, initialState],
  ['mobile', 390, ending],
  ['opening-mobile', 390, initialState],
] as const)
  test('final shell ' + name, async ({ page }) => {
    await seed(page, make(), width);
    if (name === 'harbour')
      await page.getByRole('button', { name: 'Continue scene', exact: true }).click();
    if (!name.startsWith('opening')) {
      await expect
        .poll(() =>
          page.locator('.scene-art-image').evaluate((e: HTMLImageElement) => e.naturalWidth),
        )
        .toBe(1920);
      const stage = (await page.locator('.cinematic-stage').boundingBox())!,
        story = (await page.locator('.story').boundingBox())!;
      expect(story.y).toBeGreaterThanOrEqual(stage.y + stage.height);
    } else await expect(page.locator('.cinematic-stage')).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    if (width < 900) await expect(page.locator('.story')).toHaveCSS('overflow-y', 'visible');
    await capture(page, name);
  });
