"use client";
import { useCart } from "@/lib/cart";
import { useState } from "react";
import { Check, Plus, Minus } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { flyToCart } from "@/lib/fly-to-cart";
import type { Locale } from "@/lib/i18n/routing";

type VolumeParts = { value: number; unit: string; suffix: string } | null;

function parseVolume(v?: string): VolumeParts {
  if (!v) return null;
  const m = v.match(/(\d+(?:[.,]\d+)?)\s*(g|kg|ml|l)\b(.*)/i);
  if (!m) return null;
  return {
    value: parseFloat(m[1].replace(",", ".")),
    unit: m[2].toLowerCase(),
    suffix: m[3].trim(),
  };
}

function formatVolume(parts: VolumeParts, qty: number): string | null {
  if (!parts) return null;
  const total = parts.value * qty;
  const pretty = Number.isInteger(total) ? total.toString() : total.toFixed(2).replace(/\.?0+$/, "");
  return `${pretty}${parts.unit}${parts.suffix ? " " + parts.suffix : ""}`;
}

const MAX_QTY = 99;

export function AddToCart({
  slug,
  name,
  price,
  compareAtPrice,
  image,
  inStock,
  label,
  outOfStockLabel,
  volume,
  locale,
}: {
  slug: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  inStock: boolean;
  label: string;
  outOfStockLabel: string;
  volume?: string;
  locale: Locale;
}) {
  const add = useCart((s) => s.add);
  const [qty, setQty] = useState(1);
  const [qtyDraft, setQtyDraft] = useState("1");
  const [added, setAdded] = useState(false);

  const commitQty = (raw: string) => {
    const n = parseInt(raw.replace(/\D/g, ""), 10);
    const safe = Number.isFinite(n) && n > 0 ? Math.min(n, MAX_QTY) : 1;
    setQty(safe);
    setQtyDraft(String(safe));
  };

  const bump = (delta: number) => {
    setQty((q) => {
      const next = Math.min(MAX_QTY, Math.max(1, q + delta));
      setQtyDraft(String(next));
      return next;
    });
  };

  const total = price * qty;
  const compareTotal = compareAtPrice ? compareAtPrice * qty : undefined;
  const volParts = parseVolume(volume);
  const totalVolume = formatVolume(volParts, qty);

  if (!inStock) {
    return (
      <div className="space-y-4">
        <div className="py-4 border-t border-b border-cream-300 flex items-baseline gap-4">
          <span className="font-sans font-semibold text-[28px] tabular-nums tracking-[-0.01em] text-ink-900">
            {formatPrice(price, locale)}
          </span>
          {volume && (
            <span className="text-[13px] text-ink-500 ml-auto">{volume}</span>
          )}
        </div>
        <button disabled className="btn bg-cream-200 border-cream-300 text-ink-500">
          {outOfStockLabel}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="py-4 border-t border-b border-cream-300 flex items-baseline gap-4">
        <span
          key={`big-price-${qty}`}
          className="font-sans font-semibold text-[28px] tabular-nums tracking-[-0.01em] text-ink-900 inline-block animate-qty-pop"
        >
          {formatPrice(total, locale)}
        </span>
        {compareTotal && compareTotal > total && (
          <span
            key={`cmp-${qty}`}
            className="text-base text-ink-500 line-through tabular-nums inline-block animate-qty-pop"
          >
            {formatPrice(compareTotal, locale)}
          </span>
        )}
        {totalVolume && (
          <span
            key={`big-vol-${qty}`}
            className="text-[13px] text-ink-500 ml-auto inline-block animate-qty-pop tabular-nums"
          >
            {totalVolume}
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="inline-flex items-center rounded-full border border-cream-300 bg-white overflow-hidden">
          <button
            type="button"
            onClick={() => bump(-1)}
            className="px-3 py-2 text-ink-900 hover:bg-cream-100 disabled:opacity-40"
            disabled={qty <= 1}
            aria-label="-"
          >
            <Minus size={14} />
          </button>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={qtyDraft}
            onChange={(e) => setQtyDraft(e.target.value.replace(/\D/g, "").slice(0, 3))}
            onBlur={(e) => commitQty(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                commitQty(qtyDraft);
                (e.target as HTMLInputElement).blur();
              }
            }}
            aria-label="quantity"
            className="w-12 text-center text-sm font-medium tabular-nums bg-transparent outline-none focus:bg-cream-100"
          />
          <button
            type="button"
            onClick={() => bump(1)}
            className="px-3 py-2 text-ink-900 hover:bg-cream-100 disabled:opacity-40"
            disabled={qty >= MAX_QTY}
            aria-label="+"
          >
            <Plus size={14} />
          </button>
        </div>
        <button
          onClick={() => {
            const source = document.querySelector<HTMLElement>(
              "[data-product-image-anchor]",
            );
            flyToCart(image, source);
            for (let i = 0; i < qty; i++) add({ slug, name, price, image });
            setAdded(true);
            setTimeout(() => setAdded(false), 1400);
          }}
          className="btn btn-orange btn-lg"
        >
          {added ? <Check size={16} strokeWidth={2} /> : <Plus size={16} strokeWidth={2} />}
          {label}
        </button>
      </div>
    </div>
  );
}
