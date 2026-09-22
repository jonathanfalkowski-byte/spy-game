import { openNavigation, setReadingSize } from './reader-navigation';
import { test, expect } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { initialState, act } from '../../src/state/reducer';
import { encodeSave, SAVE_KEY } from '../../src/persistence/saves';
import { runMission } from '../mission-helpers';
import { end4, walk5 } from '../chapter5-helpers';
import { day, evening } from '../day-helpers';

const before = process.env.EVE_UI_BASELINE === '1';
const phase = before ? 'before' : 'final';
const home = () => act(runMission(), { type: 'CONTINUE_CHAPTER3' });
const ending = () =>
  walk5(act(end4('professional'), { type: 'CONTINUE_AUDIT_REVISION' }), [
    'begin',
    'go-spend',
    'buy-phone',
    'echo-listing',
    'invitation-attend',
    'look-professional',
    'attention-coffee',
    'leave-room',
    'offer-decline',
    'service-municipal',
    'terms-refuse',
    'people-finish',
    'want-none',
    'place-phone',
  ]);

for (const [name, width, makeState] of [
  ['opening-desktop', 1440, initialState],
  ['opening-mobile', 375, initialState],
  ['opening-medium', 820, initialState],
  ['chapter3-desktop', 1440, home],
  ['chapter3-medium', 1000, home],
  ['chapter3-mobile', 350, home],
  ['chapter5-desktop', 1440, ending],
  ['chapter5-mobile', 390, ending],
] as const) {
  test(`cinematic reader ${name}`, async ({ page }) => {
    const errors: string[] = [];
    const imageRequests: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('request', (r) => {
      if (r.resourceType() === 'image') imageRequests.push(r.url());
    });
    await page.setViewportSize({ width, height: 950 });
    const state = makeState();
    const raw = encodeSave(state);
    await page.addInitScript(({ key, raw }) => localStorage.setItem(key, raw), {
      key: SAVE_KEY,
      raw,
    });
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
    const hasArt = true;
    if (hasArt)
      await expect
        .poll(() => page.locator('main img').evaluate((im: HTMLImageElement) => im.naturalWidth))
        .toBe(1920);
    if (!before) {
      await expect(page.locator('.scene-art-stage')).toHaveCount(hasArt ? 1 : 0);
      await expect(page.locator('main img')).toHaveCount(hasArt ? 1 : 0);
      if (hasArt) {
        const box = await page.locator('.scene-art-stage img').boundingBox();
        await expect(page.locator('.scene-art-image')).toHaveCSS('object-fit', 'contain');
        expect(
          await page
            .locator('.scene-art-image')
            .evaluate((im: HTMLImageElement) => im.naturalWidth / im.naturalHeight),
        ).toBeCloseTo(16 / 9, 4);
        if (width < 900) expect(box!.width / box!.height).toBeCloseTo(16 / 9, 1);
        const title = (await page.locator('h1').boundingBox())!;
        if (width >= 900) {
          expect(title.y).toBeGreaterThanOrEqual(box!.y + box!.height);
          await expect(page.locator('.cinematic-stage')).toHaveCSS('position', 'relative');
          const stageY = (await page.locator('.cinematic-stage').boundingBox())!.y;
          await page.locator('.story').evaluate((el) => {
            el.scrollTop = 350;
          });
          expect((await page.locator('.cinematic-stage').boundingBox())!.y).toBe(stageY);
          expect(await page.evaluate(() => window.scrollY)).toBe(0);
          await page.locator('.story').evaluate((el) => {
            el.scrollTop = 0;
          });
        } else expect(title.y).toBeGreaterThan(box!.y + box!.height);
        if (name.startsWith('chapter5'))
          await expect(
            page.getByText(
              'You take the new phone out of its box and place it beside the Axiom handset on the table.',
              { exact: true },
            ),
          ).toBeVisible();
      }
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    mkdirSync('review-saves', { recursive: true });
    await page.screenshot({
      animations: 'disabled',
      path: `review-saves/reader-${phase}-${name}.png`,
      fullPage: true,
    });
    // Pure presentation must not rewrite an authenticated save or eagerly fetch other art.
    expect(await page.evaluate((k) => localStorage.getItem(k), SAVE_KEY)).toBe(raw);
    if (!before)
      expect(imageRequests.filter((u) => u.includes('/art/'))).toHaveLength(hasArt ? 1 : 0);
    expect(errors).toEqual([]);
  });
}

test('dialogue hold reuses one image; history and reading-size controls keep the same shot', async ({
  page,
}) => {
  test.skip(before);
  const state = day(evening(), 'evening.meet');
  const requests: string[] = [];
  page.on('request', (r) => {
    if (r.resourceType() === 'image' && r.url().includes('/art/')) requests.push(r.url());
  });
  await page.addInitScript(({ key, raw }) => localStorage.setItem(key, raw), {
    key: SAVE_KEY,
    raw: encodeSave(state),
  });
  await page.goto('/');
  const stage = page.locator('.scene-art-stage');
  await expect(stage).toHaveAttribute('data-reading-shot', 'evening.lantern.shot01');
  await expect
    .poll(() => stage.locator('img').evaluate((im: HTMLImageElement) => im.naturalWidth))
    .toBe(1920);
  await stage.locator('img').evaluate((im) => im.setAttribute('data-hold-probe', 'same-node'));
  await page.locator('[data-day-choice="disclose.medical"]').click();
  await expect(page.locator('h1')).toHaveText('Another chance to trust her');
  await expect(stage).toHaveAttribute('data-reading-shot', 'evening.lantern.shot01');
  expect(requests).toHaveLength(1);
  await expect(stage.locator('img')).toHaveAttribute('data-hold-probe', 'same-node');
  const saved = await page.evaluate((k) => localStorage.getItem(k), SAVE_KEY);
  await setReadingSize(page, '24');
  await expect(stage).toHaveAttribute('data-reading-shot', 'evening.lantern.shot01');
  await openNavigation(page);
  await page.getByRole('button', { name: /Conversation history/ }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  expect(requests).toHaveLength(1);
  expect(await page.evaluate((k) => localStorage.getItem(k), SAVE_KEY)).toBe(saved);
});

test('opening apartment master holds through unchanged dialogue and survives reload', async ({ page }) => {
  const raw = encodeSave(initialState());
  await page.addInitScript(({ key, raw }) => localStorage.setItem(key, raw), { key: SAVE_KEY, raw });
  await page.goto('/');
  const stage = page.locator('.scene-art-stage');
  await expect(stage).toHaveAttribute('data-reading-shot', 'opening.apartment.shot01');
  await expect(stage).toHaveAttribute('data-asset-id', 'opening-apartment-master-v2-production');
  const source = await page.locator('.scene-art-image').getAttribute('src');
  await page.locator('[data-choice="bond.friend"]').click();
  await expect(stage).toHaveAttribute('data-reading-shot', 'opening.apartment.shot01');
  await expect(stage).toHaveAttribute('data-asset-id', 'opening-apartment-master-v2-production');
  expect(await page.locator('.scene-art-image').getAttribute('src')).toBe(source);
  await page.screenshot({
    animations: 'disabled',
    path: 'review-saves/opening-dialogue-hold.png',
    fullPage: true,
  });
  await page.reload();
  await expect(stage).toHaveAttribute('data-reading-shot', 'opening.apartment.shot01');
  await expect(stage).toHaveAttribute('data-asset-id', 'opening-apartment-master-v2-production');
});

test('unillustrated apartment inspections keep the room master visible', async ({ page }) => {
  test.skip(before);
  const reply = act(initialState(), { type: 'CHOOSE_DIALOGUE', id: 'bond.friend' });
  await page.addInitScript(({ key, raw }) => localStorage.setItem(key, raw), {
    key: SAVE_KEY,
    raw: encodeSave(reply),
  });
  await page.goto('/');
  const stage = page.locator('.scene-art-stage');
  await expect(stage).toHaveAttribute('data-reading-shot', 'opening.apartment.shot01');
  await expect(stage).toHaveAttribute('data-asset-id', 'opening-apartment-master-v2-production');

  await page.getByRole('button', { name: /Bathroom mirror/i }).click();

  await expect(stage).toHaveAttribute('data-reading-shot', 'opening.apartment.shot01');
  await expect(stage).toHaveAttribute('data-asset-id', 'opening-apartment-master-v2-production');
  await expect(stage.locator('img')).toHaveAttribute(
    'src',
    /art\/opening\/opening-apartment-master-v2-production\.png$/,
  );
  await expect
    .poll(() => stage.locator('img').evaluate((im: HTMLImageElement) => im.naturalWidth))
    .toBe(1920);
});

test('opening evidence inspections cut only on their exact action and survive reload', async ({ page }) => {
  const reply = act(initialState(), { type: 'CHOOSE_DIALOGUE', id: 'bond.friend' });
  const load = async (state: ReturnType<typeof initialState>, width: number) => {
    await page.setViewportSize({ width, height: 950 });
    await page.goto('/');
    await page.evaluate(
      ({ key, raw }) => localStorage.setItem(key, raw),
      { key: SAVE_KEY, raw: encodeSave(state) },
    );
    await page.reload();
  };
  const stage = page.locator('.scene-art-stage');

  await load(reply, 1440);
  await page.getByRole('button', { name: /Axiom housing notice/i }).click();
  await expect(stage).toHaveAttribute('data-reading-shot', 'opening.apartment.inspect-lease');
  await expect(stage).toHaveAttribute('data-asset-id', 'opening-apartment-housing-notice-v1-production');
  await expect(page.locator('.scene-art-image')).toHaveAttribute(
    'src',
    /art\/opening\/opening-apartment-housing-notice-v1-production\.png$/,
  );
  await page.screenshot({
    animations: 'disabled',
    path: 'review-saves/opening-housing-desktop.png',
    fullPage: true,
  });
  await page.setViewportSize({ width: 375, height: 950 });
  await page.screenshot({
    animations: 'disabled',
    path: 'review-saves/opening-housing-mobile.png',
    fullPage: true,
  });
  await page.reload();
  await expect(stage).toHaveAttribute('data-asset-id', 'opening-apartment-housing-notice-v1-production');

  await load(reply, 1440);
  await page.getByRole('button', { name: /Medical package/i }).click();
  await expect(stage).toHaveAttribute('data-reading-shot', 'opening.apartment.inspect-medical');
  await expect(stage).toHaveAttribute('data-asset-id', 'opening-apartment-medical-package-v1-production');
  await expect(page.locator('.scene-art-image')).toHaveAttribute(
    'src',
    /art\/opening\/opening-apartment-medical-package-v1-production\.png$/,
  );
  await page.screenshot({
    animations: 'disabled',
    path: 'review-saves/opening-medical-desktop.png',
    fullPage: true,
  });
  await page.setViewportSize({ width: 375, height: 950 });
  await page.screenshot({
    animations: 'disabled',
    path: 'review-saves/opening-medical-mobile.png',
    fullPage: true,
  });
  await page.reload();
  await expect(stage).toHaveAttribute('data-asset-id', 'opening-apartment-medical-package-v1-production');
});

test('unavailable image collapses safely without breaking text or decisions', async ({ page }) => {
  test.skip(before);
  await page.route('**/art/apartment/*.png', (route) => route.abort());
  await page.addInitScript(({ key, raw }) => localStorage.setItem(key, raw), {
    key: SAVE_KEY,
    raw: encodeSave(home()),
  });
  await page.goto('/');
  await expect(page.locator('.scene-art-stage')).toHaveCount(0);
  await expect(page.locator('.reader')).toHaveClass('reader reader--text');
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('[data-chapter3-choice]').first()).toBeVisible();
});

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
for (const reducedMotion of ['reduce', 'no-preference'] as const) {
  test(`Harbour cuts, guarded fallback and reload with motion ${reducedMotion}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 950 });
    await page.emulateMedia({ reducedMotion });
    const raw = encodeSave(coffee());
    await page.addInitScript(({ key, raw }) => localStorage.setItem(key, raw), {
      key: SAVE_KEY,
      raw,
    });
    await page.goto('/');
    await expect(page.locator('.scene-art-stage')).toHaveCount(0);
    await page.getByRole('button', { name: 'Continue scene', exact: true }).click();
    const stage = page.locator('.scene-art-stage');
    await expect(stage).toHaveAttribute('data-reading-shot', 'c05.s06.shot12-entrance');
    await expect
      .poll(() =>
        stage.locator('.scene-art-image').evaluate((im: HTMLImageElement) => im.naturalWidth),
      )
      .toBe(1920);
    await page.screenshot({
      animations: 'disabled',
      path: `review-saves/reader-final-harbour-${reducedMotion}.png`,
      fullPage: true,
    });
    await page.getByRole('button', { name: 'Continue scene', exact: true }).click();
    await expect(stage).toHaveAttribute('data-reading-shot', 'c05.s06.shot15-departed');
    if (reducedMotion === 'reduce') {
      await expect(stage.locator('.scene-art-outgoing')).toHaveCount(0);
      await expect(stage.locator('.scene-art-image')).toHaveCSS('animation-name', 'none');
    }
    await expect(stage.locator('.scene-art-outgoing')).toHaveCount(0);
    await page.getByRole('button', { name: 'Previous moment', exact: true }).click();
    await expect(stage).toHaveAttribute('data-reading-shot', 'c05.s06.shot12-entrance');
    // A later departure frame cannot become an outgoing ghost when rereading the arrival.
    await expect(stage.locator('.scene-art-outgoing')).toHaveCount(0);
    await page.getByRole('button', { name: 'Continue scene', exact: true }).click();
    await page.getByRole('button', { name: 'Continue scene', exact: true }).click();
    await expect(stage).toHaveAttribute('data-reading-shot', 'c05.s06.shot13-return');
    await expect(stage).toHaveAttribute('data-asset-id', 'c5-h2-coffee-return-composite-v1-production');
    expect(await page.evaluate((k) => localStorage.getItem(k), SAVE_KEY)).toBe(raw);
    await page.reload();
    await expect(stage).toHaveCount(0);
    expect(await page.evaluate((k) => localStorage.getItem(k), SAVE_KEY)).toBe(raw);
  });
}

test('mobile navigation traps focus and returns to menu; controls preserve the save', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 850 });
  await page.goto('/');
  const menu = page.getByRole('button', { name: 'Menu', exact: true });
  await menu.click();
  await expect(page.getByRole('dialog', { name: 'Story menu' })).toBeVisible();
  await page.getByLabel('Reading size').selectOption('24');
  await page.getByRole('button', { name: 'Restart story', exact: true }).focus();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Close dialog' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(menu).toBeFocused();
  await menu.click();
  await page.getByRole('button', { name: 'Evidence journal' }).click();
  await expect(page.getByRole('dialog', { name: 'Evidence journal' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(menu).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('portrait dimensions are contained, never cropped, without changing asset authority', async ({
  page,
}) => {
  // Use a test-only portrait rendition of the approved URL to exercise the stage geometry.
  // Production resolver/manifest are untouched; this is not approval of a portrait asset.
  await page.route('**/art/apartment/*.png', (route) =>
    route.fulfill({
      contentType: 'image/svg+xml',
      body: '<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1600"><rect width="900" height="1600" fill="#43505b"/><rect x="10" y="10" width="880" height="1580" fill="none" stroke="white" stroke-width="10"/></svg>',
    }),
  );
  await page.addInitScript(({ key, raw }) => localStorage.setItem(key, raw), {
    key: SAVE_KEY,
    raw: encodeSave(home()),
  });
  await page.goto('/');
  const im = page.locator('.scene-art-image');
  await expect.poll(() => im.evaluate((e: HTMLImageElement) => e.naturalHeight)).toBe(1600);
  await expect(im).toHaveCSS('object-fit', 'contain');
  expect((await im.boundingBox())!.height).toBeLessThanOrEqual(720 - 100);
  await page.screenshot({
    animations: 'disabled',
    path: 'review-saves/reader-final-portrait-fixture.png',
  });
});
