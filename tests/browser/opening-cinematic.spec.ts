import { test, expect } from '@playwright/test';
import { act, initialState } from '../../src/state/reducer';
import { encodeSave, SAVE_KEY } from '../../src/persistence/saves';
import { openingVisualFixtures } from '../opening-visual-fixtures';

function commuteState() {
  let state = initialState();
  state = act(state, { type: 'CHOOSE_DIALOGUE', id: 'bond.friend' });
  state = act(state, { type: 'CHOOSE_DIALOGUE', id: 'morning.yes' });
  return act(state, { type: 'CONTINUE' });
}

test('opening commute advances ordered cuts, reveals Daniel, and holds into office dialogue', async ({ page }) => {
  const state = commuteState();
  const raw = encodeSave(state);
  await page.addInitScript(({ key, value }) => localStorage.setItem(key, value), {
    key: SAVE_KEY,
    value: raw,
  });
  await page.goto('/');

  const beat = page.locator('section[aria-label="Opening scene"][data-reading-shot]');
  await expect(beat).toHaveAttribute('data-reading-shot', 'opening.axiom.shot01-approach');
  await expect(page.locator('.scene-art-stage img.scene-art-image')).toHaveAttribute(
    'src',
    /art\/opening\/axiom-exterior-approach-adrian-v2-production\.png$/,
  );
  await expect(page.getByText('Daniel is waiting beside your desk.', { exact: true })).toHaveCount(0);
  const sceneContinue = page.getByRole('button', { name: /Approach your desk/ });
  await expect(sceneContinue).toHaveCount(0);

  await page.getByRole('button', { name: 'Continue scene', exact: true }).click();
  await expect(beat).toHaveAttribute('data-reading-shot', 'opening.axiom.shot02-security');
  await expect(page.locator('.scene-art-stage img.scene-art-image')).toHaveAttribute(
    'src',
    /art\/opening\/axiom-security-gate-adrian-v2-production\.png$/,
  );
  await expect(page.getByText('Daniel is waiting beside your desk.', { exact: true })).toHaveCount(0);
  await expect(sceneContinue).toHaveCount(0);

  await page.getByRole('button', { name: 'Continue scene', exact: true }).click();
  await expect(beat).toHaveAttribute('data-reading-shot', 'opening.axiom.shot03-office-arrival');
  await expect(page.locator('.scene-art-stage img.scene-art-image')).toHaveAttribute(
    'src',
    /art\/opening\/axiom-office-approach-adrian-v3-transparent-production\.png$/,
  );
  await expect(sceneContinue).toHaveCount(0);

  await page.getByRole('button', { name: 'Continue scene', exact: true }).click();
  await expect(beat).toHaveAttribute('data-reading-shot', 'opening.office.shot01-daniel');
  await expect(page.locator('.scene-art-stage img.scene-art-image')).toHaveAttribute(
    'src',
    /art\/opening\/axiom-opening-office-shot01-daniel-v3-transparent-production\.png$/,
  );
  await expect(page.getByText('Daniel is waiting beside your desk.', { exact: true })).toBeVisible();
  await expect(sceneContinue).toBeEnabled();
  expect(await page.evaluate((key) => localStorage.getItem(key), SAVE_KEY)).toBe(raw);

  await sceneContinue.click();
  await expect(page.locator('h1')).toHaveText('Someone else’s promotion');
  await expect(page.locator('[data-reading-shot]')).toHaveAttribute(
    'data-reading-shot',
    'opening.office.shot01-daniel',
  );
  await expect(page.locator('.scene-art-stage img.scene-art-image')).toHaveAttribute(
    'src',
    /art\/opening\/axiom-opening-office-shot01-daniel-v3-transparent-production\.png$/,
  );
  await page.locator('[data-choice="promotion.professional"]').click();
  await expect(page.locator('h1')).toHaveText('The work remains');
  await expect(page.locator('.scene-art-stage img.scene-art-image')).toHaveAttribute(
    'src',
    /art\/opening\/axiom-opening-office-shot02-benton-v3-transparent-production\.png$/,
  );
  await page.locator('[data-choice="benton.obey"]').click();
  await expect(page.locator('h1')).toHaveText('What Benton leaves behind');
  await expect(page.locator('.scene-art-stage img.scene-art-image')).toHaveAttribute(
    'src',
    /art\/opening\/axiom-opening-office-shot03-file-v3-transparent-production\.png$/,
  );
  expect(await page.evaluate((key) => localStorage.getItem(key), SAVE_KEY)).not.toBe(raw);
});

test('Maya coffee frame holds through invitation and case, then cuts on departure', async ({ page }) => {
  const state = openingVisualFixtures()[15].state;
  await page.addInitScript(({ key, value }) => localStorage.setItem(key, value), {
    key: SAVE_KEY,
    value: encodeSave(state),
  });
  await page.goto('/');
  const image = page.locator('.scene-art-stage img.scene-art-image');
  const mayaSrc = /art\/opening\/axiom-opening-office-shot01-maya-v3-transparent-production\.png$/;
  await expect(image).toHaveAttribute('src', mayaSrc);

  await page.locator('[data-choice="mayaPromotion.hurt"]').click();
  await expect(image).toHaveAttribute('src', mayaSrc);
  await page.locator('[data-choice="invitation.yes"]').click();
  await expect(image).toHaveAttribute('src', mayaSrc);
  await page.locator('[data-choice="disclosure.private"]').click();
  await expect(page.getByRole('heading', { name: 'Before she goes' })).toBeVisible();
  await expect(image).toHaveAttribute(
    'src',
    /art\/opening\/axiom-opening-office-shot02-maya-departure-v3-transparent-production\.png$/,
  );
});
