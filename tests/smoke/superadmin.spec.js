import { superadminTest as test, expect } from '../../fixtures/test.js';
import { Sidebar } from '../../pages/layout/sidebar.page.js';

test('BDK-0-SMK06 A superadmin opens Home', async ({ page }) => {
  const sidebar = new Sidebar(page);
  await page.goto('/');
  await expect(
    page.getByRole('heading', { level: 1, name: /^Good (morning|afternoon|evening), / }),
  ).toBeVisible();
  await expect(page.getByRole('region', { name: 'Key numbers' })).toBeVisible();
  await expect(sidebar.link('Roles')).toBeVisible();
});

test('BDK-0-SMK07 A superadmin opens Properties', async ({ page }) => {
  await page.goto('/properties');
  await expect(page.getByRole('heading', { level: 1, name: 'Properties' })).toBeVisible();
  await expect(page.getByRole('checkbox', { name: /^Select (?!all)/ }).first()).toBeVisible();
});
