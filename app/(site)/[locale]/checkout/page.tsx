import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/i18n/routing";
import { CheckoutView } from "./checkout-view";
import { COMPANY } from "@/lib/company";

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const bank = {
    holder: process.env.BANK_HOLDER ?? COMPANY.legalName,
    iban: process.env.BANK_IBAN ?? COMPANY.bank.iban,
    swift: process.env.BANK_SWIFT ?? COMPANY.bank.swift,
    name: process.env.BANK_NAME ?? COMPANY.bank.name,
    accountNumber: process.env.BANK_ACCOUNT ?? COMPANY.bank.accountNumber,
    addressLines: COMPANY.office.lines,
    ico: COMPANY.ico,
    dic: COMPANY.dic,
    icDph: COMPANY.icDph,
    register: locale === "en" ? COMPANY.register.en : COMPANY.register.sk,
  };

  return <CheckoutView locale={locale} bank={bank} />;
}
