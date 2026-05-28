"use client";

import { useRouter, usePathname } from "@/lib/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useTransition } from "react";
import type { Locale } from "@/lib/i18n/routing";

export type SortKey = "featured" | "price-asc" | "price-desc" | "sale";

const LABELS: Record<Locale, { label: string; options: Record<SortKey, string> }> = {
  sk: {
    label: "Zoradiť",
    options: {
      featured: "Odporúčané",
      "price-asc": "Cena: od najnižšej",
      "price-desc": "Cena: od najvyššej",
      sale: "V akcii",
    },
  },
  it: {
    label: "Ordina",
    options: {
      featured: "Consigliati",
      "price-asc": "Prezzo: crescente",
      "price-desc": "Prezzo: decrescente",
      sale: "In offerta",
    },
  },
};

export function ShopSort({
  locale,
  current,
}: {
  locale: Locale;
  current: SortKey;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const { label, options } = LABELS[locale];

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value as SortKey;
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    if (value === "featured") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }
    const query = params.toString();
    startTransition(() => {
      router.replace(`${pathname}${query ? `?${query}` : ""}`, { scroll: false });
    });
  }

  return (
    <label className="inline-flex items-center gap-2 font-sans text-[12px] uppercase tracking-[0.08em] text-ink-500">
      <span className="sr-only sm:not-sr-only">{label}</span>
      <span aria-hidden className="hidden sm:inline">:</span>
      <span className="relative inline-flex items-center">
        <select
          aria-label={label}
          value={current}
          onChange={onChange}
          disabled={isPending}
          className="appearance-none bg-transparent border border-cream-300 rounded-md pl-3 pr-8 py-1.5 text-[12px] uppercase tracking-[0.08em] text-ink-900 font-medium cursor-pointer hover:border-ink-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900 focus-visible:ring-offset-1 focus-visible:ring-offset-white disabled:opacity-60 transition-colors duration-150 motion-reduce:transition-none"
        >
          {(Object.keys(options) as SortKey[]).map((key) => (
            <option key={key} value={key}>
              {options[key]}
            </option>
          ))}
        </select>
        <svg
          aria-hidden
          viewBox="0 0 12 12"
          className="pointer-events-none absolute right-2 w-3 h-3 text-ink-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M3 4.5 6 7.5 9 4.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </label>
  );
}
