import type { Product } from "./products";

/** Cookie set by the age bubble: "1" = confirmed 18+, "0" = declined. */
export const AGE_COOKIE = "italiamo-age-ok";

/** True for products that may not be shown to visitors under 18. */
export function isAlcohol(p: Pick<Product, "category" | "alcohol">): boolean {
  if (p.category === "vino") return true;
  const pct = p.alcohol ? parseFloat(p.alcohol.replace(",", ".")) : 0;
  return Number.isFinite(pct) && pct > 0.5;
}

/** Client-side: has the visitor confirmed they are 18+ (cookie === "1")? */
export function isAdultClient(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie
    .split("; ")
    .some((c) => c === `${AGE_COOKIE}=1`);
}
