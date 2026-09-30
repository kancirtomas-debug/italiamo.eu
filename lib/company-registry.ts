/**
 * Company lookups against public registries.
 * RPO (Register právnických osôb, Štatistický úrad SR) is the source of truth
 * for IČO; VIES only confirms an IČ DPH when the customer supplies one.
 */

const RPO_URL = "https://api.statistics.sk/rpo/v1/search";
const VIES_URL =
  "https://ec.europa.eu/taxation_customs/vies/rest-api/check-vat-number";

export type RegistryCompany = {
  ico: string;
  name: string;
  address: string | null;
  /** RPO keeps dissolved entities; this is their termination date. */
  terminatedOn: string | null;
};

type RpoName = { value: string; validTo?: string };
type RpoAddress = {
  street?: string;
  buildingNumber?: string;
  postalCodes?: string[];
  municipality?: { value?: string };
  validTo?: string;
};
type RpoIdentifier = { value?: string };
type RpoResult = {
  identifiers?: RpoIdentifier[];
  fullNames?: RpoName[];
  addresses?: RpoAddress[];
  termination?: string;
};

export function normalizeIco(raw: string): string | null {
  const digits = (raw || "").replace(/\D/g, "");
  if (digits.length < 6 || digits.length > 8) return null;
  return digits.padStart(8, "0");
}

/** "SK2020006406" or "2020006406" -> { countryCode, vatNumber } */
export function parseVatId(raw: string): { countryCode: string; vatNumber: string } | null {
  const clean = (raw || "").replace(/\s/g, "").toUpperCase();
  if (!clean) return null;
  const m = clean.match(/^([A-Z]{2})?(\d{6,12})$/);
  if (!m) return null;
  return { countryCode: m[1] ?? "SK", vatNumber: m[2] };
}

function currentValue<T extends { validTo?: string }>(list: T[] | undefined): T | null {
  if (!list?.length) return null;
  return list.find((x) => !x.validTo) ?? list[list.length - 1];
}

function formatAddress(a: RpoAddress | null): string | null {
  if (!a) return null;
  const street = [a.street, a.buildingNumber].filter(Boolean).join(" ");
  const city = [a.postalCodes?.[0], a.municipality?.value].filter(Boolean).join(" ");
  const out = [street, city].filter(Boolean).join(", ");
  return out || null;
}

/** Looks an IČO up in RPO. Returns null when the registry has no such company. */
export async function lookupIco(ico: string, timeoutMs = 8000): Promise<RegistryCompany | null> {
  const res = await fetch(`${RPO_URL}?identifier=${encodeURIComponent(ico)}`, {
    signal: AbortSignal.timeout(timeoutMs),
    headers: { accept: "application/json" },
  });
  if (!res.ok) throw new Error(`RPO ${res.status}`);

  const data = (await res.json()) as { results?: RpoResult[] };
  // RPO can answer with near matches; only an exact IČO hit counts.
  const hit = data.results?.find((r) =>
    r.identifiers?.some((i) => normalizeIco(i.value ?? "") === ico),
  );
  if (!hit) return null;

  const name = currentValue(hit.fullNames)?.value;
  if (!name) return null;

  return {
    ico,
    name,
    address: formatAddress(currentValue(hit.addresses)),
    terminatedOn: hit.termination ?? null,
  };
}

/** VIES check for an EU VAT id. `null` = VIES itself was unreachable. */
export async function checkVat(
  vatId: string,
  timeoutMs = 8000,
): Promise<{ valid: boolean; name?: string } | null> {
  const parsed = parseVatId(vatId);
  if (!parsed) return { valid: false };

  try {
    const res = await fetch(VIES_URL, {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify(parsed),
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { valid?: boolean; name?: string };
    return { valid: Boolean(data.valid), name: data.name };
  } catch {
    return null;
  }
}
