"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { FormState } from "../actions";
import { createCategory } from "../actions";
import { WINE_SUBCATEGORIES } from "@/lib/wine-subcategories";

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
  woltUrl?: string | null;
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
  const [category, setCategory] = useState<string>(initial.category ?? "");
  const [subCategory, setSubCategory] = useState<string>(initial.subCategory ?? "");
  const [cats, setCats] = useState<Categ[]>(categories);
  const [newCatOpen, setNewCatOpen] = useState(false);
  const [newCatSk, setNewCatSk] = useState("");
  const [newCatEn, setNewCatEn] = useState("");
  const [newCatId, setNewCatId] = useState("");
  const [catBusy, setCatBusy] = useState(false);
  const [catError, setCatError] = useState<string | null>(null);
  const [imgBusy, setImgBusy] = useState(false);
  const [imgNote, setImgNote] = useState<string | null>(null);
  const [imgError, setImgError] = useState<string | null>(null);

  function resetNewCat() {
    setNewCatOpen(false);
    setNewCatSk("");
    setNewCatEn("");
    setNewCatId("");
    setCatError(null);
  }

  async function handleCreateCategory() {
    if (!newCatSk.trim()) {
      setCatError("Zadaj názov kategórie (SK)");
      return;
    }
    setCatBusy(true);
    setCatError(null);
    try {
      const res = await createCategory({
        sk: newCatSk,
        it: newCatEn,
        id: newCatId,
      });
      if (res.error || !res.category) {
        setCatError(res.error ?? "Kategóriu sa nepodarilo vytvoriť");
        return;
      }
      const created = res.category;
      setCats((prev) =>
        prev.some((c) => c.id === created.id)
          ? prev
          : [...prev, { id: created.id, sk: created.sk }],
      );
      setCategory(created.id);
      setSubCategory("");
      resetNewCat();
    } finally {
      setCatBusy(false);
    }
  }

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.currentTarget;
    const file = input.files?.[0];
    if (!file) return;

    setImgError(null);
    setImgNote(null);
    setPreview(URL.createObjectURL(file));
    setImgBusy(true);
    try {
      const { compressToWebp } = await import("@/lib/compress-image");
      const webp = await compressToWebp(file);
      // Swap the compressed WebP into the native file input so the server
      // action uploads it instead of the original.
      const dt = new DataTransfer();
      dt.items.add(webp);
      input.files = dt.files;
      setPreview(URL.createObjectURL(webp));
      const kb = Math.round(webp.size / 1024);
      setImgNote(
        `WebP · ${kb >= 1024 ? (kb / 1024).toFixed(1) + " MB" : kb + " KB"}`,
      );
    } catch {
      setImgError(
        "Tento formát sa nepodarilo spracovať. Použi JPG, PNG alebo WebP.",
      );
    } finally {
      setImgBusy(false);
    }
  }

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
        <Row label="Názov (EN) - anglický názov">
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
            <div className="flex gap-2">
              <select
                name="category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setSubCategory("");
                }}
                required
                className="input flex-1"
              >
                <option value="" disabled>
                  Vyber…
                </option>
                {cats.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.sk}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => (newCatOpen ? resetNewCat() : setNewCatOpen(true))}
                aria-expanded={newCatOpen}
                title="Pridať novú kategóriu"
                className="shrink-0 h-11 px-3 border border-ink-700/15 rounded-md font-mono text-xs uppercase tracking-[0.12em] text-ink-500 transition-all duration-200 ease-out hover:text-terracotta-600 hover:border-terracotta-500/50 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500/30"
              >
                {newCatOpen ? "Zavrieť" : "+ Nová"}
              </button>
            </div>
          </Row>
          <Row label="Podkategória">
            {category === "vino" ? (
              <select
                name="subCategory"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="input"
              >
                <option value="">- žiadna -</option>
                {WINE_SUBCATEGORIES.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.sk}
                  </option>
                ))}
              </select>
            ) : (
              <input
                name="subCategory"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="input"
              />
            )}
          </Row>
        </div>

        {newCatOpen ? (
          <div className="border border-terracotta-200 bg-terracotta-50/50 rounded-md p-4 space-y-3">
            <p className="text-xs font-mono uppercase tracking-[0.15em] text-ink-500">
              Nová kategória
            </p>
            <div className="grid sm:grid-cols-3 gap-3">
              <label className="block">
                <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-ink-500">
                  Názov (SK) *
                </span>
                <input
                  value={newCatSk}
                  onChange={(e) => setNewCatSk(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      void handleCreateCategory();
                    }
                  }}
                  placeholder="napr. Syry"
                  className="input mt-1"
                />
              </label>
              <label className="block">
                <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-ink-500">
                  Názov (EN)
                </span>
                <input
                  value={newCatEn}
                  onChange={(e) => setNewCatEn(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      void handleCreateCategory();
                    }
                  }}
                  placeholder="Ak prázdne, použije SK"
                  className="input mt-1"
                />
              </label>
              <label className="block">
                <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-ink-500">
                  ID (slug)
                </span>
                <input
                  value={newCatId}
                  onChange={(e) => setNewCatId(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      void handleCreateCategory();
                    }
                  }}
                  placeholder="Auto z názvu"
                  className="input mt-1 font-mono"
                />
              </label>
            </div>
            {catError ? (
              <p className="text-xs text-terracotta-700">{catError}</p>
            ) : (
              <p className="text-xs text-ink-500">
                Kategória sa uloží hneď a rovno sa nastaví tomuto produktu.
              </p>
            )}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCreateCategory}
                disabled={catBusy}
                className="h-10 px-4 bg-ink-900 text-cream-50 rounded-md font-mono text-xs uppercase tracking-[0.15em] transition-all duration-200 ease-out hover:bg-terracotta-700 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500/40"
              >
                {catBusy ? (
                  <span className="inline-flex items-center gap-2">
                    <span
                      className="inline-block w-3 h-3 rounded-full border-2 border-cream-50/40 border-t-cream-50 animate-spin"
                      aria-hidden
                    />
                    Vytváram…
                  </span>
                ) : (
                  "Vytvoriť kategóriu"
                )}
              </button>
              <button
                type="button"
                onClick={resetNewCat}
                className="h-10 px-4 border border-ink-700/15 rounded-md text-sm text-ink-500 transition-colors hover:text-terracotta-600 hover:border-terracotta-500/50"
              >
                Zrušiť
              </button>
            </div>
          </div>
        ) : null}

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

        <div className="grid grid-cols-2 gap-4">
          <Row label="Objem">
            <input name="volume" defaultValue={initial.volume ?? ""} className="input" />
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
        <Row label="Popis (EN) - anglický popis">
          <textarea
            name="descriptionIt"
            rows={4}
            defaultValue={initial.descriptionIt ?? ""}
            className="input"
          />
        </Row>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
            <input
              type="checkbox"
              className="admin-check"
              name="inStock"
              defaultChecked={initial.inStock ?? true}
            />
            Skladom
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
            <input
              type="checkbox"
              className="admin-check"
              name="featured"
              defaultChecked={initial.featured ?? false}
            />
            Odporúčaný (homepage)
          </label>
        </div>

        <Row label="Wolt link (kúpiť cez Wolt)">
          <input
            name="woltUrl"
            type="url"
            defaultValue={initial.woltUrl ?? ""}
            placeholder="https://wolt.com/..."
            className="input"
          />
        </Row>
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
            onChange={handleImageChange}
            className="sr-only"
          />
          {imgBusy ? (
            <p className="text-xs text-terracotta-700 mt-2 inline-flex items-center gap-2">
              <span
                className="inline-block w-3 h-3 rounded-full border-2 border-terracotta-300 border-t-terracotta-700 animate-spin"
                aria-hidden
              />
              Optimalizujem na WebP…
            </p>
          ) : imgError ? (
            <p className="text-xs text-terracotta-700 mt-2">{imgError}</p>
          ) : imgNote ? (
            <p className="text-xs text-emerald-700 mt-2">{imgNote} · pripravené</p>
          ) : (
            <p className="text-xs text-ink-500 mt-2">
              {mode === "edit"
                ? "Nahrať nový obrázok = nahradí existujúci."
                : "JPG/PNG/HEIC - automaticky sa skonvertuje na WebP."}
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={pending || imgBusy}
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
