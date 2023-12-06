// @ts-check
const { test, expect } = require('@playwright/test');

test('test', async ({ page }) => {
  await page.goto('https://dev.domka.shop/');
  await page.getByRole('heading', { name: 'Магазины' }).click();
  await expect(page.getByRole('link', { name: 'Просмотреть все магазины' })).toBeVisible();

});

test('click_by_all_shops', async  ({ page }) => {
    await page.goto('https://dev.domka.shop/');
    await page.getByRole('heading', { name: 'Магазины' }).click();
    await page.getByRole('link', { name: 'Просмотреть все магазины' }).click();
    await expect(page).toHaveURL('https://dev.domka.shop/partners/supermarket');
});
