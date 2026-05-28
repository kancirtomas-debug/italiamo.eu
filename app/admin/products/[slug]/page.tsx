import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import { getCategories } from "@/lib/queries";
import { ProductForm } from "../product-form";
import { updateProduct } from "../../actions";

export default function EditProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <section className="max-w-[1400px] mx-auto px-6 py-10">
      <Link
        href="/admin/products"
        className="text-sm text-ink-500 hover:text-terracotta-600 mb-4 inline-block"
      >
        ← Späť na produkty
      </Link>
      <Suspense fallback={<p className="text-sm text-ink-500">Načítavam…</p>}>
        <EditProductContent params={params} />
      </Suspense>
    </section>
  );
}

async function EditProductContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [row] = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
  if (!row) notFound();
  const categories = await getCategories();
  const action = updateProduct.bind(null, slug);

  return (
    <>
      <h1 className="font-display text-3xl mb-2">{row.nameSk}</h1>
      <p className="text-xs font-mono text-ink-300 mb-8">{row.slug}</p>
      <ProductForm
        action={action}
        categories={categories.map((c) => ({ id: c.id, sk: c.sk }))}
        initial={row}
        mode="edit"
      />
    </>
  );
}
