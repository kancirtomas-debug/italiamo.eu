import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const ENDPOINT = "https://mrfakename-z-image-turbo.hf.space/gradio_api/call/generate_image";
const OUT_DIR = "C:/Users/kanci/Italiamo-website/public/blog";

const jobs = [
  {
    slug: "prosecco-vs-champagne-cava",
    prompt:
      "Three wine bottles on a rustic wooden table side by side: Italian Prosecco clear pale green, French Champagne dark green with gold foil, Spanish Cava clear with natural cork. Soft afternoon sunlight from a window on the left, long warm shadows, condensation droplets on glass. Shallow depth of field. Editorial beverage photography, magazine cover, cream linen background, no text, no logos, no labels.",
  },
  {
    slug: "carbonara-pravy-recept-talianska",
    prompt:
      "Authentic Roman carbonara in a wide white ceramic plate on a rustic dark wood table, spaghetti coated in glossy golden egg-yolk sauce, crispy diced guanciale, freshly cracked black pepper, fine Pecorino Romano grated on top, a fork twirling pasta. Overhead 45-degree angle, soft natural daylight from upper left, copper pan and pepper grinder soft focus background. Editorial food photography, magazine cover, no text, no logos.",
  },
  {
    slug: "balsamico-ocot-igp-modena-sprievodca",
    prompt:
      "Aged traditional Modena balsamic vinegar dripping slowly from a wooden tasting spoon onto a white porcelain plate, dark glossy mahogany-colored droplet caught mid-fall. Behind: small clear glass bottle and aged oak barrel staves with rustic texture, dim warm tungsten light, deep amber and chestnut tones. Editorial product photography from Emilia-Romagna Italy, magazine quality, shallow depth of field, no text, no logos, no labels.",
  },
  {
    slug: "olivovy-olej-apulia-pravy",
    prompt:
      "Apulian extra virgin olive oil being poured from a clear glass bottle into a small white ceramic tasting cup, vivid green-gold liquid catching late afternoon Mediterranean light. Fresh olive branches with green and dark olives scattered around, weathered limestone surface, rough rustic linen cloth. Long shadows, warm honey-toned light from the right, Puglia countryside aesthetic. Editorial food photography, magazine cover, no text, no logos, no labels.",
  },
  {
    slug: "cacio-e-pepe-recept-rim",
    prompt:
      "Roman cacio e pepe pasta in a deep wide ceramic bowl, glossy creamy Pecorino Romano sauce coating thick tonnarelli, abundant freshly cracked coarse black pepper visible on top, shaved Pecorino curls, copper sauté pan and mortar with pepper grains soft focus background. White marble countertop, soft diffused window light from the left side, overhead three-quarter angle. Editorial food photography, magazine cover, no text, no logos.",
  },
];

const WIDTH = 1344;
const HEIGHT = 768;
const STEPS = 9;
const SEED = 42;
const RANDOMIZE = true;

async function submit(prompt) {
  const r = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: [prompt, HEIGHT, WIDTH, STEPS, SEED, RANDOMIZE] }),
  });
  if (!r.ok) throw new Error(`submit ${r.status}`);
  const j = await r.json();
  return j.event_id;
}

async function poll(eventId) {
  const r = await fetch(`${ENDPOINT}/${eventId}`);
  if (!r.ok) throw new Error(`poll ${r.status}`);
  const text = await r.text();
  // SSE: lines like "event: complete\ndata: [...]"
  const m = text.match(/event: complete\s*\ndata: (.+)/);
  if (!m) {
    const err = text.match(/event: error\s*\ndata: (.+)/);
    if (err) throw new Error(`gradio error: ${err[1]}`);
    throw new Error(`no completion in stream: ${text.slice(0, 200)}`);
  }
  const data = JSON.parse(m[1]);
  return data[0].url;
}

async function download(url, dest) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`download ${r.status}`);
  const buf = Buffer.from(await r.arrayBuffer());
  await writeFile(dest, buf);
  return buf.length;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function generateOne(job, attempts = 4) {
  for (let i = 1; i <= attempts; i++) {
    try {
      const id = await submit(job.prompt);
      const url = await poll(id);
      const dest = path.join(OUT_DIR, `${job.slug}.png`);
      const bytes = await download(url, dest);
      return bytes;
    } catch (e) {
      const wait = 15_000 * i;
      console.log(`  retry ${i}/${attempts} after ${wait / 1000}s — ${e.message}`);
      await sleep(wait);
    }
  }
  throw new Error("exhausted retries");
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const only = process.argv.slice(2);
  const targets = only.length ? jobs.filter((j) => only.includes(j.slug)) : jobs;
  for (const job of targets) {
    process.stdout.write(`→ ${job.slug} ... `);
    const bytes = await generateOne(job);
    console.log(`✓ ${(bytes / 1024).toFixed(0)}KB`);
  }
}

main().catch((e) => {
  console.error("FAIL:", e.message);
  process.exit(1);
});
