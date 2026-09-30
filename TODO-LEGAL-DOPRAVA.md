# TODO — Právne dokumenty, doprava a B2B/B2C rozdelenie

> Stav k 19. 8. 2026. Zoradené podľa závislostí.
> Body 1–3 sú rozhodnutia klienta a blokujú kód. Zvyšok je implementácia.

---

## HOTOVO

- [x] **Footer odkazoval na neexistujúce staré slugy → 404**
      `components/footer.tsx` — `https://italiamo.eu/zasady-pouzivania-suborov-cookies`
      (label „Obchodné podmienky") a `.../zasady-spracovania-a-ochrany-osobnych-udajov`
      (label „Ochrana súkromia") nahradené internými `<Link href="/terms">` / `<Link href="/privacy">`.
- [x] **Redirecty pre staré indexované URL** — `next.config.ts`:
      `/zasady-pouzivania-suborov-cookies` → `/sk/terms`,
      `/zasady-spracovania-a-ochrany-osobnych-udajov` → `/sk/privacy`,
      `/obchodne-podmienky` → `/sk/terms`, `/ochrana-osobnych-udajov` → `/sk/privacy`.
      Všetkých 7 URL overených live = 200. Nasadené na produkciu.

---

## BLOKUJÚCE — objednávky sa dnes strácajú

### [ ] 0. Ukladanie objednávok do DB

**Kde:** `app/api/checkout/route.ts:26` — `persistOrder()` v produkcii robí len `console.log`.
`lib/db/schema.ts` má tabuľky `categories` a `products`, **žiadnu `orders`**.

**Prečo takto:**
Zákazník teraz zaplatí kartou cez GoPay a objednávka existuje iba ako riadok vo Vercel
logoch, ktoré expirujú. Nikto nevie, čo má expedovať. Zároveň nie je čím preukázať
uzavretie zmluvy pri reklamácii — daňový doklad sa archivuje 10 rokov (zákon o účtovníctve).

Musí ísť ako prvé, lebo všetky ďalšie body (IČO na faktúre, režim B2B, doprava)
zapisujú do tej istej tabuľky. Robiť ich skôr = robiť ich dvakrát.

---

### [ ] 0b. GoPay webhook je stub

**Kde:** `app/api/gopay/notify/route.ts` — loguje a vráti `ok`. Neoveruje podpis,
nemení stav objednávky.

**Prečo takto:**
Bez overenia podpisu ktokoľvek pošle POST a označí objednávku ako zaplatenú.
Bez zápisu stavu sa nedá zistiť, ktorá platba prešla.
Napojiť až keď existuje tabuľka `orders` — preto hneď za bodom 0.

---

### [ ] 0c. Potvrdzovací e-mail objednávky

**Kde:** Resend je zapojený len pre kontaktný formulár — `app/api/lead/route.ts:56`.
Checkout neposiela nikomu nič.

**Prečo takto:**
§5 zákona 108/2024 — spotrebiteľovi treba poskytnúť potvrdenie o uzavretí zmluvy
na trvanlivom nosiči. E-mail je ten nosič. Bez neho je zmluva napadnuteľná a klient
nemá ani interné upozornenie, že prišla objednávka.

Navyše `app/(site)/[locale]/privacy/page.tsx:66` už dnes deklaruje, že Resend posiela
potvrdzovacie e-maily — takže tam momentálne stojí nepravda.

---

## ROZHODNUTIA KLIENTA — bez nich sa nedá písať kód

### [ ] 1. Sídlo vs. sklad

**Konflikt:**

| Kde | Adresa |
|---|---|
| `app/(site)/[locale]/terms/page.tsx:24` | Družstevná 1, 080 06 Prešov |
| `app/(site)/[locale]/contact/page.tsx:33` | Ploské 158, SK-044 44 Ploské |
| `components/footer.tsx` (pätička) | Ploské 158, SK-044 44 |

**Prečo to treba vyriešiť:**
V obchodných podmienkach musí byť **sídlo zapísané v OR** (identifikácia predávajúceho),
na vrátenie tovaru **adresa skladu**. Sú to dva rôzne údaje na dvoch rôznych miestach,
nie jeden. Ak sa zamenia, zákazník pošle vrátený tovar tam, kde ho nikto nepreberie.

**Treba od klienta:** ktorá adresa je zapísaná v obchodnom registri.

- [ ] Sídlo (OR): ......................................................
- [ ] Sklad / adresa na vrátenie: ......................................

---

### [ ] 2. Doprava — čísla pre obe vetvy

|  | Súkromník (B2C) | Firma (B2B) |
|---|---|---|
| Dopravca | | |
| Cenník | | |
| Zdarma od | | |
| Dodacia lehota | | |
| Vrátenie — počet dní | 14 (zákonné minimum) | — |
| Kto platí spätnú dopravu | | |

**Prečo dve sady:**
B2B objednávka je ťažšia (kartóny, palety) a chodí na inú trasu. Jeden paušál pre obe
znamená buď dotovať veľkoodberateľa, alebo predražiť jednotlivca.
Navyše zľavy 5 / 15 / 17 % v `lib/b2b-discount.ts:9` už dnes B2B cenu znižujú — ak
k tomu pridáš tú istú dopravu zadarmo od 75 €, na veľkých objednávkach ideš do mínusu
na logistike.

**Návrh na odklepnutie:**

- B2C — Packeta (výdajné miesta + kuriér) + osobný odber zdarma.
  3,90 € do 5 kg / 5,90 € do 15 kg / 8,90 € nad 15 kg. Zdarma od **75 €**.
  2–3 prac. dni skladom, 7–10 dní na objednávku z Talianska.
- B2B — GLS / SPS kuriér, podľa hmotnosti, paleta po dohode.
  Zdarma od **300 €** alebo v rámci závozovej trasy. 2–5 prac. dní.

> Pozn. k dopravcovi: Packeta výdajné miesto má limit ~5 kg. Kartón 6 fliaš vína
> ≈ 8 kg → víno musí ísť kuriérom (GLS/SPS), nie na výdajňu.

> Pozn. k vráteniu: **nedávaj viac než 14 dní.** Ide o potraviny — dlhšia lehota
> znamená vracaný tovar, ktorý sa už nedá predať.

---

### [ ] 3. Ako sa overuje režim „firma"

**Kde:** `lib/customer-mode.ts:15` — zustand store v localStorage,
nastaví ho jeden klik v `components/customer-mode-picker.tsx`.

**Prečo to nemôže zostať:**
Ktorýkoľvek súkromník si dnes klikne „firma" a zoberie si 17 % zľavu. Nič to neoveruje.
Zároveň — ak sa spotrebiteľ tvári ako firma, **nestráca tým ochranu spotrebiteľa**;
rozhoduje skutočný stav, nie checkbox. Klient teda nesie riziko oboch: aj zľavy,
aj 14-dňového odstúpenia.

**Voľby — vybrať jednu:**

- [ ] **a)** Povinné IČO pri režime firma + validácia proti registru.
      Automatické, žiadne schvaľovanie. *(odporúčané — IČO aj tak treba na faktúru, bod 5)*
- [ ] **b)** B2B účet cez schválenie (registrácia → klient schváli → ceny sa odomknú).
      Pomalšie, ale kontrola nad tým, kto dostane veľkoobchod.
