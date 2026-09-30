"use server";

import { updateTag, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq, inArray, sql } from "drizzle-orm";
import { db, withDbRetry } from "@/lib/db";
import { products, categories, b2bAccounts } from "@/lib/db/schema";
import { PRODUCTS_TAG, CATEGORIES_TAG } from "@/lib/queries";
import { auth } from "@/lib/auth";
import {
  supabaseAdmin,
  PRODUCT_IMAGES_BUCKET,
  publicUrl,
  pathFromPublicUrl,
} from "@/lib/supabase";

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

const MAX_UPLOAD_BYTES = 2.5 * 1024 * 1024;

class UploadError extends Error {}

async function uploadImage(file: File): Promise<string | null> {
  if (!file || file.size === 0) return null;
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new UploadError("Príliš veľká fotka, fotka musí byť max 2,5 MB");
  }
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${Date.now()}-${slugify(file.name.replace(/\.[^.]+$/, ""))}.${ext}`;
  const contentType =
    file.type || (ext === "png" ? "image/png" : ext === "webp" ? "image/webp" : "image/jpeg");

  const { error } = await supabaseAdmin.storage
    .from(PRODUCT_IMAGES_BUCKET)
    .upload(path, file, { contentType, cacheControl: "31536000", upsert: true });

  if (error) throw new UploadError(error.message);

  return publicUrl(path);
}

export type CategoryState = {
  error?: string;
  category?: { id: string; sk: string; it: string };
};

/**
 * Create a category straight from the product form (create + edit).
 * Called as a plain server action from the client, so it returns the new row
 * instead of redirecting.
 */
export async function createCategory(input: {
  sk: string;
  it?: string;
  id?: string;
}): Promise<CategoryState> {
  await requireAuth();
  try {
    const sk = (input.sk || "").trim();
    if (!sk) return { error: "Názov kategórie (SK) je povinný" };
    const it = (input.it || "").trim() || sk;
    const id = slugify((input.id || "").trim() || sk);
    if (!id) return { error: "Neplatné ID kategórie" };

    const existing = await withDbRetry(() =>
      db
        .select({ id: categories.id })
        .from(categories)
        .where(eq(categories.id, id))
        .limit(1),
    );
    if (existing[0]) return { error: `Kategória "${id}" už existuje` };

    const maxSort = await withDbRetry(() =>
      db
        .select({ m: sql<number>`coalesce(max(${categories.sortOrder}), 0)` })
        .from(categories),
    );

    await db
      .insert(categories)
      .values({ id, sk, it, sortOrder: (maxSort[0]?.m ?? 0) + 1 });

    updateTag(CATEGORIES_TAG);
    return { category: { id, sk, it } };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Chyba" };
  }
}

export async function createProduct(prev: FormState, formData: FormData): Promise<FormState> {
  await requireAuth();
  try {
    const nameSk = (formData.get("nameSk") as string).trim();
    const nameIt = (formData.get("nameIt") as string).trim() || nameSk;
    const slug = ((formData.get("slug") as string)?.trim() || slugify(nameSk));
    if (!slug) return { error: "Slug required" };
    const existing = await withDbRetry(() =>
      db.select({ id: products.id }).from(products).where(eq(products.slug, slug)).limit(1),
    );
    if (existing[0]) return { error: "Slug už existuje" };

    const imageFile = formData.get("image") as File | null;
    const imageUrl = imageFile ? await uploadImage(imageFile) : null;
    if (!imageUrl) return { error: "Obrázok je povinný" };

    const maxSort = await withDbRetry(() =>
      db.select({ m: sql<number>`coalesce(max(${products.sortOrder}), 0)` }).from(products),
    );

    await db.insert(products).values({
      slug,
      nameSk,
      nameIt,
      category: formData.get("category") as string,
      subCategory: (formData.get("subCategory") as string) || null,
      price: Number(formData.get("price")),
      compareAtPrice: formData.get("compareAtPrice") ? Number(formData.get("compareAtPrice")) : null,
      volume: (formData.get("volume") as string) || null,
      winery: (formData.get("winery") as string) || null,
      vintage: (formData.get("vintage") as string) || null,
      alcohol: (formData.get("alcohol") as string) || null,
      descriptionSk: (formData.get("descriptionSk") as string) || "",
      descriptionIt: (formData.get("descriptionIt") as string) || "",
      image: imageUrl,
      inStock: formData.get("inStock") === "on",
      featured: formData.get("featured") === "on",
      woltUrl: ((formData.get("woltUrl") as string) || "").trim() || null,
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
      winery: (formData.get("winery") as string) || null,
      vintage: (formData.get("vintage") as string) || null,
      alcohol: (formData.get("alcohol") as string) || null,
      descriptionSk: (formData.get("descriptionSk") as string) || "",
      descriptionIt: (formData.get("descriptionIt") as string) || "",
      inStock: formData.get("inStock") === "on",
      featured: formData.get("featured") === "on",
      woltUrl: ((formData.get("woltUrl") as string) || "").trim() || null,
      updatedAt: new Date(),
    };
    if (newImageUrl) updates.image = newImageUrl;

    await withDbRetry(() => db.update(products).set(updates).where(eq(products.slug, slug)));
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
  const rows = await withDbRetry(() =>
    db.select({ image: products.image }).from(products).where(inArray(products.id, ids)),
  );
  await withDbRetry(() => db.delete(products).where(inArray(products.id, ids)));
  // Best-effort storage cleanup - Supabase storage only (old Vercel Blob URLs stay orphaned)
  const supabasePaths: string[] = [];
  for (const r of rows) {
    if (!r.image) continue;
    const p = pathFromPublicUrl(r.image);
    if (p) supabasePaths.push(p);
  }
  if (supabasePaths.length) {
    try {
      await supabaseAdmin.storage.from(PRODUCT_IMAGES_BUCKET).remove(supabasePaths);
    } catch {}
  }
  updateTag(PRODUCTS_TAG);
}

export async function reorderProducts(orderedIds: number[]) {
  await requireAuth();
  for (let i = 0; i < orderedIds.length; i++) {
    await withDbRetry(() =>
      db.update(products).set({ sortOrder: i }).where(eq(products.id, orderedIds[i])),
    );
  }
  updateTag(PRODUCTS_TAG);
}

export async function setProductsFeatured(updates: { id: number; featured: boolean }[]) {
  await requireAuth();
  if (updates.length === 0) return;
  const on = updates.filter((u) => u.featured).map((u) => u.id);
  const off = updates.filter((u) => !u.featured).map((u) => u.id);
  if (on.length)
    await withDbRetry(() =>
      db.update(products).set({ featured: true }).where(inArray(products.id, on)),
    );
  if (off.length)
    await withDbRetry(() =>
      db.update(products).set({ featured: false }).where(inArray(products.id, off)),
    );
  updateTag(PRODUCTS_TAG);
}

export async function setB2bStatus(formData: FormData) {
  await requireAuth();
  const ico = String(formData.get("ico") ?? "").trim();
  const status = String(formData.get("status") ?? "");
  if (!ico || !["approved", "rejected"].includes(status)) return;
  await withDbRetry(() =>
    db
      .update(b2bAccounts)
      .set({ status, updatedAt: new Date() })
      .where(eq(b2bAccounts.ico, ico)),
  );
  revalidatePath("/admin/b2b");
}
