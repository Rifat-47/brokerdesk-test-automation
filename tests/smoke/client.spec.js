import { clientTest as test, expect } from '../../fixtures/test.js';

test('BDK-0-SMK10 A client is sent from Home to the portal', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/portal$/);
  await expect(page.getByRole('heading', { level: 1, name: /^Welcome, / })).toBeVisible();
  await expect(page.locator('main a[href^="/portal/deals/"]').first()).toBeVisible();
});
