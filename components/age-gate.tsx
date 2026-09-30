"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Wine } from "lucide-react";
import type { Locale } from "@/lib/i18n/routing";
import { AGE_COOKIE } from "@/lib/age-cookie";

const AGE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

const COPY = {
  sk: {
    title: "Máte 18 rokov?",
    lead: "Predávame alkoholické nápoje. Pred vstupom musíme overiť váš vek.",
    yes: "Áno, mám 18",
    no: "Nie",
  },
  en: {
    title: "Are you 18 or older?",
    lead: "We sell alcoholic beverages. We must verify your age before you enter.",
    yes: "Yes, I'm 18+",
    no: "No",
  },
} as const;

function hasCookie(name: string): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.split("; ").some((c) => c.startsWith(`${name}=`));
}

function setAge(value: "1" | "0") {
  document.cookie = `${AGE_COOKIE}=${value}; path=/; max-age=${AGE_MAX_AGE}; samesite=lax${
    location.protocol === "https:" ? "; secure" : ""
  }`;
}

export function AgeGate({ locale }: { locale: Locale }) {
  const t = COPY[locale === "en" ? "en" : "sk"];
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    setOpen(!hasCookie(AGE_COOKIE));
    document.documentElement.removeAttribute("data-age-gate");
  }, []);

  // Lock page scroll while the modal blocks the screen.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  function choose(value: "1" | "0") {
    setAge(value);
    setLeaving(true);
    window.setTimeout(() => {
      setOpen(false);
      router.refresh();
    }, 200);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.title}
      data-leaving={leaving ? "" : undefined}
      className="age-modal-overlay fixed inset-0 z-[100] grid place-items-center p-4"
    >
      <div className="age-modal w-full max-w-[420px] rounded-2xl border border-cream-300 bg-cream-50 shadow-2xl p-7 sm:p-9 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-terracotta-600/10">
          <Wine size={28} strokeWidth={1.5} className="text-terracotta-600" />
        </span>

        <h2 className="font-display text-2xl sm:text-3xl mt-5">{t.title}</h2>
        <p className="body-sm mt-3 text-ink-700">{t.lead}</p>

        <div className="mt-7 flex gap-3">
          <button
            type="button"
            onClick={() => choose("1")}
            className="age-btn btn btn-orange flex-1 justify-center"
          >
            {t.yes}
          </button>
          <button
            type="button"
            onClick={() => choose("0")}
            className="age-btn flex-1 justify-center rounded-full border border-cream-300
                       bg-white px-4 py-2 text-sm font-medium text-ink-700 hover:bg-cream-100"
          >
            {t.no}
          </button>
        </div>
      </div>
    </div>
  );
}