- [ ] **c)** Nechať otvorené, ale znížiť zľavy na úroveň, kde nevadí,
      že si ich vezme aj súkromník.

---

## IMPLEMENTÁCIA — po rozhodnutiach

### [ ] 4. Zjednotiť dopravu do jednej konštanty

**Štyri rôzne hodnoty pre tú istú vec:**

| Súbor | Doprava | Zdarma od |
|---|---|---|
| `app/(site)/[locale]/cart/cart-view.tsx:13` | 5,90 € | 60 € |
| `app/(site)/[locale]/checkout/checkout-view.tsx:33` | 5,90 € | **75 €** |
| `components/delivery-ribbon.tsx:11` | — | 60 € |
| `app/(site)/[locale]/terms/page.tsx:47` | **4,90 €** | **80 €** |

**Prečo cez jednu konštantu, nie prepísať štyri čísla:**
Pri objednávke za 65 € košík ukáže dopravu zadarmo a checkout naúčtuje 5,90 €.
Nefunkčný nákup — zákazník odíde. A cena v obchodných podmienkach sa od účtovanej
líši o euro, čo je klamlivá obchodná praktika podľa §7 zákona 108/2024.

Ak sa to opraví štyrmi editmi, pri najbližšej zmene sadzby sa to rozíde znova.
Preto `lib/shipping.ts` s jedným exportom a všetky štyri miesta z neho čítajú —
vrátane textu v obchodných podmienkach.

---

### [ ] 5. Firemné polia v checkoute

**Kde:** `app/(site)/[locale]/checkout/checkout-view.tsx:97` — polia sú
`name, email, phone, street, city, zip, country, note`. Žiadne IČO, DIČ, IČ DPH.

**Prečo:**
Bez IČO a DIČ sa nedá vystaviť faktúra pre podnikateľa — povinné náležitosti
daňového dokladu (§74 zákona o DPH). Bez IČ DPH sa nedá spraviť reverse charge
pri dodaní do iného členského štátu → klient by musel odviesť slovenskú DPH
z objednávky, z ktorej ju nevybral.

Polia musia byť povinné **len keď `mode === "b2b"`** — od súkromníka ich pýtať
nemôžeš, nemá ich.

---

### [ ] 6. Rozdeliť obchodné podmienky na dve vetvy

