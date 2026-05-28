"use client";
import { useCustomerMode, type CustomerMode } from "@/lib/customer-mode";
import { useEffect, useId, useState } from "react";
import { User, Building2, Check } from "lucide-react";
import type { Locale } from "@/lib/i18n/routing";

export function CustomerModePicker({ locale }: { locale: Locale }) {
  const mode = useCustomerMode((s) => s.mode);
  const setMode = useCustomerMode((s) => s.setMode);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const groupId = useId();
  const label = locale === "it" ? "Sono" : "Som";
  const options: { value: CustomerMode; label: string; icon: React.ReactNode }[] = [
    {
      value: "b2c",
      label: locale === "it" ? "Privato" : "Súkromník",
      icon: <User size={15} strokeWidth={1.75} aria-hidden />,
    },
    {
      value: "b2b",
      label: locale === "it" ? "Azienda" : "Firma",
      icon: <Building2 size={15} strokeWidth={1.75} aria-hidden />,
    },
  ];

  return (
    <div
      role="radiogroup"
      aria-labelledby={groupId}
      className="mt-7 flex flex-wrap items-center gap-2 sm:gap-3"
    >
      <span
        id={groupId}
        className="text-[12px] uppercase tracking-[0.08em] text-ink-500 font-medium shrink-0"
      >
        {label}
      </span>
      {options.map((opt) => (
        <Pill
          key={opt.value}
          active={mounted && mode === opt.value}
          onClick={() => setMode(opt.value)}
          icon={opt.icon}
          label={opt.label}
        />
      ))}
    </div>
  );
}

function Pill({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onClick}
      className={`inline-flex items-center gap-2 min-h-[44px] sm:min-h-[40px] px-4 rounded-full border text-[14px] font-medium leading-none whitespace-nowrap transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white motion-reduce:transition-none ${
        active
          ? "bg-ink-900 border-ink-900 text-white"
          : "bg-white/95 backdrop-blur-[2px] border-cream-300 text-ink-900 hover:border-ink-900"
      }`}
    >
      {icon}
      <span className="truncate max-w-[18ch]">{label}</span>
      <Check
        size={14}
        strokeWidth={2.25}
        aria-hidden
        className={`ml-0.5 transition-opacity duration-150 ${active ? "opacity-100" : "opacity-0 w-0 -ml-2"}`}
      />
    </button>
  );
}
