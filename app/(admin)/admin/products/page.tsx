import { Suspense } from "react";
import Link from "next/link";
import { ProductTable } from "./product-table";
import { NewCategoryButton } from "./new-category-button";
import { ProductFilter } from "./product-filter";
import { getCategories } from "@/lib/queries";
import { db, withDbRetry } from "@/lib/db";
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
        <div className="flex items-center gap-3">
          <NewCategoryButton />
          <Link
            href="/admin/products/new"
            className="group inline-flex items-center gap-2 h-11 px-5 bg-ink-900 text-cream-50 rounded-md font-mono text-xs uppercase tracking-[0.15em] shadow-sm transition-all duration-200 ease-out hover:bg-terracotta-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-terracotta-700/20 active:translate-y-0 active:scale-[0.98] active:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500/40 focus-visible:ring-offset-2"
          >
            <span className="inline-block transition-transform duration-300 ease-out group-hover:rotate-90">
              +
            </span>
            <span>Nový produkt</span>
          </Link>
        </div>
      </header>

      <Suspense fallback={<p className="text-sm text-ink-500">Načítavam filter…</p>}>
        <FilterForm />
      </Suspense>

      <Suspense fallback={<p className="text-sm text-ink-500">Načítavam produkty…</p>}>
        <ProductList searchParams={searchParams} />
      </Suspense>
    </section>
  );
}

async function loadFiltered({ q, cat }: { q?: string; cat?: string }) {
  const rows = await withDbRetry(() =>
    db
      .select()
      .from(products)
      .orderBy(asc(products.sortOrder), asc(products.id)),
  );
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

async function FilterForm() {
  const allCategories = await getCategories();
  return (
    <ProductFilter
      categories={allCategories.map((c) => ({ id: c.id, sk: c.sk }))}
    />
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
