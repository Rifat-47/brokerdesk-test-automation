import { workspaceUrl } from '../../config/env.js';
import { operatorTest as test, expect } from '../../fixtures/test.js';
import { Sidebar } from '../../pages/layout/sidebar.page.js';

test('BDK-0-SMK11 An operator opens Brokerages', async ({ page }) => {
  const sidebar = new Sidebar(page);
  await page.goto('/brokerages');
  await expect(page.getByRole('heading', { level: 1, name: 'Brokerages' })).toBeVisible();
  await expect(
    page.getByRole('cell', { name: new URL(workspaceUrl()).host, exact: true }),
  ).toBeVisible();
  await expect(sidebar.link('Error log')).toBeVisible();
});

test('BDK-0-SMK12 An operator opens the Email log', async ({ page }) => {
  await page.goto('/email-log');
  await expect(page.getByRole('heading', { level: 1, name: 'Email log' })).toBeVisible();
});
