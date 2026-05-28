import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import Image from "next/image";
import { ProductCard } from "@/components/product-card";
import { BrandMarquee } from "@/components/brand-marquee";
import { CustomerModePicker } from "@/components/customer-mode-picker";
import { getFeaturedProducts } from "@/lib/queries";
import type { Locale } from "@/lib/i18n/routing";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const featured = await getFeaturedProducts();

  return (
    <>
      {/* Hero — atmospheric photo as full background, brand marquee anchored bottom */}
      <section className="relative isolate min-h-[78vh] flex flex-col overflow-hidden">
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <Image
            src="/hero-scopello.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "50% 35%" }}
          />
        </div>

        <div className="flex-1 max-w-[1500px] w-full mx-auto px-6 lg:px-10 pt-[11vh] pb-10 lg:pt-[15vh] lg:pb-12 flex flex-col">
          <div className="max-w-[680px] min-w-0">
            <p className="eyebrow">
              {locale === "it" ? "Sapori italiani" : "Talianske chute"}
            </p>
            <h1
              className="display-xl mt-5 [text-wrap:balance] hyphens-auto break-words"
              lang={locale}
            >
              {locale === "it" ? (
                <>
                  Sapori italiani
                  <em className="italic">direttamente da chi li fa.</em>
                </>
              ) : (
                <>
                  Talianske chute
                  <em className="italic">priamo od producenta.</em>
                </>
              )}
            </h1>
            <p className="body-lg mt-6 max-w-[52ch] !text-ink-900" lang={locale}>
              {t("hero.subtitle")}
            </p>

            <CustomerModePicker locale={locale} />
          </div>
        </div>
      </section>

      {/* Brand marquee — full-bleed, edge-to-edge under hero */}
      <section className="w-full pt-3 pb-6 overflow-hidden">
        <BrandMarquee eyebrow={t("brands.eyebrow")} />
      </section>

      {/* Featured */}
      <section className="max-w-[1500px] mx-auto px-6 lg:px-10 pt-8 pb-10">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="eyebrow">
              {locale === "it" ? "Questa settimana" : "Tento týždeň"}
            </p>
            <h2 className="display-lg mt-4">{t("featured.title")}</h2>
          </div>
          <Link href="/shop" className="link-underline">
            {t("featured.viewAll")} →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} locale={locale} />
          ))}
        </div>
      </section>

      {/* O nás */}
      <section className="max-w-[1500px] mx-auto px-6 lg:px-10 py-24 lg:py-28 border-t border-cream-300">
        <p className="eyebrow">{t("nav.about")}</p>
        <h2 className="display-lg mt-5 whitespace-nowrap">
          {locale === "it"
            ? "Dal 2009 importatore esclusivo."
            : "Od roku 2009 sme výhradným importérom."}
        </h2>

        <p className="about-lead mt-10 max-w-[62ch]">
          {locale === "it"
            ? "L'Italia per noi è una terra dal ricco patrimonio culturale che ha influenzato altre nazioni — fonte d'ispirazione, di autenticità dei prodotti, di tradizioni di un popolo e di produttori che tramandano ricette e tecniche di generazione in generazione. La nostra filosofia, sin dall'inizio, è importare e distribuire prodotti accessibili al consumatore slovacco."
            : "Taliansko je pre nás ako krajina s bohatým kultúrnym dedičstvom, ktoré ovplyvnili aj iné národy, inšpiráciou, autenticitou produktov, tradíciami Talianov ako aj výrobcov, ktorí dedia recepty a postupy z generácie na generáciu. Našou filozofiou od začiatku bolo dovážať a distribuovať cenovo dostupne produkty pre slovenského spotrebiteľa."}
        </p>

        <div className="about-body mt-12 columns-1 lg:columns-2 gap-12 [column-rule:1px_solid_var(--color-cream-300)]">
          <p>
            {locale === "it"
              ? "Dal 2009 la società è importatore esclusivo di produttori italiani selezionati di alimenti, specialità e cantine, tra cui CASINAREALE, FIORDELISI, CON.SAR (SARA), ALIS srl (CASA RINALDI), B&G srl (AULUS, LIMMI), De Matteis Agroalimentare (programma completo di pasta Donna Vera, Baronia, specialità senza glutine e di legumi Grano Armando), Pasta Berrutto (ARRIGHI). Siamo specializzati anche in una selezione di vini fermi e spumanti soprattutto da Veneto, Piemonte, Abruzzo, Puglia, Sardegna e Sicilia."
              : "Od roku 2009 je spoločnosť výhradným importérom vybraných výrobcov potravín, špecialít a vinárstiev z Talianska — CASINAREALE, FIORDELISI, CON.SAR (zn. SARA), ALIS srl (zn. CASA RINALDI), B&G srl (zn. AULUS a LIMMI), De Matteis Agroalimentare (kompletný cestovinový program zn. Donna Vera, zn. Baronia, špeciality bez gluténových a strukovinových cestovín zn. Grano Armando) a Pasta Berrutto (zn. ARRIGHI). Špecializujeme sa taktiež na vybraný sortiment tichých a šumivých vín hlavne z oblasti Veneto, Piemonte, Abruzzo, Puglia, Sardegna a Sicília."}
          </p>
          <p className="mt-4">
            {locale === "it"
              ? "Tra le cantine che si sono \u201Cambientate\u201D da noi: I-LAURI dall'Abruzzo, Antica Vigna — Salva Terra dalla Valpolicella, Cantina Produttori Valdobbiadene — CA'Val dal Veneto, COLESEL, Bonotto, Colli Asolani — Bedin, dal Piemonte Federico Ferrero, dalla Puglia il partner di lunga data Terrulenta — Schola Sarmenti e la cantina Villa Mottura, dall'incantevole Sardegna è una novità Vignetti Zanatta e dalla temperamentale Sicilia la cantina NICOSIA — in primavera arriverà dall'altro lato dell'isola anche Colomba Bianca."
              : "Vinárstva, ktoré sa u nás \u201Eudomácnili\u201C: I-LAURI z provincie Abruzzo, Antica Vigna — Salva Terra z oblasti Valpolicella, z provincie Veneto — Cantina Produttori Valdobbiadene — CA'Val, ďalej COLESEL, Bonotto, Colli Asolani — Bedin, z oblasti Piemonte Federico Ferrero, z oblasti Apúlie dlhodobý partner Terrulenta — Schola Sarmenti a vinárstvo Villa Mottura, z čarovnej Sardínie je novinkou Vignetti Zanatta a z temperamentnej Sicílie — vinárstvo NICOSIA, na jar pribudne z opačnej strany ostrova aj Colomba Bianca."}
          </p>
          <p className="mt-4">
            {locale === "it"
              ? "Molto dinamica è la collaborazione nel programma biscotti, prodotti da forno e pasticceria di Biscottificio Verona — MARINI (Grissini, Sfogliattine, Amaretti, Cantucci, Savoiardi). Snack sani come le nocciole GALA IGP del Piemonte cotte al forno, Freddi Dolciaria, e una novità sarà l'assortimento di Maestro Massimo — Dolce Vita Italiana da Milano."
              : "Veľmi dynamická je spolupráca v oblasti programu keksíkov a pekársko-cukrárenských artiklov od spoločnosti Biscottificio Verona — zn. MARINI (Grissini, Sfogliattine, Amaretti, Cantucci, Savoiardi). Zdravé pochutiny ako lieskovce zn. GALA IGP z oblasti Piemonte pečené v peci, Freddi Dolciaria a novinkou bude sortiment od výrobcu z Milána — Maestro Massimo — Dolce Vita Italiana."}
          </p>
          <p className="mt-4">
            {locale === "it"
              ? "L'assortimento è arricchito dalla LINEA BIANCA — formaggi di Latteria Soc. Mantova (Parmigiano Reggiano, Grana Padano), Gorgonzola ARRIGONI, Latterie Venete, Fior di Maso, mozzarella La Marchesa. Stella fissa è l'ampia gamma di caffè in grani e macinato Caffè Diemme di Padova, con monorigini complementari GLI Speciali."
              : "Sortimentný rad je obohatený o LINEA BIANCA — syry od spoločnosti Latteria Soc. Mantova (Parmigiano Reggiano, Grana Padano), Gorgonzola zn. ARRIGONI, Latterie Venete, Fior di Maso, mozzarella zn. La Marchesa. Našou stálicou je široký sortiment praženej zrnkovej a mletej kávy zn. Caffè Diemme z Padovy so širokým doplnkovým sortimentom mono origine kávami GLI Speciali."}
          </p>
        </div>
      </section>

      {/* Team */}
      <section
        aria-labelledby="team-heading"
        className="max-w-[1500px] mx-auto px-6 lg:px-10 py-24 lg:py-28 border-t border-cream-300"
      >
        <h2 id="team-heading" className="display-lg max-w-[18ch]">
          {locale === "it" ? "Due parole da noi" : "Pár slov od nás"}
        </h2>

        <div className="mt-12 grid sm:grid-cols-2 gap-6 lg:gap-8">
          <TeamCard
            photo="/team-branislav.jpg"
            name="Branislav Solar"
            role="CEO"
            bio={
              locale === "it"
                ? "Il 2009 ha confermato in me la decisione, dopo innumerevoli visite a vari «angoli» e province d'Italia, di voler portare in Slovacchia sapori e profumi tradizionali a prezzi accessibili, per il piacere di ogni giorno. A rafforzare questa scelta è stata l'ospitalità tradizionale, la spontaneità e la filosofia di vita italiana. Ogni singolo prodotto è stato assaggiato con tutti i sensi. Siamo qui da oltre 17 anni e continueremo a portare sulla vostra tavola esperienze autentiche, con sapori e profumi inconfondibili. Alla salute!"
                : "Rok 2009 vo mne potvrdil rozhodnutie, po nespočetných návštevách rôznych „kútov\" a provincií Talianska, že chcem priniesť na Slovensko tradičné chute a vône s akceptovateľnými cenami pre každodenný pôžitok. Umocnila to ešte tá tradičná pohostinnosť, bezprostrednosť a ich životná filozofia. Každý jeden produkt bol ochutnaný všetkými zmyslami. Preto sme tu už cez 17 rokov a budeme sa snažiť, aby autentické zážitky s nezameniteľnou chuťou a vôňou sme prinášali na váš každodenný stôl. Alla salute!"
            }
            locale={locale}
          />
          <TeamCard
            photo="/team-samuel.jpg"
            name="Samuel Havrila"
            role={locale === "it" ? "Marketing" : "Marketér"}
            bio={
              locale === "it"
                ? "L'Italia come paese mi ha conquistato non solo per la sua cultura e le tradizioni, ma anche per la sua cucina. L'Italia ha un'infinità di materie prime, per questo ne portiamo un pezzo direttamente a casa vostra. Nella scelta sono ovviamente felice di darvi consigli al numero +421 908 465 324."
                : "Taliansko ako krajina ma očarila nielen svojou kultúrou a tradíciami, ale aj svojou kuchyňou. Taliansko má nespočetné množstvo surovín, preto vám prinášame kúsok až k Vám domov. Pri výbere vám samozrejme rád poradím na tel. č. +421 908 465 324."
            }
            phone="+421908465324"
            phoneLabel="+421 908 465 324"
            locale={locale}
          />
        </div>
      </section>

    </>
  );
}

