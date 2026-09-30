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
            <li>Kuriérske služby (GLS, Packeta) - doručenie zásielky</li>
            <li>GoPay - spracovanie platieb kartou</li>
            <li>Vercel Inc. - hosting webovej stránky (EU región)</li>
            <li>Resend - odosielanie potvrdzovacích e-mailov</li>
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

  const en = (
    <>
      <h1 className="display-lg max-w-[20ch]">Privacy Policy</h1>
      <p className="mt-3 eyebrow text-ink-500">Updated 1 May 2026</p>

      <div className="mt-12 space-y-10 text-ink-500 leading-relaxed max-w-[68ch]">
        <section>
          <h2 className="display-sm text-ink-700 mb-3">1. Controller</h2>
          <p>
            Italiamo Distribution s.r.o., Družstevná 1, 080 06 Prešov.
            Privacy contact:{" "}
            <a href="mailto:info@italiamo.sk" className="underline">
              info@italiamo.sk
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="display-sm text-ink-700 mb-3">2. Data we collect</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>First name, last name, e-mail, phone, delivery address</li>
            <li>Order, payment and communication data</li>
            <li>Technical data (IP, browser) for security and analytics</li>
          </ul>
        </section>

        <section>
          <h2 className="display-sm text-ink-700 mb-3">3. Legal basis</h2>
          <p>
            Performance of the contract (Art. 6(1)(b) GDPR), legal
            obligations (accounting, Art. 6(1)(c)), legitimate
            interest (security, Art. 6(1)(f)). Marketing only
            with consent (Art. 6(1)(a)).
          </p>
        </section>

        <section>
          <h2 className="display-sm text-ink-700 mb-3">4. Retention</h2>
          <p>
            Order data: 10 years (accounting obligations). Marketing
            data: 5 years or until consent is withdrawn.
          </p>
        </section>

        <section>
          <h2 className="display-sm text-ink-700 mb-3">5. Recipients</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Couriers (GLS, Packeta) - delivery</li>
            <li>GoPay - card payments</li>
            <li>Vercel Inc. - hosting (EU region)</li>
            <li>Resend - transactional e-mails</li>
            <li>Appointed accountant</li>
          </ul>
        </section>

        <section>
          <h2 className="display-sm text-ink-700 mb-3">6. Cookies</h2>
          <p>
            Technical cookies (cart, language, session) without consent.
            Analytics and marketing cookies only after explicit consent,
            which can be withdrawn at any time.
          </p>
        </section>

        <section>
          <h2 className="display-sm text-ink-700 mb-3">7. Your rights</h2>
          <p>
            Access, rectification, erasure, restriction, portability,
            objection. You can lodge a complaint with the Slovak Data
            Protection Authority (uoou.sk).
          </p>
        </section>
      </div>
    </>
  );

  return (
    <section className="max-w-[1100px] mx-auto px-6 lg:px-10 pt-16 pb-28">
      {locale === "en" ? en : sk}
    </section>
  );
}
