import { Suspense } from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { ProductCard } from "@/components/product-card";
import type { SortKey } from "@/components/shop-sort";
import { ShopSearch } from "@/components/shop-search";
import type { Category, Product } from "@/lib/products";
import { getProducts, getCategories } from "@/lib/queries";
import { isAdult, isAlcohol } from "@/lib/age";
import type { Locale } from "@/lib/i18n/routing";
import { pickLocale } from "@/lib/utils";
import { WINE_SUBCATEGORIES } from "@/lib/wine-subcategories";

const SORT_KEYS = ["featured", "price-asc", "price-desc", "sale"] as const;

function parseSort(value: string | undefined): SortKey {
  return (SORT_KEYS as readonly string[]).includes(value ?? "")
    ? (value as SortKey)
    : "featured";
}

function stockFirst(a: Product, b: Product) {
  if (a.inStock === b.inStock) return 0;
  return a.inStock ? -1 : 1;
}

function discountPct(p: Product) {
  if (!p.compareAtPrice || p.compareAtPrice <= p.price) return 0;
  return (p.compareAtPrice - p.price) / p.compareAtPrice;
}

// subCategory can be a comma-separated list, so one wine may live in several
// subcategories at once (e.g. a rosé frizzante is both "ruzove" and "perlive").
function wineSubs(p: Product): string[] {
  return (p.subCategory ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function sortProducts(items: Product[], sort: SortKey): Product[] {
  const copy = [...items];
  if (sort === "price-asc") {
    return copy.sort((a, b) => stockFirst(a, b) || a.price - b.price);
  }
  if (sort === "price-desc") {
    return copy.sort((a, b) => stockFirst(a, b) || b.price - a.price);
  }
  if (sort === "sale") {
    return copy.sort(
      (a, b) => stockFirst(a, b) || discountPct(b) - discountPct(a),
    );
  }
  return copy.sort(stockFirst);
}

function productLabel(count: number, locale: Locale) {
  if (locale === "en") {
    if (count === 1) return "product";
    return "products";
  }
  if (count === 1) return "produkt";
  if (count >= 2 && count <= 4) return "produkty";
  return "produktov";
}

type ShopSearchParams = {
  cat?: string;
  sub?: string;
  sort?: string;
  q?: string;
  show?: string;
};

// How many cards to render per "page". Rendering the whole 243-product grid
// on every request is the shop's main latency cost (the catalog is dynamic
// because it reads the 18+ cookie), so we render a slice and let the shopper
// pull more with a client-side RSC navigation that preserves scroll.
const PAGE_SIZE = 48;

function shopHref(params: ShopSearchParams, show: number): string {
  const p = new URLSearchParams();
  if (params.cat) p.set("cat", params.cat);
  if (params.sub) p.set("sub", params.sub);
  if (params.sort) p.set("sort", params.sort);
  if (params.q) p.set("q", params.q);
  p.set("show", String(show));
  return `/shop?${p.toString()}`;
}

function matchesQuery(p: Product, q: string, locale: Locale): boolean {
  if (!q) return true;
  const needle = q.trim().toLowerCase();
  if (!needle) return true;
  const haystack = [
    pickLocale(p.name, locale),
    p.name.sk ?? "",
    p.name.en ?? "",
    p.winery ?? "",
    p.region ?? "",
    p.subCategory ?? "",
    pickLocale(p.description, locale),
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(needle);
}

export default async function ShopPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<ShopSearchParams>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <section className="max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-10 py-10 lg:py-12">
      <header className="grid lg:grid-cols-[1fr_auto] gap-x-12 gap-y-4 items-end mb-10">
        <div className="max-w-[60ch] min-w-0">
          <p className="eyebrow">
            {locale === "en" ? "Catalogue" : "Katalóg"}
          </p>
          <h1
            className="display-lg mt-4 [text-wrap:balance] hyphens-auto break-words"
            lang={locale}
          >
            {t("shop.title")}
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 lg:justify-end shrink-0">
          <Suspense fallback={<div className="h-[42px] w-[220px] rounded-md bg-cream-100/60 animate-pulse" aria-hidden />}>
            <ShopSearch locale={locale} />
          </Suspense>
        </div>
      </header>

      <div className="grid lg:grid-cols-[260px_1fr] gap-6 lg:gap-10 border-t border-cream-300 pt-8 lg:pt-10">
        <Suspense fallback={<SidebarSkeleton locale={locale} />}>
          <Sidebar searchParams={searchParams} locale={locale} tAll={t("shop.all")} />
        </Suspense>

        <Suspense fallback={<GridSkeleton />}>
          <Catalog searchParams={searchParams} locale={locale} />
        </Suspense>
      </div>
    </section>
  );
}

async function Sidebar({
  searchParams,
  locale,
  tAll,
}: {
  searchParams: Promise<ShopSearchParams>;
  locale: Locale;
  tAll: string;
}) {
  const { cat, sub, sort } = await searchParams;
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);
  const activeCat = (cat as Category) ?? null;
  const activeSub = sub ?? null;
  const sortSuffix = sort ? `&sort=${sort}` : "";
  const allHref = sort ? `/shop?sort=${sort}` : "/shop";
  return (
    <aside
      aria-label={locale === "en" ? "Categories" : "Kategórie"}
      className="font-sans text-[15px] lg:sticky lg:top-28 lg:self-start lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto min-w-0"
    >
      <h2 className="label-meta mb-2">
        {locale === "en" ? "Categories" : "Kategórie"}
      </h2>
      <ul role="list" className="m-0 p-0 list-none space-y-0.5">
        <li className="list-none">
          <SidebarItem
            href={allHref}
            label={tAll}
            count={products.length}
            active={!activeCat}
            locale={locale}
          />
        </li>
        {categories.map((c) => {
          const isWine = c.id === "vino";
          const wineOpen = isWine && activeCat === "vino";
          const mainActive = activeCat === c.id && !activeSub;
          // Víno toggles: when it is the open category, clicking it again
          // deselects (collapses the dropdown) instead of re-selecting.
          const href =
            isWine && mainActive ? allHref : `/shop?cat=${c.id}${sortSuffix}`;
          return (
            <li key={c.id} className="list-none">
              <SidebarItem
                href={href}
                label={c[locale]}
                count={products.filter((p) => p.category === c.id).length}
                active={mainActive}
                locale={locale}
              />
              {wineOpen && (
                <ul role="list" className="mt-0.5 mb-1 ml-3 pl-3 border-l border-cream-300 space-y-0.5">
                  {WINE_SUBCATEGORIES.map((w) => {
                    const n = products.filter(
                      (p) => p.category === "vino" && wineSubs(p).includes(w.id),
                    ).length;
                    if (n === 0) return null;
                    return (
                      <li key={w.id} className="list-none">
                        <SidebarItem
                          href={`/shop?cat=vino&sub=${w.id}${sortSuffix}`}
                          label={locale === "en" ? w.it : w.sk}
                          count={n}
                          active={activeSub === w.id}
                          locale={locale}
                          nested
                        />
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

async function Catalog({
  searchParams,
  locale,
}: {
  searchParams: Promise<ShopSearchParams>;
  locale: Locale;
}) {
  const { cat, sub, sort: sortParam, q, show } = await searchParams;
  const sort = parseSort(sortParam);
  const products = await getProducts();
  const adult = await isAdult();
  const activeCat = (cat as Category) ?? null;
  const activeSub = activeCat === "vino" ? (sub ?? null) : null;
  const query = q ?? "";
  const inScope = products
    .filter((p) => (activeCat ? p.category === activeCat : true))
    .filter((p) => (activeSub ? wineSubs(p).includes(activeSub) : true))
    .filter((p) => matchesQuery(p, query, locale));
  const filtered = sortProducts(inScope, sort);

  const requested = Math.max(PAGE_SIZE, Number(show) || PAGE_SIZE);
  const limit = Math.min(requested, filtered.length);
  const visible = filtered.slice(0, limit);
  const hasMore = filtered.length > limit;

  if (filtered.length === 0) {
    return (
      <div className="border border-cream-300 rounded-lg px-6 sm:px-8 py-16 sm:py-20 text-center min-w-0">
        <p
          className="font-display italic text-xl sm:text-2xl text-ink-900 [text-wrap:balance]"
          lang={locale}
        >
          {locale === "en"
            ? "Nothing in this category yet."
            : "V tejto kategórii zatiaľ nič nie je."}
        </p>
        <Link href="/shop" className="link-underline mt-6">
          {locale === "en" ? "Show all" : "Zobraziť všetko"} →
        </Link>
      </div>
    );
  }

  return (
    <div className="min-w-0">
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 items-start gap-3 sm:gap-4">
        {visible.map((p) => (
          <ProductCard
            key={p.slug}
            product={p}
            locale={locale}
            blocked={!adult && isAlcohol(p)}
          />
        ))}
      </div>

      {hasMore && (
        <div className="mt-10 flex flex-col items-center gap-2">
          <Link
            href={shopHref({ cat, sub, sort: sortParam, q }, limit + PAGE_SIZE)}
            scroll={false}
            prefetch
            className="inline-flex items-center justify-center h-11 px-6 rounded-md border border-ink-900/20 font-sans text-[15px] text-ink-900 transition-colors duration-150 hover:bg-ink-900 hover:text-cream-50 hover:border-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900 focus-visible:ring-offset-2"
          >
            {locale === "en" ? "Show more" : "Zobraziť viac"}
          </Link>
          <p className="text-[13px] text-ink-500 tabular-nums">
            {locale === "en"
              ? `Showing ${limit} of ${filtered.length}`
              : `Zobrazených ${limit} z ${filtered.length}`}
          </p>
        </div>
      )}
    </div>
  );
}

function SidebarSkeleton({ locale }: { locale: Locale }) {
  return (
    <aside aria-hidden="true" className="font-sans text-[15px]">
      <h2 className="label-meta mb-2">
        {locale === "en" ? "Categories" : "Kategórie"}
      </h2>
      <div className="space-y-0.5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-12 rounded-md bg-cream-100/60 animate-pulse" />
        ))}
      </div>
    </aside>
  );
}

function GridSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 min-w-0"
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="aspect-[3/4] rounded-lg bg-cream-100/60 border border-cream-300 animate-pulse"
        />
      ))}
    </div>
  );
}

function SidebarItem({
  href,
  label,
  count,
  active,
  locale,
  nested = false,
}: {
  href: string;
  label: string;
  count: number;
  active: boolean;
  locale: Locale;
  nested?: boolean;
}) {
  const productsWord = productLabel(count, locale);
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      aria-label={`${label}, ${count} ${productsWord}`}
      className={`flex justify-between items-center gap-2 px-4 rounded-md border transition-colors duration-150 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900 focus-visible:ring-offset-1 focus-visible:ring-offset-white ${
        nested ? "min-h-[40px] py-1.5 text-[14px]" : "min-h-[48px] py-2 text-[15px]"
      } ${
        active
          ? "bg-cream-200 border-cream-300 text-ink-900 font-semibold"
          : "bg-transparent border-transparent text-ink-700 hover:bg-cream-100 hover:text-ink-900"
      }`}
    >
      <span className="inline-flex items-center gap-1.5 min-w-0">
        {active && (
          <span aria-hidden className="text-terracotta-500 font-semibold shrink-0">
            ✓
          </span>
        )}
        <span className="truncate" lang={locale}>
          {label}
        </span>
      </span>
      <span
        aria-hidden
        className={`tabular-nums shrink-0 ${active ? "text-ink-900" : "text-ink-500"}`}
      >
        {count.toLocaleString(locale === "en" ? "en-US" : "sk-SK")}
      </span>
    </Link>
  );
}
