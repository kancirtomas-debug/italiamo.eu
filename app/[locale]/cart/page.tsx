import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/i18n/routing";
import { CartView } from "./cart-view";

export default async function CartPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CartView locale={locale} />;
}
