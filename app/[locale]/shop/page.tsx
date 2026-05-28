import { Suspense } from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { ProductCard } from "@/components/product-card";
import { ShopSort, type SortKey } from "@/components/shop-sort";
import type { Category, Product } from "@/lib/products";
import { getProducts, getCategories } from "@/lib/queries";
import type { Locale } from "@/lib/i18n/routing";

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
  if (locale === "it") {
    if (count === 1) return "prodotto";
    return "prodotti";
  }
  if (count === 1) return "produkt";
  if (count >= 2 && count <= 4) return "produkty";
  return "produktov";
}

export default async function ShopPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ cat?: string; sort?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <section className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 py-10 lg:py-12">
      <header className="grid lg:grid-cols-[1fr_auto] gap-x-12 gap-y-4 items-end mb-10">
        <div className="max-w-[60ch] min-w-0">
          <p className="eyebrow">
            {locale === "it" ? "Catalogo" : "Katalóg"}
          </p>
          <h1
            className="display-lg mt-4 [text-wrap:balance] hyphens-auto break-words"
            lang={locale}
          >
            {t("shop.title")}
          </h1>
          <p className="body-lg mt-4" lang={locale}>
            {locale === "it"
              ? "Vini, caffè, pasta, salse e dolci selezionati da piccoli produttori italiani — importati direttamente, senza intermediari."
              : "Vína, kávy, cestoviny, omáčky a sladkosti od malých talianskych producentov — dovážané priamo, bez sprostredkovateľov."}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 lg:justify-end shrink-0">
          <Suspense fallback={<div className="h-8 w-32 rounded-md bg-cream-100/60 animate-pulse" aria-hidden />}>
            <ShopSortAsync searchParams={searchParams} locale={locale} />
          </Suspense>
          <Suspense fallback={<p className="label-meta tabular-nums">···</p>}>
            <ProductCount searchParams={searchParams} locale={locale} />
          </Suspense>
        </div>
      </header>

      <div className="grid lg:grid-cols-[220px_1fr] gap-6 lg:gap-8 border-t border-cream-300 pt-8 lg:pt-10">
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

async function ProductCount({
  searchParams,
  locale,
}: {
  searchParams: Promise<{ cat?: string; sort?: string }>;
  locale: Locale;
}) {
  const { cat } = await searchParams;
  const products = await getProducts();
  const activeCat = (cat as Category) ?? null;
  const count = activeCat
    ? products.filter((p) => p.category === activeCat).length
    : products.length;
  const label = `${count.toLocaleString(locale === "it" ? "it-IT" : "sk-SK")} ${productLabel(count, locale)}`;
  return (
    <p
      className="label-meta tabular-nums"
      aria-live="polite"
      aria-atomic="true"
    >
      {label}
    </p>
  );
}

async function Sidebar({
  searchParams,
  locale,
  tAll,
}: {
  searchParams: Promise<{ cat?: string; sort?: string }>;
  locale: Locale;
  tAll: string;
}) {
  const { cat, sort } = await searchParams;
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);
  const activeCat = (cat as Category) ?? null;
  const sortSuffix = sort ? `&sort=${sort}` : "";
  const allHref = sort ? `/shop?sort=${sort}` : "/shop";
  return (
    <aside
      aria-label={locale === "it" ? "Categorie" : "Kategórie"}
      className="font-sans text-[13px] lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto min-w-0"
    >
      <h2 className="label-meta mb-2">
        {locale === "it" ? "Categorie" : "Kategórie"}
      </h2>
      <ul role="list" className="m-0 p-0 list-none space-y-0.5">
        <SidebarItem
          href={allHref}
          label={tAll}
          count={products.length}
          active={!activeCat}
          locale={locale}
        />
        {categories.map((c) => (
          <SidebarItem
            key={c.id}
            href={`/shop?cat=${c.id}${sortSuffix}`}
            label={c[locale]}
            count={products.filter((p) => p.category === c.id).length}
            active={activeCat === c.id}
            locale={locale}
          />
        ))}
      </ul>
    </aside>
  );
}

async function ShopSortAsync({
  searchParams,
  locale,
}: {
  searchParams: Promise<{ cat?: string; sort?: string }>;
  locale: Locale;
}) {
  const { sort } = await searchParams;
  return <ShopSort locale={locale} current={parseSort(sort)} />;
}

async function Catalog({
  searchParams,
  locale,
}: {
  searchParams: Promise<{ cat?: string; sort?: string }>;
  locale: Locale;
}) {
  const { cat, sort: sortParam } = await searchParams;
  const sort = parseSort(sortParam);
  const products = await getProducts();
  const activeCat = (cat as Category) ?? null;
  const inScope = activeCat
    ? products.filter((p) => p.category === activeCat)
    : products;
  const filtered = sortProducts(inScope, sort);

  if (filtered.length === 0) {
    return (
      <div className="border border-cream-300 rounded-lg px-6 sm:px-8 py-16 sm:py-20 text-center min-w-0">
        <p
          className="font-display italic text-xl sm:text-2xl text-ink-900 [text-wrap:balance]"
          lang={locale}
        >
          {locale === "it"
            ? "Nessun prodotto in questa categoria."
            : "V tejto kategórii zatiaľ nič nie je."}
        </p>
        <Link href="/shop" className="link-underline mt-6">
          {locale === "it" ? "Mostra tutto" : "Zobraziť všetko"} →
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 min-w-0">
      {filtered.map((p) => (
        <ProductCard key={p.slug} product={p} locale={locale} />
      ))}
    </div>
  );
}

function SidebarSkeleton({ locale }: { locale: Locale }) {
  return (
    <aside aria-hidden="true" className="font-sans text-[13px]">
      <h2 className="label-meta mb-2">
        {locale === "it" ? "Categorie" : "Kategórie"}
      </h2>
      <div className="space-y-0.5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-10 rounded-md bg-cream-100/60 animate-pulse" />
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
}: {
  href: string;
  label: string;
  count: number;
  active: boolean;
  locale: Locale;
}) {
  const productsWord = productLabel(count, locale);
  return (
    <li>
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        aria-label={`${label}, ${count} ${productsWord}`}
        className={`flex justify-between items-center gap-2 px-3 min-h-[40px] py-1.5 rounded-md border text-[13px] transition-colors duration-150 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900 focus-visible:ring-offset-1 focus-visible:ring-offset-white ${
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
          {count.toLocaleString(locale === "it" ? "it-IT" : "sk-SK")}
        </span>
      </Link>
    </li>
  );
}
