/**
 * Single source of truth for company identity + addresses.
 * Change it here — footer, contact page and JSON-LD all read from this file.
 */

export type Address = {
  /** Street + number */
  street: string;
  /** Postal code, SK format with the space */
  zip: string;
  city: string;
  countryCode: "SK";
  /** One-line form used in the footer bar */
  oneLine: string;
  /** Multi-line form used in address blocks */
  lines: string[];
  label: { sk: string; en: string };
};

const OFFICE: Address = {
  street: "Vysielač 573",
  zip: "082 53",
  city: "Petrovany",
  countryCode: "SK",
  oneLine: "Vysielač 573, SK-082 53 Petrovany",
  lines: ["Vysielač 573", "SK-082 53 Petrovany"],
  label: { sk: "Sídlo / kancelária", en: "Head office" },
};

const WAREHOUSE: Address = {
  street: "Ploské 158",
  zip: "044 44",
  city: "Ploské",
  countryCode: "SK",
  oneLine: "Ploské 158, SK-044 44 Ploské",
  lines: ["Ploské 158", "SK-044 44 Ploské"],
  label: { sk: "Sklad a distribúcia", en: "Warehouse & distribution" },
};

export const BANK = {
  name: "Československá obchodná banka",
  /** Domestic account number / bank code */
  accountNumber: "383202143/7500",
  iban: "SK75 7500 0000 0003 8320 2143",
  swift: "CEKOSKBX",
} as const;

export const COMPANY = {
  legalName: "Italiamo Distribution s.r.o.",
  office: OFFICE,
  warehouse: WAREHOUSE,
  addresses: [OFFICE, WAREHOUSE] as const,
  emails: ["italiamodistribution@gmail.com", "solar@eudist.com"],
  phones: ["+421 917 839 954", "+421 917 502 610"],
  ico: "36452700",
  dic: "2020006406",
  icDph: "SK2020006406",
  register: {
    sk: "Obchodný register Okr. súdu Prešov, oddiel: Sro, vložka č.: 10915/P",
    en: "Commercial Register of the District Court Prešov, section: Sro, insert no.: 10915/P",
  },
  bank: BANK,
} as const;
