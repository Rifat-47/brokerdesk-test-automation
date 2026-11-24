import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, rmSync, statSync } from 'node:fs';
import { setTimeout as sleep } from 'node:timers/promises';
import { requireEnv } from '../config/env.js';
import { roles } from '../config/roles.js';
import { isSignedIn, loginByApi, skipTour } from './authApi.js';

const DIR = '.auth';
const STALE_LOCK_MS = 30_000;

/** One process at a time per role, so parallel workers share a single login. */
async function withLock(path, run) {
  mkdirSync(DIR, { recursive: true });
  for (;;) {
    try {
      mkdirSync(path);
      break;
    } catch (error) {
      // On Windows a lock being removed reports EPERM for a moment.
      if (error.code !== 'EEXIST' && error.code !== 'EPERM') throw error;
      const createdAt = statSync(path, { throwIfNoEntry: false })?.mtimeMs ?? Date.now();
      if (Date.now() - createdAt > STALE_LOCK_MS) rmSync(path, { recursive: true, force: true });
      else await sleep(100);
    }
  }
  try {
    return await run();
  } finally {
    rmSync(path, { recursive: true, force: true });
  }
}

/**
 * Path of a saved, working session for the role. Sessions are kept between runs
 * because the site allows only five sign-ins a minute.
 */
export async function sessionFor(browser, name) {
  const { env, site, api, hasTour } = roles[name];
  const account = {
    site: site(),
    api,
    email: requireEnv(`${env}_EMAIL`),
    password: requireEnv(`${env}_PASSWORD`),
    label: name,
  };
  const key = createHash('sha256').update(`${account.site}|${account.email}`).digest('hex');
  const file = `${DIR}/${name}-${key.slice(0, 12)}.json`;

  return withLock(`${DIR}/${name}.lock`, async () => {
    const storageState = existsSync(file) ? file : undefined;
    const context = await browser.newContext({ storageState });
    try {
      const page = await context.newPage();
      await page.goto(new URL('/login', account.site).href, { waitUntil: 'domcontentloaded' });
      if (storageState && (await isSignedIn(page, account))) return file;
      await loginByApi(page, account);
      if (hasTour) await skipTour(page, account);
      await context.storageState({ path: file });
      return file;
    } finally {
      await context.close();
    }
  });
}
