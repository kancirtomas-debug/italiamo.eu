import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const data = JSON.parse(readFileSync(join(here, "scrape-data.json"), "utf8"));

/* category source -> target Category */
const CAT_MAP = {
  BIO: "bio",
  Pesta: "pesta",
  Sumive: "vino",
  Biele: "vino",
  Cervene: "vino",
  Ruzove: "vino",
  Vino: "vino",
  Kava: "kava",
  Salky: "kava",
  Olivy: "olivy",
  Oleje: "oleje",
  Octy: "octy",
  Konzervy: "omacky",
  Omacky: "omacky",
  Cestoviny: "cestoviny",
  Bezvajecne: "cestoviny",
  Cukrovinky: "cukrovinky",
  Grisiny: "grisiny",
};

const SUB_MAP = {
  Sumive: "sumive",
  Biele: "biele",
  Cervene: "cervene",
  Ruzove: "ruzove",
  Salky: "salky",
};

function slugFromLink(link) {
  const m = link.match(/\/produkt\/([^/?#]+)/);
  if (!m) return null;
  return m[1].toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 80);
}

function inferRegion(name) {
  const n = name.toLowerCase();
  if (/valpolicella|amarone|veneto|prosecco|venet|trev|asolo|valdobb|conegli/.test(n)) return "Veneto";
  if (/abruzzo|montepulciano|trebbiano|pecorino/.test(n) && !/pesto|romano/.test(n)) return "Abruzzo";
  if (/sardin|sardegna|vermentino|cannonau|gallura|isola dei nuraghi/.test(n)) return "Sardegna";
  if (/sicil|nicosia|nero d'avola|grillo|catarratto|insolia|colomba/.test(n)) return "Sicilia";
  if (/apuli|salent|primitivo|negroamaro|manduria|nardo|nardò|ferrgnola|cerignola|leccino|peranzana|baresana|gargano/.test(n)) return "Apulia";
  if (/tosca|chianti|toscana|fiano/.test(n)) return "Toscana";
  if (/piemonte|barbera|asti|moscato|nebbiolo|dolcetto/.test(n)) return "Piemonte";
  if (/emilia|modena|alce nero|grano armando/.test(n)) return "Emilia-Romagna";
  if (/padova|diemme/.test(n)) return "Veneto";
  return undefined;
}

function inferWinery(name) {
  const known = [
    "Alce Nero",
    "Antica Vigna",
    "Aulus",
    "Bedin",
    "Caffè Diemme",
    "Caffe Diemme",
    "Casa Rinaldi",
    "Casina Reale",
    "Colomba",
    "Schola Sarmenti",
    "Villa Mottura",
    "Vigneti Zanatta",
    "Nicosia",
    "Settesoli",
    "Val Doca",
    "Ilauri",
    "Bonotto",
    "BonOtto",
    "Ca' Val",
    "SalvaTerra",
    "Sartori",
    "Federico Ferrero",
    "Gambelli",
    "Grano Armando",
    "Marini",
    "Maxtris",
    "LIFE",
    "Fratelli Mantova",
    "Varvello",
    "Monti",
    "FILI",
    "LA TORDERA",
    "BRUNEI",
    "ASOLO",
    "SERRAI",
    "SAOMI",
    "OTRE'VAL",
    "Arrighi",
    "La Pruina",
    "Duca di Saragnano",
    "Tenuta Bricco San Giorgio",
    "Polo",
    "Kelu",
    "Su Puddu",
    "Vitese",
    "Sacchetto",
    "Rosso Gargano",
    "Max Food",
    "Biotuscany",
    "Limi",
  ];
  for (const w of known) {
    if (name.toLowerCase().startsWith(w.toLowerCase())) return w;
  }
  return undefined;
}

function inferVolume(name) {
  const m = name.match(/(\d+([.,]\d+)?)\s*(l\b|ml\b|g\b|kg\b)/i);
  if (!m) return undefined;
  return `${m[1]} ${m[3].toLowerCase()}`;
}

function describeIt(name) {
  const n = name.toLowerCase();
  if (/prosecco/.test(n)) return "Prosecco italiano della selezione Italiamo. Importazione diretta dal produttore.";
  if (/cestov|fusilli|penne|spaghett|farfalle|tagliatell|orecchiett|fettucc|ditali|stelline|tortiglioni|tortellini|chitarra|cannellone|fettuccia|lasagn|alfabeto|pasta zoo/.test(n))
    return "Pasta italiana di semola di grano duro Triticum durum.";
  if (/pesto|sugo/.test(n)) return "Pesto/sugo originale italiano in vasetto. Da gustare freddo o leggermente riscaldato.";
  if (/oliv\b|olivy/.test(n)) return "Olive italiane in salamoia o sott'olio.";
  if (/olio|olej/.test(n)) return "Olio extravergine d'oliva italiano. Spremitura a freddo.";
  if (/balsamico|balzamik|aceto|ocot/.test(n)) return "Aceto balsamico IGP di Modena.";
  if (/grissini|grisiny/.test(n)) return "Grissini classici italiani al forno.";
  if (/cantucc|amarett|biscot|sušien|cookie|sfogli|moncrem|savoiar|verona|colad|čokol|cioccol|maxtris/.test(n))
    return "Dolci italiani della tradizione.";
  if (/caffe|caffè|káva|arabica|chiapas|romeo|emma|moka|aromatica|prestigio|decaffeinato|oro blend/.test(n))
    return "Caffè italiano della torrefazione Diemme di Padova.";
  if (/passat|paradajk|pomodor|gargano|marinara|conserv|fazul|šošov|sosov|borloti/.test(n))
    return "Conserve italiane di pomodoro/legumi.";
  if (/vino|biele|cervene|červen|ružov|sumive|šumivé|moscato|chianti|brunello|amarone|primitivo|trebbiano|pinot|sauvignon|chardonnay|merlot|nebbiolo|barbera|montepulciano|fiano|vermentino|negroamaro|nero d|grillo|insolia|catarratto|frappato|viognier|sangiovese|pecorino|cannonau|nerello|riposato|cerasuolo|valpolicella|ripasso|soave|glera|dolcetto/.test(n))
    return "Vino italiano della selezione Italiamo. Importazione diretta dal produttore.";
  return "Specialità italiana selezionata da Italiamo Distribution.";
}

function describeSk(name) {
  const n = name.toLowerCase();
  if (/prosecco/.test(n)) return "Talianske Prosecco zo selekcie Italiamo. Priamy import od výrobcu.";
  if (/cestov|fusilli|penne|spaghett|farfalle|tagliatell|orecchiett|fettucc|ditali|stelline|tortiglioni|tortellini|chitarra|cannellone|fettuccia|lasagn|alfabeto|pasta zoo/.test(n))
    return "Talianske cestoviny zo semolinovej múky tvrdej pšenice Triticum durum.";
  if (/pesto|sugo/.test(n)) return "Originálne talianske pesto/sugo v skle. Studené alebo krátko zohriate.";
  if (/oliv\b|olivy/.test(n)) return "Talianske olivy v náleve alebo oleji.";
  if (/olio|olej/.test(n)) return "Extra panenský olivový olej z Talianska. Lisovaný za studena.";
  if (/balsamico|balzamik|aceto|ocot/.test(n)) return "Taliansky balzamikový ocot IGP di Modena.";
  if (/grissini|grisiny/.test(n)) return "Klasické talianske grissini pečené v peci.";
  if (/cantucc|amarett|biscot|sušien|cookie|sfogli|moncrem|savoiar|verona|colad|čokol|cioccol|maxtris/.test(n))
    return "Talianske sladké pochúťky tradičnej výroby.";
  if (/caffe|caffè|káva|arabica|chiapas|romeo|emma|moka|aromatica|prestigio|decaffeinato|oro blend/.test(n))
    return "Talianska káva z pražiarne Diemme v Padove.";
  if (/passat|paradajk|pomodor|gargano|marinara|conserv|fazul|šošov|sosov|borloti/.test(n))
    return "Talianske konzervy paradajok a strukovín.";
  if (/vino|biele|cervene|červen|ružov|sumive|šumivé|moscato|chianti|brunello|amarone|primitivo|trebbiano|pinot|sauvignon|chardonnay|merlot|nebbiolo|barbera|montepulciano|fiano|vermentino|negroamaro|nero d|grillo|insolia|catarratto|frappato|viognier|sangiovese|pecorino|cannonau|nerello|riposato|cerasuolo|valpolicella|ripasso|soave|glera|dolcetto/.test(n))
    return "Talianske víno zo selekcie Italiamo. Priamy import od výrobcu.";
  return "Talianska špecialita zo selekcie Italiamo Distribution.";
}

function isBio(name, srcCat) {
  return /\bbio\b|biotuscany|alce nero/i.test(name) || srcCat === "BIO";
}

function escapeStr(s) {
  return String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

const seen = new Set();
const out = [];
const placeholderImage = "https://shop.italiamo.eu/wp-content/uploads/woocommerce-placeholder-300x300.png";
const featuredSet = new Set([
  "salvaterra-falia-rose-075",
  "antica-vigna-amarone-vol-della-valpolicella-075l-2011-145",
  "villa-motura-red-primitivo-stillio-manduria-075l",
  "caffe-diemme-blu-arabica-100-zmes-5-druhov-selektovanej-arabiky-odrody-kava-zrnkova-500g",
  "bedin-lucie-prosecco-doc-trev-brut-075l",
  "alce-nero-bio-spaghetti-500g",
  "delikatesna-originalna-natierka-pesto-bazalkove-s-tartuffom-ciernou-hluzovkou-190g",
  "aulus-olio-e-v-o-dop-terra-di-bari-500ml",
]);

let featuredCount = 0;

for (const p of data) {
  const slug = slugFromLink(p.link);
  if (!slug) continue;
  if (seen.has(slug)) continue;
  seen.add(slug);

  const cat = CAT_MAP[p.category] ?? (isBio(p.name, p.category) ? "bio" : "cukrovinky");
  const sub = SUB_MAP[p.category];
  const region = inferRegion(p.name);
  const winery = inferWinery(p.name);
  const volume = inferVolume(p.name);
  const isFeatured = featuredSet.has(slug);
  if (isFeatured) featuredCount++;

  const baseImage = p.image && !p.image.includes("woocommerce-placeholder") ? p.image : null;
  let image;
  if (baseImage) {
    const filename = baseImage.split("/").pop();
    image = `/images/products/${filename}`;
  } else {
    image = "/images/products/placeholder.svg";
  }

  out.push({
    slug,
    name: { sk: p.name, it: p.name },
    category: cat,
    subCategory: sub,
    price: typeof p.price === "number" && p.price > 0 ? p.price : 0,
    volume,
    region,
    winery,
    description: { sk: describeSk(p.name), it: describeIt(p.name) },
    image,
    inStock: !p.unavailable,
    featured: isFeatured || undefined,
  });
}

console.log(`Built ${out.length} products (${featuredCount} featured).`);

const header = `export type Category =
  | "vino"
  | "kava"
  | "cestoviny"
  | "olivy"
  | "oleje"
  | "octy"
  | "pesta"
  | "omacky"
  | "cukrovinky"
  | "bio"
  | "grisiny";

export type Product = {
  slug: string;
  name: { sk: string; it: string };
  category: Category;
  subCategory?: string;
  price: number;
  compareAtPrice?: number;
  volume?: string;
  region?: string;
  winery?: string;
  vintage?: string;
  alcohol?: string;
  description: { sk: string; it: string };
  image: string;
  inStock: boolean;
  featured?: boolean;
};

export const categories: { id: Category; sk: string; it: string }[] = [
  { id: "vino", sk: "Víno", it: "Vino" },
  { id: "kava", sk: "Káva", it: "Caffè" },
  { id: "cestoviny", sk: "Cestoviny", it: "Pasta" },
  { id: "olivy", sk: "Olivy", it: "Olive" },
  { id: "oleje", sk: "Oleje", it: "Oli" },
  { id: "octy", sk: "Octy", it: "Aceti" },
  { id: "pesta", sk: "Pesta a nátierky", it: "Pesto e creme" },
  { id: "omacky", sk: "Omáčky a pretlak", it: "Sughi e passate" },
  { id: "cukrovinky", sk: "Cukrovinky", it: "Dolci" },
  { id: "bio", sk: "BIO", it: "BIO" },
  { id: "grisiny", sk: "Grisiny", it: "Grissini" },
];

/* All product data imported from shop.italiamo.eu — 250+ items.
   Generated by scripts/build-products.mjs from scripts/scrape-data.json. */
export const products: Product[] = ${JSON.stringify(out, null, 2).replace(/"([a-zA-Z_$][\w$]*)":/g, "$1:")};

export function featuredProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
`;

writeFileSync(join(root, "lib", "products.ts"), header, "utf8");
console.log(`Wrote lib/products.ts (${header.length} chars).`);
