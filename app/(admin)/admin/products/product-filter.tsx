"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

// Live filter for the products table. The text input is the single source of
// truth while typing; we never write the URL back into its state, so fast
// typing / dead-key diacritics can't get clobbered mid-navigation. Params are
// read fresh from the live URL at fire time so q and cat preserve each other.
export function ProductFilter({
  categories,
}: {
  categories: { id: string; sk: string }[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [q, setQ] = useState(searchParams.get("q") ?? "");
  const cat = searchParams.get("cat") ?? "";
  const [pending, startTransition] = useTransition();

  function pushParams(mutate: (p: URLSearchParams) => void) {
    const params = new URLSearchParams(window.location.search);
    mutate(params);
    const next = params.toString();
    if (next === new URLSearchParams(window.location.search).toString()) return;
    startTransition(() => {
      router.replace(`${pathname}${next ? `?${next}` : ""}`, { scroll: false });
    });
  }

  // Debounced text query.
  useEffect(() => {
    const t = window.setTimeout(() => {
      pushParams((p) => {
        const trimmed = q.trim();
        if (trimmed) p.set("q", trimmed);
        else p.delete("q");
      });
    }, 220);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, pathname, router]);

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      <div className="relative flex-1 min-w-[240px]">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Hľadať podľa názvu alebo slugu"
          aria-label="Hľadať produkty"
          className="w-full px-3 py-2 pr-8 border border-ink-700/15 rounded-md"
        />
        {q && (
          <button
            type="button"
            onClick={() => setQ("")}
            aria-label="Vymazať"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-ink-500 hover:text-ink-900 p-1 rounded-full leading-none"
          >
            ×
          </button>
        )}
      </div>
      <select
        value={cat}
        onChange={(e) =>
          pushParams((p) => {
            const v = e.target.value;
            if (v) p.set("cat", v);
            else p.delete("cat");
          })
        }
        className="px-3 py-2 border border-ink-700/15 rounded-md"
      >
        <option value="">Všetky kategórie</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.sk}
          </option>
        ))}
      </select>
      <span
        aria-hidden
        className={`text-xs text-ink-500 transition-opacity duration-150 ${
          pending ? "opacity-100" : "opacity-0"
        }`}
      >
        Filtrujem…
      </span>
    </div>
  );
}
