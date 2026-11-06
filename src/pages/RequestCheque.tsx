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
  Check,
  ShieldCheck,
  Landmark,
  CheckCircle2,
  CircleHelp,
  Zap,
  Truck,
  PackageCheck,
  ArrowRight,
  Send,
  RefreshCw,
} from "lucide-react";
const chequeSchema = z.object({
  amount: z.preprocess(
    (v) => (v === undefined || v === "" ? 0 : v),
    z.coerce
      .number({ error: "Enter a valid cheque amount." })
      .positive("Enter an amount greater than $0.")
      .max(account.available, "Amount exceeds the demo available balance."),
  ),
  payee: z.string().trim().min(2, "Enter the payee’s full name."),
  memo: z.string().max(150),
  purpose: z.string(),
  recipient: z.string().trim().min(2, "Enter a recipient name."),
  street: z.string().trim().min(4, "Enter a street address."),
  suite: z.string(),
  city: z.string().trim().min(2, "Enter a city."),
  state: z.string().regex(/^[A-Za-z]{2}$/, "Use a two-letter state code."),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, "Enter a valid ZIP code."),
  phone: z.string().regex(/^[+\d\s()-]{10,20}$/, "Enter a valid phone number."),
  service: z.string().min(1),
});
type ChequeForm = z.input<typeof chequeSchema>;
const services = [
  {
    name: "FedEx Priority Overnight",
    rate: 45,
    description: "Priority service illustration",
    icon: Zap,
  },
  {
    name: "FedEx Standard Overnight",
    rate: 32,
    description: "Standard service illustration",
    icon: Truck,
  },
  {
    name: "FedEx 2Day",
    rate: 24.5,
    description: "Economy service illustration",
    icon: PackageCheck,
  },
];
export default function RequestCheque() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState("");
  const [accepted, setAccepted] = useState(false);
  const navigate = useNavigate();
  const add = useStore((s) => s.addCheque);
  const {
    register,
    trigger,
    getValues,
    watch,
    formState: { errors },
  } = useForm<ChequeForm>({
    resolver: zodResolver(chequeSchema),
    defaultValues: {
      amount: undefined,
      payee: "",
      memo: "",
      purpose: "Personal",
      recipient: "",
      street: "",
      suite: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
      service: "FedEx 2Day",
    },
  });
  const steps = [
    "Bank account",
    "Cheque details",
    "Delivery details",
    "Shipping preference",
    "Review request",
    "Submit request",
  ];
  const selected =
    services.find((s) => s.name === watch("service")) || services[2];
  async function next() {
    const fields = (
      step === 1
        ? ["amount", "payee", "memo"]
        : step === 2
          ? ["recipient", "street", "city", "state", "zip", "phone"]
          : step === 3
            ? ["service"]
            : []
    ) as (keyof ChequeForm)[];
    if (!fields.length || (await trigger(fields))) setStep(step + 1);
  }
  async function submit() {
    if (!accepted || !(await trigger())) return;
    setSubmitting(true);
    setTimeout(() => {
      const v = getValues();
      const id = add({
        amount: Number(v.amount),
        payee: v.payee,
        memo: v.memo,
        address: `${v.recipient}, ${v.street}${v.suite ? " " + v.suite : ""}, ${v.city}, ${v.state.toUpperCase()} ${v.zip}`,
        service: selected.name,
        rate: selected.rate,
      });
      setReference(id);
      setSubmitting(false);
    }, 700);
  }
  function field(
    name: keyof ChequeForm,
    label: string,
    placeholder: string,
    type = "text",
  ) {
    return (
      <label className="field">
        {label}
        <input
          {...register(name)}
          aria-label={label}
          type={type}
          placeholder={placeholder}
          aria-invalid={!!errors[name]}
        />
        {errors[name] && (
          <span className="field-error">{errors[name]?.message}</span>
        )}
      </label>
    );
  }
  return (
    <>
      <PageHeading
        title="Request a cheque"
        description="From your account to their hands. Let’s take it step by step."
      />
      <div className="wizard-layout">
        <aside className="wizard-sidebar panel">
          {steps.map((label, i) => (
            <div
              key={label}
              className={
                "wizard-step " +
                (step === i ? "current" : step > i ? "done" : "")
              }
            >
              <span>
                {step > i ? (
                  <Check size={16} />
                ) : (
                  String(i + 1).padStart(2, "0")
                )}
              </span>
              <div>
                <small>STEP {i + 1}</small>
                <strong>{label}</strong>
              </div>
            </div>
          ))}
          <div className="wizard-aside-note">
            <ShieldCheck size={22} />
            <p>
              A demonstration from start to finish. No cheque is issued and no
              funds are moved.
            </p>
          </div>
        </aside>
        <section className="wizard-content panel">
          {reference ? (
            <div className="success-screen">
              <span className="success-circle">
                <Check size={32} />
              </span>
              <div className="eyebrow">YOU’RE ALL SET</div>
              <h2>Demo request submitted.</h2>
              <p>Your request has been added to My Cheques.</p>
              <code>{reference}</code>
              <Badge>Demo Request Submitted</Badge>
              <p className="muted">
                No funds were reserved. Payment and cheque issuance are separate
                steps. Your request will not automatically advance.
              </p>
              <Button
                kind="primary"
                onClick={() => navigate("/dashboard/cheques")}
              >
                View my cheques <ArrowRight size={16} />
              </Button>
            </div>
          ) : (
            <>
              <div className="eyebrow">STEP {step + 1} OF 6</div>
              <h2 className="wizard-title">{steps[step]}</h2>
              <p className="section-sub">
                {
                  [
                    "Choose the fictional account for this request.",
                    "Who are you making this cheque out to?",
                    "Tell us where your demo cheque would be delivered.",
                    "Choose an illustrative service for your delivery.",
                    "Make sure everything looks right before continuing.",
                    "One final check before submitting your demo request.",
                  ][step]
                }
              </p>
              <div className="wizard-body">
                {step === 0 && (
                  <>
                    <div className="selected-account">
                      <span className="quick-icon blue">
                        <Landmark size={24} />
                      </span>
                      <div>
                        <strong>
                          Premium Checking <span>•••• 4821</span>
                        </strong>
                        <small>{account.bank}</small>
                        <span className="cyan">
                          Available: {money(account.available)}
                        </span>
                      </div>
                      <CheckCircle2 className="cyan" size={22} />
                    </div>
                    <div className="notice">
                      <CircleHelp size={18} />
                      <p>
                        Demo account selected. No real bank connection or funds
                        are involved.
                      </p>
                    </div>
                  </>
                )}
                {step === 1 && (
                  <div className="form-grid">
                    {field("amount", "Cheque amount (USD)", "0.00", "number")}
                    {field("payee", "Payee full name", "e.g. Sarah Johnson")}
                    {field("memo", "Memo (optional)", "What is this for?")}
                    <label className="field">
                      Purpose
                      <select {...register("purpose")}>
                        <option>Personal</option>
                        <option>Business</option>
                        <option>Gift</option>
                        <option>Other</option>
                      </select>
                    </label>
                  </div>
                )}
                {step === 2 && (
                  <div className="form-grid">
                    {field("recipient", "Recipient name", "Full name")}
                    {field(
                      "phone",
                      "Contact phone number",
                      "(415) 555-0100",
                      "tel",
                    )}
                    {field("street", "Street address", "123 Market Street")}
                    {field(
                      "suite",
                      "Apartment / suite (optional)",
                      "Suite 200",
                    )}
                    {field("city", "City", "San Francisco")}
                    {field("state", "State (two-letter code)", "CA")}
                    {field("zip", "ZIP code", "94103")}
                  </div>
                )}
                {step === 3 && (
                  <>
                    <div className="notice amber-notice">
                      <CircleHelp size={18} />
                      <p>
                        Illustrative estimates only. These are not actual FedEx
                        quotes, availability, or delivery commitments.
                      </p>
                    </div>
                    <div className="service-options">
                      {services.map(
                        ({ name, rate, description, icon: Icon }) => (
                          <label
                            key={name}
                            className={
                              "service-option " +
                              (watch("service") === name ? "selected" : "")
                            }
                          >
                            <input
                              type="radio"
                              value={name}
                              {...register("service")}
                            />
                            <Icon size={23} />
                            <span>
                              <strong>{name}</strong>
                              <small>{description}</small>
                            </span>
                            <b>
                              {money(rate)}
                              <small>illustrative</small>
                            </b>
                          </label>
                        ),
                      )}
                    </div>
                  </>
                )}
                {(step === 4 || step === 5) && (
                  <>
                    <Details
                      rows={[
                        ["Bank account", "Premium Checking · •••• 4821"],
                        [
                          "Cheque amount",
                          money(Number(getValues("amount")) || 0),
                        ],
                        ["Payee", getValues("payee")],
                        [
                          "Delivery to",
                          `${getValues("recipient")}, ${getValues("street")} ${getValues("suite")}, ${getValues("city")}, ${getValues("state")} ${getValues("zip")}`,
                        ],
                        ["Service", selected.name],
                        [
                          "Shipping estimate",
                          money(selected.rate) + " · illustrative only",
                        ],
                      ]}
                    />
                    <div className="notice">
                      <ShieldCheck size={20} />
                      <p>
                        This submits a fictional request only. No cheque is
                        issued, no funds are reserved, and no shipment or
                        payment is created with a real provider.
                      </p>
                    </div>
                    {step === 5 && (
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={accepted}
                          onChange={(e) => setAccepted(e.target.checked)}
                        />
                        I understand this is a simulated request using fictional
                        data.
                      </label>
                    )}
                  </>
                )}
              </div>
              <div className="wizard-footer">
                <Button
                  onClick={() =>
                    step === 0 ? navigate("/dashboard") : setStep(step - 1)
                  }
                >
                  {step === 0 ? "Cancel" : "Back"}
                </Button>
                <span>Your progress is local to this form</span>
                {step < 5 ? (
                  <Button kind="primary" onClick={next}>
                    Continue <ArrowRight size={16} />
                  </Button>
                ) : (
                  <Button
                    kind="primary"
                    disabled={!accepted || submitting}
                    onClick={submit}
                  >
                    {submitting ? (
                      <RefreshCw size={16} className="spinning" />
                    ) : (
                      <Send size={16} />
                    )}
                    Submit demo request
                  </Button>
                )}
              </div>
            </>
          )}
        </section>
      </div>
    </>
  );
}
