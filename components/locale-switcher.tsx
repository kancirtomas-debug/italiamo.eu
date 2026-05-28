"use client";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/lib/i18n/navigation";
import { useTransition } from "react";

const LABELS: Record<string, string> = { sk: "Slovenčina", it: "Italiano" };

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  const switchTo = (next: "sk" | "it") => {
    if (next === locale || pending) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  const Btn = ({ code }: { code: "sk" | "it" }) => {
    const active = locale === code;
    return (
      <button
        type="button"
        onClick={() => switchTo(code)}
        disabled={pending}
        aria-label={LABELS[code]}
        aria-pressed={active}
        lang={code}
        className={`min-h-[36px] min-w-[36px] px-2 rounded-sm text-[13px] font-medium transition-colors duration-150 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900 focus-visible:ring-offset-1 focus-visible:ring-offset-white disabled:opacity-60 disabled:cursor-wait ${
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
      <Btn code="it" />
    </div>
  );
}
