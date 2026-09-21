"use client";
import { AlertCircle, ArrowRight, Check, Eye, EyeOff, Info, Lock, Mail, User, X } from "lucide-react";
import { useState } from "react";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* ---------- shared pieces ---------- */

// Tracks values, which fields were touched and validation errors.
function useAuthForm(initial, validate, prefix) {
  const [values, setValues] = useState(initial);
  const [touched, setTouched] = useState({});
  const [attempted, setAttempted] = useState(false);
  const errors = validate(values);

  const bind = (name) => ({
    id: `${prefix}-${name}`,
    name,
    value: values[name],
    onChange: (e) => setValues((v) => ({ ...v, [name]: e.target.value })),
    onBlur: () => setTouched((t) => ({ ...t, [name]: true })),
    error: touched[name] || attempted ? errors[name] : undefined,
  });

  const submit = (onValid) => (e) => {
    e.preventDefault();
    setAttempted(true);
    const first = Object.keys(errors)[0];
    if (first) document.getElementById(`${prefix}-${first}`)?.focus();
    else onValid(values);
  };

  return { values, errors, bind, submit };
}

function Field({ label, icon: Icon, error, right, hint, className = "", ...props }) {
  const describedBy = error ? `${props.id}-error` : hint ? `${props.id}-hint` : undefined;
  return (
    <div className={className}>
      <label htmlFor={props.id} className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div
        className={`flex items-center gap-3 rounded-xl border bg-white px-4 transition focus-within:ring-2 ${
          error
            ? "border-red-400 focus-within:ring-red-100"
            : "border-gray-300 focus-within:border-black focus-within:ring-gray-200"
        }`}
      >
        <Icon className="h-4 w-4 shrink-0 text-gray-400" aria-hidden="true" />
        <input
          {...props}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-gray-400"
        />
        {right}
      </div>
      {error ? (
        <p id={`${props.id}-error`} className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${props.id}-hint`} className="mt-1.5 text-xs text-gray-500">
            {hint}
          </p>
        )
      )}
    </div>
  );
}

function PasswordField({ label = "Password", show, onToggle, ...props }) {
  return (
    <Field
      {...props}
      label={label}
      icon={Lock}
      type={show ? "text" : "password"}
      right={
        <button
          type="button"
          onClick={onToggle}
          aria-label={show ? "Hide password" : "Show password"}
          className="rounded-full p-1 text-gray-400 transition hover:text-black"
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      }
    />
  );
}

function Checkbox({ id, children, checked, onChange }) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-sm text-gray-600">
      <input id={id} type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-white transition peer-checked:border-black peer-checked:bg-black peer-focus-visible:ring-2 peer-focus-visible:ring-gray-300 [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100">
        <Check className="h-3.5 w-3.5 text-white" aria-hidden="true" />
      </span>
      <span>{children}</span>
    </label>
  );
}

// No accounts backend exists yet, so a valid submit is acknowledged honestly.
function Notice({ children, onClose }) {
  return (
    <div role="status" className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
      <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <p className="flex-1">{children}</p>
      <button type="button" onClick={onClose} aria-label="Dismiss" className="text-amber-700 hover:text-black">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

function SubmitButton({ children }) {
  return (
    <button
      type="submit"
      className="group flex w-full items-center justify-center gap-2 rounded-full bg-black px-6 py-3.5 text-sm font-medium text-white transition hover:bg-gray-700"
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
    </button>
  );
}

function Heading({ title, text }) {
  return (
    <div className="mb-6">
      <h2 className="font-serif text-3xl sm:text-4xl text-gray-700">{title}</h2>
      <p className="mt-2 text-gray-500">{text}</p>
    </div>
  );
}

/* ---------- sign in ---------- */

export function LoginForm({ onSwitch }) {
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [notice, setNotice] = useState(false);
  const form = useAuthForm({ email: "", password: "" }, (v) => {
    const e = {};
    if (!v.email.trim()) e.email = "Enter your email address.";
    else if (!EMAIL.test(v.email.trim())) e.email = "Enter a valid email address.";
    if (!v.password) e.password = "Enter your password.";
    return e;
  }, "login");

  return (
    <>
      <Heading title="Welcome back" text="Sign in to see your favorites and your cart." />
      <form noValidate onSubmit={form.submit(() => setNotice(true))} className="space-y-5">
        {notice && (
          <Notice onClose={() => setNotice(false)}>
            Accounts aren&apos;t available yet. Your details were checked but not sent or saved.
          </Notice>
        )}
        <Field {...form.bind("email")} label="Email" icon={Mail} type="email" autoComplete="email" placeholder="you@example.com" />
        <PasswordField {...form.bind("password")} show={show} onToggle={() => setShow((s) => !s)} autoComplete="current-password" placeholder="Your password" />
        <Checkbox id="login-remember" checked={remember} onChange={(e) => setRemember(e.target.checked)}>
          Keep me signed in
        </Checkbox>
        <SubmitButton>Sign in</SubmitButton>
      </form>
      <p className="mt-8 text-center text-sm text-gray-500">
        New to lemlem.?{" "}
        <button type="button" onClick={onSwitch} className="font-medium text-black underline underline-offset-4">
          Create an account
        </button>
      </p>
    </>
  );
}

/* ---------- sign up ---------- */

const RULES = [
  { label: "At least 8 characters", test: (p) => p.length >= 8 },
  { label: "A number", test: (p) => /\d/.test(p) },
  { label: "Upper and lower case letters", test: (p) => /[a-z]/.test(p) && /[A-Z]/.test(p) },
];
const LEVELS = [
  { label: "Too weak", color: "bg-red-500", text: "text-red-600" },
  { label: "Weak", color: "bg-orange-500", text: "text-orange-600" },
  { label: "Good", color: "bg-amber-400", text: "text-amber-600" },
  { label: "Strong", color: "bg-green-500", text: "text-green-600" },
];

function strength(password) {
  if (!password) return 0;
  const met = RULES.filter((r) => r.test(password)).length + (/[^A-Za-z0-9]/.test(password) ? 1 : 0);
  return Math.max(met, 1) - 1; // 0 (too weak) to 3 (strong)
}

function StrengthMeter({ password }) {
  if (!password) return null;
  const level = strength(password);
  const info = LEVELS[level];
  return (
    <div className="mt-3" aria-live="polite">
      <div className="flex gap-1.5">
        {LEVELS.map((_, i) => (
          <span key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= level ? info.color : "bg-gray-200"}`} />
        ))}
      </div>
      <p className={`mt-1.5 text-xs font-medium ${info.text}`}>{info.label}</p>
      <ul className="mt-2 space-y-1">
        {RULES.map((rule) => {
          const ok = rule.test(password);
          return (
            <li key={rule.label} className={`flex items-center gap-2 text-xs ${ok ? "text-green-600" : "text-gray-500"}`}>
              {ok ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <span className="h-1 w-1 rounded-full bg-gray-400 mx-1.5" aria-hidden="true" />}
              {rule.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function RegisterForm({ onSwitch }) {
  const [show, setShow] = useState(false);
  const [news, setNews] = useState(true);
  const [notice, setNotice] = useState(null);
  const form = useAuthForm({ first: "", last: "", email: "", password: "", confirm: "" }, (v) => {
    const e = {};
    if (!v.first.trim()) e.first = "Enter your first name.";
    if (!v.last.trim()) e.last = "Enter your last name.";
    if (!v.email.trim()) e.email = "Enter your email address.";
    else if (!EMAIL.test(v.email.trim())) e.email = "Enter a valid email address.";
    if (!v.password) e.password = "Choose a password.";
    else if (!RULES.every((r) => r.test(v.password))) e.password = "Your password doesn't meet all the requirements.";
    if (!v.confirm) e.confirm = "Repeat your password.";
    else if (v.confirm !== v.password) e.confirm = "The passwords don't match.";
    return e;
  }, "register");

  return (
    <>
      <Heading title="Create your account" text="Join lemlem. and save the products you love." />
      <form noValidate onSubmit={form.submit((v) => setNotice(v.first.trim()))} className="space-y-4">
        {notice && (
          <Notice onClose={() => setNotice(null)}>
            Thanks, {notice}. Accounts aren&apos;t available yet, so your details were checked but not sent or saved.
          </Notice>
        )}
        <div className="grid gap-4 sm:grid-cols-2">
          <Field {...form.bind("first")} label="First name" icon={User} autoComplete="given-name" placeholder="Amina" />
          <Field {...form.bind("last")} label="Last name" icon={User} autoComplete="family-name" placeholder="Bekele" />
        </div>
        <Field {...form.bind("email")} label="Email" icon={Mail} type="email" autoComplete="email" placeholder="you@example.com" />
        <div>
          <PasswordField {...form.bind("password")} show={show} onToggle={() => setShow((s) => !s)} autoComplete="new-password" placeholder="Create a password" />
          <StrengthMeter password={form.values.password} />
        </div>
        <PasswordField {...form.bind("confirm")} label="Confirm password" show={show} onToggle={() => setShow((s) => !s)} autoComplete="new-password" placeholder="Repeat your password" />
        <Checkbox id="register-news" checked={news} onChange={(e) => setNews(e.target.checked)}>
          Send me news and offers (optional)
        </Checkbox>
        <SubmitButton>Create account</SubmitButton>
      </form>
      <p className="mt-8 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <button type="button" onClick={onSwitch} className="font-medium text-black underline underline-offset-4">
          Sign in
        </button>
      </p>
    </>
  );
}
