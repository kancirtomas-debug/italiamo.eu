import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/i18n/routing";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const sk = (
    <>
      <h1 className="display-lg max-w-[20ch]">Ochrana súkromia</h1>
      <p className="mt-3 eyebrow text-ink-500">Aktualizované 1. mája 2026</p>

      <div className="mt-12 space-y-10 text-ink-500 leading-relaxed max-w-[68ch]">
        <section>
          <h2 className="display-sm text-ink-700 mb-3">1. Prevádzkovateľ</h2>
          <p>
            Italiamo Distribution s.r.o., Družstevná 1, 080 06 Prešov.
            Kontakt vo veciach ochrany osobných údajov:{" "}
            <a href="mailto:info@italiamo.sk" className="underline">
              info@italiamo.sk
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="display-sm text-ink-700 mb-3">2. Aké údaje spracúvame</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Meno, priezvisko, e-mail, telefón, doručovacia adresa</li>
            <li>Údaje o objednávke, platbe a komunikácii</li>
            <li>Technické údaje (IP adresa, typ prehliadača) na účely bezpečnosti a analytiky</li>
          </ul>
        </section>

        <section>
          <h2 className="display-sm text-ink-700 mb-3">3. Účel a právny základ</h2>
          <p>
            Plnenie kúpnej zmluvy (čl. 6 ods. 1 písm. b GDPR),
            plnenie zákonných povinností (účtovníctvo, čl. 6 ods. 1
            písm. c GDPR), oprávnené záujmy (bezpečnosť e-shopu,
            ochrana pred podvodmi, čl. 6 ods. 1 písm. f GDPR).
            Marketing a newsletter len so súhlasom (čl. 6 ods. 1
            písm. a GDPR).
          </p>
        </section>

        <section>
          <h2 className="display-sm text-ink-700 mb-3">4. Doba uchovávania</h2>
          <p>
            Údaje z objednávky uchovávame 10 rokov (zákon o
            účtovníctve). Súhlasné marketingové údaje 5 rokov alebo
            do odvolania súhlasu.
          </p>
        </section>

        <section>
          <h2 className="display-sm text-ink-700 mb-3">5. Príjemcovia</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Kuriérske služby (GLS, Packeta) — doručenie zásielky</li>
            <li>GoPay — spracovanie platieb kartou</li>
            <li>Vercel Inc. — hosting webovej stránky (EU región)</li>
            <li>Resend — odosielanie potvrdzovacích e-mailov</li>
            <li>Účtovník na základe zmluvy</li>
          </ul>
        </section>

        <section>
          <h2 className="display-sm text-ink-700 mb-3">6. Cookies</h2>
          <p>
            Používame technicky nevyhnutné cookies (košík, prihlásenie,
            jazyk) bez súhlasu. Analytické a marketingové cookies
            spúšťame len po vašom súhlase. Súhlas môžete kedykoľvek
            zrušiť v nastaveniach prehliadača alebo opätovným
            zobrazením lišty cookies.
          </p>
        </section>

        <section>
          <h2 className="display-sm text-ink-700 mb-3">7. Vaše práva</h2>
          <p>
            Máte právo na prístup, opravu, výmaz, obmedzenie
            spracúvania, prenosnosť údajov a námietku. Sťažnosť
            môžete podať na Úrad na ochranu osobných údajov SR
            (uoou.sk).
          </p>
        </section>
      </div>
    </>
  );

  const it = (
    <>
      <h1 className="display-lg max-w-[20ch]">Informativa privacy</h1>
      <p className="mt-3 eyebrow text-ink-500">Aggiornato il 1° maggio 2026</p>

      <div className="mt-12 space-y-10 text-ink-500 leading-relaxed max-w-[68ch]">
        <section>
          <h2 className="display-sm text-ink-700 mb-3">1. Titolare</h2>
          <p>
            Italiamo Distribution s.r.o., Družstevná 1, 080 06 Prešov.
            Contatto privacy:{" "}
            <a href="mailto:info@italiamo.sk" className="underline">
              info@italiamo.sk
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="display-sm text-ink-700 mb-3">2. Dati raccolti</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Nome, cognome, e-mail, telefono, indirizzo di consegna</li>
            <li>Dati di ordine, pagamento e comunicazioni</li>
            <li>Dati tecnici (IP, browser) per sicurezza e analytics</li>
          </ul>
        </section>

        <section>
          <h2 className="display-sm text-ink-700 mb-3">3. Base giuridica</h2>
          <p>
            Esecuzione del contratto (art. 6 §1 lett. b GDPR), obblighi
            di legge (contabilità, art. 6 §1 lett. c), legittimo
            interesse (sicurezza, art. 6 §1 lett. f). Marketing solo
            con consenso (art. 6 §1 lett. a).
          </p>
        </section>

        <section>
          <h2 className="display-sm text-ink-700 mb-3">4. Conservazione</h2>
          <p>
            Dati di ordine: 10 anni (obblighi contabili). Dati di
            marketing: 5 anni o fino a revoca del consenso.
          </p>
        </section>

        <section>
          <h2 className="display-sm text-ink-700 mb-3">5. Destinatari</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Corrieri (GLS, Packeta) — consegna</li>
            <li>GoPay — pagamenti con carta</li>
            <li>Vercel Inc. — hosting (region EU)</li>
            <li>Resend — e-mail transazionali</li>
            <li>Commercialista incaricato</li>
          </ul>
        </section>

        <section>
          <h2 className="display-sm text-ink-700 mb-3">6. Cookie</h2>
          <p>
            Cookie tecnici (carrello, lingua, sessione) senza consenso.
            Cookie analitici e di marketing solo dopo consenso esplicito,
            revocabile in qualsiasi momento.
          </p>
        </section>

        <section>
          <h2 className="display-sm text-ink-700 mb-3">7. Diritti</h2>
          <p>
            Accesso, rettifica, cancellazione, limitazione, portabilità,
            opposizione. Reclamo al Garante slovacco per la protezione
            dei dati (uoou.sk).
          </p>
        </section>
      </div>
    </>
  );

  return (
    <section className="max-w-[1100px] mx-auto px-6 lg:px-10 pt-16 pb-28">
      {locale === "it" ? it : sk}
    </section>
  );
}
