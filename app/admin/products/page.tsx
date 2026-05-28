import { Suspense } from "react";
import Link from "next/link";
import { ProductTable } from "./product-table";
import { getCategories } from "@/lib/queries";
import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import { asc } from "drizzle-orm";

export default function ProductsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; cat?: string }>;
}) {
  return (
    <section className="max-w-[1400px] mx-auto px-6 py-10">
      <header className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl">Produkty</h1>
          <Suspense fallback={<p className="text-sm text-ink-500 mt-1">···</p>}>
            <CountSummary searchParams={searchParams} />
          </Suspense>
        </div>
        <Link
          href="/admin/products/new"
          className="group inline-flex items-center gap-2 h-11 px-5 bg-ink-900 text-cream-50 rounded-md font-mono text-xs uppercase tracking-[0.15em] shadow-sm transition-all duration-200 ease-out hover:bg-terracotta-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-terracotta-700/20 active:translate-y-0 active:scale-[0.98] active:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500/40 focus-visible:ring-offset-2"
        >
          <span className="inline-block transition-transform duration-300 ease-out group-hover:rotate-90">
            +
          </span>
          <span>Nový produkt</span>
        </Link>
      </header>

      <Suspense fallback={<p className="text-sm text-ink-500">Načítavam filter…</p>}>
        <FilterForm searchParams={searchParams} />
      </Suspense>

      <Suspense fallback={<p className="text-sm text-ink-500">Načítavam produkty…</p>}>
        <ProductList searchParams={searchParams} />
      </Suspense>
    </section>
  );
}

async function loadFiltered({ q, cat }: { q?: string; cat?: string }) {
  const rows = await db
    .select()
    .from(products)
    .orderBy(asc(products.sortOrder), asc(products.id));
  const filtered = rows.filter((p) => {
    if (cat && p.category !== cat) return false;
    if (q) {
      const needle = q.toLowerCase();
      if (
        !p.nameSk.toLowerCase().includes(needle) &&
        !p.slug.toLowerCase().includes(needle)
      ) {
        return false;
      }
    }
    return true;
  });
  return { rows, filtered };
}

async function CountSummary({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; cat?: string }>;
}) {
  const { q, cat } = await searchParams;
  const { rows, filtered } = await loadFiltered({ q, cat });
  return (
    <p className="text-sm text-ink-500 mt-1 tabular-nums">
      {filtered.length} z {rows.length} produktov
    </p>
  );
}

async function FilterForm({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; cat?: string }>;
}) {
  const { q, cat } = await searchParams;
  const allCategories = await getCategories();
  return (
    <form method="get" className="flex flex-wrap gap-3 mb-6">
      <input
        name="q"
        defaultValue={q ?? ""}
        placeholder="Hľadať podľa názvu alebo slugu"
        className="flex-1 min-w-[240px] px-3 py-2 border border-ink-700/15 rounded-md"
      />
      <select
        name="cat"
        defaultValue={cat ?? ""}
        className="px-3 py-2 border border-ink-700/15 rounded-md"
      >
        <option value="">Všetky kategórie</option>
        {allCategories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.sk}
          </option>
        ))}
      </select>
      <button className="h-10 px-4 border border-ink-700/20 rounded-md text-sm transition-all duration-200 ease-out hover:bg-ink-900 hover:text-cream-50 hover:border-ink-900 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900/30 focus-visible:ring-offset-2">
        Filtrovať
      </button>
    </form>
  );
}

async function ProductList({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; cat?: string }>;
}) {
  const { q, cat } = await searchParams;
  const { filtered } = await loadFiltered({ q, cat });
  return <ProductTable rows={filtered} />;
}
