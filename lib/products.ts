export type Category =
  | "vino"
  | "kava"
  | "cestoviny"
  | "olivy"
  | "oleje"
  | "octy"
  | "pesta"
  | "omacky"
  | "cukrovinky"
  | "bio"
  | "grisiny";

export type Product = {
  slug: string;
  name: { sk: string; it: string };
  category: Category;
  subCategory?: string;
  price: number;
  compareAtPrice?: number;
  volume?: string;
  region?: string;
  winery?: string;
  vintage?: string;
  alcohol?: string;
  description: { sk: string; it: string };
  image: string;
  inStock: boolean;
  featured?: boolean;
};

export type CategoryRow = { id: Category; sk: string; it: string };
