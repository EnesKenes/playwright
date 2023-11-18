// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach('Open and Login', async ({ page }, testInfo) => {
  await page.goto('https://www.saucedemo.com');

  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
});

test('has title', async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Swag Labs/);
});

test('login', async ({ page }) => {
  // Expects page to have a heading
  await expect(page.getByText('Swag Labs' )).toBeVisible();
});

test('add-remove-buy', async({ page }) => {
  // add to cart
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();

  // cart check
  await page.locator('a').filter({ hasText: '3' }).click();
  await expect(page.getByText('Your Cart')).toBeVisible;

  // remove from cart
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