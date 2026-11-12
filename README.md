# BankLink Finance

A React 19 + TypeScript financial workspace UI. The interface is prepared for
Chase and Bank of America bank connections and FedEx and DHL Express shipping.
Provider, authentication, payment, and backend integrations are not configured;
account balances and payment or tracking activity are unavailable.

## Run locally

```sh
npm install
npm run dev
```

Open the printed Vite URL and use the sign-in form to enter the workspace demo.
The sign-in is simulated: it does not verify or store passwords, and it must
not be used to protect real data. The profile name is Samuel Daren.

```sh
npm run typecheck
npm run build
npm run preview
```

## Current UI

- Bank connection choices for Chase and Bank of America, marked unavailable
  until secure provider integration is configured.
- FedEx and DHL Express carrier selection in cheque requests and shipping.
  Carrier rates and tracking require a live carrier connection.
- Cheque request form saves local drafts only. It does not issue cheques,
  reserve funds, book shipments, or create invoices.
- Bitcoin is the only selectable payment method. Checkout remains unavailable
  until a wallet/payment provider is integrated; bank card and bank transfer
  are disabled.
- Overview and transaction history include seven generated example transactions.
  The cheque list includes six generated example requests. A visible notice
  identifies these as examples, not records from a connected account.
- Balance-history, invoice, and shipment views remain empty until connected
  services provide verified records.

## Architecture

`src/store.ts` contains UI state and local draft handling. `src/main.tsx`
contains the router, dashboard shell, and account, transaction, cheque,
shipping, payment, and settings screens. Authentication and cheque-request
forms are in `src/pages/`; shared UI components and the bank-activity empty
state are in `src/components/`.

Do not use the sample balances or local profile as financial or identity
verification. Before launch, configure secure server-side authentication,
bank data access, payment processing, and carrier rating/tracking. Keep API
credentials and financial operations on the server; do not collect bank
credentials directly in this frontend.
