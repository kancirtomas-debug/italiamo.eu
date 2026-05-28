"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import Image from "next/image";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/routing";
import { Minus, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";

const FREE_SHIP = 60;

export function CartView({ locale }: { locale: Locale }) {
  const t = useTranslations();
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQuantity);
  const remove = useCart((s) => s.remove);
  const subtotal = useCart((s) => s.subtotal());
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="max-w-[1300px] mx-auto px-6 lg:px-10 py-16" />;
  }

  if (items.length === 0) {
    return (
      <section className="max-w-[1300px] mx-auto px-6 lg:px-10 py-24 text-center">
        <h1 className="display-lg mb-4">{t("cart.title")}</h1>
        <p className="text-ink-500 mb-8">{t("cart.empty")}</p>
        <Link href="/shop" className="btn btn-orange btn-lg">
          {t("cart.continueShopping")}
        </Link>
      </section>
    );
  }

  const shipping = subtotal >= FREE_SHIP ? 0 : 5.9;
  const total = subtotal + shipping;
  const toFreeShip = Math.max(0, FREE_SHIP - subtotal);

  return (
    <section className="max-w-[1300px] mx-auto px-6 lg:px-10 py-12 grid lg:grid-cols-[2fr_1fr] gap-10">
      <div>
        <h1 className="font-display text-[32px] font-medium tracking-[-0.025em] mb-1">
          {t("cart.title")}
        </h1>
        <p className="text-[13px] text-ink-500 mb-5">
          {items.length}{" "}
          {locale === "it"
            ? items.length === 1
              ? "prodotto"
              : "prodotti"
            : "produktov"}
        </p>

        <ul className="m-0 p-0 list-none">
          {items.map((it) => (
            <li
              key={it.slug}
              className="grid grid-cols-[64px_1fr_auto_auto] items-center gap-4 py-4 border-b border-cream-300"
            >
              <div className="relative w-16 h-16 rounded-md border border-cream-300 bg-cream-100 overflow-hidden">
                <Image src={it.image} alt={it.name} fill sizes="64px" className="object-contain p-1.5" />
              </div>
              <div>
                <Link
                  href={`/shop/${it.slug}`}
                  className="font-display font-medium text-[17px] tracking-[-0.01em] hover:text-terracotta-500"
                >
                  {it.name}
                </Link>
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

        {toFreeShip > 0 && (
          <div className="mt-5 rounded-md border border-dashed border-olive-500 text-olive-500 text-[13px] px-3.5 py-3 inline-flex gap-2 items-center">
            <span className="text-base leading-none">+</span>
            {locale === "it"
              ? `Aggiungi ${formatPrice(toFreeShip, locale)} e la spedizione è offerta!`
              : `Pridajte ${formatPrice(toFreeShip, locale)} a doprava je zdarma!`}
          </div>
        )}
      </div>

      <aside>
        <div className="sticky top-24 rounded-lg border border-cream-300 bg-cream-100 p-5 grid grid-cols-[1fr_auto] gap-y-2 gap-x-6 text-sm">
          <h2 className="col-span-2 font-display font-medium text-[20px] tracking-[-0.01em] mb-2">
            {t("checkout.summary")}
          </h2>

          <span className="text-ink-500">{t("cart.subtotal")}</span>
          <span className="tabular-nums text-right text-ink-900">
            {formatPrice(subtotal, locale)}
          </span>

          <span className="text-ink-500">{t("cart.shipping")}</span>
          <span className="tabular-nums text-right text-ink-900">
            {shipping === 0
              ? locale === "it"
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

          <Link
            href="/checkout"
            className="col-span-2 btn btn-orange btn-lg w-full justify-center mt-4"
          >
            {t("cart.checkout")}
          </Link>
        </div>
      </aside>
    </section>
  );
}
