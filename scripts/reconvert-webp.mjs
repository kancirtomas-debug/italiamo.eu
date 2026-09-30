// Reconvert every product image to high-quality WebP (<5 MB).
//
//   node --env-file=.env.local scripts/reconvert-webp.mjs          # dry run
//   node --env-file=.env.local scripts/reconvert-webp.mjs --apply  # mutate
//
// Converts JPG/PNG (and any non-webp) originals to WebP at top quality.
// Images already stored as WebP and under the size cap are left untouched so
// we never re-compress lossy->lossy and lose quality. Converted files are
// written to a NEW .webp path; the original object stays as a backup.

import postgres from "postgres";
import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";

const BUCKET = "product-images";
const APPLY = process.argv.includes("--apply");
const MAX_BYTES = 5 * 1024 * 1024;
const START_QUALITY = 95; // best-quality target
const MIN_QUALITY = 70; // floor if a file refuses to fit under 5 MB
const MAX_DIMENSION = 2600; // only used as a last resort to hit the size cap

const DB_URL = process.env.DATABASE_URL;
const SB_URL = process.env.SUPABASE_URL;
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!DB_URL || !SB_URL || !SB_KEY) {
  console.error("Missing DATABASE_URL / SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const sql = postgres(DB_URL, { prepare: false });
const supa = createClient(SB_URL, SB_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const MARKER = `/storage/v1/object/public/${BUCKET}/`;
const pathFromPublicUrl = (url) => {
  const i = url.indexOf(MARKER);
  return i === -1 ? null : url.slice(i + MARKER.length);
};
const publicUrl = (path) =>
  supa.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
const kb = (n) => (n >= 1024 * 1024 ? (n / 1024 / 1024).toFixed(2) + " MB" : Math.round(n / 1024) + " KB");

async function encodeWebp(input) {
  let quality = START_QUALITY;
  let dim = MAX_DIMENSION;
  let out = null;
  for (let i = 0; i < 10; i++) {
    let pipe = sharp(input, { failOn: "none" }).rotate(); // auto-orient
    const meta = await sharp(input, { failOn: "none" }).metadata();
    const longest = Math.max(meta.width || 0, meta.height || 0);
    if (longest > dim) pipe = pipe.resize({ width: meta.width >= meta.height ? dim : null, height: meta.height > meta.width ? dim : null, withoutEnlargement: true });
    out = await pipe.webp({ quality, effort: 6, smartSubsample: true }).toBuffer();
    if (out.byteLength <= MAX_BYTES) return { buffer: out, quality, dim };
    if (quality > MIN_QUALITY) quality -= 8;
    else dim = Math.round(dim * 0.85);
  }
  return { buffer: out, quality, dim }; // best effort
}

const rows = await sql`select id, slug, image from products order by slug`;
console.log(`\n${rows.length} products. apply=${APPLY}\n`);

const hist = {};
let converted = 0,
  keptWebp = 0,
  external = 0,
  failed = 0,
  savedBytes = 0;

for (const r of rows) {
  const path = pathFromPublicUrl(r.image);
  if (!path) {
    external++;
    console.log(`SKIP external   ${r.slug}  ${r.image.slice(0, 60)}`);
    continue;
  }
  const ext = (path.split(".").pop() || "").toLowerCase();
  hist[ext] = (hist[ext] || 0) + 1;

  try {
    const { data, error } = await supa.storage.from(BUCKET).download(path);
    if (error || !data) throw new Error(error?.message || "download failed");
    const input = Buffer.from(await data.arrayBuffer());

    if (ext === "webp" && input.byteLength <= MAX_BYTES) {
      keptWebp++;
      console.log(`KEEP  webp      ${r.slug}  ${kb(input.byteLength)}`);
      continue;
    }

    const { buffer, quality, dim } = await encodeWebp(input);
    const base = path.replace(/\.[^.]+$/, "");
    const newPath = `${base}.webp`;
    savedBytes += Math.max(0, input.byteLength - buffer.byteLength);
    converted++;
    console.log(
      `CONV  ${ext.padEnd(4)} -> webp ${r.slug}  ${kb(input.byteLength)} -> ${kb(buffer.byteLength)}  q${quality}${dim < MAX_DIMENSION ? ` dim${dim}` : ""}`,
    );

    if (APPLY) {
      const up = await supa.storage
        .from(BUCKET)
        .upload(newPath, buffer, { contentType: "image/webp", cacheControl: "31536000", upsert: true });
      if (up.error) throw new Error(up.error.message);
      const url = publicUrl(newPath);
      await sql`update products set image = ${url} where id = ${r.id}`;
    }
  } catch (e) {
    failed++;
    console.log(`FAIL  ${r.slug}  ${e.message}`);
  }
}

console.log(`\nformats: ${JSON.stringify(hist)}`);
console.log(
  `converted=${converted} keptWebp=${keptWebp} external=${external} failed=${failed} saved=${kb(savedBytes)}`,
);
console.log(APPLY ? "APPLIED — DB + storage updated." : "DRY RUN — nothing changed. Re-run with --apply.");

await sql.end();
process.exit(failed && APPLY ? 1 : 0);
