import { NextResponse } from "next/server";
import { generateOrderRef } from "@/lib/utils";
import { createGoPayPayment } from "@/lib/gopay";

type CartItem = {
  slug: string;
  name: string;
  price: number;
  quantity: number;
};

type CheckoutPayload = {
  method: "card" | "bank";
  locale: "sk" | "it";
  contact: { name: string; email: string; phone: string };
  address: { street: string; city: string; zip: string; country: string };
  note?: string;
  items: CartItem[];
  total: number;
};

/**
 * Persist order. Dev = local JSON. Prod = log only (TODO: swap for DB —
 * Neon / Vercel Postgres / Upstash before go-live).
 */
async function persistOrder(order: object) {
  if (process.env.VERCEL || process.env.NODE_ENV === "production") {
    console.log("[order]", JSON.stringify(order));
    return;
  }
  const mod = await import("@/lib/orders-dev");
  await mod.appendOrderDev(order);
}

export async function POST(req: Request) {
  const data = (await req.json()) as CheckoutPayload;

  if (!data.items?.length) {
    return NextResponse.json({ error: "empty_cart" }, { status: 400 });
  }

  const reference = generateOrderRef();
  const order = {
    reference,
    createdAt: new Date().toISOString(),
    status: data.method === "bank" ? "awaiting_bank" : "awaiting_card",
    ...data,
  };

  await persistOrder(order);

  if (data.method === "card") {
    try {
      const gopayUrl = await createGoPayPayment({
        amount: data.total,
        reference,
        email: data.contact.email,
        locale: data.locale,
      });
      return NextResponse.json({ reference, gopayUrl });
    } catch (err) {
      console.error("GoPay error", err);
      // Sandbox fallback — proceed to success in dev
      return NextResponse.json({
        reference,
        gopayUrl: null,
        warn: "gopay_unavailable_dev",
      });
    }
  }

  return NextResponse.json({ reference });
}
