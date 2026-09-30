import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db, withDbRetry } from "@/lib/db";
import { b2bAccounts } from "@/lib/db/schema";
import { checkVat, lookupIco, normalizeIco } from "@/lib/company-registry";
import {
  B2B_COOKIE,
  B2B_NAME_COOKIE,
  B2B_MAX_AGE,
  createB2bToken,
} from "@/lib/b2b-session";

type Body = {
  ico?: string;
  icDph?: string;
  email?: string;
  phone?: string;
};

// Crude per-instance throttle: the registries are free services and this
// endpoint is unauthenticated by nature.
const hits = new Map<string, { n: number; until: number }>();
const LIMIT = 8;
const WINDOW_MS = 10 * 60 * 1000;

function rateLimited(key: string): boolean {
  const now = Date.now();
  const cur = hits.get(key);
  if (!cur || cur.until < now) {
    hits.set(key, { n: 1, until: now + WINDOW_MS });
    return false;
  }
  cur.n += 1;
  return cur.n > LIMIT;
}

function fail(reason: string, status = 400) {
  return NextResponse.json({ ok: false, reason }, { status });
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) return fail("rate_limited", 429);

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return fail("bad_request");
  }

  const ico = normalizeIco(body.ico ?? "");
  if (!ico) return fail("ico_format");

  const email = (body.email ?? "").trim();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return fail("email_format");

  const phone = (body.phone ?? "").trim() || null;
  const icDphRaw = (body.icDph ?? "").trim();

  // A company the admin revoked never gets a session again.
  const existing = await withDbRetry(() =>
    db.select().from(b2bAccounts).where(eq(b2bAccounts.ico, ico)).limit(1),
  );
  if (existing[0]?.status === "rejected") return fail("revoked", 403);

  let company;
  try {
    company = await lookupIco(ico);
  } catch {
    return fail("registry_unavailable", 503);
  }
  if (!company) return fail("not_found", 404);
  // RPO also returns long-dissolved entities - those must not unlock pricing.
  if (company.terminatedOn) return fail("terminated", 410);

  let vatValid: boolean | null = null;
  if (icDphRaw) {
    const vat = await checkVat(icDphRaw);
    if (vat === null) vatValid = null; // VIES down - do not punish the customer
    else if (!vat.valid) return fail("vat_invalid");
    else vatValid = true;
  }

  const row = {
    ico,
    company: company.name,
    icDph: icDphRaw || null,
    email,
    phone,
    address: company.address,
    status: "approved",
    verifiedVia: vatValid ? "rpo+vies" : "rpo",
    vatValid,
    updatedAt: new Date(),
  };

  if (existing[0]) {
    await withDbRetry(() =>
      db.update(b2bAccounts).set(row).where(eq(b2bAccounts.ico, ico)),
    );
  } else {
    await db.insert(b2bAccounts).values(row);
  }

  const res = NextResponse.json({ ok: true, company: company.name });
  const common = {
    path: "/",
    maxAge: B2B_MAX_AGE,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
  };
  res.cookies.set(B2B_COOKIE, createB2bToken({ ico, company: company.name }), {
    ...common,
    httpOnly: true,
  });
  // Readable by the UI so the picker can show the verified state; it carries
  // no authority - pricing is decided server-side from the signed cookie.
  res.cookies.set(B2B_NAME_COOKIE, company.name, common);
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(B2B_COOKIE);
  res.cookies.delete(B2B_NAME_COOKIE);
  return res;
}
