import Link from "next/link";
import { ProductForm } from "../product-form";
import { getCategories } from "@/lib/queries";
import { createProduct } from "../../actions";

export default async function NewProductPage() {
  const categories = await getCategories();
  return (
    <section className="max-w-[1400px] mx-auto px-6 py-10">
      <Link
        href="/admin/products"
        className="text-sm text-ink-500 hover:text-terracotta-600 mb-4 inline-block"
      >
        ← Späť na produkty
      </Link>
      <h1 className="font-display text-3xl mb-8">Nový produkt</h1>
      <ProductForm
        action={createProduct}
        categories={categories.map((c) => ({ id: c.id, sk: c.sk }))}
        initial={{}}
        mode="create"
      />
    </section>
  );
}
