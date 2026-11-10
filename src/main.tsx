import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  NavLink,
  Link,
  useNavigate,
  useLocation,
  Outlet,
} from "react-router-dom";
import {
  LayoutDashboard,
  Landmark,
  ArrowLeftRight,
  FilePlus2,
  Files,
  Truck,
  CreditCard,
  Bell,
  Settings,
  LogOut,
  Search,
  ChevronDown,
  ChevronRight,
  ArrowUpRight,
  ArrowDownLeft,
  ArrowRight,
  Plus,
  Eye,
  EyeOff,
  RefreshCw,
  Check,
  X,
  ShieldCheck,
  CircleHelp,
  MoreHorizontal,
  Download,
  SlidersHorizontal,
  Menu,
  Zap,
  Wallet,
  PackageCheck,
  Clock3,
  Receipt,
  ShoppingBag,
  Lightbulb,
  Building2,
  CheckCheck,
  LockKeyhole,
  Mail,
  CalendarDays,
  Copy,
  ExternalLink,
  CheckCircle2,
  Send,
} from "lucide-react";
import { motion, MotionConfig } from "motion/react";

import {
  useStore,
  money,
  account,
  bankProviders,
  shippingProviders,
  transactions,
  shipments,
  type Cheque,
  type Invoice,
} from "./store";
import {
  Logo,
  Button,
  Badge,
  Modal,
  PageHeading,
  Details,
} from "./components/ui";
import "./style.css";
const Auth = React.lazy(() => import("./pages/Auth"));
const RequestCheque = React.lazy(() => import("./pages/RequestCheque"));

