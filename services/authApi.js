// Calls run inside a page of the site: Node cannot resolve *.localhost on Windows,
// and the API refuses changes that do not come from a page on the same site.
function call(page, method, path, body) {
  return page.evaluate(
    async (req) => {
      const response = await fetch(req.path, {
        method: req.method,
        headers: req.body ? { 'content-type': 'application/json' } : {},
        body: req.body && JSON.stringify(req.body),
      });
      return { ok: response.ok, status: response.status };
    },
    { method, path, body },
  );
}

/** Signs in through the API. The page's context keeps the session cookie. */
export async function loginByApi(page, { api, email, password, label }) {
  const { ok, status } = await call(page, 'POST', `${api}/auth/login`, { email, password });
  if (!ok) throw new Error(`Login failed for the configured ${label}: HTTP ${status}`);
}

/** True while the context's session cookie still works. */
export async function isSignedIn(page, { api }) {
  const { ok, status } = await call(page, 'GET', `${api}/auth/me`);
  if (!ok && status !== 401) throw new Error(`Session check failed: HTTP ${status}`);
  return ok;
}

/** Marks the first-visit tour as seen, so it does not cover the page under test. */
export async function skipTour(page, { api }) {
  const { ok, status } = await call(page, 'POST', `${api}/auth/tour-seen`);
  if (!ok) throw new Error(`Skipping the tour failed: HTTP ${status}`);
}
