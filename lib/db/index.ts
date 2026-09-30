import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

declare global {
  // eslint-disable-next-line no-var
  var __italiamoPg: ReturnType<typeof postgres> | undefined;
}

const connectionString = process.env.DATABASE_URL!;

// Neon's pooler drops idle connections, and a recycled dead socket surfaces as
// ECONNRESET on the next query ("socket disconnected before secure TLS
// connection was established"). Closing sockets on our side first avoids it.
const client =
  globalThis.__italiamoPg ??
  postgres(connectionString, {
    prepare: false,
    max: 10,
    idle_timeout: 20, // seconds - well below Neon's own idle cutoff
    max_lifetime: 60 * 30,
    connect_timeout: 15,
  });

// Dev HMR re-evaluates this module; without the cache every reload leaks a pool.
if (process.env.NODE_ENV !== "production") globalThis.__italiamoPg = client;

export const db = drizzle(client, { schema });

const RETRYABLE = new Set([
  "ECONNRESET",
  "ETIMEDOUT",
  "EPIPE",
  "CONNECTION_CLOSED",
  "CONNECTION_ENDED",
  "CONNECT_TIMEOUT",
  "CONNECTION_DESTROYED",
]);

function isRetryable(err: unknown): boolean {
  let e: unknown = err;
  for (let depth = 0; e && depth < 4; depth++) {
    const code = (e as { code?: string }).code;
    if (code && RETRYABLE.has(code)) return true;
    e = (e as { cause?: unknown }).cause;
  }
  return false;
}

/**
 * Runs a query, retrying once (then twice) when the failure is a dropped
 * connection rather than a real SQL error. Read paths use this so a stale
 * socket never turns into a 500 for the visitor or the admin.
 */
export async function withDbRetry<T>(fn: () => Promise<T>, attempts = 3): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      if (!isRetryable(err)) throw err;
      lastError = err;
      // Neon can be cold-starting; back off enough for the compute to wake.
      await new Promise((r) => setTimeout(r, 250 * Math.pow(4, i)));
    }
  }
  throw lastError;
}
