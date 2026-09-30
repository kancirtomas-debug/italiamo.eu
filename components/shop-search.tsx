"use client";

import { useRouter, usePathname } from "@/lib/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Search, X } from "lucide-react";
import type { Locale } from "@/lib/i18n/routing";

export function ShopSearch({ locale }: { locale: Locale }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initial = searchParams?.get("q") ?? "";
  const [value, setValue] = useState(initial);
  const [, startTransition] = useTransition();

  // Push the query to the URL (debounced). The input is the single source of
  // truth while the user types; we never write the URL back into `value`, so
  // fast typing / dead-key diacritics can't get clobbered mid-navigation.
  // Params are read fresh from the live URL at fire time to preserve cat/sub/sort.
  useEffect(() => {
    const t = window.setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      const trimmed = value.trim();
      if (trimmed) params.set("q", trimmed);
      else params.delete("q");
      const next = params.toString();
      const current = new URLSearchParams(window.location.search).toString();
      if (next === current) return;
      startTransition(() => {
        router.replace(`${pathname}${next ? `?${next}` : ""}`, { scroll: false });
      });
    }, 220);
    return () => window.clearTimeout(t);
  }, [value, pathname, router]);

  const placeholder = locale === "en" ? "Search products…" : "Hľadať produkty…";

  return (
    <div className="relative inline-flex items-center">
      <Search
        size={15}
        strokeWidth={1.75}
        aria-hidden
        className="absolute left-3 text-ink-500 pointer-events-none"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="bg-transparent border border-cream-300 rounded-md pl-9 pr-9 py-2.5 text-[14px] text-ink-900 placeholder:text-ink-500 hover:border-ink-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900 focus-visible:ring-offset-1 focus-visible:ring-offset-white transition-colors duration-150 motion-reduce:transition-none w-[180px] sm:w-[220px]"
      />
      {value && (
        <button
          type="button"
          onClick={() => setValue("")}
          aria-label={locale === "en" ? "Clear" : "Vymazať"}
          className="absolute right-2 text-ink-500 hover:text-ink-900 p-1 rounded-full"
        >
          <X size={14} strokeWidth={2} />
        </button>
      )}
    </div>
  );
}
