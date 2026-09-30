import Image from "next/image";
import { Link } from "@/lib/i18n/navigation";
import type { Locale } from "@/lib/i18n/routing";
import type { Product } from "@/lib/products";
import { formatPrice, stripWeight, pickLocale } from "@/lib/utils";
import { Plus, Lock } from "lucide-react";

export function ProductCard({
  product,
  locale,
  blocked = false,
}: {
  product: Product;
  locale: Locale;
  blocked?: boolean;
}) {
  const addLabel = locale === "en" ? "Add to cart" : "Pridať do košíka";
  const soldOutLabel = locale === "en" ? "Sold out" : "Vypredané";
  const adultLabel = locale === "en" ? "18+ only" : "Len pre 18+";
  const origin = product.winery;
  const name = pickLocale(product.name, locale);

  const discountPct =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(
          ((product.compareAtPrice - product.price) / product.compareAtPrice) *
            100,
        )
      : null;

  const image = (
    <div className="relative aspect-square bg-white overflow-hidden">
      <Image
        src={product.image}
        alt=""
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className={`object-contain object-center scale-[0.7] transition-transform duration-500 ease-out motion-safe:group-hover:scale-[0.72] ${
          product.inStock && !blocked ? "" : "opacity-60 grayscale"
        }`}
      />

      {blocked ? (
        <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-full bg-ink-900 text-white">
          <Lock size={12} strokeWidth={2} aria-hidden /> 18+
        </span>
      ) : (
        <>
          {discountPct !== null && product.inStock && (
            <span className="absolute top-3 left-3 px-2 py-0.5 text-[11px] font-semibold rounded-full bg-terracotta-500 text-white tabular-nums">
              −{discountPct}%
            </span>
          )}
          {!product.inStock && (
            <span className="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-medium rounded-full bg-white border border-cream-300 text-ink-500">
              {soldOutLabel}
            </span>
          )}
        </>
      )}
    </div>
  );

  const body = (
    <div className="px-4 pt-3 pb-4 border-t border-cream-300">
      {origin && (
        <p className="text-[11px] font-medium tracking-[0.08em] uppercase text-ink-500">
          {origin}
        </p>
      )}

      <h3
        className="mt-1.5 font-display text-[17px] font-medium tracking-[-0.015em] leading-[1.2] text-ink-900 min-h-[2.4em]"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {stripWeight(name)}
      </h3>

      <div className="mt-3 pt-3 flex items-center justify-between gap-2 border-t border-cream-300">
        {blocked ? (
          <span className="text-[12px] font-medium text-ink-500">
            {adultLabel}
          </span>
        ) : (
          <>
            <span className="flex items-baseline gap-2">
              <span className="font-sans font-semibold tabular-nums text-[16px] tracking-[-0.005em] text-ink-900">
                {formatPrice(product.price, locale)}
              </span>
              {product.compareAtPrice && (
                <span className="font-sans tabular-nums text-[12px] text-ink-500 line-through">
                  {formatPrice(product.compareAtPrice, locale)}
                </span>
              )}
            </span>

            <span
              aria-label={addLabel}
              className="grid place-items-center w-9 h-9 rounded-full border border-cream-300 text-ink-900 transition-colors duration-200 ease-out group-hover:bg-ink-900 group-hover:text-white group-hover:border-ink-900"
            >
              <Plus size={16} strokeWidth={1.75} aria-hidden />
            </span>
          </>
        )}
      </div>
    </div>
  );

  if (blocked) {
    return (
      <div
        aria-label={`${stripWeight(name)} - ${adultLabel}`}
        className="group relative block bg-white border border-cream-300 rounded-lg overflow-hidden cursor-not-allowed select-none"
      >
        {image}
        {body}
      </div>
    );
  }

  return (
    <Link
      href={`/shop/${product.slug}`}
      aria-label={`${name} - ${formatPrice(product.price, locale)}`}
      className="group relative block bg-white border border-cream-300 rounded-lg overflow-hidden transition-[border-color,box-shadow] duration-200 ease-out hover:border-ink-900 hover:shadow-[0_1px_0_rgba(31,29,26,0.04),0_8px_24px_-12px_rgba(31,29,26,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
    >
      {image}
      {body}
    </Link>
  );
}
