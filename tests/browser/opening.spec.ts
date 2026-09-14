import { test, expect, chromium, type Page } from '@playwright/test';
import { SAVE_KEY } from '../../src/persistence/saves';
import {
  initialState as originalInitial,
  act as originalAct,
} from '../../src/persistence/legacy-v1/state/reducer';
async function choose(page: Page, id: string) {
  await page.locator(`[data-choice="${id}"]`).click();
}
test('original arrival save migrates to revised checkpoint prose and keeps decisions', async ({
  page,
}) => {
  let original = originalAct(originalInitial(), { type: 'CHOOSE_DIALOGUE', id: 'bond.colleague' });
  original = originalAct(original, { type: 'CHOOSE_DIALOGUE', id: 'morning.ignore' });
  original = originalAct(original, { type: 'CONTINUE' });
  const raw = JSON.stringify({ schemaVersion: 2, contentVersion: 1, state: original });
  await page.goto('/');
  await page.evaluate(({ key, raw }) => localStorage.setItem(key, raw), { key: SAVE_KEY, raw });
  await page.reload();
  await expect(page.getByRole('heading', { name: 'From home to Axiom' })).toBeVisible();
  await expect(
    page.getByText('Most of the lobby belongs to security.', { exact: false }),
  ).toBeVisible();
  expect(await page.evaluate((key) => localStorage.getItem(key), SAVE_KEY)).toBe(raw);
  await page.screenshot({ path: 'test-results/revised-arrival.png', fullPage: true });
  await continueWith(page, 'Approach your desk');
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Someone else’s promotion' })).toBeVisible();
  const saved = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), SAVE_KEY);
  expect(saved.contentVersion).toBe(9);
  expect(saved.state.choices).toEqual(original.choices);
  expect(saved.state.ledger.slice(0, original.ledger.length)).toEqual(original.ledger);
});
async function continueWith(page: Page, name: string) {
  await page.getByRole('button', { name, exact: false }).click();
}
async function analysis(page: Page) {
  await page.goto('/');
  await choose(page, 'bond.friend');
  await choose(page, 'morning.yes');
  await continueWith(page, 'Leave for Axiom');
  await continueWith(page, 'Approach your desk');
  await choose(page, 'promotion.angry');
  await choose(page, 'benton.push');
  await continueWith(page, 'Open the Helix brief');
  await continueWith(page, 'Open case records');
  for (const name of [
    'Acquisition request',
    'Helix divestiture 8-K',
    'Novagen seeks strategic buyer',
    'Helix talent activity',
  ])
    await continueWith(page, 'Read ' + name);
  await continueWith(page, 'Analyze the evidence');
}
async function conflict(page: Page) {
  await page
    .getByRole('button', { name: 'Benton claims Helix wants Novagen for its patents.' })
    .click();
  await page.getByRole('button', { name: 'Helix sold comparable patents six months ago' }).click();
  await page.getByRole('button', { name: 'They conflict', exact: true }).click();
}
async function mayaEnd(page: Page, disclosure = 'private') {
  await continueWith(page, 'Look up from the terminal');
  await choose(page, 'mayaPromotion.hurt');
  await choose(page, 'invitation.yes');
  await choose(page, 'disclosure.' + disclosure);
  await expect(page.getByRole('heading', { name: 'Before she goes' })).toBeVisible();
  await continueWith(page, 'Finish the opening');
  await expect(page.getByRole('heading', { name: 'The morning stays with you' })).toBeVisible();
}
const scenarios = [
  {
    name: 'bounded',
    label: 'Challenge the patent rationale',
    quality: 'supported',
    search: 'Cross-reference Novagen personnel',
    disclosure: 'voss',
    connect: true,
  },
  {
    name: 'personnel',
    label: 'Helix wants Novagen personnel.',
    quality: 'weak',
    search: 'Trace the patent ownership chain',
    disclosure: 'contradiction',
    connect: true,
  },
  {
    name: 'data',
    label: 'Helix wants customer or clinical data.',
    quality: 'weak',
    search: 'Audit the payment structure',
    disclosure: 'private',
    connect: true,
  },
  {
    name: 'fraud',
    label: 'The acquisition is financial fraud.',
    quality: 'incorrect',
    search: null,
    disclosure: 'nothing',
    connect: false,
  },
  {
    name: 'unresolved',
    label: 'The evidence does not support one conclusion.',
    quality: 'unresolved',
    search: null,
    disclosure: 'private',
    connect: false,
  },
] as const;
for (const scenario of scenarios)
  test(`${scenario.name} assessment plays through Maya and resumes ending`, async ({
    page,
  }, info) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await analysis(page);
    if (scenario.connect) await conflict(page);
    if (scenario.search) {
      await page.getByRole('button', { name: scenario.search }).click();
      await expect(
        page.getByRole('heading', { name: '0 investigation opportunities remain' }),
      ).toBeVisible();
      await expect(page.locator('.search-result')).toContainText('consumed');
      await page.reload();
      await expect(page.locator('.search-result')).toBeVisible();
    }
    await page.getByRole('button', { name: scenario.label }).click();
    await expect(page.getByRole('heading', { name: 'Before you send' })).toBeVisible();
    await expect(page.locator('.report')).toContainText('Benton only');
    await page.reload();
    await expect(page.getByRole('heading', { name: 'Before you send' })).toBeVisible();
    await continueWith(page, 'Submit this assessment');
    await expect(page.locator('.report')).toContainText(scenario.quality);
    await mayaEnd(page, scenario.disclosure);
    await page.reload();
    await expect(page.getByRole('heading', { name: 'The morning stays with you' })).toBeVisible();
    await expect(page.locator('body')).not.toContainText(
      /BLACKGLASS|ORACLE|Sublevel 17|Development state inspector/,
    );
    expect(errors).toEqual([]);
    if (scenario.name === 'bounded')
      await page.screenshot({ path: info.outputPath('ending.png'), fullPage: true });
  });
