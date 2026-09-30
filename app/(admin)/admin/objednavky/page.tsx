import { Suspense } from "react";
import Link from "next/link";
import { listOrders } from "@/lib/orders";
import type {
  OrderContact,
  OrderAddress,
  OrderItem,
  OrderPricing,
} from "@/lib/db/schema";

const eur = (n: number) => `${n.toFixed(2).replace(".", ",")} €`;

const STATUS_LABEL: Record<string, string> = {
  paid: "Zaplatené",
  awaiting_card: "Čaká na kartu",
  awaiting_bank: "Čaká na prevod",
  failed: "Neúspešné",
};

function statusClass(status: string): string {
  if (status === "paid") return "bg-olive-500/15 text-olive-700";
  if (status === "failed") return "bg-terracotta-50 text-terracotta-700";
  return "bg-cream-200 text-ink-600";
}

export default function OrdersAdminPage() {
  return (
    <section className="max-w-[1400px] mx-auto px-6 py-10">
      <header className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl">Objednávky</h1>
          <p className="text-sm text-ink-500 mt-1">
            Objednávky sa označia ako zaplatené automaticky po potvrdení platby
            cez GoPay · uchovávajú sa 1 rok, potom sa automaticky vymažú
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
        <OrdersTable />
      </Suspense>
    </section>
  );
}

async function OrdersTable() {
  const rows = await listOrders();

  if (rows.length === 0) {
    return <p className="text-sm text-ink-500">Zatiaľ žiadne objednávky.</p>;
  }

  return (
    <div className="space-y-3">
      {rows.map((r) => {
        const c = r.contact as OrderContact;
        const a = r.address as OrderAddress;
        const items = r.items as OrderItem[];
        const p = r.pricing as OrderPricing;
        const b2b = r.b2b as { company?: string } | null;
        return (
          <details
            key={r.id}
            className="group border border-ink-700/10 rounded-md bg-white overflow-hidden"
          >
            <summary className="flex flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 cursor-pointer list-none hover:bg-cream-100/60">
              <span className="font-mono text-sm tabular-nums">{r.reference}</span>
              <span className="text-[12px] text-ink-500">
                {new Date(r.createdAt).toLocaleString("sk-SK", {
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <span className="text-sm">{c.name}</span>
              <span className="text-[12px] text-ink-500">
                {r.method === "card" ? "Karta" : "Prevod"}
              </span>
              <span
                className={`ml-auto inline-block px-2 py-0.5 rounded-full text-[11px] font-mono uppercase tracking-[0.1em] ${statusClass(r.status)}`}
              >
                {STATUS_LABEL[r.status] ?? r.status}
              </span>
              <span className="font-semibold tabular-nums w-24 text-right">
                {eur(r.total)}
              </span>
            </summary>

            <div className="grid md:grid-cols-[1.4fr_1fr] gap-6 px-4 py-4 border-t border-ink-700/10 text-sm">
              <div>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-500 mb-2">
                  Položky
                </h3>
                <ul className="space-y-1">
                  {items.map((i, n) => (
                    <li key={n} className="flex justify-between gap-4">
                      <span>
                        {i.quantity}× {i.name}
                      </span>
                      <span className="tabular-nums text-ink-600">
                        {eur(i.unitPrice * i.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>
                <dl className="mt-3 pt-3 border-t border-ink-700/10 space-y-1 text-[13px]">
                  <Row label="Medzisúčet" value={eur(p.subtotal)} />
                  {p.discountAmount > 0 && (
                    <Row
                      label={`Zľava (${p.discountPct}%)`}
                      value={`-${eur(p.discountAmount)}`}
                    />
                  )}
                  <Row
                    label="Doprava"
                    value={p.shipping === 0 ? "zdarma" : eur(p.shipping)}
                  />
                  <Row label="Spolu" value={eur(p.total)} strong />
                </dl>
              </div>

              <div className="text-[13px] leading-relaxed">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-500 mb-2">
                  Zákazník
                </h3>
                <p>{c.name}</p>
                <p>
                  <a href={`mailto:${c.email}`} className="hover:text-terracotta-600">
                    {c.email}
                  </a>
                </p>
                <p>
                  <a href={`tel:${c.phone}`} className="hover:text-terracotta-600">
                    {c.phone}
                  </a>
                </p>
                <p className="mt-2 text-ink-600">
                  {a.street}
                  <br />
                  {a.zip} {a.city}
                  <br />
                  {a.country}
                </p>
                {b2b?.company && (
                  <p className="mt-2 text-ink-600">
                    <span className="text-ink-400">Firma: </span>
                    {b2b.company}
                  </p>
                )}
                {r.note && (
                  <p className="mt-2 text-ink-600">
                    <span className="text-ink-400">Poznámka: </span>
                    {r.note}
                  </p>
                )}
              </div>
            </div>
          </details>
        );
      })}
    </div>
  );
}

function Row({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className={`flex justify-between gap-4 ${strong ? "font-semibold" : ""}`}>
      <dt className="text-ink-500">{label}</dt>
      <dd className="tabular-nums">{value}</dd>
    </div>
  );
}
