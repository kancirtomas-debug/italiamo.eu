import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { generateOrderRef } from "@/lib/utils";
import { createGoPayPayment } from "@/lib/gopay";
import { createOrder, setOrderGopayId } from "@/lib/orders";
import { getProducts } from "@/lib/queries";
import { computeDiscount } from "@/lib/b2b-discount";
import { db, withDbRetry } from "@/lib/db";
import { b2bAccounts } from "@/lib/db/schema";
import { B2B_COOKIE, readB2bToken } from "@/lib/b2b-session";

type CartItem = {
  slug: string;
  name: string;
  price: number;
  quantity: number;
};

type CheckoutPayload = {
  method: "card" | "bank";
  locale: "sk" | "en";
  contact: { name: string; email: string; phone: string };
  address: { street: string; city: string; zip: string; country: string };
  note?: string;
  items: CartItem[];
  total: number;
};

const FREE_SHIP = 60;
const SHIPPING = 5.9;

/** Business pricing only for a signed session whose company is still approved. */
async function resolveB2b(): Promise<{ ico: string; company: string } | null> {
  const token = (await cookies()).get(B2B_COOKIE)?.value;
  const payload = readB2bToken(token);
  if (!payload) return null;

  const rows = await withDbRetry(() =>
    db
      .select({ status: b2bAccounts.status, company: b2bAccounts.company })
      .from(b2bAccounts)
      .where(eq(b2bAccounts.ico, payload.ico))
      .limit(1),
  );
  if (rows[0]?.status !== "approved") return null;
  return { ico: payload.ico, company: rows[0].company };
}

const round = (n: number) => Math.round(n * 100) / 100;

export async function POST(req: Request) {
  const data = (await req.json()) as CheckoutPayload;

  if (!data.items?.length) {
    return NextResponse.json({ error: "empty_cart" }, { status: 400 });
  }

  // Prices, discount and total are recomputed here. Anything the client sent
  // about money is treated as a hint, never as fact.
  const catalog = new Map((await getProducts()).map((p) => [p.slug, p]));
  const items: (CartItem & { unitPrice: number })[] = [];

  for (const raw of data.items) {
    const product = catalog.get(raw?.slug);
    if (!product) {
      return NextResponse.json(
        { error: "item_unavailable", slug: raw?.slug },
        { status: 409 },
      );
    }
    if (!product.inStock) {
      return NextResponse.json(
        { error: "item_out_of_stock", slug: raw.slug },
        { status: 409 },
      );
    }
    const quantity = Math.floor(Number(raw.quantity));
    if (!Number.isFinite(quantity) || quantity < 1 || quantity > 99) {
      return NextResponse.json(
        { error: "bad_quantity", slug: raw.slug },
        { status: 400 },
      );
    }
    items.push({
      slug: product.slug,
      name: product.name[data.locale === "en" ? "en" : "sk"],
      price: product.price,
      unitPrice: product.price,
      quantity,
    });
  }

  const b2b = await resolveB2b();
  const subtotal = round(items.reduce((s, i) => s + i.unitPrice * i.quantity, 0));
  const discount = computeDiscount(subtotal, Boolean(b2b));
  const afterDiscount = round(subtotal - discount.amount);
  const shipping = afterDiscount >= FREE_SHIP ? 0 : SHIPPING;
  const total = round(afterDiscount + shipping);

  if (Math.abs(total - Number(data.total)) > 0.01) {
    console.warn(
      `[checkout] client total ${data.total} != server total ${total}${b2b ? "" : " (no verified B2B session)"}`,
    );
  }

  const reference = generateOrderRef();
  await createOrder({
    reference,
    status: data.method === "bank" ? "awaiting_bank" : "awaiting_card",
    method: data.method,
    locale: data.locale === "en" ? "en" : "sk",
    contact: data.contact,
    address: data.address,
    note: data.note,
    items,
    pricing: {
      subtotal,
      discountPct: discount.pct,
      discountAmount: round(discount.amount),
      shipping,
      total,
    },
    total,
    customerType: b2b ? "b2b" : "b2c",
    b2b: b2b ? { ico: b2b.ico, company: b2b.company } : null,
  });

  if (data.method === "card") {
    try {
      const payment = await createGoPayPayment({
        amount: total,
        reference,
        email: data.contact.email,
        locale: data.locale,
      });
      await setOrderGopayId(reference, payment.id);
      return NextResponse.json({ reference, gopayUrl: payment.url, total });
    } catch (err) {
      console.error("GoPay error", err);
      // No GoPay credentials yet (dev/sandbox not configured): let the flow
      // finish so the order is still recorded and testable.
      return NextResponse.json({
        reference,
        gopayUrl: null,
        total,
        warn: "gopay_unavailable_dev",
      });
    }
  }

  return NextResponse.json({ reference, total });
}
