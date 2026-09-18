import { test, expect } from '@playwright/test';
import { missionStart, runMission } from '../mission-helpers';
import { act } from '../../src/state/reducer';
import { encodeSave, SAVE_KEY } from '../../src/persistence/saves';

for (const outfit of ['executive', 'socialite', 'shadow']) {
  for (const moment of ['pre', 'post']) {
    test(`${moment} Glass House checks approval and selected ${outfit}`, async ({ page }, info) => {
      const state =
        moment === 'pre'
          ? runMission(missionStart(outfit), { complete: 'home.begin' }, 'homePresentation')
          : act(runMission(missionStart(outfit)), { type: 'CONTINUE_CHAPTER3' });
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto('/');
      await page.evaluate(({ key, raw }) => localStorage.setItem(key, raw), {
        key: SAVE_KEY,
        raw: encodeSave(state),
      });
      await page.reload();
      const img = page.locator('.home-scene-art');
      // The strict reader gate excludes retained REVISE reviews, even with older owner approval.
      if (moment !== 'post' || outfit !== 'executive') {
        await expect(img).toHaveCount(0);
        await expect(page.locator('.scene-art-stage')).toHaveCount(0);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
          true,
        );
        expect(errors).toEqual([]);
        return;
      }
      await expect(img).toHaveAttribute(
        'src',
        `/art/apartment/apartment-${moment}-glasshouse-${outfit}-v1.png`,
      );
      await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.naturalWidth)).toBe(1920);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      );
      await page.screenshot({ path: info.outputPath('home-art.png'), fullPage: true });
      expect(errors).toEqual([]);
    });
  }
}
