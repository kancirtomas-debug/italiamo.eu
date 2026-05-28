import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/lib/i18n/navigation";
import Image from "next/image";
import { getProduct, getProducts } from "@/lib/queries";
import { AddToCart } from "@/components/add-to-cart";
import { stripWeight } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/routing";
import { ArrowLeft } from "lucide-react";

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

  return (
    <section className="max-w-[1300px] mx-auto px-6 lg:px-10 py-10">
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 text-sm text-ink-500 hover:text-ink-900 mb-6"
      >
        <ArrowLeft size={16} /> {t("product.back")}
      </Link>

      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12">
        {/* Gallery */}
        <div className="relative aspect-square rounded-lg border border-cream-300 bg-white grid place-items-center overflow-hidden">
          <Image
            src={product.image}
            alt={product.name[locale]}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain object-center p-8"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          {(product.region || product.winery) && (
            <p className="eyebrow">{product.region ?? product.winery}</p>
          )}
          <h1 className="font-display text-[38px] leading-none tracking-[-0.025em] font-medium mt-3">
            {stripWeight(product.name[locale])}
          </h1>

          <p className="mt-4 text-[15px] leading-relaxed text-ink-700 max-w-[55ch]">
            {product.description[locale]}
          </p>

          <dl className="grid grid-cols-2 gap-2 mt-5">
            {product.winery && (
              <Fact label={t("product.winery")} value={product.winery} />
            )}
            {product.region && (
              <Fact label={t("product.region")} value={product.region} />
            )}
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
              name={product.name[locale]}
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
        </div>
      </div>
    </section>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-cream-100 border border-cream-300 rounded-md px-3.5 py-3 text-[13px]">
      <span className="block font-display font-medium text-[17px] tracking-[-0.01em] text-ink-900 leading-tight">
        {value}
      </span>
      <span className="text-ink-500 text-[12px]">{label}</span>
    </div>
  );
}
