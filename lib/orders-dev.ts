/**
 * Dev-only order persistence - local JSON file.
 * Loaded via dynamic import so it never reaches the serverless bundle.
 *
 * Production: replace with Vercel Postgres / Neon / Upstash, etc.
 */
import fs from "node:fs/promises";
import path from "node:path";

const ORDERS_FILE = path.join(process.cwd(), "data", "orders.json");

export async function appendOrderDev(order: object) {
  await fs.mkdir(path.dirname(ORDERS_FILE), { recursive: true });
  let arr: object[] = [];
  try {
    const txt = await fs.readFile(ORDERS_FILE, "utf-8");
    arr = JSON.parse(txt);
  } catch {
    /* first write */
  }
  arr.push(order);
  await fs.writeFile(ORDERS_FILE, JSON.stringify(arr, null, 2));
}
