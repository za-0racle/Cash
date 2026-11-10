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
    id: "TX-EX-1109",
    description: "Monthly payroll",
    merchant: "Northstar Technologies",
    date: "2026-11-09",
    category: "Income",
    amount: 8250,
    status: "Completed",
    icon: "income",
  },
  {
    id: "TX-EX-1108",
    description: "Grocery purchase",
    merchant: "Whole Foods Market",
    date: "2026-11-08",
    category: "Shopping",
    amount: -186.42,
    status: "Completed",
    icon: "shopping",
  },
  {
    id: "TX-EX-1107",
    description: "Electricity bill",
    merchant: "Pacific Gas & Electric",
    date: "2026-11-07",
    category: "Utilities",
    amount: -128.5,
    status: "Completed",
    icon: "utilities",
  },
  {
    id: "TX-EX-1106",
    description: "Savings transfer",
    merchant: "Transfer to savings",
    date: "2026-11-06",
    category: "Transfer",
    amount: -1500,
    status: "Pending",
    icon: "transfer",
  },
  {
    id: "TX-EX-1105",
    description: "Cheque disbursement",
    merchant: "Payee: James Wilson",
    date: "2026-11-05",
    category: "Cheques",
    amount: -2500,
    status: "Completed",
    icon: "cheque",
  },
  {
    id: "TX-EX-1104",
    description: "Courier service",
    merchant: "FedEx",
    date: "2026-11-04",
    category: "Shipping",
    amount: -24.5,
    status: "Completed",
    icon: "shipping",
  },
  {
    id: "TX-EX-1103",
    description: "Consulting payment",
    merchant: "Morgan Design Studio",
    date: "2026-11-03",
    category: "Income",
    amount: 3200,
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
    amount: 1250,
    payee: "Sarah Johnson",
    date: "2026-11-09",
    status: "Under Review",
    address: "20 Main Street, Boston, MA 02108",
    service: "FedEx 2Day",
    rate: 0,
  },
  {
    id: "REQ-EX-1108",
    amount: 3200,
    payee: "Michael Chen",
    date: "2026-11-08",
    status: "In Transit",
    address: "810 Congress Avenue, Austin, TX 78701",
    service: "FedEx Standard Overnight",
    rate: 0,
  },
  {
    id: "REQ-EX-1107",
    amount: 1800,
    payee: "Olivia Davis",
    date: "2026-11-07",
    status: "Shipped",
    address: "450 Park Avenue, New York, NY 10022",
    service: "DHL Express Worldwide",
    rate: 0,
  },
  {
    id: "REQ-EX-1106",
    amount: 750,
    payee: "Noah Williams",
    date: "2026-11-06",
    status: "Processing",
    address: "100 Ocean Drive, Miami, FL 33139",
    service: "FedEx 2Day",
    rate: 0,
  },
  {
    id: "REQ-EX-1105",
    amount: 2500,
    payee: "James Wilson",
    date: "2026-11-05",
    status: "Delivered",
    address: "123 Market Street, San Francisco, CA 94103",
    service: "DHL Express Worldwide",
    rate: 0,
  },
  {
    id: "REQ-EX-1104",
    amount: 950,
    payee: "Emma Brown",
    date: "2026-11-04",
    status: "Delivered",
    address: "42 Pine Street, Seattle, WA 98101",
    service: "FedEx 2Day",
    rate: 0,
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
            ...(persisted.cheques ?? []),
            ...exampleCheques.filter(
              (example) =>
                !persisted.cheques?.some((saved) => saved.id === example.id),
            ),
          ],
          invoices: persisted.invoices ?? [],
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
