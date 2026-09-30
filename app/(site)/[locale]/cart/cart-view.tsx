"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import Image from "next/image";
import { useCart } from "@/lib/cart";
import { useVerifiedCustomerMode } from "@/lib/customer-mode";
import { computeDiscount, B2B_TIERS } from "@/lib/b2b-discount";
import { formatPrice } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/routing";
import { Minus, Plus, X, ImageOff } from "lucide-react";
import { useEffect, useState } from "react";

const FREE_SHIP = 60;

export function CartView({ locale }: { locale: Locale }) {
  const t = useTranslations();
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQuantity);
  const remove = useCart((s) => s.remove);
  const subtotal = useCart((s) => s.subtotal());
  const { mode } = useVerifiedCustomerMode();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Cart items live in localStorage, so they can outlive the product they point
  // at. Ask the server which slugs still exist; the dead ones lose their link
  // (clicking them used to land on a 404) and get flagged for removal.
  const [missing, setMissing] = useState<string[]>([]);
  const slugKey = items.map((i) => i.slug).join(",");
  useEffect(() => {
    if (!slugKey) {
      setMissing([]);
      return;
    }
    let alive = true;
    fetch("/api/products/check", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ slugs: slugKey.split(",") }),
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { missing?: string[] } | null) => {
        if (alive && data?.missing) setMissing(data.missing);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [slugKey]);

  const isMissing = (slug: string) => missing.includes(slug);
  const missingInCart = items.filter((i) => isMissing(i.slug));
  const removeMissing = () => missingInCart.forEach((i) => remove(i.slug));

  if (!mounted) {
    return <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-10 py-16" />;
  }

  if (items.length === 0) {
    return (
      <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-10 py-24 text-center">
        <h1 className="display-lg mb-4">{t("cart.title")}</h1>
        <p className="text-ink-500 mb-8">{t("cart.empty")}</p>
        <Link href="/shop" className="btn btn-orange btn-lg">
          {t("cart.continueShopping")}
        </Link>
      </section>
    );
  }

  const isB2B = mode === "b2b";
  const discount = computeDiscount(subtotal, isB2B);
  const subtotalAfterDiscount = subtotal - discount.amount;
  const shipping = subtotalAfterDiscount >= FREE_SHIP ? 0 : 5.9;
  const total = subtotalAfterDiscount + shipping;
  const toFreeShip = Math.max(0, FREE_SHIP - subtotalAfterDiscount);
  const toNextTier = discount.next ? discount.next.min - subtotal : 0;

  return (
    <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-10 py-12 grid lg:grid-cols-[2fr_1fr] gap-10">
      <div>
        <h1 className="font-display text-[32px] font-medium tracking-[-0.025em] mb-1">
          {t("cart.title")}
        </h1>
        <p className="text-[13px] text-ink-500 mb-5">
          {items.length}{" "}
          {locale === "en"
            ? items.length === 1
              ? "product"
              : "products"
            : "produktov"}
        </p>

        <ul className="m-0 p-0 list-none">
          {items.map((it) => (
            <li
              key={it.slug}
              className="grid grid-cols-[64px_1fr_auto_auto] items-center gap-4 py-4 border-b border-cream-300"
            >
              <div className="relative w-16 h-16 rounded-md border border-cream-300 bg-cream-100 overflow-hidden">
                {isMissing(it.slug) || !it.image ? (
                  <span className="absolute inset-0 grid place-items-center text-ink-300" aria-hidden>
                    <ImageOff size={20} strokeWidth={1.5} />
                  </span>
                ) : (
                  <Image src={it.image} alt={it.name} fill sizes="64px" className="object-contain p-1.5" />
                )}
              </div>
              <div>
                {isMissing(it.slug) ? (
                  <>
                    <span className="font-display font-medium text-[17px] tracking-[-0.01em] text-ink-500">
                      {it.name}
                    </span>
                    <p className="mt-0.5 text-[12px] text-terracotta-600">
                      {locale === "en"
                        ? "No longer available - please remove it"
                        : "Produkt už nie je v ponuke - odstráňte ho, prosím"}
                    </p>
                  </>
                ) : (
                  <Link
                    href={`/shop/${it.slug}`}
                    className="font-display font-medium text-[17px] tracking-[-0.01em] hover:text-terracotta-500"
                  >
                    {it.name}
                  </Link>
                )}
                <div className="mt-1.5 flex items-center gap-3">
                  <div className="inline-flex items-center rounded-full border border-cream-300 overflow-hidden bg-white">
                    <button
                      onClick={() => setQty(it.slug, it.quantity - 1)}
                      className="w-8 h-8 grid place-items-center text-ink-900 hover:bg-cream-100"
                      aria-label="-"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="px-2 text-[13px] font-medium tabular-nums">
                      {it.quantity}
                    </span>
                    <button
                      onClick={() => setQty(it.slug, it.quantity + 1)}
                      className="w-8 h-8 grid place-items-center text-ink-900 hover:bg-cream-100"
                      aria-label="+"
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                  <button
                    onClick={() => remove(it.slug)}
                    className="text-[12px] text-ink-500 hover:text-terracotta-500 inline-flex items-center gap-1"
                  >
                    <X size={12} /> {t("cart.remove")}
                  </button>
                </div>
              </div>
              <span className="font-medium text-[14px] text-ink-500 tabular-nums">
                {formatPrice(it.price, locale)}
              </span>
              <span className="font-semibold text-[16px] tabular-nums text-ink-900">
                {formatPrice(it.price * it.quantity, locale)}
              </span>
            </li>
          ))}
        </ul>

        {missingInCart.length > 0 && (
          <div className="mt-5 rounded-md border border-terracotta-300 bg-terracotta-50 text-terracotta-700 text-[13px] px-3.5 py-3 flex flex-wrap items-center gap-3">
            <span>
              {locale === "en"
                ? `${missingInCart.length} item(s) in your cart are no longer sold.`
                : `${missingInCart.length} položka/y v košíku už nie sú v ponuke.`}
            </span>
            <button
              onClick={removeMissing}
              className="underline underline-offset-2 hover:no-underline font-medium"
            >
              {locale === "en" ? "Remove them" : "Odstrániť ich"}
            </button>
          </div>
        )}

        {toFreeShip > 0 && (
          <div className="mt-5 rounded-md border border-dashed border-olive-500 text-olive-500 text-[13px] px-3.5 py-3 inline-flex gap-2 items-center">
            <span className="text-base leading-none">+</span>
            {locale === "en"
              ? `Add ${formatPrice(toFreeShip, locale)} and shipping is on us!`
              : `Pridajte ${formatPrice(toFreeShip, locale)} a doprava je zdarma!`}
          </div>
        )}
      </div>

      <aside className="space-y-5">
        <div className="sticky top-24 space-y-5">
        <div className="rounded-lg border border-cream-300 bg-cream-100 p-5 grid grid-cols-[1fr_auto] gap-y-2 gap-x-6 text-sm">
          <h2 className="col-span-2 font-display font-medium text-[20px] tracking-[-0.01em] mb-2">
            {t("checkout.summary")}
          </h2>

          <span className="text-ink-500">{t("cart.subtotal")}</span>
          <span className="tabular-nums text-right text-ink-900">
            {formatPrice(subtotal, locale)}
          </span>

          {isB2B && discount.amount > 0 && (
            <>
              <span className="text-olive-700">
                {locale === "en" ? "Business discount" : "Firemná zľava"}{" "}
                <span className="text-ink-500">
                  (−{Math.round(discount.pct * 100)}%)
                </span>
              </span>
              <span className="tabular-nums text-right text-olive-700">
                −{formatPrice(discount.amount, locale)}
              </span>
            </>
          )}

          <span className="text-ink-500">{t("cart.shipping")}</span>
          <span className="tabular-nums text-right text-ink-900">
            {shipping === 0
              ? locale === "en"
                ? "Gratis"
                : "Zdarma"
              : formatPrice(shipping, locale)}
          </span>

          <span className="col-span-2 border-t border-cream-300 pt-3 grid grid-cols-[1fr_auto] gap-6">
            <span className="font-display font-medium text-[20px] tracking-[-0.01em] text-ink-900">
              {t("cart.total")}
            </span>
            <span className="font-semibold text-[20px] tabular-nums text-ink-900">
              {formatPrice(total, locale)}
            </span>
          </span>

          {isB2B && (
            <div className="col-span-2 mt-3 flex flex-col gap-2">
              {B2B_TIERS.filter((tier) => {
                const activeIdx = discount.tier
                  ? B2B_TIERS.findIndex((t) => t.id === discount.tier!.id)
                  : 0;
                const tierIdx = B2B_TIERS.findIndex((t) => t.id === tier.id);
                if (tier.id === "t1" && activeIdx > 0) return false;
                if (tier.id === "t3" && activeIdx < 1) return false;
                return tierIdx >= activeIdx;
              }).map((tier) => {
                const active = discount.tier?.id === tier.id;
                const isNext = discount.next?.id === tier.id;
                return (
                  <div
                    key={tier.id}
                    className={`rounded-lg border px-4 py-3 flex items-center justify-between gap-3 transition-colors ${
                      active
                        ? "bg-ink-900 border-ink-900 text-white"
                        : "bg-white border-cream-300 text-ink-700"
                    }`}
                  >
                    <p
                      className={`text-[11px] font-mono uppercase tracking-[0.12em] ${
                        active ? "text-white/70" : "text-ink-500"
                      }`}
                    >
                      {isNext
                        ? locale === "en"
                          ? `+ ${formatPrice(toNextTier, locale)}`
                          : `+ ${formatPrice(toNextTier, locale)}`
                        : tier.max
                        ? `${formatPrice(tier.min, locale)} - ${formatPrice(tier.max, locale)}`
                        : `${formatPrice(tier.min, locale)}+`}
                    </p>
                    <p className="font-display text-[22px] tabular-nums">
                      −{Math.round(tier.pct * 100)}%
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {missingInCart.length > 0 ? (
            <button
              onClick={removeMissing}
              className="col-span-2 btn btn-orange btn-lg w-full justify-center mt-4"
            >
              {locale === "en"
                ? "Remove unavailable items"
                : "Odstrániť nedostupné položky"}
            </button>
          ) : (
            <Link
              href="/checkout"
              className="col-span-2 btn btn-orange btn-lg w-full justify-center mt-4"
            >
              {t("cart.checkout")}
            </Link>
          )}
        </div>
        </div>
      </aside>
    </section>
  );
}
