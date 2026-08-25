# Frontend Requirements — Core Banking System Web UI Modernization

Status: specification only (no implementation in this document's scope)

## Purpose and scope

This document captures the user-facing navigation and interaction requirements for a
frontend-only modernization of the existing COBOL core banking system. It is derived from
the current terminal application:

| COBOL artifact | Role |
| --- | --- |
| `BANK-MAIN.CBL` | Loop-driven text menu, routes to the three subprograms |
| `INIT-DB.CBL` | Seeds `ACCOUNTS.DAT` with three fixed accounts |
| `TRANS-PROC.CBL` | Processes a single deposit or withdrawal |
| `REPORT-GEN.CBL` | Prints an account balance summary report |
| `ACCOUNTS.CPY` | Shared account record layout |

There is no backend yet. Every requirement below is to be satisfied with client-side
state and/or mock services. No API contract, authentication, or persistence layer is in
scope.

## Core navigation (derived from `BANK-MAIN.CBL`)

The current program runs `PERFORM UNTIL WS-CHOICE = '4'`, redisplaying a four-option menu
after every action and dispatching with `EVALUATE` to `INIT-DB`, `TRANS-PROC`, or
`REPORT-GEN`.

- **FR-1 — Main navigation.** The app presents a persistent menu/home screen exposing four
  actions: *Init Database*, *Transaction*, *Report*, *Exit*. Selecting an action navigates
  to its corresponding view.
- **FR-2 — Invalid selection handling.** Only valid navigation targets are reachable. The
  original displays `Invalid.` for unrecognized keyboard input; in the web UI this is
  enforced structurally — navigation happens through buttons/links to defined routes, so
  an invalid destination cannot be entered. Unknown routes resolve to a not-found view
  that returns the user to the menu.
- **FR-3 — Return-to-menu flow.** After completing (or cancelling) any action, the user is
  returned to the main menu, mirroring the COBOL loop. *Exit* leaves the app (e.g. a
  farewell/exit screen equivalent to the original `Bye.`).

## Data model (from `ACCOUNTS.CPY`)

Forms, tables, and mock state must reflect the four fields of `ACCOUNT-RECORD`:

| Field | COBOL picture | Frontend representation |
| --- | --- | --- |
| Account Number | `PIC 9(10)` | Exactly 10 numeric digits, no separators |
| Customer Name | `PIC X(30)` | Text, maximum 30 characters |
| Balance | `PIC S9(13)V99 COMP-3` | Signed decimal, exactly 2 decimal places |
| Status | `PIC X(1)` | One of `A` (Active), `C` (Closed), `S` (Suspended) |

Status values come from the level-88 condition names `ACC-ACTIVE`, `ACC-CLOSED`, and
`ACC-SUSPENDED`. The UI should display human-readable labels (Active / Closed /
Suspended) while keeping the single-character code as the underlying value.

## Init Database (from `INIT-DB.CBL`)

- **FR-4 — Seed/reset data.** An *Initialize* action loads a fixed set of mock accounts
  into local state, replacing any existing state (the COBOL program does `OPEN OUTPUT`,
  which truncates the file). On success the UI shows a confirmation equivalent to
  `Database initialized.`

  | Account Number | Customer Name | Balance | Status |
  | --- | --- | --- | --- |
  | 1000000001 | JOHN DOE | 5000.00 | A |
  | 1000000002 | JANE SMITH | 12500.50 | A |
  | 1000000003 | BOB JOHNSON | 100.00 | A |

## Transactions (from `TRANS-PROC.CBL`)

- **FR-5 — Transaction form.** The transaction view collects three inputs, matching the
  three `ACCEPT` prompts of the original: Account Number, Type (Deposit / Withdraw), and
  Amount.
- **FR-6 — Deposit.** A deposit adds the amount to the selected account's balance and
  confirms with a message equivalent to `Deposit Ok.` The updated balance is immediately
  reflected in client-side state (and thus in the report view).
- **FR-7 — Withdrawal with funds check.** A withdrawal subtracts the amount only when the
  account balance is greater than or equal to the amount (`IF REC-ACC-BALANCE >=
  WS-TRANS-AMOUNT`). On success it confirms with `Withdrawal Ok.`; when funds are
  insufficient the balance is left unchanged and the UI shows `No Funds.`
- **FR-8 — Account-not-found handling.** If no account matches the entered account number,
  no state changes and the UI shows a message equivalent to `Not Found.`
- **FR-9 — Invalid type handling.** Only Deposit and Withdraw are accepted (the original
  displays `Invalid Type.` for any other character). In the web UI the transaction type is
  a selector control (radio group or dropdown) restricted to those two values, so an
  invalid type cannot be submitted.

Amount input follows the data model: numeric, at most two decimal places, positive.

## Report (from `REPORT-GEN.CBL`)

- **FR-10 — Account listing.** The report view lists all accounts in a table with columns
  Account Number, Customer Name, and Balance (the original displays each record's number,
  name, and formatted balance sequentially).
- **FR-11 — Summary totals.** Below the table the report shows *Total Accounts* (record
  count, `WS-COUNT`) and *Bank Balance* (sum of all balances, `WS-TOTAL-BAL`).
- **FR-12 — Currency formatting.** Balances and the aggregate total are rendered as
  formatted currency with a thousands separator and two decimals, matching the COBOL edit
  mask `$ZZ,ZZZ,ZZZ,ZZ9.99` (e.g. `$12,500.50`).

The report is read-only; it reflects the current client-side state, including the effects
of any transactions performed in the session.

## Notes for the frontend-only phase

- All state — seed data and balances after transactions — lives in client-side state or a
  mock service layer. COBOL persistence via `ACCOUNTS.DAT` is out of scope; state resets
  on reload unless the implementation chooses browser storage.
- The `CALL 'SYSTEM'` file delete/rename logic in `TRANS-PROC.CBL` (`ACCOUNTS.TMP` staged
  over `ACCOUNTS.DAT`) is a persistence implementation detail. It has no user-facing
  requirement and must not be replicated — shelling out to the OS would also be a security
  concern.
- The intermediate `Saving...` message from the same routine is likewise an artifact of
  file persistence; a modern UI may show a transient state indicator but is not required
  to.
- Account status is carried in the data model and displayed, but the current COBOL logic
  does not gate transactions on status. Behavior for Closed/Suspended accounts is
  deliberately left out of scope for this phase.
