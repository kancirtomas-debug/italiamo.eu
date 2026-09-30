import { cacheLife, cacheTag } from "next/cache";
import { eq, asc } from "drizzle-orm";
import { db, withDbRetry } from "./db";
import { products as productsTable, categories as categoriesTable } from "./db/schema";
import type { Product, Category, CategoryRow } from "./products";

export const PRODUCTS_TAG = "products";
export const CATEGORIES_TAG = "categories";

type DbProduct = typeof productsTable.$inferSelect;
type DbCategory = typeof categoriesTable.$inferSelect;

function rowToProduct(r: DbProduct): Product {
  return {
    slug: r.slug,
    name: { sk: r.nameSk, en: r.nameIt },
    category: r.category as Category,
    subCategory: r.subCategory ?? undefined,
    price: r.price,
    compareAtPrice: r.compareAtPrice ?? undefined,
    volume: r.volume ?? undefined,
    region: r.region ?? undefined,
    winery: r.winery ?? undefined,
    vintage: r.vintage ?? undefined,
    alcohol: r.alcohol ?? undefined,
    description: { sk: r.descriptionSk, en: r.descriptionIt },
    image: r.image,
    inStock: r.inStock,
    featured: r.featured,
    woltUrl: r.woltUrl ?? undefined,
  };
}

function rowToCategory(r: DbCategory): CategoryRow {
  return { id: r.id as Category, sk: r.sk, en: r.it };
}

export async function getProducts(): Promise<Product[]> {
  "use cache";
  cacheTag(PRODUCTS_TAG);
  cacheLife("hours");
  const rows = await withDbRetry(() =>
    db
      .select()
      .from(productsTable)
      .orderBy(asc(productsTable.sortOrder), asc(productsTable.id)),
  );
  return rows.map(rowToProduct);
}

export async function getProduct(slug: string): Promise<Product | null> {
  "use cache";
  cacheTag(PRODUCTS_TAG, `product-${slug}`);
  cacheLife("hours");
  const rows = await withDbRetry(() =>
    db
      .select()
      .from(productsTable)
      .where(eq(productsTable.slug, slug))
      .limit(1),
  );
  return rows[0] ? rowToProduct(rows[0]) : null;
}

export async function getCategories(): Promise<CategoryRow[]> {
  "use cache";
  cacheTag(CATEGORIES_TAG);
  cacheLife("days");
  const rows = await withDbRetry(() =>
    db
      .select()
      .from(categoriesTable)
      .orderBy(asc(categoriesTable.sortOrder)),
  );
  return rows.map(rowToCategory);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  "use cache";
  cacheTag(PRODUCTS_TAG, "featured");
  cacheLife("hours");
  const rows = await withDbRetry(() =>
    db
      .select()
      .from(productsTable)
      .where(eq(productsTable.featured, true))
      .orderBy(asc(productsTable.sortOrder)),
  );
  return rows.map(rowToProduct);
}
