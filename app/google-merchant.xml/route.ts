import { getProducts } from "@/lib/queries";
import type { Product, Category } from "@/lib/products";

// Google Merchant Center product feed (RSS 2.0 + g: namespace).
// Register the public URL https://italiamo.eu/google-merchant.xml as a
// "Scheduled fetch" data source in Merchant Center. Google re-fetches it on the
// schedule you set (daily is fine here) and lists the products in free listings
// / Shopping ads.
//
// Market: Slovakia, Slovak language, EUR. The feed is built from the live DB so
// price / availability stay in sync automatically.

const BASE = "https://italiamo.eu";
const FEED_LOCALE = "sk" as const;

// Google product category (numeric taxonomy IDs). Only set where we are
// certain — Google auto-assigns the rest. Wine MUST carry the alcohol category.
const GOOGLE_CATEGORY: Partial<Record<Category, string>> = {
  vino: "421", // Food, Beverages & Tobacco > Beverages > Alcoholic Beverages > Wine
  kava: "1868", // Beverages > Coffee
};

const CATEGORY_LABEL: Record<Category, string> = {
  vino: "Víno",
  kava: "Káva",
  cestoviny: "Cestoviny",
  oleje: "Oleje",
  octy: "Octy",
  pesta: "Pestá",
  omacky: "Omáčky",
  cukrovinky: "Cukrovinky",
  bio: "Bio",
  krekry: "Krekry",
  dzusy: "Džúsy",
};

function xmlEscape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function absolute(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${BASE}${path.startsWith("/") ? "" : "/"}${path}`;
}

function priceStr(value: number): string {
  return `${value.toFixed(2)} EUR`;
}

// Best-effort brand: explicit winery, else fall back to the shop name.
function brandOf(p: Product): string {
  return p.winery?.trim() || "Italiamo";
}

function item(p: Product): string {
  const title = p.name[FEED_LOCALE];
  const desc = p.description[FEED_LOCALE] || title;
  const link = `${BASE}/${FEED_LOCALE}/shop/${p.slug}`;
  const image = absolute(p.image);
  const availability = p.inStock ? "in_stock" : "out_of_stock";

  // compareAtPrice is the higher "original" price → model it as a sale.
  const onSale =
    typeof p.compareAtPrice === "number" && p.compareAtPrice > p.price;
  const regular = onSale ? p.compareAtPrice! : p.price;

  const lines: string[] = [
    `<g:id>${xmlEscape(p.slug)}</g:id>`,
    `<g:title>${xmlEscape(title)}</g:title>`,
    `<g:description>${xmlEscape(desc)}</g:description>`,
    `<g:link>${xmlEscape(link)}</g:link>`,
    `<g:image_link>${xmlEscape(image)}</g:image_link>`,
    `<g:availability>${availability}</g:availability>`,
    `<g:price>${priceStr(regular)}</g:price>`,
    `<g:condition>new</g:condition>`,
    `<g:brand>${xmlEscape(brandOf(p))}</g:brand>`,
    // No barcodes in the catalog yet → declare identifiers absent. mpn=slug
    // gives Google a stable per-item reference. Replace with real g:gtin once
    // barcodes are captured (see follow-ups).
    `<g:mpn>${xmlEscape(p.slug)}</g:mpn>`,
    `<g:identifier_exists>no</g:identifier_exists>`,
    `<g:product_type>${xmlEscape(CATEGORY_LABEL[p.category] ?? p.category)}</g:product_type>`,
  ];

  if (onSale) lines.push(`<g:sale_price>${priceStr(p.price)}</g:sale_price>`);

  const gpc = GOOGLE_CATEGORY[p.category];
  if (gpc) lines.push(`<g:google_product_category>${gpc}</g:google_product_category>`);

  return `    <item>\n      ${lines.join("\n      ")}\n    </item>`;
}

export async function GET() {
  let products: Product[] = [];
  try {
    products = await getProducts();
  } catch {
    products = [];
  }

  // Only advertise sellable items with an image.
  const sellable = products.filter((p) => p.image);

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">\n` +
    `  <channel>\n` +
    `    <title>Italiamo</title>\n` +
    `    <link>${BASE}</link>\n` +
    `    <description>Autentické talianske potraviny, víno a káva</description>\n` +
    sellable.map(item).join("\n") +
    `\n  </channel>\n` +
    `</rss>\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
