import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Logo,
  Button,
  Badge,
  Modal,
  PageHeading,
  Details,
} from "../components/ui";
import { useStore, money, account } from "../store";
import {
  Eye,
  EyeOff,
  CheckCircle2,
  Landmark,
  CreditCard,
  Truck,
  Files,
  ShieldCheck,
  ArrowRight,
  RefreshCw,
  LayoutDashboard,
  ArrowUpRight,
} from "lucide-react";
const authSchema = z.object({
  first: z.string(),
  last: z.string(),
  email: z.email("Enter a valid email address."),
  password: z.string().min(8, "Use at least 8 characters."),
  confirm: z.string(),
  terms: z.boolean(),
});
type AuthForm = z.infer<typeof authSchema>;
export default function Auth({
  mode,
}: {
  mode: "signin" | "signup" | "forgot";
}) {
  const navigate = useNavigate();
  const login = useStore((s) => s.login);
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [policy, setPolicy] = useState(false);
  const schema =
    mode === "signup"
      ? authSchema
          .refine((v) => v.first.trim().length > 0, {
            path: ["first"],
            message: "Enter your first name.",
          })
          .refine((v) => v.last.trim().length > 0, {
            path: ["last"],
            message: "Enter your last name.",
          })
          .refine((v) => v.password === v.confirm, {
            path: ["confirm"],
            message: "Passwords must match.",
          })
          .refine((v) => v.terms, {
            path: ["terms"],
            message: "Please accept the demo terms.",
          })
      : mode === "forgot"
        ? authSchema.extend({ password: z.string() })
        : authSchema;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AuthForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      first: "",
      last: "",
      email: "",
      password: "",
      confirm: "",
      terms: false,
    },
  });
  const password = watch("password") || "";
  const strength = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^a-zA-Z0-9]/.test(password),
  ].filter(Boolean).length;
  function submit(v: AuthForm) {
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      if (mode === "forgot") {
        setFeedback(
          "Demo reset requested. No email was sent. Return to sign in to explore the dashboard.",
        );
        return;
      }
      login(
        mode === "signup"
          ? `${v.first.trim()} ${v.last.trim()}`
          : "Alexander Morgan",
        v.email,
        remember,
      );
      navigate("/dashboard");
    }, 700);
  }
  function input(
    key: keyof AuthForm,
    label: string,
    placeholder: string,
    type = "text",
  ) {
    return (
      <label className="field">
        {label}
        <div className="password-wrap">
          <input
            {...register(key)}
            aria-label={label}
            type={type}
            placeholder={placeholder}
            aria-invalid={!!errors[key]}
          />
          {key === "password" && (
            <button
              type="button"
              aria-label="Toggle password visibility"
              onClick={() => setShow(!show)}
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>
        {errors[key] && (
          <span className="field-error">{errors[key]?.message}</span>
        )}
      </label>
    );
  }
  return (
    <div className="auth-page">
      <section className="auth-art">
        <Logo />
        <div className="auth-hero">
          <span className="auth-kicker">
            <span className="online-dot" /> A MORE CONNECTED FINANCIAL FUTURE
          </span>
          <h1>
            Your financial world.
            <br />
            <span>
              Beautifully
              <br />
              connected.
            </span>
          </h1>
          <p>
            Experience a smarter way to manage connected banking, cheque
            requests, and financial services.
          </p>
          <div className="network-art">
            <div className="network-ring ring-a" />
            <div className="network-ring ring-b" />
            <div className="network-ring ring-c" />
            <div className="network-center">
              <Landmark size={42} />
            </div>
            <span className="network-node node-one">
              <CreditCard size={22} />
            </span>
            <span className="network-node node-two">
              <Truck size={22} />
            </span>
            <span className="network-node node-three">
              <Files size={22} />
            </span>
            <span className="network-node node-four">
              <ShieldCheck size={22} />
            </span>
            <i className="orbit-dot" />
          </div>
          <div className="auth-benefits">
            {[
              "Your finances, in one place",
              "Cheques, without the complexity",
              "A clearer path from request to delivery",
            ].map((t) => (
              <span key={t}>
                <CheckCircle2 size={16} />
                {t}
              </span>
            ))}
          </div>
        </div>
        <p className="auth-tagline">Banking Connected. Finance Simplified.</p>
      </section>
      <section className="auth-form-side">
        <span className="demo-tag">
          <span />
          Interactive prototype · fictional data
        </span>
        <div className="auth-form">
          <div className="eyebrow">WELCOME TO BANKLINK</div>
          <h2>
            {mode === "signup"
              ? "Start your next chapter."
              : mode === "forgot"
                ? "Let’s get you back in."
                : "Welcome back."}
          </h2>
          <p>
            {mode === "signup"
              ? "Create your demo account. A more connected experience awaits."
              : mode === "forgot"
                ? "Enter your email to explore the password reset interface."
                : "Your financial world is right where you left it."}
          </p>
          <form onSubmit={handleSubmit(submit)}>
            {mode === "signup" && (
              <div className="form-grid">
                {input("first", "First name", "Alexander")}
                {input("last", "Last name", "Morgan")}
              </div>
            )}
            {input("email", "Email address", "you@example.com", "email")}
            {mode !== "forgot" &&
              input(
                "password",
                "Password",
                "At least 8 characters",
                show ? "text" : "password",
              )}
            {mode === "signup" && (
              <>
                <div className="password-strength">
                  {[1, 2, 3, 4].map((n) => (
                    <span key={n} className={strength >= n ? "filled" : ""} />
                  ))}
                  <small>
                    {password
                      ? strength < 2
                        ? "Needs work"
                        : strength < 4
                          ? "Good"
                          : "Strong"
                      : "Password strength"}
                  </small>
                </div>
                {input(
                  "confirm",
                  "Confirm password",
                  "Enter your password again",
                  show ? "text" : "password",
                )}
                <label className="checkbox-label">
                  <input type="checkbox" {...register("terms")} />
                  <span>
                    I agree to the{" "}
                    <button
                      type="button"
                      className="inline-link"
                      onClick={() => setPolicy(true)}
                    >
                      demo terms and privacy notice
                    </button>
                    .
                  </span>
                </label>
                {errors.terms && (
                  <span className="field-error">{errors.terms.message}</span>
                )}
              </>
            )}
            {mode === "signin" && (
              <div className="auth-options">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  Remember me
                </label>
                <Link to="/forgot-password">Forgot password?</Link>
              </div>
            )}
            <Button kind="primary full" type="submit" disabled={busy}>
              {busy ? <RefreshCw className="spinning" size={17} /> : null}
              {mode === "signup"
                ? "Create demo account"
                : mode === "forgot"
                  ? "Request demo reset"
                  : "Sign in to demo"}
              <ArrowRight size={16} />
            </Button>
            {feedback && (
              <p className="notice" role="status">
                {feedback}
              </p>
            )}
          </form>
          {mode === "signin" && (
            <>
              <div className="divider">
                <span>or take a look around</span>
              </div>
              <Button
                kind="full demo-access"
                onClick={() => {
                  login();
                  navigate("/dashboard");
                }}
              >
                <LayoutDashboard size={17} />
                Explore Demo Dashboard
                <ArrowUpRight size={16} />
              </Button>
              <p className="auth-disclaimer">
                Meet Alexander Morgan, your fictional demo profile.
                <br />
                No account or real authentication required.
              </p>
            </>
          )}
          <p className="auth-switch">
            {mode === "signup"
              ? "Already have an account? "
              : mode === "forgot"
                ? "Ready to explore? "
                : "New to BankLink? "}
            <Link to={mode === "signin" ? "/signup" : "/signin"}>
              {mode === "signin" ? "Create an account" : "Sign in"}
            </Link>
          </p>
        </div>
        <div className="auth-footer">
          <ShieldCheck size={14} />
          Frontend demonstration. No real banking services.
        </div>
      </section>
      {policy && (
        <Modal title="Demo terms & privacy" onClose={() => setPolicy(false)}>
          <p>
            BankLink Finance is an interactive frontend prototype using
            fictional financial records. It does not provide banking, cheque
            issuance, courier services, or payment processing.
          </p>
          <p>
            Use fictional profile information. Demo profile, records, and
            preferences are stored in your browser. Passwords are never saved.
            Clearing browser storage removes demo changes.
          </p>
          <Button kind="primary" onClick={() => setPolicy(false)}>
            Understood
          </Button>
        </Modal>
      )}
    </div>
  );
}
