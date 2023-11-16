// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Swag Labs/);
});

test('login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByText('Swag Labs' )).toBeVisible();
});

test('add-remove', async({ page }) => {

  await page.goto('https://www.saucedemo.com');

  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // add
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();

  // sepet
  await page.locator('a').filter({ hasText: '3' }).click();
  await expect(page.getByText('Your Cart')).toBeVisible;

  // remove
  await page.locator('[data-test="remove-sauce-labs-onesie"]').click();
  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

  // purchase
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').fill('asd');
  await page.locator('[data-test="lastName"]').click();
  await page.locator('[data-test="lastName"]').fill('fg');
  await page.locator('[data-test="postalCode"]').click();
  await page.locator('[data-test="postalCode"]').fill('333');
  await page.locator('[data-test="continue"]').click();
  
  // total check
  await expect(page.getByText('Total: $10.79')).toBeVisible;

  await page.locator('[data-test="finish"]').click();

  // successful ?
  await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible;

});