import { NextResponse } from "next/server";
import { getGoPayPaymentState } from "@/lib/gopay";
import { getOrderByGopayId, setOrderStatus } from "@/lib/orders";
import { sendPaidOrderEmails } from "@/lib/order-email";

/**
 * GoPay notification webhook. GoPay calls this (GET with ?id=, sometimes POST)
 * whenever a payment changes state. We NEVER trust the payload's contents for
 * money decisions: we take only the payment id, then ask GoPay for the real
 * state and update our order accordingly.
 */
async function handle(id: string | null) {
  if (!id) return NextResponse.json({ ok: false, error: "no_id" }, { status: 400 });

  let state: string;
  try {
    state = await getGoPayPaymentState(id);
  } catch (err) {
    console.error("[gopay] state lookup failed", err);
    // 200 so GoPay doesn't hammer retries forever on our transient errors;
    // the admin can reconcile from the dashboard if needed.
    return NextResponse.json({ ok: false, error: "lookup_failed" });
  }

  const order = await getOrderByGopayId(id);
  if (!order) {
    console.warn("[gopay] notify for unknown payment id", id, state);
    return NextResponse.json({ ok: true, note: "unknown_order" });
  }

  if (state === "PAID") {
    if (order.status !== "paid") {
      const updated = await setOrderStatus(order.reference, "paid", { paid: true });
      if (updated) {
        try {
          await sendPaidOrderEmails(updated);
        } catch (e) {
          console.error("[gopay] order email failed", e);
        }
      }
    }
  } else if (["CANCELED", "TIMEOUTED"].includes(state)) {
    if (order.status !== "paid") await setOrderStatus(order.reference, "failed");
  }

  return NextResponse.json({ ok: true, state });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  return handle(searchParams.get("id"));
}

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  let id = searchParams.get("id");
  if (!id) {
    try {
      const body = (await req.json()) as { id?: string | number };
      if (body?.id != null) id = String(body.id);
    } catch {
      /* not JSON */
    }
  }
  return handle(id);
}
