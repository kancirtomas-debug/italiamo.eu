import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const sharp = require("../node_modules/.pnpm/sharp@0.34.5/node_modules/sharp");

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "images", "products");
mkdirSync(OUT_DIR, { recursive: true });

const TARGETS = [
  { out: "farfa-300x300.jpg", urls: [
    "https://shop.italiamo.eu/wp-content/uploads/2020/10/farfa.jpg",
    "https://shop.italiamo.eu/wp-content/uploads/2020/10/farfa-1024x1024.jpg",
    "https://shop.italiamo.eu/wp-content/uploads/2020/10/farfa-600x600.jpg",
  ]},
  { out: "fus-300x300.jpg", urls: [
    "https://shop.italiamo.eu/wp-content/uploads/2020/10/fus.jpg",
    "https://shop.italiamo.eu/wp-content/uploads/2020/10/fus-1024x1024.jpg",
    "https://shop.italiamo.eu/wp-content/uploads/2020/10/fus-600x600.jpg",
  ]},
  { out: "an-balsamico-300x300.jpg", urls: [
    "https://shop.italiamo.eu/wp-content/uploads/2020/10/an-balsamico.jpg",
    "https://shop.italiamo.eu/wp-content/uploads/2020/10/an-balsamico-1024x1024.jpg",
  ]},
  { out: "gastanovy-krem-300x300.jpg", urls: [
    "https://shop.italiamo.eu/wp-content/uploads/2020/10/gastanovy-krem.jpg",
    "https://shop.italiamo.eu/wp-content/uploads/2020/10/gastanovy-krem-1024x1024.jpg",
  ]},
  { out: "an-pesto-pardajka-300x300.jpg", urls: [
    "https://shop.italiamo.eu/wp-content/uploads/2020/10/an-pesto-pardajka.jpg",
    "https://shop.italiamo.eu/wp-content/uploads/2020/10/an-pesto-pardajka-1024x1024.jpg",
  ]},
  { out: "nicosia-frappato-300x300.jpg", urls: [
    "https://shop.italiamo.eu/wp-content/uploads/2020/10/nicosia-frapato-scaled.jpg",
    "https://shop.italiamo.eu/wp-content/uploads/2020/10/nicosia-frapato-2048x1356.jpg",
    "https://shop.italiamo.eu/wp-content/uploads/2020/10/nicosia-frapato-1536x1017.jpg",
    "https://shop.italiamo.eu/wp-content/uploads/2020/10/nicosia-frapato-1024x678.jpg",
  ]},
  { out: "jp_produkt_upravene_67-300x300.png", urls: [
    "https://shop.italiamo.eu/wp-content/uploads/2020/10/jp_produkt_upravene_67.png",
    "https://shop.italiamo.eu/wp-content/uploads/2020/10/jp_produkt_upravene_67-1536x1017.png",
    "https://shop.italiamo.eu/wp-content/uploads/2020/10/jp_produkt_upravene_67-1024x678.png",
  ]},
];

async function fetchOne(urls) {
  for (const u of urls) {
    try {
      const r = await fetch(u, { headers: { "User-Agent": "Mozilla/5.0" } });
      if (r.ok) {
        const buf = Buffer.from(await r.arrayBuffer());
        if (buf.length > 2000) return { buf, src: u };
      }
    } catch {}
  }
  return null;
}

async function process(t) {
  const fetched = await fetchOne(t.urls);
  if (!fetched) return { out: t.out, status: "fail-fetch" };
  const isPng = t.out.endsWith(".png");
  const outPath = path.join(OUT_DIR, t.out);

  // Pipeline: flatten on white, auto-trim (samples top-left corner),
  // then fit into 920x920, pad to 1000x1000 with white.
  let pipe = sharp(fetched.buf)
    .flatten({ background: "#ffffff" })
    .trim({ threshold: 20 });

  const meta = await pipe.clone().metadata();
  const inner = 920;
  const canvas = 1000;
  pipe = pipe
    .resize(inner, inner, { fit: "inside", background: "#ffffff", withoutEnlargement: false })
    .resize({
      width: canvas,
      height: canvas,
      fit: "contain",
      background: "#ffffff",
      position: "centre",
    });

  if (isPng) {
    await pipe.png({ quality: 92, compressionLevel: 9 }).toFile(outPath);
  } else {
    await pipe.jpeg({ quality: 90, mozjpeg: true }).toFile(outPath);
  }
  return { out: t.out, status: "ok", src: fetched.src, srcMeta: `${meta.width}x${meta.height}` };
}

for (const t of TARGETS) {
  const r = await process(t);
  console.log(JSON.stringify(r));
}
