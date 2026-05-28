import { readFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const sharp = require("../node_modules/.pnpm/sharp@0.34.5/node_modules/sharp");

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "images", "products");
const URLS = readFileSync(path.join(ROOT, "scripts", "image-list.txt"), "utf8")
  .split("\n").map((l) => l.trim()).filter(Boolean);

mkdirSync(OUT_DIR, { recursive: true });

const SIZE_RE = /-\d+x\d+(?=\.\w+$)/;

function variants(url) {
  const base = url.replace(SIZE_RE, "");
  return [base, url.replace(SIZE_RE, "-1024x1024"), url.replace(SIZE_RE, "-600x600"), url];
}

async function fetchOne(url) {
  for (const u of variants(url)) {
    try {
      const r = await fetch(u, { headers: { "User-Agent": "Mozilla/5.0" } });
      if (r.ok) {
        const buf = Buffer.from(await r.arrayBuffer());
        if (buf.length > 1000) return { buf, src: u };
      }
    } catch {}
  }
  return null;
}

async function processOne(url) {
  const origName = path.basename(new URL(url).pathname);
  const outPath = path.join(OUT_DIR, origName);
  const fetched = await fetchOne(url);
  if (!fetched) return { url, status: "fail-fetch" };
  try {
    await sharp(fetched.buf)
      .flatten({ background: "#ffffff" })
      .trim({ background: "#ffffff", threshold: 12 })
      .resize(1000, 1000, {
        fit: "contain",
        background: "#ffffff",
        withoutEnlargement: false,
      })
      .extend({ top: 32, bottom: 32, left: 32, right: 32, background: "#ffffff" })
      .resize(1000, 1000, { fit: "contain", background: "#ffffff" })
      .jpeg({ quality: 88, mozjpeg: true })
      .toFile(outPath);
    return { url, status: "ok", src: fetched.src, out: origName };
  } catch (e) {
    return { url, status: "fail-process", err: e.message };
  }
}

const CONCURRENCY = 8;
const results = [];
let i = 0;
async function worker() {
  while (i < URLS.length) {
    const idx = i++;
    const r = await processOne(URLS[idx]);
    results.push(r);
    if (idx % 25 === 0) console.log(`${idx + 1}/${URLS.length}`);
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));

const ok = results.filter((r) => r.status === "ok").length;
const failFetch = results.filter((r) => r.status === "fail-fetch");
const failProc = results.filter((r) => r.status === "fail-process");
console.log(`\nOK: ${ok}/${URLS.length}`);
console.log(`fail-fetch: ${failFetch.length}`);
console.log(`fail-process: ${failProc.length}`);
writeFileSync(path.join(ROOT, "scripts", "refetch-report.json"), JSON.stringify(results, null, 2));
