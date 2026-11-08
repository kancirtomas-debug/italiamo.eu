/**
 * Product slugs that were renamed. Old URL -> new slug, answered with a
 * permanent redirect from the product page so links and Google keep working.
 * (Kept in code rather than next.config redirects because one old slug
 * contains spaces.)
 */
export const LEGACY_PRODUCT_SLUGS: Record<string, string> = {
  "SAN CARLO CHIPS": "san-carlo-waves-150g",
  "2825": "rosso-gargano-cherry-paradajky-400g",
};
