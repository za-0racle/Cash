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
import { useStore } from "../store";
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
            message: "Please accept the terms.",
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
  function submit() {
    setFeedback(
      mode === "forgot"
        ? "Password reset is unavailable until authentication is connected."
        : mode === "signup"
          ? "Account creation is unavailable until authentication is connected."
          : "Sign-in is unavailable until authentication is connected. Open the account preview to continue.",
    );
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
            Experience a smarter way to manage accounts, cheque requests, and
            financial services.
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
        <p className="auth-tagline">
          Banking, made clearer. Finance, simplified.
        </p>
      </section>
      <section className="auth-form-side">
        <span className="environment-tag">
          <span />
          Integrations pending
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
              ? "Account creation will be available after authentication is connected."
              : mode === "forgot"
                ? "Password reset will be available after authentication is connected."
                : "Sign-in will be available after authentication is connected."}
          </p>
          <form onSubmit={handleSubmit(submit)}>
            {mode === "signup" && (
              <div className="form-grid">
                {input("first", "First name", "Samuel")}
                {input("last", "Last name", "Daren")}
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
                      terms and privacy notice
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
                <span>Authentication unavailable</span>
                <Link to="/forgot-password">Forgot password?</Link>
              </div>
            )}
            <Button kind="primary full" type="submit">
              {mode === "signup"
                ? "Account creation unavailable"
                : mode === "forgot"
                  ? "Password reset unavailable"
                  : "Sign-in unavailable"}
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
                kind="full dashboard-access"
                onClick={() => {
                  login();
                  navigate("/dashboard");
                }}
              >
                <LayoutDashboard size={17} />
                Open account preview
                <ArrowUpRight size={16} />
              </Button>
              <p className="auth-disclaimer">
                Preview profile: Samuel Daren.
                <br />
                No bank or payment data is connected.
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
          Bank, carrier, and payment integrations are not connected.
        </div>
      </section>
      {policy && (
        <Modal title="Terms & privacy" onClose={() => setPolicy(false)}>
          <p>
            BankLink Finance currently has no bank, carrier, or payment
            integrations. Cheque requests are saved locally and are not issued.
          </p>
          <p>
            Profile and preferences are stored in this browser. Passwords and
            banking credentials are not saved.
          </p>
          <Button kind="primary" onClick={() => setPolicy(false)}>
            Understood
          </Button>
        </Modal>
      )}
    </div>
  );
}