const nav = [
  { path: "", label: "Overview", icon: LayoutDashboard },
  { path: "accounts", label: "My Accounts", icon: Landmark },
  { path: "transactions", label: "Transactions", icon: ArrowLeftRight },
  { path: "request-cheque", label: "Request Cheque", icon: FilePlus2 },
  { path: "cheques", label: "My Cheques", icon: Files },
  { path: "shipping", label: "Shipping & Tracking", icon: Truck },
  { path: "payments", label: "Payments", icon: CreditCard },
  { path: "notifications", label: "Notifications", icon: Bell },
];
function AppLayout() {
  const s = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobile, setMobile] = useState(false);
  const [profile, setProfile] = useState(false);
  const [search, setSearch] = useState("");
  const [help, setHelp] = useState(false);
  const unread = s.notices.filter((n) => !n.read).length;
  const current =
    nav.find(
      (n) => location.pathname === "/dashboard" + (n.path ? "/" + n.path : ""),
    )?.label || "Settings";
  return (
    <div className={s.compact ? "app compact" : "app"}>
      <aside className={"sidebar " + (mobile ? "mobile-open" : "")}>
        <Logo />
        <button
          className="mobile-close icon-button"
          aria-label="Close navigation"
          onClick={() => setMobile(false)}
        >
          <X />
        </button>
        <div className="workspace">
          <div className="workspace-icon">
            <Building2 size={18} />
          </div>
          <div>
            Account dashboard
            <small>
              Financial services
            </small>
          </div>
          <ChevronDown size={14} />
        </div>
        <span className="nav-label">FINANCIAL TOOLS</span>
        <nav>
          {nav.map(({ path, label, icon: Icon }) => (
            <NavLink
              end
              to={"/dashboard" + (path ? "/" + path : "")}
              key={path}
              onClick={() => setMobile(false)}
            >
              <Icon size={19} />
              <span>{label}</span>
              {path === "notifications" && unread > 0 && (
                <b className="nav-count">{unread}</b>
              )}
              {path === "" && <span className="active-dot" />}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="help-card">
            <span className="help-symbol">
              <ShieldCheck size={20} />
            </span>
            <strong>A little help, a long way.</strong>
            <p>We’re here for your next step.</p>
            <button onClick={() => setHelp(true)}>
              Visit support center <ArrowUpRight size={14} />
            </button>
          </div>
          <NavLink
            className="bottom-link"
            to="/dashboard/settings"
            onClick={() => setMobile(false)}
          >
            <Settings size={18} />
            Settings
          </NavLink>
          <button
            className="bottom-link signout"
            onClick={() => {
              s.logout();
              navigate("/signin");
            }}
          >
            <LogOut size={18} />
            Sign Out
          </button>
          <div className="sidebar-footer">
            <span className="online-dot" /> Dashboard <span>v1.0</span>
          </div>
        </div>
      </aside>
      {mobile && (
        <div className="nav-overlay" onClick={() => setMobile(false)} />
      )}
      <div className="app-main">
        <header className="topbar">
          <div className="breadcrumb">
            <button
              className="icon-button mobile-menu"
              aria-label="Open navigation"
              onClick={() => setMobile(true)}
            >
              <Menu />
            </button>
            <span>Dashboard</span>
            <ChevronRight size={13} />
            <strong>{current}</strong>
          </div>
          <div className="topbar-actions">
            <form
              className="global-search"
              onSubmit={(e) => {
                e.preventDefault();
                navigate(
                  "/dashboard/transactions?q=" + encodeURIComponent(search),
                );
              }}
            >
              <Search size={16} />
              <input
                aria-label="Search transactions"
                placeholder="Search anything..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <kbd>↵</kbd>
            </form>
            <Link
              className="notification-button"
              aria-label={`${unread} unread notifications`}
              to="/dashboard/notifications"
            >
              <Bell size={20} />
              {unread > 0 && <i />}
            </Link>
            <div className="profile-wrap">
              <button
                className="profile-button"
                onClick={() => setProfile(!profile)}
                aria-expanded={profile}
              >
                <span className="avatar">
                  {s.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </span>
                <ChevronDown size={14} />
              </button>
              {profile && (
                <div className="profile-menu">
                  <strong>{s.name}</strong>
                  <small>{s.email}</small>
                  <Link
                    onClick={() => setProfile(false)}
                    to="/dashboard/settings"
                  >
                    Profile & settings
                  </Link>
                  <button
                    onClick={() => {
                      s.logout();
                      navigate("/signin");
                    }}
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
        <main>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Outlet />
          </motion.div>
          <footer className="main-footer">
            <span>
              <ShieldCheck size={13} /> Designed for clarity. Built for secure connections.
            </span>
            <span>
              Demo
              <span className="footer-brand">BankLink Finance © 2026</span>
            </span>
          </footer>
        </main>
      </div>
      {help && (
        <Modal title="How can we help?" onClose={() => setHelp(false)}>
          <p>
            Review account information, manage cheque requests, and check
            delivery options.
          </p>
          <div className="notice">
            <CircleHelp size={20} />
            <span>
              Your changes are saved in this browser. No bank or courier is
              connected.
            </span>
          </div>
          <Button
            kind="primary"
            onClick={() => {
              setHelp(false);
              navigate("/dashboard/settings");
            }}
          >
            Explore settings <ArrowRight size={16} />
          </Button>
        </Modal>
      )}
    </div>
  );
}
function BalanceCard({ large = false }: { large?: boolean }) {
  const s = useStore();
  return (
    <section className={"balance-card " + (large ? "large" : "")}>
      <div className="balance-orbit orbit-one" />
      <div className="balance-orbit orbit-two" />
      <div className="balance-top">
        <span>
          <span className="bank-mini">
            <CreditCard size={16} />
          </span>{" "}
          Premium Checking
        </span>
        <Badge>Connected</Badge>
      </div>
      <div className="balance-label">
        Available balance · preview{" "}
        <button
          aria-label={s.hideBalance ? "Show balance" : "Hide balance"}
          onClick={s.toggleBalance}
        >
          <Eye size={15} />
        </button>
      </div>
      <div className="balance-amount">
        {s.hideBalance ? (
          "••,•••.••"
        ) : (
          <>
            $30,250<span>.00</span>
          </>
        )}
        <span className="currency">USD</span>
      </div>
      <div className="current-balance">
        Debit card <strong>•••• {account.cardLast4}</strong>
      </div>
      <div className="balance-bottom">
        <div className="card-network-logos" aria-label="Mastercard and Verve">
          <span className="mastercard-logo" aria-label="Mastercard">
            <i />
            <i />
          </span>
          <span className="verve-logo" aria-label="Verve">
            verve
          </span>
        </div>
        <span className="balance-caption">Preview card · not issued</span>
      </div>
    </section>
  );
}
function Overview() {
  const s = useStore();
  return (
    <>
      <PageHeading
        title={`Welcome back, ${s.name.split(" ")[0]}`}
        description="Here’s an overview of your financial activity."
        action={
          <div className="date-display">
            <CalendarDays size={16} />
            {new Intl.DateTimeFormat("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              timeZone: "Africa/Lagos",
            }).format(new Date())}
          </div>
        }
      />

      <div className="overview-summary">
        <BalanceCard />
        <section className="panel cheques-preview">
          <div className="section-heading">
            <h2>Recent cheques</h2>
            <Link className="text-link" to="/dashboard/cheques">
              View all <ArrowUpRight size={14} />
            </Link>
          </div>
          <p className="section-sub">Your requests, at a glance.</p>
          {!s.cheques.length && (
            <div className="empty-state">
              <Files />
              <h3>No cheque requests yet</h3>
              <p>New requests can be saved as drafts in this browser.</p>
            </div>
          )}
          {s.cheques.slice(0, 6).map((c) => (
            <Link
              className="cheque-preview-row"
              key={c.id}
              to="/dashboard/cheques"
            >
              <span className="document-icon">
                <Files size={18} />
              </span>
              <div>
                <strong>{c.payee}</strong>
                <small>{c.id}</small>
              </div>
              <div className="align-right">
                <strong>{money(c.amount)}</strong>
                <span
                  className={
                    "tiny-status " +
                    (c.status === "Under Review" ? "amber" : "blue")
                  }
                >
                  <i />
                  {c.status}
                </span>
              </div>
            </Link>
          ))}
          <Link className="new-request" to="/dashboard/request-cheque">
            <Plus size={15} /> Create a new request <ArrowRight size={15} />
          </Link>
        </section>
      </div>
      <TransactionTable compact />
    </>
  );
}
const txIcons: Record<string, typeof ArrowDownLeft> = {
  income: ArrowDownLeft,
  shopping: ShoppingBag,
  utilities: Lightbulb,
  transfer: ArrowLeftRight,
  cheque: Files,
  shipping: Truck,
};
function TransactionTable({ compact = false }: { compact?: boolean }) {
  const loc = useLocation();
  const [search, setSearch] = useState(
    new URLSearchParams(loc.search).get("q") || "",
  );
  React.useEffect(() => {
    setSearch(new URLSearchParams(loc.search).get("q") || "");
    setPage(1);
  }, [loc.search]);
  const [category, setCategory] = useState("All categories");
  const [status, setStatus] = useState("All statuses");
  const [date, setDate] = useState("All dates");
  const [page, setPage] = useState(1);
  const [detail, setDetail] = useState<(typeof transactions)[number] | null>(
    null,
  );
  const filtered = transactions.filter(
    (t) =>
      (t.description + " " + t.merchant)
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (category === "All categories" || t.category === category) &&
      (status === "All statuses" || t.status === status) &&
      (date === "All dates" ||
        (date === "November 2026"
          ? t.date.startsWith("2026-11")
          : t.date.startsWith("2026-10"))),
  );
  const count = compact ? 7 : 6;
  const visible = filtered.slice((page - 1) * count, page * count);
  function exportCSV() {
    const csv = [
      "Reference,Description,Date,Category,Amount,Status",
      ...filtered.map((t) =>
        [t.id, t.description, t.date, t.category, t.amount, t.status].join(","),
      ),
    ].join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "banklink-transactions.csv";
    a.click();
    URL.revokeObjectURL(url);
  }
  return (
    <>
    <section
      className={
        "panel transaction-panel" + (compact ? " recent-transactions" : "")
      }
    >
      <div className="section-heading">
        <div>
          <h2>{compact ? "Recent transactions" : "All transactions"}</h2>
          {!compact && (
            <p className="section-sub">
              {filtered.length} transactions · Net activity{" "}
              {money(filtered.reduce((a, t) => a + t.amount, 0))}
            </p>
          )}
        </div>
        {compact ? (
          <Link to="/dashboard/transactions" className="text-link">
            View all transactions <ArrowUpRight size={14} />
          </Link>
        ) : (
          <Button onClick={exportCSV} disabled={!filtered.length}>
            <Download size={15} />
            Export CSV
          </Button>
        )}
      </div>
      {!compact && (
        <div className="table-tools">
          <div className="table-search">
            <Search size={15} />
            <input
              aria-label="Search transaction list"
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <div className="filters">
            <select
              aria-label="Filter category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
            >
              {[
                "All categories",
                ...new Set(transactions.map((t) => t.category)),
              ].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            {!compact && (
              <select
                aria-label="Filter status"
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  setPage(1);
                }}
              >
                {["All statuses", "Completed", "Pending"].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            )}
            <select
              aria-label="Filter date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setPage(1);
              }}
            >
              {["All dates", "November 2026", "October 2026"].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      )}
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>
                Transaction <ChevronDown size={11} />
              </th>
              <th>Date</th>
              <th>Category</th>
              <th className="amount-col">Amount</th>
              <th>Status</th>
              <th aria-label="Details" />
            </tr>
          </thead>
          <tbody>
            {!visible.length && (
              <tr>
                <td colSpan={6}>
                  <div className="empty-state">
                    <Landmark />
                    <h3>No transaction activity</h3>
                    <p>
                      Connect a bank to load verified account activity.
                    </p>
                    <Link className="text-link" to="/dashboard/accounts">
                      View bank options
                    </Link>
                  </div>
                </td>
              </tr>
            )}
            {visible.map((t) => {
              const Icon = txIcons[t.icon];
              return (
                <tr key={t.id} onClick={() => setDetail(t)}>
                  <td>
                    <div className="transaction-name">
                      <span
                        className={
                          "transaction-icon " +
                          (t.amount > 0
                            ? "green"
                            : t.icon === "shopping"
                              ? "purple"
                              : t.icon === "utilities"
                                ? "gold"
                                : "blue")
                        }
                      >
                        <Icon size={17} />
                      </span>
                      <div>
                        <strong>{t.description}</strong>
                        <small>{t.merchant}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    {new Date(t.date + "T12:00:00").toLocaleDateString(
                      "en-US",
                      { month: "short", day: "numeric", year: "numeric" },
                    )}
                  </td>
                  <td>
                    <span className="category">{t.category}</span>
                  </td>
                  <td
                    className={"amount-col " + (t.amount > 0 ? "positive" : "")}
                  >
                    {t.amount > 0 ? "+" : ""}
                    {money(t.amount)}
                  </td>
                  <td>
                    <Badge>{t.status}</Badge>
                  </td>
                  <td>
                    <button
                      className="icon-button"
                      aria-label={"View " + t.description}
                      onClick={(e) => {
                        e.stopPropagation();
                        setDetail(t);
                      }}
                    >
                      <MoreHorizontal size={17} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length > 0 && visible.length === 0 && (
          <div className="empty-state">
            <Search />
            <h3>No matching transactions</h3>
            <p>Try another search or adjust your filters.</p>
          </div>
        )}
      </div>
      {!compact && (
        <div className="pagination">
          <span>
            Showing {filtered.length ? (page - 1) * count + 1 : 0}–
            {Math.min(page * count, filtered.length)} of {filtered.length}
          </span>
          <div>
            <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
              Previous
            </Button>
            <Button
              disabled={page * count >= filtered.length}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
      {detail && (
        <Modal title="Transaction details" onClose={() => setDetail(null)}>
          <div className="detail-amount">
            {detail.amount > 0 ? "+" : ""}
            {money(detail.amount)}
          </div>
          <Details
            rows={[
              ["Description", detail.description],
              ["Merchant", detail.merchant],
              ["Reference", detail.id],
              ["Date", detail.date],
              ["Category", detail.category],
              ["Status", detail.status],
            ]}
          />
          <p className="muted">
            Transaction details are not available until a bank is connected.
          </p>
        </Modal>
      )}
    </section>
    </>
  );
}
function Accounts() {
  const [modal, setModal] = useState("");
  return (
    <>
      <PageHeading
        title="My accounts"
        description="Manage your bank connection and account details."
      />
      <div className="account-grid">
        <BalanceCard large />
        <section className="panel account-details">
          <div className="section-heading">
            <h2>Account connection</h2>
            <ShieldCheck size={20} className="cyan" />
          </div>
          <Details
            rows={[
              ["Institution", `${account.bank} · Not connected`],
              ["Account type", account.type],
              ["Account number", "Unavailable · bank not connected"],
              ["Currency", "USD · US Dollar"],
              ["Connection", <Badge key="badge">Not connected</Badge>],
            ]}
          />
          <div className="button-row">
            <Button onClick={() => setModal("Account preview")}>
              View account details <ArrowUpRight size={15} />
            </Button>
            <Button onClick={() => setModal("Bank connections")}>
              Choose a bank
            </Button>
          </div>
        </section>
      </div>
      <div className="notice">
        <Landmark size={22} />
        <div>
          <strong>Choose a bank for a future connection.</strong>
          <p>
            Chase and Bank of America are listed as connection options. Neither
            is connected, and the balance above is not live bank data.
          </p>
        </div>
      </div>
      {modal && (
        <Modal title={modal} onClose={() => setModal("")}>
          {modal === "Bank connections" ? (
            <div className="provider-list">
              {bankProviders.map((bank) => (
                <div className="provider-row" key={bank}>
                  <div>
                    <strong>{bank}</strong>
                    <small>Connection setup required</small>
                  </div>
                  <Badge>Unavailable</Badge>
                </div>
              ))}
              <p className="muted">
                Connecting an account will be available after secure bank
                integration is configured.
              </p>
            </div>
          ) : (
            <>
              <Details
                rows={[
                  ["Institution", account.bank],
                  ["Account holder", useStore.getState().name],
                  ["Account number", "Unavailable · bank not connected"],
                  ["Balance preview", money(account.available)],
                  ["Connection status", "Not connected · preview only"],
                ]}
              />
              <p className="muted">
                This preview does not access or verify a bank account.
              </p>
            </>
          )}
          <Button onClick={() => setModal("")} kind="primary">
            Done
          </Button>
        </Modal>
      )}
    </>
  );
}

function Cheques() {
  const s = useStore();
  const [status, setStatus] = useState("All requests");
  const [selected, setSelected] = useState<Cheque | null>(null);
  const list = s.cheques.filter(
    (c) =>
      status === "All requests" ||
      (status === "Delivered"
        ? c.status === "Delivered"
        : !["Delivered", "Cancelled"].includes(c.status)),
  );
  return (
    <>
      <PageHeading
        title="My cheques"
        description="Every request. Every detail. All in one place."
        action={
          <Link to="/dashboard/request-cheque" className="button primary">
            <Plus size={17} />
            Request cheque
          </Link>
        }
      />
      <section className="panel">
        <div className="section-heading">
          <div className="tabs">
            {["All requests", "In progress", "Delivered"].map((t) => (
              <button
                key={t}
                className={status === t ? "selected" : ""}
                onClick={() => setStatus(t)}
              >
                {t}
              </button>
            ))}
          </div>
          <span className="muted">{list.length} requests</span>
        </div>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Reference</th>
                <th>Payee</th>
                <th>Amount</th>
                <th>Requested</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {!list.length && (
                <tr>
                  <td colSpan={6}>
                    <div className="empty-state">
                      <Files />
                      <h3>No cheque requests</h3>
                      <p>
                        Requests will appear here after they are saved. They
                        are not sent to a bank from this workspace.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
              {list.map((c) => (
                <tr key={c.id}>
                  <td className="reference">{c.id}</td>
                  <td>{c.payee}</td>
                  <td className="table-money">{money(c.amount)}</td>
                  <td>{c.date}</td>
                  <td>
                    <Badge>{c.status}</Badge>
                  </td>
                  <td>
                    <button
                      className="text-link"
                      onClick={() => setSelected(c)}
                    >
                      Details <ChevronRight size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <p className="subtle-caption">
        Request history is stored in this browser. No request has been sent to
        a bank.
      </p>
      {selected && (
        <Modal title="Cheque request details" onClose={() => setSelected(null)}>
          <div className="detail-amount">{money(selected.amount)}</div>
          <Details
            rows={[
              ["Reference", selected.id],
              ["Payee", selected.payee],
              ["Status", <Badge key="s">{selected.status}</Badge>],
              ["Delivery", selected.address],
              ["Shipping service", selected.service],
              ["Carrier quote", selected.rate ? money(selected.rate) : "Unavailable"],
              ["Memo", selected.memo || "—"],
            ]}
          />
          <h3 className="timeline-title">Request status history</h3>
          <div className="mini-timeline">
            <div>
              <CheckCircle2 size={17} />
              <span>
                Draft saved
                <small>{selected.date} · Stored in this browser</small>
              </span>
            </div>
            {selected.status !== "Draft saved" && (
              <div>
                <CheckCircle2 size={17} />
                <span>
                  {selected.status}
                  <small>Status history</small>
                </span>
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}
function Shipping() {
  const [index, setIndex] = useState(1);
  const [copied, setCopied] = useState(false);
  const [provider, setProvider] = useState<(typeof shippingProviders)[number]>(
    shippingProviders[0],
  );
  const item = shipments[index];
  const stages = [
    "Preparing Shipment",
    "Shipment Created",
    "Picked Up",
    "In Transit",
    "Out for Delivery",
    "Delivered",
  ];
  return (
    <>
      <PageHeading
        title="Shipping & tracking"
        description="Choose a carrier and review delivery tracking."
      />
      <section className="panel carrier-panel">
        <div>
          <h2>Carrier integrations</h2>
          <p className="section-sub">
            Select a provider. Live rates and tracking require an active
            connection.
          </p>
        </div>
        <div className="segmented" aria-label="Shipping carrier">
          {shippingProviders.map((name) => (
            <button
              className={provider === name ? "selected" : ""}
              key={name}
              onClick={() => setProvider(name)}
            >
              {name}
            </button>
          ))}
        </div>
        <Badge>Not connected</Badge>
      </section>
      <div className="shipping-layout">
        <section className="panel shipment-list">
          <h2>Your shipments</h2>
          <p className="section-sub">Tracking preview · not carrier data</p>
          {shipments.map((s, i) => (
            <button
              key={s.id}
              onClick={() => {
                setIndex(i);
                setCopied(false);
              }}
              className={"shipment-choice " + (i === index ? "selected" : "")}
            >
              <span className="quick-icon purple">
                <Truck size={20} />
              </span>
              <div>
                <strong>{s.recipient}</strong>
                <small>{s.id}</small>
                <Badge>{stages[s.stage]}</Badge>
              </div>
              <ChevronRight size={15} />
            </button>
          ))}
        </section>
        {!item ? (
          <section className="panel empty-state shipping-empty">
            <Truck />
            <h2>No shipments to track</h2>
            <p>
              Connect {provider} to request live rates and track deliveries.
            </p>
          </section>
        ) : (
        <section className="panel tracking-panel">
          <div className="section-heading">
            <div>
              <div className="eyebrow">{provider.toUpperCase()} · PREVIEW</div>
              <h2>{stages[item.stage]}</h2>
            </div>
            <span className="tracking-large-icon">
              <Truck size={30} />
            </span>
          </div>
          <div className="tracking-reference">
            <code>{item.id}</code>
            <button
              className="icon-button"
              aria-label="Copy tracking reference"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(item.id);
                  setCopied(true);
                } catch {
                  setCopied(false);
                }
              }}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
            <span>Tracking reference</span>
          </div>
          <div className="shipment-progress">
            {stages.map((name, i) => (
              <div key={name} className={i <= item.stage ? "complete" : ""}>
                <span>{i <= item.stage ? <Check size={15} /> : i + 1}</span>
                <strong>{name}</strong>
                <small>
                  {i <= item.stage ? "Preview status" : "Awaiting carrier connection"}
                </small>
              </div>
            ))}
          </div>
          <Details
            rows={[
              ["Cheque request", item.request],
              ["Service", item.service],
              ["Recipient", item.recipient],
              ["Delivery address", item.address],
              ["Example date", item.date],
            ]}
          />
          <div className="notice">
            <CircleHelp size={18} />
            <p>
              This tracking view is not connected to {provider}. Live status
              and delivery estimates are unavailable.
            </p>
          </div>
        </section>
        )}
      </div>
    </>
  );
}
function Payments() {
  const s = useStore();
  const [selected, setSelected] = useState<Invoice | null>(null);
  const [method, setMethod] = useState("Bitcoin (BTC)");
  const [tab, setTab] = useState("All invoices");
  const filtered = s.invoices.filter(
    (i) => tab === "All invoices" || (tab === "Paid" ? i.paid : !i.paid),
  );
  const due = s.invoices
    .filter((i) => !i.paid)
    .reduce((a, i) => a + i.amount, 0);
  const live = s.invoices.find((i) => i.id === selected?.id);
  return (
    <>
      <PageHeading
        title="Payments"
        description="Review invoices and available payment methods."
      />
      <div className="payment-summary">
        <div className="panel">
          <span className="stat-icon gold">
            <Receipt size={20} />
          </span>
          <div>
            <p>Outstanding shipping charges</p>
            <strong>{s.invoices.length ? money(due) : "—"}</strong>
          </div>
          <Badge>
            {s.invoices.length
              ? `${s.invoices.filter((i) => !i.paid).length} outstanding`
              : "No invoice data"}
          </Badge>
        </div>
        <div className="panel">
          <span className="stat-icon green">
            <CheckCheck size={20} />
          </span>
          <div>
            <p>Payments recorded</p>
            <strong>
              {s.invoices.length
                ? money(
                    s.invoices
                      .filter((i) => i.paid)
                      .reduce((a, i) => a + i.amount, 0),
                  )
                : "—"}
            </strong>
          </div>
          <span className="muted">Not live</span>
        </div>
      </div>
      <section className="panel payment-methods">
        <div className="section-heading">
          <h2>Payment method</h2>
          <Badge>Checkout unavailable</Badge>
        </div>
        <label className="field">
          Choose how you would pay
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            <option value="Credit/Debit Card" disabled>
              Bank card — unavailable
            </option>
            <option value="Bank Transfer / ACH" disabled>
              Bank transfer — unavailable
            </option>
            <option value="Bitcoin (BTC)">Bitcoin (BTC)</option>
          </select>
        </label>
        <p className="muted">
          Bitcoin is the only selectable method. Checkout requires a connected
          wallet/payment provider and is not active yet.
        </p>
      </section>
      <section className="panel card-preview-section">
        <div className="section-heading">
          <h2>Payment card</h2>
          <Badge>Not issued</Badge>
        </div>
        <div className="card-preview">
          <CreditCard size={22} />
          <span>Bank card</span>
          <strong>•••• •••• •••• {account.cardLast4}</strong>
          <small>{s.name}</small>
        </div>
        <p className="muted">
          Card details are not connected to a card issuer and cannot be used to
          make payments.
        </p>
      </section>
      <section className="panel">
        <div className="section-heading">
          <h2>Shipping invoices</h2>
          <div className="segmented">
            {["All invoices", "Outstanding", "Paid"].map((t) => (
              <button
                className={tab === t ? "selected" : ""}
                onClick={() => setTab(t)}
                key={t}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Cheque request</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {!filtered.length && (
                <tr>
                  <td colSpan={6}>
                    <div className="empty-state">
                      <Receipt />
                      <h3>No payment records</h3>
                      <p>
                        Invoices will appear after a connected service creates
                        them.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
              {filtered.map((i) => (
                <tr key={i.id}>
                  <td className="reference">{i.id}</td>
                  <td>{i.request}</td>
                  <td className="table-money">{money(i.amount)}</td>
                  <td>{i.date}</td>
                  <td>
                    <Badge>{i.paid ? "Paid" : "Outstanding"}</Badge>
                  </td>
                  <td>
                    <button
                      className="text-link"
                      onClick={() => {
                        setSelected(i);
                        setMethod("Bitcoin (BTC)");
                      }}
                    >
                      {i.paid ? "View payment record" : "View invoice"}{" "}
                      <ArrowUpRight size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <div className="notice">
        <ShieldCheck size={20} />
        <p>
          Payment processing is unavailable until a payment provider is
          connected. Invoice amounts shown here are not live charges.
        </p>
      </div>
      {selected && (
        <Modal
          title={live?.paid ? "Payment record" : "Shipping checkout"}
          onClose={() => setSelected(null)}
        >
          {live?.paid ? (
            <>
              <div className="payment-success">
                <CheckCircle2 size={38} />
                <h3>Payment record</h3>
                <strong>{money(selected.amount)}</strong>
              </div>
              <Details
                rows={[
                  ["Receipt", live.receipt],
                  ["Invoice", selected.id],
                  ["Method", live.method],
                  ["Status", "Not verified with a payment provider"],
                  ["Cheque issuance", "Unaffected by payment"],
                ]}
              />
              <p className="muted">
                This receipt is a local preview and does not confirm a payment.
              </p>
            </>
          ) : (
            <>
              <div className="detail-amount">
                {money(selected.amount)}
                <small>Invoice amount · not live</small>
              </div>
              <div className="payment-method-panel">
                {method === "Bitcoin (BTC)" ? (
                  <>
                    <span className="bitcoin-icon">₿</span>
                    <div>
                      <strong>Live BTC conversion unavailable</strong>
                      <p>
                        A wallet connection and current exchange rate are
                        required to calculate this amount.
                      </p>
                      <Badge>Not connected</Badge>
                    </div>
                  </>
                ) : (
                  <>
                    <CreditCard size={28} />
                    <div>
                      <strong>
                        {method === "Credit/Debit Card"
                          ? `${s.name} · •••• ${account.cardLast4}`
                          : "Bank transfer"}
                      </strong>
                      <p>
                        No{" "}
                        {method === "Credit/Debit Card"
                          ? "card details"
                          : "bank credentials"}{" "}
                        required or collected.
                      </p>
                    </div>
                  </>
                )}
              </div>
              <div className="notice">
                <CircleHelp size={18} />
                <p>
                  Bitcoin payments are not connected. No wallet address or
                  payment transaction can be created yet.
                </p>
              </div>
              <Button kind="primary full" disabled>
                Bitcoin checkout unavailable
              </Button>
            </>
          )}
        </Modal>
      )}
    </>
  );
}
function Notifications() {
  const s = useStore();
  const navigate = useNavigate();
  const [tab, setTab] = useState("All");
  const list = s.notices.filter((n) => tab === "All" || !n.read);
  return (
    <>
      <PageHeading
        title="Notifications"
        description="Your financial world, keeping you in the loop."
        action={
          <Button onClick={() => s.read()}>
            <CheckCheck size={16} />
            Mark all as read
          </Button>
        }
      />
      <section className="panel notification-list">
        <div className="tabs">
          {["All", "Unread"].map((t) => (
            <button
              className={tab === t ? "selected" : ""}
              onClick={() => setTab(t)}
              key={t}
            >
              {t}{" "}
              {t === "Unread" && (
                <span>{s.notices.filter((n) => !n.read).length}</span>
              )}
            </button>
          ))}
        </div>
        {list.map((n) => (
          <button
            className={"notification-row " + (!n.read ? "unread" : "")}
            key={n.id}
            onClick={() => {
              s.read(n.id);
              navigate(n.path);
            }}
          >
            <span className="quick-icon blue">
              <Bell size={20} />
            </span>
            <div>
              <strong>
                {n.title}
                {!n.read && <i />}
              </strong>
              <p>{n.detail}</p>
              <small>
                {new Date(n.date).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </small>
            </div>
            <ChevronRight size={17} />
          </button>
        ))}
        {!list.length && (
          <div className="empty-state">
            <CheckCheck />
            <h3>You’re all caught up.</h3>
            <p>No unread notifications.</p>
          </div>
        )}
      </section>
    </>
  );
}
function SettingsPage() {
  const s = useStore();
  const [name, setName] = useState(s.name);
  const [email, setEmail] = useState(s.email);
  const [feedback, setFeedback] = useState("");
  const [security, setSecurity] = useState(false);
  function save(e: React.FormEvent) {
    e.preventDefault();
    if (name.trim().split(" ").length < 2) {
      setFeedback("Please enter your first and last name.");
      return;
    }
    s.profile(name.trim(), email);
    setFeedback("Your profile has been saved.");
  }
  return (
    <>
      <PageHeading
        title="Settings"
        description="Make this space feel a little more like you."
      />
      <div className="settings-grid">
        <section className="panel settings-panel">
          <h2>Personal information</h2>
          <p className="section-sub">Your profile information.</p>
          <form onSubmit={save}>
            <label className="field">
              Full name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <label className="field">
              Email address
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <Button type="submit" kind="primary">
              Save changes
            </Button>
            {feedback && (
              <p role="status" className="cyan">
                {feedback}
              </p>
            )}
          </form>
        </section>
        <section className="panel settings-panel">
          <h2>Notification preferences</h2>
          <p className="section-sub">
            Preferences are stored locally; no messages are sent.
          </p>
          {[
            ["email", "Email updates", "Cheque and payment activity"],
            ["push", "Push notifications", "Delivery and request updates"],
            ["security", "Security alerts", "Interface setting only"],
          ].map(([key, title, sub]) => (
            <div className="setting-row" key={key}>
              <div>
                <strong>{title}</strong>
                <small>{sub}</small>
              </div>
              <button
                className={"switch " + (s.preferences[key] ? "on" : "")}
                role="switch"
                aria-checked={s.preferences[key]}
                aria-label={title}
                onClick={() => s.preference(key, !s.preferences[key])}
              >
                <span />
              </button>
            </div>
          ))}
        </section>
        <section className="panel settings-panel">
          <h2>Security</h2>
          <p className="section-sub">
            Backend authentication is not implemented.
          </p>
          <div className="setting-row">
            <div>
              <strong>Two-step verification</strong>
              <small>This setting does not provide authentication security</small>
            </div>
            <button
              className={"switch " + (security ? "on" : "")}
              role="switch"
              aria-checked={security}
              aria-label="Two-step verification"
              onClick={() => setSecurity(!security)}
            >
              <span />
            </button>
          </div>
          <div className="notice">
            <LockKeyhole size={18} />
            <p>
              No actual passwords or banking credentials are stored here.
            </p>
          </div>
        </section>
        <section className="panel settings-panel">
          <h2>Appearance</h2>
          <p className="section-sub">Designed for focus.</p>
          <div className="theme-preview">
            <span />
            <div>
              <strong>Midnight blue</strong>
              <small>BankLink signature theme</small>
            </div>
            <CheckCircle2 size={19} />
          </div>
          <div className="setting-row">
            <div>
              <strong>Compact workspace</strong>
              <small>Fit more content into your dashboard</small>
            </div>
            <button
              className={"switch " + (s.compact ? "on" : "")}
              role="switch"
              aria-checked={s.compact}
              aria-label="Compact workspace"
              onClick={() => s.setCompact(!s.compact)}
            >
              <span />
            </button>
          </div>
        </section>
        <section className="panel settings-panel">
          <h2>Bank connections</h2>
          <div className="setting-row">
            <div>
              <strong>Chase · Not connected</strong>
              <small>Bank connection required</small>
            </div>
            <Link className="text-link" to="/dashboard/accounts">
              Manage <ArrowUpRight size={15} />
            </Link>
          </div>
        </section>
        <section className="panel settings-panel">
          <h2>Support</h2>
          <p className="muted">
            Review your account settings and provider connection status.
          </p>
          <Link to="/dashboard/request-cheque" className="text-link">
            Try your first cheque request <ArrowRight size={16} />
          </Link>
        </section>
      </div>
    </>
  );
}

function Protected() {
  return useStore((s) => s.session) ? (
    <AppLayout />
  ) : (
    <Navigate to="/signin" replace />
  );
}
function NotFound() {
  return (
    <div className="not-found">
      <Logo />
      <span>404</span>
      <h1>A little off the map.</h1>
      <p>This page doesn’t exist. Your financial world is one click away.</p>
      <Link className="button primary" to="/dashboard">
        Back to overview <ArrowRight size={17} />
      </Link>
    </div>
  );
}
function App() {
  const session = useStore((s) => s.session);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={session ? "/dashboard" : "/signin"} replace />}
        />
        <Route path="/signin" element={<Auth key="signin" mode="signin" />} />
        <Route path="/signup" element={<Auth key="signup" mode="signup" />} />
        <Route
          path="/forgot-password"
          element={<Auth key="forgot" mode="forgot" />}
        />
        <Route path="/dashboard" element={<Protected />}>
          <Route index element={<Overview />} />
          <Route path="accounts" element={<Accounts />} />
          <Route
            path="transactions"
            element={
              <>
                <PageHeading
                  title="Transactions"
                  description="Transaction activity appears after a bank is connected."
                />
                <TransactionTable />
              </>
            }
          />
          <Route path="request-cheque" element={<RequestCheque />} />
          <Route path="cheques" element={<Cheques />} />
          <Route path="shipping" element={<Shipping />} />
          <Route path="payments" element={<Payments />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <MotionConfig reducedMotion="user">
      <React.Suspense
        fallback={
          <div className="app-loading">
            <strong className="loading-wordmark">BankLink Finance</strong>
            <RefreshCw className="spinning" size={22} />
            <p>Connecting your workspace…</p>
          </div>
        }
      >
        <App />
      </React.Suspense>
    </MotionConfig>
  </React.StrictMode>,
);
