"use client";
import { Link } from "@/lib/i18n/navigation";
import { useCart } from "@/lib/cart";
import { useLocale } from "next-intl";
import { ShoppingBag, Check } from "lucide-react";
import { useEffect, useState } from "react";

export function CartButton() {
  const count = useCart((s) => s.count());
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);
  const [pop, setPop] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    function onAdded() {
      setPop(true);
      window.setTimeout(() => setPop(false), 1700);
    }
    window.addEventListener("italiamo:cart-added", onAdded);
    return () => window.removeEventListener("italiamo:cart-added", onAdded);
  }, []);

  const showCount = mounted && count > 0;
  const label =
    locale === "en"
      ? showCount
        ? `Cart (${count})`
        : "Cart"
      : showCount
        ? `Košík (${count})`
        : "Košík";

  return (
    <div className="relative shrink-0">
      <Link
        href="/cart"
        aria-label={label}
        data-cart-target
        className="inline-flex items-center gap-2 min-h-[48px] px-4 rounded-full bg-ink-900 text-white text-[15px] font-medium hover:bg-black transition-colors duration-150 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
      >
        <ShoppingBag size={18} strokeWidth={1.75} aria-hidden />
        {showCount && (
          <span className="tabular-nums" aria-hidden>
            {count}
          </span>
        )}
      </Link>

      {pop && (
        <div
          role="status"
          aria-live="polite"
          className="absolute right-0 top-[calc(100%+10px)] z-50 min-w-[220px] rounded-xl border border-cream-300 bg-white shadow-[0_18px_44px_rgba(0,0,0,0.18)] px-4 py-3 flex items-center gap-3 cart-pop-in motion-reduce:animate-none"
        >
          <span className="inline-grid place-items-center w-8 h-8 rounded-full bg-olive-500 text-white">
            <Check size={16} strokeWidth={2.5} aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="font-display text-[15px] text-ink-900 leading-tight">
              {locale === "en" ? "Added to cart" : "Pridané do košíka"}
            </p>
            <p className="text-[12px] text-ink-500 tabular-nums">
              {showCount
                ? locale === "en"
                  ? `Cart · ${count}`
                  : `Košík · ${count}`
                : ""}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
