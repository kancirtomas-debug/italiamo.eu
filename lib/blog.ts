import type { Locale } from "@/lib/i18n/routing";

export type BlogList = {
  ordered?: boolean;
  items: Partial<Record<Locale, string[]>>;
};

export type BlogFaq = {
  q: Partial<Record<Locale, string>>;
  a: Partial<Record<Locale, string>>;
};

export type BlogInlineImage = {
  src: string;
  alt: Partial<Record<Locale, string>>;
  /** "left"/"right" float beside the text; "center" stacks below the text as a centered block. */
  side: "left" | "right" | "center";
  /**
   * Size cap. Floated (left/right): "sm" ~34%, "md" (default) ~42%, "lg" ~48% of the column.
   * Centered: "sm" ~340px, "md" ~480px, "lg" ~600px.
   */
  size?: "sm" | "md" | "lg";
};

export type BlogSection = {
  heading: Partial<Record<Locale, string>>;
  paragraphs: Partial<Record<Locale, string[]>>;
  lists?: BlogList[];
  faqs?: BlogFaq[];
  image?: BlogInlineImage;
};

export type BlogPost = {
  slug: string;
  date: string;
  cover: string;
  readMinutes: number;
  title: Partial<Record<Locale, string>>;
  excerpt: Partial<Record<Locale, string>>;
  description: Partial<Record<Locale, string>>;
  keywords: string[];
  sections: BlogSection[];
  /** Slugs of shop products featured under the article, linked to /shop/<slug>. */
  productSlugs?: string[];
};

