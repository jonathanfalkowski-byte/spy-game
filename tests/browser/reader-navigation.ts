import type { Page } from '@playwright/test';
export async function openNavigation(page: Page) {
  const menu = page.getByRole('button', { name: 'Menu', exact: true });
  if ((await menu.isVisible()) && !(await page.getByRole('dialog').isVisible())) await menu.click();
}
export async function setReadingSize(page: Page, size: string) {
  await openNavigation(page);
  await page.getByLabel('Reading size').selectOption(size);
  if (await page.getByRole('dialog', { name: 'Story menu' }).isVisible())
    await page.keyboard.press('Escape');
}
