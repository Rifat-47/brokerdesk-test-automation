import { test as base, expect } from '@playwright/test';
import { adminUrl, workspaceUrl } from '../config/env.js';
import { roles } from '../config/roles.js';
import { sessionFor } from '../services/sessions.js';

/**
 * Signed-in tests: one shared login per role.
 * Never sign out or change the password here; that ends the shared session.
 */
function signedIn(role) {
  return base.extend({
    baseURL: roles[role].site(),
    roleSession: [
      async ({ browser }, use) => {
        await use(await sessionFor(browser, role));
      },
      { scope: 'worker' },
    ],
    storageState: async ({ roleSession }, use) => {
      await use(roleSession);
    },
  });
}

/** Guest tests, one per site. Nobody is signed in. */
export const test = base;
export const workspaceGuestTest = base.extend({ baseURL: workspaceUrl() });
export const adminGuestTest = base.extend({ baseURL: adminUrl() });

export const superadminTest = signedIn('superadmin');
export const agentTest = signedIn('agent');
export const clientTest = signedIn('client');
export const operatorTest = signedIn('operator');

export { expect };
