import { useState, type FormEvent } from "react";
import { AlertCircle, Check, Loader2, Mail, Sparkles } from "lucide-react";
import { emailApi } from "../services/api";

type Variant = "card" | "inline";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export function NewsletterCTA({ variant = "card" }: { variant?: Variant }) {
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState<string | null>(null);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  async function submit(payload: { email: string; parentName?: string }) {
    setStatus("loading");
    setMessage(null);
    try {
      const res = await emailApi.subscribe({
        email: payload.email,
        parentName: payload.parentName,
        source: "kbpublish_site_newsletter",
      });
      setStatus("success");
      setMessage(
        res.isNewSubscriber === false
          ? "You're already on the list — thanks!"
          : "Welcome to the family.",
      );
    } catch (err: unknown) {
      const fallback = "Something went wrong. Please try again.";
      const msg =
        (err as { response?: { data?: { error?: string } } })?.response?.data
          ?.error || fallback;
      setStatus("error");
      setMessage(msg);
    }
  }

  if (variant === "inline") {
    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      submit({ email: form.email });
    };
    const isSuccess = status === "success";
    return (
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-full max-w-md flex-col items-center gap-2"
      >
        <div className="flex w-full items-center rounded-full border border-ink-900/15 bg-white/90 p-1.5 shadow-soft">
          <span className="pl-3 pr-1 text-ink-700">
            <Mail className="h-4 w-4" />
          </span>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="Enter your email"
            className="flex-1 bg-transparent px-2 py-2 text-sm text-ink-900 placeholder:text-ink-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={status === "loading" || isSuccess}
            className="btn-gold px-5 py-2.5 text-xs disabled:opacity-70"
          >
            {status === "loading" ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : isSuccess ? (
              "Subscribed"
            ) : (
              "Subscribe"
            )}
          </button>
        </div>
        {message && (
          <p
            className={`text-xs ${
              status === "error" ? "text-red-700" : "text-ink-700"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    );
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    submit({
      email: form.email,
      parentName: `${form.firstName} ${form.lastName}`.trim() || undefined,
    });
  };
  const isSuccess = status === "success";

  return (
    <div className="relative overflow-hidden rounded-3xl bg-ink-950 p-8 text-parchment shadow-glow sm:p-10 lg:p-12">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-noise opacity-25" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gold-500/30 blur-3xl"
      />
      <div className="relative grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="eyebrow text-gold-300">
            <Sparkles className="h-3.5 w-3.5" /> Newsletter
          </p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
            Receive devotionals, stories, and<br className="hidden sm:block" /> new releases.
          </h2>
          <p className="mt-4 max-w-md text-parchment/75">
            Once a month, never spammy. Be the first to know about new titles,
            ministry stories, and ways to participate in our mission.
          </p>
        </div>

        {isSuccess ? (
          <div className="rounded-2xl border border-gold-300/40 bg-gold-400/10 p-6 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-gold-400 text-ink-950">
              <Check className="h-5 w-5" />
            </div>
            <p className="mt-3 font-serif text-xl">
              {message || "Welcome to the family."}
            </p>
            <p className="mt-1 text-sm text-parchment/70">
              Check your inbox for the next issue.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-2">
            <input
              type="text"
              required
              placeholder="First Name"
              value={form.firstName}
              onChange={(e) => update("firstName", e.target.value)}
              className="input-field !border-parchment/15 !bg-parchment/[0.06] !text-parchment placeholder:text-parchment/40"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={form.lastName}
              onChange={(e) => update("lastName", e.target.value)}
              className="input-field !border-parchment/15 !bg-parchment/[0.06] !text-parchment placeholder:text-parchment/40"
            />
            <input
              type="email"
              required
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="input-field !border-parchment/15 !bg-parchment/[0.06] !text-parchment placeholder:text-parchment/40 sm:col-span-2"
            />
            <input
              type="tel"
              placeholder="Phone (Optional)"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className="input-field !border-parchment/15 !bg-parchment/[0.06] !text-parchment placeholder:text-parchment/40 sm:col-span-2"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-gold sm:col-span-2 disabled:opacity-70"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Subscribing…
                </>
              ) : (
                "Subscribe to Newsletter"
              )}
            </button>
            {status === "error" && message && (
              <p className="sm:col-span-2 inline-flex items-center gap-1.5 text-sm text-red-300">
                <AlertCircle className="h-4 w-4" /> {message}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
