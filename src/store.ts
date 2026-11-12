import { create } from "zustand";
import { persist } from "zustand/middleware";

export const money = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    value,
  );
export interface Cheque {
  id: string;
  amount: number;
  payee: string;
  date: string;
  status: string;
  address: string;
  service: string;
  rate: number;
  memo?: string;
}
export interface Invoice {
  id: string;
  request: string;
  amount: number;
  paid: boolean;
  date: string;
  receipt?: string;
  method?: string;
}
export interface Notice {
  id: string;
  title: string;
  detail: string;
  date: string;
  read: boolean;
  path: string;
}
export interface Transaction {
  id: string;
  description: string;
  merchant: string;
  date: string;
  category: string;
  amount: number;
  status: string;
  icon: string;
}
export interface ActivityPoint {
  month: string;
  balance: number;
}
export const account = {
  available: 30250,
  current: 30250,
  bank: "Chase",
  cardLast4: "2942",
  type: "Premium Checking",
  currency: "USD",
};
export const bankProviders = ["Chase", "Bank of America"] as const;
export const shippingProviders = ["FedEx", "DHL Express"] as const;
export const transactions: Transaction[] = [
  {
    id: "TX-EX-1112",
    description: "Incoming transfer",
    merchant: "Cash transfer",
    date: "2026-11-12",
    category: "Transfer",
    amount: 6100,
    status: "Completed",
    icon: "income",
  },
  {
    id: "TX-EX-1111",
    description: "Incoming transfer",
    merchant: "Cash transfer",
    date: "2026-11-11",
    category: "Transfer",
    amount: 10000,
    status: "Completed",
    icon: "income",
  },
  {
    id: "TX-EX-1110",
    description: "Incoming transfer",
    merchant: "Cash transfer",
    date: "2026-11-10",
    category: "Transfer",
    amount: 2050,
    status: "Completed",
    icon: "income",
  },
];
export const activity: ActivityPoint[] = [];
export const shipments: {
  id: string;
  request: string;
  recipient: string;
  address: string;
  service: string;
  stage: number;
  date: string;
}[] = [];
const exampleCheques: Cheque[] = [
  {
    id: "REQ-EX-1109",
    amount: 18000,
    payee: "Samuel Daren",
    date: "2026-11-09",
    status: "Pending payment",
    address: "20 Main Street, Boston, MA 02108",
    service: "FedEx 2Day",
    rate: 0,
  },
];
const exampleInvoices: Invoice[] = [
  {
    id: "INV-CHEQUE-1109",
    request: "REQ-EX-1109",
    amount: 18000,
    paid: false,
    date: "2026-11-09",
  },
];
interface State {
  session: boolean;
  name: string;
  email: string;
  hideBalance: boolean;
  cheques: Cheque[];
  invoices: Invoice[];
  notices: Notice[];
  preferences: Record<string, boolean>;
  compact: boolean;
  login: (name?: string, email?: string, remember?: boolean) => void;
  logout: () => void;
  toggleBalance: () => void;
  addCheque: (c: Omit<Cheque, "id" | "date" | "status">) => string;
  read: (id?: string) => void;
  profile: (name: string, email: string) => void;
  preference: (key: string, value: boolean) => void;
  setCompact: (value: boolean) => void;
}
export const useStore = create<State>()(
  persist(
    (set) => ({
      session: sessionStorage.getItem("banklink-session") === "true",
      name: "Samuel Daren",
      email: "",
      hideBalance: false,
      cheques: exampleCheques,
      invoices: [],
      notices: [],
      preferences: { email: true, push: true, security: false },
      compact: false,
      login: (
        name = "Samuel Daren",
        email = "",
        remember = true,
      ) => {
        sessionStorage.setItem("banklink-session", "true");
        localStorage.setItem("banklink-remember", String(remember));
        set({ session: true, name, email });
      },
      logout: () => {
        sessionStorage.removeItem("banklink-session");
        set({ session: false });
      },
      toggleBalance: () => set((s) => ({ hideBalance: !s.hideBalance })),
      addCheque: (c) => {
        const id = "REQ-" + crypto.randomUUID().slice(0, 8).toUpperCase();
        const date = new Date().toISOString().slice(0, 10);
        set((s) => ({
          cheques: [
            { ...c, id, date, status: "Draft saved" },
            ...s.cheques,
          ],
          notices: [
            {
              id: crypto.randomUUID(),
              title: "Cheque request saved",
              detail: `${id} · ${money(c.amount)} for ${c.payee}. Not sent to a bank.`,
              date: new Date().toISOString(),
              read: false,
              path: "/dashboard/cheques",
            },
            ...s.notices,
          ],
        }));
        return id;
      },
      read: (id) =>
        set((s) => ({
          notices: s.notices.map((n) =>
            !id || n.id === id ? { ...n, read: true } : n,
          ),
        })),
      profile: (name, email) => set({ name, email }),
      preference: (key, value) =>
        set((s) => ({ preferences: { ...s.preferences, [key]: value } })),
      setCompact: (compact) => set({ compact }),
    }),
    {
      name: "banklink-v2",
      merge: (persistedState, currentState) => {
        const persisted = (persistedState ?? {}) as Partial<State>;
        return {
          ...currentState,
          ...persisted,
          cheques: [
            ...(persisted.cheques ?? []).filter(
              (saved) => !saved.id.startsWith("REQ-EX-"),
            ),
            ...exampleCheques,
          ],
          invoices: [
            ...(persisted.invoices ?? []).filter(
              (invoice) => !exampleInvoices.some((example) => example.id === invoice.id),
            ),
            ...exampleInvoices,
          ],
          notices: persisted.notices ?? [],
        };
      },
      partialize: (s) => ({
        name: s.name,
        email: s.email,
        hideBalance: s.hideBalance,
        cheques: s.cheques,
        invoices: s.invoices,
        notices: s.notices,
        preferences: s.preferences,
        compact: s.compact,
        ...(localStorage.getItem("banklink-remember") === "true"
          ? { session: s.session }
          : {}),
      }),
    },
  ),
);
