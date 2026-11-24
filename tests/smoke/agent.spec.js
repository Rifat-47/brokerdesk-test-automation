import { agentTest as test, expect } from '../../fixtures/test.js';
import { Sidebar } from '../../pages/layout/sidebar.page.js';

test('BDK-0-SMK08 An agent opens Contacts', async ({ page }) => {
  await page.goto('/contacts');
  await expect(page.getByRole('heading', { level: 1, name: 'Contacts' })).toBeVisible();
});

test('BDK-0-SMK09 An agent is refused Roles', async ({ page }) => {
  const sidebar = new Sidebar(page);
  await page.goto('/settings/roles');
  await expect(page.getByText("You don't have access to this page")).toBeVisible();
  await expect(sidebar.link('Contacts')).toBeVisible();
  await expect(sidebar.link('Roles')).toBeHidden();
});
