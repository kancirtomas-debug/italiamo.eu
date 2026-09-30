"use client";
import { useVerifiedCustomerMode } from "@/lib/customer-mode";
import { useLocale } from "next-intl";

export function CustomerModeBadge() {
  const { mode, company, mounted } = useVerifiedCustomerMode();
  const locale = useLocale();

  if (!mounted || !mode) return null;

  const label =
    mode === "b2b"
      ? company ?? (locale === "en" ? "Business" : "Firma")
      : locale === "en"
        ? "Private"
        : "Súkromník";

  const ariaLabel =
    locale === "en" ? `Purchase type: ${label}` : `Typ nákupu: ${label}`;

  return (
    <span
      role="status"
      aria-label={ariaLabel}
      className="hidden sm:inline-flex items-center min-h-[48px] max-w-[200px] px-5 rounded-full bg-white border border-cream-300 text-ink-900 text-[14px] font-medium select-none"
    >
      <span className="truncate">{label}</span>
    </span>
  );
}
