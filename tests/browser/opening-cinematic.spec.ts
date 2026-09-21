import { test, expect } from '@playwright/test';
import { act, initialState } from '../../src/state/reducer';
import { encodeSave, SAVE_KEY } from '../../src/persistence/saves';

function commuteState() {
  let state = initialState();
  state = act(state, { type: 'CHOOSE_DIALOGUE', id: 'bond.friend' });
  state = act(state, { type: 'CHOOSE_DIALOGUE', id: 'morning.yes' });
  return act(state, { type: 'CONTINUE' });
}

test('opening commute advances ordered cuts and does not anticipate Daniel', async ({ page }) => {
  const state = commuteState();
  const raw = encodeSave(state);
  await page.addInitScript(({ key, value }) => localStorage.setItem(key, value), {
    key: SAVE_KEY,
    value: raw,
  });
  await page.goto('/');

  const beat = page.locator('[data-reading-shot]');
  await expect(beat).toHaveAttribute('data-reading-shot', 'opening.axiom.shot01-approach');
  await expect(page.locator('.scene-art-stage')).toHaveCount(0);
  await expect(page.getByText('Daniel is waiting beside your desk.', { exact: true })).toHaveCount(0);
  const sceneContinue = page.getByRole('button', { name: /Approach your desk/ });
  await expect(sceneContinue).toHaveCount(0);

  await page.getByRole('button', { name: 'Continue scene', exact: true }).click();
  await expect(beat).toHaveAttribute('data-reading-shot', 'opening.axiom.shot02-security');
  await expect(page.getByText('Daniel is waiting beside your desk.', { exact: true })).toHaveCount(0);
  await expect(sceneContinue).toHaveCount(0);

  await page.getByRole('button', { name: 'Continue scene', exact: true }).click();
  await expect(beat).toHaveAttribute('data-reading-shot', 'opening.axiom.shot03-office-arrival');
  await expect(page.getByText('Daniel is waiting beside your desk.', { exact: true })).toHaveCount(0);
  await expect(sceneContinue).toHaveCount(0);

  await page.getByRole('button', { name: 'Continue scene', exact: true }).click();
  await expect(beat).toHaveAttribute('data-reading-shot', 'opening.office.shot01-daniel');
  await expect(page.getByText('Daniel is waiting beside your desk.', { exact: true })).toBeVisible();
  await expect(sceneContinue).toBeEnabled();
  expect(await page.evaluate((key) => localStorage.getItem(key), SAVE_KEY)).toBe(raw);

  await sceneContinue.click();
  await expect(page.locator('h1')).toHaveText('Someone else’s promotion');
  await expect(page.locator('[data-reading-shot]')).toHaveCount(0);
  expect(await page.evaluate((key) => localStorage.getItem(key), SAVE_KEY)).not.toBe(raw);
});
