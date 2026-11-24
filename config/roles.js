import { adminUrl, workspaceUrl } from './env.js';

/** Who can sign in, where, and through which API. `env` prefixes the account's variables. */
export const roles = {
  superadmin: { env: 'SUPERADMIN', site: workspaceUrl, api: '/api/v1', hasTour: true },
  agent: { env: 'AGENT', site: workspaceUrl, api: '/api/v1', hasTour: true },
  client: { env: 'CLIENT', site: workspaceUrl, api: '/api/v1' },
  operator: { env: 'OPERATOR', site: adminUrl, api: '/platform/v1' },
};
