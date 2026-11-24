import { workspaceGuestTest as test, expect } from '../../fixtures/test.js';
import { LoginPage } from '../../pages/auth/login.page.js';

test('BDK-0-SMK03 A guest is sent from Properties to sign-in', async ({ page }) => {
  const login = new LoginPage(page);
  await page.goto('/properties');
  await expect(page).toHaveURL(/\/login\?next=%2Fproperties$/);
  await expect(login.heading('Welcome back')).toBeVisible();
  await expect(login.email).toBeVisible();
  await expect(login.password).toBeVisible();
  await expect(login.submit).toBeVisible();
});

test('BDK-0-SMK04 A guest is sent from the client portal to sign-in', async ({ page }) => {
  const login = new LoginPage(page);
  await page.goto('/portal');
  await expect(page).toHaveURL(/\/login\?next=%2Fportal$/);
  await expect(login.heading('Welcome back')).toBeVisible();
});
