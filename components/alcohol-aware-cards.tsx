import { isAdult, isAlcohol } from "@/lib/age";
import { ProductCard } from "./product-card";
import type { Product } from "@/lib/products";
import type { Locale } from "@/lib/i18n/routing";

/**
 * Renders a set of ProductCards, blocking alcohol items for visitors who have
 * not confirmed they are 18+. Reads cookies(), so it must be rendered inside a
 * <Suspense> boundary on otherwise-static pages (cacheComponents requirement).
 */
export async function AlcoholAwareCards({
  products,
  locale,
}: {
  products: Product[];
  locale: Locale;
}) {
  const adult = await isAdult();
  return (
    <>
      {products.map((p) => (
        <ProductCard
          key={p.slug}
          product={p}
          locale={locale}
          blocked={!adult && isAlcohol(p)}
        />
      ))}
    </>
  );
}

/** Placeholder shown while AlcoholAwareCards streams in. */
export function CardsSkeleton({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          aria-hidden
          className="rounded-lg border border-cream-300 bg-cream-100/50 animate-pulse aspect-[3/4]"
        />
      ))}
    </>
  );
}
