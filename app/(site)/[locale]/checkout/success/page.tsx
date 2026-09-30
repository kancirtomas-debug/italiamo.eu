import { Suspense } from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import type { Locale } from "@/lib/i18n/routing";
import { COMPANY } from "@/lib/company";
import { CheckCircle2 } from "lucide-react";

export default async function SuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ ref?: string; method?: "card" | "bank" }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <section className="max-w-[760px] mx-auto px-6 lg:px-10 py-24 text-center">
      <CheckCircle2
        size={56}
        strokeWidth={1.2}
        className="mx-auto text-olive-500 mb-6"
        aria-hidden="true"
      />
      <h1 className="display-lg mb-4">{t("success.title")}</h1>
      <p className="body-lg max-w-[50ch] mx-auto">{t("success.subtitle")}</p>

      <Suspense fallback={null}>
        <OrderDetails searchParams={searchParams} locale={locale} />
      </Suspense>

      <Link
        href="/"
        className="btn btn-ghost btn-lg mt-12"
      >
        {t("success.home")}
      </Link>
    </section>
  );
}

async function OrderDetails({
  searchParams,
  locale,
}: {
  searchParams: Promise<{ ref?: string; method?: "card" | "bank" }>;
  locale: Locale;
}) {
  const { ref, method } = await searchParams;
  if (!ref) return null;

  const t = await getTranslations();

  const bank = {
    holder: process.env.BANK_HOLDER ?? COMPANY.legalName,
    iban: process.env.BANK_IBAN ?? COMPANY.bank.iban,
    swift: process.env.BANK_SWIFT ?? COMPANY.bank.swift,
    name: process.env.BANK_NAME ?? COMPANY.bank.name,
    accountNumber: process.env.BANK_ACCOUNT ?? COMPANY.bank.accountNumber,
  };

  return (
    <>
      <p className="mt-6 text-sm">
        <span className="eyebrow">{t("success.orderNumber")}</span>
        <span
          className="block mt-1 font-mono text-2xl tabular-nums text-terracotta-600"
          lang={locale}
        >
          {ref}
        </span>
      </p>

      {method === "bank" && (
        <div className="mt-10 text-left rounded-xl border border-ink-700/10 bg-cream-100/60 p-6">
          <p className="body-sm mb-4">{t("success.bankInstructions")}:</p>
          <dl className="space-y-2 text-sm">
            <Row k={t("checkout.holder")} v={bank.holder} />
            <Row
              k={t("checkout.bankAddress")}
              v={COMPANY.office.lines.join(", ")}
            />
            <Row k={t("checkout.bankName")} v={bank.name} />
            <Row k={t("checkout.accountNumber")} v={bank.accountNumber} mono />
            <Row k={t("checkout.iban")} v={bank.iban} mono />
            <Row k={t("checkout.swift")} v={bank.swift} mono />
            <Row k={t("checkout.reference")} v={ref} mono />
            <div className="pt-2 mt-2 border-t border-ink-700/10 space-y-2">
              <Row k={t("checkout.ico")} v={COMPANY.ico} mono />
              <Row k={t("checkout.dic")} v={COMPANY.dic} mono />
              <Row k={t("checkout.icDph")} v={COMPANY.icDph} mono />
              <Row
                k={t("checkout.register")}
                v={locale === "en" ? COMPANY.register.en : COMPANY.register.sk}
              />
            </div>
          </dl>
        </div>
      )}
    </>
  );
}

function Row({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="flex flex-wrap justify-between gap-x-4 gap-y-0.5">
      <dt className="text-ink-500 shrink-0">{k}</dt>
      <dd className={`text-right break-words ${mono ? "font-mono tabular-nums" : ""}`}>
        {v}
      </dd>
    </div>
  );
}
