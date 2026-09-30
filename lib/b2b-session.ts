import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Signed marker proving a visitor passed the company-registry check.
 * The cookie is httpOnly - the UI reads the companion `italiamo-b2b-name`
 * cookie instead, and only the server ever decides whether a discount applies.
 */
export const B2B_COOKIE = "italiamo-b2b";
export const B2B_NAME_COOKIE = "italiamo-b2b-name";
export const B2B_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export type B2bPayload = { ico: string; company: string; exp: number };

function secret(): string {
  const s = process.env.AUTH_SECRET;
  if (!s) throw new Error("AUTH_SECRET missing - cannot sign B2B session");
  return s;
}

function b64url(input: Buffer | string): string {
  return Buffer.from(input).toString("base64url");
}

function sign(data: string): string {
  return createHmac("sha256", secret()).update(data).digest("base64url");
}

export function createB2bToken(payload: Omit<B2bPayload, "exp">): string {
  const body: B2bPayload = {
    ...payload,
    exp: Math.floor(Date.now() / 1000) + B2B_MAX_AGE,
  };
  const data = b64url(JSON.stringify(body));
  return `${data}.${sign(data)}`;
}

export function readB2bToken(token: string | undefined | null): B2bPayload | null {
  if (!token) return null;
  const [data, mac] = token.split(".");
  if (!data || !mac) return null;

  const expected = Buffer.from(sign(data));
  const given = Buffer.from(mac);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;

  try {
    const payload = JSON.parse(Buffer.from(data, "base64url").toString()) as B2bPayload;
    if (!payload?.ico || !payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}
