import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/i18n/routing";
import { CartView } from "./cart-view";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: "sk" | "en" }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: {"sk":"Košík","en":"Cart"}[locale], robots: { index: false, follow: true } };
}

export default async function CartPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CartView locale={locale} />;
}
