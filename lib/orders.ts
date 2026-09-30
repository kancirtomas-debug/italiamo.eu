import { desc, eq, lt } from "drizzle-orm";
import { db, withDbRetry } from "./db";
import { orders, type NewOrder, type Order } from "./db/schema";

/** Orders are kept for this long, then purged by the cleanup cron. */
export const ORDER_RETENTION_DAYS = 365;

export async function createOrder(order: NewOrder): Promise<Order> {
  const rows = await withDbRetry(() =>
    db.insert(orders).values(order).returning(),
  );
  return rows[0];
}

export async function setOrderGopayId(
  reference: string,
  gopayId: string,
): Promise<void> {
  await withDbRetry(() =>
    db
      .update(orders)
      .set({ gopayId, updatedAt: new Date() })
      .where(eq(orders.reference, reference)),
  );
}

export async function getOrderByGopayId(
  gopayId: string,
): Promise<Order | null> {
  const rows = await withDbRetry(() =>
    db.select().from(orders).where(eq(orders.gopayId, gopayId)).limit(1),
  );
  return rows[0] ?? null;
}

export async function getOrderByReference(
  reference: string,
): Promise<Order | null> {
  const rows = await withDbRetry(() =>
    db.select().from(orders).where(eq(orders.reference, reference)).limit(1),
  );
  return rows[0] ?? null;
}

/** Flip an order to a terminal payment state. Returns the updated row (null if unknown). */
export async function setOrderStatus(
  reference: string,
  status: string,
  opts: { paid?: boolean } = {},
): Promise<Order | null> {
  const rows = await withDbRetry(() =>
    db
      .update(orders)
      .set({
        status,
        updatedAt: new Date(),
        ...(opts.paid ? { paidAt: new Date() } : {}),
      })
      .where(eq(orders.reference, reference))
      .returning(),
  );
  return rows[0] ?? null;
}

export async function listOrders(limit = 200): Promise<Order[]> {
  return withDbRetry(() =>
    db.select().from(orders).orderBy(desc(orders.createdAt)).limit(limit),
  );
}

/** Delete orders older than the retention window. Returns how many were removed. */
export async function purgeOldOrders(
  days = ORDER_RETENTION_DAYS,
): Promise<number> {
  const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  const rows = await withDbRetry(() =>
    db
      .delete(orders)
      .where(lt(orders.createdAt, cutoff))
      .returning({ id: orders.id }),
  );
  return rows.length;
}