test('keyboard activation, visible focus, history trap and focus return', async ({ page }) => {
  await page.goto('/');
  const target = page.locator('[data-choice="bond.friend"]');
  for (let i = 0; i < 15 && !(await target.evaluate((el) => el === document.activeElement)); i++)
    await page.keyboard.press('Tab');
  await expect(target).toBeFocused();
  expect(await target.evaluate((el) => getComputedStyle(el).outlineStyle)).toBe('solid');
  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { name: 'A person outside the work' })).toBeVisible();
  const morning = page.locator('[data-choice="morning.yes"]');
  for (let i = 0; i < 15 && !(await morning.evaluate((el) => el === document.activeElement)); i++)
    await page.keyboard.press('Tab');
  await expect(morning).toBeFocused();
  await page.keyboard.press('Space');
  await expect(page.getByRole('heading', { name: 'The tower is waiting' })).toBeVisible();
  const history = page.getByRole('button', { name: 'Conversation history' });
  await history.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press('Tab');
    expect(await page.evaluate(() => !!document.activeElement?.closest('dialog'))).toBe(true);
  }
  await expect(page.getByRole('dialog')).toContainText('Absolutely.');
  await page.keyboard.press('Escape');
  await expect(history).toBeFocused();
});
test('incorrect evidence feedback is retryable; selection never changes automatically', async ({
  page,
}) => {
  await analysis(page);
  await page
    .getByRole('button', { name: 'Benton claims Helix wants Novagen for its patents.' })
    .click();
  await page.getByRole('button', { name: 'Helix sold comparable patents six months ago' }).click();
  await expect(page.getByRole('button', { name: 'Outside analysts value Novagen' })).toBeDisabled();
  await page.getByRole('button', { name: 'They support the same conclusion', exact: true }).click();
  await expect(page.locator('.confirmation')).toContainText('not supported');
  await expect(page.locator('[aria-pressed=true]')).toHaveCount(2);
  await expect(page.getByRole('button', { name: 'Challenge the patent rationale' })).toHaveCount(0);
  await page.getByRole('button', { name: 'They conflict', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Challenge the patent rationale' })).toBeVisible();
  await expect(
    page.getByRole('heading', { name: '1 investigation opportunity remains' }),
  ).toBeVisible();
});
test('unknown disclosures stay hidden; all Maya phases survive reload', async ({ page }) => {
  await analysis(page);
  await page.getByRole('button', { name: 'The evidence does not support one conclusion.' }).click();
  await continueWith(page, 'Submit this assessment');
  await continueWith(page, 'Look up from the terminal');
  for (const [heading, id] of [
    ['Maya brings coffee', 'mayaPromotion.fine'],
    ['Tonight still exists', 'invitation.no'],
    ['She notices the case', 'disclosure.nothing'],
  ] as const) {
    await page.reload();
    await expect(page.getByRole('heading', { name: heading })).toBeVisible();
    await expect(page.locator('[data-choice="disclosure.voss"]')).toHaveCount(0);
    await expect(page.locator('[data-choice="disclosure.contradiction"]')).toHaveCount(0);
    await choose(page, id);
  }
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Before she goes' })).toBeVisible();
  await continueWith(page, 'Finish the opening');
});
test('save failure is truthful and retry persists the current run', async ({ page }) => {
  await page.addInitScript(() => {
    const original = Storage.prototype.setItem;
    let failures = 1;
    Storage.prototype.setItem = function (k, v) {
      if (k === 'eve.production.opening' && failures-- > 0)
        throw new DOMException('Quota exceeded', 'QuotaExceededError');
      return original.call(this, k, v);
    };
  });
  await page.goto('/');
  await choose(page, 'bond.friend');
  await expect(page.locator('.save-label')).toHaveText('Not saved');
  await expect(page.getByRole('alert')).toContainText('not saved');
  await page.getByRole('button', { name: 'Retry save' }).click();
  await expect(page.locator('.save-label')).toHaveText('Saved · on this browser');
  await page.reload();
  await expect(page.getByRole('heading', { name: 'A person outside the work' })).toBeVisible();
});
test('corrupted save is retained and downloadable; restart requires confirmation', async ({
  page,
}) => {
  await page.goto('/');
  await page.evaluate((key) => {
    localStorage.setItem(key, '{bad save');
    localStorage.setItem('eve_m0', 'preserve prototype');
  }, SAVE_KEY);
  await page.reload();
  await expect(page.getByRole('heading', { name: 'We couldn’t read this save.' })).toBeVisible();
  expect(await page.evaluate((key) => localStorage.getItem(key), SAVE_KEY)).toBe('{bad save');
  const downloaded = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download original save data' }).click();
  expect((await downloaded).suggestedFilename()).toBe('eve-unreadable-save.json');
  await page.getByRole('button', { name: 'Restart story', exact: true }).click();
  await page.keyboard.press('Escape');
  expect(await page.evaluate((key) => localStorage.getItem(key), SAVE_KEY)).toBe('{bad save');
  await page.getByRole('button', { name: 'Restart story', exact: true }).click();
  await page.getByRole('button', { name: 'Restart and replace save' }).click();
  await expect(page.getByRole('heading', { name: 'Promotion day' })).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('eve_m0'))).toBe('preserve prototype');
});
test('a second tab cannot silently overwrite another tab’s decisions', async ({
  page,
  context,
}) => {
  await page.goto('/');
  const second = await context.newPage();
  await second.goto('/');
  await choose(page, 'bond.friend');
  await choose(second, 'bond.love');
  await expect(second.locator('.save-label')).toHaveText('Not saved');
  await expect(second.getByRole('alert')).toContainText('Another tab changed this save');
  await page.reload();
  await expect(page.locator('.narrative')).toContainText('closest thing I have to family');
  await second.close();
});
test('browser process closes and reopens at the exact committed phase', async ({}, info) => {
  const directory = info.outputPath('persistent-profile');
  let context = await chromium.launchPersistentContext(directory, { headless: true });
  let page = await context.newPage();
  await page.goto('http://127.0.0.1:4173');
  await choose(page, 'bond.love');
  await choose(page, 'morning.day');
  const raw = await page.evaluate((key) => localStorage.getItem(key), SAVE_KEY);
  await context.close();
  context = await chromium.launchPersistentContext(directory, { headless: true });
  page = await context.newPage();
  await page.goto('http://127.0.0.1:4173');
  await expect(page.getByRole('heading', { name: 'The tower is waiting' })).toBeVisible();
  expect(await page.evaluate((key) => localStorage.getItem(key), SAVE_KEY)).toBe(raw);
  await context.close();
});
test('responsive layout and extra-large reading remain within the viewport', async ({
  page,
}, info) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.getByLabel('Reading size').selectOption('24');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: info.outputPath('mobile-apartment.png'), fullPage: true });
  await analysis(page);
  await conflict(page);
  await page.getByRole('button', { name: 'Audit the payment structure' }).click();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: info.outputPath('mobile-investigation.png'), fullPage: true });
  await page.getByRole('button', { name: 'Evidence journal' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
test('desktop opening has real content, no overlay or development inspector', async ({
  page,
}, info) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Promotion day' })).toBeVisible();
  await expect(page.locator('vite-error-overlay')).toHaveCount(0);
  await expect(page.getByText('Development state inspector')).toHaveCount(0);
  await page.screenshot({ path: info.outputPath('desktop-apartment.png'), fullPage: true });
});
