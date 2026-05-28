/**
 * Minimal GoPay REST integration.
 * Docs: https://help.gopay.com/en/knowledge-base/integration/integration-of-payment-gateway-by-rest-api
 *
 * In dev mode without real credentials this throws — caller falls back gracefully.
 */

type GoPayTokenResponse = { access_token: string; token_type: string };

async function getAccessToken(): Promise<string> {
  const id = process.env.GOPAY_CLIENT_ID;
  const secret = process.env.GOPAY_CLIENT_SECRET;
  const apiUrl = process.env.GOPAY_API_URL ?? "https://gw.sandbox.gopay.com/api";

  if (!id || !secret || secret === "changeme") {
    throw new Error("GoPay credentials not configured");
  }

  const credentials = Buffer.from(`${id}:${secret}`).toString("base64");
  const res = await fetch(`${apiUrl}/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: "grant_type=client_credentials&scope=payment-create",
  });

  if (!res.ok) throw new Error(`GoPay token failed: ${res.status}`);
  const data = (await res.json()) as GoPayTokenResponse;
  return data.access_token;
}

export async function createGoPayPayment(opts: {
  amount: number;
  reference: string;
  email: string;
  locale: "sk" | "it";
}): Promise<string> {
  const token = await getAccessToken();
  const apiUrl = process.env.GOPAY_API_URL ?? "https://gw.sandbox.gopay.com/api";
  const goid = Number(process.env.GOPAY_GOID ?? "0");
  const returnUrl =
    process.env.GOPAY_RETURN_URL ?? "http://localhost:4000/sk/checkout/success";
  const notifyUrl =
    process.env.GOPAY_NOTIFY_URL ?? "http://localhost:4000/api/gopay/notify";

  const body = {
    payer: {
      default_payment_instrument: "PAYMENT_CARD",
      allowed_payment_instruments: ["PAYMENT_CARD"],
      contact: { email: opts.email },
    },
    target: { type: "ACCOUNT", goid },
    amount: Math.round(opts.amount * 100),
    currency: "EUR",
    order_number: opts.reference,
    order_description: `Italiamo order ${opts.reference}`,
    callback: {
      return_url: `${returnUrl}?ref=${opts.reference}&method=card`,
      notification_url: notifyUrl,
    },
    lang: opts.locale.toUpperCase(),
  };

  const res = await fetch(`${apiUrl}/payments/payment`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`GoPay create failed: ${res.status} ${txt}`);
  }

  const data = (await res.json()) as { gw_url: string };
  return data.gw_url;
}
