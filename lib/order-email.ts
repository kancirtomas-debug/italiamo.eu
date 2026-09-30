import type {
  Order,
  OrderContact,
  OrderAddress,
  OrderItem,
  OrderPricing,
} from "./db/schema";

const RESEND_KEY = process.env.RESEND_API_KEY;
const FROM = process.env.ORDER_FROM_EMAIL ?? "noreply@italiamo.sk";
// Where the shop owner (client) receives new-order notifications.
const OWNER_TO = process.env.ORDER_TO_EMAIL ?? "info@italiamo.sk";

const eur = (n: number) => `${n.toFixed(2).replace(".", ",")} €`;

function orderLines(order: Order): string {
  const items = order.items as OrderItem[];
  const p = order.pricing as OrderPricing;
  const c = order.contact as OrderContact;
  const a = order.address as OrderAddress;
  const rows = items
    .map((i) => `  ${i.quantity}x ${i.name} — ${eur(i.unitPrice * i.quantity)}`)
    .join("\n");
  return [
    `Objednávka: ${order.reference}`,
    `Stav: ${order.status}`,
    `Spôsob platby: ${order.method === "card" ? "Karta (GoPay)" : "Bankový prevod"}`,
    "",
    "Položky:",
    rows,
    "",
    `Medzisúčet: ${eur(p.subtotal)}`,
    p.discountAmount > 0 ? `Zľava (${p.discountPct}%): -${eur(p.discountAmount)}` : "",
    `Doprava: ${p.shipping === 0 ? "zdarma" : eur(p.shipping)}`,
    `SPOLU: ${eur(p.total)}`,
    "",
    "Zákazník:",
    `  ${c.name}`,
    `  ${c.email}`,
    `  ${c.phone}`,
    `  ${a.street}, ${a.zip} ${a.city}, ${a.country}`,
    order.note ? `\nPoznámka: ${order.note}` : "",
    order.b2b ? `\nFirma: ${(order.b2b as { company?: string }).company ?? ""}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

async function send(to: string, subject: string, text: string, replyTo?: string) {
  if (!RESEND_KEY) {
    console.log(`[order-email] no RESEND_API_KEY, would send to ${to}:\n${subject}\n${text}`);
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      to: [to],
      ...(replyTo ? { reply_to: replyTo } : {}),
      subject,
      text,
    }),
  });
  if (!res.ok) {
    console.error("[order-email] Resend failed:", res.status, await res.text());
  }
}

/** Sent once, when a payment is confirmed paid. */
export async function sendPaidOrderEmails(order: Order): Promise<void> {
  const c = order.contact as OrderContact;
  const body = orderLines(order);

  // 1) Notify the shop owner (client).
  await send(OWNER_TO, `Nová objednávka ${order.reference} — ${eur(order.total)}`, body, c.email);

  // 2) Confirm to the customer.
  await send(
    c.email,
    `Italiamo — potvrdenie objednávky ${order.reference}`,
    `Ďakujeme za vašu objednávku. Platba bola prijatá.\n\n${body}`,
  );
}
