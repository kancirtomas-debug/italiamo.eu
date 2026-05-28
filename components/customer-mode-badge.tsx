"use client";
import { useCustomerMode } from "@/lib/customer-mode";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";

export function CustomerModeBadge() {
  const mode = useCustomerMode((s) => s.mode);
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted || !mode) return null;

  const label =
    mode === "b2b"
      ? locale === "it"
        ? "Azienda"
        : "Firma"
      : locale === "it"
        ? "Privato"
        : "Súkromník";

  const ariaLabel =
    locale === "it" ? `Tipo di acquisto: ${label}` : `Typ nákupu: ${label}`;

  return (
    <span
      role="status"
      aria-label={ariaLabel}
      className="hidden sm:inline-flex items-center gap-1.5 min-h-[40px] max-w-[180px] px-3 rounded-full bg-white border border-cream-300 text-ink-900 text-[12px] font-medium select-none"
    >
      <span
        aria-hidden
        className={`shrink-0 w-1.5 h-1.5 rounded-full ${mode === "b2b" ? "bg-olive-500" : "bg-terracotta-500"}`}
      />
      <span className="truncate">{label}</span>
    </span>
  );
}
