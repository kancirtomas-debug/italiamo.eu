"use client";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/lib/i18n/navigation";
import { useTransition } from "react";

const LABELS: Record<string, string> = { sk: "Slovenčina", en: "English" };

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  const switchTo = (next: "sk" | "en") => {
    if (next === locale || pending) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  const Btn = ({ code }: { code: "sk" | "en" }) => {
    const active = locale === code;
    return (
      <button
        type="button"
        onClick={() => switchTo(code)}
        disabled={pending}
        aria-label={LABELS[code]}
        aria-pressed={active}
        lang={code}
        className={`min-h-[44px] min-w-[36px] sm:min-w-[44px] px-1.5 sm:px-3 rounded-sm text-[14px] sm:text-[15px] font-medium transition-colors duration-150 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900 focus-visible:ring-offset-1 focus-visible:ring-offset-white disabled:opacity-60 disabled:cursor-wait ${
          active ? "text-ink-900" : "text-ink-500 hover:text-ink-900"
        }`}
      >
        {code.toUpperCase()}
      </button>
    );
  };

  return (
    <div
      role="group"
      aria-label="Language"
      className="flex items-center text-ink-900"
    >
      <Btn code="sk" />
      <span aria-hidden className="text-ink-300 select-none">
        /
      </span>
      <Btn code="en" />
    </div>
  );
}
