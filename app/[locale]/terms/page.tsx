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
            objednávke nad 80 €. Doručenie do 2–3 pracovných dní
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

  const it = (
    <>
      <h1 className="display-lg max-w-[20ch]">Termini e condizioni</h1>
      <p className="mt-3 eyebrow text-ink-500">In vigore dal 1° maggio 2026</p>

      <div className="mt-12 space-y-10 text-ink-500 leading-relaxed max-w-[68ch]">
        <section>
          <h2 className="display-sm text-ink-700 mb-3">1. Venditore</h2>
          <p>
            Italiamo Distribution s.r.o., Družstevná 1, 080 06 Prešov,
            Slovacchia. Iscritta al Registro delle Imprese di Prešov.
            Contatto:{" "}
            <a href="mailto:info@italiamo.sk" className="underline">
              info@italiamo.sk
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="display-sm text-ink-700 mb-3">2. Ordine e contratto</h2>
          <p>
            Il contratto di vendita si conclude con la conferma
            dell&apos;ordine via e-mail. Il venditore si riserva il
            diritto di rifiutare un ordine in caso di esaurimento
            scorte o errore manifesto nel prezzo.
          </p>
        </section>

        <section>
          <h2 className="display-sm text-ink-700 mb-3">3. Prezzi e spedizione</h2>
          <p>
            Prezzi in euro, IVA 20 % inclusa. Spedizione in Slovacchia:
            4,90 € sotto 80 €, gratuita sopra 80 €. Consegna in 2–3
            giorni lavorativi (GLS / Packeta).
          </p>
        </section>

        <section>
          <h2 className="display-sm text-ink-700 mb-3">4. Pagamento</h2>
          <p>
            Carta tramite gateway GoPay. Bonifico bancario: coordinate
            inviate via e-mail dopo l&apos;ordine. La merce viene
            spedita all&apos;accredito del pagamento.
          </p>
        </section>

        <section>
          <h2 className="display-sm text-ink-700 mb-3">5. Diritto di recesso</h2>
          <p>
            Il consumatore ha diritto di recedere entro 14 giorni dal
            ricevimento della merce, senza motivazione. Il prodotto
            deve essere restituito integro, nella confezione originale.
            Le spese di reso sono a carico dell&apos;acquirente. Il
            rimborso avviene entro 14 giorni dal rientro del prodotto.
          </p>
        </section>

        <section>
          <h2 className="display-sm text-ink-700 mb-3">6. Reclami</h2>
          <p>
            Garanzia 24 mesi, salvo diverse indicazioni (alimenti con
            data di scadenza). Reclami a{" "}
            <a href="mailto:info@italiamo.sk" className="underline">
              info@italiamo.sk
            </a>{" "}
            con descrizione del difetto e foto.
          </p>
        </section>

        <section>
          <h2 className="display-sm text-ink-700 mb-3">7. Vendita di alcolici</h2>
          <p>
            La vendita di alcolici è riservata ai maggiori di 18 anni.
            Al ritiro della merce può essere richiesto un documento
            d&apos;identità.
          </p>
        </section>

        <section>
          <h2 className="display-sm text-ink-700 mb-3">8. Risoluzione alternativa</h2>
          <p>
            Il consumatore può rivolgersi all&apos;Ispettorato del
            Commercio Slovacco (SOI) o alla piattaforma ODR della
            Commissione Europea:{" "}
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
      {locale === "it" ? it : sk}
    </section>
  );
}
