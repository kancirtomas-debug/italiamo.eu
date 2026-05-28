import { NextResponse } from "next/server";

/**
 * GoPay notification webhook stub.
 * In production: verify signature, fetch payment status, update order in DB.
 */
export async function POST(req: Request) {
  const body = await req.text();
  console.log("[gopay] notify:", body);
  return NextResponse.json({ ok: true });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  console.log("[gopay] notify GET:", Object.fromEntries(searchParams));
  return NextResponse.json({ ok: true });
}