export const posts: BlogPost[] = [
  {
    slug: "prosecco-vs-champagne-cava",
    productSlugs: [
      "bedin-lucie-prosecco-doc-trev-extra-dry-075l",
      "bedin-versetto-asolo-prosecco-docg-brut-spumante-075l",
      "caval-prosecco-docg-superiore-millesimato-spumante-brut-15l",
      "clos-amador-cava-brut-d-o-penedes-vinarstvo-pere-venturaspanielsko",
    ],
    date: "2026-05-14",
    cover: "/blog/prosecco-vs-champagne-cava.png",
    readMinutes: 9,
    title: {
      sk: "Prosecco vs Champagne vs Cava: ktoré šumivé vybrať a kedy",
      en: "Prosecco vs Champagne vs Cava: which sparkling wine to pick, and when",
    },
    excerpt: {
      sk: "Tri šumivé vína, tri krajiny, tri spôsoby výroby. Kedy siahnuť po Prosecco, kedy po Champagne a kedy stačí Cava - bez sommelier žargónu.",
      en: "Three sparkling wines, three countries, three ways of making them. When to reach for Prosecco, when for Champagne, and when Cava is plenty - without the sommelier jargon.",
    },
    description: {
      sk: "Praktický sprievodca rozdielmi medzi Prosecco, Champagne a Cava. Charmat vs metóda Champenoise, ceny, párovanie s jedlom, kategórie Brut a Extra Dry, a konkrétne odporúčania fliaš od Italiamo.",
      en: "A practical guide to the differences between Prosecco, Champagne and Cava. Charmat versus the Champenoise method, prices, food pairing, the Brut and Extra Dry categories, and specific bottles we recommend from Italiamo.",
    },
    keywords: [
      "prosecco vs champagne",
      "cava rozdiel",
      "ktoré šumivé víno vybrať",
      "prosecco docg",
      "šumivé vína taliansko",
      "prosecco champagne cava",
      "differenze spumanti",
      "metodo classico charmat",
      "vino spumante italiano",
    ],
    sections: [
      {
        heading: { sk: "", en: "" },
        paragraphs: {
          sk: [
            "Otvoríš chladničku v piatok večer a vidíš tri fľaše. Prosecco za 7 €, Cava za 10 €, Champagne za 45 €. Bublinky vyzerajú rovnako. Tak prečo cenový rozdiel päťnásobný?",
            "Krátka odpoveď: spôsob výroby, región a marketing. V tomto poradí.",
            "Dlhá odpoveď je zaujímavejšia. Po prečítaní budeš vedieť, čo otvoriť na pizza večer s kamarátmi a čo schovať na svadbu sestry.",
          ],
          en: [
            "You open the fridge on a Friday evening and see three bottles. Prosecco at 7 EUR, Cava at 10 EUR, Champagne at 45 EUR. The bubbles look identical. So why is the price five times higher?",
            "Short answer: the production method, the region and marketing. In that order.",
            "The long answer is more interesting. By the end of this you will know what to open for pizza night with friends and what to keep back for your sister's wedding.",
          ],
        },
      },
      {
        image: { src: "/blog/sparkling-trio.webp", alt: { sk: "Fľaša šumivého vína a pohár - porovnanie Prosecco, Champagne a Cava", en: "Bottle of sparkling wine and a glass - comparing Prosecco, Champagne and Cava" }, side: "right" },
        heading: {
          sk: "Tri vína, tri svety",
          en: "Three wines, three worlds",
        },
        paragraphs: {
          sk: [
            "Prosecco pochádza z Talianska, hlavne z regiónu Veneto a Friuli. Robí sa z odrody Glera, druhotná fermentácia prebieha v obrovských nerezových tankoch (Charmat metóda), typická fľaša stojí medzi 6 a 15 €. Profil chuti: ovocné, kvetinové, ľahké.",
            "Champagne pochádza výhradne z francúzskeho regiónu Champagne. Robí sa z troch odrôd - Chardonnay, Pinot Noir, Pinot Meunier. Druhotná fermentácia prebieha priamo vo fľaši (Méthode Champenoise), cena 30 až 80 €. Profil chuti: briošový, jablkový, suchá minerálnosť.",
            "Cava pochádza zo Španielska, prevažne z regiónu Penedès v Katalánsku. Robí sa z odrôd Macabeo, Xarel·lo a Parellada. Druhotná fermentácia vo fľaši (Método Tradicional), rovnako ako Champagne. Cena 8 až 20 €. Profil chuti: niekde medzi Prosecco a Champagne - citrusy a pečivo.",
            "Toto je kostra. Teraz mäso.",
          ],
          en: [
            "Prosecco comes from Italy, mainly from Veneto and Friuli. It is made from the Glera grape, the second fermentation happens in huge stainless steel tanks (the Charmat method), and a typical bottle costs between 6 and 15 EUR. Flavour profile: fruity, floral, light.",
            "Champagne comes only from the French region of Champagne. It is made from three grapes - Chardonnay, Pinot Noir, Pinot Meunier. The second fermentation happens in the bottle itself (Méthode Champenoise), price 30 to 80 EUR. Flavour profile: brioche, apple, dry minerality.",
            "Cava comes from Spain, mostly from the Penedès region in Catalonia. It is made from Macabeo, Xarel·lo and Parellada. Second fermentation in the bottle (Método Tradicional), the same as Champagne. Price 8 to 20 EUR. Flavour profile: somewhere between Prosecco and Champagne - citrus and bread crust.",
            "That is the skeleton. Now the meat.",
          ],
        },
      },
      {
        heading: {
          sk: "Prečo Champagne stojí toľko, čo stojí",
          en: "Why Champagne costs what it costs",
        },
        paragraphs: {
          sk: [
            "Šampanské fermentuje druhýkrát priamo vo fľaši, v ktorej ho kúpiš. Kvasinky pri tom kvasení tlačia plyn do vína a po mesiacoch (často rokoch) ležania na droždí mu dávajú chuť pečenia, hrianky, suchých orechov. Tomu sa hovorí autolýza a je to dôvod, prečo Champagne chutí inak ako sódovka s vínom.",
            "Region Champagne je geograficky maličký. Okolo 34 000 hektárov vo Francúzsku, severovýchodne od Paríža. Kriedová pôda, chladná klíma, tri povolené odrody. Plus stoslovné regulácie. Plus rok-dva minimálneho zrenia pre non-vintage, päť rokov pre vintage. To všetko stojí peniaze, a tie peniaze sú vo fľaši.",
            "Champagne otvoríš keď chceš povedať toto je iné. Svadba, povýšenie, narodeniny po piatej dekáde. Suchosť ho robí univerzálnym k jedlu, ale ide najlepšie k slaným veciam - ustriciam, syru, sushi, smaženkám.",
          ],
          en: [
            "Champagne ferments a second time inside the very bottle you buy. The yeast pushes gas into the wine, and after months, often years, resting on the lees it gives the wine flavours of baking, toast and dried nuts. That is called autolysis, and it is the reason Champagne tastes nothing like soda water with wine in it.",
            "The Champagne region is geographically tiny. Around 34,000 hectares in France, north-east of Paris. Chalky soil, cold climate, three permitted grapes. Plus a hundred pages of regulations. Plus one or two years of minimum ageing for non-vintage, five for vintage. All of that costs money, and that money is in the bottle.",
            "You open Champagne when you want to say this one is different. A wedding, a promotion, a birthday past your fiftieth. The dryness makes it work with almost anything, but it is at its best with salty things - oysters, aged cheese, sushi, anything fried.",
          ],
        },
      },
      {
        image: { src: "/blog/prosecco-vineyard.webp", alt: { sk: "Vinohrad v regióne Prosecco", en: "Vineyard in the Prosecco region" }, side: "left" },
        heading: {
          sk: "Prečo Prosecco letí",
          en: "Why Prosecco is flying",
        },
        paragraphs: {
          sk: [
            "Prosecco fermentuje druhýkrát v obrovských nerezových tankoch, nie v jednotlivých fľašiach. Tomu sa hovorí Charmat metóda, vynašli ju v Taliansku v 19. storočí, a má jednu obrovskú výhodu: je rýchla a lacná. Žiadne roky zrenia. Žiadne ručné otáčanie fliaš.",
            "Výsledok? Víno, ktoré chráni primárne ovocné a kvetinové chute Gleray, hlavnej odrody. Nie pečivo, nie hrianka. Hruška, jablko, biele kvety, niekedy med.",
            "Na etikete stretneš tri hlavné kategórie. Prosecco DOC je najširší región a najväčšia produkcia - zhruba 90 % toho, čo vidíš v obchodoch. Prosecco DOCG Conegliano Valdobbiadene má užší region a prísnejšie pravidlá, stojí o 2 až 4 € viac, chutí výrazne lepšie. Prosecco DOCG Asolo je menší región, menej známy, často s najlepším pomerom kvalita ku cene v segmente DOCG.",
            "Prosecco otvoríš v piatok večer, k pizze, na terasu, do Aperol Spritzu. Nezhodnoť ho za to, že je lacnejší. Robí inú prácu.",
          ],
          en: [
            "Prosecco ferments a second time in large stainless steel tanks, not in individual bottles. This is the Charmat method, invented in Italy in the 19th century, and it has one huge advantage: it is fast and cheap. No years of ageing. No turning bottles by hand.",
            "The result? A wine that protects the primary fruit and floral character of Glera, the main grape. Not brioche, not toast. Pear, apple, white flowers, sometimes honey.",
            "On the label you will meet three main categories. Prosecco DOC covers the widest area and the biggest production, roughly 90 % of what you see in the shops. Prosecco DOCG Conegliano Valdobbiadene has a tighter area and stricter rules, costs 2 to 4 EUR more, and tastes noticeably better. Prosecco DOCG Asolo is a smaller area, less known, often the best quality for the money in the DOCG segment.",
            "You open Prosecco on a Friday evening, with pizza, on the terrace, in an Aperol Spritz. Do not mark it down for being cheaper. It does a different job.",
          ],
        },
      },
      {
        heading: {
          sk: "Cava: outsider, ktorý zaslúži viac pozornosti",
          en: "Cava: the outsider that deserves more attention",
        },
        paragraphs: {
          sk: [
            "Cava sa vyrába rovnakou metódou ako Champagne. Druhotná fermentácia vo fľaši, zrenie na droždí. Len v Španielsku, z iných odrôd, za zlomok ceny. To ju robí jednou z najlepších hodnôt v celej kategórii šumivých vín.",
            "Lacná Cava do 8 € je často priemerná. Tu sa neoplatí šetriť. Ale Cava v segmente 10 až 15 €? Často poráža Champagne za 30 € v slepej degustácii. Čítal som výsledky z viacerých blind tastingov, kde Cava Brut Nature od malých producentov dostávala vyššie body ako etablované značky šampanského.",
            "Cava ti dá tú istú briošovú, hriankovú chuť čo Champagne, len trochu menej elegantnú v druhej polovici dúšku. Pre 95 % situácií úplne stačí.",
          ],
          en: [
            "Cava is made by the same method as Champagne. Second fermentation in the bottle, ageing on the lees. Only it happens in Spain, from different grapes, at a fraction of the price. That makes it one of the best value wines in the whole sparkling category.",
            "Cheap Cava under 8 EUR is often mediocre. This is not the place to economise. But Cava in the 10 to 15 EUR range? It often beats a 30 EUR Champagne in a blind tasting. I have read results from several blind tastings where Cava Brut Nature from small producers scored higher than established Champagne houses.",
            "Cava gives you the same brioche and toast character as Champagne, just a little less elegant in the second half of the sip. For 95 % of situations that is more than enough.",
          ],
        },
      },
      {
        heading: {
          sk: "Kedy otvoriť čo (praktický návod)",
          en: "When to open what (a practical guide)",
        },
        paragraphs: {
          sk: [
            "Piatok večer, pizza, kamaráti: Prosecco DOC, 7 až 9 €. [Bedin Lucie Prosecco DOC](/shop/bedin-lucie-prosecco-doc-trev-extra-dry-075l) alebo Canti Prosecco DOC sú spoľahlivá voľba z nášho katalógu.",
            "Aperol Spritz, letná terasa: Prosecco, akýkoľvek. Spritz to prekryje, neutopuj peniaze v drahšom víne.",
            "Rodinný obed s pečenou kačkou: Prosecco DOCG, Asolo alebo Valdobbiadene, 12 až 15 €. [Bedin Versetto Asolo Prosecco DOCG Brut](/shop/bedin-versetto-asolo-prosecco-docg-brut-spumante-075l) je presne tento prípad.",
            "Niečo elegantné, nezvyčajné, k syrom: Cava Brut Nature alebo Brut, 12 až 18 €. [Clos Amador Cava Brut](/shop/clos-amador-cava-brut-d-o-penedes-vinarstvo-pere-venturaspanielsko) zo Španielska má charakter, ktorý ťa neurazí ani pri Roquefortovi.",
            "Svadba, výročie, raz za rok príležitosť: Champagne, ak na to máš. Ak nie, Cava Reserva alebo Prosecco DOCG vintage spravia 80 % roboty za 30 % ceny.",
            "Brunch s mimózami: lacné Prosecco. Pomarančový džús prekryje všetko. Šetri peniaze.",
          ],
          en: [
            "Friday evening, pizza, friends: Prosecco DOC, 7 to 9 EUR. [Bedin Lucie Prosecco DOC](/shop/bedin-lucie-prosecco-doc-trev-extra-dry-075l) or Canti Prosecco DOC from our catalogue are safe choices.",
            "Aperol Spritz, summer terrace: Prosecco, any of them. The Spritz covers everything, do not sink money into a pricier bottle.",
            "Family lunch with roast duck: Prosecco DOCG, Asolo or Valdobbiadene, 12 to 15 EUR. [Bedin Versetto Asolo Prosecco DOCG Brut](/shop/bedin-versetto-asolo-prosecco-docg-brut-spumante-075l) is exactly this occasion.",
            "Something elegant and out of the ordinary, with cheese: Cava Brut Nature or Brut, 12 to 18 EUR. [Clos Amador Cava Brut](/shop/clos-amador-cava-brut-d-o-penedes-vinarstvo-pere-venturaspanielsko) from Spain has enough character to hold its own against a Roquefort.",
            "Wedding, anniversary, the once-a-year occasion: Champagne, if you can stretch to it. If not, Cava Reserva or a vintage Prosecco DOCG will do 80 % of the work for 30 % of the price.",
            "Brunch with mimosas: cheap Prosecco. The orange juice covers everything. Save your money.",
          ],
        },
      },
      {
        image: { src: "/blog/wine-label.webp", alt: { sk: "Detail etikety vína - kategórie sladkosti Brut, Extra Dry, Demi-sec", en: "Wine label detail - the Brut, Extra Dry and Demi-sec sweetness categories" }, side: "right" },
        heading: {
          sk: "Brut, dry, demi-sec - čo to znamená",
          en: "Brut, dry, demi-sec - what it actually means",
        },
        paragraphs: {
          sk: [
            "Zvyškový cukor sa udáva v gramoch na liter. Brut Nature alebo Pas Dosé má 0 až 3 g/l, suchý ako papier, hodí sa k ovocným koláčom v gastronomickom párovaní. Extra Brut má 0 až 6 g/l, suchý, gastronomický. Brut má 0 až 12 g/l a je to najpredávanejšia kategória, univerzálne suché.",
            "Potom prichádza historicky mätúca časť. Extra Dry má 12 až 17 g/l, čo je paradoxne sladšie ako Brut. Dry má 17 až 32 g/l a je polosladké. Demi-Sec má 32 až 50 g/l, dezertné. Doux má 50+ g/l a je sladké, k dezertom.",
            "Ak v živote nepamätáš nič iné: Brut je default. Extra Dry je sladšie ako Brut. Logika nedáva zmysel, viem.",
          ],
          en: [
            "Residual sugar is given in grams per litre. Brut Nature or Pas Dosé has 0 to 3 g/l, dry as paper, and works with fruit tarts in a gastronomic pairing. Extra Brut has 0 to 6 g/l, dry, gastronomic. Brut has 0 to 12 g/l and is the best selling category, dry across the board.",
            "Then comes the historically confusing part. Extra Dry has 12 to 17 g/l, which is paradoxically sweeter than Brut. Dry has 17 to 32 g/l and is semi-sweet. Demi-Sec has 32 to 50 g/l, dessert level. Doux has 50+ g/l and is sweet, for puddings.",
            "If you remember nothing else: Brut is the default. Extra Dry is sweeter than Brut. The logic makes no sense, I know.",
          ],
        },
      },
      {
        heading: {
          sk: "Najčastejšie omyly",
          en: "The most common mistakes",
        },
        paragraphs: {
          sk: [
            "Drahšie sa nerovná lepšie. Nie vždy. Prosecco za 8 € k pizze poráža Champagne za 50 € k pizze. Šampanské sa tu stratí.",
            "Prosecco nie je vždy sladšie ako Champagne. Závisí to od konkrétnej fľaše. Brut Prosecco a Brut Champagne majú často podobný cukor.",
            "Champagne sa dlho skladuje, Prosecco nie. Toto platí. Prosecco pi do dvoch rokov od plnenia. Champagne kľudne vydrží 5 až 15 rokov, niektoré dlhšie.",
            "Šumivé vína sa pijú len pri oslave - to je najväčšia škoda. Brut Prosecco ide skvele k cestovinám s morskými plodmi, Cava k jamón, Champagne k vyprážanému kuraťu.",
          ],
          en: [
            "More expensive does not equal better. Not always. An 8 EUR Prosecco with pizza beats a 50 EUR Champagne with pizza. The Champagne gets lost here.",
            "Prosecco is not always sweeter than Champagne. It depends on the bottle. Brut Prosecco and Brut Champagne often carry similar sugar.",
            "Champagne keeps for years, Prosecco does not. This one is true. Drink Prosecco within two years of bottling. Champagne will happily last 5 to 15 years, some of them longer.",
            "Sparkling wine is only for celebrations, and that is the biggest shame of all. Brut Prosecco goes beautifully with seafood pasta, Cava with jamón, Champagne with fried chicken.",
          ],
        },
      },
      {
        heading: {
          sk: "Ako podávať: tri veci, ktoré reálne fungujú",
          en: "How to serve it: three things that actually work",
        },
        paragraphs: {
          sk: [
            "Teplota 6 až 8 °C. Príliš studené zabije chuť, príliš teplé urobí z vína penu.",
            "Štíhly tulipánový pohár. Klasické flûte koncentruje vône, ale šampaňáci dnes prešli na širší tulipán pre lepší rozvoj arómy. Klasický coupe, plytká miska, je pekný, ale rovno vyparuje bublinky.",
            "Otváraj tak, aby fľaša vzdychla, nie vystrelila. Drž korok, krúť fľašou. Akoby si chcel vypustiť dušu, nie ju vystreliť do stropu.",
          ],
          en: [
            "Temperature 6 to 8 °C. Too cold kills the aroma, too warm turns the wine into foam.",
            "A slim tulip glass. The classic flûte concentrates the aromas, but Champagne producers have moved to a wider tulip so the bouquet can open up. The classic coupe, the shallow bowl, is pretty but lets the bubbles evaporate straight away.",
            "Open it so the bottle sighs rather than fires. Hold the cork and turn the bottle. As if you wanted to let a breath out, not launch it at the ceiling.",
          ],
        },
      },
      {
        heading: {
          sk: "Časté otázky",
          en: "Frequently asked questions",
        },
        paragraphs: {
          sk: [
            "Vydrží otvorené šumivé do druhého dňa? S dobrou zátkou v chladničke áno, 24 až 48 hodín. Bez zátky stratí bublinky behom hodín.",
            "Čo je vintage pri šumivom víne? Víno z jediného ročníka, napríklad 2018, zvyčajne kvalitnejšieho. Non-vintage je miešané z viacerých rokov pre konzistentnú chuť značky.",
            "Prečo niektoré Prosecco peni viac ako iné? Spumante má vyšší tlak, minimálne 3 bary. Frizzante má nižší tlak, 1 až 2,5 baru. Frizzante je jemnejší, hodí sa k jedlu.",
            "Aké šumivé pasuje k tortám a sladkým dezertom? Moscato d'Asti. Sladké, jemne perlivé, alkoholu len 5 až 7 %. Federico Ferrero Moscato d'Asti DOCG je klasický príklad.",
            "Ide otvorené Prosecco do varenia? Áno, do rizota, do omáčok na ryby alebo na drink Sgroppino - citrónový sorbet, Prosecco a vodka. Nezahadzuj.",
          ],
          en: [
            "Will an opened sparkling wine last until the next day? With a good stopper in the fridge, yes, 24 to 48 hours. Without a stopper it loses its bubbles within hours.",
            "What does vintage mean on a sparkling wine? Wine from a single year, 2018 for example, usually of higher quality. Non-vintage is blended from several years to keep the brand tasting the same.",
            "Why do some Proseccos foam more than others? Spumante has higher pressure, at least 3 bar. Frizzante has lower pressure, 1 to 2.5 bar. Frizzante is gentler and works well with food.",
            "Which sparkling wine goes with cakes and sweet desserts? Moscato d'Asti. Sweet, lightly sparkling, only 5 to 7 % alcohol. Federico Ferrero Moscato d'Asti DOCG is the classic example.",
            "Can you cook with opened Prosecco? Yes, in risotto, in sauces for fish, or in a Sgroppino - lemon sorbet, Prosecco and vodka. Do not pour it away.",
          ],
        },
      },
      {
        heading: {
          sk: "Čo si pamätať",
          en: "What to remember",
        },
        paragraphs: {
          sk: [
            "Tri vína, tri spôsoby výroby, tri rôzne príležitosti. Prosecco do bežného života. Cava keď chceš výsledok blízko Champagne za polovicu. Champagne keď ide o moment, na ktorý si budeš pamätať.",
            "A keď neviete čo, otvorte Prosecco. Nikdy nezklame a vždy je správny.",
          ],
          en: [
            "Three wines, three ways of making them, three different occasions. Prosecco for everyday life. Cava when you want a result close to Champagne for half the money. Champagne when it is a moment you want to remember.",
            "And when you cannot decide, open a Prosecco. It never disappoints and it is always the right call.",
          ],
        },
      },
    ],
  },
  {
    slug: "carbonara-pravy-recept-talianska",
    productSlugs: [
      "grano-armando-spaghetto-500g",
      "alce-nero-bio-spaghetti-500g",
      "bedin-lucie-prosecco-doc-trev-extra-dry-075l",
      "caffe-diemme-blu-arabica-zrnkova-kava-200g-z-5-druhov-odrody-arabika",
    ],
    date: "2026-05-21",
    cover: "/blog/carbonara-pravy-recept-talianska.png",
    readMinutes: 8,
    title: {
      sk: "Pravá talianska Carbonara: recept od Rimana (a kde kúpiť guanciale)",
      en: "Real Roman Carbonara: a recipe from a Roman (and where to buy guanciale)",
    },
    excerpt: {
      sk: "Štyri ingrediencie, jedna technika, žiadna smotana. Ako sa robí pravá Carbonara doma a prečo 90 % receptov na internete je zle.",
      en: "Four ingredients, one technique, no cream. How real Carbonara is made at home and why 90 % of the recipes online get it wrong.",
    },
    description: {
      sk: "Originálny rímsky recept na Carbonaru s guanciale, Pecorino Romano DOP, vajcami a čiernym korením. Bez smotany, slaniny ani cibule. Krok za krokom, fotky postupu, najčastejšie chyby a kde na Slovensku kúpiť pravé suroviny.",
      en: "The authentic Roman Carbonara recipe with guanciale, Pecorino Romano DOP, eggs and black pepper. No cream, no bacon, no onion. Step by step, the most common mistakes, and where to buy the real ingredients in Slovakia.",
    },
    keywords: [
      "carbonara pravý recept",
      "carbonara originál",
      "guanciale slovensko",
      "pecorino romano",
      "talianske cestoviny",
      "spaghetti alla carbonara",
      "ricetta carbonara romana",
      "guanciale pecorino",
      "pasta carbonara",
    ],
    sections: [
      {
        heading: { sk: "", en: "" },
        paragraphs: {
          sk: [
            "Carbonara má štyri ingrediencie: guanciale, vajcia, Pecorino Romano a čierne korenie. Bez smotany. Bez cibule. Bez cesnaku. Bez slaniny. Bez petržlenu.",
            "Toto nie je puristická poznámka, ale stredobod celého receptu. Smotana zamaskuje techniku, ktorá robí Carbonaru tým čím je. Slanina nahradí surovinu, ktorá dodáva polovicu chute. Cesnak prebije Pecorino.",
            "Pravá Carbonara stojí na premene vajíčka a syra v krémovú omáčku teplom z cestovín. Žiadna iná tekutina. Žiadny iný tuk okrem rozpusteného guanciale. Keď to spravíš správne, výsledok je nepoctivo dobrý.",
          ],
          en: [
            "Carbonara has four ingredients: guanciale, eggs, Pecorino Romano and black pepper. No cream. No onion. No garlic. No bacon. No parsley.",
            "This is not a purist footnote, it is the centre of the whole recipe. Cream masks the technique that makes Carbonara what it is. Bacon replaces the ingredient that carries half the flavour. Garlic drowns the Pecorino.",
            "Real Carbonara lives on turning egg and cheese into a creamy sauce using nothing but the heat of the pasta. No other liquid. No other fat except the guanciale that has rendered out. When you get it right, the result is unfairly good.",
          ],
        },
      },
      {
        image: { src: "/blog/guanciale.webp", alt: { sk: "Guanciale - tradičná talianska bravčová líčka", en: "Guanciale, cured pork cheek" }, side: "right", size: "sm" },
        heading: {
          sk: "Suroviny pre dve osoby",
          en: "Ingredients for two people",
        },
        paragraphs: {
          sk: [
            "Štyri hlavné ingrediencie, plus voda a soľ. Množstvá sú pre dve porcie.",
          ],
          en: [
            "Four main ingredients, plus water and salt. Quantities are for two portions.",
          ],
        },
        lists: [
          {
            ordered: false,
            items: {
              sk: [
                "Sušené špagety alebo rigatoni - 200 g. Tvrdá pšenica, bronzová matrica lepšie drží omáčku. [Grano Armando Spaghetto 500 g](/shop/grano-armando-spaghetto-500g) robí presne túto prácu.",
                "Guanciale - 100 g. Sušená bravčová líca z Lazia. Núdzová náhrada: pancetta. Slaninu nikdy - je údená a zmení chuť.",
                "Vaječné žĺtky - 4 kusy, plus 1 celé vajce. Izbová teplota.",
                "Pecorino Romano DOP - 60 g, čerstvo strúhaný. Nie parmezán - je príliš jemný.",
                "Čierne korenie - čerstvo mleté, aspoň pol lyžičky.",
                "Soľ do vody na cestoviny. Žiadny olej, žiadny iný tuk.",
              ],
              en: [
                "Dried spaghetti or rigatoni - 200 g. Durum wheat, a bronze die holds the sauce better. [Grano Armando Spaghetto 500 g](/shop/grano-armando-spaghetto-500g) does exactly this job.",
                "Guanciale - 100 g. Cured pork cheek from Lazio. In a pinch: pancetta. Never bacon - it is smoked and changes the flavour.",
                "Egg yolks - 4, plus 1 whole egg. At room temperature.",
                "Pecorino Romano DOP - 60 g, freshly grated. Not parmesan - it is too mild.",
                "Black pepper - freshly ground, at least half a teaspoon.",
                "Salt for the pasta water. No oil, no other fat.",
              ],
            },
          },
        ],
      },
      {
        heading: {
          sk: "Postup krok za krokom",
          en: "Step by step",
        },
        paragraphs: {
          sk: [
            "Príprava 5 minút, varenie 15 minút. Kľúčový moment je krok 7 - panvica mimo ohňa.",
          ],
          en: [
            "5 minutes prep, 15 minutes cooking. The crucial moment is step 7 - pan off the heat.",
          ],
        },
        lists: [
          {
            ordered: true,
            items: {
              sk: [
                "Guanciale nakrájaj na pásiky asi 1 cm hrubé. Príliš tenké sa spália, príliš hrubé zostanú gumové.",
                "Postav osolenú vodu na cestoviny. Soľ menej než zvyčajne - Pecorino aj guanciale sú slané.",
                "Rozšľahaj 4 žĺtky a 1 celé vajce s Pecorinom a hojným korením na hladkú pastu. To je základ omáčky.",
                "Guanciale daj na suchú studenú panvicu. Pri strednom ohni smaž 4-6 minút do zlatista a chrumkava na hranách. Odlož, tuk nechaj v panvici.",
                "Cestoviny var al dente, o minútu kratšie než hovorí obal. Pred zliatím odlej pohár vody z varenia - nezabudni.",
                "Scedené cestoviny prehoď do panvice s tukom a mimo ohňa premiešaj.",
                "Prilej vaječnú zmes a hneď intenzívne miešaj. Panvica má byť len teplá - horúca panvica = omeleta, studená = redká omáčka.",
                "Po lyžiciach pridávaj vodu z cestovín, kým omáčka nezhustne do hladkého krému, ktorý obalí cestoviny.",
                "Vráť guanciale, posyp Pecorinom a čerstvo mletým korením. Servíruj okamžite - carbonara nepočká.",
              ],
              en: [
                "Cut the guanciale into strips about 1 cm thick. Too thin and it burns, too thick and it stays rubbery.",
                "Put salted pasta water on. Salt it less than usual - both Pecorino and guanciale are salty.",
                "Beat 4 yolks and 1 whole egg with the Pecorino and plenty of pepper into a smooth paste. This is the base of the sauce.",
                "Put the guanciale in a dry cold pan. Over medium heat cook 4-6 minutes until golden and crisp at the edges. Set aside, keep the fat in the pan.",
                "Cook the pasta al dente, a minute less than the packet says. Before draining, save a cup of the pasta water - do not forget.",
                "Off the heat, toss the drained pasta in the guanciale fat.",
                "Pour in the egg mix and stir hard at once. The pan should be only warm - a hot pan gives an omelette, a cold one a thin sauce.",
                "Add pasta water a spoonful at a time until the sauce thickens into a smooth cream that coats the pasta.",
                "Return the guanciale, dust with Pecorino and freshly ground pepper. Serve immediately - carbonara does not wait.",
              ],
            },
          },
        ],
      },
      {
        image: { src: "/blog/carbonara.webp", alt: { sk: "Hotová talianska carbonara", en: "Finished spaghetti carbonara" }, side: "left", size: "lg" },
        heading: {
          sk: "Najčastejšie chyby",
          en: "The most common mistakes",
        },
        paragraphs: {
          sk: ["Kde to najčastejšie padne:"],
          en: ["Where it most often goes wrong:"],
        },
        lists: [
          {
            ordered: false,
            items: {
              sk: [
                "Smotana. Najväčší hriech - zriedi chuť a zakryje techniku. Suchá carbonara? Viac vody z cestovín, nie smotana.",
                "Slanina namiesto guanciale. Údená chuť úplne zmení charakter jedla.",
                "Panvica na ohni pri pridaní vajec. Zrazia sa a máš omeletu. Neopraviteľné, začni odznova.",
                "Parmezán namiesto Pecorina. Príliš jemný, výsledok bez umami stredu.",
                "Príliš málo žĺtkov. 2 žĺtky plus pol celého vajca na osobu, nie 1 celé vajce.",
                "Zabudnutá voda z cestovín. Bez nej omáčku nikdy nedostaneš do správnej konzistencie.",
              ],
              en: [
                "Cream. The biggest crime - it dilutes the flavour and hides the technique. Dry carbonara? More pasta water, not cream.",
                "Bacon instead of guanciale. That smoke changes the character of the dish completely.",
                "Pan on the heat when the eggs go in. They scramble and you get an omelette. No fixing it, start again.",
                "Parmesan instead of Pecorino. Too mild, and the result has no umami centre.",
                "Too few yolks. 2 yolks plus half a whole egg per person, not 1 whole egg.",
                "Forgetting the pasta water. Without it you never get the sauce to the right consistency.",
              ],
            },
          },
        ],
      },
      {
        heading: {
          sk: "Čo k tomu otvoriť",
          en: "What to open alongside it",
        },
        paragraphs: {
          sk: [
            "Carbonara je slaná, mastná, intenzívna. Potrebuje víno, ktoré ju očistí, nie ju zaťaží.",
            "Najlepšie pasuje suché biele s dobrou kyselinkou. Frascati Superiore, Verdicchio, Pecorino z Marche. Bublinky tiež fungujú: Brut Prosecco DOC alebo Cava režú slaný tuk a osviežia palato.",
            "Ak chceš červené, zvoľ niečo ľahké a šťavnaté, žiadne tanínové monštrum. Sangiovese z Toskánska v štýle Chianti Classico funguje.",
            "Z nášho katalógu je [Bedin Lucie Prosecco DOC](/shop/bedin-lucie-prosecco-doc-trev-extra-dry-075l) bezpečná voľba k Carbonare aj keď tradicionalisti budú nadávať.",
          ],
          en: [
            "Carbonara is salty, fatty and intense. It needs a wine that cleans up after it, not one that piles on.",
            "A dry white with good acidity fits best. Frascati Superiore, Verdicchio, Pecorino from the Marche. Bubbles work too: Brut Prosecco DOC or Cava cut through the salty fat and refresh the palate.",
            "If you want red, pick something light and juicy, no tannic monsters. A Tuscan Sangiovese in the Chianti Classico style works.",
            "From our catalogue, [Bedin Lucie Prosecco DOC](/shop/bedin-lucie-prosecco-doc-trev-extra-dry-075l) is a safe choice with Carbonara, even if the traditionalists will grumble about it.",
          ],
        },
      },
      {
        heading: {
          sk: "Kde na Slovensku kúpiť suroviny",
          en: "Where to buy the ingredients in Slovakia",
        },
        paragraphs: {
          sk: [
            "Cestoviny: [Grano Armando Spaghetto](/shop/grano-armando-spaghetto-500g) je dostupný v našom katalógu - tvrdá pšenica bez pesticídov, bronzová matrica, pomalé sušenie. Talianska kvalita za rozumnú cenu. Ak chceš bio, siahni po [Alce Nero Bio Spaghetti 500 g](/shop/alce-nero-bio-spaghetti-500g).",
            "Guanciale: tu je to ťažšie. Italiamo aktuálne neimportuje guanciale (chladiarenský reťazec), ale pancetta sušená je dostupná u niektorých talianskych delikatesných predajcov v Bratislave a Košiciach. Ak ideš do Talianska, kúp jednu, drží v chladničke 3-4 týždne.",
            "Pecorino Romano DOP: hľadaj značku Brunelli alebo Locatelli. V našom katalógu je dostupný Pecorino zo Sardínie, je suchší a slanší, funguje výborne aj keď nie je Romano.",
            "Vajcia: farmárske, čo najčerstvejšie. Ideálne free-range so známym pôvodom.",
          ],
          en: [
            "Pasta: [Grano Armando Spaghetto](/shop/grano-armando-spaghetto-500g) is in our catalogue - durum wheat without pesticides, bronze die, slow dried. Italian quality at a sensible price. If you want organic, take [Alce Nero Bio Spaghetti 500 g](/shop/alce-nero-bio-spaghetti-500g).",
            "Guanciale: this one is harder. Italiamo does not currently import guanciale because of the cold chain, but cured pancetta is available from some Italian delis in Bratislava and Košice. If you are going to Italy, buy one, it keeps 3 to 4 weeks in the fridge.",
            "Pecorino Romano DOP: look for Brunelli or Locatelli. Our catalogue carries Pecorino from Sardinia, which is drier and saltier and works very well even though it is not Romano.",
            "Eggs: farm eggs, as fresh as you can get. Ideally free range with a known source.",
          ],
        },
      },
      {
        heading: {
          sk: "Záver",
          en: "To finish",
        },
        paragraphs: {
          sk: [
            "Carbonara nie je ťažký recept. Štyri ingrediencie, dvadsať minút, žiadne komplikované techniky. Ale vyžaduje rešpekt k surovinám a presnú teplotu pri spojení vajec a cestovín.",
            "Keď ti vyjde prvýkrát, pochopíš prečo Talian na turistických videách s Carbonarou plnou smotany trpí. To, čo robíme my, je úplne iné jedlo. Buon appetito.",
          ],
          en: [
            "Carbonara is not a hard recipe. Four ingredients, twenty minutes, no complicated technique. But it demands respect for the ingredients and an exact temperature at the moment the eggs meet the pasta.",
            "The first time it works, you understand why a Roman suffers watching tourist videos of Carbonara swimming in cream. What we are making is a completely different dish. Buon appetito.",
          ],
        },
      },
    ],
  },
  {
    slug: "balsamico-ocot-igp-modena-sprievodca",
    productSlugs: [
      "taliansky-vinny-ocot-glassata-klasicky-kremovy-balzamikovy-ocot-igp-di-modena-25",
      "alce-nero-bio-balsamico-vinny-ocot-250ml-ocot-i-g-p",
      "taliansky-vinny-ocot-glassata-klasicky-kremovy-balzamikovy-ocot-biely-250-ml-zn-",
      "delikatesna-originalna-natierka-pesto-s-balzamikovym-octom-igp-modena-a-hrozn-mu",
    ],
    date: "2026-05-28",
    cover: "/blog/balsamico-ocot-igp-modena-sprievodca.png",
    readMinutes: 7,
    title: {
      sk: "Balsamico ocot: IGP, DOP a čo skutočne kupuješ v supermarkete",
      en: "Balsamic vinegar: IGP, DOP and what you are actually buying in the supermarket",
    },
    excerpt: {
      sk: "Tri písmená rozhodujú o tom, či máš v rukách remeselný produkt alebo karamelizovaný cukor s octom. Praktický sprievodca etiketou.",
      en: "Three letters decide whether you are holding a craft product or caramelised sugar with vinegar in it. A practical guide to the label.",
    },
    description: {
      sk: "Rozdiel medzi Aceto Balsamico Tradizionale DOP, Aceto Balsamico di Modena IGP a tým, čo bežne stojí v regáli za 2 €. Ako čítať etiketu, čo znamenajú leaf labels a ktorý balsamico kúpiť na šalát, na grilované mäso a do redukcie.",
      en: "The difference between Aceto Balsamico Tradizionale DOP, Aceto Balsamico di Modena IGP and the bottle that normally sits on the shelf at 2 EUR. How to read the label, what the leaf labels mean, and which balsamic to buy for salad, for grilled meat and for a reduction.",
    },
    keywords: [
      "balsamico ocot",
      "aceto balsamico modena igp",
      "aceto tradizionale dop",
      "ocot na šalát",
      "balsamico glassata",
      "varvello balsamico",
      "aceto balsamico differenze",
      "balsamico autentico",
    ],
    sections: [
      {
        heading: { sk: "", en: "" },
        paragraphs: {
          sk: [
            "Stojíš v supermarkete pred regálom s octami. Jeden balsamico za 1,80 €. Druhý za 8 €. Tretí za 45 €. Ten najdrahší je v malej fľaštičke na 100 ml a má voskovú pečať.",
            "Všetky tri sa volajú balsamico. Všetky sú pravdepodobne legálne nazvané. A predsa každý z nich je úplne iný produkt s úplne inou výrobou.",
            "Tento článok ti za 10 minút povie, ako čítať etiketu, čomu sa vyhnúť, čo si oplatí kúpiť a ako jednoducho rozpoznať remeselný produkt od priemyselnej imitácie.",
          ],
          en: [
            "You are standing in the supermarket in front of the vinegar shelf. One balsamic costs 1.80 EUR. Another 8 EUR. A third 45 EUR. The most expensive one comes in a little 100 ml bottle with a wax seal.",
            "All three are called balsamic. All three are probably named legally. And yet each one is a completely different product made in a completely different way.",
            "In ten minutes this article will tell you how to read the label, what to avoid, what is worth buying, and how to spot a craft product against an industrial imitation.",
          ],
        },
      },
      {
        image: { src: "/blog/balsamic-vinegar.webp", alt: { sk: "Fľaša balsamikového octu", en: "Bottle of balsamic vinegar" }, side: "right" },
        heading: {
          sk: "Tri triedy, ktoré musíš poznať",
          en: "The three grades you need to know",
        },
        paragraphs: {
          sk: [
            "Aceto Balsamico Tradizionale di Modena DOP a Aceto Balsamico Tradizionale di Reggio Emilia DOP. Najvyššia trieda. Vyrába sa zo zhusteného hroznového muštu (mosto cotto), bez pridaného octu, zreje minimálne 12 rokov v drevených sudoch. Najmenšia povolená fľaštička je 100 ml. Cena 60 až 200 € za fľašu. Áno, naozaj.",
            "Aceto Balsamico di Modena IGP. Stredná trieda, regulovaná Európskou úniou. Robí sa z hroznového muštu plus vínny ocot, môže obsahovať karamel ako farbivo. Minimálne 60 dní zrenia. Tu je obrovský rozsah kvality - od priemerných po výborné. Cena 5 až 25 € za bežnú fľašu.",
            "Condimento Balsamico alebo Salsa Balsamica. Bez chráneného označenia. Tu môže byť čokoľvek: zmes vínneho octu, karamelu, ochuteného cukru. Pravidlá EU sú tu voľnejšie a producent ti môže ponúknuť v podstate čokoľvek pod menom balsamico.",
            "Pravidlo praktické: ak vidíš na etikete IGP alebo DOP, kupuj. Ak nie, čítaj zloženie veľmi pozorne.",
          ],
          en: [
            "Aceto Balsamico Tradizionale di Modena DOP and Aceto Balsamico Tradizionale di Reggio Emilia DOP. The top grade. Made from cooked grape must (mosto cotto), with no added vinegar, aged at least 12 years in wooden barrels. The smallest permitted bottle is 100 ml. Price 60 to 200 EUR a bottle. Yes, really.",
            "Aceto Balsamico di Modena IGP. The middle grade, regulated by the European Union. Made from grape must plus wine vinegar, and it may contain caramel as a colouring. Minimum 60 days of ageing. The quality range here is enormous, from average to excellent. Price 5 to 25 EUR for a standard bottle.",
            "Condimento Balsamico or Salsa Balsamica. No protected designation. This can be anything: a mix of wine vinegar, caramel and flavoured sugar. EU rules are looser here and a producer can sell you almost anything under the balsamic name.",
            "The practical rule: if you see IGP or DOP on the label, buy it. If not, read the ingredients very carefully.",
          ],
        },
      },
      {
        image: { src: "/blog/balsamic-barrels.webp", alt: { sk: "Drevené sudy na zrenie balsamikového octu v acetaii", en: "Wooden barrels for ageing balsamic vinegar" }, side: "left" },
        heading: {
          sk: "Ako čítať etiketu Modena IGP",
          en: "How to read a Modena IGP label",
        },
        paragraphs: {
          sk: [
            "Niektorí producenti používajú systém leaf labels (lístočkov) - neoficiálny ale praktický spôsob, ako rýchlo posúdiť kvalitu IGP balsamica.",
            "Jeden lístok znamená mladší ocot, vyšší podiel vínneho octu, jednoduchšia chuť, vhodné na bežné použitie a marinády.",
            "Dva lístky znamenajú strednú kvalitu, vyšší podiel zhusteného muštu, jemnejší profil, vhodné na šaláty a polosuché jedlá.",
            "Tri lístky znamenajú vyšší podiel muštu, dlhšie zrenie, hustšiu konzistenciu. Toto je už balsamico, ktoré si zaslúži samostatnú lyžičku nad kúskom Parmigiana.",
            "Štyri lístky a viac sú prémiové IGP, niekedy zrelé 10 a viac rokov. Cena 25-60 €. Hraničí s DOP kvalitou.",
            "Pozor: nie všetci producenti používajú lístky. Iné indikátory: nápis Invecchiato znamená zrelý (minimálne 3 roky), Extra Vecchio znamená veľmi zrelý (minimálne 12 rokov, takmer DOP kvalita).",
          ],
          en: [
            "Some producers use the leaf label system, an unofficial but practical way to judge the quality of an IGP balsamic quickly.",
            "One leaf means a younger vinegar, a higher share of wine vinegar, a simpler flavour, fine for everyday use and marinades.",
            "Two leaves mean middling quality, a higher share of cooked must, a softer profile, good for salads and semi-dry dishes.",
            "Three leaves mean more must, longer ageing and a thicker consistency. This is already a balsamic that deserves its own teaspoon over a piece of Parmigiano.",
            "Four leaves and up are premium IGP, sometimes aged 10 years or more. Price 25 to 60 EUR. It borders on DOP quality.",
            "Careful: not every producer uses the leaves. Other indicators: the word Invecchiato means aged (at least 3 years), Extra Vecchio means very aged (at least 12 years, close to DOP quality).",
          ],
        },
      },
      {
        image: { src: "/blog/caprese.webp", alt: { sk: "Caprese salát s balsamikom", en: "Caprese salad with balsamic" }, side: "right" },
        heading: {
          sk: "Čo s ktorým balsamicom robiť",
          en: "What to do with which balsamic",
        },
        paragraphs: {
          sk: [
            "Mladé IGP (1-2 lístky), 5-10 €: marinády, dresingy, redukcie. Toto je tvoj denný balsamico. Pridaj do oleja s horčicou a medom na šalát, alebo redukuj na panvici s cukrom a maslom na omáčku ku grilovanému mäsu.",
            "Stredné IGP (3 lístky), 12-20 €: čerstvý paradajkový šalát s mozzarellou di bufala, parené špargle, restované huby. Tu už chceš ochutnať balsamico ako prísadu, nie len ako kyslé pozadie.",
            "Glassata alebo crema balsamica: hustý sirup z balsamica a cukru. Praktická pomôcka na dekoráciu - kvapnúť na tanier okolo jedla, na bruschettu, na grilovaný syr. [Varvello Glassata IGP 250 ml](/shop/taliansky-vinny-ocot-glassata-klasicky-kremovy-balzamikovy-ocot-igp-di-modena-25) z nášho katalógu je solídna voľba, k dispozícii je aj [biela verzia](/shop/taliansky-vinny-ocot-glassata-klasicky-kremovy-balzamikovy-ocot-biely-250-ml-zn-) na svetlé jedlá.",
            "Prémiové IGP (4+ lístky) a DOP: čerstvý Parmigiano, jahody, vanilková zmrzlina, pečená hruška. Tu sa už pije lyžičkou. Nesmieš ho zahrievať, nesmieš ho miešať s ničím silným. Je to esencia.",
            "Pravidlo: čím lepší balsamico, tým menej s ním rob. Najlepší balsamico potrebuje len lyžičku a dobré suroviny vedľa neho.",
          ],
          en: [
            "Young IGP (1 to 2 leaves), 5 to 10 EUR: marinades, dressings, reductions. This is your everyday balsamic. Mix it into oil with mustard and honey for salad, or reduce it in a pan with sugar and butter for a sauce to go with grilled meat.",
            "Mid IGP (3 leaves), 12 to 20 EUR: fresh tomato salad with mozzarella di bufala, steamed asparagus, sautéed mushrooms. Here you want to taste the balsamic as an ingredient, not just as an acidic background.",
            "Glassata or crema balsamica: a thick syrup of balsamic and sugar. A practical tool for decorating - drops around the plate, on bruschetta, on grilled cheese. [Varvello Glassata IGP 250 ml](/shop/taliansky-vinny-ocot-glassata-klasicky-kremovy-balzamikovy-ocot-igp-di-modena-25) from our catalogue is a solid choice, and there is a [white version](/shop/taliansky-vinny-ocot-glassata-klasicky-kremovy-balzamikovy-ocot-biely-250-ml-zn-) for pale dishes.",
            "Premium IGP (4+ leaves) and DOP: fresh Parmigiano, strawberries, vanilla ice cream, baked pear. At this level you take it by the teaspoon. Do not heat it, do not mix it with anything strong. It is an essence.",
            "The rule: the better the balsamic, the less you do with it. The best balsamic needs one teaspoon and good ingredients next to it.",
          ],
        },
      },
      {
        heading: {
          sk: "Najčastejšie omyly pri kúpe",
          en: "The most common buying mistakes",
        },
        paragraphs: {
          sk: [
            "Nákup najdrahšieho na regáli automaticky. Cena nemusí korelovať s kvalitou. Niektoré 8 € fľaše sú lepšie než 18 € konkurenti.",
            "Nákup glassaty s vedomím, že je to balsamico. Glassata je redukcia balsamica s cukrom. Užitočná na dekoráciu, ale nie je to ten istý produkt.",
            "Nákup balsamica s prísadami ako limonová šťava, malina, trufla. Toto sú aromatizované octy, niekedy dobré, niekedy nie, ale nie tradičný balsamico.",
            "Skladovanie v slnku alebo v teplej skrini. Balsamico nemá rado svetlo a teplo. Skladuj v chladnej tmavej skrini.",
            "Domnievať sa, že drahší DOP je vždy lepšia voľba ako kvalitný IGP. Pre bežné použitie je IGP úplne dosť. DOP si nechaj na výnimočné jedlá, kde naozaj ochutnáš rozdiel.",
          ],
          en: [
            "Automatically buying the most expensive one on the shelf. Price does not always track quality. Some 8 EUR bottles are better than 18 EUR rivals.",
            "Buying glassata thinking it is balsamic. Glassata is a reduction of balsamic with sugar. Useful for decorating, but it is not the same product.",
            "Buying balsamic flavoured with lemon, raspberry or truffle. These are flavoured vinegars, sometimes good, sometimes not, but they are not traditional balsamic.",
            "Storing it in sunlight or in a warm cupboard. Balsamic does not like light or heat. Keep it in a cool dark cupboard.",
            "Assuming an expensive DOP always beats a good IGP. For everyday use an IGP is plenty. Save the DOP for the dishes where you will genuinely taste the difference.",
          ],
        },
      },
      {
        heading: {
          sk: "Časté otázky",
          en: "Frequently asked questions",
        },
        paragraphs: {
          sk: [
            "Ako dlho vydrží otvorený balsamico? IGP vydrží 2-3 roky v chladnej tmavej skrini. DOP prakticky neobmedzene, ak je dobre uzavretý.",
            "Treba dať balsamico do chladničky? Nie. Práve naopak - chladnička jeho chuť zhorší. Skladuj pri izbovej teplote.",
            "Môžem variť s drahým balsamicom? Môžeš, ale zbytočne. Vysoká teplota zničí jemné aroma. Pre varenie použi mladší IGP, drahší si nechaj surový.",
            "Aký je rozdiel medzi Modena a Reggio Emilia DOP? Reggio Emilia DOP používa systém kolorovaných etikiet (červená, strieborná, zlatá) podľa veku. Modena DOP používa Affinato (12+ rokov) a Extravecchio (25+ rokov). Obidve sú špičkové.",
            "Balsamico v rybacích jedlách? Áno, najmä na tučné ryby ako tuniak alebo losos. Pár kvapiek glassaty na grilovaného lososa s čiernym korením je výborná kombinácia.",
          ],
          en: [
            "How long does an opened balsamic keep? An IGP keeps 2 to 3 years in a cool dark cupboard. A DOP practically indefinitely if it is sealed well.",
            "Should balsamic go in the fridge? No. Quite the opposite, the fridge makes the flavour worse. Keep it at room temperature.",
            "Can I cook with expensive balsamic? You can, but there is no point. High heat destroys the delicate aromas. Cook with a younger IGP and keep the expensive one raw.",
            "What is the difference between Modena and Reggio Emilia DOP? Reggio Emilia DOP uses coloured labels (red, silver, gold) by age. Modena DOP uses Affinato (12+ years) and Extravecchio (25+ years). Both are top tier.",
            "Balsamic with fish? Yes, especially on oily fish like tuna or salmon. A few drops of glassata on grilled salmon with black pepper is an excellent combination.",
          ],
        },
      },
      {
        heading: {
          sk: "Záver",
          en: "To finish",
        },
        paragraphs: {
          sk: [
            "Balsamico je jeden z najnepochopenejších produktov v talianskej kuchyni. Polovica fliaš v slovenských supermarketoch je len ochutený ocot, ale dobré IGP je dostupné a stojí za peniaze.",
            "Kúp si jeden mladý IGP na bežné použitie a jeden stredný (3 lístky) na čerstvé šaláty a paradajky. Toto pokryje 95 % situácií. Drahšie balsamico investuj len ak si naozaj fanúšik.",
            "Pre slovenský trh máme v katalógu [Varvello Glassata IGP](/shop/taliansky-vinny-ocot-glassata-klasicky-kremovy-balzamikovy-ocot-igp-di-modena-25) - solídnu zmes na bežné dekoračné použitie, kvalitnú a cenovo dostupnú. Ak chceš samotný ocot a nie glazúru, vezmi [Alce Nero Bio Balsamico 250 ml](/shop/alce-nero-bio-balsamico-vinny-ocot-250ml-ocot-i-g-p).",
          ],
          en: [
            "Balsamic is one of the most misunderstood products in Italian cooking. Half the bottles in Slovak supermarkets are just flavoured vinegar, but a good IGP is easy to find and worth the money.",
            "Buy one young IGP for everyday use and one mid range bottle (3 leaves) for fresh salads and tomatoes. That covers 95 % of situations. Spend more only if you are genuinely a fan.",
            "For the Slovak market our catalogue carries [Varvello Glassata IGP](/shop/taliansky-vinny-ocot-glassata-klasicky-kremovy-balzamikovy-ocot-igp-di-modena-25), a solid glaze for everyday decorating, good quality at a fair price. If you want the vinegar itself rather than a glaze, take [Alce Nero Bio Balsamico 250 ml](/shop/alce-nero-bio-balsamico-vinny-ocot-250ml-ocot-i-g-p).",
          ],
        },
      },
    ],
  },
  {
    slug: "olivovy-olej-apulia-pravy",
    productSlugs: [
      "extra-panensky-olivovy-olej-zn-bonoli-500ml-v-skle",
      "extra-panensky-olivovy-olej-fratelli-mantova-equlibrato-500ml-v-skle",
      "extra-panensky-olivovy-olej-zn-bonoli-v-skle-1-liter",
      "ochutene-extra-panenske-olivove-oleje-basil-s-bazalkou-garlic-s-cesnakom-chili-s",
    ],
    date: "2026-06-04",
    cover: "/blog/olivovy-olej-apulia-pravy-v3.webp",
    readMinutes: 8,
    title: {
      sk: "Olivový olej z Apúlie: prečo je najlepší a ako spoznať pravý",
      en: "Olive oil from Apulia: why it is the best and how to spot the real thing",
    },
    excerpt: {
      sk: "Apúlia produkuje 40 % talianskeho olivového oleja. Toto je dôvod, prečo je olej z tohto regiónu unikátny - a ako rozlíšiť pravý extra panenský olej od priemyselnej zmesi.",
      en: "Apulia produces 40 % of Italian olive oil. Here is why the oil from this region is unique, and how to tell a real extra virgin from an industrial blend.",
    },
    description: {
      sk: "Sprievodca olivovým olejom z Apúlie: odrody Coratina, Ogliarola, Peranzana, čo znamenajú výrazy extra vergine, DOP, IGP, ako čítať etiketu, ako spoznať čerstvý olej a ako ho správne skladovať.",
      en: "A guide to olive oil from Apulia: the Coratina, Ogliarola and Peranzana varieties, what extra vergine, DOP and IGP actually mean, how to read the label, how to recognise a fresh oil and how to store it properly.",
    },
    keywords: [
      "olivový olej apúlia",
      "extra panenský olivový olej",
      "olio extravergine puglia",
      "coratina ogliarola",
      "olej dop",
      "rosso gargano",
      "olio oliva pugliese",
      "extravergine autentico",
    ],
    sections: [
      {
        heading: { sk: "", en: "" },
        paragraphs: {
          sk: [
            "Apúlia - Puglia v taliančine - je päta talianskeho čižmu. Plochá, kamenistá, dlhé pobrežie, 60 miliónov olivovníkov. Niektoré z nich majú viac ako 1500 rokov a stále plodia.",
            "Tento jeden región produkuje takmer 40 % všetkého talianskeho olivového oleja. To je viac, než celá Sicília, Kalábria a Kampania spolu.",
            "Apúlsky olej má charakter, ktorý sa nedá imitovať: silný, peprný, mierne horký, s tóninami čerstvo pokoseného trávnika a artičoku. Toto je dôvod, prečo seriózne talianské reštaurácie po celom svete idú práve sem nakupovať.",
          ],
          en: [
            "Apulia, Puglia in Italian, is the heel of the Italian boot. Flat, stony, a long coastline, 60 million olive trees. Some of them are over 1,500 years old and still bearing fruit.",
            "This one region produces almost 40 % of all Italian olive oil. That is more than Sicily, Calabria and Campania put together.",
            "Apulian oil has a character you cannot imitate: strong, peppery, slightly bitter, with notes of freshly cut grass and artichoke. This is why serious Italian restaurants all over the world come here to buy.",
          ],
        },
      },
      {
        image: { src: "/blog/olive-grove.webp", alt: { sk: "Olivový háj v Apúlii so starými olivovníkmi", en: "Apulian olive grove with centuries-old trees" }, side: "left" },
        heading: {
          sk: "Hlavné apúlske odrody olív",
          en: "The main Apulian olive varieties",
        },
        paragraphs: {
          sk: [
            "Coratina. Najznámejšia, najsilnejšia, vysoký obsah polyfenolov. Charakteristická horká, peprná chuť, dlhé pikantné finále. Tento olej drahšie reštaurácie radi používajú na finálne kvapnutie na grilované mäso, polievky, fazuľu.",
            "Ogliarola Barese. Najproduktívnejšia, ovocnejšia, miernejšia. Stredná intenzita, mandľové tóny, hodí sa na šaláty, čerstvé paradajky, bruschettu. Najlepší univerzálny olej pre denné použitie.",
            "Peranzana. Region Daunia, severná Apúlia. Sviežia, jablková, jemne sladkastá. Skvelá k rybe, k mozzarelle, ku všetkému, kde nechceš dominantnú chuť oleja.",
            "Cellina di Nardò. Severný Salento. Vysoký výnos, jemné finále, často súčasť blendov v DOP olejoch.",
            "Producenti často miešajú tieto odrody do blendov, aby vybalansovali silu Coratiny so sviežosťou Ogliaroly. Najlepšie DOP a IGP oleje sú práve takéto vyvážené zmesi.",
          ],
          en: [
            "Coratina. The best known and the strongest, high in polyphenols. A characteristic bitter, peppery flavour with a long spicy finish. Better restaurants like to use this one as a final drizzle over grilled meat, soups and beans.",
            "Ogliarola Barese. The most productive, fruitier and milder. Medium intensity, almond notes, good for salads, fresh tomatoes and bruschetta. The best all-round oil for everyday use.",
            "Peranzana. From the Daunia area in northern Apulia. Fresh, appley, gently sweet. Excellent with fish, with mozzarella, with anything where you do not want the oil to dominate.",
            "Cellina di Nardò. Northern Salento. High yield, delicate finish, often part of the blend in DOP oils.",
            "Producers often mix these varieties into blends to balance the power of Coratina against the freshness of Ogliarola. The best DOP and IGP oils are exactly this kind of balanced blend.",
          ],
        },
      },
      {
        image: { src: "/blog/olive-press.webp", alt: { sk: "Kamenný olivový mlyn na lisovanie za studena", en: "Stone olive mill for cold pressing" }, side: "right" },
        heading: {
          sk: "Čo znamená Extra Vergine",
          en: "What Extra Vergine means",
        },
        paragraphs: {
          sk: [
            "Extra Vergine alebo extra panenský olej je najvyššia kvalitatívna trieda olivového oleja. Musí byť získaný čisto mechanickým lisovaním bez chemikálií, kyslosť pod 0,8 %, žiadne organoleptické chyby pri laboratórnej degustácii.",
            "Druhá trieda je Vergine - panenský. Rovnaký výrobný proces, kyslosť do 2 %, môže mať drobné chyby v chuti. V supermarketoch vidíš zriedka, predáva sa skôr na varenie.",
            "Tretia kategória je Olio di Oliva. Toto je zmes rafinovaného oleja (chemicky čisteného z chybných lisovaní) s malým podielom panenského. Lacný, neutrálny, vhodný akurát na vyprážanie. Žiadna chuť.",
            "Pozor na Pomace Oil alebo Olio di Sansa. Toto je olej extrahovaný z výliskov olív po hlavnom lisovaní pomocou chemických rozpúšťadiel. Najnižšia trieda, vyhni sa ak môžeš.",
          ],
          en: [
            "Extra Vergine, or extra virgin, is the top quality class of olive oil. It has to be produced by purely mechanical pressing without chemicals, acidity below 0.8 %, and no organoleptic faults in the laboratory tasting panel.",
            "The second class is Vergine, virgin. Same production process, acidity up to 2 %, and it may carry small flavour faults. You rarely see it in supermarkets, it tends to be sold for cooking.",
            "The third category is Olio di Oliva. This is a blend of refined oil, chemically cleaned up from faulty pressings, with a small share of virgin oil. Cheap, neutral, fit for frying and little else. No flavour.",
            "Watch out for Pomace Oil or Olio di Sansa. This is oil extracted from the olive pomace left after the main pressing, using chemical solvents. The lowest class, avoid it where you can.",
          ],
        },
      },
      {
        heading: {
          sk: "DOP, IGP a kde je rozdiel",
          en: "DOP, IGP and where the difference lies",
        },
        paragraphs: {
          sk: [
            "DOP (Denominazione di Origine Protetta) je najvyššia geografická ochrana. Olivy musia byť pestované, zbierané a lisované v konkrétnej zóne. Apúlia má štyri DOP oleje: Terra di Bari, Dauno, Collina di Brindisi, Terre Tarentine.",
            "IGP (Indicazione Geografica Protetta) je voľnejšia. Olivy môžu pochádzať z viacerých zón regiónu, ale aspoň jedna fáza výroby musí prebehnúť v chránenej zóne. Olio Extravergine di Oliva IGP Puglia pokrýva celý región.",
            "Pre kupujúceho z praktického hľadiska: DOP olej je drahší (15-30 €/750 ml), ale máš istotu úzkeho pôvodu a väčšinou aj dohľadateľnosti až po mlyn. IGP olej je dostupnejší (8-18 €), kvalitne taký istý ale s voľnejším pôvodom.",
            "Olej bez DOP/IGP označenia môže byť výborný, ale chýba ti garancia pôvodu. Tu treba pozerať na producenta - meno mlyna, rok zberu, kontakty.",
          ],
          en: [
            "DOP (Denominazione di Origine Protetta) is the highest geographical protection. The olives have to be grown, harvested and pressed within one defined zone. Apulia has four DOP oils: Terra di Bari, Dauno, Collina di Brindisi and Terre Tarentine.",
            "IGP (Indicazione Geografica Protetta) is looser. The olives can come from several zones within the region, but at least one production stage has to happen inside the protected zone. Olio Extravergine di Oliva IGP Puglia covers the whole region.",
            "For a buyer, in practice: a DOP oil costs more (15 to 30 EUR per 750 ml), but you get a guarantee of narrow origin and usually traceability back to the mill. An IGP oil is more affordable (8 to 18 EUR), similar in quality but with a wider origin.",
            "An oil without a DOP or IGP mark can still be excellent, but you have no guarantee of origin. Here you have to look at the producer: the name of the mill, the harvest year, contact details.",
          ],
        },
      },
      {
        image: { src: "/blog/olive-oil-bottle.webp", alt: { sk: "Fľaše olivového oleja so zlatistou farbou", en: "Golden coloured bottles of olive oil" }, side: "left" },
        heading: {
          sk: "Ako čítať etiketu krok za krokom",
          en: "How to read the label, step by step",
        },
        paragraphs: {
          sk: [
            "Hľadaj rok zberu (raccolta). Olivový olej nie je víno, nezraje. Najlepší je do 18 mesiacov od lisovania. Ak na etikete nie je rok zberu, len dátum spotreby, často to znamená, že producent nechce odhaliť, ako starý je olej.",
            "Hľadaj odrody (cultivar). Konkrétne mená - Coratina, Ogliarola, Peranzana - sú znakom prémie. Ak je tam len monovarietale (jednoodrodový) alebo blend, vyžaduj viac informácií.",
            "Hľadaj producenta a adresu. Pravé apúlske oleje majú meno mlyna, adresu v Apúlii, často kontakt. Anonymné značky bez konkrétneho mlyna sú podozrivé.",
            "Pozri si farbu a balenie. Pravý extra panenský olej je v tmavej fľaši alebo plechovke, ktorá ho chráni pred svetlom. Číra fľaša je červená vlajka - výrobca šetrí na obale a olej oxiduje rýchlejšie.",
            "Nákupná značka extra vergine v hyper-rozmieste 1 l fľaše za 5 € je takmer určite zmes z viacerých krajín (Španielsko, Tunisko, Grécko, Taliansko). Etiketa to musí povinne uviesť malým písmom. Skontroluj zadnú časť.",
          ],
          en: [
            "Look for the harvest year (raccolta). Olive oil is not wine, it does not age. It is at its best within 18 months of pressing. If the label carries only a best before date and no harvest year, it often means the producer would rather not tell you how old the oil is.",
            "Look for the varieties (cultivar). Specific names - Coratina, Ogliarola, Peranzana - are a sign of quality. If all it says is monovarietale or blend, ask for more information.",
            "Look for the producer and the address. Genuine Apulian oils carry the name of the mill, an address in Apulia, often a contact. Anonymous brands with no named mill are suspicious.",
            "Look at the colour and the packaging. Real extra virgin comes in a dark bottle or a tin that protects it from light. A clear bottle is a red flag - the producer is saving on packaging and the oil oxidises faster.",
            "A supermarket own-brand extra vergine in a 1 litre bottle at 5 EUR is almost certainly a blend from several countries (Spain, Tunisia, Greece, Italy). The label is legally required to say so in small print. Check the back.",
          ],
        },
      },
      {
        image: { src: "/blog/olive-tasting.webp", alt: { sk: "Doska s olivovým olejom, olivami a chlebom na degustáciu", en: "Board with olive oil, olives and bread for tasting" }, side: "right" },
        heading: {
          sk: "Ako olej skladovať a používať",
          en: "How to store and use the oil",
        },
        paragraphs: {
          sk: [
            "Skladovanie: chladné, suché, tmavé miesto. Ideálne 14-18 °C. Nie v chladničke (olej tuhne) a nie pri sporáku (teplo a svetlo ho ničia).",
            "Po otvorení vydrží 3-6 mesiacov pri zachovaní plnej chute. Po 12 mesiacoch už síce stále dobrý, ale charakter sa vytráca.",
            "Na šaláty, čerstvé zeleninové prílohy, bruschettu, surové ryby, polievky - pridaj olej len pred servírovaním, surový. Tu sa olej oplatí.",
            "Na vyprážanie použi neutrálny olej (slnečnicový, repkový), nie panenský olivový. Vyprážanie zničí to, prečo si zaplatil za extra vergine.",
            "Na kratšie restovanie pri stredných teplotách (do 180 °C) môžeš použiť bežný extra vergine bez problému. Tu sa oplatí mladý mladší IGP, nie prémiový.",
          ],
          en: [
            "Storage: a cool, dry, dark place. Ideally 14 to 18 °C. Not in the fridge, where it solidifies, and not next to the cooker, where heat and light destroy it.",
            "Once opened it holds its full flavour for 3 to 6 months. After 12 months it is still fine, but the character fades.",
            "On salads, fresh vegetable sides, bruschetta, raw fish and soups, add the oil raw just before serving. This is where good oil earns its money.",
            "For deep frying use a neutral oil, sunflower or rapeseed, not virgin olive oil. Frying destroys the very thing you paid extra vergine money for.",
            "For shorter sautéing at moderate temperatures, up to 180 °C, an ordinary extra vergine is perfectly fine. A young IGP does the job here, no need for the premium bottle.",
          ],
        },
      },
      {
        heading: {
          sk: "Časté otázky",
          en: "Frequently asked questions",
        },
        paragraphs: {
          sk: [
            "Prečo dobrý olej štípe v hrdle? To je polyfenolový obsah. Vyšší peprný charakter znamená vyšší obsah antioxidantov, čo je zdravotne pozitívne aj senzoricky charakteristické pre kvalitný olej.",
            "Môžem ochutnať olej samotný? Áno, je to štandardná profesionálna technika. Lyžička oleja, prevaľuj v ústach 10 sekúnd, vdýchni cez zuby, prehltni. Cítiš ovocný štart, horký stred, peprné finále. To je olej.",
            "Olej z prvého lisovania (prima spremitura) je zaručene kvalitný? Tento výraz dnes nemá legálny význam. Moderné lisy v jednej fáze. Hľadaj radšej extra vergine plus konkrétny mlyn.",
            "Filtrovaný alebo nefiltrovaný? Filtrovaný drží dlhšie a má čistejší vzhľad. Nefiltrovaný má bohatší charakter, ale rýchlejšie sa kazí. Pre bežné použitie filtrovaný, pre špeciálne degustácie nefiltrovaný do 6 mesiacov od zberu.",
            "Cena za dobrý kuchynský olej z Apúlie? 12-22 € za 750 ml. Pod 8 € si v miešaných produktoch, nad 30 € v špecialitnom segmente.",
          ],
          en: [
            "Why does good oil sting the throat? That is the polyphenol content. A more peppery character means more antioxidants, which is good for you and typical of a quality oil.",
            "Can I taste the oil on its own? Yes, it is a standard professional technique. A teaspoon of oil, roll it around your mouth for 10 seconds, draw air in through your teeth, swallow. You get a fruity start, a bitter middle and a peppery finish. That is oil.",
            "Is first pressing (prima spremitura) a guarantee of quality? The phrase has no legal meaning today. Modern mills work in a single stage. Look instead for extra vergine plus a named mill.",
            "Filtered or unfiltered? Filtered keeps longer and looks cleaner. Unfiltered has a richer character but spoils faster. For everyday use go filtered, for special tastings unfiltered within 6 months of harvest.",
            "What should a good Apulian kitchen oil cost? 12 to 22 EUR for 750 ml. Under 8 EUR you are in blended products, over 30 EUR you are in the specialty segment.",
          ],
        },
      },
      {
        heading: {
          sk: "Záver",
          en: "To finish",
        },
        paragraphs: {
          sk: [
            "Apúlsky olivový olej je jedným z mála produktov, kde rozdiel medzi priemerom a kvalitou ochutnáš okamžite. Päť kvapiek pravého Coratina extra vergine na čerstvý paradajkový šalát urobí viac, než akýkoľvek dressing.",
            "Investícia 15 € do dobrej fľaše DOP alebo IGP oleja vystačí pri správnom použití (surový, na finále) na 2-3 mesiace. To je menej než dve kávy v meste denne.",
            "Italiamo má v katalógu zdroje z konkrétnych apúlskych mlynov - Rosso Gargano a iné značky priamo z regiónu, s dohľadateľnosťou až po olivovník. Na každodenné varenie vezmi [Bonoli extra panenský 1 l](/shop/extra-panensky-olivovy-olej-zn-bonoli-v-skle-1-liter), na finálne kvapkanie [Bonoli 500 ml v skle](/shop/extra-panensky-olivovy-olej-zn-bonoli-500ml-v-skle) alebo [Fratelli Mantova Equilibrato 500 ml](/shop/extra-panensky-olivovy-olej-fratelli-mantova-equlibrato-500ml-v-skle).",
          ],
          en: [
            "Apulian olive oil is one of the few products where you taste the difference between average and good immediately. Five drops of real Coratina extra vergine on a fresh tomato salad do more than any dressing.",
            "Spending 15 EUR on a good bottle of DOP or IGP oil, used properly, raw and as a finish, will last you 2 to 3 months. That is less than two coffees in town a day.",
            "Italiamo works with specific Apulian mills - Rosso Gargano and other brands straight from the region, with traceability back to the tree. For everyday cooking take [Bonoli extra virgin 1 l](/shop/extra-panensky-olivovy-olej-zn-bonoli-v-skle-1-liter), and for finishing [Bonoli 500 ml in glass](/shop/extra-panensky-olivovy-olej-zn-bonoli-500ml-v-skle) or [Fratelli Mantova Equilibrato 500 ml](/shop/extra-panensky-olivovy-olej-fratelli-mantova-equlibrato-500ml-v-skle).",
          ],
        },
      },
    ],
  },
  {
    slug: "cacio-e-pepe-recept-rim",
    productSlugs: [
      "grano-armando-spaghetto-500g",
      "grano-armando-chitarra-500g",
      "grano-armando-mezza-manica-500g",
      "alce-nero-bio-spaghetti-500g",
    ],
    date: "2026-06-11",
    cover: "/blog/cacio-e-pepe-recept-rim-v3.webp",
    readMinutes: 9,
    title: {
      sk: "Cacio e pepe: rímsky recept o troch ingredienciách, ktoré sa všetci boja",
      en: "Cacio e pepe: the Roman recipe with three ingredients that frighten everybody",
    },
    excerpt: {
      sk: "Tri ingrediencie. Päť minút varenia. A pol Talianska sa háda, ako presne to robiť. Tu je verzia, ktorá vychádza aj doma - bez termometra a bez paniky pri škrobovej vode.",
      en: "Three ingredients. Five minutes of cooking. And half of Italy arguing about exactly how to do it. This is the version that works at home, without a thermometer and without panicking over the starchy water.",
    },
    description: {
      sk: "Praktický návod ako uvariť cacio e pepe doma: výber cestovín, Pecorino Romano DOP, čierne korenie Tellicherry, technika kremovania bez maslových skratiek. Konkrétne pomery, časovanie, najčastejšie chyby.",
      en: "A practical guide to cacio e pepe at home: choosing the pasta, Pecorino Romano DOP, Tellicherry black pepper, and the technique for the cream without butter shortcuts. Exact quantities, timings and the usual mistakes.",
    },
    keywords: [
      "cacio e pepe recept",
      "pravý rímsky cacio e pepe",
      "pecorino romano",
      "tonnarelli",
      "ako uvariť cacio e pepe",
      "talianska kuchyňa rím",
      "cacio e pepe ricetta romana",
      "pasta cacio e pepe",
      "cremina pecorino",
    ],
    sections: [
      {
        heading: { sk: "", en: "" },
        paragraphs: {
          sk: [
            "Tri veci na taniere. Cestoviny, ovčí syr, čierne korenie. Žiadny olej, žiadne maslo, žiadna smotana. Cestoviny stoja v 15 minútach a aj tak sa tomu jedlu ľudia v rímskych trattoriach klaňajú.",
            "Dôvod: nič sa neschová. Ak je pasta prevarená, vidíš to. Ak je syr hrudkovitý, je hrudkovitý. Ak na korenie zabudneš dať na rozohriatu panvicu, chuť je plochá. Päť minút technického koridoru - vnútri ste šéfkuchár, vonku máte sklamanie a slaný syr.",
            "Tento návod beriem z rímskych trattorií, kde to robia tridsať rokov denne. Aj s pomermi, ktoré vychádzajú doma na obyčajnom sporáku.",
          ],
          en: [
            "Three things on the plate. Pasta, sheep's cheese, black pepper. No oil, no butter, no cream. The pasta sits in the pot for 15 minutes and people in Roman trattorias still bow to that plate.",
            "The reason: nothing hides. If the pasta is overcooked, you can see it. If the cheese goes lumpy, it is lumpy. If you forget to toast the pepper in the pan, the flavour falls flat. Five minutes of a technical corridor - inside it you are the chef, outside it you have a disappointment and some salty cheese.",
            "This guide comes from Roman trattorias that have been making it daily for thirty years. Including quantities that work at home on an ordinary hob.",
          ],
        },
      },
      {
        image: { src: "/blog/black-pepper-pasta.webp", alt: { sk: "Cestoviny s čerstvo mletým čiernym korením", en: "Pasta with freshly ground black pepper" }, side: "right" },
        heading: {
          sk: "Tri ingrediencie, tisíc spôsobov ako to pokaziť",
          en: "Three ingredients, a thousand ways to ruin it",
        },
        paragraphs: {
          sk: [
            "Talianska kuchyňa má pravidlo: čím menej ingrediencií, tým vyššia laťka. Cacio e pepe je dôkaz. Každá zložka musí byť presne to, čo má byť. Nie podobné, nie skoro, nie z akcie v supermarkete.",
            "Pred receptom - krátka inventúra. Ak doma nemáš jedno z nasledujúcich štyroch, nepokračuj.",
          ],
          en: [
            "Italian cooking has a rule: the fewer the ingredients, the higher the bar. Cacio e pepe proves it. Every component has to be exactly the right thing. Not similar, not nearly, not whatever was on offer at the supermarket.",
            "Before the recipe, a quick inventory. If you are missing one of the following four, stop here.",
          ],
        },
        lists: [
          {
            ordered: false,
            items: {
              sk: [
                "Tonnarelli, spaghettoni alebo aspoň hrubé spaghetti. Tenké spaghettini nepustia dosť škrobu.",
                "Pecorino Romano DOP - výhradne ovčí syr z Lazia alebo Sardínie. Parmezán je iný syr a tu nefunguje.",
                "Čierne celé korenie - najlepšie Tellicherry alebo Malabar. Kúpené mleté korenie do hodiny stratí 60 % aromy.",
                "Hrubá panvica alebo wok. Tenká nerezová panvica zabíja kremovanie.",
              ],
              en: [
                "Tonnarelli, spaghettoni or at least thick spaghetti. Thin spaghettini will not release enough starch.",
                "Pecorino Romano DOP - sheep's cheese from Lazio or Sardinia only. Parmesan is a different cheese and it does not work here.",
                "Whole black peppercorns - Tellicherry or Malabar for preference. Pre-ground pepper loses 60 % of its aroma within an hour.",
                "A heavy pan or a wok. A thin stainless pan kills the cream.",
              ],
            },
          },
        ],
      },
      {
        heading: {
          sk: "Cestoviny: tonnarelli sú jediný správny tvar",
          en: "The pasta: tonnarelli are the only correct shape",
        },
        paragraphs: {
          sk: [
            "Tonnarelli vyzerajú ako hrubé spaghetti so štvorcovým prierezom. Sú rímska klasika, držia omáčku po celej dĺžke. Vyrábajú sa s vajcom, hustejšie ako bežné suché cestoviny.",
            "Druhá najlepšia voľba: spaghettoni alebo bucatini. Spaghettoni majú priemer okolo 2,2 mm - ideálny pomer povrchu a hmoty. Bucatini majú dieru v strede, ktorá zachytí časť kremovej omáčky.",
            "Najhoršia voľba: spaghettini, capellini, vermicelli. Tenké tvary sa prevaria, lepia sa, omáčka po nich kĺže.",
            "Bronzové ťahanie (trafila al bronzo) je pri tomto recepte bonus, nie nevyhnutnosť. Hrubý drsný povrch lepšie chytá Pecorino, ale aj hladké priemyselné cestoviny fungujú, ak je technika správna.",
          ],
          en: [
            "Tonnarelli look like thick spaghetti with a square cross-section. They are the Roman classic and they hold the sauce along their whole length. They are made with egg, denser than ordinary dried pasta.",
            "Second best choice: spaghettoni or bucatini. Spaghettoni are around 2.2 mm across, an ideal ratio of surface to mass. Bucatini have a hole down the middle that traps some of the creamy sauce.",
            "Worst choice: spaghettini, capellini, vermicelli. Thin shapes overcook, stick together, and the sauce slides off them.",
            "A bronze die (trafila al bronzo) is a bonus in this recipe, not a requirement. The rough surface grips the Pecorino better, but smooth industrial pasta works too if your technique is right.",
          ],
        },
      },
      {
        image: { src: "/blog/pecorino.webp", alt: { sk: "Pecorino Romano DOP zrejúci syr", en: "Aged Pecorino Romano DOP" }, side: "left" },
        heading: {
          sk: "Pecorino Romano DOP: nie každý pecorino je rovnaký",
          en: "Pecorino Romano DOP: not every pecorino is the same",
        },
        paragraphs: {
          sk: [
            "Pecorino Romano je 100 % ovčie mlieko, soľný, zretý minimálne 5 mesiacov, vyrábaný iba v troch regiónoch - Lazio, Sardínia a provincia Grosseto. Označenie DOP je legálne chránené od roku 1996.",
            "Slano-pikantný profil je kľúčový. Mladší Pecorino Sardo je jemnejší a do cacio e pepe nepatrí - chýba mu soľný úder, ktorý nahrádza akúkoľvek soľ vo vode na cestoviny.",
            "Nikdy nepoužívaj predstrúhaný syr v sáčku. Anti-caking aditíva (celulóza, škrob) blokujú emulzifikáciu. Skutočný Pecorino Romano sa strúha čerstvo, čo najjemnejšie - mikroplaning alebo najjemnejšie strúhadlo.",
            "Pomer pre 100 g suchých cestovín: 70-80 g jemne nastrúhaného Pecorino. Áno, je to veľa. Práve to chce tento recept.",
          ],
          en: [
            "Pecorino Romano is 100 % sheep's milk, salty, aged at least 5 months, and made in only three areas - Lazio, Sardinia and the province of Grosseto. The DOP designation has been legally protected since 1996.",
            "The salty, sharp profile is the key. Young Pecorino Sardo is milder and has no place in cacio e pepe - it lacks the salt hit that replaces any salt in the pasta water.",
            "Never use pre-grated cheese from a bag. The anti-caking additives, cellulose and starch, block the emulsion. Real Pecorino Romano is grated fresh, as fine as you can manage, on a microplane or the finest side of the grater.",
            "The ratio for 100 g of dried pasta: 70 to 80 g of finely grated Pecorino. Yes, that is a lot. It is exactly what this recipe wants.",
          ],
        },
      },
      {
        heading: {
          sk: "Pepper: čerstvo drvený, jemne opraženy",
          en: "Pepper: freshly crushed, lightly toasted",
        },
        paragraphs: {
          sk: [
            "Korenie nie je len soľ na konci. V cacio e pepe je rovnocenná tretia ingrediencia, zodpovedná za teplo a aromatický spodok celého jedla.",
            "Krok, ktorý preskakuje 80 % domácich kuchárov: opraženie korenia. Celé zrná drví v hmoždiari (alebo cez mlynček na hrubo), potom dáš na suchú panvicu pri strednom plameni a po 60-90 sekundách začuješ aromu. Vtedy pridávaš ďalšie ingrediencie.",
            "Druhá vec - drvené, nie mleté. Mletie na prach uvoľní oleje rýchlo, ale pri kontakte s teplom horia. Hrubá drvina drží aromu dlhšie a poskytuje textúru pod zubom.",
            "Pomer pre 100 g cestovín: 2 vrchovaté lyžičky čerstvo drveného korenia. Znie to ako veľa. Nie je.",
          ],
          en: [
            "Pepper is not just salt at the end. In cacio e pepe it is an equal third ingredient, responsible for the heat and the aromatic base of the whole dish.",
            "The step 80 % of home cooks skip: toasting the pepper. Crush the whole peppercorns in a mortar, or grind them coarsely, then put them in a dry pan over medium heat and after 60 to 90 seconds you will smell the aroma. That is the moment to add everything else.",
            "The second thing: crushed, not ground fine. Grinding to powder releases the oils quickly, but they burn on contact with heat. A coarse crush holds the aroma longer and gives you texture under the tooth.",
            "The ratio for 100 g of pasta: 2 heaped teaspoons of freshly crushed pepper. It sounds like a lot. It is not.",
          ],
        },
      },
      {
        heading: {
          sk: "Recept krok po kroku - pre dve porcie",
          en: "The recipe step by step, for two portions",
        },
        paragraphs: {
          sk: [
            "Príprava: 200 g tonnarelli alebo spaghettoni, 150 g Pecorino Romano DOP jemne nastrúhaný, 4 lyžičky celého čierneho korenia, voda. Čas: 12-15 minút.",
          ],
          en: [
            "Mise en place: 200 g tonnarelli or spaghettoni, 150 g Pecorino Romano DOP finely grated, 4 teaspoons whole black peppercorns, water. Time: 12 to 15 minutes.",
          ],
        },
        lists: [
          {
            ordered: true,
            items: {
              sk: [
                "Vodu zovri v hrnci. Soli iba málo - Pecorino je veľmi slaný. Použi polovicu obvyklej dávky, alebo nesol vôbec, ak je tvoj syr veľmi solený.",
                "Korenie podrvi v hmoždiari nahrubo. Daj na suchú panvicu pri strednom plameni a 60 sekúnd opraž do aromy.",
                "K opraženému koreniu pridaj 100 ml vriacej vody z hrnca. Vznikne korenistý vývar. Stiahni z plameňa.",
                "Hoď cestoviny do vriacej vody. Var ich 2 minúty kratšie, než píše balík - necháš dovariť na panvici.",
                "Asi minútu pred koncom prelož cestoviny do panvice s koreňovou vodou. Pri strednom plameni miešaj 60-90 sekúnd, pridávaj škrobovú vodu z hrnca podľa potreby.",
                "Stiahni panvicu z plameňa. Počkaj 30 sekúnd, aby teplota klesla pod 80 °C - to je kľúčové, syr sa pri vyššej teplote zrazí na hrudky.",
                "Pridaj Pecorino postupne, intenzívne miešaj alebo otáčaj panvicou. Postupne pridávaj horúcu vodu po lyžiciach, kým nevznikne hladká krémová omáčka.",
                "Servíruj okamžite na predhriate taniere. Na vrchu posyp ešte trochou syra a čerstvo drveným korením.",
              ],
              en: [
                "Bring the water to the boil. Salt it only lightly - Pecorino is very salty. Use half your usual amount, or none at all if your cheese is heavily salted.",
                "Crush the pepper coarsely in a mortar. Put it in a dry pan over medium heat and toast it for 60 seconds, until it smells.",
                "Add 100 ml of boiling water from the pot to the toasted pepper. You get a peppery broth. Take it off the heat.",
                "Drop the pasta into the boiling water. Cook it 2 minutes less than the packet says, it finishes in the pan.",
                "About a minute before the end, move the pasta into the pan with the peppery water. Over medium heat keep it moving for 60 to 90 seconds, adding starchy water from the pot as needed.",
                "Take the pan off the heat. Wait 30 seconds for the temperature to drop below 80 °C. This is the crucial point, above that the cheese seizes into lumps.",
                "Add the Pecorino in stages, stirring hard or tossing the pan. Add hot water a spoonful at a time until the sauce is smooth and creamy.",
                "Serve immediately on warmed plates. Dust with a little more cheese and freshly crushed pepper.",
              ],
            },
          },
        ],
      },
      {
        heading: {
          sk: "Štyri najčastejšie chyby",
          en: "The four most common mistakes",
        },
        paragraphs: {
          sk: [
            "Cacio e pepe nezvládajú začiatočníci ani kuchári s desaťročnou praxou. Tu je, kde to ide dole vodou.",
          ],
          en: [
            "Cacio e pepe defeats beginners and cooks with ten years behind them alike. Here is where it goes under.",
          ],
        },
        lists: [
          {
            ordered: false,
            items: {
              sk: [
                "Príliš veľa soli vo vode na cestoviny. Pecorino dodá toľko slanosti, koľko stačí pre štyri jedlá.",
                "Vysoká teplota pri pridávaní syra. Nad 80 °C sa kazeínové bielkoviny zrazia a krém sa rozpadne na hrudky a olej.",
                "Predstrúhaný syr alebo parmezán namiesto Pecorino Romano. Iný profil mastnoty a soli, iné výsledky.",
                "Príliš málo škrobovej vody. Bez nej omáčka nedrží, syr sa rýchlo zatuhne a zlepí.",
              ],
              en: [
                "Too much salt in the pasta water. The Pecorino brings enough saltiness for four dishes.",
                "Too high a temperature when the cheese goes in. Above 80 °C the casein proteins coagulate and the cream breaks into lumps and oil.",
                "Pre-grated cheese, or parmesan instead of Pecorino Romano. A different fat and salt profile, a different result.",
                "Too little starchy water. Without it the sauce will not hold, and the cheese sets and clumps.",
              ],
            },
          },
        ],
      },
      {
        heading: {
          sk: "Časté otázky",
          en: "Frequently asked questions",
        },
        paragraphs: {
          sk: [],
          en: [],
        },
        faqs: [
          {
            q: {
              sk: "Môžem nahradiť Pecorino Romano parmezánom?",
              en: "Can I swap Pecorino Romano for parmesan?",
            },
            a: {
              sk: "Nie. Parmezán je z kravského mlieka, má iný profil mastnoty a menej soli. Výsledok bude jemnejší, sladkejší a nebude to cacio e pepe. Je to ako vymeniť ricottu za feta - oba sú syry, ale to je jediné, čo majú spoločné.",
              en: "No. Parmesan is cow's milk, with a different fat profile and less salt. The result will be milder and sweeter and it will not be cacio e pepe. It is like swapping ricotta for feta - both are cheese, and that is where the similarity ends.",
            },
          },
          {
            q: {
              sk: "Prečo sa mi syr robí na hrudky?",
              en: "Why does my cheese go lumpy?",
            },
            a: {
              sk: "Tri možné dôvody: panvica je príliš horúca (cez 80 °C), syr je nastrúhaný hrubo namiesto jemne, alebo je v sáčku s antikoagulátormi. Stiahni panvicu z plameňa pred pridaním syra a počkaj 30 sekúnd.",
              en: "Three possible reasons: the pan is too hot (over 80 °C), the cheese is grated coarsely instead of finely, or it came from a bag with anti-caking agents. Take the pan off the heat before adding the cheese and wait 30 seconds.",
            },
          },
          {
            q: {
              sk: "Koľko vody z cestovín mám nechať?",
              en: "How much pasta water should I keep?",
            },
            a: {
              sk: "Pre 200 g cestovín si nechaj aspoň 400 ml škrobovej vody pred scedením. Použiješ asi 200-250 ml, zvyšok je poistka. Bez škrobovej vody to neurobíš.",
              en: "For 200 g of pasta keep at least 400 ml of starchy water before draining. You will use 200 to 250 ml, the rest is insurance. You cannot do this without starchy water.",
            },
          },
          {
            q: {
              sk: "Aké korenie je najlepšie?",
              en: "Which pepper is best?",
            },
            a: {
              sk: "Tellicherry z Indie (Malabar je veľmi blízko). Veľké zrná, intenzívne ovocné a citrusové tóny, držia aromu po opražení. Vyhni sa mletému koreniu zo sáčku - do hodiny od mletia stratí väčšinu prchavých olejov.",
              en: "Tellicherry from India, with Malabar very close behind. Big grains, an intense fruity and citrus profile, and it keeps its aroma after toasting. Avoid ground pepper from a bag - within an hour of grinding it has lost most of its volatile oils.",
            },
          },
          {
            q: {
              sk: "Môžem cacio e pepe pripraviť dopredu?",
              en: "Can I make cacio e pepe in advance?",
            },
            a: {
              sk: "Nie. Emulzia drží 5-10 minút po dokončení. Ak musíš čakať, čakajú hostia, nie pasta. Pripravený Pecorino môžeš mať nastrúhaný hodinu vopred, korenie podrvené, ale zostavenie sa robí v poslednú chvíľu.",
              en: "No. The emulsion holds for 5 to 10 minutes after you finish it. If somebody has to wait, let it be the guests, not the pasta. You can grate the Pecorino an hour ahead and have the pepper crushed, but the assembly happens at the last moment.",
            },
          },
        ],
      },
      {
        heading: {
          sk: "Záver",
          en: "To finish",
        },
        paragraphs: {
          sk: [
            "Cacio e pepe je test. Tri ingrediencie, žiadne miesto na skrytie. Keď sa to podarí - a podarí sa to po dvoch-troch pokusoch, ak si stiahneš panvicu z plameňa a dáš syr po lyžiciach - máš jedlo, ktoré v Ríme stojí v reštaurácii 14 €.",
            "Ingrediencie zaobstaráš v Italiamo katalógu: Pecorino Romano DOP, a suché cestoviny od Grano Armando - [Spaghetto](/shop/grano-armando-spaghetto-500g), [Chitarra](/shop/grano-armando-chitarra-500g) alebo [Mezza Manica](/shop/grano-armando-mezza-manica-500g). Korenie kúp v špecializovanom obchode s ostrými surovinami - nie v supermarkete.",
            "Otvor sekciu Cestoviny a začni s 500 g balíkom tonnarelli alebo spaghettoni. Druhú porciu pripravíš ten istý týždeň, lebo prvá ťa pohltí.",
          ],
          en: [
            "Cacio e pepe is a test. Three ingredients, nowhere to hide. When it works, and it will after two or three attempts if you pull the pan off the heat and add the cheese by the spoonful, you have a dish that costs 14 EUR in a restaurant in Rome.",
            "You will find the ingredients in the Italiamo catalogue: Pecorino Romano DOP, and dried pasta from Grano Armando - [Spaghetto](/shop/grano-armando-spaghetto-500g), [Chitarra](/shop/grano-armando-chitarra-500g) or [Mezza Manica](/shop/grano-armando-mezza-manica-500g). Buy the pepper from a specialist spice shop, not the supermarket.",
            "Open the Pasta section and start with a 500 g bag of tonnarelli or spaghettoni. You will make the second portion the same week, because the first one gets you.",
          ],
        },
      },
    ],
  },
  {
    slug: "primitivo-di-manduria-vino-apulia",
    productSlugs: [
      "villa-motura-red-primitivo-manduria-075l",
      "villa-motura-red-primitivo-stillio-manduria-075l",
      "schola-sarmenti-critera-primitivo-rosso-igt-salento-135-075l",
      "primitivo-di-manduria-doc-magnum-magnum-tazka-flasa-heavy-bottle-1500ml-j",
    ],
    date: "2026-06-25",
    cover: "/blog/primitivo-di-manduria-cover-v2.webp",
    readMinutes: 8,
    title: {
      sk: "Primitivo di Manduria: prečo je toto víno z Apúlie také nárazové a komu sadne",
      en: "Primitivo di Manduria: why this Apulian wine hits so hard and who it suits",
    },
    excerpt: {
      sk: "Tmavé, husté, 14 % a viac. Primitivo di Manduria nie je víno na nesmelé usrkávanie. Tu je, odkiaľ pochádza, ako chutí a k čomu ho otvoriť, aby vynikol.",
      en: "Dark, dense, 14 % and up. Primitivo di Manduria is not a wine for timid sipping. Here is where it comes from, how it tastes, and what to open it with so it shows its best.",
    },
    description: {
      sk: "Sprievodca Primitivom di Manduria z Apúlie: pôvod odrody, rozdiel medzi DOP a bežným Primitivo, chuťový profil, párovanie s jedlom, servírovacia teplota a ako vybrať dobrú fľašu.",
      en: "A guide to Primitivo di Manduria from Apulia: the origin of the grape, the difference between DOP and ordinary Primitivo, the flavour profile, food pairing, serving temperature and how to pick a good bottle.",
    },
    keywords: [
      "primitivo di manduria",
      "talianske červené víno",
      "primitivo apúlia",
      "primitivo dop",
      "víno z puglie",
      "primitivo di manduria vino",
      "vino rosso puglia",
      "primitivo manduria dop",
      "salento vino",
    ],
    sections: [
      {
        heading: { sk: "", en: "" },
        paragraphs: {
          sk: [
            "Nalejete pohár a hneď to vidíte. Skoro nepriehľadná, tmavofialová farba, ktorá farbí stenu pohára. Pričuchnete - slivka, čerešňový lekvár, niečo ako sušené figy. Prvý dúšok je teplý, takmer sladkastý, a alkohol na etikete hovorí 14,5 %. Niekedy 15.",
            "Toto je Primitivo di Manduria. Víno z päty talianskej čižmy, ktoré posledných desať rokov ticho dobýva európske stoly. Nie je to víno na piatkové usrkávanie pred telkou - je to víno k jedlu, k mäsu, k zime.",
            "Poďme si povedať, odkiaľ sa vzalo, prečo je práve Manduria iné než hocijaké Primitivo a kedy ho otvoriť, aby nevynikla len jeho sila, ale aj jeho ovocie.",
          ],
          en: [
            "You pour a glass and you see it straight away. An almost opaque dark purple that stains the side of the glass. You smell it - plum, cherry jam, something like dried figs. The first sip is warm, almost sweet, and the label says 14.5 %. Sometimes 15.",
            "This is Primitivo di Manduria. A wine from the heel of the Italian boot that has quietly been taking over European tables for the last ten years. It is not a wine for Friday night sipping in front of the telly, it is a wine for food, for meat, for winter.",
            "Let us go through where it came from, why Manduria in particular differs from any old Primitivo, and when to open it so that you get not just its power but its fruit as well.",
          ],
        },
      },
      {
        image: { src: "/blog/primitivo-grapes-puglia.webp", alt: { sk: "Zrejúce hrozno v apúlskom vinohrade", en: "Ripening grapes in an Apulian vineyard" }, side: "right" },
        heading: {
          sk: "Čo je vlastne Primitivo",
          en: "What Primitivo actually is",
        },
        paragraphs: {
          sk: [
            "Primitivo je červená odroda, ktorá sa pestuje hlavne v Apúlii - regióne v podpätku Talianska. Meno pochádza z latinského primativus, čo znamená skorý, lebo dozrieva o niekoľko týždňov skôr než väčšina iných odrôd.",
            "Genetická zaujímavosť: Primitivo je tá istá odroda ako kalifornský Zinfandel a chorvátsky Tribidrag. Tri mená, jedna réva. V Apúlii však vďaka horúcemu slnku a starým kríkom dáva víno, ktoré v Kalifornii len ťažko napodobníš.",
            "Manduria je mestečko v provincii Taranto, v oblasti Salento. Práve podľa neho sa volá najznámejšia chránená verzia - Primitivo di Manduria DOP.",
          ],
          en: [
            "Primitivo is a red grape grown mainly in Apulia, the region in the heel of Italy. The name comes from the Latin primativus, meaning early, because it ripens a few weeks before most other varieties.",
            "A genetic curiosity: Primitivo is the same variety as Californian Zinfandel and Croatian Tribidrag. Three names, one vine. In Apulia, though, thanks to the fierce sun and the old bush vines, it gives a wine that is hard to imitate in California.",
            "Manduria is a small town in the province of Taranto, in the Salento area. The most famous protected version takes its name from it: Primitivo di Manduria DOP.",
          ],
        },
      },
      {
        heading: {
          sk: "Prečo je Manduria iná liga než bežné Primitivo",
          en: "Why Manduria is a different league from ordinary Primitivo",
        },
        paragraphs: {
          sk: [
            "V regáli nájdeš dva typy. Jedno hovorí len Primitivo Puglia IGT, druhé Primitivo di Manduria DOP. Tie tri písmená DOP nie sú marketing - znamenajú prísne pravidlá pôvodu, výnosov a minimálneho obsahu alkoholu (14 % pre DOP).",
            "Druhý rozdiel sú samotné kríky. V okolí Manduria stoja staré vinohrady pestované systémom alberello - réva rastie ako nízky krík bez drôtenky, každý ker sám za seba. Tieto staré kríky dávajú málo hrozna, ale veľmi koncentrovaného. To je dôvod hustoty v pohári.",
            "Existuje aj Primitivo di Manduria Riserva, ktoré zreje dlhšie (minimálne dva roky, z toho deväť mesiacov v dreve). To je vrcholová verzia - tmavšia, korenistejšia, s tónmi tabaku a kakaa.",
          ],
          en: [
            "On the shelf you will find two types. One says only Primitivo Puglia IGT, the other Primitivo di Manduria DOP. Those three letters DOP are not marketing, they mean strict rules on origin, yields and minimum alcohol (14 % for the DOP).",
            "The second difference is the vines themselves. Around Manduria there are old vineyards trained in the alberello system, where the vine grows as a low bush with no wires, each plant standing on its own. These old vines give little fruit, but very concentrated fruit. That is where the density in the glass comes from.",
            "There is also Primitivo di Manduria Riserva, which ages longer, at least two years with nine months of that in wood. This is the top version, darker, spicier, with notes of tobacco and cocoa.",
          ],
        },
      },
      {
        image: { src: "/blog/primitivo-bottles-barrel.webp", alt: { sk: "Fľaše talianskeho červeného vína na sude", en: "Bottles of Italian red wine on a barrel" }, side: "left" },
        heading: {
          sk: "Ako chutí",
          en: "How it tastes",
        },
        paragraphs: {
          sk: [
            "Profil je jednoznačný: tmavé ovocie. Slivka, čierna čerešňa, ostružina, k tomu sušené figy a hrozienka. Po druhom dúšku prídu korenie, sladké drevo, niekedy náznak čokolády alebo vanilky z dubového suda.",
            "Taníny sú mäkké a zaoblené, nie drsné ako pri mladom Cabernete. Kyselina je nízka, telo plné, dochuť dlhá a hrejivá. Práve tá kombinácia robí Primitivo prístupným aj pre ľudí, ktorí inak suché červené nemajú radi.",
            "Pozor na jednu vec: vďaka vysokému alkoholu a zvyškovému cukru pôsobí niekedy takmer sladko. Nie je to chyba, je to štýl. Ak hľadáš ostré, kyslé, minerálne víno, Primitivo to nie je.",
          ],
          en: [
            "The profile is unmistakable: dark fruit. Plum, black cherry, blackberry, then dried figs and raisins. After the second sip come spice and sweet wood, sometimes a hint of chocolate or vanilla from the oak barrel.",
            "The tannins are soft and rounded, not rough like a young Cabernet. The acidity is low, the body full, the finish long and warming. That combination is exactly what makes Primitivo approachable even for people who normally dislike dry reds.",
            "One thing to watch: because of the high alcohol and residual sugar it can taste almost sweet. That is not a fault, it is the style. If you are after a sharp, acidic, mineral wine, Primitivo is not it.",
          ],
        },
      },
      {
        heading: {
          sk: "K čomu ho otvoriť",
          en: "What to open it with",
        },
        paragraphs: {
          sk: [
            "Plné telo a mäkké taníny robia z Primitiva ideálneho partnera k výdatným jedlám. Krátky zoznam toho, čo funguje najlepšie:",
          ],
          en: [
            "The full body and soft tannins make Primitivo an ideal partner for substantial food. A short list of what works best:",
          ],
        },
        lists: [
          {
            ordered: false,
            items: {
              sk: [
                "Grilované a pečené mäso - hovädzie steaky, jahňacie, klobásy z grilu.",
                "Husté omáčky a ragù - tagliatelle al ragù, dusené mäso na červenom víne.",
                "Zrelé tvrdé syry - Pecorino, starší Caciocavallo, parmezán po 24 mesiacoch.",
                "Tmavá čokoláda nad 70 % - prekvapivo dobré spojenie k Riserve.",
                "Aj len tak - k zimnému večeru pri filme funguje samo, bez jedla.",
              ],
              en: [
                "Grilled and roast meat - beef steaks, lamb, sausages off the grill.",
                "Thick sauces and ragù - tagliatelle al ragù, meat braised in red wine.",
                "Aged hard cheeses - Pecorino, older Caciocavallo, parmesan past 24 months.",
                "Dark chocolate above 70 % - a surprisingly good match with the Riserva.",
                "Or on its own - on a winter evening in front of a film it holds up perfectly well with no food at all.",
              ],
            },
          },
        ],
      },
      {
        image: { src: "/blog/primitivo-pouring.webp", alt: { sk: "Nalievanie červeného vína do pohára", en: "Pouring red wine into a glass" }, side: "right" },
        heading: {
          sk: "Servírovanie: teplota rozhoduje",
          en: "Serving: temperature decides",
        },
        paragraphs: {
          sk: [
            "Najčastejšia chyba s Primitivom je príliš teplé podávanie. Pri izbovej teplote 22 °C vystúpi alkohol do popredia a víno pôsobí ťažko, takmer pálivo. Ideál je 16 až 18 °C - asi 30 minút v chladničke pred otvorením.",
            "Mladšie Primitivo nemusíš dekantovať. Riservu pokojne prelej do karafy aspoň 30 minút vopred - prevzdušnenie zjemní korenie a otvorí ovocie.",
            "Pohár voľ väčší, s priestorom na krúženie. Úzky pohár na biele víno tu zaškrtí aromu.",
          ],
          en: [
            "The most common mistake with Primitivo is serving it too warm. At a room temperature of 22 °C the alcohol steps forward and the wine feels heavy, almost burning. The ideal is 16 to 18 °C, roughly 30 minutes in the fridge before you open it.",
            "You do not need to decant a young Primitivo. Pour the Riserva into a carafe at least 30 minutes ahead, the aeration softens the spice and opens up the fruit.",
            "Choose a larger glass with room to swirl. A narrow white wine glass strangles the aroma here.",
          ],
        },
      },
      {
        heading: {
          sk: "Ako vybrať dobrú fľašu - a kde",
          en: "How to pick a good bottle, and where",
        },
        paragraphs: {
          sk: [
            "Tri veci na etikete: hľadaj nápis Primitivo di Manduria DOP (nie len Puglia IGT), pozri alkohol (kvalitné kúsky majú 14 % a viac) a ak chceš ten najhutnejší zážitok, voľ Riserva.",
            "V katalógu Italiamo nájdeš Primitivo v sekcii Víno medzi červenými vínami - vrátane fliaš od apúlskeho producenta Villa Mottura zo Salenta, teda priamo zo srdca oblasti: [Primitivo di Manduria](/shop/villa-motura-red-primitivo-manduria-075l), hutnejšie [Stillio](/shop/villa-motura-red-primitivo-stillio-manduria-075l) alebo [Schola Sarmenti Critera](/shop/schola-sarmenti-critera-primitivo-rosso-igt-salento-135-075l). Ide o priamy import, takže vieš, odkiaľ víno je a kto ho urobil.",
            "Ak váhaš medzi viacerými, začni s bežným Primitivom di Manduria DOP okolo 10 až 14 €. Keď ti sadne, posuň sa na Riservu. Pre väčšinu večerí je ale základná DOP verzia presne tým, čo treba.",
          ],
          en: [
            "Three things on the label: look for the words Primitivo di Manduria DOP (not just Puglia IGT), check the alcohol (good bottles are 14 % and above) and, if you want the densest experience, go for the Riserva.",
            "In the Italiamo catalogue you will find Primitivo in the Wine section among the reds, including bottles from the Apulian producer Villa Mottura in Salento, straight from the heart of the area: [Primitivo di Manduria](/shop/villa-motura-red-primitivo-manduria-075l), the denser [Stillio](/shop/villa-motura-red-primitivo-stillio-manduria-075l) or [Schola Sarmenti Critera](/shop/schola-sarmenti-critera-primitivo-rosso-igt-salento-135-075l). It is direct import, so you know where the wine is from and who made it.",
            "If you cannot decide between several, start with a standard Primitivo di Manduria DOP at around 10 to 14 EUR. Once it wins you over, move up to the Riserva. For most dinners, though, the basic DOP version is exactly what you need.",
          ],
        },
      },
      {
        heading: {
          sk: "Časté otázky",
          en: "Frequently asked questions",
        },
        paragraphs: { sk: [], en: [] },
        faqs: [
          {
            q: { sk: "Je Primitivo di Manduria sladké víno?", en: "Is Primitivo di Manduria a sweet wine?" },
            a: {
              sk: "Klasické Primitivo di Manduria DOP je suché, ale vďaka vysokému alkoholu a zrelému ovociu pôsobí jemne sladkasto. Existuje aj samostatná sladká verzia Primitivo di Manduria Dolce Naturale - tá je naozaj dezertná a na etikete to má napísané.",
              en: "The classic Primitivo di Manduria DOP is dry, but the high alcohol and ripe fruit make it seem gently sweet. There is also a separate sweet version, Primitivo di Manduria Dolce Naturale, which really is a dessert wine and says so on the label.",
            },
          },
          {
            q: { sk: "Aký je rozdiel medzi Primitivo a Zinfandel?", en: "What is the difference between Primitivo and Zinfandel?" },
            a: {
              sk: "Geneticky je to tá istá odroda. Rozdiel robí miesto a štýl: apúlske Primitivo býva plnšie, zrelšie a korenistejšie vďaka horúcemu slnku a starým kríkom, kým kalifornský Zinfandel býva ovocnejší a niekedy ešte vyšší v alkohole.",
              en: "Genetically it is the same variety. Place and style make the difference: Apulian Primitivo tends to be fuller, riper and spicier thanks to the fierce sun and old vines, while Californian Zinfandel is often fruitier and sometimes higher still in alcohol.",
            },
          },
          {
            q: { sk: "Ako dlho vydrží otvorená fľaša?", en: "How long does an opened bottle last?" },
            a: {
              sk: "Vďaka plnému telu a vyššiemu alkoholu vydrží Primitivo otvorené dva až tri dni, ak ho zazátkuješ a dáš do chladu. Riserva často chutí druhý deň dokonca lepšie, keď sa korenie usadí.",
              en: "Thanks to the full body and higher alcohol, an opened Primitivo holds for two to three days if you cork it and keep it cool. The Riserva often tastes even better on the second day, once the spice settles.",
            },
          },
        ],
      },
    ],
  },
  {
    slug: "pesto-genovese-pravy-test-ako-vybrat",
    productSlugs: [
      "delikatesna-originalna-natierka-pesto-genovese-pesto-s-bazalkou-190g",
      "monti-bazalkove-pesto-180g",
      "alce-nero-bio-bazalkove-pesto-130g",
      "pesto-genovese-190g-bazalkove",
    ],
    date: "2026-07-02",
    cover: "/blog/pesto-genovese-cover.webp",
    readMinutes: 8,
    title: {
      sk: "Pravé pesto Genovese: ako spoznať dobré a čomu sa v regáli vyhnúť",
      en: "Real pesto Genovese: how to spot the good stuff and what to avoid on the shelf",
    },
    excerpt: {
      sk: "Sedem ingrediencií, žiadna iná. Pravé pesto alla genovese je jednoduché - a práve preto sa dá tak ľahko pokaziť. Sprievodca etiketou, ktorý ti ušetrí sklamanie.",
      en: "Seven ingredients, nothing else. Real pesto alla genovese is simple, and that is exactly why it is so easy to ruin. A guide to the label that will save you the disappointment.",
    },
    description: {
      sk: "Ako vybrať pravé pesto alla genovese: sedem tradičných ingrediencií, čo znamená DOP bazalka, prečo je dôležitý olivový olej namiesto slnečnicového, rozdiel medzi chladeným a trvanlivým pestom a najčastejšie nástrahy v supermarkete.",
      en: "How to choose real pesto alla genovese: the seven traditional ingredients, what DOP basil means, why olive oil rather than sunflower oil matters, the difference between chilled and long-life pesto, and the usual traps in the supermarket.",
    },
    keywords: [
      "pesto genovese",
      "pravé pesto",
      "ako vybrať pesto",
      "pesto alla genovese",
      "bazalka dop",
      "pesto bez slnečnicového oleja",
      "pesto genovese ricetta",
      "vero pesto genovese",
      "basilico genovese dop",
    ],
    sections: [
      {
        heading: { sk: "", en: "" },
        paragraphs: {
          sk: [
            "Otoč pohárik pesta v supermarkete a prečítaj zloženie. Ak je na druhom alebo treťom mieste slnečnicový olej a kešu namiesto píniových orieškov, máš v rukách zelenú nátierku, ktorá s Janovom nemá veľa spoločného.",
            "Pravé pesto alla genovese je jeden z najjednoduchších receptov talianskej kuchyne. Sedem ingrediencií, žiadne varenie, žiadne prísady. A presne preto sa v ňom dá tak ľahko šetriť - každú drahú zložku sa dá vymeniť za lacnejšiu a väčšina ľudí to nepozná.",
            "Tento návod ťa naučí čítať etiketu za desať sekúnd a vybrať pohárik, ktorý chutí ako z Ligúrie, nie ako z fabriky.",
          ],
          en: [
            "Turn a jar of pesto around in the supermarket and read the ingredients. If sunflower oil is second or third on the list and cashews stand in for pine nuts, what you are holding is a green spread with very little to do with Genoa.",
            "Real pesto alla genovese is one of the simplest recipes in Italian cooking. Seven ingredients, no cooking, no additives. And that is exactly why it is so easy to cut corners on: every expensive component can be swapped for a cheaper one, and most people never notice.",
            "This guide will teach you to read the label in ten seconds and pick a jar that tastes like Liguria rather than a factory.",
          ],
        },
      },
      {
        image: { src: "/blog/pesto-ingredients.webp", alt: { sk: "Ingrediencie na pravé pesto - bazalka, cesnak, parmezán, píniové oriešky", en: "Ingredients for real pesto - basil, garlic, parmesan, pine nuts" }, side: "right" },
        heading: {
          sk: "Sedem ingrediencií - a ani jedna navyše",
          en: "Seven ingredients, and not one more",
        },
        paragraphs: {
          sk: [
            "Originálny recept Consorzio del Pesto Genovese pozná presne sedem zložiek. Žiadna ôsma tam nepatrí.",
          ],
          en: [
            "The original recipe from the Consorzio del Pesto Genovese has exactly seven components. There is no place for an eighth.",
          ],
        },
        lists: [
          {
            ordered: true,
            items: {
              sk: [
                "Bazalka Genovese DOP - mladé lístky, jemné, bez mätového nádychu.",
                "Extra panenský olivový olej - jemný ligúrsky, nie štipľavý.",
                "Píniové oriešky - ideálne stredomorské, nie čínske.",
                "Parmigiano Reggiano - zrelý, strúhaný.",
                "Pecorino - tvrdý ovčí syr pre slaný úder.",
                "Cesnak - málo, ale musí tam byť.",
                "Hrubá morská soľ - drví bazalku a chráni farbu.",
              ],
              en: [
                "Basilico Genovese DOP - young leaves, delicate, with no minty edge.",
                "Extra virgin olive oil - a gentle Ligurian one, not a pungent one.",
                "Pine nuts - Mediterranean for preference, not Chinese.",
                "Parmigiano Reggiano - aged, grated.",
                "Pecorino - hard sheep's cheese for the salty hit.",
                "Garlic - not much, but it has to be there.",
                "Coarse sea salt - it crushes the basil and protects the colour.",
              ],
            },
          },
        ],
      },
      {
        heading: {
          sk: "Bazalka DOP: prečo na nej záleží",
          en: "DOP basil: why it matters",
        },
        paragraphs: {
          sk: [
            "Bazalka Genovese DOP je chránená odroda z Ligúrie. Má malé jemné lístky a chýba jej mentolový tón, ktorý majú silnejšie bazalky z teplejších krajín. Práve preto pravé pesto chutí sviežo a nie gáfrovo.",
            "Na etikete hľadaj Basilico Genovese DOP. Ak je tam len bazalka bez pôvodu, ešte to nemusí byť zlé pesto, ale je to prvý signál, že výrobca šetril.",
            "Druhý signál je farba. Pravé pesto má sýtu, ale nie umelo žiarivú zelenú. Príliš jasná farba býva znakom pridaného farbiva alebo blanšírovanej bazalky.",
          ],
          en: [
            "Basilico Genovese DOP is a protected variety from Liguria. It has small delicate leaves and lacks the menthol note that stronger basils from hotter countries carry. That is precisely why real pesto tastes fresh rather than camphorous.",
            "On the label, look for Basilico Genovese DOP. If it says only basil with no origin, it is not necessarily a bad pesto, but it is the first sign the producer economised.",
            "The second sign is the colour. Real pesto is a deep green but not an artificially bright one. Too vivid a colour is often a sign of added colouring or blanched basil.",
          ],
        },
      },
      {
        image: { src: "/blog/pesto-mortar-grinding.webp", alt: { sk: "Príprava pesta v kamennom mažiari", en: "Making pesto in a stone mortar" }, side: "left" },
        heading: {
          sk: "Olej rozhoduje o cene aj chuti",
          en: "The oil decides both the price and the taste",
        },
        paragraphs: {
          sk: [
            "Toto je miesto, kde sa najviac šetrí. Pravé pesto má extra panenský olivový olej. Lacné verzie ho z veľkej časti nahrádzajú slnečnicovým alebo repkovým, lebo je niekoľkonásobne lacnejší.",
            "Skontroluj poradie v zložení. Ak je prvý olivový olej, dobre. Ak je prvý slnečnicový a olivový až kdesi vzadu, je to nátierka s vôňou pesta, nie pesto.",
            "Druhá častá náhrada sú orechy. Píniové oriešky sú drahé, tak ich výrobcovia menia za kešu alebo dokonca za prášok z kešu. Chuť je plochšia a chýba tá maslová jemnosť.",
          ],
          en: [
            "This is where most of the cost cutting happens. Real pesto uses extra virgin olive oil. Cheap versions replace most of it with sunflower or rapeseed oil, because that costs a fraction as much.",
            "Check the order in the ingredients list. If olive oil comes first, good. If sunflower comes first and olive oil is somewhere near the back, it is a spread that smells of pesto, not pesto.",
            "The second common substitution is the nuts. Pine nuts are expensive, so producers swap them for cashews or even cashew powder. The flavour is flatter and the buttery softness is missing.",
          ],
        },
      },
      {
        heading: {
          sk: "Chladené verzus trvanlivé pesto",
          en: "Chilled versus long-life pesto",
        },
        paragraphs: {
          sk: [
            "V obchode nájdeš dve kategórie. Chladené pesto z chladiaceho pultu má kratšiu trvanlivosť, býva bližšie k domácemu a obsahuje menej konzervačných trikov. Trvanlivé pesto v sklenenom pohári z regála vydrží mesiace, ale často je tepelne ošetrené, čo bazalke uberie sviežosť.",
            "Pravidlo palca: na rýchlu večeru bez plánovania zober kvalitné trvanlivé pesto z dobrého výrobcu. Keď chceš zážitok čo najbližšie Ligúrii, hľadaj chladené alebo také, ktoré sa pýši DOP bazalkou a olivovým olejom na prvom mieste.",
            "Ani jedno netreba variť. Pesto sa nepridáva na panvicu - zmieša sa s horúcimi cestovinami mimo ohňa, s lyžicou vody z varenia. Var zničí farbu aj aromu.",
          ],
          en: [
            "In the shop you will find two categories. Chilled pesto from the fridge counter has a shorter shelf life, tends to be closer to homemade and relies on fewer preservative tricks. Long-life pesto in a glass jar from the shelf keeps for months, but it is usually heat treated, which takes the freshness out of the basil.",
            "Rule of thumb: for a quick unplanned dinner, take a good long-life pesto from a serious producer. When you want the experience closest to Liguria, look for chilled, or for a jar that boasts DOP basil and olive oil at the top of the list.",
            "Neither one should be cooked. Pesto does not go into the pan. You stir it into hot pasta off the heat, with a spoonful of the cooking water. Cooking destroys both the colour and the aroma.",
          ],
        },
      },
      {
        image: { src: "/blog/pesto-jar-basil.webp", alt: { sk: "Pohár pesta s čerstvou bazalkou", en: "Jar of pesto with fresh basil" }, side: "right" },
        heading: {
          sk: "K čomu sa pesto hodí okrem cestovín",
          en: "What pesto goes with besides pasta",
        },
        paragraphs: {
          sk: [
            "Klasika je trofie alebo trenette al pesto, najlepšie s pár kúskami zemiakov a fazuľky priamo vo vode s cestovinami - tak sa to robí v Janove. Ale pesto vie oveľa viac.",
            "Lyžica do minestrone tesne pred podávaním. Tenká vrstva na pizza bianca. K pečenej rybe alebo kuraciemu prsia. Na bruschettu s paradajkou. Alebo len na čerstvý chlieb s plátkom mozzarelly.",
            "Pravidlo zostáva: pridávaj pesto až na konci, mimo tepla. Je to studená omáčka a tak sa s ňou treba správať.",
          ],
          en: [
            "The classic is trofie or trenette al pesto, best with a few pieces of potato and green beans cooked in the same water as the pasta, which is how they do it in Genoa. But pesto can do a great deal more.",
            "A spoonful into minestrone just before serving. A thin layer on a pizza bianca. With baked fish or chicken breast. On bruschetta with tomato. Or simply on fresh bread with a slice of mozzarella.",
            "The rule stands: add the pesto at the end, away from the heat. It is a cold sauce and it should be treated like one.",
          ],
        },
      },
      {
        heading: {
          sk: "Kde kúpiť pravé pesto",
          en: "Where to buy real pesto",
        },
        paragraphs: {
          sk: [
            "V katalógu Italiamo nájdeš talianske pesto vyberané tak, aby malo olivový olej a poctivé zloženie, nie slnečnicovú náhradu: [Pesto Genovese s bazalkou 190 g](/shop/delikatesna-originalna-natierka-pesto-genovese-pesto-s-bazalkou-190g), [Monti bazalkové pesto 180 g](/shop/monti-bazalkove-pesto-180g) alebo bio [Alce Nero bazalkové pesto 130 g](/shop/alce-nero-bio-bazalkove-pesto-130g). Ide o priamy import od talianskych výrobcov, takže zloženie zodpovedá tomu, čo by si čakal od pravého talianskeho pesta.",
            "Pri prvom nákupe sprav malý test. Kúp jeden kvalitný pohárik a jeden lacný zo supermarketu, ochutnaj oba na obyčajných cestovinách bez ničoho iného. Rozdiel v sviežosti a maslovosti budeš cítiť hneď.",
            "Keď nájdeš ten svoj, drž sa ho. Dobré pesto je jedna z mála vecí, kde sa pár eur navyše naozaj oplatí - používaš ho po lyžiciach, nie po litroch.",
          ],
          en: [
            "In the Italiamo catalogue you will find Italian pesto chosen so that it contains olive oil and an honest ingredient list rather than a sunflower substitute: [Pesto Genovese with basil 190 g](/shop/delikatesna-originalna-natierka-pesto-genovese-pesto-s-bazalkou-190g), [Monti basil pesto 180 g](/shop/monti-bazalkove-pesto-180g) or organic [Alce Nero basil pesto 130 g](/shop/alce-nero-bio-bazalkove-pesto-130g). It is direct import from Italian producers, so the ingredients match what you would expect from real Italian pesto.",
            "On your first purchase, run a small test. Buy one quality jar and one cheap supermarket one, and taste both on plain pasta with nothing else. You will feel the difference in freshness and softness immediately.",
            "Once you find your one, stick with it. Good pesto is one of the few things where a couple of euros more genuinely pays off, because you use it by the spoonful, not by the litre.",
          ],
        },
      },
      {
        heading: {
          sk: "Časté otázky",
          en: "Frequently asked questions",
        },
        paragraphs: { sk: [], en: [] },
        faqs: [
          {
            q: { sk: "Prečo moje pesto na cestovinách stmavne?", en: "Why does my pesto go dark on the pasta?" },
            a: {
              sk: "Bazalka oxiduje pri kontakte s teplom a vzduchom. Preto sa pesto nikdy nevarí - len sa zamieša s horúcimi cestovinami mimo ohňa a s lyžicou vody z varenia. Tmavne aj otvorený pohárik, ak naň nenaleješ tenkú vrstvu olivového oleja.",
              en: "Basil oxidises on contact with heat and air. That is why pesto is never cooked - you simply stir it into hot pasta off the heat with a spoonful of the cooking water. An opened jar darkens too, unless you pour a thin layer of olive oil over the top.",
            },
          },
          {
            q: { sk: "Je pesto bez píniových orieškov ešte pravé?", en: "Is pesto without pine nuts still authentic?" },
            a: {
              sk: "Originálny recept Consorzio počíta s píniovými orieškami. Verzie s kešu sú lacnejšie a stále jedlé, ale chuťovo sú plochšie a podľa tradičnej definície to už nie je pesto alla genovese. Ak ti záleží na pravosti, hľadaj píniové oriešky v zložení.",
              en: "The original Consorzio recipe calls for pine nuts. Cashew versions are cheaper and perfectly edible, but they taste flatter and by the traditional definition they are no longer pesto alla genovese. If authenticity matters to you, look for pine nuts in the ingredients.",
            },
          },
          {
            q: { sk: "Ako dlho vydrží otvorené pesto?", en: "How long does opened pesto keep?" },
            a: {
              sk: "Otvorený pohárik vydrží v chladničke päť až sedem dní, ak povrch zaleješ tenkou vrstvou olivového oleja, ktorá ho oddelí od vzduchu. Pesto sa dá aj zamraziť - ideálne v dávkach v nádobke na ľad.",
              en: "An opened jar keeps five to seven days in the fridge if you cover the surface with a thin layer of olive oil to seal it from the air. Pesto also freezes well, ideally in portions in an ice cube tray.",
            },
          },
        ],
      },
    ],
  },
  {
    slug: "caffe-diemme-padova-talianska-kava",
    productSlugs: [
      "caffe-diemme-blu-arabica-zrnkova-kava-200g-z-5-druhov-odrody-arabika",
      "caffe-diemme-oro-blend-arabica-100-500g-zrnkova",
      "caffe-diemme-chiapas-200g-mleta-pre-moka-100-kavova-zmes-arabica",
      "caffe-decaffeinato-250g",
    ],
    date: "2026-07-09",
    cover: "/blog/caffe-diemme-cover.webp",
    readMinutes: 8,
    title: {
      sk: "Caffè Diemme z Padovy: príbeh pražiarne, ktorá robí espresso od roku 1927",
      en: "Caffè Diemme from Padua: the story of a roastery making espresso since 1927",
    },
    excerpt: {
      sk: "Malá rodinná pražiareň z Padovy, ktorá nikdy nešla cestou supermarketových objemov. Prečo Diemme chutí inak a ako z neho doma dostaneš pravé talianske espresso.",
      en: "A small family roastery in Padua that never took the supermarket volume route. Why Diemme tastes different, and how to get a proper Italian espresso out of it at home.",
    },
    description: {
      sk: "Sprievodca kávou Caffè Diemme z Padovy: história rodinnej pražiarne od roku 1927, rozdiel medzi zrnkovou a mletou kávou, ako pripraviť espresso v moke aj v pákovom kávovare a ako kávu skladovať, aby vydržala čerstvá.",
      en: "A guide to Caffè Diemme from Padua: the history of the family roastery since 1927, the difference between whole bean and ground coffee, how to make espresso in a moka pot and in a machine, and how to store coffee so it stays fresh.",
    },
    keywords: [
      "caffè diemme",
      "talianska káva",
      "diemme padova",
      "zrnková káva taliansko",
      "espresso doma",
      "caffè diemme padova",
      "caffè italiano",
      "miscela espresso",
      "káva moka",
    ],
    sections: [
      {
        heading: { sk: "", en: "" },
        paragraphs: {
          sk: [
            "Väčšina kávy, ktorú kúpiš v supermarkete, pochádza z obrovských pražiarní, kde sa zrná pražia v tonách za hodinu a rýchlo, aby sa stihol objem. Výsledok je tmavá, horká káva, ktorá chutí všade rovnako.",
            "Caffè Diemme ide opačnou cestou. Malá rodinná pražiareň z Padovy praží pomaly, po menších dávkach, od roku 1927. Tri generácie jednej rodiny, jedno mesto na severe Talianska a tvrdohlavé odmietanie ísť do objemu na úkor chuti.",
            "Tento článok je o tom, prečo Diemme chutí inak, ako si vybrať medzi zrnkovou a mletou a ako z nej doma dostaneš espresso, ktoré stojí za to ráno vstávať.",
          ],
          en: [
            "Most of the coffee you buy in a supermarket comes from enormous roasteries where the beans are roasted by the tonne per hour, and fast, to keep up with the volume. The result is a dark, bitter coffee that tastes the same everywhere.",
            "Caffè Diemme goes the other way. A small family roastery in Padua has been roasting slowly, in smaller batches, since 1927. Three generations of one family, one city in northern Italy, and a stubborn refusal to chase volume at the expense of flavour.",
            "This article is about why Diemme tastes different, how to choose between whole bean and ground, and how to get an espresso at home that is worth getting up for.",
          ],
        },
      },
      {
        image: { src: "/blog/caffe-espresso-machine.webp", alt: { sk: "Espresso tečúce z pákového kávovaru", en: "Espresso running from the machine" }, side: "right" },
        heading: {
          sk: "Padova 1927: príbeh jednej pražiarne",
          en: "Padua 1927: the story of one roastery",
        },
        paragraphs: {
          sk: [
            "Diemme založil Romeo Dubbini v Padove, meste na severovýchode Talianska neďaleko Benátok. Meno Diemme vzniklo z iniciálok rodiny. Z malého obchodu sa za takmer sto rokov stala uznávaná pražiareň, no rodina ju riadi dodnes.",
            "Kľúčové slovo je pomalé praženie. Zatiaľ čo priemyselné pražiarne pražia zrná pár minút pri vysokej teplote, Diemme ide nižšie a dlhšie. Zrno tak prejde rovnomerne, nezhorkne na povrchu a rozvinie sladšie, plnšie tóny.",
            "Druhý detail je výber zŕn a miešanie. Diemme stavia zmesi (miscele) z arabiky a robusty v rôznych pomeroch pre rôzne chute - od jemných po výrazné espresso zmesi.",
          ],
          en: [
            "Diemme was founded by Romeo Dubbini in Padua, a city in the north-east of Italy near Venice. The name Diemme comes from the family initials. In almost a hundred years a small shop grew into a respected roastery, and the family still runs it today.",
            "The key phrase is slow roasting. Where industrial roasteries roast the beans for a few minutes at high temperature, Diemme goes lower and longer. The bean roasts evenly, does not scorch on the surface, and develops sweeter, fuller notes.",
            "The second detail is bean selection and blending. Diemme builds its blends (miscele) from arabica and robusta in different proportions for different tastes, from the delicate ones to the boldest espresso blends.",
          ],
        },
      },
      {
        heading: {
          sk: "Zrnková alebo mletá: čo si vybrať",
          en: "Whole bean or ground: which to choose",
        },
        paragraphs: {
          sk: [
            "Zrnková káva je vždy čerstvejšia. Mletím sa totiž obrovsky zväčší povrch a aróma začne unikať v priebehu minút. Ak máš doma mlynček, kupuj zrnkovú a meľ tesne pred prípravou - rozdiel je počuteľný už v prvom dúšku.",
            "Mletá káva má zmysel, ak mlynček nemáš alebo chceš rýchlosť ráno. Diemme ponúka mletú v rôznych hrubostiach - dôležité je vybrať správnu pre svoj spôsob prípravy.",
            "A je tu aj decaf - bezkofeínová verzia pre večer alebo pre tých, čo kofeín neznesú. Pri kvalitnej pražiarni decaf neznamená automaticky stratu chuti.",
          ],
          en: [
            "Whole bean coffee is always fresher. Grinding hugely increases the surface area and the aroma starts escaping within minutes. If you have a grinder at home, buy whole bean and grind just before brewing. You can hear the difference in the first sip.",
            "Ground coffee makes sense if you have no grinder or you want speed in the morning. Diemme offers ground coffee in several grinds, and the important thing is to pick the right one for your brewing method.",
            "There is decaf too, the caffeine free version for the evening or for people who cannot take caffeine. With a good roastery, decaf does not automatically mean losing the flavour.",
          ],
        },
      },
      {
        image: { src: "/blog/caffe-moka-stove.webp", alt: { sk: "Moka kanvica na sporáku", en: "Moka pot on the hob" }, side: "left" },
        heading: {
          sk: "Espresso v moke: najtalianskejší spôsob doma",
          en: "Espresso in a moka pot: the most Italian way at home",
        },
        paragraphs: {
          sk: [
            "Moka kanvica je v Taliansku v každej kuchyni. Nie je to síce pravé pákové espresso, ale dáva silnú, koncentrovanú kávu blízko k nemu - a takmer sa nedá pokaziť, keď dodržíš pár pravidiel.",
            "Naplň spodnú časť vodou po ventil, nie vyššie. Mletú kávu nasyp do sitka voľne, zarovnaj, ale nestláčaj - moka nemá rada utlačenú kávu. Daj na stredný plameň a stiahni ho, len čo začne káva bublať hore.",
            "Najčastejšia chyba je vysoký plameň a prepálená káva. Druhá chyba je nechať kanvicu na horúcej platni aj po dovarení - káva potom zhorkne. Hneď ako dotečie, daj kanvicu dole.",
          ],
          en: [
            "The moka pot is in every kitchen in Italy. It is not true machine espresso, but it gives a strong, concentrated coffee that comes close, and it is almost impossible to get wrong if you follow a few rules.",
            "Fill the bottom chamber with water up to the valve, no higher. Spoon the ground coffee loosely into the basket, level it off but do not press it down, because the moka does not like tamped coffee. Put it on medium heat and turn it down as soon as the coffee starts bubbling up.",
            "The most common mistake is a high flame and burnt coffee. The second is leaving the pot on the hot plate after it has finished, which turns the coffee bitter. As soon as it has come up, take the pot off.",
          ],
        },
      },
      {
        heading: {
          sk: "Espresso v pákovom kávovare",
          en: "Espresso in a machine",
        },
        paragraphs: {
          sk: [
            "Ak máš doma pákový kávovar, máš najbližšie k baru. Tu už záleží na detailoch: dávka, hrubosť mletia, utlačenie a čas extrakcie.",
          ],
          en: [
            "If you have an espresso machine at home, you are as close to the bar as you will get. Here the details matter: the dose, the grind, the tamp and the extraction time.",
          ],
        },
        lists: [
          {
            ordered: true,
            items: {
              sk: [
                "Dávka: 7 až 9 g na jedno espresso, 16 až 18 g na dvojité.",
                "Mletie: jemné, ale nie prachové - káva má tiecť, nie kvapkať.",
                "Utlačenie: rovnomerný tlak, hladký povrch.",
                "Extrakcia: 25 až 30 sekúnd na 25 až 30 ml. Kratšie býva kyslé, dlhšie horké.",
                "Šálka: predhriata, inak espresso vychladne za pár sekúnd.",
              ],
              en: [
                "Dose: 7 to 9 g for a single espresso, 16 to 18 g for a double.",
                "Grind: fine but not powdery - the coffee should flow, not drip.",
                "Tamp: even pressure, a smooth surface.",
                "Extraction: 25 to 30 seconds for 25 to 30 ml. Shorter tends to be sour, longer bitter.",
                "Cup: preheated, otherwise the espresso goes cold in seconds.",
              ],
            },
          },
        ],
      },
      {
        image: { src: "/blog/caffe-espresso-cup.webp", alt: { sk: "Šálka espressa s lyžičkou", en: "Cup of espresso with a spoon" }, side: "right" },
        heading: {
          sk: "Ako kávu skladovať, aby vydržala čerstvá",
          en: "How to store coffee so it stays fresh",
        },
        paragraphs: {
          sk: [
            "Káva má troch nepriateľov: vzduch, svetlo a vlhko. Otvorené balenie presyp do vzduchotesnej nepriehľadnej nádoby a drž ju v skrini, nie na linke pri okne.",
            "Chladnička nie je dobrý nápad - káva nasáva pachy a vlhkosť pri každom otvorení. Mrazák funguje len pri dlhodobom skladovaní neotvoreného balenia.",
            "A hlavne: nekupuj do zásoby na pol roka. Aj tá najlepšia káva z Padovy stratí po pár týždňoch od otvorenia svoje najjemnejšie tóny. Kupuj menšie balenia častejšie.",
          ],
          en: [
            "Coffee has three enemies: air, light and moisture. Tip an opened pack into an airtight opaque container and keep it in a cupboard, not on the worktop by the window.",
            "The fridge is not a good idea, because coffee absorbs smells and moisture every time you open it. The freezer only works for long term storage of an unopened pack.",
            "And above all: do not stock up for six months. Even the best coffee from Padua loses its finest notes a few weeks after opening. Buy smaller packs more often.",
          ],
        },
      },
      {
        heading: {
          sk: "Kde kúpiť Caffè Diemme",
          en: "Where to buy Caffè Diemme",
        },
        paragraphs: {
          sk: [
            "V katalógu Italiamo nájdeš Caffè Diemme v sekcii Káva: zrnkové [Blu Arabica 200 g](/shop/caffe-diemme-blu-arabica-zrnkova-kava-200g-z-5-druhov-odrody-arabika) a [Oro Blend 100 % Arabica 500 g](/shop/caffe-diemme-oro-blend-arabica-100-500g-zrnkova), mletú [Chiapas 200 g na moku](/shop/caffe-diemme-chiapas-200g-mleta-pre-moka-100-kavova-zmes-arabica) aj [bezkofeínovú 250 g](/shop/caffe-decaffeinato-250g). Ide o priamy import z Padovy, takže káva k tebe prichádza bez zbytočných medzičlánkov a s jasným pôvodom.",
            "Ak začínaš, vezmi zrnkovú espresso zmes a obyčajnú moku. Je to najlacnejší vstup do sveta poctivého talianskeho espresa doma a rozdiel oproti supermarketovej káve spoznáš hneď ráno.",
            "Keď ti zmes sadne, skús aj inú - Diemme ich má niekoľko a každá má svoj charakter. Tak nájdeš tú svoju.",
          ],
          en: [
            "In the Italiamo catalogue you will find Caffè Diemme in the Coffee section: whole bean [Blu Arabica 200 g](/shop/caffe-diemme-blu-arabica-zrnkova-kava-200g-z-5-druhov-odrody-arabika) and [Oro Blend 100 % Arabica 500 g](/shop/caffe-diemme-oro-blend-arabica-100-500g-zrnkova), ground [Chiapas 200 g for the moka pot](/shop/caffe-diemme-chiapas-200g-mleta-pre-moka-100-kavova-zmes-arabica), and [decaf 250 g](/shop/caffe-decaffeinato-250g). It is direct import from Padua, so the coffee reaches you without pointless middlemen and with a clear origin.",
            "If you are starting out, take a whole bean espresso blend and an ordinary moka pot. It is the cheapest way into proper Italian espresso at home, and you will notice the difference from supermarket coffee the very next morning.",
            "Once a blend wins you over, try another one. Diemme has several and each has its own character. That is how you find yours.",
          ],
        },
      },
      {
        heading: {
          sk: "Časté otázky",
          en: "Frequently asked questions",
        },
        paragraphs: { sk: [], en: [] },
        faqs: [
          {
            q: { sk: "Aký je rozdiel medzi arabikou a robustou v zmesi?", en: "What is the difference between arabica and robusta in a blend?" },
            a: {
              sk: "Arabika je jemnejšia, aromatickejšia a kyslejšia, robusta je silnejšia, horkejšia a dáva hustejšiu cremu a viac kofeínu. Talianske espresso zmesi často miešajú obe - arabika pre chuť, robusta pre telo a cremu. Pomer rozhoduje o charaktere kávy.",
              en: "Arabica is more delicate, more aromatic and more acidic; robusta is stronger, more bitter, and gives a thicker crema and more caffeine. Italian espresso blends often combine the two, arabica for the flavour and robusta for the body and crema. The proportion decides the character of the coffee.",
            },
          },
          {
            q: { sk: "Akú hrubosť mletia potrebujem do moky?", en: "What grind do I need for a moka pot?" },
            a: {
              sk: "Do moky patrí stredne jemné mletie - jemnejšie než na filter, ale hrubšie než na pákové espresso. Príliš jemná káva upchá sitko a zvýši tlak, príliš hrubá dá slabú, vodnatú kávu. Ak kupuješ mletú Diemme, vyber variant určený pre moku.",
              en: "A moka pot wants a medium fine grind, finer than for filter but coarser than for machine espresso. Too fine and it clogs the basket and raises the pressure, too coarse and you get weak, watery coffee. If you buy Diemme ready ground, choose the version marked for the moka.",
            },
          },
          {
            q: { sk: "Je bezkofeínová káva horšia v chuti?", en: "Does decaf taste worse?" },
            a: {
              sk: "Pri lacných kávach často áno, lebo proces odstránenia kofeínu zoberie aj časť arómy. Pri kvalitnej pražiarni ako Diemme je rozdiel oveľa menší - dobrý decaf ti dá plnú chuť espresa aj večer, bez kofeínu.",
              en: "With cheap coffees, often yes, because the decaffeination process takes some of the aroma with it. With a good roastery like Diemme the difference is far smaller - a good decaf gives you the full espresso flavour in the evening too, without the caffeine.",
            },
          },
        ],
      },
    ],
  },
  {
    slug: "pesto-nikdy-nevarim-ligursky-recept-15-minut",
    productSlugs: [
      "pesto-genovese-190g-bazalkove",
      "extra-panensky-olivovy-olej-fratelli-mantova-equlibrato-500ml-v-skle",
      "antica-vigna-soave-antica-vigna-075l",
    ],
    date: "2026-10-01",
    cover: "/blog/penne-al-pesto.webp",
    readMinutes: 6,
    title: {
      sk: "Pesto nikdy nevarím. Takto robím ligúrske cestoviny, ktoré sú hotové za 15 minút",
      en: "I never cook pesto. This is how I make Ligurian pasta in 15 minutes",
    },
    excerpt: {
      sk: "Sedem surovín v pohári, hrniec vody a jeden trik so škrobovou vodou. Žiadna smotana, žiadna panvica.",
      en: "Seven ingredients in a jar, a pot of water and one starchy-water trick. No cream, no frying pan.",
    },
    description: {
      sk: "Pesto sa nikdy nevarí. Ukážem ti, ako spojiť cestoviny s pestom bez smotany a bez panvice, s trikom so škrobovou vodou a ligúrskou klasikou.",
      en: "Pesto is never cooked. Here is how to combine pasta and pesto with no cream and no frying pan, using the starchy water trick and the Ligurian classic.",
    },
    keywords: [
      "pesto genovese",
      "cestoviny s pestom",
      "pesto recept",
      "ligúrske cestoviny",
      "trofie pesto",
      "škrobová voda",
      "pesto zemiak fazuľka",
      "talianske cestoviny",
    ],
    sections: [
      {
        heading: { sk: "", en: "" },
        paragraphs: {
          sk: [
            "Pesto nepatrí na oheň. Keď ho hodíš na rozpálenú panvicu, bazalka zhnedne, olivový olej zhorkne a syr sa zrazí. Z vône letnej záhrady ostane tráva s cesnakom, a to je škoda, lebo dobré pesto sa o seba postará samo.",
            "Celý recept stojí na jednej veci: pesto sa spája s cestovinou mimo ohňa. Zvyšok je hrniec vody, pár minút a poriadne miešanie. Nepotrebuješ mažiar ani mramorovú dosku.",
          ],
          en: [
            "Pesto does not belong on the heat. Throw it into a hot pan and the basil turns brown, the olive oil goes bitter and the cheese splits. The scent of a summer garden becomes grass and garlic, which is a shame, because good pesto looks after itself.",
            "The whole recipe rests on one thing: pesto meets the pasta off the heat. The rest is a pot of water, a few minutes and some proper stirring. You need no mortar and no marble slab.",
          ],
        },
      },
      {
        image: { src: "/blog/pesto-jar-basil.webp", alt: { sk: "Pohár pesta Genovese s čerstvou bazalkou", en: "Jar of pesto Genovese with fresh basil" }, side: "right" },
        heading: {
          sk: "Čo je vlastne pravé pesto Genovese",
          en: "What real pesto Genovese actually is",
        },
        paragraphs: {
          sk: [
            "Pesto pochádza z Ligúrie, úzkeho pásu pobrežia okolo Janova. Názov je od talianskeho pestare, čiže rozdrviť. Pôvodne sa robilo v mramorovom mažiari drevenou paličkou a niektorí Ligúrčania tvrdia, že inak to ani pesto nie je.",
            "Pravý recept má sedem surovín: bazalku (ideálne drobnú Basilico Genovese DOP, nie veľkolistú z hypermarketu), extra panenský olivový olej, píniové oriešky, cesnak, hrubozrnnú soľ, Parmigiano Reggiano a Pecorino. Nič navyše. Smotana, maslo ani špenát na zvýraznenie farby tam nepatria.",
          ],
          en: [
            "Pesto comes from Liguria, the narrow strip of coast around Genoa. The name comes from the Italian pestare, to crush. It was originally made in a marble mortar with a wooden pestle, and some Ligurians will tell you it is not pesto otherwise.",
            "The real recipe has seven ingredients: basil (ideally the small-leaved Basilico Genovese DOP, not the big-leaved kind from a hypermarket), extra virgin olive oil, pine nuts, garlic, coarse salt, Parmigiano Reggiano and Pecorino. Nothing else. Cream, butter or spinach to boost the colour have no place in it.",
          ],
        },
      },
      {
        heading: { sk: "Suroviny pre dvoch", en: "Ingredients for two" },
        paragraphs: {
          sk: [
            "Pesto nemusíš robiť od nuly. Dobré pesto z pohára je dnes také, že rozdiel oproti domácemu spozná málokto, ak ho správne použiješ. Ja siahnem po [Alce Nero Pesto Genovese](/shop/pesto-genovese-190g-bazalkove), je bio, s bazalkou, Parmigiano a Pecorinom a zloženie je krátke.",
          ],
          en: [
            "You do not have to make pesto from scratch. A good jarred pesto today is good enough that few people can tell the difference from homemade, as long as you use it properly. I reach for [Alce Nero Pesto Genovese](/shop/pesto-genovese-190g-bazalkove), which is organic, made with basil, Parmigiano and Pecorino, and has a short ingredient list.",
          ],
        },
        lists: [
          {
            items: {
              sk: [
                "200 g cestovín (trofie, penne alebo linguine)",
                "polovica pohára pesta, asi 90 až 100 g",
                "hrsť čerstvo strúhaného Parmigiana navyše",
                "lyžica extra panenského olivového oleja na dokončenie",
                "hrubá soľ do vody",
                "1 malý zemiak a hrsť zelenej fazuľky (voliteľné, ligúrska klasika, viac nižšie)",
                "Čas: 15 minút. Porcie: 2.",
              ],
              en: [
                "200 g pasta (trofie, penne or linguine)",
                "half a jar of pesto, about 90 to 100 g",
                "a handful of freshly grated Parmigiano on top",
                "a spoonful of extra virgin olive oil to finish",
                "coarse salt for the water",
                "1 small potato and a handful of green beans (optional, the Ligurian classic, more below)",
                "Time: 15 minutes. Serves: 2.",
              ],
            },
          },
        ],
      },
      {
        image: { src: "/blog/trofie-al-pesto-miska.webp", alt: { sk: "Trofie s pestom Genovese v tanieri, s bazalkou a pohárom bieleho vína", en: "Trofie with pesto Genovese in a bowl, with basil and a glass of white wine" }, side: "left" },
        heading: { sk: "Akú cestovinu vybrať", en: "Which pasta to choose" },
        paragraphs: {
          sk: [
            "V Ligúrii sa pesto tradične podáva s trofie, krátkymi točenými cestovinami, ktoré držia omáčku vo svojich záhyboch. Dobre funguje aj trenette alebo linguine. Logika je jednoduchá: čím viac povrchu, tým viac pesta sa na cestovinu chytí.",
            "Keď trofie nezohnáš, zober ryhované rúrky, penne rigate alebo fusilli. Špagety môžu byť, ale pesto po nich skĺzava a polovica ho zostane na dne misy.",
            "Cestovinu var al dente, asi o minútu kratšie, než hovorí obal. Ešte sa bude miešať s pestom a dovarí sa sama.",
          ],
          en: [
            "In Liguria pesto is traditionally served with trofie, short twisted pasta that holds the sauce in its folds. Trenette or linguine also work well. The logic is simple: the more surface, the more pesto clings to the pasta.",
            "If you cannot find trofie, use ridged tubes, penne rigate or fusilli. Spaghetti is fine, but pesto slides off it and half of it ends up at the bottom of the bowl.",
            "Cook the pasta al dente, about a minute less than the packet says. It will still be tossed with the pesto and will finish cooking on its own.",
          ],
        },
      },
      {
        heading: { sk: "Postup krok za krokom", en: "Step by step" },
        paragraphs: { sk: [], en: [] },
        lists: [
          {
            ordered: true,
            items: {
              sk: [
                "Daj variť veľký hrniec vody a poriadne ju osoľ. Má chutiť ako more. Je to jediná soľ v celom recepte.",
                "Kým sa voda ohrieva, vlož pesto do veľkej misy, v ktorej budeš neskôr miešať. Pridaj hrsť Parmigiana a premiešaj.",
                "Cestovinu hoď do vriacej vody a var o minútu kratšie, než radí obal.",
                "Tesne pred scedením naber hrnček vody z varenia. Je to najdôležitejší krok, nevylievaj ju.",
                "Do misy s pestom prilej dve až tri lyžice horúcej škrobovej vody a rozmiešaj na hladký krém. Pesto sa má zriediť do konzistencie smotany.",
                "Scedenú cestovinu presuň do misy a miešaj 30 až 60 sekúnd. Ak treba, pridávaj vodu po lyžici, kým sa omáčka nezačne lesknúť a nezlepí sa na každom kúsku.",
                "Dokonči lyžicou [extra panenského olivového oleja](/shop/extra-panensky-olivovy-olej-fratelli-mantova-equlibrato-500ml-v-skle) a troškou Parmigiana. Ochutnaj a podávaj hneď. Pesto na tanieri nečaká.",
              ],
              en: [
                "Put a large pot of water on to boil and salt it well. It should taste like the sea. This is the only salt in the whole recipe.",
                "While the water heats, put the pesto into the large bowl you will toss in later. Add a handful of Parmigiano and mix.",
                "Drop the pasta into the boiling water and cook it a minute less than the packet says.",
                "Just before draining, scoop out a mug of the cooking water. It is the most important step, so do not pour it away.",
                "Add two to three spoonfuls of hot starchy water to the bowl of pesto and stir to a smooth cream. The pesto should loosen to the consistency of cream.",
                "Move the drained pasta into the bowl and toss for 30 to 60 seconds. If needed, add water a spoonful at a time until the sauce starts to shine and clings to every piece.",
                "Finish with a spoonful of [extra virgin olive oil](/shop/extra-panensky-olivovy-olej-fratelli-mantova-equlibrato-500ml-v-skle) and a little Parmigiano. Taste and serve at once. Pesto does not wait on the plate.",
              ],
            },
          },
        ],
      },
      {
        image: { src: "/blog/penne-al-pesto-pan.webp", alt: { sk: "Penne s pestom Genovese v miske", en: "Penne with pesto Genovese in a bowl" }, side: "right" },
        heading: { sk: "Ligúrsky bonus: zemiak a fazuľka", en: "Ligurian bonus: potato and green beans" },
        paragraphs: {
          sk: [
            "V Janove ti pesto s cestovinou takmer vždy prinesú aj s kúskami zemiaka a zelenej fazuľky v tanieri. Nie je to ozdoba, je to originál. Zemiak pustí do vody škrob, ktorý omáčku ešte viac zahustí, a fazuľka pridá chrumkavosť.",
            "Malý zemiak nakrájaj na kocky, fazuľku na kúsky a varte sa v tej istej vode ako cestovina. Zemiak daj do hrnca asi 5 minút pred cestovinou, fazuľku spolu s ňou. Všetko scedíš naraz a mieša sa s pestom rovnako. Skús to aspoň raz, späť sa ti už možno nebude chcieť.",
          ],
          en: [
            "In Genoa, pesto pasta almost always arrives with pieces of potato and green beans in the bowl. It is not a garnish, it is the original. The potato releases starch into the water, which thickens the sauce even more, and the beans add crunch.",
            "Dice a small potato, cut the beans into pieces and cook them in the same water as the pasta. Add the potato to the pot about 5 minutes before the pasta and the beans together with it. You drain everything at once and toss it with the pesto the same way. Try it at least once and you may not want to go back.",
          ],
        },
      },
      {
        image: { src: "/blog/wine-bottles-trio.webp", alt: { sk: "Fľaše bieleho vína na stole", en: "Bottles of white wine on a table" }, side: "left" },
        heading: { sk: "Čo k tomu nalejem do pohára", en: "What I pour with it" },
        paragraphs: {
          sk: [
            "Pesto je bylinkové, mastné a slané, takže potrebuje víno, ktoré ho prereže: suché, svieže biele s dostatkom kyseliny. V Ligúrii by to bolo Vermentino alebo Pigato. Mne k tomuto tanieru výborne sadne aj [Soave DOC od Antica Vigna](/shop/antica-vigna-soave-antica-vigna-075l), suché biele z odrody Garganega s čistým záverom.",
            "Ak máš radšej červené, vyber ľahké a chladené. Ťažké dubové víno by bazalku prevalcovalo.",
          ],
          en: [
            "Pesto is herbal, rich and salty, so it needs a wine that cuts through it: a dry, fresh white with enough acidity. In Liguria it would be Vermentino or Pigato. With this plate I also like [Soave DOC by Antica Vigna](/shop/antica-vigna-soave-antica-vigna-075l), a dry white from the Garganega grape with a clean finish.",
            "If you prefer red, choose a light, chilled one. A heavy oaked wine would flatten the basil.",
          ],
        },
      },
      {
        heading: { sk: "Časté otázky", en: "Frequently asked questions" },
        paragraphs: { sk: [], en: [] },
        faqs: [
          {
            q: { sk: "Môžem pesto zohriať v mikrovlnke alebo na panvici?", en: "Can I heat pesto in the microwave or in a pan?" },
            a: {
              sk: "Nie. Teplo zničí bazalku aj olej. Pesto sa zohreje samo od horúcej cestoviny a vody z varenia, a to stačí.",
              en: "No. Heat destroys the basil and the oil. The pesto warms up on its own from the hot pasta and the cooking water, and that is enough.",
            },
          },
          {
            q: { sk: "Ako dlho vydrží otvorený pohár?", en: "How long does an open jar last?" },
            a: {
              sk: "V chladničke zhruba týždeň, ale riaď sa aj pokynmi na obale. Povrch vždy prikry tenkou vrstvou olivového oleja, aby nehnedol od vzduchu. Zvyšok môžeš rozdeliť do formičky na ľad, zamraziť a používať po lyžiciach.",
              en: "About a week in the fridge, but also follow the instructions on the label. Always cover the surface with a thin layer of olive oil so it does not brown from the air. You can divide the rest into an ice cube tray, freeze it and use it by the spoonful.",
            },
          },
          {
            q: { sk: "Prečo je omáčka mastná a nedrží pokope?", en: "Why is the sauce oily and does not hold together?" },
            a: {
              sk: "Chýba škrobová voda, alebo miešaš príliš krátko. Prilej dve až tri lyžice horúcej vody z varenia a miešaj energicky. Škrob spojí olej so syrom do krémovej emulzie.",
              en: "The starchy water is missing, or you are not tossing long enough. Add two to three spoonfuls of hot cooking water and toss vigorously. The starch binds the oil and cheese into a creamy emulsion.",
            },
          },
          {
            q: { sk: "Čo s pestom, ktoré mi zostalo?", en: "What do I do with leftover pesto?" },
            a: {
              sk: "Urob z neho cestovinový šalát s pestom a mozzarellou. Na druhý deň ide na stôl studený a hodí sa na gril aj do krabičky na výlet.",
              en: "Make a pasta salad with pesto and mozzarella. The next day it goes on the table cold and works for a barbecue or a packed lunch.",
            },
          },
        ],
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
