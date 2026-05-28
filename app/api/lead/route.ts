import { NextResponse } from "next/server";

const LEAD_TO = process.env.LEAD_TO_EMAIL ?? "info@italiamo.sk";
const LEAD_FROM = process.env.LEAD_FROM_EMAIL ?? "noreply@italiamo.sk";
const RESEND_KEY = process.env.RESEND_API_KEY;

type Lead = {
  name: string;
  email: string;
  phone?: string;
  message: string;
  locale?: string;
};

export async function POST(req: Request) {
  let data: Lead;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = (data.name ?? "").trim();
  const email = (data.email ?? "").trim();
  const message = (data.message ?? "").trim();
  const phone = (data.phone ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "name, email, message required" },
      { status: 400 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const subject = `[Italiamo lead] ${name}`;
  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone && `Phone: ${phone}`,
    `Locale: ${data.locale ?? "—"}`,
    "",
    "Message:",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  if (!RESEND_KEY) {
    console.log("[lead] no RESEND_API_KEY, logging instead:\n", subject, "\n", body);
    return NextResponse.json({ ok: true, mode: "logged" });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: LEAD_FROM,
      to: [LEAD_TO],
      reply_to: email,
      subject,
      text: body,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("[lead] Resend failed:", res.status, err);
    return NextResponse.json({ error: "Send failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
