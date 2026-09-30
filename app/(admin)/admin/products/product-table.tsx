"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { deleteProducts, reorderProducts, setProductsFeatured } from "../actions";

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
  // Staged ★ changes: id -> desired featured value. Only ids that differ from the saved row live here.
  const [featuredDraft, setFeaturedDraft] = useState<Map<number, boolean>>(new Map());
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

  // Ticking a ★ only stages the change - nothing hits the DB until "Potvrdiť výber".
  // Local-only, so the box flips instantly like the select checkbox.
  function onToggleFeatured(id: number, featured: boolean) {
    setFeaturedDraft((prev) => {
      const next = new Map(prev);
      const saved = rows.find((r) => r.id === id)?.featured;
      if (saved === featured) next.delete(id);
      else next.set(id, featured);
      return next;
    });
  }

  const isFeatured = (r: Row) => featuredDraft.get(r.id) ?? r.featured;

  function onConfirmFeatured() {
    if (featuredDraft.size === 0) return;
    const updates = [...featuredDraft].map(([id, featured]) => ({ id, featured }));
    startTransition(async () => {
      await setProductsFeatured(updates);
      setRows((prev) =>
        prev.map((r) => (featuredDraft.has(r.id) ? { ...r, featured: featuredDraft.get(r.id)! } : r))
      );
      setFeaturedDraft(new Map());
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
          {featuredDraft.size > 0
            ? `${featuredDraft.size} zmien v odporúčaných - neuložené`
            : selected.size > 0
              ? `${selected.size} vybraných`
              : "Vyber produkty pre hromadnú akciu"}
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
        {featuredDraft.size > 0 ? (
          <button
            onClick={onConfirmFeatured}
            disabled={isPending}
            className="h-9 px-4 bg-terracotta-600 text-cream-50 rounded-md text-sm shadow-sm transition-all duration-200 ease-out hover:bg-terracotta-700 hover:-translate-y-0.5 hover:shadow-md hover:shadow-terracotta-700/30 active:translate-y-0 active:scale-[0.97] active:shadow-sm disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-sm motion-safe:animate-[fadeInUp_220ms_ease-out] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500/40 focus-visible:ring-offset-2"
          >
            Potvrdiť výber ({featuredDraft.size})
          </button>
        ) : null}
        {isPending ? <span className="text-xs text-ink-500">Ukladám…</span> : null}
      </div>

      <div className="overflow-x-auto border border-ink-700/10 rounded-md bg-white">
        <table className="w-full text-sm">
          <thead className="bg-cream-100 text-left text-xs font-mono uppercase tracking-[0.12em] text-ink-500">
            <tr>
              <th className="px-3 py-3 w-28">
                <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="admin-check"
                    checked={selected.size === rows.length && rows.length > 0}
                    onChange={toggleAll}
                  />
                  <span>Vymazať</span>
                </label>
              </th>
              <th className="px-3 py-3 w-8">⠿</th>
              <th className="px-3 py-3 w-16">Foto</th>
              <th className="px-3 py-3">Názov</th>
              <th className="px-3 py-3">Kategória</th>
              <th className="px-3 py-3 text-right">Cena</th>
              <th className="px-3 py-3">Sklad</th>
              <th className="px-3 py-3 w-28">Odporúčané</th>
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
                    className="admin-check"
                    checked={selected.has(r.id)}
                    onChange={() => toggle(r.id)}
                    aria-label={`Vybrať ${r.nameSk} na vymazanie`}
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
                </td>
                <td className="px-3 py-2">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="admin-check"
                      checked={isFeatured(r)}
                      onChange={(e) => onToggleFeatured(r.id, e.target.checked)}
                      aria-label={`${r.nameSk} - odporúčané na homepage`}
                    />
                    <span
                      className={`text-sm leading-none px-2 py-1.5 rounded border transition-colors duration-200 ${
                        isFeatured(r)
                          ? "text-terracotta-700 bg-terracotta-50"
                          : "text-ink-300 bg-ink-50"
                      } ${
                        featuredDraft.has(r.id)
                          ? "border-dashed border-terracotta-300"
                          : "border-transparent"
                      }`}
                    >
                      ★
                    </span>
                  </label>
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
