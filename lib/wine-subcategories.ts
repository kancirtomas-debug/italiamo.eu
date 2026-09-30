export type WineSubcategoryId =
  | "biele"
  | "ruzove"
  | "cervene"
  | "sumive"
  | "perlive"
  | "dezertne-sladke";

export type WineSubcategory = {
  id: WineSubcategoryId;
  sk: string;
  it: string;
};

// Flat wine taxonomy shown as a dropdown under the Víno category.
// Order defines display order in the shop sidebar and the admin picker.
export const WINE_SUBCATEGORIES: WineSubcategory[] = [
  { id: "biele", sk: "Biele", it: "White" },
  { id: "ruzove", sk: "Ružové", it: "Rosé" },
  { id: "cervene", sk: "Červené", it: "Red" },
  { id: "sumive", sk: "Šumivé", it: "Sparkling" },
  { id: "perlive", sk: "Perlivé", it: "Semi-sparkling" },
  { id: "dezertne-sladke", sk: "Dezertné a Sladké", it: "Sweet & dessert" },
];

export function getWineSubcategoryLabel(
  id: string | undefined | null,
  locale: "sk" | "en" = "sk",
): string | null {
  if (!id) return null;
  const entry = WINE_SUBCATEGORIES.find((w) => w.id === id);
  if (!entry) return null;
  return locale === "en" ? entry.it : entry.sk;
}
