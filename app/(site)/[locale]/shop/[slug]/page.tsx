import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/lib/i18n/navigation";
import Image from "next/image";
import { getProduct, getProducts } from "@/lib/queries";
import { isAlcohol } from "@/lib/age";
import { AddToCart } from "@/components/add-to-cart";
import { AgeConfirmButton } from "@/components/age-confirm-button";
import { AlcoholGate } from "@/components/alcohol-gate";
import { stripWeight, pickLocale } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/routing";
import { ArrowLeft, Wine } from "lucide-react";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const product = await getProduct(slug);
  if (!product) notFound();
  const name = pickLocale(product.name, locale);
  const description = pickLocale(product.description, locale);

  const gate = (
    <section className="max-w-[1300px] mx-auto px-6 lg:px-10 py-10">
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 text-sm text-ink-500 hover:text-ink-900 mb-6"
      >
        <ArrowLeft size={16} /> {t("product.back")}
      </Link>

      <div className="mx-auto max-w-[460px] rounded-2xl border border-cream-300 bg-cream-50 p-8 sm:p-10 text-center">
        <Wine
          size={40}
          strokeWidth={1.25}
          className="mx-auto text-terracotta-600"
        />
        <h1 className="font-display text-2xl sm:text-3xl mt-4">
          {locale === "en" ? "Are you 18 or older?" : "Máte 18 rokov?"}
        </h1>
        <p className="body-sm mt-3 text-ink-700">
          {locale === "en"
            ? "This product contains alcohol and can only be shown to visitors aged 18 and over."
            : "Tento produkt obsahuje alkohol a možno ho zobraziť len osobám starším ako 18 rokov."}
        </p>
        <div className="mt-6 flex items-center justify-center gap-2">
          <AgeConfirmButton
            label={locale === "en" ? "I'm 18 or older" : "Mám 18 rokov"}
          />
          <Link
            href="/shop"
            className="inline-flex items-center justify-center rounded-full border border-cream-300 bg-white px-4 py-2 text-sm font-medium text-ink-700 hover:bg-cream-100"
          >
            {locale === "en" ? "Back to shop" : "Späť do obchodu"}
          </Link>
        </div>
      </div>
    </section>
  );

  const content = (
    <section className="max-w-[1300px] mx-auto px-6 lg:px-10 py-10">
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 text-sm text-ink-500 hover:text-ink-900 mb-6"
      >
        <ArrowLeft size={16} /> {t("product.back")}
      </Link>

      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12">
        {/* Gallery */}
        <div
          data-product-image-anchor
          className="relative aspect-square rounded-lg border border-cream-300 bg-white grid place-items-center overflow-hidden"
        >
          <Image
            src={product.image}
            alt={name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain object-center p-8"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          {product.winery && <p className="eyebrow">{product.winery}</p>}
          <h1 className="font-display text-[38px] leading-none tracking-[-0.025em] font-medium mt-3">
            {stripWeight(name)}
          </h1>

          <p className="mt-4 text-[15px] leading-relaxed text-ink-700 max-w-[55ch]">
            {description}
          </p>

          <dl className="grid grid-cols-2 gap-2 mt-5">
            {product.winery && <Fact value={product.winery} />}
            {product.vintage && (
              <Fact label={t("product.vintage")} value={product.vintage} />
            )}
            {product.alcohol && (
              <Fact label={t("product.alcohol")} value={product.alcohol} />
            )}
          </dl>

          <div className="mt-5">
            <AddToCart
              slug={product.slug}
              name={name}
              price={product.price}
              compareAtPrice={product.compareAtPrice}
              image={product.image}
              inStock={product.inStock}
              label={t("product.addToCart")}
              outOfStockLabel={t("shop.outOfStock")}
              volume={product.volume}
              locale={locale}
            />
          </div>

          {product.woltUrl && (
            <a
              href={product.woltUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center justify-center gap-2 h-12 px-5 rounded-full border border-ink-900 text-ink-900 font-mono text-[13px] uppercase tracking-[0.14em] hover:bg-ink-900 hover:text-cream-50 transition-colors"
            >
              {locale === "en" ? "Buy on Wolt" : "Kúpiť cez Wolt"} →
            </a>
          )}
        </div>
      </div>
    </section>
  );

  if (isAlcohol(product)) {
    return <AlcoholGate gate={gate}>{content}</AlcoholGate>;
  }
  return content;
}

function Fact({ label, value }: { label?: string; value: string }) {
  return (
    <div className="bg-cream-100 border border-cream-300 rounded-md px-3.5 py-3 text-[13px]">
      <span className="block font-display font-medium text-[17px] tracking-[-0.01em] text-ink-900 leading-tight">
        {value}
      </span>
      {label && <span className="text-ink-500 text-[12px]">{label}</span>}
    </div>
  );
}
