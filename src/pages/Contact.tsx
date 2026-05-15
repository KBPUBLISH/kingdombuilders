import { useState, type FormEvent } from "react";
import {
  AlertCircle,
  Mail,
  MapPin,
  Phone,
  Check,
  Loader2,
  MessageCircle,
  BookOpenCheck,
  Building2,
} from "lucide-react";
import { PageHero } from "../components/PageHero";
import { contactApi } from "../services/api";

const reasons = [
  { id: "general", label: "General inquiry", icon: MessageCircle },
  { id: "manuscript", label: "Submit a manuscript", icon: BookOpenCheck },
  { id: "partner", label: "Partner with us", icon: Building2 },
];

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  message: string;
};

export function Contact() {
  const [reason, setReason] = useState("general");
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    organization: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const sent = status === "success";
  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage(null);
    try {
      await contactApi.submit({ reason, ...form });
      setStatus("success");
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { error?: string } } })?.response?.data
          ?.error || "We couldn't send your message right now. Please try again.";
      setErrorMessage(msg);
      setStatus("error");
    }
  };

  const resetForm = () => {
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      organization: "",
      message: "",
    });
    setStatus("idle");
    setErrorMessage(null);
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>We'd love to hear from you.</>}
        description="Whether you have a manuscript, a question, or a partnership in mind — drop us a note and we'll get back within two business days."
      />

      <section className="section pt-0">
        <div className="container-page grid gap-10 lg:grid-cols-[1.4fr,1fr]">
          <div className="card p-8 sm:p-10">
            {sent ? (
              <div className="flex flex-col items-center gap-4 py-10 text-center">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-gold-400 text-ink-950">
                  <Check className="h-6 w-6" />
                </div>
                <h2 className="font-serif text-3xl font-semibold text-ink-950">
                  Thank you!
                </h2>
                <p className="max-w-md text-ink-700">
                  We received your message and will respond within two business
                  days. In the meantime, may God's peace be with you.
                </p>
                <button type="button" className="btn-ghost" onClick={resetForm}>
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-700">
                    Reason for reaching out
                  </p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-3">
                    {reasons.map((r) => {
                      const active = reason === r.id;
                      return (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => setReason(r.id)}
                          className={`flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                            active
                              ? "border-ink-900 bg-ink-900 text-parchment"
                              : "border-ink-900/15 bg-white/70 text-ink-900 hover:border-ink-900/30"
                          }`}
                        >
                          <r.icon className="h-4 w-4" />
                          {r.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="First name" required>
                    <input
                      className="input-field"
                      required
                      value={form.firstName}
                      onChange={(e) => update("firstName", e.target.value)}
                    />
                  </Field>
                  <Field label="Last name">
                    <input
                      className="input-field"
                      value={form.lastName}
                      onChange={(e) => update("lastName", e.target.value)}
                    />
                  </Field>
                  <Field label="Email" required>
                    <input
                      type="email"
                      className="input-field"
                      required
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                    />
                  </Field>
                  <Field label="Organization">
                    <input
                      className="input-field"
                      value={form.organization}
                      onChange={(e) => update("organization", e.target.value)}
                    />
                  </Field>
                </div>

                <Field label="How can we help?" required>
                  <textarea
                    rows={5}
                    className="input-field resize-y"
                    required
                    placeholder="Share as much detail as you'd like…"
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                  />
                </Field>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-primary w-full disabled:opacity-70"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                    </>
                  ) : (
                    "Send message"
                  )}
                </button>
                {status === "error" && errorMessage && (
                  <p className="inline-flex items-center gap-2 text-sm text-red-700">
                    <AlertCircle className="h-4 w-4" /> {errorMessage}
                  </p>
                )}
                <p className="text-xs text-ink-700">
                  By submitting this form, you agree to be contacted at the email
                  provided. We never share your information.
                </p>
              </form>
            )}
          </div>

          <aside className="space-y-6">
            <div className="card p-7">
              <p className="eyebrow">Direct lines</p>
              <ul className="mt-4 space-y-4 text-sm text-ink-700">
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 text-gold-700" />
                  <div>
                    <p className="font-semibold text-ink-950">Email</p>
                    <a
                      className="link-underline"
                      href="mailto:hello@kbpublish.org"
                    >
                      hello@kbpublish.org
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 text-gold-700" />
                  <div>
                    <p className="font-semibold text-ink-950">Phone</p>
                    <p>(555) 010-2468 · Mon–Fri, 9a–5p ET</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-gold-700" />
                  <div>
                    <p className="font-semibold text-ink-950">Mail</p>
                    <p>PO Box 1207<br />Anywhere, USA 00000</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="card overflow-hidden">
              <div className="bg-ink-950 p-7 text-parchment">
                <p className="font-serif text-xl">
                  "Cast all your anxiety on Him because He cares for you."
                </p>
                <p className="mt-2 text-sm text-parchment/70">— 1 Peter 5:7</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-ink-700">
        {label}
        {required && <span className="text-gold-700"> *</span>}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
