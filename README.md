# BrokerDesk test automation

Playwright tests (JavaScript, Chrome) and test cases for the BrokerDesk brokerage platform: the public site, brokerage workspaces, the client portal and the operator admin.

## Setup

Needs Node 22+, Google Chrome, [pre-commit](https://pre-commit.com) and [gitleaks](https://github.com/gitleaks/gitleaks).

```bash
npm ci
cp .env.example .env   # then fill it in
pre-commit install
```

Use test accounts in a demo brokerage. The client account needs at least one deal.

## Run

| Command                          | Runs                             |
| -------------------------------- | -------------------------------- |
| `npm test`                       | Everything                       |
| `npm run test:smoke`             | Smoke                            |
| `npm run test:features`          | All features                     |
| `npm run test:id -- BDK-0-SMK01` | One test case                    |
| `npm run check`                  | Lint, format and document checks |

Workers, retries and timeouts are set in `config/test.config.js`.

## How it fits together

- `test-cases/`: one document per feature, and the feature list
- `tests/`: specs, each titled with its test case ID
- `pages/`: page objects
- `services/`: API setup
- `fixtures/`: a `test` for each kind of user
- `config/`: sites, roles and run settings
- `data/`: test inputs, never secrets

| Test                                        | Site           | Signed in as |
| ------------------------------------------- | -------------- | ------------ |
| `test`                                      | Public site    | Nobody       |
| `workspaceGuestTest`                        | Workspace      | Nobody       |
| `adminGuestTest`                            | Operator admin | Nobody       |
| `superadminTest`, `agentTest`, `clientTest` | Workspace      | That role    |
| `operatorTest`                              | Operator admin | Operator     |

Each role signs in once. The session is saved in `.auth/` (never committed) and reused until it expires, because the site allows only five sign-ins a minute. Tests that sign out or change a password use their own account.

Work happens on a branch; `main` is updated through pull requests. CI runs the checks on every pull request and push to `main`.
