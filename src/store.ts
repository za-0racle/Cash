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
export const account = {
  available: 48750,
  current: 50250,
  bank: "Example Partner Bank",
  number: "4821",
  type: "Premium Checking",
  currency: "USD",
};
export const transactions = [
  {
    id: "TX-1001",
    description: "Monthly payroll",
    merchant: "Acme Technologies",
    date: "2026-11-06",
    category: "Income",
    amount: 8250,
    status: "Completed",
    icon: "income",
  },
  {
    id: "TX-1002",
    description: "Apple Store",
    merchant: "Card purchase · •• 4821",
    date: "2026-11-05",
    category: "Shopping",
    amount: -249,
    status: "Completed",
    icon: "shopping",
  },
  {
    id: "TX-1003",
    description: "Electricity bill",
    merchant: "Pacific Gas & Electric",
    date: "2026-11-04",
    category: "Utilities",
    amount: -128.5,
    status: "Completed",
    icon: "utilities",
  },
  {
    id: "TX-1004",
    description: "Savings transfer",
    merchant: "To your savings account",
    date: "2026-11-03",
    category: "Transfer",
    amount: -1500,
    status: "Pending",
    icon: "transfer",
  },
  {
    id: "TX-1005",
    description: "Cheque disbursement",
    merchant: "To James Wilson · Demo",
    date: "2026-11-02",
    category: "Cheques",
    amount: -2500,
    status: "Completed",
    icon: "cheque",
  },
  {
    id: "TX-1006",
    description: "Shipping payment",
    merchant: "Illustrative delivery charge",
    date: "2026-10-30",
    category: "Shipping",
    amount: -24.5,
    status: "Completed",
    icon: "shipping",
  },
  {
    id: "TX-1007",
    description: "Consulting income",
    merchant: "Northstar Studio",
    date: "2026-10-28",
    category: "Income",
    amount: 3200,
    status: "Completed",
    icon: "income",
  },
  {
    id: "TX-1008",
    description: "Office supplies",
    merchant: "Staples",
    date: "2026-10-25",
    category: "Shopping",
    amount: -86.75,
    status: "Completed",
    icon: "shopping",
  },
  {
    id: "TX-1009",
    description: "Internet service",
    merchant: "Home internet",
    date: "2026-10-20",
    category: "Utilities",
    amount: -79,
    status: "Completed",
    icon: "utilities",
  },
  {
    id: "TX-1010",
    description: "Bank transfer",
    merchant: "From Morgan Consulting",
    date: "2026-10-17",
    category: "Transfer",
    amount: 1200,
    status: "Completed",
    icon: "transfer",
  },
];
export const activity = [
  { month: "Jun", balance: 32300 },
  { month: "Jul", balance: 38500 },
  { month: "Aug", balance: 35200 },
  { month: "Sep", balance: 42100 },
  { month: "Oct", balance: 39800 },
  { month: "Nov", balance: 48750 },
];
export const shipments = [
  {
    id: "DEMO-SHIP-001",
    request: "BL-2026-008",
    recipient: "James Wilson",
    address: "123 Market Street, San Francisco, CA 94103",
    service: "FedEx 2Day",
    stage: 5,
    date: "Nov 2, 2026",
  },
  {
    id: "DEMO-SHIP-002",
    request: "BL-2026-010",
    recipient: "Olivia Davis",
    address: "450 Park Avenue, New York, NY 10022",
    service: "FedEx Priority Overnight",
    stage: 3,
    date: "Nov 5, 2026",
  },
  {
    id: "DEMO-SHIP-003",
    request: "BL-2026-011",
    recipient: "Michael Chen",
    address: "810 Congress Avenue, Austin, TX 78701",
    service: "FedEx Standard Overnight",
    stage: 0,
    date: "Nov 6, 2026",
  },
];
const seeds: Cheque[] = [
  {
    id: "BL-2026-012",
    amount: 1250,
    payee: "Sarah Johnson",
    date: "2026-11-06",
    status: "Under Review",
    address: "20 Main Street, Boston, MA 02108",
    service: "FedEx 2Day",
    rate: 24.5,
  },
  {
    id: "BL-2026-011",
    amount: 3200,
    payee: "Michael Chen",
    date: "2026-11-05",
    status: "Ready for Shipping",
    address: shipments[2].address,
    service: "FedEx Standard Overnight",
    rate: 32,
  },
  {
    id: "BL-2026-010",
    amount: 1800,
    payee: "Olivia Davis",
    date: "2026-11-04",
    status: "Shipped",
    address: shipments[1].address,
    service: "FedEx Priority Overnight",
    rate: 45,
  },
  {
    id: "BL-2026-009",
    amount: 750,
    payee: "Noah Williams",
    date: "2026-11-03",
    status: "Bank Processing",
    address: "100 Ocean Drive, Miami, FL 33139",
    service: "FedEx 2Day",
    rate: 24.5,
  },
  {
    id: "BL-2026-008",
    amount: 2500,
    payee: "James Wilson",
    date: "2026-11-01",
    status: "Delivered",
    address: shipments[0].address,
    service: "FedEx 2Day",
    rate: 24.5,
  },
  {
    id: "BL-2026-007",
    amount: 950,
    payee: "Emma Brown",
    date: "2026-10-29",
    status: "Delivered",
    address: "42 Pine Street, Seattle, WA 98101",
    service: "FedEx 2Day",
    rate: 24.5,
  },
];
interface State {
  session: boolean;
  name: string;
  email: string;
  hideBalance: boolean;
  refreshed: string;
  cheques: Cheque[];
  invoices: Invoice[];
  notices: Notice[];
  preferences: Record<string, boolean>;
  compact: boolean;
  login: (name?: string, email?: string, remember?: boolean) => void;
  logout: () => void;
  toggleBalance: () => void;
  refresh: () => void;
  addCheque: (c: Omit<Cheque, "id" | "date" | "status">) => string;
  pay: (id: string, method: string) => void;
  read: (id?: string) => void;
  profile: (name: string, email: string) => void;
  preference: (key: string, value: boolean) => void;
  setCompact: (value: boolean) => void;
}
export const useStore = create<State>()(
  persist(
    (set) => ({
      session: sessionStorage.getItem("banklink-session") === "true",
      name: "Alexander Morgan",
      email: "alexander@example.com",
      hideBalance: false,
      refreshed: new Date().toISOString(),
      cheques: seeds,
      invoices: seeds.map((c, i) => ({
        id: `INV-DEMO-${String(12 - i).padStart(3, "0")}`,
        request: c.id,
        amount: c.rate,
        paid: i > 1,
        date: c.date,
        ...(i > 1
          ? { receipt: `RECEIPT-DEMO-${12 - i}`, method: "Credit/Debit Card" }
          : {}),
      })),
      notices: [
        {
          id: "n1",
          title: "Your cheque request is under review",
          detail: "The simulated review for Sarah Johnson is in progress.",
          date: "2026-11-06T08:30:00",
          read: false,
          path: "/dashboard/cheques",
        },
        {
          id: "n2",
          title: "Your shipment is on its way",
          detail: "View the demo delivery timeline for Olivia Davis.",
          date: "2026-11-05T14:00:00",
          read: false,
          path: "/dashboard/shipping",
        },
        {
          id: "n3",
          title: "Shipping payment confirmed",
          detail: "Your illustrative $24.50 payment was successful.",
          date: "2026-11-04T10:00:00",
          read: true,
          path: "/dashboard/payments",
        },
        {
          id: "n4",
          title: "Welcome to your demo workspace",
          detail: "Explore connected banking with fictional data.",
          date: "2026-11-01T09:00:00",
          read: true,
          path: "/dashboard/accounts",
        },
      ],
      preferences: { email: true, push: true, security: false },
      compact: false,
      login: (
        name = "Alexander Morgan",
        email = "alexander@example.com",
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
      refresh: () => set({ refreshed: new Date().toISOString() }),
      addCheque: (c) => {
        const id = "DEMO-" + crypto.randomUUID().slice(0, 8).toUpperCase();
        const date = new Date().toISOString().slice(0, 10);
        set((s) => ({
          cheques: [
            { ...c, id, date, status: "Demo Request Submitted" },
            ...s.cheques,
          ],
          invoices: [
            { id: "INV-" + id, request: id, amount: c.rate, paid: false, date },
            ...s.invoices,
          ],
          notices: [
            {
              id: crypto.randomUUID(),
              title: "Cheque request submitted",
              detail: `${id} · ${money(c.amount)} for ${c.payee}. No funds have been reserved.`,
              date: new Date().toISOString(),
              read: false,
              path: "/dashboard/cheques",
            },
            ...s.notices,
          ],
        }));
        return id;
      },
      pay: (id, method) =>
        set((s) => ({
          invoices: s.invoices.map((i) =>
            i.id === id
              ? {
                  ...i,
                  paid: true,
                  method,
                  receipt: "RECEIPT-DEMO-" + crypto.randomUUID().slice(0, 8),
                }
              : i,
          ),
          notices: [
            {
              id: crypto.randomUUID(),
              title: "Demo payment confirmed",
              detail: `Simulated shipping payment for ${id}.`,
              date: new Date().toISOString(),
              read: false,
              path: "/dashboard/payments",
            },
            ...s.notices,
          ],
        })),
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
      name: "banklink-demo-v1",
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
