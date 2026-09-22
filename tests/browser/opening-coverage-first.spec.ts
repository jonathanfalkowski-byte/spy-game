import { test, expect, type Browser, type TestInfo } from '@playwright/test';
import { encodeSave, SAVE_KEY } from '../../src/persistence/saves';
import { openingVisualFixtures } from '../opening-visual-fixtures';

const expectedAssets = [
  'opening-apartment-master-v2-production', 'opening-apartment-master-v2-production',
  'opening-apartment-master-v2-production', 'axiom-approach-v2-production',
  'axiom-security-lobby-v2-production', 'axiom-office-arrival-v1-production',
  'axiom-opening-office-shot01-daniel-v1-production', 'axiom-opening-office-shot01-daniel-v1-production', 'axiom-opening-office-shot02-benton-v1-production', 'axiom-casework-file-v1-production', 'axiom-casework-brief-v1-production',
  'axiom-casework-documents-v1-production', 'axiom-casework-documents-v1-production',
  'axiom-casework-review-v1-production', 'axiom-casework-submitted-v1-production',
  'axiom-opening-office-shot01-maya-v1-production', 'axiom-opening-office-shot01-maya-v1-production', 'axiom-opening-office-shot01-maya-v1-production', null, 'axiom-opening-office-shot04-alone-v1-production',
];

async function assertOpeningCoverage(
  browser: Browser,
  testInfo: TestInfo,
  viewport?: { width: number; height: number },
) {
  for (const [index, { state, position }] of openingVisualFixtures().entries()) {
    const context = await browser.newContext(viewport ? { viewport } : undefined);
    const page = await context.newPage();
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('response', (response) => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
    const raw = encodeSave(state);
    await page.addInitScript(({ key, raw }) => localStorage.setItem(key, raw), { key: SAVE_KEY, raw });
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    for (let beat = 0; beat < position; beat++)
      await page.getByRole('button', { name: 'Continue scene', exact: true }).click();
    const expected = expectedAssets[index];
    const stage = page.locator('.scene-art-stage');
    const label = `${String(index + 1).padStart(2, '0')}-${state.scene}-${state.phase}-${position}`;
    if (expected) {
      await expect(stage, label).toBeVisible();
      await expect(stage).toHaveAttribute('data-asset-id', expected);
      const img = stage.locator('img.scene-art-image');
      await expect(img).toHaveAttribute('src', `/art/opening/${expected}.png`);
      await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
      if (index === 5 || (index >= 9 && index <= 14))
        await page.screenshot({ path: testInfo.outputPath(`${label}.png`), fullPage: true });
    } else await expect(stage, label).toHaveCount(0);
    expect(await page.evaluate((key) => localStorage.getItem(key), SAVE_KEY), label).toBe(raw);
    expect(errors, label).toEqual([]);
    await context.close();
  }
}

test('all 20 reached opening states render exactly their truthful approved occupancy', async ({ browser }, testInfo) => {
  await assertOpeningCoverage(browser, testInfo);
});

test('all 20 reached opening states render their truthful approved occupancy on mobile', async ({ browser }, testInfo) => {
  await assertOpeningCoverage(browser, testInfo, { width: 390, height: 844 });
});

test('live commute CUTs to Office Arrival, then CUTs to Daniel and HOLDS into office', async ({ page }, testInfo) => {
  const { state } = openingVisualFixtures()[3];
  const raw = encodeSave(state);
  await page.addInitScript(({ key, raw }) => localStorage.setItem(key, raw), { key: SAVE_KEY, raw });
  await page.goto('/');
  const img = page.locator('.scene-art-stage img.scene-art-image');
  await expect(img).toHaveAttribute('src', /axiom-approach-v2-production.png$/);
  await page.getByRole('button', { name: 'Continue scene', exact: true }).click();
  await expect(img).toHaveAttribute('src', /axiom-security-lobby-v2-production.png$/);
  await page.getByRole('button', { name: 'Continue scene', exact: true }).click();
  await expect(img).toHaveAttribute('src', /axiom-office-arrival-v1-production.png$/);
  await expect.poll(() => img.evaluate((el: HTMLImageElement) => [el.naturalWidth, el.naturalHeight])).toEqual([1920, 1080]);
  await expect(page.getByText('Daniel is waiting beside your desk.', { exact: true })).toHaveCount(0);
  await page.screenshot({ path: testInfo.outputPath('office-arrival-live.png'), fullPage: true });
  await page.getByRole('heading', { level: 1 }).click();
  await expect(img).toHaveAttribute('src', /axiom-office-arrival-v1-production.png$/);
  expect(await page.evaluate((key) => localStorage.getItem(key), SAVE_KEY)).toBe(raw);
  await page.getByRole('button', { name: 'Continue scene', exact: true }).click();
  await expect(img).toHaveAttribute('src', /axiom-opening-office-shot01-daniel-v1-production.png$/);
  await expect(page.getByText('Daniel is waiting beside your desk.', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: /Approach your desk/ }).click();
  await expect(page.locator('[data-reading-shot]')).toHaveAttribute(
    'data-reading-shot',
    'opening.office.shot01-daniel',
  );
  await expect(img).toHaveAttribute('src', /axiom-opening-office-shot01-daniel-v1-production.png$/);
});
