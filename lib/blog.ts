import type { Locale } from "@/lib/i18n/routing";

export type BlogList = {
  ordered?: boolean;
  items: Record<Locale, string[]>;
};

export type BlogFaq = {
  q: Record<Locale, string>;
  a: Record<Locale, string>;
};

export type BlogSection = {
  heading: Record<Locale, string>;
  paragraphs: Record<Locale, string[]>;
  lists?: BlogList[];
  faqs?: BlogFaq[];
};

export type BlogPost = {
  slug: string;
  date: string;
  cover: string;
  readMinutes: number;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  description: Record<Locale, string>;
  keywords: string[];
  sections: BlogSection[];
};

export const posts: BlogPost[] = [
  {
    slug: "prosecco-vs-champagne-cava",
    date: "2026-05-14",
    cover: "/blog/prosecco-vs-champagne-cava.png",
    readMinutes: 9,
    title: {
      sk: "Prosecco vs Champagne vs Cava: ktoré šumivé vybrať a kedy",
      it: "Prosecco, Champagne e Cava: quale spumante scegliere e quando",
    },
    excerpt: {
      sk: "Tri šumivé vína, tri krajiny, tri spôsoby výroby. Kedy siahnuť po Prosecco, kedy po Champagne a kedy stačí Cava — bez sommelier žargónu.",
      it: "Tre spumanti, tre paesi, tre metodi di produzione. Quando aprire un Prosecco, quando uno Champagne e quando basta una Cava — senza gergo da sommelier.",
    },
    description: {
      sk: "Praktický sprievodca rozdielmi medzi Prosecco, Champagne a Cava. Charmat vs metóda Champenoise, ceny, párovanie s jedlom, kategórie Brut a Extra Dry, a konkrétne odporúčania fliaš od Italiamo.",
      it: "Guida pratica alle differenze tra Prosecco, Champagne e Cava. Charmat contro metodo Champenoise, prezzi, abbinamenti, categorie Brut ed Extra Dry, e bottiglie consigliate dalla cantina Italiamo.",
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
        heading: { sk: "", it: "" },
        paragraphs: {
          sk: [
            "Otvoríš chladničku v piatok večer a vidíš tri fľaše. Prosecco za 7 €, Cava za 10 €, Champagne za 45 €. Bublinky vyzerajú rovnako. Tak prečo cenový rozdiel päťnásobný?",
            "Krátka odpoveď: spôsob výroby, región a marketing. V tomto poradí.",
            "Dlhá odpoveď je zaujímavejšia. Po prečítaní budeš vedieť, čo otvoriť na pizza večer s kamarátmi a čo schovať na svadbu sestry.",
          ],
          it: [
            "Apri il frigo venerdì sera e vedi tre bottiglie. Prosecco a 7 €, Cava a 10 €, Champagne a 45 €. Le bollicine sembrano identiche. Allora perché il prezzo è cinque volte più alto?",
            "Risposta breve: metodo di produzione, regione e marketing. In quest'ordine.",
            "La risposta lunga è più interessante. Dopo aver letto questo articolo saprai cosa aprire la sera della pizza con gli amici e cosa tenere da parte per il matrimonio di tua sorella.",
          ],
        },
      },
      {
        heading: {
          sk: "Tri vína, tri svety",
          it: "Tre vini, tre mondi",
        },
        paragraphs: {
          sk: [
            "Prosecco pochádza z Talianska, hlavne z regiónu Veneto a Friuli. Robí sa z odrody Glera, druhotná fermentácia prebieha v obrovských nerezových tankoch (Charmat metóda), typická fľaša stojí medzi 6 a 15 €. Profil chuti: ovocné, kvetinové, ľahké.",
            "Champagne pochádza výhradne z francúzskeho regiónu Champagne. Robí sa z troch odrôd — Chardonnay, Pinot Noir, Pinot Meunier. Druhotná fermentácia prebieha priamo vo fľaši (Méthode Champenoise), cena 30 až 80 €. Profil chuti: briošový, jablkový, suchá minerálnosť.",
            "Cava pochádza zo Španielska, prevažne z regiónu Penedès v Katalánsku. Robí sa z odrôd Macabeo, Xarel·lo a Parellada. Druhotná fermentácia vo fľaši (Método Tradicional), rovnako ako Champagne. Cena 8 až 20 €. Profil chuti: niekde medzi Prosecco a Champagne — citrusy a pečivo.",
            "Toto je kostra. Teraz mäso.",
          ],
          it: [
            "Il Prosecco viene dall'Italia, soprattutto da Veneto e Friuli. Si produce dall'uva Glera, la seconda fermentazione avviene in grandi autoclavi d'acciaio (metodo Charmat), e una bottiglia tipica costa tra 6 e 15 €. Profilo aromatico: fruttato, floreale, leggero.",
            "Lo Champagne arriva esclusivamente dalla regione francese della Champagne. Si fa con tre vitigni — Chardonnay, Pinot Noir, Pinot Meunier. La seconda fermentazione avviene direttamente in bottiglia (Méthode Champenoise), prezzo tra 30 e 80 €. Profilo: brioche, mela, mineralità asciutta.",
            "La Cava viene dalla Spagna, soprattutto dal Penedès in Catalogna. Si produce con Macabeo, Xarel·lo e Parellada. Seconda fermentazione in bottiglia (Método Tradicional), come lo Champagne. Prezzo tra 8 e 20 €. Profilo aromatico: una via di mezzo — agrumi e crosta di pane.",
            "Questa è l'ossatura. Adesso la polpa.",
          ],
        },
      },
      {
        heading: {
          sk: "Prečo Champagne stojí toľko, čo stojí",
          it: "Perché lo Champagne costa quello che costa",
        },
        paragraphs: {
          sk: [
            "Šampanské fermentuje druhýkrát priamo vo fľaši, v ktorej ho kúpiš. Kvasinky pri tom kvasení tlačia plyn do vína a po mesiacoch (často rokoch) ležania na droždí mu dávajú chuť pečenia, hrianky, suchých orechov. Tomu sa hovorí autolýza a je to dôvod, prečo Champagne chutí inak ako sódovka s vínom.",
            "Region Champagne je geograficky maličký. Okolo 34 000 hektárov vo Francúzsku, severovýchodne od Paríža. Kriedová pôda, chladná klíma, tri povolené odrody. Plus stoslovné regulácie. Plus rok-dva minimálneho zrenia pre non-vintage, päť rokov pre vintage. To všetko stojí peniaze, a tie peniaze sú vo fľaši.",
            "Champagne otvoríš keď chceš povedať toto je iné. Svadba, povýšenie, narodeniny po piatej dekáde. Suchosť ho robí univerzálnym k jedlu, ale ide najlepšie k slaným veciam — ustriciam, syru, sushi, smaženkám.",
          ],
          it: [
            "Lo Champagne fermenta una seconda volta direttamente nella bottiglia che acquisti. I lieviti spingono il gas nel vino e dopo mesi (spesso anni) di permanenza sui lieviti gli donano il sapore di crosta di pane, brioche, frutta secca. Si chiama autolisi, ed è il motivo per cui lo Champagne ha un gusto diverso da una semplice acqua frizzante con vino.",
            "La regione della Champagne è piccola dal punto di vista geografico. Circa 34.000 ettari in Francia, a nord-est di Parigi. Suolo calcareo, clima freddo, tre vitigni ammessi. Più cento pagine di regolamenti. Più uno o due anni minimi di affinamento per il non millesimato, cinque per il millesimato. Tutto questo costa, e quei costi sono nella bottiglia.",
            "Lo Champagne lo apri quando vuoi dire questa è una serata diversa. Matrimonio, promozione, compleanno dopo i cinquanta. La sua secchezza lo rende abbinabile a quasi tutto, ma dà il meglio con il salato — ostriche, formaggi stagionati, sushi, fritture.",
          ],
        },
      },
      {
        heading: {
          sk: "Prečo Prosecco letí",
          it: "Perché il Prosecco vola",
        },
        paragraphs: {
          sk: [
            "Prosecco fermentuje druhýkrát v obrovských nerezových tankoch, nie v jednotlivých fľašiach. Tomu sa hovorí Charmat metóda, vynašli ju v Taliansku v 19. storočí, a má jednu obrovskú výhodu: je rýchla a lacná. Žiadne roky zrenia. Žiadne ručné otáčanie fliaš.",
            "Výsledok? Víno, ktoré chráni primárne ovocné a kvetinové chute Gleray, hlavnej odrody. Nie pečivo, nie hrianka. Hruška, jablko, biele kvety, niekedy med.",
            "Na etikete stretneš tri hlavné kategórie. Prosecco DOC je najširší región a najväčšia produkcia — zhruba 90 % toho, čo vidíš v obchodoch. Prosecco DOCG Conegliano Valdobbiadene má užší region a prísnejšie pravidlá, stojí o 2 až 4 € viac, chutí výrazne lepšie. Prosecco DOCG Asolo je menší región, menej známy, často s najlepším pomerom kvalita ku cene v segmente DOCG.",
            "Prosecco otvoríš v piatok večer, k pizze, na terasu, do Aperol Spritzu. Nezhodnoť ho za to, že je lacnejší. Robí inú prácu.",
          ],
          it: [
            "Il Prosecco fermenta la seconda volta in grandi autoclavi d'acciaio, non nelle singole bottiglie. Si chiama metodo Charmat (o Martinotti), inventato in Italia nell'Ottocento, e ha un grosso vantaggio: è veloce ed economico. Nessun anno di affinamento. Nessuna rotazione manuale delle bottiglie.",
            "Il risultato? Un vino che protegge gli aromi primari floreali e fruttati della Glera, l'uva principale. Niente brioche, niente pane. Pera, mela, fiori bianchi, a volte miele.",
            "Sull'etichetta trovi tre categorie principali. Prosecco DOC copre la zona più ampia ed è la produzione più diffusa — circa il 90 % di quello che vedi negli scaffali. Prosecco DOCG Conegliano Valdobbiadene ha un'area più ristretta e regole più severe, costa 2-4 € in più e si sente nettamente la differenza. Prosecco DOCG Asolo è un territorio più piccolo, meno conosciuto, spesso il miglior rapporto qualità-prezzo nel segmento DOCG.",
            "Il Prosecco lo apri il venerdì sera, con la pizza, in terrazza, nel Aperol Spritz. Non lo giudicare perché costa meno. Fa un lavoro diverso.",
          ],
        },
      },
      {
        heading: {
          sk: "Cava: outsider, ktorý zaslúži viac pozornosti",
          it: "Cava: l'outsider che merita più attenzione",
        },
        paragraphs: {
          sk: [
            "Cava sa vyrába rovnakou metódou ako Champagne. Druhotná fermentácia vo fľaši, zrenie na droždí. Len v Španielsku, z iných odrôd, za zlomok ceny. To ju robí jednou z najlepších hodnôt v celej kategórii šumivých vín.",
            "Lacná Cava do 8 € je často priemerná. Tu sa neoplatí šetriť. Ale Cava v segmente 10 až 15 €? Často poráža Champagne za 30 € v slepej degustácii. Čítal som výsledky z viacerých blind tastingov, kde Cava Brut Nature od malých producentov dostávala vyššie body ako etablované značky šampanského.",
            "Cava ti dá tú istú briošovú, hriankovú chuť čo Champagne, len trochu menej elegantnú v druhej polovici dúšku. Pre 95 % situácií úplne stačí.",
          ],
          it: [
            "La Cava si produce con lo stesso metodo dello Champagne. Seconda fermentazione in bottiglia, affinamento sui lieviti. Solo che si fa in Spagna, con uve diverse, a una frazione del prezzo. Questo la rende uno dei migliori rapporti qualità-prezzo dell'intera categoria.",
            "La Cava economica sotto gli 8 € è spesso mediocre. Qui non conviene risparmiare. Ma una Cava nella fascia 10-15 €? Spesso batte uno Champagne da 30 € in degustazione alla cieca. Ho letto i risultati di vari blind tasting in cui Cava Brut Nature di piccoli produttori ha ricevuto punteggi più alti di marche affermate di Champagne.",
            "La Cava ti dà la stessa nota di brioche e crosta di pane dello Champagne, solo con un finale leggermente meno elegante. Per il 95 % delle occasioni basta e avanza.",
          ],
        },
      },
      {
        heading: {
          sk: "Kedy otvoriť čo (praktický návod)",
          it: "Quando aprire cosa (guida pratica)",
        },
        paragraphs: {
          sk: [
            "Piatok večer, pizza, kamaráti: Prosecco DOC, 7 až 9 €. Bedin Lucie Prosecco DOC alebo Canti Prosecco DOC sú spoľahlivá voľba z nášho katalógu.",
            "Aperol Spritz, letná terasa: Prosecco, akýkoľvek. Spritz to prekryje, neutopuj peniaze v drahšom víne.",
            "Rodinný obed s pečenou kačkou: Prosecco DOCG, Asolo alebo Valdobbiadene, 12 až 15 €. Bedin Versetto Asolo Prosecco DOCG Brut je presne tento prípad.",
            "Niečo elegantné, nezvyčajné, k syrom: Cava Brut Nature alebo Brut, 12 až 18 €. Clos Amador Cava Brut zo Španielska má charakter, ktorý ťa neurazí ani pri Roquefortovi.",
            "Svadba, výročie, raz za rok príležitosť: Champagne, ak na to máš. Ak nie, Cava Reserva alebo Prosecco DOCG vintage spravia 80 % roboty za 30 % ceny.",
            "Brunch s mimózami: lacné Prosecco. Pomarančový džús prekryje všetko. Šetri peniaze.",
          ],
          it: [
            "Venerdì sera, pizza, amici: Prosecco DOC, 7-9 €. Bedin Lucie Prosecco DOC o Canti Prosecco DOC dal nostro catalogo sono scelte sicure.",
            "Aperol Spritz, terrazza estiva: Prosecco, qualsiasi. Lo Spritz copre tutto, non sprecare soldi in bottiglie più costose.",
            "Pranzo in famiglia con anatra arrosto: Prosecco DOCG, Asolo o Valdobbiadene, 12-15 €. Bedin Versetto Asolo Prosecco DOCG Brut è esattamente questa occasione.",
            "Qualcosa di elegante, fuori dall'ordinario, con i formaggi: Cava Brut Nature o Brut, 12-18 €. Il Clos Amador Cava Brut spagnolo ha un carattere che regge anche un Roquefort.",
            "Matrimonio, anniversario, occasione una-volta-l'anno: Champagne, se te lo puoi permettere. Altrimenti Cava Reserva o Prosecco DOCG millesimato fanno l'80 % del lavoro al 30 % del prezzo.",
            "Brunch con mimosa: Prosecco economico. Il succo d'arancia copre tutto. Risparmia.",
          ],
        },
      },
      {
        heading: {
          sk: "Brut, dry, demi-sec — čo to znamená",
          it: "Brut, dry, demi-sec — cosa significano",
        },
        paragraphs: {
          sk: [
            "Zvyškový cukor sa udáva v gramoch na liter. Brut Nature alebo Pas Dosé má 0 až 3 g/l, suchý ako papier, hodí sa k ovocným koláčom v gastronomickom párovaní. Extra Brut má 0 až 6 g/l, suchý, gastronomický. Brut má 0 až 12 g/l a je to najpredávanejšia kategória, univerzálne suché.",
            "Potom prichádza historicky mätúca časť. Extra Dry má 12 až 17 g/l, čo je paradoxne sladšie ako Brut. Dry má 17 až 32 g/l a je polosladké. Demi-Sec má 32 až 50 g/l, dezertné. Doux má 50+ g/l a je sladké, k dezertom.",
            "Ak v živote nepamätáš nič iné: Brut je default. Extra Dry je sladšie ako Brut. Logika nedáva zmysel, viem.",
          ],
          it: [
            "Il residuo zuccherino si misura in grammi per litro. Brut Nature o Pas Dosé ha 0-3 g/l, secchissimo come carta, ottimo abbinato a torte alla frutta in chiave gastronomica. Extra Brut ha 0-6 g/l, secco, gastronomico. Brut ha 0-12 g/l ed è la categoria più venduta, universalmente secca.",
            "Poi arriva la parte storicamente confusa. Extra Dry ha 12-17 g/l, paradossalmente più dolce di Brut. Dry ha 17-32 g/l ed è semi-dolce. Demi-Sec ha 32-50 g/l, da dessert. Doux ha 50+ g/l, dolce, per i dolci.",
            "Se ti devi ricordare una sola cosa: Brut è il default. Extra Dry è più dolce di Brut. La logica non torna, lo so.",
          ],
        },
      },
      {
        heading: {
          sk: "Najčastejšie omyly",
          it: "Gli errori più comuni",
        },
        paragraphs: {
          sk: [
            "Drahšie sa nerovná lepšie. Nie vždy. Prosecco za 8 € k pizze poráža Champagne za 50 € k pizze. Šampanské sa tu stratí.",
            "Prosecco nie je vždy sladšie ako Champagne. Závisí to od konkrétnej fľaše. Brut Prosecco a Brut Champagne majú často podobný cukor.",
            "Champagne sa dlho skladuje, Prosecco nie. Toto platí. Prosecco pi do dvoch rokov od plnenia. Champagne kľudne vydrží 5 až 15 rokov, niektoré dlhšie.",
            "Šumivé vína sa pijú len pri oslave — to je najväčšia škoda. Brut Prosecco ide skvele k cestovinám s morskými plodmi, Cava k jamón, Champagne k vyprážanému kuraťu.",
          ],
          it: [
            "Più caro non è sempre meglio. Un Prosecco da 8 € con la pizza batte uno Champagne da 50 € con la pizza. Lo Champagne qui si perde.",
            "Il Prosecco non è sempre più dolce dello Champagne. Dipende dalla bottiglia. Un Brut Prosecco e un Brut Champagne hanno spesso zuccheri simili.",
            "Lo Champagne invecchia bene, il Prosecco no. Questo è vero. Il Prosecco va bevuto entro due anni dall'imbottigliamento. Lo Champagne regge tranquillamente 5-15 anni, alcuni anche di più.",
            "Gli spumanti si bevono solo per le occasioni speciali — è l'errore più grande. Un Brut Prosecco va benissimo con la pasta ai frutti di mare, la Cava con il jamón, lo Champagne con il pollo fritto.",
          ],
        },
      },
      {
        heading: {
          sk: "Ako podávať: tri veci, ktoré reálne fungujú",
          it: "Come servire: tre cose che funzionano davvero",
        },
        paragraphs: {
          sk: [
            "Teplota 6 až 8 °C. Príliš studené zabije chuť, príliš teplé urobí z vína penu.",
            "Štíhly tulipánový pohár. Klasické flûte koncentruje vône, ale šampaňáci dnes prešli na širší tulipán pre lepší rozvoj arómy. Klasický coupe, plytká miska, je pekný, ale rovno vyparuje bublinky.",
            "Otváraj tak, aby fľaša vzdychla, nie vystrelila. Drž korok, krúť fľašou. Akoby si chcel vypustiť dušu, nie ju vystreliť do stropu.",
          ],
          it: [
            "Temperatura 6-8 °C. Troppo freddo uccide il profumo, troppo caldo trasforma il vino in schiuma.",
            "Bicchiere tulipano snello. Il classico flûte concentra gli aromi, ma i produttori di Champagne oggi preferiscono un tulipano più largo per lasciare evolvere il bouquet. La coupe classica, piatta e larga, è bella ma fa evaporare le bollicine subito.",
            "Apri facendo sospirare la bottiglia, non sparare il tappo. Tieni il tappo fermo e ruota la bottiglia. Come se volessi liberare un respiro, non lanciarlo verso il soffitto.",
          ],
        },
      },
      {
        heading: {
          sk: "Časté otázky",
          it: "Domande frequenti",
        },
        paragraphs: {
          sk: [
            "Vydrží otvorené šumivé do druhého dňa? S dobrou zátkou v chladničke áno, 24 až 48 hodín. Bez zátky stratí bublinky behom hodín.",
            "Čo je vintage pri šumivom víne? Víno z jediného ročníka, napríklad 2018, zvyčajne kvalitnejšieho. Non-vintage je miešané z viacerých rokov pre konzistentnú chuť značky.",
            "Prečo niektoré Prosecco peni viac ako iné? Spumante má vyšší tlak, minimálne 3 bary. Frizzante má nižší tlak, 1 až 2,5 baru. Frizzante je jemnejší, hodí sa k jedlu.",
            "Aké šumivé pasuje k tortám a sladkým dezertom? Moscato d'Asti. Sladké, jemne perlivé, alkoholu len 5 až 7 %. Federico Ferrero Moscato d'Asti DOCG je klasický príklad.",
            "Ide otvorené Prosecco do varenia? Áno, do rizota, do omáčok na ryby alebo na drink Sgroppino — citrónový sorbet, Prosecco a vodka. Nezahadzuj.",
          ],
          it: [
            "Una bottiglia aperta dura fino al giorno dopo? Con un buon tappo in frigo sì, 24-48 ore. Senza tappo le bollicine se ne vanno in poche ore.",
            "Cosa significa millesimato? Vino di una sola annata, ad esempio 2018, di solito qualitativamente superiore. Il non millesimato è un blend di più annate per mantenere uno stile costante.",
            "Perché alcuni Prosecco fanno più schiuma di altri? Spumante ha pressione più alta, almeno 3 bar. Frizzante ne ha meno, 1-2,5 bar. Il frizzante è più delicato e si abbina bene al cibo.",
            "Quale spumante con torte e dolci? Moscato d'Asti. Dolce, leggermente frizzante, solo 5-7 % alcol. Federico Ferrero Moscato d'Asti DOCG è l'esempio classico.",
            "Si può cucinare con il Prosecco aperto? Sì, nei risotti, nelle salse per il pesce o per lo Sgroppino — sorbetto al limone, Prosecco e vodka. Non buttarlo.",
          ],
        },
      },
      {
        heading: {
          sk: "Čo si pamätať",
          it: "Cosa ricordare",
        },
        paragraphs: {
          sk: [
            "Tri vína, tri spôsoby výroby, tri rôzne príležitosti. Prosecco do bežného života. Cava keď chceš výsledok blízko Champagne za polovicu. Champagne keď ide o moment, na ktorý si budeš pamätať.",
            "A keď neviete čo, otvorte Prosecco. Nikdy nezklame a vždy je správny.",
          ],
          it: [
            "Tre vini, tre metodi, tre occasioni diverse. Prosecco per la vita di tutti i giorni. Cava quando vuoi un risultato vicino allo Champagne a metà prezzo. Champagne quando si tratta di un momento che vuoi ricordare.",
            "E quando non sai cosa scegliere, apri un Prosecco. Non delude mai ed è sempre la scelta giusta.",
          ],
        },
      },
    ],
  },
  {
    slug: "carbonara-pravy-recept-talianska",
    date: "2026-05-21",
    cover: "/blog/carbonara-pravy-recept-talianska.png",
    readMinutes: 8,
    title: {
      sk: "Pravá talianska Carbonara: recept od Rimana (a kde kúpiť guanciale)",
      it: "Carbonara romana autentica: la ricetta di un romano (e dove trovare il guanciale)",
    },
    excerpt: {
      sk: "Štyri ingrediencie, jedna technika, žiadna smotana. Ako sa robí pravá Carbonara doma a prečo 90 % receptov na internete je zle.",
      it: "Quattro ingredienti, una tecnica, zero panna. Come si fa la vera Carbonara a casa e perché il 90 % delle ricette online è sbagliato.",
    },
    description: {
      sk: "Originálny rímsky recept na Carbonaru s guanciale, Pecorino Romano DOP, vajcami a čiernym korením. Bez smotany, slaniny ani cibule. Krok za krokom, fotky postupu, najčastejšie chyby a kde na Slovensku kúpiť pravé suroviny.",
      it: "La ricetta romana autentica della Carbonara con guanciale, Pecorino Romano DOP, uova e pepe nero. Senza panna, pancetta o cipolla. Passo dopo passo, gli errori più comuni e dove trovare in Slovacchia gli ingredienti veri.",
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
        heading: { sk: "", it: "" },
        paragraphs: {
          sk: [
            "Carbonara má štyri ingrediencie: guanciale, vajcia, Pecorino Romano a čierne korenie. Bez smotany. Bez cibule. Bez cesnaku. Bez slaniny. Bez petržlenu.",
            "Toto nie je puristická poznámka, ale stredobod celého receptu. Smotana zamaskuje techniku, ktorá robí Carbonaru tým čím je. Slanina nahradí surovinu, ktorá dodáva polovicu chute. Cesnak prebije Pecorino.",
            "Pravá Carbonara stojí na premene vajíčka a syra v krémovú omáčku teplom z cestovín. Žiadna iná tekutina. Žiadny iný tuk okrem rozpusteného guanciale. Keď to spravíš správne, výsledok je nepoctivo dobrý.",
          ],
          it: [
            "La Carbonara ha quattro ingredienti: guanciale, uova, Pecorino Romano e pepe nero. Niente panna. Niente cipolla. Niente aglio. Niente pancetta. Niente prezzemolo.",
            "Non è purismo, è il centro stesso della ricetta. La panna copre la tecnica che rende la Carbonara quello che è. La pancetta sostituisce un ingrediente che fa metà del sapore. L'aglio copre il Pecorino.",
            "La Carbonara vera vive sulla trasformazione di uovo e formaggio in crema grazie al solo calore della pasta. Nessun altro liquido. Nessun altro grasso oltre a quello del guanciale. Quando ti riesce, il risultato è ingiustamente buono.",
          ],
        },
      },
      {
        heading: {
          sk: "Suroviny pre dve osoby",
          it: "Ingredienti per due persone",
        },
        paragraphs: {
          sk: [
            "Sušené špagety alebo rigatoni, 200 g. Najlepšie z tvrdej pšenice s bronzovou matricou (ťahané cez bronzové formy, drsný povrch lepšie drží omáčku). Grano Armando Spaghetto 500g z nášho katalógu robí presne túto prácu.",
            "Guanciale, 100 g. Sušená bravčová líca z Lazia. Slanina nie je adekvátna náhrada — má iný tuk, inú chuť, inú textúru. Ak nemáš guanciale, použi pancettu, nie slaninu. Slaninu pred touto omáčkou nikdy.",
            "Žĺtky, 4 kusy. Plus 1 celé vajce. Doma. Talianske recepty hovoria o 3-4 žĺtkoch a 1 celom vajci na 100 g cestovín pre osobu. Možno to znie veľa. Je to akurát.",
            "Pecorino Romano DOP, 60 g, čerstvo strúhaný. Nie Parmezán. Pecorino má slanší, intenzívnejší charakter a dáva Carbonare ten výrazný umami stred. Parmezán je príliš jemný a sladký na tento účel.",
            "Čierne korenie, čerstvo mleté, hojne. Najmenej pol čajovej lyžičky pre dve porcie.",
            "Soľ na vodu na cestoviny. Žiadny iný tuk. Žiadny olej.",
          ],
          it: [
            "Spaghetti o rigatoni secchi, 200 g. Meglio di grano duro trafilati al bronzo, perché la superficie ruvida trattiene meglio la salsa. Grano Armando Spaghetto 500g del nostro catalogo fa esattamente questo lavoro.",
            "Guanciale, 100 g. Guancia di maiale stagionata laziale. La pancetta non è equivalente, ma è meglio della pancetta affumicata. La pancetta affumicata in Carbonara mai.",
            "Tuorli, 4. Più un uovo intero. A temperatura ambiente. Le ricette romane parlano di 3-4 tuorli più 1 uovo intero per 100 g di pasta a persona. Sembra tanto. È giusto.",
            "Pecorino Romano DOP, 60 g, grattugiato al momento. Non Parmigiano. Il Pecorino è più sapido e dà alla Carbonara quel centro umami marcato. Il Parmigiano è troppo dolce per questa preparazione.",
            "Pepe nero macinato fresco, abbondante. Almeno mezzo cucchiaino per due porzioni.",
            "Sale per l'acqua della pasta. Nessun altro grasso. Niente olio.",
          ],
        },
      },
      {
        heading: {
          sk: "Postup krok za krokom",
          it: "Procedimento passo dopo passo",
        },
        paragraphs: {
          sk: [
            "Krok 1. Nakrájaj guanciale na pásiky približne 1 cm hrubé a 2 cm dlhé. Veľmi tenké pásiky sa spália skôr než pustia tuk. Príliš hrubé zostanú gumové.",
            "Krok 2. Postav vodu na cestoviny. Soľ vlož menej než zvyčajne — Pecorino aj guanciale sú slané a omáčka bude slaná aj bez výrazne osolenej vody.",
            "Krok 3. V miske rozšľahaj 4 žĺtky a 1 celé vajce. Pridaj Pecorino, hojne korenie. Premiešaj na hladkú pastu. Toto je tvoj základ omáčky.",
            "Krok 4. Na suchú studenú panvicu daj guanciale. Pustí svoj tuk pomaly pri strednom ohni. Smaž 4 až 6 minút, kým je zlatistý a chrumkavý na hranách, ale stále má v strede mäkký tuk. Odlož stranou. Tuk nechaj v panvici.",
            "Krok 5. Cestoviny var v slanej vode al dente, takmer 1 minútu menej než hovorí obal. Pred zliatím odlej pohár pasta wody. Nezabudni.",
            "Krok 6. Cestoviny preložiž do panvice s guanciale tukom. Premiešaj, panvica je mimo ohňa. Tu sa to láme, takže pozor.",
            "Krok 7. Pridaj vaječno-syrovú zmes a okamžite intenzívne miešaj. Ak je panvica príliš horúca, vajcia sa zrazia a budeš mať omeletu s cestovinami. Ak je príliš studená, omáčka bude redká. Cieľ: panvica taká teplá, aby ti vydržala chvíľu položená ruka.",
            "Krok 8. Postupne pridávaj pasta vodu, lyžicu po lyžici, kým omáčka nezískava krémovú, hladkú konzistenciu, ktorá obaľuje cestoviny. Bude to vyzerať príliš tekuté na prvý pohľad. Keď to skús pretrieť cestoviny lyžicou, omáčka zhustne.",
            "Krok 9. Pridaj guanciale späť, premiešaj. Posyp ešte Pecorinom a čerstvo mletým korením. Servíruj okamžite. Carbonara nepočká.",
          ],
          it: [
            "Passo 1. Taglia il guanciale a listarelle spesse circa 1 cm e lunghe 2 cm. Troppo sottile si brucia prima di rilasciare il grasso. Troppo spesso resta gommoso.",
            "Passo 2. Metti l'acqua per la pasta. Sala meno del solito — il Pecorino e il guanciale sono già salati e la salsa lo sarà comunque.",
            "Passo 3. In una ciotola sbatti 4 tuorli e 1 uovo intero. Aggiungi il Pecorino e il pepe in abbondanza. Mescola fino a una pasta liscia. Questa è la base della salsa.",
            "Passo 4. Metti il guanciale in una padella fredda asciutta. Rilascia il grasso lentamente a fuoco medio. Cuoci 4-6 minuti, finché è dorato e croccante sui bordi ma con grasso ancora morbido al centro. Mettilo da parte. Lascia il grasso nella padella.",
            "Passo 5. Cuoci la pasta in acqua salata al dente, quasi un minuto in meno di quanto dice la confezione. Prima di scolare conserva un mestolo di acqua di cottura. Importante.",
            "Passo 6. Sposta la pasta nella padella con il grasso del guanciale. Mescola, padella fuori dal fuoco. Qui si decide tutto, attenzione.",
            "Passo 7. Aggiungi il composto di uova e formaggio e mescola subito energicamente. Se la padella è troppo calda, le uova si rapprendono e diventa una frittata con la pasta. Se è troppo fredda, la salsa resta liquida. Obiettivo: la padella deve essere calda quanto basta perché tu possa tenerci la mano appoggiata per un attimo.",
            "Passo 8. Aggiungi l'acqua di cottura, un mestolino alla volta, finché la salsa diventa cremosa e avvolge la pasta. Sembrerà troppo liquida a vista. Quando passi un cucchiaio nella pasta, addensa.",
            "Passo 9. Rimetti il guanciale, mescola. Spolvera con altro Pecorino e pepe macinato fresco. Servi subito. La Carbonara non aspetta.",
          ],
        },
      },
      {
        heading: {
          sk: "Najčastejšie chyby",
          it: "Gli errori più comuni",
        },
        paragraphs: {
          sk: [
            "Pridanie smotany. Najväčší zločin. Smotana zriedi chuť, zakryje techniku a urobí omáčku ťažkú. Ak ti vychádza príliš suchá Carbonara, riešenie je viac pasta vody, nie smotana.",
            "Použitie slaniny namiesto guanciale. Slanina je údená, guanciale nie. Údená chuť úplne zmení charakter jedla.",
            "Panvica na ohni pri pridaní vajec. Vajcia sa zrazia. Nedá sa to opraviť. Začni odznova.",
            "Parmezán namiesto Pecorina. Príliš jemné, výsledok bez umami stredu.",
            "Príliš málo žĺtkov. Internet ti povie 1 vajce na osobu. Talian ti povie 2 žĺtky plus pol celého vajca na osobu. Talian má pravdu.",
            "Zabudol som odložiť pasta vodu. Klasika. Bez nej omáčku nikdy nedostaneš do správnej konzistencie. Nezabudni.",
          ],
          it: [
            "Aggiungere panna. Il crimine maggiore. La panna diluisce il sapore, copre la tecnica e appesantisce la salsa. Se la Carbonara viene troppo asciutta, la soluzione è più acqua di cottura, non panna.",
            "Usare pancetta al posto del guanciale. La pancetta affumicata cambia completamente il carattere del piatto.",
            "Padella sul fuoco quando aggiungi le uova. Si rapprendono. Non si recupera. Ricominciare.",
            "Parmigiano al posto del Pecorino. Troppo dolce, risultato senza centro umami.",
            "Pochi tuorli. Internet ti dice 1 uovo a persona. Un romano ti dice 2 tuorli più mezzo uovo intero a persona. Ha ragione il romano.",
            "Dimenticato di tenere l'acqua di cottura. Classico. Senza, la salsa non arriva mai alla consistenza giusta.",
          ],
        },
      },
      {
        heading: {
          sk: "Čo k tomu otvoriť",
          it: "Cosa aprire in abbinamento",
        },
        paragraphs: {
          sk: [
            "Carbonara je slaná, mastná, intenzívna. Potrebuje víno, ktoré ju očistí, nie ju zaťaží.",
            "Najlepšie pasuje suché biele s dobrou kyselinkou. Frascati Superiore, Verdicchio, Pecorino z Marche. Bublinky tiež fungujú: Brut Prosecco DOC alebo Cava režú slaný tuk a osviežia palato.",
            "Ak chceš červené, zvoľ niečo ľahké a šťavnaté, žiadne tanínové monštrum. Sangiovese z Toskánska v štýle Chianti Classico funguje.",
            "Z nášho katalógu Bedin Lucie Prosecco DOC je bezpečná voľba k Carbonare aj keď tradicionalisti budú nadávať.",
          ],
          it: [
            "La Carbonara è salata, grassa, intensa. Vuole un vino che ripulisca, non che pesi.",
            "Va meglio con un bianco secco di buona acidità. Frascati Superiore, Verdicchio, Pecorino delle Marche. Le bollicine funzionano: Brut Prosecco DOC o Cava tagliano il grasso e rinfrescano.",
            "Se vuoi rosso, scegli qualcosa di leggero e succoso, niente mostri tannici. Un Sangiovese toscano in stile Chianti Classico va benissimo.",
            "Dal nostro catalogo, il Bedin Lucie Prosecco DOC è una scelta sicura con la Carbonara — anche se i tradizionalisti storceranno il naso.",
          ],
        },
      },
      {
        heading: {
          sk: "Časté otázky",
          it: "Domande frequenti",
        },
        paragraphs: {
          sk: [
            "Môžem nahradiť guanciale niečím dostupnejším? Áno, ale s vedomím že to nebude Carbonara v pôvodnom zmysle. Pancetta je najbližšie, sušené farmárske bravčové bôčky tiež fungujú. Slanina nie.",
            "Pasterizované žĺtky sú bezpečné? Áno, ale stratíš trocha textúru. Hľadaj čerstvé vajcia od farmárov so známym pôvodom.",
            "Ako veľmi treba miešať? Stále. Od momentu, ako pridáš vajcia do panvice, mieš pol minúty bez prestávky.",
            "Prečo mi vyšla suchá? Buď málo pasta vody, alebo si miešal príliš krátko. Nabudúce pridaj postupne pol pohára pasta wody a miešaj dlhšie.",
            "Prečo mi vyšla ako omeleta? Panvica bola príliš horúca. Stiahni ju z ohňa skôr, prípadne počkaj 30 sekúnd než pridáš vajcia.",
          ],
          it: [
            "Posso sostituire il guanciale? Sì, ma non sarà più Carbonara nello stretto senso. La pancetta è la cosa più vicina, anche le pancette stagionate artigianali funzionano. La pancetta affumicata no.",
            "I tuorli pastorizzati sono sicuri? Sì, ma perdi un po' di consistenza. Cerca uova fresche di filiera controllata.",
            "Quanto si mescola? Sempre. Da quando aggiungi le uova, mescola almeno mezzo minuto senza fermarti.",
            "Perché mi è venuta asciutta? Poca acqua di cottura, o hai mescolato troppo poco. La prossima volta aggiungi gradualmente mezzo bicchiere d'acqua e mescola più a lungo.",
            "Perché mi è venuta una frittata? Padella troppo calda. Toglila dal fuoco prima, oppure aspetta 30 secondi prima di aggiungere le uova.",
          ],
        },
      },
      {
        heading: {
          sk: "Kde na Slovensku kúpiť suroviny",
          it: "Dove trovare gli ingredienti in Slovacchia",
        },
        paragraphs: {
          sk: [
            "Cestoviny: Grano Armando je dostupný v našom katalógu, špageti, rigatoni, spaghettoni — všetko z tvrdej pšenice bez pesticídov, bronzová matrica, pomalé sušenie. Talianska kvalita za rozumnú cenu.",
            "Guanciale: tu je to ťažšie. Italiamo aktuálne neimportuje guanciale (chladiarenský reťazec), ale pancetta sušená je dostupná u niektorých talianskych delikatesných predajcov v Bratislave a Košiciach. Ak ideš do Talianska, kúp jednu, drží v chladničke 3-4 týždne.",
            "Pecorino Romano DOP: hľadaj značku Brunelli alebo Locatelli. V našom katalógu je dostupný Pecorino zo Sardínie, je suchší a slanší, funguje výborne aj keď nie je Romano.",
            "Vajcia: farmárske, čo najčerstvejšie. Ideálne free-range so známym pôvodom.",
          ],
          it: [
            "Pasta: Grano Armando è disponibile nel nostro catalogo — spaghetti, rigatoni, spaghettoni, tutto da grano duro senza pesticidi, trafilatura al bronzo, essiccazione lenta. Qualità italiana a prezzo ragionevole.",
            "Guanciale: qui è più complicato. Italiamo non importa guanciale al momento (catena del freddo), ma pancetta stagionata si trova in alcune gastronomie italiane a Bratislava e Košice. Se vai in Italia, prendine uno, dura 3-4 settimane in frigo.",
            "Pecorino Romano DOP: cerca Brunelli o Locatelli. Nel nostro catalogo c'è Pecorino sardo, più asciutto e sapido, funziona benissimo anche se non è Romano.",
            "Uova: di fattoria, il più fresche possibile. Meglio se all'aperto con filiera tracciabile.",
          ],
        },
      },
      {
        heading: {
          sk: "Záver",
          it: "Per concludere",
        },
        paragraphs: {
          sk: [
            "Carbonara nie je ťažký recept. Štyri ingrediencie, dvadsať minút, žiadne komplikované techniky. Ale vyžaduje rešpekt k surovinám a presnú teplotu pri spojení vajec a cestovín.",
            "Keď ti vyjde prvýkrát, pochopíš prečo Talian na turistických videách s Carbonarou plnou smotany trpí. To, čo robíme my, je úplne iné jedlo. Buon appetito.",
          ],
          it: [
            "La Carbonara non è una ricetta difficile. Quattro ingredienti, venti minuti, nessuna tecnica complicata. Ma pretende rispetto per gli ingredienti e una temperatura precisa quando uova e pasta si incontrano.",
            "Quando ti viene bene la prima volta, capisci perché un romano soffre davanti ai video turistici di Carbonara con la panna. Quello che facciamo noi è proprio un altro piatto. Buon appetito.",
          ],
        },
      },
    ],
  },
  {
    slug: "balsamico-ocot-igp-modena-sprievodca",
    date: "2026-05-28",
    cover: "/blog/balsamico-ocot-igp-modena-sprievodca.png",
    readMinutes: 7,
    title: {
      sk: "Balsamico ocot: IGP, DOP a čo skutočne kupuješ v supermarkete",
      it: "Aceto balsamico: IGP, DOP e cosa stai davvero comprando al supermercato",
    },
    excerpt: {
      sk: "Tri písmená rozhodujú o tom, či máš v rukách remeselný produkt alebo karamelizovaný cukor s octom. Praktický sprievodca etiketou.",
      it: "Tre lettere decidono se stai comprando un prodotto artigianale o caramello con aceto. Guida pratica all'etichetta.",
    },
    description: {
      sk: "Rozdiel medzi Aceto Balsamico Tradizionale DOP, Aceto Balsamico di Modena IGP a tým, čo bežne stojí v regáli za 2 €. Ako čítať etiketu, čo znamenajú leaf labels a ktorý balsamico kúpiť na šalát, na grilované mäso a do redukcie.",
      it: "Differenza tra Aceto Balsamico Tradizionale DOP, Aceto Balsamico di Modena IGP e quello che trovi a 2 € sullo scaffale. Come leggere l'etichetta, cosa significano le foglioline e quale balsamico scegliere per insalata, carne grigliata o riduzione.",
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
        heading: { sk: "", it: "" },
        paragraphs: {
          sk: [
            "Stojíš v supermarkete pred regálom s octami. Jeden balsamico za 1,80 €. Druhý za 8 €. Tretí za 45 €. Ten najdrahší je v malej fľaštičke na 100 ml a má voskovú pečať.",
            "Všetky tri sa volajú balsamico. Všetky sú pravdepodobne legálne nazvané. A predsa každý z nich je úplne iný produkt s úplne inou výrobou.",
            "Tento článok ti za 10 minút povie, ako čítať etiketu, čomu sa vyhnúť, čo si oplatí kúpiť a ako jednoducho rozpoznať remeselný produkt od priemyselnej imitácie.",
          ],
          it: [
            "Sei al supermercato davanti allo scaffale degli aceti. Uno costa 1,80 €. Un altro 8 €. Un terzo 45 €. Il più caro è in una bottiglietta da 100 ml con sigillo di cera.",
            "Tutti e tre si chiamano balsamico. Tutti probabilmente lo sono legalmente. Eppure ognuno è un prodotto completamente diverso con una produzione completamente diversa.",
            "In 10 minuti questo articolo ti dirà come leggere l'etichetta, cosa evitare, cosa vale la pena comprare e come riconoscere subito un prodotto artigianale da un'imitazione industriale.",
          ],
        },
      },
      {
        heading: {
          sk: "Tri triedy, ktoré musíš poznať",
          it: "Le tre categorie da conoscere",
        },
        paragraphs: {
          sk: [
            "Aceto Balsamico Tradizionale di Modena DOP a Aceto Balsamico Tradizionale di Reggio Emilia DOP. Najvyššia trieda. Vyrába sa zo zhusteného hroznového muštu (mosto cotto), bez pridaného octu, zreje minimálne 12 rokov v drevených sudoch. Najmenšia povolená fľaštička je 100 ml. Cena 60 až 200 € za fľašu. Áno, naozaj.",
            "Aceto Balsamico di Modena IGP. Stredná trieda, regulovaná Európskou úniou. Robí sa z hroznového muštu plus vínny ocot, môže obsahovať karamel ako farbivo. Minimálne 60 dní zrenia. Tu je obrovský rozsah kvality — od priemerných po výborné. Cena 5 až 25 € za bežnú fľašu.",
            "Condimento Balsamico alebo Salsa Balsamica. Bez chráneného označenia. Tu môže byť čokoľvek: zmes vínneho octu, karamelu, ochuteného cukru. Pravidlá EU sú tu voľnejšie a producent ti môže ponúknuť v podstate čokoľvek pod menom balsamico.",
            "Pravidlo praktické: ak vidíš na etikete IGP alebo DOP, kupuj. Ak nie, čítaj zloženie veľmi pozorne.",
          ],
          it: [
            "Aceto Balsamico Tradizionale di Modena DOP e Aceto Balsamico Tradizionale di Reggio Emilia DOP. Categoria più alta. Si produce solo da mosto cotto, senza aggiunta di aceto, invecchia almeno 12 anni in botti di legno. La bottiglietta minima è 100 ml. Prezzo 60-200 € a bottiglia. Sì, davvero.",
            "Aceto Balsamico di Modena IGP. Categoria intermedia, regolata dall'Unione Europea. Si fa con mosto d'uva più aceto di vino, può contenere caramello come colorante. Almeno 60 giorni di affinamento. Qui la qualità varia enormemente, da mediocre a eccellente. Prezzo 5-25 € a bottiglia standard.",
            "Condimento Balsamico o Salsa Balsamica. Senza denominazione protetta. Qui può esserci di tutto: una miscela di aceto di vino, caramello, zucchero aromatizzato. Le regole UE sono più morbide e il produttore può vendere praticamente qualsiasi cosa con il nome balsamico.",
            "Regola pratica: se vedi IGP o DOP sull'etichetta, compra. Se no, leggi gli ingredienti con molta attenzione.",
          ],
        },
      },
      {
        heading: {
          sk: "Ako čítať etiketu Modena IGP",
          it: "Come leggere l'etichetta del Modena IGP",
        },
        paragraphs: {
          sk: [
            "Niektorí producenti používajú systém leaf labels (lístočkov) — neoficiálny ale praktický spôsob, ako rýchlo posúdiť kvalitu IGP balsamica.",
            "Jeden lístok znamená mladší ocot, vyšší podiel vínneho octu, jednoduchšia chuť, vhodné na bežné použitie a marinády.",
            "Dva lístky znamenajú strednú kvalitu, vyšší podiel zhusteného muštu, jemnejší profil, vhodné na šaláty a polosuché jedlá.",
            "Tri lístky znamenajú vyšší podiel muštu, dlhšie zrenie, hustšiu konzistenciu. Toto je už balsamico, ktoré si zaslúži samostatnú lyžičku nad kúskom Parmigiana.",
            "Štyri lístky a viac sú prémiové IGP, niekedy zrelé 10 a viac rokov. Cena 25-60 €. Hraničí s DOP kvalitou.",
            "Pozor: nie všetci producenti používajú lístky. Iné indikátory: nápis Invecchiato znamená zrelý (minimálne 3 roky), Extra Vecchio znamená veľmi zrelý (minimálne 12 rokov, takmer DOP kvalita).",
          ],
          it: [
            "Alcuni produttori usano il sistema delle foglioline (leaf labels) — un metodo non ufficiale ma pratico per valutare la qualità di un IGP.",
            "Una foglia indica un aceto giovane, alta percentuale di aceto di vino, profilo semplice, adatto a uso quotidiano e marinature.",
            "Due foglie sono qualità intermedia, percentuale di mosto più alta, profilo più morbido, adatto a insalate e piatti semi-asciutti.",
            "Tre foglie significano più mosto, affinamento più lungo, consistenza più densa. Questo è già un balsamico che merita un cucchiaino sopra un pezzo di Parmigiano.",
            "Quattro foglie o più sono IGP premium, a volte invecchiati 10 anni o più. Prezzo 25-60 €. Si avvicinano alla qualità DOP.",
            "Attenzione: non tutti i produttori usano le foglioline. Altre indicazioni: la dicitura Invecchiato significa stagionato (almeno 3 anni), Extra Vecchio molto stagionato (almeno 12 anni, qualità quasi DOP).",
          ],
        },
      },
      {
        heading: {
          sk: "Čo s ktorým balsamicom robiť",
          it: "Cosa fare con quale balsamico",
        },
        paragraphs: {
          sk: [
            "Mladé IGP (1-2 lístky), 5-10 €: marinády, dresingy, redukcie. Toto je tvoj denný balsamico. Pridaj do oleja s horčicou a medom na šalát, alebo redukuj na panvici s cukrom a maslom na omáčku ku grilovanému mäsu.",
            "Stredné IGP (3 lístky), 12-20 €: čerstvý paradajkový šalát s mozzarellou di bufala, parené špargle, restované huby. Tu už chceš ochutnať balsamico ako prísadu, nie len ako kyslé pozadie.",
            "Glassata alebo crema balsamica: hustý sirup z balsamica a cukru. Praktická pomôcka na dekoráciu — kvapnúť na tanier okolo jedla, na bruschettu, na grilovaný syr. Varvello Glassata IGP 250ml z nášho katalógu je solídna voľba.",
            "Prémiové IGP (4+ lístky) a DOP: čerstvý Parmigiano, jahody, vanilková zmrzlina, pečená hruška. Tu sa už pije lyžičkou. Nesmieš ho zahrievať, nesmieš ho miešať s ničím silným. Je to esencia.",
            "Pravidlo: čím lepší balsamico, tým menej s ním rob. Najlepší balsamico potrebuje len lyžičku a dobré suroviny vedľa neho.",
          ],
          it: [
            "IGP giovane (1-2 foglie), 5-10 €: marinature, condimenti, riduzioni. Questo è il tuo balsamico quotidiano. Mescolalo con olio, senape e miele per l'insalata, oppure riducilo in padella con zucchero e burro per una salsa da carne grigliata.",
            "IGP medio (3 foglie), 12-20 €: insalata di pomodori freschi con mozzarella di bufala, asparagi al vapore, funghi saltati. Qui vuoi sentire il balsamico come ingrediente, non solo come sfondo acido.",
            "Glassa o crema balsamica: sciroppo denso di balsamico e zucchero. Comodo per decorare — gocce intorno al piatto, sulla bruschetta, sul formaggio grigliato. La Varvello Glassata IGP 250ml del nostro catalogo è una buona scelta.",
            "IGP premium (4+ foglie) e DOP: Parmigiano fresco, fragole, gelato alla vaniglia, pera al forno. Qui si gusta col cucchiaino. Non si scalda, non si mescola con cose forti. È un'essenza.",
            "Regola: più alto è il livello del balsamico, meno ci fai. Il balsamico migliore vuole solo un cucchiaino e buoni ingredienti accanto.",
          ],
        },
      },
      {
        heading: {
          sk: "Najčastejšie omyly pri kúpe",
          it: "Errori più comuni in fase d'acquisto",
        },
        paragraphs: {
          sk: [
            "Nákup najdrahšieho na regáli automaticky. Cena nemusí korelovať s kvalitou. Niektoré 8 € fľaše sú lepšie než 18 € konkurenti.",
            "Nákup glassaty s vedomím, že je to balsamico. Glassata je redukcia balsamica s cukrom. Užitočná na dekoráciu, ale nie je to ten istý produkt.",
            "Nákup balsamica s prísadami ako limonová šťava, malina, trufla. Toto sú aromatizované octy, niekedy dobré, niekedy nie, ale nie tradičný balsamico.",
            "Skladovanie v slnku alebo v teplej skrini. Balsamico nemá rado svetlo a teplo. Skladuj v chladnej tmavej skrini.",
            "Domnievať sa, že drahší DOP je vždy lepšia voľba ako kvalitný IGP. Pre bežné použitie je IGP úplne dosť. DOP si nechaj na výnimočné jedlá, kde naozaj ochutnáš rozdiel.",
          ],
          it: [
            "Comprare automaticamente il più caro sullo scaffale. Il prezzo non sempre va con la qualità. Alcune bottiglie da 8 € sono migliori di concorrenti da 18 €.",
            "Comprare la glassa pensando che sia balsamico. La glassa è una riduzione di balsamico con zucchero. Utile per decorare, ma non è lo stesso prodotto.",
            "Comprare balsamici aromatizzati con limone, lampone, tartufo. Sono aceti aromatizzati, a volte buoni, a volte no, ma non sono balsamico tradizionale.",
            "Conservarlo al sole o in un mobile caldo. Il balsamico non ama luce e calore. Tienilo in un armadio fresco e buio.",
            "Pensare che un DOP costoso sia sempre meglio di un IGP di buona qualità. Per l'uso quotidiano un IGP basta. Tieni il DOP per le occasioni in cui senti davvero la differenza.",
          ],
        },
      },
      {
        heading: {
          sk: "Časté otázky",
          it: "Domande frequenti",
        },
        paragraphs: {
          sk: [
            "Ako dlho vydrží otvorený balsamico? IGP vydrží 2-3 roky v chladnej tmavej skrini. DOP prakticky neobmedzene, ak je dobre uzavretý.",
            "Treba dať balsamico do chladničky? Nie. Práve naopak — chladnička jeho chuť zhorší. Skladuj pri izbovej teplote.",
            "Môžem variť s drahým balsamicom? Môžeš, ale zbytočne. Vysoká teplota zničí jemné aroma. Pre varenie použi mladší IGP, drahší si nechaj surový.",
            "Aký je rozdiel medzi Modena a Reggio Emilia DOP? Reggio Emilia DOP používa systém kolorovaných etikiet (červená, strieborná, zlatá) podľa veku. Modena DOP používa Affinato (12+ rokov) a Extravecchio (25+ rokov). Obidve sú špičkové.",
            "Balsamico v rybacích jedlách? Áno, najmä na tučné ryby ako tuniak alebo losos. Pár kvapiek glassaty na grilovaného lososa s čiernym korením je výborná kombinácia.",
          ],
          it: [
            "Quanto dura un balsamico aperto? Un IGP dura 2-3 anni in armadio fresco e buio. Il DOP praticamente all'infinito, se ben chiuso.",
            "Va messo in frigo? No. Anzi, il frigo peggiora il sapore. Tienilo a temperatura ambiente.",
            "Posso cucinare con un balsamico costoso? Puoi, ma è uno spreco. Il calore alto distrugge gli aromi delicati. Per cucinare usa un IGP giovane, tieni il più costoso a crudo.",
            "Differenza tra Modena e Reggio Emilia DOP? Reggio Emilia DOP usa etichette colorate (rosso, argento, oro) per le età. Modena DOP usa Affinato (12+ anni) ed Extravecchio (25+ anni). Entrambi sono di vertice.",
            "Balsamico nei piatti di pesce? Sì, soprattutto su pesci grassi come tonno o salmone. Qualche goccia di glassa su un salmone grigliato col pepe nero è un abbinamento eccellente.",
          ],
        },
      },
      {
        heading: {
          sk: "Záver",
          it: "Conclusione",
        },
        paragraphs: {
          sk: [
            "Balsamico je jeden z najnepochopenejších produktov v talianskej kuchyni. Polovica fliaš v slovenských supermarketoch je len ochutený ocot, ale dobré IGP je dostupné a stojí za peniaze.",
            "Kúp si jeden mladý IGP na bežné použitie a jeden stredný (3 lístky) na čerstvé šaláty a paradajky. Toto pokryje 95 % situácií. Drahšie balsamico investuj len ak si naozaj fanúšik.",
            "Pre slovenský trh máme v katalógu Varvello Glassata IGP — solídnu zmes na bežné dekoračné použitie, kvalitnú a cenovo dostupnú.",
          ],
          it: [
            "Il balsamico è uno dei prodotti più fraintesi della cucina italiana. Metà delle bottiglie nei supermercati slovacchi è solo aceto aromatizzato, ma un buon IGP si trova e vale i soldi.",
            "Prendi un IGP giovane per uso quotidiano e uno medio (3 foglie) per insalate fresche e pomodori. Coprono il 95 % delle occasioni. Sui balsamici più costosi investi solo se sei un vero appassionato.",
            "Per il mercato slovacco, nel nostro catalogo trovi Varvello Glassata IGP — una glassa solida per decorazioni quotidiane, qualità e prezzo equilibrati.",
          ],
        },
      },
    ],
  },
  {
    slug: "olivovy-olej-apulia-pravy",
    date: "2026-06-04",
    cover: "/blog/olivovy-olej-apulia-pravy.png",
    readMinutes: 8,
    title: {
      sk: "Olivový olej z Apúlie: prečo je najlepší a ako spoznať pravý",
      it: "Olio d'oliva pugliese: perché è il migliore e come riconoscere quello vero",
    },
    excerpt: {
      sk: "Apúlia produkuje 40 % talianskeho olivového oleja. Toto je dôvod, prečo je olej z tohto regiónu unikátny — a ako rozlíšiť pravý extra panenský olej od priemyselnej zmesi.",
      it: "La Puglia produce il 40 % dell'olio d'oliva italiano. Ecco perché l'olio di questa regione è unico — e come distinguere un vero extravergine da un blend industriale.",
    },
    description: {
      sk: "Sprievodca olivovým olejom z Apúlie: odrody Coratina, Ogliarola, Peranzana, čo znamenajú výrazy extra vergine, DOP, IGP, ako čítať etiketu, ako spoznať čerstvý olej a ako ho správne skladovať.",
      it: "Guida all'olio d'oliva pugliese: cultivar Coratina, Ogliarola, Peranzana, cosa significa extravergine, DOP, IGP, come leggere l'etichetta, riconoscere un olio fresco e conservarlo correttamente.",
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
        heading: { sk: "", it: "" },
        paragraphs: {
          sk: [
            "Apúlia — Puglia v taliančine — je päta talianskeho čižmu. Plochá, kamenistá, dlhé pobrežie, 60 miliónov olivovníkov. Niektoré z nich majú viac ako 1500 rokov a stále plodia.",
            "Tento jeden región produkuje takmer 40 % všetkého talianskeho olivového oleja. To je viac, než celá Sicília, Kalábria a Kampania spolu.",
            "Apúlsky olej má charakter, ktorý sa nedá imitovať: silný, peprný, mierne horký, s tóninami čerstvo pokoseného trávnika a artičoku. Toto je dôvod, prečo seriózne talianské reštaurácie po celom svete idú práve sem nakupovať.",
          ],
          it: [
            "La Puglia è il tacco dello stivale. Pianeggiante, pietrosa, lunga costa, 60 milioni di olivi. Alcuni hanno più di 1500 anni e producono ancora.",
            "Questa singola regione fa quasi il 40 % dell'olio d'oliva italiano. Più di Sicilia, Calabria e Campania messe insieme.",
            "L'olio pugliese ha un carattere irripetibile: forte, piccante, leggermente amaro, con note di erba appena tagliata e carciofo. Per questo ristoranti italiani seri in tutto il mondo vengono qui a comprare.",
          ],
        },
      },
      {
        heading: {
          sk: "Hlavné apúlske odrody olív",
          it: "Le cultivar pugliesi principali",
        },
        paragraphs: {
          sk: [
            "Coratina. Najznámejšia, najsilnejšia, vysoký obsah polyfenolov. Charakteristická horká, peprná chuť, dlhé pikantné finále. Tento olej drahšie reštaurácie radi používajú na finálne kvapnutie na grilované mäso, polievky, fazuľu.",
            "Ogliarola Barese. Najproduktívnejšia, ovocnejšia, miernejšia. Stredná intenzita, mandľové tóny, hodí sa na šaláty, čerstvé paradajky, bruschettu. Najlepší univerzálny olej pre denné použitie.",
            "Peranzana. Region Daunia, severná Apúlia. Sviežia, jablková, jemne sladkastá. Skvelá k rybe, k mozzarelle, ku všetkému, kde nechceš dominantnú chuť oleja.",
            "Cellina di Nardò. Severný Salento. Vysoký výnos, jemné finále, často súčasť blendov v DOP olejoch.",
            "Producenti často miešajú tieto odrody do blendov, aby vybalansovali silu Coratiny so sviežosťou Ogliaroly. Najlepšie DOP a IGP oleje sú práve takéto vyvážené zmesi.",
          ],
          it: [
            "Coratina. La più conosciuta, la più forte, alto contenuto di polifenoli. Caratteristico amaro e piccante, lungo finale pepato. I ristoranti più curati la usano per finire carni grigliate, zuppe, legumi.",
            "Ogliarola Barese. La più produttiva, più fruttata, più morbida. Intensità media, note di mandorla, ideale per insalate, pomodori freschi, bruschetta. Il miglior olio universale per il quotidiano.",
            "Peranzana. Zona Daunia, nord della Puglia. Fresca, di mela, leggermente dolce. Eccellente con il pesce, con la mozzarella, dove non vuoi un olio dominante.",
            "Cellina di Nardò. Salento nord. Resa alta, finale delicato, spesso parte dei blend negli oli DOP.",
            "I produttori spesso mescolano queste cultivar per bilanciare la forza della Coratina con la freschezza dell'Ogliarola. I migliori DOP e IGP sono proprio blend equilibrati.",
          ],
        },
      },
      {
        heading: {
          sk: "Čo znamená Extra Vergine",
          it: "Cosa significa Extravergine",
        },
        paragraphs: {
          sk: [
            "Extra Vergine alebo extra panenský olej je najvyššia kvalitatívna trieda olivového oleja. Musí byť získaný čisto mechanickým lisovaním bez chemikálií, kyslosť pod 0,8 %, žiadne organoleptické chyby pri laboratórnej degustácii.",
            "Druhá trieda je Vergine — panenský. Rovnaký výrobný proces, kyslosť do 2 %, môže mať drobné chyby v chuti. V supermarketoch vidíš zriedka, predáva sa skôr na varenie.",
            "Tretia kategória je Olio di Oliva. Toto je zmes rafinovaného oleja (chemicky čisteného z chybných lisovaní) s malým podielom panenského. Lacný, neutrálny, vhodný akurát na vyprážanie. Žiadna chuť.",
            "Pozor na Pomace Oil alebo Olio di Sansa. Toto je olej extrahovaný z výliskov olív po hlavnom lisovaní pomocou chemických rozpúšťadiel. Najnižšia trieda, vyhni sa ak môžeš.",
          ],
          it: [
            "Extravergine è la categoria di qualità più alta. Deve essere ottenuto solo per estrazione meccanica senza solventi, acidità sotto lo 0,8 %, nessun difetto organolettico al panel test.",
            "Seconda categoria è Vergine. Stesso processo produttivo, acidità fino al 2 %, può presentare piccoli difetti. Nei supermercati si trova raramente, più spesso destinato alla cottura.",
            "Terza categoria è Olio di Oliva. Una miscela di olio raffinato (purificato chimicamente da olii difettosi) con piccola quota di vergine. Economico, neutro, adatto solo a fritture. Niente sapore.",
            "Attenzione al Pomace Oil o Olio di Sansa. È l'olio estratto dalle vinacce d'oliva con solventi chimici. La categoria più bassa, da evitare quando possibile.",
          ],
        },
      },
      {
        heading: {
          sk: "DOP, IGP a kde je rozdiel",
          it: "DOP, IGP e qual è la differenza",
        },
        paragraphs: {
          sk: [
            "DOP (Denominazione di Origine Protetta) je najvyššia geografická ochrana. Olivy musia byť pestované, zbierané a lisované v konkrétnej zóne. Apúlia má štyri DOP oleje: Terra di Bari, Dauno, Collina di Brindisi, Terre Tarentine.",
            "IGP (Indicazione Geografica Protetta) je voľnejšia. Olivy môžu pochádzať z viacerých zón regiónu, ale aspoň jedna fáza výroby musí prebehnúť v chránenej zóne. Olio Extravergine di Oliva IGP Puglia pokrýva celý región.",
            "Pre kupujúceho z praktického hľadiska: DOP olej je drahší (15-30 €/750 ml), ale máš istotu úzkeho pôvodu a väčšinou aj dohľadateľnosti až po mlyn. IGP olej je dostupnejší (8-18 €), kvalitne taký istý ale s voľnejším pôvodom.",
            "Olej bez DOP/IGP označenia môže byť výborný, ale chýba ti garancia pôvodu. Tu treba pozerať na producenta — meno mlyna, rok zberu, kontakty.",
          ],
          it: [
            "DOP (Denominazione di Origine Protetta) è la tutela geografica più alta. Le olive devono essere coltivate, raccolte e franate in una zona definita. La Puglia ha quattro DOP: Terra di Bari, Dauno, Collina di Brindisi, Terre Tarentine.",
            "IGP (Indicazione Geografica Protetta) è più ampia. Le olive possono venire da più zone della regione, ma almeno una fase produttiva deve avvenire nella zona protetta. L'IGP Puglia copre l'intera regione.",
            "Per chi compra, in pratica: un olio DOP costa di più (15-30 €/750 ml), ma hai la sicurezza di un'origine ristretta e spesso anche la tracciabilità fino al frantoio. L'IGP è più accessibile (8-18 €), qualità simile ma origine più ampia.",
            "Un olio senza DOP/IGP può essere ottimo, ma manca la garanzia di origine. Qui devi guardare il produttore — nome del frantoio, anno di raccolta, contatti.",
          ],
        },
      },
      {
        heading: {
          sk: "Ako čítať etiketu krok za krokom",
          it: "Come leggere l'etichetta passo passo",
        },
        paragraphs: {
          sk: [
            "Hľadaj rok zberu (raccolta). Olivový olej nie je víno, nezraje. Najlepší je do 18 mesiacov od lisovania. Ak na etikete nie je rok zberu, len dátum spotreby, často to znamená, že producent nechce odhaliť, ako starý je olej.",
            "Hľadaj odrody (cultivar). Konkrétne mená — Coratina, Ogliarola, Peranzana — sú znakom prémie. Ak je tam len monovarietale (jednoodrodový) alebo blend, vyžaduj viac informácií.",
            "Hľadaj producenta a adresu. Pravé apúlske oleje majú meno mlyna, adresu v Apúlii, často kontakt. Anonymné značky bez konkrétneho mlyna sú podozrivé.",
            "Pozri si farbu a balenie. Pravý extra panenský olej je v tmavej fľaši alebo plechovke, ktorá ho chráni pred svetlom. Číra fľaša je červená vlajka — výrobca šetrí na obale a olej oxiduje rýchlejšie.",
            "Nákupná značka extra vergine v hyper-rozmieste 1 l fľaše za 5 € je takmer určite zmes z viacerých krajín (Španielsko, Tunisko, Grécko, Taliansko). Etiketa to musí povinne uviesť malým písmom. Skontroluj zadnú časť.",
          ],
          it: [
            "Cerca l'anno di raccolta. L'olio non è vino, non invecchia. Il migliore è entro 18 mesi dalla franatura. Se sull'etichetta c'è solo la data di scadenza, spesso significa che il produttore non vuole rivelare quanto è vecchio l'olio.",
            "Cerca le cultivar. Nomi specifici — Coratina, Ogliarola, Peranzana — sono indizio di qualità. Se c'è solo monovarietale o blend, chiedi più informazioni.",
            "Cerca il produttore e l'indirizzo. Gli oli pugliesi veri hanno il nome del frantoio, l'indirizzo in Puglia, spesso un contatto. Le marche anonime senza frantoio specifico sono sospette.",
            "Guarda colore e packaging. Un vero extravergine sta in bottiglia scura o latta che protegge dalla luce. Una bottiglia trasparente è una bandiera rossa — il produttore risparmia sul packaging e l'olio si ossida prima.",
            "Una marca extravergine da supermercato in bottiglia da 1 litro a 5 € è quasi sicuramente un blend di più paesi (Spagna, Tunisia, Grecia, Italia). L'etichetta deve indicarlo obbligatoriamente in piccolo. Controlla il retro.",
          ],
        },
      },
      {
        heading: {
          sk: "Ako olej skladovať a používať",
          it: "Come conservare e usare l'olio",
        },
        paragraphs: {
          sk: [
            "Skladovanie: chladné, suché, tmavé miesto. Ideálne 14-18 °C. Nie v chladničke (olej tuhne) a nie pri sporáku (teplo a svetlo ho ničia).",
            "Po otvorení vydrží 3-6 mesiacov pri zachovaní plnej chute. Po 12 mesiacoch už síce stále dobrý, ale charakter sa vytráca.",
            "Na šaláty, čerstvé zeleninové prílohy, bruschettu, surové ryby, polievky — pridaj olej len pred servírovaním, surový. Tu sa olej oplatí.",
            "Na vyprážanie použi neutrálny olej (slnečnicový, repkový), nie panenský olivový. Vyprážanie zničí to, prečo si zaplatil za extra vergine.",
            "Na kratšie restovanie pri stredných teplotách (do 180 °C) môžeš použiť bežný extra vergine bez problému. Tu sa oplatí mladý mladší IGP, nie prémiový.",
          ],
          it: [
            "Conservazione: posto fresco, asciutto, buio. Idealmente 14-18 °C. Non in frigo (rapprende) e non vicino al forno (calore e luce lo rovinano).",
            "Una volta aperto dura 3-6 mesi a pieno sapore. Dopo 12 mesi è ancora buono, ma il carattere si attenua.",
            "Su insalate, verdure fresche, bruschetta, crudi di pesce, zuppe — aggiungilo crudo solo prima di servire. Qui l'olio buono vale i soldi.",
            "Per friggere usa un olio neutro (girasole, colza), non extravergine. La frittura distrugge tutto quello per cui hai pagato.",
            "Per saltare a media temperatura (fino a 180 °C) puoi usare un extravergine normale senza problemi. Qui un IGP giovane va benissimo, niente premium.",
          ],
        },
      },
      {
        heading: {
          sk: "Časté otázky",
          it: "Domande frequenti",
        },
        paragraphs: {
          sk: [
            "Prečo dobrý olej štípe v hrdle? To je polyfenolový obsah. Vyšší peprný charakter znamená vyšší obsah antioxidantov, čo je zdravotne pozitívne aj senzoricky charakteristické pre kvalitný olej.",
            "Môžem ochutnať olej samotný? Áno, je to štandardná profesionálna technika. Lyžička oleja, prevaľuj v ústach 10 sekúnd, vdýchni cez zuby, prehltni. Cítiš ovocný štart, horký stred, peprné finále. To je olej.",
            "Olej z prvého lisovania (prima spremitura) je zaručene kvalitný? Tento výraz dnes nemá legálny význam. Moderné lisy v jednej fáze. Hľadaj radšej extra vergine plus konkrétny mlyn.",
            "Filtrovaný alebo nefiltrovaný? Filtrovaný drží dlhšie a má čistejší vzhľad. Nefiltrovaný má bohatší charakter, ale rýchlejšie sa kazí. Pre bežné použitie filtrovaný, pre špeciálne degustácie nefiltrovaný do 6 mesiacov od zberu.",
            "Cena za dobrý kuchynský olej z Apúlie? 12-22 € za 750 ml. Pod 8 € si v miešaných produktoch, nad 30 € v špecialitnom segmente.",
          ],
          it: [
            "Perché un olio buono pizzica in gola? È il contenuto di polifenoli. Più piccante = più antiossidanti, positivo per la salute e tipico di un olio di qualità.",
            "Posso assaggiare l'olio da solo? Sì, è una tecnica professionale standard. Un cucchiaino, fai roteare in bocca 10 secondi, aspira aria tra i denti, deglutisci. Senti l'attacco fruttato, l'amaro centrale, il finale piccante. Quello è olio.",
            "Olio di prima spremitura è garanzia di qualità? Oggi questa dicitura non ha valore legale. I frantoi moderni lavorano in una fase sola. Cerca piuttosto extravergine più nome del frantoio.",
            "Filtrato o non filtrato? Il filtrato dura di più e ha aspetto più pulito. Il non filtrato è più ricco di carattere ma si rovina prima. Per uso quotidiano filtrato, per degustazioni speciali non filtrato entro 6 mesi dalla raccolta.",
            "Prezzo per un buon olio da cucina pugliese? 12-22 € per 750 ml. Sotto gli 8 € sei in prodotti blend, sopra i 30 € in segmento specialty.",
          ],
        },
      },
      {
        heading: {
          sk: "Záver",
          it: "Conclusione",
        },
        paragraphs: {
          sk: [
            "Apúlsky olivový olej je jedným z mála produktov, kde rozdiel medzi priemerom a kvalitou ochutnáš okamžite. Päť kvapiek pravého Coratina extra vergine na čerstvý paradajkový šalát urobí viac, než akýkoľvek dressing.",
            "Investícia 15 € do dobrej fľaše DOP alebo IGP oleja vystačí pri správnom použití (surový, na finále) na 2-3 mesiace. To je menej než dve kávy v meste denne.",
            "Italiamo má v katalógu zdroje z konkrétnych apúlskych mlynov — Rosso Gargano a iné značky priamo z regiónu, s dohľadateľnosťou až po olivovník. Otvor stránku Oleje a vyber si.",
          ],
          it: [
            "L'olio pugliese è uno dei pochi prodotti dove la differenza tra medio e qualità si sente subito. Cinque gocce di vera Coratina extravergine su un'insalata di pomodori freschi fanno più di qualsiasi condimento.",
            "Investire 15 € in una buona bottiglia DOP o IGP, usata bene (a crudo, in finitura), copre 2-3 mesi. Meno di due caffè al bar al giorno.",
            "Italiamo lavora con frantoi pugliesi specifici — Rosso Gargano e altre marche direttamente dalla regione, con tracciabilità fino all'olivo. Apri la pagina Oli e scegli.",
          ],
        },
      },
    ],
  },
  {
    slug: "cacio-e-pepe-recept-rim",
    date: "2026-06-11",
    cover: "/blog/cacio-e-pepe-recept-rim.png",
    readMinutes: 9,
    title: {
      sk: "Cacio e pepe: rímsky recept o troch ingredienciách, ktoré sa všetci boja",
      it: "Cacio e pepe: la ricetta romana con tre ingredienti che spaventano tutti",
    },
    excerpt: {
      sk: "Tri ingrediencie. Päť minút varenia. A pol Talianska sa háda, ako presne to robiť. Tu je verzia, ktorá vychádza aj doma — bez termometra a bez paniky pri škrobovej vode.",
      it: "Tre ingredienti. Cinque minuti di cottura. E mezza Italia litiga su come farlo. Ecco la versione che riesce anche a casa — senza termometro e senza panico con l'acqua di cottura.",
    },
    description: {
      sk: "Praktický návod ako uvariť cacio e pepe doma: výber cestovín, Pecorino Romano DOP, čierne korenie Tellicherry, technika kremovania bez maslových skratiek. Konkrétne pomery, časovanie, najčastejšie chyby.",
      it: "Guida pratica al cacio e pepe a casa: scelta della pasta, Pecorino Romano DOP, pepe Tellicherry, tecnica della cremina senza scorciatoie al burro. Dosi precise, tempi, errori comuni.",
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
        heading: { sk: "", it: "" },
        paragraphs: {
          sk: [
            "Tri veci na taniere. Cestoviny, ovčí syr, čierne korenie. Žiadny olej, žiadne maslo, žiadna smotana. Cestoviny stoja v 15 minútach a aj tak sa tomu jedlu ľudia v rímskych trattoriach klaňajú.",
            "Dôvod: nič sa neschová. Ak je pasta prevarená, vidíš to. Ak je syr hrudkovitý, je hrudkovitý. Ak na korenie zabudneš dať na rozohriatu panvicu, chuť je plochá. Päť minút technického koridoru — vnútri ste šéfkuchár, vonku máte sklamanie a slaný syr.",
            "Tento návod beriem z rímskych trattorií, kde to robia tridsať rokov denne. Aj s pomermi, ktoré vychádzajú doma na obyčajnom sporáku.",
          ],
          it: [
            "Tre cose nel piatto. Pasta, pecorino, pepe nero. Niente olio, niente burro, niente panna. La pasta sta in pentola 15 minuti e davanti a quel piatto, nelle trattorie romane, la gente si inchina.",
            "Il motivo: non si nasconde nulla. Se la pasta è scotta, si vede. Se il pecorino fa grumi, fa grumi. Se ti dimentichi di tostare il pepe in padella, il sapore è piatto. Cinque minuti di corridoio tecnico — dentro sei lo chef, fuori hai una delusione e formaggio salato.",
            "Questa guida arriva da trattorie romane che lo fanno trent'anni ogni giorno. Con dosi che riescono a casa, su un fornello qualunque.",
          ],
        },
      },
      {
        heading: {
          sk: "Tri ingrediencie, tisíc spôsobov ako to pokaziť",
          it: "Tre ingredienti, mille modi di sbagliare",
        },
        paragraphs: {
          sk: [
            "Talianska kuchyňa má pravidlo: čím menej ingrediencií, tým vyššia laťka. Cacio e pepe je dôkaz. Každá zložka musí byť presne to, čo má byť. Nie podobné, nie skoro, nie z akcie v supermarkete.",
            "Pred receptom — krátka inventúra. Ak doma nemáš jedno z nasledujúcich štyroch, nepokračuj.",
          ],
          it: [
            "La cucina italiana ha una regola: meno ingredienti hai, più alta è l'asticella. Il cacio e pepe lo dimostra. Ogni componente deve essere esattamente quello giusto. Non simile, non quasi, non in offerta al supermercato.",
            "Prima della ricetta, un breve inventario. Se a casa ti manca uno di questi quattro, fermati qui.",
          ],
        },
        lists: [
          {
            ordered: false,
            items: {
              sk: [
                "Tonnarelli, spaghettoni alebo aspoň hrubé spaghetti. Tenké spaghettini nepustia dosť škrobu.",
                "Pecorino Romano DOP — výhradne ovčí syr z Lazia alebo Sardínie. Parmezán je iný syr a tu nefunguje.",
                "Čierne celé korenie — najlepšie Tellicherry alebo Malabar. Kúpené mleté korenie do hodiny stratí 60 % aromy.",
                "Hrubá panvica alebo wok. Tenká nerezová panvica zabíja kremovanie.",
              ],
              it: [
                "Tonnarelli, spaghettoni o almeno spaghetti grossi. Gli spaghettini sottili non rilasciano abbastanza amido.",
                "Pecorino Romano DOP — solo pecorino di Lazio o Sardegna. Il parmigiano è un altro formaggio e qui non funziona.",
                "Pepe nero in grani — meglio Tellicherry o Malabar. Quello macinato perde il 60 % degli aromi in un'ora.",
                "Padella spessa o un wok. Una padella d'acciaio sottile uccide la cremina.",
              ],
            },
          },
        ],
      },
      {
        heading: {
          sk: "Cestoviny: tonnarelli sú jediný správny tvar",
          it: "La pasta: i tonnarelli sono l'unico formato giusto",
        },
        paragraphs: {
          sk: [
            "Tonnarelli vyzerajú ako hrubé spaghetti so štvorcovým prierezom. Sú rímska klasika, držia omáčku po celej dĺžke. Vyrábajú sa s vajcom, hustejšie ako bežné suché cestoviny.",
            "Druhá najlepšia voľba: spaghettoni alebo bucatini. Spaghettoni majú priemer okolo 2,2 mm — ideálny pomer povrchu a hmoty. Bucatini majú dieru v strede, ktorá zachytí časť kremovej omáčky.",
            "Najhoršia voľba: spaghettini, capellini, vermicelli. Tenké tvary sa prevaria, lepia sa, omáčka po nich kĺže.",
            "Bronzové ťahanie (trafila al bronzo) je pri tomto recepte bonus, nie nevyhnutnosť. Hrubý drsný povrch lepšie chytá Pecorino, ale aj hladké priemyselné cestoviny fungujú, ak je technika správna.",
          ],
          it: [
            "I tonnarelli sembrano spaghetti spessi a sezione quadrata. Sono il classico romano, tengono la salsa per tutta la lunghezza. Si fanno con l'uovo, più consistenti della pasta secca normale.",
            "Seconda scelta migliore: spaghettoni o bucatini. Gli spaghettoni hanno diametro intorno a 2,2 mm — rapporto perfetto tra superficie e massa. I bucatini hanno il buco al centro che cattura parte della crema.",
            "Peggiore scelta: spaghettini, capellini, vermicelli. I formati sottili scuociono, si attaccano, la salsa scivola.",
            "La trafilatura al bronzo è un bonus, non un obbligo. La superficie ruvida trattiene meglio il pecorino, ma anche una pasta liscia industriale funziona se la tecnica è corretta.",
          ],
        },
      },
      {
        heading: {
          sk: "Pecorino Romano DOP: nie každý pecorino je rovnaký",
          it: "Pecorino Romano DOP: non ogni pecorino è uguale",
        },
        paragraphs: {
          sk: [
            "Pecorino Romano je 100 % ovčie mlieko, soľný, zretý minimálne 5 mesiacov, vyrábaný iba v troch regiónoch — Lazio, Sardínia a provincia Grosseto. Označenie DOP je legálne chránené od roku 1996.",
            "Slano-pikantný profil je kľúčový. Mladší Pecorino Sardo je jemnejší a do cacio e pepe nepatrí — chýba mu soľný úder, ktorý nahrádza akúkoľvek soľ vo vode na cestoviny.",
            "Nikdy nepoužívaj predstrúhaný syr v sáčku. Anti-caking aditíva (celulóza, škrob) blokujú emulzifikáciu. Skutočný Pecorino Romano sa strúha čerstvo, čo najjemnejšie — mikroplaning alebo najjemnejšie strúhadlo.",
            "Pomer pre 100 g suchých cestovín: 70-80 g jemne nastrúhaného Pecorino. Áno, je to veľa. Práve to chce tento recept.",
          ],
          it: [
            "Il Pecorino Romano è 100 % latte di pecora, salato, stagionato minimo 5 mesi, prodotto solo in tre aree — Lazio, Sardegna e provincia di Grosseto. La denominazione DOP è tutelata dal 1996.",
            "Il profilo sapido-piccante è la chiave. Il Pecorino Sardo giovane è più delicato e nel cacio e pepe non ci sta — manca il colpo salato che sostituisce qualunque sale nell'acqua di cottura.",
            "Mai usare il grattugiato in busta. Gli antiagglomeranti (cellulosa, amido) bloccano l'emulsione. Il vero Pecorino Romano si grattugia al momento, il più fine possibile — microplaner o lato fine della grattugia.",
            "Dose per 100 g di pasta secca: 70-80 g di pecorino grattugiato fine. Sì, è tanto. È esattamente quello che vuole questa ricetta.",
          ],
        },
      },
      {
        heading: {
          sk: "Pepper: čerstvo drvený, jemne opraženy",
          it: "Pepe: macinato fresco, leggermente tostato",
        },
        paragraphs: {
          sk: [
            "Korenie nie je len soľ na konci. V cacio e pepe je rovnocenná tretia ingrediencia, zodpovedná za teplo a aromatický spodok celého jedla.",
            "Krok, ktorý preskakuje 80 % domácich kuchárov: opraženie korenia. Celé zrná drví v hmoždiari (alebo cez mlynček na hrubo), potom dáš na suchú panvicu pri strednom plameni a po 60-90 sekundách začuješ aromu. Vtedy pridávaš ďalšie ingrediencie.",
            "Druhá vec — drvené, nie mleté. Mletie na prach uvoľní oleje rýchlo, ale pri kontakte s teplom horia. Hrubá drvina drží aromu dlhšie a poskytuje textúru pod zubom.",
            "Pomer pre 100 g cestovín: 2 vrchovaté lyžičky čerstvo drveného korenia. Znie to ako veľa. Nie je.",
          ],
          it: [
            "Il pepe non è il sale finale. Nel cacio e pepe è il terzo ingrediente alla pari, responsabile del calore e dello sfondo aromatico.",
            "Il passaggio che il 80 % delle cucine casalinghe salta: tostare il pepe. I grani interi si pestano nel mortaio (oppure si macinano grossi), poi vanno in padella asciutta a fuoco medio, e dopo 60-90 secondi senti l'aroma. È in quel momento che aggiungi gli altri ingredienti.",
            "Seconda cosa — pestato, non macinato fine. La polvere rilascia gli oli velocemente, ma a contatto col calore brucia. Il granuloso tiene l'aroma più a lungo e dà la consistenza al morso.",
            "Dose per 100 g di pasta: 2 cucchiaini abbondanti di pepe pestato fresco. Sembra tanto. Non lo è.",
          ],
        },
      },
      {
        heading: {
          sk: "Recept krok po kroku — pre dve porcie",
          it: "La ricetta passo per passo — per due persone",
        },
        paragraphs: {
          sk: [
            "Príprava: 200 g tonnarelli alebo spaghettoni, 150 g Pecorino Romano DOP jemne nastrúhaný, 4 lyžičky celého čierneho korenia, voda. Čas: 12-15 minút.",
          ],
          it: [
            "Mise en place: 200 g di tonnarelli o spaghettoni, 150 g di Pecorino Romano DOP grattugiato fine, 4 cucchiaini di pepe nero in grani, acqua. Tempo: 12-15 minuti.",
          ],
        },
        lists: [
          {
            ordered: true,
            items: {
              sk: [
                "Vodu zovri v hrnci. Soli iba málo — Pecorino je veľmi slaný. Použi polovicu obvyklej dávky, alebo nesol vôbec, ak je tvoj syr veľmi solený.",
                "Korenie podrvi v hmoždiari nahrubo. Daj na suchú panvicu pri strednom plameni a 60 sekúnd opraž do aromy.",
                "K opraženému koreniu pridaj 100 ml vriacej vody z hrnca. Vznikne korenistý vývar. Stiahni z plameňa.",
                "Hoď cestoviny do vriacej vody. Var ich 2 minúty kratšie, než píše balík — necháš dovariť na panvici.",
                "Asi minútu pred koncom prelož cestoviny do panvice s koreňovou vodou. Pri strednom plameni miešaj 60-90 sekúnd, pridávaj škrobovú vodu z hrnca podľa potreby.",
                "Stiahni panvicu z plameňa. Počkaj 30 sekúnd, aby teplota klesla pod 80 °C — to je kľúčové, syr sa pri vyššej teplote zrazí na hrudky.",
                "Pridaj Pecorino postupne, intenzívne miešaj alebo otáčaj panvicou. Postupne pridávaj horúcu vodu po lyžiciach, kým nevznikne hladká krémová omáčka.",
                "Servíruj okamžite na predhriate taniere. Na vrchu posyp ešte trochou syra a čerstvo drveným korením.",
              ],
              it: [
                "Porta a bollore l'acqua. Sala poco — il pecorino è molto sapido. Usa metà del sale abituale, o nessuno se il tuo pecorino è particolarmente salato.",
                "Pesta il pepe nel mortaio grossolanamente. Tostalo in padella asciutta a fuoco medio per 60 secondi, fino al profumo.",
                "Aggiungi al pepe tostato 100 ml di acqua bollente dalla pentola. Si forma un brodo pepato. Togli dal fuoco.",
                "Butta la pasta nell'acqua bollente. Cuoci 2 minuti in meno di quanto indica la confezione — la finisce in padella.",
                "Circa un minuto prima della fine, sposta la pasta nella padella col brodo pepato. A fuoco medio mantieni in movimento per 60-90 secondi, aggiungendo acqua amidacea dalla pentola se serve.",
                "Togli la padella dal fuoco. Aspetta 30 secondi che la temperatura scenda sotto gli 80 °C — è il punto chiave, sopra il pecorino impazzisce a grumi.",
                "Aggiungi il Pecorino in più riprese, mescolando con forza o saltando in padella. Versa acqua calda a cucchiaiate fino a quando la cremina non è liscia.",
                "Servi subito nei piatti pre-riscaldati. Sopra spolvera ancora pecorino e pepe macinato fresco.",
              ],
            },
          },
        ],
      },
      {
        heading: {
          sk: "Štyri najčastejšie chyby",
          it: "I quattro errori più comuni",
        },
        paragraphs: {
          sk: [
            "Cacio e pepe nezvládajú začiatočníci ani kuchári s desaťročnou praxou. Tu je, kde to ide dole vodou.",
          ],
          it: [
            "Il cacio e pepe lo sbagliano sia principianti che cuochi con dieci anni di esperienza. Ecco dove crolla.",
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
              it: [
                "Troppo sale nell'acqua di cottura. Il pecorino dà più che abbastanza sapidità per quattro piatti.",
                "Temperatura troppo alta quando aggiungi il formaggio. Sopra 80 °C le proteine della caseina coagulano e la crema si rompe in grumi e olio.",
                "Pecorino già grattugiato o parmigiano al posto del Pecorino Romano. Profilo di grasso e sale diverso, risultato diverso.",
                "Poca acqua amidacea. Senza, la salsa non lega, il formaggio si rapprende e attacca.",
              ],
            },
          },
        ],
      },
      {
        heading: {
          sk: "Časté otázky",
          it: "Domande frequenti",
        },
        paragraphs: {
          sk: [],
          it: [],
        },
        faqs: [
          {
            q: {
              sk: "Môžem nahradiť Pecorino Romano parmezánom?",
              it: "Posso sostituire il Pecorino Romano con il parmigiano?",
            },
            a: {
              sk: "Nie. Parmezán je z kravského mlieka, má iný profil mastnoty a menej soli. Výsledok bude jemnejší, sladkejší a nebude to cacio e pepe. Je to ako vymeniť ricottu za feta — oba sú syry, ale to je jediné, čo majú spoločné.",
              it: "No. Il parmigiano è da latte vaccino, ha un altro profilo di grasso e meno sale. Il risultato sarà più delicato, più dolce, e non sarà cacio e pepe. È come scambiare la ricotta con la feta — sono entrambi formaggi e finiscono lì le somiglianze.",
            },
          },
          {
            q: {
              sk: "Prečo sa mi syr robí na hrudky?",
              it: "Perché il formaggio mi fa grumi?",
            },
            a: {
              sk: "Tri možné dôvody: panvica je príliš horúca (cez 80 °C), syr je nastrúhaný hrubo namiesto jemne, alebo je v sáčku s antikoagulátormi. Stiahni panvicu z plameňa pred pridaním syra a počkaj 30 sekúnd.",
              it: "Tre cause possibili: padella troppo calda (sopra 80 °C), formaggio grattugiato grosso invece che fine, o pecorino in busta con antiagglomeranti. Togli la padella dal fuoco prima di aggiungere il formaggio e aspetta 30 secondi.",
            },
          },
          {
            q: {
              sk: "Koľko vody z cestovín mám nechať?",
              it: "Quanta acqua di cottura devo tenere?",
            },
            a: {
              sk: "Pre 200 g cestovín si nechaj aspoň 400 ml škrobovej vody pred scedením. Použiješ asi 200-250 ml, zvyšok je poistka. Bez škrobovej vody to neurobíš.",
              it: "Per 200 g di pasta tieni almeno 400 ml di acqua amidacea prima di scolare. Ne userai 200-250 ml, il resto è scorta. Senza acqua amidacea non si fa.",
            },
          },
          {
            q: {
              sk: "Aké korenie je najlepšie?",
              it: "Quale pepe è il migliore?",
            },
            a: {
              sk: "Tellicherry z Indie (Malabar je veľmi blízko). Veľké zrná, intenzívne ovocné a citrusové tóny, držia aromu po opražení. Vyhni sa mletému koreniu zo sáčku — do hodiny od mletia stratí väčšinu prchavých olejov.",
              it: "Tellicherry dall'India (Malabar è molto vicino). Grani grandi, profilo fruttato e agrumato intenso, mantiene gli aromi dopo tostatura. Evita il pepe macinato in busta — entro un'ora dalla macinatura ha già perso la maggior parte degli oli volatili.",
            },
          },
          {
            q: {
              sk: "Môžem cacio e pepe pripraviť dopredu?",
              it: "Posso preparare il cacio e pepe in anticipo?",
            },
            a: {
              sk: "Nie. Emulzia drží 5-10 minút po dokončení. Ak musíš čakať, čakajú hostia, nie pasta. Pripravený Pecorino môžeš mať nastrúhaný hodinu vopred, korenie podrvené, ale zostavenie sa robí v poslednú chvíľu.",
              it: "No. L'emulsione regge 5-10 minuti dopo la mantecatura. Se devi aspettare, aspettano gli ospiti, non la pasta. Puoi avere pecorino grattugiato un'ora prima e pepe pestato pronto, ma il montaggio si fa all'ultimo momento.",
            },
          },
        ],
      },
      {
        heading: {
          sk: "Záver",
          it: "Conclusione",
        },
        paragraphs: {
          sk: [
            "Cacio e pepe je test. Tri ingrediencie, žiadne miesto na skrytie. Keď sa to podarí — a podarí sa to po dvoch-troch pokusoch, ak si stiahneš panvicu z plameňa a dáš syr po lyžiciach — máš jedlo, ktoré v Ríme stojí v reštaurácii 14 €.",
            "Ingrediencie zaobstaráš v Italiamo katalógu: Pecorino Romano DOP, suché cestoviny od Grano Armando alebo Pasta Berutto v sekcii Cestoviny. Korenie kúp v špecializovanom obchode s ostrými surovinami — nie v supermarkete.",
            "Otvor sekciu Cestoviny a začni s 500 g balíkom tonnarelli alebo spaghettoni. Druhú porciu pripravíš ten istý týždeň, lebo prvá ťa pohltí.",
          ],
          it: [
            "Il cacio e pepe è un test. Tre ingredienti, nessun posto dove nascondersi. Quando riesce — e riesce dopo due-tre tentativi se togli la padella dal fuoco e aggiungi il formaggio a cucchiaiate — hai un piatto che a Roma costa 14 € al ristorante.",
            "Gli ingredienti li trovi nel catalogo Italiamo: Pecorino Romano DOP, pasta secca Grano Armando o Pasta Berutto nella sezione Pasta. Il pepe compralo in un negozio specializzato di spezie — non al supermercato.",
            "Apri la sezione Pasta e parti da una busta da 500 g di tonnarelli o spaghettoni. La seconda porzione la fai la settimana stessa, perché la prima ti prende.",
          ],
        },
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
