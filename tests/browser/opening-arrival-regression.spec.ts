import { test, expect } from '@playwright/test';
import { act, initialState } from '../../src/state/reducer';
import { initialState as historicalInitialState, act as historicalAct } from '../../src/persistence/legacy-v13/state/reducer';
import { StateSchema } from '../../src/state/schema';
import { encodeSave, SAVE_KEY } from '../../src/persistence/saves';

for (const edition of ['current', 'historical-13'] as const) {
  test(`${edition}: arrival occurs once during forward play`, async ({ page }) => {
    let historical = historicalInitialState();
    historical = historicalAct(historical, { type: 'CHOOSE_DIALOGUE', id: 'bond.friend' });
    historical = historicalAct(historical, { type: 'CHOOSE_DIALOGUE', id: 'morning.day' });
    historical = historicalAct(historical, { type: 'CONTINUE' });
    let current = initialState();
    current = act(current, { type: 'CHOOSE_DIALOGUE', id: 'bond.friend' });
    current = act(current, { type: 'CHOOSE_DIALOGUE', id: 'morning.day' });
    current = act(current, { type: 'CONTINUE' });
    const state = edition === 'current' ? current : StateSchema.parse(historical);
    const raw = encodeSave(state);
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('response', (response) => {
      if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
    });
    await page.addInitScript(({ key, raw }) => {
      if (!localStorage.getItem(key)) localStorage.setItem(key, raw);
    }, { key: SAVE_KEY, raw });
    await page.goto('/');
    const beat = page.getByRole('region', { name: 'Opening scene', exact: true });
    const shots = [
      'opening.axiom.shot01-approach',
      'opening.axiom.shot02-security',
      'opening.axiom.shot03-office-arrival',
      'opening.office.shot01-daniel',
    ];
    const titles = ['From home to Axiom', 'Axiom security', 'Strategic Intelligence', 'Daniel at your desk'];
    let arrivals = 0;
    for (const [index, shot] of shots.entries()) {
      await expect(beat).toHaveCount(1);
      await expect(beat).toHaveAttribute('data-reading-shot', shot);
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(titles[index]);
      const text = await beat.innerText();
      if (text.includes('The elevator carries you')) arrivals++;
      if (index !== 2) expect(text).not.toContain('The elevator carries you');
      if (index !== 1) expect(text).not.toContain('You collect your coat and phone');
      if (index !== 1) expect(text).not.toContain('You set your phone and coat in a tray');
      expect(await page.evaluate((key) => localStorage.getItem(key), SAVE_KEY)).toBe(raw);
      if (index < 3) await page.getByRole('button', { name: 'Continue scene', exact: true }).click();
    }
    expect(arrivals).toBe(1);
    await page.getByRole('button', { name: 'Approach your desk', exact: true }).click();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Someone else’s promotion');
    await expect(page.locator('.narrative').filter({ hasText: 'You collect your coat and phone' })).toHaveCount(0);
    expect(errors).toEqual([]);
  });
}
