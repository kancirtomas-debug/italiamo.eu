import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/i18n/routing";

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const sk = (
    <>
      <h1 className="display-lg max-w-[20ch]">Obchodné podmienky</h1>
      <p className="mt-3 eyebrow text-ink-500">
        Platné od 1. mája 2026
      </p>

      <div className="mt-12 space-y-10 text-ink-500 leading-relaxed max-w-[68ch]">
        <section>
          <h2 className="display-sm text-ink-700 mb-3">1. Predávajúci</h2>
          <p>
            Italiamo Distribution s.r.o., Družstevná 1, 080 06 Prešov,
            Slovenská republika. IČO: zadáme po registrácii. Zapísaná
            v Obchodnom registri Okresného súdu Prešov. Kontakt:{" "}
            <a href="mailto:info@italiamo.sk" className="underline">
              info@italiamo.sk
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="display-sm text-ink-700 mb-3">2. Objednávka a uzavretie zmluvy</h2>
          <p>
            Kúpna zmluva medzi predávajúcim a kupujúcim vzniká
            potvrdením objednávky prostredníctvom e-mailu. Objednávka
            kupujúceho je návrhom na uzavretie zmluvy a predávajúci si
            vyhradzuje právo odmietnuť objednávku v prípade
            vypredania zásob alebo zjavnej chyby v cene.
          </p>
        </section>

        <section>
          <h2 className="display-sm text-ink-700 mb-3">3. Ceny a doprava</h2>
          <p>
            Ceny sú uvedené v eurách vrátane DPH 20 %. Doprava na
            území SR: 4,90 € pri objednávke pod 80 €, zdarma pri
            objednávke nad 80 €. Doručenie do 2-3 pracovných dní
            kuriérom GLS alebo Packeta.
          </p>
        </section>

        <section>
          <h2 className="display-sm text-ink-700 mb-3">4. Platba</h2>
          <p>
            Platba kartou prebieha cez zabezpečenú bránu GoPay.
            Bankový prevod: údaje budú zaslané e-mailom po
            odoslaní objednávky. Tovar bude expedovaný po pripísaní
            platby na účet.
          </p>
        </section>

        <section>
          <h2 className="display-sm text-ink-700 mb-3">5. Odstúpenie od zmluvy</h2>
          <p>
            Spotrebiteľ má právo odstúpiť od zmluvy do 14 dní od
            prevzatia tovaru bez udania dôvodu. Tovar musí byť vrátený
            v pôvodnom obale, nepoužitý a nepoškodený. Náklady na
            vrátenie tovaru znáša kupujúci. Vrátenie peňazí prebehne
            do 14 dní od doručenia tovaru naspäť.
          </p>
        </section>

        <section>
          <h2 className="display-sm text-ink-700 mb-3">6. Reklamácie</h2>
          <p>
            Záručná doba je 24 mesiacov, ak nie je pri konkrétnom
            tovare uvedené inak (potraviny s dátumom minimálnej
            trvanlivosti). Reklamácie posielajte e-mailom na{" "}
            <a href="mailto:info@italiamo.sk" className="underline">
              info@italiamo.sk
            </a>{" "}
            s popisom vady a fotografiou.
          </p>
        </section>

        <section>
          <h2 className="display-sm text-ink-700 mb-3">7. Predaj alkoholu</h2>
          <p>
            Predaj alkoholických nápojov je povolený výlučne osobám
            starším ako 18 rokov. Pri prevzatí zásielky obsahujúcej
            alkohol môže byť kupujúci požiadaný o preukázanie veku.
          </p>
        </section>

        <section>
          <h2 className="display-sm text-ink-700 mb-3">8. Alternatívne riešenie sporov</h2>
          <p>
            Spotrebiteľ má právo obrátiť sa na Slovenskú obchodnú
            inšpekciu (SOI) ako orgán dohľadu, prípadne využiť
            platformu Európskej komisie pre online riešenie sporov
            dostupnú na{" "}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              ec.europa.eu/consumers/odr
            </a>
            .
          </p>
        </section>
      </div>
    </>
  );

  const en = (
    <>
      <h1 className="display-lg max-w-[20ch]">Terms and Conditions</h1>
      <p className="mt-3 eyebrow text-ink-500">In effect from 1 May 2026</p>

      <div className="mt-12 space-y-10 text-ink-500 leading-relaxed max-w-[68ch]">
        <section>
          <h2 className="display-sm text-ink-700 mb-3">1. Seller</h2>
          <p>
            Italiamo Distribution s.r.o., Družstevná 1, 080 06 Prešov,
            Slovakia. Registered in the Commercial Register of Prešov.
            Contact:{" "}
            <a href="mailto:info@italiamo.sk" className="underline">
              info@italiamo.sk
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="display-sm text-ink-700 mb-3">2. Order and contract</h2>
          <p>
            The sales contract is concluded upon confirmation of the
            order by e-mail. The seller reserves the right to refuse
            an order in the event of stock depletion or an obvious
            error in the price.
          </p>
        </section>

        <section>
          <h2 className="display-sm text-ink-700 mb-3">3. Prices and shipping</h2>
          <p>
            Prices are in euros, including 20% VAT. Shipping within
            Slovakia: €4.90 for orders under €80, free for orders over
            €80. Delivery in 2-3 working days (GLS / Packeta).
          </p>
        </section>

        <section>
          <h2 className="display-sm text-ink-700 mb-3">4. Payment</h2>
          <p>
            Card payments via the GoPay gateway. Bank transfer: details
            sent by e-mail after the order. Goods are dispatched once
            the payment has been credited.
          </p>
        </section>

        <section>
          <h2 className="display-sm text-ink-700 mb-3">5. Right of withdrawal</h2>
          <p>
            The consumer has the right to withdraw from the contract
            within 14 days of receiving the goods, without giving a
            reason. The product must be returned undamaged, in its
            original packaging. The return shipping costs are borne by
            the buyer. The refund is made within 14 days of the
            product being returned.
          </p>
        </section>

        <section>
          <h2 className="display-sm text-ink-700 mb-3">6. Complaints</h2>
          <p>
            Warranty of 24 months, unless otherwise stated (foods with
            a best-before date). Send complaints to{" "}
            <a href="mailto:info@italiamo.sk" className="underline">
              info@italiamo.sk
            </a>{" "}
            with a description of the defect and a photo.
          </p>
        </section>

        <section>
          <h2 className="display-sm text-ink-700 mb-3">7. Sale of alcohol</h2>
          <p>
            The sale of alcoholic beverages is reserved for persons over
            18 years of age. Upon receipt of the goods, an identity
            document may be requested.
          </p>
        </section>

        <section>
          <h2 className="display-sm text-ink-700 mb-3">8. Alternative dispute resolution</h2>
          <p>
            The consumer may contact the Slovak Trade Inspection
            (SOI) or use the European Commission&apos;s ODR platform:{" "}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              ec.europa.eu/consumers/odr
            </a>
            .
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
