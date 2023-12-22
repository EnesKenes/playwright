import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/search?q=google+drive&oq=google+drive&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRhA0gEIMTk2NWowajKoAgCwAgA&sourceid=chrome&ie=UTF-8');
  await page.getByRole('link', { name: 'Google\'ın Kişisel Bulut' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.locator('#hero-cta-wrapper').getByRole('link', { name: 'Drive for Work\'ü deneyin' }).click();
  const page1 = await page1Promise;
  await page1.getByRole('heading', { name: 'En iyi performansı göstermek' }).click();
});