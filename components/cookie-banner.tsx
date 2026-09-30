"use client";

import { useEffect, useState } from "react";
import { Link } from "@/lib/i18n/navigation";

const STORAGE_KEY = "italiamo.cookie-consent";

export function CookieBanner({ locale }: { locale: "sk" | "en" }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  if (!open) return null;

  const save = (value: "all" | "essential") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {}
    setOpen(false);
  };

  const t = locale === "en"
    ? {
        title: "Cookies",
        body:
          "We use essential technical cookies. Analytics and marketing cookies only with your consent.",
        details: "More in our ",
        privacy: "privacy policy",
        accept: "Accept all",
        essential: "Essential only",
      }
    : {
        title: "Cookies",
        body:
          "Používame technicky nevyhnutné cookies. Analytické a marketingové len s vaším súhlasom.",
        details: "Viac v našej ",
        privacy: "ochrane súkromia",
        accept: "Prijať všetko",
        essential: "Len nevyhnutné",
      };

  return (
    <div
      role="dialog"
      aria-label={t.title}
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-[420px] z-50 bg-cream-50 border border-ink-700/15 shadow-xl shadow-ink-900/10 p-6"
    >
      <p className="eyebrow text-ink-500 mb-2">{t.title}</p>
      <p className="text-sm text-ink-700 leading-relaxed">
        {t.body}{" "}
        <span className="text-ink-500">
          {t.details}
          <Link href="/privacy" className="underline hover:text-terracotta-600">
            {t.privacy}
          </Link>
          .
        </span>
      </p>
      <div className="mt-5 flex items-center gap-3">
        <button
          type="button"
          onClick={() => save("all")}
          className="h-10 px-5 bg-terracotta-600 hover:bg-terracotta-700 text-cream-50 font-mono text-[0.7rem] uppercase tracking-[0.15em]"
        >
          {t.accept}
        </button>
        <button
          type="button"
          onClick={() => save("essential")}
          className="h-10 px-5 border border-ink-700/15 hover:border-terracotta-500 hover:text-terracotta-600 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-ink-500"
        >
          {t.essential}
        </button>
      </div>
    </div>
  );
}
