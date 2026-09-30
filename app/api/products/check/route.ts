import { NextResponse } from "next/server";
import { getProducts } from "@/lib/queries";

/**
 * Tells the client which cart slugs still exist in the catalog.
 * The cart lives in localStorage, so items can outlive the product they point
 * at (renamed slug, deleted product) - linking those to /shop/<slug> gave a 404.
 */
export async function POST(req: Request) {
  let slugs: string[] = [];
  try {
    const body = (await req.json()) as { slugs?: unknown };
    if (Array.isArray(body.slugs)) {
      slugs = body.slugs.filter((s): s is string => typeof s === "string").slice(0, 200);
    }
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  if (slugs.length === 0) return NextResponse.json({ available: [], missing: [] });

  const products = await getProducts();
  const live = new Map(products.map((p) => [p.slug, p]));

  const available: string[] = [];
  const missing: string[] = [];
  for (const slug of slugs) {
    if (live.has(slug)) available.push(slug);
    else missing.push(slug);
  }

  return NextResponse.json({
    available,
    missing,
    // Fresh price/name/image for the still-valid slugs, so a stale cart entry
    // never shows an outdated price or a dead image URL.
    fresh: available.map((slug) => {
      const p = live.get(slug)!;
      return {
        slug,
        price: p.price,
        image: p.image,
        inStock: p.inStock,
        name: p.name,
      };
    }),
  });
}
