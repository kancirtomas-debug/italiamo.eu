import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/i18n/routing";
import { CheckoutView } from "./checkout-view";

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const bank = {
    holder: process.env.BANK_HOLDER ?? "Italiamo Distribution s.r.o.",
    iban: process.env.BANK_IBAN ?? "SK00 0000 0000 0000 0000 0000",
    swift: process.env.BANK_SWIFT ?? "XXXXSKBX",
    name: process.env.BANK_NAME ?? "Tatra banka",
  };

  return <CheckoutView locale={locale} bank={bank} />;
}