function TeamCard({
  photo,
  name,
  role,
  bio,
  phone,
  phoneLabel,
  locale,
}: {
  photo: string;
  name: string;
  role: string;
  bio: string;
  phone?: string;
  phoneLabel?: string;
  locale: "sk" | "it";
}) {
  const bioWithPhone =
    phone && phoneLabel && bio.includes(phoneLabel)
      ? bio.split(phoneLabel)
      : null;

  return (
    <article className="bg-white border border-cream-300 rounded-2xl px-6 sm:px-8 py-8 sm:py-10 flex flex-col items-center text-center">
      <div className="relative w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] rounded-full overflow-hidden bg-cream-100 ring-1 ring-cream-300">
        <Image
          src={photo}
          alt={name}
          fill
          sizes="200px"
          className="object-cover"
        />
      </div>
      <h3 className="display-sm mt-6">{name}</h3>
      <p className="label-meta mt-1.5">{role}</p>
      <p className="body-lg mt-5 max-w-[44ch] text-left sm:text-center" lang={locale}>
        {bioWithPhone ? (
          <>
            {bioWithPhone[0]}
            <a
              href={`tel:${phone}`}
              className="font-medium text-terracotta-600 hover:text-terracotta-700 border-b border-terracotta-600/40 hover:border-terracotta-700 whitespace-nowrap"
            >
              {phoneLabel}
            </a>
            {bioWithPhone[1]}
          </>
        ) : (
          bio
        )}
      </p>
    </article>
  );
}

