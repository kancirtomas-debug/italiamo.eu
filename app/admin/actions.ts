"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { eq, inArray, sql } from "drizzle-orm";
import { put, del } from "@vercel/blob";
import { db } from "@/lib/db";
import { products, categories } from "@/lib/db/schema";
import { PRODUCTS_TAG, CATEGORIES_TAG } from "@/lib/queries";
import { auth } from "@/lib/auth";

async function requireAuth() {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}

export type FormState = { error?: string; ok?: boolean };

async function uploadImage(file: File): Promise<string | null> {
  if (!file || file.size === 0) return null;
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const filename = `products/${Date.now()}-${slugify(file.name.replace(/\.[^.]+$/, ""))}.${ext}`;
  const blob = await put(filename, file, {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: false,
    contentType: file.type || (ext === "png" ? "image/png" : "image/jpeg"),
  });
  return blob.url;
}

export async function createProduct(prev: FormState, formData: FormData): Promise<FormState> {
  await requireAuth();
  try {
    const nameSk = (formData.get("nameSk") as string).trim();
    const nameIt = (formData.get("nameIt") as string).trim() || nameSk;
    const slug = ((formData.get("slug") as string)?.trim() || slugify(nameSk));
    if (!slug) return { error: "Slug required" };
    const existing = await db.select({ id: products.id }).from(products).where(eq(products.slug, slug)).limit(1);
    if (existing[0]) return { error: "Slug už existuje" };

    const imageFile = formData.get("image") as File | null;
    const imageUrl = imageFile ? await uploadImage(imageFile) : null;
    if (!imageUrl) return { error: "Obrázok je povinný" };

    const maxSort = await db.select({ m: sql<number>`coalesce(max(${products.sortOrder}), 0)` }).from(products);

    await db.insert(products).values({
      slug,
      nameSk,
      nameIt,
      category: formData.get("category") as string,
      subCategory: (formData.get("subCategory") as string) || null,
      price: Number(formData.get("price")),
      compareAtPrice: formData.get("compareAtPrice") ? Number(formData.get("compareAtPrice")) : null,
      volume: (formData.get("volume") as string) || null,
      region: (formData.get("region") as string) || null,
      winery: (formData.get("winery") as string) || null,
      vintage: (formData.get("vintage") as string) || null,
      alcohol: (formData.get("alcohol") as string) || null,
      descriptionSk: (formData.get("descriptionSk") as string) || "",
      descriptionIt: (formData.get("descriptionIt") as string) || "",
      image: imageUrl,
      inStock: formData.get("inStock") === "on",
      featured: formData.get("featured") === "on",
      sortOrder: (maxSort[0]?.m ?? 0) + 1,
    });
    updateTag(PRODUCTS_TAG);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Chyba" };
  }
  redirect("/admin/products");
}

export async function updateProduct(slug: string, prev: FormState, formData: FormData): Promise<FormState> {
  await requireAuth();
  try {
    const imageFile = formData.get("image") as File | null;
    const newImageUrl = imageFile && imageFile.size > 0 ? await uploadImage(imageFile) : null;

    const updates: Record<string, unknown> = {
      nameSk: (formData.get("nameSk") as string).trim(),
      nameIt: ((formData.get("nameIt") as string).trim() || (formData.get("nameSk") as string).trim()),
      category: formData.get("category") as string,
      subCategory: (formData.get("subCategory") as string) || null,
      price: Number(formData.get("price")),
      compareAtPrice: formData.get("compareAtPrice") ? Number(formData.get("compareAtPrice")) : null,
      volume: (formData.get("volume") as string) || null,
      region: (formData.get("region") as string) || null,
      winery: (formData.get("winery") as string) || null,
      vintage: (formData.get("vintage") as string) || null,
      alcohol: (formData.get("alcohol") as string) || null,
      descriptionSk: (formData.get("descriptionSk") as string) || "",
      descriptionIt: (formData.get("descriptionIt") as string) || "",
      inStock: formData.get("inStock") === "on",
      featured: formData.get("featured") === "on",
      updatedAt: new Date(),
    };
    if (newImageUrl) updates.image = newImageUrl;

    await db.update(products).set(updates).where(eq(products.slug, slug));
    updateTag(PRODUCTS_TAG);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Chyba" };
  }
  redirect("/admin/products");
}

export async function deleteProducts(formData: FormData) {
  await requireAuth();
  const ids = formData.getAll("ids").map(Number).filter(Boolean);
  if (ids.length === 0) return;
  const rows = await db.select({ image: products.image }).from(products).where(inArray(products.id, ids));
  await db.delete(products).where(inArray(products.id, ids));
  // Best-effort blob cleanup — only if image hosted on Vercel Blob
  for (const r of rows) {
    if (r.image?.includes("blob.vercel-storage.com")) {
      try {
        await del(r.image);
      } catch {}
    }
  }
  updateTag(PRODUCTS_TAG);
}

export async function reorderProducts(orderedIds: number[]) {
  await requireAuth();
  for (let i = 0; i < orderedIds.length; i++) {
    await db.update(products).set({ sortOrder: i }).where(eq(products.id, orderedIds[i]));
  }
  updateTag(PRODUCTS_TAG);
}
