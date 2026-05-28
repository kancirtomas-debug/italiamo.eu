"use client";
import { useTranslations } from "next-intl";
import { useRouter } from "@/lib/i18n/navigation";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/routing";
import { CreditCard, Landmark } from "lucide-react";

type Bank = { holder: string; iban: string; swift: string; name: string };

export function CheckoutView({
  locale,
  bank,
}: {
  locale: Locale;
  bank: Bank;
}) {
  const t = useTranslations();
  const router = useRouter();
  const items = useCart((s) => s.items);
  const subtotal = useCart((s) => s.subtotal());
  const clear = useCart((s) => s.clear);
  const [pay, setPay] = useState<"card" | "bank">("card");
  const [submitting, setSubmitting] = useState(false);

  const shipping = subtotal >= 75 ? 0 : 5.9;
  const total = subtotal + shipping;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (items.length === 0) return;
    setSubmitting(true);

    const fd = new FormData(e.currentTarget);
    const payload = {
      method: pay,
      locale,
      contact: {
        name: fd.get("name"),
        email: fd.get("email"),
        phone: fd.get("phone"),
      },
      address: {
        street: fd.get("street"),
        city: fd.get("city"),
        zip: fd.get("zip"),
        country: fd.get("country"),
      },
      note: fd.get("note"),
      items,
      total,
    };

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      setSubmitting(false);
      alert("Error");
      return;
    }

    const data = await res.json();

    if (data.gopayUrl) {
      window.location.href = data.gopayUrl;
      return;
    }

    clear();
    router.push(`/checkout/success?ref=${data.reference}&method=${pay}`);
  }

  return (
    <section className="max-w-[1200px] mx-auto px-6 lg:px-10 py-16 grid lg:grid-cols-5 gap-12">
      <form onSubmit={onSubmit} className="lg:col-span-3 space-y-10">
        <div>
          <h1 className="display-lg mb-2">{t("checkout.title")}</h1>
        </div>

        <fieldset className="space-y-5">
          <legend className="eyebrow mb-3">{t("checkout.contact")}</legend>
          <Field name="name" label={t("checkout.name")} required />
          <div className="grid sm:grid-cols-2 gap-5">
            <Field name="email" type="email" label={t("checkout.email")} required />
            <Field name="phone" type="tel" label={t("checkout.phone")} required />
          </div>
        </fieldset>

        <fieldset className="space-y-5">
          <legend className="eyebrow mb-3">{t("checkout.address")}</legend>
          <Field name="street" label={t("checkout.street")} required />
          <div className="grid sm:grid-cols-3 gap-5">
            <Field name="city" label={t("checkout.city")} required />
            <Field name="zip" label={t("checkout.zip")} required />
            <Field
              name="country"
              label={t("checkout.country")}
              defaultValue={locale === "it" ? "Italia" : "Slovensko"}
              required
            />
          </div>
        </fieldset>

        <fieldset>
          <legend className="eyebrow mb-3">{t("checkout.payment")}</legend>
          <div className="grid sm:grid-cols-2 gap-3">
            <PayOption
              icon={<CreditCard size={18} strokeWidth={1.5} />}
              active={pay === "card"}
              onClick={() => setPay("card")}
              title={t("checkout.card")}
              desc={t("checkout.cardDesc")}
            />
            <PayOption
              icon={<Landmark size={18} strokeWidth={1.5} />}
              active={pay === "bank"}
              onClick={() => setPay("bank")}
              title={t("checkout.bank")}
              desc={t("checkout.bankDesc")}
            />
          </div>

          {pay === "bank" && (
            <div className="mt-5 rounded-lg border border-ink-700/10 bg-cream-100/60 p-5 text-sm space-y-2">
              <p className="eyebrow mb-2">{t("checkout.bankDetails")}</p>
              <Detail k={t("checkout.holder")} v={bank.holder} />
              <Detail k={t("checkout.iban")} v={bank.iban} mono />
              <Detail k={t("checkout.swift")} v={bank.swift} mono />
              <Detail k="Banka" v={bank.name} />
            </div>
          )}
        </fieldset>

        <Field name="note" label={t("checkout.note")} multiline />

        <button
          disabled={submitting || items.length === 0}
          className="h-13 px-8 rounded-full bg-terracotta-600 text-cream-50 hover:bg-terracotta-700 disabled:opacity-50 font-mono text-xs uppercase tracking-[0.15em]"
        >
          {submitting ? "…" : t("checkout.place")}
        </button>
      </form>

      <aside className="lg:col-span-2">
        <div className="sticky top-24 rounded-xl border border-ink-700/10 bg-cream-100/50 p-6">
          <h2 className="font-display text-lg mb-4">
            {t("checkout.summary")}
          </h2>
          <ul className="divide-y divide-ink-700/10 mb-4">
            {items.map((it) => (
              <li key={it.slug} className="py-3 flex justify-between gap-3 text-sm">
                <span className="flex-1">
                  {it.name}
                  <span className="text-ink-300"> × {it.quantity}</span>
                </span>
                <span className="tabular-nums">
                  {formatPrice(it.price * it.quantity, locale)}
                </span>
              </li>
            ))}
          </ul>
          <div className="space-y-2 text-sm border-t border-ink-700/10 pt-4">
            <Row label={t("cart.subtotal")} value={formatPrice(subtotal, locale)} />
            <Row label={t("cart.shipping")} value={shipping === 0 ? "0,00 €" : formatPrice(shipping, locale)} />
            <div className="border-t border-ink-700/10 pt-2">
              <Row bold label={t("cart.total")} value={formatPrice(total, locale)} />
            </div>
          </div>
        </div>
      </aside>
    </section>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  defaultValue,
  multiline,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  multiline?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[0.7rem] font-mono uppercase tracking-[0.15em] text-ink-500">
        {label}
        {required && <span className="text-terracotta-600"> *</span>}
      </span>
      {multiline ? (
        <textarea
          name={name}
          rows={3}
          className="mt-2 w-full rounded-md border border-ink-700/15 bg-cream-50 px-4 py-3 text-sm focus:border-terracotta-500 focus:outline-none transition"
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          defaultValue={defaultValue}
          className="mt-2 w-full rounded-md border border-ink-700/15 bg-cream-50 px-4 py-3 text-sm focus:border-terracotta-500 focus:outline-none transition"
        />
      )}
    </label>
  );
}

function PayOption({
  active,
  onClick,
  title,
  desc,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  desc: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left p-5 rounded-lg border transition-colors ${
        active
          ? "border-terracotta-500 bg-terracotta-50"
          : "border-ink-700/15 hover:border-terracotta-500/50"
      }`}
    >
      <div className="flex items-center gap-2 mb-2 text-terracotta-600">
        {icon}
        <span className="font-mono text-xs uppercase tracking-[0.15em]">
          {title}
        </span>
      </div>
      <p className="text-xs text-ink-500 leading-relaxed">{desc}</p>
    </button>
  );
}

function Detail({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-ink-500">{k}</span>
      <span className={mono ? "font-mono tabular-nums" : ""}>{v}</span>
    </div>
  );
}

function Row({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div className={`flex justify-between ${bold ? "font-display text-base" : ""}`}>
      <span className="text-ink-500">{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  );
}
