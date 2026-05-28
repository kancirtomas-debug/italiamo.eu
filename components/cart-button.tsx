"use client";
import { Link } from "@/lib/i18n/navigation";
import { useCart } from "@/lib/cart";
import { useLocale } from "next-intl";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

export function CartButton() {
  const count = useCart((s) => s.count());
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const showCount = mounted && count > 0;
  const label =
    locale === "it"
      ? showCount
        ? `Carrello (${count})`
        : "Carrello"
      : showCount
        ? `Košík (${count})`
        : "Košík";

  return (
    <Link
      href="/cart"
      aria-label={label}
      className="inline-flex items-center gap-2 min-h-[40px] px-3 rounded-full bg-ink-900 text-white text-[13px] font-medium hover:bg-black transition-colors duration-150 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white shrink-0"
    >
      <ShoppingBag size={15} strokeWidth={1.75} aria-hidden />
      {showCount && (
        <span className="tabular-nums" aria-hidden>
          {count}
        </span>
      )}
    </Link>
  );
}
