import { Suspense } from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import Image from "next/image";
import {
  AlcoholAwareCards,
  CardsSkeleton,
} from "@/components/alcohol-aware-cards";
import { BrandMarquee } from "@/components/brand-marquee";
import { CustomerModePicker } from "@/components/customer-mode-picker";
import { WoltDepots } from "@/components/wolt-depots";
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
      {/* Hero - drone-shot video background, Itali❤amo wordmark + pulsing heart */}
      <section className="relative isolate min-h-[100svh] flex flex-col overflow-hidden">
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <video
            className="absolute inset-0 w-full h-full object-cover object-center"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/hero-scopello.jpg"
            style={{
              filter: "saturate(1.05)",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
            }}
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40" />
        </div>

        <div className="flex-1 max-w-[1760px] w-full mx-auto px-6 lg:px-10 py-10 lg:py-12 flex flex-col items-center justify-center text-center">
          <h1
            className="hero-wordmark text-white"
            aria-label="Italiamo"
          >
            <span>Itali</span>
            <Image
              src="/heart.png"
              alt=""
              width={158}
              height={158}
              priority
              className="heart-beat inline-block align-middle h-[0.78em] w-auto mx-[0.04em]"
            />
            <span>amo</span>
          </h1>

          <div className="mt-10 lg:mt-12 flex justify-center w-full">
            <CustomerModePicker locale={locale} size="lg" />
          </div>
        </div>
      </section>

      {/* Brand marquee - full-bleed, edge-to-edge under hero */}
      <section className="w-full pt-3 pb-6 overflow-hidden">
        <BrandMarquee eyebrow={t("brands.eyebrow")} />
      </section>

      {/* Featured */}
      <section className="max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-10 pt-8 pb-10">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="eyebrow">
              {locale === "en" ? "This week" : "Tento týždeň"}
            </p>
            <h2 className="display-lg mt-4">{t("featured.title")}</h2>
          </div>
          <Link href="/shop" className="link-underline">
            {t("featured.viewAll")} →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Suspense fallback={<CardsSkeleton count={featured.length} />}>
            <AlcoholAwareCards products={featured} locale={locale} />
          </Suspense>
        </div>
      </section>

      {/* O nás */}
      <section className="max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-28 border-t border-cream-300">
        <p className="eyebrow">{t("nav.about")}</p>
        <h2 className="display-lg mt-5 max-w-[28ch]">
          {locale === "en"
            ? "Since 2009 we have been the exclusive importer of selected, authentic products from Italy."
            : "Od roku 2009 sme výhradným importérom vybraných a autentických produktov z Talianska."}
        </h2>

        <p className="about-lead mt-10 max-w-[62ch]">
          {locale === "en"
            ? "Italy is a country whose cultural heritage shaped plenty of other nations, and for us it is a source of inspiration - in the authenticity of the products, in the traditions of Italians and of the producers who pass recipes and methods from one generation to the next. From the very beginning our philosophy has been to import and distribute products that are genuinely affordable for the Slovak customer."
            : "Taliansko je pre nás ako krajina s bohatým kultúrnym dedičstvom, ktoré ovplyvnili aj iné národy, inšpiráciou, autenticitou produktov, tradíciami Talianov ako aj výrobcov, ktorí dedia recepty a postupy z generácie na generáciu. Našou filozofiou od začiatku bolo dovážať a distribuovať cenovo dostupné produkty s vysokým benefitom pre slovenského spotrebiteľa."}
        </p>

        <div className="about-body mt-12 columns-1 lg:columns-2 gap-12 [column-rule:1px_solid_var(--color-cream-300)]">
          <p>
            {locale === "en"
              ? "Since 2009 the company has been the exclusive importer for a selected group of Italian food producers, speciality makers and wineries: Fratelli Mantova, BONOLI (olive oils), Rosso Gargano, ALIS srl (CASA RINALDI), De Matteis Agroalimentare (the complete Pasta Armando range, plus the gluten free and legume pastas under Grano Armando) and Pasta Berrutto (ARRIGHI). We also specialise in a chosen range of still and sparkling wines, mainly from Veneto, Piemonte, Abruzzo, Puglia, Sardegna and Sicily."
              : "Od roku 2009 je spoločnosť výhradným importérom vybraných výrobcov potravín, špecialít a vinárstiev z Talianska týchto značiek - Fratelli Mantova, BONOLI (olivové oleje), Rosso Gargano, ALIS srl (zn. CASA RINALDI), De Matteis Agroalimentare (kompletný cestovinový program zn. Pasta Armando, špeciality bez gluténových a strukovinových cestovín zn. Grano Armando) a Pasta Berrutto (zn. ARRIGHI). Špecializujeme sa taktiež na vybraný sortiment tichých a šumivých vín hlavne z oblasti Veneto, Piemonte, Abruzzo, Puglia, Sardegna a Sicília."}
          </p>
          <p className="mt-4">
            {locale === "en"
              ? "The wineries that have made themselves at home with us: I-LAURI from the province of Abruzzo, Antica Vigna - Salva Terra from Valpolicella, and from Veneto the Cantina Produttori Valdobbiadene - CA'Val, along with Villa degli Olmi, Colli Asolani - Bedin and La Tordera. From Piemonte, Federico Ferrero. From Puglia, our long standing partner Terrulenta - Schola Sarmenti and the Villa Mottura winery. LA PRUINA-PREMURA Vini comes from magical Sardinia, Vignetti Zanatta is an old name that has proved itself all over again, and from hot blooded Sicily we newly listed SOCIETÀ AGR. OLEIFICIO MIGLIORE, a winery that also produces olive oils and fruit. Our work continues with ZUEGG SPA, a leader in preserved fruit jams, fruit juices and drinks."
              : "Vinárstva, ktoré sa u nás \u201Eudomácnili\u201C: I-LAURI z provincie Abruzzo, Antica Vigna - Salva Terra z oblasti Valpolicella, z provincie Veneto - Cantina Produttori Valdobbiadene - CA'Val, ďalej Villa degli Olmi, Colli Asolani - Bedin, La Tordera, z oblasti Piemonte Federico Ferrero, z oblasti Apúlie dlhodobý partner Terrulenta - Schola Sarmenti a vinárstvo Villa Mottura, LA PRUINA-PREMURA Vini z čarovnej Sardínie, staro-novou a osvedčenou značkou je Vignetti Zanatta a z temperamentnej Sicílie novo zalistované vinárstvo a producent olivových olejov a ovocia SOCIETÀ AGR. OLEIFICIO MIGLIORE. Naša spolupráca pretrváva s lídrom v oblasti konzervovaných ovocných džemov, ovocných štiav a džúsov - spoločnosťou ZUEGG SPA."}
          </p>
          <p className="mt-4">
            {locale === "en"
              ? "The collaboration on biscuits, baked goods and confectionery from Biscottificio Verona - MARINI (Sfogliattine, Amaretti, Cantucci, Savoiardi sponge fingers) moves very fast. Snacks such as oven baked GALA IGP hazelnuts from Piemonte, Freddi Dolciaria, and a newcomer will be the range from the Piemonte producer VAL d'OR, which we plan to launch in September 2026."
              : "Veľmi dynamická je spolupráca v oblasti programu sušienok a pekársko-cukrárenských artiklov od spoločnosti Biscottificio Verona - zn. MARINI (Sfogliattine, Amaretti, Cantucci, Savoiardi-piškóty). Zdravé pochutiny ako lieskovce zn. GALA IGP z oblasti Piemonte pečené v peci, Freddi Dolciaria a novinkou bude sortiment od výrobcu z Piemonte zn. VAL d\u2019OR, ktorý plánujeme spustiť v septembri 2026."}
          </p>
          <p className="mt-4">
            {locale === "en"
              ? "The range is enriched by LINEA BIANCA - cheeses from Latteria Soc. Mantova (Parmigiano Reggiano, Grana Padano), CA.FORM srl - Latterie Venete and Fior di Maso. On the chilled side our lasting partner is STERILGARDA from Lago di Garda, together with a newcomer in chilled pasta, PASTA REGGIA from the province of Campania. Our constant is the wide range of roasted whole bean and ground coffee from Caffè Diemme of Padua, with an extensive supporting range, plus the GLI Speciali single origin specialty coffees."
              : "Sortimentný rad je obohatený o LINEA BIANCA - syry od spoločnosti Latteria Soc. Mantova (Parmigiano Reggiano, Grana Padano), CA.FORM srl - Latterie Venete, zn. Fior di Maso. Z oblasti chladených produktov je trvácnym partnerom spoločnosť STERILGARDA z oblasti Lago di Garda, ako aj novinka v oblasti chladených cestovín zn. PASTA REGGIA z provincie Kampánia. Našou stálicou je široký sortiment praženej zrnkovej a mletej kávy zn. Caffè Diemme z Padovy so širokým doplnkovým sortimentom, ako aj SPECIALTY caffè - mono origine kávami GLI Speciali."}
          </p>
        </div>
      </section>

      {/* Team */}
      <section
        aria-labelledby="team-heading"
        className="max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-28 border-t border-cream-300"
      >
        <h2 id="team-heading" className="display-lg max-w-[18ch]">
          {locale === "en" ? "A few words from us" : "Pár slov od nás"}
        </h2>

        <div className="mt-12 grid sm:grid-cols-2 gap-6 lg:gap-8">
          <TeamCard
            photo="/team-branislav.jpg"
            name="Branislav Solar"
            role="CEO"
            bio={
              locale === "en"
                ? "2009 confirmed a decision that had been forming in me after countless visits to different corners and provinces of Italy: that I wanted to bring traditional tastes and aromas to Slovakia at prices people can accept, for everyday pleasure. The traditional hospitality, the openness and their philosophy of life only made that stronger. Every single product was tasted with all the senses. That is why we have been here for over 17 years, and we will keep working so that authentic experiences with an unmistakable taste and aroma reach your table every day. Alla salute!"
                : "Rok 2009 vo mne potvrdil rozhodnutie, po nespočetných návštevách rôznych „kútov\" a provincií Talianska, že chcem priniesť na Slovensko tradičné chute a vône s akceptovateľnými cenami pre každodenný pôžitok. Umocnila to ešte tá tradičná pohostinnosť, bezprostrednosť a ich životná filozofia. Každý jeden produkt bol ochutnaný všetkými zmyslami. Preto sme tu už cez 17 rokov a budeme sa snažiť, aby autentické zážitky s nezameniteľnou chuťou a vôňou sme prinášali na váš každodenný stôl. Alla salute!"
            }
            locale={locale}
          />
          <TeamCard
            photo="/team-matej.jpg"
            name="Matej Solár"
            role={locale === "en" ? "Technical support & e-shop" : "Technická podpora & e-shop"}
            bio={
              locale === "en"
                ? "I look after the running of our e-shop and processing orders, from the basket through to delivery. If you have a question about a product, the status of your order, or you need technical help with the site, I am here for you on +421 917 502 610."
                : "Starám sa o chod nášho e-shopu a vybavovanie objednávok - od košíka až po doručenie. Ak máte otázku k produktu, stavu objednávky alebo technickú podporu k stránke, som tu pre vás na tel. č. +421 917 502 610."
            }
            phone="+421917502610"
            phoneLabel="+421 917 502 610"
            locale={locale}
          />
        </div>
      </section>

      <WoltDepots locale={locale} />
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
  locale: "sk" | "en";
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

