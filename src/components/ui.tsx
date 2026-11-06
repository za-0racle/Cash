import React from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { motion } from "motion/react";
export function Logo() {
  return (
    <Link className="brand" to="/dashboard">
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <defs>
          <linearGradient id="logo" x2="1" y2="1">
            <stop stopColor="#64deff" />
            <stop offset="1" stopColor="#2978ff" />
          </linearGradient>
        </defs>
        <path
          d="M9 8h12a7 7 0 0 1 0 14H9V8Zm0 14h15a6 6 0 0 1 0 12H9"
          fill="none"
          stroke="url(#logo)"
          strokeWidth="5"
        />
        <circle cx="9" cy="8" r="4" fill="#82e7ff" />
        <circle cx="9" cy="22" r="4" fill="#4ba3ff" />
      </svg>
      <span>
        BankLink<span className="brand-sub">FINANCE</span>
      </span>
    </Link>
  );
}
export function Button({
  children,
  onClick,
  kind = "",
  type = "button",
  disabled = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  kind?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={"button " + kind}
    >
      {children}
    </button>
  );
}
export function Badge({ children }: { children: React.ReactNode }) {
  const value = String(children);
  return (
    <span
      className={
        "badge " +
        (/Completed|Delivered|Paid|Connected/.test(value)
          ? "green"
          : /Pending|Review|Processing|Outstanding/.test(value)
            ? "amber"
            : "blue")
      }
    >
      {children}
    </span>
  );
}
export function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const closeRef = React.useRef(onClose);
  closeRef.current = onClose;
  React.useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    ref.current?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeRef.current();
      if (e.key === "Tab") {
        const els = ref.current?.querySelectorAll<HTMLElement>(
          'button,input,select,a,textarea,[tabindex="0"]',
        );
        if (!els?.length) return;
        const first = els[0],
          last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", key);
      document.body.style.overflow = old;
      previous?.focus();
    };
  }, []);
  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="modal"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="section-heading">
          <h2>{title}</h2>
          <button
            aria-label="Close dialog"
            className="icon-button"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </motion.div>
    </div>
  );
}
export function PageHeading({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="page-heading">
      <div>
        <div className="eyebrow">YOUR CONNECTED FINANCIAL WORLD</div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action}
    </div>
  );
}
export function Details({ rows }: { rows: [string, React.ReactNode][] }) {
  return (
    <dl className="details">
      {rows.map(([k, v]) => (
        <div key={k}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}
