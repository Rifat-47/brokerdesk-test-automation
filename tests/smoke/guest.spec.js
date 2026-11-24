import { test, expect } from '../../fixtures/test.js';

test('BDK-0-SMK01 The public site opens', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.locator('a[href="/signup"]').first()).toBeVisible();
});

test('BDK-0-SMK02 Sign-up opens', async ({ page }) => {
  await page.goto('/signup');
  await expect(
    page.getByRole('heading', { level: 1, name: 'Create your brokerage' }),
  ).toBeVisible();
  await expect(page.getByLabel('Brokerage name')).toBeVisible();
  await expect(page.getByLabel('Work email')).toBeVisible();
});
