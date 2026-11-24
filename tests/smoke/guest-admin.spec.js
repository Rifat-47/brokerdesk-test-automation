import { adminGuestTest as test, expect } from '../../fixtures/test.js';
import { LoginPage } from '../../pages/auth/login.page.js';

test('BDK-0-SMK05 A guest is sent from Brokerages to operator sign-in', async ({ page }) => {
  const login = new LoginPage(page);
  await page.goto('/brokerages');
  await expect(page).toHaveURL(/\/login$/);
  await expect(login.heading('Operator sign in')).toBeVisible();
  await expect(login.email).toBeVisible();
  await expect(login.password).toBeVisible();
  await expect(login.submit).toBeVisible();
});
