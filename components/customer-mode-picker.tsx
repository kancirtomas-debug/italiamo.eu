"use client";
import {
  useCustomerMode,
  useVerifiedCustomerMode,
  type CustomerMode,
} from "@/lib/customer-mode";
import { B2bVerifyForm } from "./b2b-verify-form";
import { useId, useState } from "react";
import { User, Building2, Check } from "lucide-react";
import type { Locale } from "@/lib/i18n/routing";

export function CustomerModePicker({
  locale,
  size = "md",
}: {
  locale: Locale;
  size?: "md" | "lg";
}) {
  const setMode = useCustomerMode((s) => s.setMode);
  const { mode, company, mounted } = useVerifiedCustomerMode();
  const [verifying, setVerifying] = useState(false);

  // "Firma" is a claim until the company registry backs it up.
  function pick(value: CustomerMode) {
    if (value === "b2b" && !company) {
      setVerifying(true);
      return;
    }
    setMode(value);
  }

  const groupId = useId();
  const options: { value: CustomerMode; label: string; icon: React.ReactNode }[] = [
    {
      value: "b2c",
      label: locale === "en" ? "Private" : "Súkromník",
      icon: <User size={size === "lg" ? 20 : 15} strokeWidth={1.75} aria-hidden />,
    },
    {
      value: "b2b",
      label: locale === "en" ? "Business" : "Firma",
      icon: <Building2 size={size === "lg" ? 20 : 15} strokeWidth={1.75} aria-hidden />,
    },
  ];

  return (
    <div
      role="radiogroup"
      aria-labelledby={groupId}
      className={
        size === "lg"
          ? "flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          : "mt-7 flex flex-wrap items-center gap-2 sm:gap-3"
      }
    >
      <span id={groupId} className="sr-only">
        {locale === "en" ? "I am" : "Som"}
      </span>
      {options.map((opt) => (
        <Pill
          key={opt.value}
          active={mounted && mode === opt.value}
          onClick={() => pick(opt.value)}
          icon={opt.icon}
          label={opt.label}
          size={size}
        />
      ))}
      {verifying && (
        <B2bVerifyForm
          locale={locale}
          onVerified={() => setMode("b2b")}
          onClose={() => setVerifying(false)}
        />
      )}
    </div>
  );
}

function Pill({
  active,
  onClick,
  icon,
  label,
  size = "md",
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  size?: "md" | "lg";
}) {
  const sizing =
    size === "lg"
      ? "min-h-[60px] sm:min-h-[64px] px-7 sm:px-9 text-[17px] sm:text-[18px] gap-3"
      : "min-h-[44px] sm:min-h-[40px] px-4 text-[14px] gap-2";
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onClick}
      className={`inline-flex items-center rounded-full border font-medium leading-none whitespace-nowrap transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white motion-reduce:transition-none ${sizing} ${
        active
          ? "bg-white border-white text-ink-900 shadow-sm"
          : "bg-transparent border-white/70 text-white hover:bg-white/15 hover:border-white"
      }`}
    >
      {icon}
      <span className="truncate max-w-[20ch]">{label}</span>
      <Check
        size={size === "lg" ? 18 : 14}
        strokeWidth={2.25}
        aria-hidden
        className={`ml-0.5 transition-opacity duration-150 ${active ? "opacity-100" : "opacity-0 w-0 -ml-2"}`}
      />
    </button>
  );
}
