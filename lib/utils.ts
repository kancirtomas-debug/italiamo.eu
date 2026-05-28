import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(value: number, locale: string = "sk") {
  return new Intl.NumberFormat(locale === "it" ? "it-IT" : "sk-SK", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

export function stripWeight(name: string) {
  return name
    .replace(/\s*[-–—]?\s*\(?\s*\d+(?:[.,]\d+)?\s*(?:g|kg|ml|l)\b\)?\s*$/i, "")
    .trim();
}

export function generateOrderRef() {
  const ts = Date.now().toString().slice(-8);
  const rnd = Math.floor(Math.random() * 9000 + 1000);
  return `${ts}${rnd}`;
}
