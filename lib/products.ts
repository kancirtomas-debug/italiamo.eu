export type Category =
  | "vino"
  | "kava"
  | "cestoviny"
  | "oleje"
  | "octy"
  | "pesta"
  | "omacky"
  | "cukrovinky"
  | "bio"
  | "krekry"
  | "dzusy";

export type Product = {
  slug: string;
  name: { sk: string; en: string };
  category: Category;
  subCategory?: string;
  price: number;
  compareAtPrice?: number;
  volume?: string;
  region?: string;
  winery?: string;
  vintage?: string;
  alcohol?: string;
  description: { sk: string; en: string };
  image: string;
  inStock: boolean;
  featured?: boolean;
  woltUrl?: string;
};

export type CategoryRow = { id: Category; sk: string; en: string };
