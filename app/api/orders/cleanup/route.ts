import { NextResponse } from "next/server";
import { purgeOldOrders, ORDER_RETENTION_DAYS } from "@/lib/orders";

/**
 * Cron: delete orders older than the retention window (1 year). Runs daily via
 * vercel.json crons. Protected by CRON_SECRET like the keep-alive cron.
 */
export async function GET(req: Request) {
  const auth = req.headers.get("authorization");
  const secret = process.env.CRON_SECRET;
  if (secret && auth !== `Bearer ${secret}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const deleted = await purgeOldOrders(ORDER_RETENTION_DAYS);
    return NextResponse.json({
      ok: true,
      deleted,
      retentionDays: ORDER_RETENTION_DAYS,
      ts: new Date().toISOString(),
    });
  } catch (e) {
    console.error("[orders/cleanup] failed", e);
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : String(e) },
      { status: 500 },
    );
  }
}
