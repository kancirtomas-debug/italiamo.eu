import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(value: number, locale: string = "sk") {
  return new Intl.NumberFormat(locale === "en" ? "it-IT" : "sk-SK", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

/** Replace long dashes (em/en/figure/horizontal bar) with a plain hyphen. */
export function stripLongDashes(text: string): string {
  return text.replace(/[‒–—―⸺⸻]/g, "-");
}

export function stripWeight(name?: string | null) {
  if (!name) return "";
  return name
    .replace(/\s*[-–-]?\s*\(?\s*\d+(?:[.,]\d+)?\s*(?:g|kg|ml|l)\b\)?\s*$/i, "")
    .trim();
}

/**
 * Reads a localized field ({ sk, en }) safely.
 * Cached product payloads written before the it -> en locale rename still carry
 * an `it` key, so a plain field[locale] can be undefined and crash the render.
 * Falls back: requested locale -> sk -> en -> first non-empty value.
 */
export function pickLocale(
  field: Record<string, string | undefined> | string | null | undefined,
  locale: string,
): string {
  if (!field) return "";
  if (typeof field === "string") return stripLongDashes(field);
  return stripLongDashes(
    field[locale] ||
      field.sk ||
      field.en ||
      Object.values(field).find((v) => typeof v === "string" && v.length > 0) ||
      "",
  );
}

export function generateOrderRef() {
  const ts = Date.now().toString().slice(-8);
  const rnd = Math.floor(Math.random() * 9000 + 1000);
  return `${ts}${rnd}`;
}
