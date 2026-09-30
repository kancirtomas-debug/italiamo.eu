import { mkdirSync } from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const sharp = require("../node_modules/.pnpm/sharp@0.34.5/node_modules/sharp");

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "public", "blog");
mkdirSync(OUT, { recursive: true });

const px = (id, w = 1600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

// [outName, url]
const JOBS = [
  // Primitivo di Manduria
  ["primitivo-di-manduria-cover.webp", px(5633602)],
  ["primitivo-grapes-puglia.webp", px(27288918)],
  ["primitivo-pouring.webp", px(22469101)],
  ["primitivo-bottles-barrel.webp", px(36542254)],
  // Pesto Genovese
  ["pesto-genovese-cover.webp", px(4871374)],
  ["pesto-mortar-grinding.webp", px(4871372)],
  ["pesto-ingredients.webp", "https://images.pexels.com/photos/33249/parmesan-garlic-baslikium-pine-nuts.jpg?auto=compress&cs=tinysrgb&w=1600"],
  ["pesto-jar-basil.webp", px(5604824)],
  // Caffe Diemme
  ["caffe-diemme-cover.webp", px(269126)],
  ["caffe-espresso-machine.webp", px(15228655)],
  ["caffe-moka-stove.webp", px(714563)],
  ["caffe-espresso-cup.webp", px(6216300)],
];

async function one([name, url]) {
  try {
    const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!r.ok) return { name, status: `http ${r.status}` };
    const buf = Buffer.from(await r.arrayBuffer());
    await sharp(buf)
      .resize(1400, 1050, { fit: "cover", position: "centre" })
      .webp({ quality: 82 })
      .toFile(path.join(OUT, name));
    return { name, status: "ok", bytes: buf.length };
  } catch (e) {
    return { name, status: "err " + e.message };
  }
}

const results = [];
for (const job of JOBS) results.push(await one(job));
for (const r of results) console.log(`${r.status.padEnd(10)} ${r.name}`);
const ok = results.filter((r) => r.status === "ok").length;
console.log(`\n${ok}/${JOBS.length} downloaded`);
