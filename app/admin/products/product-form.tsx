"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { FormState } from "../actions";

type Categ = { id: string; sk: string };
type Initial = {
  slug?: string;
  nameSk?: string;
  nameIt?: string;
  category?: string;
  subCategory?: string | null;
  price?: number;
  compareAtPrice?: number | null;
  volume?: string | null;
  region?: string | null;
  winery?: string | null;
  vintage?: string | null;
  alcohol?: string | null;
  descriptionSk?: string;
  descriptionIt?: string;
  image?: string;
  inStock?: boolean;
  featured?: boolean;
};

export function ProductForm({
  action,
  categories,
  initial,
  mode,
}: {
  action: (state: FormState, fd: FormData) => Promise<FormState>;
  categories: Categ[];
  initial: Initial;
  mode: "create" | "edit";
}) {
  const [state, formAction, pending] = useActionState(action, {});
  const [preview, setPreview] = useState<string | null>(initial.image ?? null);

  return (
    <form action={formAction} className="grid lg:grid-cols-[1fr_320px] gap-10">
      <div className="space-y-6">
        {state.error ? (
          <p className="text-sm text-terracotta-700 bg-terracotta-50 border border-terracotta-200 rounded-md px-3 py-2">
            {state.error}
          </p>
        ) : null}

        <Row label="Názov (SK) *">
          <input
            name="nameSk"
            required
            defaultValue={initial.nameSk ?? ""}
            className="input"
          />
        </Row>
        <Row label="Názov (IT)">
          <input
            name="nameIt"
            defaultValue={initial.nameIt ?? ""}
            placeholder="Ak prázdne, použije SK názov"
            className="input"
          />
        </Row>
        {mode === "create" ? (
          <Row label="Slug">
            <input
              name="slug"
              defaultValue={initial.slug ?? ""}
              placeholder="Auto z názvu, ak prázdne"
              className="input font-mono"
            />
          </Row>
        ) : null}

        <div className="grid grid-cols-2 gap-4">
          <Row label="Kategória *">
            <select name="category" defaultValue={initial.category ?? ""} required className="input">
              <option value="" disabled>
                Vyber…
              </option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.sk}
                </option>
              ))}
            </select>
          </Row>
          <Row label="Podkategória">
            <input name="subCategory" defaultValue={initial.subCategory ?? ""} className="input" />
          </Row>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Row label="Cena (€) *">
            <input
              name="price"
              type="number"
              step="0.01"
              required
              defaultValue={initial.price ?? ""}
              className="input tabular-nums"
            />
          </Row>
          <Row label="Pôvodná cena (zľava)">
            <input
              name="compareAtPrice"
              type="number"
              step="0.01"
              defaultValue={initial.compareAtPrice ?? ""}
              className="input tabular-nums"
            />
          </Row>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Row label="Objem">
            <input name="volume" defaultValue={initial.volume ?? ""} className="input" />
          </Row>
          <Row label="Región">
            <input name="region" defaultValue={initial.region ?? ""} className="input" />
          </Row>
          <Row label="Producent">
            <input name="winery" defaultValue={initial.winery ?? ""} className="input" />
          </Row>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Row label="Ročník">
            <input name="vintage" defaultValue={initial.vintage ?? ""} className="input" />
          </Row>
          <Row label="Alkohol">
            <input name="alcohol" defaultValue={initial.alcohol ?? ""} className="input" />
          </Row>
        </div>

        <Row label="Popis (SK)">
          <textarea
            name="descriptionSk"
            rows={4}
            defaultValue={initial.descriptionSk ?? ""}
            className="input"
          />
        </Row>
        <Row label="Popis (IT)">
          <textarea
            name="descriptionIt"
            rows={4}
            defaultValue={initial.descriptionIt ?? ""}
            className="input"
          />
        </Row>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="inStock" defaultChecked={initial.inStock ?? true} />
            Skladom
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="featured" defaultChecked={initial.featured ?? false} />
            Odporúčaný (homepage)
          </label>
        </div>
      </div>

      <aside className="space-y-4">
        <div className="border border-ink-700/10 rounded-md p-4 bg-white">
          <p className="text-xs font-mono uppercase tracking-[0.15em] text-ink-500 mb-3">
            Obrázok
          </p>
          <label
            htmlFor="product-image-input"
            className="group relative block w-full aspect-square bg-cream-100 rounded mb-3 overflow-hidden cursor-pointer border-2 border-dashed border-ink-700/15 hover:border-terracotta-500 transition-colors"
          >
            {preview ? (
              <>
                <Image src={preview} alt="náhľad" fill sizes="320px" className="object-contain" />
                <div className="absolute inset-0 bg-ink-900/0 group-hover:bg-ink-900/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="text-cream-50 text-xs font-mono uppercase tracking-[0.15em]">
                    Zmeniť obrázok
                  </span>
                </div>
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-ink-300 group-hover:text-terracotta-600 transition-colors">
                <svg
                  width="56"
                  height="56"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="16" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
                <span className="text-sm font-mono uppercase tracking-[0.15em]">
                  Pridať obrázok
                </span>
              </div>
            )}
          </label>
          <input
            id="product-image-input"
            type="file"
            name="image"
            accept="image/*"
            required={mode === "create"}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) setPreview(URL.createObjectURL(f));
            }}
            className="sr-only"
          />
          <p className="text-xs text-ink-500 mt-2">
            {mode === "edit" ? "Nahrať nový obrázok = nahradí existujúci." : "JPG/PNG."}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={pending}
            className="flex-1 h-11 bg-ink-900 text-cream-50 rounded-md font-mono text-xs uppercase tracking-[0.15em] shadow-sm transition-all duration-200 ease-out hover:bg-terracotta-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-terracotta-700/20 active:translate-y-0 active:scale-[0.98] active:shadow-sm disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500/40 focus-visible:ring-offset-2"
          >
            {pending ? (
              <span className="inline-flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full border-2 border-cream-50/40 border-t-cream-50 animate-spin" aria-hidden />
                Ukladám…
              </span>
            ) : (
              "Uložiť"
            )}
          </button>
          <Link
            href="/admin/products"
            className="h-11 px-4 inline-flex items-center border border-ink-700/15 rounded-md text-sm text-ink-500 transition-all duration-200 ease-out hover:text-terracotta-600 hover:border-terracotta-500/50 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500/30 focus-visible:ring-offset-2"
          >
            Zrušiť
          </Link>
        </div>
      </aside>
    </form>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-mono uppercase tracking-[0.15em] text-ink-500">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
