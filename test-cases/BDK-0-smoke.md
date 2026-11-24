# BDK-0 — Smoke: Test Cases

A quick check that the three sites are up and that guests and each kind of signed-in user get the right pages.

**Applies to:** the public site, a brokerage workspace with its client portal, and the operator admin.

**Global preconditions:**

- All three sites are running.
- The brokerage has at least one property, and a client with at least one deal.
- Test accounts exist: superadmin, agent (default role, without access to Roles), client and operator.

## Part A — Guest

| ID | Feature | Title | Precondition | Steps | Expected Outcome |
| --- | --- | --- | --- | --- | --- |
| BDK-0-SMK01 | Public site | The public site opens | Not signed in | Open `/` on the public site | A main heading and a link to sign-up |
| BDK-0-SMK02 | Public site | Sign-up opens | Not signed in | Open `/signup` on the public site | The heading `Create your brokerage`; the **Brokerage name** and **Work email** fields |
| BDK-0-SMK03 | Access | A guest is sent from Properties to sign-in | Not signed in | Open `/properties` in the workspace | `/login`, which remembers Properties; the heading `Welcome back`, the email and password fields and **Sign in** |
| BDK-0-SMK04 | Access | A guest is sent from the client portal to sign-in | Not signed in | Open `/portal` in the workspace | `/login`, which remembers the portal; the heading `Welcome back` |
| BDK-0-SMK05 | Access | A guest is sent from Brokerages to operator sign-in | Not signed in | Open `/brokerages` in the operator admin | `/login`; the heading `Operator sign in`, the email and password fields and **Sign in** |

## Part B — Superadmin

| ID | Feature | Title | Precondition | Steps | Expected Outcome |
| --- | --- | --- | --- | --- | --- |
| BDK-0-SMK06 | Home | A superadmin opens Home | Superadmin signed in | Open `/` in the workspace | A greeting by name, the key numbers, and **Roles** in the menu |
| BDK-0-SMK07 | Properties | A superadmin opens Properties | Superadmin signed in | Open `/properties` | The heading `Properties` and at least one property |

## Part C — Agent

| ID | Feature | Title | Precondition | Steps | Expected Outcome |
| --- | --- | --- | --- | --- | --- |
| BDK-0-SMK08 | Contacts | An agent opens Contacts | Agent signed in | Open `/contacts` | The heading `Contacts` |
| BDK-0-SMK09 | Access | An agent is refused Roles | Agent signed in | Open `/settings/roles` | `You don't have access to this page`; **Contacts** but no **Roles** in the menu |

## Part D — Client

| ID | Feature | Title | Precondition | Steps | Expected Outcome |
| --- | --- | --- | --- | --- | --- |
| BDK-0-SMK10 | Portal | A client is sent from Home to the portal | Client signed in | Open `/` in the workspace | `/portal`; a welcome by name and at least one deal |

## Part E — Operator

| ID | Feature | Title | Precondition | Steps | Expected Outcome |
| --- | --- | --- | --- | --- | --- |
| BDK-0-SMK11 | Brokerages | An operator opens Brokerages | Operator signed in | Open `/brokerages` | The heading `Brokerages`, the test brokerage's address in the list, and **Error log** in the menu |
| BDK-0-SMK12 | Email log | An operator opens the Email log | Operator signed in | Open `/email-log` | The heading `Email log` |

## Bugs

| # | Bug | Steps to Reproduce | Cases | Issue |
| --- | --- | --- | --- | --- |
