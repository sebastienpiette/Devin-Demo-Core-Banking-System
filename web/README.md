# Core Banking System — Web UI

Frontend-only React application for the COBOL core banking system modernization. See
[../docs/FRONTEND-REQUIREMENTS.md](../docs/FRONTEND-REQUIREMENTS.md) for the requirements
and [../docs/FRONTEND-NAVIGATION-PLAN.md](../docs/FRONTEND-NAVIGATION-PLAN.md) for the
phased plan.

This is the navigation shell (FR-1 to FR-3): the menu, routing, and layout. The Init
Database, Transaction, and Report views are reachable placeholders; their behavior
(FR-4 to FR-12) is not implemented yet.

## Commands

```
npm install
npm run dev        # start the dev server
npm run build      # typecheck and production build
npm run lint       # oxlint
npm run typecheck  # tsc --noEmit
npm run format     # prettier
```
