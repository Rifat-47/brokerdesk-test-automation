import 'dotenv/config';

export function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set. Copy .env.example to .env and fill it in.`);
  return value;
}

export const publicUrl = () => process.env.PUBLIC_URL || 'http://localhost:5180';
export const workspaceUrl = () => process.env.WORKSPACE_URL || 'http://demo.localhost:5180';
export const adminUrl = () => process.env.ADMIN_URL || 'http://admin.localhost:5181';
