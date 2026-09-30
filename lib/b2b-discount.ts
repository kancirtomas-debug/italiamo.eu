export type DiscountTier = {
  id: "t1" | "t2" | "t3";
  min: number;
  max: number | null;
  pct: number;
};

export const B2B_TIERS: DiscountTier[] = [
  { id: "t1", min: 0, max: 500, pct: 0.05 },
  { id: "t2", min: 500, max: 1500, pct: 0.15 },
  { id: "t3", min: 1500, max: null, pct: 0.17 },
];

export function getTier(subtotal: number): DiscountTier {
  return (
    B2B_TIERS.slice()
      .reverse()
      .find((t) => subtotal >= t.min) ?? B2B_TIERS[0]
  );
}

export function getNextTier(subtotal: number): DiscountTier | null {
  return B2B_TIERS.find((t) => t.min > subtotal) ?? null;
}

export function computeDiscount(subtotal: number, isB2B: boolean) {
  if (!isB2B || subtotal <= 0) {
    return { pct: 0, amount: 0, tier: null as DiscountTier | null, next: null as DiscountTier | null };
  }
  const tier = getTier(subtotal);
  const next = getNextTier(subtotal);
  const amount = subtotal * tier.pct;
  return { pct: tier.pct, amount, tier, next };
}
