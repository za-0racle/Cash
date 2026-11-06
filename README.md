# BankLink Finance

A React 19 + TypeScript frontend prototype with fictional banking data. It never connects to a bank, courier, wallet, or payment processor.

## Run locally

```sh
npm install
npm run dev
```

Open the printed Vite URL, then select **Explore Demo Dashboard**. The demo profile is Alexander Morgan. Registration also creates a simulated session; it does not register a real account.

```sh
npm run typecheck
npm run build
npm run preview
```

## Included workflows

- Protected dashboard, balances, monthly/weekly chart, privacy toggle, and simulated refresh.
- Signup, signin, and password reset interfaces, with Zod / React Hook Form validation. Passwords are never persisted.
- Six-step cheque request with amount and delivery validation; creates a unique submitted request and illustrative shipping invoice.
- Cheque list and detail timeline; seeded shipment selection and six-stage courier timelines.
- Card, ACH, and BTC demonstration checkouts with simulated receipts. Payment state never advances cheque issuance.
- Transaction search, date/category/status filters, pagination, details, and filtered CSV export.
- Notification read states, editable demo profile, local preferences, compact layout, and mobile navigation.

## Data and architecture

`src/store.ts` defines typed records, centralized fictional data, and Zustand actions. Persisted data contains only demo records, profile information, and preferences. A remembered demo session uses localStorage; an unremembered session uses sessionStorage. Do not enter real personal or financial information.

`src/main.tsx` contains the router, protected shell, and dashboard screens. `src/pages/` contains lazy-loaded authentication and cheque request flows; `src/components/` contains shared interface elements and the separately loaded financial chart. `src/style.css` defines the dark visual system and responsive layouts. The chart uses illustrative historical snapshots ending at the same $48,750 available balance displayed in the account. The pending $1,500 transfer explains the difference between current and available balances. Cheque and invoice summary figures derive from the same stored records shown in their lists.

For a later NestJS/Supabase phase, replace the simulated session and store actions with typed API adapters and server-validated authentication and financial operations. Route-level protection in this prototype provides navigation behavior only. Real authorization, audit records, rate calculations, payment confirmation, and cheque status transitions must be implemented on the server.

All FedEx rates are illustrative estimates, with no availability or delivery promise. Tracking references deliberately begin with `DEMO-SHIP`. The fixed BTC conversion is illustrative, not a market quote. No real payment information is collected.

To reset the prototype, remove `banklink-demo-v1` and `banklink-remember` from localStorage and `banklink-session` from sessionStorage, then reload. Static hosting must rewrite application routes to `index.html` for React Router.
