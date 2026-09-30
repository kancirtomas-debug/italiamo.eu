import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/i18n/routing";
import { FileText, ExternalLink } from "lucide-react";

type Doc = { sk: string; en: string; url: string };

const docs: Doc[] = [
  {
    sk: "Informácie pre dotknutú osobu (Prevádzkovateľ italiamo.eu)",
    en: "Data subject information (Controller italiamo.eu)",
    url: "/dokumenty/prevadzkovatel.pdf",
  },
  {
    sk: "Námietanie spracúvania osobných údajov",
    en: "Objection to the processing of personal data",
    url: "/dokumenty/namietanie.pdf",
  },
  {
    sk: "Odvolanie súhlasu so spracúvaním osobných údajov",
    en: "Withdrawal of consent to the processing of personal data",
    url: "/dokumenty/odvolanie-suhlasu.pdf",
  },
  {
    sk: "Žiadosť dotknutej osoby na uplatnenie práv",
    en: "Data subject request to exercise rights",
    url: "/dokumenty/ziadost-uplatnenie-prav.pdf",
  },
  {
    sk: "Žiadosť dotknutej osoby týkajúca sa jej osobných údajov",
    en: "Data subject request regarding their personal data",
    url: "/dokumenty/ziadost-osobne-udaje.pdf",
  },
  {
    sk: "Zásady používania súborov cookies",
    en: "Cookie usage policy",
    url: "/dokumenty/cookies.pdf",
  },
];

export default async function DokumentyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const heading = locale === "en" ? "Documents" : "Dokumenty";
  const eyebrow = locale === "en" ? "Privacy & GDPR" : "Ochrana údajov";
  const intro =
    locale === "en"
      ? "Documents regarding the processing of personal data under the GDPR. All files are in PDF format and open in a new tab."
      : "Dokumenty týkajúce sa spracúvania osobných údajov v zmysle GDPR. Všetky súbory sú vo formáte PDF a otvárajú sa na novej karte.";
  const openLabel = locale === "en" ? "Open PDF" : "Otvoriť PDF";

  return (
    <section className="max-w-[1100px] mx-auto px-6 lg:px-10 pt-16 pb-28">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="display-lg mt-5 max-w-[20ch]">{heading}</h1>
      <p className="mt-6 text-[17px] leading-relaxed text-ink-700 max-w-[60ch]">
        {intro}
      </p>

      <ul className="mt-12 divide-y divide-cream-300 border-y border-cream-300">
        {docs.map((d) => (
          <li key={d.url}>
            <a
              href={d.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 py-5 transition-colors hover:bg-cream-100"
            >
              <span
                className="shrink-0 grid place-items-center w-11 h-11 rounded-full border border-cream-300 bg-white text-terracotta-500 group-hover:border-terracotta-500"
                aria-hidden
              >
                <FileText size={18} strokeWidth={1.75} />
              </span>
              <span className="flex-1 min-w-0">
                <span className="block font-display text-[18px] tracking-[-0.015em] text-ink-900 leading-tight">
                  {locale === "en" ? d.en : d.sk}
                </span>
                <span className="block mt-1 text-[12px] uppercase tracking-[0.06em] text-ink-500">
                  PDF
                </span>
              </span>
              <span
                aria-hidden
                className="shrink-0 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-900 group-hover:text-terracotta-500"
              >
                {openLabel}
                <ExternalLink size={14} strokeWidth={1.75} />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
