import { Suspense } from "react";
import Link from "next/link";
import { asc, sql } from "drizzle-orm";
import { db, withDbRetry } from "@/lib/db";
import { categories, products } from "@/lib/db/schema";
import { updateCategory, deleteCategory } from "../actions";
import { DeleteCategoryButton } from "./delete-button";

const BUILT_IN = new Set([
  "vino", "kava", "cestoviny", "oleje", "octy", "pesta",
  "omacky", "cukrovinky", "bio", "krekry", "dzusy",
]);

export default function CategoriesAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; error?: string }>;
}) {
  return (
    <section className="max-w-[1100px] mx-auto px-6 py-10">
      <header className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl">Kategórie</h1>
          <p className="text-sm text-ink-500 mt-1">
            Premenovanie zmení len názov, produkty ostanú v kategórii. Vymazať
            sa dá len vlastná kategória bez produktov. Novú kategóriu pridáte vo
            formulári produktu.
          </p>
        </div>
        <Link
          href="/admin"
          className="h-11 px-5 inline-flex items-center border border-ink-700/15 rounded-md text-sm text-ink-500 hover:text-terracotta-600"
        >
          Späť
        </Link>
      </header>

      <Suspense fallback={<p className="text-sm text-ink-500">Načítavam…</p>}>
        <Flash searchParams={searchParams} />
        <CategoriesTable />
      </Suspense>
    </section>
  );
}

async function Flash({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; error?: string }>;
}) {
  const { ok, error } = await searchParams;
  if (!ok && !error) return null;
  return (
    <p
      role={error ? "alert" : "status"}
      className={`mb-6 rounded-md px-4 py-3 text-sm ${
        error
          ? "bg-terracotta-50 text-terracotta-700 border border-terracotta-300"
          : "bg-olive-50 text-olive-700 border border-olive-300"
      }`}
    >
      {error ?? ok}
    </p>
  );
}

async function CategoriesTable() {
  const [rows, counts] = await Promise.all([
    withDbRetry(() => db.select().from(categories).orderBy(asc(categories.sortOrder))),
    withDbRetry(() =>
      db
        .select({ id: products.category, n: sql<number>`count(*)::int` })
        .from(products)
        .groupBy(products.category),
    ),
  ]);
  const countOf = new Map(counts.map((c) => [c.id, c.n]));

  return (
    <div className="overflow-x-auto border border-ink-700/10 rounded-md bg-white">
      <table className="w-full text-sm">
        <thead className="bg-cream-100 text-left">
          <tr className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-500">
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Názov (SK / EN)</th>
            <th className="px-4 py-3">Produkty</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((c) => {
            const n = countOf.get(c.id) ?? 0;
            const builtIn = BUILT_IN.has(c.id);
            return (
              <tr key={c.id} className="border-t border-ink-700/10 align-middle">
                <td className="px-4 py-3 font-mono text-[12px] text-ink-500">{c.id}</td>
                <td className="px-4 py-3">
                  <form action={updateCategory} className="flex flex-wrap items-center gap-2">
                    <input type="hidden" name="id" value={c.id} />
                    <input
                      name="sk"
                      defaultValue={c.sk}
                      aria-label="Názov SK"
                      required
                      className="h-9 w-44 rounded-md border border-ink-700/15 px-2.5"
                    />
                    <input
                      name="it"
                      defaultValue={c.it}
                      aria-label="Názov EN"
                      className="h-9 w-44 rounded-md border border-ink-700/15 px-2.5"
                    />
                    <button
                      type="submit"
                      className="h-9 px-3 rounded-md border border-ink-700/15 hover:border-ink-900 hover:text-ink-900 text-ink-700 transition-colors"
                    >
                      Uložiť
                    </button>
                  </form>
                </td>
                <td className="px-4 py-3 tabular-nums">{n}</td>
                <td className="px-4 py-3 text-right">
                  {builtIn ? (
                    <span className="text-[12px] text-ink-300">základná</span>
                  ) : n > 0 ? (
                    <span className="text-[12px] text-ink-300">má produkty</span>
                  ) : (
                    <form action={deleteCategory}>
                      <input type="hidden" name="id" value={c.id} />
                      <DeleteCategoryButton name={c.sk} />
                    </form>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
