import { test, expect, type Page } from '@playwright/test';
import { act, initialState } from '../../src/state/reducer';
import { SAVE_KEY, encodeSave, decodeSave } from '../../src/persistence/saves';
import { toAnalysis } from '../helpers';
import { missionStart, runMission } from '../mission-helpers';
async function seed(page: Page, state = initialState()) {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.addInitScript(
    ({ key, raw }) => {
      if (!localStorage.getItem(key)) localStorage.setItem(key, raw);
    },
    { key: SAVE_KEY, raw: encodeSave(state) },
  );
  await page.goto('/');
}
const entry = (page: Page) => page.locator('.rail [data-assessment-status]');
test('idle assessment is accessible, explicit and never mutates state', async ({ page }) => {
  await seed(page);
  const raw = await page.evaluate((k) => localStorage.getItem(k), SAVE_KEY);
  await expect(entry(page)).toHaveAttribute('data-assessment-status', 'idle');
  await entry(page).click();
  await expect(page.getByRole('dialog')).toContainText('No assessment is available');
  await page.keyboard.press('Escape');
  expect(await page.evaluate((k) => localStorage.getItem(k), SAVE_KEY)).toBe(raw);
});
test('available Glass House assessment leaves investigation open; draft then explicit commit', async ({
  page,
}) => {
  await seed(page, runMission(missionStart(), {}, 'hub'));
  await expect(entry(page)).toHaveAttribute('data-assessment-status', 'available');
  await expect(entry(page)).toHaveCSS('animation-name', 'none');
  await page.screenshot({ path: 'review-saves/final-assessment-available.png', animations: 'disabled' });
  const raw = await page.evaluate((k) => localStorage.getItem(k), SAVE_KEY);
  await entry(page).click();
  await page.keyboard.press('Escape');
  expect(await page.evaluate((k) => localStorage.getItem(k), SAVE_KEY)).toBe(raw);
  await expect(page.locator('[data-mission-choice="lead.guest"]')).toBeEnabled();
  await entry(page).click();
  await page.getByRole('button', { name: 'Begin assessment', exact: true }).click();
  await expect(entry(page)).toHaveAttribute('data-assessment-status', 'required');
  await page.locator('[data-mission-choice="source.insufficient"]').click();
  await expect(entry(page)).toHaveAttribute('data-assessment-status', 'required');
  await page.locator('[data-mission-choice="source.confirm"]').click();
  await expect(entry(page)).toHaveAttribute('data-assessment-status', 'completed');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.locator('.assessment-confirmation')).toHaveText('✓ Assessment recorded');
  await expect(page.locator('.assessment-notice')).toHaveCount(0);
  await page.reload();
  await expect(entry(page)).toHaveAttribute('data-assessment-status', 'completed');
  expect(
    decodeSave((await page.evaluate((k) => localStorage.getItem(k), SAVE_KEY))!).mission.source,
  ).toBe('insufficient');
});
for (const motion of ['reduce', 'no-preference'] as const)
  test('required Helix attention and explicit progression / ' + motion, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: motion });
    await seed(page, toAnalysis());
    await expect(entry(page)).toHaveAttribute('data-assessment-status', 'required');
    await expect(entry(page)).toContainText('⚠ Assessment required');
    if (motion === 'reduce') await expect(entry(page)).toHaveCSS('animation-name', 'none');
    else {
      await expect(entry(page)).toHaveCSS('animation-iteration-count', '3');
      await expect(entry(page)).not.toHaveClass(/assessment-pulse/, { timeout: 6000 });
    }
    await expect(entry(page)).toHaveCSS('border-top-width', '2px');
    await page.screenshot({ path: 'review-saves/final-assessment-required-' + motion + '.png', animations: 'disabled' });
    await expect(page.locator('.assessment-notice')).toContainText('before progressing');
    await expect(page.getByRole('button', { name: 'Continue', exact: true })).toHaveCount(0);
    await page.getByRole('button', { name: 'Open assessment', exact: true }).click();
    await page
      .getByRole('button', { name: 'The evidence does not support one conclusion.' })
      .click();
    await expect(page.getByRole('dialog')).toContainText('Draft · not yet submitted');
    await expect(page.locator('.report')).toContainText('Reviewed records included:');
    await expect(page.locator('.report')).toContainText(/recorded connection.*included with submission/);
    expect(await page.evaluate(() => !!document.activeElement?.closest('dialog'))).toBe(true);
    await page.keyboard.press('Escape');
    await page.reload();
    await expect(entry(page)).toHaveAttribute('data-assessment-status', 'required');
    await page.getByRole('button', { name: 'Open assessment', exact: true }).click();
    await page.getByRole('button', { name: 'Submit this assessment', exact: true }).click();
    await expect(entry(page)).toHaveAttribute('data-assessment-status', 'completed');
    await expect(entry(page)).toHaveCSS('animation-name', 'none');
    await expect(page.getByRole('button', { name: 'Look up from the terminal' })).toBeEnabled();
    const raw = await page.evaluate((k) => localStorage.getItem(k), SAVE_KEY);
    await page.reload();
    await expect(entry(page)).toHaveAttribute('data-assessment-status', 'completed');
    expect(await page.evaluate((k) => localStorage.getItem(k), SAVE_KEY)).toBe(raw);
    await page.getByRole('button', { name: 'Review assessment', exact: true }).click();
    await expect(page.getByRole('dialog')).toContainText('Your submitted assessment');
  });
test('assessment overlay holds current approved artwork and reading position', async ({ page }) => {
  await seed(page, act(runMission(), { type: 'CONTINUE_CHAPTER3' }));
  const stage = page.locator('.scene-art-stage'),
    im = page.locator('.scene-art-image');
  const shot = await stage.getAttribute('data-reading-shot');
  await im.evaluate((e) => e.setAttribute('data-identity-probe', 'same'));
  const raw = await page.evaluate((k) => localStorage.getItem(k), SAVE_KEY);
  await entry(page).click();
  await expect(page.getByRole('dialog')).toContainText('Your assessment');
  await expect(stage).toHaveAttribute('data-reading-shot', shot!);
  await expect(im).toHaveAttribute('data-identity-probe', 'same');
  await page.keyboard.press('Escape');
  await expect(im).toHaveAttribute('data-identity-probe', 'same');
  expect(await page.evaluate((k) => localStorage.getItem(k), SAVE_KEY)).toBe(raw);
});
