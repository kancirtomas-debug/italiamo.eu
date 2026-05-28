import { readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const postgres = require("postgres");
const { drizzle } = require("drizzle-orm/postgres-js");
const { put } = require("@vercel/blob");

const ROOT = path.resolve(import.meta.dirname, "..");
const PUBLIC_IMG = path.join(ROOT, "public", "images", "products");

const conn = process.env.DATABASE_URL;
const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
if (!conn) throw new Error("DATABASE_URL missing");
if (!blobToken) throw new Error("BLOB_READ_WRITE_TOKEN missing");

const sql = postgres(conn, { prepare: false });

// Parse lib/products.ts manually — strip the TS into a CJS-evaluable form.
const tsSource = readFileSync(path.join(ROOT, "lib", "products.ts"), "utf8");
const productsArr = tsSource.match(/export const products[^=]*=\s*(\[[\s\S]*?\n\]);/)?.[1];
const categoriesArr = tsSource.match(/export const categories[^=]*=\s*(\[[\s\S]*?\n\]);/)?.[1];
if (!productsArr || !categoriesArr) throw new Error("Could not parse products.ts");
const products = eval(productsArr);
const categories = eval(categoriesArr);
console.log(`Parsed ${products.length} products, ${categories.length} categories`);

await sql`TRUNCATE TABLE products RESTART IDENTITY CASCADE`;
await sql`TRUNCATE TABLE categories CASCADE`;

for (let i = 0; i < categories.length; i++) {
  const c = categories[i];
  await sql`INSERT INTO categories (id, sk, it, sort_order) VALUES (${c.id}, ${c.sk}, ${c.it}, ${i})`;
}
console.log(`Seeded ${categories.length} categories`);

const uploadedCache = new Map();

async function uploadImage(localPath) {
  if (uploadedCache.has(localPath)) return uploadedCache.get(localPath);
  const filename = path.basename(localPath);
  const fileBuf = await readFile(path.join(ROOT, "public", localPath.replace(/^\//, "")));
  const blob = await put(`products/${filename}`, fileBuf, {
    access: "public",
    token: blobToken,
    contentType: filename.endsWith(".png") ? "image/png" : "image/jpeg",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
  uploadedCache.set(localPath, blob.url);
  return blob.url;
}

const placeholder = await uploadImage("/images/products/placeholder.svg").catch(() => "/images/products/placeholder.svg");

for (let i = 0; i < products.length; i++) {
  const p = products[i];
  let imageUrl = placeholder;
  try {
    imageUrl = await uploadImage(p.image);
  } catch (e) {
    console.warn(`upload fail ${p.slug}: ${e.message}`);
  }
  await sql`
    INSERT INTO products (
      slug, name_sk, name_it, category, sub_category, price, compare_at_price,
      volume, region, winery, vintage, alcohol, description_sk, description_it,
      image, in_stock, featured, sort_order
    ) VALUES (
      ${p.slug}, ${p.name.sk}, ${p.name.it}, ${p.category}, ${p.subCategory ?? null},
      ${p.price}, ${p.compareAtPrice ?? null},
      ${p.volume ?? null}, ${p.region ?? null}, ${p.winery ?? null},
      ${p.vintage ?? null}, ${p.alcohol ?? null},
      ${p.description?.sk ?? ""}, ${p.description?.it ?? ""},
      ${imageUrl}, ${p.inStock ?? true}, ${p.featured ?? false}, ${i}
    )
  `;
  if (i % 25 === 0) console.log(`${i + 1}/${products.length}`);
}

console.log(`Seeded ${products.length} products. Uploads cached: ${uploadedCache.size}`);
await sql.end();
