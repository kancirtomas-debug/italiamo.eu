import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/i18n/routing";
import { FileText, ExternalLink } from "lucide-react";

type Doc = { sk: string; it: string; url: string };

const docs: Doc[] = [
  {
    sk: "Informácie pre dotknutú osobu (Prevádzkovateľ shop.italiamo.eu)",
    it: "Informativa per l'interessato (Titolare shop.italiamo.eu)",
    url: "https://shop.italiamo.eu/wp-content/uploads/2022/12/Prevadzkovatel-internetovym-obchodom-www.shop_.italiamo.eu-dalej-len-%E2%80%9EPrevadzkovatel.-25.05.2018.pdf",
  },
  {
    sk: "Námietanie spracúvania osobných údajov",
    it: "Opposizione al trattamento dei dati personali",
    url: "https://shop.italiamo.eu/wp-content/uploads/2022/12/WEB-Namietanie-spracuvania-osobnych-udajov.pdf",
  },
  {
    sk: "Odvolanie súhlasu so spracúvaním osobných údajov",
    it: "Revoca del consenso al trattamento dei dati personali",
    url: "https://shop.italiamo.eu/wp-content/uploads/2022/12/web-Odvolanie-suhlasu-so-spracuvanim-osobnych-udajov-Dolu-podpisany.pdf",
  },
  {
    sk: "Žiadosť dotknutej osoby na uplatnenie práv",
    it: "Richiesta dell'interessato per l'esercizio dei diritti",
    url: "https://shop.italiamo.eu/wp-content/uploads/2022/12/WEB-Ziadost-DO-na-uplatnenie-prav.pdf",
  },
  {
    sk: "Žiadosť dotknutej osoby týkajúca sa jej osobných údajov",
    it: "Richiesta dell'interessato sui propri dati personali",
    url: "https://shop.italiamo.eu/wp-content/uploads/2022/12/WEB-Ziadost-dotknutej-osoby-tykajuca-sa-jej-osobnych-udajov-Dolu-podpisany.pdf",
  },
  {
    sk: "Zásady používania súborov cookies",
    it: "Informativa sull'uso dei cookie",
    url: "https://shop.italiamo.eu/wp-content/uploads/2022/12/Zasady-pouzivania-suborov-cookies.pdf",
  },
];

export default async function DokumentyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const heading = locale === "it" ? "Documenti" : "Dokumenty";
  const eyebrow = locale === "it" ? "Privacy & GDPR" : "Ochrana údajov";
  const intro =
    locale === "it"
      ? "Documenti relativi al trattamento dei dati personali secondo il GDPR. Tutti i file sono in formato PDF e si aprono in una nuova scheda."
      : "Dokumenty týkajúce sa spracúvania osobných údajov v zmysle GDPR. Všetky súbory sú vo formáte PDF a otvárajú sa na novej karte.";
  const openLabel = locale === "it" ? "Apri PDF" : "Otvoriť PDF";

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
                  {locale === "it" ? d.it : d.sk}
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
