import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const OUT_DIR = "C:/Users/kanci/Italiamo-website/public/blog";

const jobs = [
  {
    slug: "balsamico-ocot-igp-modena-sprievodca",
    prompt:
      "Aged traditional Modena balsamic vinegar dripping slowly from a wooden tasting spoon onto a white porcelain plate, dark glossy mahogany-colored droplet caught mid-fall. Behind: small clear glass bottle and aged oak barrel staves with rustic texture, dim warm tungsten light, deep amber and chestnut tones. Editorial product photography from Emilia-Romagna Italy, magazine quality, shallow depth of field, no text, no logos, no labels.",
  },
  {
    slug: "olivovy-olej-apulia-pravy",
    prompt:
      "Vibrant green-gold Apulian extra virgin olive oil being poured in a thin elegant stream from a clear glass cruet into a small white ceramic tasting cup on a weathered limestone slab, fresh olive branches with green and dark olives and silver-green leaves arranged around, a small stone olive press visible in soft focus background, warm Mediterranean afternoon golden hour light from upper right casting long shadows, terracotta and ochre tones, editorial food photography magazine cover, hyper-detailed liquid texture, no text, no logos, no labels, no bottles with labels.",
  },
  {
    slug: "cacio-e-pepe-recept-rim",
    prompt:
      "Authentic Roman cacio e pepe pasta in a wide shallow off-white ceramic bowl, long thick spaghetti tonnarelli pasta strands coated in glossy pale yellow Pecorino Romano cream sauce, ABUNDANT coarse cracked black pepper visibly speckled throughout the cream sauce and on top, dark black pepper specks scattered all over the pasta, shaved white Pecorino Romano curls, fork twirling pasta strands, copper saute pan with mortar and whole black peppercorns in soft focus background, white marble countertop, soft diffused natural window light from the left, overhead three-quarter 45 degree angle, editorial food magazine cover photography, no text, no logos, no alfredo, no fettuccine, no pappardelle.",
  },
];

const WIDTH = 1344;
const HEIGHT = 768;

function buildUrl(prompt, seed) {
  const params = new URLSearchParams({
    width: String(WIDTH),
    height: String(HEIGHT),
    nologo: "true",
    enhance: "true",
    model: "flux",
    seed: String(seed),
  });
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?${params}`;
}

async function fetchImage(url) {
  for (let i = 1; i <= 3; i++) {
    try {
      const r = await fetch(url, { signal: AbortSignal.timeout(180_000) });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return Buffer.from(await r.arrayBuffer());
    } catch (e) {
      if (i === 3) throw e;
      console.log(`  retry ${i}/3 — ${e.message}`);
      await new Promise((r) => setTimeout(r, 10_000 * i));
    }
  }
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const only = process.argv.slice(2);
  const targets = only.length ? jobs.filter((j) => only.includes(j.slug)) : jobs;
  let seed = Date.now() % 1_000_000;
  for (const job of targets) {
    process.stdout.write(`→ ${job.slug} ... `);
    const url = buildUrl(job.prompt, seed++);
    const buf = await fetchImage(url);
    const dest = path.join(OUT_DIR, `${job.slug}.png`);
    await writeFile(dest, buf);
    console.log(`✓ ${(buf.length / 1024).toFixed(0)}KB`);
  }
}

main().catch((e) => {
  console.error("FAIL:", e.message);
  process.exit(1);
});
