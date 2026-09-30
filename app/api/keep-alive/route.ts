import { NextResponse } from "next/server";
import postgres from "postgres";
import { supabaseAdmin, PRODUCT_IMAGES_BUCKET } from "@/lib/supabase";

export async function GET(req: Request) {
  const auth = req.headers.get("authorization");
  const secret = process.env.CRON_SECRET;
  if (secret && auth !== `Bearer ${secret}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const out: Record<string, unknown> = { ts: new Date().toISOString() };

  try {
    const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 });
    const [{ count }] = await sql`SELECT count(*)::int AS count FROM products`;
    await sql.end();
    out.db = { ok: true, products: count };
  } catch (e) {
    out.db = { ok: false, error: e instanceof Error ? e.message : String(e) };
  }

  try {
    const { data, error } = await supabaseAdmin.storage
      .from(PRODUCT_IMAGES_BUCKET)
      .list("", { limit: 1 });
    if (error) throw error;
    out.storage = { ok: true, files: data?.length ?? 0 };
  } catch (e) {
    out.storage = { ok: false, error: e instanceof Error ? e.message : String(e) };
  }

  return NextResponse.json(out);
}
