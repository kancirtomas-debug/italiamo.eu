// Setup product-images bucket + migrate all Vercel Blob images to Supabase.
// Run: node --env-file=.env.local scripts/supabase-setup-and-migrate.mjs

import { createClient } from "@supabase/supabase-js";
import postgres from "postgres";

const BUCKET = "product-images";
const url = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const dbUrl = process.env.DATABASE_URL;
if (!url || !serviceKey) throw new Error("SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing");
if (!dbUrl) throw new Error("DATABASE_URL missing");

const sb = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});
const sql = postgres(dbUrl, { prepare: false });

function slugify(s) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}

function publicUrl(path) {
  return sb.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}

function pathFromSupabaseUrl(u) {
  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const i = u.indexOf(marker);
  return i === -1 ? null : u.slice(i + marker.length);
}

async function ensureBucket() {
  const { data: list, error: listErr } = await sb.storage.listBuckets();
  if (listErr) throw listErr;
  if (list.find((b) => b.name === BUCKET)) {
    console.log(`[bucket] ${BUCKET} exists`);
    return;
  }
  const { error } = await sb.storage.createBucket(BUCKET, {
    public: true,
    fileSizeLimit: 5 * 1024 * 1024,
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/avif"],
  });
  if (error) throw error;
  console.log(`[bucket] created ${BUCKET}`);
}

async function migrate() {
  const rows = await sql`SELECT id, slug, image FROM products ORDER BY id`;
  console.log(`[migrate] ${rows.length} products`);

  let migrated = 0;
  let skipped = 0;
  let failed = 0;

  for (const r of rows) {
    if (!r.image) {
      skipped++;
      continue;
    }
    if (pathFromSupabaseUrl(r.image)) {
      skipped++;
      continue;
    }

    try {
      const res = await fetch(r.image);
      if (!res.ok) throw new Error(`fetch ${res.status}`);
      const contentType = res.headers.get("content-type") || "image/jpeg";
      const buf = Buffer.from(await res.arrayBuffer());
      const extFromCt =
        contentType.includes("png") ? "png" :
        contentType.includes("webp") ? "webp" :
        contentType.includes("avif") ? "avif" : "jpg";
      const path = `${r.id}-${slugify(r.slug)}.${extFromCt}`;

      const { error: upErr } = await sb.storage
        .from(BUCKET)
        .upload(path, buf, { contentType, cacheControl: "31536000", upsert: true });
      if (upErr) throw upErr;

      const newUrl = publicUrl(path);
      await sql`UPDATE products SET image = ${newUrl}, updated_at = NOW() WHERE id = ${r.id}`;
      migrated++;
      console.log(`  ✓ ${r.slug} -> ${path}`);
    } catch (e) {
      failed++;
      console.error(`  ✗ ${r.slug}: ${e.message}`);
    }
  }

  console.log(`[migrate] done. migrated=${migrated} skipped=${skipped} failed=${failed}`);
}

await ensureBucket();
await migrate();
await sql.end();
