# Implementation Plan — Navigation Shell

Scope: the main-menu navigation requirements (FR-1, FR-2, FR-3) from
[FRONTEND-REQUIREMENTS.md](./FRONTEND-REQUIREMENTS.md). The Init Database, Transaction, and
Report views are created as reachable placeholders only; their business logic (FR-4..FR-12)
is out of scope for these phases.

The React app lives in a `web/` subdirectory so the COBOL sources at the repository root
remain untouched.

## Phase 0 — React app foundation

- Scaffold Vite + React + TypeScript in `web/`, with pinned dependency versions.
- Scripts: `npm run dev`, `build`, `lint`, `typecheck`.
- ESLint + Prettier, `tsconfig` in strict mode.
- CI workflow running lint, typecheck, and build, so later phases have a gate.
- Decide the styling approach once, here (plain CSS modules or a single UI library), so
  Phase 2 does not churn.

Exit criteria: `npm run dev` serves a blank app shell; CI is green.

## Phase 1 — Routing skeleton

- Add `react-router` with routes `/` (menu), `/init`, `/transaction`, `/report`, plus a `*`
  not-found route linking back to `/`.
  - This is FR-2: invalid destinations are structurally impossible because navigation is
    link/button driven, and an unknown URL lands on a recoverable page rather than an
    error.
- Each feature route is a stub view: heading plus a "Back to menu" link. No data, no forms.

Exit criteria: every route is reachable both by URL and by in-app link; back-to-menu works
from all three feature views.

## Phase 2 — Menu screen and layout

- Home view renders the four actions from `BANK-MAIN.CBL` as buttons: Init Database,
  Transaction, Report, Exit (FR-1).
- Shared layout: app header ("Core Banking System"), consistent page container, active-route
  styling.
- Exit view for option 4 (the `Bye.` equivalent): a terminal/farewell screen with no
  navigation back except an explicit restart, since a browser tab cannot `STOP RUN`.

Exit criteria: the full menu → view → menu loop is navigable without touching the URL bar
(FR-3).

## Phase 3 — Navigation hardening and tests

- Keyboard accessibility and focus management on route change; per-route page titles.
- React Testing Library tests: each menu button navigates to its route, back-to-menu returns
  home, an unknown URL renders the not-found view.

Exit criteria: tests run in CI; the acceptance criteria for FR-1, FR-2, and FR-3 are all
demonstrably met.
