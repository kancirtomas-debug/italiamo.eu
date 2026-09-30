"use client";
import { useState } from "react";
import { Building2, X, ShieldCheck } from "lucide-react";
import type { Locale } from "@/lib/i18n/routing";

const COPY = {
  sk: {
    title: "Overenie firmy",
    lead: "Firemné ceny sú len pre overené firmy. IČO overíme v Registri právnických osôb, IČ DPH cez VIES.",
    ico: "IČO *",
    icDph: "IČ DPH (nepovinné)",
    email: "Firemný e-mail *",
    phone: "Telefón (nepovinné)",
    submit: "Overiť firmu",
    working: "Overujem v registri…",
    cancel: "Zrušiť",
    okTitle: "Firma overená",
    okBody: (name: string) => `${name} - firemné ceny sú odomknuté na 30 dní.`,
    close: "Zavrieť",
    errors: {
      ico_format: "IČO musí mať 6 až 8 číslic.",
      email_format: "Zadajte platný e-mail.",
      not_found: "Toto IČO sa v Registri právnických osôb nenašlo.",
      terminated: "Firma s týmto IČO je v registri vedená ako zaniknutá.",
      vat_invalid: "IČ DPH nie je platné podľa VIES.",
      registry_unavailable: "Register je momentálne nedostupný, skúste o chvíľu.",
      rate_limited: "Príliš veľa pokusov. Skúste o 10 minút.",
      revoked: "Prístup k firemným cenám bol pre toto IČO zrušený. Kontaktujte nás.",
      bad_request: "Neplatná požiadavka.",
      unknown: "Overenie zlyhalo. Skúste to znova.",
    } as Record<string, string>,
  },
  en: {
    title: "Business verification",
    lead: "Business pricing is for verified companies only. We check the company ID against the Slovak business register and the VAT ID against VIES.",
    ico: "Company ID (IČO) *",
    icDph: "VAT ID (optional)",
    email: "Company email *",
    phone: "Phone (optional)",
    submit: "Verify company",
    working: "Checking the register…",
    cancel: "Cancel",
    okTitle: "Company verified",
    okBody: (name: string) => `${name} - business pricing unlocked for 30 days.`,
    close: "Close",
    errors: {
      ico_format: "Company ID must be 6 to 8 digits.",
      email_format: "Enter a valid email address.",
      not_found: "This company ID is not in the business register.",
      terminated: "The company with this ID is recorded as dissolved.",
      vat_invalid: "The VAT ID is not valid according to VIES.",
      registry_unavailable: "The register is unavailable right now, try again shortly.",
      rate_limited: "Too many attempts. Try again in 10 minutes.",
      revoked: "Business pricing was revoked for this company ID. Please contact us.",
      bad_request: "Invalid request.",
      unknown: "Verification failed. Please try again.",
    } as Record<string, string>,
  },
} as const;

export function B2bVerifyForm({
  locale,
  onVerified,
  onClose,
}: {
  locale: Locale;
  onVerified: (company: string) => void;
  onClose: () => void;
}) {
  const t = COPY[locale === "en" ? "en" : "sk"];
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/b2b/verify", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ico: String(fd.get("ico") ?? ""),
          icDph: String(fd.get("icDph") ?? ""),
          email: String(fd.get("email") ?? ""),
          phone: String(fd.get("phone") ?? ""),
        }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        company?: string;
        reason?: string;
      };
      if (!data.ok || !data.company) {
        setError(t.errors[data.reason ?? "unknown"] ?? t.errors.unknown);
        return;
      }
      setDone(data.company);
      onVerified(data.company);
    } catch {
      setError(t.errors.unknown);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.title}
      className="fixed inset-0 z-[90] grid place-items-center p-4 bg-ink-900/50 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-[520px] rounded-2xl bg-white border border-cream-300 shadow-xl p-6 sm:p-8 relative">
        <button
          type="button"
          onClick={onClose}
          aria-label={t.cancel}
          className="absolute top-4 right-4 text-ink-500 hover:text-ink-900"
        >
          <X size={18} />
        </button>

        {done ? (
          <div className="text-center py-4">
            <ShieldCheck size={40} strokeWidth={1.5} className="mx-auto text-olive-700" />
            <h2 className="font-display text-2xl mt-4">{t.okTitle}</h2>
            <p className="body-sm mt-2 text-ink-700">{t.okBody(done)}</p>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-orange btn-lg mt-6"
            >
              {t.close}
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <div className="flex items-center gap-3">
              <Building2 size={22} strokeWidth={1.5} className="text-terracotta-600" />
              <h2 className="font-display text-2xl">{t.title}</h2>
            </div>
            <p className="body-sm text-ink-700">{t.lead}</p>

            <Field name="ico" label={t.ico} required inputMode="numeric" mono />
            <Field name="icDph" label={t.icDph} mono />
            <Field name="email" label={t.email} required type="email" />
            <Field name="phone" label={t.phone} type="tel" />

            {error && (
              <p className="text-sm text-terracotta-700 bg-terracotta-50 border border-terracotta-200 rounded-md px-3 py-2">
                {error}
              </p>
            )}

            <div className="flex gap-3 pt-1">
              <button
                type="submit"
                disabled={busy}
                className="btn btn-orange btn-lg flex-1 justify-center disabled:opacity-50"
              >
                {busy ? t.working : t.submit}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="h-12 px-5 rounded-full border border-cream-300 text-sm text-ink-500 hover:text-ink-900"
              >
                {t.cancel}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  name,
  label,
  required,
  type = "text",
  inputMode,
  mono,
}: {
  name: string;
  label: string;
  required?: boolean;
  type?: string;
  inputMode?: "numeric" | "text";
  mono?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-ink-500">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        inputMode={inputMode}
        className={`mt-1 w-full h-12 px-4 rounded-lg border border-cream-300 bg-white focus:outline-none focus:ring-2 focus:ring-terracotta-500/40 ${
          mono ? "font-mono" : ""
        }`}
      />
    </label>
  );
}
