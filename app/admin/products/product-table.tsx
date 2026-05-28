"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { deleteProducts, reorderProducts } from "../actions";

type Row = {
  id: number;
  slug: string;
  nameSk: string;
  category: string;
  price: number;
  image: string;
  inStock: boolean;
  featured: boolean;
  sortOrder: number;
};

export function ProductTable({ rows: initialRows }: { rows: Row[] }) {
  const [rows, setRows] = useState(initialRows);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [dragId, setDragId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const toggle = (id: number) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };
  const toggleAll = () =>
    setSelected(selected.size === rows.length ? new Set() : new Set(rows.map((r) => r.id)));

  function onDragStart(id: number) {
    setDragId(id);
  }
  function onDragOver(e: React.DragEvent, overId: number) {
    e.preventDefault();
    if (dragId === null || dragId === overId) return;
    const fromIdx = rows.findIndex((r) => r.id === dragId);
    const toIdx = rows.findIndex((r) => r.id === overId);
    if (fromIdx === -1 || toIdx === -1) return;
    const next = [...rows];
    const [moved] = next.splice(fromIdx, 1);
    next.splice(toIdx, 0, moved);
    setRows(next);
  }
  function onDragEnd() {
    if (dragId === null) return;
    setDragId(null);
    startTransition(async () => {
      await reorderProducts(rows.map((r) => r.id));
    });
  }

  async function onBulkDelete() {
    if (selected.size === 0) return;
    if (!confirm(`Naozaj zmazať ${selected.size} produktov? Akcia je nezvratná.`)) return;
    const fd = new FormData();
    selected.forEach((id) => fd.append("ids", String(id)));
    startTransition(async () => {
      await deleteProducts(fd);
      setRows(rows.filter((r) => !selected.has(r.id)));
      setSelected(new Set());
    });
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-3 min-h-[40px]">
        <span className="text-sm text-ink-500">
          {selected.size > 0 ? `${selected.size} vybraných` : "Vyber produkty pre hromadnú akciu"}
        </span>
        {selected.size > 0 ? (
          <button
            onClick={onBulkDelete}
            disabled={isPending}
            className="h-9 px-4 bg-terracotta-600 text-cream-50 rounded-md text-sm shadow-sm transition-all duration-200 ease-out hover:bg-terracotta-700 hover:-translate-y-0.5 hover:shadow-md hover:shadow-terracotta-700/30 active:translate-y-0 active:scale-[0.97] active:shadow-sm disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-sm motion-safe:animate-[fadeInUp_220ms_ease-out] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500/40 focus-visible:ring-offset-2"
          >
            Zmazať vybrané ({selected.size})
          </button>
        ) : null}
        {isPending ? <span className="text-xs text-ink-500">Ukladám…</span> : null}
      </div>

      <div className="overflow-x-auto border border-ink-700/10 rounded-md bg-white">
        <table className="w-full text-sm">
          <thead className="bg-cream-100 text-left text-xs font-mono uppercase tracking-[0.12em] text-ink-500">
            <tr>
              <th className="px-3 py-3 w-10">
                <input
                  type="checkbox"
                  checked={selected.size === rows.length && rows.length > 0}
                  onChange={toggleAll}
                />
              </th>
              <th className="px-3 py-3 w-8">⠿</th>
              <th className="px-3 py-3 w-16">Foto</th>
              <th className="px-3 py-3">Názov</th>
              <th className="px-3 py-3">Kategória</th>
              <th className="px-3 py-3 text-right">Cena</th>
              <th className="px-3 py-3">Sklad</th>
              <th className="px-3 py-3 w-24"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.id}
                draggable
                onDragStart={() => onDragStart(r.id)}
                onDragOver={(e) => onDragOver(e, r.id)}
                onDragEnd={onDragEnd}
                className={`border-t border-ink-700/5 hover:bg-cream-50 ${
                  dragId === r.id ? "opacity-50" : ""
                } ${selected.has(r.id) ? "bg-terracotta-50/50" : ""}`}
              >
                <td className="px-3 py-2">
                  <input
                    type="checkbox"
                    checked={selected.has(r.id)}
                    onChange={() => toggle(r.id)}
                  />
                </td>
                <td className="px-3 py-2 cursor-move text-ink-300 text-lg leading-none select-none">
                  ⠿
                </td>
                <td className="px-3 py-2">
                  <div className="relative w-12 h-12 bg-cream-100 rounded overflow-hidden">
                    <Image
                      src={r.image}
                      alt={r.nameSk}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                </td>
                <td className="px-3 py-2">
                  <Link
                    href={`/admin/products/${r.slug}`}
                    className="font-display text-ink-900 hover:text-terracotta-600"
                  >
                    {r.nameSk}
                  </Link>
                  <div className="text-xs text-ink-300 font-mono">{r.slug}</div>
                </td>
                <td className="px-3 py-2 text-ink-500">{r.category}</td>
                <td className="px-3 py-2 text-right tabular-nums">{r.price.toFixed(2)} €</td>
                <td className="px-3 py-2">
                  {r.inStock ? (
                    <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                      Skladom
                    </span>
                  ) : (
                    <span className="text-xs text-ink-500 bg-ink-50 px-2 py-1 rounded">
                      Vypredané
                    </span>
                  )}
                  {r.featured ? (
                    <span className="ml-2 text-xs text-terracotta-700 bg-terracotta-50 px-2 py-1 rounded">
                      ★
                    </span>
                  ) : null}
                </td>
                <td className="px-3 py-2 text-right">
                  <Link
                    href={`/admin/products/${r.slug}`}
                    className="group inline-flex items-center gap-1 text-xs text-ink-500 transition-colors duration-200 hover:text-terracotta-600"
                  >
                    <span>Upraviť</span>
                    <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1">→</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