**Kde:** `app/(site)/[locale]/terms/page.tsx:65` — jediný článok, plošne:
„Spotrebiteľ má právo odstúpiť od zmluvy do 14 dní."

**Prečo:**
Právo odstúpiť do 14 dní bez udania dôvodu patrí **iba spotrebiteľovi** — fyzickej
osobe nekonajúcej v rámci podnikania. Podnikateľ ho nemá. Súčasná formulácia ho
priznáva všetkým, čím sa klient dobrovoľne zaväzuje brať späť aj veľkoobchodné dodávky.

Naopak pri spotrebiteľovi musí byť **explicitne** uvedené, že spätnú dopravu platí on —
ak to tam nie je, platí ju predávajúci zo zákona.

**Nová štruktúra:**

- Článok „Odstúpenie od zmluvy — spotrebiteľ"
  → 14 dní, kto platí spätnú dopravu, výnimka na potraviny podliehajúce rýchlej skaze
- Článok „Dodanie a reklamácie — podnikateľ"
  → bez odstúpenia, lehota na kontrolu pri prevzatí, Obchodný zákonník

---

### [ ] 7. Doplniť identifikačné údaje do podmienok

**Kde:** `app/(site)/[locale]/terms/page.tsx:24` — `IČO: zadáme po registrácii`.

**Prečo:**
Údaje reálne existujú, sú na `app/(site)/[locale]/contact/page.tsx:52`:

```
IČO: 36452700
DIČ: 2020006406
IČ DPH: SK2020006406
Obchodný register OS Prešov, oddiel Sro, vložka č. 10915/P
```

Chýbajúce IČO v podmienkach blokuje overenie v Google Merchant Center a je zároveň
chýbajúca povinná náležitosť.

Závisí od bodu 1 — nedá sa dopísať, kým nie je jasné, ktorá adresa je sídlo.

---

### [ ] 8. Overenie veku 18+ pri víne

**Kde:** nikde. V košíku ani v checkoute nie je nič.

**Prečo:**
Predaj alkoholu maloletému je priestupok a Google Shopping bez toho alkoholové
položky neschváli. Feed už posiela správnu kategóriu (`421` v
`app/google-merchant.xml/route.ts:19`), takže Google **vie**, že sa tam predáva
alkohol — chýba len potvrdenie veku pri objednávke a samostatná žiadosť
o schválenie alkoholu v Merchant Center.

---

### [ ] 9. Doplniť dopravu do Google feedu

**Kde:** `app/google-merchant.xml/route.ts:80` — položky nemajú `g:shipping`.

**Prečo:**
Google berie buď sadzby nastavené v Merchant Center, alebo tie z feedu. Ak nie sú
ani jedny, ceny v inzerátoch nesedia s checkoutom a Google produkty zamietne
za nesúlad.

Musí ísť **až po bode 4** — feed musí čítať tú istú konštantu ako košík,
inak sa rozídu presne ako dnes.

---

## Poradie

```
0 → 0b → 0c        objednávky sa prestanú strácať
1, 2, 3            rozhodnutia klienta (dajú sa riešiť paralelne)
4 → 9              doprava: najprv konštanta, potom feed
5, 6, 7            B2B faktúry + podmienky
8                  alkohol, môže kedykoľvek
```

Body 5, 6, 7 idú až po bode 3, lebo spôsob overenia firmy určuje, či sa IČO pýta
v checkoute alebo pri registrácii — a od toho závisí formulácia podmienok.

---

## Čo treba od klienta, aby sa dalo začať

1. Adresa sídla zapísaná v OR (bod 1)
2. Čísla dopravy pre obe vetvy (bod 2)
3. Voľba a / b / c pri overovaní firmy (bod 3)

---

## Referencia — kontext modelu

Italiamo predáva **aj koncovým zákazníkom, aj firmám**. Preto je na stránke
prepínač súkromník / firma. Právne to znamená dve paralelné sady pravidiel:

| | Súkromník (B2C) | Firma (B2B) |
|---|---|---|
| Zákon | 108/2024 Z. z. o ochrane spotrebiteľa | Obchodný zákonník |
| Odstúpenie 14 dní | **povinné** | **neexistuje** |
| Spätná doprava | musí byť v podmienkach, inak platí predávajúci | podľa dohody |
| Vrátenie bez dôvodu | áno | nie, len reklamácia vady |
| Cena | s DPH | často bez DPH + reverse charge pri EU |
| Doprava | paušál, zdarma od sumy | podľa hmotnosti / paliet |
| Google feed | **len táto vetva** | Google B2B ceny ignoruje |

„Iba dodávateľ" nie je právne udržateľná pozícia, pokiaľ web berie objednávky
a ťahá platby kartou. Kto je na faktúre ako predávajúci, nesie spotrebiteľské
povinnosti — aj keby tovar fyzicky posielal niekto iný.
