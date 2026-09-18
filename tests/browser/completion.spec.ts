import { openNavigation, setReadingSize } from './reader-navigation';
import { test, expect, type Page } from '@playwright/test';
import { encodeSave, decodeSave, SAVE_KEY } from '../../src/persistence/saves';
import { missionStart, runMission } from '../mission-helpers';
import { clinicStart, traverse } from '../clinic-helpers';
import type { GameState } from '../../src/state/schema';

async function seed(page: Page, state: GameState) {
  await page.goto('/');
  await page.evaluate(({ key, raw }) => localStorage.setItem(key, raw), {
    key: SAVE_KEY,
    raw: encodeSave(state),
  });
  await page.reload();
}

test('simulation answer is visible before authorization, stays in history and survives reload', async ({
  page,
}) => {
  await seed(page, traverse(clinicStart(), {}, 'display'));
  await page.locator('[data-clinic-choice="display.curiosity"]').click();
  await expect(page.locator('#story')).toContainText(
    'It is a prediction, not a photograph of the result.',
  );
  await expect(page.locator('#story')).toContainText('Authorization status: not yet given.');
  await expect(page.locator('.confirmation')).toHaveCount(0);
  await page.reload();
  await expect(page.locator('#story')).toContainText('variation during recovery');
  await openNavigation(page);
  await page.getByRole('button', { name: 'Conversation history', exact: true }).click();
  await expect(page.getByRole('dialog')).toContainText(
    'the model cannot promise how you will feel',
  );
});

for (const method of ['audio', 'photo', 'token']) {
  test(
    'late ' + method + ' is a missed opportunity, still permits extraction and retains exact save',
    async ({ page }) => {
      const s = runMission(
        missionStart('shadow'),
        { assessment: 'source.priya', method: 'method.' + method },
        'exchange',
      );
      await seed(page, s);
      const advance = page.getByRole('button', { name: /Turn toward the gallery/ });
      await advance.press('Enter');
      await expect(page.locator('#story')).toContainText(
        {
          audio: 'I cannot record words they have finished saying',
          photo: 'nothing passing between their hands',
          token: 'You lower your empty hand',
        }[method]!,
      );
      await page.locator('[data-mission-choice="confrontation.leave"]').click();
      await page.locator('[data-mission-choice="escape.descend"]').click();
      await expect(page.locator('#story')).toContainText('Correcting that cost us the beginning');
      const raw = await page.evaluate((key) => localStorage.getItem(key)!, SAVE_KEY);
      const saved = decodeSave(raw);
      expect(saved.mission.capture?.quality).toBe(
        { audio: 'fragment', photo: 'contact', token: 'none' }[method],
      );
      await page.reload();
      expect(await page.evaluate((key) => localStorage.getItem(key), SAVE_KEY)).toBe(raw);
      await expect(page.locator('#story')).toContainText('Correcting that cost us the beginning');
    },
  );
}

test('earned ending recap and differentiated journal work at narrow width without identity verdicts', async ({
  page,
}) => {
  const s = runMission(missionStart('socialite'), { method: 'method.token' });
  await page.setViewportSize({ width: 390, height: 844 });
  await seed(page, s);
  await setReadingSize(page, '24');
  await page.getByText('Review assessment', { exact: true }).click();
  await expect(page.getByRole('region', { name: 'Choices you carried here' })).toContainText(
    'socialite outfit',
  );
  await expect(page.locator('.personal-recap')).toContainText('left the identity details out');
  await expect(page.locator('.personal-recap')).not.toContainText('You have become');
  await expect(page.getByRole('dialog')).toContainText('Held by: Evelynn');
  await page.keyboard.press('Escape');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole('button', { name: 'Review your evidence', exact: true }).click();
  await expect(page.getByRole('dialog')).toContainText(
    'Benton’s access token — potential leverage',
  );
  await expect(page.getByRole('dialog')).toContainText('Possession alone is incomplete proof');
  await page.getByRole('button', { name: 'Close dialog' }).press('Enter');
  await expect(
    page.getByRole('button', { name: 'Review your evidence', exact: true }),
  ).toBeFocused();
});
