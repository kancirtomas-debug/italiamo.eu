import { Suspense } from "react";
import { desc } from "drizzle-orm";
import Link from "next/link";
import { db, withDbRetry } from "@/lib/db";
import { b2bAccounts } from "@/lib/db/schema";
import { setB2bStatus } from "../actions";

export default function B2bAdminPage() {
  return (
    <section className="max-w-[1400px] mx-auto px-6 py-10">
      <header className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl">Firemní zákazníci</h1>
          <p className="text-sm text-ink-500 mt-1">
            Overené cez verejný register · zrušením prístupu firma stratí firemné
            ceny pri najbližšej objednávke
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
        <B2bTable />
      </Suspense>
    </section>
  );
}

async function B2bTable() {
  const rows = await withDbRetry(() =>
    db.select().from(b2bAccounts).orderBy(desc(b2bAccounts.createdAt)),
  );

  return (
    <>
      {rows.length === 0 ? (
        <p className="text-sm text-ink-500">Zatiaľ sa neoverila žiadna firma.</p>
      ) : (
        <div className="overflow-x-auto border border-ink-700/10 rounded-md bg-white">
          <table className="w-full text-sm">
            <thead className="bg-cream-100 text-left">
              <tr className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-500">
                <th className="px-4 py-3">Firma</th>
                <th className="px-4 py-3">IČO</th>
                <th className="px-4 py-3">IČ DPH</th>
                <th className="px-4 py-3">Kontakt</th>
                <th className="px-4 py-3">Overené</th>
                <th className="px-4 py-3">Stav</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-ink-700/10 align-top">
                  <td className="px-4 py-3">
                    <span className="font-medium">{r.company}</span>
                    {r.address && (
                      <span className="block text-[12px] text-ink-500">{r.address}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-mono tabular-nums">{r.ico}</td>
                  <td className="px-4 py-3 font-mono">
                    {r.icDph ?? "-"}
                    {r.vatValid === true && (
                      <span className="block text-[11px] text-olive-700">VIES OK</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <a href={`mailto:${r.email}`} className="hover:text-terracotta-600">
                      {r.email}
                    </a>
                    {r.phone && (
                      <span className="block text-[12px] text-ink-500">{r.phone}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-[12px] text-ink-500">
                    {r.verifiedVia}
                    <span className="block">
                      {new Date(r.createdAt).toLocaleDateString("sk-SK")}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-mono uppercase tracking-[0.1em] ${
                        r.status === "approved"
                          ? "bg-olive-500/15 text-olive-700"
                          : "bg-terracotta-50 text-terracotta-700"
                      }`}
                    >
                      {r.status === "approved" ? "aktívna" : "zrušená"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <form action={setB2bStatus}>
                      <input type="hidden" name="ico" value={r.ico} />
                      <input
                        type="hidden"
                        name="status"
                        value={r.status === "approved" ? "rejected" : "approved"}
                      />
                      <button className="h-9 px-3 border border-ink-700/15 rounded-md text-xs font-mono uppercase tracking-[0.1em] text-ink-500 hover:text-terracotta-600 hover:border-terracotta-500/50">
                        {r.status === "approved" ? "Zrušiť" : "Obnoviť"}
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
