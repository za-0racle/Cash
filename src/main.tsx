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
  transactions,
  activity,
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
const ActivityChart = React.lazy(() => import("./components/ActivityChart"));

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
            Personal workspace
            <small>
              Premium account <span>✧</span>
            </small>
          </div>
          <ChevronDown size={14} />
        </div>
        <span className="nav-label">WORKSPACE</span>
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
            <span className="online-dot" /> Demo environment <span>v1.0</span>
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
            <span>Workspace</span>
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
            <span className="demo-tag">
              <span />
              Demo Environment
            </span>
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
              <ShieldCheck size={13} /> Built for clarity. Connected by design.
            </span>
            <span>
              Fictional data. No real banking or payments.{" "}
              <span className="footer-brand">BankLink Finance © 2026</span>
            </span>
          </footer>
        </main>
      </div>
      {help && (
        <Modal title="How can we help?" onClose={() => setHelp(false)}>
          <p>
            This prototype lets you explore fictional accounts, request demo
            cheques, simulate shipping payments, and follow example shipments.
          </p>
          <div className="notice">
            <CircleHelp size={20} />
            <span>
              Need to start again? Your demo changes are saved on this browser.
              No bank or courier is connected.
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
  const [loading, setLoading] = useState(false);
  const refresh = () => {
    setLoading(true);
    setTimeout(() => {
      s.refresh();
      setLoading(false);
    }, 800);
  };
  return (
    <section className={"balance-card " + (large ? "large" : "")}>
      <div className="balance-orbit orbit-one" />
      <div className="balance-orbit orbit-two" />
      <div className="balance-top">
        <span>
          <span className="bank-mini">
            <Landmark size={16} />
          </span>{" "}
          Premium Checking
        </span>
        <Badge>Demo Connected</Badge>
      </div>
      <div className="balance-label">
        Available balance{" "}
        <button
          aria-label={s.hideBalance ? "Show balance" : "Hide balance"}
          onClick={s.toggleBalance}
        >
          <Eye size={15} />
        </button>
      </div>
      <div className={"balance-amount " + (loading ? "skeleton" : "")}>
        {s.hideBalance ? (
          "••,•••.••"
        ) : (
          <>
            $48,750<span>.00</span>
          </>
        )}
        <span className="currency">USD</span>
      </div>
      <div className="current-balance">
        Current balance{" "}
        <strong>{s.hideBalance ? "••••••" : money(account.current)}</strong>
        <span className="balance-separator" /> <span>•••• 4821</span>
      </div>
      <div className="balance-bottom">
        <div>
          <span className="bank-dot" />
          {account.bank}
          <span className="balance-caption">Fictional linked account</span>
        </div>
        <button
          onClick={refresh}
          disabled={loading}
          aria-label="Refresh demo balance"
        >
          <RefreshCw size={14} className={loading ? "spinning" : ""} />
          <span>
            {loading
              ? "Refreshing demo..."
              : "Updated " +
                new Date(s.refreshed).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                })}
          </span>
        </button>
      </div>
    </section>
  );
}
function Overview() {
  const s = useStore();
  const invoices = s.invoices;
  const pending = s.cheques.filter(
    (c) => !["Delivered", "Cancelled"].includes(c.status),
  ).length;
  const paid = invoices.filter((i) => i.paid).reduce((a, i) => a + i.amount, 0);
  return (
    <>
      <PageHeading
        title={`Good morning, ${s.name.split(" ")[0]}`}
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
      <div className="hero-grid">
        <BalanceCard />
        <section className="quick-card panel">
          <div className="section-heading">
            <h2>Move your money forward</h2>
            <span className="sparkle">✧</span>
          </div>
          <p>Everything you need, one connection away.</p>
          <div className="quick-actions">
            {[
              {
                label: "Request Cheque",
                icon: FilePlus2,
                path: "request-cheque",
                color: "blue",
              },
              {
                label: "Transactions",
                icon: ArrowLeftRight,
                path: "transactions",
                color: "cyan",
              },
              {
                label: "Track Shipment",
                icon: Truck,
                path: "shipping",
                color: "purple",
              },
              {
                label: "View Payments",
                icon: CreditCard,
                path: "payments",
                color: "gold",
              },
            ].map(({ label, icon: Icon, path, color }) => (
              <Link key={path} to={"/dashboard/" + path}>
                <span className={"quick-icon " + color}>
                  <Icon size={21} />
                </span>
                <span>{label}</span>
                <ArrowUpRight size={14} />
              </Link>
            ))}
          </div>
          <div className="quick-note">
            <ShieldCheck size={14} />
            Your next financial move, made simple.
          </div>
        </section>
      </div>
      <div className="stats-grid">
        {[
          {
            label: "Total Cheque Requests",
            value: s.cheques.length.toString().padStart(2, "0"),
            icon: Files,
            color: "blue",
            note: "Across all requests",
            tag: "All time",
          },
          {
            label: "Pending Cheques",
            value: pending.toString().padStart(2, "0"),
            icon: Clock3,
            color: "gold",
            note: "Awaiting next steps",
            tag: "In progress",
          },
          {
            label: "Completed Deliveries",
            value: s.cheques
              .filter((c) => c.status === "Delivered")
              .length.toString()
              .padStart(2, "0"),
            icon: PackageCheck,
            color: "green",
            note: "Successfully delivered",
            tag: "Demo records",
          },
          {
            label: "Shipping Payments",
            value: money(paid),
            icon: CreditCard,
            color: "purple",
            note: "Total illustrative charges",
            tag: "Paid",
          },
        ].map(({ label, value, icon: Icon, color, note, tag }) => (
          <section className="stat-card panel" key={label}>
            <div className="stat-top">
              <span>{label}</span>
              <span className={"stat-icon " + color}>
                <Icon size={17} />
              </span>
            </div>
            <strong className="stat-value">{value}</strong>
            <div className="stat-bottom">
              <span>{note}</span>
              <span className={color}>{tag}</span>
            </div>
          </section>
        ))}
      </div>
      <div className="middle-grid">
        <React.Suspense
          fallback={
            <section className="panel chart-loading">
              <RefreshCw className="spinning" size={20} />
              <span>Loading demo activity…</span>
            </section>
          }
        >
          <ActivityChart />
        </React.Suspense>
        <section className="panel cheques-preview">
          <div className="section-heading">
            <h2>Recent cheques</h2>
            <Link className="text-link" to="/dashboard/cheques">
              View all <ArrowUpRight size={14} />
            </Link>
          </div>
          <p className="section-sub">Your requests, at a glance.</p>
          {s.cheques.slice(0, 3).map((c) => (
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
      <div className="demo-disclosure">
        <span className="demo-info">i</span>
        <p>
          <strong>A real experience. Illustrative data.</strong> You’re
          exploring a demo environment. Accounts, balances, cheques, and
          shipments are fictional.
        </p>
        <Link to="/dashboard/accounts">
          Learn more <ArrowUpRight size={14} />
        </Link>
      </div>
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
  const count = compact ? 4 : 6;
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
    a.download = "banklink-fictional-transactions.csv";
    a.click();
    URL.revokeObjectURL(url);
  }
  return (
    <section className="panel transaction-panel">
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
          <Button onClick={exportCSV}>
            <Download size={15} />
            Export CSV
          </Button>
        )}
      </div>
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
        {visible.length === 0 && (
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
            This is a fictional demonstration transaction.
          </p>
        </Modal>
      )}
    </section>
  );
}
function Accounts() {
  const [modal, setModal] = useState("");
  return (
    <>
      <PageHeading
        title="My accounts"
        description="A clear view of your connected financial world."
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
              ["Institution", account.bank],
              ["Account type", account.type],
              ["Account number", "•••• " + account.number],
              ["Currency", "USD · US Dollar"],
              ["Connection", <Badge key="badge">Demo Connected</Badge>],
            ]}
          />
          <div className="button-row">
            <Button onClick={() => setModal("Account details")}>
              View account details <ArrowUpRight size={15} />
            </Button>
            <Button onClick={() => setModal("Manage connection")}>
              Manage connection
            </Button>
          </div>
        </section>
      </div>
      <div className="notice">
        <Landmark size={22} />
        <div>
          <strong>Your future banking connection starts here.</strong>
          <p>
            This is a fictional account. Live bank connectivity will be added in
            a later development phase with a licensed banking partner.
          </p>
        </div>
      </div>
      {modal && (
        <Modal title={modal} onClose={() => setModal("")}>
          <Details
            rows={[
              ["Bank", account.bank],
              ["Account holder", useStore.getState().name],
              ["Account", "•••• 4821"],
              ["Available", money(account.available)],
              ["Connection type", "Simulated · No live bank access"],
            ]}
          />
          <p className="muted">
            No credentials or real accounts are connected. This interface is
            prepared for a future bank connection service.
          </p>
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
        All requests and status events are simulated. New requests remain
        submitted until a future real review process is connected.
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
              ["Illustrative charge", money(selected.rate)],
              ["Memo", selected.memo || "—"],
            ]}
          />
          <h3 className="timeline-title">Simulated request timeline</h3>
          <div className="mini-timeline">
            <div>
              <CheckCircle2 size={17} />
              <span>
                Demo Request Submitted
                <small>{selected.date} · Fictional event</small>
              </span>
            </div>
            {selected.status !== "Demo Request Submitted" && (
              <div>
                <CheckCircle2 size={17} />
                <span>
                  {selected.status}
                  <small>Seeded demonstration status</small>
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
        description="Follow the journey, from the first step to the doorstep."
      />
      <div className="shipping-layout">
        <section className="panel shipment-list">
          <h2>Your shipments</h2>
          <p className="section-sub">Fictional delivery examples</p>
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
        <section className="panel tracking-panel">
          <div className="section-heading">
            <div>
              <div className="eyebrow">DEMO SHIPMENT</div>
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
              aria-label="Copy demo tracking reference"
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
            <span>Demo-only tracking reference</span>
          </div>
          <div className="shipment-progress">
            {stages.map((name, i) => (
              <div key={name} className={i <= item.stage ? "complete" : ""}>
                <span>{i <= item.stage ? <Check size={15} /> : i + 1}</span>
                <strong>{name}</strong>
                <small>
                  {i <= item.stage ? "Simulated event" : "Awaiting demo event"}
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
              This timeline is a seeded illustration. No live FedEx shipment,
              quote, or delivery commitment exists.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
function Payments() {
  const s = useStore();
  const [selected, setSelected] = useState<Invoice | null>(null);
  const [method, setMethod] = useState("Credit/Debit Card");
  const [paid, setPaid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("All invoices");
  const filtered = s.invoices.filter(
    (i) => tab === "All invoices" || (tab === "Paid" ? i.paid : !i.paid),
  );
  const due = s.invoices
    .filter((i) => !i.paid)
    .reduce((a, i) => a + i.amount, 0);
  function pay() {
    if (!selected) return;
    setLoading(true);
    setTimeout(() => {
      s.pay(selected.id, method);
      setPaid(true);
      setLoading(false);
    }, 800);
  }
  const live = s.invoices.find((i) => i.id === selected?.id);
  return (
    <>
      <PageHeading
        title="Payments"
        description="Simple payments. Clear records. Everything accounted for."
      />
      <div className="payment-summary">
        <div className="panel">
          <span className="stat-icon gold">
            <Receipt size={20} />
          </span>
          <div>
            <p>Outstanding shipping charges</p>
            <strong>{money(due)}</strong>
          </div>
          <Badge>{s.invoices.filter((i) => !i.paid).length} outstanding</Badge>
        </div>
        <div className="panel">
          <span className="stat-icon green">
            <CheckCheck size={20} />
          </span>
          <div>
            <p>Total simulated payments</p>
            <strong>
              {money(
                s.invoices
                  .filter((i) => i.paid)
                  .reduce((a, i) => a + i.amount, 0),
              )}
            </strong>
          </div>
          <span className="muted">Illustrative USD</span>
        </div>
      </div>
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
                        setPaid(false);
                        setMethod("Credit/Debit Card");
                      }}
                    >
                      {i.paid ? "View receipt" : "Pay in demo"}{" "}
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
          All amounts are illustrative. Simulating a payment changes only the
          invoice state, never cheque issuance or delivery status.
        </p>
      </div>
      {selected && (
        <Modal
          title={
            live?.paid ? "Demo payment receipt" : "Simulated shipping checkout"
          }
          onClose={() => setSelected(null)}
        >
          {live?.paid ? (
            <>
              <div className="payment-success">
                <CheckCircle2 size={38} />
                <h3>
                  {paid
                    ? "Payment simulated successfully"
                    : "Payment confirmed · Demo"}
                </h3>
                <strong>{money(selected.amount)}</strong>
              </div>
              <Details
                rows={[
                  ["Receipt", live.receipt],
                  ["Invoice", selected.id],
                  ["Method", live.method],
                  ["Status", "Paid · simulated"],
                  ["Cheque issuance", "Unaffected by payment"],
                ]}
              />
              <p className="muted">
                This is a demo receipt and is not evidence of a real payment.
              </p>
            </>
          ) : (
            <>
              <div className="detail-amount">
                {money(selected.amount)}
                <small>Illustrative shipping charge</small>
              </div>
              <label className="field">
                Demonstration method
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                >
                  {[
                    "Credit/Debit Card",
                    "Bank Transfer / ACH",
                    "Bitcoin (BTC)",
                  ].map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </label>
              <div className="demo-payment-method">
                {method === "Bitcoin (BTC)" ? (
                  <>
                    <span className="bitcoin-icon">₿</span>
                    <div>
                      <strong>
                        {(selected.amount / 75000).toFixed(8)} BTC
                      </strong>
                      <p>
                        Illustrative conversion at $75,000 / BTC. Not a live
                        rate.
                      </p>
                      <Badge>Awaiting simulation</Badge>
                    </div>
                  </>
                ) : (
                  <>
                    <CreditCard size={28} />
                    <div>
                      <strong>
                        {method === "Credit/Debit Card"
                          ? "Demo card · •••• DEMO"
                          : "Demo bank transfer"}
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
                  No money will move. No wallet address or actual transaction
                  will be generated.
                </p>
              </div>
              <Button kind="primary full" onClick={pay} disabled={loading}>
                {loading ? (
                  <RefreshCw size={16} className="spinning" />
                ) : (
                  <Check size={16} />
                )}
                Simulate Successful Payment
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
    setFeedback("Your demo profile has been saved.");
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
          <p className="section-sub">Your fictional demonstration profile.</p>
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
            Local demo preferences; no messages are sent.
          </p>
          {[
            ["email", "Email updates", "Cheque and payment activity"],
            ["push", "Push notifications", "Delivery and request updates"],
            ["security", "Security alerts", "Interface demonstration only"],
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
            Interface demonstration. Backend authentication is not implemented.
          </p>
          <div className="setting-row">
            <div>
              <strong>Two-step verification</strong>
              <small>Demo toggle · provides no authentication security</small>
            </div>
            <button
              className={"switch " + (security ? "on" : "")}
              role="switch"
              aria-checked={security}
              aria-label="Demo two-step verification"
              onClick={() => setSecurity(!security)}
            >
              <span />
            </button>
          </div>
          <div className="notice">
            <LockKeyhole size={18} />
            <p>
              No actual passwords or banking credentials are stored by this
              prototype.
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
          <h2>Connected accounts</h2>
          <div className="setting-row">
            <div>
              <strong>Example Partner Bank · •••• 4821</strong>
              <small>Fictional account · no live connection</small>
            </div>
            <Link className="text-link" to="/dashboard/accounts">
              Manage <ArrowUpRight size={15} />
            </Link>
          </div>
        </section>
        <section className="panel settings-panel">
          <h2>Support</h2>
          <p className="muted">
            Explore the core workflows in this browser. Demo records and
            preferences are saved locally on your device.
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
                  description="The complete picture of your fictional financial activity."
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
            <p>Connecting your demo workspace…</p>
          </div>
        }
      >
        <App />
      </React.Suspense>
    </MotionConfig>
  </React.StrictMode>,
);
